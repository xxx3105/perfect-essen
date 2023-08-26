import Swiper from 'swiper';
import 'swiper/css';

import './js/api';
import './js/filters-cat-pop';
import './js/header';
import './js/hero';
import './js/popular';
import './js/recipe-kart';
import './js/favorits';
import './js/pagination';

//Замена ссылок на имж
//<!-- /////way for Vite bag with img links for non-created objects -->

const useElement = document.querySelector('#svg-way use');
export const hrefValue = useElement.getAttribute('href');
