<template>
  <div>
    <!-- BEGIN TEMPLATE -->
  <div v-if="isLoading" id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <h3>Welcome To Naga Online Tailoring Services</h3>
        <div class="mdl-layout-spacer"></div>
        <div>
        <router-link v-bind:to="'/nots/'" exact>
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
        <span class="mdl-navigation__link" href=""><i class="material-icons">content_cut</i> MTO Orders</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/reservations'" exact>
        <span class="mdl-navigation__link"><i class="material-icons">content_paste</i> RTW reservations</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/productTypes'" exact>
        <span class="mdl-navigation__link"><i class="material-icons">style</i> My Product Types</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/products'" exact>
        <span id="currentNav" class="mdl-navigation__link" href=""><i class="material-icons">store_mall_directory</i> Ready-to-Wears</span>
      </router-link>
    </nav>
  </div>
  <!-- MAIN CONTENT -->
  <main class="mdl-layout__content">
    <div class="page-content">
        <div class="mdl-grid">
          <h5>Ready-to-Wear's</h5>
        </div>
        <div class="mdl-grid">
          <router-link v-bind:to="'/nots/' + tailorId + '/products/addProducts'" exact>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
              <i class="material-icons">add_circle</i> Add a RTW
            </button>
          </router-link>
        </div>
        <!-- SEARCH FOR TYPE -->
        <div id="searchField">
          Search by Product Type:
          <input type="text" v-model="search">
        </div>
        <div class="mdl-grid">
          <!-- PRODUCT LIST -->
          <table class="mdl-data-table mdl-js-data-table">
            <thead>
              <tr>
                <th class="mdl-data-table__cell--non-numeric">Image</th>
                <th class="mdl-data-table__cell--non-numeric">
                  Product Type
                </th>
                <th class="mdl-data-table__cell--non-numeric">
                  Fabric
                </th>
                <th class="mdl-data-table__cell--non-numeric">
                  Size
                  <!-- SIZE FILTER -->
                  <select v-model="sizeSearch">
                    <option>All</option>
                    <option>XXXS</option>
                    <option>XXS</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                    <option>XXXL</option>
                  </select>
                </th>
                <th>Price</th>
                <th>Reserved</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rtw, ndx in filteredProds">
                <td class="mdl-data-table__cell--non-numeric">
                  <img :src="rtw.rtwImg" height="150" v-on:click="showInfo(ndx)">
                </td>
                <!-- DIALOG FOR INFO -->
                <dialog id="RTWinfo" class="mdl-dialog" ref="infoDialog">
                  <p class="mdl-dialog__content">RTW Information</p>
                  <div class="mdl-dialog__content">
                    <img :src="rtw.rtwImg" height="250">
                    <p>{{ rtw.rtwDescription }}</p>
                  </div>
                  <div class="mdl-dialog__actions">
                    <button class="mdl-button mdl-js-button mdl-button--colored mdl-button--raised mdl-js-ripple-effect" v-on:click="closeInfo(ndx)">
                      OK
                    </button>
                  </div>
                </dialog>
                <td id="pType" class="mdl-data-table__cell--non-numeric">{{ rtw.type }}</td>
                <td class="mdl-data-table__cell--non-numeric">{{ rtw.fabric }}</td>
                <td class="mdl-data-table__cell--non-numeric">{{ rtw.size }}</td>
                <td>{{ rtw.rtwPrice }}php</td>
                <td>{{ rtw.reserved }}</td>
                <td id="stockEdit">
                  {{ rtw.rtwStock }}
                  <button class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showEdit(ndx)">
                    <i class="material-icons">mode_edit</i>
                  </button>
                  <!-- DIALOG FOR EDIT -->
                  <dialog id="editStock" class="mdl-dialog" ref="editDialog">
                    <div class="mdl-dialog__content">
                      <p>Edit Stock: <input type="text" v-model="rtw.rtwStock"></p>
                    </div>
                    <div class="mdl-dialog__actions">
                      <div v-if="isEditing" class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
                      <button v-else class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" v-on:click="stockEdit(ndx, rtw, rtw.id)">
                        <i class="material-icons">done</i>
                      </button>
                      <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored" v-on:click="closeEdit(ndx)">
                        <i class="material-icons">clear</i>
                      </button>
                    </div>
                  </dialog>
                </td>
                <td>
                  <button class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showDelete(ndx)">
                    <i class="material-icons">delete</i>
                  </button>
                  <!-- DIALOG FOR DELETE -->
                  <dialog id="deleteRTW" class="mdl-dialog" ref="deleteDialog">
                    <div v-if="rtw.reserved==0" class="mdl-dialog__title">
                      Are you sure you want to delete this RTW?
                    </div>
                    <div v-else class="mdl-dialog__title">
                      You can't Delete this RTW!
                    </div>
                    <div class="mdl-dialog__content">
                      <p v-if="rtw.reserved!=0"> There are {{ rtw.reserved }} reservations on this product. Complete those reservations first!</p>
                    </div>
                    <div v-if="isDeleting" class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
                    <div class="mdl-dialog__actions">
                      <button v-if="rtw.reserved==0" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="deleteRTW(rtw.id)">
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
      search: '',
      sizeSearch: "All",
      tailorId: this.$route.params.id,
      tailorData: {},
      fabrics: [],
      sizes: [],
      types: [],
      rtws: []
    }
  },
  methods: {
    stockEdit: function(diag, data, id){
      let diaBox = this.$refs.editDialog[diag];
      let index = data;
      let editing = this.isEditing;
      this.isEditing = true;
      this.$firebase.database().ref('ready_to_wears').child(id).update({rtwStock: index.rtwStock}).then(function(){
        location.reload();
      })
    },
    deleteRTW: function(id){
      this.isDeleting = true;
      this.$firebase.database().ref('ready_to_wears').child(id).remove().then(function(){
        location.reload();
      });
    },
    showInfo: function(diag){
      this.$refs.infoDialog[diag].showModal();
    },
    showDelete: function(diag){
      this.$refs.deleteDialog[diag].showModal();
    },
    showEdit: function(diag){
      this.$refs.editDialog[diag].showModal();
    },
    closeInfo: function(diag){
      this.$refs.infoDialog[diag].close();
    },
    closeDelete: function(diag){
      this.$refs.deleteDialog[diag].close();
    },
    closeEdit: function(diag){
      this.$refs.editDialog[diag].close();
    }
  },
  computed: {
    filteredProds: function(){
      let search2;
      let newArr;
      if(this.sizeSearch == "All")
        search2 = "";
      else
        search2 = this.sizeSearch;
      newArr = this.rtws.filter((rtw) =>{
        return (
          rtw.type.toLowerCase().includes(this.search.toLowerCase()) &&
          rtw.size.includes(search2)
        );
      });
      return newArr.reverse();
    },
  },
  beforeCreate() {
    this.$nextTick(() => {
      componentHandler.upgradeDom();
      componentHandler.upgradeAllRegistered();
    });
  },
  created() {
    //Retrieval for rtws
    this.$http.get('https://nots-76611.firebaseio.com/ready_to_wears.json').then(function(data){
      return data.json();
    }).then(function(data){
      var rtwArray = [];
      for (let key in data){
        if(this.$route.params.id == data[key].tailor_id){
            data[key].id = key;
            rtwArray.push(data[key]);
        }
      }
      this.rtws = rtwArray.reverse();
    }).then(function(){//RETRIEVE TAILOR DATA
      return this.$http.get('https://nots-76611.firebaseio.com/tailors/' + this.tailorId + '.json');
    }).then(function(data){
      return data.json();
    }).then(function(data){
      this.tailorData = data;
    }).then(function(data){
      this.isLoading = false;
    });
  },
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
.mdl-textfield--expandable{
  padding: 0px 0;
}
.mdl-js-progress{
  width: 100%;
}
.mdl-layout__header{
  background-color: #21C0C0;
}
.mdl-dialog__content{
  font-size: 14pt;
  white-space: pre-line;
}
#pType{
  white-space: pre-line;
}
#stockEdit{
  font-size: 12pt;
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
#searchField{
  margin-top: 10px;
  margin-left: 10px;
}
#deleteRTW{
  width: 50%;
  height: auto;
}
#RTWinfo{
  width: 25%;
  height: auto;
}

</style>
