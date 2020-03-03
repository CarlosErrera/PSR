import Vue from 'vue'
import VueRouter from 'vue-router';
import Login from '../Login/Login.vue';
import Account from '../Account/Account.vue';

Vue.use(VueRouter);

var router = new VueRouter({
  mode: 'history',
  routes:[
    {
        path: '/', component: Login
    },
    {
      path: '/account', component: Account
    }
  ]
})

export default router