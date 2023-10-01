const inputElements = document.querySelectorAll('section.logon > form > .field > input');

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

