import renderNavigation from './components/nav.js';
import endpoints from './modules/endpoints.js';

// -- variables
// -- DOM elements
const allModelsOutput = document.querySelector('#all-models-output');
const modelsCountOutput = document.querySelector('#models-count-output');

// -- functions
const renderModels = () => {
  return fetch(endpoints().MODELS)
    .then((res) => res.json())
    .then((data) => {
      allModelsOutput.innerHTML = data.reduce((total, currentModel) => {
        total += `
        <tr>
            <td>${currentModel._id}</td>
            <td>${currentModel.name}</td>
            <td>${currentModel.hour_price}</td>
        </tr>
        `;
        return total;
      }, '');
    });
};

const renderModelsCount = () => {
  return fetch(endpoints().MODELSCOUNT)
    .then((res) => res.json())
    .then((data) => {
      modelsCountOutput.innerHTML = data.reduce((total, currentModel) => {
        total += `
        <tr>
            <td>${currentModel.name}</td>
            <td>${currentModel.vehiclesCount}</td>
        </tr>
        `;
        return total;
      }, '');
    });
};

// -- events
document.addEventListener('DOMContentLoaded', () => {
  renderNavigation();
  renderModels();
  renderModelsCount();
});
