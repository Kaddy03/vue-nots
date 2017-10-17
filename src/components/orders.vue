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
        <span id="currentNav" class="mdl-navigation__link" href="">All Orders</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/products'" exact>
        <span class="mdl-navigation__link" href="">Ready-to-Wear's</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/productTypes'" exact>
        <span class="mdl-navigation__link">My Product Types</span>
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
                <th>Preferred Tailor</th>
                <th>Customer Info</th>
                <th>Accepted?</th>
                <th>Accept Order</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order, ndx in orders">
                <td class="mdl-data-table__cell--non-numeric">{{ order.productType }}</td>
                <td>
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect" v-on:click="showMeasurements(ndx)">
                  See Measurements
                </button>
                <!-- DIALOG FOR MEASUREMENTS -->
                <dialog class="mdl-dialog" ref="measurementDialog">
                  <h4 class="mdl-dialog__title">Customer's measurements</h4>
                  <div class="mdl-dialog__content">
                    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                      <tbody>
                        <tr v-for="measurement in order.measurementsArray">
                          <td>{{ measurement[0] }}</td>
                          <td>{{ measurement[1] }}</td>
                        </tr>
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
                <td>{{ order.quantity }}</td>
                <td>{{ order.tailorShops }}</td>
                <td>{{ order.accepted }}</td>
                <td>
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect" v-on:click="showUser(ndx)">
                  See customer info
                </button>
                <!-- DIALOG FOR USER-->
                <dialog class="mdl-dialog" ref="userDialog">
                  <h4 class="mdl-dialog__title">Customer's Information</h4>
                  <div class="mdl-dialog__content">
                    {{ order.userData && order.userData.Address }}
                  </div>
                  <div class="mdl-dialog__actions">
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeUser(ndx)">
                      OK
                    </button>
                  </div>
                </dialog>
                </td>
                <td>
                  <button id="accept" class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showAccept(ndx, order.id)">
                    <i class="material-icons">assignment_turned_in</i>
                  </button>
                  <!-- DIALOG FOR ACCEPT-->
                  <dialog class="mdl-dialog" ref="acceptDialog">
                    <h4 class="mdl-dialog__title">Accept MTO request?</h4>
                    <div class="mdl-dialog__content">
                      <div>
                        Tentative date of finish:
                        <input type="date">
                      </div>
                      <div>
                        Type your Remarks below:
                      </div>
                      <div>
                        <textarea rows="3">
                        </textarea>
                      </div>
                    </div>
                    <div class="mdl-dialog__actions">
                      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="closeAccept(ndx)">
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
      tailorId: this.$route.params.id,
      users: [],
      orders: [],
      tailorData: {}
    }
  },
  methods: {
    showMeasurements: function(diabox){
      this.$refs.measurementDialog[diabox].showModal();
    },
    closeMeasurements: function(diabox){
      this.$refs.measurementDialog[diabox].close();
    },
    showUser: function(diabox){
      this.$refs.userDialog[diabox].showModal();
      console.log(this.orders);
    },
    closeUser: function(diabox){
      this.$refs.userDialog[diabox].close();
    },
    showAccept: function(diabox, id){
      this.$refs.acceptDialog[diabox].showModal();
      console.log(id);
    },
    closeAccept: function(diabox){
      this.$refs.acceptDialog[diabox].close();
    }
  },
  created() {
    //RETRIEVE ORDERS
    this.$http.get('https://nots-76611.firebaseio.com/Orders.json').then(function(data){
        return data.json();
    }).then(function(data){
        var ordersArray = [];
        for (let key in data){
            data[key].id = key;
            data[key].measurementsArray = Object.entries(data[key].measurements).sort();
            this.$http.get('https://nots-76611.firebaseio.com/Users/' + data[key].userId + '.json').then(function(userdata){
              return userdata.json();
            }).then(function(userdata){
              this.$set(data[key], 'userData', userdata);
            });
            ordersArray.push(data[key]);
        }
        this.orders = ordersArray;
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
#currentNav{
  background-color: #21C0C0;
  color: white;
}


</style>
