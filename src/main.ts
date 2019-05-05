import Vue from 'vue';
import router from './route';
import store from './store';
import App from './App.vue';

import './plugins/element.js'
import './styles/index.scss'
import 'highlight.js/styles/color-brewer.css'

import './components'
import codeDemo from './views/components/codeDemo.vue'

Vue.config.productionTip = false;
Vue.component('code-demo', codeDemo)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
