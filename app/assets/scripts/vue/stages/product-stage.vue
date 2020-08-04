<template lang="pug">
<div id="stage" class="stage">
<div class="product-details">
<div class="product-details__main">
<p class="product-details__title">{{currentproduct[0].name}}</p>
<img class="product-details__img" :src="'./assets/images'+currentproduct[0].img.url" :alt="currentproduct[0].name">

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
<th>size</th>
<th>chest</th>
<th>length</th>
</tr>
<tr v-for="size in currentproduct[0].sizeguide">
<td>{{size.size}}</td>
<td>{{size.chest}}</td>
<td>{{size.length}}</td>
</tr>
</table>
</div>

</div>
</div>
</template>







<script>

export default {

  name: 'PageDetails',
  data() { return { currentproduct: null, selected: [], sizeselection: [], errormsg: ['errormsg','sizeerror', 'display-none'], addedtobasket: ['product-details__checked', 'display-none'] }},
  props: ['products', 'categories', 'subcategories','baskettotal', 'paypalitems'],
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
        if (data.shipping_address.country_code === 'GB') {
            
        

        // uk shipping Amount
        const shippingAmount = '3.00'
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
    }else if (data.shipping_address.country_code === 'IE'){
	// irl shipping Amount
        const shippingAmount = '7.00'
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
        const shippingAmount = '12.00'
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
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
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
 

  this.$emit('add', this.currentproduct[0].name, this.selected, this.currentproduct[0].price, this.currentproduct[0].id, this.currentproduct[0].sku)
  this.errormsg = ['errormsg','sizeerror', 'display-none']
  this.sizeselection = []
  this.addedtobasket = ['product-details__checked']
  
 }
 
 
 },
 close(){
 
 this.addedtobasket = ['product-details__checked','display-none']
 
 
 }
 

 
 }
  
  
  }

</script>
