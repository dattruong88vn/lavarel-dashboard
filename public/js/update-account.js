$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
/* variables*/

var accountObject = {
    "name": '',
    "email": '',
    "userName": '',
    "photo": null,
    "password": '',
    "phone": '',
    "signature": '',
    "skype": '',
    "zalo": '',
    "departments": [],
    "socialUid": '',
    "cityId": null,
    "userDistricts": [],
    "privatePermissions": [],
    //"isForceAssign" : false,
};
var stored = {
    userDistricts : oldDistrictIds,
};

var api = {
    UPDATE_ACCOUNT : "/update-account",
    CHECK_ASSIGN_DISTRICT : "/account-manager/check-assign-district",
    GET_DISTRICTS_BY_CITY : "/get-district/",
    REMOVE_AVATAR : "/user/remove-avatar",

};

/*define method*/
var puts_sync = function (url, data, isSync, completed) {
    $(".modal-overlay").show();
    $.ajax({
        type: 'PUT',
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            $(".modal-overlay").hide();
            completed(data);
        },
        error: function (data) {
            $(".modal-overlay").hide();
        },
        async: isSync
    });
}
var get_sync = function (url, isSync, completed) {
    $(".modal-overlay").show();
    $.ajax({
        type: 'GET',
        url: BASE_URL + url,
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            completed(data);
        },
        error: function (data) {
            $(".modal-overlay").hide();
        },
        async: isSync
    });
}


/*define function*/

function getDistrictByCity() {
    if ($('#city').val() != "") {
        var getUrl = api.GET_DISTRICTS_BY_CITY + $('#city').val();
        var html = "<option value=''>---Vui lòng chọn----</option>";
        get_sync(getUrl, true, function (data) {
            if (data) {
                var districts = $.map(data, function (val, index) {
                    var selected = "";
                    if (stored.userDistricts.indexOf(val.districtId) >= 0) {
                        selected = "selected";
                    }
                    return '<option value=' + val.districtId + '" ' + selected + ' >' + val.districtName + '</option>'
                })
                html = html.concat(districts.join(""));
            }
            $('#district').html(html).select2();
        });
    } else {
        var html = "<option value=''>---Không Có---</option>";
        $('#listuser').html(html).select2;
    }
}
function updateUser() {
    showPropzyLoading();
    const department = getDepartmentsArray(accountObject.departments);
    post_sync(api.UPDATE_ACCOUNT, accountObject, true, function (data) {
        hidePropzyLoading();
        if (data['result'] == true) {
            if (departmentCheckPos(department)) {
                // only for Pos open modal to choose option
                if (data["data"]["existingDistrictUsers"] && data["data"]["existingDistrictUsers"].length > 0) {
                    // open modal
                    $("#pos-choose-district-modal").modal();
                    // render options
                    $("#user-id-update-district").val(data['data']["userId"]);
                    renderHtmlAssignedDistrict(data["data"]["existingDistrictUsers"]);
                } else {
                    showPropzyAlert("Bạn đã cập nhật thành công account", 'Thông báo', function () {
                        location.reload();
                    });
                }
            } else {
                showPropzyAlert("Bạn đã cập nhật thành công account", 'Thông báo', function () {
                    location.reload();
                });
            }
        } else {
            showPropzyAlert(data['message']);
        }
    });
}

function updateDistricUser() {
    const url = "/users/update-district-assigned";
    const data = {
        userId : null,
        list : []
    };

    data.userId = $("#user-id-update-district").val();
    $(".select-case-assigned-district").each(function (i, element) {
        if ($(element).val() != 0) {
            data.list.push({
                userId : $(element).data('user'),
                districtId : $(element).data('district'),
                updateCase : $(element).val(),
            });
        }

    });

    showPropzyLoading();
    post_sync(url, data, true, function (xhr) {
        hidePropzyLoading();
        if (xhr.result == true) {
            location.reload();
        } else {
            showPropzyAlert("Đã có lỗi xảy ra. xin vui lòng thử lại cập nhật quận");
        }
    });
}
function renderHtmlAssignedDistrict(listDistrict) {
    $("#btn-pos-choose-district").hide();
    $("#tb-pos-choose-district").find("tbody").html("");
    let listTr = [];

    $.each(listDistrict, function (i, val) {
        const selectCase = "<select class='form-control select-case-assigned-district' data-user='"+val.userId+"' data-district='"+val.districtId+"'>" +
            "<option value='0'>Chọn tác vụ</option>" +
            "<option value='1'>Chuyển listing</option>" +
            "<option value='2'>Chuyển listing và xóa quận</option>" +
            "</select>";
        let tr = "<tr>";
        tr += "<td>" + val.districtName + "</td>";
        tr += "<td>" + val.userName + "</td>";
        tr += "<td>" + selectCase + "</td>";
        tr += "</tr>";
        listTr.push(tr);
    });
    $("#tb-pos-choose-district").find("tbody").html(listTr.join(""));
    if (listTr.length > 0 ) {
        $("#btn-pos-choose-district").show();
    }
}

function getDistrictArray($data) {
    var result = [];
    if(Array.isArray($data)) {
        $.each($data, function (i, district) {
            result.push(parseInt(district.id.districtId));
        });
    }
    return result;
}
function getDepartmentsArray($data) {
    var result = [];
    if(Array.isArray($data) && $data.length > 0) {
        $.each($data, function (i, depart) {
            result.push(parseInt(depart.departmentId));
        });
    }
    return result;
}

function getDistrictsFromHtml() {
    var districts = [];
    var districtsList = $("#district").select2().val();
    if (districtsList != null) {
        districts = $.map(districtsList, function (val, index) {
            return {id : {districtId: parseInt(val)}}
        })
    }
    return districts;
}

function checkAddDistricts() {
    var hasAdd = false;

    var newDistrict = getDistrictArray(accountObject.userDistricts);
    var oldDistrict = stored.userDistricts;

    var contain = newDistrict.filter(function (district) {
        if (!oldDistrict.includes(district)) {
            return district;
        }
    })

    if (contain.length > 0) {
        hasAdd = true;
    }

    return hasAdd;
}


function prepareObject() {
    accountObject.userId = parseInt($('#userId').val());
    accountObject.name = $('#fullName').val() != "" ? $('#fullName').val() : '';
    accountObject.email = $('#email').val() != "" ? $('#email').val() : '';
    accountObject.phone = $('#phone').val() != "" ? $('#phone').val() : '';
    accountObject.signature = $('#signature').val() != "" ? $('#signature').val() : '';
    accountObject.skype = $('#skype').val() != "" ? $('#skype').val() : '';
    accountObject.zalo = $('#zalo').val() != "" ? $('#zalo').val() : '';
    accountObject.userName = $('#username').val() != "" ? $('#username').val() : '';
    accountObject.password = $('#password').val() != "" ? $('#password').val() : '';
    accountObject.voipId = $('#voipId').val() != "" ? $('#voipId').val() : '';
    accountObject.voipPassword = $('#voipPassword').val() != "" ? $('#voipPassword').val() : '';
    //For district
    var districts = getDistrictsFromHtml();
    //End

    //For departments
    var departments = [];
    $.each($("input[name='choose[]']:checked"), function () {
        departments.push({"departmentId": $(this).val(), "isGroupAdmin": false});
    });

    for (var i = 0; i < departments.length; i++) {
        $.each($("input[name='chooseAdmin[]']:checked"), function () {
            if (departments[i].departmentId == $(this).val()) {
                departments[i].isGroupAdmin = true;
            }
        });
    }
    //End

    //Private permissions
    var privatePermissions = [];
    var permissions = $('#table-permission #select_permission').get();
    for (var i = 0; i < permissions.length; i++) {
        if ($(permissions[i]).val() != -1) {
            var element = $("option:selected", $(permissions[i]));
            var entityId = element.attr("entityid");
            var actionId = element.attr("actionid");
            privatePermissions.push({"id": {"entityId": entityId, "actionId": actionId}, "permissionId": $(permissions[i]).val()});
        }
    }
    //End
    accountObject.socialUid = parseInt($("#listuser :selected").val());
    accountObject.privatePermissions = privatePermissions;
    accountObject.userDistricts = districts;
    accountObject.departments = departments;
    accountObject.cityId = $("#city").select2().val();
    $(".avatar .file-preview .file-preview-initial").each(function (idx, element) {
        console.log($(element).find("img").data("src"));
        accountObject.photo = $(element).find("img").data("src");
    });
    console.log(accountObject);
    return true;
}

function unCheckedParentDepartment(id) {
    var parentSelector = $(".choose-department-" + id);
    var isMine = $(parentSelector).hasClass("my-department");
    if (isMine) {
        $(parentSelector).prop("checked", true);
        return false;
    }
    var uncheckable = true;
    $(".choose-department").each(function () {
        var myParentId = $(this).attr('data-parent-id');
        if (myParentId == id && $(this).prop('checked')) {
            uncheckable = false;
        }
    });
    if (uncheckable) {
        parentSelector.prop('checked', false);
    }
}
function isDepartmentsChecked() {
    var result = false;
    $(".choose-department").each(function () {
        if ($(this).prop('checked')) {
            result = true;
        }
    });
    return result;
}
function showDepartment() {
    $(".has-parent").parents("tr").find("td:first-child").prepend("|---");
}

function departmentCheckPos(departmentIds) {
    const isPos = departmentIds.find(it=> {
        return [14, 15, 16, 17].indexOf(it) > -1;
    });
    if(isPos) {
        return true;
    }
    return false;
}


/*define variables and event*/

$(document).ready(function () {
    $(".select2").select2();
    var path = [];
    var pathConfig = [];
    if (photo) {
        linkArr = photo.split("/");
        fileid = linkArr[linkArr.length - 1].split(".");
        path.push("<img src='" + photo + "' class='file-preview-image' fileid='" + fileid[fileid.length - 2] + "' name='" + fileid[fileid.length - 2] + "' alt='" + linkArr[linkArr.length - 1] + "' title='" + linkArr[linkArr.length - 1] + "' />");

        pathConfig.push({
            caption: fileid,
            width: '120px',
            url: api.REMOVE_AVATAR,
            key: linkArr[linkArr.length - 1]
        });
    }


    $(".avatar .file-image").fileinput({
        deleteUrl: api.REMOVE_AVATAR,
        initialPreview: path,
        initialPreviewConfig: pathConfig,
        allowedFileExtensions: ['jpg', 'png', 'gif'],
        overwriteInitial: false,
        allowedFileTypes: ['image'],
        slugCallback: function (filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
    }).on('fileenabled', function () {
        $('.file-preview-thumbnails').css('position', 'relative');
        $('.file-preview-thumbnails').sortable({
            scroll: true,
            tolerance: 'pointer',
            update: function (event, ui) {
                $('.file-preview-frame').css('background', 'none');
                $(ui.item).find('img').parents('.file-preview-frame').css('background', '#eee');
            },
            helper: function (event, ui) {
                var $clone = $(ui).clone();
                $clone.css('position', 'absolute');
                return $clone.get(0);
            }
        });
        $('.imageListing .file-image').on('fileimageresizeerror', function (event, data, msg) {
            // get message
            showPropzyAlert(msg);
        });

        $('.imageListing .file-image').on('fileerror', function (event, data, msg) {
            showPropzyAlert(msg);
        });
        //$('.file-preview-frame').draggable();
    });
    $(".imageListing .file-image").fileinput('enable');


    $('#form-create-account').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            fullName: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: 'Bạn chưa nhập họ tên'
                    }
                }
            },
            email: {
                message: 'The email is not valid',
                validators: {
                    notEmpty: {
                        message: 'Bạn chưa nhập email'
                    }
                }
            },
            username: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: 'Bạn chưa nhập tên tài khoản'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'Bạn chưa nhập password'
                    },
                    identical: {
                        field: 'confirmPassword',
                        message: 'Nật khẩu không trùng khớp'
                    }
                }
            },
            confirmPassword: {
                validators: {
                    notEmpty: {
                        message: 'Bạn chưa nhập xác nhận mật khẩu'
                    },
                    identical: {
                        field: 'password',
                        message: 'Mật khẩu không trùng khớp'
                    }
                }
            }
        }
    });
    $('#finish').click(function () {
        $('textarea.signature').each(function () {
            var $textarea = $(this);
            $textarea.val(CKEDITOR.instances[$textarea.attr('name')].getData());
        });

        if ($('.avatar .file-preview-frame').length > 0) {
            if ($('.avatar .kv-upload-progress .progress-bar-success').length > 0) {
                if ($('.avatar .kv-upload-progress').find('.progress-bar-success').attr('aria-valuenow') < 100)
                {
                    showPropzyAlert('Quá trình upload ảnh chưa xong.');
                    return false;
                }
            }
        }
        prepareObject();
/*
        console.log(accountObject);
        console.log(stored);
        var dataCheckPos = {
            districtIds : getDistrictArray(accountObject.userDistricts),
            userId : detailAccount.userId,
            departmentIds : getDepartmentsArray(accountObject.departments)
        }*/
        updateUser();
        /*post_sync(api.CHECK_ASSIGN_DISTRICT, dataCheckPos, true, function (dataCheck) {
            showPropzyLoading();
            if (dataCheck.result) {
                hidePropzyLoading();
                if (departmentCheckPos(dataCheckPos.departmentIds) && checkAddDistricts()) {
                    html = '<p><input id="isForceAssign" type="checkbox" value="false"> Chuyển giao các tin đăng trước đó của tất cả quận cho tài khoản này.</p>';
                    showPropzyAlert(html, 'Chú ý', function () {
                        if($('#isForceAssign').is(':checked')) {
                            accountObject.isForceAssign = true;
                        }
                        updateUser();
                    }, 'Cập nhật');
                } else {
                    updateUser();
                }

            } else if (dataCheck.code === "500" ){
                hidePropzyLoading();
                showPropzyAlert(dataCheck.message);
            } else {
                hidePropzyLoading();
                var html = dataCheck.message;
                if (departmentCheckPos(dataCheckPos.departmentIds) && checkAddDistricts()) {
                    html = html.concat('<br><p><input id="isForceAssign" type="checkbox" value="false"> Chuyển giao các tin đăng trước đó của tất cả quận cho tài khoản này.</p>');
                }
                ModalConfirm.showModal({
                    message: html,
                    onYes: function (modal) {
                        if($('#isForceAssign').is(':checked')) {
                            accountObject.isForceAssign = true;
                        }
                        modal.modal("hide");
                        updateUser();
                    }
                });
            }
        });*/

    })

    $(document).on('click', "#btn-pos-choose-district", function (e) {
        e.preventDefault();
        ModalConfirm.showModal({
            message: "Bạn chắc chắn muốn chuyển giao tin đăng cho user mới",
            onYes: function (modal) {
                updateDistricUser();
            }
        });

    })

    $('#source').change(function () {
        if ($('#source').val() != "") {
            urlUserList = "/get-user/" + $('#source').val();
            var html = "<option value=''>---Vui lòng chọn----</option>";
            get_sync(urlUserList, true, function (data) {
                users = data['data'];
                console.log(users);
                if (data['result']) {

                    $.each(data['data'], function (index, value) {
                        html += '<option phone="' + value.phone + '" accountid="' + value.accountId + '" value="' + value.socialUid + '">' + value.name + '</option>';
                    });
                }
                $('#listuser').html(html).select2;

            });
        } else {
            var html = "<option value=''>---Không Có---</option>";
            $('#listuser').html(html).select2;
        }
    });
    $(".choose-department").change(function (event) {
        var parentId = $(this).attr("data-parent-id");
        var isChecked = $(this).prop('checked');
        var value = $(this).val();
        var myDepartmentId = currentUser.departments[0].departmentId;
        var isMine = (detailAccount.userId==currentUser.userId && myDepartmentId==value);
        if (isMine) {
            $(this).prop("checked", true);
            return false;
        }
        if (!isDepartmentsChecked()) {
            showPropzyAlert("Chọn department");
        }
    });
    showDepartment();
    getDistrictByCity();
    $('#city').change(function () {
        getDistrictByCity();
    });
});








