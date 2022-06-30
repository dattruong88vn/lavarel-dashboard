$(".panelCallButton").hide();
function renderStatusName(data, type, object) {
    //console.log(object);
    data = " <a class='show-popup' target='_blank' href='/order/contact/" + orderId + "/" + object.contactId + "'> ( " + data + " )</a>";
    return data;
}

var showData = function (statusId) {
    $("#lead-list").DataTable().ajax.url("lead/get-list-lead/" + statusId + "").load();
    return false;
}
function renderSelect(data, type, object) {
    //console.log(object);
    data = "<input type='checkbox' class='select-contact' value='" + object.saleEmail + "' data-phone='" + object.phone + "' data-name='" + object.name + "' />";
    return data;
}

function renderAction(data, type, object) {
    data = "<button class='btn btn-success btnNote' data-contact-id=" + object.contactId + ">Tạo note đăng ký</button>";
    return data;
}

$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#_token').val()
        }
    });


    $(".file-image").fileinput({
        deleteUrl: "/imageListingRemover",
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
    $(".file-image").fileinput('enable');

    $(".seeonmap").on("click", function () {
        var parent = $(this).parents('form');
        var lat = $.trim($(parent).find('#latitude').val());
        var lng = $.trim($(parent).find('#longitude').val());
        if (lat !== "" && lng !== "") {
            var link = 'https://www.google.com/maps/?q=' + lat + ',' + lng;
            window.open(link);
        }
        return false;
    });

    /*
     Address with google
     */
    $("#address").geocomplete().bind("geocode:result", function (event, result) {
        var parent = $(this).parents('form');
        $(parent).find('#latitude').val(result.geometry.location.lat());
        $(parent).find('#longitude').val(result.geometry.location.lng());
    });


    $("#callAgent").on("click", function (event) {
        event.preventDefault();
        var postData = {
            orderId: orderId,
            statusId: 5
        };
        post_sync("/order/call", postData, true, function (response) {
            //showPropzyAlert(response.message);
        });
        $(".panelCallButton").show();
    });
    $(".btn-save-note").on("click", function (event) {
        event.preventDefault();

        var form = "#formContactNote";
        var postData = {
            "orderId": orderId,
            "contactId": $(form + " #contactId").val(),
            "address": $(form + " #address").val(),
            "latitude": $(form + " #latitude").val(),
            "longitude": $(form + " #longitude").val(),
            "name": $(form + " #name").val(),
            "phone": $(form + " #phone").val(),
            "photo": null,
            "note": $(form + " #note").val()
        };
        //console.log(postItem);
        //return;

        if ($('.file-preview-frame').length == 0)
        {
            $('.imageListing .errors').html('Vui lòng chọn ít nhất một tấm ảnh');
            $('.imageListing').focus();
            return false;
        }
        if ($('.imageListing').find('.kv-upload-progress .progress-bar-success').length > 0) {
            if ($('.imageListing .kv-upload-progress').find('.progress-bar-success').attr('aria-valuenow') < 100)
            {
                $('.imageListing .errors').html('Quá trình upload ảnh chưa xong!');
                return false;
            }
        }



        if (validateformContactNote()) {
            var photos = [];
            $(".imageListing .file-preview .file-preview-initial").each(function (idx, element) {
                var fileName = $(element).find("img").attr('src');
                photos.push(fileName);
            });
            postData.photo = JSON.stringify(photos);

            showPropzyLoading();
            $.ajax({
                url: "/order/create-note",
                type: "POST",
                data: JSON.stringify(postData)
            }).done(function (response) {
                showPropzyAlert(response.message);
                if (response.result) {
                    $("#modalContactNote").modal('hide');
                }
            }).always(function () {
                hidePropzyLoading();
            });
        }
    });

    $("#order-list").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/order/get-status-detail/" + orderId + "/" + statusId,
        "scrollX": true,
        "searching": false,
        "ordering": false,
        "lengthChange": false,
        "columns": [
            {data: 'saleEmail', render: renderSelect},
            {data: 'name'},
            {data: 'phone'},
            {data: 'email'},
            {data: 'saleName'},
            {data: 'saleName', render: renderAction}
        ]
    }).on('draw.dt', function () {
        $(".btnNote").on("click", function (event) {
            event.preventDefault();
            var contactId = $(this).attr('data-contact-id');
            $("#modalContactNote").find("#contactId").val(contactId);
            $("#modalContactNote").modal();
        });
    });
    $(".btn-export").click(function () {
        showPropzyLoading();
        $.post("/report/export-report/lead-list----1", {}, function (response) {
            if (response.result) {
                window.location.href = response.data.linkFile;
            } else {
                alert(response.message);
            }
            hidePropzyLoading();
        });
        return false;
    });

    $(".notifyLsContact").on("click", function (event) {
        event.preventDefault();
        showPropzyLoading();
        $.ajax({
            'url': '/order/notify-ls-contact/' + orderId,
            'type': 'GET'
        }).done(function (response) {
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $(".notifyListingMisMatch").on("click", function (event) {
        event.preventDefault();
        var items = [];
        $(".select-contact:checked").each(function () {
            var item = {
                "saleEmail": $(this).val(),
                "phone": $(this).attr("data-phone"),
                "name": $(this).attr("data-name")
            };
            items.push(item);
        });
        if (items.length <= 0) {
            showPropzyAlert("Phải chọn môi giới");
            return false;
        }
        postData = {
            orderId: orderId,
            listEmail: items
        };
        showPropzyLoading();
        $.ajax({
            url: '/order/notify-listing-mismatch',
            type: 'POST',
            data: JSON.stringify(postData)
        }).done(function (response) {
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });

    });
});


function validateformContactNote() {
    var formSelector = "#formContactNote";
    var isValidated = true;
    $(formSelector + " input.required").each(function () {
        var value = $(this).val();
        $(this).parent().find(".errors").html("");
        if (value.trim() === "") {
            $(this).parent().find(".errors").html("Vui lòng nhập!");
            isValidated = false;
        }
    });
    return isValidated;
}


function initShowPopUp() {

    $(".show-popup").on("click", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        showPropzyLoading();
        $.ajax({
            url: url,
            type: "GET",
        }).done(function (response) {
            showPropzyAlert(response, "Thông tin contact");
        }).always(function () {
            hidePropzyLoading();
        });

    });

}