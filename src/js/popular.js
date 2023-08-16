import apiTastyTreats from './api.js';

const tastyTreats = new apiTastyTreats();

tastyTreats
  .getPopularRecipers()
  .then(datas => {
    const popular = datas;

    const displayPlatzPop = document.querySelector('.popular-container');
    displayPlatzPop.innerHTML = '';

    popular.forEach(data => {
      const descriptionPop = data.description;
      const popularityPop = data.popularity;
      const previewPop = data.preview;
      const titlePop = data.title;
      const _idPop = data._id;

      // Create a new card element for each book
      const cardPop = document.createElement('div');
      cardPop.classList.add('popular-card');

      //https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg

      cardPop.innerHTML = `   
      
        <div class="pop-klein-container">
        <div><img class="popular-image" src="${previewPop}" height="48" width="48" alt="${titlePop}"></div>
        <div class="pop-recht-teil">
        <h3 class="popular-name">${titlePop}</h3>
        <p class="popular-descr">${descriptionPop}</p>
        </div>
        </div>
      `;
      // Append the book card to the container
      displayPlatzPop.appendChild(cardPop); //
    });
  })
  .catch(error => {
    console.error('Ошибка при получении данных:', error);
  });

//<img class="popular-image" src="${previewPop}" height="48" width="48" alt="${titlePop}"></img>
