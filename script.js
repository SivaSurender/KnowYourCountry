'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// the vintage way
const getMyCountryData = function (countryName) {
  const myFirstAJAXviaXML = new XMLHttpRequest();
  myFirstAJAXviaXML.open(
    'GET',
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  myFirstAJAXviaXML.send();

  // making it async via event listener

  myFirstAJAXviaXML.addEventListener('load', function () {
    const res = JSON.parse(myFirstAJAXviaXML.responseText)[0];

    console.log(res);
    console.log(res.capital[0]);

    const modifiedHTML = `<article class="country">
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
  });
};

getMyCountryData('USA');
