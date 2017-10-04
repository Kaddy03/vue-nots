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
        <span class="mdl-navigation__link">All Orders</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/products'" exact>
        <span class="mdl-navigation__link">Ready-to-Wear's</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/productTypes'" exact>
        <span id="currentNav" class="mdl-navigation__link">My Product Types</span>
      </router-link>
    </nav>
  </div>
  <!-- MAIN CONTENT -->
  <main class="mdl-layout__content">
    <div class="page-content">
        <div class="mdl-grid">
          <h5>My Product Types</h5>
        </div>
        <div class="mdl-grid">
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" v-on:click.prevent="showDialog">
              <i class="material-icons">add_circle</i> Add a Product Type
            </button>
            <!-- DIALOG -->
            <dialog class="mdl-dialog">
              <h4 class="mdl-dialog__title">Add a Product Type</h4>
              <div class="mdl-dialog__content">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                     <input class="mdl-textfield__input" type="text" id="pType" v-model="pType.ptName">
                     <label class="mdl-textfield__label" for="pType">Product Type Name</label>
                </div>
              </div>
              <div class="mdl-dialog__actions">
                <button id="add" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" v-on:click.prevent="post">
                  <i class="material-icons">done</i>
                </button>
                <span for="add" class="mdl-tooltip">Add product type</span>
                <button id="cancel" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" v-on:click.prevent="closeDialog">
                  <i class="material-icons">clear</i>
                </button>
                <span for="cancel" class="mdl-tooltip">Cancel</span>
              </div>
            </dialog>
        </div>
        <div class="mdl-grid">
        </div>
          <!-- PRODUCT TYPE LIST -->
        <div id="typeList">
          <p>List of available Product Types</p>
          <ul>
            <li v-for="type in prodTypes">{{ type.ptName }}</li>
          </ul>
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
      pType: {
        ptName: "",
        tailor: this.$route.params.id
      },
      prodTypes: [],
      size: {
        sizeLetter: ""
      }
    }
  },
  methods: {
    showDialog: function(){
      dialog.showModal();
    },
    post: function(){
      this.$http.post('https://nots-76611.firebaseio.com/product_types.json', this.pType);
      dialog.close();
    },
    closeDialog: function(){
      dialog.close();
    }
  },
  created() {
    this.$http.get('https://nots-76611.firebaseio.com/product_types.json').then(function(data){
      return data.json();
    }).then(function(data){
      var ptArray = [];
      for (let key in data){
        if (this.$route.params.id == data[key].tailor){
          ptArray.push(data[key]);
        }
        this.prodTypes = ptArray;
      }
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
li, a{
  text-decoration: none;
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
#currentNav{
  background-color: #21C0C0;
  color: white;
}
#typeList{
  margin-left: 10px;
}


</style>
