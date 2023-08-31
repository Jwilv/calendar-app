importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
workbox.loadModule('workbox-background-sync')

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const { registerRoute } = workbox.routing
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies
const { BackgroundSyncPlugin } = workbox.backgroundSync;

const cacheFirstCache = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
]

registerRoute(
  ({ request, url }) => {
    return cacheFirstCache.includes(url.pathname)
  },
  new CacheFirst(),
);

const cacheNetworkFirst = [
  '/api/auth/renew',
  '/api/events'
]

registerRoute(
  ({ request, url }) => {
    return cacheNetworkFirst.includes(url.pathname)
  },
  new NetworkFirst(),
);

const bgSyncPluginPost = new BackgroundSyncPlugin('posts-offline', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new NetworkOnly({
    plugins: [bgSyncPluginPost],
  }),
  'POST'
);

const bgSyncPluginPut = new BackgroundSyncPlugin('puts-offline', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  new RegExp('http://localhost:4000/api/events/'),
  new NetworkOnly({
    plugins: [bgSyncPluginPost],
  }),
  'PUT'
);

const bgSyncPluginDelete = new BackgroundSyncPlugin('deletes-offline', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  new RegExp('http://localhost:4000/api/events/'),
  new NetworkOnly({
    plugins: [bgSyncPluginPost],
  }),
  'DELETE'
);