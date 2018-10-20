/**
 * Register Service Worker
 */

let newWorker;
function showUpdateDialog() {
  const dialog = document.getElementById('update-dialog');
  dialog.className += " show";
  const overlay = document.querySelector('.modal-overlay');
  overlay.className += " show";
}
// The click event on the pop up notification
document.getElementById('reload').addEventListener('click', function(){
  newWorker.postMessage({ action: 'skipWaiting' });
});
if('serviceWorker' in navigator && ['localhost:1234'].indexOf(location.host) === -1) {
// if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      // A wild service worker has appeared in reg.installing!
      newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        // Has network.state changed?
        switch (newWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              // new update available
              console.log('service worker : new update available')
              showUpdateDialog();
            }
            // No update available
            break;
        }
      });
    });
  });
  let refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}