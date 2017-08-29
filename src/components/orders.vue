<template>
  <div>
    <!-- BEGIN TEMPLATE -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
  <!-- SIDE DRAWER -->
  <div class="mdl-layout__drawer">
    <div class="drawerHeader mdl-layout-title">Tailor Name
      <button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons" role="presentation">account_circle</i>
      </button>
      <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="demo-menu-lower-right">
        <li disabled class="mdl-menu__item">Edit Profile</li>
        <router-link v-bind:to="'/nots'" exact><li class="mdl-menu__item">Logout</li></router-link>
      </ul>
    </div>
    <nav class="mdl-navigation">
      <router-link v-bind:to="'/nots/' + tailorId + '/orders'" exact>
        <a id="ords" class="mdl-navigation__link" href="">All Orders</a>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/products'" exact>
        <a id="prods" class="mdl-navigation__link" href="">My Products</a>
      </router-link>
    </nav>
  </div>
  <!-- MAIN CONTENT -->
  <main class="mdl-layout__content">
    <div class="page-content">
      <div class="mdl-grid">
        <h5>All Orders</h5>
      </div>
      <div class="mdl-grid">
          <!-- PRODUCT LIST -->
          <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <thead>
              <tr>
                <th class="mdl-data-table__cell--non-numeric">Product Type</th>
                <th>Measurements</th>
                <th>Quantity</th>
                <th>Preferred Tailor</th>
                <th>Customer Info</th>
                <th>Accept Order</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders">
                <td class="mdl-data-table__cell--non-numeric">{{ order.Product_Type }}</td>
                <td>
                  <ul>
                    <li>Bicep: {{ order.Measurements.Bicep }}</li>
                    <li>Chest: {{ order.Measurements.Chest }}</li>
                    <li>Neck: {{ order.Measurements.Neck }}</li>
                    <li>Hips: {{ order.Measurements.Hips }}</li>
                    <li>Shirt Length: {{ order.Measurements.Shirt_Length }}</li>
                    <li>Shoulder Width: {{ order.Measurements.Shoulder_Width }}</li>
                  </ul>
                </td>
                <td>{{ order.Quantity }}</td>
                <td>{{ order.Tailor_Shops }}</td>
                <td>
                  <ul>
                    <li>{{ order.Customer }}</li>
                    <li>{{ order.School.Name_of_School }}</li>
                    <li>{{ order.School.Level }}</li>
                  </ul>
                </td>
                <td>
                  <button id="accept" class="mdl-button mdl-js-button mdl-button--icon">
                    <i class="material-icons">assignment_turned_in</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </main>
  </div>
    <!-- END TEMPLATE -->
  </div>
</template>

<!-- SCRIPT -->
<script>

export default {
  data () {
    return {
      tailorId: this.$route.params.id,
      orders: [],
      ords: true
    }
  },
  methods: {

  },
  created() {
    this.$http.get('https://nots-76611.firebaseio.com/Orders.json').then(function(data){
        return data.json();
    }).then(function(data){
        var ordersArray = [];
        for (let key in data){
            data[key].id = key;
            ordersArray.push(data[key]);
        }
        this.orders = ordersArray;
    });
  }
}

</script>

<!-- STYLING -->
<style scoped>

h5{
  background-color: #b3b3b3;
  width: 100%;
  padding: 10px;
  color: white;
}
li{
  text-align: left;
}
.mdl-data-table{
  width: 60px;
}
.drawerHeader{
  background-color: #3f51b5;
  color: white;
}
.page-content{
	background-color: white;
  height: auto;
  padding-left: 20px;
}
.mdl-data-table{
  width: 100px;
}
#ords{
  background-color: #21C0C0;
  color: white;
}


</style>
