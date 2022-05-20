var CACHE_NAME = 'cache';
var filesToCache = [
    'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
    '/',
    '/javascripts/canvas.js',
    '/javascripts/database.js',
    '/javascripts/index.js',
    '/javascripts/indexedDB.js',
    '/javascripts/jquery.min.js',
    '/javascripts/knowledgeGraph.js',
    '/javascripts/service worker register.js',
    '/javascripts/story_database.js',
    '/stylesheets/list.css',
    '/stylesheets/style.css',

];

/**
 * installation event: it adds all the files to be cached
 */
// install and activate
self.addEventListener('install', function (event) {
    console.log('[ServiceWorker] Install');
    event.waitUntil(async function(){
        console.log('[ServiceWorker] Removing old cache');
        caches.delete(CACHE_NAME);
// Removing old cache
        console.log('[ServiceWorker] Caching app shell');
        cache = await caches.open(CACHE_NAME);
        return cache.addAll(filesToCache);
    }());
});

//  receives a fetch request
self.addEventListener('fetch', function(event) {

    console.log('[Service Worker] Fetch', event.request.url);
// chrome-extension
    if (event.request.url.indexOf('chrome-extension') == 0){
        // Bypass extention
        event.respondWith(fetch(event.request));
        return;
    }
// kgsearch.googleapis.com
    if (event.request.url.indexOf('kgsearch.googleapis.com') == 0){
        // Bypass knowledge graph queries
        event.respondWith(fetch(event.request));
        return;
    }

    if (event.request.url.indexOf('socket.io/?') > -1){
        // Bypass socket io
        event.respondWith(fetch(event.request));
        return;
    }

    /*
    * The app is asking for app shell files. In this scenario the app uses the
    * "Cache, falling back to the network" offline strategy:
    * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
    */
    event.respondWith(async function () {
        response = await caches.match(event.request);

        // Cache hit - return response
        if (response) {
            return response;
        }

        response = await fetch(event.request);

        // Response wrong
        if (!response || response.status !== 200) {
            console.log(`Response error: [${response.status}]: ${response.statusText}`);
            return response
        }

        // put into the cache
        var responseToCache = response.clone();
        cache = await caches.open(CACHE_NAME)
        cache.put(event.request, responseToCache);

        return response;
    }());

});