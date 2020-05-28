<template lang="pug">
<div id="stage" class="stage">
<div id="jumbo" class="jumbo">
<img src="/assets/images/baby-clothing.jpg" alt="fashionable childrens clothing" class="jumbo__image"/>
<div class="jumbo__slideshow">
<div class="jumbo__tagline">
<p>What's Your summer colour?</p>
</div>
<a href="#" class="jumbo__slide">
<img class="jumbo__slide-img" v-bind:src="products[0].img">
<p class="jumbo__slide-price">&#163;{{products[0].price}}</p>
</a>
</div>
</div>
<div class="product-slice" v-for="title in categories">
<p class="product-slice__title">{{title.name}}</p>
<div class="product-slice__products">
<div v-for="item in products" v-if="item.category===title.name" class="product-slice__slice">
<a class="product-tile">
<img class="product-tile__img lazyload" :data-src="item.img">
<p class="product-tile__price">&#163;{{item.price}}</p>
</a>
</div>
</div>
<a href="#" class="product-slice__more">See more<font-awesome-icon icon="caret-down" class="side-caret" /></a>
</div>



</div>
</template>







<script>
 
const data = require('../vue-data/data')

export default {

  name: 'Stage',
  data(){ 
  return { categories: data.dataCategories, products: data.dataProducts }
}
}
</script>