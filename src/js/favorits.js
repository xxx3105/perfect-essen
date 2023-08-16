import apiTastyTreats from './api.js';

const tastyTreats = new apiTastyTreats();

import { filterFoods } from './filters-cat-pop.js';

import { hrefValue } from '../main.js';

const hideHero = document.getElementById('herocont');
const hidePop = document.getElementById('popular-hidden');
const hideFilter = document.getElementById('filters-hidden');
const hideReset = document.getElementById('resetButton');
const hideKart = document.getElementById('karten-platz');
const showKartFav = document.getElementById('kart-platz-fav');

const heroImgFavShow = document.querySelector('.favor-hero-img');
const imHeroFavPos = document.querySelector('.head-position');
const catLinieSlider = document.querySelector('.cat-button');

const favorEntreBut = document.querySelector('.head-nav-sidebar-home');
const favorExitBut = document.querySelector('.head-nav-sidebar-fav');

const categFavorShow = document.querySelector('.category-fav');
const categStandHide = document.querySelector('.categor-standart');

const nothingFound = document.querySelector('.nothing-was-found');

const backToMain = document.querySelector('.head-logo-text-sty');

///back to margin:

backToMain.addEventListener('click', () => {
  favorDetransformer();
});

///contents checking

favorEntreBut.addEventListener('click', contetnInFavorChecker);

function contetnInFavorChecker() {
  const favCont = Object.keys(localStorage);

  if (favCont.length === 0) {
    nothingFound.style.display = 'block';

    hideHero.classList.add('hidden-favorites');
    hidePop.classList.add('hidden-favorites');
    hideFilter.classList.add('hidden-favorites');
    hideReset.classList.add('hidden-favorites');

    categStandHide.style.display = 'none';
    hideKart.style.display = 'none';
  } else {
    favorTransformer();
  }
}

///Transformation starting

function favorTransformer() {
  hideHero.classList.add('hidden-favorites');
  hidePop.classList.add('hidden-favorites');
  hideFilter.classList.add('hidden-favorites');
  hideReset.classList.add('hidden-favorites');

  heroImgFavShow.style.display = 'block';
  showKartFav.style.display = 'block';
  categFavorShow.style.display = 'block';

  categStandHide.style.display = 'none';
  hideKart.style.display = 'none';

  imHeroFavPos.style.marginBottom = '44.5px';
  catLinieSlider.style.marginTop = '40px';

  filterFoodsFav();
  //initializeSlick();
}

favorExitBut.addEventListener('click', favorDetransformer);

///detransforming
function favorDetransformer() {
  hideHero.classList.remove('hidden-favorites');
  hidePop.classList.remove('hidden-favorites');
  hideFilter.classList.remove('hidden-favorites');
  hideReset.classList.remove('hidden-favorites');

  hideKart.style.display = 'block';
  categStandHide.style.display = 'block';

  showKartFav.style.display = 'none';
  heroImgFavShow.style.display = 'none';
  categFavorShow.style.display = 'none';
  nothingFound.style.display = 'none';

  imHeroFavPos.style.marginBottom = '85px';
  catLinieSlider.style.marginTop = '80px';
  filterFoods();
}

//Category button mechanismus

function buttonChangerFavSlider() {
  const buttonOfCatSlider = document.querySelectorAll('.cat-button-fav');

  buttonOfCatSlider.forEach(button => {
    button.addEventListener('click', () => {
      buttonOfCatSlider.forEach(otherButton => {
        otherButton.classList.remove('cat-button-fav-active');
      });
      button.classList.add('cat-button-fav-active');
    });
  });
}

//filter of favorits///

////////////////////////////////////////////
function filterFoodsFav() {
  const favoriteIds = Object.keys(localStorage);

  const displayPlatzFav = document.getElementById('kart-platz-fav');
  const categoryButtons = document.querySelectorAll('.cat-button-fav');

  // Создаем массив для хранения информации о рецептах
  const recipePromises = favoriteIds.map(async recipeId => {
    // Проверяем длину айди
    if (recipeId.length !== 24) {
      console.warn(`Некорректный айди: ${recipeId}`);
      return null;
    }

    try {
      const recipeInfo = await tastyTreats.getId(recipeId);
      return recipeInfo;
    } catch (error) {
      console.error(
        `Ошибка при получении информации о рецепте с айди ${recipeId}:`,
        error
      );
      return null;
    }
  });
  // Используем Promise.all для ожидания всех запросов и получения результатов
  Promise.all(recipePromises)
    .then(recipeInfos => {
      console.log(recipeInfos); // Выводим результаты всех запросов

      const addedCategories = new Set(); // Для отслеживания добавленных категорий

      const filteredRecipeInfos = recipeInfos.filter(
        recipeInfo => recipeInfo !== undefined && recipeInfo !== null
      );

      categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
          const selectedCategory = button.getAttribute('data-category');
          applyCategoryFilter(selectedCategory, filteredRecipeInfos);
        });
      });

      //console.log('recipeInfos:', recipeInfos);
      // console.log('filteredRecipeInfos:', filteredRecipeInfos);
      // Применяем фильтр по умолчанию
      applyCategoryFilter('All', filteredRecipeInfos);
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
}

function applyCategoryFilter(selectedCategory, recipes) {
  const displayPlatzFav = document.getElementById('kart-platz-fav');
  displayPlatzFav.innerHTML = '';

  const filteredRecipes =
    selectedCategory === 'All'
      ? recipes
      : recipes.filter(recipeInfo => recipeInfo.category === selectedCategory);

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipeInfo = filteredRecipes[i];
    console.log('Processing recipeInfo:', recipeInfo);
    if (recipeInfo) {
      const keyInformationArea = recipeInfo.area;
      const keyInformationCat = recipeInfo.category;
      const keyInformationDescr = recipeInfo.description;
      const keyInformationIngr = recipeInfo.ingridients;
      const keyInformationIngrId = recipeInfo.ingredients.map(
        ingredient => ingredient.id
      );
      const keyInformationRat = recipeInfo.rating;
      const keyInformationThumb = recipeInfo.thumb;
      const keyInformationTags = recipeInfo.tags;
      const keyInformationTime = recipeInfo.time;
      const keyInformationTitle = recipeInfo.title;
      const keyInformationId = recipeInfo._id;
      const keyVideo = recipeInfo.youtube;

      // Остальной код по созданию карточек на основе recipeInfo
      const receiptKarten = `
 
           <div class="kard-prod-contatiner">
      <img
        class="kart-bild"
        src="${keyInformationThumb}"
        alt="${keyInformationTitle}"
      />
      <div class="kart-gradietn"></div>
      <div class="kart-andere-information">
        <svg class="heart-icon" data-key-information="${keyInformationId}" id="${keyInformationId}">
          <use href="./img/symbol-defs.svg#icon-heart"></use>
        </svg>
        <h2 class="kart-name-food">${keyInformationTitle}</h2>
        <p class="kart-food-descr">
         ${keyInformationDescr}...
        </p>

        <div class="kart-unten-teil-kart">
          <div class="kart-raiting">${keyInformationRat.toFixed(1)}</div>
          <div>
            <ul class="kart-list-rating">
              <li>
 
                <svg class="star-icon-first ${getRatingColorClass(
                  keyInformationRat,
                  1
                )}" id="first-star">
                  <use href="${hrefValue}#icon-star"></use>
                </svg>
              </li>
              <li>
                <svg class="star-icon-second ${getRatingColorClass(
                  keyInformationRat,
                  2
                )}" id="second-star">
                 <use href="${hrefValue}#icon-star"></use>
                </svg>
              </li>
              <li>
                <svg class="star-icon-third ${getRatingColorClass(
                  keyInformationRat,
                  3
                )}" id="third-star">
                <use href="${hrefValue}#icon-star"></use>
                </svg>
              </li>
              <li>
                <svg class="star-icon-fourth ${getRatingColorClass(
                  keyInformationRat,
                  4
                )}" id="fourth-star">
               <use href="${hrefValue}#icon-star"></use>
                  
                </svg>
              </li>
              <li>
                <svg class="star-icon-fift ${getRatingColorClass(
                  keyInformationRat,
                  5
                )}" id="fift-star">
                <use href="${hrefValue}#icon-star"></use>
                </svg>
              </li>
            </ul>
          </div>
          <div><button type="button" class="kart-recept-button" data-key-information="${keyInformationId}" >See recipe</button></div>
        </div>
      </div>
        </div>
          `;

      displayPlatzFav.innerHTML += receiptKarten;
      ///функция рейтинга

      function getRatingColorClass(keyInformationRat, stars) {
        if (keyInformationRat >= stars) {
          return 'filters-icon-rating-recipe-' + stars;
        } else {
          return 'filters-icon-rating-black';
        }
      }

      //слушатель на кнопки рецепта///
      var buttons = document.querySelectorAll('.kart-recept-button');

      buttons.forEach(function (button) {
        button.addEventListener('click', function () {
          const keyInformation = button.getAttribute('data-key-information');

          filterAndLogData(keyInformation, foods);
          console.log('Значение data-key-information:', keyInformation);
        });
      });

      //слушатель на сердечко///
      const buttonsFavoritesAdd = document.querySelectorAll('.heart-icon');

      buttonsFavoritesAdd.forEach(function (heartFavAdd) {
        //проверка нахожд избр в лок
        const keyInformation = heartFavAdd.getAttribute('data-key-information');

        if (localStorage.getItem(keyInformation)) {
          heartFavAdd.classList.add('heart-icon-toggle');
        }

        ///внесение в избр

        heartFavAdd.addEventListener('click', function () {
          heartFavAdd.classList.toggle('heart-icon-toggle');

          if (!heartFavAdd.classList.contains('heart-icon-toggle')) {
            localStorage.removeItem(keyInformation);
            filterFoodsFav();
          } else {
            localStorage.setItem(keyInformation, keyInformation);
          }

          // filterAndLogData(keyInformation, foods);
          //console.log('Значение data-key-information:', keyInformation);
        });
      });
    }
  }
}
//Создание категорий из фильтр объектов

function filterCatFav() {
  const favoriteIds = Object.keys(localStorage);

  const recipePromises = favoriteIds.map(async recipeId => {
    // Проверяем длину айди
    if (recipeId.length !== 24) {
      console.warn(`Некорректный айди: ${recipeId}`);
      return null;
    }

    try {
      const recipeInfo = await tastyTreats.getId(recipeId);
      return recipeInfo;
    } catch (error) {
      console.error(
        `Ошибка при получении информации о рецепте с айди ${recipeId}:`,
        error
      );
      return null;
    }
  });

  console.log(recipePromises);
  Promise.all(recipePromises)
    .then(recipeInfos => {
      // recipeInfos - массив с информацией о рецептах

      const displayCatFav = document.querySelector('.cat-fav-list');
      const addedCategories = new Set(); // Для отслеживания добавленных категорий

      //console.log(recipeInfos);

      recipeInfos.forEach(recipeInfo => {
        const keyInformationCat = recipeInfo.category;

        if (!addedCategories.has(keyInformationCat)) {
          addedCategories.add(keyInformationCat);

          // Остальной код по созданию карточек на основе recipeInfo
          const itemCatFav = `
          <div><button class="cat-button-fav" data-category="${keyInformationCat}" >${keyInformationCat}</button></div> 
           `;

          displayCatFav.insertAdjacentHTML('beforeend', itemCatFav);
          console.log(itemCatFav);
        }
      });
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
}
filterCatFav();

//Button color machanismus
setTimeout(function () {
  buttonChangerFavSlider();
}, 500);

//SLIDER

$(document).ready(function () {
  setTimeout(function () {
    $('.cat-fav-list').slick({
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      swipeToSlide: true,
      variableWidth: true,
      slidesToScroll: 3,
    });
  }, 1000); // 1000 миллисекунд (1 секунда)
});

// function initializeSlick() {
//   $('.cat-fav-list').slick({
//     infinite: true,
//     speed: 600,
//     slidesToShow: 1,
//     swipeToSlide: true,
//     variableWidth: true,
//     slidesToScroll: 3,
//   });
// }

// $(document).ready(function () {
//   initializeSlick();
// });

// setTimeout(function () {
//   initializeSlick();
// }, 2000);
