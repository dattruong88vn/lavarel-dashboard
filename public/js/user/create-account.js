$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#token').val()
    }
});

var accountObject = {
    "name": '',
    "email": '',
    "photo": null,
    "userName": '',
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

$(document).ready(function () {
    $(".select2").select2();
    $(".file-image").fileinput({
        deleteUrl: "/user/remove-avatar",
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
            },
        });
    });

    $('#form-create-account').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            //valid: 'glyphicon glyphicon-ok',
            //invalid: 'glyphicon glyphicon-remove',
            //validating: 'glyphicon glyphicon-refresh'
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
            phone : {
                message: 'The phone number is not valid',
                validators: {
                    notEmpty: {
                        message: 'Bạn chưa nhập số điện thoại'
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
});



var post_sync = function (url, data, isSync, completed) {
    $(".modal-overlay").show();
    $.ajax({
        type: 'POST',
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
};
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
};
$('#finish').click(function () {
    if ($('.avatar .file-preview-frame').length > 0) {
        if ($('.avatar .kv-upload-progress .progress-bar-success').length > 0) {
            if ($('.avatar .kv-upload-progress').find('.progress-bar-success').attr('aria-valuenow') < 100)
            {
                showPropzyAlert('Quá trình upload ảnh chưa xong.');
                return false;
            }
        }
    }
    var prepare = prepareObject();
    checkUsernameExisted();
});

$(document).on('click', "#btn-pos-choose-district", function (e) {
    e.preventDefault();
    ModalConfirm.showModal({
        message: "Bạn chắc chắn muốn chuyển giao tin đăng cho user mới",
        onYes: function (modal) {
            updateDistricUser();
        }
    });

})

function checkUsernameExisted() {
    urlCheck = "/checkUserName/" + $('#username').val();
    get_sync(urlCheck, true, function (data) {
        console.log(data);
        if (data['result'] == true) {
            createAccount(accountObject);
            //checkAssignDistrict(accountObject);
        } else {
            showPropzyAlert("Tài khoản này đã tồn tại, xin vui lòng nhập lại");
        }
    });
}
/*function checkAssignDistrict(accountObject) {
    var urlcheckAssignDistrict = "/account-manager/check-assign-district";
    var dataCheckPost = {
        districtIds : getDistrictArray(accountObject.userDistricts),
        userId : user.userId,
        departmentIds : getDepartmentsArray(accountObject.departments)
    }
    // remove check district
    post_sync(urlcheckAssignDistrict, dataCheckPost, true, function (dataCheck) {
        showPropzyLoading();
        if (dataCheck.result) {
            hidePropzyLoading();
            if (departmentCheckPos(dataCheckPost.departmentIds)) {
                var html = '<p><input id="isForceAssign" type="checkbox" value="false"> Chuyển giao các tin đăng trước đó của tất cả quận cho tài khoản này.</p>';
                showPropzyAlert(html, 'Chú ý', function () {
                    if($('#isForceAssign').is(':checked')) {
                        accountObject.isForceAssign = true;
                    }
                    createAccount(accountObject);
                }, 'Cập nhật');
            } else {
                createAccount(accountObject);
            }
        } else if (dataCheck.code === "500" ){
            hidePropzyLoading();
            showPropzyAlert(dataCheck.message);
        } else {
            hidePropzyLoading();
            var html = dataCheck.message;
            if (departmentCheckPos(dataCheckPost.departmentIds)) {
                html = dataCheck.message.concat('<br><p><input id="isForceAssign" type="checkbox" value="false"> Chuyển giao các tin đăng trước đó của tất cả quận cho tài khoản này.</p>');
            }

            ModalConfirm.showModal({
                message: html,
                onYes: function (modal) {
                    if($('#isForceAssign').is(':checked')) {
                        accountObject.isForceAssign = true;
                    }
                    modal.modal("hide");
                    createAccount(accountObject);
                }
            });
        }
    });
}*/
function departmentCheckPos(departmentIds) {
    const isPos = departmentIds.find(it=> {
        return [14, 15, 16, 17].indexOf(it) > -1;
    });
    if(isPos) {
        return true;
    }
    return false;
}

function createAccount(object) {
    postUrl = "/create-new-account";
    showPropzyLoading();
    const department = getDepartmentsArray(object.departments);
    post_sync(postUrl, object, true, function (data) {
        hidePropzyLoading();
        if (data.result == true) {
            if (departmentCheckPos(department)) {
                // only for Pos open modal to choose option
                if (data.data.existingDistrictUsers && data.data.existingDistrictUsers.length > 0) {
                    // open modal
                    $("#pos-choose-district-modal").modal();
                    // render options
                    $("#user-id-update-district").val(data.data.userId);
                    renderHtmlAssignedDistrict(data.data.existingDistrictUsers);
                } else {
                    showPropzyAlert("Bạn đã tạo thành công account", 'Thông báo', function () {
                        location.reload();
                    });
                }
            } else {
                showPropzyAlert("Bạn đã tạo thành công account", 'Thông báo', function () {
                    location.reload();
                });
            }
        } else if(data.code == 409) {
            // tồn tại account trên portal
            ModalConfirm.showModal({
                message: data.message,
                onYes: function (modal) {
                    accountObject.forceConnect = true;
                    createAccount(accountObject);
                },
                onNo : function (modal) {
                    accountObject.autoCreateAgent = false;
                    accountObject.forceConnect = false;
                    createAccount(accountObject);
                }
            });
        } else {
            showPropzyAlert(data.message);
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

function prepareObject() {

    accountObject.name = $('#fullName').val() != "" ? $('#fullName').val() : '';
    accountObject.email = $('#email').val() != "" ? ($('#email').val()).split("@")[0] + "@propzy.com" : '';
    accountObject.phone = $('#phone').val() != "" ? $('#phone').val() : '';
    accountObject.signature = $('#signature').val() != "" ? $('#signature').val() : '';
    accountObject.skype = $('#skype').val() != "" ? $('#skype').val() : '';
    accountObject.zalo = $('#zalo').val() != "" ? $('#zalo').val() : '';
    accountObject.userName = $('#username').val() != "" ? $('#username').val() : '';
    accountObject.password = $('#password').val() != "" ? $('#password').val() : '';

    accountObject.voipId = $('#voipId').val() != "" ? $('#voipId').val() : '';
    accountObject.voipPassword = $('#voipPassword').val() != "" ? $('#voipPassword').val() : '';

    if(isTMorCrm == 1) {
        if ($("#autoCreateAgent").is(":checked")) {
            accountObject.autoCreateAgent = true;
        } else {
            accountObject.autoCreateAgent = false;
            accountObject.socialUid = $("#listuser :selected").val() ? parseInt($("#listuser :selected").val()) : '';
        }
    } else {
        accountObject.autoCreateAgent = false;
        accountObject.socialUid = $("#listuser :selected").val() ? parseInt($("#listuser :selected").val()) : '';
    }

    //For district
    var districts = [];
    var districtsList = $("#district").select2().val();
    if (districtsList != null) {
        for (var i = 0; i < districtsList.length; i++) {
            districts.push({"id": {"districtId": districtsList[i]}});
        }
    }
    //End

    //For departments

    var departments = [];
    $.each($("input[name='choose[]']:checked"), function () {
        var departmentId = $(this).val();
        var hasChildrenChecked = false;
        $(".choose-department.has-parent:checked").each(function () {
            if ($(this).attr("data-parent-id") == departmentId) {
                hasChildrenChecked = true;
            }
        });
        if (!hasChildrenChecked) {
            departments.push({"departmentId": departmentId, "isGroupAdmin": false});
        }
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
    var permissions = $('#table-permission .select_permission').get();
    for (var i = 0; i < permissions.length; i++) {
        if ($(permissions[i]).val() != -1) {
            var element = $("option:selected", $(permissions[i]));
            var entityId = element.attr("entityid");
            var actionId = element.attr("actionid");
            privatePermissions.push({"id": {"entityId": entityId, "actionId": actionId}, "permissionId": $(permissions[i]).val()});
        }
    }
    //End
    accountObject.privatePermissions = privatePermissions;
    accountObject.userDistricts = districts;
    accountObject.departments = departments;
    accountObject.cityId = $("#city").select2().val();
    //console.log(accountObject);

    $(".avatar .file-preview .file-preview-initial").each(function (idx, element) {
        accountObject.photo = $(element).find("img").data("src");
    });
    console.log(accountObject);
    return true;
}
$(function () {
    if(document.getElementById("autoCreateAgent")) {
        $(".autoCreateAgent-group").hide();
        $(document).on("change", "#autoCreateAgent", function (e) {
            e.preventDefault();
            if($(this).is(":checked")) {
                $(".autoCreateAgent-group").hide();
            } else {
                $(".autoCreateAgent-group").show();
                $('#source').val(4).trigger("change");
            }
        });
    } else {
        $(".autoCreateAgent-group").show();
    }
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
    $('#city').change(function () {
        if ($('#city').val() != "") {
            getUrl = "/get-district/" + $(this).val();
            var html = "<option value=''>---Vui lòng chọn----</option>";
            get_sync(getUrl, true, function (data) {
                items = data;
                $.each(items, function (index, value) {
                    html += '<option value=' + value.districtId + '">' + value.districtName + '</option>';
                });
                $('#district').html(html).select2();

            });
        } else {
            var html = "<option value=''>---Không Có---</option>";
            $('#listuser').html(html).select2;
        }
    });

    $(".choose-department").change(function (event) {
        var parentId = $(this).attr("data-parent-id");
        var isChecked = $(this).prop('checked');
        var isMine = $(this).hasClass("my-department");
        if (isMine) {
            $(this).prop("checked", true);
            return false;
        }
        if (isChecked) {
            $(".choose-department-" + parentId).prop('checked', true);
        } else {
            unCheckedParentDepartment(parentId);
            if (!isDepartmentsChecked()) {
                showPropzyAlert("Chọn department");
            }
        }
    });

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
    showDepartment();
});
