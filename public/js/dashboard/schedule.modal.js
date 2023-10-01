export default class ScheduleModal extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();

    // lets create our shadow root
    this.shadowObj = this.attachShadow({ mode: 'open' });

    this.render();

  }


  render() {
    // this.shadowObj.innerHTML = this.getTemplate();
    this.shadowObj.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    console.log('We are inside connectedCallback');
    
    console.log('duhcudcucuygryc');
    
    this.disableScroll()


    const exitModal = this.shadowObj.querySelector('#content .content-head > .actions > .control')
    const overlay = this.shadowObj.querySelector('div.overlay')
    if (exitModal) {
      exitModal.addEventListener('click', (e) => {
        e.preventDefault()
        this.remove()
      })
    }

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        e.preventDefault()
        this.remove()
      })
    }

    this.activateContent()

  }

  disconnectedCallback() {
    // console.log('We are inside disconnectedCallback');
    this.enableScroll()
  }


  disableScroll() {
    // Get the current page scroll position
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    document.body.classList.add("stop-scrolling");

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  enableScroll() {
    document.body.classList.remove("stop-scrolling");
    window.onscroll = function () { };
  }

  activateContent(){
    // console.log('Inside')
    const options = this.shadowObj.querySelectorAll("section#content > .container > .services > .options > .option")
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault()
        option.classList.toggle('selected')
      })
    });
  }

  getTemplate() {
    if (!this.shadowObj) {
      // The shadow DOM is not created yet, return an empty string or handle it as needed.
      return '';
    }
  
    // Show HTML Here
    return `
      <div class="overlay"></div>
      <section id="content" class="content">
        ${this.getHeader()}
        <div id="container" class="container">
          ${this.getContent()}
        </div>
        <div class="footer">
          <div class="action next">
            <span class="text">Schedule</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.50076 19.7504C8.63076 19.7504 8.76176 19.7174 8.88176 19.6464C9.63576 19.1994 16.2498 15.1914 16.2498 12.0004C16.2498 8.81043 9.63676 4.80143 8.88176 4.35443C8.52676 4.14343 8.06476 4.26143 7.85476 4.61843C7.64375 4.97543 7.76176 5.43543 8.11776 5.64643C10.6818 7.16543 14.7498 10.2334 14.7498 12.0004C14.7498 13.7704 10.6818 16.8374 8.11776 18.3544C7.76176 18.5654 7.64375 19.0254 7.85476 19.3824C7.99476 19.6184 8.24376 19.7504 8.50076 19.7504Z" fill="black"/>
            </svg>
          </div>
        </div>
      </section>
      ${this.getStyles()}
    `
  }


  getHeader(){
    return `
      <div class="content-head">
        <div class="actions">
          <span class="control">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </span>
          <span class="steps">
            <span class="text">Scheduling</span>
          </span>
        </div>
      </div>
    `
  }

  getContent() {
    return `
      ${this.getTop(this.getAttribute('edit'))}
      <div class="fields">
        <div class="field name">
          ${this.getInput(this.getAttribute('edit'))}
          <span class="error">Date is required</span>
        </div>
      </div>
      <div class="services">
        <div class="options">
          ${this.getOptions(this.getAttribute('edit'))}
        </div>
      </div>
    `
  }
  
 

  getInput(edit){
    if (edit === 'true') {
      return `
        <input type="date" name="name" id="name" value="${this.getAttribute('date')}" required disabled>
      `
    }
    else {
      return `
        <input type="date" name="name" id="name"  required>
      `
    }
  }

  getOptions = (edit) => {
    let html = ''
    if (edit === 'true') {
      const photographers = this.getAttribute('photographers').split(',')
      console.log(photographers)

      photographers.forEach(item => {
        html += `
          <span class="option selected" data-value="event">
            <span class="text">${item}</span>
          </span>
        `
      })

      return html
    } 
    else {
      console.log('No data available')
    }

    return html
  }


  getTop(edit){
    if (edit === 'true') {
      return `
        <div class="head">
          <h2 class="step-title">Edit your schedule</h2>
          <p class="description">
            Edit this schedule, add or remove people.
          </p>
        </div>
      `
    }
    else {
      return `
        <div class="head">
          <h2 class="step-title">Make your schedule</h2>
          <p class="description">
            Create or edit schedules, select date and people.
          </p>
        </div>
      `
    }
  }


  getStyles() {
    console.log('No data available')
    return `
    <style>
      * {
        box-sizing: border-box !important;
      }
      :host{
        border: none;
        background-color: rgba(25, 25, 28, 0.671);
        padding: 0;
        justify-self: end;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        z-index: 12;
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        left: 0;
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
      }

      div.overlay {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 12;
        cursor: pointer;
        /* background-color: #000; */
      }

      section#content {
        background-color: #ffffff;
        padding: 15px 0;
        z-index: 20;
        display: flex;
        flex-flow: column;
        justify-content: start;
        align-items: center;
        gap: 0;
        width: 700px;
        height: 100%;
        max-height: max-content;
        min-height: min-content;
        height: max-content;
        border-radius: 25px;
        position: relative;
      }

      #content .content-head{
        margin: 0 20px;
        width: 100%;
        padding: 5px 0 10px 0;
        display: flex;
        flex-flow: column;
        gap: 0px;
        justify-content: center;
      }

      #content .content-head > .actions{
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
      }

      #content .content-head > .actions > .control{
        position: absolute;
        left: 20px;
        top: 15px;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        color: #808080;
        cursor: pointer;
      }

      #content .content-head > .actions > .control:hover{
        color: #ee7752;
      }

      #content .content-head > .actions > .control > svg{
        width: 25px;
        height: 25px;
      }

      #content .content-head > .actions > span.steps {
        /*background-color: #08b86f;*/
        color: #808080;
        padding: 4px 15px 5px 12px;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        gap: 3px;
        cursor: pointer;
        border-top-right-radius: 15px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
      }

      #content .content-head > .actions > span.steps > .text{
        padding: 0 5px 0 0;
      }

      #content .content-head > .actions > span.steps > .step {
        color: rgb(223, 121, 26);
      }

      section#content > .footer {
        border-top: 1px solid #80808027;
        margin: 0;
        width: 90%;
        padding: 20px 0 10px 0;
        display: flex;
        flex-flow: row;
        /* justify-content: space-between; */
        align-items: center;
        justify-content: center; 
        justify-self: end;
      }

      section#content > .footer > .action {
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        gap: 5px;
        border-radius: 50px;
        font-family: var(--font-alt);
        line-height: 1.2;
        font-size: 1.2rem;
        font-weight: 500;
        color: #404040;
        cursor: pointer;
      }

      section#content > .footer > .action.prev {
        padding: 10px 20px 10px 15px;
        background: rgba(57, 56, 56, 0.087);
        background: linear-gradient(0deg, rgba(57, 56, 56, 0.087) 0%, rgba(57, 56, 56, 0.187) 100%);
      }

      section#content > .footer > .action.prev svg path {
        fill: #404040;
      }

      section#content > .footer > .action.next {
        padding: 10px 15px 10px 20px;
        color: #ffffff;
        background: #ad5389;
        background: linear-gradient(0deg, rgba(20,167,62,1) 0%, rgba(102,247,113,1) 100%);
        background-color: rgb(247, 145, 162);
      }

      section#content > .footer > .action.next svg path {
        fill: #ffffff;
      }

      section#content > .footer > .action.disabled {
        background: #80808023;
        pointer-events: none;
        opacity: .9;
      }

      section#content > .container {
        /*border: 2px solid #808080;*/
        width: 90%;
        padding: 0;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }

       section#content > .container > .head {
        /*border: 1px solid blue;*/
        width: 90%;
        margin: 0 0 30px 0;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        gap: 0px;
      }
      
       section#content > .container > .head > h2.step-title {
        margin: 0;
        font-family: var(--font-alt);
        line-height: 1.2;
        font-size: 2rem;
        font-weight: 500;
        color: #404040;
      }
      
       section#content > .container > .head > p.description {
        margin: 0;
        font-family: var(--font-alt);
        font-size: 0.93rem;
        font-weight: 400;
        line-height: 1.5;
        color: #808080;
        text-align: center;
      }

      section#content > .container > .fields {
        margin: 0 0 20px 0;
        width: 90%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: start;
        gap: 15px;
      }

      section#content > .container > .fields > .field {
        /*border: 1px solid black;*/
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: start;
        gap: 2px;
      }

      section#content > .container > .fields > .field > span.error {
        color: #ee7752;
        font-size: 0.8rem;
        display: none;
      }

      section#content > .container > .fields > .field > span.wrapper {
        display: flex;
        align-items: center;
        gap: 0;
        width: 100%;
      }
      section#content > .container > .fields > .field > span.wrapper > span {
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

      section#content > .container > .fields > .field > span.wrapper > input {
        border: 1px solid #80808037;
        font-size: 1rem;
        width: calc(100% - 60px);
        outline: none;
        padding: 10px 12px;
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        color: #404040;
      }

      section#content > .container > .fields > .field >  span.wrapper > input:focus {
        border: 1px solid #08b86f60;
      }

      section#content > .container > .fields > .field > input {
        border: 1px solid #80808037;
        font-size: 1rem;
        width: 100%;
        outline: none;
        padding: 10px 12px;
        border-radius: 12px;
        color: #404040;
      }

      section#content > .container > .fields > .field > input:focus {
        border: 1px solid #08b86f60;
      }

      section#content > .container > .services {
        /*border: 1px solid #808080;*/
        width: 90%;
        padding: 0 0 25px 0;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: start;
        gap: 15px;
      }

      section#content > .container > .services > .options {
        /*border: 1px solid #808080;*/
        width: 100%;
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: start;
        gap: 15px;
      }

      section#content > .container > .services > .options > .option {
        border: 1px solid #80808037;
        font-size: 1rem;
        padding: 8px 20px;
        border-radius: 50px;
        color: #666666;
        cursor: pointer;
        font-family: var(--font-alt);
        line-height: 1.2;
      }

      section#content > .container > .services > .options > .option.selected {
        border: none;
        background: linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%);
        color: #ffffff;
      }


      section#content > .container > .services > .other{
        /*border-top: 1px solid #80808017;*/
        width: 100%;
        padding: 15px 0px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
      section#content > .container > .services > .other span.text {
        color: #666666;
        /*text-transform: capitalize;*/
        font-family: var(--font-alt);
        line-height: 1.2;
      }

      section#content > .container > .services > .other > input {
        border: 1px solid #80808037;
        font-size: 1rem;
        width: 100%;
        outline: none;
        padding: 10px 12px;
        border-radius: 12px;
        color: #404040;
      }

      section#content > .container > .services > .other > input:focus {
        border: 1px solid #08b86f60;
      }

      </style>
    `;
  }
}