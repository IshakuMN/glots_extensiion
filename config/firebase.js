import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP6nHGO0EAaYlux0xZ8FnFkvYu3YVkyoI", //process.env.FIREBASE_API,
  authDomain: "glota-2c318.firebaseapp.com",
  projectId: "glota-2c318",
  storageBucket: "glota-2c318.appspot.com",
  messagingSenderId: "1036735424780",
  appId: "1:1036735424780:web:1a0bea95a495eb68638129"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;