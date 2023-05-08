<template>
  <div>
    <loading
      :active.sync="getIsLoading"
      :can-cancel="false"
      :background-color="'#f26060'"
      :is-full-page="true"
      :opacity="1"
    >
      <div id="spinner"></div>
      <p class="font-montserrat text-white">{{ getTextLoading }}</p>
    </loading>
    <router-view></router-view>
  </div>
</template>

<script>
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'App',
  components: {
    Loading,
  },
  mounted() {
    this.loadingText()
  },
  computed: {
    getTextLoading() {
      return this.$store.state.textLoading
    },
    getIsLoading() {
      return this.$store.state.isLoading
    },
  },
  methods: {
    loadingText() {
      this.$store.dispatch('dispatchLoadingText').then(() => {
        this.$store.dispatch('dispatchEnableLoading').then(() => {
          this.$store.dispatch('dispatchDisableLoading')
        })
      })
    },
  },
}
</script>

<style lang="scss">
// Import Main styles for this application
@import 'assets/scss/style';
</style>
<style scoped>
#spinner {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #f26060;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  margin-bottom: 20px;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
