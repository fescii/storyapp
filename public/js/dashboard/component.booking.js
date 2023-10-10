export default class BookingContainer extends HTMLElement {
  constructor() {
    // We are not even going to touch this.
    super();

    // let's create our shadow root
    this.shadowObj = this.attachShadow({ mode: "open" });

    this.render();
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
    // this.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    // console.log('We are inside connectedCallback');
    
    this.fetchBookings(this.getAttribute('status')).then(() => {
      console.log('Run!!')
    })
  }
  
  async fetchBookings(status) {
    const contentContainer = this.shadowObj.querySelector('#content-container')
    let page = 1
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: `{"date":"${this.currentTimestamp()}","status":"${status}"}`
    };
    
    try {
      const response = await fetch(`/api/v1/admin/bookings?page=${page}`, options);
      const data = await response.json();
      contentContainer.innerHTML = this.getBookings(data.bookings)
    } catch (error) {
      console.error(error);
    }
  }
  
  currentTimestamp = () => {
    const date = new Date();
    
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    let day = String(date.getDate()).padStart(2, '0');
    let hour = String(date.getHours()).padStart(2, '0');
    let minute = String(date.getMinutes()).padStart(2, '0');
    let second = String(date.getSeconds()).padStart(2, '0');
    
    return `${date.getFullYear()}${month}${day}${hour}${minute}${second}`;
  };

  getTemplate() {
    // Show HTML Here
    return `
      <div id="content-container" class="content">
        ${this.getLoader()}
      </div>
      ${this.getStyles()}
    `;
  }
  
  getLoader(){
    return `
      <div class="loader"></div>
    `
  }

  getBookings(bookings) {
    let html = ''
    bookings.forEach(booking => {
      const date = new Date(booking.date)
      const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      const day = daysOfWeek[date.getDay()]
      const dayOfMonth = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString();
      const shortMonthName = date.toLocaleDateString(undefined, { month: 'short' })
      html += `
        <booking-item date-day="${day}" date-date="${dayOfMonth}" date-month="${shortMonthName}" service="${booking.service}"
          location="${booking.location}" status="${booking.status}" full-name="${booking.name}" phone="${booking.phone}"
          email="${booking.email}" package="${booking.package}"
          other="${booking.other}"
          coverage="${booking.coverage}">
        </booking-item>
      `
    })
    
    return html
  }

  getStyles() {
    return `
    <style>
      * {
        box-sizing: border-box !important;
      }

      :host {
        /* border: 1px solid #808080; */
        /* position: relative; */
        margin: 0;
        padding: 0;
        width: 100%;
        display: flex;
        flex-flow: column;
        /* align-items: center; */
        justify-content: center;
      }
      
      .content {
        padding: 20px 0 0 0;
        width: 100%;
        min-height: 70vh;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }
      
      .loader {
        width: 28px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: #E3AAD6;
        transform-origin: top;
        display: grid;
        animation: l3-0 1s infinite linear;
       }
      .loader::before,
      .loader::after {
        content: "";
        grid-area: 1/1;
        background:#F4DD51;
        border-radius: 50%;
        transform-origin: top;
        animation: inherit;
        animation-name: l3-1;
      }
      
      .loader::after {
        background: #F10C49;
        --s: 180deg;
      }
      
      @keyframes l3-0 {
        0%,20% {transform: rotate(0)}
        100%   {transform: rotate(360deg)}
      }
      
      @keyframes l3-1 {
        50% {transform: rotate(var(--s,90deg))}
        100% {transform: rotate(0)}
      }
      
    </style>
    `;
  }
}
