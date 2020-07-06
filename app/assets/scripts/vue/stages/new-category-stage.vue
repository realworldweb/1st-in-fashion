<template lang="pug">
<div id="stage" class="stage">
<div class="product-pane" v-for="item in categories" v-if="item.category === $route.params.id">
<p class="product-pane__title">{{$route.params.id}}</p>
<div class="product-pane__products">
<router-link tag="a" class="product-tile" :key="product.id" v-for="product in item.products" :to="'/product/'+product.id">
<img class="product-tile__img lazyload" :src="'./assets/images'+product.img.url">
<p class="product-tile__price">&#163;{{product.price}}</p>
</router-link>
</div>
</div>



</div>
</template>







<script>




export default {

  name: 'SubCategory',
  data() { return {  }},
  props: ['products', 'categories', 'subcategories'],
 }

</script>
