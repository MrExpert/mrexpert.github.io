
const cacheName = 'v2';

// Call install event

self.addEventListener('install', (e) => {
    console.log('service worker: Installed');
    
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
        fetch(e.request)
            .then(res => {
            // make copy or clone of response
            const resClone = res.clone();
            // open cache
            caches
            .open(cacheName)
            .then(cache => {
                // add response to cache
                cache.put(e.request, resClone);
            });
            return res;
        }) . catch(err => caches.match(e.request))
            .then( res => res)
    );
});