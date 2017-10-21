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
        <span id="currentNav" class="mdl-navigation__link" href=""><i class="material-icons">content_cut</i> MTO Orders</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/products'" exact>
        <span class="mdl-navigation__link" href=""><i class="material-icons">store_mall_directory</i> Ready-to-Wears</span>
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
                <th>Customer Info</th>
                <th>Status</th>
                <th>Tentative Date of Finish</th>
                <th>Accept Order</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order, ndx in orders">
                <td class="mdl-data-table__cell--non-numeric">{{ order.Product_Type }}</td>
                <td>
                <button id="measurements" class="mdl-button mdl-js-button mdl-js-ripple-effect" v-on:click="showMeasurements(ndx)">
                  See Measurements
                </button>
                <!-- DIALOG FOR MEASUREMENTS -->
                <dialog class="mdl-dialog" ref="measurementDialog">
                  <h4 class="mdl-dialog__title">Customer's measurements</h4>
                  <div class="mdl-dialog__content">
                    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                      <tbody>
                        <tr v-if="order.Arm_hole"><td>Arm Hole = {{ order.Arm_hole }}</td></tr>
                        <tr v-if="order.Bicep"><td>Bicep = {{ order.Bicep }}</td></tr>
                        <tr v-if="order.Chest"><td>Chest = {{ order.Chest }}</td></tr>
                        <tr v-if="order.Neck"><td>Neck = {{ order.Neck }}</td></tr>
                        <tr v-if="order.Shirt_Length"><td>Shirt Length = {{ order.Shirt_Lenght }}</td></tr>
                        <tr v-if="order.Short_Sleeve"><td>Short Sleeve Length = {{ order.Short_Sleeve }}</td></tr>
                        <tr v-if="order.Long_Sleeve"><td>Long Sleeve Length = {{ order.Long_Sleeve }}</td></tr>
                        <tr v-if="order.Shoulder_Width"><td>Shoulder Width = {{ order.Shoulder_Width }}</td></tr>
                        <tr v-if="order.Bust"><td>Bust = {{ order.Bust }}</td></tr>
                        <tr v-if="order.Breast_Point"><td>Breast Point = {{ order.Breast_Point}}</td></tr>
                        <tr v-if="order.Waist_Point"><td>Waist Point = {{ order.Waist_Point }}</td></tr>
                        <tr v-if="order.Stomach"><td>Stomach = {{ order.Stomach }}</td></tr>
                        <tr v-if="order.Wrist"><td>Wrist= {{ order.Wrist }}</td></tr>
                        <tr v-if="order.Waist_Upper"><td>Waist (Upper) = {{ order.Waist_Upper }}</td></tr>
                        <tr v-if="order.Hips_Upper"><td>Hips (Upper) = {{ order.Hips_Upper }}</td></tr>
                        <tr v-if="order.Waist_Lower"><td>Waist (Lower) = {{ order.Waist_Lower }}</td></tr>
                        <tr v-if="order.Hips_Lower"><td>Hips (Lower) = {{ order.Hips_Lower }}</td></tr>
                        <tr v-if="order.Crotch"><td>Crotch = {{ order.Crotch }}</td></tr>
                        <tr v-if="order.Thigh_Width"><td>Thigh Width = {{ order.Thigh_Width }}</td></tr>
                        <tr v-if="order.Pants_Length"><td>Pants Length = {{ order.Pants_Length }}</td></tr>
                        <tr v-if="order.Inseam"><td>Inseam = {{ order.Inseam }}</td></tr>
                        <tr v-if="order.Knee"><td>Knee = {{ order.Knee }}</td></tr>
                        <tr v-if="order.Half_Hem"><td>Half-hem = {{ order.Half_Hem }}</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="mdl-dialog__actions">
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeMeasurements(ndx)">
                      OK
                    </button>
                  </div>
                </dialog>
                </td>
                <td>{{ order.Quantity }}</td>
                <td>
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect" v-on:click="showUser(ndx)">
                  See customer info
                </button>
                <!-- DIALOG FOR USER-->
                <dialog class="mdl-dialog" ref="userDialog">
                  <h4 class="mdl-dialog__title">Customer's Information</h4>
                  <div class="mdl-dialog__content">
                    {{ order.userData && order.userData.Account_username }}
                  </div>
                  <div class="mdl-dialog__actions">
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeUser(ndx)">
                      OK
                    </button>
                  </div>
                </dialog>
                </td>
                <td>{{ order.Status }}</td>
                <td>{{ order.dateFinish }}</td>
                <td>
                  <button id="accept" class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showAccept(ndx, order.id)">
                    <i class="material-icons">assignment_turned_in</i>
                  </button>
                  <!-- DIALOG FOR ACCEPT-->
                  <dialog class="mdl-dialog" ref="acceptDialog">
                    <h4 class="mdl-dialog__title">Accept MTO request?</h4>
                    <div class="mdl-dialog__content">
                      <p>Tentative date of finish:
                      <input type="date" v-model="dateFinish"><p>
                      <p>
                        <textarea rows="3" cols="50" placeholder="Enter your remarks here..." v-model="remarks">
                        </textarea>
                      </p>
                    </div>
                    <div class="mdl-dialog__actions">
                      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click.prevent="accept(ndx, order.id)">
                        Accept
                      </button>
                      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeAccept(ndx)">
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
      isLoading: true,
      tailorId: this.$route.params.id,
      users: [],
      orders: [],
      tailorData: {},
      remarks: "",
      dateFinish: ""
    }
  },
  methods: {
    accept: function(diabox, id){
      this.$firebase.database().ref('Orders').child(id).update({
        Status: "Accepted",
        dateFinish: this.dateFinish,
        Tailor_Remarks: this.remarks
      }).then(function(){
        location.reload(true);
      });
    },
    showMeasurements: function(diabox){
      this.$refs.measurementDialog[diabox].showModal();
    },
    closeMeasurements: function(diabox){
      this.$refs.measurementDialog[diabox].close();
    },
    showUser: function(diabox){
      this.$refs.userDialog[diabox].showModal();
    },
    closeUser: function(diabox){
      this.$refs.userDialog[diabox].close();
    },
    showAccept: function(diabox, id){
      this.$refs.acceptDialog[diabox].showModal();
    },
    closeAccept: function(diabox){
      this.$refs.acceptDialog[diabox].close();
    }
  },
  beforeCreate() {
    this.$nextTick(() => {
      componentHandler.upgradeDom();
      componentHandler.upgradeAllRegistered();
    });
  },
  created() {
    //RETRIEVE ORDERS
    this.$http.get('https://nots-76611.firebaseio.com/Orders.json').then(function(data){
        return data.json();
    }).then(function(data){
        var ordersArray = [];
        for (let key in data){
          if(this.$route.params.id == data[key].TailorId){
            this.$http.get('https://nots-76611.firebaseio.com/Users/' + data[key].CustomerId + '.json').then(function(userData){
              return userData.json();
            }).then(function(userData){
              this.$set(data[key], 'userData', userData);
            }).then(function(){
              data[key].id = key;
              ordersArray.push(data[key]);
            });
          }
        }
        this.orders = ordersArray.reverse();
    }).then(function(){ //RETRIEVE TAILOR'S DATA
      return this.$http.get('https://nots-76611.firebaseio.com/tailors/' + this.tailorId + '.json');
    }).then(function(data){
      return data.json();
    }).then(function(data){
      this.tailorData = data;
    }).then(function(){ //HIDE SPINNER
      this.isLoading = false;
    });
    //COMPONENT UPGRADE
    //this.$nextTick(() => {
    //  componentHandler.upgradeDom();
    //  componentHandler.upgradeAllRegistered();
  //  });
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
li{
  text-align: left;
}
li, a{
  text-decoration: none;
  color: white;
}
dialog{
  height: auto;
  width: 35%;
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


</style>
