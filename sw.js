if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const f=e=>i(e,r),c={module:{uri:r},exports:o,require:f};s[r]=Promise.all(n.map((e=>c[e]||f(e)))).then((e=>(t(...e),o)))}}define(["./workbox-21445d85"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.0137ce00.js",revision:"ab1eeda516ee012058c44242f5aa7772"},{url:"assets/index.bc1aabc8.css",revision:"4b5f91cf8f3b0d181f2a657f47ee0fe8"},{url:"assets/vendor.0daf6240.js",revision:"1370a77d92d664ab9453829de9d5ec08"},{url:"index.html",revision:"d514fdb9f69c5562f209b37e70ef10c1"},{url:"manifest.webmanifest",revision:"5217ca63a052bf70c87c9b740fb983c1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
