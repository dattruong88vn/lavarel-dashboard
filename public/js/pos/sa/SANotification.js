class SANotification extends NotifyPos {
	constructor() {
	    super();
		this.registerNotify();
		this.bindEvent();
	}

	bindEvent() {
        $('body').off('click', '.multi-listing-list-notification').on('click', '.multi-listing-list-notification', function (e) {
            e.preventDefault();
            const rlistingIdList = $(this).data('rlistingidlist').toString().split(',');
            for (let i = 0; i < rlistingIdList.length; i++) {
                window.open('/pos/sa/detail/' + rlistingIdList[i]);
            }
        });
	}

	registerNotify() {
	    const that = this;
	    const notificationSpecial = [
            {
                // request negotiation
                id : 61,
                code : "assign_new_task",
                callback : function (response) {
                    console.log(response);
                    const dataBody = JSON.parse(response.body);
                    if(Window.dealNegotiation) {
                        Window.dealNegotiation.table().ajax.reload();
                        createBootstrapNotification({
                            message: dataBody.message
                        });
                    } else {
                        createBootstrapNotification({
                            message: dataBody.message + ' <a href="/pos/sa/negotiation-manager" target="_blank">Xem chi tiết </a>'
                        });
                    }
                }
            },
            {
                id : 62,
                code : "assign_new_task",
                callback : function (response) {
                    console.log(response);
                    const dataBody = JSON.parse(response.body);
                    createBootstrapNotification({
                        message: dataBody.message + ' <a href="/pos/sa/deposit-manager" target="_blank"> Xem chi tiết </a>'
                    });
                }
            },
            {
                id : 65,
                code : "ba_update_deposit",
                callback : function (response) {
                    console.log(response);
                    const dataBody = JSON.parse(response.body);
                    createBootstrapNotification({
                        message: dataBody.message + ' <a href="/pos/sa/deposit-manager" target="_blank">Xem chi tiết </a>'
                    });
                }
            },
            {
                id : null,
                code : "DEAL_UPDATE_SCORECARD",
                callback : function (response) {
                    console.log(response);
                    const dataBody = JSON.parse(response.body);
                    createBootstrapNotification({
                        message: dataBody.message + ` <a href="/deal/detail/${dataBody.dealId}" target="_blank">Xem chi tiết</a>`
                    });
                }
            },
            {
                id : 53,
                code : "deal_deposit_support",
                callback : function (response) {
                    console.log(response);
                    const dataBody = JSON.parse(response.body);
                    if(Window.depositSupport) {
                        Window.depositSupport.loadTable();
                        createBootstrapNotification({
                            message: dataBody.message
                        });
                    } else {
                        if(dataBody.code != "DEAL_UPDATE_SCORECARD"){ // fix case dublicate noti DEAL_UPDATE_SCORECARD
                            createBootstrapNotification({
                                message: dataBody.message + ' <a href="/pos/sa/deposit-support-manager" target="_blank">Xem chi tiết </a>'
                            });
                        }
                    }

                }
            }
        ];
        const params = [
            {
                code: 'seller_listing_assigned',
                callback: function (response) {
                    const dataBody = JSON.parse(response.body);
                    createBootstrapNotification({
                        message: dataBody.message + ' <a href="/pos/sa/detail/' + dataBody.rlistingId + '" target="_blank"> Xem chi tiết </a>'
                    });
                    //reloadSACheckEmpty();
                }
            },
			{
                code: 'reassigned_seller_listing',
                callback: function (response) {
                    const dataBody = JSON.parse(response.body);
                    let message = 'SA reassigned có gì đóa sai sai';
                    if (hasValue(dataBody.link)) {
                        message = dataBody.message + ' <a href="' + dataBody.link + '" target="_blank"> Xem chi tiết </a>';
                    } else {
                        const rlistingIdList = dataBody.rlistingIdList;
                        if (hasValue(rlistingIdList)) {
                            if (rlistingIdList.length > 0) {
                                const rlistingIdListString = rlistingIdList.join();
                                message = dataBody.message + ' <a class="multi-listing-list-notification" href="javascript:void(0);" data-rlistingIdList="' + rlistingIdListString + '"> Xem chi tiết </a>';
                            }
                        }
                    }
                    createBootstrapNotification({
                        message: message
                    });
                }
			},
            {
                code: 'reassigned_district_to_sa_user',
                callback: function (response) {
                    const dataBody = JSON.parse(response.body);
                    if (hasValue(dataBody)) {
                        const message = dataBody.message + '<br/>Bạn cần đăng xuất và đăng nhập lại để cập nhật thông tin mới nhất';
                        showPropzyAlert(message, 'Thông báo', function () {
                            window.location = '/logout';
                        });
                    }
                }
            },
            {
                code: 'reassigned_district_to_old_sa_user',
                callback: function (response) {
                    const dataBody = JSON.parse(response.body);
                    if (hasValue(dataBody)) {
                        const message = dataBody.message + '<br/>Bạn cần đăng xuất và đăng nhập lại để cập nhật thông tin mới nhất';
                        showPropzyAlert(message, 'Thông báo', function () {
                            window.location = '/logout';
                        });
                    }
                }
            }
        ];

        notificationSpecial.forEach(it => {
            that.registerWS(it);
        });

        params.forEach((it)=> {
            //notification.register(it);
            that.registerWS(it);
        });
	}
}

$(document).ready(function () {
	new SANotification();
});