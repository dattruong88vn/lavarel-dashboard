$("#ward").change(function () {
    var wardId = $(this).val();
    getStreets(wardId, function (response) {
        if (oldStreet) {
            $("#streetId").val(oldStreet.streetId).change();
            console.log(oldStreet);
        }
    });
});
$("#ward").trigger("change");
var path = [];
if (json_path != "") {
    $(json_path).each(function (index, item) {
        linkArr = item.link.split("/");
        fileid = linkArr[linkArr.length - 1].split(".");
        path.push("<img src='" + item.link + "' class='file-preview-image' fileid='" + fileid[fileid.length - 2] + "' name='" + fileid[fileid.length - 2] + "' alt='" + linkArr[linkArr.length - 1] + "' title='" + linkArr[linkArr.length - 1] + "' /> <div class='checkbox'><label><input class='isPrivatePhoto' name='isPrivatePhoto' id='isPrivatePhoto' " + (item.isPrivate ? "checked" : "") + " type='checkbox'>  Riêng Tư</label></div>");

    });
    var pathConfig = [];
    $(json_path).each(function (idx, item) {
        linkArr = item.link.split("/");
        pathConfig.push({
            caption: item.caption,
            width: '120px',
            url: "/imageListingRemover",
            key: linkArr[linkArr.length - 1]
        })
    });
}
;
if (json_path_video != "") {
    var path_video = [];
    linkVideo = json_path_video[0].split("/");
    fileidVideo = linkVideo[linkVideo.length - 1].split(".");
    path_video.push("<video width='213px' height='160px' controls title='" + linkVideo[linkVideo.length - 1] + "'><source name='" + fileidVideo[fileidVideo.length - 2] + "' title='" + linkVideo[linkVideo.length - 1] + "' src='" + json_path_video[0] + "' type='video/mp4'><div class='file-preview-other'><span class='file-icon-4x'><i class='glyphicon glyphicon-file'></i></span></div></video>");
    var path_video_config = [];
    path_video_config.push({
        caption: "",
        key: linkVideo[linkVideo.length - 1]
    });
}
;
// $(function () {
//     $("#table-staff").DataTable();
//     $("#calenda").daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'DD/MM/YYYY h:mm A'});
//   }); 
$(".file-image-update").fileinput({
    showUpload: false,
    deleteUrl: "/imageListingRemover",
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
        },
    });

    $('.file-image-update').on('fileimageresizeerror', function (event, data, msg) {
        console.log(data.id);
        console.log(data.index);
        // get message
        alert(msg);
    });

    $('.file-image-update').on('fileerror', function (event, data, msg) {
        console.log(data.id);
        console.log(data.index);
        console.log(data.file);
        console.log(data.reader);
        console.log(data.files);
        // get message
        alert(msg);
    });
    //$('.file-preview-frame').draggable();
});
$(".file-image-update").fileinput('lock');

$(".file-video").fileinput({
    deleteUrl: "/videoListingRemover",
    allowedFileExtensions: ['mp4'],
    overwriteInitial: false,
    initialPreviewConfig: path_video_config,
    initialPreview: path_video,
    maxFileSize: 20000000,
    maxFilesNum: 1,
    allowedFileTypes: ['video'],
    slugCallback: function (filename) {
        return filename.replace('(', '_').replace(']', '_');
    }
});
$(".file-video").fileinput('lock');
console.log(path);


function initFileImage(selector, initItem) {

    var photoPath = [];
    var pathConfig = [];
    if (initItem) {
        $(initItem).each(function (index, item) {
            console.log(item);
            linkArr = item.split("/");
            fileid = linkArr[linkArr.length - 1].split(".");
            photoPath.push("<img src='" + item + "' class='file-preview-image' fileid='" + fileid[fileid.length - 2] + "' name='" + fileid[fileid.length - 2] + "' alt='" + linkArr[linkArr.length - 1] + "' title='" + linkArr[linkArr.length - 1] + "' />");
            pathConfig.push({
                caption: item.caption,
                width: '120px',
                url: "/imageListingRemover",
                key: linkArr[linkArr.length - 1]
            })

        });
    }
    $(selector + " .file-image").fileinput({
        initialPreview: photoPath,
        initialPreviewConfig: pathConfig,
        allowedFileExtensions: ['jpg', 'png', 'gif'],
        overwriteInitial: false,
        allowedFileTypes: ['image'],
        slugCallback: function (filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
    });
    $(selector + ".file-image").fileinput('lock');
}

initFileImage(".redBookPhoto", redBookPhoto);
initFileImage(".pinkBookPhoto", pinkBookPhoto);
function fixListing() {

    listingObjectNotBuilding.listing.numberFloor = $("#floor-listing").val() == "" ? null : parseInt($("#floor-listing").val());
    listingObjectBuilding.listing.numberFloor = listingObjectNotBuilding.listing.numberFloor;

    listingObjectNotBuilding.listing.yearBuilt = $("#yearbuilt").val() == "" ? null : parseInt($("#yearbuilt").val());
    listingObjectBuilding.listing.yearBuilt = listingObjectNotBuilding.listing.yearBuilt;

    listingObjectNotBuilding.listing.yearFixed = $("#yearfixed").val() == "" ? null : parseInt($("#yearfixed").val());
    listingObjectBuilding.listing.yearFixed = listingObjectNotBuilding.listing.yearFixed;

    listingObjectNotBuilding.listing.numberBasement = $("#baseme").val() == "" ? null : parseInt($("#baseme").val());
    listingObjectBuilding.listing.numberBasement = listingObjectNotBuilding.listing.numberBasement;

    listingObjectNotBuilding.listing.numberElevator = $("#numberElevator").val() == "" ? null : parseInt($("#numberElevator").val());
    listingObjectBuilding.listing.numberElevator = listingObjectNotBuilding.listing.numberElevator;
}

$(function () {

    //Initialize Select2 Elements
    $('#finish-reviewing').click(function () {
        var rId = parseInt($('#rId').val());
        if (rId != "")
        {
            if ($('#type-business').val() == 3 || $('#type-business').val() == 4)
            {
                alert('Bạn đang chọn loại hình giao dịch chưa xác định, vui lòng chọn lại');
                $('#type-business').focus();
                return false;
            }

            var prepare = prepareListingData();
            listingObjectBuilding.rlistingId = rId;
            listingObjectNotBuilding.rlistingId = listingObjectBuilding.rId;
            listingObjectBuilding.status = {"statusId": 2};
            listingObjectNotBuilding.status = listingObjectBuilding.status;
            listingObjectBuilding.rlMoveInDate = rlMoveInDate;
            listingObjectNotBuilding.rlMoveInDate = rlMoveInDate;
            if ($("#building").val() == "") {
                listingObjectBuilding.listing.listingId = parseInt($('#listingId').val());
                listingObjectNotBuilding.listing.listingId = listingObjectBuilding.listing.listingId
            } else {
                listingObjectBuilding.listing.listingId = parseInt($('#building').select2().find(":selected").attr("listingId"));
                listingObjectNotBuilding.listing.listingId = listingObjectBuilding.listing.listingId;
            }

            if (prepare)
                $('#reviewing-modal').modal('show');
        }
        return false;
    });
    $('#accept-reviewing').click(function () {

        if ($("#pending-reason").val() == "---Vui Lòng Chọn---" || parseInt($("#pending-reason").val() == "---Vui Lòng Chọn---")) {
            $('#reviewing-modal').modal('hide');
            $('#noreason').modal('show');
            return false;
        }
        listingObjectBuilding.reasonId = $("#pending-reason").val() != "" ? parseInt($("#pending-reason").val()) : null;
        listingObjectNotBuilding.reasonId = listingObjectBuilding.reasonId;
        listingObjectBuilding.solutionId = $("#pending-solution").val() != "" ? parseInt($("#pending-solution").val()) : null;
        listingObjectNotBuilding.solutionId = listingObjectBuilding.solutionId;
        listingObjectBuilding.reasonNote = $("#reasonNote").val() != "" ? $("#reasonNote").val() : null;
        listingObjectNotBuilding.reasonNote = listingObjectBuilding.reasonNote;
        fixListing();
        $('#reviewing-modal').modal('hide');
        //console.log(listingObjectBuilding);return false;
        updateListing(listingObjectBuilding);

        return false;
    });

    $('#accept-reject').click(function () {

        if ($("#reject-reason").val() == "---Vui Lòng Chọn---" || parseInt($("#reject-reason").val() == "---Vui Lòng Chọn---")) {
            $('#reject-modal').modal('hide');
            $('#noreason').modal('show');
            return false;
        }
        listingObjectBuilding.reasonId = $("#reject-reason").val() != "" ? parseInt($("#reject-reason").val()) : null;
        listingObjectNotBuilding.reasonId = listingObjectBuilding.reasonId;
        listingObjectBuilding.solutionId = $("#reject-solution").val() != "" ? parseInt($("#reject-solution").val()) : null;
        listingObjectNotBuilding.solutionId = listingObjectBuilding.solutionId;
        fixListing();
        $('#reject-modal').modal('hide');
        updateListing(listingObjectBuilding);

        return false;
    });

    $('#finish-reject').click(function () {
        var rId = parseInt($('#rId').val());
        if (rId != "")
        {
            if ($('#type-business').val() == 3 || $('#type-business').val() == 4)
            {
                alert('Bạn đang chọn bds chưa xác định, vui lòng chọn lại');
                $('#type-business').focus();
                return false;
            }


            if (!validateFileUpload('.imageListing', true)) {
                return false;
            }
            if (!validateFileUpload('.redBookPhoto')) {
                return false;
            }

            if (!validateFileUpload('.pinkBookPhoto')) {
                return false;
            }

            var prepare = prepareListingData();
            listingObjectBuilding.rlistingId = rId;
            listingObjectNotBuilding.rlistingId = listingObjectBuilding.rId;
            listingObjectBuilding.status = {"statusId": 5};
            listingObjectNotBuilding.status = listingObjectBuilding.status;
            listingObjectBuilding.rlMoveInDate = rlMoveInDate;
            listingObjectNotBuilding.rlMoveInDate = rlMoveInDate;
            if ($("#building").val() == "") {
                listingObjectBuilding.listing.listingId = parseInt($('#listingId').val());
                listingObjectNotBuilding.listing.listingId = listingObjectBuilding.listing.listingId
            } else {
                listingObjectBuilding.listing.listingId = parseInt($('#building').select2().find(":selected").attr("listingId"));
                listingObjectNotBuilding.listing.listingId = listingObjectBuilding.listing.listingId;
            }

            if (prepare)
                $('#reject-modal').modal('show');
        }
        return false;
    });
    $('#finish-deactivate').click(function () {
        var rId = parseInt($('#rId').val());
        if (rId != "")
        {
            if ($('#type-business').val() == 3 || $('#type-business').val() == 4)
            {
                alert('Bạn đang chọn bds chưa xác định, vui lòng chọn lại');
                $('#type-business').focus();
                return false;
            }


            if (!validateFileUpload('.imageListing', true)) {
                return false;
            }
            if (!validateFileUpload('.redBookPhoto')) {
                return false;
            }

            if (!validateFileUpload('.pinkBookPhoto')) {
                return false;
            }

            var prepare = prepareListingData();
            listingObjectBuilding.rlistingId = rId;
            listingObjectNotBuilding.rlistingId = listingObjectBuilding.rId;
            listingObjectBuilding.status = {"statusId": 6};
            listingObjectNotBuilding.status = listingObjectBuilding.status;
            listingObjectBuilding.rlMoveInDate = rlMoveInDate;
            listingObjectNotBuilding.rlMoveInDate = rlMoveInDate;
            if ($("#building").val() == "") {
                listingObjectBuilding.listing.listingId = parseInt($('#listingId').val());
                listingObjectNotBuilding.listing.listingId = listingObjectBuilding.listing.listingId
            } else {
                listingObjectBuilding.listing.listingId = parseInt($('#building').select2().find(":selected").attr("listingId"));
                listingObjectNotBuilding.listing.listingId = listingObjectBuilding.listing.listingId;
            }
            fixListing();
            if (prepare)
                updateListing(listingObjectBuilding);
        }
        return false;
    });
    $('#finish-rented').click(function () {
        var rId = parseInt($('#rId').val());
        if (rId != "")
        {
            if ($('#type-business').val() == 3 || $('#type-business').val() == 4)
            {
                alert('Bạn đang chọn bds chưa xác định, vui lòng chọn lại');
                $('#type-business').focus();
                return false;
            }



            if (!validateFileUpload('.imageListing', true)) {
                return false;
            }
            if (!validateFileUpload('.redBookPhoto')) {
                return false;
            }

            if (!validateFileUpload('.pinkBookPhoto')) {
                return false;
            }

            var prepare = prepareListingData();
            listingObjectBuilding.rlistingId = rId;
            listingObjectNotBuilding.rlistingId = listingObjectBuilding.rId;
            listingObjectBuilding.status = {"statusId": 7};
            listingObjectNotBuilding.status = listingObjectBuilding.status;
            listingObjectBuilding.rlMoveInDate = rlMoveInDate;
            listingObjectNotBuilding.rlMoveInDate = rlMoveInDate;
            if ($("#building").val() == "") {
                listingObjectBuilding.listing.listingId = parseInt($('#listingId').val());
                listingObjectNotBuilding.listing.listingId = listingObjectBuilding.listing.listingId
            } else {
                listingObjectBuilding.listing.listingId = parseInt($('#building').select2().find(":selected").attr("listingId"));
                listingObjectNotBuilding.listing.listingId = listingObjectBuilding.listing.listingId;
            }
            fixListing();
            if (prepare)
                updateListing(listingObjectBuilding);
        }
        return false;
    });

    $('#finish-live').click(function () {

        var rId = parseInt($('#rId').val());
        if (rId != "")
        {
            if ($('#type-business').val() == 3 || $('#type-business').val() == 4)
            {
                showPropzyAlert('Bạn đang chọn bds chưa xác định, vui lòng chọn lại');
                $('#type-business').focus();
                return false;
            }

            if (!validateFileUpload('.imageListing', true)) {
                return false;
            }
            if (!validateFileUpload('.redBookPhoto')) {
                return false;
            }

            if (!validateFileUpload('.pinkBookPhoto')) {
                return false;
            }

            if ($('#city').val() == "")
            {
                showPropzyAlert('Vui lòng chọn thành phố');
                $('#city').focus();
                return false;
            }
            if ($('#district').val() == "")
            {
                showPropzyAlert('Vui lòng chọn quận');
                $('#district').focus();
                return false;
            }
            if (isBuilding) {
                if ($('#building').val() == "") {
                    showPropzyAlert('Vui lòng chọn Building');
                    $('#building').focus();
                    return false;
                    if ($('#building option:selected').attr('isverified') != 1) {
                        showPropzyAlert('Vui lòng chọn Building Có verify');
                        $('#building').focus();
                        return false;
                    }
                }
            }
            var prepare = prepareListingData();
            listingObjectBuilding.rlistingId = rId;
            listingObjectNotBuilding.rlistingId = listingObjectBuilding.rId;
            listingObjectBuilding.status = {"statusId": 3};
            listingObjectNotBuilding.status = listingObjectBuilding.status;
            listingObjectBuilding.rlMoveInDate = rlMoveInDate;
            listingObjectNotBuilding.rlMoveInDate = rlMoveInDate;

            if ($('#price').val() == "")
            {
                alert('Thông tin nhập chưa đầy đủ');
                $('#price').focus();
                return false;
            }
            if (prepare)
                updateListing(listingObjectBuilding);
        }
        return false;
    });


    $('#duplicateListing').click(function () {
        urlDuplicate = "/duplicate/" + $('#rId').val();
        get_sync(urlDuplicate, true, function (data) {
            console.log(data['data'].rListingId);
            //alert('ban da update thanh cong');
            var rlistingD = data['data'].rListingId;
            $('.modal-body').html("<p>Bạn đã duplicate thành công. RListingID mới của bạn là: <b><a target='_blank'  href='" + data['data'].rListingId + "'>  " + data['data'].rListingId + "<a></b></p>");
            $('#duplicateListing-modal').modal('show');

        });
    });
});

$('#amenities .utilitie-item-content').each(function () {
    if ($(this).find('.amenityc-child-content').attr('data') != 0) {
        if ($(this).find('.amenityc-child-content input:checked').length == $(this).find('.amenityc-child-content').attr('data')) {
            $(this).find('.utilitie').prop('checked', true);
        }
    }
})


function updateListing(object) {
    if (rId != "") {
        var isCheck = checkDuplicates(object);
        if (!isCheck) {
            postUpdateListing(object);
        }
    } else {
        alert("Update thất bại: rId không có");
    }
}

function postUpdateListing(object) {

    urlCreateListing = "/updateListing";
    //console.log(object);
    post_sync(urlCreateListing, object, true, function (response) {
        console.log(object);
        console.log(response);
        var mssage = 'Bạn đã cập nhật thành công listing ';
        try {
            mssage += response['data'].rlistingId;
        } catch (Ex) {
            mssage += response.data.rlistingId;
        }
        //alert('Bạn đã cập nhật thành công listing ' + data['data'].rlistingId);
        $("#alertModal .message").html(mssage);
        $("#alertModal").modal();
        window.location = returnUrl;
    });
}


initWardForListingDescription("#ward", "description");

// Hide
$(".input-group").hide();