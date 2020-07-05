<template lang="pug">
<div id="stage" class="stage">
<div class="product-slice__area product-slice__area--whole-page">
<div class="product-slice" v-for="item in subcategories" v-if=" item.subCategory.includes('baby') && $route.params.id === 'baby' || item.subCategory.includes($route.params.id) && $route.params.id!=='baby' && !item.subCategory.includes('baby') " :onload="subId(item.subCategory)">
<p class="product-slice__title">{{item.subCategory}}</p>
<div class="product-slice__products">
<div v-for="product in item.products"  class="product-slice__slice">
<router-link tag="a" class="product-tile" :to="'/product/'+product.id">
<img class="product-tile__img lazyload" :src="'./assets/images'+product.img.url">
<p class="product-tile__price">&#163;{{product.price}}</p>
</router-link>
</div>
</div>
<router-link tag="a" :to="'/category/' + $route.params.id + '/' + currentsubcategory" class="product-slice__more">See more<font-awesome-icon icon="caret-down" class="side-caret" /></router-link>
</div>


</div>
</div>
</template>







<script>




export default {

  name: 'Category',
  data() { return {currentsubcategory: null}},
  props: ['products', 'categories', 'subcategories'],
  methods:{
  
    subId(subCategory){
	
	if(this.$route.params.id === 'baby'){
	if(subCategory.includes('boys')){
	
	if(subCategory.includes('casual')){
	
	this.currentsubcategory = 'boyscasual'
	
	return
	
	}
	else{
	
	this.currentsubcategory = 'boysformal'
	
	return
	
	}
	
	}
	else
	{
	
	if(subCategory.includes('casual')){
	
	this.currentsubcategory = 'girlscasual'
	
	return
	
	}
	else{
	
	this.currentsubcategory = 'girlsformal'
	
	return
	
	}
	
	
	}
	
	
	
	}
	else 
	{
	
	if(subCategory.includes('casual')){
	
	this.currentsubcategory = 'casual'
	
	return
	
	}
	else{
	
	this.currentsubcategory = 'formal'
	
	return
	
	}
	
	
	}
	
  
  
  }
 
 }
}
</script>