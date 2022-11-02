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
  return fetch(url).then(res => {
    // console.log(res);
    if (!res.ok) {
      throw new Error(`${res.status} Entered Country does not exist🤐`);
    }
    return res.json();
  });
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
      console.log();
      if (!neighbour) {
        throw new Error(`This Country doesn't have a neighbour 😅`);
      }

      // return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
      return getJson(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    // .then(res => res.json())
    .then(finalres => finalHtml(finalres[0], 'neighbour'))
    .catch(error => errorHandler(`Oops there's been an ${error}`))
    .finally(() => {
      // finally block happens no matter what
      countriesContainer.style.opacity = 1;
    });
};

// calculating latitude and longitude of current location with geolocation web api
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => {
  const { latitude, longitude } = pos.coords;
  console.log(latitude, longitude);
});

// exercise

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);

      return fetch(
        `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${latitude}&lon=${longitude}&zoom=10`
      );
    })
    .then(res => res.json())
    .then(final => {
      const { city, country } = final?.features[0]?.properties?.address;

      if (!country) {
        throw new Error('Enetered co-ordinates are not valid');
      }

      // countriesContainer.insertAdjacentText(
      //   'beforeend',
      //   `Hey there!, you're in ${city}, ${country}`
      // );
      return country;
    })
    .then(count => KnowYourCountry(count))
    .catch(error => console.log(error));
  btn.style.display = 'none';
};

// const getPosition = navigator.geolocation.getCurrentPosition(
//   pos => {
//     const { latitude, longitude } = pos.coords;

//     return latitude, longitude;
//   },
//   error => console.log(error)
// );

//adding button element and event listener

// once true= running the click even only once
btn.addEventListener('click', whereAmI, { once: true });
