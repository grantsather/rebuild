/* Rebuild service worker — network-first for the app shell so updates always
   reach the device when online, with a cached fallback so it still launches
   offline (e.g. at the gym). Cross-origin requests (Supabase, esm.sh) are left
   to the network so synced data is never stale. */
const CACHE = 'rebuild-v3';
const SHELL = ['./', './index.html'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {})));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  // Only handle same-origin (the app shell). Let Supabase/CDN go straight to network.
  if (url.origin !== self.location.origin) return;
  // Network-first: always try the freshest shell, cache it, fall back to cache offline.
  e.respondWith(
    fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
  );
});
