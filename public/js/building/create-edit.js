const _localStoreBuilding = {
    dataPost : {
        latitude: null,
        longitude: null,
        address: null,
        listingType: {
            listingTypeID : null // 1 or 2
        },
        propertyType : {
            propertyTypeID : null,
        },
        purpose : {
            purPoseID : null,
        },
        mainVideo : null,//[]
        mainPhoto : null, //[]
        photo : null,
        video : null,
        listingTypeName : null,
        purposeName : null,
        propertyTypeName : null,
        building : {
            projectId : null,
            buildingManagementID: null,
            buildingManagementName: null,
            buildingManagementEmail: null,
            phoneNumber: null,
            mobilePhone: null,
            buildingRate: null,
            buildingName: null,
            latitude: null,
            longitude :  null,
            blocks: [],
            "isVerified": false
        },
        amenitiesList: [],
        listingFees: [],
        cityId: null,
        districtId: null,
        listingLanguages: []
    },
    stored : {
        currentTabId : typeof (numberOfBlock) ? numberOfBlock : 1,
        templateBlockCompiled : Template7.compile($('#building-tab-block-tmpl').html()),
        templateCostCompiled : Template7.compile($('#charges-tmpl').html()),
    }
};

const _localPromiseApiBuilding = async function (name, parrams = {}) {
    switch (name) {
        case 'GET_PROJECT' : {
            $("#project").html('').select2();
            let response = [];
            let data = [{id : 0, text : '-- Vui lòng chọn dự án --'}];
            await $.ajax({
                type: 'POST',
                url: '/get-project-list-by-district',
                data: JSON.stringify(parrams),
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
            let hasProject = false;
            let dataContent = response.map((it) => {
                if(projectId && projectId == it.pId) {
                    hasProject = true;
                }
                return {id: it.pId, text: it.projectName, address: it.address, longitude: it.longitude, latitude: it.latitude};
            });
            data = data.concat(dataContent);
            $("#project").select2({
                data: data,
            });
            if(hasProject) {
                $("#project").val(projectId).select2();
            }

            break;
        }
    }
};
class Building {
    constructor() {
        this.loadApi();
        this.loadutilitie();
        this.bindEvents();
    }
    loadutilitie() {
        let utilites = [];
        if(typeof (amenities) !== "undefined" && Array.isArray(amenities)) {
            utilites = amenities;
        }
        const list = utilites.map(it => {
            let parentChecked = '';
            let parentValue = '';
            let parentInputHtml = '';
            if(typeof (includeAmenities) !== "undefined" && typeof (includeAmenities[it.id]) !== "undefined") {
                parentChecked = 'checked';
                parentValue = includeAmenities[it.id] ? includeAmenities[it.id] : '';
            }
            if(it.control == 'input_if_checked' && parentChecked.length > 0) {
                parentInputHtml = `<input type="text" class="form-control" name="utilitie-text-${it.id}" id="utilitie-text-${it.id}" style="display: block" value="${parentValue}">`;
            }
            if(it.control == 'input_if_checked' && parentChecked.length == 0) {
                parentInputHtml = `<input type="text" class="form-control" name="utilitie-text-${it.id}" id="utilitie-text-${it.id}" style="display: none" value="${parentValue}">`;
            }

            // childs
            let childsHtml = '';
            if (typeof (it.childs) && it.childs.length > 0) {

                const childs = it.childs.map(child => {
                    let childChecked = '';
                    let childValue = '';
                    let childInputHtml = '';
                    if(typeof (includeAmenities) !== "undefined" && typeof (includeAmenities[child.id]) !== "undefined") {
                        childChecked = 'checked';
                        childValue = includeAmenities[child.id] ? includeAmenities[child.id] : '';
                    }
                    if(child.control == 'input_if_checked' && childChecked.length > 0) {
                        parentInputHtml = `<input type="text" class="form-control" name="utilitie-text-${it.id}" id="utilitie-text-${it.id}" style="display: block" value="${childValue}">`;
                    }
                    if(child.control == 'input_if_checked' && childChecked.length == 0) {
                        parentInputHtml = `<input type="text" class="form-control" name="utilitie-text-${it.id}" id="utilitie-text-${it.id}" style="display: none" value="${childValue}">`;
                    }
                    const html = `<label class="checkbox text-capitalize font-weight-bold">
<input  class="amenityc-child parent-${it.id}" value="${child.id}" id="utilitie-${child.id}" name="utilitie-${child.id}" type="checkbox" data-control="${child.control}" data-id="${child.id}" data-parent="${it.id}" ${childChecked}>
<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> ${child.name}</label> 
${childInputHtml}`;
                    return html;
                });
                if(childs.length > 0) {
                    childsHtml = `<div class="amenityc-child-content" data="${childs.length}">${childs.join('')}</div>`;
                }
            }

            let parentHtml = `<div class="col-sm-12 col-md-4 col-lg-4 utilitie-item-content">
<label class="checkbox text-capitalize font-weight-bold">
<input  class="utilitie" value="${it.id}" id="utilitie-${it.id}" name="utilitie-${it.id}" type="checkbox" data-control="${it.control}" data-id="${it.id}" ${parentChecked}>
<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> ${it.name}</label>
${parentInputHtml}
${childsHtml}
</div>`;
            return parentHtml;
        });
        $('#utilitie-group').html(list.join(''));

    }
    bindEvents() {
        const that = this;
        this.initFeild();
        // autocompleted
        $(document).on('keyup', '#name-building', function (e) {
            e.preventDefault();
            const data = {
                cityId : $('#cityId').val(),
                districtId  : $('#district').val(),
                limit : 10,
                key : $.trim($(this).val()).toLowerCase()
            };
            // get
            $.ajax({
                type: 'POST',
                url: '/building/search-building',
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: "json",
                success: function (xhr) {
                    if (xhr.data) {
                       that.showSearchBox(xhr.data, data.key);
                    } else {
                        that.showSearchBox(null);
                    }
                },
                error: function (data) {
                    that.showSearchBox(null);
                },
            });
        });
        $(document).mouseup(function(e)
        {
            const container = $('#building-name-search-block');

            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0)
            {
                container.hide();
            }
        });
        // open map
        $(document).on('click', '#seeonmap', function (e) {
            e.preventDefault();
            const lat= $.trim($('#lat').val());
            const long = $.trim($('#lng').val());
            window.open('https://www.google.com/maps/?q='+lat+','+long, '_blank');
            return false;
        });
        // bind geo google map
        $("#address").geocomplete()
            .bind("geocode:result", function(event, result){
                $("#lat").val(result.geometry.location.lat());
                $("#lng").val(result.geometry.location.lng());
                _localStoreBuilding.dataPost.latitude = result.geometry.location.lat();
                _localStoreBuilding.dataPost.longitude = result.geometry.location.lng();
                _localStoreBuilding.dataPost.building.latitude = result.geometry.location.lat();
                _localStoreBuilding.dataPost.building.longitude = result.geometry.location.lng();
                _localStoreBuilding.dataPost.address = result.formatted_address;
            });
        // add a block
        $(document).on('click', '#btn-add-tab', function (e) {
            e.preventDefault();
            _localStoreBuilding.stored.currentTabId++;
            const _tabId = _localStoreBuilding.stored.currentTabId;
            const html = _localStoreBuilding.stored.templateBlockCompiled({});
            $('#tab-list li').eq(-1).before($('<li><a href="#tab' + _tabId + '" role="tab" data-toggle="tab">Block ' + _tabId + '&nbsp&nbsp<button class="close" type="button" title="Remove this page">×</button></a></li>'));

            $('#tab-content').append($('<div class="tab-pane fade" id="tab' + _tabId + '">'+ html +'</div>'));

            setTimeout(function(){
                $('#tab-list a[href="#tab' + _tabId + '"]').tab('show');
            }, 200);

            $("input[name='year-built-block']").mask("0000");
            $("input[name='year-fix-block']").mask("0000");
        });
        // remove a block
        $(document).on('click', '#tab-list .close', function (e) {
            e.preventDefault();
            const tabID = $(this).parents('a').attr('href');
            $(this).parents('li').remove();
            $(tabID).remove();

            //display first tab
            const tabFirst = $('#tab-list a:first');
            tabFirst.tab('show');
        });
        // add cost
        $(document).on('click', '.wrapper-charges .row-hh .txt-add', function (e) {
            e.preventDefault();
            $(this).parent('.add-row').html('<i class="btn-fa-circle btn-fa-circle-pink fa fa-minus minus-row"></i>');
            $('.wrapper-charges').append(_localStoreBuilding.stored.templateCostCompiled({}));
            $('select').select2();
        });
        // remove cost
        $(document).on('click', '.wrapper-charges .row-hh .minus-row', function (e) {
            e.preventDefault();
            $(this).parents('.row-hh').remove();
        });
        $(document).on('click', '#finish', function (e) {
            e.preventDefault();
            that.sendPost();
        });

        // change district
        $(document).on('change', '#district', function (e) {
            e.preventDefault();
            // resset address
            $('#address').val('');
            $("#lat").val('');
            $("#lng").val('');
            _localStoreBuilding.dataPost.latitude = null;
            _localStoreBuilding.dataPost.longitude = null;
            _localStoreBuilding.dataPost.building.latitude = null;
            _localStoreBuilding.dataPost.building.longitude = null;
            _localStoreBuilding.dataPost.address = null;
            // reset project
            _localPromiseApiBuilding('GET_PROJECT', {
                cityId : $('#cityId').val(),
                districtId  : $('#district').val(),
            });
        });
        $(document).on('change', '#project', function (e) {
            let data =$('#project').select2('data');
            data = data[0];
            if(typeof (data.address) !== "undefined" && data.address !== null) {
                $('#address').val(data.address);
            }
            if(typeof (data.latitude) !== "undefined" && data.latitude !== null) {
                $('#lat').val(data.latitude);
            } else {
                $('#lat').val('');
            }
            if(typeof (data.longitude) !== "undefined" && data.longitude !== null) {
                $('#lng').val(data.longitude);
            } else {
                $('#lng').val('');
            }
        });
        $(document).on('change', '.utilitie, .amenityc-child', function (e) {
           const id = $(this).data('id');
           const control = $(this).data('control');
           if (control === 'input_if_checked') {
               if($(this).is(':checked')) {
                   $('#utilitie-text-' + id).css('display', 'block');
               } else {
                   $('#utilitie-text-' + id).css('display', 'none');
               }

           }
           // check all childs
            if($(this).is(':checked')) {
                $('.parent-' + id).prop('checked', true);
            } else {
                $('.parent-' + id).prop('checked', false);
            }
            const parentId = $(this).data('parent');
            if (typeof (parentId) !== "undefined" && parentId != null) {
                const number = $(this).parents('.utilitie-item-content').find('input.amenityc-child');
                const numberCheck = $(this).parents('.utilitie-item-content').find('input.amenityc-child:checked');
                if (number.length ==  numberCheck.length) {
                    $('#utilitie-' + parentId).prop('checked', true);
                } else {
                    $('#utilitie-' + parentId).prop('checked', false);
                }
            }
        });
    }
    showSearchBox(data, keyword = null) {
        let html = [];
        if (data && Array.isArray(data) && data.length > 0) {
            html = data.map(it => {
                return `<a class="dropdown-item" href="javascript:void()">${it.buildingName}</a>`;
            });
            $('#building-name-search-block').html(html.join(""));
            $('#building-name-search-block').show();
            const buildingName = data[0].buildingName ? data[0].buildingName.toLocaleLowerCase() : null;
            if (keyword) {
                if (keyword == buildingName) {
                    // not allow
                    $('.block-name .input-icon').html('<i class="fa fa-times"></i>');
                } else {
                    $('.block-name .input-icon').html('<i class="fa fa-check"></i>');
                }
            } else {
                $('.block-name .input-icon').html('<i class="fa fa-check"></i>');
            }
        } else {
            $('#building-name-search-block').html('');
            $('#building-name-search-block').hide();
            $('.block-name .input-icon').html('<i class="fa fa-check"></i>');
        }
        if($.trim($('#name-building').val()).length === 0) {
            $('.block-name .input-icon').html('<i class="fa fa-times"></i>');
        }
    }

    loadApi() {
        _localPromiseApiBuilding('GET_PROJECT', {
            cityId : $('#cityId').val(),
            districtId  : $('#district').val(),
        });
    }
    contructDataPost() {
        _localStoreBuilding.dataPost.photo = [];
        _localStoreBuilding.dataPost.video = [];
        _localStoreBuilding.dataPost.mainPhoto = [];
        _localStoreBuilding.dataPost.mainVideo = [];
        _localStoreBuilding.dataPost.amenitiesList =[];
        _localStoreBuilding.dataPost.listingFees = [];

        _localStoreBuilding.dataPost.cityId = Number.parseInt($('#cityId').val());
        _localStoreBuilding.dataPost.districtId = Number.parseInt($('#district').val());
        _localStoreBuilding.dataPost.latitude = $("#lat").val() ? parseFloat($("#lat").val()) : null;
        _localStoreBuilding.dataPost.longitude = $("#lng").val() ? parseFloat($("#lng").val()) : null;
        _localStoreBuilding.dataPost.address = $.trim($("#address").val()) ? $("#address").val() : null;
        _localStoreBuilding.dataPost.propertyType.propertyTypeID = propertyTypeId;
        _localStoreBuilding.dataPost.listingType.listingTypeID = listingTypeId;
        _localStoreBuilding.dataPost.purpose.purPoseID = purposeId;
        _localStoreBuilding.dataPost.listingTypeName =  listingTypeId ? getNameListingType(listingTypeId).sale.name : null;
        _localStoreBuilding.dataPost.propertyTypeName = propertyTypeName;
        switch (purposeId) {
            case  1 : {
                _localStoreBuilding.dataPost.purposeName = "Để ở";
                break;
            }
            case  2 : {
                _localStoreBuilding.dataPost.purposeName = "Thương mại";
                break;
            }
            case  3 : {
                _localStoreBuilding.dataPost.purposeName = "Bán";
                break;
            }
            default : {
                _localStoreBuilding.dataPost.purposeName = null;
            }
        }
        // building
        _localStoreBuilding.dataPost.building.projectId = $("#project").val() > 0 ? Number.parseInt($("#project").val()) : null;
        _localStoreBuilding.dataPost.building.latitude = $("#lat").val() ? parseFloat($("#lat").val()) : null;
        _localStoreBuilding.dataPost.building.longitude = $("#lng").val() ? parseFloat($("#lng").val()) : null;
        _localStoreBuilding.dataPost.building.address = $.trim($("#address").val()) ? $("#address").val() : null;
        _localStoreBuilding.dataPost.building.isVerified = $('#isVerified').is(":checked") ? true : false ;
        _localStoreBuilding.dataPost.building.buildingManagementName =  $("#name-manager").val() || null;
        _localStoreBuilding.dataPost.building.buildingManagementEmail =  $("#email-manager").val() || null;
        _localStoreBuilding.dataPost.building.phoneNumber =  $("#phone").val() || null;
        _localStoreBuilding.dataPost.building.mobilePhone =  $("#telephone").val() || null;
        _localStoreBuilding.dataPost.building.buildingRate =  $("#rate-building").val() || null;
        _localStoreBuilding.dataPost.building.buildingName =  $("#name-building").val();
        _localStoreBuilding.dataPost.building.buildingDescription = CKEDITOR.instances["description-block"].getData() || null;
        _localStoreBuilding.dataPost.listingLanguages = [];
        /*if(CKEDITOR.instances["description-block-en"].getData() != ""){
            _localStoreBuilding.dataPost.listingLanguages.push({"id":{"language":"en"},
                "description": CKEDITOR.instances["description-block-en"].getData() || ""});
        }*/
        // building. block
        _localStoreBuilding.dataPost.building.blocks = [];
        $("#tab-content .tab-pane").each(function(idx, element){
            _localStoreBuilding.dataPost.building.blocks.push({
                blockId : $(element).find("#blockId").val() || null,
                name: $(element).find("#name-block").val() || null,
                numberFloor: parseInt($(element).find("#floor-block").val()) || null,
                numberBasement:parseInt($(element).find("#basement-block").val()) || null,
                numberElevator:parseInt($(element).find("#elevator-block").val()) || null,
                yearBuilt:parseInt($(element).find("#year-built-block").val()) || null,
                yearFixed:parseInt($(element).find("#year-fix-block").val()) || null,
                isMezzanine:$(element).find("#isMezzanine").is(":checked") ? true : false,
                isRooftop:$(element).find("#isRooftop").is(":checked") ? true : false,
                isPenhouse:$(element).find("#isPenhouse").is(":checked") ? true : false
            });
        });
        if( _localStoreBuilding.dataPost.building.blocks[0].blockId == null && _localStoreBuilding.dataPost.building.blocks[0].name == null) {
            _localStoreBuilding.dataPost.numberFloor =  _localStoreBuilding.dataPost.building.blocks[0].numberFloor;
            _localStoreBuilding.dataPost.numberBasement =  _localStoreBuilding.dataPost.building.blocks[0].numberBasement;
            _localStoreBuilding.dataPost.numberElevator =  _localStoreBuilding.dataPost.building.blocks[0].numberElevator;
            _localStoreBuilding.dataPost.yearBuilt =  _localStoreBuilding.dataPost.building.blocks[0].yearBuilt;
            _localStoreBuilding.dataPost.yearFixed =  _localStoreBuilding.dataPost.building.blocks[0].yearFixed;
            _localStoreBuilding.dataPost.isMezzanine =  _localStoreBuilding.dataPost.building.blocks[0].isMezzanine;
            _localStoreBuilding.dataPost.isRooftop =  _localStoreBuilding.dataPost.building.blocks[0].isRooftop;
            _localStoreBuilding.dataPost.isPenhouse =  _localStoreBuilding.dataPost.building.blocks[0].isPenhouse;
            _localStoreBuilding.dataPost.building.blocks = null;
        }
        // photo
        $(".imageBuilding .file-preview .file-preview-initial").each(function(idx, element){
            const  imgEle = $(element).find("img");
            const link = imgEle.attr("src");

            _localStoreBuilding.dataPost.photo.push({
                link : link,
                caption: $(element).find(".file-footer-caption input ").val()
            });
            _localStoreBuilding.dataPost.mainPhoto.push({
                url_path:link,
                url_thumb:link,
                url_large:link,
                file_id: imgEle.attr("name"),
                file_name: imgEle.data("src"),
                caption: $(element).find(".file-footer-caption input ").val()
            });
        });
        _localStoreBuilding.dataPost.photo = $('#photos-wrapper').getListPhotos();

        _localStoreBuilding.dataPost.photo = _localStoreBuilding.dataPost.photo.length > 0 ? JSON.stringify(_localStoreBuilding.dataPost.photo) : null;
        _localStoreBuilding.dataPost.mainPhoto = _localStoreBuilding.dataPost.photo;


        // video
        /*$(".videoBuilding .file-preview .file-preview-initial").each(function(idx, element){
            const srcEle = $(element).find("video source");
            _localStoreBuilding.dataPost.video.push(srcEle.attr("src"));
            _localStoreBuilding.dataPost.mainVideo.push({
                url_path: upload_url+"videos/",
                url_video: upload_url+"videos/" + srcEle.attr("title"),
                file_id: srcEle.attr("name"),
                file_name: srcEle.attr("title"),
                caption:""
            });
        });*/
        _localStoreBuilding.dataPost.video = JSON.stringify( _localStoreBuilding.dataPost.video);
        _localStoreBuilding.dataPost.mainVideo = JSON.stringify( _localStoreBuilding.dataPost.mainVideo);

        // tiện ích
        $(".utilitie-item-content .utilitie:checked,.utilitie-item-content .amenityc-child:checked").each(function(idx, element){
            let value = null;
            const id = $(this).data('id');
            if ($(this).data('control') == 'input_if_checked') {
                value = $('#utilitie-text-' + id).val();
            }
            _localStoreBuilding.dataPost.amenitiesList.push({
                id:{
                    amenityId: parseInt($(element).val())
                },
                value:value
            });
        });
        // cost
        /*$(".wrapper-charges .row-hh").each(function(idx, element){
            if($(element).find("#feeItem").val() === "0") return;
            if($(element).find("#feeItemInclude").is(":checked")) {
                _localStoreBuilding.dataPost.listingFees.push({
                    "id":{
                        "feesTypeID":parseInt($(element).find("#feeItem").val())
                    },
                    "feesName":$("#feeItem option:selected").text(),
                    "price": 0,
                    "currency": null,
                    "includingPrice": true
                });
            }
            else {
                _localStoreBuilding.dataPost.listingFees.push({
                    "id":{
                        "feesTypeID":parseInt($(element).find("#feeItem").val())
                    },
                    "feesName":$("#feeItem option:selected").text(),
                    "price":parseFloat($(element).find("#charges").val()),
                    "currency":$(element).find("#feeLoc").val(),
                    "includingPrice": false
                });
            }
        });*/

        const type = typeof (pageType) !== "undefined" ? pageType : 'CREATE';
        if(type == 'EDIT') {
            _localStoreBuilding.dataPost.listingId = listingId;
            _localStoreBuilding.dataPost.building.buildingId = buildingId;
        }
    }

    validate() {
        $('.has-error').removeClass('has-error');
       let hasErr = false;
       if(_localStoreBuilding.dataPost.cityId == null) {
           hasErr = true;
           $('#cityId').parents('.form-group').addClass('has-error');
       }
        if(_localStoreBuilding.dataPost.districtId == null) {
            hasErr = true;
            $('#district').parents('.form-group').addClass('has-error');
        }
        if(_localStoreBuilding.dataPost.address == null) {
            hasErr = true;
            $('#address').parents('.form-group').addClass('has-error');
        }
        if(_localStoreBuilding.dataPost.latitude == null) {
            hasErr = true;
            $('#lat').parents('.form-group').addClass('has-error');
        }
        if(_localStoreBuilding.dataPost.longitude == null) {
            hasErr = true;
            $('#lng').parents('.form-group').addClass('has-error');
        }
        if(_localStoreBuilding.dataPost.building.buildingName == null) {
            hasErr = true;
            $('#name-building').parents('.form-group').addClass('has-error');
        }
        if(_localStoreBuilding.dataPost.building.buildingDescription == null) {
            hasErr = true;
            $('#description-block').parents('.form-group').addClass('has-error');
        }
       return hasErr;
    }
    initFeild() {
        $("#year-built-block").mask("0000");
        $("#year-fix-block").mask("0000");
        $("#telephone").mask("00000000000");
        $("#phone").mask("00000000000");
        $('select').select2();
        if(typeof (CKEDITOR) !== "undefined") {
            CKEDITOR.replace('description-block');
            //CKEDITOR.replace('description-block-en');
        }
        $("#photos-wrapper").imagesPosLib({
            urlUpload : baseUploadApiPublic + 'upload',
            source : 'props',
            gallery : 'bulding',
            list: photos,
            usePosEditor : false,
            useImageDefault : false,
            imageOnly : false,

        });
    }
    sendPost() {
        this.contructDataPost();
        const type = typeof (pageType) !== "undefined" ? pageType : 'CREATE';
        const content = {
            url : null,
            success : null,
        };
        let notDo = false;
        let messageNotDo = '';
        switch (type) {
            case 'CREATE': {
                content.url = '/createBuilding';
                content.success = function (data) {
                    if(data.result) {
                        if (confirm("Tạo building thành công! Bạn có muốn chuyển đến trang quản lý toàn nhà?")) {
                            location = "/building";
                        } else {
                            location.reload();
                        }
                    } else {
                        showPropzyAlert(data.message);
                    }
                };
                break;
            }
            case 'EDIT' : {
                content.url = '/editBuilding';
                content.success = function (data) {
                    if(data.result) {
                        if (confirm("Sửa building thành công! Bạn có muốn chuyển đến trang quản lý toàn nhà?")) {
                            location = "/building";
                        } else {
                            location.reload();
                        }
                    } else {
                        showPropzyAlert(data.message);
                    }
                };
                if(listings.length > 0 && _localStoreBuilding.dataPost.building.isVerified == false) {
                    notDo = true;
                    messageNotDo = "Không thể bỏ 'Kiểm duyệt' vì building có listing đang live trên hệ thống. </br>";
                    messageNotDo += listings.map(it => {
                        return `<a href="/pos/sa/detail/${it}" target="_blank">${it}</a>`;
                    }).join(',');
                }
                break;
            }
        }

        //
        //validate
        //
        const valid = this.validate();

        if (valid) {
            showPropzyAlert("Xin vui lòng nhập đầy đủ thông tin cần thiết");
            return false;
        }
        if (notDo) {
            showPropzyAlert(messageNotDo);
            return false;
        }
        showPropzyLoading();
        $.ajax({
            type: 'POST',
            url: content.url,
            data: JSON.stringify(_localStoreBuilding.dataPost),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                hidePropzyLoading();
                content.success(data);
            },
            error: function (data) {
                hidePropzyLoading();
                showPropzyAlert("Đã có lỗi xảy ra! xin vui lòng liên hệ bộ phận IT để được hỗ trợ");
            },
        });
    }

}
$(document).ready(function () {
    showPropzyLoading();
   Window.buiding = new Building();
    $(window).load(function () {
        hidePropzyLoading();
    });
});