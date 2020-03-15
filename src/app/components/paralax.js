const parallaxElement = document.querySelectorAll('.parallax-container');
const boottom = document.querySelector('.bottom')

const parallax = function(img) {
	const speed = 3;
	let pos = '-' + (window.pageYOffset / speed) + "px";
	img.style.backgroundPosition = `center ${ pos }`;
}

window.addEventListener('scroll', function(e) {
	parallaxElement.forEach(img => {
		parallax(img)
	})
});