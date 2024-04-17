const cacheName = 'v1';

self.addEventListener('install', () => {
    // console.log('service worker installed');
});

self.addEventListener('activate', () => {
    // console.log('service worker activated');
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                const resClone = res.clone();
                caches.open(cacheName)
                    .then(cache => {
                        cache.put(e.request, resClone);
                    });
                return res;
            }).catch(err => caches.match(e.request).then(res => res))
    );
});
