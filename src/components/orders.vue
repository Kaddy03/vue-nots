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
        <span id="currentNav" class="mdl-navigation__link" href=""><i class="material-icons">content_cut</i> MTO Requests</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/reservations'" exact>
        <span class="mdl-navigation__link"><i class="material-icons">content_paste</i> RTW reservations</span>
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
        <h5>MTO Requests</h5>
      </div>
      <div class="mdl-grid">
        Search by Customer:
        <input type="text" v-model="search">
      </div>
      <div class="mdl-grid">
        <table class="mdl-data-table mdl-js-data-table">
          <thead>
            <th>Reference</th>
            <th>Product type</th>
            <th>Measurements</th>
            <th>Customer</th>
            <th>Quantity</th>
            <th>Date Submitted</th>
            <th>Finish Date</th>
            <th>
              Status:
              <select v-model="statSearch">
                <option>All</option>
                <option>Pending</option>
                <option>Rejected</option>
                <option>Accepted</option>
                <option>Completed</option>
              </select>
            </th>
            <th>Accept/<br>Reject</th>
          </thead>
          <tbody>
            <tr v-for="order, ndx in filteredOrders">
              <td><img :src="order.Image" width="100" v-on:click="zoomImage(ndx)"></td>
              <!-- DIALOG FOR IMAGE ZOOM -->
              <dialog id="imageBox" class="mdl-dialog" ref="imageDialog">
                <div class="mdl-dialog__content">
                  <img :src="order.Image" height="300">
                </div>
                <div class="mdl-dialog__actions">
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeImage(ndx)">
                    Ok
                  </button>
                </div>
              </dialog>
              <td id="pType">{{ order.Product_Type }}</td>
              <td>
                <button id="measure" class="mdl-button mdl-js-button mdl-js-ripple-effect" v-on:click="showMeasurements(ndx)">
                  See Measurements
                </button>
                <!-- DIALOG FOR MEASUREMENTS -->
                <dialog id="mDialog" class="mdl-dialog" ref="measurementDialog">
                  <div class="mdl-dialog__content">
                    <table class="mdl-data-table mdl-js-data-table">
                      <thead>
                        <th>Measurements</th>
                      </thead>
                      <tbody>
                        <tr v-if="order.Arm_Hole"><td>Arm Hole = {{order.Arm_Hole }} in</td></tr>
                        <tr v-if="order.Bicep"><td>Bicep = {{ order.Bicep }} in</td></tr>
                        <tr v-if="order.Chest"><td>Chest = {{ order.Chest }} in</td></tr>
                        <tr v-if="order.Neck"><td>Neck = {{ order.Neck }} in</td></tr>
                        <tr v-if="order.Shirt_Length"><td>Shirt Length = {{ order.Shirt_Length }} in</td></tr>
                        <tr v-if="order.Short_Sleeve"><td>Short Sleeve Length = {{ order.Short_Sleeve }} in</td></tr>
                        <tr v-if="order.Long_Sleeve"><td>Long Sleeve Length = {{ order.Long_Sleeve}} in</td></tr>
                        <tr v-if="order.Shoulder_Width"><td>Shoulder Width = {{ order.Shoulder_Width }} in</td></tr>
                        <tr v-if="order.Bust"><td>Bust = {{ order.Bus }} in</td></tr>
                        <tr v-if="order.Breast_Point"><td>Breast Point = {{ order.Breast_Point }} in</td></tr>
                        <tr v-if="order.Waist_Point"><td>Waist Point = {{ order.Waist_Point }} in</td></tr>
                        <tr v-if="order.Stomach"><td>Stomach = {{ order.Stomach }} in</td></tr>
                        <tr v-if="order.Waist_Upper"><td>Waist (upper) = {{ order.Waist_Upper }} in</td></tr>
                        <tr v-if="order.Wrist"><td>Wrist = {{ order.Wrist }} in</td></tr>
                        <tr v-if="order.Waist_Lower"><td>Waist (lower) = {{ order.Waist_Lower }} in</td></tr>
                        <tr v-if="order.Hips_Lower"><td>Hips = {{ order.Hips_Lower }} in</td></tr>
                        <tr v-if="order.Crotch"><td>Crotch = {{ order.Crotch }} in</td></tr>
                        <tr v-if="order.Thigh_Width"><td>Thigh Width = {{ order.Thigh_Width }} in</td></tr>
                        <tr v-if="order.Pants_Length"><td>Pants Length = {{ order.Pants_Length }} in</td></tr>
                        <tr v-if="order.Inseam"><td>Inseam = {{ order.Inseam }} in</td></tr>
                        <tr v-if="order.Knee"><td>Knee = {{ order.Knee }} in</td></tr>
                        <tr v-if="order.Half_hem"><td>Half-hem = {{ order.Half_hem }} in</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="mdl-dialog__actions">
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeMeasurements(ndx)">
                      Back
                    </button>
                  </div>
                </dialog>
              </td>
              <td>
                {{ order.userData.Account_username }}
                <button class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showUser(ndx)">
                  <i class="material-icons">info_outline</i>
                </button>
                <!-- DIALOG FOR CUSTOMER INFO -->
                <dialog id="infoBox" class="mdl-dialog" ref="userDialog">
                  <p class="mdl-dialog__title">Customer Information</p>
                  <div class="mdl-dialog__content">
                    <div>
                      <img :src="order.userData.Image" height="150">
                    </div>
                    <div>
                      <p>Name: {{ order.userData.Account_username }}</p>
                      <p>Contact Number: {{ order.userData.Phone_number }}</p>
                      <p>Email Adsress: {{ order.userData.Email_address }}</p>
                      <p>Address: {{ order.userData.Address }}</p>
                      <hr>
                      <p>
                      REMARKS:<br>
                      {{ order.my_remarks }}
                      </p>
                    </div>
                  </div>
                  <div class="mdl-dialog__actions">
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeUser(ndx)">
                      Ok
                    </button>
                  </div>
                </dialog>
              </td>
              <td>{{ order.MTO_quantity }}</td>
              <td>{{ order.Date_Ordered }}</td>
              <td id="fDate">{{ compDate(order.dateFinish) }}</td>
              <td>{{ order.Status }}</td>
              <td>
                <button v-if="order.Status=='Pending'" class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showAccept(ndx)">
                  <i class="material-icons">done</i>
                </button>
                <!-- DIALOG FOR ACCEPT -->
                <dialog id="accept" class="mdl-dialog" ref="acceptDialog">
                  <p class="mdl-dialog__title">Accept this Order?</p>
                  <div class="mdl-dialog__content">
                    <p>ORDER INFORMATION</p>
                    <p>
                      Reference:<br>
                      <img :src="order.Image" height="200"><br>
                      Product Type: {{ order.Product_Type }}<br>
                      Customer: {{ order.userData.Account_username }}<br>
                      Date Ordered: {{ order.Date_Ordered }}<br>
                      Quantity: {{ order.MTO_quantity }}<br>
                    </p>
                    <hr>
                    <p>Tentative Date of Finish:
                    <input type="date" v-model="dateFinish"><p>
                    <p>
                      <textarea rows="3" cols="50" placeholder="Enter your remarks here..." v-model="remarks">
                      </textarea>
                    </p>
                  </div>
                  <!-- ACCEPT ACTIONS -->
                  <div v-if="isAccepting" class="mdl-dialog__actions">
                    <div>Accepting... Please Wait...</div>
                  </div>
                  <div v-else class="mdl-dialog__actions">
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="accept(order.id)">
                      Accept
                    </button>
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeAccept(ndx)">
                      Cancel
                    </button>
                  </div>
                </dialog>
                <button v-if="order.Status=='Pending'" class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showReject(ndx)">
                  <i class="material-icons">block</i>
                </button>
                <!-- DIALOG FOR REJECT -->
                <dialog id="reject" class="mdl-dialog" ref="rejectDialog">
                  <p class="mdl-dialog__title">Reject this Order?</p>
                  <div class="mdl-dialog__content">
                    <p>ORDER INFORMATION</p>
                    <p>
                      Reference:<br>
                      <img :src="order.Image" height="200"><br>
                      Product Type: {{ order.Product_Type }}<br>
                      Customer: {{ order.userData.Account_username }}<br>
                      Date Ordered: {{ order.Date_Ordered }}<br>
                      Quantity: {{ order.MTO_quantity }}<br>
                    </p>
                    <hr>
                    <p>
                      <textarea rows="3" cols="50" placeholder="Enter your remarks here..." v-model="remarks">
                      </textarea>
                    </p>
                  </div>
                  <!-- REJECT ACTIONS -->
                  <div v-if="isRejecting" class="mdl-dialog__actions">
                    <div>Rejecting... Please Wait...</div>
                  </div>
                  <div v-else class="mdl-dialog__actions">
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="reject(order.id)">
                      Reject
                    </button>
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeReject(ndx)">
                      Cancel
                    </button>
                  </div>
                </dialog>
                <div v-if="order.Status=='Accepted'">
                  <button class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showComplete(ndx)">
                    <i class="material-icons">done_all</i>
                  </button>
                  Complete
                </div>
                <!-- DIALOG FOR COMPLETE -->
                <dialog id="complete" class="mdl-dialog" ref="completeDialog">
                  <p class="mdl-dialog__title">Is this MTO complete?</p>
                  <div class="mdl-dialog__content">
                    <p>ORDER INFORMATION</p>
                    <p>
                      Reference:<br>
                      <img :src="order.Image" height="200"><br>
                      Product Type: {{ order.Product_Type }}<br>
                      Customer: {{ order.userData.Account_username }}<br>
                      Date Ordered: {{ order.Date_Ordered }}<br>
                      Quantity: {{ order.MTO_quantity }}<br>
                    </p>
                  </div>
                  <!-- COMPLETE ACTIONS -->
                  <div v-if="isCompleting" class="mdl-dialog__actions">
                    <div>Completing... Please Wait...</div>
                  </div>
                  <div v-else class="mdl-dialog__actions">
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="complete(order.id)">
                      Yes
                    </button>
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeComplete(ndx)">
                      No
                    </button>
                  </div>
                </dialog>
                <div v-if="order.Status=='Accepted'">
                  <button class="mdl-button mdl-js-button mdl-button--icon" v-on:click="showCancel(ndx)">
                    <i class="material-icons">cancel</i>
                  </button>
                  Cancel
                </div>
                <!-- DIALOG FOR CANCEL -->
                <dialog id="cancel" class="mdl-dialog" ref="cancelDialog">
                  <p class="mdl-dialog__title">Cancel this MTO?</p>
                  <div class="mdl-dialog__content">
                    <p>ORDER INFORMATION</p>
                    <p>
                      Reference:<br>
                      <img :src="order.Image" height="200"><br>
                      Product Type: {{ order.Product_Type }}<br>
                      Customer: {{ order.userData.Account_username }}<br>
                      Date Ordered: {{ order.Date_Ordered }}<br>
                      Quantity: {{ order.MTO_quantity }}<br>
                    </p>
                  </div>
                  <!-- CANCEL ACTIONS -->
                  <div v-if="isCancelling" class="mdl-dialog__actions">
                    <div>Cancelling... Please Wait...</div>
                  </div>
                  <div v-else class="mdl-dialog__actions">
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect">
                      Yes
                    </button>
                    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeCancel(ndx)">
                      No
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
      statSearch: "Pending",
      search: "",
      isCancelling: false,
      isAccepting: false,
      isRejecting: false,
      isCompleting: false,
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
    compDate: function(date){
      let newDate;
      let status = this.$moment(date, "YYYY-MM-DD").fromNow();
      if (status.lastIndexOf("ago") != -1)
        newDate = date + "\n(EXPIRED)";
      else
        newDate = date;
      return newDate
    },
    zoomImage: function(diabox){
      this.$refs.imageDialog[diabox].showModal();
    },
    accept: function(id){
      let newDate = this.compDate(this.dateFinish);
      if((newDate.lastIndexOf("EXPIRED") != -1) || (this.dateFinish == ""))
        alert("PLEASE INPUT A VALID DATE!");
      else{
        this.isAccepting = true;
        this.$firebase.database().ref('Orders').child(id).update({
          Status: "Accepted",
          dateFinish: this.dateFinish,
          Tailor_Remarks: this.remarks
        }).then(function(){
          alert("ACCEPTANCE SUCCESFUL!");
          location.reload(true);
        });
      }
    },
    reject: function(id){
      if(this.remarks == "")
        alert("PLEASE INPUT A REMARK!");
      else{
        this.isRejecting = true;
        this.$firebase.database().ref('Orders').child(id).update({
          Status: "Rejected",
          Tailor_Remarks: this.remarks
        }).then(function(){
          location.reload();
        });
      }
    },
    complete: function(id){
      this.isCompleting = true;
      this.$firebase.database().ref('Orders').child(id).update({
        Status: "Completed",
        dateFinish: ""
      }).then(function(){
        location.reload();
      });
    },
    showMeasurements: function(diabox){
      this.$refs.measurementDialog[diabox].showModal();
    },
    showAccept: function(diabox, id){
      this.$refs.acceptDialog[diabox].showModal();
    },
    showReject: function(diabox){
      this.$refs.rejectDialog[diabox].showModal();
    },
    showComplete: function(diabox){
      this.$refs.completeDialog[diabox].showModal();
    },
    showCancel: function(diabox){
      this.$refs.cancelDialog[diabox].showModal();
    },
    showUser: function(diabox){
      this.$refs.userDialog[diabox].showModal();
    },
    closeMeasurements: function(diabox){
      this.$refs.measurementDialog[diabox].close();
    },
    closeComplete: function(diabox){
      this.$refs.completeDialog[diabox].close();
    },
    closeImage: function(diabox){
      this.$refs.imageDialog[diabox].close();
    },
    closeUser: function(diabox){
      this.$refs.userDialog[diabox].close();
    },
    closeReject: function(diabox){
      this.$refs.rejectDialog[diabox].close();
    },
    closeCancel: function(diabox){
      this.$refs.cancelDialog[diabox].close();
    },
    closeAccept: function(diabox){
      this.$refs.acceptDialog[diabox].close();
      this.remarks = "";
      this.dateFinish = "";
    },
    closeReject: function(diabox){
      this.$refs.rejectDialog[diabox].close();
      this.remarks = "";
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
          if(this.$route.params.id == data[key].TailorId){ //RETRIEV USER'S DATA
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
        this.orders = ordersArray;
    }).then(function(){ //RETRIEVE TAILOR'S DATA
      return this.$http.get('https://nots-76611.firebaseio.com/tailors/' + this.tailorId + '.json');
    }).then(function(data){
      return data.json();
    }).then(function(data){
      this.tailorData = data;
    }).then(function(){ //HIDE SPINNER
      this.isLoading = false;
    });
  },
  computed: {
    filteredOrders: function(){
      let search2;
      let newArr;
      if(this.statSearch == "All")
        search2 = "";
      else
        search2 = this.statSearch;
      newArr = this.orders.filter((order) =>{
        return (
          order.Status.includes(search2) &&
          order.userData.Account_username.toLowerCase().includes(this.search.toLowerCase())
        );
      });
      return newArr.reverse();
    }
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
.mdl-dialog__content{
  font-size: 14pt;
}
.mdl-js-progress{
  width: 100%;
}
.mdl-layout__header{
  background-color: #21C0C0;
}
.mdl-dialog__title{
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
#accept{
  text-align: left;
  width: 30%;
  height: auto;
}
#reject{
  text-align: left;
  width: 30%;
  height: auto;
}
#complete{
  text-align: left;
  width: 30%;
  height: auto;
}
#imageBox{
  width: 40%;
  height: auto;
}
#measurementDialog{
  text-align: left;
  width: 20%;
  height: auto;
}
#currentNav{
  background-color: #21C0C0;
  color: white;
}
#infoBox{
  text-align: left;
}
#measure{
  font-size: 8pt;
}
#pType{
  white-space: pre-line;
}
#fDate{
  white-space: pre-line;
}

</style>
