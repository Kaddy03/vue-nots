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
		              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" v-on:click.prevent="signIn">
			                 <i class="material-icons">forward</i>Login
		              </button>
		          </form>
		          <p>Don't have account yet? <a href="">Sign up now!</a></p>
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
  props: {
    user: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      username: "",
      password: "",
      userKey: ""
    }
  },
  methods: {
    signIn: function() {
      this.$http.get('https://nots-eece8.firebaseio.com/tailors.json').then(function(data){
        return data.json();
      }).then(function(data){
        var userId = "";
        for (let key in data){
          if ((this.username == data[key].tUsername)&&(this.password == data[key].tPassword)){
            userId = key;
          }
        }
        this.userKey = userId;
        console.log(this.username);
        console.log(this.password);
        console.log(this.userKey);
        this.$emit('setUser', this.userKey);
      })
      console.log("current user =" + this.userKey);
    }
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
	background-color: #21C0C0;
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
