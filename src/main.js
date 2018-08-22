import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

if (window.Cypress) {
  // only available during E2E tests
  window.app = app;
}
