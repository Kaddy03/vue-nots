import signUp from './components/signUp.vue';
import logIn from './components/logIn.vue';
import products from './components/products.vue';
import orders from './components/orders.vue';
import addProducts from './components/addProducts.vue';
import productTypes from './components/productTypes.vue';

export default [
  { path: '/nots', component: logIn },
  { path: '/nots/signup', component: signUp },
  { path: '/nots/:id/products', component: products },
  { path: '/nots/:id/orders', component: orders },
  { path: '/nots/:id/productTypes', component: productTypes },
  { path: '/nots/:id/products/addProducts', component: addProducts }
]
