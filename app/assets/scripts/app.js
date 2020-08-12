import '../styles/styles.css'


import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'

const Sitenav = () => import( /* webpackChunkName: "Sitenav" */
  /* webpackMode: "lazy" */ /* webpackPreload: true */ './vue/head.vue')
const Stage = () => import(/* webpackChunkName: "Stage" */
  /* webpackMode: "lazy" */ /* webpackPreload: true */ './vue/stages/index-stage.vue')
const Sitefoot = () => import( /* webpackChunkName: "SiteFoot" */
  /* webpackMode: "lazy" */   
  './vue/footer.vue')
const Category = () => import( /* webpackChunkName: "Category" */
  /* webpackMode: "lazy" */ /* webpackPrefetch: true */   
  './vue/stages/new-category-stage.vue')
const Subcategory = () => import(/* webpackChunkName: "Subcategory" */
  /* webpackMode: "lazy" */   './vue/stages/sub-category-stage.vue')
const ProductDetails = () => import(/* webpackChunkName: "ProductDetails" */
  /* webpackMode: "lazy" */  /* webpackPrefetch: true */ './vue/stages/product-stage.vue')
const Contact = () => import(/* webpackChunkName: "Contact" */
  /* webpackMode: "lazy" */ './vue/stages/contact.vue')
const ContactUs = () => import(/* webpackChunkName: "ContactUs" */
  /* webpackMode: "lazy" */   './vue/stages/contactus.vue')
const Faqs = () => import(/* webpackChunkName: "Faqs" */
  /* webpackMode: "lazy" */   './vue/stages/faqs.vue')
const Terms = () => import(/* webpackChunkName: "Terms" */
  /* webpackMode: "lazy" */ './vue/stages/terms.vue')


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
 {path: '/category/:id/:sub', component: Subcategory, props: true},
 {path: '/product/:id', component: ProductDetails, props: true},
 {path: '/info', component: Contact, props: true,
 children:[
 {
 path: '/', component: ContactUs, props: true },
 {
 path: 'Faqs', component: Faqs, props: true},
 { 
 path: 'Terms', component: Terms,  props: true
 }
 ]}
 
]

const router = new VueRouter({
	mode: 'history',
	base: '/',
	routes
	
})

 
Vue.config.productionTip = false





new Vue({
	router,
  el: '#app',
  components: { 'sitenav': Sitenav, 'stage': Stage, 'sitefoot': Sitefoot},
  data:{  categories: [], products: [], subcategories: [], basketcontents: [], baskettotal: null, paypalitems: [], applyhover: []},
  created: function() {
Axios.get('https://competent-boyd-4461dd.netlify.app/products.js', {
 headers: {
   'Access-Control-Allow-Origin' : '*'
	}}).then( response =>{
    this.products = response.data})	
	Axios.get('https://competent-boyd-4461dd.netlify.app/categories.js', {
 headers: {
   'Access-Control-Allow-Origin' : '*'
	}}).then( response =>{
    this.categories = response.data})	
	Axios.get('https://competent-boyd-4461dd.netlify.app/subcategories.js', {
 headers: {
   'Access-Control-Allow-Origin' : '*'
	}}).then( response =>{
    this.subcategories = response.data})	
  },
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
		  console.log('ran')
		 if(basketId === 'all'){
		  this.basketcontents = []
          this.paypalitems = []		  
			 
			return 
		 }
		  
		let  idToRemove = basketId;
		
		let index = this.basketcontents.map(function(item) {
		
		return item.basketId }).indexOf(idToRemove)
		
		this.basketcontents.splice(index,1)
		this.paypalitems.splice(index,1)
		this.finalTotal()
		
		if(this.basketcontents.length === 0){
			
			this.applyhover = []
			
		}
		  
	  },
	  
	   addItem(productName, productSize, productPrice, productId, productSku, img){
		   
		   if( this.basketcontents.length === 0 ){
		//on site data element  
		this.basketcontents.push({ 'basketId': 0, 'name': productName,  'size': productSize, 'price': productPrice, 'productId': productId, 'productimg': img})
		this.paypalitems.push({name:`${productName} ${productSku} ${productSize}`, productid: 0, quantity:"1", unit_amount:{currency_code:"GBP", value:`${productPrice}`}})
		
		this.finalTotal()
		this.applyhover = ['basket--hover']
			
		
		   }
		   else{
			   
			   this.basketcontents.push({ 'basketId': this.basketcontents.length, 'name': productName, 'size': productSize, 'price': productPrice, 'productId': productId, 'productimg': img})
			   this.paypalitems.push({name:`${productName} ${productSku} ${productSize}`, productid: this.basketcontents.length, quantity:"1", unit_amount:{currency_code:"GBP", value:`${productPrice}`}})
			   
			   this.finalTotal()
			   this.applyhover = ['basket--hover']
			
			   
		   }
		  
	  }
	  
	  
  }
})
  

  