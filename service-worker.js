const CACHE_NAME = 'blitzer-ee-v1';
const ASSETS = [ '/', '/index.html', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png' ];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)).then(self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin === location.origin) {
    e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
  } else {
    e.respondWith(fetch(e.request).catch(() => caches.match('/index.html')));
  }
});
