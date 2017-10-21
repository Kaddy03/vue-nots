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
          <button class="mdl-button mdl-js-button mdl-js-ripple-effect">
	           <i class="material-icons">keyboard_backspace</i>
		         Back to Dashboard
	        </button>
          </router-link>
        </div>
      </header>

    </div>

    <!-- END TEMPLATE -->
  </div>
</template>

<!-- SCRIPT -->
<script>

export default {
  data () {
    return {
      isLoading: true,
      tailorId: this.$route.params.id
    }
  },
  methods: {

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
  background-color: #3f51b5;
}
.hint{
  font-size: 8pt;
  color: red;
}
.mdl-js-progress{
  width: 100%;
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
