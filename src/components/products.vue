<template>
  <div>
    <!-- BEGIN TEMPLATE -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <!-- HEADER -->
  <header class="mdl-layout__header">
    <div class="contentHeader mdl-layout__header-row">
      <h2 class="mdl-layout-title"><i class="material-icons">shopping_cart</i> {{ title }}</h2>
      <div class="mdl-layout-spacer"></div>
    </div>
  </header>
  <!-- SIDE DRAWER -->
  <div class="mdl-layout__drawer">
    <span class="drawerHeader mdl-layout-title">Tailor Name</span>
    <nav class="mdl-navigation">
      <a id="requ" class="mdl-navigation__link" href="">Requests</a>
      <a id="prod" class="mdl-navigation__link" href="">Products</a>
      <a id="mto" class="mdl-navigation__link" href="">Made-to-Order Offers</a>
      <a id="msg" class="mdl-navigation__link" href="">Messages</a>
    </nav>
  </div>
  <!-- MAIN CONTENT -->
  <main class="mdl-layout__content">
    <div class="page-content">
      <!-- CONTAINER -->
      <div class="container">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--4-col">
            <router-link to="/nots/tailor/products/addProducts" exact>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">

              <i class="material-icons">add_circle</i> Add Products

            </button>
            </router-link>
          </div>
          <div class="mdl-cell mdl-cell--8-col"></div>
        </div>
        <div class="mdl-grid">
          <!-- PRODUCT LIST -->
          <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <thead>
              <tr>
                <th class="mdl-data-table__cell--non-numeric">Type</th>
                <th>Size</th>
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
      products: [],
      title: "Products",
      prod: true
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
        console.log(this.products);
    });
  }
}

</script>

<!-- STYLING -->
<style scoped>

.drawerHeader{
  background-color: #428BCA;
}
.contentHeader{
  background-color: #21C0C0;;
}
.mdl-layout__content{
  background-color: #808080;
}
.container{
	width: 95%;
	margin: auto;
	box-shadow: 0 4px 8px 8px rgba(0, 0, 0, 0.2), 0 6px 20px 20px rgba(0, 0, 0, 0.19);
	background-color: white;
  height: 572px;
}
.mdl-data-table{
  width: 700px;
}
#prod{
  background-color: #21C0C0;
  color: white;
}


</style>
