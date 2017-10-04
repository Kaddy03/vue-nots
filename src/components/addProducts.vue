<template>
    <!-- BEGIN TEMPLATE -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
  <!-- SIDE DRAWER -->
  <div class="mdl-layout__drawer">
    <div class="drawerHeader mdl-layout-title">Tailor Name
      <button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons" role="presentation">account_circle</i>
      </button>
      <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="demo-menu-lower-right">
        <li disabled class="mdl-menu__item">Edit Profile</li>
        <router-link v-bind:to="'/nots'" exact><li class="mdl-menu__item">Logout</li></router-link>
      </ul>
    </div>
    <nav class="mdl-navigation">
      <router-link v-bind:to="'/nots/' + tailorId + '/orders'" exact>
        <span class="mdl-navigation__link" href="">All Orders</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/products'" exact>
        <span id="currentNav" class="mdl-navigation__link" href="">Ready-to-Wear's</span>
      </router-link>
      <router-link v-bind:to="'/nots/' + tailorId + '/productTypes'" exact>
        <span class="mdl-navigation__link">My Product Types</span>
      </router-link>
    </nav>
  </div>
  <!-- MAIN CONTENT -->
  <main class="mdl-layout__content">
    <div class="page-content">
      <div class="mdl-grid">
          <h5>Add a Product</h5>
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
            <p>
            Select a Fabric
            <select v-model="ready_to_wear.fabric">
              <option v-for="fabric in fabrics">{{ fabric.fabricName }}</option>
            </select>
            </p>
      </div>
      <!-- FORMS -->
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--4-col">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    			     <input class="mdl-textfield__input" type="text" id="rtwColor" v-model="ready_to_wear.rtwColor">
    			     <label class="mdl-textfield__label" for="rtwColor">Color</label>
    		  </div>
        </div>
        <div class="mdl-cell mdl-cell--4-col">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="rtwPrice" v-model="ready_to_wear.rtwPrice">
            <label class="mdl-textfield__label" for="rtwPrice">Price</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
          </div>
        </div>
        <div class="mdl-cell mdl-cell--4-col">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="rtwStock" v-model="ready_to_wear.rtwStock">
            <label class="mdl-textfield__label" for="rtwStock">Number of Stock</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
          </div>
        </div>
      </div>
      <div class="mdl-grid">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="onPickfile" accept="image/*">
          Upload Image
        </button>
        <input type="file" style="display: none" ref="fileInput" v-on:change="onFilePicked">
      </div>
      <div class="mdl-grid">
        <img :src="ready_to_wear.rtwImg" height="150">
      </div>
      <div class="mdl-grid">
        <div id="txtfield" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <textarea class="mdl-textfield__input" type="text" rows= "10" id="rtwDescription" v-model="ready_to_wear.rtwDescription"></textarea>
          <label class="mdl-textfield__label" for="rtwDescription">Description/Additional Details</label>
        </div>
      </div>
      <!-- SUBMIT BUTTON -->
      <div class="mdl-grid">
        <router-link v-bind:to="'/nots/' + tailorId + '/products'" exact>
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="post">
              <i class="material-icons">done_all</i> Add Product
          </button>
        </router-link>
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
        type: "",
        tailor_id: this.$route.params.id
      }
    }
  },
  methods: {
    post: function(){
      for(var i = 0; i < this.tailors.length; i++){
       if(this.$route.params.id == this.tailors[i].id)
         this.ready_to_wear.tailor_name = this.tailors[i].tName;
      }
      //this.$http.post('https://nots-76611.firebaseio.com/ready_to_wear.json', this.ready_to_wear);
      let imageUrl
      let key
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
          return this.$firebase.database().ref('ready_to_wears').child(key).update({rtwImg: imageUrl})
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
        if (this.$route.params.id == data[key].tailor){
          data[key].id = key;
          ptArray.push(data[key]);
        }
        this.types = ptArray;
      }
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
    //Retrieval for tailor info
    this.$http.get('https://nots-76611.firebaseio.com/tailors.json').then(function(data){
      return data.json();
    }).then(function(data){
      var tailorArray = [];
      for (let key in data){
        data[key].id = key;
        tailorArray.push(data[key]);
      }
      this.tailors = tailorArray;
    });
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
#currentNav{
  background-color: #21C0C0;
  color: white;
}
#txtfield{
  width: 600px;
}

</style>
