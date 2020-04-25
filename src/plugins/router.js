import Vue from 'vue'
import VueRouter from 'vue-router';
import Login from '../Login/Login.vue';
import Account from '../Account/Account.vue';
import Axios from 'axios';
import api from '../api';


Vue.use(VueRouter);

var axios = Axios.create();

var router = new VueRouter({
  mode: 'history',
  routes:[
    {
      name: 'login',
      path: '/', component: Login,
    },
    {
      path: '/account', 
      name: 'account',
      component: Account,
      beforeEnter: function(to,from,next){
        axios.get(api.url.psrList)
        .then(function(res){
          if (to.name === 'account' && res.data){
            next();
          }
        })
        .catch(function(err){
          if (err.response.status === 403){
            next({name:'login'});
          }
        })  
      }
    }
  ]
})

export default router