import apiTastyTreats from './api.js';

const tastyTreats = new apiTastyTreats();

export function filterAndLogData(targetId, filtrFoodList) {
  // Вывод отфильтрованных данных в консоль
  //console.log('Отфильтрованные данные:', filtrFoodList);

  filtrFoodList.forEach(food => {
    const recipeId = food._id;
    if (recipeId === targetId) {
      const recipeId = food._id;
      const recipeYoutube = food.youtube;
      const recipeTitle = food.title;
      const reciepRati = food.rating;
      const recipeTime = food.time;
      const recipeIngrType = food.ingredients.map(ingredient => ingredient.id);
      const recipeIngrMes = food.ingredients.map(
        ingredient => ingredient.measure
      );
      const recipeTag = food.tags;
      const recipeInst = food.instructions;

      tastyTreats
        .getIngridients()
        .then(ingridients => {
          const matchingIngrNames = recipeIngrType.map(ingrId => {
            const matchingIngr = ingridients.find(ingr => ingr._id === ingrId);
            return matchingIngr ? matchingIngr.name : null;
          });

          //console.log(matchingIngrNames, recipeId, reciepRati, recipeTitle, recipeYoutube, recipeTime, recipeIngrMes, recipeTag, recipeInst);

          // Корректировка ссылки ютуб

          function convertYouTubeLinkToEmbed(youtubeLink) {
            const standardUrl = 'https://www.youtube.com/';
            const videoId = youtubeLink.split('watch?v=')[1];

            if (videoId) {
              const embedLink = `${standardUrl}embed/${videoId}`;
              return embedLink;
            } else {
              return null; // Возвращаем null, если не удалось извлечь videoId
            }
          }

          const displayPlatzReipe =
            document.getElementById('recipe-kart-platz');
          displayPlatzReipe.innerHTML = '';

          //группируем ингридиенты в рецепте
          const ingrFieldsHTML = matchingIngrNames
            .map(
              (name, index) => `
                        <div class="receipe-ingr-list-element">
                        <div class="receipe-ingr-type">${name}</div>
                        <div class="receipe-ingr-quantity">${recipeIngrMes[index]}</div>
                        </div>
                        `
            )
            .join('');

          const receiptKartenDetaild = `
                
<div class="receipe-kart">
  <svg class="receipe-kart-сross">
    <use href="./img/symbol-defs.svg#icon-cross"></use>
  </svg>
   

<iframe 
    width="295"
    height="295"
    class="receipe-video" 
    src="${convertYouTubeLinkToEmbed(recipeYoutube)}" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; 
    autoplay; clipboard-write; 
    encrypted-media; gyroscope; 
    picture-in-picture; web-share" 
    allowfullscreen>
    </iframe>


  <div class="receipe-text-container">
    <h2 class="receipe-titel">${recipeTitle}</h2>
    <div class="receipe-rating-line">
      <p class="receipe-number-time-rait">${reciepRati}</p>
      <div>
        <ul class="kart-list-rating receipe-list-rating">
          <li>
            <svg
              class="star-icon-first ${getRatingColorClass(reciepRati, 1)}"
              id="first-star"
            >
              <use href="./img/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg
              class="star-icon-second ${getRatingColorClass(reciepRati, 2)}"
              id="second-star"
            >
              <use href="./img/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg
              class="star-icon-third ${getRatingColorClass(reciepRati, 3)}"
              id="third-star"
            >
              <use href="./img/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg
              class="star-icon-fourth ${getRatingColorClass(reciepRati, 4)}"
              id="fourth-star"
            >
              <use href="./img/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg
              class="star-icon-fift ${getRatingColorClass(reciepRati, 5)}"
              id="fift-star"
            >
              <use href="./img/symbol-defs.svg#icon-star"></use>
            </svg>
          </li>
        </ul>
      </div>
      <p class="receipe-number-time-rait receipe-number-rait">${recipeTime} min</p>
    </div>

    <div class="recipe-ingrid-field">${ingrFieldsHTML} </div>

<ul class="recipe-tag-list">
${recipeTag
  .map(tag => `<li class="recipe-tag-list-elem">#${tag}</li>`)
  .join('')} 
</ul>
    <p class="recipe-food-descr"> ${recipeInst} </p>

    <div class="recipe-button-block">
      <button type="button" class="recipe-favor-button recipe-favor-button-marked"  data-key-information="${recipeId}" >Add to favorite</button>

      <button type="button" class="recive-rating-button">Give a raiting</button>
    </div>
  </div>
</div>                
                `;
          displayPlatzReipe.innerHTML += receiptKartenDetaild;

          // Функция рейтинга
          function getRatingColorClass(keyInformationRat, stars) {
            if (keyInformationRat >= stars) {
              return 'filters-icon-rating-recipe-' + stars;
            } else {
              return 'filters-icon-rating-black';
            }
          }

          //buttons block

          //close button

          const recipeKartField = document.querySelector('.receipe-kart');
          const closeRecipeButton = document.querySelector(
            '.receipe-kart-сross'
          );
          const ratingWindow = document.querySelector('.rating-kart-field');
          const ratingWindowOpener = document.querySelector(
            '.recive-rating-button'
          );
          const ratingWindowCloser =
            document.querySelector('.rating-kart-cross');
          const ratingWindowCloserTwo =
            document.getElementById('rating-kart-cross');

          closeRecipeButton.addEventListener('click', recipeCloser);

          function recipeCloser() {
            //console.log('closeeee');
            displayPlatzReipe.innerHTML = '';
          }

          recipeKartField.addEventListener('click', function (event) {
            // Остановить распространение события, чтобы оно не достигло document
            event.stopPropagation();
          });

          document.addEventListener('click', function (event) {
            // Проверяем, был ли клик по модальному окну или его содержимому
            if (
              !recipeKartField.contains(event.target) &&
              !ratingWindow.contains(event.target)
            ) {
              // Клик был сделан вне модального окна, закрываем его
              displayPlatzReipe.innerHTML = '';
            }
          });

          ///rating

          ratingWindowOpener.addEventListener('click', openRating);
          ratingWindowCloserTwo.addEventListener('click', closeRating);

          function openRating() {
            ratingWindow.style.display = 'block';
          }

          function closeRating() {
            ratingWindow.style.display = 'none';
            resetForm();
            resetStars();
          }

          document.addEventListener('click', function (event) {
            // Проверяем, был ли клик по модальному окну или его содержимому
            if (
              !ratingWindow.contains(event.target) &&
              event.target !== ratingWindowOpener
            ) {
              // Клик был сделан вне модального окна и не по кнопке, которая его открывает
              ratingWindow.style.display = 'none';
            }
          });

          const starsRecipeController = document.querySelectorAll('.star-icon');
          const ratingSendButton = document.getElementById('rating-email-send');
          const formDataCollector =
            document.getElementById('rating-email-form');
          const numberPageChanger = document.querySelector('.rating-number');
          const newRating = new apiTastyTreats();
          let selectedRating = 0;

          // Функция сброса рейтинга и полей формы
          const resetForm = () => {
            resetStars();
            numberPageChanger.innerHTML = '';
            formDataCollector.value = '';
            selectedRating = 0;
          };

          // Функция для сброса рейтинга
          const resetStars = () => {
            starsRecipeController.forEach(star => {
              star.style.fill = '#0505052e';
            });
          };

          // Обработчик клика по звездам
          starsRecipeController.forEach((star, index) => {
            star.addEventListener('click', () => {
              resetStars();
              for (let i = 0; i <= index; i++) {
                starsRecipeController[i].style.fill = '#eea10c';
              }
              selectedRating = index + 1;
              numberPageChanger.innerHTML = selectedRating; // Обновляем отображение рейтинга
            });
          });

          //ПРОВЕРКА НАЛИЧИЯ РЕЗУЛЬТАТОВ ГОЛОСОВАНИЯ

          function checkRatingButtonState() {
            const isRatingSent = localStorage.getItem(`rat${recipeId}`);
            if (isRatingSent) {
              ratingWindowOpener.disabled = true;
              ratingWindowOpener.style.backgroundColor = '#9cb53756';
              ratingWindowOpener.style.border = 'none';
              ratingWindowOpener.style.cursor = 'not-allowed';
            }
          }

          // Проверяем состояние кнопки оценки при загрузке страницы
          checkRatingButtonState();

          // Обработчик клика по кнопке отправки
          ratingSendButton.addEventListener('click', function (evt) {
            evt.preventDefault();

            // Проверяем наличие введенных данных и выбранного рейтинга
            if (formDataCollector.value.trim() === '' || selectedRating === 0) {
              console.log('Please enter email and select a rating.');
              return;
            }

            // Отправляем данные на сервер
            newRating.sendRating(
              formDataCollector.value,
              selectedRating,
              recipeId
            );

            localStorage.setItem(`rat${recipeId}`, 'true');

            // Сбрасываем форму и рейтинг
            resetForm();
            resetStars(); // Сбрасываем цвет звезд
            ratingWindow.style.display = 'none';
            console.log('Raiting was sent!');
            ratingWindowOpener.disabled = true;
            ratingWindowOpener.style.backgroundColor = '#9cb53756'; // Пример цвета фона для неактивной кнопки
            ratingWindowOpener.style.border = 'none'; // Пример цвета фона для неактивной кнопки
            ratingWindowOpener.style.cursor = 'not-allowed';
          });

          //Адд в избр

          const addRatRecKar = document.querySelectorAll(
            '.recipe-favor-button'
          );

          addRatRecKar.forEach(function (button) {
            const keyInformationRecipet = button.getAttribute(
              'data-key-information'
            );
            const heartIcon = document.getElementById(keyInformationRecipet); // Правильный селектор для иконки

            const isAdded = localStorage.getItem(keyInformationRecipet);

            if (isAdded) {
              button.style.backgroundColor = '#E4E6B4';
              heartIcon.classList.add('heart-icon-toggle');
              button.innerHTML = 'Remove'; // Изменяем HTML содержимое кнопки
            }

            button.addEventListener('click', function () {
              const isAlreadyAdded = localStorage.getItem(
                keyInformationRecipet
              );

              if (!isAlreadyAdded) {
                localStorage.setItem(
                  keyInformationRecipet,
                  keyInformationRecipet
                );
                button.style.backgroundColor = '#E4E6B4';
                heartIcon.classList.add('heart-icon-toggle');
                button.innerHTML = '<span class="button-text">Remove </span>'; // Меняем HTML содержимое при добавлении в избранное
              } else {
                localStorage.removeItem(keyInformationRecipet);
                button.style.backgroundColor = '#9bb537';
                heartIcon.classList.remove('heart-icon-toggle');
                button.innerHTML =
                  '<span class="button-text">Add to favorite</span>'; // Меняем HTML содержимое при удалении из избранного
              }
            });
          });

          ///////////////////////////
        })

        .catch(error => {
          console.error('Ошибка при получении данных:', error);
        });
    }
  });
}
