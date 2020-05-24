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
<img class="product-tile__img" :src="item.img">
<p class="product-tile__price">&#163;{{item.price}}</p>
</a>
</div>
</div>
<a href="#" class="product-slice__more">See more<font-awesome-icon icon="caret-down" class="side-caret" /></a>
</div>



</div>
</template>







<script>
let dataCategories = [ {
"name": "Baby",
"subcategory": [ "Baby boy's", "baby girl's"]
},
{
"name": "Boys",
"subcategory": [ "casual", "formal"]
},
{
"name": "Girls",
"subcategory": [ "casual", "formal"]
}]

let dataProducts = [
{
"name": "Boys-shorts",
"category": "Baby",
"subcategory": "casual",
"img": "/assets/images/boys-short-set.jpg", 
"price": 9.99},
{
"name": "girl's-dress",
"category": "Baby",
"subcategory": "casual",
"img": "/assets/images/polka-dot.jpg",
price: 14.99
},
{
"name": "girls-sailor",
"category": "Baby",
"subcategory": "casual",
"img": "/assets/images/girls-sailor.jpg", 
"price": 9.99},
{
"name": "girls-sailor",
"category": "Baby",
"subcategory": "casual",
"img": "/assets/images/girls-sailor.jpg", 
"price": 9.99},
{
"name": "girl's-shorts",
"category": "Girls",
"subcategory": "casual",
"img": "/assets/images/boys-short-set.jpg",
"price": 9.99
},
{
"name": "Boys-shorts",
"category": "Boys",
"subcategory": "casual",
"img": "/assets/images/boys-short-set.jpg", 
"price": 9.99},
{
"name": "girl's-shorts",
"category": "Girls",
"subcategory": "casual",
"img": "/assets/images/boys-short-set.jpg",
"price": 9.99
},
{
"name": "Boys-shorts",
"category": "Boys",
"subcategory": "casual",
"img": "/assets/images/boys-short-set.jpg", 
"price": 9.99},
{
"name": "girl's-shorts",
"category": "Girls",
"subcategory": "casual",
"img": "/assets/images/boys-short-set.jpg",
"price": 9.99
},
{
"name": "Boys-shorts",
"category": "Boys",
"subcategory": "casual",
"img": "/assets/images/boys-short-set.jpg", 
"price": 9.99},
]

export default {

  name: 'Stage',
  data(){ 
  return {categories: dataCategories, products: dataProducts}
}
}
</script>