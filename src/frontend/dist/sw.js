// Kids Learn Service Worker
// Minimal online-only service worker for PWA installability.
// No caching — the app requires an active network connection at all times.

self.addEventListener('install', (event) => {
  // Skip waiting so the new SW activates immediately
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  // Claim all clients immediately
  event.waitUntil(self.clients.claim());
});

// No fetch handler — all requests go directly to the network.
// This ensures Internet Identity, canister API calls, and all app
// resources are never intercepted or cached by this service worker.
