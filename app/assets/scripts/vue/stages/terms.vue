<template lang="pug">
<div class="terms">
<h1 class="terms__title">Terms and conditions</h1>

<ol class="terms__body">

<li class="terms__bullet" v-for="terms in terms"><span class="terms__content">{{ terms.term }}</span></li>

</ol>
</div>
</template>

<script>
const data = require('../vue-data/contactdata')

export default {

  name: 'ContactUs',
  data(){ 
  return { terms: data.dataTerms }
}




}
</script>


