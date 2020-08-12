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


export default {

  name: 'Faqs',
  data(){ 
  return { faqs: [] }
},
created() {
Axios.get('https://competent-boyd-4461dd.netlify.app/faqs.js', {
 headers: {
   'Access-Control-Allow-Origin' : '*'
	}}).then( response =>{
    this.faqs = response.data})

}





}
</script>


