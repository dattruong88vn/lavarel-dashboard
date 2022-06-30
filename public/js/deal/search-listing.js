var loadtime = 0;
$("#btnSearchListing").on("click", function (event) {
    // alert('this');return false
    event.preventDefault();
    var postData = null;
    if ((typeof deal) != "undefined") {
        postData = $("#dealInformation").serialize();
    } else {
        postData = $("#formCustomerInfo").serialize();
    }
    prepareForm();
    showPropzyLoading();
    //countRelatedListings();
    // console.log(postData);return false;
    $.ajax({
        url: "/deal/custom-search-form",
        type: "post",
        data: postData
    }).done(function (response) {
        $("#wardType").html(response.wardType);
        $("#directionType").html(response.directionType);
        $("#districtType").html(response.districtType);
        $("#alleyFromTo").html(response.alleyFromTo);
        $("#alleyToValue").html(response.alleyToValue);
        $("#lengthFromTo").html(response.lengthFromTo);
        $("#lengthToValue").html(response.lengthToValue);
        $("#widthFromTo").html(response.widthFromTo);
        $("#widthToValue").html(response.widthToValue);
        $("#yearBuiltFromTo").html(response.yearBuiltFromTo);
        $("#yearBuiltToValue").html(response.yearBuiltToValue);
        $("#privateListing").html(response.privateListing);
        $("#checkLength").html('<input value="1" name="checkLength" type="checkbox">');
        $("#checkWidth").html('<input value="1" name="checkWidth" type="checkbox">');
        $("#modalSearchListing .wardIds").val(response.wardIds);
        countRelatedListings();

        if ($("input[name='lengthFromTo']").val() != "" && $("input[name='lengthToValue']").val() != "") {
            $("input[name='checkLength']").prop('checked', true);
        }
        if ($("input[name='widthFromTo']").val() != "" && $("input[name='widthToValue']").val() != "") {
            $("input[name='checkWidth']").prop('checked', true);
        }

        isFirstSearchListing = false;
        $("#modalSearchListing input").on("change blur", function () {
            if ($(this).hasClass("ward") == true && $(this).is(":checked")) {
                var wardsParent = $(this).parents('div.wards');
                wardsParent.siblings('.districts-selector').children('input').prop('checked', true);
            }
            countRelatedListings();
        });

        $('.districts-selector').children('input').on("change", function () {
            if (!$(this).is(":checked")) {
                $(this).parent().siblings('.wards').find('input.ward').prop('checked', false);
            }
        });

        $("#modalSearchListing").modal();
    }).always(function () {
        hidePropzyLoading();
    });
});


$("#btnDoSearchListing").on("click", function (event) {
    event.preventDefault();
    $("#formSeachListing").find(".historyType").val(122);
    var isValidated = true;
    var msg = "";
    var lengthFromTo = $('input[name=lengthFromTo]').val().trim();
    var lengthToValue = $('input[name=lengthToValue]').val().trim();
    var widthFromTo = $('input[name=widthFromTo]').val().trim();
    var widthToValue = $('input[name=widthToValue]').val().trim();

    if ($('input[name=checkWidth]:checked').is(":checked") && (lengthFromTo == "" || lengthToValue == "")) {
        msg = "Cần điền đủ 2 tham số chiều dài";
        isValidated = false;
    }

    if ($('input[name=checkWidth]:checked').is(":checked") && (widthFromTo == "" || widthToValue == "")) {
        msg = "Cần điền đủ 2 tham số chiều rộng";
        isValidated = false;
    }

    if ((widthFromTo !== "" && !$.isNumeric(widthFromTo)) || (widthToValue != "" && !$.isNumeric(widthToValue)) || (lengthFromTo != "" && !$.isNumeric(lengthFromTo)) || (lengthToValue != "" && !$.isNumeric(lengthToValue))) {
        msg = "Phải nhập số";
        isValidated = false;
    }

    if (isValidated === false) {
        showPropzyAlert(msg);
        return false;
    }
    $("#modalSearchListing").modal('hide');
    findListing();
    if (showSearchResultOverview) {
        SearchListingsResultOverview.showModal();
    }
});


function findListing() {
    //event.preventDefault();
    var postData = null;
    if ((typeof deal) != "undefined") {
        postData = $("#dealInformation").serialize();
    } else {
        postData = $("#formCustomerInfo").serialize();
    }
    var dataSearch = $("#formSeachListing").serialize();
    postData += "&" + dataSearch;
    // console.log(postData);return false;
    showListing(postData);
}


function countRelatedListings() {
    //event.preventDefault();
    var postData = null;
    $("#modalSearchListing .totalItems").html('Đang đếm...');
    if ((typeof deal) != "undefined") {
        postData = $("#dealInformation").serialize();
    } else {
        postData = $("#formCustomerInfo").serialize();
    }
    var dataSearch = $("#formSeachListing").serialize();
    postData += "&" + dataSearch;
    $.ajax({
        url: "/deal/count-advange-listing?_myajax=1&" + postData,
        type: 'get'
    }).done(function (response) {
        $("#modalSearchListing .totalItems").html(response.data.totalItems);
    }).always(function () {
    });
}

function getWardForSearchListing(districtSelector, districtId) {
    showPropzyLoading();
    var wardIds = $("#modalSearchListing .wardIds").val();
    $.ajax({
        url: "/zone/get-wards/" + districtId,
        type: 'get'
    }).done(function (response) {
        if (response.result) {
            var html = "";
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                if (wardIds.indexOf(item.wardId + ",") < 0) {
                    continue;
                }
                html += "<label><input class='ward' type='checkbox' name='wardAdvange[]' value=" + item.wardId + " /> " + item.wardName + "</label>";
            }
            $(districtSelector).parents('.district-wrapper').find(".wards").html(html);
            $("#modalSearchListing input.ward").on("change blur", function () {
                countRelatedListings();
            });
        }
    }).always(function () {
        hidePropzyLoading();
    });
    return true;
}
var dataTableListings = null;
function showListing(postData) {
    try {
        dataTableListings.destroy();
    } catch (Ex) {
    }
    loadtime++;
    var dataUrl = "/deal/find-advange-listing?_myajax=1&" + postData + "&loadtime=" + loadtime;
    dataTableListings = $('#dataTableListings').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": dataUrl,
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": true,
        "scrollY": "400px",
        "fixedHeader": true,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "rlistingId", render: renderMatchedListing.renderSelectListing},
            {"data": "rlistingId", render: renderMatchedListing.renderListingId},
            {"data": "rlistingId", render: renderMatchedListing.renderListingImage},
            {"data": "rlistingId", render: renderMatchedListing.renderRedOrPinkBook},
            {"data": "formatMinPrice"},
            {"data": "valuationType"},
            {"data": "formatPrice"},
            {"data": "formatSize", render: renderMatchedListing.renderSize},
            {"data": "address", width: "16%"},
            {"data": "sourceBy", render: renderMatchedListing.renderSourceBy},
            {"data": "liveDate", render: renderMatchedListing.renderLiveDateCount},
            {"data": "updatedDate", render: ProductRender.renderListingCountDayFromLastUpdate},
            {"data": "directionName"},
            {"data": "yearBuilt"},
            {"data": "percentValue"}
        ],
        "createdRow": function (row, data, dataIndex) {
            $(row).attr('data-item-id', data.rlistingId);
            if (data.isGuaranteed) {
                $(row).addClass('guaranteed');
            }
            if (data.isPrivate) {
                $(row).addClass('listing-private');
            }
        }
    });
    $('#dataTableListings').on('draw.dt', function () {
        $('.getLogListing').on('click', function (e, value) {
            event.preventDefault();
            var listingID = $(this).attr('data-listing-id');
            getLogListing(listingID);
        });


        $(".pinkBookPhoto").on("click", function (event) {
            event.preventDefault();
            var photos = JSON.parse($(this).parents("tr").find(".pinkBookPhotos").html());
            if (photos) {
                var html = "";
                for (var x in photos) {
                    html += "<div class='item' style='text-align:center'><img src='" + photos[x] + "' /></div>";
                }
                initSlideModal(html);
            }
        });
        $(".redBookPhoto").on("click", function (event) {
            event.preventDefault();
            var photos = JSON.parse($(this).parents("tr").find(".redBookPhotos").text());
            if (photos) {
                var html = "";
                for (var x in photos) {
                    html += "<div class='item' style='text-align:center'><img src='" + photos[x] + "' /></div>";
                }
                initSlideModal(html);
            }
        });
    });
}

function openModalListingDetai(idListing){
    showPropzyLoading();
    var postData = {
        "listingId": parseInt(idListing)
    };
    $.ajax({
        'url': '/common/open-modal-listing-detail',
        'type': 'post',
        'data': JSON.stringify(postData)
    }).done(function (response) {
        if (response) {
          $('#listingDetailModal').html(response);
          $('#listingDetailModal').modal();
          renderStar();
        }
    }).always(function () {
        hidePropzyLoading();
    });
}

var renderMatchedListing = {
    renderSelectListing: function (data, type, object) {
        var returnValue = '<input type="checkbox" class="selected-email-listing selected-listing-' + object.rlistingId + '" value="' + object.rlistingId + '" />';
        return returnValue;
    },
    renderListingId: function (data, type, object) {
        var returnValue = '<a onclick="JMDetail.openModalListingDetailForAllPage('+data+');return false;" href="#" target="_blank">' + object.rlistingId + '</a>';
        return returnValue;
    },
    renderListingImage: function (data, type, object) {
        if (!object.photo) {
            return "";
        }
        var returnValue = '<img onerror="imgError(this);" src="' + object.photo.link + '" style="max-height:32px;max-width:50px;" />';
        return returnValue;
    },
    renderPhotoJM : function(data,type,object){
      var returnValue = "";
      if (object.photo != 'NA' && object.photo && object.photo.link) {
          returnValue = '<img onerror="imgError(this);" class="pinkBookPhoto" style="width:48px;height: auto;" src="' + object.photo.link + '" />'
          returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify([object.photo.link]) + '</div>';

      }
      return returnValue;
    },
    renderRedOrPinkBook : function (data, type, object) {
        returnValue = "";
        // if (object.photo && object.photo.length > 0) {
        //     returnValue += '<img class="redBookPhoto" style="width:48px;height: auto;" src="' + object.photo[0] + '" />';
        //     returnValue += '<div class="redBookPhotos hidden">' + JSON.stringify(object.photo) + '</div>';
        // }
        if (object.pinkBookPhotos && object.pinkBookPhotos.length > 0 && object.pinkBookPhotos != 'NA') {
          returnValue += '<img onerror="imgError(this);" class="pinkBookPhoto" style="width:48px;height: auto;" src="' + object.pinkBookPhotos[0] + '" />';
          returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.pinkBookPhotos) + '</div>';

        }else if(object.redBookPhotos && object.redBookPhotos.length > 0 && object.redBookPhotos != 'NA'){
          returnValue += '<img onerror="imgError(this);" class="pinkBookPhoto" style="width:48px;height: auto;" src="' + object.redBookPhotos[0] + '" />';
          returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.redBookPhotos) + '</div>';
        }
        
        return returnValue;
    },
    renderNull: function (data, type, object) {
        return "";
    },
    renderLiveDateCount: function (data, type, object) {
        var returnValue = (moment().unix() - object.liveDate / 1000) / (86400);
        returnValue = Math.ceil(returnValue);
        return returnValue;
    },
    renderUpdatedDateCount: function (data, type, object) {
        var returnValue = (moment().unix() - object.updatedDate / 1000) / (86400);
        returnValue = Math.ceil(returnValue);
        if (object.isFeedback) {
            returnValue = '<a href="#" class="getLogListing" data-listing-id="' + object.rlistingId + '">' + returnValue + '</a>';
        }
        return returnValue;
    },
    // renderRedOrPinkBook: function (data, type, object) {
    //     returnValue = "";
    //     if (object.redBookPhotos && object.redBookPhotos.length > 0) {
    //         returnValue += '<img onerror="imgError(this);" class="redBookPhoto" style="width:48px;height: auto;" src="' + object.redBookPhotos[0] + '" />';
    //         returnValue += '<div class="redBookPhotos hidden">' + JSON.stringify(object.redBookPhotos) + '</div>';
    //     }
    //     if (object.pinkBookPhotos && object.pinkBookPhotos.length > 0) {
    //         returnValue += '<img onerror="imgError(this);" class="pinkBookPhoto" style="width:48px;height: auto;" src="' + object.pinkBookPhotos[0] + '" />';
    //         returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.pinkBookPhotos) + '</div>';

    //     }
    //     return returnValue;
    // },
    renderSourceBy: function (data, type, object) {
        var returnValue = data;
        returnValue += '<br>' + (object.createdByName ? object.createdByName : "") + '<br />' + (object.createdByphone ? object.createdByphone : "");
        return returnValue;
    },
    renderSize: function (data, type, object) {
        var returnValue = data;
        if (object.sizeWidth || object.sizeLength) {
            returnValue = object.sizeLength + "x" + object.sizeWidth;
        }
        return returnValue;
    }
}

function initSlideModal(html) {
    try {
        $("#owl-carousel").data('owlCarousel').destroy();
    } catch (ex) {
    }
    $("#owl-carousel").html(html);
    $("#owl-carousel").owlCarousel({
        singleItem: true,
        navigation: true,
        navigationText: ['trước', 'sau']
    });
    $("#image-slider").modal();
}


$("#btnDoResetSearchListing").on("click", function (event) {
    event.preventDefault();
    $('#districtType :checked').removeAttr('checked');
    $('#wardType :checked').removeAttr('checked');
    $('#directionType :checked').removeAttr('checked');
    $('input[name=alleyFromTo]').val('');
    $('input[name=alleyToValue]').val('');
    $('input[name=lengthFromTo]').val('');
    $('input[name=lengthToValue]').val('');
    $('input[name=widthFromTo]').val('');
    $('input[name=widthToValue]').val('');
    $('input[name=yearBuiltFromTo]').val('');
    $('input[name=yearBuiltToValue]').val('');
    $('#checkLength :checked').removeAttr('checked');
    $('#checkWidth :checked').removeAttr('checked');
    $('#privateListing :checked').removeAttr('checked');

    $("#formSeachListing").find(".historyType").val(120);


    countRelatedListings(true);
    findListing();
});