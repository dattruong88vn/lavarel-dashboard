class Seo {
    constructor(props) {
        this._API = {
            'get-cites' : '/zone/get-cites',
            'get-districts' : '/zone/get-district-list-by-city',
            'get-wards' : '/zone/get-wards',
            'get-listing-type' : '/lso/get-property-types',
            'get-realestate-group' : '/common/real-estate-group',
            'get-property-type' : '/lso/get-property-type-list',
            'get-property-type-v2' : '/common/property-type-list-v2',
            'get-direction' : '/seo/get-directions',
            'create-seo' : '/seo/postpage/post',
            'update-seo' : '/seo/postpage/put'

        };
        this._STORED = {
            data : {
                "slug": null,
                "description": null,
                "cityId": null,
                "districtIds": null,
                "wardIds": null,
                "onlyCity": false,
                "onlyDistrict": false,
                "h1": null,
                "h2": null,
                "title": null,
                "content": null,
                "listingTypeId" : null,
                "realEstateGroupIds": '',
                "realEstateGroupList": [],
                "propertyTypeIds": '',
                "minPrice": null,
                "maxPrice": null,
                "minSize": null,
                "maxSize": null,
                "bedRooms": null,
                "bathRooms": null,
                "numberFloors": null,
                "directionId": null
            },
            defaultOption: [{
                id : '',
                text : '--- Tất cả ---'
            }],
            pageType : 'CREATE',
            list : {
                district : new Set(),
                wards : new Map()
            },
            listSelect : {
                district : [],
                wards : [],
            },
            validateList : []
        };
        if (typeof(props) !== "undefined" && typeof(props.data) !== "undefined" && typeof (props.data) == "object")  {
            this._STORED.data = Object.assign(this._STORED.data, props.data);
        }
        if (typeof(props) !== "undefined" && typeof(props.pageType) !== "undefined" )  {
            this._STORED.pageType = props.pageType;
        }
        this.showValidate();
        this.defaultData();
        this.loadApi();
        this.loadData();
        this.events();

    }
    loadApi() {
        const that = this;
        Promise.all([
            this.__promiseApi('GET_CITIES', ''),
            this.__promiseApi('GET_DISTRICT', {cityId: that._STORED.data.cityId}),
            this.__promiseApi('GET_LISTING_TYPE', ''),
            this.__promiseApi('GET_REALESTATE_GROUP', {listingTypeId: that._STORED.data.listingTypeId}),

            this.__promiseApi('GET_PROPERTY_TYPE_V2', { listingTypeId: that._STORED.data.listingTypeId, realEstateGroupId: that._STORED.data.propertyTypeGroupId }),
            this.__promiseApi('GET_WARDS', {districtId: that._STORED.data.districtIds}),
            this.__promiseApi('GET_DIRECTION', {}),
        ]).then(() => {
            this.loadData();
        });

    }
    defaultData() {
        if(!this._STORED.data.cityId) {
            this._STORED.data.cityId = 1; // tp-hcm
        }
    }
    loadData() {
        const that = this;
        const storedData = this._STORED.data;
        if(storedData.slug) {
            $('#slug').val(storedData.slug);
        }
        if(storedData.onlyCity) {
            $('#onlyCity').prop('checked', true);
        }
        if(storedData.onlyDistrict) {
            $('#onlyDistrict').prop('checked', true);
        }
        if(storedData.minPrice) {
            $('#minPrice').val(storedData.minPrice).trigger('input');
        }
        if(storedData.maxPrice) {
            $('#maxPrice').val(storedData.maxPrice).trigger('input');
        }
        if(storedData.minSize) {
            $('#minSize').val(storedData.minSize).trigger('input');
        }
        if(storedData.maxSize) {
            $('#maxSize').val(storedData.maxSize).trigger('input');
        }
        if(storedData.bedRooms) {
            $('#bedRooms').val(storedData.bedRooms).trigger('input');
        }
        if(storedData.bathRooms) {
            $('#bathRooms').val(storedData.bathRooms).trigger('input');
        }
        if(storedData.numberFloors) {
            $('#numberFloors').val(storedData.numberFloors).trigger('input');
        }
        if(storedData.title) {
            $('#title').val(storedData.title);
        }
        if(storedData.description) {
            $('#description').val(storedData.description);
        }
        if(storedData.content) {
            $('#content').val(storedData.content);
        }
        if(storedData.h1) {
            $('#h1').val(storedData.h1);
        }
        if(storedData.h2) {
            $('#h2').val(storedData.h2);
        }
        if (storedData.cityId) {
            $('#cityId').val(storedData.cityId).select2();
        }
        if (storedData.districtIds) {
            $('#districtIds').val(storedData.districtIds).select2();
        }
        if (storedData.wardIds) {
            $('#wardIds').val(storedData.wardIds).select2();
        }
        if (storedData.listingTypeId) {
            $('#listingTypeId').val(storedData.listingTypeId).select2();
        }
        if (storedData.propertyTypeGroupId) {
            $('#realEstateGroupIds').val(storedData.propertyTypeGroupId).select2()
        }
        if (storedData.propertyTypeIds) {
            $('#propertyTypeIds').val(storedData.propertyTypeIds).select2();
        }
        if (storedData.directionId) {
            $('#directionId').val(storedData.directionId).select2();
        }
    }
    updateData() {
        const slug = $.trim($('#slug').val()) ? $.trim($('#slug').val()) : null;
        const onlyCity = $('#onlyCity').is(':checked');
        const onlyDistrict = $('#onlyDistrict').is(':checked');
        const minPrice = $.trim($('#minPrice').val()) ? $('#minPrice').val().replace(/,/g, '') : null;
        const maxPrice = $.trim($('#maxPrice').val()) ? $('#maxPrice').val().replace(/,/g, '') : null;
        const minSize = $.trim($('#minSize').val()) ? Number.parseFloat($('#minSize').val()) : null;
        const maxSize = $.trim($('#maxSize').val()) ? Number.parseFloat($('#maxSize').val()) : null;
        const bedRooms = $.trim($('#bedRooms').val()) ? Number.parseInt($('#bedRooms').val()) : null;
        const bathRooms = $.trim($('#bathRooms').val()) ? Number.parseInt($('#bathRooms').val()) : null;
        const numberFloors = $.trim($('#numberFloors').val()) ? Number.parseInt($('#numberFloors').val()) : null;
        const title = $.trim($('#title').val()) ? $('#title').val() : null;
        const description = $.trim($('#description').val()) ? $('#description').val() : null;
        const h1 = $.trim($('#h1').val()) ? $('#h1').val() : null;
        const h2 = $.trim($('#h2').val()) ? $('#h2').val() : null;
        const content = CKEDITOR.instances["content"].getData();

        const cityId = $('#cityId').val() ? Number.parseInt($('#cityId').val()) : null;
        const districtIds = $('#districtIds').val() ? $('#districtIds').val() : null;
        const wardIds = $('#wardIds').val() ? $('#wardIds').val(): null;

        const listingTypeId = $('#listingTypeId').val() ? Number.parseInt($('#listingTypeId').val()) : null;
        const realEstateGroupIds = $('#realEstateGroupIds').val() ? $('#realEstateGroupIds').val() : '';
        const propertyTypeIds = $('#propertyTypeIds').val() ? $('#propertyTypeIds').val() : '';
        const directionId = $('#directionId').val() ? Number.parseInt($('#directionId').val()) : null;


        this._STORED.data = Object.assign(this._STORED.data, {
            slug : slug,
            onlyCity : onlyCity,
            onlyDistrict : onlyDistrict,
            minPrice : minPrice,
            maxPrice : maxPrice,
            minSize : minSize,
            maxSize :maxSize,
            bedRooms: bedRooms,
            bathRooms: bathRooms,
            numberFloors: numberFloors,
            title: title,
            description: description,
            h1 : h1,
            h2 : h2,
            content : content,
            cityId : cityId,
            districtIds : districtIds,
            wardIds : wardIds,
            listingTypeId,
            realEstateGroupIds,
            propertyTypeIds,
            directionId
        });
    }
    async __promiseApi(name , params = {}) {
        let promise = null;
        switch (name) {
            case 'GET_CITIES' : {
                let response = [];
                $('#cityId').html('')
                if (Object.keys(params).length === 0) {
                    params = ''
                } else {
                    params = JSON.stringify(params)
                }

                await $.ajax({
                    type: 'GET',
                    url: this._API['get-cites'],
                    data: params,
                    contentType: "application/json",
                    dataType: "json",
                    success: function (xhr) {
                        response = xhr;
                    },
                    error: function (data) {
                        console.error(data);
                    },
                });
                let dataMap = response.map((it) => {
                    return {id: it.cityId, text: it.cityName};
                });
                const data = [{
                    id : '',
                    text : '--- Vui lòng chọn ---'
                }].concat(dataMap);
                $('#cityId').select2({data : data });
                break;
            }
            case 'GET_DISTRICT' : {
                let response = [];
                $('#districtIds').html('')
                if (params.cityId) {
                    await $.ajax({
                        type: 'GET',
                        url: this._API['get-districts'] + '/' + params.cityId,
                        contentType: "application/json",
                        dataType: "json",
                        success: function (xhr) {

                            if (xhr.data && xhr.result) {
                                response = xhr.data;
                            }
                        },
                        error: function (data) {
                            console.error(data);
                        },
                    });
                }
                let dataMap = response.map((it) => {
                    return {id: it.districtId, text: it.districtName};
                });
                const data = [{
                    id : '',
                    text : 'Tất cả'
                }].concat(dataMap);
                $('#districtIds').select2({data : data });
                break;
            }
            case 'GET_WARDS' : {
                $('#wardIds').html('');
                let response = [];
                if (params.districtId) {
                    await $.ajax({
                        type: 'GET',
                        url: this._API['get-wards'] + '/' + params.districtId,
                        contentType: "application/json",
                        dataType: "json",
                        success: function (xhr) {
    
                            if (xhr.data && xhr.result) {
                                response = xhr.data;
                            }
                        },
                        error: function (data) {
                            console.error(data);
                        },
                    });
                }
                
                let dataMap = response.map((it) => {
                    return {id: it.wardId, text: it.wardName};
                });
                const data = [{
                    id : '',
                    text : 'Tất cả'
                }].concat(dataMap);
                $('#wardIds').select2({data : data });
                break;
            }
            case 'GET_LISTING_TYPE' : {
                $('#listingTypeId').html('');
                let response = [];
                await $.ajax({
                    type: 'GET',
                    url: this._API['get-listing-type'],
                    data: JSON.stringify(params),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (xhr) {
                        response = xhr;
                    },
                    error: function (data) {
                        console.error(data);
                    },
                });
                let dataMap = [];
                $.each(response, function (i, it) {
                    dataMap.push({id: i, text: it});
                });
                const data = [{
                    id : '',
                    text : '--- Vui lòng chọn ---'
                },
                ].concat(dataMap);

                /* data.push({
                    id: 99,
                    text: 'Dự án'
                }) */
                
                $('#listingTypeId').select2({data : data });
                break;
            }
            case 'GET_REALESTATE_GROUP' : {
                let data = this._STORED.defaultOption
                $('#realEstateGroupIds').html('').select2({ data })

                let response = []
                if (params.listingTypeId && this._STORED.data.realEstateGroupList.length === 0) {
                    response = await $.ajax({
                        type: 'GET',
                        url: this._API['get-realestate-group'],
                        contentType: "application/json",
                        dataType: "json",
                        success: function (xhr) {
                            return xhr
                        },
                        error: function (data) {
                            return console.error(data)
                        },
                    });
                }

                let dataMap = []
                if (response && response.data) {
                    dataMap = response.data.map((it) => {
                        return {id: it.id, text: it.text};
                    })

                    data = data.concat(dataMap)
                }
                this._STORED.data.realEstateGroupList = dataMap

                // render for edit
                $('#realEstateGroupIds').select2({ data })

                break;
            }
            case 'GET_PROPERTY_TYPE' : {
                let response = [];
                $('#propertyTypeIds').html('');
                if (params.listingTypeId) {
                    response = await $.ajax({
                        type: 'GET',
                        url: this._API['get-property-type'] + '/' +  params.listingTypeId,
                        data: JSON.stringify(params),
                        contentType: "application/json",
                        dataType: "json",
                        success: function (xhr) {
                            return response
                        },
                        error: function (data) {
                            return console.error(data);
                        },
                    });
                }

                let data = this._STORED.defaultOption
                if (response && response.data) {
                    const dataMap = response.data.map((it) => {
                        return {id: it.propertyTypeID, text: it.typeName};
                    });
                    data = data.concat(dataMap)
                }

                $('#propertyTypeIds').select2({data : data });
                break;
            }
            case 'GET_PROPERTY_TYPE_V2' : {
                let response = []

                $('#propertyTypeIds').html('')
                if (params.listingTypeId && params.realEstateGroupId) {
                    response = await $.ajax({
                        type: 'GET',
                        url: this._API['get-property-type-v2'] + '/' + params.realEstateGroupId + '/' + params.listingTypeId,
                        contentType: "application/json",
                        dataType: "json",
                        success: function (xhr) {
                            return xhr
                        },
                        error: function (data) {
                            return console.error(data);
                        },
                    })
                }

                let dataMap = []
                if (response && response.data) {
                    dataMap = response.data.map((it) => {
                        return { id: it.propertyTypeId, text: it.typeName }
                    })
                }

                const data = this._STORED.defaultOption.concat(dataMap)

                $('#propertyTypeIds').select2({ data })
                break
            }
            case 'GET_DIRECTION' : {
                let response = [];
                $('#directionId').html('');
                await $.ajax({
                    type: 'GET',
                    url: this._API['get-direction'] ,
                    data: JSON.stringify(params),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (xhr) {
                        response = xhr
                    },
                    error: function (data) {
                        console.error(data);
                    },
                });
                let dataMap = response.map((it) => {
                    return {id: it.did, text: it.directionName};
                });
                const data = [{
                    id : '',
                    text : '--- Vui lòng chọn ---'
                }].concat(dataMap);
                $('#directionId').select2({data : data });
                break;
            }
        }
        return promise;
    }
    showValidate() {
        const that = this;
        this._STORED.validateList.push({
            id : 'slug',
            value : () =>  {
                return that._STORED.data.slug;
            },
            hideMessage : true,
        });
        this._STORED.validateList.push({
            id : 'cityId',
            value : () =>  {
                return that._STORED.data.cityId;
            },
            hideMessage : true,
        });
        this._STORED.validateList.push({
            id : 'listingTypeId',
            value : () =>  {
                return that._STORED.data.listingTypeId;
            },
            hideMessage : true,
        });
        // this._STORED.validateList.push({
        //     id : 'propertyTypeIds',
        //     value : () =>  {
        //         return that._STORED.data.propertyTypeIds;
        //     },
        //     hideMessage : true,
        // });
        this._STORED.validateList.forEach((item) => {
            $('.form-group').find('label[for="' + item.id +'"]').addClass('required');
        });
    }
    validate() {
        // clear
        $('.has-error').removeClass('has-error');
        //
        const that = this;
        const  validation = {
            isError : false,
            listFail : new Set()
        };
        this._STORED.validateList.forEach(it => {
            let message = null;
            let hasErr = false;
            if(typeof (it.rules) !== "undefined") {
                if (typeof (it.rules.notEmpty) !== "undefined" && (it.value() == null || it.value() === '' || it.value() === 0 || (Array.isArray( it.value()) && it.value().length > 0 ))) {
                    hasErr = true;
                    //message = typeof (it.rules.notEmpty.message) !== 'undefined' ? it.rules.notEmpty.message : that._DEFAULT_MESSAGE.notEmpty.message;
                }
                if(typeof (it.rules.notFalse) !== "undefined" && (it.value() == null || !it.value())) {
                    hasErr = true;
                   // message = typeof (it.rules.notFalse.message) !== 'undefined' ? it.rules.notFalse.message : that._DEFAULT_MESSAGE.notFalse.message;
                }
                if(typeof (it.rules.notNull) !== "undefined" && it.value() == null) {
                    hasErr = true;
                   // message = typeof (it.rules.notNull.message) !== 'undefined' ? it.rules.notNull.message : that._DEFAULT_MESSAGE.notNull.message;
                }
            } else {
                // default check empty
                if(it.value() == null || it.value() === '' || it.value() === 0 || (Array.isArray( it.value()) && it.value().length === 0)) {
                    hasErr = true;
                   // message = that._DEFAULT_MESSAGE.notEmpty.message;
                }
            }
            // show
            if (hasErr) {
                validation.isError = true;
                validation.listFail.add(it);
                $('label[for="' + it.id +'"]').parents('.form-group').addClass('has-error');
                if((typeof (it.hideMessage) == 'undefined' || !it.hideMessage) && message != null) {
                    //$('.form-group').find('#'+ it.id).after('<span class="help-block sa-error">'+ message +'</span>');
                }
            }
        });
        return validation;
    }
    save() {
        this.updateData();
        const validate = this.validate();
        const url = this._STORED.pageType == 'CREATE' ? this._API['create-seo'] : this._API['update-seo'];
        if (validate.isError) {
            posNotifyAlert({type: "pos-notify-warning", message : 'Thiếu thông tin. Xin vui lòng kiểm tra lại dữ liệu'});
            return false;
        }
        showPropzyLoading();
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(this._STORED.data),
            contentType: "application/json",
            dataType: "json",
            success: function (xhr) {
                hidePropzyLoading();
                if ( xhr.result) {
                    posNotifyAlert({type: "pos-notify-success", message : 'Thành công! Trang sẽ tự động reload lại sau 1s'});
                    setTimeout(()=>{
                       location.reload();
                    }, 1000);
                } else {
                    posNotifyAlert({type: "pos-notify-danger", message : xhr.message});
                }
            },
            error: function (data) {
                hidePropzyLoading();
                console.error(data);
            },
        });

    }
    events() {
        const that = this;
        CKEDITOR.replace('content');
        $('#bedRooms').inputNumber({start : 0});
        $('#bathRooms').inputNumber({start : 0});
        $('#numberFloors').inputNumber({start : 0});
        $('#minPrice').inputNumber({start : 0 , type : 'price'});
        $('#maxPrice').inputNumber({start : 0 , type : 'price'});
        $('#minSize').inputNumber({start : 0 , isFloat : true});
        $('#maxSize').inputNumber({start : 0 , isFloat : true});
        if (this._STORED.pageType == 'EDIT') {
            $('#slug').prop('disabled', true);
        }

        //
        $(document).on('change', '#cityId', function (e) {
            e.preventDefault();
            that._STORED.data.cityId = $(this).val() ? Number.parseInt($(this).val()) : null;
            Promise.all([
                that.__promiseApi('GET_DISTRICT', {cityId: that._STORED.data.cityId})
            ]).then(() => {
               $('#districtIds').trigger('change');
            });
        });
        $(document).on('change', '#districtIds', function (e) {
            e.preventDefault();
            that._STORED.data.districtIds = $(this).val() ? Number.parseInt($(this).val()) : null;
            that.__promiseApi('GET_WARDS', {districtId: that._STORED.data.districtIds});
        });
        $(document).on('change', '#listingTypeId', function (e) {
            e.preventDefault();
            that._STORED.data.listingTypeId = $(this).val() ? Number.parseInt($(this).val()) : null;
            if (that._STORED.data.realEstateGroupList.length === 0) {
                that.__promiseApi('GET_REALESTATE_GROUP', { listingTypeId: that._STORED.data.listingTypeId })
            } else { // reset realEstateGroupId, property type
                that._STORED.data.realEstateGroupId = ''
                that._STORED.data.propertyTypeIds = ''
                
                const dataRealEstateGroup = that._STORED.defaultOption.concat(that._STORED.data.realEstateGroupList)
                $('#realEstateGroupIds').html('').select2({
                    data: dataRealEstateGroup
                })
                $('#propertyTypeIds').html('').select2({
                    data: that._STORED.defaultOption
                });
            }

            return
        });
        $(document).on('change', '#realEstateGroupIds', function (e) {
            e.preventDefault();
            that._STORED.data.realEstateGroupId = $(this).val() ? Number.parseInt($(this).val()) : ''

            if (that._STORED.data.realEstateGroupId) {
                that.__promiseApi('GET_PROPERTY_TYPE_V2', {
                    listingTypeId: that._STORED.data.listingTypeId,
                    realEstateGroupId: that._STORED.data.realEstateGroupId
                })
            } else { // reset property type
                that._STORED.data.propertyTypeId = ''
            }

            return
        });
        $(document).on('click', '#finish', function (e) {
            e.preventDefault();
            that.save();
        });
    }

}
$(document).ready(function () {
    showPropzyLoading();
    Window.seo = new Seo({data : _SEO_DETAIL, pageType : _PAGE_TYPE});
    $(window).load(function () {
        hidePropzyLoading();
    });
});