/*
 */
var API_LIST = {
	// quận
	getDistrictList: '/zone/get-district-list-by-city',
	// phường
	getWardList: '/zone/get-wards',
	// đường
	getStreetList: '/zone/get-streets',
	// phân loại chủ nhà / môi giới / nhà đầu tư /
	getStatusList: '/pos/crawler/get-status-list',
	// Bán, cho thuê
	getListingType: '/lso/get-property-types',
	// Nhom BDS
	getRealEstateGroup: '/lso/get-real-estate-group',
	// Chung cư / căn hộ, biệt thự, ...
	getPropertyType: '/lso/get-property-type-list',
	// get Building
	getBuilding: '/pos/crawler/get-buildings',
	// get Building list by district id
	getBuildingListByDistrictId: '/pos/crawler/getBuildingListByDistrictId',
	// get Block
	getBlocksByBuilding: '/pos/crawler/get-blocks-by-building',
	// Upload file
	// wiki: http://sc.propzy.vn/root/file_service/wikis/upload
	uploadPhoto: '/pos/crawler/upload-photo',
	// Check cell phone
	checkExistedPhone: '/pos/crawler/check-exists-owner',
	// Check Email
	checkExistedEmail: '/pos/crawler/check-exists-owner',
	// Check Address
	checkSADuplicatedAddress: '/pos/sa/checkSADuplicatedAddress',
	checkSCDuplicatedAddress: '/pos/sa/checkDuplicatedAddress',
	// Inserch a crawle record
	insertCrawler: '/pos/crawler/insert-crawler',

	// Training course
	// + Get training list getTrainingList
		getTrainingList: '/pos/training/get-training-list',
		getDetailTraining: '/pos/training/get-detail', 

	// Get crawler for prescreener
	// + Get crawler listing List
		getCrawlerListingList: '/pos/crawler/getCrawlerListingList',
	// + Get list
		getCrawlerList: '/pos/crawler-list-2/getListCrawler',
	// + Check dupicate
		checkDuplicate: '/pos/crawler-list-2/checkDuplicate',
		checkAddressDuplicate: '/pos/crawler-list-2/checkAddressDuplicate',
	// + transfer
		transferCrawler: '/pos/crawler-list-2/transferCrawler',
	// + Cancel crawler
		changeStatusCrawler: '/pos/crawler-list-2/changeStatus',
	// Get Crawler Statuses
	getCrawlerListingStatuses: '/pos/crawler/getCrawlerListingStatuses',
	// Get listing list for prescreener user
	getPrescreenerListingList: '/pos/prescreener/getListingList',
	// Get Prescreener Overview
	overview: '/pos/prescreener/overview',
	// Get send Diy
	sendDiy: '/pos/prescreener/sendDiy',
	// resend tk
	resendAccountInfo: '/pos/prescreener/resend-account-info',
	// push listing to owner
	pushToOwnerList: '/pos/prescreener/pushToOwnerList', 
	// Get channel Types
	getChannelTypes: '/pos/prescreener/channel-types',
	// Get lock unlock
	getLockUnlock: '/pos/prescreener/lock-unlock',
	// Get channel Status
	getChannelStatus: '/pos/prescreener/channel-status',
	// Create Reminder
	createReminder: '/pos/prescreener/createReminder',
	// Send listing to SA
	sendSA: '/pos/prescreener/sendSA',
	// Update Listing
	updateListing: '/pos/prescreener/updateListing',
	// insertListing for prescreen
	insertListing: '/pos/prescreener/insertListing',
	// userRightTypes
	getUserRightTypes: '/pos/prescreener/user-right-types',
	// Create Reminder
	getReminder: '/pos/prescreener/getReminder',
	// Close Reminder
	closeReminder: '/pos/prescreener/closeReminder',
	// Cancel Listing
	cancelListing: '/pos/prescreener/cancelListing',
	// Track Call
    trackCall: '/pos/prescreener/trackCall',
    // Alley Type
    getAlleyTypes: '/common/get-alley-type',

	realEstateGroup: '/common/real-estate-group',
	// Chung cư / căn hộ, biệt thự, ...
	getPropertyTypeV2: '/common/property-type-list-v2',
	//Get property types with prefix name
	getPropertyTypeV2Prefix: '/lso/get-property-type-list-prefix',
};
/**
 * AJAX Callbacks
 */

var requestLoading = {
	numOfQueue: 0,
	countQueue: 0,
	initCallback: function (numQueue) {
		requestLoading.numOfQueue = numQueue;
		requestLoading.countQueue = 0;
		showPropzyLoading();
	},
	sendRequest: function () {
		requestLoading.numOfQueue++;
	},
	addCallbackToQueue: function () {
		requestLoading.countQueue++;
		if (requestLoading.numOfQueue == requestLoading.countQueue) {
			hidePropzyLoading();
		}
	}
};

var Listing = {
	// quận
	getDistrictList: function (cityId) {
		return $.ajax({
			url: API_LIST.getDistrictList + '/' + cityId,
			type: "GET",
		});
	},

	// phường
	getWardList: function (districtId) {
		return $.ajax({
			url: API_LIST.getWardList + '/' + districtId,
			type: "GET"
		});
	},

	// đường
	getStreetList: function (wardId) {
		return $.ajax({
			url: API_LIST.getStreetList + '/' + wardId,
			type: "GET"
		});
	},

	// chủ nhà, môi giới, nhà đầu tư
	getStatusList: function () {
		return $.ajax({
			url: API_LIST.getStatusList + '/1',
			type: "GET"
		});
	},

	// Bán, cho thuê
	getListingType: function () {
		return $.ajax({
			url: API_LIST.getListingType,
			type: "GET"
		});
	},

	//Nhom BDS
	getRealEstateGroup: function () {
		return $.ajax({
			url: API_LIST.getRealEstateGroup,
			type: "GET"
		});
	},

	// Chung cư / Căn hộ, biệt thự, Nhà riêng, dự án mới,...
	getPropertyType: function (listingTypeId) {
		return $.ajax({
			url: API_LIST.getPropertyType + "/" + listingTypeId,
			type: "GET"
		});
	},
	// Chung cư / Căn hộ, biệt thự, Nhà riêng, dự án mới,...
	getPropertyTypeV2: function (groupId, listingTypeId) {
		return $.ajax({
			url: API_LIST.getPropertyTypeV2 + "/" + groupId + "/" + listingTypeId,
			type: "GET"
		});
	},
	// Get property types with prefix names
	getPropertyTypeV2Prefix: function (listingTypeId) {
		return $.ajax({
			url: API_LIST.getPropertyTypeV2Prefix + "/" + listingTypeId,
			type: "GET"
		});
	},
	// get Building
	getBuilding: function () {
		return $.ajax({
			url: API_LIST.getBuilding,
			type: "GET"
		});
	},
	// get Building list by district id
	getBuildingListByDistrictId: function (districtId) {
		return $.ajax({
			url: API_LIST.getBuildingListByDistrictId,
			type: "POST",
			data: JSON.stringify({
				districtId: (hasValue(districtId) ? districtId : -1)
			})
		});
	},
	// get Building
	getBlocksByBuilding: function (buildingId) {
		if (!buildingId) {
			return ''
		}
		
		return $.ajax({
			url: API_LIST.getBlocksByBuilding + '/' + buildingId,
			type: "GET"
		});
	},
	/**
	 * function validateImageUpload
	 *
	 * function check Image Upload
	 * @date 12/10/2017
	 */
	validateImageUpload: function (file) {
		if (typeof file != undefined) {
			if (file.size > 5 * 1024 * 1024) {
				showPropzyAlert(INVALID_SIZE_IMG);
				return false;
			}
			var supportImageTypes = [
				"image/jpeg",
				"image/gif",
				"image/png"
			];

			if (supportImageTypes.indexOf(file.type) < 0) {
				showPropzyAlert(INVALID_TYPE_IMG);
				return false;
			}

			return true;
		} else {
			showPropzyAlert(EMPTY_FILE);
			return false;
		}
	},

	/**
	 * function prepareUploadFiles
	 *
	 * function callback fileReader with multi image
	 * @date 12/10/2017
	 */
	prepareUploadFiles: function (event, callback) {
		event.preventDefault();
		var e = event;

		var isFirefox = typeof InstallTrigger !== 'undefined';

		var fileElement = null;
		if (isFirefox) {
			fileElement = e.originalEvent.target;
		} else {
			fileElement = e.originalEvent.srcElement;
		}

		for (var i = 0; i < fileElement.files.length; i++) {
			var file = fileElement.files[i];
			(function (file) {
				var validFile = Listing.validateImageUpload(file);
				if (!validFile) {
					e.target.value = "";
					return false;
				}

				var reader = new FileReader();
				var objCallback = {
					reader: reader,
					file: file,

				};
				callback(objCallback);
				reader.readAsDataURL(file);
			})(fileElement.files[i]);
		}
	},

	// Upload photo by ajax
	uploadPhoto: function (formData) {
		return FileHelper.ajaxSend(formData, API_LIST.uploadPhoto);
	},

	// check existed phone
	checkExistedPhone: function (phones, type, ownerId = null) {
		var postData = {
			email: null,
			phones: phones,
			ownerId: ownerId,
			type: type
		};
		return $.ajax({
			url: API_LIST.checkExistedPhone,
			type: "POST",
			data: JSON.stringify(postData)
		});
	},
	// check existed email
	checkExistedEmail: function (email, type, ownerId = null) {
		var postData = {
			email: email,
			phones: null,
			ownerId: ownerId,
			type: type
		};
		return $.ajax({
			url: API_LIST.checkExistedEmail,
			type: "POST",
			data: JSON.stringify(postData)
		});
	},

	// check existed address
	checkExistedAddress: function (address) {
		var postData = {
			"cityId": null,
			"districtId": null,
			"wardId": null,
			"streetId": null,
			"houseNumber": null,
		};
		$.extend(postData, address);
		return $.ajax({
			url: API_LIST.checkSADuplicatedAddress,
			type: "POST",
			data: JSON.stringify(postData)
		})
	},
	// check existed address
	checkExistedAddressForPrescreen: function (address) {
		var postData = {
			"cityId": null,
			"districtId": null,
			"wardId": null,
			"streetId": null,
			"houseNumber": null,
		};
		$.extend(postData, address);
		return $.ajax({
			url: API_LIST.checkSCDuplicatedAddress,
			type: "POST",
			data: JSON.stringify(postData)
		})
	},

	// getMinContractDealine
	getMinContractDealine: function () {
		return $.ajax({
			url: API_LIST.getMinContractDealine,
			type: "GET"
		})
	},


	// create listing
	createListing: function (data, callback) {
		var postData = {
			"cityId": parseInt(data.cityId),
			"districtId": parseInt(data.districtId),
			"wardId": parseInt(data.wardId),
			"streetId": parseInt(data.streetId),
			"houseNumber": (data.houseNumber) ? data.houseNumber : null,
			"statusId": parseInt(data.statusId),
			"email": (data.email) ? data.email : null,
			"link": (data.link) ? data.link : null,
			"name": (data.name) ? data.name : null,
			"note": (data.note) ? data.note : null,
			"phones": (data.phones) ? data.phones : null,
			"price": (data.price) ? data.price : 0,
			"listingTypeId": parseInt(data.listingTypeId),
			"realEstateGroupId": parseInt(data.realEstateGroupId),
			"propertyTypeId": parseInt(data.propertyTypeId),
			"buildingId": $.isNumeric(data.buildingId) ? parseInt(data.buildingId) : null,
			"blockId": $.isNumeric(data.blockId) ? parseInt(data.blockId) : null,
			"photo": data.photo,
			"photoGcn": data.photoGCN,
			"currency": data.currency,
            "sourceId" : parseInt(data.sourceId),
		};
		// process import

		$.ajax({
			url: API_LIST.insertCrawler,
			data: JSON.stringify(postData),
			type: "POST",
			success: function (respone) {
				callback(respone);
			}
		});
	},

	makeCall: function (phoneNumber, callback) {
		CCall.makeCall({
			"phoneNumber": phoneNumber, "onCallEnded": function (callInfo) {
				callback(callInfo);
			},
			showLoading: false
		});
	},

	// live listing
	liveListing: function () {

	},

	// get send Diy
	getSendDiy: function (id) {
		return $.ajax({
			url: API_LIST.sendDiy + '/' + id,
			type: "GET"
		})
	},
	// get send Diy
	getChannelTypes: function () {
		return $.ajax({
			url: API_LIST.getChannelTypes,
			type: "GET"
		})
    },
    
    // get alley Type
	getAlleyTypes: function () {
		return $.ajax({
			url: API_LIST.getAlleyTypes,
			type: "GET"
		})
	},

	// get send Diy
	getChannelStatus: function () {
		return $.ajax({
			url: API_LIST.getChannelStatus,
			type: "GET"
		})
	},

	// get Lock Unlock
	getLockUnlock: function (id) {
		return $.ajax({
			url: API_LIST.getLockUnlock + '/' + id,
			type: "GET"
		})
	},
	// resend tk
	resendInfo: function (ownerId) {
		// Gửi lại info
		return $.ajax({
			url: API_LIST.resendAccountInfo + '/' + ownerId,
			type: "GET"
		})
	},
	// push listingId to owner 
	pushToOwnerList: function (id) {
		return $.ajax({
			url: API_LIST.pushToOwnerList + '/' + id,
			type: "GET"
		})
	},

	// Create Reminder
	createReminder: function (data) {
		return $.ajax({
			url: API_LIST.createReminder,
			type: 'POST',
			data: data
		});
	},

	// Update Listing
	updateListing: function (data, callback) {
		if (!hasValue(data.photoNew)) {
			$.extend(data, {
				photoNew: []
			})
		}
		if (!hasValue(data.photoGCNNew)) {
			$.extend(data, {
				photoGCNNew: []
			})
		}
		// upload photo
		var formDataPhoto = FileHelper.collectFilesArrayToFormData(data.photoNew);
		var formDataPhotoGCN = FileHelper.collectFilesArrayToFormData(data.photoGCNNew);

		var photo = Listing.uploadPhoto(formDataPhoto);
		var photoGCN = Listing.uploadPhoto(formDataPhotoGCN);

		$.when(photo, photoGCN).done(function (resultPhoto, resultPhotoGCN) {
			function buildDataPhoto(data) {
				return $.map(data[0], function (item) {
					if (item.result) {
						return {
							link: item.data.file_name,
							isPrivate: false,
							source: 'prescreener'
						};
					}
				});
			}

			var dataPhoto = buildDataPhoto(resultPhoto);
			var dataPhotoGCN = buildDataPhoto(resultPhotoGCN);

			data.photo = hasValue(data.photo) ? data.photo : [];
			data.photoGcn = hasValue(data.photoGcn) ? data.photoGcn : [];
			$.merge(dataPhoto, data.photo);
			$.merge(dataPhotoGCN, data.photoGcn);

			dataPhoto = (dataPhoto.length > 0) ? JSON.stringify(dataPhoto) : null;
			dataPhotoGCN = (dataPhotoGCN.length > 0) ? JSON.stringify(dataPhotoGCN) : null;

			delete data.photoNew;
			delete data.photoGCNNew;

			var postData = $.extend(true, {}, data);
			$.extend(postData, {
				"photo": dataPhoto,
				"photoGcn": dataPhotoGCN
			});
			// process update
			$.ajax({
				url: API_LIST.updateListing,
				data: JSON.stringify(postData),
				type: "POST",
				success: function (respone) {
					callback(respone);
				}
			});

		});
	},

	// Create Listing
	insertListing: function (data, callback) {
		if (!hasValue(data.photoNew)) {
			$.extend(data, {
				photoNew: []
			})
		}
		if (!hasValue(data.photoGCNNew)) {
			$.extend(data, {
				photoGCNNew: []
			})
		}
		// upload photo
		var formDataPhoto = FileHelper.collectFilesArrayToFormData(data.photoNew);
		var formDataPhotoGCN = FileHelper.collectFilesArrayToFormData(data.photoGCNNew);

		var photo = Listing.uploadPhoto(formDataPhoto);
		var photoGCN = Listing.uploadPhoto(formDataPhotoGCN);

		$.when(photo, photoGCN).done(function (resultPhoto, resultPhotoGCN) {
			function buildDataPhoto(data) {
				return $.map(data[0], function (item) {
					if (item.result) {
						return {
							link: item.data.file_name,
							isPrivate: false,
							source: 'prescreener'
						};
					}
				});
			}

			var dataPhoto = buildDataPhoto(resultPhoto);
			var dataPhotoGCN = buildDataPhoto(resultPhotoGCN);

			data.photo = hasValue(data.photo) ? data.photo : [];
			data.photoGcn = hasValue(data.photoGcn) ? data.photoGcn : [];
			$.merge(dataPhoto, data.photo);
			$.merge(dataPhotoGCN, data.photoGcn);

			$.extend(Window.globalVar.listingDetail.data, {
				photo: dataPhoto,
				photoGcn: dataPhotoGCN
			});

			dataPhoto = (dataPhoto.length > 0) ? JSON.stringify(dataPhoto) : null;
			dataPhotoGCN = (dataPhotoGCN.length > 0) ? JSON.stringify(dataPhotoGCN) : null;

			delete data.photoNew;
			delete data.photoGCNNew;

			var postData = $.extend(true, {}, data);
			$.extend(postData, {
				"photo": dataPhoto,
				"photoGcn": dataPhotoGCN
			});

			// process update
			$.ajax({
				url: API_LIST.insertListing,
				data: JSON.stringify(postData),
				type: "POST",
				success: function (respone) {
					callback(respone);
				}
			});

		});
	},

	// Send SA
	sendSA: function (data, callback) {
		if (!hasValue(data.photoNew)) {
			$.extend(data, {
				photoNew: []
			})
		}
		if (!hasValue(data.photoGCNNew)) {
			$.extend(data, {
				photoGCNNew: []
			})
		}
		// upload photo
		var formDataPhoto = FileHelper.collectFilesArrayToFormData(data.photoNew);
		var formDataPhotoGCN = FileHelper.collectFilesArrayToFormData(data.photoGCNNew);

		var photo = Listing.uploadPhoto(formDataPhoto);
		var photoGCN = Listing.uploadPhoto(formDataPhotoGCN);

		$.when(photo, photoGCN).done(function (resultPhoto, resultPhotoGCN) {
			function buildDataPhoto(data) {
				return $.map(data[0], function (item) {
					if (item.result) {
						return {
							link: item.data.file_name,
							isPrivate: false,
							source: 'prescreener'
						};
					}
				});
			}

			var dataPhoto = buildDataPhoto(resultPhoto);
			var dataPhotoGCN = buildDataPhoto(resultPhotoGCN);

			data.photo = hasValue(data.photo) ? data.photo : [];
			data.photoGcn = hasValue(data.photoGcn) ? data.photoGcn : [];
			$.merge(dataPhoto, data.photo);
			$.merge(dataPhotoGCN, data.photoGcn);

			dataPhoto = (dataPhoto.length > 0) ? JSON.stringify(dataPhoto) : null;
			dataPhotoGCN = (dataPhotoGCN.length > 0) ? JSON.stringify(dataPhotoGCN) : null;

			delete data.photoNew;
			delete data.photoGCNNew;

			var postData = $.extend(true, {}, data);
			$.extend(postData, {
				"photo": dataPhoto,
				"photoGcn": dataPhotoGCN
			});
			// process update
			$.ajax({
				url: API_LIST.sendSA,
				data: JSON.stringify(postData),
				type: "POST",
				success: function (respone) {
					callback(respone);
				}
			});

		});
	},

	// Get Reminder
	getReminder: function () {
		return $.ajax({
			url: API_LIST.getReminder,
			type: 'GET'
		});
	},

	// close Reminder
	closeReminder: function (data) {
		return $.ajax({
			url: API_LIST.closeReminder,
			type: 'POST',
			data: data
		});
	},

	// Get user right types
	getUserRightTypes: function (data) {
		return $.ajax({
			url: API_LIST.getUserRightTypes,
			type: 'GET'
		});
	},

	// Get user right types
	cancelListing: function (data) {
		return $.ajax({
			url: API_LIST.cancelListing,
			type: 'POST',
			data: JSON.stringify(data)
		});
	},

	// Track Call
	trackCall: function (data) {
		return $.ajax({
			url: API_LIST.trackCall,
			type: 'POST',
			data: JSON.stringify(data)
		});
	},
}

function renderInputField(field, fieldChangedByList) {
    var _isRendered = true;
    if (hasValue(field.isRendered)) {
        _isRendered = field.isRendered();
    }
	
    if (_isRendered == true) {
		const fieldIdEle = '#' + field.id
        // not append to Dom
        if ($(fieldIdEle).length === 0) {
            let html = '<div class="form-group">'
            const htmlLabel = `<div class="col-md-12"><label for="${field.id}" class="control-label">${field.label}</label></div>`
            const itemType = `<input class="form-control ${field.class && field.class || ''}" data-label="${field.label}" id="${field.id}" name="${field.name}" value="${field.value && field.value || ''}" />`

			html += htmlLabel
			if (field.customRenderHTML) {
				const renderHTML = field.customRenderHTML(itemType)
				html += `<div class="col-md-12">${renderHTML}</div>`
			} else {
                html += `<div class="col-md-12">${itemType}</div>`
            }
    
            $(field.target).html(html + '</div>');
        } else {
            Window.sa.field.generateFieldAttributes(field)
        }

        if (!hasValue(field.updateDataOnChange) || field.updateDataOnChange == true) {
            $('body').on('change', fieldIdEle, function (e) {
                e.preventDefault();

				if (Window.sa.data[field.name]) {
                	Window.sa.data[field.name]($(fieldIdEle).val());
				}
                if (hasValue(field.onChange)) {
                    field.onChange(field);
                } else {
                    // nothing
                }
                if (fieldChangedByList[field.name] != true) {
                    try {
                        //Window.sa.validation.validateFieldById(field.name);
                    } catch (e) {
                    }
                }
                fieldChangedByList[field.name] = false;
            });
        }
		
        if (hasValue(field.afterRender)) {
            $(document).ready(function () {
                field.afterRender(field);
            });
        }
        if (hasValue(field.isHide)) {
            $(fieldIdEle + '-wrapper').hide();
        }
    }
}

function renderEditorField(field, fieldChangedByList) {
    const fieldId = '#' + field.id
	const fieldValue = field.value && field.value || ''

	let disabled = ''
	if (field.isDisabled) {
		disabled = 'disabled'
	}
	const html = '<div class="form-group"><div class="col-md-12"><label for="' + fieldId + '" class="control-label">' + field.label + '</label></div><div class="col-md-12"><textarea id="' + field.id + '" class="form-control editor ' + field.class + '" ' + disabled + '>' + fieldValue + '</textarea></div></div>'

    if ($(fieldId).length > 0) {
        Window.sa.field.generateFieldAttributes(field)
    }
	$(field.target).html(html);

	if (!hasValue(field.updateDataOnChange) || field.updateDataOnChange == true) {
		$('body').on('change', fieldId, function (e) {
			e.preventDefault();
			Window.sa.data[field.name]($(fieldId).val());
			if (hasValue(field.onChange)) {
				field.onChange(field);
			} else {
				// nothing
			}
			try {
				//Window.sa.validation.validateFieldById(field.id);
			} catch (e) {
			}
		});
	} else {
		// nothing
	}
	if (hasValue(field.afterRender)) {
		$(document).ready(function () {
			field.afterRender(field);
		});
	} else {
		// nothing
	}
}

function renderInputWithContainerField(field, fieldChangedByList) {
	var _isRendered = true;
	if (hasValue(field.isRendered)) {
		_isRendered = field.isRendered();
	}
	if (_isRendered == true) {
		var html = null;
		if (hasValue(field.html)) {
			var _fieldHtml = field.html();
			if (hasValue(_fieldHtml)) {
				html = '<div class="form-group"><div class="col-md-12">' + _fieldHtml + '</div></div>';
			} else {
				html = '<div class="form-group"><div class="col-md-12"><label for="' + field.id + '" class="control-label">' + field.label + '</label></div><div class="col-md-12"><div style="border:1px solid #ccc"><input id="' + field.id + '" type="text" class="form-control ' + field.class + '"' + ((field.isDisabled) ? 'disabled="disabled"' : null) + ' data-label="' + field.label + '"></div></div></div>';
			}
		} else {
			html = '<div class="form-group"><div class="col-md-12"><label for="' + field.id + '" class="control-label">' + field.label + '</label></div><div class="col-md-12"><div style="border:1px solid #ccc"><input id="' + field.id + '" type="text" class="form-control ' + field.class + '"' + ((field.isDisabled) ? 'disabled="disabled"' : null) + ' data-label="' + field.label + '"></div></div></div>';
		}
		$(field.target).append(html);
		if (hasValue(field.attrList)) {
			$.each(field.attrList, function (attr, value) {
				$('#' + field.id).attr(attr, value);
			});
		} else {
			// nothing
		}
		$('#' + field.id).val(field.value);
		if (!hasValue(field.updateDataOnChange) || field.updateDataOnChange == true) {
			$('body').on('change', '#' + field.id, function (e) {
				e.preventDefault();
				Window.sa.data[field.name]($('#' + field.id).val());
				if (hasValue(field.onChange)) {
					field.onChange(field);
				} else {
					// nothing
				}
				if (fieldChangedByList[field.name] != true) {
					try {
						//Window.sa.validation.validateFieldById(field.name);
					} catch (e) {
					}
				}
				fieldChangedByList[field.name] = false;
			});
		} else {
			// nothing
		}
		if (hasValue(field.afterRender)) {
			$(document).ready(function () {
				field.afterRender(field);
			});
		} else {
			// nothing
		}
		if (hasValue(field.isHide)) {
			$('#' + field.id + '-wrapper').hide();
		}
	}
}

function renderCKEditorField(field, fieldChangedByList) {
	let disabled = ''
	if (field.isDisabled) {
		disabled = 'disabled'
	}
	var html = '<div class="form-group"><div class="col-md-12"><label for="' + field.id + '" class="control-label">' + field.label + '</label></div><div class="col-md-12"><textarea id="' + field.id + '" type="text" class="form-control" ' + disabled + '></textarea></div></div>';
	$(field.target).append(html);
	if (hasValue(field.attrList)) {
		$.each(field.attrList, function (attr, value) {
			$('#' + field.id).attr(attr, value);
		});
	} else {
		// nothing
	}
	$('#' + field.id).val(field.value);
	if (!hasValue(field.updateDataOnChange) || field.updateDataOnChange == true) {
		$('body').on('change', '#' + field.id, function (e) {
			e.preventDefault();
			Window.sa.data[field.name]($('#' + field.id).val());
			if (hasValue(field.onChange)) {
				field.onChange(field);
			} else {
				// nothing
			}
		});
	} else {
		// nothing
	}
	$(document).ready(function () {
		jQuery(function () {
			var editor = CKEDITOR.replace(field.id, {height: 300});
			editor.on('change', function (e) {
				$('#' + field.id).val(e.editor.getData());
				$('#' + field.id).trigger('change');
			});
		});
	});
	if (hasValue(field.afterRender)) {
		$(document).ready(function () {
			field.afterRender(field);
		});
	} else {
		// nothing
	}
}

function renderBooleanField(field, fieldChangedByList) {
	var html = '<div class="form-group"><div class="col-md-12 form-control-static"><div class="checkbox"><label for="' + field.id + '" class="control-label"><input id="' + field.id + '" type="checkbox" ' + ((field.isDisabled) ? 'disabled="disabled"' : null) + '><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>' + field.label + '</label></div></div></div>';

	$(field.target).append(html);
	let checked = false
	if (field.value === 1) {
		checked = true
	}
	$('#' + field.id).prop('checked', checked);
	if (!hasValue(field.updateDataOnChange) || field.updateDataOnChange == true) {
		$('body').on('change', '#' + field.id, function (e) {
			e.preventDefault();
			Window.sa.data[field.name]($('#' + field.id).is(':checked'));
			if (hasValue(field.onChange)) {
				field.onChange(field);
			} else {
				// nothing
			}
		});
	} else {
		// nothing
	}
	if (hasValue(field.afterRender)) {
		$(document).ready(function () {
			field.afterRender(field);
		});
	} else {
		// nothing
	}
}

function renderLinkField(field, fieldChangedByList) {
	var _isRendered = true;
	if (hasValue(field.isRendered)) {
		_isRendered = field.isRendered();
	}
	if (_isRendered == true) {
		var html = '<div class="form-group"><div class="col-md-12"><label for="' + field.id + '" class="control-label">' + field.label + '</label></div><div class="col-md-12"><p class="form-control-static"><a id="' + field.id + '" href="' + field.value + '" target="_blank">' + field.text + '</a></p></div></div>';
		$(field.target).append(html);
		if (hasValue(field.attrList)) {
			$.each(field.attrList, function (attr, value) {
				$('#' + field.id).attr(attr, value);
			});
		} else {
			// nothing
		}
		if (hasValue(field.afterRender)) {
			$(document).ready(function () {
				field.afterRender(field);
			});
		} else {
			// nothing
		}
	}
}

function renderTextField(field, fieldChangedByList) {
	var _isRendered = true;
	if (hasValue(field.isRendered)) {
		_isRendered = field.isRendered();
	}
	let html = ''
	if (_isRendered == true) {
		if (field.noRenderNull == true) {
			if (hasValue(field.text)) {
				html = '<div class="form-group"><div class="col-md-12"><label for="' + field.id + '" class="control-label">' + field.label + '</label></div><div class="col-md-12"><p id="' + field.id + '" class="form-control-static ' + field.class + '">' + field.text + '</p></div></div>';
				$(field.target).html(html);
				if (hasValue(field.attrList)) {
					$.each(field.attrList, function (attr, value) {
						$('#' + field.id).attr(attr, value);
					});
				} else {
					// nothing
				}
				if (hasValue(field.afterRender)) {
					$(document).ready(function () {
						field.afterRender(field);
					});
				} else {
					// nothing
				}
			}
		} else {
			html = '<div class="form-group"><div class="col-md-12"><label for="' + field.id + '" class="control-label">' + field.label + '</label></div><div class="col-md-12"><p id="' + field.id + '" class="form-control-static ' + field.class + '">' + field.text + '</p></div></div>';
			$(field.target).html(html);
			if (hasValue(field.attrList)) {
				$.each(field.attrList, function (attr, value) {
					$('#' + field.id).attr(attr, value);
				});
			} else {
				// nothing
			}
			if (hasValue(field.afterRender)) {
				$(document).ready(function () {
					field.afterRender(field);
				});
			} else {
				// nothing
			}
		}
	}
}

function renderSelectField(field, fieldChangedByList) {
	let html = null;
    const fieldId = '#' + field.id
    if (hasValue(field.html)) {
        var _fieldHtml = field.html();
        if (hasValue(_fieldHtml)) {
            html = '<div class="form-group"><div class="col-md-12">' + field.html() + '</div></div>';
        } else {
            html = '<div class="form-group"><div class="col-md-12"><label for="' + field.id + '" class="control-label">' + field.label + '</label></div><div class="col-md-12"><select id="' + field.id + '" class="form-control"' + ((field.isDisabled) ? 'disabled="disabled"' : null) + ' data-label="' + field.label + '"></select></div></div>';
        }
    } else {
		const selectOpt = '<select id="' + field.id + '" class="form-control ' + field.class + '"' + (field.disabled && "disabled='disabled'" || "") + ' data-label="' + field.label + '"></select>'
        html = '<div class="form-group"><div class="col-md-12"><label for="' + field.id + '" class="control-label">' + field.label + '</label></div><div class="col-md-12">' + selectOpt + '</div></div>';
		if (field.customRenderHTML) {
			const renderHTML = field.customRenderHTML(selectOpt)
			html = '<div class="form-group"><div class="col-md-12"><label for="' + field.id + '" class="control-label">' + field.label + '</label></div><div class="col-md-12">' + renderHTML + '</div></div>'
		}
    }

    if ($(fieldId).length === 0) {
		$(field.target).html(html)
    }
    
	$('#' + field.id).html('').select2()
	if (hasValue(field.optionsList.type)) {
		// ajax
		if (field.optionsList.autoLoad != false) {
			if (field.optionsList.data && isPromise(field.optionsList.data())) {
                ajaxStart();
                field.optionsList.data().done(function (response) {
                    $('#' + field.id).html('');
					var _optionList = field.optionsList.callBack(response);
					$.each(_optionList, function (i, item) {
						$('#' + field.id).append(buildOption(item, field.value));
					});
					fieldChangedByList[field.id] = true;
					//$('#' + field.id).val(field.value);
					$('#' + field.id).select2({ language: "vn" });
					if (hasValue(field.ajaxDone)) {
						field.ajaxDone();
					}
					fieldChangedByList[field.id] = false;
					ajaxEnd();

					return
				});
			} else {
				// no ajax
				let selectDef = [
					{
						value: '',
						text: '-- Vui Lòng Chọn --'
					}
				]
				if (field.optionsListDef) {
					selectDef = field.optionsListDef
				}

				// optionList data existed at prev api call 
				if (field.optionsList.data && field.optionsList.data() && field.optionsList.data().length > 0) {
					selectDef = field.optionsList.data()
				}

				$.each(selectDef, function (i, item) {
					$('#' + field.id).append(buildOption(item, field.value));
				});
				//$('#' + field.id).val(field.value);
				$('#' + field.id).select2();
                fieldChangedByList[field.id] = false;

				return
            }
		}
		if (hasValue(field.optionsList.changedBy)) {
			var changeByList = field.optionsList.changedBy;
			changeByList = changeByList.replace(/ /g, '');
			changeByList = changeByList.split(',');
			var changedBy = null;
			for (var i = 0; i < changeByList.length; i++) {
				changedBy = changeByList[i];
				$('body').on('change', changedBy, function (e) {
					e.preventDefault();
					$('#' + field.id).html('');
					var tmp = changedBy.replace('#', '').replace('.', '');
					Window.sa.data[tmp]($(changedBy).val());

					if (field.optionsList.data && isPromise(field.optionsList.data())) {
                        ajaxStart();
                        field.optionsList.data().done(function (response) {
							$.each(field.optionsList.callBack(response), function (i, item) {
								$('#' + field.id).append(buildOption(item, ''));
							});
							fieldChangedByList[field.id] = true;
							//$('#' + field.id).val('');
							$('#' + field.id).trigger('change');
							fieldChangedByList[field.id] = false;
							$('#' + field.id).prop('disabled', false)

							if (hasValue(field.ajaxDone)) {
								field.ajaxDone();
							}
							// $('#' + field.id).select2();
							ajaxEnd();
						});
					} else {
                        fieldChangedByList[field.id] = false;
					}
				});
			}
		}
	} else {
		// no ajax
        let selectDef = [
            {
                value: '',
                text: '-- Vui Lòng Chọn --'
            }
        ];
        if (field.optionsListDef) {
            selectDef = field.optionsListDef
        }
		$.each(selectDef, function (i, item) {
			$('#' + field.id).append(buildOption(item, field.value));
		});
		//$('#' + field.id).val(field.value);
		$('#' + field.id).select2();
	}
	if (!hasValue(field.updateDataOnChange) || field.updateDataOnChange == true) {
		$('body').on('change', '#' + field.id, function (e) {
			e.preventDefault();
			if (Window.sa.data[field.name]) {
				Window.sa.data[field.name]($('#' + field.id).val());
			}
			if (hasValue(field.onChange)) {
				field.onChange(field);

                return false
			}
			if (fieldChangedByList[field.id] != true) {
				try {
					// Window.sa.validation.validateFieldById(field.id);
				} catch (e) {
				}
			}
			fieldChangedByList[field.id] = false;
		});
	} else {
		// nothing
	}
	if (hasValue(field.afterRender)) {
		$(document).ready(function () {
			field.afterRender(field);
		});
	} else {
		// nothing
	}

}

function renderInlineSingleCheckList(field, fieldChangedByList) {
	var html = '<div class="form-group"><div class="col-md-12"><label for="' + field.id + '" class="control-label">' + field.label + '</label></div><div id="' + field.id + '-inline-single-check-list" class="col-md-12"></div></div>';
	$(field.target).append(html);
	if (hasValue(field.optionsList.type)) {
		// ajax
		$('#' + field.id).html('');
		field.optionsList.data().done(function (response) {
			$.each(field.optionsList.callBack(response), function (i, item) {
				$('#' + field.id + '-inline-single-check-list').append('<label class="checkbox-inline"><input type="checkbox" name="' + field.id + '" value="' + item.value + '" data-text="' + item.text + '">' + item.text + '</label>');
			});
			$('[name=' + field.id + ']').prop('checked', false);
			$('[name=' + field.id + '][value=' + field.value + ']').prop('checked', true);
		});
	} else {
		// no ajax
		$.each(field.optionsList.data(), function (i, item) {
			$('#' + field.id + '-inline-single-check-list').append('<label class="checkbox-inline"><input type="checkbox" name="' + field.id + '" value="' + item.value + '" data-text="' + item.text + '">' + item.text + '</label>');
		});
		$('[name=' + field.id + ']').prop('checked', false);
		$('[name=' + field.id + '][value=' + field.value + ']').prop('checked', true);
	}
	$('body').on('change', '[name=' + field.id + ']', function (e) {
		e.preventDefault();
		var val = $(this).val();
		var isChecked = $(this).is(':checked');
		$('[name=' + field.id + ']').prop('checked', false);
		$('[name=' + field.id + '][value=' + val + ']').prop('checked', isChecked);
	});
	if (!hasValue(field.updateDataOnChange) || field.updateDataOnChange == true) {
		$('body').on('change', '[name=' + field.id + ']', function (e) {
			e.preventDefault();
			var val = $(this).val();
			// var isChecked = $(this).is(':checked');
			Window.sa.data[field.name](val);
			if (hasValue(field.onChange)) {
				field.onChange(field);
			} else {
				// nothing
			}
		});
	} else {
		// nothing
	}
	if (hasValue(field.afterRender)) {
		$(document).ready(function () {
			field.afterRender(field);
		});
	} else {
		// nothing
	}
}

function renderMultiColumnCheckList(field, fieldChangedByList) {
	var html = '<div class="form-group"><div class="col-md-12"><label for="' + field.id + '-multi-column-check-list" class="control-label">' + field.label + '</label></div><div class="col-md-12"><div id="' + field.id + '-multi-column-check-list" class="row"></div></div></div>';
	$(field.target).append(html);
	if (hasValue(field.optionsList.type)) {
		// ajaxx
		$('#' + field.id).html('');
		field.optionsList.data().done(function (response) {
			$.each(field.optionsList.callBack(response), function (i, item) {
				var data = $.extend(true, {text: item.text}, item.data);
				var html = initFeild({
					id: field.id,
					value: item.value,
					isChecked: item.isChecked,
					isDisabled: field.isDisabled,
					control: item.control,
					content: item.content,
					placeholder: item.placeholder,
					text: item.text,
					data: data
				})
				$('#' + field.id + '-multi-column-check-list').append(html);
			});
		});
	} else {
		// no ajax
		$.each(field.optionsList.data(), function (i, item) {
			var data = $.extend(true, {text: item.text}, item.data);
			var html = initFeild({
				id: field.id,
				value: item.value,
				isChecked: item.isChecked,
				isDisabled: field.isDisabled,
				text: item.text,
				control: item.control,
				placeholder: item.placeholder,
				content: item.content,
				data: data
			})
			$('#' + field.id + '-multi-column-check-list').append(html);
		});
	}

	if (hasValue(field.onChange)) {
		$(document).ready(function () {
			$('body').on('change', '[name=' + field.id + ']', function (e) {
				e.preventDefault();
				field.onChange(field);
			})
		});
	} else {
		// nothing
	}

	function initFeild(options) {
		var ops = {
			id: '',
			value: '',
			isChecked: false,
			isDisabled: false,
			text: '',
			control: 'checkbox',
			content: '',
			placeholder: '',
			data: {
				text: ''
			},
		}
		$.extend(ops, options);
		var data = '';
		$.each(ops.data, function (i, e) {
			data += 'data-' + i + '="' + e + '" ';
		})

		var html = $('<div class="col-md-4">');
		html = html.html('<label class="checkbox"><input type="checkbox" name="' + ops.id + '" value="' + ops.value + '" ' + (ops.isChecked ? 'checked' : '') + ' ' + data + ((ops.isDisabled) ? ' disabled="disabled"' : null) + '><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>' + ops.text + '</label>');
		if (ops.control == 'input_if_checked') {
			html.append('<textarea class="form-control editor ' + ops.id + '-input" id="' + ops.id + '-input-' + ops.value + '">' + ops.content + '</textarea>');
			if (ops.isChecked) {
				html.find('textarea').css('display', 'block');
			} else {
				html.find('textarea').css('display', 'none');
			}
			if (ops.isDisabled) {
				html.find('textarea').prop('disabled', true);
			} else {
				html.find('textarea').prop('disabled', false);
			}
			if (hasValue(ops.placeholder)) {
				html.find('textarea').prop('placeholder', ops.placeholder);
			}
		}
		if (hasValue(ops.data) && ops.data.type == 'hide') {
			html.css('visibility', 'hidden');
		}
		return html;
	}
}

function renderInlineMultiCheckList(field, fieldChangedByList) {
	var html = '<div class="form-group"><div class="col-md-12"><label for="' + field.id + '" class="control-label">' + field.label + '</label></div><div id="' + field.id + '-inline-multi-check-list" class="col-md-12"></div></div>';
	$(field.target).append(html);
	if (hasValue(field.optionsList.type)) {
		// ajax
		$('#' + field.id).html('');
		field.optionsList.data().done(function (response) {
			$.each(field.optionsList.callBack(response), function (i, item) {
				$('#' + field.id + '-inline-multi-check-list').append('<label class="checkbox-inline"><input type="checkbox" name="' + field.id + '" value="' + item.value + '" ' + (item.isChecked ? 'checked' : '') + ' data-text="' + item.text + '"' + ((field.isDisabled) ? 'disabled="disabled"' : null) + '>' + item.text + '</label>');
			});
		});
	} else {
		// no ajax
		$.each(field.optionsList.data(), function (i, item) {
			$('#' + field.id + '-inline-multi-check-list').append('<label class="checkbox-inline"><input type="checkbox" name="' + field.id + '" value="' + item.value + '" ' + (item.isChecked ? 'checked' : '') + ' data-text="' + item.text + '"' + ((field.isDisabled) ? 'disabled="disabled"' : null) + '>' + item.text + '</label>');
		});
	}

	if (hasValue(field.onChange)) {
		$(document).ready(function () {
			$('body').on('change', '[name=' + field.id + ']', function (e) {
				e.preventDefault();
				field.onChange(field);
			})
		});
	} else {
		// nothing
	}
}

function buildOption(option, val) {
	let disabled = ''
	if (option.disabled) {
		disabled = 'disabled="disabled"'
	}
	let html = '<option value="' + option.value + '" ' + disabled + ''
	if (option.value == val) {
		html += ' selected '
	}
	for (var attr in option.attrs) {
		if (hasValue(option.attrs[attr])) {
			html += ' data-' + attr + '="' + option.attrs[attr] + '"'
		}
	}
	html += '>' + option.text + '</option>'
	return html;
}

function renderSelectFieldCustom(field, fieldChangedByList) {
    let html = ''
	const fieldIdEle = '#' + field.id
    // not append to Dom
    if ($(fieldIdEle).length === 0) {
        html = '<div class="form-group">'
        const htmlLabel = `<div class="col-md-12"><label for="${field.id}" class="control-label">${field.label}</label></div>`
        const itemType = `<div class="col-md-12"><select class="form-control" data-label="${field.label}" id="${field.id}" name="${field.id}"></select></div>`
    
        if (hasValue(field.html)) {
            html += `<div class="col-md-12">${field.html()}</div>`
        } else {
            html += htmlLabel
            html += itemType
        }

        $(field.target).html(html + '</div>');
    }

    ajaxStart()
    $(fieldIdEle).html('').select2();
	if (hasValue(field.optionsList.type)) {
		// ajax
		if (field.optionsList.autoLoad != false) {
			if (field.optionsList.data().length > 0) {
				$.each(field.optionsList.data(), function (i, item) {
					$(fieldIdEle).append(buildOption(item, field.value));
				});
				fieldChangedByList[field.id] = false;
				ajaxEnd();

                return false
			} else {
				field.optionsList.data().done(function (response) {
					let _optionList = field.optionsList.callBack(response);
					$.each(_optionList, function (i, item) {
						$(fieldIdEle).append(buildOption(item, field.value));
					});
					fieldChangedByList[field.id] = true;
					//$(fieldIdEle).val(field.value);
					if (hasValue(field.ajaxDone)) {
						field.ajaxDone();
					}
					fieldChangedByList[field.id] = false;
					ajaxEnd();

                    return false
				});
			}
		}
		if (hasValue(field.optionsList.changedBy)) {
			var changeByList = field.optionsList.changedBy;
			changeByList = changeByList.replace(/ /g, '');
			changeByList = changeByList.split(',');
			var changedBy = null;
			for (var i = 0; i < changeByList.length; i++) {
				changedBy = changeByList[i];
				$('body').on('change', changedBy, function (e) {
					e.preventDefault();
					$(fieldIdEle).html('');
					var tmp = changedBy.replace('#', '').replace('.', '');
					Window.sa.data[tmp]($(changedBy).val());

					if (!isPromise(field.optionsList.data())) {
						$.each(field.optionsList.data(), function (i, item) {
							$(fieldIdEle).append(buildOption(item, field.value));
						});
						fieldChangedByList[field.id] = false;
						ajaxEnd();
					} else {
						field.optionsList.data().done(function (response) {
							$.each(field.optionsList.callBack(response), function (i, item) {
								$(fieldIdEle).append(buildOption(item, ''));
							});
							fieldChangedByList[field.id] = true;
							//$(fieldIdEle).val('');
							$(fieldIdEle).trigger('change');
							fieldChangedByList[field.id] = false;
							$(fieldIdEle).prop('disabled', false)

							if (hasValue(field.ajaxDone)) {
								field.ajaxDone();
							}
							// $(fieldIdEle).select2();
							ajaxEnd();
						});
					}
				});
			}
		}
	} else {
		// no ajax
        let optionsListDef = [
            {
                value: '',
                text: '-- Vui Lòng Chọn --'
            }
        ]
        if (field.optionsListDef) {
            optionsListDef = field.optionsListDef.slice()
        }
		$.each(optionsListDef, function (i, item) {
			$(fieldIdEle).append(buildOption(item, field.value));
		});
        ajaxEnd();
	}
	if (!hasValue(field.updateDataOnChange) || field.updateDataOnChange == true) {
		$('body').on('change', fieldIdEle, function (e) {
			e.preventDefault();
			if (Window.sa.data[field.name]) {
				Window.sa.data[field.name]($(fieldIdEle).val());
			}
			if (hasValue(field.onChange)) {
				field.onChange(field);

                return false
			}
			if (fieldChangedByList[field.id] != true) {
				try {
					// Window.sa.validation.validateFieldById(field.id);
				} catch (e) {
				}
			}
			fieldChangedByList[field.id] = false;
		});
	}
	if (hasValue(field.afterRender)) {
		$(document).ready(function () {
			field.afterRender(field);
		});
	}
}

function renderInputFieldFile(field, fieldChangedByList) {
    var _isRendered = true;
    if (hasValue(field.isRendered)) {
        _isRendered = field.isRendered();
    }
	
    if (_isRendered == true) {
        const fieldIdEle = '#' + field.id
        // not append to Dom
        if ($(fieldIdEle).length === 0) {
            let html = '<div class="form-group">'
            const htmlLabel = `<div class="col-md-12"><label for="${field.id}" class="control-label">${field.label}</label></div>`
            const itemType = `<div class="col-md-12"><input class="form-control ${field.class && field.class || ''}" data-label="${field.label}" id="${field.id}" type="file" name="${field.id}" /></div>`
        
            if (hasValue(field.html)) {
                const _fieldHtml = field.html()
                html += `<div class="col-md-12">${_fieldHtml}</div>`
            } else {
                html += htmlLabel
                html += itemType
            }
    
            $(field.target).html(html + '</div>');
        } else {
            Window.sa.field.generateFieldAttributes(field)
        }
    
        if (!hasValue(field.updateDataOnChange) || field.updateDataOnChange == true) {
            $('body').on('change', fieldIdEle, function (e) {
                e.preventDefault();

				if (Window.sa.data[field.name]) {
                	Window.sa.data[field.name]($(fieldIdEle).val());
				}
                if (hasValue(field.onChange)) {
                    field.onChange(field);
                } else {
                    // nothing
                }
                if (fieldChangedByList[field.name] != true) {
                    try {
                        //Window.sa.validation.validateFieldById(field.name);
                    } catch (e) {
                    }
                }
                fieldChangedByList[field.name] = false;
            });
        }
		
        if (hasValue(field.afterRender)) {
            $(document).ready(function () {
                field.afterRender(field);
            });
        }
        if (hasValue(field.isHide)) {
            $(fieldIdEle + '-wrapper').hide();
        }
    }
}

function renderBooleanFieldCustom(field, fieldChangedByList) {
    let html = ''
    const fieldIdEle = '#' + field.id
    // not append to Dom
    if ($(fieldIdEle).length === 0) {
		if (field.value == 1) {
			field.checked = 'checked'
		} else {
			field.checked = undefined
		}

        html = '<div class="form-group"><div class="col-md-12 form-control-static">'
        const itemType = `<input class="form-control" data-label="${field.label}" ${field.checked} id="${field.id}" name="${field.id}" type="checkbox" /><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>`
        const htmlLabel = `<div class="checkbox"><label for="${field.id}" class="control-label">${itemType} ${field.label}</label></div>`
    
        html += htmlLabel
        $(field.target).html(html + '</div></div>');
    } else {
        Window.sa.field.generateFieldAttributes(field)
    }

	if (!hasValue(field.updateDataOnChange) || field.updateDataOnChange == true) {
		$('body').on('change', fieldIdEle, function (e) {
			e.preventDefault();
			Window.sa.data[field.name]($(fieldIdEle).is(':checked'));
			if (hasValue(field.onChange)) {
				field.onChange(field);
			} else {
				// nothing
			}
		});
	} else {
		// nothing
	}
	if (hasValue(field.afterRender)) {
		$(document).ready(function () {
			field.afterRender(field);
		});
	} else {
		// nothing
	}
}


async function checkLatLong(
	data,
	okCallback = () => {},
	cancelCallback = () => {}
) {
	if (data.latitude && data.longitude && data.wardId) {
		await $.ajax({
		  method: "POST",
		  url: "/pos/prescreener/validate-lat-long",
		  contentType: "application/json",
		  dataType: "text",
		  data: JSON.stringify(data),
		})
		  .done(function (response) {
			const data = JSON.parse(response);
			if (data.code == "200" && !data.data.isValid) {
			  showPropzyConfirm({
				message: data.data.message,
				btn: {
				  yes: {
					text: "Tiếp tục",
				  },
				  no: {
					text: "Đóng",
				  },
				},
				okCallback: () => {
				  // setTimeout to close previous popup completely
				  setTimeout(() => {
					okCallback();
				  }, 500);
				},
				cancelCallback,
				closeCallback: () => {
					hidePropzyLoading();
				}
			  });
			} else {
			  okCallback();
			}
		  })
		  .fail(() => {
			okCallback();
		  });
	} else {
		okCallback()
	}
} 