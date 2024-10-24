import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBuZkyzW2gm9donpuF5oyVpYQb4kKmE8KY",
    authDomain: "chat-1a6ee.firebaseapp.com",
    projectId: "chat-1a6ee",
    storageBucket: "chat-1a6ee.appspot.com",
    messagingSenderId: "620520510918",
    appId: "1:620520510918:web:1b73ccb585d0f9416c4ec7"
  }

  initializeApp(firebaseConfig)

  const firestore = getFirestore()

  const MESSAGES = "messages"

  export {
    firestore,
    collection,
    addDoc,
    MESSAGES,
    serverTimestamp, 
    query, 
    onSnapshot,
    orderBy, 
    deleteDoc, 
    doc
}