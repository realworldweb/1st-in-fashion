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
import Category from './vue/stages/new-category-stage.vue'
import SubCategory from './vue/stages/sub-category-stage.vue'
import PageDetails from './vue/stages/product-stage.vue'
import Sitefoot from './vue/footer.vue'


const data = require('./vue/vue-data/data')




import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 

library.add(faCaretDown)
library.add(faMinusCircle)
library.add(faShoppingBasket)
library.add(faQuestionCircle)
library.add(faListAlt)
library.add(faFacebookSquare)
library.add(faEnvelopeOpenText)
library.add(faWhatsapp)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter)


const routes =[
 {path: '/', component: Stage, props: true},
 {path: '/category/:id', component: Category, props: true},
 {path: '/category/:id/:sub', component: SubCategory, props: true},
 {path: '/product/:id', component: PageDetails, props: true},
 {path: '/info', component: Contact, props: true,
 children:[
 {
 path: '/', component: ContactUs, props: true },
 {
 path: 'Faqs', component: Faqs, props: true},
 { 
 path: 'Terms', component: Terms, props: true
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
  components: { 'sitenav': Sitenav, 'stage': Stage, 'contact': Contact, 'sitefoot': Sitefoot, 'category': Category, 'PageDetails':PageDetails },
  data:{ categories: data.dataCategories, products: data.dataProducts, subcategories: data.dataSubCategories, basketcontents: [], baskettotal: null, applyhover: []},
  methods: {
	  
	  finalTotal(){
		  
         
		
		let sum = this.basketcontents.map( function(x){ return x.price })
		
		
		
		
		
		if(sum.length){
		
		return this.baskettotal = sum.reduce(function(total, price){
			
			return total + price
		})
		}
		else{
			
			return this.baskettotal = 0
			
		}
		
		
			
		
},
	  
	  removeItem(basketId){
		  
		let  idToRemove = basketId;
		
		let index = this.basketcontents.map(function(item) {
		
		return item.basketId }).indexOf(idToRemove)
		
		this.basketcontents.splice(index,1)
		
		this.finalTotal()
		
		if(this.basketcontents.length === 0){
			
			this.applyhover = []
			
		}
		  
	  },
	  
	   addItem(productName, productSize, productPrice, productId){
		   
		   if( this.basketcontents.length === 0 ){
		  
		this.basketcontents.push({ 'basketId': 0, 'name': productName, 'size': productSize, 'price': productPrice, 'productId': productId})
		
		this.finalTotal()
		this.applyhover = ['basket--hover']
			
		
		   }
		   else{
			   
			   this.basketcontents.push({ 'basketId': this.basketcontents.length, 'name': productName, 'size': productSize, 'price': productPrice, 'productId': productId})
			   
			   this.finalTotal()
			   this.applyhover = ['basket--hover']
			
			   
		   }
		  
	  }
	  
	  
  }
}).$mount('#app')
  

  