// Registering service worker

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('../sw-cached_pages.js')
        .then (reg => console.log('Service Worker: registered'))
        .catch(err => console.log(`Service worker: Error: ${err}`))
    })
}

