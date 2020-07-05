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
<a href="#" >Checkout</a>
<a href="#" @click="close" >Continue Shopping</a>
</div>
<p class="product-details__desc">{{currentproduct[0].desc}}</p>
<div class="product-details__sizeguide"><p>sizeguide</p></div>

</div>
</div>
</template>







<script>




export default {

  name: 'PageDetails',
  data() { return { currentproduct: null, selected: [], sizeselection: [], errormsg: ['errormsg','sizeerror', 'display-none'], addedtobasket: ['product-details__checked', 'display-none'] }},
  props: ['products', 'categories', 'subcategories'],
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
 
 addToBasket(){
 
 if(this.selected.length === 0){
 
 this.sizeselection.push('error')
 this.errormsg = ['errormsg','sizeerror']
 
 return
 }
 else
 {
 

  this.$emit('add', this.currentproduct[0].name, this.selected, this.currentproduct[0].price, this.currentproduct[0].id)
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
