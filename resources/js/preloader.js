window.addEventListener('load', function handler(event) {
  window.removeEventListener('load', handler);
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('preloader_hiding');
  setTimeout(() => {
    preloader.classList.remove('preloader_hiding');
    preloader.classList.add('preloader_hidden');
  }, 250);
});