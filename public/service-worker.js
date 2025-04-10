// public/service-worker.js

// This is the service worker file
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('todo-app-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/favicon.ico',
        '/_next/static/chunks/main.js',
        '/_next/static/chunks/webpack.js',
        // Add other important resources (CSS, JS, images, etc.)
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((response) => {
          return caches.open('todo-app-cache').then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
