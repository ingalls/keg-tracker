import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'

import Default from './components/Default.vue';
import LocationList from './components/LocationList.vue';
import KegList from './components/KegList.vue';

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Default },

        { path: '/locations', component: LocationList },

        { path: '/kegs', component: KegList },
    ]
});

new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')
