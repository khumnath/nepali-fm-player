importScripts('https://unpkg.com/workbox-sw@0.0.2/build/importScripts/workbox-sw.dev.v0.0.2.js');
importScripts('https://unpkg.com/workbox-runtime-caching@1.3.0/build/importScripts/workbox-runtime-caching.prod.v1.3.0.js');
importScripts('https://unpkg.com/workbox-routing@1.3.0/build/importScripts/workbox-routing.prod.v1.3.0.js');

const assetRoute = new workbox.routing.RegExpRoute({
    regExp: new RegExp('^https://khumnath.github.io/nepali-fm-player/*'),
    handler: new workbox.runtimeCaching.CacheFirst()
});

const router = new workbox.routing.Router();
//router.addFetchListener();
router.registerRoutes({routes: [assetRoute]});
router.setDefaultHandler({
    handler: new workbox.runtimeCaching.CacheFirst()
});
