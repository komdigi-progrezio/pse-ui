importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js')
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBkuJKApUr5VNb-ZOu6cCDM1hg8Cta1IO0',
    authDomain: 'kominfo-pse.firebaseapp.com',
    databaseURL: 'https://kominfo-pse.firebaseio.com',
    projectId: 'kominfo-pse',
    storageBucket: 'kominfo-pse.appspot.com',
    messagingSenderId: '584858584407',
    appId: '1:584858584407:web:8a4b7f5fefce72b86aea12',
    // measurementId: 'G-5QG44PVKLC',
  })
}

const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/itwonders-web-logo.png',
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})
