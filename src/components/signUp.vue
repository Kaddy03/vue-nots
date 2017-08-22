<template>
  <div class="signUp">
    <!-- BEGIN TEMPLATE -->
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <!-- HEADER -->
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title"><h3>Sign Up as a Tailor</h3></span>
          <div class="mdl-layout-spacer"></div>
          <button class="mdl-button mdl-js-button mdl-js-ripple-effect" onclick="logout()">
	           <i class="material-icons">keyboard_backspace</i>
		         Back to Login Page
	        </button>
        </div>
      </header>
      <!-- FORM -->
      <form>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
			     <input class="mdl-textfield__input" type="text" id="tName" v-model="tailor.tName">
			     <label class="mdl-textfield__label" for="tName">Name of Tailor/Tailor Shop</label>
		  </div>
		  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
			     <input class="mdl-textfield__input" type="text" id="tAddress" v-model="tailor.tAddress">
			     <label class="mdl-textfield__label" for="tAddress">Address of Tailor/Tailor Shop</label>
		  </div>
		  <div class="mdl-textfield mdl-js-textfield">
			    <textarea class="mdl-textfield__input" type="text" rows= "3" id="tDesc" v-model="tailor.tDescription"></textarea>
			    <label class="mdl-textfield__label" for="tDesc">Description</label>
		  </div>
		  <div class="mdl-textfield mdl-js-textfield">
			    <textarea class="mdl-textfield__input" type="text" rows= "3" id="tContact" v-model="tailor.tContact"></textarea>
			    <label class="mdl-textfield__label" for="tContact">Contact Details</label>
		  </div>
		  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
			    <input class="mdl-textfield__input" type="text" id="tUsername" v-model="tailor.tUsername">
			    <label class="mdl-textfield__label" for="tUsername">Username</label>
		  </div>
		  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
			    <input class="mdl-textfield__input" type="password" id="tPassword" v-model="tailor.tPassword">
			    <label class="mdl-textfield__label" for="tPassword">Password</label>
		  </div>
		  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-model="password2">
			    <input class="mdl-textfield__input" type="password" id="tRePassword">
			    <label class="mdl-textfield__label" for="tRePassword">Re-type Password</label>
		  </div>
      <!-- SIGN UP CONTROLS -->
      <p>
		      <input type="checkbox"> I have read the the <a href="#">Terms and Conditions</a>
		      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click.prevent="post">
			         <i class="material-icons">done_all</i> Sign Up
		      </button>
		  </p>
      </form>
    </div>
    <!-- END TEMPLATE -->
  </div>
</template>

<!-- SCRIPT -->
<script>

export default {
  data () {
    return {
      tailor: {
        tName: "",
        tAddress: "",
        tDescription: "",
        tContact: "",
        tUsername: "",
        tPassword: ""
      },
      password2: "",
      accepted: false
    }
  },
  methods: {
    post: function(){
      this.$http.post('https://nots-eece8.firebaseio.com/tailors.json', this.tailor).then(function(data){
          console.log(data);
      });
    }
  }
}
</script>

<!-- STYLING -->
<style scoped>

.mdl-textfield{
  width: 80%;
}
.mdl-textfield__label{
  color: black;
}
.signUp{
  background-color: #E0E0E0;
}
.mdl-button--colored{
  margin-left: 500px;
}
form{
  width: 85%;
  padding-left: 50px;
	margin: auto;
	box-shadow: 0 4px 8px 8px rgba(0, 0, 0, 0.2), 0 6px 20px 20px rgba(0, 0, 0, 0.19);
	background-color: #E0E0E0;
}
p{
  margin-top: 60px;
}

</style>
