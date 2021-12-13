import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'

///https://github.com/tushargugnani/vue-step-wizard
import VueStepWizard from 'vue-step-wizard'
import 'vue-step-wizard/dist/vue-step-wizard.css'
Vue.use(VueStepWizard);
Vue.config.productionTip = false

///https://github.com/kartoteket/vue-image-upload-resize
import ImageUploader from 'vue-image-upload-resize'
Vue.use(ImageUploader);


new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
