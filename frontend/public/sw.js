// KidsLearn Service Worker
// Version-based cache key — bump this string on each new deployment
const CACHE_VERSION = 'kidslearn-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// App shell assets to pre-cache on install
const APP_SHELL = [
  '/',
  '/manifest.json',
  '/assets/generated/icon-pwa-192.dim_192x192.png',
  '/assets/generated/icon-pwa-512.dim_512x512.png',
  '/assets/generated/kidslearn-logo.dim_256x256.png',
  '/assets/generated/hero-banner.dim_1200x400.png',
];

// URLs that should never be cached (Internet Identity auth flows, canister API calls)
const NEVER_CACHE_PATTERNS = [
  /identity\.ic0\.app/,
  /identity\.internetcomputer\.org/,
  /\/api\/v2\//,
  /\?canisterId=/,
  /ic0\.app/,
  /icp0\.io/,
  /raw\.icp0\.io/,
];

function shouldNeverCache(url) {
  return NEVER_CACHE_PATTERNS.some((pattern) => pattern.test(url));
}

// ── Install: pre-cache the app shell ─────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(APP_SHELL);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        // Don't fail install if some assets are missing
        console.warn('[SW] Pre-cache failed for some assets:', err);
        return self.skipWaiting();
      })
  );
});

// ── Activate: clean up old caches ────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// ── Fetch: network-first for API/auth, cache-first for static assets ─────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = request.url;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Never cache Internet Identity or canister API calls
  if (shouldNeverCache(url)) return;

  // For navigation requests (HTML pages) — network first, fall back to cached shell
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const cloned = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, cloned));
          }
          return response;
        })
        .catch(() => {
          return caches.match('/') || caches.match(request);
        })
    );
    return;
  }

  // For static assets (images, fonts, scripts, styles) — cache first, then network
  if (
    url.includes('/assets/') ||
    url.endsWith('.png') ||
    url.endsWith('.jpg') ||
    url.endsWith('.jpeg') ||
    url.endsWith('.svg') ||
    url.endsWith('.woff2') ||
    url.endsWith('.woff') ||
    url.endsWith('.css') ||
    url.endsWith('.js')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const cloned = response.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, cloned));
            }
            return response;
          })
          .catch(() => cached);
      })
    );
    return;
  }

  // Default: network first, fall back to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const cloned = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, cloned));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
