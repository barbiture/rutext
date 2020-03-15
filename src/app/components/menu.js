const navButton = document.querySelector('.nav-button');
const closeButton = document.querySelector('.close-button');
const navWrapper = document.querySelector('.menu');
[navButton, closeButton].forEach(el => el.addEventListener('click', e => {
	navWrapper.classList.toggle('active');
}))
