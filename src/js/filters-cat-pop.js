import apiTastyTreats from './api.js';
import { filterAndLogData } from './recipe-kart.js';
import { hrefValue } from '../main.js';
import { paginationHandler } from '../js/pagination.js';

//переменные

const tastyTreats = new apiTastyTreats();
const listTime = document.getElementById('time');
const listArea = document.getElementById('area');
const listIngr = document.getElementById('ingr');
const pagMenu = document.querySelector('.pagination-control');

let recipeQuantForPag = 0;
let paginationHandlerCalled = false;
let previousPaginationIndicatorTotalPages = null;

const inProgressIndicator = document.querySelector('.one-spin');

//categories

//button categories

const buttonAllCat = document.getElementById('categ-button');

buttonAllCat.addEventListener('click', () => {
  buttonAllCat.classList.toggle('cat-button-active');
});

///filter-categories

tastyTreats
  .getCat()
  .then(categories => {
    const listCategories = document.querySelector('.categories-container');
    listCategories.innerHTML = '';

    categories.forEach(categorie => {
      const pointCat = categorie.name;
      const nameCatAdd = document.createElement('button');

      nameCatAdd.classList.add('cat-option');
      nameCatAdd.style.cursor = 'pointer';
      nameCatAdd.textContent = pointCat;
      listCategories.appendChild(nameCatAdd);
    });

    //2.1 устанавливаем реакцию на клики страны
    listCategories.addEventListener('click', searchCat);

    ///items of list painted green
    const greenTextListCat = document.querySelectorAll('.cat-option');
    greenTextListCat.forEach(element => {
      element.addEventListener('click', () => {
        greenTextListCat.forEach(el => el.classList.remove('cat-option-act'));
        element.classList.add('cat-option-act');
        buttonAllCat.classList.remove('cat-button-active');
      });
    });
  })
  .catch(error => {
    console.error('Sorry,we have a trouble in tastyTreats.getCat()!', error);
  });

//7.очернители закрытого окна

listIngr.addEventListener('change', function () {
  listIngr.style.color = 'var(--dark-th-color)';
});
listArea.addEventListener('change', function () {
  listArea.style.color = 'var(--dark-th-color)';
});
listTime.addEventListener('change', function () {
  listTime.style.color = 'var(--dark-th-color)';
});

//0 поле поиска

const searchFiled = document.getElementById('search-input');
searchFiled.addEventListener('keydown', textFromSearchField);

//Список стран
tastyTreats
  .getAreas()
  .then(areas => {
    areas.forEach(area => {
      const areaName = area.name;
      const optionElement = document.createElement('option');
      optionElement.classList.add('option-area');
      optionElement.textContent = areaName;
      listArea.appendChild(optionElement);
    });

    //2.1 устанавливаем реакцию на клики страны
    listArea.addEventListener('change', searchArea);
  })
  .catch(error => {
    console.error('Sorry,we have a trouble!', error);
  });

//1.2 получаем список ингиридентов в фильтр
tastyTreats
  .getIngridients()
  .then(ingridients => {
    const optionIngridients = document.getElementById('ingr');
    //optionIngridients.innerHTML = '';

    ingridients.sort((a, b) => a.name.localeCompare(b.name));

    ingridients.forEach(ingridient => {
      const ingridientName = ingridient.name;
      const ingridientId = ingridient._id;

      const ingridientNameAdd = document.createElement('option');
      ingridientNameAdd.classList.add('option-ingr');
      ingridientNameAdd.textContent = ingridientName;

      ingridientNameAdd.value = `${ingridientId}`;
      optionIngridients.appendChild(ingridientNameAdd);
    });
    //2.2 устанавливаем реакцию на клики ингр
    optionIngridients.addEventListener('change', searchIngridiens);
  })
  .catch(error => {
    console.error(
      'Sorry,we have a trouble in tastyTreats.getIngridients()!',
      error
    );
  });

//4. Создаём опции времени в фильтре
function timeMaker(interations) {
  //let optionExample =`<option class="time-filter">${resultOne}</option>`
  for (let i = 0; i < interations; i++) {
    const resultOne = (i + 1) * 5;

    ///4..1 вставляем кажду итереацию ШТМЛ
    listTime.insertAdjacentHTML(
      'beforeend',
      `<option class="time-filter">${resultOne} min</option>`
    );
    ///4.2. вешаем слушателя на клик на выбор
    listTime.addEventListener('change', searchTime);
  }
}

//5.устанавливаем кол-во интервалов
timeMaker(25);

//1.1.2 опция выбора страны
function searchArea(event) {
  selectedArea = event.target.value;
  filterFoods();
}

//3. Получаем значение выбранной опции Ingridients
function searchIngridiens(event) {
  selectedIngredient = event.target.value;
  filterFoods();
}

//6. получаем время из фильтра
function searchTime(event) {
  selectedTime = parseInt(event.target.value);
  filterFoods();
}

//7. данные из поиска
function textFromSearchField(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    selectedSearch = event.target.value;
    filterFoods();
  }
}
//10. выбранная категория
function searchCat(event) {
  selectedCategory = event.target.textContent;
  console.log(selectedCategory);
  filterFoods();
}

let selectedArea = '';
let selectedIngredient = '';
let selectedTime = '';
let selectedSearch = '';
let selectedTag = '';
let selectedCategory = '';

//все категории кнопка
const showAllCategory = document.getElementById('categ-button');
showAllCategory.addEventListener('click', resetFilters);

//сброс фильтров

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetFilters);

function resetFilters() {
  // Сбросить все выбранные значения на значения по умолчанию или null
  selectedArea =
    selectedCategory =
    selectedIngredient =
    selectedTag =
    selectedTime =
    selectedSearch =
      '';

  //сброс категорий

  const greenTextListCat = document.querySelectorAll('.cat-option');
  greenTextListCat.forEach(element => {
    element.classList.remove('cat-option-act');
  });

  // Сбросить все фильтры
  searchFiled.value = 'Enter Text';
  listTime.value = '0 min';
  listArea.value = 'Region';
  listIngr.value = 'Product';

  const {
    style: { color },
  } = searchFiled;
  [searchFiled, listTime, listArea, listIngr].forEach(
    elem => (elem.style.color = `var(--dark-th-color-categ)`)
  );

  filterFoods();
}

///пряталка пагинации
function paginationIndicator(totalPages) {
  //  const pagMenu = document.querySelector('.pagination-control');
  //const pagMenuTwo = document.querySelector('.pagination-list');
  const totalPagesNumber = parseInt(totalPages);

  if (totalPagesNumber <= 1) {
    pagMenu.style.display = 'none';
    // pagMenuTwo.style.display = 'none';
  } else {
    pagMenu.style.display = 'inline';
    // pagMenuTwo.style.display = 'inline';
  }
}

///quantity of showed pages depends on viewportwidth

function calculateColumns() {
  const viewportWidth = window.innerWidth;

  if (viewportWidth <= 768) {
    return 6;
  } else if (viewportWidth >= 769 && viewportWidth <= 1280) {
    return 8;
  } else {
    return 9;
  }
}

let numberOfCards = calculateColumns();
console.log(numberOfCards);

//main filter of project

export function filterFoods(pageOfList) {
  let searchedTitle = selectedSearch;
  let choosedCategory = selectedCategory;
  let currentPage = pageOfList || 1;
  //let itemsPageLimit = '9';
  let itemsPageLimit = numberOfCards;
  let foodArea = selectedArea;
  let ingrId = selectedIngredient;
  let timeOptions = selectedTime;

  inProgressIndicator.classList.remove('hidden');

  tastyTreats
    .getDetailInformationParam(
      searchedTitle,
      choosedCategory,
      currentPage,
      itemsPageLimit,
      foodArea,
      ingrId,
      timeOptions
    )
    .then(async data => {
      const foods = data.results;

      //Paginationcontrol

      const paginationIndicatorPage = data.page;
      const paginationIndicatorPerPage = data.perPage;
      const paginationIndicatorTotalPages = data.totalPages;

      inProgressIndicator.classList.add('hidden');

      console.log(
        paginationIndicatorPage,
        paginationIndicatorPerPage,
        paginationIndicatorTotalPages,
        data
      );

      if (
        parseInt(paginationIndicatorTotalPages) !==
        previousPaginationIndicatorTotalPages
      ) {
        previousPaginationIndicatorTotalPages = parseInt(
          paginationIndicatorTotalPages
        );

        paginationIndicator(paginationIndicatorTotalPages);
        paginationHandler(paginationIndicatorTotalPages);

        paginationHandlerCalled = true;
      }

      let filteredFoods = foods.filter(food => {
        return (
          (!selectedTag || food.tags.includes(selectedTag)) &&
          (!selectedTime || selectedTime >= food.time) &&
          (!selectedSearch ||
            food.title.toLowerCase().includes(selectedSearch.toLowerCase()) ||
            (food.area &&
              food.area.toLowerCase().includes(selectedSearch.toLowerCase())) ||
            (food.category &&
              food.category
                .toLowerCase()
                .includes(selectedSearch.toLowerCase())) ||
            (food.description &&
              food.description
                .toLowerCase()
                .includes(selectedSearch.toLowerCase())) ||
            food.ingredients.some(ingr =>
              ingr.measure.toLowerCase().includes(selectedSearch.toLowerCase())
            ))
        );
      });

      if (filteredFoods.length === 0) {
        toggleNotFound(true); // Показать блок "Ничего не найдено"
      } else {
        toggleNotFound(false); // Скрыть блок "Ничего не найдено"
        // ... (ваш существующий код)
      }

      const displayPlatz = document.getElementById('karten-platz');
      displayPlatz.innerHTML = '';

      filteredFoods.forEach(food => {
        const keyInformationArea = food.area;
        const keyInformationCat = food.category;
        const keyInformationDescr = food.description;
        const keyInformationIngr = food.ingridients;
        const keyInformationIngrId = food.ingredients.map(
          ingredient => ingredient.id
        );
        const keyInformationRat = food.rating;
        const keyInformationThumb = food.thumb;
        const keyInformationTags = food.tags;
        const keyInformationTime = food.time;
        const keyInformationTitle = food.title;
        const keyInformationId = food._id;
        const keyVideo = food.youtube;

        recipeQuantForPag++;

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

        displayPlatz.innerHTML += receiptKarten;

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

          const keyInformation = heartFavAdd.getAttribute(
            'data-key-information'
          );

          if (localStorage.getItem(keyInformation)) {
            heartFavAdd.classList.add('heart-icon-toggle');
          }

          ///внесение в избр

          heartFavAdd.addEventListener('click', function () {
            heartFavAdd.classList.toggle('heart-icon-toggle');

            if (!heartFavAdd.classList.contains('heart-icon-toggle')) {
              localStorage.removeItem(keyInformation);
            } else {
              localStorage.setItem(keyInformation, keyInformation);
              //filterCatFav();
            }

            // filterAndLogData(keyInformation, foods);
            //console.log('Значение data-key-information:', keyInformation);
          });
        });
      });
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
}

filterFoods(1);

//// Nothing found

function toggleNotFound(show) {
  const notFoundContainer = document.querySelector('.filt-not-found');
  if (show) {
    notFoundContainer.style.display = 'block';
    pagMenu.style.display = 'none';
  } else {
    notFoundContainer.style.display = 'none';
  }
}
