
class SANegotiateAndDepositNotify {
    constructor() {
        this.registerNotify();
    }

    registerNotify() {
        const params = [
            {
                key: 'deal_negotiation',
                callback : function (response) {
                    console.log(response);
                    const dataBody = JSON.parse(response.body);
                    createBootstrapNotification({
                        message: dataBody.message + ' <a href="/pos/sa/negotiation-manager" target="_blank"> Xem chi tiết </a>'
                    });
                }
            },
            {
                key: 'deposit',
                callback : function (response) {
                    const dataBody = JSON.parse(response.body);
                    createBootstrapNotification({
                        message: dataBody.message + ' <a href="' + dataBody.link + '" target="_blank"> Xem chi tiết </a>'
                    });
                }
            },
        ];

        params.forEach((it)=> {
            notification.register(it);
        });

    }
}

$(document).ready(function () {
   new SANegotiateAndDepositNotify();
});