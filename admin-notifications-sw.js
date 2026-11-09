/* MOHAB STORE admin push service worker */
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAVV1wjaYY1saP5Op9TdY_Snrt7DQcXSwU",
  authDomain: "mohab-store.firebaseapp.com",
  databaseURL: "https://mohab-store-default-rtdb.firebaseio.com",
  projectId: "mohab-store",
  storageBucket: "mohab-store.firebasestorage.app",
  messagingSenderId: "883837761283",
  appId: "1:883837761283:web:87c2c19ea0d0f224eb5b36"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage(payload => {
  const data = payload.data || {};
  const notification = payload.notification || {};
  const title = notification.title || data.title || 'MOHAB STORE';
  const options = {
    body: notification.body || data.body || 'وصل طلب جديد إلى لوحة التحكم.',
    icon: 'https://g.top4top.io/p_39146kcfj0.png',
    badge: 'https://g.top4top.io/p_39146kcfj0.png',
    data: { url: data.url || './' },
    tag: data.tag || 'mohab-admin-notification',
    renotify: false
  };
  self.registration.showNotification(title, options);
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || './';
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list => {
    for (const client of list) {
      if ('focus' in client) { client.navigate(target); return client.focus(); }
    }
    return clients.openWindow(target);
  }));
});
