/* eslint-disable no-undef */
const config = {
  apiKey: 'AIzaSyBm3VCmy0hIjbYPZdE1qA6CfYMBn9b3OFo',
  authDomain: 'nenrei-push.firebaseapp.com',
  databaseURL: 'https://nenrei-push.firebaseio.com',
  projectId: 'nenrei-push',
  storageBucket: 'nenrei-push.appspot.com',
  messagingSenderId: '1068778221392',
  appId: '1:1068778221392:web:4dcbb30029c2858cf34655',
};

firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  'BI-5KLLmMjrhVyggKzfm3o6WaRiv85tpu3vPDR1dPvJnoIkq2hWAsmqKLSD3mkNfnCPJfiIDkNwZFBWjk3uwblQ'
);

const displayToken = () => {
  messaging
    .getToken()
    .then((token) => {
      if (token) {
        console.log(token);
      } else {
        console.log(
          'No Instance ID token available. Request permission to generate one.'
        );
      }
    })
    .catch(function (err) {
      console.log('An error occurred while retrieving token. ', err);
    });
};

const getNotification = () => {
  messaging
    .requestPermission()
    .then(() => {
      console.log('Notification permission granted.');
      displayToken();
      initialButton();
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
};

const getSubscription = () => {
  messaging
    .getToken()
    .then((token) => {
      if (!token) {
        getNotification();
      } else {
        displayToken();
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

const registSW = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('firebase-messaging-sw.js')
        .then((registration) => {
          console.log(
            'firebase-messaging-sw.js registration successful with scope: ',
            registration.scope
          );
        })
        .catch((err) => {
          console.log('firebase-messaging-sw.js registration failed: ', err);
        });
    });
  }
};

registSW();
getSubscription();
