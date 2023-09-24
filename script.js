const API_LINK = 'http://vps-11f3b0bf.vps.ovh.net:1337/api/offers?populate=image';
const container = document.querySelector('.container');
const adTemp = document.querySelector('.ad-temp');
const radioButtons = document.querySelectorAll('.category-inputs');
const allVehicleShowBtn = document.querySelector('#allVehicle');

const addsStrapiApi = () => {
	fetch(API_LINK)
		.then(res => res.json())
		.then(data => {
			for (let i = 0; i < data.data.length; i++) {
				const pathToData = data.data[i].attributes;
				const adBox = adTemp.content.cloneNode(true);

				const originalDate = new Date(pathToData.publishedAt);
				const day = originalDate.getDate();
				const month = originalDate.getMonth() + 1;
				const year = originalDate.getFullYear();
				const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

				adBox.querySelector('.name').textContent = pathToData.name;
				adBox
					.querySelector('.img')
					.setAttribute(
						'src',
						`http://vps-11f3b0bf.vps.ovh.net:1337${pathToData.image.data[0].attributes.formats.small.url}`
					);
				adBox.querySelector('.pulished-info').textContent = `Opublikowano ${formattedDate}`;
				adBox.querySelector('.price').textContent = `${pathToData.price}zł`;
				adBox.querySelector('.ad-box').dataset.category = pathToData.typeOfVehicle;

				container.appendChild(adBox);
			}
		});
};

addsStrapiApi();

const selectCategory = e => {
	const allAdds = document.getElementsByClassName('ad-box');
	const allAddsArray = Array.from(allAdds);
	const currentRadio = e.target.id;
	const categoryItems = allAddsArray.filter(categoryItem => categoryItem.attributes[1].value.includes(currentRadio));

	allAddsArray.forEach(add => (add.style.display = 'none'));
	categoryItems.forEach(categoryItem => (categoryItem.style.display = 'block'));

	allVehicleShowBtn.addEventListener('click', () => {
		allAddsArray.forEach(add2 => (add2.style.display = 'block'));
		console.log(allAddsArray);
	});
};

radioButtons.forEach(radio => radio.addEventListener('change', selectCategory));
