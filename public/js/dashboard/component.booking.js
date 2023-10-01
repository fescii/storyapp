export default class BookingContainer extends HTMLElement {
  constructor() {
    // We are not even going to touch this.
    super();

    // lets create our shadow root
    this.shadowObj = this.attachShadow({ mode: "open" });

    this.render();
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
    // this.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    // console.log('We are inside connectedCallback');
  }

  getTemplate() {
    // Show HTML Here
    return `
      ${this.getBookings()}
      ${this.getStyles()}
    `;
  }

  getBookings() {
    return `   
      <booking-item date-day="Sun" date-date="12" date-month="May" service="Graduation"
        location="Nairobi area, near city park" status="finished" full-name="Fredrick Ochieng" phone="+254713253018"
        email="isfescii@gmail.com" package="Package II"
        other="Lorem ipsum dolor sit amet consecrate, adipisicing elit. Fuga, reprehenderit iusto! Quidem earum distinctio, tenetur nesciunt sed aperiam libero beatae sequi?"
        coverage="About 50 - 100 people to be covered">
      </booking-item>

      <booking-item date-day="Sun" date-date="12" date-month="May" service="Graduation"
        location="Nairobi area, near city park" status="cancelled" full-name="Fredrick Ochieng"
        phone="+254713253018" email="isfescii@gmail.com" package="Package II"
        other="Lorem ipsum dolor sit amet consecrate, adipisicing elit. Fuga, reprehenderit iusto! Quidem earum distinctio, tenetur nesciunt sed aperiam libero beatae sequi?"
        coverage="About 50 - 100 people to be covered">
      </booking-item>

      <booking-item date-day="Fri" date-date="03" date-month="Aug" service="Graduation"
        location="Nairobi area, near city park" status="started" full-name="Fredrick Ochieng" phone="+254713253018"
        email="isfescii@gmail.com" package="Package II"
        other="Lorem ipsum dolor sit amet consecrate, adipisicing elit. Fuga, reprehenderit iusto! Quidem earum distinctio, tenetur nesciunt sed aperiam libero beatae sequi?"
        coverage="About 50 - 100 people to be covered">
      </booking-item>

      <booking-item date-day="Mon" date-date="20" date-month="Sep" service="Graduation"
        location="Nairobi area, near city park" status="pending" full-name="Fredrick Ochieng" phone="+254713253018"
        email="isfescii@gmail.com" package="Package II"
        other="Lorem ipsum dolor sit amet consecrate, adipisicing elit. Fuga, reprehenderit iusto! Quidem earum distinctio, tenetur nesciunt sed aperiam libero beatae sequi?"
        coverage="About 50 - 100 people to be covered">
      </booking-item>

      <booking-item date-day="Tue" date-date="21" date-month="Sep" service="Graduation"
        location="Nairobi area, near city park" status="not-started" full-name="Fredrick Ochieng"
        phone="+254713253018" email="isfescii@gmail.com" package="Package II"
        other="Lorem ipsum dolor sit amet consecrate, adipisicing elit. Fuga, reprehenderit iusto! Quidem earum distinctio, tenetur nesciunt sed aperiam libero beatae sequi?"
        coverage="About 50 - 100 people to be covered">
      </booking-item>

      <booking-item date-day="Tue" date-date="21" date-month="Sep" service="Graduation"
        location="Nairobi area, near city park" status="not-started" full-name="Fredrick Ochieng"
        phone="+254713253018" email="isfescii@gmail.com" package="Package II"
        other="Lorem ipsum dolor sit amet consecrate, adipisicing elit. Fuga, reprehenderit iusto! Quidem earum distinctio, tenetur nesciunt sed aperiam libero beatae sequi?"
        coverage="About 50 - 100 people to be covered">
      </booking-item>
        
    `;
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
        gap: 10px;
      }
      
    </style>
    `;
  }
}
