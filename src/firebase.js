// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
export const firebaseApp = initializeApp({
	apiKey: 'AIzaSyA7-B01NmrrZHdt2Z4ztBnJ5j4_KJK_DaA',
	authDomain: 'crm-vue-f0e4a.firebaseapp.com',
	projectId: 'crm-vue-f0e4a',
	storageBucket: 'crm-vue-f0e4a.appspot.com',
	messagingSenderId: '469816396554',
	appId: '1:469816396554:web:a2d798c538d3a1daa5c8f3',
	measurementId: 'G-SLZNXYN52E'
});
const analytics = getAnalytics(firebaseApp);
