importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
workbox.loadModule('workbox-background-sync')

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const { registerRoute } = workbox.routing
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies
const { BackgroundSyncPlugin } = workbox.backgroundSync;

registerRoute(
  new RegExp('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'),
  new CacheFirst(),
);

registerRoute(
  new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'),
  new CacheFirst(),
);

registerRoute(
  new RegExp('http://localhost:4000/api/auth/renew'),
  new NetworkFirst(),
);

registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new NetworkFirst(),
);

const bgSyncPlugin = new BackgroundSyncPlugin('posts-offline', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);