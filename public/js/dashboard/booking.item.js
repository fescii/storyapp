export default class bookingItem extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();

    // lets create our shadow root
    this.shadowObj = this.attachShadow({mode: 'open'});

    this.render();
  }


  render() {
    this.shadowObj.innerHTML = this.getTemplate();
    // this.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    // console.log('We are inside connectedCallback');
    
    this.openDetails()
  }

  openDetails() {
    // updating the state

    const arrowUp = `
      <span class="text">Collapse</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
      </svg>
    `

    const arrowDown = `
      <span class="text">Expand</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>
    `

    const expand  = this.shadowObj.querySelector('.head > .right');
    const content  = this.shadowObj.querySelector('.content');

    if (content && expand) {
      expand.addEventListener('click', () => {
        // console.log('Clicked!')
        switch (expand.dataset.expanded) {
          case 'false':
            content.style.display = 'flex'
            expand.dataset.expanded = 'true'
            expand.innerHTML = arrowUp
            break;
          case 'true':
            content.style.display = 'none'
            expand.dataset.expanded = 'false'
            expand.innerHTML = arrowDown
            break;
          default:
            break;
        }
      });
    }
  }

  getTemplate() {
    // Show HTML Here
    return `
      ${this.getHeader()}
      ${this.getBody()}
      ${this.getStyles()}
    
    `
  }

  getHeader(){
    return `
      <div class="head">
        <div class="left">
          <div class="date ${this.getAttribute('status')}">
            <span class="day">${this.getAttribute('date-day')}</span>
            <span class="no">${this.getAttribute('date-date')}</span>
          </div>
          <div class="quick-info">
            <span class="top">
              <span class="month">${this.getAttribute('date-month')}</span>
              <span class="dot"></span>
              <span class="service">${this.getAttribute('service')}</span>
              <span class="dot"></span>
              <span class="status ${this.getAttribute('status')}">${this.getStatus(this.getAttribute('status'))}</span>
            </span>
            <p class="location">${this.getAttribute('location')}</p>
          </div>
        </div>
        <div class="right" data-expanded="false">
          <span class="text">Expand</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
      </div>
    `
  }

  getBody(){
    return`
      <div class="content">
        <div class="section bio">
          <div class="infos">
            <div class="info name">
              <h3 class="label">Name</h3>
              <p class="text">${this.getAttribute('full-name')}</p>
            </div>
            <div class="info email">
              <h3 class="label">Phone</h3>
              <p class="text">${this.getAttribute('phone')}</p>
            </div>
            <div class="info number">
              <h3 class="label">Email</h3>
              <p class="text">${this.getAttribute('email')}</p>
            </div>
            <div class="info package">
              <h3 class="label">Package</h3>
              <p class="text">${this.getAttribute('package')}</p>
            </div>
            <div class="info other">
              <h3 class="label">Other</h3>
              <p class="text">${this.getAttribute('other')}</p>
            </div>
          </div>
        </div>
        <div class="section coverage">
          <div class="infos">
            <div class="info coverage">
              <h3 class="label">Coverage</h3>
               <p class="info">${this.getAttribute('coverage')}</p>
            </div>
          </div>
        </div>
        ${this.getActions()}
      </div>
    `
  }

  getActions(){
    return `
      <div class="section actions">
        <a class="action" href="tel:${this.getAttribute('phone')}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25917 3.23499C6.17317 3.23499 6.08617 3.24299 5.99817 3.25699C4.88017 3.44599 3.87317 4.74999 3.66517 5.08899C2.62317 6.55399 3.43717 9.95099 8.73917 15.254C14.0432 20.557 17.4402 21.369 18.8512 20.364C19.2452 20.12 20.5472 19.117 20.7362 17.997C20.8182 17.51 20.6732 17.048 20.2942 16.586C18.0772 13.894 17.3752 14.235 16.4082 14.706C14.9522 15.416 13.5302 15.789 10.8672 13.127C8.20818 10.466 8.57917 9.04399 9.28817 7.58699C9.76017 6.61799 10.1012 5.91799 7.40617 3.69799C7.02917 3.38799 6.65118 3.23499 6.25917 3.23499ZM17.5122 22.264C15.5302 22.264 12.3922 21.028 7.67917 16.314C0.641174 9.27699 1.35517 5.74999 2.40717 4.27299C2.40517 4.27299 3.72917 2.15599 5.69217 1.78899C6.62617 1.61499 7.54517 1.87399 8.35917 2.53899C11.7012 5.29299 11.3912 6.69499 10.6372 8.24299C10.1742 9.19399 9.80818 9.94499 11.9282 12.066C14.0492 14.185 14.8012 13.823 15.7512 13.357C17.3002 12.604 18.7012 12.292 21.4532 15.633C22.1212 16.449 22.3812 17.374 22.2032 18.309C21.8262 20.301 19.6742 21.617 19.6532 21.629C19.1882 21.963 18.4902 22.264 17.5122 22.264Z" fill="black"/>
          </svg>
          <span class="text">Call</span>
        </a>
        <a class="action" href="mailto:${this.getAttribute('email')}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.84434 9.53351C6.20034 9.95451 9.39134 13.6525 12.0113 13.6525C14.6343 13.6525 17.7933 9.95151 18.1443 9.52951C18.4093 9.21251 18.3663 8.73951 18.0493 8.47451C17.7293 8.20951 17.2583 8.25251 16.9923 8.56951C15.8363 9.95451 13.4613 12.1525 12.0113 12.1525C10.5593 12.1525 8.16234 9.95251 6.99134 8.56651C6.72434 8.24951 6.25134 8.20951 5.93534 8.47651C5.61834 8.74351 5.57834 9.21651 5.84434 9.53351Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.72656 12.0001C1.72656 19.2851 4.41556 21.8671 11.9996 21.8671C19.5846 21.8671 22.2736 19.2851 22.2736 12.0001C22.2736 4.71506 19.5846 2.13306 11.9996 2.13306C4.41556 2.13306 1.72656 4.71506 1.72656 12.0001ZM3.22656 12.0001C3.22656 5.58806 5.27656 3.63306 11.9996 3.63306C18.7236 3.63306 20.7736 5.58806 20.7736 12.0001C20.7736 18.4121 18.7236 20.3671 11.9996 20.3671C5.27656 20.3671 3.22656 18.4121 3.22656 12.0001Z" fill="black"/>
          </svg>
          <span class="text">Email</span>
        </a>
        <div class="action">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2845 10.299C16.2835 10.299 15.4717 11.1108 15.4717 12.1118C15.4717 13.114 16.2837 13.9256 17.2845 13.9256H21.1712C21.5854 13.9256 21.9212 14.2614 21.9212 14.6756C21.9212 15.0898 21.5854 15.4256 21.1712 15.4256H17.2845C15.4549 15.4256 13.9717 13.942 13.9717 12.1118C13.9717 10.2824 15.4551 8.79895 17.2845 8.79895H21.1407C21.5549 8.79895 21.8907 9.13474 21.8907 9.54895C21.8907 9.96316 21.5549 10.299 21.1407 10.299H17.2845Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6749 12.0532C16.6749 11.639 17.0107 11.3032 17.4249 11.3032H17.7221C18.1363 11.3032 18.4721 11.639 18.4721 12.0532C18.4721 12.4674 18.1363 12.8032 17.7221 12.8032H17.4249C17.0107 12.8032 16.6749 12.4674 16.6749 12.0532Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.8562 8.1438C6.8562 7.72959 7.19199 7.3938 7.6062 7.3938H11.6662C12.0804 7.3938 12.4162 7.72959 12.4162 8.1438C12.4162 8.55801 12.0804 8.8938 11.6662 8.8938H7.6062C7.19199 8.8938 6.8562 8.55801 6.8562 8.1438Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25573 6.13445C4.04345 7.24742 3.46411 9.10491 3.46411 12.2533C3.46411 15.4011 4.04343 17.2587 5.25576 18.3718C6.48734 19.5026 8.5581 20.0423 12.0151 20.0423C15.4715 20.0423 17.542 19.5026 18.7735 18.3718C19.9857 17.2587 20.5651 15.4011 20.5651 12.2533C20.5651 9.10491 19.9857 7.24741 18.7735 6.13443C17.5421 5.00376 15.4716 4.46423 12.0151 4.46423C8.55804 4.46423 6.4873 5.00377 5.25573 6.13445ZM4.2413 5.02949C5.91616 3.49184 8.4959 2.96423 12.0151 2.96423C15.5338 2.96423 18.1133 3.49184 19.788 5.02952C21.482 6.58487 22.0651 8.99689 22.0651 12.2533C22.0651 15.5092 21.482 17.9212 19.788 19.4767C18.1133 21.0145 15.5338 21.5423 12.0151 21.5423C8.49584 21.5423 5.91612 21.0145 4.24127 19.4767C2.54717 17.9212 1.96411 15.5092 1.96411 12.2533C1.96411 8.99689 2.54716 6.58485 4.2413 5.02949Z" fill="black"/>
          </svg>
          <span class="text">Payments</span>
        </div>
      </div>
    `
  }

  getStatus(status){
    switch (status) {
      case 'not-started':
        return 'Not started'
      case 'started':
        return 'Started'
      case 'finished':
        return 'Finished'
      case 'pending':
        return 'Pending'
      case 'cancelled':
        return 'Cancelled'
      default:
        return 'Not started'
    }
  }

  getStyles() {
    return `
    <style>
      * {
        box-sizing: border-box !important;
      }

      :host {
        /* border: 1px solid #ce0404; */
        border-bottom: 1px solid #80808027;
        position: relative;
        padding: 0 5px;
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        gap: 0;
        /* border-radius: 18px; */
      }

      .head {
        /* border: 1px solid #81ce04; */
        padding: 15px 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0;
      }

      .head > .left {
        /* border: 1px solid #81ce04; */
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
      }

      .head > .left > .date {
        /* border: 1px solid #808080; */
        background-color: #f5f5f5;
        padding: 8px 15px;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        border-radius: 15px;
      }

      .head > .left > .date.cancelled {
        background-color: #fb482c19;
      }

      .head > .left > .date.pending {
        background-color: #ffcc004c;
      }

      .head > .left > .date.finished {
        background-color: #099eef18;
      }

      .head > .left > .date > span.day {
        margin: 0;
        color: #808080;
        font-family: var(--font-alt);
        font-size: 0.85rem;
        line-height: 1;
      }
      

      .head > .left > .date >  span.no {
        margin: 0;
        display: inline-block;
        color:  #404040;
        font-family: var(--font-alt);
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 1;
      }

      .head > .left > .date.cancelled > span.no{
        color: #f84125;
      }

      .head > .left > .date.pending > span.no{
        color: #ff9500;
      }

      .head > .left > .date.finished > span.no{
        color: #08b86f;
      }
      
      .head > .left .quick-info {
        /* border: 1px solid #808080; */
        margin: -3px 0 0 0;
        display: flex;
        flex-flow: column;
        align-items: start;
        justify-content: start;
        gap: 5px;
      }

      .head > .left .quick-info > .top {
        /* border: 1px solid #808080; */
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-size: 0.9rem;
        font-family: var(--font-alt);
        color: #808080;
      }

      .head > .left .quick-info > .top .month {
        /* color: #08b86f; */
        color: #808080;
        /* font-family: inherit; */
        font-size: 1rem;
      }


      .head > .left .quick-info > .top .service {
        /* color: #08b86f; */
        color: #606060;
        font-family: inherit;
      }

      .head > .left .quick-info > .top .status {
        /* color: #08b86f; */
        color: #606060;
        /* font-size: 0.8rem; */
        font-family: inherit;
      }

      .head > .left .quick-info > .top .status.finished {
        color: #08b86f;
      }

      .head > .left .quick-info > .top .status.pending {
        color: #ff9500;
      }
      .head > .left .quick-info > .top .status.cancelled {
        color: #f84125;
      }

      .head > .left .quick-info > .top .dot {
        padding: 0;
        margin: 2px 0 0 0;
        display: flex;
        width: 4px;
        height: 4px;
        gap: 5px;
        font-size: 0.8rem;
        background-color: #808080;
        border-radius: 5px;
        -webkit-border-radius: 5px;
      }

      .head > .left .quick-info  p.location {
        margin: 0;
        color: #404040;
        font-family: var(--font-alt);
        /* font-weight: 500; */
        font-size: 1.1rem;
      }

      .head > .right {
        padding: 5px 8px 5px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        cursor: pointer;
        color: #808080;
        fill: #808080;
        border-radius: 20px;
      }

      .head > .right > span.text {
        color: inherit;
        font-size: 0.9rem;
      }

      .head > .right > svg {
        width: 14px;
        height: 14px;
        fill: inherit;
      }

      .head > .right:hover {
        color: #08b86f;
        fill: #08b86f;
      }

      .content {
        border-top: 1px dashed #80808047;
        margin: 0;
        padding: 15px 0 0 0;
        width: 100%;
        display: none;
        flex-flow: column;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .content > .section {
        /* border-top: 1px solid #80808017; */
        display: flex;
        flex-flow: column;
        gap: 8px;
        width: 100%;
      }

      .content > .section.coverage {
        /* border-top: 1px solid #80808017; */
        padding: 0 0 10px 0;
      }

      .content > .section.bio > .infos {
        /* border: 1px solid #808080; */
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 15px;
      }

      .content > .section .infos > .info {
        /* border: 1px solid rgba(182, 19, 19, 0.09); */
        display: flex;
        flex-flow: column;
        gap: 0;
      }


      .content > .section .infos > .info.other {
        grid-column: 1/3;
      }

      .content > .section .infos > .info > h3.label {
        margin: 0;
        color: #404040;
        font-family: var(--font-alt);
        font-size: 1rem;
        font-weight: 500;
      }

      .content > .section .infos > .info > p {
        margin: 0;
        color: #404040;
        font-family: var(--font-alt);
        font-size: 0.95rem;
        font-weight: 400;
        line-height: 1.4;
      }

      .content > .section.actions {
        /* border: 1px solid #808080; */
        padding: 20px 0 20px 0;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        gap: 30px;
        width: 100%;
      }

      .content > .section.actions > .action {
        /* border: 1px solid #808080; */
        background-color: #f5f5f5;
        text-decoration: none;
        color: #666666;
        cursor: pointer;
        padding: 5px 16px 5px 12px;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        gap: 7px;
        border-radius: 25px;
      }

      .content > .section.actions > .action svg path {
        fill: #666666;
      }

      .content > .section.actions > .action:hover {
        background: #ad5389;
        background: linear-gradient(0deg, rgba(20,167,62,1) 0%, rgba(102,247,113,1) 100%);
        background-color: rgb(247, 145, 162);
        color: #ffffff;
      }

      .content > .section.actions > .action:hover svg path {
        fill: #ffffff;
      }
      
    </style>
    `
  }
}