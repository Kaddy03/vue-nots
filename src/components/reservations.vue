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
        <span class="mdl-navigation__link" href=""><i class="material-icons">content_cut</i> MTO Requests</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/reservations'" exact>
        <span id="currentNav" class="mdl-navigation__link"><i class="material-icons">content_paste</i> RTW reservations</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/productTypes'" exact>
        <span class="mdl-navigation__link"><i class="material-icons">style</i> My Product Types</span>
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
        <h5>Reservations for RTWs</h5>
      </div>
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--3-col">
          Search by Customer:
          <input type="text" v-model="search">
        </div>
        <div class="mdl-cell mdl-cell--3-col">
          Search by Product Type:
          <input type="text" v-model="typeSearch">
        </div>
        <div class="mdl-cell mdl-cell--3-col"></div>
        <div class="mdl-cell mdl-cell--3-col"></div>
      </div>
      <div class="mdl-grid">
        <!-- RESERVATIONS LIST -->
        <table class="mdl-data-table mdl-js-data-table">
          <thead>
            <th>RTW Image</th>
            <th class="mdl-data-table__cell--non-numeric">Product Type</th>
            <th>Customer</th>
            <th>Quantity</th>
            <th>Date Submitted<br>(YYYY-MM-DD)</th>
            <th>Expiration date<br>(YYY-MM-DD)</th>
            <th>
              Status:
              <select v-model="statSearch">
                <option>All</option>
                <option>Pending</option>
                <option>Reserved</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </th>
            <th></th>
          </thead>
          <tbody>
          <tr v-for="reservation, ndx in filteredRs">
            <td><img :src="reservation.Product_image" height="150"></td>
            <td id="longLines" class="mdl-data-table__cell--non-numeric">
              <template v-if="reservation.prodData">
              <p id="pType">{{ reservation.Product_name }}</p>
              <button class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showRTW(ndx)">
                <i class="material-icons">info_outline</i>
              </button>
              <!-- DIALOG FOR RTW INFO -->
              <dialog class="mdl-dialog" ref="rtwDialog">
                <h4 class="mdl-dialog__title">RTW Information</h4>
                <div class="mdl-dialog__content">
                  <div>
                    <img :src="reservation.Product_image" height="150">
                  </div>
                  <div>
                    <p>
                      Type: {{ reservation.prodData.type }}<br>
                      Color: {{ reservation.prodData.rtwColor }}<br>
                      Fabric: {{ reservation.prodData.fabric }}<br>
                      Description:<br>{{ reservation.prodData.rtwDescription }}<br><br>
                      Price: <span>&#8369;</span>{{ reservation.prodData.rtwPrice }}<br>
                      Number of Stock: {{ reservation.prodData.rtwStock }}<br>
                      Reservations for this RTW: {{ reservation.prodData.reserved }}
                    </p>
                  </div>
                </div>
              </dialog>
              </template>
              <template v-else>RTW has been deleted!</template>
            </td>
            <td>
              {{ reservation.userData && reservation.userData.Account_name }}
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
                    <p>
                      Name: {{ reservation.userData.Account_name }}<br>
                      Contact Number: {{ reservation.userData.Phone_number }}<br>
                      Email Address: {{ reservation.userData.Email_address }}<br>
                      Address: {{ reservation.userData.Address }}
                    </p>
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
            <td id="longLines">{{ compDate(reservation.dateValid) }}</td>
            <td>{{ reservation.Status }}</td>
            <td class="mdl-data-table__cell--non-numeric">
              <template v-if="reservation.prodData">
              <div v-if="reservation.Status=='Pending'">
                <button  class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showAccept(ndx)">
                  <i class="material-icons">done</i>
                </button>
                Accept
              </div>
              <!-- DIALOG FOR RESERVE-->
              <dialog id="reserve" class="mdl-dialog" ref="acceptDialog">
                <h4 v-if="canReserve(reservation.prodData.rtwStock, reservation.Quantity, reservation.prodData.reserved)" class="mdl-dialog__title">Accept Reservation for this Item?</h4>
                <h4 v-else class="mdl-dialog__title">You cannot accept this reservation!</h4>
                <div v-if="canReserve(reservation.prodData.rtwStock, reservation.Quantity, reservation.prodData.reserved)" class="mdl-dialog__content">
                  <div>
                    <img :src="reservation.Product_image" height="150">
                  </div>
                  <div>
                    <p>
                      Type: {{ reservation.prodData.type }}<br>
                      Color: {{ reservation.prodData.rtwColor }}<br>
                      Fabric: {{ reservation.prodData.fabric }}<br>
                      Number of Stock: {{ reservation.prodData.rtwStock }}<br><br>

                      Reserved by {{ reservation.userData.Account_name }} on {{ reservation.Date_ordered }}<br>
                      Reservation Quantity: {{ reservation.Quantity }}<br>
                    </p>
                  </div>
                  <hr>
                  <p>Reservation valid until:
                  <input type="date" v-model="dateValid"><p>
                  <p>
                    <textarea rows="3" cols="50" placeholder="Enter your remarks here..." v-model="remarks">
                    </textarea>
                  </p>
                </div>
                <div v-else class="mdl-dialog__content">
                  <div>
                    <img :src="reservation.Product_image" height="150">
                  </div>
                  <div>
                    <p>
                      Type: {{ reservation.prodData.type }}<br>
                      Color: {{ reservation.prodData.rtwColor }}<br>
                      Fabric: {{ reservation.prodData.fabric }}<br>
                      Number of Stock: {{ reservation.prodData.rtwStock }}<br><br>
                      Reserved by {{ reservation.userData.Account_name }} on {{ reservation.Date_ordered }}<br>
                      Reservation Quantity: {{ reservation.Quantity }}
                    </p>
                  </div>
                  <hr>
                  <p id="longLines">
                    The current number of available stocks of this RTW can't accomodate for the quantity of this reservation.
                    Please increase your stock and edit the stock number of this product in the Ready-to-Wears section or
                    request the customer to submit this as an MTO request instead.
                  </p>
                </div>
                <div v-if="isReserving" class="mdl-dialog__actions">
                  <div>Reserving... Please Wait...</div>
                </div>
                <!-- ACTIONS FOR RESERVE -->
                <div v-else class="mdl-dialog__actions">
                  <button v-if="canReserve(reservation.prodData.rtwStock, reservation.Quantity, reservation.prodData.reserved)" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="reserve(ndx, reservation.Quantity, reservation.id, reservation.Product_uid, reservation.prodData.reserved)">
                    Reserve
                  </button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeReserve(ndx)">
                    Cancel
                  </button>
                </div>
              </dialog>
              <div v-if="reservation.Status=='Reserved'">
                <button class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showComplete(ndx)">
                  <i class="material-icons">done_all</i>
                </button>
                Complete
              </div>
              <!-- DIALOG FOR COMPLETE -->
              <dialog id="complete" class="mdl-dialog" ref="completeDialog">
                <h4 class="mdl-dialog__title">Is this Reservation Complete?</h4>
                <div class="mdl-dialog__content">
                  <div>
                    <img :src="reservation.Product_image" height="150">
                  </div>
                  <div>
                    <p>
                      Type: {{ reservation.prodData.type }}<br>
                      Color: {{ reservation.prodData.rtwColor }}<br>
                      Fabric: {{ reservation.prodData.fabric }}<br><br>
                      Reservation Requested by {{ reservation.userData.Account_username }}<br>
                      Reservation Quantity: {{ reservation.Quantity }}
                    </p>
                  </div>
                </div>
                <div v-if="isCompleting" class="mdl-dialog__actions">
                  <div>Completing... Please Wait...</div>
                </div>
                <!-- COMPLETE ACTIONS -->
                <div v-else class="mdl-dialog__actions">
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="complete(ndx, reservation.Quantity, reservation.id, reservation.Product_uid, reservation.prodData.reserved, reservation.prodData.rtwStock)">
                    Yes
                  </button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeComplete(ndx)">
                    No
                  </button>
                </div>
              </dialog>
              <div v-if="reservation.Status=='Reserved'">
                <button class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showCancel(ndx)">
                  <i class="material-icons">cancel</i>
                </button>
                Cancel
              </div>
              <!-- DIALOG FOR CANCEL -->
              <dialog id="cancel" class="mdl-dialog" ref="cancelDialog">
                <h4 class="mdl-dialog__title">Cancel this Reservation?</h4>
                <div class="mdl-dialog__content">
                  <div>
                    <img :src="reservation.Product_image" height="150">
                  </div>
                  <div>
                    <p>
                      Type: {{ reservation.prodData.type }}<br>
                      Color: {{ reservation.prodData.rtwColor }}<br>
                      Fabric: {{ reservation.prodData.fabric }}<br><br>
                      Reservation Requested by {{ reservation.userData.Account_name }}<br>
                      Reservation Quantity: {{ reservation.Quantity }}
                    </p>
                  </div>
                </div>
                <div v-if="isCancelling" class="mdl-dialog__actions">
                  <div>Cancelling... Please Wait...</div>
                </div>
                <!-- CANCEL ACTIONS -->
                <div v-else class="mdl-dialog__actions">
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="cancel(ndx, reservation.Quantity, reservation.id, reservation.Product_uid, reservation.prodData.reserved)">
                    Yes
                  </button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeCancel(ndx)">
                    No
                  </button>
                </div>
              </dialog>
              </template>
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
      isCancelling: false,
      isCompleting: false,
      isReserving: false,
      isLoading: true,
      search: "",
      typeSearch: "",
      statSearch: "Pending",
      tailorId: this.$route.params.id,
      tailorData: {},
      reservations: [],
      dateValid: "",
      remarks: ""
    }
  },
  methods: {
    compDate: function(date){
      let newDate;
      let status = this.$moment(date, "YYYY-MM-DD").fromNow();
      if (status.lastIndexOf("ago") != -1)
        newDate = date + "\n(EXPIRED)";
      else
        newDate = date;
      return newDate;
    },
    canReserve: function(stock, quantity, reserved){
      let available = stock - reserved;
      if(quantity > available)
        return false;
      else
        return true;
    },
    showAccept: function(diabox){
      this.$refs.acceptDialog[diabox].showModal();
    },
    showRTW: function(diabox){
      this.$refs.rtwDialog[diabox].showModal();
    },
    showComplete: function(diabox){
      this.$refs.completeDialog[diabox].showModal();
    },
    showCancel: function(diabox){
      this.$refs.cancelDialog[diabox].showModal();
    },
    showInfo: function(diabox){
      this.$refs.infoDialog[diabox].showModal();
    },
    reserve: function(diabox, quantity, id, prodId, reserved){
      let newDate = this.compDate(this.dateValid);
      let newReserved = parseInt(reserved) + parseInt(quantity);
      let firebase = this.$firebase;
      if((newDate.lastIndexOf("EXPIRED") != -1) || (this.dateValid == "") || (this.dateValid.length > 10))
        alert("PLEASE INPUT A VALID DATE!");
      else{
        this.isReserving = true;
        firebase.database().ref('rtw_orders').child(id).update({
          Status: "Reserved",
          dateValid: this.dateValid,
          Remarks: this.remarks
        }).then(function(){
          return firebase.database().ref('ready_to_wears').child(prodId).update({reserved: newReserved.toString()});
        }).then(function(){
          location.reload();
        });
      }
    },
    complete: function(diabox, quantity, id, prodId, reserved, stock){
      let newStock = parseInt(stock) - parseInt(quantity)
      let newReserved = parseInt(reserved) - parseInt(quantity);
      let firebase = this.$firebase;
      this.isCompleting = true;
      firebase.database().ref('rtw_orders').child(id).update({
        Status: "Completed",
        dateValid: ""
      }).then(function(){
        return firebase.database().ref('ready_to_wears').child(prodId).update({reserved: newReserved.toString(), rtwStock: newStock.toString()});
      }).then(function(){
        location.reload();
      });
    },
    cancel: function(diabox, quantity, id, prodId, reserved){
      let newReserved = parseInt(reserved) - parseInt(quantity);
      let firebase = this.$firebase;
      this.isCancelling = true;
      firebase.database().ref('rtw_orders').child(id).update({
        Status: "Cancelled",
        dateValid: ""
      }).then(function(){
        return firebase.database().ref('ready_to_wears').child(prodId).update({reserved: newReserved.toString()});
      }).then(function(){
        location.reload();
      });
    },
    closeReserve: function(diabox){
      this.$refs.acceptDialog[diabox].close();
      this.remarks = "";
      this.dateValid = "";
    },
    closeCancel: function(diabox){
      this.$refs.cancelDialog[diabox].close();
    },
    closeComplete: function(diabox){
      this.$refs.completeDialog[diabox].close();
    },
    closeInfo: function(diabox){
      this.$refs.infoDialog[diabox].close();
      this.remarks = "";
    },
    closeRTW: function(diabox){
      this.$refs.rtwDialog[diabox].close();
    }
  },
  computed: {
    filteredRs: function(){
      let search2;
      if(this.statSearch == "All")
        search2 = "";
      else
        search2 = this.statSearch;
      return this.reservations.filter((r) =>{
        return (
          r.Status.includes(search2) &&
          r.userData.Account_name.toLowerCase().includes(this.search.toLowerCase()) &&
          r.Product_name.toLowerCase().includes(this.typeSearch.toLowerCase())
        );
      });
    }
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
        if(data[key].Tailor_id == this.$route.params.id){ //RETRIEVE USER ACCORDING TO USER ID
          this.$http.get('https://nots-76611.firebaseio.com/Users/' + data[key].User_uid + '.json').then(function(userdata){
            return userdata.json();
          }).then(function(userdata){
            return this.$set(data[key], 'userData', userdata);
          }).then(function(){ //RETRIEVE USER ACCORDING TO PROD ID
            return this.$http.get('https://nots-76611.firebaseio.com/ready_to_wears/' + data[key].Product_uid + '.json');
          }).then(function(prodData){
            return prodData.json();
          }).then(function(prodData){
            return this.$set(data[key], 'prodData', prodData);
          }).then(function(){
            data[key].id = key;
            rtwArray.push(data[key]);
          })
        }
      }
      this.reservations = rtwArray;
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
dialog p{
  font-size: 12pt;
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
.mdl-dialog__title{
  white-space: pre-line;
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
#tailorAvatar {
  margin-top: 30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border-style: solid;
  border-width: 5px;
}
#longLines{
  white-space: pre-line;
}
#logout {
  color: white;
}
#rtwBox{
  width: 25%;
  height: auto;
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
#pType{
  white-space: pre-line;
}
#reserve{
  width: 30%;
  height: auto;
  text-align: left;
}
#reject{
  width: 30%;
  height: auto;
  text-align: left;
}
#complete{
  width: 30%;
  height: auto;
  text-align: left;
}
#complete{
  width: 30%;
  height: auto;
  text-align: left;
}
#cancel{
  width: 30%;
  height: auto;
  text-align: left;
}


</style>
