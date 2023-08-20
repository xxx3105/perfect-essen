import apiTastyTreats from './api.js';

const tastyTreats = new apiTastyTreats();

const sliderHero = document.querySelector('.swiper-wrapper');

//SLIDER HERO

tastyTreats
  .getEvents()
  .then(events => {
    events.map(event => event.cook);
    events.map(event => event.topic);

    //console.log(cookInfoEvents,topicInfoEvents);

    events.forEach(event => {
      const imgUrlC = event.cook.imgUrl;
      const imgWebpUrlC = event.cook.imgWebpUrl;
      const nameCookC = event.cook.name;

      const landKucheT = event.topic.area;
      const imgUrlT = event.topic.imgUrl;
      const imgWebpUrlT = event.topic.imgWebpUrl;
      const nameEventT = event.topic.name;
      const imgpreviewUrlT = event.topic.previewUrl;
      const imgpreviewWebpUrlT = event.topic.previewWebpUrl;

      // console.log(imgUrlC,imgWebpUrlC,nameCookC);
      //console.log(landKucheT, imgUrlT, imgWebpUrlT, nameEventT, imgpreviewUrlT, imgpreviewWebpUrlT);
      sliderCardCreator(
        imgUrlC,
        imgWebpUrlC,
        nameCookC,
        landKucheT,
        nameEventT,
        imgpreviewUrlT,
        imgpreviewWebpUrlT,
        imgUrlT,
        imgWebpUrlT
      );
    });
  })
  .catch(error => {
    console.error('Ошибка при получении событий:', error);
  });

function sliderCardCreator(
  scrmain,
  resscr,
  namecook,
  land,
  nameevent,
  centralimg,
  backupcentralimg,
  thirdimg,
  backupthirdimg
) {
  let cardsSlider = `
     <div class="swiper-slide"> 
      <ul class="slider-list">
        <li>
         <img
            class="slider-img-one"
            src="${scrmain}"
            alt="${namecook}"
            onerror="this.src='${resscr}'"
        />
        </li>
        <li class="slider-second-part">
          <img
            class="slider-img-two"
            src="${centralimg}"
            alt="${nameevent}"
            onerror="this.src='${backupcentralimg}'"
          />
          <h2 class="slider-food-descr">${nameevent}</h2>
          <p class="slider-country">${land}</p>
        </li>
        <li>
          <img
            class="slider-img-three"
            src="${thirdimg}"
            alt="${nameevent}"
            onerror="this.src='${backupthirdimg}'"
          />
        </li>
      </ul>
      </div>
    `;
  //placeForSliderElement.innerHTML += cardsSlider;
  // sliderHero.insertAdjacentHTML("beforeend", cardsSlider)
  sliderHero.innerHTML += cardsSlider;

  const swiper = new Swiper('.swiper', {
    spaceBetween: 20,
    slidesPerView: 0.8,
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
