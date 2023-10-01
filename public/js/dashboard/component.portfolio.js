export default class PortfolioContainer extends HTMLElement {
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
            case 'bio':
              contentContainer.innerHTML = this.getBio()
              break;
            case 'contact':
              contentContainer.innerHTML = this.getContact()
              break;
            case 'password':
              contentContainer.innerHTML = this.getPassword()
              break;
            case 'profile':
              contentContainer.innerHTML = this.getProfile()
              this.activateImageSelect()
              break;
            case 'images':
              contentContainer.innerHTML = 'No data'
              break;
            default:
              contentContainer.innerHTML = this.getBio()
              break;
          }
        })
      });
    }
  }

  activateImageSelect() {
    const image = this.shadowObj.querySelector('.image-preview-container input')
    if (image) {
      image.addEventListener('change', (event) => {
        // console.log('Changed')
        // Get the selected files.
        const imageFiles = event.target.files;
        
        // Count the number of files selected.
        const imageFilesLength = imageFiles.length;

        //If at least one image is selected, then proceed to display the preview.
        if (imageFilesLength > 0) {
          // Get the image path.
          const imageSrc = URL.createObjectURL(imageFiles[0]);

          // Select the image preview element.
          const imagePreviewElement = this.shadowObj.querySelector("#preview-selected-image");

          // Assign the path to the image preview element.
          imagePreviewElement.src = imageSrc;
          
          // Show the element by changing the display value to "block".
            imagePreviewElement.style.display = "block";
        }
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
        ${this.getBio()}
      </div>
     
    `
  }

  getHeader() {
    return `
      <div class="header">
        <span class="option active" data-name="bio">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.62573 15.6965C7.62573 15.2823 7.96152 14.9465 8.37573 14.9465H15.5957C16.0099 14.9465 16.3457 15.2823 16.3457 15.6965C16.3457 16.1107 16.0099 16.4465 15.5957 16.4465H8.37573C7.96152 16.4465 7.62573 16.1107 7.62573 15.6965Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.62573 11.9368C7.62573 11.5226 7.96152 11.1868 8.37573 11.1868H15.5957C16.0099 11.1868 16.3457 11.5226 16.3457 11.9368C16.3457 12.351 16.0099 12.6868 15.5957 12.6868H8.37573C7.96152 12.6868 7.62573 12.351 7.62573 11.9368Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.62598 8.17749C7.62598 7.76328 7.96176 7.42749 8.37598 7.42749H11.131C11.5452 7.42749 11.881 7.76328 11.881 8.17749C11.881 8.5917 11.5452 8.92749 11.131 8.92749H8.37598C7.96176 8.92749 7.62598 8.5917 7.62598 8.17749Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.89011 4.26997C6.42204 2.58117 8.79844 2.00024 12.001 2.00024C15.204 2.00024 17.5804 2.58116 19.1123 4.26999C20.624 5.93673 21.142 8.50197 21.142 12.0002C21.142 15.4985 20.624 18.0638 19.1123 19.7305C17.5804 21.4193 15.204 22.0002 12.001 22.0002C8.79844 22.0002 6.42204 21.4193 4.89011 19.7305C3.37819 18.0638 2.85999 15.4986 2.85999 12.0002C2.85999 8.50191 3.37819 5.93669 4.89011 4.26997ZM6.00111 5.27777C4.89078 6.5018 4.35999 8.56158 4.35999 12.0002C4.35999 15.4389 4.89078 17.4987 6.00111 18.7227C7.09143 19.9247 8.91053 20.5002 12.001 20.5002C15.092 20.5002 16.911 19.9247 18.0012 18.7227C19.1114 17.4987 19.642 15.439 19.642 12.0002C19.642 8.56151 19.1114 6.50175 18.0012 5.27775C16.911 4.07583 15.092 3.50024 12.001 3.50024C8.91053 3.50024 7.09143 4.07582 6.00111 5.27777Z" fill="black"/>
          </svg>
          <span class="text">Bio</span>
        </span>
        <span class="option" data-name="contact">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.84434 9.53351C6.20034 9.95451 9.39134 13.6525 12.0113 13.6525C14.6343 13.6525 17.7933 9.95151 18.1443 9.52951C18.4093 9.21251 18.3663 8.73951 18.0493 8.47451C17.7293 8.20951 17.2583 8.25251 16.9923 8.56951C15.8363 9.95451 13.4613 12.1525 12.0113 12.1525C10.5593 12.1525 8.16234 9.95251 6.99134 8.56651C6.72434 8.24951 6.25134 8.20951 5.93534 8.47651C5.61834 8.74351 5.57834 9.21651 5.84434 9.53351Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.72656 12.0001C1.72656 19.2851 4.41556 21.8671 11.9996 21.8671C19.5846 21.8671 22.2736 19.2851 22.2736 12.0001C22.2736 4.71506 19.5846 2.13306 11.9996 2.13306C4.41556 2.13306 1.72656 4.71506 1.72656 12.0001ZM3.22656 12.0001C3.22656 5.58806 5.27656 3.63306 11.9996 3.63306C18.7236 3.63306 20.7736 5.58806 20.7736 12.0001C20.7736 18.4121 18.7236 20.3671 11.9996 20.3671C5.27656 20.3671 3.22656 18.4121 3.22656 12.0001Z" fill="black"/>
          </svg>
          <span class="text">Contact</span>
        </span>
        <span class="option"  data-name="password">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0005 17.0684C11.5865 17.0684 11.2505 16.7324 11.2505 16.3184V14.0974C11.2505 13.6834 11.5865 13.3474 12.0005 13.3474C12.4145 13.3474 12.7505 13.6834 12.7505 14.0974V16.3184C12.7505 16.7324 12.4145 17.0684 12.0005 17.0684Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3099 8.86636C19.5076 9.86737 20.4103 11.8148 20.4103 15.0366C20.4103 20.1556 18.1313 22.0586 12.0003 22.0586C5.86933 22.0586 3.59033 20.1556 3.59033 15.0366C3.59033 11.8152 4.49286 9.86783 6.68994 8.86671V7.17565C6.73694 4.27165 9.03894 1.97865 11.9299 1.94165C13.3679 1.94865 14.6919 2.45965 15.7069 3.44965C16.7239 4.44165 17.2929 5.76765 17.3099 7.18665V8.86636ZM16.2062 10.0061C16.2687 10.0396 16.3365 10.0645 16.4079 10.0792C18.2742 10.7988 18.9103 12.2929 18.9103 15.0366C18.9103 19.3206 17.3603 20.5586 12.0003 20.5586C6.64033 20.5586 5.09033 19.3206 5.09033 15.0366C5.09033 12.2925 5.72663 10.7983 7.59364 10.0789C7.66395 10.0642 7.73067 10.0397 7.79227 10.0068C8.81976 9.65629 10.1936 9.51562 12.0003 9.51562C13.8058 9.51562 15.179 9.65609 16.2062 10.0061ZM8.18994 8.37159V7.18765C8.22294 5.11365 9.87394 3.46765 11.9499 3.44165C12.9859 3.43465 13.9319 3.81365 14.6609 4.52465C15.3899 5.23565 15.7979 6.18665 15.8099 7.19565V8.37141C14.7525 8.12793 13.4901 8.01562 12.0003 8.01562C10.5102 8.01562 9.24757 8.12799 8.18994 8.37159Z" fill="black"/>
          </svg>
          <span class="text">Password</span>
        </span>
        <span class="option" data-name="profile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9617 11.8921H11.9927C14.8247 11.8921 17.1287 9.58814 17.1287 6.75614C17.1287 3.92414 14.8247 1.61914 11.9927 1.61914C9.15975 1.61914 6.85575 3.92414 6.85575 6.75314C6.85075 8.12214 7.37975 9.41014 8.34375 10.3811C9.30675 11.3511 10.5917 11.8881 11.9617 11.8921ZM8.35575 6.75614C8.35575 4.75114 9.98775 3.11914 11.9927 3.11914C13.9977 3.11914 15.6287 4.75114 15.6287 6.75614C15.6287 8.76114 13.9977 10.3921 11.9927 10.3921H11.9647C10.9967 10.3901 10.0897 10.0101 9.40775 9.32314C8.72575 8.63714 8.35275 7.72614 8.35575 6.75614Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.40552 18.7561C4.40552 22.3811 10.1215 22.3811 11.9995 22.3811C13.8775 22.3811 19.5945 22.3811 19.5945 18.7341C19.5945 15.9411 16.1165 13.5811 11.9995 13.5811C7.88352 13.5811 4.40552 15.9511 4.40552 18.7561ZM5.90552 18.7561C5.90552 17.0211 8.51152 15.0811 11.9995 15.0811C15.4885 15.0811 18.0945 17.0101 18.0945 18.7341C18.0945 20.1581 16.0435 20.8811 11.9995 20.8811C7.95652 20.8811 5.90552 20.1661 5.90552 18.7561Z" fill="black"/>
          </svg>
          <span class="text">Profile</span>
        </span>
        <span class="option"  data-name="images">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.58093 11.413C7.30893 11.413 6.27393 10.378 6.27393 9.106C6.27393 7.832 7.30893 6.797 8.58093 6.797C9.85393 6.798 10.8889 7.834 10.8889 9.106C10.8889 10.378 9.85293 11.413 8.58093 11.413ZM8.57993 8.297C8.13593 8.297 7.77393 8.659 7.77393 9.106C7.77393 9.551 8.13593 9.913 8.58093 9.913C9.02693 9.913 9.38893 9.551 9.38893 9.106C9.38893 8.66 9.02593 8.298 8.57993 8.297Z" fill="black"/>
            <path d="M6.06878 17.2081C5.95678 17.2081 5.84178 17.1831 5.73478 17.1291C5.36478 16.9441 5.21478 16.4961 5.39778 16.1261C5.50278 15.9151 6.46278 14.0721 8.06378 14.0721C8.88778 14.0721 9.49078 14.5201 9.97578 14.8821C10.4478 15.2321 10.7568 15.4471 11.1598 15.4471C11.4448 15.4431 12.1838 14.5541 12.5808 14.0751C13.4278 13.0551 14.3048 11.9991 15.4218 11.9991C17.3358 11.9991 18.5258 14.5441 18.6548 14.8341C18.8228 15.2121 18.6538 15.6541 18.2758 15.8231C17.9008 15.9941 17.4548 15.8241 17.2848 15.4461C16.9998 14.8111 16.1678 13.4991 15.4218 13.4991C15.0097 13.4991 14.2454 14.4188 13.7384 15.0288L13.7348 15.0331C12.9178 16.0181 12.1458 16.9471 11.1598 16.9471C10.2398 16.9471 9.59678 16.4691 9.08078 16.0851C8.65278 15.7681 8.37578 15.5721 8.06378 15.5721C7.52878 15.5721 6.94178 16.3961 6.74078 16.7941C6.60878 17.0571 6.34378 17.2081 6.06878 17.2081Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12.0001C2 19.3831 4.617 22.0001 12 22.0001C19.383 22.0001 22 19.3831 22 12.0001C22 4.61712 19.383 2.00012 12 2.00012C4.617 2.00012 2 4.61712 2 12.0001ZM3.5 12.0001C3.5 5.48612 5.486 3.50012 12 3.50012C18.514 3.50012 20.5 5.48612 20.5 12.0001C20.5 18.5141 18.514 20.5001 12 20.5001C5.486 20.5001 3.5 18.5141 3.5 12.0001Z" fill="black"/>
          </svg>
          <span class="text">Images</span>
        </span>
      </div>
    `
  }

  getBio() {
    return `
      <div class="section bio">
        <div class="field">
          <label for="name">Name</label>
          <input type="text" name="name" id="name" required>
        </div>
        <div class="field">
          <label for="role">Role</label>
          <input type="text" name="role" id="role" required>
        </div>
        <div class="field">
          <label for="dob">Date of birth</label>
          <input type="date" name="dob" id="dob" required>
        </div>
        <div class="field">
          <label for="about">About</label>
          <textarea name="about" id="about" cols="auto" rows="auto"></textarea>
        </div>
        <div class="action">
          <button type="button">Update details</button>
        </div>
      </div>
    `
  }

  getContact() {
    return `
      <div class="section contact">
        <div class="field">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" required>
        </div>
        <div class="field">
          <label for="number">Phone</label>
          <input type="tel" name="number" id="number" required>
        </div>
        <div class="field">
          <label for="facebook">Facebook</label>
          <input type="url" name="facebook" id="facebook" required>
        </div>
        <div class="field">
          <label for="instagram">Instagram</label>
          <input type="url" name="instagram" id="instagram" required>
        </div>
        <div class="field">
          <label for="behance">Behance</label>
          <input type="url" name="behance" id="behance" required>
        </div>
        <div class="action">
          <button type="button">Update details</button>
        </div>
      </div>
    `
  }

  getPassword() {
    return `
      <div class="section password">
        <div class="field">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" required>
        </div>
        <div class="field">
          <label for="password1">New password</label>
          <input type="password" name="password1" id="password1" required>
        </div>
        <div class="field">
          <label for="password2">Repeat password</label>
          <input type="password" name="password2" id="password2" required>
        </div>
        <div class="action">
          <button type="button">Update password</button>
        </div>
      </div>
    `
  }

  getProfile() {
    return `
      <div class="section profile">
        <div class="image-preview-container">
          <div class="preview">
            <img id="preview-selected-image" />
          </div>
          <label for="file-upload">Select Image</label>
          <input type="file" id="file-upload" accept="image/*" />
        </div>
        <div class="action">
          <button type="button">Update image</button>
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
        align-items: center;
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
        padding: 15px 0;
        width: 100%;
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: start;
        gap: 0;
      }

      .content > .section {
        /* border: 1px solid black; */
        margin: 0 0 50px 0;
        width: 90%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: start;
        gap: 15px;
      }


      .content > .section > .action {
        /* border: 1px solid black; */
        padding: 20px 0 30px 0;
        width: 80%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        gap: 2px;
      }

      .content > .section.profile > .action {
        width: 300px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }

      .content > .section > .action > button {
        border: none;
        outline: none;
        background-color: rgba(20,167,62,1);
        padding: 10px 30px;
        font-family: var(--font-alt);
        font-weight: 500;
        font-size: 1.1rem;
        color: #ffffff;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        gap: 2px;
        border-radius: 12px;
      }


      .content > .section > .field {
        /*border: 1px solid black;*/
        width: 80%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: start;
        gap: 2px;
      }

      .content > .section > .field > span.error {
        color: #ee7752;
        font-size: 0.8rem;
        display: none;
      }

      .content > .section > .field > label {
        font-family: var(--font-alt);
        padding: 5px 2px;
        color: #404040;
        font-weight: 400;
        font-size: 1.1rem;
      }

      .content > .section > .field > span.wrapper {
        display: flex;
        align-items: center;
        gap: 0;
        width: 100%;
      }

      .content > .section > .field > span.wrapper > span {
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

      .content > .section > .field > span.wrapper > input {
        border: 1px solid #80808037;
        font-size: 1rem;
        width: calc(100% - 60px);
        outline: none;
        padding: 10px 12px;
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        color: #404040;
      }

      .content > .section > .field >  span.wrapper > input:focus {
        border: 1px solid #08b86f60;
      }

      .content > .section > .field > textarea {
        border: 1px solid #80808037;
        font-size: 1rem;
        width: 100%;
        outline: none;
        padding: 10px 12px;
        border-radius: 12px;
        color: #404040;
        max-width: 100%;
        min-width: 100%;
        width: 100%;
        max-height: 140px;
        min-height: 140px;
        height: 140px;
      }

      .content > .section > .field > textarea:focus {
        border: 1px solid #08b86f60;
      }

      .content > .section > .field > input {
        border: 1px solid #80808037;
        font-size: 1rem;
        width: 100%;
        outline: none;
        padding: 10px 12px;
        border-radius: 12px;
        color: #404040;
      }

      .content > .section > .field > input:focus {
        border: 1px solid #08b86f60;
      }


      .image-preview-container {
        border: 1px solid #08b86f60;
        position: relative;
        min-width: 300px;
        max-width: 300px;
        width: 300px;
        min-height: 300px;
        max-height: 300px;
        height: 300px;
        /* margin: 0 auto; */
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 0;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .image-preview-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: none;
        /* margin-bottom: 30px; */
        border-radius: 20px;
      }
      .image-preview-container input {
        display: none;
      }

      .image-preview-container label {
        position: absolute;
        top: 45%;
        padding: 10px 12px;
        margin: 0;
        text-align: center;
        background: #8338ec;
        color: #fff;
        font-size: 1.2rem;
        font-family: var(--font-alt);
        font-weight: 500;
        border-radius: 50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    
      
    </style>
    `
  }
}