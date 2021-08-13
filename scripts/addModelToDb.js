import renderNavigation from './components/nav.js';
import endpoints from './modules/endpoints.js';

// -- variables
const addModelFormElement = document.querySelector('#add-vehicle-model-form');

// -- functions
const addModelToDb = (e) => {
  e.preventDefault();

  // -- editing user price input (changing comma to dot)
  let priceValue = e.target.vehiclePricePerHour.value;
  priceValue = priceValue.replace(/,/g, '.');

  let newModel = {
    name: e.target.vehicleModelName.value,
    hour_price: +priceValue,
  };

  return fetch(endpoints().MODELS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newModel),
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.message);
      if (data.status === 'success') {
        swal('Good job!', data.message, 'success');
      } else if (data.status === 'error') {
        swal('Something went wrong', data.message, 'error');
      }
      addModelFormElement.reset();
    })
    .catch((err) => console.log(err.message));
};

// -- events
document.addEventListener('DOMContentLoaded', (e) => {
  renderNavigation();
});
addModelFormElement.addEventListener('submit', addModelToDb);
