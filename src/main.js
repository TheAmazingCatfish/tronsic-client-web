import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';
Vue.prototype.$axios = axios.create({
    baseUrl: 'www.tronsicit.com/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
    }
});

const context = require.context('./assets/icons', true, /\.svg$/);
context.keys().map(context);
import Icon from './components/Icon.vue';
Vue.component('icon', Icon);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
