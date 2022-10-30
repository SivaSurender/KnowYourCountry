'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const errorHandler = function (errorMessage) {
  //rendering the dom with obtainer error message

  countriesContainer.insertAdjacentText('beforeend', errorMessage);
  // countriesContainer.style.opacity = 1;
};

const finalHtml = function (res, className = '') {
  const modifiedHTML = `<article class="country ${className}">
          <img class="country__img" src="${res.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${res.name.common}</h3>
         <h5 class="country__region">${res.region}</h5>
         <p class="country__row"><span>🏴󠁩󠁳󠀱󠁿</span>${res.capital}</p>
         <p class="country__row"><span>🗺️</span>${res.continents[0]}</p>
            <p class="country__row"><span>👫</span>${(
              +res.population / 1000000
            ).toFixed(1)} M People</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(res.languages)[0]
            }</p>
           
            <p class="country__row"><span>💰</span>${
              Object.values(Object.values(res.currencies)[0])[0]
            }</p>
          </div>
        </article>`;

  // appending the modifies HTML to DOM

  countriesContainer.insertAdjacentHTML('beforeend', modifiedHTML);
  // countriesContainer.style.opacity = 1;
};

const getJson = function (url) {
  return fetch(url).then(res => res.json());
};

const KnowYourCountry = function (country) {
  // const response = fetch(`https://restcountries.com/v3.1/name/${country}`);

  // // handling the promise

  // response
  //   .then(oPOfRes => oPOfRes.json())
  getJson(`https://restcountries.com/v3.1/name/${country}`)
    .then(([dat]) => {
      finalHtml(dat);
      const neighbour = dat.borders?.[0];
      console.log(neighbour);

      // return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
      return getJson(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    // .then(res => res.json())
    .then(finalres => finalHtml(finalres[0], 'neighbour'))
    .catch(error => errorHandler(`Sorry something went wrong due to ${error}`))
    .finally(() => {
      // finally block happens no matter what
      countriesContainer.style.opacity = 1;
    });
};

//adding button element

btn.addEventListener('click', function () {
  KnowYourCountry('India');
});
