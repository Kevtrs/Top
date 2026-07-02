importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBua6z4uJ4I-OsgVUV1FXcNVmLR2W9lUYA",
  authDomain: "top-fbcf6.firebaseapp.com",
  projectId: "top-fbcf6",
  storageBucket: "top-fbcf6.firebasestorage.app",
  messagingSenderId: "193857617352",
  appId: "1:193857617352:web:07f1e19b9b58ed4b0e14fd"
};

firebase.initializeApp(FIREBASE_CONFIG);

const messaging = firebase.messaging();
const DEFAULT_URL = "https://kevtrs.github.io/Top/";
const ICON_URL = "./letop-icon-192.png";

messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  const title = data.title || payload.notification?.title || "Le Top 🍿";
  const options = {
    body: data.body || data.message || payload.notification?.body || "Nouvelle recommandation reçue",
    icon: ICON_URL,
    badge: ICON_URL,
    tag: data.tag || "letop-reco",
    renotify: true,
    data: { url: data.url || DEFAULT_URL }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || DEFAULT_URL;

  event.waitUntil((async () => {
    const windowClients = await clients.matchAll({ type: "window", includeUncontrolled: true });
    const existing = windowClients.find(client => client.url.startsWith(DEFAULT_URL));
    if (existing) {
      await existing.focus();
      return;
    }
    await clients.openWindow(targetUrl);
  })());
});
