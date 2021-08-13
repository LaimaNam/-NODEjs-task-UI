import renderNavigation from './components/nav.js';
import endpoints from './modules/endpoints.js';

// -- variables
const addVehicleFormElement = document.querySelector('#add-vehicle-form');
const vehicleModelSelect = document.querySelector('#select-vehicle-model');

// -- logic
let vehicleModelId;

// -- functions
const addModelDataToSelectElement = () => {
  return fetch(endpoints().MODELS).then((res) => {
    res.json().then((data) => {
      let selectOptions = data.reduce((total, currentModel) => {
        total += `
        <option value="${currentModel._id}">${currentModel.name}</option>
            `;
        return total;
      }, '');

      vehicleModelSelect.innerHTML = selectOptions;

      if (data.length > 0) {
        vehicleModelId = data[0]._id;
      } else {
        vehicleModelId = undefined;
      }
    });
  });
};

const changeModelId = (e) => (vehicleModelId = e.target.value);

const addVehicleToDb = (e) => {
  e.preventDefault();

  let newVehicle = {
    model_id: vehicleModelId,
    number_plate: e.target.vehicleNumberPlate.value,
    country_location: e.target.vehicleCountryLocation.value,
  };

  return fetch(endpoints().VEHICLES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newVehicle),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'success') {
        swal('Good job!', data.message, 'success');
      } else if (data.status === 'error') {
        swal('Something went wrong', data.message, 'error');
      }
      addVehicleFormElement.reset();
    })
    .catch((err) => console.log(err));
};

//-- events
document.addEventListener('DOMContentLoaded', () => {
  addModelDataToSelectElement();
  renderNavigation();
});
addVehicleFormElement.addEventListener('submit', addVehicleToDb);
vehicleModelSelect.addEventListener('change', changeModelId);
