// Import the functions you need from the SDKs you need

import { getApp, getApps, initializeApp } from "firebase/app";
import "firebase/compat/app";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5azHRt8vDkrYclsFD8HQuBzoCN_Ov9MU",
  authDomain: "food-donation-new-9fa4a.firebaseapp.com",
  databaseURL:
    "https://food-donation-new-9fa4a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "food-donation-new-9fa4a",
  storageBucket: "food-donation-new-9fa4a.appspot.com",
  messagingSenderId: "23464134108",
  appId: "1:23464134108:web:01fbc81112453346333b19",
  measurementId: "G-1HY7TNGKRN",
};

// ------------production----------
// const firebaseConfig = {
//   apiKey: "AIzaSyAOgX0xAO7Gz8bdxnSYJwEiJ62owS6tuj8",
//   authDomain: "food-donation-production.firebaseapp.com",
//   databaseURL:
//     "https://food-donation-production-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "food-donation-production",
//   storageBucket: "food-donation-production.appspot.com",
//   messagingSenderId: "931140566193",
//   appId: "1:931140566193:web:84f5ebb357af719cc2f690",
//   measurementId: "G-TBY7PQ73GT",
// };

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
const fbApp = getApp();
const fbStorage = getStorage();

const listFiles = async () => {
  const storage = getStorage();

  // Create a reference under which you want to list
  const listRef = ref(storage, "images");

  // Find all the prefixes and items.
  const listResp = await listAll(listRef);
  return listResp.items;
};

/**
 *
 * @param {*} uri
 * @param {*} name
 */
const uploadToFirebase = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

export { fbApp as app, fbStorage, listFiles, uploadToFirebase };
