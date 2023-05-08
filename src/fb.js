import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyBkuJKApUr5VNb-ZOu6cCDM1hg8Cta1IO0',
  authDomain: 'kominfo-pse.firebaseapp.com',
  databaseURL: 'https://kominfo-pse.firebaseio.com',
  projectId: 'kominfo-pse',
  storageBucket: 'kominfo-pse.appspot.com',
  messagingSenderId: '584858584407',
  appId: '1:584858584407:web:8a4b7f5fefce72b86aea12',
  measurementId: 'G-5QG44PVKLC',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

try {
  if (firebase.messaging.isSupported()) {
    const messaging = firebase.messaging()

    messaging.onMessage(function (payload) {
      console.log(payload)
      const noteTitle = payload.notification.title
      const noteOptions = {
        body: payload.notification.body,
      }
      new Notification(noteTitle, noteOptions)
    })
  }
} catch (error) {
  alert(error)
}
// Notification.requestPermission().then(() => {
//   return fetchToken()
//   // Get Token
// })
// function fetchToken() {
//   return messaging
//     .getToken({
//       vapidKey:
//         'BK7ZJNZrpvWFm-rCo-7K6pHNvnNAlHEpF37loL3fvpSkO9782mh18OMM089ssfIH7VQw6dN3Gje8QT8McptZ5zQ',
//     })
//     .then((token) => {})
// }
