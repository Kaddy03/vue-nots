<template>
  <div class="signUp">
    <!-- BEGIN TEMPLATE -->
    <div v-if="isLoading" id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <!-- HEADER -->
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title"><h3>Tailor Information</h3></span>
          <div class="mdl-layout-spacer"></div>
          <router-link v-bind:to="'/nots/' + tailorId + '/orders'" exact>
          <button id="backTo" class="mdl-button mdl-js-button mdl-js-ripple-effect">
	           <i class="material-icons">keyboard_backspace</i>
		         Back to Dashboard
	        </button>
          </router-link>
        </div>
      </header>
    </div>
    <div id="wholeForm">
      <div class="mdl-grid">
        <div id="tailorInfo" class="mdl-cell mdl-cell--6-col">
          <!-- TAILOR'S PICTURE -->
          <div class="mdl-grid">
            <h4>TAILOR'S STORE FRONT</h4>
            <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" v-on:click="onPickfile" accept="image/*">
              <i class="material-icons">mode_edit</i>
            </button>
            <input type="file" style="display: none" ref="fileInput" v-on:change="onFilePicked">
          </div>
          <div>
            <img v-bind:src="tailorData.tImage" height="350">
          </div>
          <div v-if="isChanging" class="mdl-grid">
            <h3>Changing Image.... Please Wait...</h3>
          </div>
          <div v-else class="mdl-grid">
            <button v-if="imageChanged" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="editImg">
              Save changed image
            </button>
          </div>
        </div>
        <div id="tailorInfo" class="mdl-cell mdl-cell--6-col">
          <!-- TAILORS INFORMATION -->
          <div class="mdl-grid">
            <h4>TAILOR'S INFORMATION</h4>
            <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" v-on:click="editInfo">
              <i class="material-icons">mode_edit</i>
            </button>
            <!-- DIALOG FOR INFORMATION EDIT -->
            <dialog id="infoDialog" class="mdl-dialog" ref="infoDialog">
              <p class="mdl-dialog__title">Edit Information</p>
              <div class="mdl-dialog__content">
                <p>Name: <input type="text" v-model="tailorData.tName"></p>
                <p>Address: <input type="text" v-model="tailorData.tAddress"></p>
                Sevices Offered:
                <p>
                  <textarea rows="3" cols="50" v-model="tailorData.tDescription">
                  </textarea>
                </p>
                <p>Store Hours: <input type="text" v-model="tailorData.tWork"></p>
                <p>Contact Number: <input type="text" v-model="tailorData.tContact" pattern="[+0-9]{11,13}$" title="Valid Cellphone Number"></p>
              </div>
              <div v-if="isEditing" class="mdl-dialog__actions">
                <h3>Editing Information.... Please Wait...</h3>
              </div>
              <div v-else class="mdl-dialog__actions">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="edit(tailorData)">
                  Save Changes
                </button>
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeInfo">
                  Cancel
                </button>
              </div>
            </dialog>
          </div>
          <div class="mdl-grid">
            NAME: {{ tailorData.tName }}<br><br>
            ADDRESS: {{ tailorData.tAddress }}<br>
            <br>
            <p>
              SERVICES OFFERED:<br>
              {{ tailorData.tDescription }}
            </p>
            <br>
            STORE HOURS: {{ tailorData.tWork }}<br><br>
            CONTACT NUMBER: {{ tailorData.tContact }}
          </div>
          <div class="mdl-grid">
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="editAcct">
              <i class="material-icons">mode_edit</i> Change username/password
            </button>
          </div>
          <!-- DIALOG FOR ACCT INFO -->
          <dialog id="acctDialog" class="mdl-dialog" ref="acctDialog">
            <div class="mdl-dialog__content">
              <div>
                <h4>Edit Username</h4>
                <hr>
                Username: <input type="text" v-model="tailorData.tUsername"></input>
              </div>
              <div>
                <h4>Edit Password</h4>
                <hr>
                <p>Current Password: <input type="password" v-model="currentPword"></input></p>
                <p>New Password: <input type="password" v-model="newPword"></input></p>
                <p>Re-type new Password: <input type="password" v-model="newPword2"></input></p>
              </div>
            </div>
            <div v-if="isAcctChange" class="mdl-dialog__actions">
              <div>Changing Account Information.... Please Wait...</div>
            </div>
            <div v-else class="mdl-dialog__actions">
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="closeAcct">
                Cancel
              </button>
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="changeAcct">
                save changes
              </button>
            </div>
          </dialog>
        </div>
      </div>
    </div>
    <!-- END TEMPLATE -->
  </div>
</template>

<!-- SCRIPT -->
<script>

export default {
  data () {
    return {
      imageChanged: false,
      isAcctChange: false,
      isChanging: false,
      isEditing: false,
      isLoading: true,
      currentPword: "",
      newPword: "",
      newPword2: "",
      tailorId: this.$route.params.id,
      image: null,
      tailorData: {}
    }
  },
  methods: {
    editInfo: function(){
      this.$refs.infoDialog.showModal();
    },
    editAcct: function(){
      this.$refs.acctDialog.showModal();
    },
    edit: function(data){
      this.isEditing = true;
      let id = this.$route.params.id;
      this.$firebase.database().ref('tailors').child(id).update(data).then(function(){
        location.reload(true);
      });
    },
    changeAcct: function(){
      let id = this.$route.params.id;
      if((this.currentPword == "") && (this.newPword == "") && (this.newPword2 == ""))
        alert("COMPLETE ALL THE REQUIRED INPUTS!")
      else if(this.currentPword != this.tailorData.tPassword)
        alert("YOUR CURRENT PASSWORD IS INCORRECT!")
      else if(this.newPword != this.newPword2)
        alert("NEW PASSWORD DOESN'T MATCH!")
      else{
        this.isAcctChange = true;
        this.$firebase.database().ref('tailors').child(id).update({
          tUsername: this.tailorData.tUsername,
          tPassword: this.newPword
        }).then(function(){
          location.reload(true);
        });
      }
    },
    closeInfo: function(){
      this.$refs.infoDialog.close();
      location.reload(true);
    },
    closeAcct: function(){
      this.$refs.acctDialog.close();
      location.reload(true);
    },
    editImg: function(){
      let image = this.image
      let imageUrl
      let tImg = this.tailorData.tImage
      let key = this.$route.params.id
      let firebase = this.$firebase
      const filename = this.image.name
      const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase()
      this.isChanging = true
      this.$firebase.storage().ref('tailors/' + key + '.' + ext).delete()
        .then(function(){
          return firebase.storage().ref('tailors/' + key + '.' + ext).put(image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('tailors').child(key).update({tImage: imageUrl})
        }).then(function(){
          alert("STORE FRONT CHANGED!");
          location.reload(true);
        });
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
        this.tailorData.tImage = fileReader.result;
      })
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      this.imageChanged = true;
    }
  },
  computed: {

  },
  beforeCreate() {
    this.$nextTick(() => {
      componentHandler.upgradeDom();
      componentHandler.upgradeAllRegistered();
    });
  },
  created() {
    this.$http.get('https://nots-76611.firebaseio.com/tailors/' + this.$route.params.id + '.json').then(function(data){
      return data.json();
    }).then(function(data){
      this.tailorData = data;
    }).then(function(){
      this.isLoading = false;
    })
  },
  mounted() {
    var dialog = document.querySelectorAll('dialog');
  }
}
</script>

<!-- STYLING -->
<style scoped>

p{
  display: block;
}
#infoDialog{
  width: 30%;
  height: auto;
}
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
.info{
  font-weight: bold;
}
#tailorInfo, #acctInfo{
  padding: 20px;
  border-style: groove;
  border-radius: 5%;
}
#wholeForm{
  padding-top: 80px;
  width: 85%;
  height: 650px;
	margin: auto;
	box-shadow: 0 4px 8px 8px rgba(0, 0, 0, 0.2), 0 6px 20px 20px rgba(0, 0, 0, 0.19);
	background-color: #E0E0E0;
}
#imgPreview{
  margin-bottom: 10px;
  margin-top: 10px;
}
#backTo{
  color: white;
}

</style>
