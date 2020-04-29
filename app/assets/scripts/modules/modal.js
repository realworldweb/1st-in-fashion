class Modal{
	
	constructor() {
		this.injectHTML()
		this.modal = document.querySelector('.modal')
		this.closeModalIcon = document.querySelector('.modal__close')
		this.newFrame = document.querySelector('.social-icons__icon--btn')
		this.contactFrame
		this.events()
		
		
	}
	
	events(){
		
		
		//listen for close click
		this.closeModalIcon.addEventListener('click', () => this.closeTheModal())
		
		
		
		//presses any key
		document.addEventListener('keyup', e => this.keyPressHandler(e))
		
		
		
		
		
		
	}
	
	
			
	openTheModal(){
		this.modal.classList.add('modal--is-visible')
		
		
		
		
	}
	
	closeTheModal(){
		
		
			
		this.modal.classList.remove('modal--is-visible')
		
		
			
		
	}
	
	keyPressHandler(e){
		if (e.keyCode == 27) {
			
			this.closeTheModal()
		}
		
		
	}
	
	
	injectHTML(){
		
		document.body.insertAdjacentHTML('beforeend', `
		<div class="modal">
    <div class="modal__inner">
	 <h2 class="modal__title"><img src="assets/images/icons/mail.svg" class="section-title__icon"> Get in <strong>Touch</strong></h2>
      <div class="wrapper wrapper--narrow">
        <p class="modal__description"> Feel free to reach out on any of the platforms below</p>
      </div>
     <div class="social-icons">
	    <a href="contact-us.html" class="social-icons__icon"><i class="fas fa-at" alt="email"></i></a>
        <a href="https://www.facebook.com/paulrooneyweb/" class="social-icons__icon"><i class="fab fa-facebook-square" alt="facebook"></i></a>
		<a href="https://www.linkedin.com/in/paul-rooney-6760b0b5/" class="social-icons__icon"><i class="fab fa-linkedin" alt="linkedin"></i></a>
		<a href="https://github.com/realworldweb" class="social-icons__icon"><i class="fab fa-github" alt="github"></i></a>
		<a href="https://www.fiverr.com/paulrooney60?public_mode=true" class="social-icons__icon"><img src="assets/images/icons/fiverr.svg" alt="Fiverr"></a>
        <div class="modal__close">X</div>
    </div>
    </div>`)
		
	}
	
	
	

	
	

}


export default Modal