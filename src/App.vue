<template>
  <div>
    <!-- BEGIN TEMPLATE -->
    <router-view></router-view>
    <!-- END TEMPLATE -->
  </div>
</template>

<!-- SCRIPT -->
<script>
import signUp from './components/signUp.vue';
import logIn from './components/logIn.vue';
import viewProfile from './components/viewProfile.vue';
import products from './components/products.vue';
import orders from './components/orders.vue';
import addProducts from './components/addProducts.vue';
import productTypes from './components/productTypes.vue';
import reservations from './components/reservations.vue';
import calendar from './components/calendar.vue';

export default {
  components: {
    'viewProfile': viewProfile,
    'signUp': signUp,
    'logIn': logIn,
    'products': products,
    'orders': orders,
    'productTypes': productTypes,
    'addProduct': addProducts,
    'reservations': reservations,
    'calendar': calendar,
  },
}

</script>

<!-- STYLING -->
<style scoped>

</style>
