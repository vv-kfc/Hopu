import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from '../http.js'
import '@/assets/font.css'
import {
  Field,
  Button,
  Toast,
  Icon,
  Uploader,
  Dialog,
  ActionSheet,
  Tab,
  Tabs,
  List,
  Collapse,
  CollapseItem,
  Loading,
  Lazyload,
  Divider
} from 'vant'

Vue.use(Field)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Loading)
Vue.use(Lazyload, {
  lazyComponent: true
})
Vue.use(Divider)

Vue.prototype.$msg = Toast
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
