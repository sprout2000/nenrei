if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const t=e=>n(e,o),l={module:{uri:o},exports:c,require:t};i[o]=Promise.all(s.map((e=>l[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-c231358b.css",revision:null},{url:"assets/index-d1eaa852.js",revision:null},{url:"assets/workbox-window.prod.es5-295a6886.js",revision:null},{url:"index.html",revision:"d936c1d168cfee23448d15cc5a446daa"},{url:"icon-192x192.png",revision:"d0c666c0bdf78bc1bfedb34b01503760"},{url:"icon-512x512.png",revision:"58a324adc8e12ef22b9e4fcc40a5c79f"},{url:"icon-512x512-mask.png",revision:"199c42af945e7219ecb4f3f43587f101"},{url:"manifest.webmanifest",revision:"9c7fa975c8054ef323c8b41f8b8619e6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
