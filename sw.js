if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let t={};const f=e=>n(e,r),c={module:{uri:r},exports:t,require:f};i[r]=Promise.all(s.map((e=>c[e]||f(e)))).then((e=>(o(...e),t)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-23aa82f2.js",revision:null},{url:"assets/workbox-window.prod.es5-295a6886.js",revision:null},{url:"index.html",revision:"8a7aecc1400d23a86ceebf8eb4f84071"},{url:"icon-192x192.png",revision:"d0c666c0bdf78bc1bfedb34b01503760"},{url:"icon-512x512.png",revision:"58a324adc8e12ef22b9e4fcc40a5c79f"},{url:"icon-512x512-mask.png",revision:"199c42af945e7219ecb4f3f43587f101"},{url:"manifest.webmanifest",revision:"5eaba298ff7d9f5ef36088a2aaa03f79"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
