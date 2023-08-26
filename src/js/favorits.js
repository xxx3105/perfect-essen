import apiTastyTreats from './api.js';

const tastyTreats = new apiTastyTreats();

import { filterFoods } from './filters-cat-pop.js';
import { sideBarClosed } from './header.js';
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

const fieldOfCarFavor = document.querySelector('.cat-fav-list');

const paginationIndikatorGenMenuHider = document.querySelector(
  '.pagination-control'
);

///back to main:

backToMain.addEventListener('click', () => {
  favorDetransformer();
});

favorEntreBut.addEventListener('click', favorTransformer);

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
  paginationIndikatorGenMenuHider.style.display = 'none';

  imHeroFavPos.style.marginBottom = '44.5px';
  catLinieSlider.style.marginTop = '40px';
  filterCatFav();
  lokalChecker();
  filterFoodsFav();
  sideBarClosed();
}

favorExitBut.addEventListener('click', favorDetransformer);

function favorDetransformer() {
  hideHero.classList.remove('hidden-favorites');
  hidePop.classList.remove('hidden-favorites');
  hideFilter.classList.remove('hidden-favorites');
  hideReset.classList.remove('hidden-favorites');

  hideKart.style.display = 'block';
  categStandHide.style.display = 'block';
  paginationIndikatorGenMenuHider.style.display = 'block';

  showKartFav.style.display = 'none';
  heroImgFavShow.style.display = 'none';
  categFavorShow.style.display = 'none';
  nothingFound.style.display = 'none';

  imHeroFavPos.style.marginBottom = '85px';
  catLinieSlider.style.marginTop = '80px';
  filterFoods(1);
  sideBarClosed();
}

//Функция проверки наличия в локале рецептов и вывода изображения ничего не найдено

function lokalChecker() {
  const favoriteIds = Object.keys(localStorage);
  if (favoriteIds.length === 0 || !favoriteIds.some(id => id.length === 24)) {
    heroImgFavShow.style.display = 'none';
    categFavorShow.style.display = 'none';
    nothingFound.style.display = 'block';
    fieldOfCarFavor.innerHTML = '';
  }
}

///Функция улавливания значений нажатий на кнопки категорий

function handleCategoryButtonClick(event) {
  const keyInformationCat = event.target.getAttribute('data-category');
  // Здесь вы можете использовать значение keyInformationCat как вам нужно
  console.log('Выбрана категория:', keyInformationCat);

  filterFoodsFav(keyInformationCat);
}

// Получаем контейнер, содержащий все кнопки категорий
const displayCatFav = document.querySelector('.cat-fav-list');

displayCatFav.removeEventListener('click', handleCategoryButtonClick);

// Добавляем обработчик клика на контейнер, используем делегирование событий
displayCatFav.addEventListener('click', event => {
  // Проверяем, была ли нажата кнопка категории
  if (event.target.classList.contains('cat-button-fav')) {
    handleCategoryButtonClick(event);
  }
});

//Глобальная фильтрация избранного для вывода карточек///

////////////////////////////////////////////

export async function filterFoodsFav(selectedCategory) {
  const categoryButtons = document.querySelectorAll('.cat-button-fav');
  const favoriteIds = Object.keys(localStorage);

  console.log('Выбрана категория filterFoodsFav:', selectedCategory);

  const recipePromises = favoriteIds.map(async recipeId => {
    if (recipeId.length !== 24) {
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
      const addedCategories = new Set(); // Для отслеживания добавленных категорий

      const filteredRecipeInfos = recipeInfos.filter(
        recipeInfo => recipeInfo !== undefined && recipeInfo !== null
      );
      // Применяем фильтр по умолчанию
      //      applyCategoryFilter(selectedCategory, filteredRecipeInfos);

      if (selectedCategory === undefined) {
        applyCategoryFilter('All', filteredRecipeInfos);
      } else {
        applyCategoryFilter(selectedCategory, filteredRecipeInfos);
      }

      categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
          const selectedCategory = button.getAttribute('data-category');
          applyCategoryFilter(selectedCategory, filteredRecipeInfos);
        });
      });
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
}

function applyCategoryFilter(selectedCategory, recipes) {
  console.log(`ffdfddf:${selectedCategory}`);

  const displayPlatzFav = document.getElementById('kart-platz-fav');
  displayPlatzFav.innerHTML = '';

  const filteredRecipes =
    selectedCategory === 'All'
      ? recipes
      : recipes.filter(recipeInfo => recipeInfo.category === selectedCategory);

  //console.log(filteredRecipes);

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
 
           <div class="kard-prod-contatiner"  data-key-information-cat="${keyInformationCat}">
      <img
        class="kart-bild"
        src="${keyInformationThumb}"
        alt="${keyInformationTitle}"
      />
      <div class="kart-gradietn"></div>
      <div class="kart-andere-information">
        <svg class="heart-icon" data-key-information="${keyInformationId}" id="${keyInformationId}">
        <use href="${hrefValue}#icon-heart"></use>
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
            lokalChecker();
            filterFoodsFav();
            filterCatFav();

            removeUnusedCategories();
          } else {
            localStorage.setItem(keyInformation, keyInformation);
          }
        });
      });
    }
  }
}

/////функция фильтрации Категорий///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function filterCatFav() {
  const favoriteIds = Object.keys(localStorage);
  const recipePromisesTwo = favoriteIds.map(async recipeId => {
    if (recipeId.length !== 24) {
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

  try {
    const recipeInfos = await Promise.all(recipePromisesTwo);

    const displayCatFav = document.querySelector('.cat-fav-list');
    const addedCategories = new Set();

    let localCategories = ''; // Создаем пустую строку для хранения названий категорий

    // Очищаем содержимое контейнера перед добавлением новых кнопок
    displayCatFav.innerHTML =
      '<div><button class="cat-button-fav" data-category="All">All categories </button> </div>';

    recipeInfos.forEach(recipeInfo => {
      if (recipeInfo !== null) {
        const keyInformationCat = recipeInfo.category;

        if (!addedCategories.has(keyInformationCat)) {
          const itemCatFav = `
            <div class="${keyInformationCat}"><button class="cat-button-fav" data-category="${keyInformationCat}">${keyInformationCat}</button></div>
          `;
          displayCatFav.insertAdjacentHTML('beforeend', itemCatFav);
          addedCategories.add(keyInformationCat);

          // Добавляем название категории к строке локальных категорий
          if (localCategories) {
            localCategories += `,${keyInformationCat}`;
          } else {
            localCategories = keyInformationCat;
          }
        }
      }
    });

    // Сохраняем строку с названиями категорий в локальное хранилище
    localStorage.setItem('categories', localCategories);
    removeUnusedCategories();

    buttonChangerFavSlider();
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}

// Вызов функции filterCatFav()
//filterCatFav();

//     //SLIDER INITIALISATION

//     // $(document).ready(function () {
//     //   setTimeout(function () {
//     //     $('.cat-fav-list').slick({
//     //       infinite: true,
//     //       speed: 600,
//     //       slidesToShow: 1,
//     //       swipeToSlide: true,
//     //       variableWidth: true,
//     //       slidesToScroll: 3,
//     //     });
//     //   }, 2000); // 1000 миллисекунд (1 секунда)
//     // });
//   } catch (error) {
//     console.error('Ошибка при получении данных:', error);
//   }
// }

// $(document).ready(function () {
//   setTimeout(function () {
//     $('.cat-fav-list').slick({
//       infinite: true,
//       speed: 600,
//       slidesToShow: 1,
//       swipeToSlide: true,
//       variableWidth: true,
//       slidesToScroll: 3,
//     });
//   }, 2000); // 1000 миллисекунд (1 секунда)
// });

//////////////

///SLIDER CAT FAV MENU

const draggableContainer = document.getElementById('draggable-container');
let isDragging = false;
let startX;

draggableContainer.addEventListener('mousedown', event => {
  isDragging = true;
  startX = event.clientX;
  draggableContainer.style.cursor = 'grabbing'; // Меняем указатель на "grabbing" при начале перетаскивания
});

document.addEventListener('mousemove', event => {
  if (!isDragging) return;
  const deltaX = event.clientX - startX;
  draggableContainer.scrollLeft -= deltaX; // Прокручиваем контейнер по горизонтали на основе смещения мыши
  startX = event.clientX;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  draggableContainer.style.cursor = 'grab'; // Восстанавливаем указатель "grab" после окончания перетаскивания
});

//Category button mechanismus цвет

function buttonChangerFavSlider() {
  const buttonOfCatSlider = document.querySelectorAll('.cat-button-fav');

  buttonOfCatSlider.forEach(button => {
    button.addEventListener('click', () => {
      // Убираем активный класс у всех кнопок
      buttonOfCatSlider.forEach(otherButton => {
        otherButton.classList.remove('cat-button-fav-active');
      });

      // Тогглируем активный класс у выбранной кнопки
      button.classList.toggle('cat-button-fav-active');
    });
  });
}

buttonChangerFavSlider();

//удаление отсутствующих категорий из списка

function removeUnusedCategories() {
  const localCategories = localStorage.getItem('categories'); // Получаем значение из локального хранилища

  const displayCatFav = document.querySelector('.cat-fav-list');
  const categoryButtons = displayCatFav.querySelectorAll('.cat-button-fav');
  const recipeCards = document.querySelectorAll('.kard-prod-contatiner');

  categoryButtons.forEach(button => {
    const keyInformationCat = button.getAttribute('data-category');

    // Если кнопка не имеет атрибут data-category="All"
    if (keyInformationCat !== 'All') {
      const hasRecipesWithCategory = Array.from(recipeCards).some(
        card =>
          card.getAttribute('data-key-information-cat') === keyInformationCat
      );

      // Если нет рецептов с этой категорией и она отсутствует в локале, удаляем див
      if (
        !hasRecipesWithCategory &&
        !localCategories.includes(keyInformationCat)
      ) {
        const categoryDiv = button.parentElement;
        categoryDiv.remove();
      }
    }
  });
}
