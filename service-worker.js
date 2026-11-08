const CACHE='framecalc-v11-20261108';
const FILES=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('framecalc-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;
if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(event.request,cp))}return res}).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));return;}
event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request).then(res=>{if(res.ok)caches.open(CACHE).then(c=>c.put(event.request,res.clone()));return res})))
});
