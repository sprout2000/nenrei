try{self["workbox:core:6.2.4"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:6.2.4"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class r{constructor(e,t,r="GET"){this.handler=s(t),this.match=e,this.method=r}setCatchHandler(e){this.catchHandler=s(e)}}class n extends r{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class o{constructor(){this.t=new Map,this.o=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const r=s.origin===location.origin,{params:n,route:o}=this.findMatchingRoute({event:t,request:e,sameOrigin:r,url:s});let i=o&&o.handler;const a=e.method;if(!i&&this.o.has(a)&&(i=this.o.get(a)),!i)return;let c;try{c=i.handle({url:s,request:e,event:t,params:n})}catch(e){c=Promise.reject(e)}const f=o&&o.catchHandler;return c instanceof Promise&&(this.i||f)&&(c=c.catch((async r=>{if(f)try{return await f.handle({url:s,request:e,event:t,params:n})}catch(e){e instanceof Error&&(r=e)}if(this.i)return this.i.handle({url:s,request:e,event:t});throw r}))),c}findMatchingRoute({url:e,sameOrigin:t,request:s,event:r}){const n=this.t.get(s.method)||[];for(const o of n){let n;const i=o.match({url:e,sameOrigin:t,request:s,event:r});if(i)return n=i,(Array.isArray(n)&&0===n.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:o,params:n}}return{}}setDefaultHandler(e,t="GET"){this.o.set(t,s(e))}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let i;const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},c=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),f=e=>e||c(a.precache),l=e=>e||c(a.runtime);function h(e,t){const s=t();return e.waitUntil(s),s}try{self["workbox:precaching:6.2.4"]&&_()}catch(e){}function u(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:r}=e;if(!r)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(r,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(r,location.href),o=new URL(r,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:o.href}}class d{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class b{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this.l.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this.l=e}}let w;async function p(e,s){let r=null;if(e.url){r=new URL(e.url).origin}if(r!==self.location.origin)throw new t("cross-origin-copy-response",{origin:r});const n=e.clone(),o={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(o):o,a=function(){if(void 0===w){const e=new Response("");if("body"in e)try{new Response(e.body),w=!0}catch(e){w=!1}w=!1}return w}()?n.body:await n.blob();return new Response(a,i)}function v(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class y{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const m=new Set;try{self["workbox:strategies:6.2.4"]&&_()}catch(e){}function g(e){return"string"==typeof e?new Request(e):e}class R{constructor(e,t){this.h={},Object.assign(this,t),this.event=t.event,this.u=e,this.p=new y,this.v=[],this.m=[...e.plugins],this.g=new Map;for(const e of this.m)this.g.set(e,{});this.event.waitUntil(this.p.promise)}async fetch(e){const{event:s}=this;let r=g(e);if("navigate"===r.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?r.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))r=await e({request:r.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const o=r.clone();try{let e;e=await fetch(r,"navigate"===r.mode?void 0:this.u.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:o,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:o.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=g(e);let s;const{cacheName:r,matchOptions:n}=this.u,o=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},n),{cacheName:r});s=await caches.match(o,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:r,matchOptions:n,cachedResponse:s,request:o,event:this.event})||void 0;return s}async cachePut(e,s){const r=g(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const o=await this.getCacheKey(r,"write");if(!s)throw new t("cache-put-with-no-response",{url:(i=o.url,new URL(String(i),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var i;const a=await this.R(s);if(!a)return!1;const{cacheName:c,matchOptions:f}=this.u,l=await self.caches.open(c),h=this.hasCallback("cacheDidUpdate"),u=h?await async function(e,t,s,r){const n=v(t.url,s);if(t.url===n)return e.match(t,r);const o=Object.assign(Object.assign({},r),{ignoreSearch:!0}),i=await e.keys(t,o);for(const t of i)if(n===v(t.url,s))return e.match(t,r)}(l,o.clone(),["__WB_REVISION__"],f):null;try{await l.put(o,h?a.clone():a)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of m)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:u,newResponse:a.clone(),request:o,event:this.event});return!0}async getCacheKey(e,t){if(!this.h[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=g(await e({mode:t,request:s,event:this.event,params:this.params}));this.h[t]=s}return this.h[t]}hasCallback(e){for(const t of this.u.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this.u.plugins)if("function"==typeof t[e]){const s=this.g.get(t),r=r=>{const n=Object.assign(Object.assign({},r),{state:s});return t[e](n)};yield r}}waitUntil(e){return this.v.push(e),e}async doneWaiting(){let e;for(;e=this.v.shift();)await e}destroy(){this.p.resolve(null)}async R(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class q extends class{constructor(e={}){this.cacheName=l(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,r="params"in e?e.params:void 0,n=new R(this,{event:t,request:s,params:r}),o=this.q(n,s,t);return[o,this.U(o,n,s,t)]}async q(e,s,r){let n;await e.runCallbacks("handlerWillStart",{event:r,request:s});try{if(n=await this.L(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const o of e.iterateCallbacks("handlerDidError"))if(n=await o({error:t,event:r,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:r,request:s,response:n});return n}async U(e,t,s,r){let n,o;try{n=await e}catch(o){}try{await t.runCallbacks("handlerDidRespond",{event:r,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(o=e)}if(await t.runCallbacks("handlerDidComplete",{event:r,request:s,response:n,error:o}),t.destroy(),o)throw o}}{constructor(e={}){e.cacheName=f(e.cacheName),super(e),this._=!1!==e.fallbackToNetwork,this.plugins.push(q.copyRedirectedCacheableResponsesPlugin)}async L(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this.C(e,t):await this.k(e,t))}async k(e,s){let r;const n=s.params||{};if(!this._)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const t=n.integrity,o=e.integrity,i=!o||o===t;r=await s.fetch(new Request(e,{integrity:o||t})),t&&i&&(this.O(),await s.cachePut(e,r.clone()))}return r}async C(e,s){this.O();const r=await s.fetch(e);if(!await s.cachePut(e,r.clone()))throw new t("bad-precaching-response",{url:e.url,status:r.status});return r}O(){let e=null,t=0;for(const[s,r]of this.plugins.entries())r!==q.copyRedirectedCacheableResponsesPlugin&&(r===q.defaultPrecacheCacheabilityPlugin&&(e=s),r.cacheWillUpdate&&t++);0===t?this.plugins.push(q.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}q.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},q.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await p(e):e};class U{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this.N=new Map,this.j=new Map,this.K=new Map,this.u=new q({cacheName:f(e),plugins:[...t,new b({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.u}precache(e){this.addToCacheList(e),this.S||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.S=!0)}addToCacheList(e){const s=[];for(const r of e){"string"==typeof r?s.push(r):r&&void 0===r.revision&&s.push(r.url);const{cacheKey:e,url:n}=u(r),o="string"!=typeof r&&r.revision?"reload":"default";if(this.N.has(n)&&this.N.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.N.get(n),secondEntry:e});if("string"!=typeof r&&r.integrity){if(this.K.has(e)&&this.K.get(e)!==r.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this.K.set(e,r.integrity)}if(this.N.set(n,e),this.j.set(n,o),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return h(e,(async()=>{const t=new d;this.strategy.plugins.push(t);for(const[t,s]of this.N){const r=this.K.get(s),n=this.j.get(t),o=new Request(t,{integrity:r,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:o,event:e}))}const{updatedURLs:s,notUpdatedURLs:r}=t;return{updatedURLs:s,notUpdatedURLs:r}}))}activate(e){return h(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this.N.values()),r=[];for(const n of t)s.has(n.url)||(await e.delete(n),r.push(n.url));return{deletedURLs:r}}))}getURLsToCacheKeys(){return this.N}getCachedURLs(){return[...this.N.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.N.get(t.href)}getIntegrityForCacheKey(e){return this.K.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}let x;const L=()=>(x||(x=new U),x);class E extends r{constructor(e,t){super((({request:s})=>{const r=e.getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:r=!0,urlManipulation:n}={}){const o=new URL(e,location.href);o.hash="",yield o.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(o,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(r){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:o});for(const t of e)yield t.href}}(s.url,t)){const t=r.get(n);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}function C(e){const s=L();!function(e,s,a){let c;if("string"==typeof e){const t=new URL(e,location.href);c=new r((({url:e})=>e.href===t.href),s,a)}else if(e instanceof RegExp)c=new n(e,s,a);else if("function"==typeof e)c=new r(e,s,a);else{if(!(e instanceof r))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=e}(i||(i=new o,i.addFetchListener(),i.addCacheListener()),i).registerRoute(c)}(new E(s,e))}var k;self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim())),k={},function(e){L().precache(e)}([{url:"app.css",revision:"e9c848ae64a7c4ea61935e07da4a158f"},{url:"app.js",revision:"ab2fe94ef93ff8bee575ab4036ad8d57"},{url:"app.js.LICENSE.txt",revision:"a350bf6489a552921fc10f57c57170a5"},{url:"apple-icon-192.png",revision:"4bc1735e45d36923021b3749a846b1a9"},{url:"assets/roboto-all-300-normal.woff",revision:"130eafc23a987a6cf560c9b69af84818"},{url:"assets/roboto-all-400-normal.woff",revision:"73f26bf98a715ecab4d2287ff3a02ad0"},{url:"assets/roboto-all-500-normal.woff",revision:"08926d7a008503f9c640b1772c225476"},{url:"assets/roboto-all-700-normal.woff",revision:"8b2b2aae46819bb8c37c438760dbb4f6"},{url:"assets/roboto-cyrillic-300-normal.woff2",revision:"4a2f6d1316cc560ede07d3334d3b486a"},{url:"assets/roboto-cyrillic-400-normal.woff2",revision:"ba2c6cb0af81f8da49a960db84f26b7c"},{url:"assets/roboto-cyrillic-500-normal.woff2",revision:"ad72d5d4f30e8740d5e7aa4ba3348aa4"},{url:"assets/roboto-cyrillic-700-normal.woff2",revision:"37afd1fecbffb80a9eded06f4bb964b8"},{url:"assets/roboto-cyrillic-ext-300-normal.woff2",revision:"607808ee335a962bdfa989bbfd5e8c57"},{url:"assets/roboto-cyrillic-ext-400-normal.woff2",revision:"2e0b8660b87034ecf56aa9f488fbc08e"},{url:"assets/roboto-cyrillic-ext-500-normal.woff2",revision:"d697abd346b57baaaa3c64733e998c6a"},{url:"assets/roboto-cyrillic-ext-700-normal.woff2",revision:"638fd23bbc8523124320a4bee32cc43b"},{url:"assets/roboto-greek-300-normal.woff2",revision:"203e97b336d3bc83c8b492a9868d5574"},{url:"assets/roboto-greek-400-normal.woff2",revision:"22786f243202d7912399ffd10c76fe78"},{url:"assets/roboto-greek-500-normal.woff2",revision:"89de9101b10a3fd497fef480319ff743"},{url:"assets/roboto-greek-700-normal.woff2",revision:"52df702db98aa7138730d8ef06b3a71c"},{url:"assets/roboto-greek-ext-300-normal.woff2",revision:"853ac2aeeb42298d3b87f80fdf1f9486"},{url:"assets/roboto-greek-ext-400-normal.woff2",revision:"5cff07beab63ec777fc73ac0483811b0"},{url:"assets/roboto-greek-ext-500-normal.woff2",revision:"643470710a60fdc4a1c3df732b114ef5"},{url:"assets/roboto-greek-ext-700-normal.woff2",revision:"1a7d7a36c39d76fb49a80f1b51baf065"},{url:"assets/roboto-latin-300-normal.woff2",revision:"80fe119e5efa3911b9d61b265f723b3d"},{url:"assets/roboto-latin-400-normal.woff2",revision:"aa23b7b4bcf2b8f0e876106bb3de69c6"},{url:"assets/roboto-latin-500-normal.woff2",revision:"f00e7e4432f7c70d8c97efbe2c50d43b"},{url:"assets/roboto-latin-700-normal.woff2",revision:"bf28241e67511184c14dbd0ef7d39f91"},{url:"assets/roboto-latin-ext-300-normal.woff2",revision:"065438c98de2b7f979decf5d7e3eb8a0"},{url:"assets/roboto-latin-ext-400-normal.woff2",revision:"718dded3393324e992b225ac61329e0c"},{url:"assets/roboto-latin-ext-500-normal.woff2",revision:"dd464b28ac4bc3d57d9336cf31fde8f1"},{url:"assets/roboto-latin-ext-700-normal.woff2",revision:"01a68cca6394bb55312ae1d723285d73"},{url:"assets/roboto-vietnamese-300-normal.woff2",revision:"d47048a60dc372aa9776bb0b816bb238"},{url:"assets/roboto-vietnamese-400-normal.woff2",revision:"756af8e5560d200e53b52b1ff70f2ad0"},{url:"assets/roboto-vietnamese-500-normal.woff2",revision:"b32ad0e3f979400d3653dd13459777ae"},{url:"assets/roboto-vietnamese-700-normal.woff2",revision:"371c52ef9af49885977af6fbffe823f9"},{url:"favicon.ico",revision:"fca9bc6408e0bc256adb7eacee33fcec"},{url:"icon-144.png",revision:"720d8da9f3f5ee7e9a5f479a47e4dfb1"},{url:"icon-192.png",revision:"34644ea6fbf32ca9e8bc7ece581694f9"},{url:"icon-288.png",revision:"0843379c882a9a60016e2c4d5842bedd"},{url:"icon-48.png",revision:"18cad903a0a0d8d1754be15d0697f51c"},{url:"icon-512.png",revision:"08ad9fce30a55298c9bf26131c6b2ec7"},{url:"icon-64.png",revision:"b877f9c98200988fc7965ebbdea95f65"},{url:"icon-96.png",revision:"0c3488d096cf4ad1910dbf158ac3e7f1"},{url:"index.html",revision:"db243a7c990cb192e5bca5116de23239"},{url:"manifest.json",revision:"4b69147e0b9a613aad29c555478499c9"},{url:"mstile-icon-128.png",revision:"5d6196615012e5ef493dcf9e6b4ab7ad"},{url:"mstile-icon-270.png",revision:"6568f164104e03ba7019e1fe77b3a944"},{url:"mstile-icon-558-270.png",revision:"4cbf39fc4f1cf0cbb852c6b5bad87f93"},{url:"mstile-icon-558.png",revision:"0b676dc7d8e3b3cb4b428d528f4b8ec6"},{url:"ogp.png",revision:"7deebbf65ea3bb5806966ec43dd0d74c"},{url:"screenshot.png",revision:"8d0371bef20d5482c9ad0c974b0eb16f"}]),C(k);
