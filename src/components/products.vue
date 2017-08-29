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
        <span id="ords" class="mdl-navigation__link">All Orders</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/products'" exact>
        <span id="prods" class="mdl-navigation__link">My Products</span>
      </router-link>
    </nav>
  </div>
  <!-- MAIN CONTENT -->
  <main class="mdl-layout__content">
    <div class="page-content">
        <div class="mdl-grid">
          <h5>My Products</h5>
        </div>
        <div class="mdl-grid">
            <router-link v-bind:to="'/nots/' + tailorId + '/products/addProducts'" exact>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
              <i class="material-icons">add_circle</i> Add a Product
            </button>
            </router-link>
        </div>
        <div class="mdl-grid">
          <!-- PRODUCT LIST -->
          <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <thead>
              <tr>
                <th class="mdl-data-table__cell--non-numeric">Type</th>
                <th>Size</th>
                <th>Color</th>
                <th>Fabric</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Reserved</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products">
                <td class="mdl-data-table__cell--non-numeric">{{ product.pType }}</td>
                <td>{{ product.pSize }}</td>
                <td>{{ product.pColor }}</td>
                <td>{{ product.pFabric }}</td>
                <td>{{ product.pPrice }}</td>
                <td>{{ product.pStock }}</td>
                <td>{{ product.pReserved }}</td>
                <td>
                  <button class="mdl-button mdl-js-button mdl-button--icon">
                    <i class="material-icons">mode_edit</i>
                  </button>
                  <button class="mdl-button mdl-js-button mdl-button--icon">
                    <i class="material-icons">delete</i>
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
      products: [],
      title: "Products",
      prods: true
    }
  },
  methods: {

  },
  created() {
    this.$http.get('https://nots-eece8.firebaseio.com/products.json').then(function(data){
        return data.json()
    }).then(function(data){
        var productsArray = [];
        for (let key in data){
            data[key].id = key;
            productsArray.push(data[key]);
        }
        this.products = productsArray;
    });
    console.log(this.products);
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
.drawerHeader{
  background-color: #3f51b5;
  color: white;
}
.mdl-layout__content{
  background-color: #808080;
}
.page-content{
	background-color: white;
  height: 650px;
  padding-left: 20px;
}
.mdl-data-table{
  width: 100%;
}
.mdl-button{
  margin-left: 0;
}
#prods{
  background-color: #21C0C0;
  color: white;
}


</style>
