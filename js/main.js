let bottomMenu = document.getElementById('bottom-menu')
let contenido = document.getElementById('contenido')
let cabezera = document.getElementById('header')
let menu = document.getElementById('menu')
let altura = cabezera.offsetHeight



window.addEventListener('scroll', () => {

	console.log(screen.width);
	// solo se usa cuando es una resolucion menor a 1024
	if (screen.width < 1024) {

		//Cambiar diseño a header pequeño con el menu formateado:
		if (window.pageYOffset >= altura) {
			menu.classList.remove('menu', 'ocultar__menu', 'mostrar__menu')
			cabezera.classList.add('fixed')
			contenido.classList.add('contenido')
			contenido.style.marginTop =  `${altura}px`
			menu.classList.add('ocultar__menu')
		}

		// Motrar menu en el header grande:
		else {
			cabezera.classList.remove('fixed')
			menu.classList.add('ocultar__menu')
			menu.classList.remove('menu', 'ocultar__menu', 'mostrar__menu')
			contenido.style.marginTop =  '0px'
		}
	}
	else {
		cabezera.classList.remove('fixed')
		menu.classList.remove('menu', 'ocultar__menu', 'mostrar__menu')
		contenido.style.marginTop =  '0px'
	}
})

// Abre y cierra menu cuando esta en movil:
bottomMenu.addEventListener('click', () => {
	menu.classList.toggle('menu')
	menu.classList.toggle('mostrar__menu')
	menu.classList.toggle('ocultar__menu')
	menu.classList.replace('ocultar__menu', 'menu')
})
