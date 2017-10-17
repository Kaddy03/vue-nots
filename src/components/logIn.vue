<template>
  <div class="logIn">
    <!-- BEGIN TEMPLATE -->
    <div class="mdl-grid">
       <div class="mdl-cell mdl-cell--6-col">
          <!-- LOGO -->
          <img src="../assets/notsLogo.png">
       </div>
       <div class="mdl-cell mdl-cell--6-col">
          <!-- LOGIN BOX -->
          <div class="loginBox">
		          <form>
		              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
			                 <input class="mdl-textfield__input" type="text" id="loginUname" v-model="username">
			                 <label class="mdl-textfield__label" for="loginUname">Username</label>
		              </div>
		              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
			                 <input class="mdl-textfield__input" type="password" id="loginPword" v-model="password">
			                 <label class="mdl-textfield__label" for="loginPword">Password</label>
		              </div>
                  <router-link v-bind:to="'/nots/' + currentUser + '/orders'" exact>
		              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" v-on:click="signIn">
			                 <i class="material-icons">forward</i>Login
		              </button>
                  </router-link>
		          </form>
		          <p>Don't have account yet? <router-link v-bind:to="'/nots/signup'" exact>Sign up now!</router-link></p>
	        </div>
       </div>
     </div>
     <!-- FOOTER -->
     <div class="footerDiv mdl-grid">
       <footer class="mdl-mini-footer">
         <div class="mdl-mini-footer__left-section">
           <div class="mdl-logo">&copy; NOTS 2017</div>
           <ul class="mdl-mini-footer__link-list">
             <li><a href="#"><strong>About</strong></a></li>
	            <li> | </li>
              <li><a href="#"><strong>Terms and Conditions</strong></a></li>
            </ul>
          </div>
        </footer>
     </div>
    <!-- END TEMPLATE -->
  </div>
</template>

<!-- SCRIPT -->
<script>

export default {
  data () {
    return {
      username: "",
      password: "",
      userKey: "",
      registeredUsers: [],
      currentUser: ""
    }
  },
  methods: {
    signIn: function(){
      for (var i = 0; i < this.registeredUsers.length; i++) {
        if((this.username==this.registeredUsers[i].tUsername) && (this.password==this.registeredUsers[i].tPassword))
         this.currentUser = this.registeredUsers[i].id;
      }
    }
  },
  created() {
      this.$http.get('https://nots-76611.firebaseio.com/tailors.json').then(function(data){
        return data.json();
      }).then(function(data){
        var usersArray = [];
        for (let key in data){
            data[key].id = key;
            usersArray.push(data[key]);
        }
        this.registeredUsers = usersArray;
      });
      //COMPONENT UPGRADE
      this.$nextTick(() => {
        componentHandler.upgradeDom();
        componentHandler.upgradeAllRegistered();
      });
    },
    mounted() {
      var dialog = document.querySelector('dialog');
    }
}

</script>

<!-- STYLING -->
<style scoped>

.logIn{
  background-image: url("../assets/bespoke.jpg");
}
.loginBox{
	width: 50%;
  margin: 70px auto;
	padding: 30px;
	border-radius: 20px;
	background-color: white;
	box-shadow: 0 4px 8px 8px rgba(0, 0, 0, 0.2), 0 6px 20px 20px rgba(0, 0, 0, 0.19);
}
.mdl-textfield__label{
  color: black;
}
.mdl-mini-footer{
   position:fixed;
   left:0px;
   bottom:0px;
   height:30px;
   width:100%;
	 background: none;
}
.footerDiv{
  height: 180px;;
}
footer{
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background: none;
}
img{
  display: block;
  margin: auto;
  width: 50%;
}

</style>
