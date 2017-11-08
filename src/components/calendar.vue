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
      <router-link v-bind:to="'/nots/' + tailorId + '/calendar'" exact>
        <span id="currentNav" class="mdl-navigation__link" href=""><i class="material-icons">date_range</i> Calendar</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/orders'" exact>
        <span class="mdl-navigation__link" href=""><i class="material-icons">content_cut</i> MTO Requests</span>
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
        <h5>Calendar of Expirations and Deadlines</h5>
      </div>
      <div class="mdl-grid">
        <div>
          <p>LEGENDS:</p>
          <p>
            End of Valid date for RTW resevations: <span id="rtwL">XXXXXXXXXX</span><br>
            Deadline for MTO orders: <span id="mtoL">XXXXXXXXXX</span><br>
            Format: (Product Type) | (Customer Name)
          </p>
        </div>
      </div>
      <!-- CALENDAR -->
      <full-calendar :events="eventsArr" locale="en"></full-calendar>
    </div>
  </main>
  </div>
    <!-- END TEMPLATE -->
  </div>
</template>

<!-- SCRIPT -->
<script>
import Vue from 'vue'
import fullCalendar from 'vue-fullcalendar';
Vue.component('full-calendar', fullCalendar)

export default {
  data () {
    return {
      isLoading: true,
      tailorId: this.$route.params.id,
      tailorData: {},
      transactions: [],
    }
  },
  methods: {

  },
  computed: {
    eventsArr: function(){
        let newArr = [];
        let arrEvents = this.transactions;
        for (let x in arrEvents){
          let eventData = new Object();
          if(arrEvents[x].Status == "Reserved"){
            let title = arrEvents[x].Product_name + " |\n " + arrEvents[x].userData.Account_name;
            eventData.title = title;
            eventData.start = arrEvents[x].dateValid;
            eventData.end = arrEvents[x].dateValid;
            eventData.cssClass = 'RTW';
            newArr.push(eventData);
          }
          else if(arrEvents[x].Status == "Accepted"){
            let title = arrEvents[x].Product_Type + " | " + arrEvents[x].userData.Account_name;
            eventData.title = title;
            eventData.start = arrEvents[x].dateFinish;
            eventData.end = arrEvents[x].dateFinish;
            eventData.cssClass = 'MTO';
            newArr.push(eventData);
          }
        }
        return newArr;
    }
  },
  beforeCreate() {
    this.$nextTick(() => {
      componentHandler.upgradeDom();
      componentHandler.upgradeAllRegistered();
    });
  },
  created() {
    let allTransac = [];
    //RETRIEVE TAILOR DATA
    this.$http.get('https://nots-76611.firebaseio.com/tailors/' + this.tailorId + '.json').then(function(data){
      return data.json();
    }).then(function(data){
      this.tailorData = data;
    }).then(function(){
      //RETRIEVE MTO ORDERS
      return this.$http.get('https://nots-76611.firebaseio.com/Orders.json');
    }).then(function(Xdata){
      return Xdata.json();
    }).then(function(Xdata){
      for (let key in Xdata){
        if(this.$route.params.id == Xdata[key].TailorId){
          //RETRIEVE USER DATA ACCORDING TO CUSTOMER ID
          this.$http.get('https://nots-76611.firebaseio.com/Users/' + Xdata[key].CustomerId + '.json').then(function(userData){
            return userData.json();
          }).then(function(userData){
            this.$set(Xdata[key], 'userData', userData);
          }).then(function(){
            Xdata[key].id = key;
            allTransac.push(Xdata[key]);
          });
        }
      }
    }).then(function(){
      //RETRIEVE RTW RESERVATIONS
      return this.$http.get('https://nots-76611.firebaseio.com/rtw_orders.json');
    }).then(function(Ydata){
      return Ydata.json();
    }).then(function(Ydata){
      for (let key in Ydata){
        if(this.$route.params.id == Ydata[key].Tailor_id){
          //RETRIEVE USER DATA ACCORDING TO USER ID
          this.$http.get('https://nots-76611.firebaseio.com/Users/' + Ydata[key].User_uid + '.json').then(function(userdata){
            return userdata.json();
          }).then(function(userdata){
            return this.$set(Ydata[key], 'userData', userdata);
          }).then(function(){
            Ydata[key].id = key;
            allTransac.push(Ydata[key]);
          })
        }
      }
    }).then(function(){
      this.transactions = allTransac;
    }).then(function(){
      this.isLoading = false;
    });
  },
  mounted() {
    var dialog = document.querySelectorAll('dialog');
  }
}

</script>

<!-- STYLING -->
<style>
.event-box{
  height: 50% !important;
  overflow: auto !important;
}
.event-item{
  height: auto !important;
  text-overflow: normal !important;
  white-space: normal !important;
}
.MTO{
  color: white !important;
  background-color: orange !important;
}
.RTW{
  color: white !important;
  background-color: blue !important;
}
</style>

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
span#rtwL{
  color: blue;
  background-color: blue;
}
span#mtoL{
  color: orange;
  background-color: orange;
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
#currentNav{
  background-color: #21C0C0;
  color: white;
}



</style>
