import signUp from './components/signUp.vue';
import logIn from './components/logIn.vue';
import logIn2 from './components/logIn2.vue';
import viewProfile from './components/viewProfile.vue';
import products from './components/products.vue';
import orders from './components/orders.vue';
import addProducts from './components/addProducts.vue';
import productTypes from './components/productTypes.vue';
import reservations from './components/reservations.vue';
import calendar from './components/calendar.vue';

export default [
  { path: '/nots', component: logIn },
  { path: '/nots2', component: logIn },
  { path: '/nots/signup', component: signUp },
  { path: '/nots/:id/viewProfile', component: viewProfile },
  { path: '/nots/:id/products', name: 'rtws', component: products },
  { path: '/nots/:id/orders', name: 'orders', component: orders },
  { path: '/nots/:id/productTypes', component: productTypes },
  { path: '/nots/:id/reservations', component: reservations },
  { path: '/nots/:id/calendar', name: 'calendar', component: calendar },
  { path: '/nots/:id/products/addProducts', component: addProducts }
]
