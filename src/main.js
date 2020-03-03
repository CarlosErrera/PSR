import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './plugins/router';

Vue.config.productionTip = false


new Vue({
  router:router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
