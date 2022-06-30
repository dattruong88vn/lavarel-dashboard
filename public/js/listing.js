var defaultCreateListing = {
    "photo": [],
    "video": []
}

$(document).ready(function () {

    //image,video upload
    $("#finish-listing").click(function () {
        defaultCreateListing.photo = [];
        defaultCreateListing.video = [];
        $(".imageListing .file-preview .file-preview-initial").each(function (idx, element) {
            defaultCreateListing.photo.push({
                link: $(element).find("img").attr("src"),
                caption: $(element).find(".file-footer-caption input ").val()
            });
        });
        defaultCreateListing.photo = JSON.stringify(defaultCreateListing.photo);
        $(".videoListing .file-preview .file-preview-initial").each(function (idx, element) {
            defaultCreateListing.video.push($(element).find("video source").attr("src"));
        });
        defaultCreateListing.video = JSON.stringify(defaultCreateListing.video);
    });

    //#image,video upload

    //var timestamp1 = Date.parse($('#eventDate').val());
    $('#datePicker').datepicker({
        format: 'dd-mm-yyyy'
    }).on('changeDate', function (e) {
        // Revalidate the date field
        //$('#eventForm').formValidation('revalidateField', 'eventDate');
        moveInDate = e.date.getTime();
    });

    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
    });

    $('.wrapper-hoahong').on('click', ".txt-add", function () {
        $(this).parent('.add-row').append('<i class="fa fa-plus txt-add"> Cộng</i>');
        $(this).remove();
        var template = $('#hoa-hong-tmpl').html();
        var compiledTemplate = Template7.compile(template);
        $('.wrapper-hoahong').prepend(compiledTemplate({}));
    });
    $('.wrapper-hoahong').on('click', ".minus-row", function () {
        $(".minus-row").on('click', function () {
            $(this).parents('.row-hh').remove();
        });
    });
    /* $('.row-hh').each(function(){
     $(this).find('.txt-add').waitUntilExists(function(){
     $(".txt-add").on('click', function() {
     $(this).parent('.add-row').append('<i class="fa fa-minus minus-row"> Trừ</i>');
     $(this).remove();
     var template = $('#hoa-hong-tmpl').html();
     var compiledTemplate = Template7.compile(template);
     $('.wrapper-hoahong').append(compiledTemplate({}));

     $(".select2").select2();
     });
     },false, false);
     });
     -->
     $('.row-hh').each(function(){
     $(this).find('.minus-row').waitUntilExists(function(){
     $(".minus-row").on('click', function() {
     $(this).parents('.row-hh').remove();
     });
     },false, false);
     });
     */

    $('#district').change(function () {
        var url = "/get-ward/" + $(this).val();
        get_sync(url, true, function (data) {
            var html = "";
            $.each(data, function (index, value) {
                html += '<option value="' + value.wardId + '">' + value.wardName + '</option>';
            });
            $('#ward').html(html).select2();
            //console.log(html);
        });
    });
    $('#currency').change(function () {
        if ($(this).val() == "vnd") {
            $('#minPrice').mask("#,##0", {reverse: true});
            $('#price').mask("#,##0", {reverse: true});
            $('#deposit').mask("#,##0", {reverse: true});
        } else {
            $('#minPrice').unmask();
            $('#price').unmask();
            $('#deposit').unmask();
        }
    })
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

    $(".file-video").fileinput({
        deleteUrl: "/videoListingRemover",
        allowedFileExtensions: ['mp4'],
        overwriteInitial: false,
        maxFileSize: 20000000,
        maxFilesNum: 1,
        allowedFileTypes: ['video'],
        slugCallback: function (filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
    });


});
String.prototype.raw = function () {
    title = this;
    title = title.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    title = title.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    title = title.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    title = title.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    title = title.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    title = title.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    title = title.replace(/đ/gi, 'd');

    return title;
}
String.prototype.slug = function ()
{
    title = this;
    slug = title.toLowerCase().raw();
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, " - ");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    slug = slug.replace(/\s/g, '');
    slug = slug.replace(/\-\-/gi, '-');

    if (slug == "van-phong")
        slug = "van-phong-cho-thue";
    if (slug == "can-ho")
        slug = "can-ho-cho-thue";
    return slug;
}

$.fn.waitUntilExists = function (handler, shouldRunHandlerOnce, isChild) {
    var found = 'found';
    var $this = $(this.selector);
    var $elements = $this.not(function () {
        return $(this).data(found);
    }).each(handler).data(found, true);

    if (!isChild) {
        (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
                window.setInterval(function () {
                    $this.waitUntilExists(handler, shouldRunHandlerOnce, true);
                }, 500);
    } else if (shouldRunHandlerOnce && $elements.length) {
        window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
    }
    return $this;
}

if (location.hostname.indexOf("test") > -1 || location.hostname.indexOf("192") > -1 || location.hostname.indexOf("localhost") > -1) {
    //BASE_URL = "http://vn.propzy.com:8080/vn/api/v2/";
    ROOT_UR_TEST = "http://" + location.hostname;
}

$('.form-horizontal').waitUntilExists(function () {
    $('.amenity-content .utilitie-item-content .utilitie').click(function () {
        var content = $(this).closest('.utilitie-item-content');
        if ($(this).is(":checked")) {
            content.find('.amenityc-child-content .amenityc-child').prop('checked', true);
            content.find('.amenityc-child-content .amenityc-child').addClass('check');
        } else {
            content.find('.amenityc-child-content .amenityc-child').prop('checked', false);
            content.find('.amenityc-child-content .amenityc-child').removeClass('check');
        }
    });

    $('.amenity-content .amenityc-child-content .amenityc-child').click(function () {
        $(this).toggleClass('check');
        var content = $(this).closest('.amenityc-child-content');
        if (content.attr('data') == content.find('.amenityc-child.check').length) {
            $(this).closest('.utilitie-item-content').find('.utilitie').prop('checked', true);
        } else {
            $(this).closest('.utilitie-item-content').find('.utilitie').prop('checked', false);
        }
    });
}, false, false);
$('.utilitie-item-content').waitUntilExists(function () {
    $(".utilitie-item-content .checkbox").change(function (e) {
        children = $(this).parent().find(".amenityc-child-content .checkbox");
        $(children).each(function (idx, element) {
            $(element).find('.amenityc-child').prop('checked', e.target.checked);
        });
    });
}, false, false);
$('.utilitie-item-content .amenityc-child-content').waitUntilExists(function () {
    $(".utilitie-item-content .amenityc-child-content input").change(function (e) {
        parentInput = $(this).closest(".utilitie-item-content").find("input.utilitie");
        inputSameLevel = $(this).closest(".amenityc-child-content").find("input.amenityc-child");
        if (e.target.checked) {
            isAllChecked = true;
            $(inputSameLevel).each(function (idx, element) {
                if (!$(element).is(":checked")) {
                    isAllChecked = false;
                    return false;
                }
            });
            if (isAllChecked) {
                parentInput.prop('checked', true);
            }
        } else {
            parentInput.prop('checked', false);
        }
        children = $(this).parent().find(".amenityc-child-content .checkbox input");
        $(children).each(function (idx, element) {
            $(element).find('.amenityc-child').prop('checked', e.target.checked);
        });
    });
}, false, false);
function getBlockDetail(blockId) {
    urlBlockDetail = '/get-block-detail/' + blockId;
    get_sync(urlBlockDetail, true, function (data) {
        blockObject = data;
    });
}
function updateInfoBlock(blockId) {
    //getBlockDetail($('#block').val());
    urlBlockDetail = '/get-block-detail/' + blockId;
    get_sync(urlBlockDetail, true, function (data) {
        blockObject = data;
        $('#yearbuilt').val(blockObject.yearBuilt);
        $('#yearfixed').val(blockObject.yearFixed);
        $('#floor-listing').val(blockObject.numberFloor);
        if (blockObject.numberBasement) {
            $('#baseme option[value=' + blockObject.numberBasement + ']').attr('selected', 'selected').parent().select2();
        } else {
            //$("#baseme option:first").attr('selected','selected');
            $('#baseme option[value=""]').attr('selected', 'selected').parent().select2();
        }

        if (blockObject.numberBasement) {
            $('#numberElevator option[value=' + blockObject.numberElevator + ']').attr('selected', 'selected').parent().select2();
        } else {
            // $("#numberElevator option:first").attr('selected','selected');
            $('#numberElevator option[value=""]').attr('selected', 'selected').parent().select2();
        }

        updatePlaceNumber(blockObject.numberFloor);
    });
    //blockObject = buildingObject.building.blocks[blockIndex];

}

function getBuidingDetail(buidingId) {
    urlBuidingDetail = '/get-buiding-detail/' + buidingId;
    get_sync(urlBuidingDetail, true, function (data) {
        buildingObject = data;
        $('#address').val(data.address);
        $('#short-address').val(data.shortAddress);
        $('#lat').val(data.latitude);
        $('#long').val(data.longitude);
        $('#city option[value=' + data.cityId + ']').attr('selected', 'selected').parent().select2();

        $('#short-address').val(data.shortAddress);
        var url_get_district = "/get-district/" + data.cityId;
        get_sync(url_get_district, true, function (data) {
            var html_get_district = "";
            $.each(data, function (index, value) {
                html_get_district += '<option value="' + value.districtId + '">' + value.districtName + '</option>';
            });
            $('#district').html(html_get_district);
            $('#district').find('option[value=' + buildingObject.districtId + ']').attr('selected', 'selected');
            $('#district').select2();
        });

        districtId = data.districtId;
        get_agent_list();

        if (data.building.blocks.length == 0) {
            $('#yearbuilt').val(data.yearBuilt);
            $('#yearfixed').val(data.yearFixed);
            $('#floor-listing').val(data.numberFloor);
            if (data.numberBasement) {
                $('#baseme option[value=' + data.numberBasement + ']').attr('selected', 'selected').parent().select2();
            } else {
                //$("#baseme option:first").attr('selected','selected');
                $('#baseme option[value=""]').attr('selected', 'selected').parent().select2();
            }
            if (data.numberElevator) {
                $('#numberElevator option[value=' + data.numberElevator + ']').attr('selected', 'selected').parent().select2();
            } else {
                //$("#numberElevator option:first").attr('selected','selected');
                $('#numberElevator option[value=""]').attr('selected', 'selected').parent().select2();
            }
            updatePlaceNumber(data.numberFloor);
        } else {
            updateInfoBlock($('#block').val());
        }
    });
}
function getProjectDetail(projectId) {
    urlProjectDetail = '/get-project-detail/' + projectId;
    get_sync(urlProjectDetail, true, function (data) {

        projectObject = data.data;
        $('#lat').val(projectObject.latitude);
        $('#long').val(projectObject.longitude);
        $('#address').val(projectObject.address);
    })
}
$('#floor-listing').keyup(function () {
    updatePlaceNumber($(this).val());
});

function updatePlaceNumber(number) {
    $('#place-number').empty().select2();
    $('#place-number').append('<option value="">---Vui Lòng Chọn---</option>');
    $('#place-number').append('<option value="-1">Trệt</option>');
    $('#place-number').append('<option value="-2">Lửng</option>');
    $('#place-number').append('<option value="-3">Sân thượng</option>').select2();
    for (i = 1; i <= number; i++) {
        html = '<option value="' + i + '">' + i + '</option>';
        $('#place-number').append(html).select2();
    }

    $('#place-number-to').empty().select2();
    $('#place-number-to').append('<option value="">---Vui Lòng Chọn---</option>');
    $('#place-number-to').append('<option value="-1">Trệt</option>');
    $('#place-number-to').append('<option value="-2">Lửng</option>');
    $('#place-number-to').append('<option value="-3">Sân thượng</option>').select2();
    for (i = 1; i <= number; i++) {
        html = '<option value="' + i + '">' + i + '</option>';
        $('#place-number-to').append(html).select2();
    }
}

// function getBlockDetail(blockId){
//     urlBuidingDetail = '/get-buiding-detail/'+buidingId;
//     get_sync(urlBuidingDetail, true, function(data){
//       buildingObject = data;
//     });
// }



// $('#block').change(function(){
//       getBlockDetail($(this).val());
// });

function inIt() {
    //disabled for input
    $('.agent-content').find('input').prop("disabled", true);
    $(".select2").select2();
    CKEDITOR.replace('description');
    CKEDITOR.replace('description-en');
    CKEDITOR.replace('noteForAgent');
    CKEDITOR.replace('noteForAgent-en');
    // $('input[type="text"]').val('2222');
    //$('textarea').val('2222');
}
if ($('#building').val() != "") {
    urlBuidingDetail = '/get-buiding-detail/' + ($('#building').val());
    console.log(urlBuidingDetail);
    get_sync(urlBuidingDetail, true, function (data) {
        buildingObject = data
    });
    $('#block').change(function () {
        indexBlock = parseInt($(this).val());
        updateInfoBlock(indexBlock);
    });
}


$('#agentList').change(function (e) {
    if ($(this).val() == "") {
        $(this).closest('.agent-content').find('input').prop("disabled", true);
    } else {
        $(this).closest('.agent-content').find('input').prop("disabled", false);
        $('#agentTel').val($(this).find(":selected").attr('phone'));
        $('#agentEmail').val($(this).find(":selected").attr('email'));
        $('#agentAddress').val($(this).find(":selected").attr('address'));
    }
});

inIt();


//check duplicate

function checkDuplicates(object) {
    var isCheck = false;
    $('#check-duplicates button.continue.update').show();
    $('#check-duplicates button.continue.create').show();
    if (object.status.statusId == 2 || object.status.statusId == 3) {
        urlCheckDuplicates = "/checkDuplicates";
        console.log(object);
        var content = "Đây là listing có thông tin trùng với listing này: ";
        post_sync(urlCheckDuplicates, object, false, function (data) {

            if (data.data != null && data.data.length > 0) {
                $.each(data.data, function (index, value) {
                    content += "<a class='duplicatedListing' href='/listing/" + value.rlistingId + "' target='_blank'> " + value.rlistingId + "</a>&nbsp&nbsp&nbsp&nbsp";
                });
                $('#check-duplicates .modal-body').empty().append(content);
                $('#check-duplicates').modal();
                isCheck = true;
            } else {
                isCheck = false;
            }
        });
    } else {
        isCheck = false;
    }
    return isCheck;
}


//check duplicate

function checkExistedAddress(object) {
    urlCheckDuplicates = "/checkDuplicates";
    var content = "";
    var tempListing = object.listing;
    object.listing = null;
    post_sync(urlCheckDuplicates, object, true, function (data) {
        if (data.data != null && data.data.length > 0) {
            content += "Địa chỉ trùng với listing: ";
            for (var i = 0; i < data.data.length; i++) {
                if (i > 0) {
                    content += ", ";
                }
                content += "<a href='/listing/" + data.data[i].rlistingId + "?forceAccess=1' target='_blank'>" + data.data[i].rlistingId + "</a>";
            }
        } else {
            content += "Địa chỉ có thể sử dụng.";
        }
        $('#check-duplicates button.continue.update').hide();
        $('#check-duplicates button.continue.create').hide();
        $('#check-duplicates .modal-body').empty().append(content);
        $('#check-duplicates').modal();
    });
    object.listing = tempListing;
    console.log(object);
}



$('#check-duplicates .continue').click(function () {
    $('#check-duplicates').modal('hide');
    if ($(this).hasClass("create")) {
        //postCreate(objectpost);
        postCreateListing(listingObjectBuilding);
    } else {
        postUpdateListing(listingObjectBuilding);
    }
});

$('#address').change(function () {


})

var objectpost = {
    "sizeWidth": 10,
    "sizeLength": 15,
    "deposit": null,
    "allowChange": false,
    "bathRooms": 2,
    "bedRooms": 2,
    "description": "<p>M&ocirc; tả tiếng việt</p>\n",
    "floors": 1,
    "floorSize": 100,
    "lotSize": 150,
    "smallSize": null,
    "price": 250000,
    "currency": "VND",
    "title": " Melinh Point Tower",
    "yearBuilt": null,
    "mainPhoto": "[{\"url_path\":\"http://cdn.propzy.vn/media_test/images/ \",\"url_thumb\":\"http://cdn.propzy.vn/media_test/thumbnail_for_similar/7ae3b6b1494e3cc6fba6e7156df56365_image.jpg\",\"url_large\":\"http://cdn.propzy.vn/media_test/thumbnail_for_gridview/7ae3b6b1494e3cc6fba6e7156df56365_image.jpg\",\"file_id\":\"7ae3b6b1494e3cc6fba6e7156df56365_image\",\"file_name\":\"7ae3b6b1494e3cc6fba6e7156df56365_image.jpg\",\"caption\":\"\"},{\"url_path\":\"http://cdn.propzy.vn/media_test/images/ \",\"url_thumb\":\"http://cdn.propzy.vn/media_test/thumbnail_for_similar/48a4954b81b47eb9163ac2b1057edbda_image.jpg\",\"url_large\":\"http://cdn.propzy.vn/media_test/thumbnail_for_gridview/48a4954b81b47eb9163ac2b1057edbda_image.jpg\",\"file_id\":\"48a4954b81b47eb9163ac2b1057edbda_image\",\"file_name\":\"48a4954b81b47eb9163ac2b1057edbda_image.jpg\",\"caption\":\"\"},{\"url_path\":\"http://cdn.propzy.vn/media_test/images/ \",\"url_thumb\":\"http://cdn.propzy.vn/media_test/thumbnail_for_similar/5ad00988db50b0cc0e4b77cf27c9f9c9_image.jpg\",\"url_large\":\"http://cdn.propzy.vn/media_test/thumbnail_for_gridview/5ad00988db50b0cc0e4b77cf27c9f9c9_image.jpg\",\"file_id\":\"5ad00988db50b0cc0e4b77cf27c9f9c9_image\",\"file_name\":\"5ad00988db50b0cc0e4b77cf27c9f9c9_image.jpg\",\"caption\":\"\"}]",
    "photo": "[{\"link\":\"http://cdn.propzy.vn/media_test/images/7ae3b6b1494e3cc6fba6e7156df56365_image.jpg\",\"caption\":\"\",\"isPrivate\":false},{\"link\":\"http://cdn.propzy.vn/media_test/images/48a4954b81b47eb9163ac2b1057edbda_image.jpg\",\"caption\":\"\",\"isPrivate\":false},{\"link\":\"http://cdn.propzy.vn/media_test/images/5ad00988db50b0cc0e4b77cf27c9f9c9_image.jpg\",\"caption\":\"\",\"isPrivate\":false}]",
    "mainVideo": null,
    "video": null,
    "source": 1,
    "unit": "A25",
    "linkOfListing": "http://test.propzy.vn/chi-tiet/chung-cucan-ho/huyen-nha-be/chung-cucan-ho-#RID#",
    "modelCode": null,
    "floorsTo": 7,
    "totalHomeForm": null,
    "numberAvailable": null,
    "requestId": null,
    "transactionId": null,
    "isPrivate": false,
    "useRightType": {
        "useRightTypeId": 1
    },
    "commissionText": null,
    "alley": null,
    "listing": {
        "listingId": 1305,
        "title": " Melinh Point Tower",
        "latitude": 10.700715,
        "longitude": 106.711871,
        "address": "nguyễn Hữu Cảnh",
        "shortAddress": "",
        "listingType": {
            "listingTypeID": 2
        },
        "project": {
            "pId": 1
        },
        "propertyType": {
            "propertyTypeID": 1
        },
        "purpose": {
            "purPoseID": 2
        },
        "listingTypeName": "Thuê",
        "purposeName": "Thương mại",
        "propertyTypeName": "Chung cư/Căn hộ",
        "yearBuilt": null,
        "yearFixed": null,
        "numberBasement": null,
        "numberElevator": null,
        "numberFloor": null,
        "cityId": 1,
        "districtId": 23,
        "isMezzanine": false,
        "isRooftop": false,
        "isPenhouse": false,
        "blockId": null
    },
    "city": {
        "cityId": 1
    },
    "district": {
        "districtId": 23
    },
    "socialUser": null,
    "account": null,
    "amenitiesOtherList": null,
    "amenitiesList": [
        {
            "id": {
                "amenityId": 323
            },
            "amenityName": "Nội thất"
        },
        {
            "id": {
                "amenityId": 325
            },
            "amenityName": "ADSL"
        },
        {
            "id": {
                "amenityId": 326
            },
            "amenityName": "Cáp Quang"
        },
        {
            "id": {
                "amenityId": 327
            },
            "amenityName": "Hệ thống nước nóng"
        },
        {
            "id": {
                "amenityId": 328
            },
            "amenityName": "Đồ dùng nhà bếp"
        }
    ],
    "relatedListingFees": [
        {
            "id": {
                "feesTypeId": 1
            },
            "feesName": "Phí quản lý",
            "price": null,
            "currency": null,
            "includingPrice": true
        },
        {
            "id": {
                "feesTypeId": 2
            },
            "feesName": "Xe máy",
            "price": null,
            "currency": null,
            "includingPrice": true
        },
        {
            "id": {
                "feesTypeId": 3
            },
            "feesName": "Xe hơi",
            "price": 20000,
            "currency": "VND",
            "includingPrice": false
        },
        {
            "id": {
                "feesTypeId": 5
            },
            "feesName": "Phí vệ sinh",
            "price": 30000,
            "currency": "VND",
            "includingPrice": false
        }
    ],
    "relatedListingMetaTags": [
        {
            "metaName": "title",
            "metaContent": "",
            "metaContentEn": null
        },
        {
            "metaName": "description",
            "metaContent": "",
            "metaContentEn": ""
        },
        {
            "metaName": "keywords",
            "metaContent": "",
            "metaContentEn": ""
        }
    ],
    "commissionList": [
        {
            "commision": 0.2,
            "contractTime": 2
        }
    ],
    "socialCommunications": [
        {
            "id": {
                "socialUid": -1
            },
            "email": "test@gmail.com",
            "name": "Phan Hải",
            "address": null,
            "phone": "0932754771"
        },
        {
            "id": {
                "socialUid": "61708562183857"
            },
            "email": "hai@propzy.com",
            "name": "Trần Vĩnh Phi Long ",
            "phone": null,
            "address": null,
            "agentType": {
                "agentTypeId": 1
            },
            "telephone": "0977382865"
        }
    ],
    "commissionFrom": null,
    "commissionTo": null,
    "commissionPrice": null,
    "rlLanguages": null,
    "shortAddress": "Ngô Đức Kế, Bến Nghé, Quận 1",
    "isVAT": false,
    "noteForAgent": "<p>note cho người m&ocirc;i giới</p>\n",
    "status": {
        "statusId": 3
    },
    "rlMoveInDate": {
        "moveInNow": true,
        "afterSigningContract": false,
        "moveInDate": null,
        "afterNumberDays": null
    }
};




function getStreets(wardId, callback) {
    showPropzyLoading();
    var html = "<option value=''>Chọn đường</option>";
    var isRendered = false;
    $.ajax({
        'url': "/zone/get-streets/" + wardId,
        'type': 'get'
    }).done(function (response) {
        if (response.result) {
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                html += "<option value='" + item.streetId + "'>" + item.streetName + "</option>";
            }
        }
        $("#streetId").html(html).select2();
        if (callback) {
            callback(response);
        }
        isRendered = true;
    }).always(function () {
        if (!isRendered) {
            $("#streetId").html(html).select2();
        }
        hidePropzyLoading();
    });
}
