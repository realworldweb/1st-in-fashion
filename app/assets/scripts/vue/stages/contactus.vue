<template lang="pug">
<div class="contact-us">
<h1 class="contact-us__title">Contact us</h1>
<div class="contact-us__body">
<div class="float-container">
<div class="contact-us__social-section">
<a :href="contactInfo[0].facebook" class="social-icons"><font-awesome-icon :icon="['fab', 'facebook-square']"/></a>
<a :href="contactInfo[0].whatsapp" class="social-icons"><font-awesome-icon :icon="['fab', 'whatsapp']"  /></a>
</div>
<div class="contact-us__info-section">
<div class="contact-us__info-container"><p class="contact-us__info contact-us__info--phone"><span class="contact-us__info-label">Tel:</span>{{contactInfo[0].phone}}</p>
<p class="contact-us__info contact-us__info--email"><span class="contact-us__info-label">E-mail:</span>{{contactInfo[0].mainEmail}}</p>
</div>
</div>
</div>
<h2 class="contact-us__section-title">Direct Mail</h2>
<div id="formstage">
<form id="contact-us" class="contact-us__form" @submit.prevent="compileform">
<div class="contact-us__inline-items">
<label class=" contact-us__label contact-us__label--inline" for="nameinput">Name:</label>
<input id="nameinput" class="contact-us__input contact-us__input--2-wide" type="text" name="name" placeholder="Please enter name" required>
<label class="contact-us__label contact-us__label--inline contact-us__label--inline--left" for="phoneinput">Phone number:</label>
<input id="phoneinput" type="number" name="phone" placeholder="Please enter phone number" v-model="phoneContact" @blur="validatePhone" class="contact-us__input contact-us__input--2-wide contact-us__input--2-wide--left "  :class="phoneError">
<p :class="phoneErrorMsg">{{ phoneMsg }}</p>
</div>
<label class="contact-us__label" for="emailinput">Email:</label>
<input id="emailinput" type="text" name="email" placeholder="Please enter email address" class="contact-us__input" v-model="emailContact" :class="emailError">
<p :class="emailErrorMsg">{{ emailMsg }}</p>
<label class="contact-us__label" for="subjectinput">Subject:</label>
<input id="subjectinput" type="text" name="subject" placeholder="Please enter reason for contact" class="contact-us__input" @focus="validate" required>
<label class="contact-us__label" for="bodyinput">Body:</label>
<textarea id="bodyinput" name="body" placeholder="write what you would like to say here..." class="contact-us__input contact-us__input--text" required>
</textarea>
<input type="submit" name="submit" value="submit" class="contact-us__input contact-us__input--submit btn">


</form>
</div>
</div>
</div>
</template>

<script>

let valid
let postInfo = {}
let postJson

export default {

  name: 'ContactUs',
  data(){ 
  return {emailContact: "", phoneContact: "", emailError: [], phoneError: [], phoneErrorMsg: ['display-none'], emailErrorMsg: ['display-none'], phoneMsg: "", emailMsg: "", contactInfo: [] }
},
created() {
this.$http.get('https://competent-boyd-4461dd.netlify.app/contact.js', {
 headers: {
   'Access-Control-Allow-Origin' : '*'
	}}).then( response =>{
    this.contactInfo = response.data})
},
methods: {

validatePhone(){


if(this.phoneContact.length === 11 || this.emailContact !== ""){

this.phoneError = []
this.phoneMsg = ""
this.phoneErrorMsg = []
this.phoneErrorMsg.push('display-none')

return valid = true
}else{



this.phoneError.push('error')
this.phoneErrorMsg = []
this.phoneErrorMsg.push('invalid-number')
this.phoneMsg = "please enter a valid phone number or enter your email below"

return valid = false

}

},

validate(){

if(this.phoneContact === "" && this.emailContact === ""){
this.phoneError.push('error')
this.phoneErrorMsg = []
this.phoneErrorMsg.push('invalid-number')
this.phoneMsg = "please enter email or phone"
this.emailError.push('error')
this.emailErrorMsg = []
this.emailErrorMsg.push('invalid-number')
this.emailMsg = "please enter email or phone"

return valid = false

}
else

this.phoneError = []
this.phoneMsg = ""
this.phoneErrorMsg = []
this.phoneErrorMsg.push('display-none')
this.emailError = []
this.emailMsg = ""
this.emailErrorMsg = []
this.emailErrorMsg.push('display-none')

return valid = true


},
compileform(e){
   const stage = document.getElementById('formstage')
   const formEl = document.querySelectorAll('.contact-us__input')

    let count = 0
	formEl.forEach( () => {
    let el = formEl[count]
	let name = el.getAttribute('name')
	let nameValue = el.value
	postInfo[name] = nameValue
	count++
	
	})
	
	if(valid === true){
		
		postJson = JSON.stringify(postInfo)
		this.sendrequest()
	    stage.innerHTML =`<img class='contact-us__loading' src="/assets/images/loading.gif" alt="please wait sending email.">`
				
	}else{
		this.warning.innerHTML = 'Please check your phone or email'
	}
},
sendrequest(){
	console.log(postJson)
	this.$http.post('/.netlify/functions/send-email', postJson ).then(() => {
   this.success()
    }).catch( console.log('something went wrong'))
	
	
},
	success(){
	const  stage = document.getElementById('formstage')
	stage.innerHTML = `<h3 class="contact-us__confirmed-title">Email Sent</h3>
	                   <p class="contact-us__confirmed-text">Thank you for getting in touch we have got you email And will be in touch shortly to answer your enquiry.</p>
	                   <p class="contact-us__confirmed-text contact-us__confirmed-text--bottom">In the mean time you might find the anwsers you are looking for in our terms or FAQS sections</p>`
	}

	
	

	


}



}
</script>