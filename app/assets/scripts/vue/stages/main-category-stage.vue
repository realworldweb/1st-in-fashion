<template lang="pug">
<div id="stage" class="stage">
<div class="product-slice__area product-slice__area--whole-page">
<div class="product-slice" v-for="item in subcategories" v-if=" item.subCategory.includes('baby') && $route.params.id === 'baby' || item.subCategory.includes($route.params.id) && $route.params.id!=='baby' && !item.subCategory.includes('baby') ">
<p class="product-slice__title">{{item.subCategory}}</p>
<div class="product-slice__products">
<div v-for="product in item.products"  class="product-slice__slice">
<a class="product-tile">
<img class="product-tile__img lazyload" :src="'https://1stinfashiondata.co.uk:1337'+product.img.url">
<p class="product-tile__price">&#163;{{product.price}}</p>
</a>
</div>
</div>
<a href="#" class="product-slice__more">See more<font-awesome-icon icon="caret-down" class="side-caret" /></a>
</div>


</div>
</div>
</template>







<script>




export default {

  name: 'Category',
  data() { return {}},
  props: ['products', 'categories', 'subcategories']
  
  }

</script>