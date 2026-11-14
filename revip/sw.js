// Revip — service worker. A app guarda-se no aparelho (reserva 'revip-app') e abre sem rede.
// A verificação de versão nova é feita pela própria app (checkAppUpdate), que atualiza a reserva e mostra «Atualizar».
// indices.json vai sempre primeiro à rede (fica em reserva só para uso sem rede).
const CACHE = 'revip-app';
const ASSETS = ['index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (url.searchParams.has('chk')) return;                       // verificação de versão: sempre à rede
  if (url.pathname.endsWith('indices.json')) {                   // índices: rede primeiro, reserva se não houver rede
    e.respondWith(fetch(req).then(res => { if (res && res.ok) caches.open(CACHE).then(c => c.put('indices.json', res.clone())); return res; })
      .catch(() => caches.open(CACHE).then(c => c.match('indices.json'))));
    return;
  }
  const key = req.mode === 'navigate' ? new URL('index.html', self.registration.scope).href : req;
  e.respondWith(
    caches.open(CACHE).then(c => c.match(key).then(hit => hit || fetch(req).then(res => {
      if (res && res.ok) c.put(key, res.clone());
      return res;
    })))
  );
});
