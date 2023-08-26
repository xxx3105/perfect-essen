'use strict';
import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

export default class apiTastyTreats {
  constructor(
    name,
    phone,
    email,
    comment,
    rate,

    category,
    page,
    limit,
    area,
    ingredients,
    time
  ) {
    this.page = 1;
    this.limit = 9;
    this.area = '';
    this.ingredients = '';
    this.time = '';

    this._id = null;
    this.title = null;
    this.categories = null;
    this.instructions = null;
    this.description = null;
    this.thumb = null;
    this.preview = null;
    this.youtube = null;
    this.tags = null;
    this.rating = null;
    this.popularity = null;

    ///order

    this.name = name;
    this.phone = phone;
    this.email = email;
    this.comment = comment;
    this.rate = rate;
  }
  getRecipes() {
    return fetch(`${BASE_URL}/recipes`)
      .then(response => response.json())
      .catch(error => {
        console.log(`Error in getRecipes!`);
      });
  }

  getDetailInformation() {
    return fetch(`${BASE_URL}/recipes?page=${this.page}&limit=${this.limit}`)
      .then(response => response.json())
      .catch(error => {
        console.log(`Error in getDetailInformation!`);
      });
  }

  getDetailInformationParam(category, page, limit, area, ingredients, time) {
    return fetch(
      `${BASE_URL}/recipes?category=${category}&page=${page}&limit=${limit}&time=${time}&area=${area}&ingredient=${ingredients}`
    )
      .then(response => response.json())
      .catch(error => {
        console.log(`Error in getDetailInformationParam!`);
      });
  }

  getPopularRecipers() {
    return fetch(`${BASE_URL}/recipes/popular`)
      .then(response => response.json())
      .catch(error => {
        console.log(`Error in getPopularRecipers!`);
      });
  }

  getId(_id) {
    return fetch(`${BASE_URL}/recipes/${_id}`)
      .then(response => response.json())
      .catch(error => {
        console.log(`Error in getId!`);
      });
  }

  getAreas() {
    return fetch(`${BASE_URL}/areas`)
      .then(response => response.json())
      .catch(error => {
        console.log(`Error in getAreas!`);
      });
  }
  getCat() {
    return fetch(`${BASE_URL}/categories`)
      .then(response => response.json())
      .catch(error => {
        console.log(`Error in getCat!`);
      });
  }

  getEvents() {
    return fetch(`${BASE_URL}/events`)
      .then(response => response.json())
      .catch(error => {
        console.log(`Error in getEvents!`);
      });
  }

  getIngridients() {
    return fetch(`${BASE_URL}/ingredients`)
      .then(response => response.json())
      .catch(error => {
        console.log(`Error in getIngridients!`);
      });
  }

  postNewOrder() {
    const newOrder = {
      name: `${this.name}`,
      phone: `${this.phone}`,
      email: `${this.email}`,
      comment: `${this.comment}`,
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    };

    fetch(`${BASE_URL}/orders/add`, options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log(`Order was sent!`);
      })
      .catch(error => {
        console.error('Error postNewOrder', error);
      });
  }

  sendRating(email, rate, _id) {
    //   const newRating = {
    //             "email": `${this.email}`,
    //             "rate": `${this.rate}`,
    //         }

    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        rate: rate,
      }),
    };

    fetch(`${BASE_URL}/recipes/${_id}/rating`, options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log(`Thank you for your opinion!`);
      })
      .catch(error => {
        console.error('Error sendRating', error);
      });
  }
}

const tastyTreatsApi = new apiTastyTreats();

// tastyTreatsApi.getRecipes().then(recipes => {
//   console.log(recipes);
// });

// tastyTreatsApi.getDetailInformation().then(detailInfo => {
//   console.log(detailInfo);
// });

//page, limit, area, ingredient, time;

// let currentPage = '';
// let itemsPageLimit = '';
// let foodArea = '';
// let ingrId = '';
// let timeOptions = '';

// tastyTreatsApi
//   .getDetailInformationParam(
//     currentPage,
//     itemsPageLimit,
//     foodArea,
//     ingrId,
//     timeOptions
//   )
//   .then(detailInfo => {
//     console.log(detailInfo);
//   });

// let currentPage = '1';
// let itemsPageLimit = '10';
// let foodArea = '';
// let ingrId = '640c2dd963a319ea671e376c';
// let timeOptions = '';

// tastyTreatsApi
//   .getDetailInformationParam(
//     currentPage,
//     itemsPageLimit,
//     foodArea,
//     ingrId,
//     timeOptions
//   )
//   .then(detailInfo => {
//     console.log(detailInfo);
//   });

////////////////////////////////
// let ingrId = '640c2dd963a319ea671e376c';

// tastyTreatsApi.getDetailInformationParam('', ingrId, '').then(detailInfo => {
//   console.log(detailInfo);
// });
/////////////////////////////

// tastyTreatsApi.getPopularRecipers()
//     .then(popularRec => { console.log(popularRec); });

//  tastyTreatsApi.getId(_id)
//     .then(recId => { console.log(recId); });

//  tastyTreatsApi.getAreas()
//     .then(infoAreas => { console.log(infoAreas); });

//  tastyTreatsApi.getCat()
//     .then(infoAreas => { console.log(infoAreas); });

// tastyTreatsApi.getEvents()
//     .then(infoEvents => { console.log(infoEvents); });

// tastyTreatsApi.getIngridients()
//     .then(infoIngrid => { console.log(infoIngrid); });

//SEND ORDER

// const newOrder = new apiTastyTreats("Ivan Susanin", "+380508696555", "hervpalto@gmail.com", "vse super");

// newOrder.postNewOrder()

//SEND RATING
// const newRating = new apiTastyTreats();
// newRating.sendRating(`hervgfasflto@gmail.com`, 5, _id);
