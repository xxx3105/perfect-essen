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

function sideBarClosed() {
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
