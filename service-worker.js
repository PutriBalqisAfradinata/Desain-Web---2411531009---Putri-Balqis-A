const CACHE_NAME = 'balqis-pwa-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/style.css',
  '/balqis.jpg',
  '/offline.html'
];

// Instalasi Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Fetch (ambil file dari cache saat offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((res) => res || caches.match('/offline.html'))
    )
  );
});
