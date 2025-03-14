const cacheID = "AppV1";
const contentToCache = [
    "/index.html",
    "/scripts/script.mjs",
    "/imgs/icons/noun-chef-192x192.png",
    "/imgs/icons/noun-chef-512x512.png",
    "/css/style.css",
    "/controller/addView.mjs",
    "/controller/editView.mjs",
    "/controller/controller.mjs",
    "/controller/homeView.mjs",
    "/controller/recipeView.mjs",
    "/controller/recipeView.mjs",
    "/view/addView.html",
    "/view/editView.html",
    "/view/homeView.html",
    "/view/recipeView.html",
    "/view/recipeView.html",
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        const cache = await caches.open(cacheID);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', (e) => {
    // Cache http and https only, skip unsupported chrome-extension:// and file://...
    if (!(
        e.request.url.startsWith('http:') || e.request.url.startsWith('https:')
    )) {
        return;
    }

    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) { return r };
        const response = await fetch(e.request);
        const cache = await caches.open(cacheID);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});