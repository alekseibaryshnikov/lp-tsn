self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('your-app-name').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/bundle.js',
        '/static/js/0.chunk.js',
        '/static/js/main.chunk.js',
        '/manifest.json',
        '/logo192.png',
        '/logo512.png',
      ]);
    }),
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    }),
  );
});
