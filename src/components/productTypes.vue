<template>
  <div>
    <!-- BEGIN TEMPLATE -->
  <div v-if="isLoading" id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <h3>Welcome To Naga Online Tailoring Services</h3>
        <div class="mdl-layout-spacer"></div>
        <div>
        <router-link v-bind:to="'/nots/'">
          <button id="logout" class="mdl-button mdl-js-button mdl-js-ripple-effect">
             <i class="material-icons">power_settings_new</i>
             Logout
          </button>
        </router-link>
        </div>
      </div>
    </header>
  <!-- SIDE DRAWER -->
  <div class="mdl-layout__drawer">
    <div class="drawerHeader mdl-layout-title">
      <div>
        <img id="tailorAvatar" :src="tailorData.tImage" height="100">
      </div>
      <h3>{{ tailorData.tName }}</h3>
      <p>
        My Profile
        <router-link v-bind:to="'/nots/' + tailorId + '/viewProfile'" exact>
          <button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon">
              <i class="material-icons" role="presentation">account_circle</i>
          </button>
        </router-link>
      </p>
    </div>
    <nav class="mdl-navigation">
      <router-link v-bind:to="'/nots/' + tailorId + '/orders'" exact>
        <span class="mdl-navigation__link" href=""><i class="material-icons">content_cut</i> MTO Requests</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/reservations'" exact>
        <span class="mdl-navigation__link"><i class="material-icons">content_paste</i> RTW reservations</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/productTypes'" exact>
        <span id="currentNav" class="mdl-navigation__link"><i class="material-icons">style</i> My Product Types</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/products'" exact>
        <span class="mdl-navigation__link" href=""><i class="material-icons">store_mall_directory</i> Ready-to-Wears</span>
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
            <dialog id="addType" class="mdl-dialog" ref="addDialog">
              <h4 class="mdl-dialog__title">Add a Product Type</h4>
              <div class="mdl-dialog__content">
                <div id="ptNameInput" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                      <input class="mdl-textfield__input" type="text" id="pType" v-model="pType.ptName">
                      <label class="mdl-textfield__label" for="pType">Product Type Name <span class="hint">(Pls Specify the GENDER for this type)</span></label>
                </div>
                <div id="ptNameInput" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                      <input class="mdl-textfield__input" type="text" id="pType" pattern="-?[0-9,]*(\.[0-9,]+)?" v-model="pType.ptPrice">
                      <label class="mdl-textfield__label" for="pType">Estimated Price for MTO</label>
                      <span class="mdl-textfield__error">Input is not a number!</span>
                </div>
                <p>*Choose the required MTO measurements for this product type</p>
                <!-- CHECKBOXES -->
                <div class="mdl-grid">
                  <!-- UPPER -->
                  <div class="mdl-cell mdl-cell--6-col">
                    <p>FOR UPPER GARMENTS</p>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="armhole">
                      <input type="checkbox" id="armhole" class="mdl-checkbox__input" v-model="pType.arm_hole">
                      <span class="mdl-checkbox__label">Arm Hole</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="bicep">
                      <input type="checkbox" id="bicep" class="mdl-checkbox__input" v-model="pType.bicep">
                      <span class="mdl-checkbox__label">Bicep</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="chest">
                      <input type="checkbox" id="chest" class="mdl-checkbox__input" v-model="pType.chest">
                      <span class="mdl-checkbox__label">Chest</span>
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
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="longSleeve">
                      <input type="checkbox" id="longSleeve" class="mdl-checkbox__input" v-model="pType.long_sleeve_length">
                      <span class="mdl-checkbox__label">Long Sleeve Length</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="shoulderWidth">
                      <input type="checkbox" id="shoulderWidth" class="mdl-checkbox__input" v-model="pType.shoulder_width">
                      <span class="mdl-checkbox__label">Shoulder Width</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="wrist">
                      <input type="checkbox" id="wrist" class="mdl-checkbox__input" v-model="pType.wrist">
                      <span class="mdl-checkbox__label">Wrist</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="bust">
                      <input type="checkbox" id="bust" class="mdl-checkbox__input" v-model="pType.bust">
                      <span class="mdl-checkbox__label">Bust</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="breastPoint">
                      <input type="checkbox" id="breastPoint" class="mdl-checkbox__input" v-model="pType.breast_point">
                      <span class="mdl-checkbox__label">Breast Point</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="waistPoint">
                      <input type="checkbox" id="waistPoint" class="mdl-checkbox__input" v-model="pType.waist_point">
                      <span class="mdl-checkbox__label">Waist Point</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="stomach">
                      <input type="checkbox" id="stomach" class="mdl-checkbox__input" v-model="pType.stomach">
                      <span class="mdl-checkbox__label">Stomach</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="waistUpper">
                      <input type="checkbox" id="waistUpper" class="mdl-checkbox__input" v-model="pType.waist_upper">
                      <span class="mdl-checkbox__label">Waist (upper)</span>
                    </label>
                  </div>
                  <!-- LOWER -->
                  <div class="mdl-cell mdl-cell--6-col">
                    <p>FOR LOWER GARMENTS</p>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="waistLower">
                      <input type="checkbox" id="waistLower" class="mdl-checkbox__input" v-model="pType.waist_lower">
                      <span class="mdl-checkbox__label">Waist (lower)</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="hipsLower">
                      <input type="checkbox" id="hipsLower" class="mdl-checkbox__input" v-model="pType.hips_lower">
                      <span class="mdl-checkbox__label">Hips</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="crotch">
                      <input type="checkbox" id="crotch" class="mdl-checkbox__input" v-model="pType.crotch">
                      <span class="mdl-checkbox__label">Crotch</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="thighWidth">
                      <input type="checkbox" id="thighWidth" class="mdl-checkbox__input" v-model="pType.thigh_width">
                      <span class="mdl-checkbox__label">Thigh Width</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="pantsLength">
                      <input type="checkbox" id="pantsLength" class="mdl-checkbox__input" v-model="pType.pants_length">
                      <span class="mdl-checkbox__label">Pants Length</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="inseam">
                      <input type="checkbox" id="inseam" class="mdl-checkbox__input" v-model="pType.inseam">
                      <span class="mdl-checkbox__label">Inseam</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="knee">
                      <input type="checkbox" id="knee" class="mdl-checkbox__input" v-model="pType.knee">
                      <span class="mdl-checkbox__label">Knee</span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="halfHem">
                      <input type="checkbox" id="halfHem" class="mdl-checkbox__input" v-model="pType.half_hem">
                      <span class="mdl-checkbox__label">Half Hem</span>
                    </label>
                  </div>
                </div>
              </div>
              <!-- ACTION BUTTONS -->
              <div v-if="isPosting" class="mdl-dialog__actions">
                <div>Adding Product Type... Please Wait...</div>
              </div>
              <div v-else class="mdl-dialog__actions">
                <button id="add" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" v-on:click.prevent="post">
                  <i class="material-icons">done</i>
                </button>
                <button id="cancel" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" v-on:click.prevent="closeDialog">
                  <i class="material-icons">clear</i>
                </button>
              </div>
            </dialog>
        </div>
          <!-- PRODUCT TYPE LIST -->
        <div class="mdl-grid">
          <table class="mdl-data-table mdl-js-data-table">
            <thead>
              <th>Product Type Names</th>
              <th class="mdl-data-table__cell--non-numeric">Measurements for MTO</th>
              <th class="mdl-data-table__cell--non-numeric">Estimated price for MTO</th>
              <th></th>
            </thead>
            <tbody>
              <tr v-for="type, ndx in types">
                <td>{{ type.ptName }}</td>
                <td class="mdl-data-table__cell--non-numeric">
                  <button class="mdl-button mdl-js-button mdl-js-ripple-effect" v-on:click="showMeasure(ndx)">
                    See Measurements
                  </button>
                  <!-- DIALOG FOR MEASUREMENTS -->
                  <dialog id="mDialog" class="mdl-dialog" ref="measureDialog">
                    <div v-if="hasMeasurements(type)" class="mdl-dialog__content">
                      <table class="mdl-data-table mdl-js-data-table">
                        <thead>
                          <th>Measurements</th>
                        </thead>
                        <tbody>
                          <tr v-if="type.arm_hole"><td>Arm Hole</td></tr>
                          <tr v-if="type.bicep"><td>Bicep</td></tr>
                          <tr v-if="type.chest"><td>Chest</td></tr>
                          <tr v-if="type.neck"><td>Neck</td></tr>
                          <tr v-if="type.shirt_length"><td>Shirt Length</td></tr>
                          <tr v-if="type.short_sleeve_length"><td>Short Sleeve Length</td></tr>
                          <tr v-if="type.long_sleeve_length"><td>Long Sleeve Length</td></tr>
                          <tr v-if="type.shoulder_width"><td>Shoulder Width</td></tr>
                          <tr v-if="type.bust"><td>Bust</td></tr>
                          <tr v-if="type.breast_point"><td>Breast Point</td></tr>
                          <tr v-if="type.waist_point"><td>Waist Point</td></tr>
                          <tr v-if="type.stomach"><td>Stomach</td></tr>
                          <tr v-if="type.waist_upper"><td>Waist (upper)</td></tr>
                          <tr v-if="type.wrist"><td>Wrist</td></tr>
                          <tr v-if="type.waist_lower"><td>Waist (lower)</td></tr>
                          <tr v-if="type.hips_lower"><td>Hips</td></tr>
                          <tr v-if="type.crotch"><td>Crotch</td></tr>
                          <tr v-if="type.thigh_width"><td>Thigh Width</td></tr>
                          <tr v-if="type.pants_length"><td>Pants Length</td></tr>
                          <tr v-if="type.inseam"><td>Inseam</td></tr>
                          <tr v-if="type.knee"><td>Knee</td></tr>
                          <tr v-if="type.half_hem"><td>Half-hem</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div id="longLines" v-else class="mdl-dialog__content">
                      This Product Type has no Measurements
                    </div>
                    <div class="mdl-dialog__actions">
                      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeMeasure(ndx)">
                        Back
                      </button>
                    </div>
                  </dialog>
                </td>
                <td class="mdl-data-table__cell--non-numeric"><span>&#8369;</span>{{ type.ptPrice }}</td>
                <td class="mdl-data-table__cell--non-numeric">
                  <button id="edit" class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showEdit(ndx)">
                    <i class="material-icons">mode_edit</i>
                  </button>
                  <!-- DIALOG FOR EDIT -->
                  <dialog id="editType" class="mdl-dialog" ref="editDialog">
                    <p class="mdl-dialog__title">Edit this Product Type</p>
                    <div class="mdl-dialog__content">
                      <div>
                           <p>Edit Product Name: <input type="text" v-model="type.ptName"></p>
                           <p>Edit Estimated Price for MTO: <input type="text" v-model="type.ptPrice"></p>
                      </div>
                      <!-- CHECKBOXES FOR MEASUREMENTS -->
                      <div class="mdl-grid">
                        <p>*Edit measurements for this product type</p>
                        <!-- UPPER -->
                        <div class="mdl-cell mdl-cell--6-col">
                          <p>FOR UPPER GARMENTS</p>
                          <input type="checkbox" v-model="type.arm_hole"> Arm Hole<br>
                          <input type="checkbox" v-model="type.bicep"> Bicep<br>
                          <input type="checkbox" v-model="type.chest"> Chest<br>
                          <input type="checkbox" v-model="type.neck"> Neck<br>
                          <input type="checkbox" v-model="type.shirt_length"> Shirt Length<br>
                          <input type="checkbox" v-model="type.short_sleeve_length"> Short Sleeve Length<br>
                          <input type="checkbox" v-model="type.long_sleeve_length"> Long Sleeve Length<br>
                          <input type="checkbox" v-model="type.shoulder_width"> Shoulder Width<br>
                          <input type="checkbox" v-model="type.wrist"> Wrist<br>
                          <input type="checkbox" v-model="type.bust"> Bust<br>
                          <input type="checkbox" v-model="type.breast_point"> Breast Point<br>
                          <input type="checkbox" v-model="type.waist_point"> Waist Point<br>
                          <input type="checkbox" v-model="type.stomach"> Stomach<br>
                          <input type="checkbox" v-model="type.waist_upper"> Waist (upper)<br>
                        </div>
                        <!-- LOWER -->
                        <div class="mdl-cell mdl-cell--6-col">
                          <p>FOR LOWER GARMENTS</p>
                          <input type="checkbox" v-model="type.waist_lower"> Waist (lower) <br>
                          <input type="checkbox" v-model="type.hips_lower"> Hips <br>
                          <input type="checkbox" v-model="type.crotch"> Crotch<br>
                          <input type="checkbox" v-model="type.thigh_width"> Thigh Width<br>
                          <input type="checkbox" v-model="type.pants_length"> Pants Length<br>
                          <input type="checkbox" v-model="type.inseam"> Inseam<br>
                          <input type="checkbox" v-model="type.knee"> Knee<br>
                          <input type="checkbox" v-model="type.half_hem"> Half Hem<br>
                        </div>
                      </div>
                      <p class="hint">(Changes will not affect previous RTWs, RTW reservations, and MTO orders<br>that involves this product type)</p>
                      <div v-if="isEditing" class="mdl-dialog__actions">
                        <div>Editing Product Type... Please Wait...</div>
                      </div>
                      <div v-else class="mdl-dialog__actions">
                        <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" v-on:click="edit(ndx, type.id, type)">
                          <i class="material-icons">done</i>
                        </button>
                        <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" v-on:click="closeEdit(ndx)">
                          <i class="material-icons">clear</i>
                        </button>
                      </div>
                    </div>
                  </dialog>
                  <button class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showDelete(ndx)">
                    <i class="material-icons">delete</i>
                  </button>
                  <!-- DIALOG FOR DELETE -->
                  <dialog id="deleteType" class="mdl-dialog" ref="deleteDialog">
                    <p class="mdl-dialog__title">Are you sure you want to delete this Product Type?</p>
                    <div class="mdl-dialog__content">
                      This product type will still exist in previous RTWs, RTW reservations, and MTO orders.
                    </div>
                    <div v-if="isDeleting" class="mdl-dialog__actions">
                      <div>Deleting Product Type... Please Wait...</div>
                    </div>
                    <div v-else class="mdl-dialog__actions">
                      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click.prevent="ptDelete(type.id)">
                        Delete
                      </button>
                      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeDelete(ndx)">
                        Cancel
                      </button>
                    </div>
                  </dialog>
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
      isEditing: false,
      isDeleting: false,
      isLoading: true,
      isPosting: false,
      tailorId: this.$route.params.id,
      tailorData: {},
      pType: {
        ptName: "",
        arm_hole: false,
        bicep: false,
        chest: false,
        neck: false,
        shirt_length: false,
        short_sleeve_length: false,
        long_sleeve_length: false,
        shoulder_width: false,
        bust: false,
        breast_point: false,
        waist_point: false,
        stomach: false,
        wrist: false,
        waist_upper: false,
        waist_lower: false,
        hips_lower: false,
        crotch: false,
        thigh_width: false,
        pants_length: false,
        inseam: false,
        knee: false,
        half_hem: false,
        ptPrice: "",
        tailor: this.$route.params.id
      },
      types: []
    }
  },
  methods: {
    hasMeasurements(type){
      if(
        type.bicep ||
        type.arm_Hole ||
        type.chest ||
        type.neck ||
        type.shirt_length ||
        type.short_sleeve_length ||
        type.long_sleeve_length ||
        type.shoulder_width ||
        type.bust ||
        type.breast_point ||
        type.waist_point ||
        type.stomach ||
        type.waist_upper ||
        type.wrist ||
        type.waist_lower ||
        type.hips_lower ||
        type.crotch ||
        type.thigh_width ||
        type.pants_length ||
        type.inseam ||
        type.knee ||
        type.half_Hem
      )
        return true;
      else
        return false;
    },
    showDialog: function(){
      this.$refs.addDialog.showModal();
    },
    post: function(){
      if(this.pType.ptPrice == "")
        alert("PLEASE INPUT A PRICE!");
      else if(this.pType.ptName == "")
        alert("PLEASE INPUT A NAME");
      else{
        this.isPosting = true
        this.$http.post('https://nots-76611.firebaseio.com/product_types.json', this.pType).then(function(){
          alert("PRODUCT TYPE ADDED");
        }).then(function(){
          location.reload();
        });
      }
    },
    edit: function(diag, id, data){
      this.isEditing = true;
      this.$firebase.database().ref('product_types').child(id).update(data).then(function(){
        location.reload(true);
      });
    },
    ptDelete: function(id){
      this.isDeleting = true;
      this.$firebase.database().ref('product_types').child(id).remove().then(function(){
        location.reload();
      });
    },
    closeDialog: function(){
      this.$refs.addDialog.close();
    },
    showMeasure: function(diag){
      this.$refs.measureDialog[diag].showModal();
    },
    showEdit: function(diag){
      this.$refs.editDialog[diag].showModal();
    },
    showDelete: function(diag){
      this.$refs.deleteDialog[diag].showModal();
    },
    closeEdit: function(diag){
      location.reload(true);
    },
    closeDelete: function(diag){
      this.$refs.deleteDialog[diag].close();
    },
    closeMeasure: function(diag){
      this.$refs.measureDialog[diag].close();
    }
  },
  beforeCreate() {
    this.$nextTick(() => {
      componentHandler.upgradeDom();
      componentHandler.upgradeAllRegistered();
    });
  },
  created() {
    //Retrieval for product types
    this.$http.get('https://nots-76611.firebaseio.com/product_types.json').then(function(data){
      return data.json();
    }).then(function(data){
      var ptArray = [];
      for (let key in data){
        if(this.$route.params.id == data[key].tailor){
          data[key].id = key;
          ptArray.push(data[key]);
        }
      }
      this.types = ptArray.reverse();
    }).then(function(){ //RETRIEVAL FOR TAILOR DATA
      return this.$http.get('https://nots-76611.firebaseio.com/tailors/' + this.$route.params.id + '.json');
    }).then(function(data){
      return data.json();
    }).then(function(data){
      this.tailorData = data;
    }).then(function(){
      this.isLoading = false;
    })
  },
  mounted() {
    var dialog = document.querySelectorAll('dialog');
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
  color: white;
}
ul li{
  text-align: left;
}
td button{
  text-transform: none;
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
  table-layout: fixed;
  width: 100%;
}
.mdl-button{
  margin-left: 0;
}
.hint{
  font-size: 8pt;
  color: red;
}
.mdl-dialog__content{
  font-size: 14pt;
}
.mdl-js-progress{
  width: 100%;
}
.mdl-layout__header{
  background-color: #21C0C0;
}
#tailorAvatar {
  margin-top: 30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border-style: solid;
  border-width: 5px;
}
#logout {
  color: white;
}
#currentNav{
  background-color: #21C0C0;
  color: white;
}
#addType{
  width: 35%;
  height: auto;
}
#editType{
  width: 35%;
  height: auto;
  text-align: left;
}
#deleteType{
  width: 60%;
  height: auto;
}
#ptNameInput{
  width: 100%;
}
#mDialog{
  width: 15%;
  height: auto;
}
#longLines{
  white-space: pre-line;
}


</style>
