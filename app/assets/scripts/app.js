import "lazysizes"
import MobileMenu from "./modules/mobilemenu"
import '../styles/styles.css'





import Vue from 'vue'
import Head from './vue/head.vue'
import Stage from './vue/stages/index-stage.vue'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faUserSecret)
library.add(faCaretDown)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

 
Vue.config.productionTip = false



new Vue({
  el: '#head',
  components: { Head },
  template: '<Head/>'
  })
  
  new Vue({
    el: '#stage',
  components: { Stage },
  template: '<Stage/>'
  })
  
  
