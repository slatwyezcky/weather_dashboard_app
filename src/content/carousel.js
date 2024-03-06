import { weatherGlobalData } from '../store';
import { DAYS, ICONS } from '../utilities/constants';
import { createDiagram } from './createDiagram';
import { carouselData, carouselLeftBtn, carouselRightBtn } from './domElements';
import { fillTextContent } from './fillTextContent';
import { showErrorModal } from './modals';

let carouselItems;

export function createCarousel() {
  const list = weatherGlobalData.weather
    .filter((_, idx) => idx % 8 === 0)
    .map((el) => ({
      day: new Date(el.time_text).getDay(),
      icon: el.icon,
    }));
  const result = [
    { day: list[0].day > 1 ? list[0].day - 2 : 6, icon: '02' },
    { day: list[0].day > 0 ? list[0].day - 1 : 6, icon: '02' },
    ...list,
    { day: list.at(-1).day < 6 ? list.at(-1).day + 1 : 0, icon: '02' },
    { day: list.at(-1).day < 5 ? list.at(-1).day + 2 : 0, icon: '02' },
  ];

  const html = result
    .map((el, idx) => {
      return `
		  <div data-id='${idx}' class="bottom_content__weather-carousel_item">
			  <p> ${DAYS[el.day]}</p>
			  <img src="${ICONS[el.icon]}" alt='weather icon' />
		  </div>
		`;
    })
    .join('');
  carouselData.innerHTML = html;
  carouselItems = document.querySelectorAll('.bottom_content__weather-carousel_item');
  for (const [key, val] of Object.entries(weatherGlobalData.sliderData)) {
    carouselItems[val].className = `bottom_content__weather-carousel_item ${key}`;
  }
}

function leftBtnClickHandler() {
  if (weatherGlobalData.sliderData.active === 2) return showErrorModal('Previous day forecast is unavailable');
  carouselItems.forEach((el) => (el.className = 'bottom_content__weather-carousel_item'));
  for (const key of Object.keys(weatherGlobalData.sliderData)) {
    weatherGlobalData.sliderData[key]--;
  }
  for (const [key, val] of Object.entries(weatherGlobalData.sliderData)) {
    carouselItems[val].className = `bottom_content__weather-carousel_item ${key}`;
  }
  carouselData.style.left = `${-(weatherGlobalData.sliderData.active - 2) * 16}%`;
  fillTextContent(weatherGlobalData.weather[(weatherGlobalData.sliderData.active - 2) * 8]);
  createDiagram();
}

function rightBtnClickHandler() {
  if (weatherGlobalData.sliderData.active === 6) return showErrorModal('Next forecast is unavailable');
  carouselLeftBtn.disabled = false;
  carouselItems.forEach((el) => (el.className = 'bottom_content__weather-carousel_item'));
  for (const key of Object.keys(weatherGlobalData.sliderData)) {
    weatherGlobalData.sliderData[key] = weatherGlobalData.sliderData[key] + 1;
  }
  for (const [key, val] of Object.entries(weatherGlobalData.sliderData)) {
    carouselItems[val].className = `bottom_content__weather-carousel_item ${key}`;
  }
  carouselData.style.left = `${-(weatherGlobalData.sliderData.active - 2) * 16}%`;
  fillTextContent(weatherGlobalData.weather[(weatherGlobalData.sliderData.active - 2) * 8]);
  createDiagram();
}

carouselLeftBtn.onclick = leftBtnClickHandler;
carouselRightBtn.onclick = rightBtnClickHandler;
