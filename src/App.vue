<template>
  <div>
    <!-- BEGIN TEMPLATE -->
    <router-view v-bind:user="user" v-on:setUser($event)></router-view>
    <!-- END TEMPLATE -->
  </div>
</template>

<!-- SCRIPT -->
<script>
import signUp from './components/signUp.vue';
import logIn from './components/logIn.vue';
import products from './components/products.vue';
import addProducts from './components/addProducts.vue';

export default {
  components: {
    'signUp': signUp,
    'logIn': logIn,
    'products': products,
    'addProducts': addProducts
  },
  data () {
    return {
      user: ''
    }
  },
  methods: {
    setUser: function(userKey) {
      this.user = userKey;
    }
  }
}

</script>

<!-- STYLING -->
<style scoped>

</style>
