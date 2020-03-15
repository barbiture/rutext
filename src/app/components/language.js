const langWrapper = document.querySelector('#language');
const langBtn = langWrapper.querySelector('#langButton');
const langList = langWrapper.querySelector('ul');
let lang = [
	{
		lang: 'en', 
		src: 'assets/images/us.svg',
		selected: false
	},
	{
		lang: 'de',
		src: 'assets/images/de.svg',
		selected: false
	},
	{
		lang: 'ru',
		src: 'assets/images/ru.svg',
		selected: true
	}
]
const listTemplate = el => {
	let tmpl = `<li id=${el.lang}>
					<span>${el.lang.toUpperCase()}</span>
					<img src=${el.src} alt="">
				</li>`
	const position = el.lang === 'ru' ? 'afterbegin' : 'beforeend';
	langList.insertAdjacentHTML(position, tmpl);
}
const btnTemplate = el => {
	const img = langBtn.querySelector('img');
	if(img)
		img.src = el.src
	else
		langBtn.insertAdjacentHTML('afterbegin', `<img src=${el.src} alt="" />`);
}
const renderList = arr => {
	arr.forEach(item => {
		if(item.selected) {
			btnTemplate(item);
		} else {
			listTemplate(item)
		}
	})
}
renderList(lang)
document.addEventListener('click', evt => {
	let targetElement = evt.target;
	do {
		if (targetElement == langWrapper) return;
		targetElement = targetElement.parentNode;
	} while (targetElement);
	langList.classList.remove('active');
});

langBtn.addEventListener('click', e => {
	langList.classList.toggle('active');
	handlerSelected();
})

const handlerSelected = () => {
	let selected = null;
	const selectList = langList.querySelectorAll('li');
	selectList.forEach((el, index) => {
		el.addEventListener('click', e => {
			const sort = lang.sort((a, b) => a - b)
			sort.forEach(item => {
				if(item.lang !== el.id) {
					if(item.selected) {
						item.selected = false;
						listTemplate(item)
					}
				} else {
					item.selected = true;
					btnTemplate(item)
					el.remove()
				}
			});
		})
	});
}