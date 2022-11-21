import Notifix from 'notiflix';
import _ from 'lodash';
import getData from './getData';
import './css/styles.css';
const LINK = 'https://restcountries.com/v3.1/name/?fullText=false';

const DEBOUNCE_DELAY = 300;
const COUNTRY_INPUT = document.getElementById('search-box');
const COUNTRY_LIST = document.querySelector('.country-list');
const COUNTRY_INFO = document.querySelector('.country-info');

COUNTRY_LIST.style.listStyle = 'none';
COUNTRY_LIST.style.padding = '0';

const getCountries = event => {
  COUNTRY_LIST.innerHTML = '';
  COUNTRY_INFO.innerHTML = '';
  const countryName = event.target.value.trim();
  if (!countryName) {
    return;
  }
  getData(`https://restcountries.com/v3.1/name/${countryName}?fullText=false`)
    .then(countries => {
      if (countries.length >= 10) {
        Notifix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (countries.length > 1) {
        COUNTRY_INFO.innerHTML = '';
        const countryElements = countries
          .map(
            country =>
              `<li><img src='${country.flags.svg}' width="20"> ${country.name.official}</li>`
          )
          .join('');
        COUNTRY_LIST.innerHTML = countryElements;
        return;
      }
      COUNTRY_LIST.innerHTML = '';
      const [country] = countries;
      COUNTRY_INFO.innerHTML = `<div><img src='${
        country.flags.svg
      }' width="40"> <span style='font-size: 30px'>${
        country.name.official
      }</span></div>
      <div><b>Capital:</b> ${country.capital}</div>
      <div><b>Population:</b> ${country.population}</div>
      <div><b>Languages:</b> ${Object.values(country.languages).join(
        ', '
      )}</div>`;
      console.log(country.languages);
    })
    .catch(error => Notifix.Notify.failure(error.message));
};

COUNTRY_INPUT.addEventListener(
  'input',
  _.debounce(getCountries, DEBOUNCE_DELAY)
);
