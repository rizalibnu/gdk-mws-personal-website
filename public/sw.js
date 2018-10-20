const version = "1.0.26";
const cacheName = `mws-rizalibnu-${version}`;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/project1/add2numbers',
        '/project1/add2numbers.html',
        '/project1/add2numbers.js',
        'https://fonts.googleapis.com/css?family=Dosis',
        '/project2',
        '/project2/index.html',
        '/scripts/main.js',
        '/styles/main.css',
        '/images/add2numbers-screenshot.png',
        '/images/gdk-icon.png',
        '/images/gdk-logo.png',
        '/images/mapbox-screenshot.png',
        '/images/profile-picture.jpg',
        '/project2/images/monas.jpg',
        'https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css',
        'https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.js',
      ]))
  );
});

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});