function SACancel() {
	var _this = this;

	const stored = {
		cancelList : new Map()
	};

	_this.init = function () {
        _this.timer = new TimerCountDown();
		initVAR();
		bindDOMData();
		bindEvent();
	};

	function initVAR() {
        _this.timer.init();
		var api = Window.sa.api;

		_this.cancelListingButtonId = '#cancel-listing';
		_this.cancelChannelStatusListId = '#cancel-channel-status';
		_this.selectStatusUncooperative = '#cancel-channel-status-child';
		_this.cancelListingModalId = '#cancel-listing-modal';
		_this.cancelListing = function (data, callback) {
			showPropzyLoading();
			Window.sa.detail.cancel(data, callback);
		};

		_this.loadCancelChannelStatusList = function () {
			api.getChannelTypeList().done(function (response) {
				if (response.result) {
					let statusList = [];
					const statusListFilter = response.data.filter(it => it.type == 4);

					if (statusListFilter.length > 0) {
						statusList = statusListFilter[0].list;
					}
					let data = [{
						id : '',
						statusId : '',
						text :  '--- Vui lòng chọn ---'
					}];
					statusList.forEach(it => {
						stored.cancelList.set(it.id, it);
						data.push({
							id : it.id,
							statusId : it.value,
							text :  it.name
						});
					});
					$(_this.cancelChannelStatusListId).select2({
						data : data
					});
					$(_this.cancelChannelStatusListId).trigger('change');
				}
			});
		};
	}

	function bindEvent() {
        // action khi bấm checkbox mặc định
        $('#defaultContractTo').click(function(){
            if($(this).is(':checked')){
                var nextYear = moment().add(1, 'years').format('DD/MM/YYYY');
                $('#contractFrom').val(moment().format('DD/MM/YYYY'));
                $('#contractTo').val(nextYear);
            }
        });
        // action khi bấm "Ngưng đăng tin" trong popup
		$('body').off('click', _this.cancelListingButtonId).on('click', _this.cancelListingButtonId, function (e) {
			e.preventDefault();
			let status = $(_this.cancelChannelStatusListId).val() ? Number.parseInt($(_this.cancelChannelStatusListId).val()) : null;
			let statusId = null;
			if (!hasValue(status)) {
				posNotifyAlert({type: "pos-notify-danger", message : 'Bạn chưa chọn lý do hủy tin đăng'});
				return false;
			}
			statusId = $(_this.cancelChannelStatusListId).select2('data')[0].statusId;

			let childs = [];
			if (stored.cancelList.has(status)) {
				const statusSelect = stored.cancelList.get(status);
				if (statusSelect.childs && statusSelect.childs.length > 0) {
					childs = statusSelect.childs;
				}
			}
			if (childs.length > 0) {
				status = $(_this.selectStatusUncooperative).val() ? Number.parseInt($(_this.selectStatusUncooperative).val()) : null;
				if (!hasValue(status)) {
					posNotifyAlert({type: "pos-notify-danger", message : 'Bạn chưa chọn lý do hủy tin đăng'});
					return false;
				}
				statusId = $(_this.selectStatusUncooperative).select2('data')[0].statusId;
			}
			//showPropzyLoading();
			const data = {
				statusId: statusId,
				reasonId: status,
				reasonContent: $(_this.cancelListingModalId).find('.reasonContent').val(),
				price: null,
				soldDate: null,
				contractFrom: null,
				contractTo: null
			};
            if(status == 165 && Window.jsDetailData.listingTypeId == 2){
                // khách tự giao dịch + thuê
                if (!hasValue($(_this.cancelListingModalId).find('#contractFrom').val())) {
                    posNotifyAlert({type: "pos-notify-danger", message : 'Bạn chưa chọn ngày bắt đầu cho thuê'});
                    return false;
                }
                if (!hasValue($(_this.cancelListingModalId).find('#contractTo').val())) {
                    posNotifyAlert({type: "pos-notify-danger", message : 'Bạn chưa chọn ngày kết thúc cho thuê'});
                    return false;
                }
            }
			switch (status) {
				case 165 : {
					switch (Window.jsDetailData.listingTypeId) {
						case 1 : {
							let price = $.trim($(_this.cancelListingModalId).find('#soldPrice').val()) ? $.trim($(_this.cancelListingModalId).find('#soldPrice').val()).replace(/,/g, '') : null;
							data.price = price;
							data.soldDate = $(_this.cancelListingModalId).find('#soldDate').val() ? moment($(_this.cancelListingModalId).find('#soldDate').val(), 'DD/MM/YYYY').unix() * 1000 : null;
							break;
						}
						case 2 : {
							let price = $.trim($(_this.cancelListingModalId).find('#rentPrice').val()) ? $.trim($(_this.cancelListingModalId).find('#rentPrice').val()).replace(/,/g, '') : null;
							data.price = price;
							data.contractFrom = $(_this.cancelListingModalId).find('#contractFrom').val() ? moment($(_this.cancelListingModalId).find('#contractFrom').val(), 'DD/MM/YYYY').unix() * 1000 : null;
							data.contractTo = $(_this.cancelListingModalId).find('#contractTo').val() ? moment($(_this.cancelListingModalId).find('#contractTo').val(), 'DD/MM/YYYY').unix() * 1000 : null;

							break;
						}
					}
					break;
				}
				case 169 : {
					data.reasonContent = $(_this.cancelListingModalId).find('#reasonContent').val() ?  $(_this.cancelListingModalId).find('#reasonContent').val() : null;
					break;
				}
			}
            console.log(data);
			showPropzyLoading();
			_this.cancelListing(data, function (response) {
				hidePropzyLoading();
				if (response.result) {
                    _this.timer.done(function(dataPost) {
                        let dataSend = {};
                        dataSend.openedDate = dataPost.initTimeStamp;
                        dataSend.duration = dataPost.timer;
                        dataSend.rListingId = Window.jsDetailData.rlistingId;
                        $.ajax({
                            url: "/time-counter/save-time-counter-sa",
                            data: JSON.stringify(dataSend),
                            type: "post"
                        }).done(function (response) {
                            console.log(response);
                        }).fail(function (err) {
                            console.error(err);
                        });
                    });
					$(_this.cancelListingModalId).modal('hide');
					Window.sa.detail.showConfirmBuyNewHouse();
				} else {
					showPropzyAlert(response.message, 'Thông Báo');
				}
			});
		});
		$('body').off('hidden.bs.modal', _this.cancelListingModalId).on('hidden.bs.modal', _this.cancelListingModalId, function (e) {
			e.preventDefault();
			$(_this.cancelChannelStatusListId).val('').select2();
			$(_this.selectStatusUncooperative).val('').select2();
			$(_this.cancelChannelStatusListId).trigger('change');
			$(_this.selectStatusUncooperative).trigger('change');
		});
		$('body').off('change', _this.cancelChannelStatusListId).on('change', _this.cancelChannelStatusListId, function (e) {
			e.preventDefault();
			const $modal = $(_this.cancelListingModalId);

			$(_this.selectStatusUncooperative).html('');
			const status = parseInt($(this).val());
			let childs = [];
			if (stored.cancelList.has(status)) {
				const statusSelect = stored.cancelList.get(status);
				if (statusSelect.childs && statusSelect.childs.length > 0) {
					childs = statusSelect.childs;
				}
			}
			if (childs.length > 0) {
				$modal.find('.cancel-channel-status-child-wrapper').show();
				const data = childs.map(it => {
					return {
						id : it.id,
						statusId : it.value,
						text : it.name
					};
				});
				$(_this.selectStatusUncooperative).select2({
					data : [{
						id : '',
						statusId : '',
						text :  '--- Vui lòng chọn ---'
					}].concat(data)
				});
			} else {
				$modal.find('.cancel-channel-status-child-wrapper').hide();
			}

			//

			$modal.find('.sold-group').hide();
			$modal.find('.contract-group').hide();
		});
		$('body').off('change', _this.selectStatusUncooperative).on('change', _this.selectStatusUncooperative, function (e) {
			const status = parseInt($(this).val());
			const $modal = $(_this.cancelListingModalId);
			$modal.find('.sold-group').hide();
			$modal.find('.contract-group').hide();
			if (status == 165) { // khach tu giao dich
				switch (Window.jsDetailData.listingTypeId) {
					case 1 : {
						$modal.find('.sold-group').show();
						break;
					}
					case 2 : {
						$modal.find('.contract-group').show();
						break;
					}
				}
			}
			if (status == 169) {
				$modal.find('.reasonContent-wrapper').show();
			} else {
				$modal.find('.reasonContent-wrapper').hide();
			}
		});
	}

	function bindDOMData() {
		_this.loadCancelChannelStatusList();
	}
}