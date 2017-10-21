<template>
    <!-- BEGIN TEMPLATE -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <h3>Welcome To Naga Online Tailoring Services</h3>
        <div class="mdl-layout-spacer"></div>
        <div>
        <button id="logout" class="mdl-button mdl-js-button mdl-js-ripple-effect">
           <i class="material-icons">power_settings_new</i>
           Logout
        </button>
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
        <span id="currentNav" class="mdl-navigation__link" href=""><i class="material-icons">store_mall_directory</i> Ready-to-Wears</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/productTypes'" exact>
        <span class="mdl-navigation__link"><i class="material-icons">style</i> My Product Types</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/reservations'" exact>
        <span class="mdl-navigation__link"><i class="material-icons">content_paste</i> RTW reservations</span>
      </router-link>
    </nav>
  </div>
  <!-- MAIN CONTENT -->
  <main class="mdl-layout__content">
    <div class="page-content">
      <div class="mdl-grid">
          <h5>Ready-to-Wears | Add a RTW Product</h5>
      </div>
      <div class="mdl-grid">
        <router-link v-bind:to="'/nots/' + tailorId + '/products'" exact>
          <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored">
             <i class="material-icons">keyboard_backspace</i>
             Back to Ready-to-Wears
          </button>
        </router-link>
      </div>
      <!-- SELECT BOXES -->
      <div class="mdl-grid">
            <p>
            Select a Product Type
            <select v-model="ready_to_wear.type">
              <option v-for="type in types">{{ type.ptName }}</option>
            </select>
            </p>
            <p>
            Select a Size
            <select v-model="ready_to_wear.size">
              <option v-for="size in sizes">{{ size.sizeLetter }}</option>
            </select>
            </p>
      </div>
      <!-- FORMS -->
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--3-col">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    			     <input class="mdl-textfield__input" type="text" id="rtwColor" v-model="ready_to_wear.rtwColor">
    			     <label class="mdl-textfield__label" for="rtwColor">Color</label>
    		  </div>
        </div>
        <div class="mdl-cell mdl-cell--3-col">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="rtwPrice" v-model="ready_to_wear.rtwPrice">
            <label class="mdl-textfield__label" for="rtwPrice">Price</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
          </div>
        </div>
        <div class="mdl-cell mdl-cell--3-col">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="rtwStock" v-model="ready_to_wear.rtwStock">
            <label class="mdl-textfield__label" for="rtwStock">Number of Stock</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
          </div>
        </div>
        <div class="mdl-cell mdl-cell--3-col">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="rtwStock" v-model="ready_to_wear.fabric">
            <label class="mdl-textfield__label" for="rtwStock">Type of fabric</label>
          </div>
        </div>
      </div>
      <!-- IMAGE UPLOAD -->
      <div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="onPickfile" accept="image/*">
          Upload Image
        </button>
        <input type="file" style="display: none" ref="fileInput" v-on:change="onFilePicked">
      </div>
      <!-- IMAGE PREVIEW -->
      <div id="imgPreview">
        <img :src="ready_to_wear.rtwImg" height="150">
      </div>
      <div class="mdl-grid">
        <div id="txtfield" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <textarea class="mdl-textfield__input" type="text" rows= "10" id="rtwDescription" v-model="ready_to_wear.rtwDescription"></textarea>
          <label class="mdl-textfield__label" for="rtwDescription">Description/Additional Details/Exact Measurements</label>
        </div>
      </div>
      <!-- SUBMIT BUTTON -->
      <div class="mdl-grid">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click.prevent="prompt">
              <i class="material-icons">done_all</i> Add Product
          </button>
          <!-- PROMPT DIALOG -->
          <dialog class="mdl-dialog">
            <p class="mdl-dialog__title">Are you sure about the information you entered?</p>
            <div class="mdl-dialog__content">
              *The information you entered can't be edited later, after you posted
            </div>
            <div class="mdl-dialog__actions">
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-on:click="post">
                  YES
                </button>
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click.prevent="closeDialog">
                Back
              </button>
            </div>
          </dialog>
      </div>
    </div>
  </main>
</div>
</template>

<!-- SCRIPT -->
<script>

export default {
  data () {
    return {
      tailorId: this.$route.params.id,
      tailorData: {},
      fabrics: [],
      sizes: [],
      types: [],
      tailors: [],
      image: null,
      ready_to_wear: {
        rtwDescription: "",
        rtwPrice: "",
        rtwColor: "",
        rtwStock: "",
        rtwImg: "",
        fabric: "",
        size: "",
        reserved: 0,
        type: "",
        tailor_id: this.$route.params.id
      }
    }
  },
  methods: {
    post: function(){
      let imageUrl
      let key
      let goTo = this.$router
      this.$firebase.database().ref('ready_to_wears').push(this.ready_to_wear)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = this.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return this.$firebase.storage().ref('rtws/' + key + '.' + ext).put(this.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return this.$firebase.database().ref('ready_to_wears').child(key).update({rtwImg: imageUrl, rwtId: key, tailorName: this.tailorData.tName})
        }).then(function(){
          alert("Product Added");
        }).then(function(){
          goTo.push({ name: 'rtws', params: { id: this.$route.params.id }});
        });
    },
    prompt: function(){
      dialog.showModal();
    },
    closeDialog: function(){
      dialog.close();
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
        this.ready_to_wear.rtwImg = fileReader.result;
      })
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  },
  created() {
    //Retrieval for product types
    this.$http.get('https://nots-76611.firebaseio.com/product_types.json').then(function(data){
      return data.json();
    }).then(function(data){
      var ptArray = [];
      for (let key in data){
        if(this.$route.params.id == data[key].tailor){
          data[key].id = key;
          ptArray.push(data[key]);
        }
      }
      this.types = ptArray;
    });
    //Retrieval for fabrics
    this.$http.get('https://nots-76611.firebaseio.com/fabrics.json').then(function(data){
      return data.json();
    }).then(function(data){
      var fabricArray = [];
      for (let key in data){
        data[key].id = key;
        fabricArray.push(data[key]);
      }
      this.fabrics = fabricArray;
    });
    //Retrieval for sizes
    this.$http.get('https://nots-76611.firebaseio.com/sizes.json').then(function(data){
      return data.json();
    }).then(function(data){
      var sizeArray = [];
      for (let key in data){
        data[key].id = key;
        sizeArray.push(data[key]);
      }
      this.sizes = sizeArray;
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
    var dialog = document.querySelector('dialog');
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
p{
  margin-right: 20px;
}
li, a{
  text-decoration: none;
  color: white;
}
dialog{
  height: auto;
  width: 40%;
}
.drawerHeader{
  background-color: #3f51b5;
  color: white;
}
.container{
	width: 95%;
	margin: auto;
	box-shadow: 0 4px 8px 8px rgba(0, 0, 0, 0.2), 0 6px 20px 20px rgba(0, 0, 0, 0.19);
	background-color: white;
  height: 572px;
}
.mdl-textfield__label{
  color: black;
}
.mdl-textfield{
  margin-left: 0;
}
.page-content{
	background-color: white;
  height: auto;
  padding-left: 20px;
}
.mdl-dialog__content{
  font-size: 16pt;
  color: red;
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
#logout {
  color: white;
}
#currentNav{
  background-color: #21C0C0;
  color: white;
}
#txtfield{
  width: 600px;
}
#imgPreview{
  margin-top: 10px;
}

</style>
