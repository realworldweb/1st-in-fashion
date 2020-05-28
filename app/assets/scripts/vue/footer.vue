<template lang="pug">
<div id="footer" class="site-footer">
<div class="wrapper"><p><span class="site-footer__text">Copyright &copy; 2019 Realworld Web. All rights reserved.</span> <a href="#" class="btn btn--white open-modal">Get in Touch</a></p></div>
</div>
</template>

<script>

const data = require('./vue-data/data')

export default {

  name: 'Sitefooter',
   data(){ 
  return { categories: data.dataCategories, products: data.dataProducts  }
}
}
</script>