const version = "1.0.43";
const cacheName = `mws-rizalibnu-${version}`;

const urlsToCaches = [
  '/',
  '/index.html',
  '/scripts/main.js',
  '/styles/main.css',
  '/images/add2numbers-screenshot.png',
  '/images/gdk-icon.png',
  '/images/gdk-logo.png',
  '/images/mapbox-screenshot.png',
  '/images/profile-picture.jpg',
  '/project1',
  '/project1/index.html',
  '/project1/scripts/add2numbers.js',
  '/project2',
  '/project2/index.html',
  '/project2/scripts/map.js',
  '/project2/images/monas.jpg',
  '/project3',
  '/project3/index.html',
  '/project3/scripts/map.js',
  '/project3/data/data.json',
  '/project3/images/baturaden.jpg',
  '/project3/images/curug-cipendok.jpg',
  '/project3/images/gunung-slamet.jpg',
  '/restaurant-review',
  '/restaurant-review/index.html',
  '/restaurant-review/css/styles.css',
  '/restaurant-review/js/dbhelper.js',
  '/restaurant-review/js/main.js',
  '/restaurant-review/js/restaurant_info.js',
  '/restaurant-review/restaurant?id=1',
  '/restaurant-review/restaurant?id=2',
  '/restaurant-review/restaurant?id=3',
  '/restaurant-review/restaurant?id=4',
  '/restaurant-review/restaurant?id=5',
  '/restaurant-review/restaurant?id=6',
  '/restaurant-review/restaurant?id=7',
  '/restaurant-review/restaurant?id=8',
  '/restaurant-review/restaurant?id=9',
  '/restaurant-review/restaurant?id=10',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(urlsToCaches))
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
    .then(response => {
      return response || fetch(event.request).then(response => {
        return caches.open(cacheName).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cache => {
          return cache.startsWith('mws-rizalibnu-') && cache !== cacheName;
        }).map(cache => {
          return caches.delete(cache);
        })
      );
    })
  );
});