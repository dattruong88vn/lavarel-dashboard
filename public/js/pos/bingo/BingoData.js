function Bingo() {
	var _this = this;

	_this.init = function () {
		initVAR();
		bindEvent();
	};

	function initVAR() {
		_this.filterData = new FilterData();
		_this.filterData.callback = loadReport;
		_this.filterData.init();
		_this.reportGroup = '#report-group';
		_this.uiIdList = {
			showReport: '#show-report',
			getExport: '#get-export'
		}
	}

	function bindEvent() {
		$('body').off('click', _this.uiIdList.showReport).on('click', _this.uiIdList.showReport, function (e) {
			e.preventDefault();
			loadReport();
		});

		$('body').off('click', _this.uiIdList.getExport).on('click', _this.uiIdList.getExport, function (e) {
			e.preventDefault();
			_this.filterData.updateData();
			getExport(_this.filterData);
		});
	}

	function showReportTitle() {
		var title = '';
		var subtitle = '';
		if (_this.filterData.filterData.compare == false) {
			title = 'Báo cáo ';
			subtitle = 'Từ ngày <code>' + moment(_this.filterData.filterData.dateFrom).format('DD/MM/YYYY') + '</code> đến ngày <code>' + moment(_this.filterData.filterData.dateTo).format('DD/MM/YYYY') + '</code>';
		} else {
			title = 'Báo cáo so sánh';
			subtitle = 'Từ ngày <code>' + moment(_this.filterData.filterData.dateFrom).format('DD/MM/YYYY') + '</code> đến ngày <code>' + moment(_this.filterData.filterData.dateTo).format('DD/MM/YYYY') + '</code>: Dữ liệu<br>Từ ngày <code>' + moment(_this.filterData.filterData.dateFromCompare).format('DD/MM/YYYY') + '</code> đến ngày <code>' + moment(_this.filterData.filterData.dateToCompare).format('DD/MM/YYYY') + '</code>: Dữ liệu so sánh';
		}
		$('.overview-title').html(title);
		$('.overview-subtitle').html(subtitle);
	}

	function getExport(filterData) {
		filterData = filterData.filterData;
		showPropzyLoading();
		var api = {
			getExport: '/pos/bingo/getExport'
		};
		$.ajax({
			url: api.getExport,
			type: 'POST',
			data: JSON.stringify(filterData)
		}).done(function (response) {
			hidePropzyLoading();
			if (response.result) {
				window.open(response.data.link);
			} else {
				showPropzyAlert(response.message);
			}
		})
	}

	function loadReport() {
		$('#report-group').html('');
		var _filterDataList = _this.filterData.filterDataList();
		showReportTitle();
		var bingoReportList = [];
		for (var i = 0; i < _filterDataList.length; i++) {
			bingoReportList.push(new BingoReport());
			bingoReportList[i].init();
			bingoReportList[i].areaReportGroupId = '#' + initReportPlaceholder(_filterDataList[i]);
			bingoReportList[i].reportGroup = _this.reportGroup;
			bingoReportList[i].filterData = _filterDataList[i];
		}
		for (var i = 0; i < _filterDataList.length; i++) {
			bingoReportList[i].loadData();
		}
	}

	function initReportPlaceholder(params) {
		var areaReportGroupId = 'areaReportGroupId' + Math.random().toString().replace(/\./, '');
		d3.select(_this.reportGroup)
			.append('div')
			.attr('id', areaReportGroupId)
			.html('<div class="box box-info"><div class="box-body"><div class="form-horizontal"><div class="form-group"><div class="col-md-12"><h2 class="report-title" style="font-weight: 700;">KHU VỰC: ' + params.areaName.toUpperCase() + '</h2></div></div>' +
				'<div class="form-group">' +
				'<div data-style="overflow-x: auto;">' +
				'<div class="col-md-12"><h3 class="report-subtitle" style="font-weight: 700;">BÁO CÁO LEAD</h3></div>' +
				'<div class="col-md-7">' +
				'<div class="row"><div class="col-md-12"><div id="' + areaReportGroupId + '-lead-chart-wrapper" style="height: 450px;"></div></div></div>' +
				'</div>' +
				'<div class="col-md-5">' +
				'<ul class="bingo-overview-wrapper">' +
				'<li class="bingo-overview-wrapper-item">LEAD trong khu vực <span id="lead-total-area-wrapper" class="label label-success"></span></li>' +
				'<li class="bingo-overview-wrapper-item">LEAD tất cả khu vực <span id="lead-total-all-area-wrapper" class="label label-success"></span></li>' +
				'</ul>' +
				'<div id="lead-legend-data-table-wrapper"></div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="form-group">' +
				'<div data-style="overflow-x: auto;">' +
				'<div class="col-md-12"><h3 class="report-subtitle" style="font-weight: 700;">BÁO CÁO TIN ĐĂNG</h3></div>' +
				'<div class="col-md-7">' +
				'<div class="row"><div class="col-md-12"><div id="' + areaReportGroupId + '-listing-chart-wrapper" style="height: 450px;"></div></div></div>' +
				'</div>' +
				'<div class="col-md-5">' +
				'<ul class="bingo-overview-wrapper">' +
				'<li class="bingo-overview-wrapper-item">Tin đăng trong khu vực <span id="listing-total-area-wrapper" class="label label-success"></span></li>' +
				'<li class="bingo-overview-wrapper-item">Tin đăng tất cả khu vực <span id="listing-total-all-area-wrapper" class="label label-success"></span></li>' +
				'</ul>' +
				'<div id="listing-legend-data-table-wrapper"></div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="form-group">' +
				'<div data-style="overflow-x: auto;">' +
				'<div class="col-md-12"><h3 class="report-subtitle" style="font-weight: 700;">BÁO CÁO NGUỒN TIN ĐĂNG</h3></div>' +
				'<div class="col-md-12">' +
				'<div class="row"><div class="col-md-12"><div id="' + areaReportGroupId + '-listing-source-chart-wrapper" style="height: 450px;"></div></div></div>' +
				'</div>' +
				'<div class="col-md-12">' +
				'<ul class="bingo-overview-wrapper">' +
				'<li class="bingo-overview-wrapper-item">Nguồn tin đăng trong khu vực <span id="listing-source-total-area-wrapper" class="label label-success"></span></li>' +
				'<li class="bingo-overview-wrapper-item">Nguồn tin đăng tất cả khu vực <span id="listing-source-total-all-area-wrapper" class="label label-success"></span></li>' +
				'</ul>' +
				'<div id="listing-source-legend-data-table-wrapper"></div>' +
				'</div>' +
				'</div>' +
				'</div></div></div></div>');
		return areaReportGroupId;
	}

	function FilterData() {
		var _this = this;
		var api = {
			loadDistrictIdListByHCMArea: '/pos/bingo/loadDistrictIdListByHCMArea'
		};
		var uiIdList = {
			areaFilterItem: '.area-filter-item',
			dateRange1Item: '#date-range-1-item',
			dateRange2Item: '#date-range-2-item',
			dateFrom1: '#date-from-1',
			dateFrom2: '#date-from-2',
			dateTo1: '#date-to-1',
			dateTo2: '#date-to-2',
			applyFilter: '#apply-filter',
			listingTypeId: '#listingTypeId',
			propertyTypeId: '#propertyTypeId',
			source: '#source',
			compare: '#compare'
		};
		var areaList = [
			{
				area: 1,
				active: true,
				name: 'Trung tâm 1',
				districtId: null
			},
			{
				area: 2,
				active: true,
				name: 'Trung tâm 2',
				districtId: null
			},
			{
				area: 3,
				active: true,
				name: 'Đông',
				districtId: null
			},
			{
				area: 4,
				active: true,
				name: 'Tây',
				districtId: null
			},
			{
				area: 5,
				active: true,
				name: 'Nam',
				districtId: null
			},
			{
				area: 6,
				active: true,
				name: 'Bắc',
				districtId: null
			}
		];
		var sourceList = [];
		_this.callback = function (response) {
		};
		var showReport = '#show-report';

		_this.init = function () {
			initVAR();
			initUI();
			bindEvent();
		};

		function initVAR() {
			_this.filterData = {
				titleId: 1,
				area: null,
				areaName: '',
				sourceIds: null,
				sourceName: null,
				compare: false,
				listingTypeId: null,
				propertyTypeId: null,
				listingTypeName: null,
				propertyTypeName: null,
				dateFrom: moment().add(-1, 'day').startOf('day').unix() * 1000,
				dateTo: moment().endOf('day').unix() * 1000,
				dateFromCompare: null,
				dateToCompare: null
			};
			_this.updateData = updateData;
			_this.filterDataList = filterDataList;
			ajaxCall(loadDistrictIdListByHCMArea, function (response) {
				// var _response = response;
				if (response.result) {
					for (var i = 0; i < response.data.length; i++) {
						areaList[i].area = response.data[i].area;
						areaList[i].districtId = response.data[i].districtId;
					}
					loadListingTypeId();
					loadPropertyTypeIdList().done(function () {
						$(uiIdList.propertyTypeId).trigger('change');
						_this.callback();
					});
				} else {
					showPropzyAlert(response.message);
				}
			});
		}

		function filterDataList() {
			var _filterDataList = [];
			updateData();
			for (var i = 0; i < areaList.length; i++) {
				if (areaList[i].active) {
					_filterDataList.push({
						area: areaList[i].districtId,
						areaName: areaList[i].name,
						sourceIds: _this.filterData.sourceIds,
						sourceName: _this.filterData.sourceName,
						compare: _this.filterData.compare,
						listingTypeId: _this.filterData.listingTypeId,
						listingTypeName: _this.filterData.listingTypeName,
						propertyTypeId: _this.filterData.propertyTypeId,
						propertyTypeName: _this.filterData.propertyTypeName,
						dateFrom: _this.filterData.dateFrom,
						dateTo: _this.filterData.dateTo,
						dateFromCompare: _this.filterData.dateFromCompare,
						dateToCompare: _this.filterData.dateToCompare
					});
				}
			}
			return _filterDataList;
		}

		function initUI() {
			initDateRange1Picker();
			loadListingTypeId();
			loadSelect2();
			loadSourceId();
		}

		function loadListingTypeId() {
			_this.filterData.listingTypeId = $(uiIdList.listingTypeId).val();
			if (!hasValue(_this.filterData.listingTypeId)) {
				_this.filterData.listingTypeId = null;
			}
		}

		function loadPropertyTypeIdList() {
			var html = '<option value="">Tất cả</option>';
			var listingTypeId = $(uiIdList.listingTypeId).val();
			listingTypeId = hasValue(listingTypeId) ? listingTypeId : 9999;
			$(uiIdList.propertyTypeId).html('');
			return Listing.getPropertyTypeV2Prefix(listingTypeId).done(function (response) {
				let { data } = response;
				for (var i = 0; i < data.length; i++) {
					html += '<option value="' + data[i].propertyTypeId + '">' + data[i].prefixName + '</option>';
				}
				$(uiIdList.propertyTypeId).html(html);
			});
		}

		function loadSourceId() {
			return Listing.getChannelTypes().done(function (response) {
				var html = '';
				$(uiIdList.source).html('');
				if (response.result) {
					$.each(response.data, function (id, type) {
						if (type.type == 1) {
							$.each(type.list, function (key, item) {
								if ($.inArray(item.id, [2, 5, 7, 9, 166]) == -1) {
									html = '<option value="' + item.id + '">' + item.name + '</option>';
									sourceList.push({
										id: item.id,
										active: true,
										name: item.name
									});
									$(uiIdList.source).append(html);
								}
							});
							$(uiIdList.source).trigger('change');
							return false;
						}
					})
				} else {
					showPropzyAlert(response.message);
				}
			});
		}

		function loadSelect2() {
			$('select').select2();
		}

		function updateAreaList() {
			for (var i = 0; i < areaList.length; i++) {
				areaList[i].active = false;
			}
			$('.active.checked').each(function (i, item) {
				var area = $(item).data('area');
				if (area == -1) {
					for (var i = 0; i < areaList.length; i++) {
						areaList[i].active = true;
					}
				} else {
					areaList[area].active = true;
				}
			})
		}

		function updateData() {
			updateSourceName();
			updateListingTypeName();
			updateExportArea();
		}

		function updateExportArea() {
			_this.filterData.area = '';
			_this.filterData.areaName = '';
			for (var i = 0; i < areaList.length; i++) {
				if (areaList[i].active) {
					_this.filterData.areaName += ', ' + areaList[i].name;
					_this.filterData.area += ',' + areaList[i].districtId;
				}
			}
			if (hasValue(_this.filterData.areaName)) {
				_this.filterData.areaName = _this.filterData.areaName.replace(', ', '');
			}
			if (hasValue(_this.filterData.area)) {
				_this.filterData.area = _this.filterData.area.replace(',', '');
			}
		}

		function updateListingTypeName() {
			_this.filterData.listingTypeName = $('#listingTypeId option:selected').text();
		}

		function updateSourceName() {
			_this.filterData.sourceName = '';
			if (hasValue(_this.filterData.sourceIds)) {
				var _sourceIds = _this.filterData.sourceIds.split(',');
				for (var k = 0; k < _sourceIds.length; k++) {
					for (var i = 0; i < sourceList.length; i++) {
						if (sourceList[i].id == parseInt(_sourceIds[k])) {
							_this.filterData.sourceName += ', ' + sourceList[i].name;
							break;
						}
					}
				}
			} else {
				_this.filterData.sourceIds = null;
				for (var source in sourceList) {
					_this.filterData.sourceName += ', ' + sourceList[source].name;
				}
			}
			if (hasValue(_this.filterData.sourceName)) {
				_this.filterData.sourceName = _this.filterData.sourceName.replace(', ', '');
			} else {
				_this.filterData.sourceName = '';
			}
		}

		function bindEvent() {
			$('body').off('click', uiIdList.areaFilterItem).on('click', uiIdList.areaFilterItem, function (e) {
				var area = parseInt($(this).data('area'));
				if (area == -1) {
					$(uiIdList.areaFilterItem + ':not([data-area=-1])').removeClass('active checked');
					$(this).addClass('active checked');
				} else {
					$(uiIdList.areaFilterItem + '[data-area=-1]').removeClass('active checked');
					$(this).toggleClass('active checked');
				}
				updateAreaList();
			});

			$('body').off('change', uiIdList.dateRange1Item).on('change', uiIdList.dateRange1Item, function (e) {
				collectDateRange1FilterData($(this).val());
				initDateRange1Picker();
			});

			$('body').off('change', uiIdList.dateRange2Item).on('change', uiIdList.dateRange2Item, function (e) {
				collectDateRange2FilterData($(this).val());
				initDateRange2Picker();
			});

			$('body').off('change', uiIdList.dateFrom1).on('change', uiIdList.dateFrom1, function (e) {
				updateDateRange1Picker();
				initDateRange1Picker();
			});

			$('body').off('change', uiIdList.dateTo1).on('change', uiIdList.dateTo1, function (e) {
				updateDateRange1Picker();
				initDateRange1Picker();
			});

			$('body').off('change', uiIdList.dateFrom2).on('change', uiIdList.dateFrom2, function (e) {
				updateDateRange2Picker();
				initDateRange2Picker();
			});

			$('body').off('change', uiIdList.dateTo2).on('change', uiIdList.dateTo2, function (e) {
				updateDateRange2Picker();
				initDateRange2Picker();
			});

			$('body').off('change', uiIdList.listingTypeId).on('change', uiIdList.listingTypeId, function (e) {
				_this.filterData.listingTypeId = parseInt($(this).val());
				_this.filterData.listingTypeName = $(this).find('option:selected').text();
				loadPropertyTypeIdList();
			});

			$('body').off('change', uiIdList.propertyTypeId).on('change', uiIdList.propertyTypeId, function (e) {
				_this.filterData.propertyTypeId = $(this).val();
				if (!hasValue(_this.filterData.propertyTypeId)) {
					_this.filterData.propertyTypeId = null;
				}
				_this.filterData.propertyTypeName = $(this).find('option:selected').text();
			});

			$('body').off('change', uiIdList.source).on('change', uiIdList.source, function (e) {
				_this.filterData.sourceIds = $(this).val();
				if (hasValue(_this.filterData.sourceIds)) {
					_this.filterData.sourceIds = _this.filterData.sourceIds.join(',');
				}
				updateSourceName();
			});

			$('body').off('change', uiIdList.compare).on('change', uiIdList.compare, function (e) {
				_this.filterData.compare = $(this).is(':checked');
				if (_this.filterData.compare) {
					if (!hasValue(_this.filterData.dateFromCompare)) {
						_this.filterData.dateFromCompare = moment().startOf('day').unix() * 1000;
						_this.filterData.dateToCompare = moment().endOf('day').unix() * 1000;
						initDateRange2Picker();
					}
					$('#compare-group').show();
				} else {
					$('#compare-group').hide();
				}
			});

			$('body').off('keypress').on('keypress', function (e) {
				if (e.keyCode == 13) {
					$(showReport).trigger('click');
				}
			});
		}

		function initDateRange1Picker() {
			$(uiIdList.dateFrom1).val(moment(_this.filterData.dateFrom).format('DD/MM/YYYY'));
			$(uiIdList.dateFrom1)
				.datepicker({
					format: 'dd/mm/yyyy',
					todayHighlight: true
				})
				.on('changeDate', function (ev) {
					if ($(this).val() === '' || $(this).val() === null) {
						$(this).val(moment($(this).datepicker('getDate')).format('DD/MM/YYYY')).datepicker('update');
					}
					$(this).datepicker('hide');
					// $('#date-range-1-item').val('custom');
					// $('#date-range-1-item').trigger('change');
				})
				.on('keypress', function (e) {
					if (e.keyCode == 13) {
						$(showReport).trigger('change');
					}
				});
			// .on('blur', function (e) {
			// 	if (moment($(this).val()).isValid() == false) {
			// 		// $(this).val(moment(_this.filterData.dateFrom).format('DD/MM/YYYY'));
			// 		$(uiIdList.dateFrom1).datepicker('setDate', moment(_this.filterData.dateTo).format('DD/MM/YYYY'));
			// 	}
			// });
			$(uiIdList.dateFrom1).datepicker('setEndDate', moment(_this.filterData.dateTo).format('DD/MM/YYYY'));

			$(uiIdList.dateTo1).val(moment(_this.filterData.dateTo).format('DD/MM/YYYY'));
			$(uiIdList.dateTo1)
				.datepicker({
					format: 'dd/mm/yyyy',
					todayHighlight: true
				})
				.on('changeDate', function (ev) {
					if ($(this).val() === '' || $(this).val() === null) {
						$(this).val(moment($(this).datepicker('getDate')).format('DD/MM/YYYY')).datepicker('update');
					}
					$(this).datepicker('hide');

				})
				.on('keypress', function (e) {
					if (e.keyCode == 13) {
						$(showReport).trigger('change');
					}
				});
			// .on('blur', function (e) {
			// 	if (moment($(this).val()).isValid() == false) {
			// 		// $(this).val(moment(_this.filterData.dateTo).format('DD/MM/YYYY'));
			// 		$(uiIdList.dateTo1).datepicker('setStDate', moment(_this.filterData.dateFrom).format('DD/MM/YYYY'));
			// 	}
			// });
			$(uiIdList.dateTo1).datepicker('setStartDate', moment(_this.filterData.dateFrom).format('DD/MM/YYYY'));
		}

		function updateDateRange1Picker() {
			_this.filterData.dateFrom = moment($(uiIdList.dateFrom1).val(), 'DD/MM/YYYY').unix() * 1000;
			_this.filterData.dateTo = moment($(uiIdList.dateTo1).val(), 'DD/MM/YYYY').unix() * 1000;
		}

		function initDateRange2Picker() {
			$(uiIdList.dateFrom2).val(moment(_this.filterData.dateFromCompare).format('DD/MM/YYYY'));
			$(uiIdList.dateFrom2)
				.datepicker({
					format: 'dd/mm/yyyy',
					todayHighlight: true
				})
				.on('changeDate', function (ev) {
					if ($(this).val() === '' || $(this).val() === null) {
						$(this).val(moment($(this).datepicker('getDate')).format('DD/MM/YYYY')).datepicker('update');
					}
					$(this).datepicker('hide');
					// $('#date-range-2-item').val('custom');
					// $('#date-range-2-item').trigger('change');
				})
				.on('keypress', function (e) {
					if (e.keyCode == 13) {
						$(showReport).trigger('change');
					}
				});
			// .on('blur', function (e) {
			// 	if (moment($(this).val()).isValid() == false) {
			// 		// $(this).val(moment(_this.filterData.dateFromCompare).format('DD/MM/YYYY'));
			// 		$(uiIdList.dateFrom2).datepicker('setDate', moment(_this.filterData.dateToCompare).format('DD/MM/YYYY'));
			// 	}
			// });
			$(uiIdList.dateFrom2).datepicker('setEndDate', moment(_this.filterData.dateToCompare).format('DD/MM/YYYY'));
			$(uiIdList.dateTo2).val(moment(_this.filterData.dateToCompare).format('DD/MM/YYYY'));
			$(uiIdList.dateTo2)
				.datepicker({
					format: 'dd/mm/yyyy',
					todayHighlight: true
				})
				.on('changeDate', function (ev) {
					if ($(this).val() === '' || $(this).val() === null) {
						$(this).val(moment($(this).datepicker('getDate')).format('DD/MM/YYYY')).datepicker('update');
					}
					$(this).datepicker('hide');

				})
				.on('keypress', function (e) {
					if (e.keyCode == 13) {
						$(showReport).trigger('change');
					}
				});
			// .on('blur', function (e) {
			// 	if (moment($(this).val()).isValid() == false) {
			// 		// $(this).val(moment(_this.filterData.dateToCompare).format('DD/MM/YYYY'));
			// 		$(uiIdList.dateTo2).datepicker('setDate', moment(_this.filterData.dateFromCompare).format('DD/MM/YYYY'));
			// 	}
			// });
			$(uiIdList.dateTo2).datepicker('setStartDate', moment(_this.filterData.dateFromCompare).format('DD/MM/YYYY'));
		}

		function updateDateRange2Picker() {
			_this.filterData.dateFromCompare = moment($(uiIdList.dateFrom2).val(), 'DD/MM/YYYY').unix() * 1000;
			_this.filterData.dateToCompare = moment($(uiIdList.dateTo2).val(), 'DD/MM/YYYY').unix() * 1000;
		}

		function collectDateRange1FilterData(type) {
			if (type == 'default') {
				_this.filterData.dateFrom = moment().add(-1, 'day').startOf('day').unix() * 1000;
			} else {
				if (type == 'daily') {
					_this.filterData.dateFrom = moment().startOf('day').unix() * 1000;
				} else {
					if (type == 'weekly') {
						_this.filterData.dateFrom = moment().startOf('isoWeek').unix() * 1000;
					} else {
						if (type == 'monthly') {
							_this.filterData.dateFrom = moment().startOf('month').unix() * 1000;
						} else {
							if (type == 'yearly') {
								_this.filterData.dateFrom = moment().startOf('year').unix() * 1000;
							} else {
								// custom
								// do nothing
							}
						}
					}
				}
			}
			_this.filterData.dateTo = moment().endOf('day').unix() * 1000;
		}

		function collectDateRange2FilterData(type) {

			if (type == 'today') {
				_this.filterData.dateFromCompare = moment().startOf('day').unix() * 1000;
				_this.filterData.dateToCompare = moment().endOf('day').unix() * 1000;
			} else {
				if (type == 'yesterday') {
					_this.filterData.dateFromCompare = moment().add(-1, 'day').startOf('day').unix() * 1000;
					_this.filterData.dateToCompare = moment().add(-1, 'day').endOf('day').unix() * 1000;
				} else {
					if (type == 'last-week') {
						_this.filterData.dateFromCompare = moment().add(-1, 'week').startOf('week').unix() * 1000;
						_this.filterData.dateToCompare = moment().add(-1, 'week').endOf('week').unix() * 1000;
					} else {
						if (type == 'last-month') {
							_this.filterData.dateFromCompare = moment().add(-1, 'month').startOf('month').unix() * 1000;
							_this.filterData.dateToCompare = moment().add(-1, 'month').endOf('month').unix() * 1000;
						} else {
							if (type == 'last-7-days') {
								_this.filterData.dateFromCompare = moment().add(-7, 'day').startOf('day').unix() * 1000;
								_this.filterData.dateToCompare = moment().endOf('day').unix() * 1000;
							} else {
								if (type == 'last-30-days') {
									_this.filterData.dateFromCompare = moment().add(-30, 'day').startOf('day').unix() * 1000;
									_this.filterData.dateToCompare = moment().endOf('day').unix() * 1000;
								} else {
									// custom
									// do nothing
								}
							}
						}
					}
				}
			}
		}

		function loadDistrictIdListByHCMArea() {
			return $.ajax({
				url: api.loadDistrictIdListByHCMArea,
				type: 'GET'
			});
		}
	}

	function BingoReport() {
		var _this = this;
		var api = {
			loadBingoReportData: '/pos/bingo/loadBingoReportData'
		};
		var reportData = null;

		_this.init = function () {
			initVAR();
		};

		function initVAR() {
			_this.reportGroup = null;
			_this.areaReportGroupId = null;
			_this.filterData = {};
			_this.loadData = function () {
				ajaxCall(loadBingoReportData, function (response) {
					if (response.result) {
						reportData = response.data;
						showReport();
					} else {
						showPropzyAlert(response.message);
					}
				});
			};
		}

		function showReport() {
			delete _this.reportList;
			_this.reportList = [];
			_this.reportList.push(new Report({
				data: reportData.areaALead,
				totalArea: reportData.totalAreaLead,
				totalAreaCompare: reportData.totalAreaLeadc,
				totalAllArea: reportData.allAreaLead,
				totalAllAreaCompare: reportData.allAreaLeadc,
				barWidth: 20,
				dataCompare: reportData.areaALeadComp,
				filterData: _this.filterData,
				areaReportGroupId: _this.reportGroup + ' ' + _this.areaReportGroupId,
				legendDataTableWrapper: _this.reportGroup + ' ' + _this.areaReportGroupId + ' #lead-legend-data-table-wrapper',
				chartWrapper: _this.areaReportGroupId + '-lead-chart-wrapper',
				chartWidth: d3.select(_this.reportGroup + ' ' + _this.areaReportGroupId + '-lead-chart-wrapper').node().getBoundingClientRect().width,
				reportType: 'LEAD',
				reportTypeName: 'Lead',
				chartComparePattern: '#compare-pattern-fill',
				chartHeight: 400,
				axisTitleFontSize: 20,
				totalAreaWrapper: '#lead-total-area-wrapper',
				totalAllAreaWrapper: '#lead-total-all-area-wrapper'
			}));
			_this.reportList.push(new Report({
				data: reportData.areaAListing,
				totalArea: reportData.totalAreaListing,
				totalAreaCompare: reportData.totalAreaListingc,
				totalAllArea: reportData.allAreaListing,
				totalAllAreaCompare: reportData.allAreaListingc,
				barWidth: 20,
				dataCompare: reportData.areaAListingComp,
				filterData: _this.filterData,
				areaReportGroupId: _this.reportGroup + ' ' + _this.areaReportGroupId,
				legendDataTableWrapper: _this.reportGroup + ' ' + _this.areaReportGroupId + ' #listing-legend-data-table-wrapper',
				chartWrapper: _this.areaReportGroupId + '-listing-chart-wrapper',
				chartWidth: d3.select(_this.reportGroup + ' ' + _this.areaReportGroupId + '-listing-chart-wrapper').node().getBoundingClientRect().width,
				reportType: 'Tin đăng',
				reportTypeName: 'Tin đăng',
				chartComparePattern: '#compare-pattern-fill',
				chartHeight: 400,
				axisTitleFontSize: 20,
				totalAreaWrapper: '#listing-total-area-wrapper',
				totalAllAreaWrapper: '#listing-total-all-area-wrapper'
			}));
			_this.reportList.push(new Report({
				data: reportData.areaAListingSource,
				totalArea: reportData.totalAreaListingSource,
				totalAreaCompare: reportData.totalAreaListingSourcec,
				totalAllArea: reportData.allAreaListingSource,
				totalAllAreaCompare: reportData.allAreaListingSourcec,
				barWidth: 20,
				dataCompare: reportData.areaAListingSourceComp,
				filterData: _this.filterData,
				areaReportGroupId: _this.reportGroup + ' ' + _this.areaReportGroupId,
				legendDataTableWrapper: _this.reportGroup + ' ' + _this.areaReportGroupId + ' #listing-source-legend-data-table-wrapper',
				chartWrapper: _this.areaReportGroupId + '-listing-source-chart-wrapper',
				chartWidth: d3.select(_this.reportGroup + ' ' + _this.areaReportGroupId + '-listing-source-chart-wrapper').node().getBoundingClientRect().width,
				reportType: 'Nguồn',
				reportTypeName: 'Tin đăng',
				chartComparePattern: '#compare-pattern-fill',
				chartHeight: 400,
				axisTitleFontSize: 20,
				totalAreaWrapper: '#listing-source-total-area-wrapper',
				totalAllAreaWrapper: '#listing-source-total-all-area-wrapper'
			}));
			for (var i = 0; i < _this.reportList.length; i++) {
				_this.reportList[i].init();
			}
		}

		function loadBingoReportData() {
			return $.ajax({
				url: api.loadBingoReportData,
				type: 'POST',
				data: JSON.stringify(_this.filterData)
			});
		}

		function Report(params) {
			var _this = this;
			var data = params.data;
			var dataCompare = params.dataCompare;
			var filterData = params.filterData;
			var legendDataTableWrapper = params.legendDataTableWrapper;
			var areaReportGroupId = params.areaReportGroupId;
			var chartWrapper = params.chartWrapper;
			var reportType = params.reportType;
			var reportTypeName = params.reportTypeName;
			var chartComparePattern = params.chartComparePattern;
			var barWidth = params.barWidth;
			var chartHeight = params.chartHeight;
			var axisTitleFontSize = params.axisTitleFontSize;
			var chartWidth = params.chartWidth;
			var totalArea = params.totalArea;
			var totalAllArea = params.totalAllArea;
			var totalAreaCompare = params.totalAreaCompare;
			var totalAllAreaCompare = params.totalAllAreaCompare;
			var totalAreaWrapper = params.totalAreaWrapper;
			var totalAllAreaWrapper = params.totalAllAreaWrapper;
			var tableData = {
				heading: null,
				body: []
			};
			var tableId = 'tableId' + Math.random().toString().replace(/\./g, '');

			_this.init = function () {
				showOverview();
				initVAR();
				bindEvent();
			};

			function showOverview() {
				var _totalArea = totalArea + (hasValueV2(totalAreaCompare) ? (' / ' + totalAreaCompare) : '');
				var _totalAllArea = totalAllArea + (hasValueV2(totalAllAreaCompare) ? (' / ' + totalAllAreaCompare) : '');
				$(areaReportGroupId + ' ' + totalAreaWrapper).text(_totalArea);
				$(areaReportGroupId + ' ' + totalAllAreaWrapper).text(_totalAllArea);
			}

			function bindEvent() {
				// $('body').off('mouseover', legendDataTableWrapper + ' tr[data-position]').on('mouseover', legendDataTableWrapper + ' tr[data-position]', function (e) {
				// 	e.preventDefault();
				// 	var position = $(this).data('position');
				// 	var fill = d3.select(chartWrapper)
				// 		.select('.bar[data-position="' + position + '"]')
				// 		.attr('fill');
				// 	$(this).css('background-color', fill);
				// });
				// $('body').off('mouseout', legendDataTableWrapper + ' tr[data-position]').on('mouseout', legendDataTableWrapper + ' tr[data-position]', function (e) {
				// 	e.preventDefault();
				// 	$(this).css('background-color', '');
				// });
			}

			function initVAR() {
				bindTableData();
				showReport();
			}

			function showReport() {
				showChart();
				showTableData();
			}

			function bindTableData() {
				var heading = [reportType];
				var body = null;

				var reportItems = data[0].reportItems;
				for (var i = 0; i < reportItems.length; i++) {
					heading.push(reportItems[i].districtName);
				}
				tableData.heading = heading;

				delete reportItems;

				if (hasValue(dataCompare)) {
					var reportItemsCompare = null;
					for (var i = 0; i < data.length - 1; i++) {
						body = [];
						reportItems = data[i].reportItems;
						reportItemsCompare = dataCompare[i].reportItems;
						body.push(data[i].name);
						for (var j = 0; j < reportItems.length; j++) {
							body.push(reportItems[j].numberListing + ' / ' + reportItemsCompare[j].numberListing);
						}
						tableData.body.push(body);
					}

					body = [];
					reportItems = data[data.length - 1].reportItems;
					reportItemsCompare = dataCompare[dataCompare.length - 1].reportItems;
					body.push(data[data.length - 1].name);
					for (var i = 0; i < reportItems.length; i++) {
						body.push(reportItems[i].percent + ' /' + reportItemsCompare[i].percent);
					}
					tableData.body.push(body);
				} else {
					for (var i = 0; i < data.length - 1; i++) {
						body = [];
						reportItems = data[i].reportItems;
						body.push(data[i].name);
						for (var j = 0; j < reportItems.length; j++) {
							body.push(reportItems[j].numberListing);
						}
						tableData.body.push(body);
					}

					body = [];
					reportItems = data[data.length - 1].reportItems;
					body.push(data[data.length - 1].name);
					for (var i = 0; i < reportItems.length; i++) {
						body.push(reportItems[i].percent);
					}
					tableData.body.push(body);
				}
			}

			function showTableData() {
				var html = '<table id="' + tableId + '" class="table table-bordered table-striped lengend-data-table" style="width: 100%;">';
				html += '<thead><tr>';

				for (var i = 0; i < tableData.heading.length; i++) {
					html += '<th>' + tableData.heading[i] + '</th>';
				}

				html += '</tr></thead><tbody>';
				for (var i = 0; i < tableData.body.length - 2; i++) {
					var position = i + 1;
					html += '<tr data-position="' + position + '">';
					for (var j = 0; j < tableData.body[i].length; j++) {
						html += '<td style="white-space: nowrap;">' + tableData.body[i][j] + '</td>';
					}
					html += '</tr>';
				}
				for (var i = tableData.body.length - 2; i < tableData.body.length; i++) {
					var position = i + 1;
					html += '<tr style="background-color: #3498db; color: #ffffff">';
					for (var j = 0; j < tableData.body[i].length; j++) {
						html += '<td style="font-weight: 700;">' + tableData.body[i][j] + '</td>';
					}
					html += '</tr>';
				}
				html += '</tbody></table>';

				$(legendDataTableWrapper).html(html);
			}

			function buildReportData(_data) {
				var i, j, reportItems;
				var _resultData = [
					['Name']
				];
				for (i = 0; i < _data.length - 2; i++) {
					_resultData[0].push(_data[i].name);
					// _resultData[0].push({role: 'annotation'});
				}
				for (i = 0; i < _data[0].reportItems.length; i++) {
					_resultData.push([_data[0].reportItems[i].districtName]);
				}
				for (i = 0; i < _data.length - 2; i++) {
					reportItems = _data[i].reportItems;
					for (j = 0; j < reportItems.length; j++) {
						_resultData[j + 1].push(reportItems[j].numberListing);
						// _resultData[j + 1].push(reportItems[j].numberListing);
					}
				}
				return _resultData;
			}

			function buildReportDataDiff(_data) {
				var i, j, reportItems;
				var _resultData = [
					['Name']
				];
				for (i = 0; i < _data.length - 2; i++) {
					_resultData[0].push(_data[i].name);
				}
				for (i = 0; i < _data[0].reportItems.length; i++) {
					_resultData.push([_data[0].reportItems[i].districtName]);
				}
				for (i = 0; i < _data.length - 2; i++) {
					reportItems = _data[i].reportItems;
					for (j = 0; j < reportItems.length; j++) {
						_resultData[j + 1].push(reportItems[j].numberListing);
					}
				}
				return _resultData;
			}

			function showChart() {
				google.charts.load('current', {packages: ['corechart']});
				google.charts.setOnLoadCallback(drawChart);

				function findMaxData(_data) {
					var _maxData = 0;
					for (var i = 1; i < _data.length; i++) {
						for (var j = 1; j < _data[i].length; j++) {
							if (_maxData < _data[i][j]) {
								_maxData = _data[i][j];
							}
						}
					}
					return _maxData;
				}

				function buildTicks(_maxValue) {
					var _ticks = [];
					var _steps = 6;
					var _step = _maxValue / _steps;
					if (parseInt(_step) < _step) {
						_step = parseInt(_step) + 1;
					}
					// var _tmp = parseInt(_step / 5);
					// if (_tmp * 5 < _step) {
					// 	_step = _tmp * 5 + 5;
					// }
					for (var i = 0; i <= _steps; i++) {
						_ticks.push(i * _step);
					}
					return _ticks;
				}

				function buildTicksV2(_maxValue) {
					var _ticks = [];
					var _tickSteps = [1, 2, 5];
					var _tickStepIndex = 0;
					var _steps = 6;
					var _anpha = 1;
					while (_tickSteps[_tickStepIndex] * _steps * _anpha <= _maxValue) {
						_tickStepIndex++;
						if (_tickStepIndex == _tickSteps.length) {
							_tickStepIndex = 0;
							_anpha = _anpha * 10;
						}
					}
					_tickSteps = _tickSteps[_tickStepIndex] * _anpha;
					for (var i = 0; i <= _steps; i++) {
						_ticks.push(i * _tickSteps);
					}
					return _ticks;
				}

				function drawChart() {
					var _options = {
						// title: 'BÁO CÁO ' + reportType.toUpperCase(),
						// sliceVisibilityThreshold: 10,
						legend: {
							position: 'top',
							maxLines: 3
						},
						chartArea: {
							// width: '100%',
							left: 50,
							// top: 20
						},
						// hAxis: {
						// 	title: 'Quận'
						// }
						annotations: {
							alwaysOutside: true
						},
						tooltip: {
							isHtml: true
						}
					};
					if (!hasValue(dataCompare)) {
						var _data = buildReportData(data);
						var _maxValue = findMaxData(_data);
						_data = google.visualization.arrayToDataTable(_data);
						var chart = new google.visualization.ColumnChart(document.getElementById(chartWrapper.replace('#', '')));
						var _chartData = null;
						_chartData = _data;
					} else {
						var _data = buildReportDataDiff(data);
						var _maxValue = findMaxData(_data);
						_data = google.visualization.arrayToDataTable(_data);
						var chart = new google.visualization.ColumnChart(document.getElementById(chartWrapper.replace('#', '')));
						var _chartData = null;
						var _dataCompare = buildReportDataDiff(dataCompare);
						if (_maxValue < findMaxData(_dataCompare)) {
							_maxValue = findMaxData(_dataCompare);
						}
						_dataCompare = google.visualization.arrayToDataTable(_dataCompare);
						_options.diff = {
							oldData: {
								opacity: 1,
								tooltip: {
									prefix: 'Dữ liệu so sánh: '
								},
								color: '#C0C0C0',
								legend: {
									color: '#C0C0C0'
								}
							},
							newData: {
								widthFactor: 1,
								tooltip: {
									prefix: 'Dữ liệu: '
								}
							}
						};
						_chartData = chart.computeDiff(_dataCompare, _data);
					}
					_options.vAxis = {
						title: reportTypeName,
						format: 'decimal',
						viewWindow: {
							min: 0
						},
						ticks: buildTicks(_maxValue)
					};
					chart.draw(_chartData, _options);
					$('g[column-id="-1"] rect[fill="#eeeeee"]').attr('fill', '#c0c0c0');
					$('g[column-id="-1"] text:contains(Previous data)').text('Dữ liệu so sánh');
				}
			}
		}
	}
}

$(document).ready(function () {
	(new Bingo()).init();
});