if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,o)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let r={};const t=e=>n(e,l),a={module:{uri:l},exports:r,require:t};s[l]=Promise.all(i.map((e=>a[e]||t(e)))).then((e=>(o(...e),r)))}}define(["./workbox-32cc1b82"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/allPaths-gLeW_ftJ.js",revision:null},{url:"assets/allPathsLoader-ctxkL2sZ.js",revision:null},{url:"assets/blueprint-icons-16-As7MhKDx.svg",revision:null},{url:"assets/blueprint-icons-20-8lZxjX0E.svg",revision:null},{url:"assets/index-4XR6Z9hv.css",revision:null},{url:"assets/index-7lLlfVks.js",revision:null},{url:"assets/index-8aWh3mTb.js",revision:null},{url:"assets/index-KsG0Chs-.js",revision:null},{url:"assets/splitPathsBySizeLoader-fSVJnpxD.js",revision:null},{url:"index.html",revision:"975e771257c48aa8519d755ece0f9f6c"},{url:"mockServiceWorker.js",revision:"0139054b6162142422d093dada7bf158"},{url:"moose_logo_192x192.png",revision:"70969d9edc47daeba13721d87f8d0ec7"},{url:"moose_logo_512x512.png",revision:"0961e4afd4d2be451c305e9a306724d8"},{url:"moose_logo_favicon_32x32.png",revision:"260a09ffdd762fbaccdea2928ea4bd65"},{url:"registerSW.js",revision:"b50801ddf4c0d1a2aa3b34a047f7fed8"},{url:"moose_logo_192x192.png",revision:"70969d9edc47daeba13721d87f8d0ec7"},{url:"moose_logo_512x512.png",revision:"0961e4afd4d2be451c305e9a306724d8"},{url:"manifest.webmanifest",revision:"e1325074bc3d465fac7f03e55946ecc0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"))),e.registerRoute(/^https?.*/,new e.NetworkFirst({cacheName:"https-calls",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:150,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\.(?:png|jpg|jpeg|svg)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\.(?:js|css)$/,new e.StaleWhileRevalidate({cacheName:"static-resources",plugins:[]}),"GET")}));
