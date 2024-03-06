const loaderElements = document.querySelectorAll('.loader');
const textLoaderElements = document.querySelectorAll('.text-loader');
const loaderChildNodes = document.querySelectorAll('.loader *');

export const startLoading = () => {
  loaderElements.forEach((el) => {
    el.classList.add('loading');
  });
  loaderChildNodes.forEach((el) => {
    el.style.opacity = 0;
  });
  textLoaderElements.forEach((el) => {
    el.classList.add('text-loading');
  });
};

export const stopLoading = () => {
  loaderElements.forEach((el) => {
    el.classList.remove('loading');
  });
  loaderChildNodes.forEach((el) => {
    el.style.opacity = 1;
  });
  textLoaderElements.forEach((el) => {
    el.classList.remove('text-loading');
  });
};
