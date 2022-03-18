import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios';

import Toastify from 'toastify-js'

Vue.use(Toastify)
    // set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

import "toastify-js/src/toastify.css"

// console.log(`Bearer ${ store.state.token }`);
// import 'assets/css/main.css'
if (store.state.token === '') {
    console.log('Logged Out');
}


import Swal from 'sweetalert2'

var ifConnected = window.navigator.onLine;
if (ifConnected) {
    console.log('Connection available');
} else {
    Toastify({
        text: "No Internet Connection",
        className: "info",
        style: {
            background: "red",
        }
    }).showToast();
}





Vue.config.ignoredElements = [/^ion-/]

Vue.config.productionTip = false

new Vue({
    Swal,
    router,
    store,
    render: h => h(App)
}).$mount('#app')