import { generateFavoriteList, generateHistoryList } from './content/modals.js';

export let weatherGlobalData = {
  weather: [],
  city: '',
  sliderData: {
    'before-before-active': 0,
    'before-active': 1,
    active: 2,
    'after-active': 3,
    'after-after-active': 4,
  },
};

export function initStorage() {
  const store = JSON.parse(localStorage.getItem('data'));
  if (store) {
    generateFavoriteList(store.favorites);
    generateHistoryList(store.history);
  } else {
    localStorage.setItem(
      'data',
      JSON.stringify({
        favorites: [],
        history: [],
      })
    );
  }
}
