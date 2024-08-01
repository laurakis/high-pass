'use strict';

// табы проектов
function projectsTabs(tabsParentSelector) {
  const tabs = document.querySelector(tabsParentSelector);
  const tabBtns = tabs.querySelectorAll('.projects__tab');
  const projectsHolders = document.querySelectorAll('.projects__holder');
  tabs.addEventListener('click', (e) => {
    const target = e.target;
    const index = Array.from(tabBtns).indexOf(target);
    if (target.matches('.projects__tab')) {
      showElem(projectsHolders, 'projects__holder_active', index);
      showElem(tabBtns, 'projects__tab_active', index);
    }
  });
}

projectsTabs('.projects__tabs_desk');
projectsTabs('.projects__tabs_mobile');
