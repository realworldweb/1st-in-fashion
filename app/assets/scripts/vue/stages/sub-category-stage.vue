<template lang="pug">
<div id="stage" class="stage">
<div class="product-pane">
<p class="product-pane__title">{{appliedArray}}</p>
<div class="product-pane__products" v-for="item in subcategories" v-if="item.subCategory === appliedArray">
<router-link tag="a" class="product-tile" :key="product.id" v-for="product in item.products" :to="'/product/'+product.id">
<img class="product-tile__img lazyload" :src="'/./assets/images'+product.img.url">
<p class="product-tile__price">&#163;{{product.price}}</p>
</router-link>
</div>
</div>



</div>
</template>







<script>




export default {

  name: 'SubCategory',
  data() { return { appliedArray: null }},
  props: ['products', 'categories', 'subcategories'],
  mounted () {
  this.loadproducts
  },
  watch: {
'$route' (){

this.loadproducts

}
},
  computed:{
  loadproducts: function() {
  
  if (this.$route.params.sub.includes('girls')){
   if (this.$route.params.id.includes('baby')){
  
 this.appliedArray = 'baby girls '+this.$route.params.sub.slice(5)
 
  return this.appliedArray
  }
  else{
  
  this.appliedArray = 'girls '+this.$route.params.sub
 
  return this.appliedArray
  
  }
  }
  else{
  if (this.$route.params.id.includes('baby')){
  
 this.appliedArray = 'baby boys '+this.$route.params.sub.slice(4)
 
  return this.appliedArray
  }
  else{
  
  this.appliedArray = 'boys '+this.$route.params.sub
 
  return this.appliedArray
  
  }
  
  
  }
  
  }
  }
  
  }

</script>
