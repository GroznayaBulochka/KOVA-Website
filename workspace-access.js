(() => {
  'use strict';
  const localOwnerHosts = new Set(['localhost', '127.0.0.1', '::1']);
  const allowed = location.protocol === 'file:' || localOwnerHosts.has(location.hostname);
  if (!allowed) {
    document.documentElement.style.display = 'none';
    location.replace('index.html#workspace-private');
  }
})();
