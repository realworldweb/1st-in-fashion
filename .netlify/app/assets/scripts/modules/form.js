class ContactUs{
	constructor(){
		this.formEl = document.querySelectorAll('.contact-us__input')
		this.phone = document.getElementById('phoneinput')
		this.email = document.getElementById('emailinput')
		this.sub = document.getElementById('subjectinput')
		this.warning = document.querySelector('.contact-us__warning')
		this.run = document.getElementById('contact-us')
		this.events()
			
	}



events(){
	this.sub.addEventListener('blur', () => this.validate())
    this.run.addEventListener('submit', e => {
	  e.preventDefault()
      this.compileForm()
    })
}

validate(){
if(this.phone.value === "" && this.email.value === ""){
		
			this.warning.innerHTML = 'Please enter either an email or phone number'
			this.warning.classList.remove('contact-us__warning')
		}
		else if(this.phone.value.length < 11 && this.email.value === ""){
			
			this.warning.innerHTML = 'Please enter a valid phone number'
			this.warning.classList.remove('contact-us__warning')
		}
		else {
			
			
				contactMade = 'made'
			
		}	
	
	
	
	
	
}


compileForm(){
	
	let count = 0;
	this.formEl.forEach( () => {
    this.el = this.formEl[count]
	let name = this.el.getAttribute('name')
	this.name = this.el.value
	console.log(this.name);
	count++
	
	})
	
	if(contactMade === 'made'){
		
		console.log('form ready to submit')
		
	}else{
		this.warning.innerHTML = 'Please check your phone or email'
	}

}
	


}


let contactMade

export default ContactUs;