/**
 * Create custom commission notification element
 * Author: thu.tran@propzy.com
 * Date: 2020/08/13
 */

class BPONotificationElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
      // this.setAttribute('class', 'commission-notification');

      // Get number of commission notification
      this.getBPONotification();
      setInterval(() => { this.getBPONotification() }, 300000);
  }

  getBPONotification() {
      const url = '/bpo/getBPONotification';
      fetch(url)
      .then(res => res.json())
      .then(res => {
          const {
              result, 
              data
          } = res;

          if(result) {
              this.innerHTML = data.count < 100 ? data.count : '99+';
              
              if (data.count === 0) {
                $('#bpo-notification').css('display', 'none');
                $('#bpo-notification-all').css('display', 'none');
              } else {
                $('#bpo-notification').css('display', 'inline-block');
                $('#bpo-notification-all').css('display', 'inline-block');
              }
          }
      })
  }
}
customElements.define('bpo-notification-element', BPONotificationElement);
