<template lang="pug">
<div @load="currentPage">
<div class="modal">
<div class="modal__inner">
<h2 class="modal__title"><font-awesome-icon icon="envelope-open-text" />&nbsp;Get in <strong>Touch</strong></h2>
<p class="modal__description">We love to hear from all our customers. If you have any questions feel free to reach out to us any of the platforms below</p>
</div>
</div>
<div class="modal__stage">
<div class="modal__links">
<div class="modal__link-container" :class="firstTabIsActive"><router-link :to="contactNav" class="modal__link"><font-awesome-icon icon="envelope-open-text" class="modal__link-icon"  /><span class="modal__link-text">Contact us</span></router-link></div>
<div class="modal__link-container" :class="secondTabIsActive"><router-link :to="faqsNav" class="modal__link"><font-awesome-icon :icon="['far', 'question-circle']" class="modal__link-icon" /><span class="modal__link-text">F.A.Q's</span></router-link></div>
<div class="modal__link-container" :class="thirdTabIsActive"><router-link :to="termsNav" class="modal__link"><font-awesome-icon :icon="['far', 'list-alt']" class="modal__link-icon" /><span class="modal__link-text">T&C'S</span></router-link></div>
</div>
<router-view></router-view>
</div>





</div>
</template>

<script>


export default {

  name: 'Contact',
  data(){ 
  return { contactNav: "/info", faqsNav: "/info/FAQs", termsNav: "/info/Terms", firstTabIsActive: [], secondTabIsActive: [], thirdTabIsActive: []  }
},
computed:{



currentPage (){


if(this.$route.path === '/info' || this.$route.path === '/info/contact'){

this.secondTabIsActive = []
this.thirdTabIsActive  = []
this.firstTabIsActive.push('first-tab')

return this.$route.path

}else if(this.$route.path === '/info/FAQs') {

this.firstTabIsActive = []
this.thirdTabIsActive  = []
this.secondTabIsActive.push('first-tab')

return this.$route.path

}else{ 
this.firstTabIsActive = []
this.secondTabIsActive  = []
this.thirdTabIsActive.push('last-tab')

return this.$route.path

}

}


}



}
</script>