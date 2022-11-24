// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";

import { notifyError, notifySuccess } from "../services/notifications";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG9k5GGtsogVaculpexWlUJB4TBvRBkb8",
  authDomain: "flip-reactjs-3918d.firebaseapp.com",
  projectId: "flip-reactjs-3918d",
  storageBucket: "flip-reactjs-3918d.appspot.com",
  messagingSenderId: "696581038478",
  appId: "1:696581038478:web:1b35ff0490d2e5a01f84df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

// export const fetchSkateboards = async () => {
//     try{
//         const response = await fetch("api/skateboards.json")
//         const data = await response.json()
//         console.log(data.length)
       
//         return data.forEach(product => addDoc(collection(db, "skateboards"), {...product}))
//     }catch(error){
//         console.log(error)
//     }
// }

export const updateStock = async (product) => {
  const docRef = doc(db, product.category, product.id)
  const docSnap = await getDoc(docRef)
  const stock = docSnap.data().stock

  try{
    if(docSnap.exists()) {
        if(stock >= product.quantity){
            await updateDoc(docRef, { stock: stock - product.quantity});
            return docSnap.data()
        }else{
            notifyError(`Product "${product.name.toUpperCase()}" is out of stock.`)
        }
    }else {
        notifyError(`Product "${product.name.toUpperCase()}" is gone.`)
    }
  }catch(error){
    console.log(error)
  }

}

export const createNewOrder = async (name, phone, email, cart) => {
  const newOrder = {
    buyer: {
        name,
        phone,
        email
    },
    items: cart,
    createdAt: new Date().toLocaleString()
  }

  const newDoc = await addDoc(collection(db, "orders"), newOrder)
  notifySuccess(`Your order ID is ${newDoc.id}`)
}