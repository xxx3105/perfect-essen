import apiTastyTreats from './api.js';

const tastyTreats = new apiTastyTreats();

import { filterFoods } from './filters-cat-pop.js';

let pagCurrent = 1;

export function paginationHandler(lastPage) {
  //let pagCurrent = 1;
  let pagLasApi = lastPage;

  const colorButUnaktiv = '#9AB43750';
  const colorButAktiv = '#99B336';

  console.log(pagCurrent);

  const pagBeg = document.getElementById('pagination-begin');
  const pagPrev = document.getElementById('pagination-previous');
  const pagPrevNumb = document.getElementById('pagination-previous-numb');
  const pageAktualShowed = document.getElementById('pagination-first');
  const pagSec = document.getElementById('pagination-seccond');
  const pagNex = document.getElementById('pagination-next');
  const pagLas = document.getElementById('pagination-last');

  // const resetPagBut = document.getElementById('resetButton');
  // function resetPagination() {
  //   pagCurrent = 1;
  //   filterFoods(pagCurrent);
  //   pageAktualShowed.textContent = pagCurrent;

  //   pagSec.disabled = false;
  //   pagSec.style.pointerEvents = 'auto';
  //   pagSec.style.backgroundColor = colorButAktiv;
  //   pagSec.textContent = pagCurrent + 1;

  //   pagNex.disabled = false;
  //   pagNex.style.pointerEvents = 'auto';
  //   pagNex.style.backgroundColor = colorButAktiv;

  //   pagLas.disabled = false;
  //   pagLas.style.pointerEvents = 'auto';
  //   pagLas.style.backgroundColor = colorButAktiv;

  //   pagPrevNumb.textContent = 'X';
  //   pagPrevNumb.style.backgroundColor = colorButUnaktiv;
  //   pagPrevNumb.disabled = true;
  //   pagPrevNumb.style.pointerEvents = 'none';

  //   pagPrev.disabled = true;
  //   pagPrev.style.pointerEvents = 'none';
  //   pagPrev.style.backgroundColor = colorButUnaktiv;

  //   pagBeg.disabled = true;
  //   pagBeg.style.pointerEvents = 'none';
  //   pagBeg.style.backgroundColor = colorButUnaktiv;

  //   filterFoods(1);
  // }

  //resetPagBut.addEventListener('click', resetPagination);

  pageAktualShowed.style.color = 'white';
  pageAktualShowed.style.backgroundColor = 'black';
  pageAktualShowed.style.fontSize = '20px';

  pageAktualShowed.textContent = pagCurrent;
  pageAktualShowed.style.pointerEvents = 'none';
  pagSec.textContent = Number(pagCurrent) + 1;

  pagPrevNumb.textContent = 'X';
  pagPrevNumb.disabled = true;
  pagPrevNumb.style.backgroundColor = colorButUnaktiv;
  pagPrevNumb.style.pointerEvents = 'none';

  pagPrev.disabled = true;
  pagPrev.style.pointerEvents = 'none';
  pagPrev.style.backgroundColor = colorButUnaktiv;

  pagBeg.disabled = true;
  pagBeg.style.pointerEvents = 'none';
  pagBeg.style.backgroundColor = colorButUnaktiv;

  pagSec.style.backgroundColor = colorButAktiv;
  pagNex.style.backgroundColor = colorButAktiv;
  pagLas.style.backgroundColor = colorButAktiv;

  pagBeg.addEventListener('click', function () {
    pagCurrent = 1;
    filterFoods(pagCurrent);
    pageAktualShowed.textContent = pagCurrent;

    pagSec.disabled = false;
    pagSec.style.pointerEvents = 'auto';
    pagSec.style.backgroundColor = colorButAktiv;
    pagSec.textContent = pagCurrent + 1;

    pagNex.disabled = false;
    pagNex.style.pointerEvents = 'auto';
    pagNex.style.backgroundColor = colorButAktiv;

    pagLas.disabled = false;
    pagLas.style.pointerEvents = 'auto';
    pagLas.style.backgroundColor = colorButAktiv;

    pagPrevNumb.textContent = 'X';
    pagPrevNumb.style.backgroundColor = colorButUnaktiv;
    pagPrevNumb.disabled = true;
    pagPrevNumb.style.pointerEvents = 'none';

    pagPrev.disabled = true;
    pagPrev.style.pointerEvents = 'none';
    pagPrev.style.backgroundColor = colorButUnaktiv;

    pagBeg.disabled = true;
    pagBeg.style.pointerEvents = 'none';
    pagBeg.style.backgroundColor = colorButUnaktiv;
  });

  pagPrev.addEventListener('click', function () {
    if (pagCurrent > 1) {
      pagCurrent -= 1;
      filterFoods(pagCurrent);
      pageAktualShowed.textContent = pagCurrent;
      pagSec.disabled = false;

      pagSec.style.pointerEvents = 'auto';
      pagSec.style.backgroundColor = colorButAktiv;
      pagSec.textContent = pagCurrent + 1;
      pagPrevNumb.textContent = pagCurrent - 1;

      pagNex.disabled = false;
      pagNex.style.pointerEvents = 'auto';
      pagNex.style.backgroundColor = colorButAktiv;

      pagLas.disabled = false;
      pagLas.style.pointerEvents = 'auto';
      pagLas.style.backgroundColor = colorButAktiv;
    }
    if (pagCurrent === pagLasApi - 1) {
      pagSec.style.backgroundColor = colorButAktiv;
    }
    if (pagCurrent <= 1) {
      pagPrevNumb.textContent = 'X';
      pagPrevNumb.disabled = true;
      pagPrevNumb.style.backgroundColor = colorButUnaktiv;

      pagPrev.disabled = true;
      pagPrev.style.pointerEvents = 'none';
      pagPrev.style.backgroundColor = colorButUnaktiv;

      pagBeg.disabled = true;
      pagBeg.style.pointerEvents = 'none';
      pagBeg.style.backgroundColor = colorButUnaktiv;
    }
  });

  pagPrevNumb.addEventListener('click', function () {
    if (pagCurrent > 1) {
      pagCurrent -= 1;
      filterFoods(pagCurrent);
      pageAktualShowed.textContent = pagCurrent;
      pagSec.disabled = false;

      pagSec.style.pointerEvents = 'auto';
      pagSec.style.backgroundColor = colorButAktiv;
      pagSec.textContent = pagCurrent + 1;
      pagPrevNumb.textContent = pagCurrent - 1;

      pagNex.disabled = false;
      pagNex.style.pointerEvents = 'auto';
      pagNex.style.backgroundColor = colorButAktiv;

      pagLas.disabled = false;
      pagLas.style.pointerEvents = 'auto';
      pagLas.style.backgroundColor = colorButAktiv;
    }

    if (pagCurrent === 1) {
      pagBeg.disabled = true;
      pagBeg.style.pointerEvents = 'none';
      pagBeg.style.backgroundColor = colorButUnaktiv;
      pagPrev.disabled = true;
      pagPrev.style.pointerEvents = 'none';
      pagPrev.style.backgroundColor = colorButUnaktiv;
      pagPrevNumb.textContent = 'X';
      pagPrevNumb.style.backgroundColor = colorButUnaktiv;
      pagPrevNumb.disabled = true;
      pagPrevNumb.style.pointerEvents = 'none';
      pagSec.disabled = false; ///
      pagSec.style.pointerEvents = 'auto';
    }
  });

  pagSec.addEventListener('click', function () {
    if (pagCurrent === pagLasApi - 1) {
      pagSec.disabled = true;
      pagSec.style.pointerEvents = 'none';
      pagSec.style.backgroundColor = colorButUnaktiv;
      pagSec.textContent = 'X';
    }
    pagCurrent += 1;
    filterFoods(pagCurrent);
    pageAktualShowed.textContent = pagCurrent;
    pagSec.textContent = pagCurrent + 1;
    pagPrevNumb.disabled = false;
    pagPrevNumb.style.pointerEvents = 'auto';
    pagPrevNumb.style.backgroundColor = colorButAktiv;
    pagPrevNumb.textContent = pagCurrent - 1;

    pagPrev.disabled = false;
    pagPrev.style.pointerEvents = 'auto';
    pagPrev.style.backgroundColor = colorButAktiv;

    pagBeg.disabled = false;
    pagBeg.style.pointerEvents = 'auto';
    pagBeg.style.backgroundColor = colorButAktiv;

    if (pagCurrent === pagLasApi) {
      pagSec.textContent = 'X';
      pagPrevNumb.textContent = pagCurrent - 1;

      pagNex.disabled = true;
      pagNex.style.pointerEvents = 'none';
      pagNex.style.backgroundColor = colorButUnaktiv;

      pagLas.disabled = true;
      pagLas.style.pointerEvents = 'none';
      pagLas.style.backgroundColor = colorButUnaktiv;
    }
  });

  pagNex.addEventListener('click', function () {
    if (pagCurrent < pagLasApi) {
      pagCurrent += 1;
      filterFoods(pagCurrent);
      pageAktualShowed.textContent = pagCurrent;
      pagPrevNumb.disabled = false;
      pagPrevNumb.style.pointerEvents = 'auto';

      if (pagCurrent === pagLasApi) {
        pagPrevNumb.textContent = pagCurrent - 1;
        pagPrevNumb.disabled = false;
        pagPrevNumb.style.pointerEvents = 'auto';

        pagSec.textContent = 'X';
        pagSec.disabled = true;

        pagNex.disabled = true;
        pagNex.style.pointerEvents = 'none';
        pagNex.style.backgroundColor = colorButUnaktiv;

        pagSec.disabled = true;
        pagSec.style.pointerEvents = 'none';
        pagSec.style.backgroundColor = colorButUnaktiv;

        pagLas.disabled = true;
        pagLas.style.pointerEvents = 'none';
        pagLas.style.backgroundColor = colorButUnaktiv;
      } else {
        pagSec.textContent = pagCurrent + 1;

        pagPrevNumb.textContent = pagCurrent - 1;
        pagPrevNumb.disabled = false;
        pagPrevNumb.style.backgroundColor = colorButAktiv;

        pagPrev.disabled = false;
        pagPrev.style.pointerEvents = 'auto';
        pagPrev.style.backgroundColor = colorButAktiv;

        pagBeg.disabled = false;
        pagBeg.style.pointerEvents = 'auto';
        pagBeg.style.backgroundColor = colorButAktiv;
      }
    }
  });

  pagLas.addEventListener('click', function () {
    pagCurrent = pagLasApi;
    filterFoods(pagCurrent);
    pageAktualShowed.textContent = pagCurrent;

    pagPrevNumb.disabled = false;
    pagPrevNumb.textContent = pagCurrent - 1;
    pagPrevNumb.style.pointerEvents = 'auto';
    pagPrevNumb.style.backgroundColor = colorButAktiv;

    pagSec.disabled = true;
    pagSec.style.pointerEvents = 'none';
    pagSec.style.backgroundColor = colorButUnaktiv;
    pagSec.textContent = 'X';

    pagNex.disabled = true;
    pagNex.style.pointerEvents = 'none';
    pagNex.style.backgroundColor = colorButUnaktiv;

    pagLas.disabled = true;
    pagLas.style.pointerEvents = 'none';
    pagLas.style.backgroundColor = colorButUnaktiv;

    pagPrev.disabled = false;
    pagPrev.style.pointerEvents = 'auto';
    pagPrev.style.backgroundColor = colorButAktiv;

    pagBeg.disabled = false;
    pagBeg.style.pointerEvents = 'auto';
    pagBeg.style.backgroundColor = colorButAktiv;
  });
}
