import renderNavigation from './components/nav.js';
import endpoints from './modules/endpoints.js';

// -- variables
// -- DOM elements
const vehiclestOutputElement = document.querySelector('#vehicles-output');
const countryFilterButtonsOutput = document.querySelector(
  '#country-filter-buttons'
);

// -- functions
const renderTable = (data) => {
  vehiclestOutputElement.innerHTML = data.reduce((total, currentVehickle) => {
    total += `
        <tr>
            <td>${currentVehickle.model_name}</td>
            <td>${currentVehickle.hour_price_with_PVM}</td>
            <td>${currentVehickle.number_plate}</td>
            <td>${currentVehickle.country_location}</td>
        </tr>
        `;
    return total;
  }, '');
};

const renderFilterButtons = (data) => {
  // -- getting and populating buttons by existing country
  const countryAllArray = data.map((item) => item.country_location);
  const uniqueCountriesSet = new Set(countryAllArray);
  const uniqueCountriesArray = [...uniqueCountriesSet];

  countryFilterButtonsOutput.innerHTML = uniqueCountriesArray.reduce(
    (total, currentCountry) => {
      total += `
        <button class="filter-by-country-btn" data-id=${currentCountry}>${currentCountry}</button>
        `;
      return total;
    },
    ''
  );

  // -- "show all" button creation + event
  const createShowAllBtn = document.createElement('button');
  createShowAllBtn.innerText = 'Show all';
  createShowAllBtn.setAttribute('id', 'showAllVehicklesBtn');
  countryFilterButtonsOutput.prepend(createShowAllBtn);

  createShowAllBtn.addEventListener('click', () => {
    renderTable(data);
  });

  // -- filter by country button events
  const filterBycountryBtns = document.querySelectorAll(
    '.filter-by-country-btn'
  );

  filterBycountryBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      //   let filteredData = data.filter((vehicle) => {
      //     return vehicle.country_location === e.target.dataset.id;
      //   });
      //   renderTable(filteredData);
      getDataByCountry(e);
    });
  });
};

const getData = () => {
  return fetch(endpoints().VEHICLES)
    .then((res) => res.json())
    .then((data) => {
      renderTable(data);
      renderFilterButtons(data);
    });
};

const getDataByCountry = (e) => {
  let country = e.target.dataset.id;
  return fetch(endpoints().VEHICLES + country)
    .then((res) => res.json())
    .then((data) => {
      renderTable(data);
    });
};

// -- events
document.addEventListener('DOMContentLoaded', () => {
  renderNavigation();
  getData();
});
