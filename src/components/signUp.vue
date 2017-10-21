<template>
  <div class="signUp">
    <!-- BEGIN TEMPLATE -->
    <div v-if="isLoading" id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <!-- HEADER -->
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title"><h3>Sign Up as a Tailor</h3></span>
          <div class="mdl-layout-spacer"></div>
          <router-link v-bind:to="'/nots'">
          <button id="backLogin" class="mdl-button mdl-js-button mdl-js-ripple-effect">
	           <i class="material-icons">keyboard_backspace</i>
		         Back to Login Page
	        </button>
          </router-link>
        </div>
      </header>
      <!-- FORM -->
      <form id="wholeForm">
      <div class="mdl-grid">
        <div id="tailorInfo" class="mdl-cell mdl-cell--6-col">
          <legend>TAILOR INFORMATION: </legend>
          <!-- IMAGE PREVIEW -->
          <div id="imgPreview">
            <img v-bind:src="tailor.tImage" height="300">
          </div>
          <!-- IMAGE UPLOAD -->
          <div>
            <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored" v-on:click.prevent="onPickfile" accept="image/*">
              Upload Image of your store front
            </button>
            <input type="file" style="display: none" ref="fileInput" v-on:change="onFilePicked">
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
               <input class="mdl-textfield__input" type="text" id="tName" v-model="tailor.tName">
               <label class="mdl-textfield__label" for="tName">Name of Tailor/Tailor Shop</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
               <input class="mdl-textfield__input" type="text" id="tAddress" v-model="tailor.tAddress">
               <label class="mdl-textfield__label" for="tAddress">
                 Address of Tailor/Tailor Shop<span class="hint"> (Pls Specify the exact location)</span>
               </label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <textarea class="mdl-textfield__input" type="text" rows= "3" id="tDesc" v-model="tailor.tDescription">
              </textarea>
              <label class="mdl-textfield__label" for="tDesc">Services and MTO Offers</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="text" id="tWork" v-model="tailor.twork">
              <label class="mdl-textfield__label" for="tWork">Store Hours</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    			    <input class="mdl-textfield__input" type="text" id="contact" pattern="[+0-9]{11,13}$" v-model="tailor.tContact">
    			    <label class="mdl-textfield__label" for="contact">Contact Number</label>
              <span class="mdl-textfield__error">Invalid number!</span>
    		  </div>
        </div>
        <div id="acctInfo" class="mdl-cell mdl-cell--6-col">
          <legend>ACCOUNT INFORMATION: </legend>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    			    <input class="mdl-textfield__input" type="text" id="tUsername" v-model="tailor.tUsername">
    			    <label class="mdl-textfield__label" for="tUsername">Username</label>
    		  </div>
    		  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    			    <input class="mdl-textfield__input" type="password" id="tPassword" v-model="tailor.tPassword">
    			    <label class="mdl-textfield__label" for="tPassword">Password</label>
    		  </div>
    		  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    			    <input class="mdl-textfield__input" type="password" id="tRePassword" v-model="password2">
    			    <label class="mdl-textfield__label" for="tRePassword">Re-type Password</label>
    		  </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    			    <input class="mdl-textfield__input" type="text" id="tEmailAdd" v-model="tailor.tEmailAdd" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$">
    			    <label class="mdl-textfield__label" for="tEmailAdd">Email Address</label>
              <span class="mdl-textfield__error">Invalid email!</span>
    		  </div>
        </div>
      </div>
      <div class="mdl-grid">
        <h2 id="loading" v-if="signingUp">Signing Up... Please Wait...</h2>
      </div>
      <!-- SIGN UP CONTROLS -->
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--9-col">
          <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-1">
            <input type="checkbox" id="checkbox-1" class="mdl-checkbox__input" v-model="accepted">
            <span class="mdl-checkbox__label">I have read the <a>Terms and Conditions</a></span>
          </label>
        </div>
        <div class="mdl-cell mdl-cell--3-col">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" v-if="accepted" v-on:click.prevent="post">
            <i class="material-icons">done_all</i> Sign Up
          </button>
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" v-else disabled>
            <i class="material-icons">done_all</i> Sign Up
          </button>
        </div>
      </div>
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
      signingUp: false,
      isLoading: true,
      regTailors: [],
      image: null,
      tailor: {
        tName: "",
        tAddress: "",
        tDescription: "",
        tContact: "",
        tUsername: "",
        tPassword: "",
        tEmailAdd: "",
        tImage: "",
        tWorking: ""
      },
      password2: "",
      accepted: false
    }
  },
  methods: {
    post: function(){
      let load = this.signingUp;
      let imageUrl
      let key
      let goTo = this.$router;
      if (!this.entryComplete){
        alert("PLEASE FILL ALL THE ASKED INPUT!");
      }
      else if (!this.passwordConfirmed){
        alert("YOUR PASSWORD DOESN'T MATCH!");
      }
      else if (!this.isUnique){
        alert("YOUR USERNAME OR PASSWORD IS ALREADY TAKEN!");
      }
      else{
        this.signingUp = true;
        this.$firebase.database().ref('tailors').push(this.tailor)
          .then((data) => {
            key = data.key
            return key
          })
          .then(key => {
            const filename = this.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            return this.$firebase.storage().ref('tailors/' + key + '.' + ext).put(this.image)
          })
          .then(fileData => {
            imageUrl = fileData.metadata.downloadURLs[0]
            return this.$firebase.database().ref('tailors').child(key).update({tImage: imageUrl, tId: key})
          }).then(function(){
            load = false
          }).then(function(){
            alert("Sign Up Succesful!");
          }).then(function(){
            goTo.push({ path: '/nots' });
          });
      }
    },
    onPickfile: function(){
      this.$refs.fileInput.click();
    },
    onFilePicked (event){
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0){
        return alert('Please add a valid file!');
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.tailor.tImage = fileReader.result;
      })
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  },
  computed: {
    passwordConfirmed: function(){
      return (this.tailor.tPassword == this.password2);
    },
    entryComplete: function(){
      return (
        (this.tailor.tName != "") &&
        (this.tailor.tAddress != "") &&
        (this.tailor.tDescription != "") &&
        (this.tailor.tContact != "") &&
        (this.tailor.tUsername != "") &&
        (this.tailor.tPassword != "") &&
        (this.tailor.tEmailAdd != "") &&
        (this.image != null)
      );
    },
    isUnique: function(){
      let result;
      for (var i = 0; i < this.regTailors.length; i++) {
        if((this.tailor.tUsername!=this.regTailors[i].tUsername) && (this.tailor.tPassword!=this.regTailors[i].tPassword))
         result = true;
        else{
         result = false;
         break;
        }
      }
      return result;
    }
  },
  beforeCreate() {
    this.$nextTick(() => {
      componentHandler.upgradeDom();
      componentHandler.upgradeAllRegistered();
    });
  },
  created() {
    //RETRIEVE REGISTERED TAILORS
    this.$http.get('https://nots-76611.firebaseio.com/tailors.json').then(function(data){
      return data.json();
    }).then(function(data){
      var usersArray = [];
      for (let key in data){
          data[key].id = key;
          usersArray.push(data[key]);
      }
      this.regTailors = usersArray;
    }).then(function(){
      this.isLoading = false;
    });
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
.mdl-layout__header{
  background-color: #21C0C0;
}
.hint{
  font-size: 8pt;
  color: red;
}
.mdl-js-progress{
  width: 100%;
}
#backLogin{
  color: white;
}
#tailorInfo, #acctInfo{
  padding: 20px;
  border-style: groove;
  border-radius: 5%;
}
#wholeForm{
  width: 85%;
  height: auto;
  padding: 30px;
	margin: auto;
	box-shadow: 0 4px 8px 8px rgba(0, 0, 0, 0.2), 0 6px 20px 20px rgba(0, 0, 0, 0.19);
	background-color: #E0E0E0;
}
#imgPreview{
  margin-bottom: 10px;
  margin-top: 10px;
}

</style>
