import firebase from "firebase";

// Your web app's Firebase configuration
const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
};

// Initialize Firebase if not already intialised
const firebaseDb = firebase.apps.length ? firebase.app() : firebase.initializeApp(config);

export default firebaseDb.database().ref();
