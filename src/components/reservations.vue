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
        <span class="mdl-navigation__link" href="">All Orders</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/products'" exact>
        <span class="mdl-navigation__link" href="">Ready-to-Wear's</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/productTypes'" exact>
        <span class="mdl-navigation__link">My Product Types</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/reservations'" exact>
        <span id="currentNav" class="mdl-navigation__link">RTW reservations</span>
      </router-link>
    </nav>
  </div>
  <!-- MAIN CONTENT -->
  <main class="mdl-layout__content">
    <div class="page-content">
      <div class="mdl-grid">
        <h5>Reservations for RTWs</h5>
      </div>
      <div class="mdl-grid">
        <!-- RESERVATIONS LIST -->
        <table class="mdl-data-table mdl-js-data-table">
          <thead>
            <th></th>
            <th class="mdl-data-table__cell--non-numeric">Product Type</th>
            <th>Customer</th>
            <th>Quantity</th>
            <th>Date Submitted</th>
            <th>Expiration date</th>
            <th>Status</th>
            <th></th>
          </thead>
          <tr v-for="reservation, ndx in reservations">
            <td><img :src="reservation.prodData && reservation.prodData.rtwImg" height="150"></td>
            <td class="mdl-data-table__cell--non-numeric">{{ reservation.Product_name }}</td>
            <td>{{ reservation.userData && reservation.userData.Account_username }}</td>
            <td>{{ reservation.Quantity }}</td>
            <td>{{ reservation.Date_submitted }}</td>
            <td>{{ reservation.dateValid }}</td>
            <td>{{ reservation.Status }}</td>
            <td class="mdl-data-table__cell--non-numeric">
              <button class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showAccept(ndx)">
                <i class="material-icons">done</i>
              </button>
              <!-- DIALOG FOR COMPLETE-->
              <dialog class="mdl-dialog" ref="acceptDialog">
                <p class="mdl-dialog__title">Accept this Reservation?</p>
                <div class="mdl-dialog__content">
                  <p>Reservation valid until:
                  <input type="date" v-model="dateValid"><p>
                  <p>
                    <textarea rows="3" cols="50" placeholder="Enter your remarks here..." v-model="remarks">
                    </textarea>
                  </p>
                </div>
                <div class="mdl-dialog__actions">
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="accept(ndx, reservation, reservation.id)">
                    Accept
                  </button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeAccept(ndx)">
                    Cancel
                  </button>
                </div>
              </dialog>
              <button id="reject" class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showReject(ndx)">
                <i class="material-icons">block</i>
              </button>
              <!-- DIALOG FOR REJECT -->
              <dialog class="mdl-dialog" ref="rejectDialog">
                <p class="mdl-dialog__title">Reject this Reservation?</p>
                <div class="mdl-dialog__content">
                  <p>
                    <textarea rows="3" cols="50" placeholder="Enter your remarks here..." v-model="remarks">
                    </textarea>
                  </p>
                </div>
                <div class="mdl-dialog__actions">
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="reject(ndx, reservation, reservation.id)">
                    Reject
                  </button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click.prevent="closeReject(ndx)">
                    Cancel
                  </button>
                </div>
              </dialog>
              <button class="mdl-button mdl-js-button mdl-button--icon">
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
          <tbody>
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
      reservations: [],
      dateValid: "",
      remarks: ""
    }
  },
  methods: {
    showAccept: function(diabox){
      this.$refs.acceptDialog[diabox].showModal();
    },
    showReject: function(diabox){
      this.$refs.rejectDialog[diabox].showModal();
    },
    accept: function(diabox, index, id){
      index.Status = "Reserved";
      this.$firebase.database().ref('rtw_orders').child(id).update({
        Status: "Reserved",
        dateValid: this.dateValid,
        Remarks: this.remarks
      });
      this.dateValid = "";
      this.remarks = "";
      this.$refs.acceptDialog[diabox].close();
    },
    reject: function(diabox, index, id){
      index.Status = "Rejected";
      this.$firebase.database().ref('rtw_orders').child(id).update({
        Status: "Rejected",
        Remarks: this.remarks
      });
      this.dateValid = "";
      this.remarks = "";
      this.$refs.rejectDialog[diabox].close();
    },
    closeAccept: function(diabox){
      this.$refs.acceptDialog[diabox].close();
    },
    closeReject: function(diabox){
      this.$refs.rejectDialog[diabox].close();
    }
  },
  created() {
    //RETRIEVE RESERVATIONS
    this.$http.get('https://nots-76611.firebaseio.com/rtw_orders.json').then(function(data){
      return data.json();
    }).then(function(data){
      var rtwArray = [];
      for (let key in data){
        if((data[key].Tailor_id == this.$route.params.id) && (data[key].Status != "Deleted")){
          //RETRIEVE PRODUCT ACCORDING TO PRODUCT ID
          this.$http.get('https://nots-76611.firebaseio.com/ready_to_wears/' + data[key].Product_uid + '.json').then(function(proddata){
            return proddata.json();
          }).then(function(proddata){
            this.$set(data[key], 'prodData', proddata);
          });
          //RETRIEVE USER ACCORDING TO USER ID
          this.$http.get('https://nots-76611.firebaseio.com/Users/' + data[key].User_uid + '.json').then(function(userdata){
            return userdata.json();
          }).then(function(userdata){
            this.$set(data[key], 'userData', userdata);
          });
          data[key].id = key;
          rtwArray.push(data[key]);
        }
      }
      this.reservations = rtwArray;
      console.log(this.reservations);
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
