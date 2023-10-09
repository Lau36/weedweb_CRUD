// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHJjo7rswP1XZL26hllXjqPQw6M6JXlCE",
  authDomain: "weedweb-f3649.firebaseapp.com",
  projectId: "weedweb-f3649",
  storageBucket: "weedweb-f3649.appspot.com",
  messagingSenderId: "882545328420",
  appId: "1:882545328420:web:f13c1c70dec9273b70f3b1",
  measurementId: "G-LFTBVYBXTK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createPerson = (
  national_id,
  name,
  lastName,
  email,
  phoneNumber,
  password
) =>
  addDoc(collection(db, "users"), {
    national_id: national_id,
    name: name,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
  });

export const updatePerson = (
  id,
  national_id,
  name,
  lastName,
  email,
  phoneNumber,
  password
) => {
  updateDoc(doc(db, "users", id), {
    national_id: national_id,
    name: name,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
  });
};

export const createCompany = (nit, companyName, email, phoneNumber, password) =>
  addDoc(collection(db, "users"), {
    nit: nit,
    companyName: companyName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
  });

export const pdateCompany = (
  id,
  nit,
  companyName,
  email,
  phoneNumber,
  password
) => {
  updateDoc(doc(db, "users", id), {
    nit: nit,
    companyName: companyName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
  });
};

export const getUser = (id) => {
  getDoc(doc(db, "users", id));
};

export const deleteUser = (id) => {
  deleteDoc(doc(db, "users", id));
};
