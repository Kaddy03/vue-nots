<template>
  <div>
    <!-- BEGIN TEMPLATE -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
  <!-- SIDE DRAWER -->
  <div class="mdl-layout__drawer">
    <div class="drawerHeader mdl-layout-title"><h3>{{ tailorData.tName }}</h3>
    <button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon">
        <i class="material-icons" role="presentation">account_circle</i>
    </button>
    <ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" for="demo-menu-lower-right">
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
      <router-link v-bind:to="'/nots/' + tailorId + '/reservations'" exact>
        <span class="mdl-navigation__link">RTW reservations</span>
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
            <dialog class="mdl-dialog" ref="addDialog">
              <h4 class="mdl-dialog__title">Add a Product Type</h4>
              <div class="mdl-dialog__content">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                     <input class="mdl-textfield__input" type="text" id="pType" v-model="pType.ptName">
                     <label class="mdl-textfield__label" for="pType">Product Type Name</label>
                </div>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="armhole">
                  <input type="checkbox" id="armhole" class="mdl-checkbox__input" v-model="pType.arm_hole">
                  <span class="mdl-checkbox__label">Arm Hole</span>
                </label>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="bicep">
                  <input type="checkbox" id="bicep" class="mdl-checkbox__input" v-model="pType.bicep">
                  <span class="mdl-checkbox__label">Bicep</span>
                </label>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="chest" v-model="pType.chest">
                  <input type="checkbox" id="chest" class="mdl-checkbox__input">
                  <span class="mdl-checkbox__label">Chest</span>
                </label>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="hips">
                  <input type="checkbox" id="hips" class="mdl-checkbox__input" v-model="pType.hips">
                  <span class="mdl-checkbox__label">Hips</span>
                </label>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="neck" >
                  <input type="checkbox" id="neck" class="mdl-checkbox__input" v-model="pType.neck">
                  <span class="mdl-checkbox__label">Neck</span>
                </label>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="shirtLength">
                  <input type="checkbox" id="shirtLength" class="mdl-checkbox__input" v-model="pType.shirt_length">
                  <span class="mdl-checkbox__label">Shirt Length</span>
                </label>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="shortSleeve">
                  <input type="checkbox" id="shortSleeve" class="mdl-checkbox__input" v-model="pType.short_sleeve_length">
                  <span class="mdl-checkbox__label">Short Sleeve Length</span>
                </label>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="shoulderWidth">
                  <input type="checkbox" id="shoulderWidth" class="mdl-checkbox__input" v-model="pType.shoulder_width">
                  <span class="mdl-checkbox__label">Shoulder Width</span>
                </label>
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="waist">
                  <input type="checkbox" id="waist" class="mdl-checkbox__input" v-model="pType.waist">
                  <span class="mdl-checkbox__label">Waist</span>
                </label>
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
          List of your Product Types
        </div>
          <!-- PRODUCT TYPE LIST -->
        <div class="mdl-grid">
          <table class="mdl-data-table mdl-js-data-table">
            <thead>
              <th class="mdl-data-table__cell--non-numeric">Name</th>
              <th></th>
            </thead>
            <tbody>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">name</td>
                <td>actions</td>
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
      tailorData: {},
      pType: {
        ptName: "",
        arm_hole: false,
        bicep: false,
        chest: false,
        hips: false,
        neck: false,
        shirt_length: false,
        short_sleeve_length: false,
        shoulder_width: false,
        waist: false,
        tailor: this.$route.params.id
      },
      types: []
    }
  },
  methods: {
    showDialog: function(){
      this.$refs.addDialog.showModal();
    },
    post: function(){
      this.$http.post('https://nots-76611.firebaseio.com/product_types.json', this.pType);
      this.$refs.addDialog.close();
      alert("Product Type Added");
      location.reload(true);
    },
    closeDialog: function(){
      this.$refs.addDialog.close();
    }
  },
  created() {
    //Retrieval for product types
    this.$http.get('https://nots-76611.firebaseio.com/product_types/' + this.tailorId + '.json').then(function(data){
      return data.json();
    }).then(function(data){
      var ptArray = [];
      for (let key in data){
          data[key].id = key;
          ptArray.push(data[key]);
      }
      this.types = ptArray;
    });
    //RETRIEVE TAILOR DATA
    this.$http.get('https://nots-76611.firebaseio.com/tailors/' + this.tailorId + '.json').then(function(data){
        return data.json();
    }).then(function(data){
      this.tailorData = data;
    });
    //COMPONENT UPGRADE
    this.$nextTick(() => {
      componentHandler.upgradeDom();
      componentHandler.upgradeAllRegistered();
    });
  },
  mounted() {
    var dialog = document.querySelector('dialog');
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
.page-content{
	background-color: white;
  height: auto;
  padding-left: 20px;
}
.mdl-data-table{
  width: 30%;
}
.mdl-button{
  margin-left: 0;
}
#currentNav{
  background-color: #21C0C0;
  color: white;
}


</style>
