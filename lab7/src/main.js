import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6w9RXd6j-Zzg03Gn2oUAyk-y6mNpKogI",
  authDomain: "week7-yuhanzhou.firebaseapp.com",
  projectId: "week7-yuhanzhou",
  storageBucket: "week7-yuhanzhou.appspot.com",
  messagingSenderId: "940710542040",
  appId: "1:940710542040:web:35411f109c89bd5b06f5ad"
};
//Initialize firebase
initializeApp(firebaseConfig);