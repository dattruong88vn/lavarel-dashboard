// new for update info
const departmentsMap = new Map();
const tcsMap = new Map();
let departmentChooseArea = [];
let dbZones = null;
let dbTeams = null;
let dbDistricts = null;
let dbWards = null;
let districts = [];
let wards = [];
var manageZoneInstance = null;
var zoneInstance = null;
var teamInstance = null;
var tcInstance = null;
var cityInstance = null;
var districtInstance = null;
var wardInstance = null;
var departmentInstance = null;
var infoUserResponse = null;
var _isFirstLoad = true;
var updateData = {};
const updatePositionsContact = function (event, element) {
    event.stopPropagation();
    var userId = $(element).attr('data-userId');
    var parent = $(element).parents("ul");
    var positionIds = [];
    $(parent.find("li")).each(function () {
        var pos = $(this).find('.data-position').val();
        if ($(this).find('.data-position').is(":checked")) {
            positionIds.push(pos);
        }
    });
    updateData['userId'] = userId;
    updateData['positionIds'] = positionIds;

    showPropzyLoading();

    $.ajax({
        url: "/user/update-positions",
        data: JSON.stringify(updateData),
        type: "post"
    }).done(function (response) {
        if (response.result) {
        } else {
            showPropzyAlert(response.message);
        }
    }).always(function () {
        hidePropzyLoading();
    });
};
var dateTimeRender = function (data, type, object) {
    if (!data)
        return "";
    return $.format.date(new Date(data), "dd/MM/yyyy");
};
var renderLink = function (data, type, object) {
    return "<a href='/deal/detail/" + object.dealId + "'>" + data + "</a>";
};
function generateListUrl(userId, statusId, progressQuoIDs) {
    var baseUrl = "/user/get-list-deal/" + userId + '/' + statusId;
    var params = "";
    if (progressQuoIDs) {
        params += "progressQuoIDs=" + progressQuoIDs;
    }
    return baseUrl + "?" + params;
}
var showData = function (userId, statusId, progressQuoIDs) {
    $("#data-detail").DataTable().ajax.url(generateListUrl(userId, statusId, progressQuoIDs)).load();
    return false;
};

$(function () {
    var userId = $('#userId').val();
    $('#status-user').on('change', function () {
        var status = $('#status-user').val();
        var dataSend = {};
        dataSend['userId'] = userId;
        dataSend['statusId'] = status;
        showPropzyLoading();
        $.ajax({
            url: "/user/do-update-status-user",
            data: JSON.stringify(dataSend),
            type: "post"
        }).done(function (response) {
            if (response.result) {
                showPropzyAlert(response.message);
                $('#alertModal').on('hide.bs.modal', function () {
                    window.location.reload();
                });
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    var getList = function (limit = 10) {
        if ($("#data-detail").is(":visible")) {
        $("#data-detail").DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/user/get-list-deal/" + userId + "/-1?limit=" + limit,
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
                {data: 'dealId', orderable: false},
                {data: 'customerName', render: renderLink, orderable: false},
                {data: 'statusName'},
                {data: 'progressName'},
                {data: 'tmName'},
                {data: 'createdDate', render: dateTimeRender, orderable: false}
            ],
            "order": [[2, 'desc']],
            "language":
            {
                "search": "Tìm kiếm",
                "paginate": {
                    previous: "<",
                    next: ">",
                    first: "|<",
                    last: ">|"
                },
                "lengthMenu": "Hiển thị _MENU_ trên 1 trang",
                "searchPlaceholder": "ID, Tên KH",
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
        }
    };
    
    getList();
    $('#update-password').click(function (e) {
        e.preventDefault();
        $('#updatePassword').modal();
    });
    //
    $(".span-eyes").unbind("click").click(function () {
        $(this).parent().find('input').each(function () {
            if ($(this).attr('type') == 'password') {
                $(this).attr('type', 'text');
            } else {
                $(this).attr('type', 'password');
            }
        });
    });

    var validatePasswordOptions = {
        ignore: null,
        rules: {
            "old_password": {required: true},
            "password": {required: true},
            "confirm_password": {equalTo: "#user_pass"}
        },
        messages: {
            "old_password": {required: 'Vui lòng nhập Mật khẩu cũ'},
            "password": {required: 'Vui lòng nhập Mật khẩu'},
            "confirm_password": {equalTo: 'Xác nhận mật khẩu không trùng khớp'}
        }
    };

    var validateChangePassword = $("#form-update-pass-user").validate(validatePasswordOptions);

    $('#update-pass').on('click', function (event) {
        event.preventDefault();
        if (!validateChangePassword.form()) {
            return false;
        }
        var isValidated = true;
        var form = $('#form-update-pass-user');
        form.find('.errors').html('');
        var password = $('#user_pass').val();
        var partern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_])[a-zA-Z0-9!@#$%^&*()_]{8,20}$/;
        if (password.match(partern) == null) {
            $("#user_pass").parent().find('.errors').html('Mật khẩu bao gồm 8-20 ký tự, ít nhất 1 chữ thường, 1 chữ hoa, 1 số, và 1 ký tự đặc biệt, không dấu và không khoảng trắng');
            isValidated = false;
        }
        var dataPost = {};
        dataPost.userId = $('#userId').val();
        dataPost.oldPassword = $('#user_pass_old').val();
        dataPost.password = password;
        dataPost.rePassword = password;
        if (false === isValidated) {
            return false;
        }
        $.ajax({
            url: "/user/do-change-password",
            data: JSON.stringify(dataPost),
            type: "put"
        }).done(function (response) {
            if (response.result) {
                alert(response.message);
                location.href = '/logout';
            } else {
                alert(response.message);
            }
        });
    });
    $('#edit-infos').unbind('click').click(function(){
        PROPZY_JSON.loadProfile();
        $('#updateInfosContacts').modal('show');
    });
    $('#cancel-update-infos').unbind('click').click(function(){
        $('#updateInfosContacts').modal('hide');
    });
});
function renderHtmlAssignedDistrict(listDistrict) {
    $("#btn-pos-choose-district").hide();
    $("#tb-pos-choose-district").find("tbody").html("");
    let listTr = [];
    $.each(listDistrict, function (i, val) {
        const selectCase = "<select class='form-control select-case-assigned-district' data-user='" + val.userId + "' data-district='" + val.districtId + "'>" +
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
    if (listTr.length > 0) {
        $("#btn-pos-choose-district").show();
    }
}
$(document).on('click', "#btn-pos-choose-district", function (e) {
    e.preventDefault();
    ModalConfirm.showModal({
        message: "Bạn chắc chắn muốn chuyển giao tin đăng cho user mới",
        onYes: function (modal) {
            updateDistricUser();
        }
    });
});
function updateDistricUser() {
    const url = "/users/update-district-assigned";
    const data = {
        userId: null,
        list: []
    };
    data.userId = $("#user-id-update-district").val();
    $(".select-case-assigned-district").each(function (i, element) {
        if ($(element).val() != 0) {
            data.list.push({
                userId: $(element).data('user'),
                districtId: $(element).data('district'),
                updateCase: $(element).val(),
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
function parseMonth(mnth) {
    switch (mnth.toLowerCase()) {
        case 'january':
        case 'jan':
        case 'enero':
            return 1;
        case 'february':
        case 'feb':
        case 'febrero':
            return 2;
        case 'march':
        case 'mar':
        case 'marzo':
            return 3;
        case 'april':
        case 'apr':
        case 'abril':
            return 4;
        case 'may':
        case 'mayo':
            return 5;
        case 'jun':
        case 'june':
        case 'junio':
            return 6;
        case 'jul':
        case 'july':
        case 'julio':
            return 7;
        case 'aug':
        case 'august':
        case 'agosto':
            return 8;
        case 'sep':
        case 'september':
        case 'septiembre':
        case 'setiembre':
            return 9;
        case 'oct':
        case 'october':
        case 'octubre':
            return 10;
        case 'nov':
        case 'november':
        case 'noviembre':
            return 11;
        case 'dec':
        case 'december':
        case 'diciembre':
            return 12;
    }
    return mnth;
}
function HumanToEpoch2(strDate) {
    strDate = strDate.replace(/[\,]/g, '');
    strDate = strDate.replace(/^\s+|\s+$/g, '');
    strDate = strDate.replace(/ +(?= )/g, '');
    strDate = strDate.replace(/^(\d+)\./, '$1');
    var ok = 0;
    var skipDate = 0;
    var content = "";
    var date = "";
    var format = "";
    var yr = 1970;
    var mnth = 1;
    var dy = 1;
    var hr = 0;
    var mn = 0;
    var sec = 0;
    var dmy = 1;
    if (!ok) {
        var dateTimeSplit = strDate.split(" ");
        var dateParts = dateTimeSplit[0].split("-");
        if (dateParts.length === 1) dateParts = dateTimeSplit[0].split(".");
        if (dateParts.length === 1) {
            dmy = 0;
            dateParts = dateTimeSplit[0].split("/");
        }
        if (dateParts.length === 1) {
            dmy = 1;
            if (dateTimeSplit.length > 2) {
                if (dateTimeSplit[2].split(":").length === 1) {
                    strDate = strDate.replace(dateTimeSplit[0] + ' ' + dateTimeSplit[1] + ' ' + dateTimeSplit[2], dateTimeSplit[0] + '-' + dateTimeSplit[1] + '-' + dateTimeSplit[2]);
                    dateTimeSplit = strDate.split(" ");
                    dateParts = dateTimeSplit[0].split("-");
                }
            }
        }
        if (dateParts.length === 1) {
            dateParts = dateTimeSplit;
            if (dateTimeSplit.length > 3) timeParts = dateTimeSplit[4];
        }
        if (dateParts.length > 2) {
            if (dateParts[0] > 100) {
                yr = dateParts[0];
                mnth = parseMonth(dateParts[1]);
                dy = dateParts[2];
                format = "YMD";
            } else {
                if (dmy) {
                    dy = dateParts[0];
                    mnth = parseMonth(dateParts[1]);
                    yr = dateParts[2];
                    format = "DMY";
                    if ((!parseFloat(mnth)) || (!parseFloat(dy))) {
                        dy = dateParts[1];
                        mnth = parseMonth(dateParts[0]);
                        format = "MDY";
                    }
                } else {
                    mnth = parseMonth(dateParts[0]);
                    dy = dateParts[1];
                    yr = dateParts[2];
                    format = "MDY";
                    if ((!parseFloat(mnth)) || (!parseFloat(dy))) {
                        dy = dateParts[0];
                        mnth = parseMonth(dateParts[1]);
                        format = "DMY";
                    }
                }
            }
            ok = 1;
        }
        if (ok && dateTimeSplit[1]) {
            var timeParts = dateTimeSplit[1].split(":");
            if (timeParts.length >= 2) {
                hr = timeParts[0];
                mn = timeParts[1];
            }
            if (timeParts.length >= 3) {
                sec = timeParts[2];
            }
            if ((dateTimeSplit[2] && dateTimeSplit[2].toLowerCase() === "pm") && (parseFloat(hr) < 12)) hr = parseFloat(hr) + 12;
            if ((dateTimeSplit[2] && dateTimeSplit[2].toLowerCase() === "am") && (parseFloat(hr) === 12)) hr = 0;
        }
    }
    if (!ok) {
        date = new Date(strDate);
        if (date.getFullYear() > 1900) {
            ok = 1;
            skipDate = 1;
        }
    }
    if (ok) {
        if (!skipDate) {
            if (mnth !== parseFloat(mnth)) mnth = parseMonth(mnth);
            if (yr < 30) yr = 2000 + parseFloat(yr);
            if (yr < 200) yr = 1900 + parseFloat(yr);
            var usedGMT = 0;
            if (((strDate.toUpperCase().indexOf('GMT') > 0) || (strDate.toUpperCase().indexOf('UTC') > 0)) && (strDate.toUpperCase().indexOf('GMT+') == -1) && (strDate.toUpperCase().indexOf('UTC+') == -1)) {
                date = new Date(Date.UTC(yr, mnth - 1, dy, hr, mn, sec));
                usedGMT = 1;
            } else {
                date = new Date(yr, mnth - 1, dy, hr, mn, sec);
            }
        }
        content = date.getTime();
    }
    return content;
}
var allEntis = '';
var getAllEntities = function () {
    $.ajax({
        url: "/user-role/get-all-entities",
        async: false,
        type: "get"
    }).done(function (response) {
        allEntis = response.entities;
    });
};
getAllEntities();
var initSelectRoles = function () {
    $("#roles").selectize({
        plugins: ['remove_button'],
        create: false,
        onItemRemove: function (data) {
            var arr = data.split('-');
            var id = arr[0];
            var name = arr[1];
            var input_entity = $('#table-permission #input_entity').get();
            for (var i = 0; i < input_entity.length; i++) {
                if (id == $(input_entity[i]).val()) {
                    $(input_entity[i]).parent().parent().remove();
                }
            }
        },
        onItemAdd: function (value, item) {
            $('#table-permission').removeClass('quick-add-layout');
            var object_entiti = {};
            var arr = value.split('-');
            var id = arr[0];
            var name = arr[1];
            $.each(allEntis, function (key, val) {
                if (id == val['id']) {
                    object_entiti = val;
                }
            });
            var html = '<tr>';
            html += '<td>';
            html += '<input type="hidden" id="input_entity" value="' + object_entiti.id + '" />';
            html += object_entiti.name;
            html += '</td>';
            $.each(object_entiti.actions, function (k, v) {
                html += '<td>';
                html += '<input type="hidden" name="' + v.actionName.toLowerCase() + '_action" id="input_action" value="' + v.actionId + '" />';
                html += '<select id="select_permission" name="' + v.actionName.toLowerCase() + '_permission" class="form-control select2" style="width: 100%;">';
                html += '<option entityid="-1" actionid="-1" value="-1">--Chọn--</option>';
                $.each(v.permissions, function (ke, va) {
                    html += '<option entityid="' + object_entiti.id + '" actionid="' + v.actionId + '" value="' + va.permissionId + '" >';
                    html += va.permissionName;
                    html += '</option>';
                });
                html += '</select>';
                html += '</td>';
            });
            html += '</tr>';
            $('#table-permission tbody').append(html);
        }
    });
    return false;
};
initSelectRoles();
function saveUserPermissions(userId) {
    var postData = {
        "userId": userId
    };
    var privatePermissions = [];
    var permissions = $('#table-permission #select_permission').get();
    for (var i = 0; i < permissions.length; i++) {
        if ($(permissions[i]).val() != -1) {
            var element = $("option:selected", $(permissions[i]));
            var entityId = element.attr("entityid");
            var actionId = element.attr("actionid");
            privatePermissions.push({
                "entityId": entityId,
                "actionId": actionId,
                "permissionId": $(permissions[i]).val()
            });
        }
    }
    postData.permissions = privatePermissions;
    $.ajax({
        url: "/user/save-permissions",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            $('#modalMyPermissions').modal('hide');
        }
    }).always(function () {
        hidePropzyLoading();
    });
}
$("#btn-save-my-permissions").on("click", function (event) {
    event.preventDefault();
    saveUserPermissions($("#userId").val());
});
$("#btn-show-permissions").on("click", function (event) {
    event.preventDefault();
    $("#modalMyPermissions").modal();
});
let modalStep = 1;
const confirmBSA = (step) => {
    modalStep = step;
    $('#confirmBSAModal').modal();
}
const reassignAndNext = () => {
    $('#confirmBSAModal').modal('hide');
    switch (modalStep) {
        case 1:
            showTransferDealsModal();
            break;
        case 2:
            showReceiveListingsModal();
            break;
        default:
            break;
    }
};
