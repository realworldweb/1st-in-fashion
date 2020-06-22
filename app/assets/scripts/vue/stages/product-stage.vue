<template lang="pug">
<div id="stage" class="stage">
<div class="product-details">
<div class="product-details__main" style="margin-top: 400px">
<p class="product-details__title">{{currentproduct[0].name}}</p>
<img :src="'./assets/images'+currentproduct[0].img.url" :alt="currentproduct[0].name">
<p class="product-details__price">{{currentproduct[0].price}}</p>
<form>
<select id=sizes name="sizes">
<option v-for="sizes in currentproduct[0].sizes" :value="sizes.size">{{sizes.size}}</option>
</select>
<input type="text" name="qty" placeholder="1">
<input type="submit" name="add" class="btn" value="Add to basket">
</form>
</div>
<p class="product-details__desc">{{currentproduct[0].desc}}</p>
<div class="Product-details__sizeguide"></div>

</div>
</div>
</template>







<script>




export default {

  name: 'PageDetails',
  data() { return { currentproduct: null}},
  props: ['products', 'categories', 'subcategories'],
  mounted(){
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
