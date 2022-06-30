var listingTypeId = $('#type-business').val();
if (listingTypeId == 2)
{
    html_get_purpose = '<option value="2">Thương mại</option><option value="1">Để ở</option>';
    //$('#purpose-business').html(html_get_purpose).select2();
} else {
    html_get_purpose = '<option value="3">Bán</option>';
    //$('#purpose-business').html(html_get_purpose).select2();
}

check_is_building();
/* if($('#building').val() == -1)
 {
 isBuilding = false;
 }
 else
 {
 isBuilding = true;
 }
 */
var level = 2;
var propertyTypeId = $('#kind-bds').val();
var url = "/get-amenities/" + listingTypeId + "/" + propertyTypeId + '/' + level;


var purposeId = $('#purpose-business').val();
var districtId = $('#district').val();
var urlAgentList = 'agent-list/' + listingTypeId + '/' + purposeId + '/' + districtId;

var agentList = [];
//console.log(urlAgentList);

$(function () {
    var today = new Date();
    $('#datePicker').datepicker({
        format: 'dd-mm-yyyy',
        //startDate: today,
        clearBtn: true,
        todayHighlight: true
    });

    $('#city').change(function () {
        var url = "/get-district/" + $(this).val();
        get_sync(url, true, function (data) {
            var html = "";
            $.each(data, function (index, value) {
                html += '<option value="' + value.districtId + '">' + value.districtName + '</option>';
            });
            $('#district').html(html).select2();
            //console.log(html);
        });
    });

    // console.log(url);
    $('#type-business').change(function () {
        listingTypeId = $('#type-business').val();
        get_agent_list();
        //console.log(data);
        var url_property_type = "/property_type/list/" + listingTypeId;
        console.log(url_property_type);
        get_sync(url_property_type, true, function (data) {
            var html = "";
            console.log(data);
            $.each(data, function (index, value) {
                html += '<option value="' + value.propertyTypeID + '">' + value.typeName + '</option>';
            });

            $('#kind-bds').html(html);
            $('#kind-bds').select2();
            propertyTypeId = $('#kind-bds').val();
            // $('#kind-bds>option:eq('+kind_bds+')').prop('selected', true);z
            if ($('#type-business').val() == 2)
            {
                html_get_purpose = '<option value="2">Thương mại</option><option value="1">Để ở</option>';
                $('#purpose-business').html(html_get_purpose).select2();
                purposeId = $('#purpose-business').val();
                get_agent_list();
                $("input[type=radio]").attr('disabled', true);


                if (propertyTypeId == 1 || propertyTypeId == 4 || propertyTypeId == 10 || propertyTypeId == 8 || propertyTypeId == 7)
                {
                    $("#building").prop("disabled", false);
                    //get listing
                } else {
                    $("#building").prop("disabled", true);
                }

                var template = $('#commission-for-rent-tmpl').html();
                var compiledTemplate = Template7.compile(template);
                $('.wrapper-hoahong').html(compiledTemplate({}));

                var templateMoveindate = $('#move-in-date-rent').html();
                var compiledTemplateMoveindate = Template7.compile(templateMoveindate);
                $('.wrapper-move-in-date').html(compiledTemplateMoveindate({}));
                var html_fee = "";
                $('#fee-title').html(html_fee);
                $('#datePicker').datepicker({
                    format: 'dd-mm-yyyy'
                }).on('changeDate', function (e) {
                    // Revalidate the date field
                    //$('#eventForm').formValidation('revalidateField', 'eventDate');
                    moveInDate = e.date.getTime();
                });
                get_amenities();
            }
            if ($('#type-business').val() == 1)
            {
                html_get_purpose = '<option value="3">Bán</option>';
                $('#purpose-business').html(html_get_purpose).select2();
                purposeId = $('#purpose-business').val();
                get_agent_list();

                $("input[type=radio]").attr('disabled', false);

                if (propertyTypeId == 1 || propertyTypeId == 4 || propertyTypeId == 10 || propertyTypeId == 8 || propertyTypeId == 7) {
                    $("#building").prop("disabled", false);
                    //get listbing
                } else {
                    $("#building").prop("disabled", true);
                }

                var template = $('#commission-for-sale-tmpl').html();
                var compiledTemplate = Template7.compile(template);
                $('.wrapper-hoahong').html(compiledTemplate({}));

                var templateMoveindate = $('#move-in-date-sale').html();
                var compiledTemplateMoveindate = Template7.compile(templateMoveindate);
                $('.wrapper-move-in-date').html(compiledTemplateMoveindate({}));
                $('#datePicker').datepicker({
                    format: 'dd-mm-yyyy'
                }).on('changeDate', function (e) {
                    // Revalidate the date field
                    //$('#eventForm').formValidation('revalidateField', 'eventDate');
                    moveInDate = e.date.getTime();
                });
                var html_fee = "(Nghìn)";
                $('#fee-title').html(html_fee);

                $('input:radio[name="optradio"]').change(function () {
                    var html = "";
                    if ($(this).attr('id') == "afterNumberDays")
                    {
                        for (var i = 1; i <= 24; i++)
                        {
                            html += '<option value="' + i + '">' + i + ' tháng</option>';
                        }

                        $('#afterNumberDaysSelect').html(html).select2();
                    } else
                    {
                        html = "";
                        $('#afterNumberDaysSelect').html(html).select2();
                    }
                });
                get_amenities();
            }


            console.log(urlAgentList);
        });
    });

    $('input:radio[name="optradio"]').change(function () {
        var html = "";
        if ($(this).attr('id') == "afterNumberDays")
        {
            for (var i = 1; i <= 24; i++)
            {
                html += '<option value="' + i + '">' + i + ' tháng</option>';
            }

            $('#afterNumberDaysSelect').html(html).select2();
        } else
        {
            html = "";
            $('#afterNumberDaysSelect').html(html).select2();
        }
    });
    $('#developer').change(function () {
        var projectId = $('#developer').val();
        getProjectDetail(projectId);

    });

    $('#kind-bds').change(function () {
        if ($(this).val() == 7) {
            $('#purpose-business').find('option[value=2]').attr('selected', 'selected');
            $('#purpose-business').select2();
        }
        propertyTypeId = $('#kind-bds').val();

        //console.log(propertyTypeId);
        check_is_building();
        if (propertyTypeId == 4 || propertyTypeId == 5 || propertyTypeId == 6 || propertyTypeId == 7) {
            $('.type-of-price').text('/m²/tháng')
        } else {
            $('.type-of-price').text('/tháng')
        }
        get_amenities();
    });

    $("#seeonmap").on("click", function () {
        var lat = $.trim($('#lat').val());
        var lng = $.trim($('#long').val());
        var link = 'https://www.google.com/maps/?q=' + lat + ',' + lng;
        window.open(link);
        return false;
    });
    $('#purpose-business').change(function () {
        propertyTypeId = $('#kind-bds').val();
        check_is_building();
        purposeId = $(this).val();
        get_agent_list();
        console.log(urlAgentList);
    });

    $('#district').change(function () {
        districtId = $(this).val();
        get_agent_list();
        console.log(urlAgentList);
    });
    /*
     Address with google
     */
    $("#address").geocomplete()
            .bind("geocode:result", function (event, result) {
                console.log(result);
                $('#lat').val(result.geometry.location.lat());
                $('#long').val(result.geometry.location.lng());

                listingObjectBuilding.latitude = result.geometry.location.lat();
                listingObjectBuilding.longitude = result.geometry.location.lng();
                listingObjectBuilding.listing.address = result.formatted_address;


                listingObjectNotBuilding.latitude = result.geometry.location.lat();
                listingObjectNotBuilding.longitude = result.geometry.location.lng();
                listingObjectNotBuilding.listing.address = result.formatted_address;
            });
    $('#source').change(function () {
        get_user_list();
    });
    $("#ownerAddress").geocomplete();
    $('#building').change(function () {
        var propertyTypeId = $('#kind-bds').val();
        if (propertyTypeId == 7) {
            if ($(this).val() == "") {
                isBuilding = false;
            } else {
                isBuilding = true;
                $("#block").prop("disabled", false);
            }
        }
        if (propertyTypeId == 10) {
            $("#building").prop("disabled", false);
            if ($(this).val() == "") {
                isBuilding = false;
            } else {
                isBuilding = true;
                $("#block").prop("disabled", false);
            }
        }
        if ($(this).val()) {
            var url = "/get-block-list/" + $(this).val();
            get_sync(url, true, function (data) {
                console.log(data);
                blocksObject = data['data'];
                if (data['result']) {
                    var html = "";
                    $.each(data['data'], function (index, value) {
                        html += '<option data-index="' + index + '" value="' + value.blockId + '">' + value.blockName + '</option>';
                    });
                    $('#block').html(html).select2();
                }
                //console.log(html);
            });

            //$('#floor-listing').val();
            getBuidingDetail($(this).val());

        }
    });
});

function get_agent_list() {
    urlAgentList = '/get-agent-list/' + listingTypeId + '/' + purposeId + '/' + districtId;
    get_sync(urlAgentList, true, function (data) {
        agents = data['data'];
        if (data['result']) {
            var html = "<option value=''>Vui lòng chọn</option>";
            $.each(data['data'], function (index, value) {

                html += '<option id="socialAgent" address="" phone="' + value.phone + '" socialUid="' + value.socialUid + '" name="' + value.name + '" email="' + value.email + '" value="' + value.agentId + '">' + value.name + '</option>';
            });
            $('#agentList').html(html).select2();
        }
        console.log(agentList);
    });
}
;
function get_user_list() {
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
            $('#listuser').html(html);
            $('#listuser').select2();
            console.log(listuser);
        });
    } else {
        var html = "<option value=''>---Vui lòng chọn---</option>";
        $('#listuser').html(html).select2();
    }
}
function get_amenities() {
    url = "/get-amenities/" + listingTypeId + "/" + propertyTypeId + '/' + level;
    console.log(url);
    get_sync(url, true, function (data) {
        var child = [];
        var tmpArr = [];
        $.each(data, function( index, value ) {
            if( value.amenityChild.length == 0 ){
                tmpArr.push(value);
            }else{
                child.push(value);
            }
        });
        child.sort(function(a,b){return a.amenityChild.length - b.amenityChild.length})
        data = {};
        data.notChild = tmpArr;
        data.hasChild = child;
        
        var template = $('#tien-ich-tmpl').html();
        var compiledTemplate = Template7.compile(template);
        $('#amenities').html(compiledTemplate(data));
        console.log(data);
    });
}
function check_is_building() {
    propertyTypeId = $('#kind-bds').val();
    //console.log(propertyTypeId);
    if (propertyTypeId == 1 || propertyTypeId == 4 || propertyTypeId == 8)
    {
        $("#building").prop("disabled", false);
        $("#block").prop("disabled", false);
        isBuilding = true;
        //get listbing
    } else
    {
        $("#building").prop("disabled", true);
        $("#block").prop("disabled", true);
        isBuilding = false;
    }
    if (propertyTypeId == 7) {
        $("#building").prop("disabled", false);
        //$("#block").prop("disabled", false);
        if ($('#building').val() == "") {
            isBuilding = false;
        } else {
            isBuilding = true;
            $("#block").prop("disabled", false);
        }
    }
    if (propertyTypeId == 10) {
        $("#building").prop("disabled", false);
        //$("#block").prop("disabled", false);
        if ($('#building').val() == "") {
            isBuilding = false;
        } else {
            isBuilding = true;
            $("#block").prop("disabled", false);
        }
    }
}

function get_property_type(finishCallBack) {
    listingTypeId = $('#type-business').val();
    var url_property_type = "/property_type/list/" + listingTypeId;

    get_sync(url_property_type, true, function (data) {
        var html = "";
        $.each(data, function (index, value) {
            html += '<option value="' + value.propertyTypeID + '">' + value.typeName + '</option>';
        });
        $('#kind-bds').html(html).select2();
        if (finishCallBack !== undefined) {
            finishCallBack($('#kind-bds'));
        }
    });
}

function prepareListingData() {


    if ($("#userRightType").val() == "") {
        listingObjectBuilding.useRightType = null;
        listingObjectNotBuilding.useRightType = listingObjectBuilding.useRightType;
    } else {
        listingObjectBuilding.useRightType = {useRightTypeId: parseInt($("#userRightType").val())};
        listingObjectNotBuilding.useRightType = {useRightTypeId: parseInt($("#userRightType").val())};
    }

    // Hoàng
    listingObjectBuilding.isGuaranteed = $("#isGuaranteed").prop("checked");
    listingObjectNotBuilding.isGuaranteed = $("#isGuaranteed").prop("checked");
    listingObjectBuilding.alley = $('#alley').val() == "" ? null : $('#alley').val();
    listingObjectNotBuilding.alley = listingObjectBuilding.alley;
    listingObjectBuilding.propertyPosition = $("#propertyPosition").val();
    listingObjectNotBuilding.propertyPosition = $("#propertyPosition").val();
    listingObjectBuilding.amenityText = $("#amenityText").val();
    listingObjectNotBuilding.amenityText = $("#amenityText").val();


    if (briefFormId) {
        listingObjectBuilding.briefFormId = briefFormId;
    }
    listingObjectBuilding.modelCode = $('#modelCode').val() != "" ? $('#modelCode').val() : null;
    listingObjectNotBuilding.modelCode = listingObjectBuilding.modelCode;
    if ($('#developer').val() != "") {
        listingObjectBuilding.listing.project.pId = parseInt($('#developer').val());
        listingObjectNotBuilding.listing.project.pId = listingObjectBuilding.listing.project.pId;


        //listingObjectBuilding.modelCode = $('#modelCode').val() != "" ? $('#modelCode').val() : null;
        //listingObjectNotBuilding.modelCode = listingObjectBuilding.modelCode;
        listingObjectBuilding.floorsTo = $('#place-number-to').val() != "" ? parseInt($('#place-number-to').val()) : null;
        listingObjectNotBuilding.floorsTo = listingObjectBuilding.floorsTo;
        listingObjectBuilding.totalHomeForm = $('#totalHomeForm').val() != "" ? parseInt($('#totalHomeForm').val()) : null;
        listingObjectNotBuilding.totalHomeForm = listingObjectBuilding.totalHomeForm;
        listingObjectBuilding.numberAvailable = $('#numberAvailable').val() ? parseInt($('#numberAvailable').val()) : null;
        listingObjectNotBuilding.numberAvailable = listingObjectBuilding.numberAvailable;

    } else {
        listingObjectBuilding.listing.project = null;
        listingObjectNotBuilding.listing.project = listingObjectBuilding.listing.project;

        //listingObjectBuilding.modelCode = null;
        //listingObjectNotBuilding.modelCode = listingObjectBuilding.modelCode;
        listingObjectBuilding.floorsTo = null;
        listingObjectNotBuilding.floorsTo = listingObjectBuilding.floorsTo;
        listingObjectBuilding.totalHomeForm = null;
        listingObjectNotBuilding.totalHomeForm = listingObjectBuilding.totalHomeForm;
        listingObjectBuilding.numberAvailable = null;
        listingObjectNotBuilding.numberAvailable = listingObjectBuilding.numberAvailable;
    }
    listingObjectBuilding.amenitiesOtherList = [];
    listingObjectNotBuilding.amenitiesOtherList = [];
    listingObjectBuilding.rlLanguages = [];
    listingObjectNotBuilding.rlLanguages = listingObjectBuilding.rlLanguages;
    if ($('#amenities-other').val() != "" && $('#amenities-other').length > 0) {
        var amenitiesplit = $('#amenities-other').val().split(",");
        $.each(amenitiesplit, function (index, value) {
            listingObjectBuilding.amenitiesOtherList.push({
                "amenityName": $.trim(value),
            });

        });
        listingObjectNotBuilding.amenitiesOtherList = listingObjectBuilding.amenitiesOtherList;
    } else
    {
        listingObjectBuilding.amenitiesOtherList = null;
        listingObjectNotBuilding.amenitiesOtherList = listingObjectBuilding.amenitiesOtherList;
    }


    //var descriptionEn = $("#description")
    var sizeWidth = $("#width").val() == "" ? null : $("#width").val();
    listingObjectBuilding.sizeWidth = parseFloat(sizeWidth);
    listingObjectNotBuilding.sizeWidth = parseFloat(sizeWidth);

    var sizeLength = $("#length").val() == "" ? null : $("#length").val();
    listingObjectNotBuilding.sizeLength = parseFloat(sizeLength);
    listingObjectBuilding.sizeLength = parseFloat(sizeLength);

    var noteForMinPrice = $("#noteForMinPrice").val() != "" ? $.trim($("#noteForMinPrice").val()) : null;
    listingObjectNotBuilding.noteForMinPrice = noteForMinPrice;
    listingObjectBuilding.noteForMinPrice = noteForMinPrice;


    if ($("#currency").val() == "vnd") {
        var deposit = $("#deposit").val() == "" ? null : ($("#deposit").val()).replace(/\.|\,/g, '');
        listingObjectNotBuilding.deposit = parseFloat(deposit);
        listingObjectBuilding.deposit = parseFloat(deposit);

        var price = $("#price").val() == "" ? null : ($("#price").val()).replace(/\.|\,/g, '');
        listingObjectNotBuilding.price = parseFloat(price);
        listingObjectBuilding.price = parseFloat(price);

        var minPrice = $("#minPrice").val() == "" ? null : ($("#minPrice").val()).replace(/\.|\,/g, '');
        listingObjectNotBuilding.minPrice = parseFloat(minPrice);
        listingObjectBuilding.minPrice = parseFloat(minPrice);
    }
    if ($("#currency").val() == "usd") {
        var deposit = $("#deposit").val() == "" ? null : $("#deposit").val();
        listingObjectNotBuilding.deposit = parseFloat(deposit);
        listingObjectBuilding.deposit = parseFloat(deposit);

        var price = $("#price").val() == "" ? null : $("#price").val();
        listingObjectNotBuilding.price = parseFloat(price);
        listingObjectBuilding.price = parseFloat(price);

        var minPrice = $("#minPrice").val() == "" ? null : $("#minPrice").val();
        listingObjectNotBuilding.minPrice = parseFloat(minPrice);
        listingObjectBuilding.minPrice = parseFloat(minPrice);
    }

    //if($('#moveInNow').is(':checked')){
    //listingObjectNotBuilding.moveInDate = parseFloat(new Date().getTime() - (20 * 24 * 60 * 60 * 1000));
    //listingObjectBuilding.moveInDate = listingObjectNotBuilding.moveInDate;
    // }
    //else{
    // listingObjectNotBuilding.moveInDate = $('#eventDate').val() == "" ? null : Date.parse($('#eventDate').val());;
    // listingObjectBuilding.moveInDate = listingObjectNotBuilding.moveInDate;
    //}

    var bathroom = parseInt($("#bathroom-number").val());
    listingObjectNotBuilding.bathRooms = bathroom;
    listingObjectBuilding.bathRooms = bathroom;

    if ($('#kind-bds').val() == "4" || $('#kind-bds').val() == "10") {
        var bedRooms = null;
        listingObjectNotBuilding.bedRooms = bedRooms;
        listingObjectBuilding.bedRooms = bedRooms;
    } else {
        var bedRooms = $("#bedroom-number").val() == "" ? null : parseInt($("#bedroom-number").val());
        listingObjectNotBuilding.bedRooms = bedRooms;
        listingObjectBuilding.bedRooms = bedRooms;
    }
    var rlLanguage = {
        "id": {"language": "en"},
        "description": null,
        "noteForAgent": null,
        "title": null
    }
    if (CKEDITOR.instances["description-en"].getData() == "" && CKEDITOR.instances["noteForAgent-en"].getData() == "" && $('#title-listing-en').val() == "") {
        var descriptionEn = null;
        rlLanguage.description = descriptionEn

        var noteForAgentEn = null;
        rlLanguage.noteForAgent = noteForAgentEn;

        var title = null;
        rlLanguage.title = title;

        listingObjectNotBuilding.rlLanguages = null;
        listingObjectBuilding.rlLanguages = listingObjectNotBuilding.rlLanguages;
    } else
    {
        if (CKEDITOR.instances["description-en"].getData() != "") {
            var descriptionEn = CKEDITOR.instances["description-en"].getData();
            rlLanguage.description = descriptionEn;
        }
        if (CKEDITOR.instances["noteForAgent-en"].getData() != "") {
            var noteForAgentEn = CKEDITOR.instances["noteForAgent-en"].getData();
            rlLanguage.noteForAgent = noteForAgentEn;
        }
        if ($('#title-listing-en').val() != "") {
            var title = $('#title-listing-en').val();
            rlLanguage.title = title;
        }
        listingObjectNotBuilding.rlLanguages.push(rlLanguage);
        listingObjectBuilding.rlLanguages = listingObjectNotBuilding.rlLanguages;
    }
    var description = CKEDITOR.instances["description"].getData() == "" ? null : CKEDITOR.instances["description"].getData();
    //listingObjectNotBuilding.description = description;
    //listingObjectBuilding.description = description;
    listingObjectNotBuilding.description = description;
    listingObjectBuilding.description = listingObjectNotBuilding.description;


    var floors = $("#place-number").val() == "" ? null : parseInt($("#place-number").val());
    listingObjectNotBuilding.floors = floors;
    listingObjectBuilding.floors = floors;

    var floorSize = $("#acreage-lease").val() == "" ? null : parseFloat($("#acreage-lease").val());
    listingObjectNotBuilding.floorSize = floorSize;
    listingObjectBuilding.floorSize = floorSize;

    var lotSize = $("#acreage-land").val() == "" ? null : parseFloat($("#acreage-land").val());
    listingObjectNotBuilding.lotSize = lotSize;
    listingObjectBuilding.lotSize = lotSize;

    var smallSize = $("#acreage-small").val() == "" ? null : parseFloat($("#acreage-small").val());
    listingObjectNotBuilding.smallSize = smallSize;
    listingObjectBuilding.smallSize = smallSize;


    var currency = $("#currency").select2('data')[0].text;
    listingObjectNotBuilding.currency = currency;
    listingObjectBuilding.currency = currency;

    var yearBuilt = $("#yearbuilt").val() == "" ? null : parseInt($("#yearbuilt").val());
    listingObjectNotBuilding.yearBuilt = yearBuilt;
    listingObjectBuilding.yearBuilt = yearBuilt;

    listingObjectBuilding.photo = [];
    listingObjectBuilding.mainPhoto = [];
    $(".imageListing .file-preview .file-preview-initial").each(function (idx, element) {
        var fileName = $(element).find("img").attr('title');
        listingObjectBuilding.photo.push({
            link: $(element).find("img").data("src"),
            caption: $(element).find(".file-footer-caption input").val(),
            isPrivate: $(element).find('input[type="checkbox"]').is(':checked') ? true : false
        });

        listingObjectBuilding.mainPhoto.push({
            url_path: $(element).find("img").attr("src"),
            url_thumb: $(element).find("img").attr("src"),
            url_large: $(element).find("img").attr("src"),
            file_id: null,
            file_name: $(element).find("img").data("src"),
            caption: $(element).find(".file-footer-caption input").val()
        });
    });

    listingObjectBuilding.redBookPhoto = [];
    listingObjectBuilding.mainDrawingPhoto = [];
    $(".redBookPhoto .file-preview .file-preview-initial").each(function (idx, element) {
        var fileName = $(element).find("img").data('src');
        listingObjectBuilding.redBookPhoto.push(fileName);
        fileName = fileName.split("/");
        fileName = fileName[fileName.length - 1];
        fileId = fileName.split(".");
        fileId = fileId[0];
        //console.log(fileId);
        listingObjectBuilding.mainDrawingPhoto.push({
            url_path: $(element).find("img").attr('src'),
            url_thumb: $(element).find("img").attr('src'),
            url_large: $(element).find("img").attr('src'),
            file_id: null,
            file_name: $(element).find("img").data('src'),
            caption: $(element).find(".file-footer-caption input").val()
        });
    });

    listingObjectBuilding.pinkBookPhoto = [];
    $(".pinkBookPhoto .file-preview .file-preview-initial").each(function (idx, element) {
        var fileName = $(element).find("img").data('src');
        listingObjectBuilding.pinkBookPhoto.push(fileName);
    });

    listingObjectBuilding.redBookPhoto = ((listingObjectBuilding.redBookPhoto.length == 0) ? null : JSON.stringify(listingObjectBuilding.redBookPhoto));
    listingObjectBuilding.mainDrawingPhoto = ((listingObjectBuilding.mainDrawingPhoto.length == 0) ? null : JSON.stringify(listingObjectBuilding.mainDrawingPhoto));
    listingObjectNotBuilding.mainDrawingPhoto = listingObjectBuilding.mainDrawingPhoto;
    listingObjectBuilding.pinkBookPhoto = ((listingObjectBuilding.pinkBookPhoto.length == 0) ? null : JSON.stringify(listingObjectBuilding.pinkBookPhoto));

    listingObjectBuilding.photo = ((listingObjectBuilding.photo.length == 0) ? null : JSON.stringify(listingObjectBuilding.photo));
    listingObjectNotBuilding.photo = listingObjectBuilding.photo;

    listingObjectBuilding.mainPhoto = ((listingObjectBuilding.mainPhoto.length == 0) ? null : JSON.stringify(listingObjectBuilding.mainPhoto));
    listingObjectNotBuilding.mainPhoto = listingObjectBuilding.mainPhoto;

    listingObjectBuilding.video = [];
    listingObjectBuilding.mainVideo = [];
    $(".videoListing .file-preview .file-preview-initial").each(function (idx, element) {
        listingObjectBuilding.video.push($(element).find("video source").attr("src"));

        listingObjectBuilding.mainVideo.push({
            url_path: url_path_video,
            url_video: $(element).find("video source").attr("src"),
            file_id: $(element).find("video source").attr("name"),
            file_name: $(element).find("video source").attr("title"),
            caption: $(element).find(".file-footer-caption input").val()
        });

    });

    listingObjectBuilding.video = ((listingObjectBuilding.video.length == 0) ? null : JSON.stringify(listingObjectBuilding.video));
    listingObjectNotBuilding.video = listingObjectBuilding.video;

    listingObjectBuilding.mainVideo = ((listingObjectBuilding.mainVideo.length == 0) ? null : JSON.stringify(listingObjectBuilding.mainVideo));
    listingObjectNotBuilding.mainVideo = listingObjectBuilding.mainVideo;

    var source = $("#source").val() == "" ? null : parseInt($("#source").val());
    listingObjectNotBuilding.source = source;
    listingObjectBuilding.source = source;

    if ($("#listuser").val() != "") {

        listingObjectNotBuilding.socialUser = {
            socialUid: parseInt($("#listuser").val())
        };
        listingObjectNotBuilding.account = {
            accountId: parseInt($("#listuser").find(":selected").attr('accountid'))
        };
        /*
         listingObjectNotBuilding.socialUser.socialUid = "";
         listingObjectNotBuilding.account.accountId = "";
         listingObjectNotBuilding.socialUser.socialUid = parseInt($("#listuser").val());
         listingObjectNotBuilding.account.accountId = parseInt($("#listuser").find(":selected").attr('accountid'));
         */
        listingObjectBuilding.socialUser = {
            socialUid: parseInt($("#listuser").val())
        };
        listingObjectBuilding.account = {
            accountId: parseInt($("#listuser").find(":selected").attr('accountid'))
        };
        /*
         listingObjectBuilding.socialUser.socialUid = "";
         listingObjectBuilding.account.accountId = "";
         listingObjectBuilding.socialUser.socialUid = parseInt($("#listuser").val());
         listingObjectBuilding.account.accountId = parseInt($("#listuser").find(":selected").attr('accountid'));
         */
    } else {
        var user = null;
        listingObjectNotBuilding.socialUser = user;
        listingObjectNotBuilding.account = user;

        listingObjectBuilding.socialUser = user;
        listingObjectBuilding.account = user;
    }

    var unit = $("#apartment-number").val() == "" ? null : $("#apartment-number").val();
    listingObjectNotBuilding.unit = unit;
    listingObjectBuilding.unit = unit;

    var listingLatitude = $("#lat").val() == "" ? null : parseFloat($("#lat").val());
    listingObjectNotBuilding.listing.latitude = listingLatitude;
    listingObjectBuilding.listing.latitude = listingLatitude;

    var listingLongitude = $("#long").val() == "" ? null : parseFloat($("#long").val());
    listingObjectNotBuilding.listing.longitude = listingLongitude;
    listingObjectBuilding.listing.longitude = listingLongitude;

    var listingAddress = $("#address").val() == "" ? null : $("#address").val();
    listingObjectNotBuilding.listing.address = listingAddress;
    listingObjectBuilding.listing.address = listingAddress;

    var listingShortAddress = $("#short-address").val() == "" ? null : $("#short-address").val();
    listingObjectNotBuilding.shortAddress = listingShortAddress;
    listingObjectBuilding.shortAddress = listingShortAddress;

    var requestId = $("#request").val() == "" ? null : parseInt($("#request").val());
    listingObjectNotBuilding.requestId = requestId;
    listingObjectBuilding.requestId = listingObjectNotBuilding.requestId;

    var transactionId = $("#transaction").val() == "" ? null : parseInt($("#transaction").val());
    listingObjectNotBuilding.transactionId = transactionId;
    listingObjectBuilding.transactionId = listingObjectNotBuilding.transactionId;

    listingObjectNotBuilding.listing.listingType.listingTypeID = parseInt($('#type-business').val());
    listingObjectBuilding.listing.listingType.listingTypeID = parseInt($('#type-business').val());

    listingObjectNotBuilding.listing.propertyType.propertyTypeID = parseInt(propertyTypeId);
    listingObjectBuilding.listing.propertyType.propertyTypeID = parseInt(propertyTypeId);

    listingObjectNotBuilding.listing.purpose.purPoseID = parseInt(purposeId);
    listingObjectBuilding.listing.purpose.purPoseID = parseInt(purposeId);

    listingObjectNotBuilding.listing.listingTypeName = $('#type-business').select2('data')[0].text;
    listingObjectBuilding.listing.listingTypeName = $('#type-business').select2('data')[0].text;

    listingObjectNotBuilding.listing.purposeName = $('#purpose-business').select2('data')[0].text;
    listingObjectBuilding.listing.purposeName = $('#purpose-business').select2('data')[0].text;

    listingObjectNotBuilding.listing.propertyTypeName = $('#kind-bds').select2('data')[0].text;
    listingObjectBuilding.listing.propertyTypeName = $('#kind-bds').select2('data')[0].text


    var listingYearBuilt = parseInt($("#yearbuilt").val());
    listingObjectNotBuilding.listing.yearBuilt = (listingYearBuilt != "") ? listingYearBuilt : null;
    listingObjectBuilding.listing.yearBuilt = listingObjectNotBuilding.listing.yearBuilt;

    var listingYearFixed = parseInt($("#yearfixed").val());
    listingObjectNotBuilding.listing.yearFixed = (listingYearFixed != "") ? listingYearFixed : null;
    listingObjectBuilding.listing.yearFixed = listingObjectNotBuilding.listing.yearFixed;

    var numberBasement = $("#baseme").val() == "" ? null : parseInt($("#baseme").val());
    listingObjectNotBuilding.listing.numberBasement = numberBasement;
    listingObjectBuilding.listing.numberBasement = numberBasement;

    var numberElevator = $("#numberElevator").val() == "" ? null : parseInt($("#numberElevator").val());
    listingObjectNotBuilding.listing.numberElevator = numberElevator;
    listingObjectBuilding.listing.numberElevator = numberElevator;

    var numberFloor = $("#floor-listing").val() == "" ? null : parseInt($("#floor-listing").val());
    listingObjectNotBuilding.listing.numberFloor = numberFloor;
    listingObjectBuilding.listing.numberFloor = numberFloor;

    if ($("#city").val() == "") {
        var cityId = null;
        listingObjectNotBuilding.listing.cityId = cityId;
        listingObjectBuilding.listing.cityId = cityId;

        listingObjectNotBuilding.city = cityId;
        listingObjectBuilding.city = cityId;
    } else {
        var cityId = parseInt($("#city").val());
        //var cityId = parseInt($("#city").val());
        listingObjectNotBuilding.listing.cityId = cityId;
        listingObjectBuilding.listing.cityId = cityId;

        listingObjectNotBuilding.city = {"cityId": parseInt($("#city").val())};
        listingObjectBuilding.city = {"cityId": parseInt($("#city").val())};
    }

    if ($("#ward").val() == "") {

        listingObjectNotBuilding.listing.wardId = null;
        listingObjectBuilding.listing.wardId = null;

        listingObjectNotBuilding.ward = null;
        listingObjectBuilding.ward = null;
    } else {
        var wardId = parseInt($("#ward").val());

        listingObjectNotBuilding.listing.wardId = wardId;
        listingObjectBuilding.listing.wardId = wardId;
        //var cityId = parseInt($("#city").val());
        listingObjectNotBuilding.ward = {"wardId": wardId};
        listingObjectBuilding.ward = {"wardId": wardId};
    }


    // hoàng 2017-01-05
    listingObjectBuilding.houseNumber = $("#houseNumber").val().trim();
    if (listingObjectBuilding.houseNumber === "") {
        listingObjectBuilding.houseNumber = null;
    }
    listingObjectNotBuilding.houseNumber = listingObjectBuilding.houseNumber;
    if ($("#streetId").val() == "") {
        listingObjectNotBuilding.street = null;
        listingObjectBuilding.street = null;
    } else {
        var streetId = parseInt($("#streetId").val());
        //var cityId = parseInt($("#city").val());
        listingObjectNotBuilding.street = {"streetId": streetId};
        listingObjectBuilding.street = {"streetId": streetId};
    }
    //end hoàng 2017-01-05

    var direction = $("#direction").val();
    if (direction == 0) {
        delete listingObjectNotBuilding.direction;
        delete listingObjectBuilding.direction;
    } else {
        listingObjectNotBuilding.direction = {"dId": parseInt(direction)};
        listingObjectBuilding.direction = listingObjectNotBuilding.direction;
    }

    if ($("#district").val() == "") {
        var districtId = null;
        listingObjectNotBuilding.listing.districtId = districtId;
        listingObjectBuilding.listing.districtId = districtId;

        listingObjectNotBuilding.district = districtId;
        listingObjectBuilding.district = districtId;
    } else {

        var districtId = parseInt($("#district").val());
        listingObjectNotBuilding.listing.districtId = districtId;
        listingObjectBuilding.listing.districtId = districtId;

        listingObjectNotBuilding.district = {"districtId": parseInt($("#district").val())};
        listingObjectBuilding.district = {"districtId": parseInt($("#district").val())};
    }


    listingObjectNotBuilding.amenitiesList = [];

    $('.amenity-content input[type="checkbox"]:checked').each(function ()
    {
        var content = $(this).closest('.utilitie-item-content');
        ObjectAmenities = {
            "id": {
                "amenityId": 0
            },
            "amenityName": ""
        }

        if ($(this).attr('data') == 0) {
            ObjectAmenities.id.amenityId = parseInt($(this).val());
            ObjectAmenities.amenityName = $(this).attr('dataText');
            // break;
            listingObjectNotBuilding.amenitiesList.push(ObjectAmenities);
            listingObjectBuilding.amenitiesList = listingObjectNotBuilding.amenitiesList;
        }
    });

    if (listingObjectNotBuilding.amenitiesList.length == 0)
    {
        listingObjectNotBuilding.amenitiesList = null;
        listingObjectBuilding.amenitiesList = listingObjectNotBuilding.amenitiesList
    }

    listingObjectNotBuilding.relatedListingFees = [];
    $('.fee-listing').each(function () {
        relatedFee = {
            "id": {
                "feesTypeId": 1
            },
            "feesName": "test1",
            "price": 232.3,
            "currency": "USD"
        }
        if ($(this).find('input[type="checkbox"]').is(':checked'))
        {
            relatedFee.id.feesTypeId = parseInt($(this).find('#fee-checkbox').attr('ftId'));
            relatedFee.feesName = $(this).find('#fee-checkbox').attr('dataname');
            relatedFee.price = null;
            relatedFee.currency = null;
            relatedFee.includingPrice = true;
        } else
        {
            relatedFee.id.feesTypeId = parseInt($(this).find('#fee-checkbox').attr('ftId'));
            relatedFee.feesName = $(this).find('#fee-checkbox').attr('dataname');
            relatedFee.currency = $("#currency_fee").select2('data')[0].text;
            relatedFee.price = parseFloat($(this).find('#fee').val());
            relatedFee.includingPrice = false;
        }
        console.log(relatedFee);
        listingObjectNotBuilding.relatedListingFees.push(relatedFee);
        listingObjectBuilding.relatedListingFees.push(relatedFee);

    });



    if ($('#type-business').val() == 2) {
        if ($('#moveInNow').is(':checked')) {
            rlMoveInDate.moveInDate = null; //parseFloat(new Date().getTime() - (20 * 24 * 60 * 60 * 1000));
            rlMoveInDate.afterSigningContract = false;
            rlMoveInDate.moveInNow = true;
            rlMoveInDate.afterNumberDays = null;
        } else {
            rlMoveInDate.moveInDate = $('#eventDate').val() == "" ? null : $('#eventDate').val().parseDate("-");
            rlMoveInDate.afterSigningContract = false;
            rlMoveInDate.moveInNow = false;
            rlMoveInDate.afterNumberDays = null;

        }
    }
    if ($('#type-business').val() == 1)
    {
        if ($('#afterSigningContract').is(':checked'))
        {
            rlMoveInDate.moveInDate = null;
            rlMoveInDate.afterSigningContract = true;
            rlMoveInDate.moveInNow = false;
            rlMoveInDate.afterNumberDays = null;
        }
        if ($('#afterNumberDays').is(':checked'))
        {
            rlMoveInDate.moveInDate = null;
            rlMoveInDate.afterSigningContract = false;
            rlMoveInDate.moveInNow = false;
            rlMoveInDate.afterNumberDays = parseInt($('#afterNumberDaysSelect').val());

        }
        if ($('#moveInNowSale').is(':checked'))
        {
            rlMoveInDate.moveInDate = null;
            rlMoveInDate.afterSigningContract = false;
            rlMoveInDate.moveInNow = true;
            rlMoveInDate.afterNumberDays = null;
        }
        if ($('#eventDateSaleCheck').is(':checked'))
        {
            rlMoveInDate.moveInDate = $('#eventDateSale').val() == "" ? null : $('#eventDateSale').val().parseDate("-");
            rlMoveInDate.afterSigningContract = false;
            rlMoveInDate.moveInNow = false;
            rlMoveInDate.afterNumberDays = null;
        }
    }
    listingObjectBuilding.relatedListingFees = listingObjectNotBuilding.relatedListingFees;
    listingObjectNotBuilding.commissionList = [];


    $('.row-hh').each(function () {
        if ($(this).find('.commision-time').val() != "" && $(this).find('.commision').val() != "" && $('#type-business').val() == 2) {
            commision = {
                "commision": 0.5,
                "contractTime": 2
            },
            commision.commision = parseFloat($(this).find('.commision').val());
            commision.contractTime = parseInt($(this).find('.commision-time').val());
            listingObjectNotBuilding.commissionList.push(commision);
            listingObjectNotBuilding.commissionFrom = null;
            listingObjectNotBuilding.commissionTo = null;
            listingObjectNotBuilding.commissionPrice = null
        }
    });
    if ($('.row-hh').find('[name="sellCommission"]:checked').val() == 1 && $('#type-business').val() == 1) {
        if ($('#sellCommissionValue').val() != "") {
            listingObjectNotBuilding.commissionFrom = parseFloat($('.row-hh').find('#sellCommissionValue').val());
            listingObjectNotBuilding.commissionTo = parseFloat($('.row-hh').find('#sellCommissionValue').val());
            listingObjectNotBuilding.commissionPrice = null;
            listingObjectNotBuilding.commissionList = null;

            listingObjectBuilding.commissionFrom = parseFloat($('.row-hh').find('#sellCommissionValue').val());
            listingObjectBuilding.commissionTo = parseFloat($('.row-hh').find('#sellCommissionValue').val());
            listingObjectBuilding.commissionPrice = null;
            listingObjectBuilding.commissionList = null;
        } else
        {
            listingObjectNotBuilding.commissionFrom = null;
            listingObjectNotBuilding.commissionTo = null;
            listingObjectNotBuilding.commissionPrice = null;
            listingObjectNotBuilding.commissionList = null;

            listingObjectBuilding.commissionFrom = null;
            listingObjectBuilding.commissionTo = null;
            listingObjectBuilding.commissionPrice = null;
            listingObjectBuilding.commissionList = null;
        }
    }
    if ($('.row-hh').find('[name="sellCommission"]:checked').val() == 2 && $('#type-business').val() == 1) {
        if ($('#sellCommissionValueMoney').val() != "") {
            listingObjectNotBuilding.commissionFrom = null;
            listingObjectNotBuilding.commissionTo = null;
            listingObjectNotBuilding.commissionPrice = parseFloat($('.row-hh').find('#sellCommissionValueMoney').val()) * 1000000;
            listingObjectNotBuilding.commissionList = null;

            listingObjectBuilding.commissionFrom = null;
            listingObjectBuilding.commissionTo = null;
            listingObjectBuilding.commissionPrice = parseFloat($('.row-hh').find('#sellCommissionValueMoney').val()) * 1000000;
            listingObjectBuilding.commissionList = null;
        } else {
            listingObjectNotBuilding.commissionFrom = null;
            listingObjectNotBuilding.commissionTo = null;
            listingObjectNotBuilding.commissionPrice = null;
            listingObjectNotBuilding.commissionList = null;

            listingObjectBuilding.commissionFrom = null;
            listingObjectBuilding.commissionTo = null;
            listingObjectBuilding.commissionPrice = null;
            listingObjectBuilding.commissionList = null;
        }
    }
    if (listingObjectNotBuilding.commissionList == null)
    {
        listingObjectNotBuilding.commissionList = null;
        listingObjectBuilding.commissionList = listingObjectNotBuilding.commissionList
    }
    listingObjectBuilding.commissionList = listingObjectNotBuilding.commissionList;

    if ($("#title-content-meta").val() != "" || $("#title-content-meta-en").val() != "") {
        listingObjectNotBuilding.relatedListingMetaTags[0].metaContent = $("#title-content-meta").val() == "" ? null : $("#title-content-meta").val();
        listingObjectNotBuilding.relatedListingMetaTags[0].metaName = $("#title-content-meta").val() == "" ? null : "title";
    }
    listingObjectNotBuilding.relatedListingMetaTags[0].metaContentEn = $("#title-content-meta-en").val() == "" ? null : $("#title-content-meta-en").val();

    if ($("#meta-description").val() != "" || $("#meta-description-en").val() != "") {

        listingObjectNotBuilding.relatedListingMetaTags[1].metaName = $("#meta-description").val() == "" ? null : "description";
        listingObjectNotBuilding.relatedListingMetaTags[1].metaContent = $("#meta-description").val() == "" ? null : $.trim($("#meta-description").val());
        listingObjectNotBuilding.relatedListingMetaTags[1].metaContentEn = $("#meta-description-en").val() == "" ? null : $.trim($("#meta-description-en").val());
    }
    if ($("#keyword").val() != "" || $("#keyword-en").val() != "") {
        listingObjectNotBuilding.relatedListingMetaTags[2].metaContent = $("#keyword").val() == "" ? null : $("#keyword").val();
        listingObjectNotBuilding.relatedListingMetaTags[2].metaName = $("#keyword").val() == "" ? null : "keywords";
        listingObjectNotBuilding.relatedListingMetaTags[2].metaContentEn = $("#keyword-en").val() == "" ? null : $("#keyword-en").val();

    }

    listingObjectBuilding.relatedListingMetaTags[0].metaContent = listingObjectNotBuilding.relatedListingMetaTags[0].metaContent
    listingObjectBuilding.relatedListingMetaTags[0].metaContentEn = listingObjectNotBuilding.relatedListingMetaTags[0].metaContentEn
    listingObjectBuilding.relatedListingMetaTags[1].metaContent = listingObjectNotBuilding.relatedListingMetaTags[1].metaContent
    listingObjectBuilding.relatedListingMetaTags[1].metaContentEn = listingObjectNotBuilding.relatedListingMetaTags[1].metaContentEn
    listingObjectBuilding.relatedListingMetaTags[2].metaContent = listingObjectNotBuilding.relatedListingMetaTags[2].metaContent
    listingObjectBuilding.relatedListingMetaTags[2].metaContentEn = listingObjectNotBuilding.relatedListingMetaTags[2].metaContentEn

    listingObjectNotBuilding.socialCommunications[0].email = $("#ownerEmail").val() == "" ? null : $.trim($("#ownerEmail").val());
    listingObjectNotBuilding.socialCommunications[0].name = $("#namesocialcommunications").val() == "" ? null : $.trim($("#namesocialcommunications").val());
    listingObjectNotBuilding.socialCommunications[0].phone = $("#ownerPhone").val() == "" ? null : $.trim($("#ownerPhone").val());
    listingObjectNotBuilding.socialCommunications[0].address = $("#ownerAddress").val() == "" ? null : $.trim($("#ownerAddress").val());
    listingObjectNotBuilding.socialCommunications[0].telephone = $("#ownerTel").val() == "" ? null : $.trim($("#ownerTel").val());
    listingObjectNotBuilding.socialCommunications[0].id.socialUid = $("#ownerSocialUid").val() == "" ? -1 : $.trim($("#ownerSocialUid").val());

    listingObjectBuilding.socialCommunications[0].email = listingObjectNotBuilding.socialCommunications[0].email;
    listingObjectBuilding.socialCommunications[0].name = listingObjectNotBuilding.socialCommunications[0].name;
    listingObjectBuilding.socialCommunications[0].phone = listingObjectNotBuilding.socialCommunications[0].phone;
    listingObjectBuilding.socialCommunications[0].address = listingObjectNotBuilding.socialCommunications[0].address;
    listingObjectBuilding.socialCommunications[0].telephone = listingObjectNotBuilding.socialCommunications[0].telephone;
    listingObjectBuilding.socialCommunications[0].id.socialUid = listingObjectNotBuilding.socialCommunications[0].id.socialUid;

    if ($('#allowchange').find('input[type="checkbox"]').is(':checked')) {
        listingObjectNotBuilding.allowChange = true;
        listingObjectBuilding.allowChange = true;
    } else {
        listingObjectNotBuilding.allowChange = false;
        listingObjectBuilding.allowChange = false;
    }

    if ($('#isVat').is(':checked')) {
        listingObjectNotBuilding.isVAT = true;
        listingObjectBuilding.isVAT = listingObjectNotBuilding.isVAT;
    } else {
        listingObjectNotBuilding.isVAT = false;
        listingObjectBuilding.isVAT = listingObjectNotBuilding.isVAT;
    }


    listingObjectBuilding.socialCommunications.splice(1, 1);
    listingObjectNotBuilding.socialCommunications = listingObjectBuilding.socialCommunications;
    if ($('#agentList').val() != "") {
        //add
        socialAgent.id.socialUid = $("#agentList").val() == "" ? null : $("#agentList").select2().find(":selected").attr("socialuid");

        socialAgent.email = $('#agentEmail').val() == "" ? null : $.trim($('#agentEmail').val());
        socialAgent.name = $("#agentList").val() == "" ? null : $("#agentList").select2('data')[0].text;
        socialAgent.telephone = $("#agentTel").val() == "" ? null : $.trim($("#agentTel").val());
        socialAgent.phone = $('#agentPhone').val() == "" ? null : $.trim($('#agentPhone').val());
        socialAgent.address = $('#agentAddress').val() == "" ? null : $.trim($('#agentAddress').val());

        listingObjectBuilding.socialCommunications.push(socialAgent);
        listingObjectNotBuilding.socialCommunications = listingObjectBuilding.socialCommunications
    }
    var noteForAgent = CKEDITOR.instances["noteForAgent"].getData() == "" ? null : CKEDITOR.instances["noteForAgent"].getData();
    listingObjectBuilding.noteForAgent = noteForAgent;
    listingObjectNotBuilding.noteForAgent = listingObjectBuilding.noteForAgent;

    var textBds = $('#kind-bds option:selected').text().slug();
    var districtName = $('#district option:selected').text().slug();
    //var propertyTypeId = $('#kind-bds').val();
    if (propertyTypeId == 4) {
        buildingName = "#RID#";
    } else {
        buildingName = $('#kind-bds option:selected').text().slug() + "-" + "#RID#";
    }
    listingObjectBuilding.linkOfListing = SITE_VIEW + '/chi-tiet/' + textBds + '/' + districtName + '/' + buildingName;
    listingObjectNotBuilding.linkOfListing = SITE_VIEW + '/chi-tiet/' + textBds + '/' + districtName + '/' + buildingName;

    $('#isPrivate').is(':checked') ? listingObjectNotBuilding.isPrivate = true : listingObjectNotBuilding.isPrivate = false;
    listingObjectBuilding.isPrivate = listingObjectNotBuilding.isPrivate;

    $('#isAvailable').is(':checked') ? listingObjectNotBuilding.isAvailable = true : listingObjectNotBuilding.isAvailable = false;
    listingObjectBuilding.isAvailable = listingObjectNotBuilding.isAvailable;

    if (isBuilding) {

        var listingYearBuilt = null;
        listingObjectNotBuilding.listing.yearBuilt = (listingYearBuilt != "") ? listingYearBuilt : null;
        listingObjectBuilding.listing.yearBuilt = listingObjectNotBuilding.listing.yearBuilt;

        var listingYearFixed = null;
        listingObjectNotBuilding.listing.yearFixed = (listingYearFixed != "") ? listingYearFixed : null;
        listingObjectBuilding.listing.yearFixed = listingObjectNotBuilding.listing.yearFixed;

        var numberBasement = null;
        listingObjectNotBuilding.listing.numberBasement = numberBasement;
        listingObjectBuilding.listing.numberBasement = numberBasement;

        var numberElevator = null;
        listingObjectNotBuilding.listing.numberElevator = numberElevator;
        listingObjectBuilding.listing.numberElevator = numberElevator;

        var numberFloor = null;
        listingObjectNotBuilding.listing.numberFloor = numberFloor;
        listingObjectBuilding.listing.numberFloor = numberFloor;
        //alert($('#building').attr('lisingId'));
        listingObjectBuilding.listing.blockId = ($('#block').val() == "") ? null : parseInt($('#block').val());
        listingObjectBuilding.listing.listingId = parseInt($('#building').select2().find(":selected").attr("listingId"));
        //delete listingObjectBuilding.listing.city;
        //delete listingObjectBuilding.listing.districtId;

        if ($("#title-listing").val() != "") {
            var title = $("#title-listing").val();
            listingObjectNotBuilding.title = title;
            listingObjectBuilding.title = title;

            listingObjectBuilding.listing.title = title;
            listingObjectNotBuilding.listing.title = title;
        } else {
            var title = $("#building").select2('data')[0].text;
            listingObjectNotBuilding.title = title;
            listingObjectBuilding.title = title;

            listingObjectBuilding.listing.title = title;
            listingObjectNotBuilding.listing.title = title;
        }

    } else {

        delete listingObjectBuilding.listing.listingId;
        delete listingObjectBuilding.blockId;
        var numberFloor = $("#floor-listing").val() == "" ? null : parseInt($("#floor-listing").val());
        listingObjectNotBuilding.listing.numberFloor = numberFloor;
        listingObjectBuilding.listing.numberFloor = numberFloor;

        var listingYearBuilt = $("#yearbuilt").val() == "" ? null : parseInt($("#yearbuilt").val());
        listingObjectNotBuilding.listing.yearBuilt = listingYearBuilt;
        listingObjectBuilding.listing.yearBuilt = listingObjectNotBuilding.listing.yearBuilt;

        var listingYearFixed = $("#yearfixed").val() == "" ? null : parseInt($("#yearfixed").val());
        listingObjectNotBuilding.listing.yearFixed = listingYearFixed;
        listingObjectBuilding.listing.yearFixed = listingObjectNotBuilding.listing.yearFixed;

        var numberBasement = $("#baseme").val() == "" ? null : parseInt($("#baseme").val());
        listingObjectNotBuilding.listing.numberBasement = numberBasement;
        listingObjectBuilding.listing.numberBasement = numberBasement;

        var numberElevator = $("#numberElevator").val() == "" ? null : parseInt($("#numberElevator").val());
        listingObjectNotBuilding.listing.numberElevator = numberElevator;
        listingObjectBuilding.listing.numberElevator = numberElevator;

        if ($('input[name="isRooftop"]').is(':checked')) {
            listingObjectNotBuilding.listing.isRooftop = true;
            listingObjectBuilding.listing.isRooftop = true;
        }
        if ($('input[name="isMezzanine"]').is(':checked')) {
            listingObjectNotBuilding.listing.isMezzanine = true;
            listingObjectBuilding.listing.isMezzanine = true;
        }
        if ($('input[name="isPenhouse"]').is(':checked')) {
            listingObjectNotBuilding.listing.isPenhouse = true;
            listingObjectBuilding.listing.isPenhouse = true;
        }
        listingObjectNotBuilding.listing.listingId = parseInt($('#listingId').val());
        listingObjectBuilding.listing.listingId = parseInt($('#listingId').val());

        //listingObjectBuilding.title = ""
        var title = $("#title-listing").val();
        listingObjectBuilding.title = title;
        listingObjectNotBuilding.title = title;

        listingObjectBuilding.listing.title = title;
        listingObjectNotBuilding.listing.title = title;

        //listingObjectBuilding.listing.cityId = parseInt($('#city').val());
        //listingObjectBuilding.listing.districtId = parseInt($('#district').val());
    }
    return true;
}
