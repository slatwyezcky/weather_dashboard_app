import {
  cityField,
  dateField,
  descriptionField,
  rainPossibilityField,
  realFeelField,
  temperatureField,
  timeField,
  uvIndexField,
  weatherIcon,
  windSpeedField,
} from './domElements';
import { weatherGlobalData } from '../store';
import { ICONS } from '../utilities/constants';
import { addCityToHistory } from './modals';

export function fillTextContent(element) {
  const { icon, description, temp, date, feels_like, wind } = element;
  const name = weatherGlobalData.city;
  weatherIcon.src = ICONS[icon];
  cityField.textContent = name;
  descriptionField.textContent = description;
  temperatureField.textContent = temp + '°C';
  const day = date.toUTCString().slice(0, 3);
  const textDate = date.toUTCString().slice(5, 16);
  dateField.textContent = `${day} | ${textDate}`;
  realFeelField.textContent = feels_like + '°';
  windSpeedField.textContent = wind + 'km/hr';
  rainPossibilityField.textContent = Math.floor(Math.random() * 25) + '%';
  uvIndexField.textContent = Math.floor(Math.random() * 5) + 1;
  timeField.textContent = date.toTimeString().startsWith('0')
    ? date.toTimeString().slice(1, 5) + ' ' + date.toTimeString().slice(9, 15)
    : date.toTimeString().slice(0, 5) + ' ' + date.toTimeString().slice(9, 15);
  addCityToHistory(name);
}
