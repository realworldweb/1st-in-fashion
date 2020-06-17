<template lang="pug">
<div id="stage" class="stage">
<div id="jumbo" class="jumbo">
<img src="/assets/images/baby-clothing.jpg" alt="fashionable childrens clothing" class="jumbo__image"/>
<div class="jumbo__slideshow">
<div class="jumbo__tagline">
<p>{{tagline}}</p>
</div>

<transition-group name="fade" mode="in-out" tag="a" class="jumbo__slide" href="#" appear>
<img class="jumbo__slide-img" v-bind:src="'https://51.11.139.2:1337'+products[imgid].img.url" :onload="imgslider()" :key="products[imgid].id">

<p class="jumbo__slide-price" :key="imgid">&#163;{{products[imgid].price}}</p>
</transition-group>

</div>
</div>
<div class="product-slice__area">
<div class="product-slice" v-for="title in categories">
<p class="product-slice__title">{{title.category}}</p>
<div class="product-slice__products">
<div v-for="item in title.products.slice(0-3)"  class="product-slice__slice">
<a class="product-tile">
<img class="product-tile__img lazyload" :src="'https://51.11.139.2:1337'+item.img.url">
<p class="product-tile__price">&#163;{{item.price}}</p>
</a>
</div>
</div>
<a href="#" class="product-slice__more">See more<font-awesome-icon icon="caret-down" class="side-caret" /></a>
</div>
</div>


</div>
</template>







<script>



const data = require('../vue-data/data')
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