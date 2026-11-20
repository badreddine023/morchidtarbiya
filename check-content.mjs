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
for (const filename of [
  'data.js',
  'deep-content.js',
  'theories-extension.js',
  'kolb-content.js',
  'official-classification.js',
]) {
  vm.runInContext(fs.readFileSync(filename, 'utf8'), context, { filename });
}
const data = context.window.MORCHID_DATA;
const assertUniqueIds = (items, label) => {
  const ids = items.map(item => item.id);
  if (new Set(ids).size !== ids.length) throw new Error(`${label} has duplicate IDs`);
};

if (data.theories.length < 10) throw new Error('Theory catalog is smaller than 10 cards');
if (data.qcm.length !== 56) throw new Error(`Expected exactly 56 QCM questions, found ${data.qcm.length}`);
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

const taxonomy = data.officialTaxonomy;
if (!taxonomy || taxonomy.version !== 'men-qcm-2026-11') throw new Error('Official QCM taxonomy is missing or has an unexpected version');
if (taxonomy.groups.length !== 3 || taxonomy.axes.length !== 6) throw new Error('Official taxonomy must define three groups and six axes');
if (Object.keys(taxonomy.assignments).length !== data.qcm.length) throw new Error('Every QCM must have exactly one official classification record');
const expectedGroupWeights = { psychology: 40, pedagogy: 30, sociology: 30 };
const actualGroupWeights = Object.fromEntries(taxonomy.groups.map(group => [group.id, Number.parseFloat(group.weight)]));
if (JSON.stringify(actualGroupWeights) !== JSON.stringify(expectedGroupWeights)) {
  throw new Error(`Official group weights changed unexpectedly: ${JSON.stringify(actualGroupWeights)}`);
}
const expectedAxisWeights = {
  'growth-development': 20,
  'learning-obstacles': 20,
  'competency-approach': 15,
  'teaching-strategies': 15,
  'school-sociology': 15,
  'group-communication': 15,
};
const actualAxisWeights = Object.fromEntries(taxonomy.axes.map(axis => [axis.id, Number.parseFloat(axis.weight)]));
if (JSON.stringify(actualAxisWeights) !== JSON.stringify(expectedAxisWeights)) {
  throw new Error(`Official axis weights changed unexpectedly: ${JSON.stringify(actualAxisWeights)}`);
}
if (Object.values(actualGroupWeights).reduce((sum, value) => sum + value, 0) !== 100 ||
    Object.values(actualAxisWeights).reduce((sum, value) => sum + value, 0) !== 100) {
  throw new Error('Official group and axis weights must each sum to 100%');
}
const groupIds = new Set(taxonomy.groups.map(group => group.id));
const axisIds = new Set(taxonomy.axes.map(axis => axis.id));
const confidenceValues = new Set(['high', 'medium', 'low']);
for (const question of data.qcm) {
  if (!axisIds.has(question.officialAxisId) || !groupIds.has(question.officialGroupId)) {
    throw new Error(`${question.id} is missing a valid official group or axis`);
  }
  const axis = taxonomy.axes.find(item => item.id === question.officialAxisId);
  if (axis.groupId !== question.officialGroupId) throw new Error(`${question.id} has a mismatched official group and axis`);
  if (!confidenceValues.has(question.officialClassificationConfidence) || typeof question.officialClassificationNeedsReview !== 'boolean') {
    throw new Error(`${question.id} is missing classification confidence/review metadata`);
  }
}
const groupCounts = Object.fromEntries(taxonomy.groups.map(group => [group.id, data.qcm.filter(question => question.officialGroupId === group.id).length]));
const expectedGroupCounts = { psychology: 22, pedagogy: 27, sociology: 7 };
if (JSON.stringify(groupCounts) !== JSON.stringify(expectedGroupCounts)) {
  throw new Error(`Unexpected official group coverage: ${JSON.stringify(groupCounts)}`);
}
const axisCounts = Object.fromEntries(taxonomy.axes.map(axis => [axis.id, data.qcm.filter(question => question.officialAxisId === axis.id).length]));
const expectedAxisCounts = {
  'growth-development': 1,
  'learning-obstacles': 21,
  'competency-approach': 12,
  'teaching-strategies': 15,
  'school-sociology': 4,
  'group-communication': 3,
};
if (JSON.stringify(axisCounts) !== JSON.stringify(expectedAxisCounts)) {
  throw new Error(`Unexpected official axis coverage: ${JSON.stringify(axisCounts)}`);
}
if (Object.values(axisCounts).reduce((sum, value) => sum + value, 0) !== data.qcm.length) {
  throw new Error('Official axis coverage does not account for the complete QCM bank');
}
for (const unit of data.deepUnits || []) {
  for (const id of unit.qcmIds || []) {
    const question = data.qcm.find(item => item.id === id);
    if (!question || question.officialAxisId !== unit.id) throw new Error(`Deep unit ${unit.id} has a QCM link assigned to another axis`);
  }
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
const kolbSituations = data.situations.filter(situation => ['sit-09', 'sit-10', 'sit-11'].includes(situation.id));
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
  'officialGroupId',
  'officialAxisId',
  'migrateTaxonomyFilters',
  'legacyDomainGroupMap',
  'hasLegacyTaxonomyFilters',
  'remapLegacyAnswers',
  'state.exam={...saved.exam,answers:remapLegacyAnswers(saved.exam.answers)}',
  'm.answered>=3',
  'عينة صغيرة',
  'عينة أولية:',
  'taxonomy-note',
  'id="exam-group"',
  'id="exam-axis"',
  'التقدم حسب المحور الرسمي',
]) {
  if (!app.includes(needle)) throw new Error(`Missing app contract: ${needle}`);
}
const index = fs.readFileSync('index.html', 'utf8');
const styles = fs.readFileSync('styles.css', 'utf8');
if (!styles.includes('button.chip{min-height:44px}')) throw new Error('Filter chips must retain a 44px minimum touch target');
if (!(index.indexOf('official-classification.js') >= 0 && index.indexOf('official-classification.js') < index.indexOf('app.js'))) {
  throw new Error('Official classification script must load before app.js');
}
const build = fs.readFileSync('build.mjs', 'utf8');
const serviceWorker = fs.readFileSync('sw.js', 'utf8');
if (!build.includes('official-classification.js')) throw new Error('Build does not include official-classification.js');
if (!serviceWorker.includes('official-classification.js') || !serviceWorker.includes('morchidtarbiya-v12')) {
  throw new Error('Service worker does not cache the official taxonomy at v12');
}
const report = fs.readFileSync('QCM-CLASSIFICATION.md', 'utf8');
if (!report.includes('56') || !report.includes('مجموعة') || !report.includes('محور')) {
  throw new Error('QCM classification report is missing or incomplete');
}
const routes = JSON.parse(fs.readFileSync('public/manus-routes.json', 'utf8'));
for (const path of ['/#qcm', '/#theories', '/#inclusive', '/#resources', '/#lessons', '/#path']) {
  if (!routes.routes.some(route => route.path === path)) throw new Error(`Missing hash route: ${path}`);
}
console.log(`content checks ok: ${data.qcm.length} QCM; groups ${JSON.stringify(groupCounts)}; axes ${JSON.stringify(axisCounts)}; answers ${answerDistribution.join('/')}`);
