import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCii4o2e6WknaKrmWq1Q27HcB6NTV_dTD8",
  authDomain: "dodl-3e411.firebaseapp.com",
  projectId: "dodl-3e411",
  storageBucket: "dodl-3e411.appspot.com",
  messagingSenderId: "920781843321",
  appId: "1:920781843321:web:0e2ba535251cdbd7d91da8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();

const slumberRef = ref(storage, 'audio/Slumber.flac');
const carelessRef = ref(storage, 'audio/Your Careless Embrace.flac');
const restlessRef = ref(storage, 'audio/Restless Thoughts.flac');
const detunedRef = ref(storage, 'audio/Detuned Love.flac');
const fallingRef = ref(storage, 'audio/Falling into the Void.flac');

export { slumberRef, carelessRef, restlessRef, detunedRef, fallingRef }

