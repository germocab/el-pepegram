const CACHE_NAME = 'pepegram-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favs/site.webmanifest',
  '/favs/favicon-32x32.png',
  '/favs/favicon-16x16.png',
  '/favs/apple-touch-icon.png'
];

// Instalar
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activar
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Fetch (offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
