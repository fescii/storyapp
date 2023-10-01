document.addEventListener('DOMContentLoaded', () => {
  const bookBtns = document.querySelectorAll('#book-now')
  const modalContainer = document.querySelector('div#modal-container')
  const modal = `
    <modal-book
      url="/good/"
      id="1"
    >
    </modal-book>
  `
  if (bookBtns) {
    bookBtns.forEach(bookBtn => {
      bookBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        e.preventDefault()
        modalContainer.innerHTML = modal
        // console.log('clicked')
        // modalContainer.insertAdjacentElement('beforeend', modal)
      })
    });				
  }

  const video = document.querySelector("video#background-video");
  if (video) {
    video.playbackRate = 0.5;
  }


  // Slider
  const dots = document.querySelectorAll('div.categories > div.category.long > .dots > span.dot');
  let activeDot = document.querySelector('div.categories > div.category.long > .dots > span.dot.active');
  const slides = document.querySelectorAll('div.categories > div.category.long > .slide');
  let currentIndex = 0;
  let reverse = 1; // 1 for forward, -1 for backward

  if (dots && activeDot && slides) {
    function showSlide(index) {
      if (dots && activeDot){
        activeDot.classList.remove('active')
        dots[index].classList.add('active')
        activeDot = dots[index]
      }
      slides.forEach((slide, i) => {
        if( !index === i) {
          const offset = -(i - index)  * 100 * reverse;
          slide.style.transform = `translateX(${offset}%)`;
        }
        else{
          const offset = -index  * 100;
          slide.style.transform = `translateX(${offset}%)`;
        }
      });
   }
  
    function nextSlide() {
      if (currentIndex >= 3){
        reverse = -1 // Reverse direction at the start or end
        //currentIndex += reverse
      }
      else if(currentIndex <= 0) {
        reverse = 1; // Reverse direction at the start or end
        //currentIndex += reverse
      }
  
      currentIndex += reverse;
  
  
      showSlide(currentIndex);
    }
  
    setInterval(nextSlide, 2500); // Adjust the interval (in milliseconds) for automatic sliding
  }

  // Switcher
  const numbers = document.querySelectorAll('body > main.main > section.landing > .numbers > span.no');
  let activeNo = document.querySelector('body > main.main > section.landing > .numbers > span.no.active');
  const switches = document.querySelectorAll('body > main.main > section.landing > .content-one');
  let switchIndex = 0;
  let flow = 1; // 1 for forward, -1 for backward
  
  if (switches) {
    function showSwitch(index) {
      if (numbers && activeNo){
        activeNo.classList.remove('active')
        numbers[index].classList.add('active')
        activeNo = numbers[index]
      }
      switches.forEach((switchItem, i) => {
        if(!index === i) {
          console.log(`Running\n Index: ${index} --- i:${i}`)
          const offset = -(i - index)  * 100 * flow;
          switchItem.style.transform = `translateX(${offset}%)`;
        }
        else{
          const offset = -index  * 100;
          switchItem.style.transform = `translateX(${offset}%)`;
        }
      });
    }
    
    function nextSwitch() {
      if (switchIndex >= 4){
        flow = -1 // Reverse direction at the start or end
        //currentIndex += reverse
      }
      else if(switchIndex <= 0) {
        flow = 1; // Reverse direction at the start or end
        //currentIndex += reverse
      }
    
      switchIndex += flow;
    
    
      showSwitch(switchIndex);
    }
    
    setInterval(nextSwitch, 6000); // Adjust the interval (in milliseconds) for automatic sliding
  }

})

