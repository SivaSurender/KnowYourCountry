'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
  countriesContainer.style.opacity = 1;
};

const KnowYourCountry = function (country) {
  const response = fetch(`https://restcountries.com/v3.1/name/${country}`);

  // handling the promise

  response
    .then(oPOfRes => oPOfRes.json())
    .then(([dat]) => {
      finalHtml(dat);
      const neighbour = dat.borders?.[0];
      console.log(neighbour);

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(res => res.json())
    .then(finalres => finalHtml(finalres[0], 'neighbour'));
};

KnowYourCountry('Sri lanka');
