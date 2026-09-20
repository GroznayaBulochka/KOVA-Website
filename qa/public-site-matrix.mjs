import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const legalOnly = process.argv[2] === 'legal';
const output = resolve(root, `qa/artifacts/public-review${legalOnly ? '-legal-final' : ''}`);
await mkdir(output, { recursive: true });
const pages = ['index', 'status', 'roadmap', 'updates', 'security', 'contact', 'privacy', 'terms', 'cookies', '404'];
const cases = pages.flatMap(page => [
  { page, lang:'pl', width:360, height:800 },
  { page, lang:'en', width:768, height:1024 },
  { page, lang:'ru', width:1440, height:900 }
]);
cases.push({ page:'index', lang:'ru', width:320, height:700 }, { page:'index', lang:'pl', width:1440, height:1000, mode:'full' }, { page:'index', lang:'pl', width:390, height:844, mode:'cookies' }, { page:'index', lang:'ru', width:360, height:640, mode:'video' }, { page:'workspace', lang:'pl', width:390, height:844 }, { page:'workspace', lang:'pl', width:1440, height:900 });
const results = [];
for (const entry of cases.filter(entry => !legalOnly || ['privacy','terms'].includes(entry.page))) {
  const id = `${entry.page}-${entry.lang}-${entry.width}${entry.mode ? '-' + entry.mode : ''}`;
  const args = ['qa/site-smoke.mjs', `http://127.0.0.1:4173/${entry.page}.html?lang=${entry.lang}`, `${output}/${id}.png`, String(entry.width), String(entry.height), entry.mode || ''];
  const started = new Date().toISOString();
  const result = spawnSync(process.execPath, args, { cwd:root, encoding:'utf8', timeout:60000 });
  await writeFile(`${output}/${id}.log`, `${result.stdout || ''}\n${result.stderr || ''}${result.error ? '\n' + result.error : ''}`);
  results.push({ id, started, command:`node ${args.join(' ')}`, cwd:root, exitCode:result.status, passed:result.status === 0, log:`${output}/${id}.log`, screenshot:`${output}/${id}.png` });
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
  console.log(`${result.status === 0 ? 'PASS' : 'FAIL'} ${id} (exit ${result.status})`);
}
const failed = results.filter(result => !result.passed);
console.log(JSON.stringify({ total:results.length, passed:results.length - failed.length, failed:failed.length, report:`${output}/results.json` }));
if (failed.length) process.exitCode = 1;
