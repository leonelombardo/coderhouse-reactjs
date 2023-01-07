// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, addDoc, collection, doc, getDoc, updateDoc, getDocs } from "firebase/firestore";

import { notifyError, notifySuccess } from "../services/notifications";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "flip-reactjs-3918d.firebaseapp.com",
  projectId: "flip-reactjs-3918d",
  storageBucket: "flip-reactjs-3918d.appspot.com",
  messagingSenderId: "696581038478",
  appId: "1:696581038478:web:1b35ff0490d2e5a01f84df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const checkProductStock = async (cart) => {
  const products = []
  const errors = []

  const filteredProducts = cart.map(async (product) => {
      return new Promise(async (resolve, reject) => {
          const { id, category, quantity } = product
          const productReference = doc(db, category, id)
          const response = await getDoc(productReference)
          const data = response.data()

          if(data.stock >= quantity){
              resolve(product)
          }else{
              reject(`"${product.name.toUpperCase()}" run out of stock.`)
          }
      })
  })

  await Promise.allSettled(filteredProducts).then(promises => {
      promises.map(promise => {
          const { status } = promise

          if(status === "fulfilled"){
              const { value } = promise
              return products.push(value)
          }else if(status === "rejected"){
              const { reason } = promise
              return errors.push(reason)
          }else{
              return 
          }
      })
  })

  return [products, errors]
}

export const updateStock = async (product) => {
  const { id, category, quantity } = product
  const productRef = doc(db, category, id)
  const productData = await getDoc(productRef)
  await updateDoc(productRef, { stock: productData.data().stock - quantity })
}

export const createNewOrder = async (name, email, phone, cart) => {
  const newOrder = {
    buyer: {
        name,
        email,
        phone
    },
    products: cart,
    createdAt: new Date().toLocaleString("en-US")
  }

  const newDoc = await addDoc(collection(db, "orders"), newOrder)
  notifySuccess(`Your order ID is ${newDoc.id}`)
}

export const getAllDocuments = async (database) => {
  return await getDocs(collection(db, database))
}