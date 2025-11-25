// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getStorage } from 'firebase/storage';
// import { getFirestore } from 'firebase/firestore';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "your-api-key",
//     authDomain: "your-project.firebaseapp.com",
//     projectId: "your-project-id",
//     storageBucket: "your-project.appspot.com",
//     messagingSenderId: "your-sender-id",
//     appId: "your-app-id"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase services
// export const auth = getAuth(app);
// export const storage = getStorage(app);
// export const db = getFirestore(app);

// export default app;





// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDrv5joZCkSuxbZlPpzNslg59A2j0_X7rY",
//     authDomain: "instagram-clone-28cc1.firebaseapp.com",
//     projectId: "instagram-clone-28cc1",
//     storageBucket: "instagram-clone-28cc1.firebasestorage.app",
//     messagingSenderId: "937215135744",
//     appId: "1:937215135744:web:a77daa7bd06610343508e5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrv5joZCkSuxbZlPpzNslg59A2j0_X7rY",
    authDomain: "instagram-clone-28cc1.firebaseapp.com",
    projectId: "instagram-clone-28cc1",
    storageBucket: "instagram-clone-28cc1.firebasestorage.app",
    messagingSenderId: "937215135744",
    appId: "1:937215135744:web:a77daa7bd06610343508e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;