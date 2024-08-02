importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

self.addEventListener("install", function (e) {
    self.skipWaiting();
});

self.addEventListener("activate", function (e) {
    console.log("fcm service worker가 실행되었습니다.");
});

const firebaseConfig = {
    apiKey: "AIzaSyCHb066fa7lV7WEkS3X99iKFQyckiA2w_0",
    authDomain: "ubun2-e6c7c.firebaseapp.com",
    projectId: "ubun2-e6c7c",
    storageBucket: "ubun2-e6c7c.appspot.com",
    messagingSenderId: "408498099837",
    appId: "1:408498099837:web:fa471b78646341325a0314",
    measurementId: "G-MXXRE9PGE5"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(payload)
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.content,
        icon:  '/logo-192-192.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// 클릭 시 수행
self.addEventListener("notificationclick", function (event) {
    const url = "https://clicknbuy.co.kr/member/login"
    event.notification.close();
    event.waitUntil(self.clients.openWindow(url));
    // event.waitUntil(clients.openWindow(url));
});