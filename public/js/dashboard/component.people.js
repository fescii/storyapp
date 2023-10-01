export default class PeopleContainer extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();

    // lets create our shadow root
    this.shadowObj = this.attachShadow({ mode: 'open' });

    this.render();
  }


  render() {
    this.shadowObj.innerHTML = this.getTemplate();
    // this.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    // console.log('We are inside connectedCallback');

    this.switchTabs()
  }


  switchTabs() {
    const tabs = this.shadowObj.querySelectorAll('.header > span.option')
    let activeTab = this.shadowObj.querySelector('.header > span.option.active')
    const contentContainer = this.shadowObj.querySelector('#content-container')
    if (tabs && contentContainer) {
      tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          e.preventDefault()
          e.stopPropagation()

          activeTab.classList.remove('active')
          tab.classList.add('active')
          activeTab = tab

          switch (tab.dataset.name) {
            case 'people':
              contentContainer.innerHTML = this.getPeople()
              break;
            case 'add':
              contentContainer.innerHTML = this.addPerson()
              break;
            default:
              contentContainer.innerHTML = this.getPeople()
              break;
          }
        })
      });
    }
  }


  getTemplate() {
    // Show HTML Here
    return `
      ${this.getBody()}
      ${this.getStyles()}
    `
  }

  getBody() {
    return `
      ${this.getHeader()}
        
      <div id="content-container" class="content">
        ${this.getPeople()}
      </div>
     
    `
  }

  getHeader() {
    return `
      <div class="header">
        <span class="option active" data-name="people">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9729 12.1402H11.9989C14.5359 12.1402 16.5999 10.0772 16.5999 7.54116C16.5999 5.00416 14.5359 2.94116 11.9989 2.94116C9.46294 2.94116 7.39894 5.00416 7.39894 7.53916C7.39294 10.0682 9.44294 12.1322 11.9729 12.1402ZM8.89894 7.54116C8.89894 5.83216 10.2899 4.44116 11.9989 4.44116C13.7089 4.44116 15.0999 5.83216 15.0999 7.54116C15.0999 9.25016 13.7089 10.6402 11.9989 10.6402H11.9749C10.2739 10.6342 8.89494 9.24516 8.89894 7.54116Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.24316 17.8573C5.24316 21.0593 10.3282 21.0593 11.9992 21.0593C13.6702 21.0593 18.7552 21.0593 18.7552 17.8403C18.7552 15.4133 15.7252 13.4373 11.9992 13.4373C8.27316 13.4373 5.24316 15.4193 5.24316 17.8573ZM6.74316 17.8573C6.74316 16.4793 8.99116 14.9373 11.9992 14.9373C15.0072 14.9373 17.2552 16.4703 17.2552 17.8403C17.2552 19.2613 14.3962 19.5593 11.9992 19.5593C9.60216 19.5593 6.74316 19.2643 6.74316 17.8573Z" fill="black"/>
            <path d="M18.3897 11.0827C18.0577 11.0827 17.7547 10.8617 17.6647 10.5267C17.5577 10.1267 17.7957 9.71574 18.1957 9.60774C19.1327 9.35674 19.7877 8.50274 19.7877 7.53074C19.7877 6.51374 19.0677 5.62774 18.0737 5.42574C17.6677 5.34274 17.4067 4.94574 17.4887 4.53974C17.5727 4.13474 17.9667 3.87874 18.3737 3.95474C20.0627 4.29974 21.2877 5.80374 21.2877 7.53074C21.2877 9.18074 20.1757 10.6307 18.5837 11.0577C18.5187 11.0747 18.4527 11.0827 18.3897 11.0827Z" fill="black"/>
            <path d="M20.1912 17.3993C20.2732 17.7453 20.5802 17.9773 20.9202 17.9773C20.9782 17.9773 21.0352 17.9703 21.0932 17.9573C22.1642 17.7053 22.9732 16.7503 22.9732 15.7373C22.9732 14.1663 21.0662 12.7363 18.9712 12.7363C18.5572 12.7363 18.2212 13.0723 18.2212 13.4863C18.2212 13.9003 18.5572 14.2363 18.9712 14.2363C20.4412 14.2363 21.4732 15.2093 21.4732 15.7373C21.4732 15.9843 21.2222 16.3863 20.7492 16.4973C20.3462 16.5923 20.0962 16.9963 20.1912 17.3993Z" fill="black"/>
            <path d="M5.61143 11.0827C5.54843 11.0827 5.48243 11.0747 5.41843 11.0577C3.82443 10.6317 2.71143 9.18174 2.71143 7.53074C2.71143 5.80374 3.93743 4.29974 5.62643 3.95474C6.03343 3.87874 6.42843 4.13474 6.51143 4.53974C6.59343 4.94574 6.33243 5.34274 5.92643 5.42574C4.93243 5.62774 4.21143 6.51374 4.21143 7.53074C4.21143 8.50274 4.86643 9.35674 5.80443 9.60774C6.20543 9.71574 6.44243 10.1267 6.33643 10.5257C6.24643 10.8617 5.94343 11.0827 5.61143 11.0827Z" fill="black"/>
            <path d="M2.90686 17.9573C2.96486 17.9713 3.02186 17.9773 3.07986 17.9773C3.41986 17.9773 3.72686 17.7453 3.80886 17.3993C3.90386 16.9963 3.65386 16.5913 3.25086 16.4973C2.77786 16.3863 2.52686 15.9843 2.52686 15.7373C2.52686 15.2093 3.55886 14.2363 5.02886 14.2363C5.44286 14.2363 5.77886 13.9003 5.77886 13.4863C5.77886 13.0723 5.44286 12.7363 5.02886 12.7363C2.93386 12.7363 1.02686 14.1663 1.02686 15.7373C1.02686 16.7503 1.83586 17.7063 2.90686 17.9573Z" fill="black"/>
          </svg>
          <span class="text">People</span>
        </span>
        <span class="option" data-name="add">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22.0001C4.617 22.0001 2 19.3831 2 12.0001C2 4.61712 4.617 2.00012 12 2.00012C12.414 2.00012 12.75 2.33612 12.75 2.75012C12.75 3.16412 12.414 3.50012 12 3.50012C5.486 3.50012 3.5 5.48612 3.5 12.0001C3.5 18.5141 5.486 20.5001 12 20.5001C18.514 20.5001 20.5 18.5141 20.5 12.0001C20.5 11.5861 20.836 11.2501 21.25 11.2501C21.664 11.2501 22 11.5861 22 12.0001C22 19.3831 19.383 22.0001 12 22.0001Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2365 9.38606L20.2952 8.19072C21.4472 6.88972 21.3252 4.89472 20.0252 3.74172C19.3952 3.18372 18.5812 2.90372 17.7452 2.95572C16.9052 3.00672 16.1352 3.38272 15.5772 4.01272L9.6932 10.6607C7.8692 12.7187 9.1172 15.4397 9.1712 15.5547C9.2602 15.7437 9.4242 15.8877 9.6232 15.9497C9.6802 15.9687 10.3442 16.1717 11.2192 16.1717C12.2042 16.1717 13.4572 15.9127 14.4092 14.8367L19.0774 9.56571C19.1082 9.54045 19.1374 9.51238 19.1646 9.4815C19.1915 9.45118 19.2155 9.41925 19.2365 9.38606ZM10.4082 14.5957C11.0352 14.7097 12.4192 14.8217 13.2862 13.8427L17.5371 9.04299L15.0656 6.85411L10.8172 11.6557C9.9292 12.6567 10.2122 13.9917 10.4082 14.5957ZM16.0596 5.73076L18.5322 7.91938L19.1722 7.19672C19.7752 6.51472 19.7122 5.46872 19.0312 4.86572C18.7002 4.57372 18.2712 4.42472 17.8362 4.45272C17.3962 4.48072 16.9932 4.67672 16.7002 5.00672L16.0596 5.73076Z" fill="black"/>
          </svg>
          <span class="text">Add</span>
        </span>
      </div>
    `
  }


  getPeople() {
    return `
      <div class="person">
        <div class="head">
          <div class="profile">
            <img src="img/explore/by/femar.jpg" alt="Profile">
          </div>
          <div class="info">
            <h4 class="name">Fredrick Ochieng</h4>
            <span class="role">Creative Director</span>
          </div>
        </div>
        <div class="socials">
          <a href="mailto:isfescii@gmail.com" class="social">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.84434 9.53351C6.20034 9.95451 9.39134 13.6525 12.0113 13.6525C14.6343 13.6525 17.7933 9.95151 18.1443 9.52951C18.4093 9.21251 18.3663 8.73951 18.0493 8.47451C17.7293 8.20951 17.2583 8.25251 16.9923 8.56951C15.8363 9.95451 13.4613 12.1525 12.0113 12.1525C10.5593 12.1525 8.16234 9.95251 6.99134 8.56651C6.72434 8.24951 6.25134 8.20951 5.93534 8.47651C5.61834 8.74351 5.57834 9.21651 5.84434 9.53351Z"  fill="black" />
              <path fill-rule="evenodd" clip-rule="evenodd"  d="M1.72656 12.0001C1.72656 19.2851 4.41556 21.8671 11.9996 21.8671C19.5846 21.8671 22.2736 19.2851 22.2736 12.0001C22.2736 4.71506 19.5846 2.13306 11.9996 2.13306C4.41556 2.13306 1.72656 4.71506 1.72656 12.0001ZM3.22656 12.0001C3.22656 5.58806 5.27656 3.63306 11.9996 3.63306C18.7236 3.63306 20.7736 5.58806 20.7736 12.0001C20.7736 18.4121 18.7236 20.3671 11.9996 20.3671C5.27656 20.3671 3.22656 18.4121 3.22656 12.0001Z" fill="black" />
            </svg>
          </a>
          <a href="tel:+254713253018" class="social">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25917 3.23499C6.17317 3.23499 6.08617 3.24299 5.99817 3.25699C4.88017 3.44599 3.87317 4.74999 3.66517 5.08899C2.62317 6.55399 3.43717 9.95099 8.73917 15.254C14.0432 20.557 17.4402 21.369 18.8512 20.364C19.2452 20.12 20.5472 19.117 20.7362 17.997C20.8182 17.51 20.6732 17.048 20.2942 16.586C18.0772 13.894 17.3752 14.235 16.4082 14.706C14.9522 15.416 13.5302 15.789 10.8672 13.127C8.20818 10.466 8.57917 9.04399 9.28817 7.58699C9.76017 6.61799 10.1012 5.91799 7.40617 3.69799C7.02917 3.38799 6.65118 3.23499 6.25917 3.23499ZM17.5122 22.264C15.5302 22.264 12.3922 21.028 7.67917 16.314C0.641174 9.27699 1.35517 5.74999 2.40717 4.27299C2.40517 4.27299 3.72917 2.15599 5.69217 1.78899C6.62617 1.61499 7.54517 1.87399 8.35917 2.53899C11.7012 5.29299 11.3912 6.69499 10.6372 8.24299C10.1742 9.19399 9.80818 9.94499 11.9282 12.066C14.0492 14.185 14.8012 13.823 15.7512 13.357C17.3002 12.604 18.7012 12.292 21.4532 15.633C22.1212 16.449 22.3812 17.374 22.2032 18.309C21.8262 20.301 19.6742 21.617 19.6532 21.629C19.1882 21.963 18.4902 22.264 17.5122 22.264Z" fill="black" />
            </svg>
          </a>
          <a href="" class="social">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.24981 15.4992C4.24981 15.3692 4.28281 15.2382 4.35381 15.1182C4.80081 14.3642 8.80882 7.75024 11.9998 7.75024C15.1898 7.75024 19.1988 14.3632 19.6458 15.1182C19.8568 15.4732 19.7388 15.9352 19.3818 16.1452C19.0248 16.3562 18.5648 16.2382 18.3538 15.8822C16.8348 13.3182 13.7668 9.25024 11.9998 9.25024C10.2298 9.25024 7.16281 13.3182 5.64581 15.8822C5.43481 16.2382 4.97481 16.3562 4.61781 16.1452C4.38181 16.0052 4.24981 15.7562 4.24981 15.4992Z" fill="black" />
            </svg>
          </a>
        </div>
      </div>

      <div class="person">
        <div class="head">
          <div class="profile">
            <img src="img/explore/by/femar.jpg" alt="Profile">
          </div>
          <div class="info">
            <h4 class="name">Fredrick Ochieng</h4>
            <span class="role">Creative Director</span>
          </div>
        </div>
        <div class="socials">
          <a href="mailto:isfescii@gmail.com" class="social">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.84434 9.53351C6.20034 9.95451 9.39134 13.6525 12.0113 13.6525C14.6343 13.6525 17.7933 9.95151 18.1443 9.52951C18.4093 9.21251 18.3663 8.73951 18.0493 8.47451C17.7293 8.20951 17.2583 8.25251 16.9923 8.56951C15.8363 9.95451 13.4613 12.1525 12.0113 12.1525C10.5593 12.1525 8.16234 9.95251 6.99134 8.56651C6.72434 8.24951 6.25134 8.20951 5.93534 8.47651C5.61834 8.74351 5.57834 9.21651 5.84434 9.53351Z"  fill="black" />
              <path fill-rule="evenodd" clip-rule="evenodd"  d="M1.72656 12.0001C1.72656 19.2851 4.41556 21.8671 11.9996 21.8671C19.5846 21.8671 22.2736 19.2851 22.2736 12.0001C22.2736 4.71506 19.5846 2.13306 11.9996 2.13306C4.41556 2.13306 1.72656 4.71506 1.72656 12.0001ZM3.22656 12.0001C3.22656 5.58806 5.27656 3.63306 11.9996 3.63306C18.7236 3.63306 20.7736 5.58806 20.7736 12.0001C20.7736 18.4121 18.7236 20.3671 11.9996 20.3671C5.27656 20.3671 3.22656 18.4121 3.22656 12.0001Z" fill="black" />
            </svg>
          </a>
          <a href="tel:+254713253018" class="social">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25917 3.23499C6.17317 3.23499 6.08617 3.24299 5.99817 3.25699C4.88017 3.44599 3.87317 4.74999 3.66517 5.08899C2.62317 6.55399 3.43717 9.95099 8.73917 15.254C14.0432 20.557 17.4402 21.369 18.8512 20.364C19.2452 20.12 20.5472 19.117 20.7362 17.997C20.8182 17.51 20.6732 17.048 20.2942 16.586C18.0772 13.894 17.3752 14.235 16.4082 14.706C14.9522 15.416 13.5302 15.789 10.8672 13.127C8.20818 10.466 8.57917 9.04399 9.28817 7.58699C9.76017 6.61799 10.1012 5.91799 7.40617 3.69799C7.02917 3.38799 6.65118 3.23499 6.25917 3.23499ZM17.5122 22.264C15.5302 22.264 12.3922 21.028 7.67917 16.314C0.641174 9.27699 1.35517 5.74999 2.40717 4.27299C2.40517 4.27299 3.72917 2.15599 5.69217 1.78899C6.62617 1.61499 7.54517 1.87399 8.35917 2.53899C11.7012 5.29299 11.3912 6.69499 10.6372 8.24299C10.1742 9.19399 9.80818 9.94499 11.9282 12.066C14.0492 14.185 14.8012 13.823 15.7512 13.357C17.3002 12.604 18.7012 12.292 21.4532 15.633C22.1212 16.449 22.3812 17.374 22.2032 18.309C21.8262 20.301 19.6742 21.617 19.6532 21.629C19.1882 21.963 18.4902 22.264 17.5122 22.264Z" fill="black" />
            </svg>
          </a>
          <a href="" class="social">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.24981 15.4992C4.24981 15.3692 4.28281 15.2382 4.35381 15.1182C4.80081 14.3642 8.80882 7.75024 11.9998 7.75024C15.1898 7.75024 19.1988 14.3632 19.6458 15.1182C19.8568 15.4732 19.7388 15.9352 19.3818 16.1452C19.0248 16.3562 18.5648 16.2382 18.3538 15.8822C16.8348 13.3182 13.7668 9.25024 11.9998 9.25024C10.2298 9.25024 7.16281 13.3182 5.64581 15.8822C5.43481 16.2382 4.97481 16.3562 4.61781 16.1452C4.38181 16.0052 4.24981 15.7562 4.24981 15.4992Z" fill="black" />
            </svg>
          </a>
        </div>
      </div>

      <div class="person">
        <div class="head">
          <div class="profile">
            <img src="img/explore/by/femar.jpg" alt="Profile">
          </div>
          <div class="info">
            <h4 class="name">Fredrick Ochieng</h4>
            <span class="role">Creative Director</span>
          </div>
        </div>
        <div class="socials">
          <a href="mailto:isfescii@gmail.com" class="social">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.84434 9.53351C6.20034 9.95451 9.39134 13.6525 12.0113 13.6525C14.6343 13.6525 17.7933 9.95151 18.1443 9.52951C18.4093 9.21251 18.3663 8.73951 18.0493 8.47451C17.7293 8.20951 17.2583 8.25251 16.9923 8.56951C15.8363 9.95451 13.4613 12.1525 12.0113 12.1525C10.5593 12.1525 8.16234 9.95251 6.99134 8.56651C6.72434 8.24951 6.25134 8.20951 5.93534 8.47651C5.61834 8.74351 5.57834 9.21651 5.84434 9.53351Z"  fill="black" />
              <path fill-rule="evenodd" clip-rule="evenodd"  d="M1.72656 12.0001C1.72656 19.2851 4.41556 21.8671 11.9996 21.8671C19.5846 21.8671 22.2736 19.2851 22.2736 12.0001C22.2736 4.71506 19.5846 2.13306 11.9996 2.13306C4.41556 2.13306 1.72656 4.71506 1.72656 12.0001ZM3.22656 12.0001C3.22656 5.58806 5.27656 3.63306 11.9996 3.63306C18.7236 3.63306 20.7736 5.58806 20.7736 12.0001C20.7736 18.4121 18.7236 20.3671 11.9996 20.3671C5.27656 20.3671 3.22656 18.4121 3.22656 12.0001Z" fill="black" />
            </svg>
          </a>
          <a href="tel:+254713253018" class="social">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25917 3.23499C6.17317 3.23499 6.08617 3.24299 5.99817 3.25699C4.88017 3.44599 3.87317 4.74999 3.66517 5.08899C2.62317 6.55399 3.43717 9.95099 8.73917 15.254C14.0432 20.557 17.4402 21.369 18.8512 20.364C19.2452 20.12 20.5472 19.117 20.7362 17.997C20.8182 17.51 20.6732 17.048 20.2942 16.586C18.0772 13.894 17.3752 14.235 16.4082 14.706C14.9522 15.416 13.5302 15.789 10.8672 13.127C8.20818 10.466 8.57917 9.04399 9.28817 7.58699C9.76017 6.61799 10.1012 5.91799 7.40617 3.69799C7.02917 3.38799 6.65118 3.23499 6.25917 3.23499ZM17.5122 22.264C15.5302 22.264 12.3922 21.028 7.67917 16.314C0.641174 9.27699 1.35517 5.74999 2.40717 4.27299C2.40517 4.27299 3.72917 2.15599 5.69217 1.78899C6.62617 1.61499 7.54517 1.87399 8.35917 2.53899C11.7012 5.29299 11.3912 6.69499 10.6372 8.24299C10.1742 9.19399 9.80818 9.94499 11.9282 12.066C14.0492 14.185 14.8012 13.823 15.7512 13.357C17.3002 12.604 18.7012 12.292 21.4532 15.633C22.1212 16.449 22.3812 17.374 22.2032 18.309C21.8262 20.301 19.6742 21.617 19.6532 21.629C19.1882 21.963 18.4902 22.264 17.5122 22.264Z" fill="black" />
            </svg>
          </a>
          <a href="" class="social">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.24981 15.4992C4.24981 15.3692 4.28281 15.2382 4.35381 15.1182C4.80081 14.3642 8.80882 7.75024 11.9998 7.75024C15.1898 7.75024 19.1988 14.3632 19.6458 15.1182C19.8568 15.4732 19.7388 15.9352 19.3818 16.1452C19.0248 16.3562 18.5648 16.2382 18.3538 15.8822C16.8348 13.3182 13.7668 9.25024 11.9998 9.25024C10.2298 9.25024 7.16281 13.3182 5.64581 15.8822C5.43481 16.2382 4.97481 16.3562 4.61781 16.1452C4.38181 16.0052 4.24981 15.7562 4.24981 15.4992Z" fill="black" />
            </svg>
          </a>
        </div>
      </div>

      <div class="person">
        <div class="head">
          <div class="profile">
            <img src="img/explore/by/femar.jpg" alt="Profile">
          </div>
          <div class="info">
            <h4 class="name">Fredrick Ochieng</h4>
            <span class="role">Creative Director</span>
          </div>
        </div>
        <div class="socials">
          <a href="mailto:isfescii@gmail.com" class="social">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.84434 9.53351C6.20034 9.95451 9.39134 13.6525 12.0113 13.6525C14.6343 13.6525 17.7933 9.95151 18.1443 9.52951C18.4093 9.21251 18.3663 8.73951 18.0493 8.47451C17.7293 8.20951 17.2583 8.25251 16.9923 8.56951C15.8363 9.95451 13.4613 12.1525 12.0113 12.1525C10.5593 12.1525 8.16234 9.95251 6.99134 8.56651C6.72434 8.24951 6.25134 8.20951 5.93534 8.47651C5.61834 8.74351 5.57834 9.21651 5.84434 9.53351Z"  fill="black" />
              <path fill-rule="evenodd" clip-rule="evenodd"  d="M1.72656 12.0001C1.72656 19.2851 4.41556 21.8671 11.9996 21.8671C19.5846 21.8671 22.2736 19.2851 22.2736 12.0001C22.2736 4.71506 19.5846 2.13306 11.9996 2.13306C4.41556 2.13306 1.72656 4.71506 1.72656 12.0001ZM3.22656 12.0001C3.22656 5.58806 5.27656 3.63306 11.9996 3.63306C18.7236 3.63306 20.7736 5.58806 20.7736 12.0001C20.7736 18.4121 18.7236 20.3671 11.9996 20.3671C5.27656 20.3671 3.22656 18.4121 3.22656 12.0001Z" fill="black" />
            </svg>
          </a>
          <a href="tel:+254713253018" class="social">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25917 3.23499C6.17317 3.23499 6.08617 3.24299 5.99817 3.25699C4.88017 3.44599 3.87317 4.74999 3.66517 5.08899C2.62317 6.55399 3.43717 9.95099 8.73917 15.254C14.0432 20.557 17.4402 21.369 18.8512 20.364C19.2452 20.12 20.5472 19.117 20.7362 17.997C20.8182 17.51 20.6732 17.048 20.2942 16.586C18.0772 13.894 17.3752 14.235 16.4082 14.706C14.9522 15.416 13.5302 15.789 10.8672 13.127C8.20818 10.466 8.57917 9.04399 9.28817 7.58699C9.76017 6.61799 10.1012 5.91799 7.40617 3.69799C7.02917 3.38799 6.65118 3.23499 6.25917 3.23499ZM17.5122 22.264C15.5302 22.264 12.3922 21.028 7.67917 16.314C0.641174 9.27699 1.35517 5.74999 2.40717 4.27299C2.40517 4.27299 3.72917 2.15599 5.69217 1.78899C6.62617 1.61499 7.54517 1.87399 8.35917 2.53899C11.7012 5.29299 11.3912 6.69499 10.6372 8.24299C10.1742 9.19399 9.80818 9.94499 11.9282 12.066C14.0492 14.185 14.8012 13.823 15.7512 13.357C17.3002 12.604 18.7012 12.292 21.4532 15.633C22.1212 16.449 22.3812 17.374 22.2032 18.309C21.8262 20.301 19.6742 21.617 19.6532 21.629C19.1882 21.963 18.4902 22.264 17.5122 22.264Z" fill="black" />
            </svg>
          </a>
          <a href="" class="social">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.24981 15.4992C4.24981 15.3692 4.28281 15.2382 4.35381 15.1182C4.80081 14.3642 8.80882 7.75024 11.9998 7.75024C15.1898 7.75024 19.1988 14.3632 19.6458 15.1182C19.8568 15.4732 19.7388 15.9352 19.3818 16.1452C19.0248 16.3562 18.5648 16.2382 18.3538 15.8822C16.8348 13.3182 13.7668 9.25024 11.9998 9.25024C10.2298 9.25024 7.16281 13.3182 5.64581 15.8822C5.43481 16.2382 4.97481 16.3562 4.61781 16.1452C4.38181 16.0052 4.24981 15.7562 4.24981 15.4992Z" fill="black" />
            </svg>
          </a>
        </div>
      </div>
    `
  }


  addPerson() {
    return `
      <div class="add">
        <div class="field">
          <label for="name">Name</label>
          <input type="text" name="name" id="name" required>
        </div>
        <div class="field">
          <label for="username">Username</label>
          <input type="text" name="username" id="username" required>
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" required>
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" required>
        </div>
        <div class="field">
          <label for="number">Phone</label>
          <input type="tel" name="number" id="number" required>
        </div>
        <div class="field">
          <label for="dob">Date of birth</label>
          <input type="date" name="dob" id="dob" required>
        </div>
        <div class="action">
          <button type="button">Create user</button>
        </div>
      </div>
    `
  }

  getStyles() {
    return `
    <style>
      * {
        box-sizing: border-box !important;
      }

      :host {
        /* border: 1px solid #808080; */
        margin: 0;
        padding: 0;
        width: 100%;
        display: flex;
        flex-flow: column;
        /* align-items: center; */
        justify-content: center;
        gap: 10px;
      }

      .header {
        border-bottom: 1px solid #80808017;
        background-color: #ffffff;
        z-index: 5;
        margin: 0;
        padding: 30px 0 12px 0;
        width: 100%;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: start;
        gap: 20px;
        position: sticky;
        top: 80px;
      }

      .header > span.option {
        /* border: 1px solid #80808017; */
        /* background-color: rgba(20,167,62,1); */
        padding: 5px 20px 6px 15px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        color: #808080;
        cursor: pointer;
      }

      .header > span.option.active {
        background-color: #f5f5f5;
        color: #404040;
        font-weight: 500;
      }

      .header > span.option:hover {
        color: #404040;
        font-weight: 500;
      }

      .header > span.option svg {
        /* border: 1px solid #80808017; */
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .header > span.option svg path {
        fill: #808080;
      }

      .header > span.option:hover svg path {
        fill: #404040;
      }

      .header > span.option.active svg path {
        fill: #404040;
      }

      .header > span.option span {
        font-family: var(--font-alt);
        font-weight: inherit;
      }

      .content {
        /* border: 1px solid #808080; */
        margin: 0;
        padding: 20px 0;
        width: 100%;
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: start;
        gap: 30px;
      }

      .content > .person {
        border: 1px solid #80808017;
        margin: 0;
        padding: 15px;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        background-position-x: 0%;
        background-position-y: 0%;
        background-repeat: repeat;
        background-image: none;
        box-shadow: 8px 8px 30px 0px rgba(42, 67, 113, 0.034);
      }

      .content > .person > .head {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        gap: 0;
      }

      .content > .person > .head > .profile {
        /* border: 1px solid #808080; */
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        width: 100px;
        height: 100px;
        gap: 0;
        border-radius: 50px;
      }

      .content > .person > .head > .profile > img {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        gap: 0;
        border-radius: 50px;
        object-fit: cover;
      }

      .content > .person > .head > .info {
        /* border: 1px solid #808080; */
        padding: 8px 0 18px 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        gap: 0;
      }

      .content > .person > .head > .info > h4 {
        margin: 0;
        font-family: var(--font-alt);
        font-weight: 500;
        color: #404040;
        font-size: 1.1rem;
      }

      .content > .person > .head > .info > span.role {
        margin: 0;
        font-family: var(--font-alt);
        font-weight: 400;
        color: #808080;
        font-size: 0.85rem;
      }

      .content > .person > .socials {
        /* border: 1px solid #808080; */
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        gap: 15px;
      }

      .content > .person > .socials > a {
        /* border: 1px solid #808080; */
        background-color: #f5f5f5;
        padding: 5px 10px;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: #808080;
        border-radius: 50px;

      }

      .content > .person > .socials > a:hover svg path { 
        fill: #08b86f;
      }

      .content > .person > .socials > a svg {
        width: 20px;
        height: 20px;
      }

      .content > .person > .socials > a svg path {
        fill: #808080;
      }

      .add {
        margin: 0 0 20px 0;
        width: 90%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: start;
        gap: 15px;
      }


      .add > .action {
        /* border: 1px solid black; */
        padding: 20px 0 30px 0;
        width: 80%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        gap: 2px;
      }

      .add > .action > button {
        border: none;
        outline: none;
        background-color: rgba(20,167,62,1);
        padding: 10px 25px;
        font-family: var(--font-alt);
        font-weight: 500;
        font-size: 1rem;
        color: #ffffff;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        gap: 2px;
        border-radius: 25px;
      }


      .add > .field {
        /*border: 1px solid black;*/
        width: 80%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: start;
        gap: 2px;
      }

      .add > .field > span.error {
        color: #ee7752;
        font-size: 0.8rem;
        display: none;
      }

      .add > .field > label {
        font-family: var(--font-alt);
        padding: 5px 2px;
        color: #404040;
        font-weight: 400;
        font-size: 1.1rem;
      }

      .add > .field > span.wrapper {
        display: flex;
        align-items: center;
        gap: 0;
        width: 100%;
      }
      .add > .field > span.wrapper > span {
        border: 1px solid #80808037;
        border-right: none;
        font-size: 1rem;
        width: 60px;
        padding: 10px 12px;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        color: #08b86f;
        display: flex;
        align-items: center;
      }

      .add > .field > span.wrapper > input {
        border: 1px solid #80808037;
        font-size: 1rem;
        width: calc(100% - 60px);
        outline: none;
        padding: 10px 12px;
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        color: #404040;
      }

      .add > .field >  span.wrapper > input:focus {
        border: 1px solid #08b86f60;
      }

      .add > .field > input {
        border: 1px solid #80808037;
        font-size: 1rem;
        width: 100%;
        outline: none;
        padding: 10px 12px;
        border-radius: 12px;
        color: #404040;
      }

      .add > .field > input:focus {
        border: 1px solid #08b86f60;
      }
    
      
    </style>
    `
  }
}