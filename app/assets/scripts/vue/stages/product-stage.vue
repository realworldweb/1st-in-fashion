<template lang="pug">
<div id="stage" class="stage">
<div class="product-details">
<div class="product-details__main">
<p class="product-details__title">{{currentproduct[0].name}}</p>
<img class="product-details__img" :src="'./assets/images'+currentproduct[0].img.url" :alt="currentproduct[0].name">

<form class="product-details__purchase">
<span class="product-details__price">&#163;{{currentproduct[0].price}}</span>
<label class="product-details__sizes">Size:
<select id="sizes" name="sizes" >
<option  v-for="sizes in currentproduct[0].sizes" :value="sizes.size">{{sizes.size}}</option>
</select>
</label>
<input type="submit" name="add" class="product-details__buy" value="Add to basket">
</form>
</div>
<p class="product-details__desc">{{currentproduct[0].desc}}</p>
<div class="product-details__sizeguide"><p>sizeguide</p></div>

</div>
</div>
</template>







<script>




export default {

  name: 'PageDetails',
  data() { return { currentproduct: null }},
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
 
 
 }
  
  
  }

</script>
