import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

//Vue Imports
import { BCard, BCardText, BLink, BPagination, BFormGroup, BFormInput, BFormSelect, BRow, BButton, BModal, BListGroup, BListGroupItem, BTable } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { VueGoodTable } from 'vue-good-table'

//Vue Pages
import DataForm from '../src/views/Forms/DataForm.vue'

import router from './router'
import store from './store'
import App from './App.vue'

//Vue Components
Vue.component('apexchart', VueApexCharts)
Vue.component('BCard', BCard)
Vue.component('BCardText', BCardText)
Vue.component('BLink', BLink)
Vue.component('VueGoodTable',VueGoodTable);
Vue.component('BPagination',BPagination);
Vue.component('BFormGroup',BFormGroup);
Vue.component('BFormInput',BFormInput);
Vue.component('BFormSelect',BFormSelect);
Vue.component('BRow',BRow);
Vue.component('BButton',BButton);
Vue.component('BModal',BModal);
Vue.component('BListGroup',BListGroup);
Vue.component('BListGroupItem',BListGroupItem);
Vue.component('BTable',BTable);

//Vue Pages Components
Vue.component('DataForm',DataForm);

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'

//CSS Configuration
import '@core/scss/vue/libs/vue-good-table.scss';

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(VueApexCharts)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
