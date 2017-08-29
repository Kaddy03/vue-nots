<template>
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
          <h5>Add a Product</h5>
      </div>
      <!-- SELECT BOXES -->
      <div class="mdl-grid">
            <p>
            Select a type of Product
            <select v-model="product.pType">
              <option>Pants</option>
              <option>Suit</option>
              <option>Uniform</option>
              <option>Shirt</option>
            </select>
            </p>
            <p>
            Select a Size
            <select v-model="product.pSize">
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
            </p>
      </div>
      <!-- FORMS -->
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--4-col">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    			     <input class="mdl-textfield__input" type="text" id="pFabric" v-model="product.pFabric">
    			     <label class="mdl-textfield__label" for="tFabric">Type of Fabric</label>
    		  </div>
        </div>
        <div class="mdl-cell mdl-cell--4-col">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    			     <input class="mdl-textfield__input" type="text" id="pColor" v-model="product.pColor">
    			     <label class="mdl-textfield__label" for="tColor">Color</label>
    		  </div>
        </div>
        <div class="mdl-cell mdl-cell--4-col"></div>
      </div>
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--4-col">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="price" v-model="product.pPrice">
            <label class="mdl-textfield__label" for="price">Price</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
          </div>
        </div>
        <div class="mdl-cell mdl-cell--4-col">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="stock" v-model="product.pStock">
            <label class="mdl-textfield__label" for="stock">Number of Stocks</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
          </div>
        </div>
        <div class="mdl-cell mdl-cell--4-col"></div>
      </div>
      <!-- SUBMIT BUTTON -->
      <div class="mdl-grid">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click.prevent="post">
            <i class="material-icons">done_all</i> Add Product
        </button>
      </div>
    </div>
  </main>
</div>
</template>

<!-- SCRIPT -->
<script>

export default {
  data () {
    return {
      tailorId: this.$route.params.id,
      product: {
        pType: "",
        pSize: "",
        pFabric: "",
        pColor: "",
        pPrice: 0,
        pStock: 0,
        pReserved: 0,
        pTailor: this.$route.params.id
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

h5{
  background-color: #b3b3b3;
  width: 100%;
  padding: 10px;
  color: white;
}
p{
  margin-right: 20px;
}
.drawerHeader{
  background-color: #3f51b5;
  color: white;
}
.container{
	width: 95%;
	margin: auto;
	box-shadow: 0 4px 8px 8px rgba(0, 0, 0, 0.2), 0 6px 20px 20px rgba(0, 0, 0, 0.19);
	background-color: white;
  height: 572px;
}
.mdl-textfield__label{
  color: black;
}
.mdl-textfield{
  margin-left: 0;
}
.page-content{
	background-color: white;
  height: auto;
  padding-left: 20px;
}
#prods{
  background-color: #21C0C0;
  color: white;
}


</style>
