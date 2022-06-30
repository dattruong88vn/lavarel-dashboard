function PrescreenNotification() {

	var _this = this;

	var apiList = {
		loadNotificationCurrentUser: '/pos/prescreener/loadNotificationCurrentUser',
		updateNotification: '/pos/prescreener/updateNotification'
	};

	var bootstrapNotification = null;

	_this.init = function () {
        registerNotify();
		loadNotificationCurrentUser();
		bindEvent();
	};

	function bindEvent() {
		$('body').off('click', '.notify-reminder-tag2.new-crawler').on('click', '.notify-reminder-tag2.new-crawler', function (e) {
			// e.preventDefault();
			var lsoid = $(this).data('lsoid');
			$.ajax({
				url: apiList.updateNotification,
				type: 'POST',
				data: JSON.stringify({
					mongoId: $(this).data('mongo-id')
				})
			}).done(function (response) {
				window.open('/pos/prescreener/detail/' + lsoid, '_blank');
				loadNotificationCurrentUser();
			});
			return false;
		});

		$('body').off('click', '.multi-listing-list-notification').on('click', '.multi-listing-list-notification', function (e) {
			e.preventDefault();
			var listingIdList = $(this).data('listingidlist').toString().split(',');
			for (var i = 0; i < listingIdList.length; i++) {
				window.open('/pos/prescreener/detail/' + listingIdList[i]);
			}
		});
	}
	
	function registerNotify() {
		var pagrams = [
			{
                key: 'listing_assigned',
                callback: function (response) {
                    var response = JSON.parse(response.body);
                    createBootstrapNotification({
                        message: response.message + ' <a href="' + response.link + '" target="_blank"> Xem chi tiết </a>'
                    });
                }
			},
			{
                key: 'reassigned_district_to_pre_user',
                callback: function (response) {
                    var response = JSON.parse(response.body);
                    if (hasValue(response)) {
                        var message = response.message + '<br/>Bạn cần đăng xuất và đăng nhập lại để cập nhật thông tin mới nhất';
                        showPropzyAlert(message, 'Thông báo', function () {
                            window.location = '/logout';
                        });
                    }
                }
			},
			{
                key: 'reassigned_district_to_old_pre_user',
                callback: function (response) {
                    var response = JSON.parse(response.body);
                    if (hasValue(response)) {
                        var message = response.message + '<br/>Bạn cần đăng xuất và đăng nhập lại để cập nhật thông tin mới nhất';
                        showPropzyAlert(message, 'Thông báo', function () {
                            window.location = '/logout';
                        });
                    }
                }
			},
			{
                key: 'reassigned_prescreen_listing',
                callback: function (response) {
                    var response = JSON.parse(response.body);
                    var message = 'Prescreen reassigned có gì đóa sai sai';
                    if (hasValue(response.link)) {
                        message = response.message + ' <a href="' + response.link + '" target="_blank"> Xem chi tiết </a>';
                    } else {
                        var listingIdList = response.lsoIds;
                        if (hasValue(listingIdList)) {
                            if (listingIdList.length > 0) {
                                listingIdList = listingIdList.join();
                                message = response.message + ' <a class="multi-listing-list-notification" href="javascript:void(0);" data-listingIdList="' + listingIdList + '"> Xem chi tiết </a>';
                            }
                        }
                    }
                    createBootstrapNotification({
                        message: message
                    });
                }
			},
			{
                key: "broadcast_create_prescreen_listing",
                callback: function (response) {
                    var response = JSON.parse(response.body);
                    createBootstrapNotification({
                        message: response.message + ' <a href="' + response.link + '" target="_blank"> Xem chi tiết </a>'
                    });
                }
			}
		];

		$.each(pagrams, function (i, val) {
            notification.register(val);
        });
    }

	function loadNotificationCurrentUser(params) {
		console.log("disable this function");
		// var _params = {
		// 	menuList: $('.notifications-menu .assignedNotificationList'),
		// 	menuCount: $('.notifications-menu .assignedNotificationList').closest('li.dropdown.notifications-menu').find('span.newAssignedListingCount'),
		// 	showNotification: true,
		// 	menuFooter: $('.notifications-menu .footer')
		// };

		// _params = $.extend(true, _params, params);

		// $.ajax({
		// 	url: apiList.loadNotificationCurrentUser,
		// 	type: 'GET'
		// }).done(function (response) {
		// 	$(_params.menuList).html('');
		// 	var count = 0;
		// 	if (response.result) {
		// 		var html = '';
		// 		for (var i in response.data) {
		// 			if (response.data[i].isRead == false) {
		// 				if (hasValue(response.data[i].lsoIds)) {
		// 					for (var j = 0; j < response.data[i].lsoIds.length; j++) {
		// 						count++;
		// 						html += '<li><a href="javascript:void(0)" data-lsoid="' + response.data[i].lsoIds[j] + '" data-mongo-id="' + response.data[i].id + '" class="notify-reminder-tag2 new-crawler" target="_blank"><h4>Bạn vừa được giao phụ trách 1 tin đăng từ Pos Manager</h4><small><i class="fa fa-clock-o"></i> ' + moment(response.data[i].createdDate).format('DD/MM/YYYY HH:mm:ss') + '</small> <small><span class="badge pull-right">#' + response.data[i].lsoIds[j] + '</span></small></a></li>'
		// 					}
		// 				} else {
		// 					count++;
		// 					html += '<li><a href="javascript:void(0)" data-lsoid="' + response.data[i].lsoId + '" data-mongo-id="' + response.data[i].id + '" class="notify-reminder-tag2 new-crawler" target="_blank"><h4>' + response.data[i].message + '</h4><small><i class="fa fa-clock-o"></i> ' + moment(response.data[i].createdDate).format('DD/MM/YYYY HH:mm:ss') + '</small> <small><span class="badge pull-right">#' + response.data[i].lsoId + '</span></small></a></li>'
		// 				}
		// 			}
		// 		}
		// 		$(_params.menuList).append(html);
		// 		if (count > 0) {
		// 			if (_params.showNotification == true) {
		// 				bootstrapNotification = createBootstrapNotification({
		// 					message: 'Prescreen: Bạn có <code>' + count + '</code> tin đăng mới'
		// 				});
		// 			}
		// 		}
		// 		$(_params.menuCount).text(count);
		// 	}
		// });
	}
}

$(document).ready(function () {
	(new PrescreenNotification()).init();
});