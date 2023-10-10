export default class ScheduleContainer extends HTMLElement {
  constructor() {
    
    // We are not even going to touch this.
    super();
    
    // let's create our shadow root
    this.shadowObj = this.attachShadow({ mode: 'open' });
    
    this.render();
  }
  
  
  render() {
    this.shadowObj.innerHTML = this.getTemplate();
    // this.innerHTML = this.getTemplate();
  }
  
  connectedCallback() {
    // console.log('We are inside connectedCallback');
    
    this.openCreate()
    this.fetchSchedules()
  }
  
  openCreate(){
    const modalContainer = document.querySelector('body > section#modal')
    const button = this.shadowObj.querySelector('.header > .right')
    
    // const element = document.createElement('modal-schedule')
    
    const modal = `
      <modal-schedule url="some-url" photographers="" edit="false" date="${button.dataset.date}">
      </modal-schedule>
    `
    
    if (modalContainer && button) {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        
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
      ${this.getHeader()}

      <div id="content-container" class="content">
        ${this.getLoader()}
      </div>
    `
  }
  
  fetchSchedules(){
    const url = '/api/v1/admin/schedules';
    const contentContainer = this.shadowObj.querySelector('#content-container')
    
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response){
          console.log('Network error')
        }
        
        response.json()
          .then(data => {
            if(data.success){
              // console.log(data)
              contentContainer.innerHTML = this.getSchedules(data.schedules);
            }
            else {
              console.log('error')
            }
          })
      })
  }
  
  getHeader() {
    return `
      <div class="header">
        <div class="left">
          <p class="info">Schedules</p>
        </div>
        <div class="right">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus"  viewBox="0 0 16 16">
            <path  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span class="text">Add</span>
        </div>
      </div>
    `
  }
  
  getLoader(){
    return `
      <div class="loader"></div>
    `
  }
  
  getSchedules(schedules){
    let html = ''
    schedules.forEach((schedule, index) => {
      html += `
        <schedule-item date-en="${this.enDate(schedule.date)}"  date="${this.formatDate(schedule.date)}"
          photographers="${this.arrayToString(schedule.photographers)}" photographers-no="${schedule.photographers.length}">
        </schedule-item>
      `
    })
    
    return html
  }
  
  arrayToString(arr) {
    if (!Array.isArray(arr)) {
      throw new Error("Input is not an array");
    }
    
    return arr.join(",");
  }
  
	formatDate(inputDate) {
		const date = new Date(inputDate);
		
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = (date.getDate()).toString().padStart(2, '0');
		
		return `${year}-${month}-${day}`;
	}
  
  enDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    
    return date.toLocaleDateString('en-US', options);
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

      .header {
        border-bottom: 1px solid #80808017;
        margin: 0;
        padding: 20px 0;
        width: 100%;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }

      .header > .left > p {
        margin: 0;
        padding: 0;
        font-family: var(--font-alt),sans-serif;
        color: #404040;
        font-size: 1.2rem;
      }

      .header > .right {
        /* border: 1px solid #80808017; */
        background-color: rgba(20,167,62,1);
        padding: 5px 20px 6px 15px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        color: white;
        cursor: pointer;
      }

      .header > .right svg {
        /* border: 1px solid #80808017; */
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .header > .right span {
        font-family: var(--font-alt),sans-serif;
        font-weight: 500;
      }

      .content {
        /*border: 1px solid #808080;*/
        margin: 0;
        padding: 20px 0;
        min-height: 70vh;
        width: 100%;
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 30px;
      }

      .content > .day {
        border: 1px solid #80808017;
        margin: 0;
        padding: 15px;
        max-width: 250px;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        background-position-x: 0;
        background-position-y: 0;
        background-repeat: repeat;
        background-image: none;
        box-shadow: 8px 8px 30px 0 rgba(42, 67, 113, 0.034);
        border-radius: 15px;
      }
      
    </style>
    `
  }
}