
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCVH16O6OwCuJNVenS6o7tSbySgLjdqJDU",
    authDomain: "soil-2d527.firebaseapp.com",
    projectId: "soil-2d527",
    storageBucket: "soil-2d527.appspot.com",
    messagingSenderId: "822714364046",
    appId: "1:822714364046:web:1d847d3317b11e7a3959df"
};
// Initialize Firebase
var defaultApp = firebase.initializeApp(firebaseConfig);

console.log(defaultApp.name);  // "[DEFAULT]"
const db = firebase.firestore();
    //     //  db.settings({ timestampsInSnapshots: true });
    //    db.collection("OTP")


    