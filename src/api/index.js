import { createCarousel } from '../content/carousel.js';
import { createDiagram } from '../content/createDiagram.js';
import { fillTextContent } from '../content/fillTextContent.js';
import { closeModal, showErrorModal } from '../content/modals.js';
import { weatherGlobalData } from '../store.js';
import { API_KEY } from '../utilities/constants.js';
import { startLoading, stopLoading } from '../utilities/loading.js';

export async function getCoordinatesByCityName(city) {
  try {
    if (!city) throw new Error('You should provide city for search');
    const coordinates = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city.toLowerCase()}&appid=${API_KEY}`
    );
    const data = await coordinates.json();
    if (Array.isArray(data) && !data.length) throw new Error('The city name is incorrect');
    if (data.cod === '400') throw new Error(data.message);
    const { lat, lon } = data[0];
    return { lat, lon };
  } catch (error) {
    showErrorModal('Can not retrieve data from server');
  }
}

export async function getForecastByCoordinates(lat, lon) {
  try {
    const hourlyForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const { list, city } = await hourlyForecast.json();
    weatherGlobalData.weather = list.map((el) => ({
      temp: el.main.temp,
      date: new Date(el.dt * 1000),
      time_text: el.dt_txt,
      feels_like: el.main.feels_like,
      wind: el.wind.speed,
      icon: el.weather[0].icon.slice(0, -1),
      description: el.weather[0].main,
    }));
    weatherGlobalData.city = city.name;
    weatherGlobalData.sliderData = {
      'before-before-active': 0,
      'before-active': 1,
      active: 2,
      'after-active': 3,
      'after-after-active': 4,
    };
  } catch (error) {
    showErrorModal('Can not retrieve data from server');
  }
}

export async function getData(city) {
  try {
    const { lat, lon } = await getCoordinatesByCityName(city);
    closeModal();
    startLoading();
    await getForecastByCoordinates(lat, lon);
    fillTextContent(weatherGlobalData.weather[0]);
    createDiagram();
    createCarousel();
    stopLoading();
  } catch (error) {
    showErrorModal('Can not retrieve data from server');
  }
}

window.getData = getData;
