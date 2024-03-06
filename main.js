import { initStorage } from './src/store.js';
import { getData } from './src/api';
import './style.css';

async function init() {
  initStorage();
  await getData('bishkek');
}

init();
