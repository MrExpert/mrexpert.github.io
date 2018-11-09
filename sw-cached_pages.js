
const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    './css/style.css',
    '/js/main.js'
]; 

// Call install event

self.addEventListener('install', (e) => {
    console.log('service worker: Installed');
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching files');
                cache.addAll(cacheAssets);
            })
            .then( () => self.skipWaiting() )
    );
});

// Call Activate event

self.addEventListener('activate', (e) => {
    console.log('service worker: Activated');
    // remove unwanted caches
    e.waitUntil (
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

// Call fetch event

self.addEventListener('fetch', e => {
    console.log('service worker fetching ');
    e.respondWith(
        fetch(e.request).catch( ()=> caches.match(e.request))
    )
})