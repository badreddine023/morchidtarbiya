import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('data.js', 'utf8');
const deepSource = fs.readFileSync('deep-content.js', 'utf8');
for (const [label, needle] of [
  ['QCM bank', 'D.qcm='],
  ['professional situations', 'D.situations='],
  ['flashcards', 'D.flashcards='],
  ['inclusive lesson', 'window.MORCHID_DATA.inclusive='],
  ['resource library', 'window.MORCHID_DATA.resources='],
]) {
  if (!source.includes(needle)) throw new Error(`Missing ${label}`);
}
if (!deepSource.includes('window.MORCHID_DEEP')) throw new Error('Missing deep content');

const context = vm.createContext({ window: {}, Math, Date });
for (const filename of ['data.js', 'deep-content.js', 'theories-extension.js', 'kolb-content.js']) {
  vm.runInContext(fs.readFileSync(filename, 'utf8'), context, { filename });
}
const data = context.window.MORCHID_DATA;
const assertUniqueIds = (items, label) => {
  const ids = items.map(item => item.id);
  if (new Set(ids).size !== ids.length) throw new Error(`${label} has duplicate IDs`);
};

if (data.theories.length < 10) throw new Error('Theory catalog is smaller than 10 cards');
if (data.qcm.length < 56) throw new Error(`QCM bank has only ${data.qcm.length} questions`);
assertUniqueIds(data.qcm, 'QCM bank');
for (const question of data.qcm) {
  if (question.options.length !== 4 || new Set(question.options).size !== 4) {
    throw new Error(`${question.id} must have four distinct answer options`);
  }
  if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer > 3) {
    throw new Error(`${question.id} has an invalid correct-answer index`);
  }
  if (!question.theory_ids?.length) throw new Error(`${question.id} is not linked to a theory`);
  if (!question.explanation?.trim() || !question.concept?.trim()) {
    throw new Error(`${question.id} is missing its explanation or concept`);
  }
}
const answerDistribution = [0, 0, 0, 0];
for (const question of data.qcm) answerDistribution[question.answer]++;
if (Math.max(...answerDistribution) - Math.min(...answerDistribution) > 1) {
  throw new Error(`Correct answers are not balanced: ${answerDistribution.join(', ')}`);
}
if (!data.deepUnits || data.deepUnits.length !== 6) throw new Error('Deep content must include six official-domain units');
for (const unit of data.deepUnits) {
  if (!unit.qcmIds?.length || !unit.situationIds?.length || !unit.cardIds?.length) throw new Error(`Deep unit ${unit.id} is missing linked practice`);
  if (!unit.title || !unit.thesis || unit.sections?.length < 3 || unit.outcomes?.length < 4 || unit.traps?.length < 3) throw new Error(`Deep unit ${unit.id} is incomplete`);
}

  const kolbQuestions = data.qcm.filter(question => question.id.startsWith('kolb-qcm-'));
if (kolbQuestions.length !== 4 || kolbQuestions.some(question => !question.theory_ids.includes('kolb'))) {
  throw new Error('Kolb QCM expansion must contain four questions linked to Kolb');
}

if (data.situations.length < 17) throw new Error(`Only ${data.situations.length} situations are available`);
assertUniqueIds(data.situations, 'Professional situations');
for (const situation of data.situations) {
  if (!situation.title || !situation.scenario || !situation.analysis || !situation.alternatives || !situation.reflection) {
    throw new Error(`${situation.id} is missing its pedagogical analysis fields`);
  }
  if (situation.options.length !== 4 || new Set(situation.options).size !== 4) {
    throw new Error(`${situation.id} must have four distinct choices`);
  }
  if (!Number.isInteger(situation.answer) || situation.answer < 0 || situation.answer > 3) {
    throw new Error(`${situation.id} has an invalid answer index`);
  }
}
const kolbSituations = data.situations.filter(situation => situation.id.startsWith('sit-09') || situation.id.startsWith('sit-10') || situation.id.startsWith('sit-11'));
if (kolbSituations.length !== 3 || kolbSituations.some(situation => !situation.theory_ids?.includes('kolb'))) {
  throw new Error('Kolb case expansion must contain three situations linked to Kolb');
}

if (data.flashcards.length < 46) throw new Error(`Only ${data.flashcards.length} flashcards are available`);
assertUniqueIds(data.flashcards, 'Flashcards');
for (const card of data.flashcards) {
  if (!card.front || !card.back || !card.example) throw new Error(`${card.id} is missing card content`);
}
const kolbCards = data.flashcards.filter(card => card.id.startsWith('kolb-card-'));
if (kolbCards.length !== 4 || kolbCards.some(card => !card.theory_ids?.includes('kolb'))) {
  throw new Error('Kolb flashcard expansion must contain four cards linked to Kolb');
}

const kolb = data.theories.find(theory => theory.id === 'kolb');
if (!kolb?.method_note_ar || kolb.references?.length < 2) {
  throw new Error('Kolb detail must include a methodological note and two sources');
}
if (!kolb.references.every(reference => reference.url.startsWith('https://'))) {
  throw new Error('Kolb references must use HTTPS URLs');
}

const app = fs.readFileSync('app.js', 'utf8');
for (const needle of [
  'state.examSetup',
  '60*1000',
  'D.situations',
  'D.flashcards',
  'theory-${q.theory_ids',
  't.method_note_ar',
  't.references',
  'data-value="all">كل الحالات',
  'rerenderSearch(e.target)',
  'morchid-progress-v3',
  'window.confirm',
  'D.deepUnits',
  'data-term-category',
  'term-card',
  'function studyPath()',
  'const flashDeck=()=>',
  'state.readLessons',
  'state.activeUnitId',
]) {
  if (!app.includes(needle)) throw new Error(`Missing app contract: ${needle}`);
}
const routes = JSON.parse(fs.readFileSync('public/manus-routes.json', 'utf8'));
for (const path of ['/#qcm', '/#theories', '/#inclusive', '/#resources', '/#lessons', '/#path']) {
  if (!routes.routes.some(route => route.path === path)) throw new Error(`Missing hash route: ${path}`);
}
console.log(`content checks ok: ${data.qcm.length} QCM, ${data.situations.length} situations, ${data.flashcards.length} flashcards; answers ${answerDistribution.join('/')}`);
