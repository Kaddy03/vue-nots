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
        <span class="mdl-navigation__link" href=""><i class="material-icons">store_mall_directory</i> Ready-to-Wears</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/productTypes'" exact>
        <span class="mdl-navigation__link"><i class="material-icons">style</i> My Product Types</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/reservations'" exact>
        <span id="currentNav" class="mdl-navigation__link"><i class="material-icons">content_paste</i> RTW reservations</span>
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
        Search by Customer:
        <input type="text" v-model="search">
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
            <th>
              Status:
              <select v-model="statSearch">
                <option>Pending</option>
                <option>Rejected</option>
                <option>Reserved</option>
              </select>
            </th>
            <th></th>
          </thead>
          <tbody>
          <tr v-for="reservation, ndx in filteredRs">
            <td><img :src="reservation.Product_image" height="150"></td>
            <td class="mdl-data-table__cell--non-numeric">{{ reservation.Product_name }}</td>
            <td>
              {{ reservation.userData && reservation.userData.Account_username }}
              <button class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showInfo(ndx)">
                <i class="material-icons">info_outline</i>
              </button>
              <!-- DIALOG FOR INFO -->
              <dialog id="infoBox" class="mdl-dialog" ref="infoDialog">
                <p class="mdl-dialog__title">Customer Information</p>
                <div class="mdl-dialog__content">
                  <div>
                    <img :src="reservation.userData.Image" height="150">
                  </div>
                  <div>
                    <p>Name: {{ reservation.userData.Account_username }}</p>
                    <p>Contact Number: {{ reservation.userData.Phone_number }}</p>
                    <p>Address: {{ reservation.userData.Address }}</p>
                  </div>
                </div>
                <div class="mdl-dialog__actions">
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeInfo(ndx)">
                    Ok
                  </button>
                </div>
              </dialog>
            </td>
            <td>{{ reservation.Quantity }}</td>
            <td>{{ reservation.Date_ordered }}</td>
            <td>{{ reservation.dateValid }}</td>
            <td>{{ reservation.Status }}</td>
            <td class="mdl-data-table__cell--non-numeric">
              <button v-if="reservation.Status=='Pending'" class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showAccept(ndx)">
                <i class="material-icons">done</i>
              </button>
              <!-- DIALOG FOR ACCEPT-->
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
                  <div v-if="isAccepting" class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
                  <button v-else class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="accept(ndx, reservation.Quantity, reservation.id, reservation.Product_uid)">
                    Accept
                  </button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeAccept(ndx)">
                    Cancel
                  </button>
                </div>
              </dialog>
              <button v-if="(reservation.Status!='Completed')&&(reservation.Status!='Rejected')" id="reject" class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showReject(ndx)">
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
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="reject(ndx, reservation.id)">
                    Reject
                  </button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click.prevent="closeReject(ndx)">
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
      isAccepting: false,
      isLoading: true,
      search: "",
      statSearch: "Pending",
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
    showInfo: function(diabox){
      this.$refs.infoDialog[diabox].showModal();
    },
    accept: function(diabox, quantity, id, prodId){
      let q = quantity;
      let firebase = this.$firebase
      firebase.database().ref('rtw_orders').child(id).update({
        Status: "Reserved",
        dateValid: this.dateValid,
        Remarks: this.remarks
      }).then(function(){
        return firebase.database().ref('ready_to_wears').child(prodId).update({reserved: reserved + q});
      }).then(function(){
        location.reload();
      })
    },
    reject: function(diabox, id){
      this.$firebase.database().ref('rtw_orders').child(id).update({
        Status: "Rejected",
        Remarks: this.remarks
      }).then(function(){
        location.reload();
      });
    },
    closeAccept: function(diabox){
      this.$refs.acceptDialog[diabox].close();
      this.remarks = "";
      this.dateValid = "";
    },
    closeReject: function(diabox){
      this.$refs.rejectDialog[diabox].close();
      this.remarks = "";
    },
    closeInfo: function(diabox){
      this.$refs.infoDialog[diabox].close();
    }
  },
  computed: {
    filteredRs: function(){
      return this.reservations.filter((r) =>{
        return (
          r.Status.includes(this.statSearch) &&
          r.userData.Account_username.includes(this.search)
        );
      });
    },
  },
  beforeCreate() {
    this.$nextTick(() => {
      componentHandler.upgradeDom();
      componentHandler.upgradeAllRegistered();
    });
  },
  created() {
    //RETRIEVE RESERVATIONS
    this.$http.get('https://nots-76611.firebaseio.com/rtw_orders.json').then(function(data){
      return data.json();
    }).then(function(data){
      var rtwArray = [];
      for (let key in data){
        if(data[key].Tailor_id == this.$route.params.id){
          //RETRIEVE USER ACCORDING TO USER ID
          this.$http.get('https://nots-76611.firebaseio.com/Users/' + data[key].User_uid + '.json').then(function(userdata){
            return userdata.json();
          }).then(function(userdata){
            return this.$set(data[key], 'userData', userdata);
          }).then(function(){
            return this.$http.get('https://nots-76611.firebaseio.com/ready_to_wears/' + data[key].Product_uid + '.json');
          }).then(function(prodData){
            return this.$set(data[key], 'prodData', prodData);
          }).then(function(){
            data[key].id = key;
            rtwArray.push(data[key]);
          })
        }
      }
      this.reservations = rtwArray.reverse();
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
.mdl-js-progress{
  width: 100%;
}
.mdl-dialog__content{
  font-size: 14pt;
}
.mdl-layout__header{
  background-color: #21C0C0;
}
.mdl-dialog__content{
  font-size: 14pt;
  white-space: pre-line;
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
#infoBox{
  width: 30%;
  height: auto;
  text-align: left;
}
#currentNav{
  background-color: #21C0C0;
  color: white;
}


</style>
