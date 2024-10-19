import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import AccessDenied from '../views/AccessDenied.vue';
import FirebaseSigninView from '@/views/FirebaseSigninView.vue';
import FirebaseLogininView from '@/views/FirebaseLogininView.vue';
import AddBookView from '@/views/AddBookView.vue';
import WeatherView from '@/views/WeatherView.vue';
import CountBookAPI from '@/views/CountBookAPI.vue';

const isAuthenticated = ref(false);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied
  },
  {
    path: '/fireSignin',
    name: '/fireSignin',
    component: FirebaseSigninView
  },
  {
    path: '/fireLogin',
    name: '/fireLogin',
    component: FirebaseLogininView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView  
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI    
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'AccessDenied' });
  } else {
    next();
  }
});

export { router, isAuthenticated };
export default router;
