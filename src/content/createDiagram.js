import { weatherGlobalData } from '../store';
import { ICONS } from '../utilities/constants';
import { forecastChart, forecastData } from './domElements';

export function createDiagram() {
  const activeDay = weatherGlobalData.sliderData.active - 2;
  const data = weatherGlobalData.weather.slice(activeDay, activeDay + 8);
  const highestTemp = Math.max(...data.map((el) => el.temp));
  const lowestTemp = Math.min(...data.map((el) => el.temp));
  const delta = highestTemp - lowestTemp;
  const graphWidth = document.querySelector('.bottom_content__forecast-chart').clientWidth;
  const graphHeight = document.querySelector('.bottom_content__forecast-chart').clientHeight;
  const sectorWidth = graphWidth / 7;
  const deltaMultiplier = (graphHeight - 80) / delta;
  forecastData.innerHTML = '';
  const result = data
    .map((el, idx, arr) => {
      if (idx !== 0 && idx !== arr.length - 1) {
        const point = document.createElement('div');
        point.className = 'bottom_content__forecast-point';
        point.style.top = `calc(${30}px + ${30 + (highestTemp - el.temp) * deltaMultiplier}px)`;
        point.style.left = `${idx * sectorWidth}px`;
        point.style.transform = 'translateX(-50%)';
        point.innerHTML = `
				<div class="bottom_content__forecast__point-line">
				<div class="bottom_content__forecast__point-circle"></div>
			  </div>
			  <div class="bottom_content__forecast__point-info">
				<img src="${ICONS[el.icon]}" alt="weather icon" />
				<p>${el.wind}km/h</p>
				<p>${idx === 2 ? 'Now' : el.time_text}</p>
			  </div>
				`;
        forecastData.appendChild(point);
      }

      if (idx === 0) {
        return `M ${idx * sectorWidth} ${30 + (highestTemp - el.temp) * deltaMultiplier}`;
      }
      return `L ${idx * sectorWidth} ${30 + (highestTemp - el.temp) * deltaMultiplier}`;
    })
    .join(' ');
  forecastChart.setAttribute('d', result);
}

window.addEventListener('resize', createDiagram);
