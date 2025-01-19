const CACHE_NAME = "fittrack-cache-v1";

// Add all static assets that need to be cached
const ASSETS_TO_CACHE = [
	"/",
	"/new",
	"/profile",
	"/index.html",
	// Add your static assets (CSS, JS, images)
	"/manifest.json",
	// If you have any local images/icons, add them here
];

// Installation - cache all static assets
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(ASSETS_TO_CACHE);
		}),
	);
	// Activate worker immediately
	self.skipWaiting();
});

// Activate - clean up old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
	// Ensure service worker takes control of all pages immediately
	self.clients.claim();
});

// Fetch - handle requests with a "Cache First" strategy
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			// Return cached response if found
			if (cachedResponse) {
				return cachedResponse;
			}

			// Otherwise, fetch from network
			return fetch(event.request)
				.then((response) => {
					// Check if we received a valid response
					if (
						!response ||
						response.status !== 200 ||
						response.type !== "basic"
					) {
						return response;
					}

					// Clone the response as it can only be consumed once
					const responseToCache = response.clone();

					// Add the new response to cache
					caches.open(CACHE_NAME).then((cache) => {
						// Only cache same-origin requests
						if (event.request.url.startsWith(self.location.origin)) {
							cache.put(event.request, responseToCache);
						}
					});

					return response;
				})
				.catch(() => {
					// If both cache and network fail, return a fallback
					if (event.request.mode === "navigate") {
						return caches.match("/");
					}
					// You could return a default offline image/asset here
					// return caches.match('/offline.html');
				});
		}),
	);
});

// Listen for push notifications
self.addEventListener("push", (event) => {
	if (event.data) {
		// const options = {
		// 	body: event.data.text(),
		// 	icon: "/icon-192x192.png",
		// 	badge: "/icon-192x192.png",
		// };

		event.waitUntil(self.registration.showNotification("FitTrack", {}));
	}
});
