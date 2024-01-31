const { ipcRenderer } = require('electron')






const ready = () => 
{
	let a = JSON.parse(localStorage.getItem('user'));
	console.log(a)
	if (a) 
	{
		let r = {
			width: 400,
			height: 248,
			archivo: 'src/login'
		}
		ipcRenderer.send('CreateWindow', r)
	};
}


const form = document.getElementById('formm')
const pass = document.getElementById('password')
const usertag = document.getElementById('usertag')



form.addEventListener('submit', (e) => {
	e.preventDefault()

	let user = {
		usertag: usertag.value,
		password: pass.value
	}

	user = JSON.stringify(user)

	localStorage.setItem('user', user)

	let v = {
		width: 400,
		height: 248,
		archivo: 'src/login'
	}

	ipcRenderer.send('CreateWindow', v)

})

ready()