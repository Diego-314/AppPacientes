

const btn = document.getElementById('btn')
const formm = document.getElementById('formm')
const user = document.getElementById('user')
const password = document.getElementById('password')

 
const { ipcRenderer } = require('electron');








formm.addEventListener('submit', (e) => {
	e.preventDefault();

	let m = JSON.parse(localStorage.getItem('user'));
	

	const newUser = {
		user: user.value,
		password: password.value,
		usertag: m.usertag,
		pass: m.password
	}

	let h;

	if (newUser.user == newUser.usertag && newUser.password == newUser.pass) {
		h = true;
		ipcRenderer.send("login", h);
	} else {
		user.setAttribute('class', 'form-control is-invalid')
		password.setAttribute('class', 'form-control is-invalid')
	}




	



});