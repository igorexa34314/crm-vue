// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
export const firebaseApp = initializeApp({
	apiKey: import.meta.env.VITE_FB_API_KEY,
	authDomain: 'crm-vue-f0e4a.firebaseapp.com',
	projectId: 'crm-vue-f0e4a',
	storageBucket: 'crm-vue-f0e4a.appspot.com',
	messagingSenderId: '469816396554',
	appId: '1:469816396554:web:a2d798c538d3a1daa5c8f3',
	measurementId: 'G-SLZNXYN52E',
	databaseURL: 'https://crm-vue-f0e4a-default-rtdb.europe-west1.firebasedatabase.app/'
});

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(firebaseApp);

const analytics = getAnalytics(firebaseApp);
