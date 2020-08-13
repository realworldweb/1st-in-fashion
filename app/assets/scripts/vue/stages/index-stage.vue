<template lang="pug">
<div id="stage" class="stage">
<div id="jumbo" class="jumbo">
<picture>
<source srcset="/assets/images/baby-clothing.webp 1300w" media="(min-width: 800px)">
<img srcset="/assets/images/baby-clothing--small.webp 500w" alt="fashionable childrens clothing" class="jumbo__image">
</picture>
<div class="jumbo__slideshow">
<div class="jumbo__tagline">
<p>{{tagline}}</p>
</div>
<transition-group name="fade" mode="in-out" tag="div" class="jumbo__slide"  appear>
<router-link tag="a" name="products[imgid].id+' kids clothing'" :to="'/product/'+products[imgid].id" :key="products[imgid].id+'router'">
<img class="jumbo__slide-img" v-bind:src="'./assets/images'+products[imgid].img.url" :onload="imgslider()" :key="products[imgid].id" alt="products[imgid].img.alt">
</router-link>
<p class="jumbo__slide-price" :key="imgid">&#163;{{products[imgid].price}}</p>
</transition-group>

</div>
</div>
<div class="product-slice__area">
<div class="product-slice" v-for="title in categories">
<p class="product-slice__title">{{title.category}}</p>
<div class="product-slice__products">
<div v-for="item in title.products.slice(0-3)"  class="product-slice__slice">
<router-link tag="a" :to="'/product/'+item.id" class="product-tile">
<img class="product-tile__img" :src="'./assets/images'+item.img.url" :alt="item.img.alt">
<p class="product-tile__price">&#163;{{item.price}}</p>
</router-link>
</div>
</div>
<router-link tag="a" :to="'category/' + title.category" class="product-slice__more">See more<font-awesome-icon icon="caret-down" class="side-caret" /></router-link>
</div>
</div>


</div>
</template>







<script>




let slide
let count = 0

export default {

  name: 'Stage',
  data(){ 
  return { show: true, imgid: 0}
},
props: ['products', 'categories'],
methods: {
imgslider() {
if(count === 0){
slide = setInterval(this.slider, 10000)
count = 1
}

},
slider(){

if(this.imgid === 2){

return this.imgid = 0

}else{

return ++this.imgid  

}
 }
 
 },
beforeDestroy(){
clearInterval(slide)
},
computed:{
tagline: function(){
let date = new Date()
let month = date.getMonth()
let summer = "Whats your summer color?"
let winter = "Cure those winter blues!"
if( month <=8 && month >=2 ) {

return summer
}
else{

return winter

}
}
}
}
</script>