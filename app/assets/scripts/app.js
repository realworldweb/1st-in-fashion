import "lazysizes"
import MobileMenu from "./modules/mobilemenu"
import '../styles/styles.css'





	  

import Vue from 'vue'
import Sitenav from './vue/head.vue'
import Stage from './vue/stages/index-stage.vue'
import Sitefoot from './vue/footer.vue'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faUserSecret)
library.add(faCaretDown)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)


 
Vue.config.productionTip = false





new Vue({
  el: '#app',
  components: { 'sitenav': Sitenav, 'stage': Stage, 'sitefoot': Sitefoot }

 
  
  
  });
  

  