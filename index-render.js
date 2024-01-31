// Node elements

const { ipcRenderer } = require('electron');



// DOM Elements

const form = document.getElementById('formm');
const newPacientBtn = document.getElementById('newPacient');
const datalistPacient = document.getElementById('pacientList')
const pacientName = document.getElementById('pacientName')



// functions

let pacients;


const pacientList = () => {

	let lenght = localStorage.length;
	
	let pacientes = JSON.parse(localStorage.getItem('pacientes'));

	let a;


	a = pacientes.map((pacientes) => {
		return `

		<option>
			${pacientes.name} || DNI: ${pacientes.dni}
		</options>

		`
	}).join(' ')

	datalistPacient.innerHTML = a;


}


const ready = () => {

	if (localStorage.getItem('first') == 'false') {
		pacientList();
	}

	if (localStorage.getItem('pacientes') == null) {
		
		localStorage.setItem('first', 'true');
	}

};


// Events

newPacientBtn.addEventListener('click', () => {
	let arrr = {
		width: 600,
		height: 800,
		archivo: './src/newPacient'
	}
	ipcRenderer.send("CreateWindow", arrr);
})

formm.addEventListener('submit', (e) => {
	e.preventDefault();	

	let p = JSON.parse(localStorage.getItem('pacientes'));

	let a = pacientName.value;

	let b = a.split(' || DNI: ');

	for (let i = 0; i < p.length; i++) {
		if (p[i].name == b[0] && p[i].dni == b[1]) {
			ipcRenderer.send('cargarPaciente', p[i])
		}
	}




});


ready()


ipcRenderer.on('console', (e, msj) => {
	console.log(msj)
})
