import signUp from './components/signUp.vue';
import logIn from './components/logIn.vue';
import products from './components/products.vue';
import addProducts from './components/addProducts.vue';

export default [
  { path: '/nots', component: logIn },
  { path: '/nots/signup', component: signUp },
  { path: '/nots/tailor/products', component: products },
  { path: '/nots/tailor/products/addProducts', component: addProducts }
]
