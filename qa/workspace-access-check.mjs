import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../workspace-access.js', import.meta.url), 'utf8');

function run(protocol, hostname) {
  const redirects = [];
  const context = {
    location: { protocol, hostname, replace: value => redirects.push(value) },
    document: { documentElement: { style: {} } },
    Set,
  };
  vm.runInNewContext(source, context);
  return { redirects, display: context.document.documentElement.style.display || '' };
}

const local = run('http:', '127.0.0.1');
const file = run('file:', '');
const publicSite = run('https:', 'kova.app');

if (local.redirects.length || file.redirects.length) throw new Error('Owner-local Workspace was blocked');
if (publicSite.display !== 'none' || publicSite.redirects[0] !== 'index.html#workspace-private') throw new Error('Public Workspace route was not blocked');

console.log(JSON.stringify({ local: 'PASS', file: 'PASS', publicDomainRedirect: publicSite.redirects[0], result: 'PASS' }, null, 2));
