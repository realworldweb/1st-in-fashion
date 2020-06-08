import "lazysizes"
import '../styles/styles.css'






	  

import Vue from 'vue'
import VueRouter from 'vue-router'
import Sitenav from './vue/head.vue'
import Stage from './vue/stages/index-stage.vue'
import Contact from './vue/stages/contact.vue'
import ContactUs from './vue/stages/contactus.vue'
import Faqs from './vue/stages/faqs.vue'
import Terms from './vue/stages/terms.vue'
import Sitefoot from './vue/footer.vue'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faUserSecret)
library.add(faCaretDown)
library.add(faQuestionCircle)
library.add(faListAlt)
library.add(faFacebookSquare)
library.add(faEnvelopeOpenText)
library.add(faWhatsapp)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter)


const routes =[
 {path: '/', component: Stage},
 {path: '/contact', component: Contact,
 children: [
 {
 path: '/', component: ContactUs },
 {
 path: 'Faqs', component: Faqs},
 { 
 path: 'Terms', component: Terms
 }
 ]}
]

const router = new VueRouter({
	routes
	
})

 
Vue.config.productionTip = false





new Vue({
	router,
  el: '#app',
  components: { 'sitenav': Sitenav, 'stage': Stage, 'contact': Contact, 'sitefoot': Sitefoot },
  data:{ categories: null, products: null }
  
 
  
  
  }).$mount('#app')
  

  