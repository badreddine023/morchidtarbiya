import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('data.js', 'utf8');
for (const [label, needle] of [
  ['QCM bank', 'D.qcm='],
  ['professional situations', 'D.situations='],
  ['flashcards', 'D.flashcards='],
  ['inclusive lesson', 'window.MORCHID_DATA.inclusive='],
  ['resource library', 'window.MORCHID_DATA.resources='],
]) {
  if (!source.includes(needle)) throw new Error(`Missing ${label}`);
}

const context = vm.createContext({ window: {}, Math, Date });
vm.runInContext(source, context, { filename: 'data.js' });
const extension = fs.readFileSync('theories-extension.js', 'utf8');
vm.runInContext(extension, context, { filename: 'theories-extension.js' });
const data = context.window.MORCHID_DATA;

if ((extension.match(/\{id:'/g) || []).length < 10) {
  throw new Error('Theory catalog is smaller than 10 cards');
}
if (data.qcm.length < 40) throw new Error(`QCM bank has only ${data.qcm.length} questions`);
for (const question of data.qcm) {
  if (question.options.length !== 4) {
    throw new Error(`${question.id} must have exactly four options; got ${question.options.length}`);
  }
  if (new Set(question.options).size !== 4) {
    throw new Error(`${question.id} has duplicate answer options`);
  }
  if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer > 3) {
    throw new Error(`${question.id} has an invalid correct-answer index`);
  }
  if (!question.theory_ids?.length) throw new Error(`${question.id} is not linked to a theory`);
}
const answerDistribution = [0, 0, 0, 0];
for (const question of data.qcm) answerDistribution[question.answer]++;
if (Math.max(...answerDistribution) - Math.min(...answerDistribution) > 1) {
  throw new Error(`Correct answers are not balanced: ${answerDistribution.join(', ')}`);
}

const app = fs.readFileSync('app.js', 'utf8');
for (const needle of [
  'state.examSetup',
  '60*1000',
  'D.situations',
  'D.flashcards',
  'theory-${q.theory_ids',
  'data-value="all">كل الحالات',
  'rerenderSearch(e.target)',
  'morchid-progress-v3',
  'window.confirm',
]) {
  if (!app.includes(needle)) throw new Error(`Missing app contract: ${needle}`);
}
const routes = JSON.parse(fs.readFileSync('public/manus-routes.json', 'utf8'));
for (const path of ['/#qcm', '/#theories', '/#inclusive', '/#resources']) {
  if (!routes.routes.some(route => route.path === path)) {
    throw new Error(`Missing hash route: ${path}`);
  }
}
console.log(`content contract checks ok: ${data.qcm.length} QCM, answer positions ${answerDistribution.join('/')}`);
