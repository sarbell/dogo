import Vue from 'vue'
import Toasted from 'vue-toasted';
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(Toasted, {
  duration: 2000,
  position: 'top-right', // ['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left']
  theme: 'toasted-primary', // ['toasted-primary', 'outline', 'bubble']
  iconPack: 'material' // ['material', 'fontawesome', 'mdi', 'custom-class', 'callback']
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
