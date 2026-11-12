// ExPropria — service worker. A app guarda-se no aparelho (reserva 'expropria-app') e abre sem rede.
// A verificação de versão nova é feita pela própria app (checkAppUpdate), que atualiza a reserva e mostra «Atualizar».
// O pdf.js (cdnjs), usado para ler anexos em PDF, fica também guardado na 1.ª utilização.
const CACHE = 'expropria-app';
const ASSETS = ['index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.hostname === 'cdnjs.cloudflare.com') {
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => hit || fetch(req).then(res => { if (res && res.ok) c.put(req, res.clone()); return res; }))));
    return;
  }
  if (u.origin !== location.origin) return;                 // mapas, etc.: direto à rede
  if (u.searchParams.has('chk')) return;                    // verificação de versão: sempre à rede
  const key = req.mode === 'navigate' ? new URL('index.html', self.registration.scope).href : req;
  e.respondWith(
    caches.open(CACHE).then(c => c.match(key).then(hit => hit || fetch(req).then(res => {
      if (res && res.ok) c.put(key, res.clone());
      return res;
    })))
  );
});
