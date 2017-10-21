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
      <router-link v-bind:to="'/nots/' + tailorId + '/products'" exact>
        <span id="currentNav" class="mdl-navigation__link" href=""><i class="material-icons">store_mall_directory</i> Ready-to-Wears</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/productTypes'" exact>
        <span class="mdl-navigation__link"><i class="material-icons">style</i> My Product Types</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/reservations'" exact>
        <span class="mdl-navigation__link"><i class="material-icons">content_paste</i> RTW reservations</span>
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
                    <option></option>
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
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rtw in filteredProds">
                <td class="mdl-data-table__cell--non-numeric">
                  <img :src="rtw.rtwImg" height="150">
                </td>
                <td class="mdl-data-table__cell--non-numeric">{{ rtw.type }}</td>
                <td class="mdl-data-table__cell--non-numeric">{{ rtw.fabric }}</td>
                <td class="mdl-data-table__cell--non-numeric">{{ rtw.size }}</td>
                <td>{{ rtw.rtwPrice }}php</td>
                <td>{{ rtw.rtwStock }}</td>
                <td>
                  <i class="material-icons">delete</i>
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
      isLoading: true,
      search: '',
      sizeSearch: '',
      tailorId: this.$route.params.id,
      tailorData: {},
      fabrics: [],
      sizes: [],
      types: [],
      rtws: []
    }
  },
  methods: {

  },
  computed: {
    filteredProds: function(){
      return this.rtws.filter((rtw) =>{
        return (
          rtw.type.toLowerCase().includes(this.search.toLowerCase()) &&
          rtw.size.includes(this.sizeSearch)
        );
      });
    }
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
      this.rtws = rtwArray;
    }).then(function(){//RETRIEVE TAILOR DATA
      return this.$http.get('https://nots-76611.firebaseio.com/tailors/' + this.tailorId + '.json');
    }).then(function(data){
      return data.json();
    }).then(function(data){
      this.tailorData = data;
    }).then(function(data){
      this.isLoading = false;
    });
    //COMPONENT UPGRADE
    this.$nextTick(() => {
      componentHandler.upgradeDom();
      componentHandler.upgradeAllRegistered();
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

</style>
