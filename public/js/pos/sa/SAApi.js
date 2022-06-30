function SAApi() {
	var _this = this;

	_this.apiList = {
		getChannelStatusList: '/pos/SaApi/getChannelStatusList',
		getChannelTypeList: '/pos/SaApi/getChannelTypeList',
		loadListingOverview: '/pos/SaApi/loadListingOverview',
		getListingDetail: '/pos/SaApi/getListingDetail',
		updateListing: '/pos/SaApi/updateListing',
		createListing: '/pos/SaApi/createListing',
		trackCall: '/pos/SaApi/trackCall',
		sendDIY: '/pos/SaApi/sendDIY',
		resend: '/pos/SaApi/resendAccount',
		unlock: '/pos/SaApi/unlock',
		pushToSAOwnerList: '/pos/SaApi/pushToSAOwnerList',
		createReminder: '/pos/SaApi/createReminder',
		getReminder: '/pos/SaApi/getReminder',
		closeReminder: '/pos/SaApi/closeReminder',
		uploadPhoto: baseUploadApiPublic + 'upload',
		marketReportChartData: '/pos/SaApi/marketReportChartData',
		marketReportData: '/pos/SaApi/marketReportData',
		marketReportList: '/pos/SaApi/marketReportList',
		sendPricingRequest: '/pos/SaApi/sendPricingRequest',
		checkEmptyPopup: '/pos/SaApi/checkEmptyPopup',
		checkEmptyList: '/pos/SaApi/checkEmptyList',
        countCheckEmpty : '/pos/SaApi/countCheckEmpty',
		sendCheckEmptyResult: '/pos/SaApi/sendCheckEmptyResult',
        sendCheckEmptyResultAgain: '/pos/SaApi/sendCheckEmptyResultAgain',
		loadNotificationCurrentUser: '/pos/SaApi/loadNotificationCurrentUser',
		addNoteCRM: '/pos/SaApi/addNoteCRM',
        updateNoteCRM: '/pos/SaApi/updateNoteCRM',
		noteCRMList: '/pos/SaApi/noteCRMList',
		checkHighlight: '/pos/SaApi/checkHighlight',
		countCollectionAndTour: '/pos/SaApi/countCollectionAndTour',
		countAggreate: '/pos/SaApi/countAggreate',
		getValuation: '/pos/SaApi/getValuation',
		getAgentList: '/pos/CommonPos/getAgentList',
		getAgentListV2: '/pos/CommonPos/getAgentListV2',
		getDealTotalList: '/pos/SaApi/getDealTotalList',
		getTourTotalList: '/pos/SaApi/getTourTotalList',
		getDealStatusList: '/pos/SaApi/getDealStatusList',
		sendEvaluationEmail : '/pos/SaApi/sendEvaluationEmail',
        getNegotiationRejectReason : '/pos/SaApi/getNegotiationRejectReason',
        getNegotiationPendingReason : '/pos/SaApi/getNegotiationPendingReason',
		getNegotiationList : '/pos/SaApi/getNegotiationList',
        updateNegotiation : '/pos/SaApi/updateNegotiation',
        getDepositList : '/pos/SaApi/getDepositList',
        getDepositRejectReason : "/pos/SaApi/getDepositRejectReason",
        updateDeposit : "/pos/SaApi/updateDeposit",
		getDepositHistory: "/pos/sa/deposit-history-manager/", // + depositId
		getDepositStatusList: '/pos/SaApi/getDepositStatusList',
        getDepositForm : '/pos/SaApi/getDepositForm',
        getDepositTaskSupport : '/pos/SaApi/getDepositTaskSupport',
        getStatusListingXLList : '/pos/SaApi/getStatusListingXLList',
        doUpdateStatusListingXL : '/pos/SaApi/doUpdateStatusListingXL'
	};

    _this.getStatusListingXLList = function () {
		return $.ajax({
			url: _this.apiList.getStatusListingXLList,
			type: 'GET'
		});
	};

    _this.doUpdateStatusListingXL = function (data) {
        return $.ajax({
            url: _this.apiList.doUpdateStatusListingXL,
            type: 'POST',
            data: JSON.stringify(data)
        });
    };

	_this.getChannelStatusList = function () {
		return $.ajax({
			url: _this.apiList.getChannelStatusList,
			type: 'GET'
		});
	};

	_this.getChannelTypeList = function () {
		return $.ajax({
			url: _this.apiList.getChannelTypeList,
			type: 'GET'
		});
	};


	_this.addNoteCRM = function (data) {
        return $.ajax({
            url: _this.apiList.addNoteCRM,
            type: 'POST',
            data: JSON.stringify(data)
        });
    };

    _this.updateNoteCRM = function (data) {
        return $.ajax({
            url: _this.apiList.updateNoteCRM,
            type: 'POST',
            data: JSON.stringify(data)
        });
    };

	_this.noteCRMList = function (data) {
		return $.ajax({
			url: _this.apiList.noteCRMList,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.loadListingOverview = function (type) {
		return $.ajax({
			url: _this.apiList.loadListingOverview,
			type: 'POST',
			data: JSON.stringify({
				type: type
			})
		});
	};

	_this.loadListingOverviewAdvance = function (data) {
		return $.ajax({
			url: _this.apiList.loadListingOverview,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.getListingDetail = function (data) {
		return $.ajax({
			url: _this.apiList.getListingDetail,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.updateListing = function (data) {
		return $.ajax({
			url: _this.apiList.updateListing,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.createListing = function (data) {
		return $.ajax({
			url: _this.apiList.createListing,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.trackCall = function (data) {
		return $.ajax({
			url: _this.apiList.trackCall,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.sendDIY = function (data) {
		return $.ajax({
			url: _this.apiList.sendDIY,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.unlock = function (data) {
		return $.ajax({
			url: _this.apiList.unlock,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.resend = function (data) {
		return $.ajax({
			url: _this.apiList.resend,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.pushToSAOwnerList = function (data) {
		return $.ajax({
			url: _this.apiList.pushToSAOwnerList,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.createReminder = function (data) {
		return $.ajax({
			url: _this.apiList.createReminder,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.getReminder = function () {
		return $.ajax({
			url: _this.apiList.getReminder,
			type: 'GET'
		});
	};

	_this.closeReminder = function (data) {
		return $.ajax({
			url: _this.apiList.closeReminder,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.marketReportChartData = function (data) {
		return $.ajax({
			url: _this.apiList.marketReportChartData,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.marketReportData = function (data) {
		return $.ajax({
			url: _this.apiList.marketReportData,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.sendPricingRequest = function (data) {
		return $.ajax({
			url: _this.apiList.sendPricingRequest,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.sendCheckEmptyResult = function (data) {
		return $.ajax({
			url: _this.apiList.sendCheckEmptyResult,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

    _this.sendCheckEmptyResultAgain = function (data) {
        return $.ajax({
            url: _this.apiList.sendCheckEmptyResultAgain,
            type: 'POST',
            data: JSON.stringify(data)
        });
    };

	_this.checkHighlight = function (data) {
		return $.ajax({
			url: _this.apiList.checkHighlight,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.loadNotificationCurrentUser = function () {
		console.log("disable this function");
		// return $.ajax({
		// 	url: _this.apiList.loadNotificationCurrentUser,
		// 	type: 'GET'
		// });
	};

	_this.checkEmptyPopup = function () {
		return $.ajax({
			url: _this.apiList.checkEmptyPopup,
			type: 'GET'
		});
	};

    _this.countCheckEmpty = function () {
        return $.ajax({
            url: _this.apiList.countCheckEmpty,
            type: 'GET'
        });
    };

	_this.uploadPhoto = function (data) {
		return FileHelper.ajaxSend(data, _this.apiList.uploadPhoto);
	};

	_this.countAggreate = function (data) {
		return $.ajax({
			url: _this.apiList.countAggreate,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.getValuation = function (data) {
		return $.ajax({
			url: _this.apiList.getValuation,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.sendEvaluationEmail = function (data) {
		return $.ajax({
			url: _this.apiList.sendEvaluationEmail,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.countCollectionAndTour = function (data) {
		return $.ajax({
			url: _this.apiList.countCollectionAndTour,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

	_this.getAgentList = function () {
		return $.ajax({
			url: _this.apiList.getAgentList,
			type: 'GET'
		});
	};

	_this.getDealStatusList = function () {
		return $.ajax({
			url: _this.apiList.getDealStatusList,
			type: 'GET'
		});
	};

	_this.getAgentListV2 = function (data) {
		return $.ajax({
			url: _this.apiList.getAgentListV2,
			type: 'POST',
			data: JSON.stringify(data)
		});
	};

    _this.getNegotiationRejectReason = function () {
        return $.ajax({
            url: _this.apiList.getNegotiationRejectReason,
            type: 'GET',
        });
    };

    _this.getNegotiationPendingReason = function () {
        return $.ajax({
            url: _this.apiList.getNegotiationPendingReason,
            type: 'GET',
        });
    };

	_this.getNegotiationList = function (data) {
        return $.ajax({
            url: _this.apiList.getNegotiationList,
            type: 'POST',
            data: JSON.stringify(data)
        });
    };

    _this.getDepositRejectReason = function (data) {
        return $.ajax({
            url: _this.apiList.getDepositRejectReason,
            type: 'GET'
        });
    };

    _this.sendDepositForm = function (data) {
        return $.ajax({
            url: _this.apiList.updateDeposit,
            type: 'POST',
            data: JSON.stringify(data)
        });
    }

	_this.getDepositStatusList = function () {
		return $.ajax({
			url: _this.apiList.getDepositStatusList,
			type: 'GET'
		});
	};

    _this.sendNegotiationForm = function (data) {
        return $.ajax({
            url: _this.apiList.updateNegotiation,
            type: 'POST',
            data: JSON.stringify(data)
        });
    };

    _this.getDepositForm = function (data) {
        return $.ajax({
            url: _this.apiList.getDepositForm,
            type: 'POST',
            data: JSON.stringify(data)
        });
    };

	// get realEstateGroup
	_this.getRealEstateGroup = function() {
		return $.ajax({
			url: API_LIST.realEstateGroup,
			type: 'GET',
		})
	}
}
