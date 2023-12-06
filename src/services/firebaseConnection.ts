import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA4ifzYox_DuiYWC8SUf_uup5HheP02OZQ",
  authDomain: "webcars-45ad1.firebaseapp.com",
  projectId: "webcars-45ad1",
  storageBucket: "webcars-45ad1.appspot.com",
  messagingSenderId: "388752091284",
  appId: "1:388752091284:web:1462a40090f1eb0fea2c81",
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)

const storage = getStorage(app)

export { db, auth, storage }
