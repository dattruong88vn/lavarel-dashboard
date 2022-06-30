var renderAction = function (data, type, object) {
    return "<button class='btn-edit-tc btn btn-primary' onclick='updateTc(event,this);' data-id='"+ object.tcId +"' ><span class='fa fa-edit'></span></button>";
};

$(document).ready(function(){
    var getList = function (limit = 10) {
        $("#data-tcs").DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/list-tc/get-all-tcs?limit="+limit,
            "scrollX": false,
            "lengthChange": true,
            "autoWidth": false,
            "lengthMenu": [[10, 25, 50], [10 + ' records', 25 + ' records', 50 + ' records']],
            "pagingType": "full_numbers",
            "iDisplayLength": limit,
            "drawCallback": function (oSettings) {
                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                pagination.toggle(this.api().page.info().pages > 1);
            },
            "columns": [
                {data: 'tcId', orderable: false},
                {data: 'name', orderable: false},
                {data: 'shortAddress', orderable: false},
                {data: 'zoneName', orderable: false},
                {data: 'districtName', orderable: false},
                {data: 'wardName', orderable: false},
                {data: 'tcId', render: renderAction, orderable: false}
            ],
            "order": false,
            "language":
                {
                    "search" : "Tìm kiếm",
                    "paginate" : {
                        previous: "<",
                        next: ">",
                        first: "|<",
                        last: ">|"
                    },
                    "lengthMenu": "Hiển thị _MENU_ trên 1 trang",
                    "searchPlaceholder": "Tên, địa chỉ",
                    "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
                    "emptyTable": "Chưa có dữ liệu",
                    "infoEmpty": ""
                },
            "createdRow": function (row, data, index) {
                //console.log(data);
                if (!data.isActivated) {
                    $('td', row).parent('tr').addClass("unactivated");
                }
                if (data.isNew) {
                    $('td', row).parent('tr').addClass("item-new");
                }
            }
        });
    };
    getList();
    // filter
    $('#zoneIds').change(function(){
        var filters = {};
        filters.zoneIds = $(this).val() != '' ? $(this).val() : null;
        filters.districtIds = $('#districtIds').val() != '' ? $('#districtIds').val() : null;
        $("#data-tcs").DataTable().ajax.url(generate(filters)).load();
    });
    $('#districtIds').change(function(){
        var filters = {};
        filters.districtIds = $(this).val() != '' ? $(this).val() : null;
        filters.zoneIds = $('#zoneIds').val() != '' ? $('#zoneIds').val() : null;
        $("#data-tcs").DataTable().ajax.url(generate(filters)).load();
    });
    //
    $('#create-tc').click(function(){
        $('#tcId').val('');
        $('#latitude').val('');
        $('#longitude').val('');
        $('#name').val('');
        $('#fullName').val('');
        $('#type').val('');
        $('#orders').val('');
        $('#districtId').val('');
        $('#wardId').html('<option value="">-- Chọn phường --</option>');
        $('#streetId').html('<option value="">-- Chọn đường --</option>');
        $('#address').val('');
        $('#shortAddress').val('');
        $('#create-update-tc').modal();
    });
    //
    $('body').on('change', '#districtId', function (e) {
        e.preventDefault();
        var districtId = $(this).val();
        loadWard(districtId, 0);
    });
    //
    $('body').off('change', '#wardId').on('change', '#wardId', function (e) {
        var wardId = $(this).val();
        loadStreet(wardId, 0);
    });
    //
    $('#address').geocomplete({
        details: ".address-group",
        detailsAttribute: "data-geo"
    })
    .bind("geocode:result", function (event, result) {
        $('#latitude').val(result.geometry.location.lat());
        $('#longitude').val(result.geometry.location.lng());
    });
    $('#shortAddress').geocomplete({
        details: ".address-group",
        detailsAttribute: "data-geo"
    });
    //
    var validateOptions = {
        ignore: null,
        rules: {
            "name": {required: true},
            "fullName" : {required: true},
            "type" : {required: true},
            "orders" : {required: true},
            "districtId" : {required: true},
            "address" : {required: true},
            "shortAddress" : {required: true}
        },
        messages: {
            "name": {required: 'Nhập Tên TC'},
            "fullName" : {required: 'Nhập tên TC đầy đủ'},
            "type" : {required: 'Chọn loại'},
            "orders" : {required: 'Nhập thứ tự'},
            "districtId" : {required: 'Chọn quận'},
            "address" : {required: 'Nhập địa chỉ'},
            "shortAddress" : {required: 'Nhập địa chỉ rút gọn'}
        }
    };
    
    var validate = $("#form-create-update-tc").validate(validateOptions);
    $('#btnSaveInfoTc').click(function(){
        event.preventDefault();
        if (!validate.form()) {
            showPropzyAlert("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
            return false;
        }
        var form = $('#form-create-update-tc');
        form.find('.errors').html('');
        
        var dataPost = {};
        var tcId = $('#tcId').val();
        if(tcId != '')
            dataPost.tcId = tcId;
        dataPost.name = $('#name').val();
        dataPost.fullName = $('#fullName').val();
        dataPost.type = $('#type').val();
        dataPost.orders = $('#orders').val();
        dataPost.cityId = 1;
        dataPost.districtId = parseInt($('#districtId').val());
        dataPost.wardId = parseInt($('#wardId').val());
        dataPost.streetId = parseInt($('#streetId').val());
        dataPost.address = $('#address').val();
        dataPost.shortAddress = $('#shortAddress').val();
        dataPost.latitude = parseInt($('#latitude').val());
        dataPost.longitude = parseInt($('#longitude').val());
        
        console.log(dataPost);
        showPropzyLoading();
        
        $.ajax({
            url: "/list-tc/save-info-tc",
            data: JSON.stringify(dataPost),
            type: "post"
        }).done(function (response) {
            console.log(response);
            if (response.result) {
                showPropzyAlert(response.message);
                location.reload();
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
});

function generate(filters){
    var baseUrl = "/list-tc/get-all-tcs";
    var params = "";
    if(filters){
        params += "?filters="+JSON.stringify(filters);
    }
    return baseUrl + params;
}

function loadWard(districtId, wardId) {
    if (!hasValue(districtId)) {
        var html = '<option value="">--Chọn Phường--</option>';
        $('#wardId').html('').append(html);
        $('#wardId').val('');
        return false;
    }

    Listing.getWardList(districtId).done(function (response) {
        var html = '<option value="">--Chọn Phường--</option>';
        $.each(response.data, function (i, data) {
            html += '<option value="' + data.wardId + '">' + data.wardName + '</option>';
        });

        $('#wardId').html('').append(html);

        if (wardId) {
            $('#wardId').val(wardId);
        } else {
            $('#wardId').val('');
            $('#wardId').trigger('change');
        }
    });
}

function loadStreet(wardId, streetId) {
    if (!hasValue(wardId)) {
        var html = '<option value="">--Chọn Đường--</option>';
        $('#streetId').html('').append(html);
        $('#streetId').val('');
        return false;
    }
    Listing.getStreetList(wardId).done(function (response) {
        var html = '<option value="">--Chọn Đường--</option>';
        $.each(response.data, function (i, data) {
            html += '<option value="' + data.streetId + '">' + data.streetName + '</option>';
        });

        $('#streetId').html('').append(html);

        if (streetId) {
            $('#streetId').val(streetId);
        } else {
            $('#streetId').val('');
        }
    });
}

function updateTc(event, element){
    var tcId = $(element).attr('data-id');
    $.ajax({
        url: "/list-tc/get-detail-tc/"+tcId,
        type: "get"
    }).done(function (response) {
        if(response.result){
            $('#tcId').val(response.data.tcId);
            $('#latitude').val(response.data.latitude);
            $('#longitude').val(response.data.longitude);
            $('#name').val(response.data.name);
            $('#fullName').val(response.data.fullName);
            $('#type').val(response.data.type);
            $('#orders').val(response.data.orders);
            $('#districtId').val(response.data.districtId);
            loadWard(response.data.districtId, response.data.wardId);
            loadStreet(response.data.wardId, response.data.streetId);
            $('#address').val(response.data.address);
            $('#shortAddress').val(response.data.shortAddress);
            
            $('#create-update-tc').modal();
        }
    });
}