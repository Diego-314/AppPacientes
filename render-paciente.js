const { ipcRenderer } = require('electron');

const name = document.getElementById('pacientName')
const dni = document.getElementById('DNI')
const gender = document.getElementById('gender')
const info = document.getElementById('info')
const age = document.getElementById('age')
const closeBtn = document.getElementById('closeBtn')
const modifyBtn = document.getElementById('modifyBtn')
const email = document.getElementById('email')
const obraSocial = document.getElementById('obraSocial')
const numeroAfiliado = document.getElementById('numeroAfiliado');
const form = document.getElementById('formm')
const removeBtn = document.getElementById('removeBtn');


const ready = () => {
	ipcRenderer.send('cargado', '');
	ipcRenderer.on('cargado:ok', (e, paciente) => {
		name.value = paciente.name;
		dni.value = paciente.dni;
		gender.value = paciente.gender;
		info.value = paciente.info;
		age.value = paciente.age;
		email.value = paciente.email;
		obraSocial.value = paciente.obraSocial;
		numeroAfiliado.value = paciente.numeroAfiliado;
	})
}


form.addEventListener('submit', (e) => {
	e.preventDefault()
})


removeBtn.addEventListener('click', () => {
	let p = JSON.parse(localStorage.getItem('pacientes'));


	for (let i = 0; i < p.length; i++) {
		if (p[i].dni == dni.value || p[i].email == email.value) {
			p.splice(i, 1)



			localStorage.setItem('pacientes', JSON.stringify(p));

			let k = JSON.parse(localStorage.getItem('pacientes'));

			if (k.length == 0) {
				localStorage.setItem('first', 'true')
			}

			let a = {
				width: 800,
				height: 600,
				archivo: 'src/index'
			}


			ipcRenderer.send('CreateWindow', a);
		}



	}
})


closeBtn.addEventListener('click', () => {
	let a = {
		width: 800,
		height: 600,
		archivo: 'src/index'
	}
	ipcRenderer.send('CreateWindow', a);
})


modifyBtn.addEventListener('click', () => {



	let p = JSON.parse(localStorage.getItem('pacientes'));

	

	for (let i = 0; i < p.length; i++) {
		if (p[i].dni == dni.value || p[i].email == email.value || p[i].numeroAfiliado == numeroAfiliado.value) {

			p[i].name = name.value;
			p[i].dni = dni.value
			p[i].gender = gender.value
			p[i].info = info.value
			p[i].age = age.value
			p[i].email = email.value
			p[i].obraSocial = obraSocial.value
			p[i].numeroAfiliado = numeroAfiliado.value

			let r = JSON.stringify(p)
			localStorage.setItem('pacientes', r)

			let a = {
				width: 800,
				height: 600,
				archivo: 'src/index'
			}
			ipcRenderer.send('CreateWindow', a);

		} else {
			let bbbb = {
				title: 'Ha ocurrido un error',
				body: 'Por favor, no modifique el NUMERO DE AFILIADO, DNI, e E-MAIL a la vez'
			}
			ipcRenderer.send('CreateNotification', bbbb)
		}
	}
})


ready()