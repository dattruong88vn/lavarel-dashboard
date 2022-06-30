var tableDiys = null;
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    //$("#example1").DataTable();
    var url = "/diy/get-list-data";
    loadDataTableDiy(url);
    $('#modal-gallery').on('shown.bs.modal', function () {
        jssor_1_slider_init();
    });
    $(".btnSaveDiyAccount").on("click", function (event) {
        event.preventDefault();
        var modal = $("#modal-create-account");
        var postData = {
            "sourceType": modal.find(".sourceType").val(),
            "id": modal.find(".id").val(),
            "email": modal.find(".email").val(),
            "name": modal.find(".name").val(),
            "phone": modal.find(".phone").val()
        };
        $(".errors").html("");
        var isValid = true;
        if (!postData.name) {
            modal.find(".name").parent().find(".errors").html("Nhập tên");
            isValid = false;
        }
        if (!postData.email) {
            modal.find(".email").parent().find(".errors").html("Nhập email");
            isValid = false;
        }
        if (!postData.phone) {
            modal.find(".phone").parent().find(".errors").html("Nhập số điện thoại");
            isValid = false;
        }
        if (!isValid) {
            return false;
        }
        showPropzyLoading();
        $.ajax({
            url: "/diy/create-diy-account",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            showPropzyAlert(response.message);
            if (response.result) {
                tableDiys.ajax.reload();
                modal.modal('hide');
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
});
function loadDataTableDiy(url) {
    try {
        tableDiys.destroy();
    } catch (Ex) {
    }
    tableDiys = $('#tableDiys').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": true,
        "scrollX": true,
        'orderCellsTop': true,
        "processing": true,
        "serverSide": true,
        "ajax": url,
        "order": [[0, 'desc']],
        "columns": [
            {data: "createdDate", render: dateRender, orderable: true},
            {data: "name", render: renderName, orderable: false, width: "120px"},
            {data: "address", render: renderAddress, orderable: false, width: "160px"},
            //{data: "wardName", orderable: false},
            //{data: "districtName", orderable: false},
            {data: "phone", render: renderPhone, orderable: false},
            //{data: "photos", render: renderPhotos, orderable: false},
            {data: "sourceName", orderable: false},
            {data: "isSend", render: renderIsSent, orderable: true},
            {data: "updatedDateDiy", render: dateRender, orderable: false},
            {data: "statusId", render: renderStatus, orderable: true},
            //{data: "isGuaranteed", render: renderGuaranteed, orderable: true},
            {data: "rlistingId", render: renderLid, orderable: false},
            {data: "updatedDate", render: dateRender, orderable: false},
            //{data: "id", render: renderButtonCreateAccount, orderable: false},
            {data: "id", render: renderButtonCancel, orderable: false}

        ],
        "createdRow": function (row, data, index) {
            if (data.isGuaranteed) {
                $(row).addClass("isGuaranteed");
            }
        }
    });
    tableDiys.on('draw', function (event) {
        $('.is-sent').change(function () {
            var value = $(this).val();
            var postData = {
                "sourceType": $(this).attr("data-source-type"),
                "id": $(this).attr("data-id"),
                "isSend": (value == 1 ? true : false)
            };
            showPropzyLoading();
            console.log(postData);
            $.ajax({
                "url": "/diy/update-sent",
                type: "post",
                data: JSON.stringify(postData)
            }).done(function (response) {
                if (!response.result) {
                    showPropzyAlert(response.message);
                }
            }).always(function () {
                hidePropzyLoading();
            });
        });
        $('.status').change(function () {
            var value = $(this).val();
            var postData = {
                "sourceType": $(this).attr("data-source-type"),
                "id": $(this).attr("data-id"),
                "statusId": value,
                "socialUid": $(this).attr("data-social-uid")
            };
            showPropzyLoading();
            console.log(postData);
            $.ajax({
                "url": "/diy/update-status",
                type: "post",
                data: JSON.stringify(postData)
            }).done(function (response) {
                if (!response.result) {
                    showPropzyAlert(response.message);
                }
            }).always(function () {
                hidePropzyLoading();
            });
        });
    });
    $('#tableDiys_wrapper .row-filter select').on('change', function (event) {
        var row = $(this).parents('tr');
        var sourceName = row.find('.sourceName').val() + '';
        if (sourceName == 'null' || sourceName.startsWith(',')) {
            sourceName = '';
        }
        var isSend = row.find('.isSend').val() + '';
        if (isSend == 'null' || isSend.startsWith(',')) {
            isSend = '';
        }
        var statusId = row.find('.statusId').val() + '';
        if (statusId == 'null' || statusId.startsWith(',')) {
            statusId = '';
        }
        var url = "/diy/get-list-data?sourceName=" + sourceName + "&isSend=" + isSend + "&statusId=" + statusId;
        loadDataTableDiy(url);
    });
}

var renderName = function (data, type, object) {
    return "<a href='/diy/detail/" + object.id + "?sourceType=" + object.sourceType + "' >" + data + "</a>";
};
var renderPhone = function (data, type, object) {
    return "<div>" + (object.phone ? object.phone : "") + "</div><div>" + (object.email ? object.email : "") + "</div>";
};
var renderLid = function (data, type, object) {
    if (!data) {
        return "";
    }
    return "<a href='/listing/" + object.rlistingId + "' target='_blank' >" + data + "</a>";
};
var renderIsSent = function (data, type, object) {
    if (object.isSend) {
        return "Đã gửi";
    }

    var includeStatus = [
        1
    ];
    if ($.inArray(object.sourceType, includeStatus) == -1) {
        return "";
    }
    var itemData = {
        id: object.id,
        sourceType: object.sourceType,
        name: object.name,
        email: object.email,
        phone: object.phone
    };
    return "<button class='btn btn-success' onclick=\"return showCreateAccountModal(this);\" data-item='" + JSON.stringify(itemData) + "' >Tạo</button>";
    // để back up
    var returnValue = "<select class='is-sent' data-id='" + object.id + "' data-source-type='" + object.sourceType + "'>";
    for (var x in sentStatusList) {
        returnValue += "<option value='" + x + "' " + (data == x ? "selected" : "") + ">" + sentStatusList[x] + "</option>";
    }
    returnValue += "</select>";
    return returnValue;
};
var renderGuaranteed = function (data, type, object) {
    if (data == undefined || data == null) {
        return "";
    }
    var returnValue = (data ? "" : "không") + " độc quyền";
    return returnValue;
};
var renderStatus = function (data, type, object) {
    /*
     if (object.id == 7) {
     console.log(object);
     }
     */
    if (data == null || object.rlistingId) {
        return "";
    }
    if (data == "1") {
        return "Unlocked";
    }
    /*
     var returnValue = "<select class='status' data-id='" + object.id + "' data-source-type='" + object.sourceType + "' data-social-uid='" + object.socialUid + "'>";
     for (var x in statusList) {
     returnValue += "<option value='" + x + "' " + (data == x ? "selected" : "") + ">" + statusList[x] + "</option>";
     }
     returnValue += "</select>";
     */
    var returnValue = "<button onclick=\"return unlock(this, " + object.id + ", " + object.sourceType + ", " + object.socialUid + ");\">Unlock</button>";
    return returnValue;
};
var renderPhotos = function (data, type, object) {
    if (!data) {
        return "";
    }
    return "<a href='#' onclick=\"showSlider(this);\" >Xem hình</a><input type='hidden' class='photos-data' value='" + data + "' />";
};
var renderAddress = function (data, type, object) {
    if (!data) {
        if (object.fullAddress) {
            data = object.houseNumber + " " + object.fullAddress;
        } else {
            return "";
        }
    }
    var returnValue = "";
    if (object.photos) {
        var returnValue = "<a href='#' onclick=\"showSlider(this);\" >" + data + "</a>";
        returnValue += "<input type='hidden' class='photos-data' value='" + object.photos + "' />";
    } else {
        returnValue = data;
    }
    return returnValue;
};
var renderButtonCreateAccount = function (data, type, object) {
    var includeStatus = [
        1
    ];
    if ($.inArray(object.sourceType, includeStatus) == -1) {
        return "";
    }
    var itemData = {
        id: object.id,
        sourceType: object.sourceType,
        name: object.name,
        email: object.email,
        phone: object.phone
    };
    console.log(itemData);
    return "<button class='btn btn-success' onclick=\"return showCreateAccountModal(this);\" data-item='" + JSON.stringify(itemData) + "' >Tạo</button>";
};

var renderButtonCancel = function (data, type, object) {
    return "<button class='btn btn-danger' onclick=\"return cancelDiy('" + object.sourceType + "','" + object.id + "');\" >Hủy</button>";
};
function showSlider(selector) {
    var html = "";
    var photos = $(selector).parents('td').find(".photos-data").val();
    if (photos == null) {
        return;
    }
    //console.log(photos);
    var arrPhotos = photos.split(',');
    console.log(arrPhotos);
    for (var i = 0; i < arrPhotos.length; i++) {
        var photo = arrPhotos[i];
        html += '<div><p data-u="image" class="ch-img-diy"><img style="background-image: url(' + photo + ')" src="/images/diy-slider/blank.png" /></p><img data-u="thumb" src="' + photo + '" /></div>';
    }
    var sliderTemplate = $(".sliderTemplate").html();
    $('#modal-gallery .modal-body').html(sliderTemplate);
    $('#modal-gallery .slide-photos').html(html);
    var randomId = "slider_" + Math.floor((Math.random() * 1000) + 1);
    $('#modal-gallery .modal-body').find(".slider_main").attr('id', randomId);
    jssor_1_slider_init(randomId);
    $('#modal-gallery').modal();
}

jssor_1_slider_init = function (sliderId) {

    var jssor_1_options = {
        $AutoPlay: true,
        $SlideshowOptions: {
            $Class: $JssorSlideshowRunner$,
        },
        $ArrowNavigatorOptions: {
            $Class: $JssorArrowNavigator$
        },
        $ThumbnailNavigatorOptions: {
            $Class: $JssorThumbnailNavigator$,
            $Cols: 10,
            $SpacingX: 8,
            $SpacingY: 8,
            $Align: 360
        }
    };
    var jssor_1_slider = new $JssorSlider$(sliderId, jssor_1_options);
    /*responsive code begin*/
    /*you can remove responsive code if you don't want the slider scales while window resizing*/
    function ScaleSlider() {
        var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
        if (refSize) {
            refSize = Math.min(refSize, 800);
            jssor_1_slider.$ScaleWidth(refSize);
        } else {
            window.setTimeout(ScaleSlider, 30);
        }
    }
    ScaleSlider();
    $Jssor$.$AddEvent(window, "load", ScaleSlider);
    $Jssor$.$AddEvent(window, "resize", ScaleSlider);
    $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
    /*responsive code end*/
};
function showCreateAccountModal(selector) {
    var modal = $("#modal-create-account");
    var item = JSON.parse($(selector).attr("data-item"));
    modal.find(".errors").html("");
    console.log(item);
    modal.find(".sourceType").val(item.sourceType);
    modal.find(".id").val(item.id);
    modal.find(".name").val(item.name);
    modal.find(".email").val(item.email);
    modal.find(".phone").val(item.phone);
    modal.modal();
}

function cancelDiy(sourceType, id) {
    if (!confirm("Bạn có chắc muốn hủy?")) {
        return;
    }
    var postData = {
        "sourceType": sourceType,
        "id": id
    };
    showPropzyLoading();
    $.ajax({
        url: "/diy/delete",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
            tableDiys.ajax.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });
}


function unlock(selector, id, sourceType, socialUid) {
    var postData = {
        "sourceType": sourceType,
        "id": id,
        "statusId": 1,
        "socialUid": socialUid
    };
    showPropzyLoading();
    console.log(postData);
    $.ajax({
        "url": "/diy/update-status",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (!response.result) {
            showPropzyAlert(response.message);
        } else {
            $(selector).parents("td").html("Unlocked");
        }
    }).always(function () {
        hidePropzyLoading();
    });
}