export const inputField = document.querySelector('.input_modal__content-input');
export const inputOpen = document.querySelector('.top_content__city');
export const inputModal = document.querySelector('.input_modal');
export const inputEnterBtn = document.querySelector('.input_modal__content-container button');
export const inputCloseBtn = document.querySelector('.input_modal__close');
export const favoritesCities = document.querySelector('.input_modal__content-favorite-content');
export const recentCities = document.querySelector('.input_modal__content-recent-content');
export const errorModal = document.querySelector('.error_modal');

export let input;

inputOpen.onclick = openModal;
inputCloseBtn.onclick = closeModal;

function openModal() {
  inputModal.style.display = 'flex';
  setTimeout(() => {
    inputModal.style.opacity = 1;
  }, 0);
}
export function closeModal() {
  inputModal.style.opacity = 0;
  setTimeout(() => {
    inputModal.style.display = 'none';
  }, 300);
  inputField.value = '';
}

inputField.oninput = (e) => {
  input = e.target.value;
};

inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getData(input);
  }
});

inputEnterBtn.addEventListener('click', () => {
  getData(input);
});

// Favorites list and recent list

function addToFavorites(city) {
  const data = JSON.parse(localStorage.getItem('data'));
  if (data.favorites.includes(city)) return;
  if (data.favorites.length >= 5) return showErrorModal('You can save only 5 favorite cities');
  data.favorites.push(city);
  localStorage.setItem('data', JSON.stringify(data));
  generateFavoriteList(data.favorites);
}

window.addToFavorites = addToFavorites;

export function addCityToHistory(city) {
  const data = JSON.parse(localStorage.getItem('data'));
  data.history.unshift(city);
  data.history = [...new Set(data.history)];
  if (data.history.length > 5) data.history = data.history.slice(0, 5);
  localStorage.setItem('data', JSON.stringify(data));
  generateHistoryList(data.history);
}

window.addCityToHistory = addCityToHistory;

function removeFromFavorites(city) {
  const data = JSON.parse(localStorage.getItem('data'));
  data.favorites = data.favorites.filter((c) => c !== city);
  localStorage.setItem('data', JSON.stringify(data));
  generateFavoriteList(data.favorites);
}

window.removeFromFavorites = removeFromFavorites;

export function generateHistoryList(arr) {
  if (arr.length === 0) {
    recentCities.innerHTML = '<li>You have no search history</li>';
    return;
  }
  recentCities.innerHTML = arr
    .map(
      (city) =>
        `<li>
			<div onclick="getData('${city}')">${city} </div>
				<button onclick="addToFavorites('${city}')" >
					<img src="/assets/images/common/star.svg" alt='favorite icon' />	
				</button>
			</li>`
    )
    .join('');
}

export function generateFavoriteList(arr) {
  if (arr.length === 0) {
    favoritesCities.innerHTML = '<li>Add your favorite cities for quick access</li>';
    return;
  }
  favoritesCities.innerHTML = arr
    .map(
      (city) =>
        `<li>
			<div onclick="getData('${city}')">${city}</div> 
			<button onclick="removeFromFavorites('${city}')" >
				<img src="/assets/images/common/delete.svg" alt='favorite icon' />	
			</button>
		</li>`
    )
    .join('');
}

// Error modal

export function showErrorModal(message) {
  errorModal.style.display = 'block';
  errorModal.textContent = message;
  setTimeout(() => (errorModal.style.opacity = 1));
  setTimeout(closeErrorModal, 3000);
}

function closeErrorModal() {
  errorModal.style.opacity = 0;

  setTimeout(() => {
    errorModal.textContent = '';
    errorModal.style.display = 'none';
  }, 300);
}
