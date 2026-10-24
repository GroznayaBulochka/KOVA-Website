import {createHash} from 'node:crypto';
export const sha256 = data => createHash('sha256').update(data).digest('hex');

// One deterministic version for the complete build, including its renderers.
// Query strings must be included in the hosting/CDN cache key.
export function buildVersion(inputs) {
  const hash=createHash('sha256');
  for(const [name,bytes] of [...inputs].sort(([a],[b])=>a.localeCompare(b))) {
    hash.update(name+'\0'+sha256(bytes)+'\0');
  }
  return hash.digest('hex').slice(0,20);
}

export function versionReferences(text,assets,version,{imagesOnly=false}={}) {
  return text.replace(/(?:assets\/[\w./-]+|locales\/[a-z]+\.json|legal\/[\w-]+\.md|[\w-]+\.(?:js|css|webmanifest))(?=[#"'`\s),]|$)/g,
    path=>assets.has(path)&&(!imagesOnly||path.startsWith('assets/'))?`${path}?v=${version}`:path);
}
