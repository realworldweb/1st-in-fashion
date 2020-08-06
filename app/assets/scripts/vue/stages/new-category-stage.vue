<template lang="pug">
<div id="stage" class="stage">
<div class="product-pane" v-for="item  in categories" v-if="item.category === $route.params.id">
<p class="product-pane__title">{{$route.params.id}}</p>
<div class="product-pane__products">
<router-link tag="a" class="product-tile" :key="product.id" v-for="(product, index) in item.products" v-if="index < pagelimit && index >= currentitem" :to="'/product/'+product.id">
<img class="product-tile__img lazyload" :src="'./assets/images'+product.img.url">
<p class="product-tile__price">&#163;{{product.price}}</p>
</router-link>
</div>
<p class="product-pane__page"><span :class="prevstyle" @click="prevpage()"><font-awesome-icon icon="caret-down" class="caret--prevpage" />Prev page</span>|<span :class="nextstyle" @click="nextpage()">Next page<font-awesome-icon icon="caret-down" class="caret--nextpage" /></span></p>
</div>



</div>
</template>







<script>




export default {

  name: 'SubCategory',
  data() { return { pagelimit: 12, currentitem: 0, prevstyle: 'product-pane__prev product-pane__prev--hidden' , nextstyle: 'product-pane__next'  }},
  props: ['products', 'categories', 'subcategories'],
  methods: {
  
  nextpage(){
  let total;

  for (const category in this.categories) {
  
  if(this.categories[category].category === this.$route.params.id){
  
  
  total = this.categories[category].products.length
  
  break
 }
 

}
 
  
  this.currentitem += 12
  this.pagelimit += 12
  
 

  this.prevstyle = 'product-pane__prev'
  
  if(this.pagelimit >= total) {
  
  this.nextstyle = 'product-pane__next product-pane__next--hidden'
  
  }
  
  },
  
    prevpage(){
	
  this.nextstyle = 'product-pane__next'

  this.currentitem -= 12
  this.pagelimit -= 12
  
   if(this.pagelimit <= 12) {
  
  this.prevstyle = 'product-pane__prev product-pane__prev--hidden'
  
  }

  
  
  }
  
  }
 }

</script>
