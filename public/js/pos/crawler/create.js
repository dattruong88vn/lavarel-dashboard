/**
 * file js for crawler create page
 * created by hoa.truong on 10/10/2017
 */

$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('#csrf-token').val()
	}
});


$(function () {
	new Crawler();
});

class Crawler {
	constructor() {
		this.stored = {
            maximumPhones : 5,
			cityId : 1,
            districtId : null,
			wardId : null,
			streetId : null,
			sourceId : null,
			statusId : null,
			listingTypeId : null,
            realEstateGroupId: null,
			propertyTypeId : null,
            channelTypeId : null,
            channelTypeChildId : null,
            campaignId : null,
            campaignCheck : false,
            modelCode: null,
            mapCode: null,
            landCode: null,
            projectId: null,
            formId: null,
		};
		this.init();
		this.loadApi();
		this.bindEvent();
	}


	init() {
        $("#price").autoNumeric("init", {
            'mDec': 0
        });

        $('#photos-wrapper').imagesPosLib({
            urlUpload: baseUploadApiPublic + 'upload',
            source: 'props',
            gallery: 'photo',
            imageOnly: true,
            list: []
        })
        $('#photoGcns-wrapper').imagesPosLib({
            urlUpload: baseUploadApiPublic + 'upload',
            source: 'props',
            gallery: 'photoGcn',
            imageOnly: true,
            list: []
        });
        $('.phone-multi').phoneBasic();
        $('#realEstateGroupId').prop('disabled', true);
        $('#propertyTypeId').prop('disabled', true);
	}
	async loadApi() {

	     this.promiseApi('GET_DISTRICT');
         this.promiseApi('GET_WARDS');
         this.promiseApi('GET_STREETS');
         this.promiseApi('GET_SOURCE');
         this.promiseApi('GET_STATUS');
         this.promiseApi('GET_LISTING_TYPES');
         this.promiseApi('GET_REAL_ESTATE_GROUP');
         this.promiseApi('GET_PROPERTY_TYPES_V2');
         this.promiseApi('GET_INFO_CHANNEL');
         this.promiseApi('GET_INFO_CHANNEL_CHILD');
         this.promiseApi('GET_BUILDING_BY_DISTRICT');
         this.promiseApi('GET_PROJECT_BY_DISTRICT');
	}

	async promiseApi(name) {
		let promise = null;
		switch (name) {
            case 'GET_DISTRICT' : {
                await POS_PROMISISE_API("GET_DISTRICT", {cityId: this.stored.cityId});
                if (POS_STORED_LOCAL_API.DISTRICT_LIST) {
                    $("#districtId").html('').select2();
                    let districts = [{id: "", text: "--Chọn Quận--"}];
                    districts = districts.concat(POS_STORED_LOCAL_API.DISTRICT_LIST);
                    $("#districtId").select2({
                        data: districts,
                    });
                }
                break;
            }
            case 'GET_WARDS' : {
                await POS_PROMISISE_API("GET_WARDS", {districtId: this.stored.districtId});
                if (POS_STORED_LOCAL_API.WARD_LIST) {
                    $("#wardId").html('').select2();
                    let data = [{id: "", text: "--Chọn Phường--"}];
                    data = data.concat(POS_STORED_LOCAL_API.WARD_LIST);
                    $("#wardId").select2({
                        data: data,
                    });
                }
                break;
            }
            case 'GET_STREETS' : {
                await POS_PROMISISE_API("GET_STREETS", {wardId: this.stored.wardId});
                if (POS_STORED_LOCAL_API.STREET_LIST) {
                    $("#streetId").html('').select2();
                    let data = [{id: "", text: "--Chọn Đường--"}];
                    data = data.concat(POS_STORED_LOCAL_API.STREET_LIST);
                    $("#streetId").select2({
                        data: data,
                    });
                }
                break;
            }
            case 'GET_SOURCE' : {
                $("#sourceId").html('').select2();
                promise = axios.get(POS_APIS_PRESCREEN.get('GET_CHANNEL_TYPES'), {
                    params: {}
                }).then(response => {
                    const resultsContent = response.data;

                    let data = [{id: "", text: "--Chọn--"}];
                    if (resultsContent.result) {

                        resultsContent.data.forEach((item) => {
                            if (item.type === 1) {
                                let filter = item.list.filter((it) => [2, 5, 7, 9].indexOf(it.id) === -1);

                                let dataContent = filter.map(it => {
                                    return {
                                        id: it.id,
                                        text: it.name
                                    };
                                });

                                data = data.concat(dataContent);
                                return true;
                            }
                        });
                    }
                    $("#sourceId").select2({
                        data: data,
                    });

                }).catch(err => {
                    let data = [{id: "", text: "--Chọn--"}];
                    $("#sourceId").select2({
                        data: data,
                    });
                    console.error(err);
                });
                break;
            }
            case 'GET_LISTING_TYPES' : {
                $("#listingTypeId").html('').select2();
                promise = axios.get(POS_APIS_COMMON.get('GET_LISTING_TYPES'), {
                    params: {}
                }).then(response => {
                    const resultsContent = response.data;

                    let data = [{id: "", text: "--Chọn--"}];

                    const dataContent = $.map(resultsContent, function (item, index) {
                        return {
                            id: index,
                            text: item
                        };
                    });

                    data = data.concat(dataContent);
                    $("#listingTypeId").select2({
                        data: data,
                    });

                }).catch(err => {
                    let data = [{id: "", text: "--Chọn--"}];
                    $("#listingTypeId").select2({
                        data: data,
                    });
                    console.error(err)
                });
                break;
            }
            case 'GET_REAL_ESTATE_GROUP' : {
                $("#realEstateGroupId").html('').select2();
                promise = axios.get(POS_APIS_COMMON.get('GET_REAL_ESTATE_GROUP'), {
                    params: {}
                }).then(response => {
                    const resultsContent = response.data; 
                    let data = [{id: "", text: "--Chọn--"}];

                    const dataContent = $.map(resultsContent.data, function (item, index) {
                        return {
                            id: item.id,
                            text: item.text
                        };
                    });

                    data = data.concat(dataContent);
                    $("#realEstateGroupId").select2({
                        data: data,
                    });

                }).catch(err => {
                    let data = [{id: "", text: "--Chọn--"}];
                    $("#realEstateGroupId").select2({
                        data: data,
                    });
                    console.error(err)
                });
                break;
            }
            case 'GET_STATUS' : {
                $("#statusId").html('').select2();
                promise = axios.get(POS_APIS_CRAWLER.get('GET_CRAWLER_STATUS') + '/1', {
                    params: {}
                }).then(response => {
                    const resultsContent = response.data;

                    let data = [{id: "", text: "--Chọn--"}];
                    if (resultsContent.result) {
                        let dataContent = resultsContent.data.map((it) => {
                            // HIDE PROPZY OPTION
                            return it.statusId !== 12 ? {
                                id: it.statusId,
                                text: it.statusName
                            } : undefined;
                        }).filter(Boolean);

                        data = data.concat(dataContent);
                    }
                    $("#statusId").select2({
                        data: data,
                    });

                }).catch(err => {
                    let data = [{id: "", text: "--Chọn--"}];
                    $("#statusId").select2({
                        data: data,
                    });
                    console.error(err)
                });
                break;
            }
            case 'GET_PROPERTY_TYPES' : {
                $("#propertyTypeId").html('').select2();
                this.stored.listingTypeId = hasValue(this.stored.listingTypeId) ? this.stored.listingTypeId : 1;
                promise = axios.get(POS_APIS_COMMON.get('GET_PROPERTY_TYPES') + '/' + this.stored.listingTypeId, {
                    params: {}
                }).then(response => {
                    const resultsContent = response.data;

                    let data = [{id: "", text: "--Chọn--"}];
                    const dataContent = $.map(resultsContent, function (item) {
                        return {
                            id: item.propertyTypeID,
                            text: item.typeName
                        };
                    });

                    data = data.concat(dataContent);
                    $("#propertyTypeId").select2({
                        data: data,
                    });

                }).catch(err => {
                    let data = [{id: "", text: "--Chọn--"}];
                    $("#propertyTypeId").select2({
                        data: data,
                    });
                    console.error(err)
                });
                break;
            }
            case 'GET_PROPERTY_TYPES_V2' : {
                $("#propertyTypeId").html('').select2();
                this.stored.listingTypeId = hasValue(this.stored.listingTypeId) ? this.stored.listingTypeId : null;
                this.stored.realEstateGroupId = hasValue(this.stored.listingTypeId) ? this.stored.realEstateGroupId : null;
                promise = axios.get(POS_APIS_COMMON.get('GET_PROPERTY_TYPES_V2') + '/' + this.stored.realEstateGroupId + '/' + this.stored.listingTypeId, {
                    params: {}
                }).then(response => {
                    const resultsContent = response.data;
                    let data = [{id: "", text: "--Chọn--"}];
                    const dataContent = $.map(resultsContent, function (item) {
                        return {
                            id: item.propertyTypeId,
                            text: item.typeName,
                            formId: item.formId,
                            disabled: !item.active
                        };
                    });

                    data = data.concat(dataContent);
                    $("#propertyTypeId").select2({
                        data: data,
                    });

                }).catch(err => {
                    let data = [{id: "", text: "--Chọn--"}];
                    $("#propertyTypeId").select2({
                        data: data,
                    });
                    console.error(err)
                });
                break;
            }
            case 'GET_BUILDING_BY_DISTRICT' : {
                $("#buildingId").html('').select2();
                const districtId = this.stored.districtId;
                if(!hasValue(districtId)){
                    let data = [{id: "", text: "--Chọn--"}];
                    $("#buildingId").select2({
                        data: data,
                    });
                    return;
                }
                showPropzyLoading();
                promise = axios.post(POS_APIS_COMMON.get('GET_BUILDING_BY_DISTRICT'), JSON.stringify({
                    districtId
                })).then(response => {
                    const resultsContent = response.data;

                    let data = [{id: "", text: "--Chọn--"}];
                    if (resultsContent.result) {

                        let dataContent = resultsContent.data.map(it => {
                            return {
                                id: it.buildId,
                                text: hasValue(it.buildingName) ? it.buildingName : "N/A",
                                projectId: it.projectId
                            };
                        });

                        data = data.concat(dataContent);
                    }
                    $("#buildingId").select2({
                        data: data,
                    });
                    hidePropzyLoading();
                    return; //END ACTION;

                }).catch(err => {
                    let data = [{id: "", text: "--Chọn--"}];
                    $("#buildingId").select2({
                        data: data,
                    });
                    console.error(err)
                });
                break;
            }
            case 'GET_BLOCKS_BUILDING' : {
                $("#blockId").html('').select2();
                const buildingId = hasValue(this.stored.buildingId) ? this.stored.buildingId : -1;
                promise = axios.get(POS_APIS_COMMON.get('GET_BLOCKS_BY_BUILDING') + '/' + buildingId, {
                    params: {}
                }).then(response => {
                    const resultsContent = response.data;

                    let data = [{id: "", text: "--Chọn--"}];
                    if (resultsContent.result) {

                        let dataContent = resultsContent.data.map(it => {
                            return {
                                id: it.blockId,
                                text: hasValue(it.blockName) ? it.blockName : "N/A"
                            };
                        });

                        data = data.concat(dataContent);
                    }
                    $("#blockId").select2({
                        data: data,
                    });

                }).catch(err => {
                    let data = [{id: "", text: "--Chọn--"}];
                    $("#blockId").select2({
                        data: data,
                    });
                    console.error(err);
                });
                break;
            }
            case 'GET_TC' : {
                await POS_PROMISISE_API("GET_TC");
                if (POS_STORED_LOCAL_API.TC_LIST) {
                    $("#tcId").html('').select2();
                    let data = [{id: "", text: "--Chọn trung tâm--"}];
                    data = data.concat(POS_STORED_LOCAL_API.TC_LIST);
                    $("#tcId").select2({
                        data: data,
                    });
                }
                break;
            }
            case "GET_INFO_CHANNEL" : {
                await POS_PROMISISE_API("GET_INFO_CHANNEL");
                if (POS_STORED_LOCAL_API.INFO_CHANNEL_LIST) {
                    $("#infoChannel").html('').select2();
                    let data = [{id: "", text: "--Chọn kênh thông tin--"}];
                    data = data.concat(POS_STORED_LOCAL_API.INFO_CHANNEL_LIST);
                    $("#infoChannel").select2({
                        data: data,
                    });
                }
                break;
            }
            case "GET_INFO_CHANNEL_CHILD" : {
                $("#infoChannelChild").html('').select2();
                let data = [{id: "", text: "--Chọn nguồn thông tin--"}];
                if(this.stored.channelTypeId) {
                    await POS_PROMISISE_API("GET_INFO_CHANNEL_CHILD", {parentId : this.stored.channelTypeId});
                    if (POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST) {
                        data = data.concat(POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST);

                    }
                }
                $("#infoChannelChild").select2({
                    data: data,
                });

                break;
            }
            case "GET_PROJECT_BY_DISTRICT" : {
                $("#projectId").html('').select2();
                const districtId = this.stored.districtId;
                if(!hasValue(districtId)){
                    let data = [{id: "", text: "--Chọn--"}];
                    $("#projectId").select2({
                        data: data,
                    });
                    return;
                }
                showPropzyLoading();
                promise = axios.post(PROJECT_API.get('GET_LIST_BY_DISTRICT'), JSON.stringify({
                    districtId
                })).then(response => {
                    const resultsContent = response.data;

                    let data = [{id: "", text: "--Chọn--"}];
                    if (resultsContent.result) {

                        let dataContent = resultsContent.data.map(it => {
                            return {
                                id: it.pId,
                                text: it.projectName ? it.projectName : "N/A",
                                projectId: it.projectId,
                            };
                        });

                        data = data.concat(dataContent);
                    }
                    $("#projectId").select2({
                        data: data,
                    });
                    
                    hidePropzyLoading();
                    return; //END ACTION;

                }).catch(err => {
                    let data = [{id: "", text: "--Chọn--"}];
                    $("#projectId").select2({
                        data: data,
                    });
                    console.error(err)
                });
                break;
            }
		}

		return promise;
	}

	bindEvent() {
		const that = this;

        $("#districtId").on("change", function () {
        	that.stored.districtId = hasValue($(this).val()) ? Number.parseInt($(this).val()) : null;

            that.promiseApi('GET_WARDS');
            const checkFormById = that.getCheckForm(that.stored.formId);
            const displayBuilding = checkFormById.building.display;
            const displayProject = checkFormById.project.display;
            if(displayBuilding) {
                that.promiseApi('GET_BUILDING_BY_DISTRICT');
			}
            if(displayProject) {
                that.promiseApi('GET_PROJECT_BY_DISTRICT')
            }
            return; //END ACTION

        });
        $("#wardId").on("change", function () {
            that.stored.wardId = hasValue($(this).val()) ? Number.parseInt($(this).val()) : null;
            that.promiseApi('GET_STREETS');
        });
        $("#streetId").on("change", function () {
            that.stored.streetId = hasValue($(this).val()) ? Number.parseInt($(this).val()) : null;
        });
        $("#sourceId").on("change", function () {
            that.stored.sourceId = hasValue($(this).val()) ? Number.parseInt($(this).val()) : null;
            if (that.stored.sourceId === 177) {
                // chose TC
                that.promiseApi('GET_TC');
                $(".tc-wrapper").show();
            } else {
                $(".tc-wrapper").hide();
            }

        });
        $("#statusId").on("change", function () {
            that.stored.statusId = hasValue($(this).val()) ? Number.parseInt($(this).val()) : null;
        });
        $("#listingTypeId").on("change", function () {
            that.stored.listingTypeId = hasValue($(this).val()) ? Number.parseInt($(this).val()) : null;
            that.promiseApi('GET_PROPERTY_TYPES_V2');
            that.checkSelectListingType();
        });
        $("#realEstateGroupId").on("change", function () {
            that.stored.realEstateGroupId = hasValue($(this).val()) ? Number.parseInt($(this).val()) : null;
            that.promiseApi('GET_PROPERTY_TYPES_V2');
            that.checkSelectRealEstateGroup();
        });
        $("#propertyTypeId").on("change", function () {
            that.stored.propertyTypeId = hasValue($(this).val()) ? Number.parseInt($(this).val()) : null;
            let selectedData = $(this).select2('data')[0];
            that.stored.formId = selectedData?.formId;
            const checkFormById = that.getCheckForm(that.stored.formId);
            that.loadBuilding(checkFormById);
            that.loadProjectLand(checkFormById);
            that.renderMapAndLandCode(checkFormById);
            return; //END ACTION
        });
        $(document).on("change", '#buildingId', function () {
            const checkFormById = that.getCheckForm(that.stored.formId);
            that.stored.buildingId = hasValue($(this).val()) ? Number.parseInt($(this).val()) : null;
            that.promiseApi('GET_BLOCKS_BUILDING');
            that.loadProjectLand(checkFormById);
            return; //END ACTION
        });
        $(document).on("change", '#blockId', function () {
            that.stored.blockId = hasValue($(this).val()) ? Number.parseInt($(this).val()) : null;
        });
        $(document).on("change", '#email', function () {
            that.stored.email = hasValue($(this).val()) ? $(this).val().toLowerCase() : null;
        });
        $(document).on("change", '#link', function () {
            that.stored.link = hasValue($(this).val()) ? $(this).val() : null;
        });
        $(document).on("change", '#name', function () {
            that.stored.name = hasValue($(this).val()) ? $(this).val() : null;
        });
        $(document).on("change", '#tcId', function () {
            that.stored.tcId = hasValue($(this).val()) ? $(this).val() : null;
        });
        $(document).on("change", '#note', function () {
            that.stored.note = hasValue($(this).val()) ? $(this).val() : null;
        });
        $(document).on("change", '#price', function () {
        	const price = parseInt($(this).autoNumeric("get"));
            that.stored.price = hasValue($(this).val()) ? price : null;
        });
        $(document).on("change", '#currency', function () {
            that.stored.currency = hasValue($(this).val()) ? $(this).val() : null;
        });
        $(document).on("change", '#houseNumber', function () {
            that.stored.houseNumber = hasValue($(this).val()) ? $(this).val() : null;
        });
        $(document).on("change", '.phone-multi', function () {
            that.stored.phones = that.getPhones();
            that.stored.phonesCheck = that.getPhonesCheck();
        });
        $(document).on("change", '#infoChannel', function () {
            that.stored.channelTypeId = hasValue($(this).val()) ? $(this).val() : null;
            that.promiseApi('GET_INFO_CHANNEL_CHILD');
        });
        $(document).on("change", '#infoChannelChild', function () {
            that.stored.channelTypeChildId = hasValue($(this).val()) ? $(this).val() : null;
        });

        $(document).on("change", '#campaignChecked', function () {
            const checked = $(this).is(':checked');
            if(checked) {
                $('#campaignId').prop('disabled', true);
                $('#campaignId').val('').trigger('change');
            } else {
                $('#campaignId').prop('disabled', false);
            }
            that.stored.campaignCheck = checked;
            //that.stored.campaignId = hasValue($(this).val()) ? $(this).val() : null;
        });
        $(document).on("change", '#campaignId', function () {
            that.stored.campaignId = hasValue($(this).val()) ? $(this).val() : null;
        });

        $(document).on("change", '#modelCode', function () {
            that.stored.modelCode = hasValue($(this).val()) ? $(this).val() : null;
        });

        $(document).on("change", '#projectId', function () {
            that.stored.projectId = hasValue($(this).val()) ? $(this).val() : null;
        });

        $(document).on("change", '#landCode', function () {
            that.stored.landCode = hasValue($(this).val()) ? $(this).val() : null;
        });

        $(document).on("change", '#mapCode', function () {
            that.stored.mapCode = hasValue($(this).val()) ? $(this).val() : null;
        });

        $("#check-duplicated-email-btn").click(function (e) {
            e.preventDefault();
            that.checkExistedOwner(false);
        });
        $("#check-duplicated-phone-btn").click(function (e) {
            e.preventDefault();
            that.checkExistedOwner(true);
        });
        $("#check-duplicated-btn").click(function (e) {
            e.preventDefault();
            that.checkExistedAddress();
        });
        $("#create-crawler-btn").click(function (e) {
            e.preventDefault();
            that.createCrawler();
        });
        $("#cancel-crawler-btn").click(function (e) {
            e.preventDefault();
            ModalConfirm.showModal({
                message: "Bạn có muốn xóa hết thông tin hay không ?",
                onYes: function (modal) {
                	location.reload();
                },
            });
        });
        $(".blc-phone-items").on('click', '.btn-phone-add', function (e) {
            e.preventDefault();
            var itemPhone =
                '<div class="col-sm-12 blc-phone-items blc-phone-multi">' +
                '<label class="control-label col-sm-2"></label>' +
                '<div class="col-sm-3 ">' +
                '<input id="phone" class="form-control phone-multi" type="text" name="phones[]">' +
                '</div>' +
                '<div class="col-sm-1">' +
                '<button class="btn btn-danger btn-phone-remove">' +
                '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>' +
                '</button>' +
                '</div>' +
                '</div>';

            if ($(".blc-phone-items").size() < that.stored.maximumPhones) {
                $(itemPhone).insertAfter(".blc-phone-items:last-child");
            } else {
                $(".btn-phone-add").addClass("disabled");
            }
            $('.phone-multi').phoneBasic();
        });

        // Remove phone number and handle jquery after added block phone
        $(document).on('click', '.btn-phone-remove', function (e) {
            e.preventDefault();
            $(this).parents("div.blc-phone-items").remove();
            $(".btn-phone-add").removeClass("disabled");
        });

        // Validate for phone number
        $(document).on('blur', 'input.phone-multi', function (e) {
            var blcPhone = $(this).parents("div.blc-phone-items");
            var inputPhone = $(this);
            var isValid = true;

            // reset to default
            blcPhone.find(".phone-error").remove();
            inputPhone.css("border-color", "");
            // validate
            var isValid = true;

            if (!inputPhone.val() || !isPhoneNumber(inputPhone.val())) {
                isValid = false;
            }

            if (!isValid) {
                var errorMsg = "<span class='phone-error'><code>Vui lòng nhập số điện thoại hợp lệ</code></span>";
                $(errorMsg).insertAfter(inputPhone);
                inputPhone.css("border-color", "red");
            }
        });
        $(document).on('blur', '#email', function (e) {
            var blcEmail = $(this).parent();
            var inputEmail = $(this);
            var isValid = true;

            // reset to default
            blcEmail.find(".email-error").remove();
            inputEmail.css("border-color", "");
            // validate
            var isValid = true;

            if (!isEmail(inputEmail.val())) {
                isValid = false;
            }
            if (!inputEmail.val()) {
                isValid = true;
            }

            if (!isValid) {
                var errorMsg = "<span class='email-error'><code>Vui lòng nhập email hợp lệ</code></span>";
                $(errorMsg).insertAfter(inputEmail);
                inputEmail.css("border-color", "red");
            }
        });

        $(".tc-wrapper").hide();
	}

    getPhones() {
        var phones = $('.phone-multi').map(function (idx, elem) {
            if ($(elem).val()) {
                return $(elem).val();
            }
        }).get();
        return phones;
    }
    getPhonesCheck() {
        var phones = $('.phone-multi').map(function (idx, elem) {
            if ($(elem).val()) {
                return {
                    phoneSub: $(elem).val(),
                };
            }
        }).get();
        return phones;
    }
    isNotPhones(phones) {
        var isErr = false;
        $.each(phones, function (i, e) {
            if (!isPhoneNumber(e)) {
                isErr = true;
            }
        });
        return isErr;
    }
    notZeroPhone(phones) {
        var isErr  = false;
        var index = [];

        $.each(phones, function (i, e) {
            if (e.slice(0, 1) !== "0") {
                isErr = true;
                index.push(i);
            }
        });

        return {isErr : isErr, indexs : index};
    }
    getPhonesStringArray(phones) {
        var phonesArray = $.map(phones, function (value, inx) {
            return value.phoneSub;
        });
        return phonesArray;
    }
    checkExistedOwner (isPhone) {
        let isValid = true;
        let errorMsg = "";
        const that = this;

        showPropzyLoading();

        if (isPhone) {
            const phones = that.stored.phonesCheck;
            // validate for phones
            if (phones.length === 0) {
                isValid = false;
                errorMsg = "Số điện thoại không hợp lệ";
            }
        } else {
            const email = that.stored.email;
            if (!email || !isEmail(email)) {
                isValid = false;
                errorMsg = "Email không hợp lệ";
            }
        }


        if (isValid) {

            let dataPost = {
                email: null,
                phones: null,
                ownerId: null,
                type: 2
			}
            if (isPhone) {
                dataPost.phones = that.stored.phonesCheck;
            } else {
                dataPost.email = that.stored.email;
            }

            //excute
            axios.post(POS_APIS_COMMON.get('CHECK_EXIST_OWNER'), JSON.stringify(dataPost))
				.then(response => {
                    hidePropzyLoading();
					const resultsContent = response.data;
					if (resultsContent.result) {
						if (typeof resultsContent.data[0] != "undefined") {
							let table = $("<table id='table-check-exist-owner'style='width: 900px'></table>").addClass("table table-hover");
							table.append("<thead><tr><th>#</th><th>Tên</th><th>Email</th><th>SĐT</th><th>Địa chỉ</th><th>Loại</th></tr></thead>");
							let tbody = $("<tbody></tbody>");
                            resultsContent.data.forEach((item) => {
                                let row = $("<tr></tr>");
                                row.append($("<td></td>").text(""));
                                row.append($("<td></td>").html(item.name));
                                row.append($("<td></td>").text(item.email));
                                row.append($("<td></td>").text(item.phone));
                                row.append($("<td></td>").html(item.address));
                                row.append($("<td></td>").text(item.typeName));
                                tbody.append(row);
							})
							table.append(tbody);
							showPropzyAlert(table);
							$("#table-check-exist-owner").hpaging({"limit": 5});

						} else {
							// open google if check phone number
							if (isPhone) {
								var phonesArray = that.getPhonesStringArray(that.stored.phonesCheck);
								var queryStr = 'https://www.google.com.vn/search?q=' + phonesArray.join('+%7C+');  // | character
								showPropzyAlert('Không có dữ liệu.' +
									'<a id="google-find-phone" href="' + queryStr + '" target="_blank">Tìm Số Điện Thoại Bằng Google</a>');
								$("#google-find-phone").click();
							} else {
								showPropzyAlert("Không có dữ liệu");
							}
						}
					} else {
						showPropzyAlert(resultsContent.message);
					}

				})
				.catch(err => {
					hidePropzyLoading();
					showPropzyAlert("Lỗi Api! Xin liên hệ với ban quản trị");
					console.error(err)
				});
        } else {
            hidePropzyLoading();
            showPropzyAlert(errorMsg);
        }
    }
    checkExistedAddress () {
        const that = this;
        showPropzyLoading();
        // validate value
        const err = that.validateInput(['city', 'district', 'ward', 'street', 'house']);
        // TODO: DBS-6330 Need update later
        // const canCheckExistAddress = (that.stored.mapCode && that.stored.landCode) || that.stored.modelCode || that.stored.houseNumber;
        // if(!canCheckExistAddress) {
        //     showPropzyAlert("Vui lòng nhập đủ thông tin (số nhà, hoặc số tờ - số thửa, hoặc mã căn hộ) để thực hiện check trùng địa chỉ");
        //     hidePropzyLoading();
        //     return;
        // }
        if (!err.isErr) {
            const dataPost = {
                "cityId": that.stored.cityId,
                "districtId": that.stored.districtId,
                "wardId": that.stored.wardId,
                "streetId": that.stored.streetId,
                "houseNumber": that.stored.houseNumber,
                "modelCode": that.stored.modelCode,
                "landCode": that.stored.landCode,
                "mapCode": that.stored.mapCode,
                "propertyTypeId": that.stored.propertyTypeId
            };
            axios.post(POS_APIS_COMMON.get('CHECK_DUPLICATED_ADDRESS'), JSON.stringify(dataPost))
                .then(response => {
                    hidePropzyLoading();
                    const resultsContent = response.data;
                    if (resultsContent.result) {
                        var duplicatedMsg = "";
                        var type1 = [];
                        var type2 = [];
                        var type3 = [];
                        var type4 = [];
                        $.map(resultsContent.data, function (item) {
                            if (item.type == 1) {
                              $.merge(type1, [item.id]);
                            } else if (item.type == 2) {
                              $.merge(type2, [item.id]);
                            } else if (item.type == 3) {
                              $.merge(type3, [item.id]);
                            }  else {
                              $.merge(type4, [item.id]);
                            }
                        });
                        
                        if (type1.length > 0) {
                            duplicatedMsg += '<strong>Tin đăng hệ thống : </strong> <br>';
                            $.each(type1, function (idx, item) {
                                duplicatedMsg += "<a target='_blank' href='/pos/sa/detail/" + item + "'> #" + item + "</a>,";
                            })
                        }

                        if (type2.length > 0) {
                            duplicatedMsg += '<br><strong>Tin đăng prescreener: </strong> <br>';
                            $.each(type2, function (idx, item) {
                                duplicatedMsg += "<a target='_blank' href='/pos/prescreener/view/" + item + "'> #" + item + "</a>,";
                            });
                        }

                        if (type3.length > 0) {
                            duplicatedMsg += '<br><strong>Tin hệ thống đã GỠ: </strong> <br>';
                            $.each(type3, function (idx, item) {
                                duplicatedMsg += "<a target='_blank' href='/pos/sa/detail/" + item + "'> #" + item + "</a>,";
                            });
                        }

                        if (type4.length > 0) {
                            duplicatedMsg += '<br><strong>Tin prescreener đã HỦY: </strong> <br>';
                            $.each(type4, function (idx, item) {
                                duplicatedMsg += "<a target='_blank' href='/pos/prescreener/view/" + item + "'> #" + item + "</a>,";
                            });
                        }

                        var newDuplicatedMsg = duplicatedMsg.substring(0, duplicatedMsg.length - 1);
                        if(newDuplicatedMsg.trim().length<=0){
                            newDuplicatedMsg = resultsContent.message;
                        }
                        showPropzyAlert(newDuplicatedMsg);
                    } else {
                        showPropzyAlert(resultsContent.message);
                    }
                })
				.catch(err => {
                        hidePropzyLoading();
                        showPropzyAlert("Lỗi Api! Xin liên hệ với ban quản trị");
                        console.error(err)
				});
        } else {
            hidePropzyLoading();
            showPropzyAlert(err.mess + "\r\nXin vui lòng kiểm tra lại dữ liệu");
        }
    }
    validateInput (types) {
		const stored = this.stored;
		const that = this;
        var errors = {
            isErr: false,
            mess: "",
            elem: null
        };
        if (($.inArray("link", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("eLink", types) == -1))
            && !stored.link) {
            errors.isErr = true;
            errors.mess = "Link không hợp lệ. ";
            errors.elem = $("#Link");
        } else if (($.inArray("phones", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("ePhones", types) == -1))
            && (!stored.phones || stored.phones.length == 0 || that.isNotPhones(stored.phones))) {
            errors.isErr = true;
            errors.mess = "Số điện thoại không hợp lệ. ";
            errors.elem = $("#phone");
        } else if (($.inArray("phones", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("ePhones", types) == -1))
            && that.notZeroPhone(stored.phones).isErr) {
            errors.isErr = true;
            errors.mess = "Số điện thoại phải bắt đầu bằng số 0. ";
            errors.elem = $("#phone");
        } else if (($.inArray("city", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("eCity", types) == -1))
            && !stored.cityId) {
            errors.isErr = true;
            errors.mess = "Thành phố không hợp lệ. ";
            errors.elem = $("#cityId");
        } else if (($.inArray("district", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("eDistrict", types) == -1))
            && !stored.districtId) {
            errors.isErr = true;
            errors.mess = "Quận không hợp lệ. ";
            errors.elem = $("#districtId");
        } else if (($.inArray("ward", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("eWard", types) == -1))
            && !stored.wardId) {
            errors.isErr = true;
            errors.mess = "Phường không hợp lệ. ";
            errors.elem = $("#wardId");
        } else if (($.inArray("street", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("eStreet", types) == -1))
            && !stored.streetId) {
            errors.isErr = true;
            errors.mess = "Đường không hợp lệ. ";
            errors.elem = $("#streetId");
        } else if (($.inArray("house", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("eHouse", types) == -1))
            && !stored.houseNumber) {
            errors.isErr = true;
            errors.mess = "Số nhà không hợp lệ. ";
            errors.elem = $("#houseNumber");
        } else if (($.inArray("modelCode", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("eModelCode", types) == -1))
            && !stored.modelCode) {
            errors.isErr = true;
            errors.mess = "Mã căn hộ không hợp lệ. ";
            errors.elem = $("#modelCode");
        } else if (($.inArray("source", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("eSource", types) == -1))
            && !stored.sourceId) {
            errors.isErr = true;
            errors.mess = "Nguồn không hợp lệ. ";
            errors.elem = $("#sourceId");
        } else if (($.inArray("status", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("eStatus", types) == -1))
            && !stored.statusId) {
            errors.isErr = true;
            errors.mess = "Phân loại không hợp lệ. ";
            errors.elem = $("#statusId");
        } else if (($.inArray("listingType", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("eListingType", types) == -1))
            && !stored.listingTypeId) {
            errors.isErr = true;
            errors.mess = "Loại giao dịch không hợp lệ. ";
            errors.elem = $("#listingTypeId");
        } else if (($.inArray("propertyType", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("ePropertyType", types) == -1))
            && !stored.propertyTypeId) {
            errors.isErr = true;
            errors.mess = "Loại BĐS không hợp lệ. ";
            errors.elem = $("#propertyTypeId");
        } else if(stored.sourceId == 177) {
            if (($.inArray("tc", types) > -1 || ($.inArray("all", types) > -1 && $.inArray("eTc", types) == -1))
                && !stored.tcId) {
                errors.isErr = true;
                errors.mess = "Trung tâm giao dịch không hợp lệ ";
                errors.elem = $("#tcId");
            }
        } else if(!stored.campaignCheck && stored.campaignId == null) {
            errors.isErr = true;
            errors.mess = "Campaign ID không được để trống. ";
            errors.elem = $("#campaignId");
        }

        return errors;
    }
    createCrawler() {

		const that = this;
        var list = $('#photos-wrapper').getListPhotos();
        var listGcn = $('#photoGcns-wrapper').getListPhotos();

        that.stored.photo = JSON.stringify(list);
        that.stored.photoGCN = JSON.stringify(listGcn);

        // validate
        if (hasValue(that.stored.email)) {
            if (!isEmail(that.stored.email)) {
                showPropzyAlert('Email không hợp lệ. <br> Xin vui lòng kiểm tra lại form nhập');
                return false;
            }
        }
        const checkFormById = that.getCheckForm(that.stored.formId);
        const buildingSetting = checkFormById.building;
        const validateArr = ['all', 'eLink', 'eWard', 'eStreet', 'eHouse'];
        if (!buildingSetting.modelCode.required){
            validateArr.push('eModelCode')
        }
        var errs = that.validateInput(validateArr)
        if (!errs.isErr) {
            // Kiểm tra có phải là môi giới không (3)
            const dataPost = {
                "cityId": that.stored.cityId,
                "districtId": that.stored.districtId,
                "wardId": that.stored.wardId,
                "streetId": that.stored.streetId,
                "houseNumber": that.stored.houseNumber,
                "modelCode": that.stored.modelCode,
                "projectId": that.stored.projectId,
                "landCode": that.stored.landCode,
                "mapCode": that.stored.mapCode,
                "statusId": that.stored.statusId,
                "email": that.stored.email,
                "link": that.stored.link,
                "name": that.stored.name,
                "note": that.stored.note,
                "phones": that.stored.phones,
                "price": that.stored.price,
                "listingTypeId": that.stored.listingTypeId,
                "propertyTypeId": that.stored.propertyTypeId,
                "buildingId": that.stored.buildingId,
                "blockId": that.stored.blockId,
                "photo": that.stored.photo,
                "photoGcn": that.stored.photoGCN,
                "currency": that.stored.currency,
                "sourceId" : that.stored.sourceId,
                "tcid" : that.stored.sourceId == 177 ? that.stored.tcId : null,
                "channelTypeId": that.stored.channelTypeId,
                "channelTypeChildId": that.stored.channelTypeChildId,
                "campaignId" : that.stored.campaignId,
            };
            function subCreateListing() {
                showPropzyLoading();
                axios.post(POS_APIS_CRAWLER.get('GET_CRAWLER_INSERT'), JSON.stringify(dataPost))
                    .then(response => {
                        hidePropzyLoading();
                        const resultsContent = response.data;
                        if (resultsContent.result) {
                            if (typeof (resultsContent.data.id) != "undefined" && resultsContent.data.id != null) {
                                showPropzyAlert(resultsContent.message, 'Thông Báo', function () {
                                    location.reload();
                                });
                            } else {
                                showPropzyAlert('Tạo tin đăng không thành công. Vui lòng thử lại!', 'Thông Báo');
                            }

                        } else {
                            showPropzyAlert(resultsContent.message, 'Thông Báo');
						}

                    })
					.catch(err => {
						hidePropzyLoading();
						showPropzyAlert("Lỗi Api! Xin liên hệ với ban quản trị");
						console.error(err)
					});
            }

            if (that.stored.statusId == 3) {
                ModalConfirm.showModal({
                    message: "Bạn đã chọn phân loại là 'Môi Giới'. \r\n Bạn vẫn muốn tiếp tục với phân loại là 'Môi Giới' ?",
                    onYes: function (modal) {
                        modal.modal("hide");
                        subCreateListing();
                    },
                });
            } else {
                subCreateListing();
            }

        } else {
            //requestCallback.addCallbackToQueue();
            showPropzyAlert(errs.mess + "<br> Xin vui lòng kiểm tra lại form nhập");
            $('#alertModal').find('.message').addClass('text-center');
        }
    }
    getCheckForm(formId){
        let findId = formId ? formId : 0; // Id = 0 (Default form)
        return ListForm.filter(f => f.id == findId).slice()[0];
    }
    checkSelectListingType(){
        const that = this;
        
        $('#realEstateGroupId').prop('disabled', true);

        //check selected listingTypeId
        if(hasValue(that.stored.listingTypeId)){
            $('#realEstateGroupId').select2().val(null).trigger('change');
            $('#realEstateGroupId').prop('disabled', false);
        }
        else {
            $('#realEstateGroupId').select2().val(null).trigger('change');
        }
    }
    checkSelectRealEstateGroup(){
        const that = this;

        $('#propertyTypeId').prop('disabled', true);

        //Check selected realEstateGroupId
        if(hasValue(that.stored.realEstateGroupId)){
            $('#propertyTypeId').prop('disabled', false);
        }else {
            $('#propertyTypeId').select2().val(null).trigger('change');
        }
    }
    
    loadBuilding(checkByFormId){
        const that = this;
        const buildingConfig = checkByFormId.building
        const displayBuilding = checkByFormId ? buildingConfig.display : false;
        $("#blc-building").hide();
        if (displayBuilding) {
            $("#blc-building").show();
            const isRequireModelCode = buildingConfig.modelCode.required;
            if(isRequireModelCode) {
                $(".label-modelCode").addRequired();
            }else {
                $(".label-modelCode").removeRequired();
            }
            that.promiseApi('GET_BUILDING_BY_DISTRICT');
        }
    }

    loadProjectLand(checkByFormId) {
        const that = this;
        const projectConfig = checkByFormId.project
        const buildingConfig = checkByFormId.building
        const displayProject = checkByFormId ? projectConfig.display : false;
        const displayBuilding = buildingConfig ? buildingConfig.display : false;
        const canEditProject = checkByFormId ? projectConfig.edit : false;
        $("#blc-project").hide();
        $("#projectId").attr('disabled', true);
        $("#projectId").val('');
        if (displayProject) {
            $("#blc-project").show();
            if(canEditProject){
                $("#projectId").attr('disabled', false);
            }
            if(displayBuilding){
                const buildingData = $("#buildingId").select2('data')[0];
                if(buildingData) {
                    const projectId = !isNaN(buildingData.projectId) ? buildingData.projectId : '';
                    $("#projectId").val(projectId).trigger('change');
                }
            }
        }
    }
    
    renderMapAndLandCode(checkByFormId){
        const displayMapCode = checkByFormId ? checkByFormId.mapCode : false;
        const displayLandCode = checkByFormId ? checkByFormId.landCode : false;
        // mapCode
        if(displayMapCode){
            $("#display-mapCode").show();
        }else {
            $("#display-mapCode").hide();
            $("mapCode").val('');
        }
        // landCode
        if(displayLandCode){
            $("#display-landCode").show();
        }else {
            $("#display-landCode").hide();
            $("landCode").val('');
        }
    }
}