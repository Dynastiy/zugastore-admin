import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios';
// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
// import 'assets/css/main.css'

import Swal from 'sweetalert2'

Vue.config.ignoredElements = [/^ion-/]

Vue.config.productionTip = false

new Vue({
  Swal,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
