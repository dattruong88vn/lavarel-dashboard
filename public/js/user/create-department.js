$(document).ready(function () {
    initSelectDistrict();
    var validateOptions = {
        ignore: null,
        rules: {
            "department_name": {required: true},
            "department_type" : {required: true},
            // "districtIds[]": {required: true},
            // "preferDistrict": {required: true}
        },
        messages: {
            "department_name": {required: 'Nhập Tên bộ phận'},
            "department_type" : {required: 'Chọn Loại bộ phận'},
            // "districtIds[]": {required: 'Chọn quận/huyện'},
            // "preferDistrict": {required: 'Chọn quận/huyện yêu thích'}
        }
    };
    
    var validateCreateDepartment = $("#form-create-department").validate(validateOptions);
    
    $('#add-department').on('click', function (event){
        event.preventDefault();
        if (!validateCreateDepartment.form()) {
            showPropzyAlert("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
            return false;
        }
        
        var form = $('#form-create-department');
        form.find('.errors').html('');
        
        var departmentShortName = $('#department_shortname').val();
        var departmentName = $('#department_name').val();
        var departmentType = $('#department_type').val();
        var parentId = $('#department_unit').val();
        
        var districts = [];
        var districtIds = $('#districtIds').val();
        var preferDistrict = $('#preferDistrict').val();
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
                //window.location = "/";
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
        
    });
});

var initSelectDistrict = function(){
    $("#districtIds").selectize({
        plugins: ['remove_button'],
        render: {
            item: function (data, escape) {
                var returnVal = '<div> <span class="district-prefer" onclick="return setPreferDistrict(this, ' + data.value.split('-')[0] + ')"><i class="fa fa-star" /></i></span> ' + data.text + '</div>';
                return returnVal;
            }
        },
        create: false,
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

function setPreferDistrict(selector, id) {
    // reset districts
    $(".district-prefer").removeClass('prefered-item');
    $("#preferDistrict").val(id);
    $(selector).addClass('prefered-item');
    return false;
};