export default class ScheduleItem extends HTMLElement {
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

    this.editSchedule()
  }


  editSchedule(){
    const modalContainer = document.querySelector('body > section#modal')
    const button = this.shadowObj.querySelector('.options > .option.edit')

    const modal = `
      <modal-schedule url="some-url" edit="true" date="${button.dataset.date}" photographers="${this.getAttribute('photographers')}">
      </modal-schedule>
    `

    if (modalContainer && button) {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()

        // body.insertAdjacentElement('beforeend', element)
        modalContainer.innerHTML = modal
      })
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
      <span class="date">${this.getAttribute('date-en')}</span>
      <div class="people">
        ${this.getPhotographers(this.getAttribute('photographers-no'))}
      </div>
      <span class="options">
        <span class="option edit" data-date="${this.getAttribute('date')}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22.0001C4.617 22.0001 2 19.3831 2 12.0001C2 4.61712 4.617 2.00012 12 2.00012C12.414 2.00012 12.75 2.33612 12.75 2.75012C12.75 3.16412 12.414 3.50012 12 3.50012C5.486 3.50012 3.5 5.48612 3.5 12.0001C3.5 18.5141 5.486 20.5001 12 20.5001C18.514 20.5001 20.5 18.5141 20.5 12.0001C20.5 11.5861 20.836 11.2501 21.25 11.2501C21.664 11.2501 22 11.5861 22 12.0001C22 19.3831 19.383 22.0001 12 22.0001Z" fill="black" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2365 9.38606L20.2952 8.19072C21.4472 6.88972 21.3252 4.89472 20.0252 3.74172C19.3952 3.18372 18.5812 2.90372 17.7452 2.95572C16.9052 3.00672 16.1352 3.38272 15.5772 4.01272L9.6932 10.6607C7.8692 12.7187 9.1172 15.4397 9.1712 15.5547C9.2602 15.7437 9.4242 15.8877 9.6232 15.9497C9.6802 15.9687 10.3442 16.1717 11.2192 16.1717C12.2042 16.1717 13.4572 15.9127 14.4092 14.8367L19.0774 9.56571C19.1082 9.54045 19.1374 9.51238 19.1646 9.4815C19.1915 9.45118 19.2155 9.41925 19.2365 9.38606ZM10.4082 14.5957C11.0352 14.7097 12.4192 14.8217 13.2862 13.8427L17.5371 9.04299L15.0656 6.85411L10.8172 11.6557C9.9292 12.6567 10.2122 13.9917 10.4082 14.5957ZM16.0596 5.73076L18.5322 7.91938L19.1722 7.19672C19.7752 6.51472 19.7122 5.46872 19.0312 4.86572C18.7002 4.57372 18.2712 4.42472 17.8362 4.45272C17.3962 4.48072 16.9932 4.67672 16.7002 5.00672L16.0596 5.73076Z" fill="black" />
          </svg>
          <span class="text">Edit</span>
        </span>
        <span class="option delete" data-date="${this.getAttribute('date')}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.81166 5.77478C7.85456 5.07999 8.05238 4.08798 8.74916 3.28669C9.48616 2.43769 10.5802 2.00769 11.9992 2.00769C13.4192 2.00769 14.5122 2.43769 15.2502 3.28669C15.9468 4.08782 16.1443 5.07993 16.187 5.77478H20.0756C20.4896 5.77478 20.8256 6.11078 20.8256 6.52478C20.8256 6.93878 20.4896 7.27478 20.0756 7.27478H3.92456C3.51056 7.27478 3.17456 6.93878 3.17456 6.52478C3.17456 6.11078 3.51056 5.77478 3.92456 5.77478H7.81166ZM14.6842 5.77478C14.6464 5.32288 14.5136 4.72157 14.1122 4.26369C13.6722 3.76169 12.9612 3.50769 11.9992 3.50769C11.0382 3.50769 10.3272 3.76169 9.88616 4.26369C9.48476 4.72157 9.35218 5.32288 9.31447 5.77478H14.6842Z" fill="black" />
            <path d="M11.989 21.9925C9.03002 21.9925 7.20802 21.4795 6.08202 20.3315C4.49397 18.7125 4.54596 16.0587 4.6179 12.3871L4.61802 12.3805C4.63502 11.5195 4.65302 10.5935 4.65302 9.59753C4.65302 9.18353 4.98902 8.84753 5.40302 8.84753C5.81702 8.84753 6.15302 9.18353 6.15302 9.59753C6.15302 10.6035 6.13502 11.5405 6.11702 12.4105C6.05002 15.8435 6.00602 18.1105 7.15302 19.2805C7.96302 20.1075 9.50002 20.4925 11.989 20.4925C14.483 20.4925 16.023 20.1055 16.837 19.2765C17.991 18.0996 17.948 15.8188 17.883 12.3661L17.8812 12.2695C17.8657 11.4406 17.849 10.5496 17.849 9.59753C17.849 9.18353 18.185 8.84753 18.599 8.84753C19.013 8.84753 19.349 9.18353 19.349 9.59753C19.349 10.5765 19.366 11.4885 19.383 12.3375L19.3832 12.3452C19.4521 16.0352 19.5019 18.7027 17.907 20.3275C16.778 21.4785 14.952 21.9925 11.989 21.9925Z" fill="black" />
          </svg>
          <span class="text">Remove</span>
        </span>
      </span>
    `
  }

  getPhotographers(num){
    if (parseInt(num) > 1) {
      return `
        <span class="no">${this.getAttribute('photographers-no')}</span>
        <span class="text">Photographers are booked/occupied this day</span>
      `
    }
    else {
      return `
      <span class="no">${this.getAttribute('photographers-no')}</span>
      <span class="text">Photographer is booked/occupied this day</span>
    `
    }
  }

  getStyles() {
    return `
    <style>
      * {
        box-sizing: border-box !important;
      }

      :host {
        border: 1px solid #80808017;
        margin: 0;
        padding: 15px;
        max-width: 250px;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: start;
        gap: 20px;
        background-position-x: 0%;
        background-position-y: 0%;
        background-repeat: repeat;
        background-image: none;
        box-shadow: 8px 8px 30px 0px rgba(42, 67, 113, 0.034);
        border-radius: 15px;
      }

      * {
        font-family: var(--font-alt);
        color: #404040;
        text-align: center;
      }

      .date {
        /* border: 1px solid #808080; */
        color: #808080;
        font-size: 0.95rem;
      }

      .options {
        display: flex;
        gap: 30px;
      }

      .options >.option {
        background-color: #f5f5f5;
        color: #666666;
        padding: 5px 15px 5px 10px;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-size: 0.9rem;
        border-radius: 50px;
        cursor: pointer;
      }

      .options > .option svg {
        width: 20px;
        height: 20px;
      }

      .options > .option svg path {
        fill: #666666;
      }
      
    </style>
    `
  }
}