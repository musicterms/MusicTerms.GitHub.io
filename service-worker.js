var CACHE_NAME = 'musicterms';
var urlsToCache = [
    '/',
    '/app/',
    '/app/index.html',
    '/index.css',
    '/icon-smooth.png',
    '/index.html',
    '/index.html?redirect=no-delay',
    '/?add_to_home_screen',
    '/style.css',
    '/js/index.js',
    '/js/icon.js',
    '/js/events.js',
    '/js/page.js',
    '/js/search.js',
    '/icons/arrow_back_ios.svg',
    '/icons/book.svg',
    '/icons/bug.svg',
    '/icons/cancel.svg',
    '/icons/check.svg',
    '/icons/compass.svg',
    '/icons/cookies_off.svg',
    '/icons/diversity.svg',
    '/icons/docs.svg',
    '/icons/download.svg',
    '/icons/expand.svg',
    '/icons/experiment.svg',
    '/icons/expand_all.svg',
    '/icons/fingerprint.svg',
    '/icons/folder.svg',
    '/icons/forte.svg',
    '/icons/forward.svg',
    '/icons/github-mark.svg',
    '/icons/happy.svg',
    '/icons/help.svg',
    '/icons/home.svg',
    '/icons/info.svg',
    '/icons/language.svg',
    '/icons/lens_blur.svg',
    '/icons/letter_a.svg',
    '/icons/more.svg',
    '/icons/next.svg',
    '/icons/open_in_new.svg',
    '/icons/piano.svg',
    '/icons/placeholder.svg',
    '/icons/podium.svg',
    '/icons/public.svg',
    '/icons/reaction.svg',
    '/icons/refresh.svg',
    '/icons/search.svg',
    '/icons/settings.svg',
    '/icons/share.svg',
    '/icons/share_icon_ios.png',
    '/icons/sign_lang.svg',
    '/icons/sort.svg',
    '/icons/spellcheck.svg',
    '/icons/star_empty.svg',
    '/icons/star_full.svg',
    '/icons/supervised_user.svg',
    '/icons/supervisor_account.svg',
    '/icons/tick.svg',
    '/icons/timeline.svg',
    '/icons/timer.svg',
    '/icons/translate.svg',
    '/icons/tune.svg',
    '/icons/user.svg',
    '/icons/voice.svg',
    '/icons/voice_over.svg',
    '/fonts/PingFangSC.ttf',
    '/fonts/SFPro.ttf',
    '/en',
    '/en/',
    '/en/index.html',
    '/en/share.html',
    '/zh',
    '/zh/',
    '/zh/index.html',
    '/zh/share.html',
    '/zh-CN',
    '/zh-CN/',
    '/zh-CN/index.html',
    '/zh-CN/share.html',
    '/source',
    '/source/french',
    '/source/french/french.json',
    '/source/german',
    '/source/german/german.json',
    '/source/italian',
    '/source/italian/criticism.json',
    '/source/italian/directions.json',
    '/source/italian/dynamics.json',
    '/source/italian/g-terms.json',
    '/source/italian/instruments.json',
    '/source/italian/moods.json',
    '/source/italian/patterns.json',
    '/source/italian/roles.json',
    '/source/italian/staging.json',
    '/source/italian/techniques.json',
    '/source/italian/tempo.json',
    '/source/italian/voices.json',
    '/source/lang',
    '/source/lang/translate.js',
    '/source/terms',
    '/terms',
    '/terms/conditions.md',
    '/terms/privacy.md',
    '/terms/conditions.zh.md',
    '/terms/privacy.zh.md',
    '/terms/conditions.zh-CN.md',
    '/terms/privacy.zh-CN.md',
    '/source/terms/source.json',
    '/404.html',
    '/favicon.ico',
    '/manifest.json',
    '/language.html',
    '/terms.html',
    '/favicon.png',
    '/icons-192.png',
    '/img/desktop.png',
    '/fallback.html',
];

self.addEventListener('install', function (event) {
    for (var i = 0; i < urlsToCache.length; i++) {
        for (var j = 0; j < urlsToCache.length; j++) {
            if (urlsToCache[i] == urlsToCache[j] && i != j) {
                urlsToCache.splice(j, 1);
            }
        }
    }
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            }).then(function () {
                return self.skipWaiting();
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    event.waitUntil(
                        fetch(event.request)
                            .then(function (response) {
                                caches.open(CACHE_NAME)
                                    .then(function (cache) {
                                        cache.put(event.request, response.clone());
                                    });
                            }).catch(function () { return; })
                    );
                    return response;
                }

                return fetch(event.request).catch(function () {
                    return caches.match('/fallback.html');
                });
            })
    );
});

self.addEventListener('activate', function (event) {
    var cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});