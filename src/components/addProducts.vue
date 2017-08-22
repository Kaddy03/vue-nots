<template>
  <div>
    <!-- BEGIN TEMPLATE -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <!-- HEADER -->
  <header class="mdl-layout__header">
    <div class="contentHeader mdl-layout__header-row">
      <h2 class="mdl-layout-title"><i class="material-icons">shopping_cart</i> Products</h2>
      <div class="mdl-layout-spacer"></div>
    </div>
  </header>
  <!-- SIDE DRAWER -->
  <div class="mdl-layout__drawer">
    <span class="drawerHeader mdl-layout-title">Tailor Name</span>
    <nav class="mdl-navigation">
      <a class="mdl-navigation__link" href="">Requests</a>
      <a class="mdl-navigation__link" href="">Products</a>
      <a class="mdl-navigation__link" href="">Made-to-Order Offers</a>
      <a class="mdl-navigation__link" href="">Messages</a>
    </nav>
  </div>
  <!-- MAIN CONTENT -->
  <main class="mdl-layout__content">
    <div class="page-content">
      <!-- CONTAINER -->
      <div class="container">
          <div class="mdl-grid">
            <h3>Add a Product</h3>
          </div>
          <div class="formInput mdl-grid">
            <p>Select a type of Product</p>
            <p>
            <select v-model="product.pType">
              <option>Pants</option>
              <option>Suit</option>
              <option>Uniform</option>
              <option>Shirt</option>
            </select>
            </p>
            <p>Select a Size</p>
            <p>
            <select v-model="product.pSize">
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
            </p>
          <div class="mdl-grid">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="number" pattern="-?[0-9]*(\.[0-9]+)?" id="price" placeholder="" v-model="product.pPrice">
              <label class="mdl-textfield__label" for="price">Price</label>
              <span class="mdl-textfield__error">Input is not a number!</span>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="number" pattern="-?[0-9]*(\.[0-9]+)?" id="stock" placeholder="" v-model="product.pStock">
              <label class="mdl-textfield__label" for="stock">Stock</label>
              <span class="mdl-textfield__error">Input is not a number!</span>
            </div>
          </div>
          </div>
          <div class="mdl-grid">
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click.prevent="post">
  			         <i class="material-icons">done_all</i> Add Products
  		      </button>
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
      product: {
        pType: "",
        pSize: "",
        pPrice: 0,
        pStock: 0,
        pReserved: 0,
      }
    }
  },
  methods: {
    post: function(){
      this.$http.post('https://nots-eece8.firebaseio.com/products.json', this.product).then(function(data){
          console.log(data);
      });
    }
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
.mdl-textfield{
  width: 50;
}
.mdl-textfield__label{
  color: black;
}
.formInput{
  display: list-item;
}
p{
  margin-left: 40px;
}

</style>
