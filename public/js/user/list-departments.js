$(document).ready(function () {
    var parentId = $('#parentId').val();
    $.ajax({
        url: "/common/get-list-parents/id-" + parentId,
        type: 'get'
    }).done(function (response) {
        if (response.result) {
            var treeData = [];
            $.each(response.data, function (k, v) {
                if(v.departmentType == 'DEPARTMENT'){
                    treeData.push(buildTree(v));
                }
            });
            $('#treeview').treeview({
                data: treeData
            });
        } else {
            showPropzyAlert(response.message);
        }
    });

    //

    var validateOptions = {
        ignore: null,
        rules: {
            "department_name": {required: true},
            //"department_type": {required: true},
            // "districtIds[]": {required: true},
            // "preferDistrict": {required: true},
            "create_department_name": {required: true},
            "create_department_type": {required: true},
            // "create_districtIds[]": {required: true},
            // "create_preferDistrict": {required: true}
        },
        messages: {
            "department_name": {required: 'Nhập Tên phòng ban'},
            //"department_type": {required: 'Chọn Loại phòng ban'},
            // "districtIds[]": {required: 'Chọn quận/huyện'},
            // "preferDistrict": {required: 'Chọn quận/huyện yêu thích'},
            "create_department_name": {required: 'Nhập Tên phòng ban'},
            "create_department_type": {required: 'Chọn Loại phòng ban'},
            // "create_districtIds[]": {required: 'Chọn quận/huyện'},
            // "create_preferDistrict": {required: 'Chọn quận/huyện yêu thích'}
        }
    };

    var validateUpdateDepartment = $("#form-update-department").validate(validateOptions);
    var validateCreateDepartment = $("#form-create-department").validate(validateOptions);
    
    $('#update-department').on('click', function (event) {
        event.preventDefault();
        if (!validateUpdateDepartment.form()) {
            showPropzyAlert("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
            return false;
        }
        var form = $('#form-update-department');
        form.find('.errors').html('');

        var departmentId = $('#departmentId').val();
        var departmentShortName = $('#department_shortname').val();
        var departmentName = $('#department_name').val();
        var departmentType = 'DEPARTMENT';
        var parentId = $('#department_unit').val();

        var districts = [];
        var districtIds = $('#districtIds').val();
        var preferDistrict = $('#preferDistrict').val();

        if(districtIds){
            $.each(districtIds, function (k, v) {
                var arr = v.split('-');
                var id = arr[0];
                if (id == preferDistrict) {
                    districts[k] = {
                        "districtId": id,
                        "isPrimary": true
                    };
                } else {
                    districts[k] = {
                        "districtId": id,
                        "isPrimary": false
                    };
                }
            });
        }

        var dataPost = {};
        dataPost['departmentId'] = departmentId;
        dataPost['departmentShortName'] = departmentShortName;
        dataPost['departmentName'] = departmentName;
        dataPost['departmentType'] = departmentType;
        dataPost['parentId'] = parentId;
        dataPost['districts'] = districts;

        //console.log(dataPost);
        showPropzyLoading();

        $.ajax({
            url: "/departments/do-update-department",
            data: JSON.stringify(dataPost),
            type: "post"
        }).done(function (response) {
            //console.log(response);
            if (response.result) {
                showPropzyAlert(response.message);
                $('#modalUpdateDepartment').modal('hide');
                $('#alertModal').on('hide.bs.modal',function () {
                    location.reload();
                });
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
    
    $('#create-department').on('click', function (event) {
        event.preventDefault();
        if (!validateCreateDepartment.form()) {
            showPropzyAlert("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
            return false;
        }
        
        var form = $('#form-create-department');
        form.find('.errors').html('');
        
        var departmentShortName = $('#create_department_shortname').val();
        var departmentName = $('#create_department_name').val();
        var departmentType = 'DEPARTMENT';
        var parentId = $('#create_department_unit').val();
        
        var districts = [];
        var districtIds = $('#create_districtIds').val();
        var preferDistrict = $('#create_preferDistrict').val();
        if(districtIds){
            $.each(districtIds,function(k,v){
                var arr = v.split('-');
                var id = arr[0];
                if(id == preferDistrict){
                    districts[k] = {
                        "districtId" : id,
                        "isPrimary" : true
                    };
                } else {
                    districts[k] = {
                        "districtId" : id,
                        "isPrimary" : false
                    };
                }
            });
        }
        
        var dataPost = {};
        dataPost['departmentShortName'] = departmentShortName;
        dataPost['departmentName'] = departmentName;
        dataPost['departmentType'] = departmentType;
        dataPost['parentId'] = parentId;
        dataPost['districts'] = districts;
        
        //console.log(dataPost);
        
        showPropzyLoading();
        
        $.ajax({
            url: "/departments/do-create-department",
            data: JSON.stringify(dataPost),
            type: "post"
        }).done(function (response) {
            console.log(response);
            if (response.result) {
                showPropzyAlert(response.message);
                $('#modalCreateDepartment').modal('hide');
                $('#alertModal').on('hide.bs.modal',function () {
                    location.reload();
                });
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
    
    $('#cancel-create').on('click', function (event){
        event.preventDefault();
        $('#modalCreateDepartment').modal('hide');
    });
    //
    $('#cancel-update').on('click', function (event){
        event.preventDefault();
        $('#modalUpdateDepartment').modal('hide');
    });
    
});

var openPopup = function (element, id) {
    $('.districtIds').html('');
    $('#modalUpdateDepartment').modal();
    $.ajax({
        url: "/common/edit-department/" + id,
        type: "get"
    }).done(function (response) {
        //console.log(response.currentDistricts);
        $('.modal-title').text('CẬP NHẬT PHÒNG BAN: ' + response.detailDepartment.departmentName);
        $('#departmentId').val(response.detailDepartment.id);
        $('#department_name').val(response.detailDepartment.departmentName);
        $('#department_shortname').val(response.detailDepartment.departmentShortName);
        //
        var optionDepartmentType = '<option value="">-- Chọn --</option>';
        $.each(response.listDepartmentTypes, function (k, v) {
            optionDepartmentType += '<option value="' + v.typeId + '"';
            if (v.typeId == response.detailDepartment.departmentType) {
                optionDepartmentType += "selected='selected'";
            }
            optionDepartmentType += '>';
            optionDepartmentType += v.typeName;
            optionDepartmentType += '</option>';
        });
        $('#department_type').html(optionDepartmentType);
        //
        var optionDepartmentUnit = '<option value="">-- Chọn --</option>';
        $.each(response.listDepartments, function (k, v) {
            optionDepartmentUnit += '<option value="' + v.id + '"';
            if (v.id == response.detailDepartment.parentId) {
                optionDepartmentUnit += "selected='selected'";
            }
            optionDepartmentUnit += '>';
            optionDepartmentUnit += v.departmentName;
            optionDepartmentUnit += '</option>';
        });
        $('#department_unit').html(optionDepartmentUnit);
        //
        $('.districtIds').html('<select id="districtIds" name="districtIds[]" multiple="multiple"></select> <input type="hidden" id="preferDistrict" name="preferDistrict" value=""/> <div class="errors district-errors"></div>');
        var optionDistrict = '';
        $.each(response.districts, function (k, v) {
            var select = '';
            if ($.inArray(v.districtId, response.currentDistricts) !== -1) {
                select = " selected";
            }
            optionDistrict += '<option ' + select;
            optionDistrict += ' value="' + v.districtId + '-' + v.districtName + '"';
            optionDistrict += ' >';
            optionDistrict += v.districtName;
            optionDistrict += '</option>';
            
        });
        
        $('#districtIds').html(optionDistrict);
        //
        $('#preferDistrict').val(response.isPreferedDistrict);
        initSelectDistrict();
        
    }).always(function () {
        hidePropzyLoading();
    });
};

var createPopup = function (element, id){
    $('#modalCreateDepartment').modal();
    //var create_department_unit = $('#create_department_unit').val();
    $('#create_department_unit').val(id);
    initCreateSelectDistrict();
};

var initSelectDistrict = function () {
    $("#districtIds").selectize({
        plugins: ['remove_button'],
        render: {
            item: function (data, escape) {
                var currentPrefered = $("#preferDistrict").val().trim();
                var isPrefered = "";
                if (currentPrefered && data.value.split('-')[0] == currentPrefered) {
                    isPrefered = "prefered-item";
                }
                var returnVal = '<div> <span class="district-prefer ' + isPrefered + '" onclick="return setPreferDistrict(this, ' + data.value.split('-')[0] + ')"><i class="fa fa-star" /></i></span> ' + data.text + '</div>';
                return returnVal;
            }
        },
        create: true,
        onItemRemove: function (data) {
            var arr = data.split('-');
            var id = arr[0];
            var name = arr[1];
            var idInput = $("#preferDistrict").val();
            if (idInput == id) {
                $("#preferDistrict").val('');
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#preferDistrict").val().trim();
            if (!currentPrefered) {
                $(".district-prefer").removeClass("prefered-item");
            }
        }
    });
    return false;
};

var initCreateSelectDistrict = function () {
    $("#create_districtIds").selectize({
        plugins: ['remove_button'],
        render: {
            item: function (data, escape) {
                var currentPrefered = $("#create_preferDistrict").val().trim();
                var isPrefered = "";
                if (currentPrefered && data.value.split('-')[0] == currentPrefered) {
                    isPrefered = "prefered-item";
                }
                var returnVal = '<div> <span class="create_district-prefer ' + isPrefered + '" onclick="return setCreatePreferDistrict(this, ' + data.value.split('-')[0] + ')"><i class="fa fa-star" /></i></span> ' + data.text + '</div>';
                return returnVal;
            }
        },
        create: true,
        onItemRemove: function (data) {
            var arr = data.split('-');
            var id = arr[0];
            var name = arr[1];
            var idInput = $("#create_preferDistrict").val();
            if (idInput == id) {
                $("#create_preferDistrict").val('');
            }
        },
        onItemAdd: function (value, item) {
            var currentPrefered = $("#create_preferDistrict").val().trim();
            if (!currentPrefered) {
                $(".create_district-prefer").removeClass("prefered-item");
            }
        }
    });
    return false;
};

function setPreferDistrict(selector, id) {
    // reset districts
    $(".district-prefer").removeClass('prefered-item');
    $("#preferDistrict").val(id);
    $(selector).addClass('prefered-item');
    return false;
};

function setCreatePreferDistrict(selector, id) {
    // reset districts
    $(".create_district-prefer").removeClass('prefered-item');
    $("#create_preferDistrict").val(id);
    $(selector).addClass('prefered-item');
    return false;
};

function buildTree(data) {
    if (data == null || data.length == 0) {
        return null;
    }
    let tag = '<button data-id="' + data.id + '" class="pull-right btn btn-xs btn-info btn-update tooltip-success popup-update-department"  onclick="return openPopup(this, ' + data.id + ')"><i class="ace-icon fa fa-pencil bigger-120"></i></button>';
    // tag += '<button data-id="' + data.id + '" class="btn btn-xs btn-add btn-create tooltip-success popup-create-department"  onclick="return createPopup(this, ' + data.id + ')"><i class="ace-icon fa fa-plus bigger-120"></i></button>';
    tag += '<button onclick="renderPositionList('+data.id+',\''+data.departmentName+'\')" class="pull-right btn bn-link btn-xs"><i class="fa fa-street-view" aria-hidden="true"></i></button>';
    var tree = {
        text: data.departmentName + tag,
        href: '#' + data.id,
        tags: '[' + data.id + ']',
        nodes: []
    };
    if (data.children !== null && data.children.length > 0) {
        $.each(data.children, function (k, v) {
            tree.nodes.push(buildTree(v));
        });
    }
    return tree;
}