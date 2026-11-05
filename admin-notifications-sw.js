/* MOHAB STORE notifications service worker */
'use strict';
self.addEventListener('install', event => { event.waitUntil(self.skipWaiting()); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
self.addEventListener('notificationclick', event => {
  const data = event.notification && event.notification.data ? event.notification.data : {};
  const target = data.url || './';
  event.notification.close();
  event.waitUntil((async () => {
    const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clientsList) {
      if (client.url && 'focus' in client) {
        await client.focus();
        if (target && 'navigate' in client) await client.navigate(new URL(target, self.location.origin).href);
        return;
      }
    }
    if (self.clients.openWindow) await self.clients.openWindow(new URL(target, self.location.origin).href);
  })());
});
