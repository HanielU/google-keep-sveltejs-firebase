import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
let firebaseConfig = {
	apiKey: "AIzaSyBmbSg2xXXo4fKdc_zfBrtK-ZHDFOk1cV0",
	authDomain: "sveltefire-test-b7129.firebaseapp.com",
	projectId: "sveltefire-test-b7129",
	storageBucket: "sveltefire-test-b7129.appspot.com",
	messagingSenderId: "1022611496294",
	appId: "1:1022611496294:web:8ca2ac4ae2f9baaa22fca7",
	measurementId: "G-B95TGXN9LB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();
