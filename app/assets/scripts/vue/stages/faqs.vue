<template lang="pug">
<div class="faqs">
<h1 class="faqs__title">F.A.Q'S</h1>
<div class="faqs__body">
<div v-for="faq in faqs">
<p class="faqs__question">{{ faq.question }}</p>
<p class="faqs__answer">{{ faq.answer }}</p>
</div>
</div>
</div>
</template>

<script>
const data = require('../vue-data/data')

export default {

  name: 'Faqs',
  data(){ 
  return { categories: data.dataCategories, products: data.dataProducts, faqs: data.dataFaqs }
}



}
</script>


