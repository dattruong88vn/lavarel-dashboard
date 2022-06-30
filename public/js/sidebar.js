/**
 * Create custom commission notification element
 * Author: thu.tran@propzy.com
 * Date: 2020/08/13
 */

class CommissionNotificationElement extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
        this.setAttribute('class', 'commission-notification');

        // Get number of commission notification
        this.getCommissionNotification();
    }

    getCommissionNotification() {
        const url = '/common/getCommissionNotification';
        fetch(url)
        .then(res => res.json())
        .then(res => {
            const {
                result, 
                data
            } = res;

            if(result) {
                this.innerHTML = data.dealDeposit < 100 ? data.dealDeposit : '99+';
            }
        })
    }
}
customElements.define('commission-notification-element', CommissionNotificationElement);

