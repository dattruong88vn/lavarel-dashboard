/**
 * refactor for project
 * by @barry
 * 08/11/2018
* */

const _localProject = {
    api : {
        'get-amenities' : '/amenities/get-amenities/15',
        'get-around-amenities' : '/amenities/get-around-amenities',
        'add-around-amenities' : '/amenities/add-around-amenities'
    },
    stored : {
        amenitiesList : [],
        aroundAmenitiesList : [],
        amenitiesChilds : new Map(),
        aroundAmenitiesChilds : new Map(),
        amenitiesPost : new Map(),
        aroundAmenitiesPost : new Map(),
        tabIndex : 0,
    },
    data : {
        //name : null,
        developerId : null,
        topShow : false,
        address : null,
        latitude : null,
        longitude : null,
        projectName : null,
        projectDescription : null,
        photo : [],
        photoInHouse : [],
        photoModel : [],
        amenities : [],
        aroundAmenities : [],
        inProgressList : [],
        cityId: null,
        districtId: null,
        wardId:null,
        streetId:null,
        developer:null,
        contractors:null,
        numberOfBlocks:null,
        numberOfUnits:null,
        numberOfFloors:null,
        price:null,
        yearBuilt:null,
        lotSize:null,
        buildingDensity:null,
        minSizeUnit:null,
        maxSizeUnit:null,
        numberOfFloatingFloors:null,
        numberOfBasements:null,
        numberOfElevators:null,
        description:null,
        infrastructure:null,
        groundDesign:null,
        statusId:null,
        investorId:null,
        documents:[]
    }
};
const __indexPromiseApi = async function(name, params = {}) {
    let promise = null;
    switch (name) {
        case 'GET_AMENITIES_LIST' : {
            promise =  axios.post(_localProject.api["get-amenities"])
                .then(xhr => {
                    const response = xhr.data;
                    if(response.result) {
                        _localProject.stored.amenitiesList = response.data[0].list;
                    }
                })
                .catch(err => {
                    showErrLog(err);
                });
            break;
        }
        case 'GET_AROUND_AMENITIES_LIST' : {
            promise = axios.post(_localProject.api["get-around-amenities"])
                .then(xhr => {
                    const response = xhr.data;
                    if(response.result) {
                        _localProject.stored.aroundAmenitiesList = response.data[0].list;
                    }
                })
                .catch(err => {
                    showErrLog(err);
                });
            break;
        }
    }
    return promise;
};
class Project {
    constructor() {
        var documents;
        /// set map
        if(typeof (amenities) != "undefined" && Array.isArray(amenities)) {
            amenities.forEach(it => {
                const childs = {
                    amenityId : it.amenityId,
                    name : it.name,
                    value : it.value
                };
                _localProject.stored.amenitiesPost.set(it.amenityId, childs);
                _localProject.stored.amenitiesChilds.set(it.amenityId, childs);
            });
        }
        if(typeof (aroundAmenities) != "undefined" && Array.isArray(aroundAmenities)) {
            aroundAmenities.forEach(it => {
                let index = 0;
                const childs = it.childs.map(child => {
                    return {
                        index : index++,
                        name : child.name,
                        value : child.value
                    };
                });
                _localProject.stored.aroundAmenitiesChilds.set(it.amenityId, childs);
                _localProject.stored.aroundAmenitiesPost.set(it.amenityId, childs);
            });
        }
        this.events();
        this.loadApi();
        this.tabProcessListRender();
    }



    async loadApi() {
        Promise.all([__indexPromiseApi('GET_AMENITIES_LIST')]).then(()=> {
            this.renderAmenities();
        });
        Promise.all([__indexPromiseApi('GET_AROUND_AMENITIES_LIST')]).then(()=> {
            this.renderAroundAmenities();
        });

    }
    renderAmenities() {
        const html = _localProject.stored.amenitiesList.map(it => {
            const amen = _localProject.stored.amenitiesPost.get(it.id);
            let check = '';
            if (typeof (amen) != "undefined" && amen !== null) {
                check = 'checked';
            }
            let input = '';
            if (check.length > 0 && it.control == 'input_if_checked') {
                const  value = amen.value ? amen.value : '';
                const oninput = it.id === 1058 ? `oninput="this.value=this.value.replace(/[^0-9]/g,'').split('').slice(0,4).join('');"` : '';
                input = `<input class="amenities-input form-control" type="text" ${oninput} data-id="${it.id}" value="${value}">`;
            }
            return `<div class="col-md-3 col-xs-3 col-sm-4"><label class="checkbox"><input type="checkbox" value="${it.id}" class="amenities" name="amenities" ${check} data-control="${it.control}"> 
<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> ${it.name}</label> ${input}</div>`;
        });

        $('#amenities-wrapper').html(html.join(""));

    }
    renderAroundAmenities() {
        const that = this;
        const html = _localProject.stored.aroundAmenitiesList.map(it => {
            //

            const amenitiesIncludes = _localProject.stored.aroundAmenitiesPost.get(it.id);
            let amen = null;
            if (typeof (amenitiesIncludes) != "undefined" && amenitiesIncludes !== null) {
                amen = amenitiesIncludes;
            }
            let rows = '';
            let check = '';
            if (amen ) {
                if (amen.length > 0){
                    rows = amen.map(child => {
                        return that.addChildRoundAmnities({
                            index : child.index,
                            id : it.id,
                            name : child.name,
                            value : child.value
                        });
                    });
                    rows = rows.join("");
                }
                rows += that.addChildRoundAmnities({
                    index : amen.length + 1,
                    id : it.id,
                    name : '',
                    value : '',
                    isAdd : true,
                });
                rows = `<div class="col-md-9 col-xs-9">${rows}</div>`;
                check = 'checked';
            }

            //
            return `<div class="row form-group around-amenities-parent-${it.id}"><div class="col-md-3 col-xs-3"><label class="checkbox"><input type="checkbox" value="${it.id}" class="around-amenities" name="around-amenities" ${check}> 
<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> ${it.name}</label> </div> ${rows}</div> 
</div>`;
        });

        $('#amenities-around-wrapper').html(html.join(""));
        $('.aroud-amenities-child-distance').inputNumber({
            start : 0,
            type : 'price'
        });
    }
    addChildRoundAmnities(data) {
        const nameLabel = 'Tên';
        const distanceLable = 'Khoảng cách (m)';
        let disabled = 'disabled';
        let btnAdd = `<div class="col-md-2 col-xs-2"><i class='fa fa-times btn-fa-circle btn-fa-circle-pink around-amenities-remove-child' data-id="${data.id}"></i></div>`;
        if (typeof (data.isAdd) !== "undefined" && data.isAdd == true) {
            disabled = '';
            btnAdd = `<div class="col-md-2 col-xs-2"><i class='fa fa-plus btn-fa-circle btn-fa-circle-green around-amenities-add-child' data-id="${data.id}"></i></div>`;
        }
        let val = data.value;
        let stringSplit = [];
        var textlength =  val.length;
        //revert string
        val = val.split('').reverse().join('');
        for (let i = 0 ; i < textlength; i +=3 ) {
            stringSplit.push(val.slice(i, (i + 3)));
        }
        val = stringSplit.join(',');
        // revert again
        val = val.split('').reverse().join('');
        return  `<div class="row form-group row-around-amenities-child" data-index="${data.index}"><div class="col-md-5 col-xs-5"><input type="text" class="form-control aroud-amenities-child-name-${data.id}" placeholder="${nameLabel}" value="${data.name}" ${disabled}></div><div class="col-md-5 col-xs-5"><input type="text" class="form-control aroud-amenities-child-distance aroud-amenities-child-distance-${data.id}" placeholder="${distanceLable}" value="${val}" ${disabled} min="0"></div> ${btnAdd}</div>`;
    }

    tabProcessListRender() {
        const that = this;
        var inProgressList = rogressList != 'undefined'  && rogressList.length > 0 ? rogressList : [];
        _localProject.stored.tabIndex = 0;
        if(inProgressList.length > 0) {
            inProgressList.forEach(process => {
                that.tabProcess({
                    isClose : true,
                    name : process.name,
                    startAt : process.startAt,
                    started : process.started,
                    photos : process.photos,

                });

            });
            $('#tab-list a[href="#tab' + _localProject.stored.tabIndex + '"]').trigger('click');
        } else {
            that.tabProcess({});
        }
    }
    tabProcess(params) {
        const that = this;
        let option = {
            isClose: false,
            startAt : null,
            started : false,
            name : '',
            photos : []
        };
        $.extend(option, params);
        _localProject.stored.tabIndex++;
        const context = {
            tab_ID : _localProject.stored.tabIndex,
            noEventDate : _localProject.stored.tabIndex
        };
        const template = $('#progressing-tmpl').html();
        var compiledTemplate = Template7.compile(template);
        var html = compiledTemplate(context);
        $('#tab-list li').eq(-1).before($('<li><a href="#tab' + context.tab_ID + '" role="tab" data-toggle="tab">Giai đoạn ' + context.tab_ID  + '&nbsp&nbsp<button class="close" type="button" title="Remove this page">×</button></a></li>'));
        $('#tab-content').append($('<div class="tab-pane fade" id="tab' + context.tab_ID  + '" data-tab="'+ context.tab_ID +'">'+ html +'</div>'));
        $('#tab-content .tab-pane').removeClass('active').removeClass('in');
        $('#tab-list a[href="#tab' + context.tab_ID + '"]').tab('show');
        that.tabProcessInitFeild();
        if (!option.isClose) {
            // add new tab
            //$('#tab-list a[href="#tab' + context.tab_ID + '"]').tab('show');

           // that.tabProcessInitFeild();
        } else {
            if(option.startAt) {
                $('#tab' + _localProject.stored.tabIndex).find('.eventDate').val(moment(option.startAt / 1000, 'dd-mm-yyyy').format('D-M-Y'));
            }
            $('#tab' + _localProject.stored.tabIndex).find('input[name="process-radio"]').prop('checked', option.started);
            $('#tab' + _localProject.stored.tabIndex).find('input[name="processing-name"]').val(option.name);
        }

        $('#tab' + _localProject.stored.tabIndex).find('.processing-photos-wrapper-' + context.tab_ID ).imagesPosLib({
            urlUpload : baseUploadApiPublic + 'upload',
            source : 'props',
            gallery : 'project',
            list: option.photos,
            usePosEditor : false,
            useImageDefault : false,
            imageOnly : false,
        });

    }
    tabProcessInitFeild() {
        $('.date-picker').datepicker({
            format: 'dd-mm-yyyy',
            clearBtn: true,
            todayHighlight: true
        });
    }

    updateProjectData() {
        const that = this;
        _localProject.data.infrastructure = CKEDITOR.instances["infrastructure"].getData();
        _localProject.data.infrastructure = _localProject.data.infrastructure.replace(/"\/ckfinder\/userfiles/g, `"${location.origin}/ckfinder/userfiles`);        
        _localProject.data.numberOfElevators = $.trim($("input[name='numberOfElevators']").val()) > 0 ? $.trim($("input[name='numberOfElevators']").val()) : null;
        _localProject.data.numberOfBasements = $.trim($("input[name='numberOfBasements']").val()) > 0 ? $.trim($("input[name='numberOfBasements']").val()) : null;
        _localProject.data.maxSizeUnit = $.trim($("input[name='maxSizeUnit']").val()) > 0 ? $.trim($("input[name='maxSizeUnit']").val()) : null;
        _localProject.data.minSizeUnit = $.trim($("input[name='minSizeUnit']").val()) > 0 ? $.trim($("input[name='minSizeUnit']").val()) : null;
        _localProject.data.buildingDensity = $.trim($("input[name='buildingDensity']").val()) ? $.trim($("input[name='buildingDensity']").val()) : null;
        _localProject.data.lotSize = $.trim($("input[name='lotSize']").val()) > 0 ? $.trim($("input[name='lotSize']").val()) : null;
        _localProject.data.yearBuilt = $.trim($("input[name='yearBuilt']").val()) > 0 ? $.trim($("input[name='yearBuilt']").val()) : null;
        _localProject.data.price = $.trim($("input[name='price']").val()) ? $.trim($("input[name='price']").val()) : null;
        _localProject.data.numberOfFloors = $.trim($("input[name='numberOfFloors']").val()) > 0 ? $.trim($("input[name='numberOfFloors']").val()) : null;
        _localProject.data.numberOfUnits = $.trim($("input[name='numberOfUnits']").val()) > 0 ? $.trim($("input[name='numberOfUnits']").val()) : null;
        _localProject.data.numberOfFloatingFloors = $.trim($("input[name='numberOfFloatingFloors']").val()) > 0 ? $.trim($("input[name='numberOfFloatingFloors']").val()) : null;
        _localProject.data.numberOfBlocks = $.trim($("input[name='numberOfBlocks']").val()) > 0 ? $.trim($("input[name='numberOfBlocks']").val()) : null;
        _localProject.data.projectName = $.trim($("input[name='projectName']").val()) ? $.trim($("input[name='projectName']").val()) : null;
        _localProject.data.topShow = $("input[name='topShow']").is(":checked") ? true : false; // new
        _localProject.data.developerId = $.trim($("#developer").val()) ? $.trim($("#developer").val()) : null;
        _localProject.data.address = $.trim($("#address").val()) ? $.trim($("#address").val()) : null;
        _localProject.data.latitude = $.trim($("#lat").val()) ? $.trim($("#lat").val()) : null;
        _localProject.data.longitude = $.trim($("#long").val()) ? $.trim($("#long").val()) : null;
        _localProject.data.cityId = $.trim($("#cityId").val()) ? $.trim($("#cityId").val()) : null;
        _localProject.data.districtId = $.trim($("select[name='districtId']").val()) > 0 ? $.trim($("select[name='districtId']").val()) : null;
        _localProject.data.wardId = $.trim($("select[name='wardId']").val()) > 0 ? $.trim($("select[name='wardId']").val()) : null; // new
        _localProject.data.streetId = $.trim($("select[name='streetId']").val()) > 0 ? $.trim($("select[name='streetId']").val()) : null; // new
        _localProject.data.developer = $.trim($("input[name='developer']").val()) ? $.trim($("input[name='developer']").val()) : null; // new contractors
        _localProject.data.contractors = $.trim($("input[name='contractors']").val()) ? $.trim($("input[name='contractors']").val()) : null;
        _localProject.data.statusId = $.trim($("select[name='statusId']").val()) > 0 ? $.trim($("select[name='statusId']").val()) : null; // new
        _localProject.data.investorId = $.trim($("select[name='investorId']").val()) > 0 ? $.trim($("select[name='investorId']").val()) : null; // new
        _localProject.data.amenitiesList = [];
        _localProject.data.inProgressList = [];
        _localProject.data.photo = [];
        _localProject.data.photoInHouse = [];
        // _localProject.data.photo = $('#photos-wrapper').getListPhotos();
        _localProject.data.photo = $('#building-photos-wrapper').getListPhotos();
        _localProject.data.photoInHouse = $('#inside-home-photos-wrapper').getListPhotos();
        _localProject.data.photoModel = $('#template-room-photos-wrapper').getListPhotos();
        _localProject.data.documents = that.documents.getList();
        // _localProject.data.documents = _localProject.data.documents.length > 0 ? JSON.stringify(_localProject.data.documents) : null;
        _localProject.data.photo = _localProject.data.photo.length > 0 ? JSON.stringify(_localProject.data.photo) : null;
        _localProject.data.photoInHouse = _localProject.data.photoInHouse.length > 0 ? JSON.stringify(_localProject.data.photoInHouse) : null;
        _localProject.data.photoModel = _localProject.data.photoModel.length > 0 ? JSON.stringify(_localProject.data.photoModel) : null;
        // process list
        $("#tab-content .tab-pane").each(function(idx, element){
            const tabId = $(element).data('tab');
            let objectProgressPhoto = $('.processing-photos-wrapper-' + tabId).getListPhotos();
            objectProgressPhoto = objectProgressPhoto.length > 0 ? JSON.stringify(objectProgressPhoto) : null;
            _localProject.data.inProgressList.push({
                name: $(element).find("input[name='processing-name']").val() || null,
                photo: objectProgressPhoto,
                startAt: $(element).find('.eventDate').val() != "" ? moment($(element).find('.eventDate').val(), "dd-mm-yyyy").unix() * 1000 : null,
                started: $(element).find('input[name="process-radio"]').is(":checked")
            });
        });
        _localProject.data.projectDescription = CKEDITOR.instances["description"].getData();
        _localProject.data.projectDescription = _localProject.data.projectDescription.replace(/"\/ckfinder\/userfiles/g, `"${location.origin}/ckfinder/userfiles`);
        _localProject.data.groundDesign = CKEDITOR.instances["groundDesign"].getData();
        _localProject.data.groundDesign = _localProject.data.groundDesign.replace(/"\/ckfinder\/userfiles/g, `"${location.origin}/ckfinder/userfiles`);
        //amenities
        _localProject.stored.amenitiesPost.forEach((value, key) => {
            _localProject.data.amenities.push({
                amenityId : key,
                value : value.value ? value.value : null
            });
        });
        // around aroundAmenities
        _localProject.stored.aroundAmenitiesPost.forEach((value, key) => {
            _localProject.data.aroundAmenities.push({
                amenityId : key,
                childs : Array.isArray(value) ? value : []
            });
        });
    }
    valid() {
        const that = this;
        that.updateProjectData();

        // console.log(_localProject.data);return false;

        $('.has-error').removeClass('has-error');
        let hasErr = false;
        let ids = [];
        if(_localProject.data.cityId == null) {
            hasErr = true;
            ids.push('cityId');
        }
        if(_localProject.data.districtId == null) {
            hasErr = true;
            ids.push('districtId');
        }
        if(_localProject.data.wardId == null) {
            hasErr = true;
            ids.push('wardId');
        }
        if(_localProject.data.address == null) {
            hasErr = true;
            ids.push('address');
        }
        if(_localProject.data.latitude == null) {
            hasErr = true;
            ids.push('lat');
        }
        if(_localProject.data.longitude == null) {
            hasErr = true;
            ids.push('long');
        }
        if(_localProject.data.projectName == null) {
            hasErr = true;
            ids.push('projectName');
        }
        if(_localProject.data.statusId == null) {
            hasErr = true;
            ids.push('statusId');
        }
        if(_localProject.data.numberOfBlocks == null) {
            hasErr = true;
            ids.push('numberOfBlocks');
        }
        if(_localProject.data.numberOfUnits == null) {
            hasErr = true;
            ids.push('numberOfUnits');
        }
        if(_localProject.data.numberOfFloors == null) {
            hasErr = true;
            ids.push('numberOfFloors');
        }
        // if(_localProject.data.yearBuilt == null) {
        //     hasErr = true;
        //     ids.push('yearBuilt');
        // }
        // if(_localProject.data.lotSize == null) {
        //     hasErr = true;
        //     ids.push('lotSize');
        // }
        // if(_localProject.data.buildingDensity == null) {
        //     hasErr = true;
        //     ids.push('buildingDensity');
        // }
        // if(_localProject.data.minSizeUnit == null) {
        //     hasErr = true;
        //     ids.push('minSizeUnit');
        // }
        // if(_localProject.data.maxSizeUnit == null) {
        //     hasErr = true;
        //     ids.push('maxSizeUnit');
        // }
        /*if(_localProject.data.developerId == null) {
            hasErr = true;
            ids.push('developer');
        }
        if(_localProject.data.projectDescription == null) {
            hasErr = true;
            ids.push('description');
        }
        if(_localProject.data.photo == null) {
            hasErr = true;
            ids.push('file-image-create');
        }*/
        if(_localProject.data.amenities.length === 0) {
            hasErr = true;
            ids.push('amenities-wrapper');
        }
        ids.forEach(it => {
            $('label[for="'+ it +'"]').parents('.form-group').addClass('has-error');
        });
        return hasErr;
    }
    updateProject() {
        let url = "";
        let message = "";
        const dataPosst = _localProject.data;
        switch (page_type) {
            case "CREATE" : {
                url = "/createProject";
                message = "Tạo";
                break;
            }
            case "EDIT" : {
                url = "/editProject";
                message = "Cập nhật";
                dataPosst.pId = $.trim($('#pId').val());
                break;
            }
            default :{
                break;
            }
        }
        if (url) {
            showPropzyLoading();
            // console.log(_localProject.data);return false;
            axios.post(url, dataPosst)
                .then(xhr => {
                    hidePropzyLoading();
                    const response = xhr.data;
                    if (response.result) {
                        posNotifyAlert({type: "pos-notify-success", message :message + " dự án thành công. Trang sẽ tự động reload sau 3s"});
                        setTimeout(function () {
                            location.reload();
                        }, 3000);
                    } else {
                        posNotifyAlert({type: "pos-notify-danger", message :message + " dự án không thành công. xin vui lòng thử lại"});
                    }

                })
                .catch(err => {
                    hidePropzyLoading();
                    showErrLog(err);
                });
        }

    }
    addNewAroundAmenities(name) {
        const that = this;
        showPropzyLoading();

        axios.post(_localProject.api["add-around-amenities"], {
            name : name
        })
            .then(xhr => {
                hidePropzyLoading();
                const response = xhr.data;
                if (response.result) {
                    $('#txt-add-around-amenities').val('');
                    posNotifyAlert({type: "pos-notify-success", message : "Thêm tiện ích thành công"});
                        _localProject.stored.aroundAmenitiesList.push({
                            id : response.data.amenityId,
                            name : response.data.name,
                            childs : [],
                            control : response.data.control
                        });
                        that.renderAroundAmenities();
                } else {
                    posNotifyAlert({type: "pos-notify-danger", message :message + ". xin vui lòng thử lại"});
                }
            })
            .catch(err => {
                hidePropzyLoading();
                showErrLog(err);
            });
    }
    events() {
        const that = this;

        CKEDITOR.replace('description');
        CKEDITOR.replace('infrastructure');
        CKEDITOR.replace('groundDesign');
        $("#address").geocomplete()
            .bind("geocode:result", function(event, result){
                console.log(result);
                $('#lat').val(result.geometry.location.lat());
                $('#long').val(result.geometry.location.lng());
            });

        that.documents = new PropzyFileUploadLib({
            list: documents,
            limit:5,
            type:'document',
            url: baseUploadApiPublic + 'upload',
            source: 'props',
            wrapper: '#appraisal-photo',
            format:true
        });
        
        // tòa nhà
        $('#building-photos-wrapper').imagesPosLib({
            urlUpload : baseUploadApiPublic + 'upload',
            source : 'props',
            gallery : 'project',
            typeUpload : 'project',
            list: photosProject,
            usePosEditor : false,
            useImageDefault : false,
            imageOnly : false,

        });
        // trong nhà
        $('#inside-home-photos-wrapper').imagesPosLib({
            urlUpload : baseUploadApiPublic + 'upload',
            source : 'props',
            gallery : 'project',
            typeUpload : 'project',
            list: photosProject2,
            usePosEditor : false,
            useImageDefault : false,
            imageOnly : false,

        });
        // phòng mẫu
        $('#template-room-photos-wrapper').imagesPosLib({
            urlUpload : baseUploadApiPublic + 'upload',
            source : 'props',
            gallery : 'project',
            typeUpload : 'project',
            list: photosProject3,
            usePosEditor : false,
            useImageDefault : false,
            imageOnly : false,

        });
        $('select').select2();
        that.tabProcessInitFeild();

        /**
         * add one tab
         */
        $(document).on('click', "#btn-add-tab", function (e) {
           e.preventDefault();
           that.tabProcess();
        });
        /**
         * remove a tab
         */
        $(document).on('click', "#tab-list button.close", function (e) {
            e.preventDefault();
            const tabID = $(this).parents('a').attr('href');
            $(this).parents('li').remove();
            $(tabID).remove();

            //display first tab
            const tabFirst = $('#tab-list a:first');
            tabFirst.tab('show');
        });
        $(document).on('change', "input[name='process-radio']", function () {
            $("input[name='process-radio']").prop('checked', false);
            $(this).prop('checked', true);
        });
        $(document).on('click', "#finish-reviewing", function (e) {
            e.preventDefault();
            // that.updateProjectData(); // nhớ gỡ ra vì valid có store data r
            // console.log(_localProject.data);
            const valid = that.valid();
            if (valid) {
                showPropzyAlert('Xin vui lòng nhập đầy đủ thông tin');
                return false;
            }
            that.updateProject();
        });


        $(document).on('click', '#amenities-wrapper .amenities', function (e) {
            e.preventDefault();
            const id = Number.parseInt($(this).val());

            if ($(this).is(':checked')) {
                // add
                let childs = _localProject.stored.amenitiesChilds.get(id);
                if (typeof (childs) == "undefined" || childs == null) {
                    childs = {
                        amenityId : id,
                        name : '',
                        value : ''
                    };
                }
                _localProject.stored.amenitiesChilds.set(id, childs);
                _localProject.stored.amenitiesPost.set(id, childs);
            } else {
                // remove
                _localProject.stored.amenitiesPost.delete(id);
            }
            that.renderAmenities();
        });
        $(document).on('change', '#amenities-wrapper .amenities-input', function (e) {
            e.preventDefault();
            const id = Number.parseInt($(this).data('id'));
            const val = $.trim($(this).val());
            let childs = _localProject.stored.amenitiesChilds.get(id);
            if (typeof (childs) == "undefined" || childs == null) {
                childs = {
                    amenityId : id,
                    name : '',
                    value : ''
                };
            }
            childs.value = val;
            _localProject.stored.amenitiesChilds.set(id, childs);
            _localProject.stored.amenitiesPost.set(id, childs);
        });
        $(document).on('click', '#amenities-around-wrapper .around-amenities', function (e) {
            e.preventDefault();
            const id = Number.parseInt($(this).val());

            if ($(this).is(':checked')) {
                // add
                let childs = _localProject.stored.aroundAmenitiesChilds.get(id);
                if (typeof (childs) == "undefined" || childs == null) {
                    childs = [];
                }
                _localProject.stored.aroundAmenitiesChilds.set(id, childs);
                _localProject.stored.aroundAmenitiesPost.set(id, childs);
            } else {
                // remove
                _localProject.stored.aroundAmenitiesPost.delete(id);
            }
            that.renderAroundAmenities();
        });
        $(document).on('click', '#amenities-around-wrapper .around-amenities-add-child', function (e) {
            e.preventDefault();
            const id = Number.parseInt($(this).data('id'));
            let childs = _localProject.stored.aroundAmenitiesChilds.get(id);
            if (typeof (childs) == "undefined" || childs == null) {
                childs = [];
            }
            // validate
            const name = $.trim($(this).parents('.row-around-amenities-child').find('.aroud-amenities-child-name-' + id ).val());
            const value = $.trim($(this).parents('.row-around-amenities-child').find('.aroud-amenities-child-distance-' + id ).val());
            //
            if(name.length == 0 || value.length == 0) {
                posNotifyAlert({type: "pos-notify-danger", message : 'Xin vui lòng nhập đầy đủ Tên và Khoảng cách cho Tiện ích xung quanh'});
                return false;
            }
            childs.push({
                index : $(this).parents('.row-around-amenities-child').data('index'),
                name : name,
                value : value.split(',').join('')
            });
            _localProject.stored.aroundAmenitiesChilds.set(id, childs);
            _localProject.stored.aroundAmenitiesPost.set(id, childs);
            that.renderAroundAmenities();
        });
        $(document).on('click', '#amenities-around-wrapper .around-amenities-remove-child', function (e) {
            e.preventDefault();
            const id = Number.parseInt($(this).data('id'));
            const indexRow = $(this).parents('.row-around-amenities-child').data('index');
            let childs = _localProject.stored.aroundAmenitiesChilds.get(id);
            if (typeof (childs) == "undefined" || childs == null) {
                childs = [];
            }
            let index = 0;
            childs = childs.map(it => {
                if (it.index != indexRow) {
                    return {
                        index : index ++ ,
                        name : it.name,
                        value : it.value,
                    };
                }
            });
            childs = childs.filter(function (el) {
                return typeof (el) != "undefined" &&  el != null;
            });
            _localProject.stored.aroundAmenitiesChilds.set(id, childs);
            _localProject.stored.aroundAmenitiesPost.set(id, childs);
            that.renderAroundAmenities();
        });
        $(document).on('click', '#btn-add-around-amenities', function (e) {
            e.preventDefault();
            const name = $.trim($('#txt-add-around-amenities').val());
            if(name.length > 0) {
                that.addNewAroundAmenities(name);
            } else {
                posNotifyAlert({type: "pos-notify-danger", message : 'Xin vui lòng nhập tên tiện ích'});
            }

        });

        $("select[name='districtId']").on("change",function(){ // get ward
            $.ajax({
                url: `/common/get-wards/${$(this).val()}`,
                type: "GET"
            }).done(function(response) {
                let wards = response.data;
                let wardRender = wards.map((ward,index)=>{
                    return `<option value="${ward.wardId}">${ward.wardName}</option>`
                })
                $("#wardId").html(wardRender);
                if(wardId != null){
                    $("#wardId").val(wardId);
                }
                $("#wardId").trigger("change");
            });
        })

        $("#wardId").on("change",function(){ // get ward
            $.ajax({
                url: `/zone/get-streets/${$(this).val()}`,
                type: "GET"
            }).done(function(response) {
                let streets = response.data;
                let streetRender = streets.map((street,index)=>{
                    return `<option value="${street.streetId}">${street.streetName}</option>`
                })
                $("#streetId").html(streetRender);
                if(streetId != null){
                    $("#streetId").val(streetId);
                }
                $("#streetId").trigger("change");
            });
        })

        // init render select ward & street
        if($("select[name='districtId']").val() > 0){
            $("select[name='districtId']").trigger("change");
        }
    }
}

$(document).ready(function () {
    // $('#price').mask("#,##0", {reverse: true});
    Window.project = new Project();
});