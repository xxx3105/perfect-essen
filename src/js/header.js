import apiTastyTreats from './api.js';

////////////////////////BACKDROP FUNCTIONS//////////////

const backdrop = document.querySelector('.modal-order-backdrop');

export function backdropActivation() {
  backdrop.style.display = 'inline';
}

export function backdropDeactivation() {
  backdrop.style.display = 'none';
}

/////////////////////////SLIDER//////////////////

const headBurger = document.getElementById('head-hamb-but');
const headerWindow = document.querySelector('.header-side-window');
const headerWindowField = document.querySelector('.header-field');
const headBurgerClosedBtn = document.querySelector('.head-cross-icon ');
const checkBox = document.getElementById('checkbox');

headBurger.addEventListener('click', sideBarOpen);
headBurgerClosedBtn.addEventListener('click', sideBarClosed);

function sideBarOpen() {
  headerWindow.classList.toggle('heade-width-max');
  headerWindowField.classList.toggle('heade-field-displ');
  headBurgerClosedBtn.style.display = 'inline';
  checkBox.style.display = 'inline';
}

export function sideBarClosed() {
  headerWindow.classList.toggle('heade-width-max');
  headerWindowField.classList.toggle('heade-field-displ');
  headBurgerClosedBtn.style.display = 'none';
}

document.addEventListener('click', function (event) {
  // Проверяем, был ли клик по сайдбару или его содержимому
  if (
    !headerWindow.contains(event.target) &&
    !headBurger.contains(event.target)
  ) {
    headerWindow.classList.remove('heade-width-max');
    headerWindowField.classList.remove('heade-field-displ');
    headBurgerClosedBtn.style.display = 'none';
    checkBox.style.display = 'none'; //
  }
});

///////////////MODAL WINDOW ORDER/////////////////////

const modalOrderForm = document.getElementById('modal-forms-js');
const modalOperator = document.querySelector('.modal-fenster-order');

modalOrderForm.addEventListener('submit', orderSender);

function orderSender(event) {
  event.preventDefault();

  const formData = new FormData(modalOrderForm);
  const formDataObject = {};

  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  const name = formDataObject.name.toString();
  const mobile = '+' + formDataObject.mobile;
  const email = formDataObject.email.toString();
  const comment = formDataObject.comment.toString();

  if (!name || !mobile || !email || !comment) {
    alert('Please fill in all required fields');
    return;
  }

  const newOrder = new apiTastyTreats(name, mobile, email, comment);
  newOrder.postNewOrder();

  modalOrderForm.reset();

  modalOperator.style.display = 'none';

  backdropDeactivation();
}

/////////////////// MAKE ORDER MANAGER//////////////////

const buttonMakeOrdHero = document.getElementById('hero-order-now-id');

////////

buttonMakeOrdHero.addEventListener('click', openOrderWindow);

const buttonBasket = document.getElementById('head-order-but');
buttonBasket.addEventListener('click', openOrderWindow);

function openOrderWindow() {
  modalOperator.style.display = 'inline';
  backdropActivation();
}

const buttonModalCloser = document.getElementById('modal-cross-closer');
buttonModalCloser.addEventListener(`click`, closeOrderWindow);

function closeOrderWindow() {
  modalOperator.style.display = 'none';
  backdropDeactivation();
}

//CLOSING OUTSIDE BY CLICKING OUTSIDE MODAL

document.addEventListener('click', function (event) {
  if (
    !modalOperator.contains(event.target) &&
    !buttonBasket.contains(event.target) &&
    event.target !== buttonMakeOrdHero
  ) {
    modalOperator.style.display = 'none';
    backdropDeactivation();
  }
});

/// DARK MODE

const colorToggle = document.getElementById('colorToggle');
const highloadToggle = document.getElementById('highload1'); // ID второго чекбокса
const root = document.documentElement;

// При загрузке страницы, проверяем, какое состояние было сохранено
const savedColorMode = localStorage.getItem('colorMode');
if (savedColorMode === 'dark') {
  applyDarkMode();
  colorToggle.checked = true;
  highloadToggle.checked = true; // Устанавливаем состояние второго чекбокса
} else {
  applyLightMode();
  colorToggle.checked = false;
  highloadToggle.checked = false; // Устанавливаем состояние второго чекбокса
}

colorToggle.addEventListener('change', () => {
  if (colorToggle.checked) {
    applyDarkMode();
    localStorage.setItem('colorMode', 'dark');
  } else {
    applyLightMode();
    localStorage.setItem('colorMode', 'light');
  }
});

highloadToggle.addEventListener('change', () => {
  if (highloadToggle.checked) {
    applyDarkMode();
    localStorage.setItem('colorMode', 'dark');
  } else {
    applyLightMode();
    localStorage.setItem('colorMode', 'light');
  }
});

function applyDarkMode() {
  root.style.setProperty('--boody-bg', 'rgba(22, 22, 22, 1)');
  root.style.setProperty('--main-color', 'rgba(255, 255, 255, 1)');
  root.style.setProperty('--dark-th-color', 'rgb(255, 255, 255)');
  root.style.setProperty('--dark-th-color-categ', 'rgba(255, 255, 255, 0.5)');
  root.style.setProperty('--dark-th-color-bord', 'rgba(255, 255, 255, 0.2)');
  root.style.setProperty(
    '--dark-th-color-descrpop',
    'rgba(255, 255, 255, 0.8)'
  );
  root.style.setProperty('--dark-th-color-hearts', 'rgba(255, 255, 255, 0.7)');
  root.style.setProperty('--dark-kart-name', 'rgba(255, 255, 255, 1)');
  root.style.setProperty(
    '--dark-th-kart-grad',
    ' rgb(5, 5, 5, 1) , rgb(5, 5, 5)'
  );
  root.style.setProperty(
    '--box-shad',
    '0px 2px 5px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.12), 0px 2px 1px rgba(255, 255, 255, 0.2)'
  );
  root.style.setProperty(
    '--text-shadow',
    '0px 2px 5px rgba(255, 255, 255, 0.3), 0px 1px 3px rgba(255, 255, 255, 0.12), 0px 2px 1px rgba(255, 255, 255, 0.2)'
  );
}

function applyLightMode() {
  root.style.setProperty('--boody-bg', 'rgb(248, 248, 248)');
  root.style.setProperty('--main-color', 'rgb(248, 248, 248)');
  root.style.setProperty('--dark-th-color', 'rgb(5, 5, 5)');
  root.style.setProperty('--dark-th-color-categ', 'rgba(5, 5, 5, 0.5)');
  root.style.setProperty('--dark-th-color-bord', 'rgba(5, 5, 5, 0.2)');
  root.style.setProperty('--dark-th-color-descrpop', 'rgba(5, 5, 5, 0.8)');
  root.style.setProperty('--dark-th-color-hearts', 'rgba(255, 255, 255, 0.7)');
  root.style.setProperty('--dark-kart-name', 'rgba(5, 5, 5, 1)');

  root.style.setProperty(
    '--dark-th-kart-grad',
    'rgb(5, 5, 5) 0%, rgb(5, 5, 5) 60%'
  );
  root.style.setProperty(
    '--box-shad',
    '0px 2px 5px rgba(0, 0, 0, 0.3), 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 1px rgba(0, 0, 0, 0.2)'
  );
  root.style.setProperty(
    '--text-shadow',
    '0px 2px 5px rgba(0, 0, 0, 0.3), 0px 1px 3px rgba(0, 0, 0, 0.12),0px 2px 1px rgba(0, 0, 0, 0.2)'
  );
}
