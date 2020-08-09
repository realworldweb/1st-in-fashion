<template lang="pug">
<div id="stage" class="stage">
<div class="product-details">
<div class="product-details__main">
<p class="product-details__title">{{currentproduct[0].name}}</p>
<img class="product-details__img" :src="'/./assets/images'+currentproduct[0].img.url" :alt="currentproduct[0].name">

<form class="product-details__purchase" @submit.prevent>
<span class="product-details__price">&#163;{{currentproduct[0].price}}</span>
<label class="product-details__sizes">Size:
<select id="sizes" name="sizes" v-model="selected" :class="sizeselection">
<option  v-for="sizes in currentproduct[0].sizes" :value="sizes.size" >{{sizes.size}}</option>
</select>
</label>
<p :class='errormsg'>Please select a size</p>
<input type="submit" name="add" @click="addToBasket" class="product-details__buy" value="Add to basket">
</form>
</div>
<div :class="addedtobasket">
<p>Item added to Basket</p>
<div id="paypal" ref="paypalcart"></div>
<a href="#" @click="close" >Continue Shopping</a>
</div>
<p class="product-details__desc">{{currentproduct[0].desc}}</p>
<div class="product-details__sizeguide">
<table>
<tr>
<th v-for="(size, name) in currentproduct[0].sizeguide[0]">{{name}} CM</th>
</tr>
<tr v-for="size in currentproduct[0].sizeguide">
<td v-for="(sizes ,name) in size">{{size[name]}}</td>

</tr>
</table>
</div>

</div>
</div>
</template>







<script>
import Axios from 'axios'
let postJson
let postInfo = {}

export default {

  name: 'PageDetails',
  data() { return { currentproduct: null, selected: [], sizeselection: [], errormsg: ['errormsg','sizeerror', 'display-none'], addedtobasket: ['product-details__checked', 'display-none'] }},
  props: ['products', 'categories', 'subcategories','baskettotal', 'basketcontents', 'paypalitems'],
  created(){
  
  this.loadproduct
 
	  
  
 },
computed:{
 
 loadproduct: function(){
  const check = parseInt(this.$route.params.id)
  let selection = this.products.filter( data => data.id === check )
  this.currentproduct = selection
  return selection
  
  
  }
 
 
 },
 methods:{
 
 setloaded(){
 document.getElementById('paypal').innerHTML =''
  this.loaded = true
	  paypal
        .Buttons({
          createOrder: (data, actions) => {
		  this.close()
            return actions.order.create({
              purchase_units: [{
                     amount: {
                      currency_code: "GBP",
                       value: ""+this.baskettotal+"",
                      breakdown: {
                        item_total: {currency_code:"GBP", value:""+this.baskettotal+""}
						}
                     },
                 items: this.paypalitems
        }],
		})
		 },
onShippingChange: (data, actions) => {
      
		  //handle shipping rules
		const euro = ['FR','DK','EE','FI','DE','GR','IE','IT','LV','NL','NO','PL','PT','ES','SE','UA']
		let isEuro = false
		
		for (let country in euro){
		
		if(euro[country] === data.shipping_address.country_code){
		
		isEuro = true
		
		break
		}
		
		}
		let shippingAmount
		
        if (data.shipping_address.country_code === 'GB') {
         
        
		
        if(this.baskettotal >= 20){
		
		 shippingAmount = '0.00'
		}
		else
		{

        // uk shipping Amount
         shippingAmount = '3.00'
	    }
		
        return actions.order.patch([
            {
                op: 'replace',
                path: '/purchase_units/@reference_id==\'default\'/amount',
                value: {
                    currency_code: 'GBP',
                    value: (parseFloat(this.baskettotal) + parseFloat(shippingAmount)).toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: 'GBP',
                            value: this.baskettotal
                        },
                        shipping: {
                            currency_code: 'GBP',
                            value: shippingAmount
                        }
                    }
                }
            }
        ])
    }else if (isEuro === true){
	// euro shipping Amount
         shippingAmount = '7.00'
        return actions.order.patch([
            {
                op: 'replace',
                path: '/purchase_units/@reference_id==\'default\'/amount',
                value: {
                    currency_code: 'GBP',
                    value: (parseFloat(this.baskettotal) + parseFloat(shippingAmount)).toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: 'GBP',
                            value: this.baskettotal
                        },
                        shipping: {
                            currency_code: 'GBP',
                            value: shippingAmount
                        }
                    }
                }
            }
        ])
	
	
	}
	else{
	// ROW shipping Amount
        shippingAmount = '12.00'
        return actions.order.patch([
            {
                op: 'replace',
                path: '/purchase_units/@reference_id==\'default\'/amount',
                value: {
                    currency_code: 'GBP',
                    value: (parseFloat(this.baskettotal) + parseFloat(shippingAmount)).toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: 'GBP',
                            value: this.baskettotal
                        },
                        shipping: {
                            currency_code: 'GBP',
                            value: shippingAmount
                        }
                    }
                }
            }
        ])
	
	
	}
	},		 
          onApprove: async (data, actions) => {
		   
		   this.$emit('remove', 'all')
		   const alert = document.createElement('div')
			alert.className = 'confirmed'
			alert.innerHTML = `<img class='confirmed__loading' src="/assets/images/loading.gif" alt="loading order details">`
			document.body.appendChild(alert)
		    const order = await actions.order.authorize()
			console.log(order)
			this.compileEmail(order)
            let listItems = `<table class="confirmed__items">
			<tr>
			<th>Item</th>
			<th>Qty</th>
			</tr>`
            this.paidFor = true
			for( let key in order.purchase_units[0].items){
			
			 listItems += `<tr><td>${order.purchase_units[0].items[key].name}</td><td>${order.purchase_units[0].items[key].quantity}</td></tr>`
			
			}
			
			listItems += `</table>`
			
            if(order.status === 'COMPLETED') {
			alert.addEventListener('click' , this.closeorder)
			alert.innerHTML = `<h1 class="confirmed__title">Details Confirmed</h1>
			                    <p class="confirmed__details">Thank's for your order of.<br></p>
								 ${listItems}
								 <p class="confirmed__details">Once we confirm stock we will charge your prefered payment method.
								 You will recieve an order/payment confirmation email. 
								 Letting you know this has taken place and your order will be shipped to.<br>
								 <span class="confirmed__address">
								 ${order.purchase_units[0].shipping.address.address_line_1}<br>
								 ${order.purchase_units[0].shipping.address.admin_area_1}<br>
								 ${order.purchase_units[0].shipping.address.postal_code}<br>
								 </span>
								 Thanks for shopping with us we hope you enjoy your experince</p>
								<button class="confirmed__close" value="close">Close</button>`
			
			
			
			
			}
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypalcart)
		},  
 addToBasket(){
 
 this.setloaded()
 if(this.selected.length === 0){
 
 this.sizeselection.push('error')
 this.errormsg = ['errormsg','sizeerror']
 
 return
 }
 else
 {
 

  this.$emit('add', this.currentproduct[0].name, this.selected, this.currentproduct[0].price, this.currentproduct[0].id, this.currentproduct[0].sku, this.currentproduct[0].img.url )
  this.errormsg = ['errormsg','sizeerror', 'display-none']
  this.sizeselection = []
  this.addedtobasket = ['product-details__checked']
  
 }
 
 
 },
 close(){
 
 this.addedtobasket = ['product-details__checked','display-none']
 
 
 },
 compileEmail(order){
  let listItems = `<table class="confirmed__items">
			<tr>
			<th>Item</th>
			<th>Qty</th>
			</tr>`
			for( let key in order.purchase_units[0].items){
			
		
			
			 listItems += `<tr><td>${order.purchase_units[0].items[key].name}</td><td>${order.purchase_units[0].items[key].quantity}</td></tr>
			               <tr><td><a href="https://www.1stinfashion.co.uk/${this.basketcontents[key].productimg}">View Image</a></td></tr>`
			
			}
			
			listItems += `</table>`
	
	postInfo['item'] = listItems
	postInfo['address'] = `${order.purchase_units[0].shipping.address.address_line_1}<br>
						 ${order.purchase_units[0].shipping.address.admin_area_1}<br>
					     ${order.purchase_units[0].shipping.address.postal_code}<br>`
	
	
		
		postJson = JSON.stringify(postInfo)
		this.sendrequest()
	
				
	

},

sendrequest(){
	
	Axios.post('/.netlify/functions/orderemails', postJson ).then(() => {
      this.run.remove()
    }).catch(() => {
	  console.log(postJson)
      console.log('Sorry something went wrong please retry order email')
    })
},
closeorder(e){
 
 if(e.target.getAttribute('value') === 'close'){
 
  const alert = document.querySelector('.confirmed')
  alert.remove()
 
 
 }

 
}
 

 
 }
  
  
  }

</script>
