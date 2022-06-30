const crawlerVariable = {
    stored : {
        rowCreateListing : null,
        rowCancelListing : null,
        rowCheckDuplicate : null,
        tableCrawler : {
            mapper : null,
            owner : null,
            agent : null
        },
        districtId : null,
        wardId : null,
        streetId : null,
        houseNumber : null,
        userId : null,
        listingTypeId : null,
        dataSend : null,
        isDuplicate : null,
        type : 1, // 1 Mapper, 2 Owner, 3 Agent
        missInfo : {
            defaultWard : null,
        }

    }
}
const localPromiseApi = async function (name) {
    switch (name) {
        case 'GET_LISTING_TYPES' : {
            await POS_PROMISISE_API("GET_LISTING_TYPES", {});
            if (POS_STORED_LOCAL_API.LISTING_TYPES_LIST) {
                $("#listingTypeId").html("").select2();
                let data = [{id: "", text: "--Chọn loại giao dịch--"}];
                data = data.concat(POS_STORED_LOCAL_API.LISTING_TYPES_LIST);
                $("#listingTypeId").select2({
                    data: data,
                });
            }
            break;
        }
        case 'GET_PROPERTY_TYPES' : {
            await POS_PROMISISE_API("GET_PROPERTY_TYPES", {listingTypeId: crawlerVariable.stored.listingTypeId});
            if (POS_STORED_LOCAL_API.PROPERTY_TYPES_LIST) {
                $("#propertyTypeId").html("").select2();
                let data = [{id: "", text: "--Chọn loại BĐS--"}];
                data = data.concat(POS_STORED_LOCAL_API.PROPERTY_TYPES_LIST);
                $("#propertyTypeId").select2({
                    data: data,
                });
            }
            break;
        }
        case 'GET_DISTRICTS_BY_USER' : {
            if(!currentUser.departments[0].isGroupAdmin) {
                crawlerVariable.stored.userId = currentUser.userId;
            }
            await POS_PROMISISE_API("GET_DISTRICTS_BY_USER", {userId: crawlerVariable.stored.userId});
            if (POS_STORED_LOCAL_API.DISTRICT_LIST_BY_USER) {
                $("#districtId").html("").select2();
                let data = [{id: "", text: "--Chọn Quận--"}];
                data = data.concat(POS_STORED_LOCAL_API.DISTRICT_LIST_BY_USER);
                $("#districtId").select2({
                    data: data,
                });
            }
            break;
        }
        case 'GET_WARDS' : {
            await POS_PROMISISE_API("GET_WARDS", {districtId: crawlerVariable.stored.districtId});
            if (POS_STORED_LOCAL_API.WARD_LIST) {
                $("select[name='ward-id']").html("").select2();
                let data = [{id: "", text: "--Chọn phường--"}];
                data = data.concat(POS_STORED_LOCAL_API.WARD_LIST);
                $("select[name='ward-id']").select2({
                    data: data,
                });
                // reset
                $("input[name='house-number']").val('').trigger('change');
                if(crawlerVariable.stored.missInfo.defaultWard) {
                    $("select[name='ward-id']").val(crawlerVariable.stored.missInfo.defaultWard).select2();
                    crawlerVariable.stored.missInfo.defaultWard = null;
                    $("select[name='ward-id']").trigger('change');
                }
            }
            break;
        }
        case 'GET_WARDS_FILTER' : {
            await POS_PROMISISE_API("GET_WARDS", {districtId: crawlerVariable.stored.districtId});
            if (POS_STORED_LOCAL_API.WARD_LIST) {
                $("#wardId").html("").select2();
                let data = [{id: "", text: "--Chọn phường--"}, {id: '-1', text: "--N/A--"}];
                data = data.concat(POS_STORED_LOCAL_API.WARD_LIST);
                $("#wardId").select2({
                    data: data,
                });
            }
            break;
        }
        case 'GET_STREETS' : {
            await POS_PROMISISE_API("GET_STREETS", {wardId: crawlerVariable.stored.wardId});
            if (POS_STORED_LOCAL_API.STREET_LIST) {
                $("select[name='stress-id']").html('').select2();
                let data = [{id: "", text: "--Chọn Đường--"}];
                data = data.concat(POS_STORED_LOCAL_API.STREET_LIST);
                $("select[name='stress-id']").select2({
                    data: data,
                });
            }
            break;
        }
        case 'GET_STREETS_FILTER' : {
            await POS_PROMISISE_API("GET_STREETS", {wardId: crawlerVariable.stored.wardId});
            if (POS_STORED_LOCAL_API.STREET_LIST) {
                $("#streetId").html("").select2();
                let data = [{id: "", text: "--Chọn đường--"},  {id: '-1', text: "--N/A--"}];
                data = data.concat(POS_STORED_LOCAL_API.STREET_LIST);
                $("#streetId").select2({
                    data: data,
                });
            }
            break;
        }
        case 'GET_DEPARTMENT_USER_LIST' : {
            await POS_PROMISISE_API("GET_DEPARTMENT_USER_LIST", {});
            if (POS_STORED_LOCAL_API.DEPARTMENT_USER_LIST) {
                $("#assigned").html('').select2();
                let data = [{id: "", text: "--Chọn người phụ trách--"}];
                let filter = POS_STORED_LOCAL_API.DEPARTMENT_USER_LIST.filter((it) => it.departmentId === 16);
                data = data.concat(filter);
                $("#assigned").select2({
                    data: data,
                });
            }
            break;
        }
        case 'GET_IS_DUPLICATE' : {
            let data = [{id: "", text: "--Chọn danh sách trùng--"}, {id: 1, text: "Không trùng"}, {id: 2, text: "Có trùng"}];
            $("#duplicate").select2({
                data: data,
            });
            break;
        }
    }
};
function IndexPage() {
    var _this = this;
    var isLoading = false;
    // Var dataTable to jon response
    var dataTable =[];
    var itemCurent = null;
    var itemId = 0;

    var data_send = {
        siteId: null,
        createdDate: null,
        price: null,
        initialbudget : 0,
        finalbudget : 0,
        districtId: null,
        listingTypeId: null,
        propertyTypeId: null,
        wardId: null,
        statusId: 1,
        phone: null,
        email: null,
        address: null,
        link: null,
        isDuplicate : null,
    };


    function initVAR() {
        _this.listingStatusId = '#listing-status';
        _this.wardList = '#wardId';

        _this.dateFrom = '#date-from';
        _this.dateTo = '#date-to';
        _this.dateFromVal = null;
        _this.dateToVal = null;
        _this.listingTypeId = "#listingTypeId";
        _this.propertyTypeId = "#propertyTypeId";
    }

    async function loadApi () {
        if(document.getElementById("assigned")) {
             localPromiseApi("GET_DEPARTMENT_USER_LIST");

        }
         localPromiseApi("GET_LISTING_TYPES");
         localPromiseApi("GET_PROPERTY_TYPES");
         localPromiseApi("GET_DISTRICTS_BY_USER");
         localPromiseApi("GET_WARDS_FILTER");
        localPromiseApi("GET_STREETS_FILTER");
        localPromiseApi("GET_IS_DUPLICATE");
    }

    _this.init = function() {
        initVAR();
        initSetDate();
        loadApi();
        bindEvents();
        /* _this.propertyTypeId.select2();*/
        _this.inputAllowNumber(['#price-from',"#price-to"],true);
        setTimeout(() => {
            updateFilter();
            loadData();
        }, 2000);
    };
    _this.inputAllowNumber = function(input, allowSeparator){
        allowSeparator = (typeof allowSeparator !== 'undefined' ? allowSeparator : true);
        if($.isArray(input)) {
            $.each(input,function(index,element) {
                $(element).on('input', function () {
                    var text = $(this).val().match(/[\d]/g);
                    if(allowSeparator)
                        var text = $(this).val().match(/[\d\.]/g);
                    text = !!text ? text.join("") : "";
                    $(this).val(text);
                });
            });
        }else{
            $(input).on('input', function () {
                var text = $(this).val().match(/[\d]/g);
                if(allowSeparator)
                    var text = $(this).val().match(/[\d\.]/g);
                text = !!text ? text.join("") : "";
                $(this).val(text);
            });
        }
    };


    _this.callPhone = function (phone) {
        //phone = '01675610595';
        //console.log(phone);
        Listing.makeCall(phone, function (callInfo) {return false; });
    };


    _this.reloadTable = function () {
        selectTable().ajax.reload();
    };
    function updateFilter() {
        data_send.siteId = hasValue($("select[name='siteId']").val()) ? $("select[name='siteId']").val() : null;
        data_send.startdate = $.trim($("#date-from").val()) ? moment($("#date-from").val(), 'DD/MM/YYYY').startOf('day').unix() * 1000: null;
        data_send.enddate = $.trim($("#date-to").val()) ? moment($("#date-to").val(), 'DD/MM/YYYY').endOf('day').unix() * 1000: null;

        data_send.initialbudget =  $("#price-from").val().trim().length!=0 ? parseFloat($("#price-from").val().trim()) * 1000000000 : 0;
        data_send.finalbudget = $("#price-to").val().trim().length!=0 ? parseFloat($("#price-to").val().trim()) * 1000000000 : 0;

        data_send.districtId = POS_STORED_LOCAL_API.DISTRICT_LIST_BY_USER && POS_STORED_LOCAL_API.DISTRICT_LIST_BY_USER.length > 0 ? POS_STORED_LOCAL_API.DISTRICT_LIST_BY_USER.map(it => it.id) : [];
        if (hasValue($("#districtId").val()) ) {
            data_send.districtId = [parseInt($("#districtId").val())];
        }

        data_send.wardId = hasValue($("#wardId").val())? parseInt($("#wardId").val()) : null;
        data_send.streetId = hasValue($("#streetId").val())? parseInt($("#streetId").val()) : null;
        data_send.statusId = hasValue($("#status").val())? parseInt($("#status").val()) : null;
        data_send.listingTypeId = hasValue($("#listingTypeId").val())? parseInt($("#listingTypeId").val()) : null;
        data_send.propertyTypeId = hasValue($("#propertyTypeId").val()) ? parseInt($("#propertyTypeId").val()) : null;
        data_send.phone = hasValue($("input[name='phone']").val().trim()) ? $("input[name='phone']").val().trim() : null;
        data_send.email = hasValue($("input[name='email']").val().trim())? $("input[name='email']").val().trim() : null;
        data_send.address = hasValue($("input[name='address']").val().trim()) ? $("input[name='address']").val().trim() : null;
        data_send.isDuplicate = hasValue($("#duplicate").val())? parseInt($("#duplicate").val()) : null;
        data_send.type = crawlerVariable.stored.type;
        console.log(data_send);
    }

    function clearFilter() {
        $("input").val('');
        $("select").val("").change();
        $("#status").val("1").select2();
        data_send.siteId = null;
        data_send.createdDate = null;
        data_send.price = null;
        data_send.districtId = null;
        data_send.wardId = null;
        data_send.streetId = null;
        data_send.statusId =  1;
        data_send.listingTypeId = null;
        data_send.propertyTypeId = null;
        data_send.phone = null;
        data_send.email = null;
        data_send.address = null;
        data_send.isDuplicate = null;
        data_send.initialbudget = 0;
        data_send.finalbudget = 0;
        data_send.startdate = null;
        data_send.enddate = null;
    }

    function loadData() {
       // loadCrawledListingList();
        initTables();
    }

    function initSetDate() {
        $(_this.dateFrom).datepicker({format: "dd/mm/yyyy", autoclose: true});
        $(_this.dateTo).datepicker({format: "dd/mm/yyyy", autoclose: true});
    }


    function bindEvents() {
        $("#status").select2();
        $("#siteId").select2();
        bindEventClick();
        bindEventChange();
    }

    function bindEventClick(){
        $(document).on('change', '#date-from', function (e) {
            console.log($(this).val());
            const date =  $(this).val();
            if (moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY') === date) {
                const date_to = $.trim($('#date-to').val());
                const momentTimeFrom = moment(date, 'DD/MM/YYYY').startOf('day').unix() * 1000;
                const momentTimeTo = date_to ? moment($("#date-to").val(), 'DD/MM/YYYY').endOf('day').unix() * 1000 : null;
                if (momentTimeTo && momentTimeFrom > momentTimeTo) {
                    posNotifyAlert({type: "pos-notify-danger", message : 'Thời gian không hợp lệ. Vui lòng chọn lại!'});
                }
            } else {
                $(this).val('');
            }

        });
        $(document).on('change', '#date-to', function (e) {
            console.log($(this).val());
            const date =  $(this).val();
            if (moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY') === date) {
                const date_from = $.trim($('#date-to').val());
                const momentTimeFrom = date_from ? moment($("#date-from").val(), 'DD/MM/YYYY').startOf('day').unix() * 1000 : null;
                const momentTimeTo =  moment(date, 'DD/MM/YYYY').endOf('day').unix() * 1000;
                if (momentTimeFrom && momentTimeFrom > momentTimeTo) {
                    posNotifyAlert({type: "pos-notify-danger", message : 'Thời gian không hợp lệ. Vui lòng chọn lại!'});
                }
            } else {
                $(this).val('');
            }

        });
        document.querySelector("#search").addEventListener('click',function() {
            reloadTables();
        });
        document.querySelector("#clearSearching").addEventListener('click',function(){
            clearFilter();
            reloadTables();
        });
        $(document).on('click', '.crawler-tool-tab .nav-tabs li', function (e) {
           console.log();
           crawlerVariable.stored.type = Number.parseInt($(this).data('type'));
           reloadTables();
        });
        $(document).on('click','.btn-transfer',function(e) {
            e.preventDefault();
            const tr = $(this).closest('tr');
            const row = selectTable().row( tr ).data();

            let validate = {
                hasErr : false,
                messages : 'Thông tin cào không đủ điều kiện do bị mất các thông tin sau : '
            };
            if (!row.cityId) {
                validate.hasErr = true;
                validate.messages += '<br> - Thành phố';
            }
            if (!row.cityId) {
                validate.hasErr = true;
                validate.messages += '<br> - Quận';
            }
            if (!row.listingTypeId) {
                validate.hasErr = true;
                validate.messages += '<br> - Phân loại giao dịch';
            }
            if (!row.listingTypeId) {
                validate.hasErr = true;
                validate.messages += '<br> - Phân loại BĐS';
            }
            if (validate.hasErr) {
                posNotifyAlert({type: "pos-notify-danger", message : validate.messages});
                return false;
            }
            // check
            crawlerVariable.stored.rowCreateListing = row;
            if (!row.wardId || !row.streetId || !row.houseNumber) {
                $("#modal-input-more-info").modal('show');
                crawlerVariable.stored.districtId = row.districtId;
                if(crawlerVariable.stored.rowCreateListing.wardId) {
                    crawlerVariable.stored.missInfo.defaultWard = crawlerVariable.stored.rowCreateListing.wardId;
                }
                localPromiseApi("GET_WARDS");
            } else {
               createPreListing();
            }
        });
        $('#modal-input-more-info').on('click', '#btn-more-info', function (e) {
           e.preventDefault();
           if(crawlerVariable.stored.rowCreateListing) {
               if (!crawlerVariable.stored.wardId) {
                   posNotifyAlert({type: "pos-notify-danger", message : "Xin vui lòng nhập phường"});
                   return false;
               } else if (!crawlerVariable.stored.streetId) {
                   posNotifyAlert({type: "pos-notify-danger", message : "Xin vui lòng nhập đường"});
                   return false;
               } else if (!crawlerVariable.stored.houseNumber) {
                   posNotifyAlert({type: "pos-notify-danger", message : "Xin vui lòng nhập số nhà"});
                   return false;
               }
               // fill data
               crawlerVariable.stored.rowCreateListing.wardId = crawlerVariable.stored.wardId;
               crawlerVariable.stored.rowCreateListing.streetId = crawlerVariable.stored.streetId;
               crawlerVariable.stored.rowCreateListing.houseNumber = crawlerVariable.stored.houseNumber;
               createPreListing();
           }
            $("#modal-input-more-info").modal('hide');
           return false;
        });
        $(document).on('click','.check-duplicate',function(e){
            e.preventDefault();
            const tr = $(this).closest('tr');
            const row = selectTable().row( tr ).data();
            crawlerVariable.stored.rowCheckDuplicate = row;
            $('#modal-duplication').modal('show');
            $('#modal-duplication .nav.nav-pills li a:first').tab('show');
            checkDuplicateListing();
        });

        $(document).on("change", "#listingTypeId", function (e) {
            e.preventDefault();
            crawlerVariable.stored.listingTypeId = $.trim($(this).val()) ? $.trim($(this).val()) : null;
            localPromiseApi("GET_PROPERTY_TYPES");
        });
        $(document).on("change", "#assigned", function (e) {
            e.preventDefault();
            crawlerVariable.stored.userId = $.trim($(this).val()) ? $.trim($(this).val()) : null;
            localPromiseApi("GET_DISTRICTS_BY_USER");
        });
        $(document).on("change", "#districtId", function (e) {
            e.preventDefault();
            crawlerVariable.stored.districtId = $.trim($(this).val()) ? $.trim($(this).val()) : null;
            localPromiseApi("GET_WARDS_FILTER");
        });
        $(document).on("change", "#wardId", function (e) {
            e.preventDefault();
            crawlerVariable.stored.wardId = $.trim($(this).val()) ? $.trim($(this).val()) : null;
            localPromiseApi("GET_STREETS_FILTER");
        });
        $(document).on("change", "select[name='ward-id']", function (e) {
            e.preventDefault();
            crawlerVariable.stored.wardId = $(this).val() ? Number.parseInt($(this).val()) : null;
            localPromiseApi("GET_STREETS");
        });
        $(document).on("change", "select[name='stress-id']", function (e) {
            e.preventDefault();
            crawlerVariable.stored.streetId = $(this).val() ? Number.parseInt($(this).val()) : null;
        });
        $(document).on("change", "input[name='house-number']", function (e) {
            e.preventDefault();
            crawlerVariable.stored.houseNumber = $.trim($(this).val()) ? $.trim($(this).val()) : null;
        });
        $(document).on("click", ".btn-cancel-crawler", function (e) {
            e.preventDefault();
            const tr = $(this).closest('tr');
            const row = selectTable().row( tr ).data();
            crawlerVariable.stored.rowCancelListing = row;
            $("#modal-cancel-crawler").modal('show');
        });
        $(document).on("click", "#delete-crawler", function (e) {
            cancelCrawler();
        });

        // export excel
        $(document).on("click", ".excel-export", function (e) {
            const parram = $.param(crawlerVariable.stored.dataSend);
            e.preventDefault();  //stop the browser from following
            window.location.href = "/pos/crawler-list-2/exportExcel?"+parram;
        });
        $(document).on('click', ".image-crawler", function (e) {
            e.preventDefault();
            const tr = $(this).closest('tr');
            const row = selectTable().row( tr ).data();
            console.log(row.images);
            let images = [];
            if (row.images && Array.isArray(images)) {
                images = row.images;
            }
            const sources = images.map(it => {
                return {
                    src : it.link,
                    opts : {
                        caption : 'crawler images',

                    }
                }
            });
            if (sources.length > 0) {
                $.fancybox.open(sources, {
                    type : 'image',
                    image : {
                        preload : true,
                    },
                    opts : {
                        afterShow : function (instant, current) {
                            console.info(current);
                        }
                    }
                });
            }

        });
    }

    function createPreListing() {
        showPropzyLoading();
        axios.post(POS_APIS_CRAWLER.get('GET_CRAWLER_TOOL_CREATE_LISTING'), crawlerVariable.stored.rowCreateListing)
            .then(xhr => {
                hidePropzyLoading();
                const response = xhr.data;
                if (response.result) {
                    window.open("/pos/prescreener/detail/"+response.data.id, '_blank');
                    // chuyển trạng thái
                    sendStatusOk();
                } else {
                    posNotifyAlert({type: "pos-notify-danger", message : response.message});
                    if (response.code == 10001) {
                        $("#modal-input-more-info").modal('show');
                        crawlerVariable.stored.districtId = crawlerVariable.stored.rowCreateListing.districtId;
                        if(crawlerVariable.stored.rowCreateListing.wardId) {
                            crawlerVariable.stored.missInfo.defaultWard = crawlerVariable.stored.rowCreateListing.wardId;
                        }
                        localPromiseApi("GET_WARDS");
                    }
                }

            })
            .catch(err => {
                hidePropzyLoading();
                posNotifyAlert({type: "pos-notify-danger", message : "Không thể tạo listing. Xin vui lòng liên hệ admin để được hỗ trợ"});
                console.error(err);
            });
    }
    function sendStatusOk() {
        const id = crawlerVariable.stored.rowCreateListing._id;
        crawlerVariable.stored.rowCreateListing = null;
        axios.post(POS_APIS_CRAWLER.get('GET_CRAWLER_TOOL_UPDATE_STATUS_SEND'), {
            id : id
        })
            .then(xhr => {
                const response = xhr.data;
                _this.reloadTable();
                if (response.code == 200) {

                } else {
                    posNotifyAlert({type: "pos-notify-danger", message : message});
                }
            })
            .catch(err => {
                posNotifyAlert({type: "pos-notify-danger", message : "Không thể chuyển trạng thái tin cào"});
            });
    }
    function cancelCrawler() {
        const dataPost = {
            idreason : Number.parseInt($('#reason-cancel option:selected').val()) ? Number.parseInt($('#reason-cancel option:selected').val()) : null,
            reasonname : null,
            id : null,
        };
        if(!crawlerVariable.stored.rowCancelListing || !crawlerVariable.stored.rowCancelListing._id) {
            posNotifyAlert({type: "pos-notify-danger", message : 'Không tồn tại tin cào để hủy'});
            return false;
        }
        dataPost.id = crawlerVariable.stored.rowCancelListing._id;
        const validate = {
            hasErr : false,
            message : ''
        };

        if (dataPost.idreason === 2) {
            dataPost.reasonname = $.trim($("#reason-text").val()) ? $.trim($("#reason-text").val()) : null;
        }

        if(!dataPost.idreason) {
            validate.hasErr = true;
            validate.message = 'Chưa chọn lý do để hủy tin cào!';
        } else if (dataPost.idreason === 2 && !dataPost.reasonname) {
            validate.hasErr = true;
            validate.message = 'Nhập lý do để hủy tin cào!';
        }

        if (validate.hasErr) {
            posNotifyAlert({type: "pos-notify-danger", message : validate.message});
            return false;
        }

        // send
        showPropzyLoading();
        axios.post(POS_APIS_CRAWLER.get('GET_CRAWLER_TOOL_CANCEL_LISTING'), dataPost)
            .then(xhr=> {
                hidePropzyLoading();
                const response = xhr.data;
                _this.reloadTable();
                if(response.code == 200) {
                    $("#modal-cancel-crawler").modal('hide');
                } else {
                    posNotifyAlert({type: "pos-notify-danger", message : message});
                }

            })
            .catch(err => {
                hidePropzyLoading();
                posNotifyAlert({type: "pos-notify-danger", message : 'Đã có lỗi xảy ra trong quá trình xử lý'});
                console.error(err);
            });

    }
    function checkDuplicateListing() {
        // check duplicate lisitng phone, addrees, email
        const row = crawlerVariable.stored.rowCheckDuplicate;
        const dataPostMail = {
            email:row.email,
            phone: null,
            ownerId: null,
            type: 2
        };
        const dataPostPhone = {
            email: null,
            phone: row.phones.join(','),
            ownerId: null,
            type: 1
        };
        const dataPostAddress = {
            "lsoId": null,
            "cityId": row.cityId,
            "districtId": row.districtId,
            "wardId": row.wardId,
            "streetId": row.streetId,
            "address": row.address,
            "houseNumber": row.houseNumber
        };
        // send async check 3
        const tabPhone = $("#modal-duplication #tabPhone .list-dupicate table");
        const tabEmail = $("#modal-duplication #tabMail .list-dupicate table");
        const tabAddress = $("#modal-duplication #tabLID .list-dupicate table");

        // reset
        tabPhone.find('tbody').html("");
        tabEmail.find('tbody').html("");
        tabAddress.find('tbody').html("");

        $('#modal-duplication #li-phone span').html('');
        $('#modal-duplication #li-mail span').html('');
        $('#modal-duplication #li-address span').html('');
        // call api
        if (dataPostMail.email) {
            axios.post(POS_APIS_CRAWLER.get('GET_CRAWLER_TOOL_CHECK_EMAIL_PHONE'), dataPostMail)
                .then(xhr => {
                    const response = xhr.data;
                    if (response.result && !$.isEmptyObject(response.data)) {
                        $('#tabMail .list-profile .item-info .name').html(response.data.name);
                        $('#tabMail .list-profile .item-info .phone').html(response.data.phone);
                        $('#tabMail .list-profile .item-info .email').html(response.data.email);
                        $('#tabMail .list-profile .item-info .type').html(response.data.userTypeName);
                        $('#modal-duplication #li-mail span').html('<i class="fa fa-check"></i>');
                        const list = formatDataTableListDuplicate(response.data.listings);
                        if (list.length > 0) {
                            tabEmail.find('tbody').html(list.join(''));
                        } else {
                            tabEmail.find('tbody').html('Không có dữ liệu');
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                    tabEmail.find('tbody').html('Không có dữ liệu');
                });
        }
        if (dataPostPhone.phone) {
            axios.post(POS_APIS_CRAWLER.get('GET_CRAWLER_TOOL_CHECK_EMAIL_PHONE'), dataPostPhone)
                .then(xhr => {
                    const response = xhr.data;
                    if (response.result && !$.isEmptyObject(response.data)) {
                        $('#tabPhone .list-profile .item-info .name').html(response.data.name);
                        $('#tabPhone .list-profile .item-info .phone').html(response.data.phone);
                        $('#tabPhone .list-profile .item-info .email').html(response.data.email);
                        $('#tabPhone .list-profile .item-info .type').html(response.data.userTypeName);
                        $('#modal-duplication #li-phone span').html('<i class="fa fa-check"></i>');
                        const list = formatDataTableListDuplicate(response.data.listings);
                        if (list.length > 0) {
                            tabPhone.find('tbody').html(list.join(''));
                        } else {
                            tabPhone.find('tbody').html('Không có dữ liệu');
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                    tabPhone.find('tbody').html('Không có dữ liệu');
                });
        }
        if (!dataPostAddress.cityId == null || !dataPostAddress.districtId==null || !dataPostAddress.wardId==null || !dataPostAddress.streetId==null) {
            axios.post(POS_APIS_CRAWLER.get('GET_CRAWLER_TOOL_CHECK_ADDRESS'), dataPostAddress)
                .then(xhr => {
                    const response = xhr.data;
                    if (response.result && !$.isEmptyObject(response.data)) {
                        $('#modal-duplication #li-address span').html('<i class="fa fa-check"></i>');
                        const list = formatDataTableListDuplicate(response.data.list);
                        if (list.length > 0) {
                            tabAddress.find('tbody').html(list.join(''));
                        } else {
                            tabAddress.find('tbody').html('Không có dữ liệu');
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                    tabAddress.find('tbody').html('Không có dữ liệu');
                });
        }



    }
    function formatDataTableListDuplicate($data = []) {
        return $data.map(item => {
            let tr = '<tr>';
            switch (item.type) {
                case 'PRE' : {
                    tr += '<td>'+item.lsoId+'</td>';
                    break;
                }
                case 'SA' : {
                    tr += '<td>'+item.rlistingId+'</td>';
                    break;
                }
                default  : {
                    tr += '<td>'+item.crawId+'</td>';
                    break;
                }
            }
            //
            tr += '<td>' + item.address + '</td>';
            tr += '<td>' + item.formatPrice + '</td>';
            tr += '<td>' + item.type + '</td>';
            tr += '</tr>';
            return tr;
        });
    }

    function bindEventChange(){
        document.querySelector("#reason-cancel").addEventListener('change',function(){
            if($(this).val()==2)
                $("#reason-other").show();
            else
                $("#reason-other").hide();
        });
    }

    function reloadTables() {
        // update Fillter
        updateFilter();
        const table = selectTable();
        table.ajax.reload();
    }

    function selectTable() {
        let table = null;
        switch (crawlerVariable.stored.type) {
            case 1 : {
                table = crawlerVariable.stored.tableCrawler.mapper;
                break;
            }
            case 2 : {
                table = crawlerVariable.stored.tableCrawler.owner;
                break;
            }
            case 3 : {
                table = crawlerVariable.stored.tableCrawler.agent;
                break;
            }
        }
        return table;
    }

    /**
     * function init tables of crawler list
     *
     */
    function initTables() {
        const columnsMapper = [
            {
                data: '_id',
                width: '30px',
                render: function (data, type, object) {
                    itemId++;
                    // return object.id;
                    return '<a href="'+object.link+'" target="_blank">'+object._id+'</a>';

                },
                orderable : false
            },{
                data: 'siteId',
                width: '200px',
                render: function (data, type, object) {
                    return object.siteName;
                },
                orderable : false
            },{
                data: 'name',
                width: '320px',
                render: function (data, type, object) {
                    if(object.name!=null && object.name!=''){
                        if(object.isDuplicate){
                            return object.name+'<br><a href="javascript:;" class="check-duplicate" style="display: inline-block; color: red; font-size: 10px" data-item="'+(itemId-1)+'" return false;"><i class="fa fa-times"></i> Danh sách trùng</a></i>';
                        }
                        return object.name;
                    }else{
                        return 'N/A';
                    }
                },
                orderable : false
            },{
                data: 'phone',
                width: '100px',
                render: function (data, type, object) {
                    var html_phones = '';
                    $.each(object.phones,function(key,item){
                        if(item!=null){
                            html_phones +='<a href="javascript:;" style="display: inline-block" onclick="new IndexPage().callPhone(\'' + item + '\'); return false;">'+item+'</a></i>';
                        }else{
                            html_phones +='N/A';
                        }
                    });
                    return html_phones;
                },
            },{
                data: 'email',
                render: function (data, type, object) {
                    if(object.email!=null || object.email!=''){
                        return object.email;
                    }else{
                        return 'N/A';
                    }

                },
                orderable : false
            },{
                data: 'price',
                width: '70px',
                render: function (data, type, object) {
                    if(object.formatedPrice!=null && object.formatedPrice!=''){
                        return object.formatedPrice;
                    }else{
                        return 'N/A';
                    }
                },
                orderable : false
            },{
                data: 'districtId',
                width: '70px',
                render: function (data, type, object) {
                    if(object.districtName!=null && object.districtName!=''){
                        return object.districtName;
                    }else{
                        return 'N/A';
                    }
                },
                orderable : false
            },{
                data: 'wardId',
                width: '70px',
                render: function (data, type, object) {
                    if(object.wardName!=null && object.wardName!=''){
                        return object.wardName;
                    }else{
                        return 'N/A';
                    }
                },
                orderable : false
            },{
                data: 'streetId',
                width: '100px',
                render: function (data, type, object) {
                    if(object.streetName!=null && object.streetName!=''){
                        return object.streetName;
                    }else{
                        return 'N/A';
                    }
                },
                orderable : false
            },{
                data: 'address',
                width: '200px',
                render: function (data, type, object) {
                    if(object.address!=null && object.address!=''){
                        return object.address;
                    }else{
                        return 'N/A';
                    }
                },
                orderable : false
            },{
                data: 'createddate',
                width: '60px',
                render: function (data, type, object) {
                    let timeNow = moment();
                    let timeDate = moment(data).set({hour:0,minute:0,second:0,millisecond:0});
                    let time = timeNow.diff(timeDate, 'days');
                    return `${moment(data).format('DD/MM/YYYY')} \n ${time} ngày`;
                },
            },{
                data: 'statusId',
                width: '50px',
                render: function (data, type, object) {
                    return object.statusName;
                },
                orderable : false
            },{
                data: 'images',
                width: '50px',
                class : 'text-center',
                render : function (data, type, object) {
                    let count = 0;
                    if (data && Array.isArray(data)) {
                        count = data.length;
                    }
                    return `<a class="image-crawler">${count}</a>`;
                },
                orderable : false
            },{
                data: 'statusId',
                width: '120px',
                render: function (data, type, object) {
                    var action ='';
                    if (object.statusId == 1) {
                        action+='<a class="btn btn-primary btn-transfer" style="margin-right: 3px;" data-id="'+object.id+'" data-item="'+(itemId-1)+'" href="javascript:;"><i class="fa fa-arrow-right"></i></a>';
                        action+='<a class="btn btn-danger btn-cancel-crawler"><i class="fa fa-times"></i></a>';
                    }
                    return action;
                },
                orderable : false
            }
        ];
        crawlerVariable.stored.tableCrawler.mapper = $('#tb-mapper')
            .DataTable({
                processing: false,
                serverSide: true,
               // deferLoading : false,
                ajax: {
                    url: POS_APIS_CRAWLER.get('GET_CRAWLER_TOOL_LIST'),
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, {filter:data_send});
                        crawlerVariable.stored.dataSend = d;
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: true,
                order : [[ 10, 'desc' ]],
                language: DatatableHelper.languages.vn,
                columns: columnsMapper,
                createdRow : function( row, data, dataIndex ) {
                    changeStypeRowTable(row, data, dataIndex);
                },
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            });

        // table owner
        crawlerVariable.stored.tableCrawler.owner = $('#tb-owner')
            .DataTable({
                processing: false,
                serverSide: true,
                deferLoading : false,
                ajax: {
                    url: POS_APIS_CRAWLER.get('GET_CRAWLER_TOOL_LIST'),
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, {filter:data_send});
                        crawlerVariable.stored.dataSend = d;
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: true,
                order : [[ 10, 'desc' ]],
                language: DatatableHelper.languages.vn,
                columns: columnsMapper,
                createdRow : function( row, data, dataIndex ) {
                    changeStypeRowTable(row, data, dataIndex);
                },
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            });

        // table agent
        crawlerVariable.stored.tableCrawler.agent = $('#tb-agent')
            .DataTable({
                processing: false,
                serverSide: true,
                deferLoading : false,
                ajax: {
                    url: POS_APIS_CRAWLER.get('GET_CRAWLER_TOOL_LIST'),
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, {filter:data_send});
                        crawlerVariable.stored.dataSend = d;
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: true,
                order : [[ 10, 'desc' ]],
                language: DatatableHelper.languages.vn,
                columns: columnsMapper,
                createdRow : function( row, data, dataIndex ) {
                    changeStypeRowTable(row, data, dataIndex);
                },
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            });
    }

    /**
     *  function change sytle of tablw
     * @param row
     * @param data
     * @param dataIndex
     */
    function changeStypeRowTable(row, data, dataIndex) {
        let timeNow = moment();
        let timeDate = moment(data.createdDate).set({hour:0,minute:0,second:0,millisecond:0});
        let time = timeNow.diff(timeDate, 'days');
        if (time > 5) {
            $(row).addClass( 'five-days' );
        } else if (time > 2) {
            $(row).addClass('two-days');
        } else {
            $(row).addClass('one-day');
        }
    }
}

$(document).ready(function () {
    var index = new IndexPage();
    index.init();
});