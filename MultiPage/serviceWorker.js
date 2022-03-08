/*jshint esversion: 6 */

const PRECACHE = 'precache-v1';
const OFFLINE_VERSION = 1;
const OFFLINE_URL = '/404.html';
const RUNTIME = 'runtime';
const CACHE_NAME = 'budget01';
const URLS_CACHE_ONLY = [
    "404.html"
];
const PRECACHE_URLS = [
    "index.html",
	"favicon.ico",
	"CascadingStyleSheets/style.css",
    "JavaScript/jquery-3.6.0.min.js",
	"JavaScript/function.js",
	"Javascript/RGraph/RGraph.common.core.js",
	"Javascript/RGraph/RGraph.common.sheets.js",
	"Javascript/RGraph/RGraph.common.key.js",
	"Javascript/RGraph/RGraph.common.dynamic.js",
	"Javascript/RGraph/RGraph.common.tooltips.js",
	"Javascript/RGraph/RGraph.meter.js",
	"Javascript/RGraph/RGraph.bar.js",
	"Javascript/RGraph/RGraph.pie.js"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(PRECACHE)
			.then(cache => cache.addAll(PRECACHE_URLS))
			.then(self.skipWaiting());
        })
    );
});

self.addEventListener("fetch", function (event) {
    const requestURL = new URL(event.request.url);

    if (requestURL.pathname === '/') {
      event.respondWith(getByNetworkFallingBackByCache("46index.html"));
    } else if (URLS_OVER_NETWORK_WITH_CACHE_FALLBACK.includes(requestURL.href) || URLS_OVER_NETWORK_WITH_CACHE_FALLBACK.includes(requestURL.pathname)) {
        event.respondWith(getByNetworkFallingBackByCache(event.request));
    } else if (URLS_CACHE_ONLY.includes(requestURL.href) || URLS_CACHE_ONLY.includes(requestURL.pathname)) {
        event.respondWith(getByCacheOnly(event.request));
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (CACHE_NAME !== cacheName && cacheName.startsWith("budget")) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

/**
 * 1. We fetch the request over the network
 * 2. If successful we add the new response to the cache
 * 3. If failed we return the result from the cache
 *
 * @param request
 * @param showAlert
 * @returns Promise
 */
const getByNetworkFallingBackByCache = (request, showAlert = false) => {
    return caches.open(CACHE_NAME).then((cache) => {
        return fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }).catch(() => {
            if (showAlert) {
                alert('Inget nätverk. Endast lokalt lagrad data.');
            }

            return caches.match(request);
        });
    });
};

/**
 * Get from cache
 *
 * @param request
 * @returns Promise
 */
const getByCacheOnly = (request) => {
    return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
            return response;
        });
    });
};