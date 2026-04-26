/* Konforme Service Worker — minimal cache-first shell with network fallback */
const VERSION = 'kf-v1-2026-04-26';
const SHELL = [
  '/',
  '/index.html',
  '/overlay.css',
  '/overlay.js',
  '/favicon.svg',
  '/manifest.json',
  '/offline.html',
  '/contact/qr-site.svg',
  '/contact/qr-vcard.svg',
  '/contact/qr-maps.svg',
  '/contact/qr-avis.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML navigations: network-first, fallback cached index, then offline
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)).catch(()=>{}); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match('/index.html')).then((r) => r || caches.match('/offline.html')))
    );
    return;
  }

  // Static assets (immutable hashed bundles, QR codes, icons): cache-first
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/contact/') || url.pathname.endsWith('.svg') || url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    e.respondWith(
      caches.match(req).then((r) => r || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy)).catch(()=>{});
        return res;
      }))
    );
    return;
  }
});
