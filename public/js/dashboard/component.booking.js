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
	  let page = 1
	  
    this.fetchBookings(this.getAttribute('status'), page).then(() => {
      console.log('Run!!')
    })
  }
  
  async fetchBookings(status, page) {
    const contentContainer = this.shadowObj.querySelector('#content-container')
	  const body  = `{"date":"${this.currentTimestamp()}","status":"${status}"}`
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    };
    
    try {
      const response = await fetch(`/api/v1/admin/bookings?page=${page}`, options);
      const data = await response.json();
			console.log(data)
      contentContainer.innerHTML = this.getBookings(data.bookings)
	    
	    if (data.pagination.currentPage < data.pagination.totalPages){
		    contentContainer.insertAdjacentHTML('beforeend', this.getMore())
				page += 1
				this.loadMore(page, status, contentContainer)
	    }
	    else {
		    contentContainer.insertAdjacentHTML('beforeend', `<p class="all">That's all</p>`)
	    }
	    
    } catch (error) {
      console.error(error);
    }
  }
	
	loadMore(page, status, contentContainer){
		const loadButton = this.shadowObj.querySelector('#load-more')
		
		loadButton.addEventListener('click', async e => {
			e.preventDefault()
			
			await this.fetchPage(loadButton, contentContainer, page, status)
		})
	}
	
	async fetchPage(loadButton, contentContainer, page, status) {
		loadButton.remove()
		contentContainer.insertAdjacentHTML('beforeend', this.getLoader())
		const body  = `{"date":"${this.currentTimestamp()}","status":"${status}"}`
		
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
		};
		
		try {
			const response = await fetch(`/api/v1/admin/bookings?page=${page}`, options);
			const data = await response.json();
			const loader = contentContainer.querySelector('div.loader')
			loader.remove()
			contentContainer.insertAdjacentHTML('beforeend', this.getBookings(data.bookings))
			// contentContainer.insertAdjacentHTML('beforeend', this.getMore())
			
			if (data.pagination.currentPage < data.pagination.totalPages){
				page += 1
				contentContainer.insertAdjacentHTML('beforeend', this.getMore())
				this.loadMore(page, status, contentContainer)
			}
			else {
				contentContainer.insertAdjacentHTML('beforeend', `<p class="all">That's all</p>`)
			}
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
  
  getMore = () => {
    return `
      <span id="load-more" class="load-more">
        <span class="no">Load more</span>
      </span>
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
        margin: 0 0 70px 0;
        width: 100%;
        min-height: 70vh;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }
      
      p.all {
      	margin: 20px 0;
      	text-align: center;
      	color: #808080;
      	font-family: var(--font-alt) sans-serif;
      }
      
      span.load-more{
        color: white;
        background-color: #08b86f;
        padding: 7px 12px;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        height: max-content;
        gap: 0;
        margin-top: 15px;
        border-radius: 50px;
      }
      
      span.load-more{
      	cursor: pointer;
        color: #ffffff;
      }
      
      span.load-more>i{
        margin-top: 4px;
      }
      
      .loader {
        margin: 50px;
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
