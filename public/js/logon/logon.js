const inputElements = document.querySelectorAll('section.logon > .form > .field > input');

if (inputElements){
	inputElements.forEach((input) => {
		input.addEventListener("focus", () => {
			input.parentElement.classList.add("focused");
		});
		
		input.addEventListener("blur", () => {
			if (!input.value) {
				input.parentElement.classList.remove("focused");
			}
		})
	})
}


//Handle login

const formElement = document.querySelector('section.logon > .form')

if (formElement){
	const submitButton =  formElement.querySelector('button')
	
	if(submitButton){
		submitButton.addEventListener('click', event => {
			event.preventDefault()
			
			const username =  formElement.querySelector('.field > input#username')
			const password =  formElement.querySelector('.field > input#password')
			
			const data = {
				username: username.value,
				password: password.value
			}
			
			handleLogin(data)
		})
	}
	
}

const handleLogin = (data) => {
	const {username, password} = data
	const url = '/api/v1/auth/login'
	
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({username: username, password: password}),
	})
	.then(response => {
		if (!response){
			console.log('Network error')
		}
		
		response.json()
		.then(data => {
			if(data.success){
				const date = new Date(Date.now() + (86400 * 1000))
				document.cookie = `x-access-token=${data.accessToken}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
				window.location.replace('/dashboard')
			}
			else {
				console.log('password error')
			}
		})
	})
}
