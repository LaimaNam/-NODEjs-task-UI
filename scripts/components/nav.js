const renderNavigation = () => {
  // -- variables
  const header = document.querySelector('header');

  header.innerHTML = `
  <div class="header-wrapper">
      <div class="logo">LOGO</div>
      <nav>
        <ul>
          <li><a href=${
            location.href.includes('pages') ? '../index.html' : './index.html'
          }>Home</a></li>
          <li><a href=${
            location.href.includes('pages')
              ? './addModel.html'
              : './pages/addModel.html'
          }>Add model</a></li>
          <li><a href=${
            location.href.includes('pages')
              ? './addVehicle.html'
              : './pages/addVehicle.html'
          }>Add vehicle</a></li>
          <li><a href=${
            location.href.includes('pages')
              ? './viewModels.html'
              : './pages/viewModels.html'
          }>View models</a></li>
          <li><a href=${
            location.href.includes('pages')
              ? './viewVehicles.html'
              : './pages/viewVehicles.html'
          }>View vehicles</a></li>
        </ul>
      </nav>
  </div>
`;
};

export default renderNavigation;
