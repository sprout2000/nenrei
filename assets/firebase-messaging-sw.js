/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js'
);

firebase.initializeApp({
  messagingSenderId: '1068778221392',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
