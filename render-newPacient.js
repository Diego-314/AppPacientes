const { ipcRenderer } = require('electron');

const name = document.getElementById('pacientName')
const dni = document.getElementById('DNI')
const gender = document.getElementById('gender')
const info = document.getElementById('info')
const age = document.getElementById('age')
const btn = document.getElementById('btn')
const email = document.getElementById('email')
const obraSocial = document.getElementById('obraSocial')
const numeroAfiliado = document.getElementById('numeroAfiliado');
const form = document.getElementById('formm')
const closeBtn = document.getElementById('closeBtn');

form.addEventListener('submit', (e) =>{

	e.preventDefault()

})

const buttons = document.querySelector('.btn-primary');

buttons.addEventListener('click', (e) => {
	console.log(e.target.id)
	if (e.target.id == 'btn') 
		{

	if (localStorage.getItem('first') == 'false') {
		let a = localStorage.getItem('pacientes')
		let b = a.split(']')

		let ñ = JSON.stringify(info.value);

		

		

		let r = `${b} {"name":"${name.value}","dni": "${dni.value}","gender":"${gender.value}","info": ${ñ} ,"age":"${age.value}","email":"${email.value}","obraSocial":"${obraSocial.value}", "numeroAfiliado":"${numeroAfiliado.value}"}]`

		

		

		localStorage.setItem('pacientes', r)
		

	}

	if (localStorage.getItem('first') == 'true') {
		let pacientes = [
			{
				name: name.value,
				dni: dni.value,
				gender: gender.value,
				info: info.value,
				age: age.value,
				email: email.value,
				obraSocial: obraSocial.value,
				numeroAfiliado: numeroAfiliado.value
			}
		]

		let a = JSON.stringify(pacientes);

		localStorage.setItem('pacientes', a)
		localStorage.setItem('first', 'false')


	}

	const z = {
		width: 800,
		height: 600,
		archivo: 'src/index'
	}

	ipcRenderer.send('CreateWindow', z)

		};
	if (e.target.id == 'closeBtn') 
		{
			let rrrr = {
				width: 1000,
				height: 800,
				archivo: 'src/index'
			}
			ipcRenderer.send('CreateWindow', rrrr)
		};
})


