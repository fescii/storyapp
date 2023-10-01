const tabs = document.querySelectorAll('body > main.main > section.sidebar > .menu > ul.menu-items > li.item')
let activeTab = document.querySelector('body > main.main > section.sidebar > .menu > ul.menu-items > li.item.active')
const contentContainer = document.querySelector('body > main.main > section.content > #content-container')

if (tabs && contentContainer && activeTab) {
  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()

      activeTab.classList.remove('active')
      tab.classList.add('active')
      activeTab = tab

      populateContent(contentContainer, tab.dataset.name)
    })
  })
}


const populateContent = (contentContainer, tab) => {
  switch (tab) {
    case 'overview':
      contentContainer.innerHTML = `
        <stat-container bookings="163" date="Sep 23" completed="57" upcoming="33" cancelled="8" visitors="1,400"
          interactions="1,360">
        </stat-container>
      `
      break;
    case 'people':
      contentContainer.innerHTML = `
        <people-container url="some-link">
        </people-container>
      `
      break;
    case 'schedules':
      contentContainer.innerHTML = `
        <schedule-container url="some-link">
        </schedule-container>
      `
      break;
    case 'bookings':
      contentContainer.innerHTML = `
        <booking-container url="some-link" >
        </booking-container>
      `
      break;
    case 'settings':
      contentContainer.innerHTML = `
        <stat-container bookings="163" date="Sep 23" completed="57" upcoming="33" cancelled="8" visitors="1,400"
          interactions="1,360">
        </stat-container>
      `
      break;
    case 'portfolio':
      contentContainer.innerHTML = `
        <portfolio-container url="some-link" >
        </portfolio-container>
      `
      break;
    case 'logout':
      contentContainer.innerHTML = `
       Logout
      `
      break;
    default:
      break;
  }
}