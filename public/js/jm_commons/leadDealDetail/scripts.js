var JMDetail = (function () {
    let selectedAddress;

    var load = function () {
        showHideSearchAdvBtn();
        moveToBSTFromNotify();
    };

    var moveToBSTFromNotify = function () {
        if (window.location.hash) {
            if (window.location.hash == '#boxListingMatchingJM') {
                $('a[onclick="likeListingTableRender()"]').trigger("click");
            }
            $('html,body').animate({
                    scrollTop: $(window.location.hash).offset().top
                },
                'slow');

        }
    }

    var showHideSearchAdvBtn = function () {
        $('#tabParent a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href") // activated tab
            // alert(target);
            if (target == '#tab_1' ||target =='#form-map' ||target =='#form-location') {
                $('#showFormSearch').show();
            } else {
                $('#showFormSearch').hide();
            }
        })
    };

    var openPhoto = function (element = "") {
        if (element != "") {
            event.preventDefault();
            var photos = JSON.parse($(element).next("div.pinkBookPhotos").html());
            data = [];
            if (photos) {
                $.each(photos, function (key, value) {
                    data.push({
                        'src': value,
                        'thumb': value
                    });
                });
            }
            showPhotos(this, data);
        } else {
            $(".pinkBookPhoto, .img-number").unbind('click').on("click", function (event) {
                event.preventDefault();
                var photos = JSON.parse($(this).siblings("div.pinkBookPhotos").html());
                data = [];
                if (photos) {
                    $.each(photos, function (key, value) {
                        if (typeof value.src !== 'undefined') {
                            data.push({
                                'src': value.src,
                                'thumb': value.src,
                                'subHtml': typeof value.text !== 'undefined' ? '<a style="color:white;" download href="' + value.src + '">' + value.text + '</a>' : ''
                            });
                        } else {
                            data.push({
                                'src': value,
                                'thumb': value
                            });
                        }
                    });
                }
                showPhotos(this, data);
            });
        }
        $(".pinkBookPhoto360").on("click", function (event) {
            event.preventDefault();
            initPhoto360(this);
        });
    };

    var showPhotos = function (element, data) {
        $(element).lightGallery({
            dynamic: true,
            html: true,
            share: false,
            mobileSrc: true,
            dynamicEl: data
        });
    }

    var resetCheckedInput = function () {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $('#crm_jm_tableSearchListing_wrapper input[type="checkbox"]').prop('checked', false);
            $('#arrayStoreListingForAction').val(null);
            $('#arrayStoreTourListingForAction').val(null);
            // var target = $(e.target).attr("href") // activated tab
            // alert(target);
        });
    };

    var openModalListingDetail = function (idListing) {
        showPropzyLoading();
        var more = '';
        if (typeof deal !== 'undefined') {
            if (typeof deal === 'object')
                more = 'dealId|' + deal.dealId;
            else
                more = 'dealId|' + deal;
        } else if (typeof lead !== 'undefined') {
            more = 'leadId|' + lead.leadId
        }

        var postData = {
            "listingId": parseInt(idListing),
            "more": more
        };
        filterValuations = $('.listingMatchingCRMJM .filterValuations').val();
        filterSourceBys = $('.listingMatchingCRMJM .filterSourceBys').val();
        filterLegals = $('.listingMatchingCRMJM .filterLegals').val();
        if (filterValuations != null && filterValuations.length > 0) {
            postData.filterValuations = filterValuations.join();
        }
        if (filterSourceBys != null && filterSourceBys.length > 0) {
            postData.filterSourceBys = filterSourceBys.join();
        }
        if (filterLegals != null && filterLegals.length > 0) {
            postData.filterLegals = filterLegals.join();
        }

        $.ajax({
            'url': '/common/open-modal-listing-detail',
            'type': 'post',
            'data': JSON.stringify(postData)
        }).done(function (response) {
            if (response) {
                $('#listingDetailModal').html(response);
                $('#listingDetailModal').modal().on('shown.bs.modal', function () {
                    renderMapJM();
                });
                renderStar();
                if ($('.textContainer_Truncate').is(':visible')) { //if the container is visible on the page
                    // viewMore();  //Adds a grid to the html
                    JMCommons.viewMore();
                } else {
                    setTimeout(JMCommons.viewMore, 500);
                }
                JMDetail ? JMDetail.openPhoto() : '';
                $('#listingDetailModal').on('hidden.bs.modal', function () {
                    $('.zoomContainer').remove();
                    var td = $(".selected-listing-" + idListing).parent('td').first();
                    if (td.find('.viewed').length == 0) {
                        td.append('<i class=\'viewed fa fa-eye\'></i>');
                    }
                });
            }
        }).always(function () {
            hidePropzyLoading();
        });
        return false;
    };

    var renderMapJM = function () {

        if ($("#map").length) {
            var myLatLng = {
                lat: Number($('#map').attr('lat')),
                lng: Number($('#map').attr('long'))
            };

            var maxZoom;
            if ($('#map').attr('data-zoom') === "1") {
                maxZoom = 15;
            }
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: myLatLng,
                maxZoom,
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map
            });

            google.maps.event.trigger(map, 'resize');
        }

    };

    var showMapDisplayListings = function () {
        var listings = $('#arrayStoreListingForAction').val();
        if (listings.length > 0 && JSON.parse(listings).length > 0) {
            showPropzyLoading();
            var postData = {
                listings: listings
            }
            $.ajax({
                'url': '/common/get-lat-long-by-listing',
                'type': 'post',
                'data': JSON.stringify(postData)
            }).done(function (response) {
                generateModalMapListings(response);
            })
        } else {
            alert('Vui lòng chọn listing');
        }
    };

    var generateModalMapListings = function (data) {
        var checkIssetListingModal = $('body').find('#modalMapListings').length
        if (checkIssetListingModal > 0) { // nếu tồn tại cái modal đó r thì remove nó đi để add lại cho chắc
            $('body').find('#modalMapListings').each(function () {
                $(this).remove();
            })
        }
        $('body').append('<div id="modalMapListings" class="modal fade" role="dialog"><div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">Bản đồ</h4> </div> <div class="modal-body"> <div id="mapListing" style="height:400px"></div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button> </div> </div><!-- /.modal-content --> </div><!-- /.modal-dialog --></div>');
        $('#modalMapListings').modal().on('shown.bs.modal', function () {
            // var myLatLng = {lat: Number(data[0]['lat']), lng: Number(data[0]['long'])};
            var infowindow = new google.maps.InfoWindow(); /* SINGLE */
            var bounds = new google.maps.LatLngBounds();
            var map = new google.maps.Map(document.getElementById('mapListing'), {
                maxZoom: window.isNeedChangeZoom ? 15 : undefined
            });
            $.each(data, function (k, v) {

                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(v.lat),
                        lng: Number(v.long)
                    },
                    map: map
                });

                bounds.extend(marker.position);

                google.maps.event.addListener(marker, 'mouseover', function () {
                    infowindow.close(); // Close previously opened infowindow
                    infowindow.setContent("<div id='infowindow'><a href='#' onclick='JMDetail.openModalListingDetailForAllPage(" + v.listings + ");return false;'>#" + v.listings + "</a> (" + v.address + ")</div>");
                    infowindow.open(map, marker);
                });
            })
            map.fitBounds(bounds);
            var listener = google.maps.event.addListener(map, "idle", function () {
                if (map.getZoom() > 14) map.setZoom(14);
                google.maps.event.removeListener(listener);
            });

            google.maps.event.trigger(map, 'resize');
            $('#arrayStoreListingForAction').val('');
            $('.selected-email-listing').prop('checked', false);
            hidePropzyLoading();
        });
    }

    var openModalListingDetailForAllPage = function (idListing) {
        var checkIssetListingModal = $('body').find('#listingDetailModal').length
        if (checkIssetListingModal > 0) { // nếu tồn tại cái modal đó r thì remove nó đi để add lại cho chắc
            $('body').find('#listingDetailModal').each(function () {
                $(this).remove();
            })
        }
        $('body').append('<div id = "listingDetailModal" class = "modal fade" role = "dialog"></div>');
        openModalListingDetail(idListing);
        return false;
    };

    var renderProgressList = function () {
        var type = $('#renderProgressList').attr('render');
        var typeId = $('#renderProgressList').attr('typeId');

        requestData = {
            'type': type,
            'typeId': typeId
        };

        $.ajax({
            url: "/render/render-progress-list",
            type: "POST",
            data: JSON.stringify(requestData)
        }).done(function (response) {
            $('#renderProgressList').html(response);
        });
    };

    var countTabFollowing = function () {
        var type = $('#renderProgressList').attr('render');
        var typeId = $('#renderProgressList').attr('typeId');

        requestData = {
            'type': type,
            'typeId': typeId
        };

        $.ajax({
            url: "/render/render-count-tab-following",
            type: "POST",
            data: JSON.stringify(requestData)
        }).done(function (response) {
            $('#countTabFollowing').html(response);
        });
    };

    var showWards = function () {

        $("#crm_jm_formCustomSearchListing").find('.districtsList').each(function () {

            if ($(this).is(":checked")) {
                var flagChecked = 0;
                $(this).parents().parents().siblings('.crm_jm_wards').find('.ward').each(function () {
                    if ($(this).is(":checked")) {
                        flagChecked = 1;
                    }
                });
                if (flagChecked == 0) {
                    $(this).parents().parents().siblings('.crm_jm_wards').find('.ward').prop('checked', true);
                }
            }
        });
        $("#crm_jm_formCustomSearchListing .crm_jm_wards").toggle();
    };

    var eventClassify = function () {
        $("#crm_jm_formCustomSearchListing input[name='classifyList[]']").each(function () {
            if ($(this).is(':checked')) {
                $(this).parent().siblings().show();
            } else {
                $(this).parent().siblings().hide();
            }
        })
    }

    var checkedFilterAdvance = function () {
        $('#crm_jm_formCustomSearchListing .crm_jm_wards').hide();
        $('#crm_jm_formCustomSearchListing .districtsList').on('click', function () {
            if ($(this).is(":checked")) {
                // $(this).parents().parents().siblings('.crm_jm_wards').hide();
                $(this).parents().parents().siblings('.crm_jm_wards').find('.ward').prop('checked', true);
            } else {
                // $(this).parents().parents().siblings('.crm_jm_wards').show();
                $(this).parents().parents().siblings('.crm_jm_wards').find('.ward').prop('checked', false);
            }
        })

        $('#crm_jm_formCustomSearchListing .ward').on('click', function () {
            if ($(this).is(':checked')) {
                $(this).parents().parents().parents().siblings('.checkbox').find('.districtsList').prop('checked', true);
            }
        })

        eventClassify();
        $("#crm_jm_formCustomSearchListing input[name='classifyList[]']").on('click', eventClassify);
    };

    var sendDataNegotiate = function () {
        var requestData = null;
        var eleModal = $('#modalNegotiate');
        var dataSend = {
            rlistingId: null,
            deal: null
        };
        var priceCurrent = 0;
        var isPage = eleModal.data('page');
        if (isPage == 'deal' || isPage == 'lead') {
            var listings = $('#arrayStoreListingForAction').val();
            if (listings.length != 0 && JSON.parse(listings).length != 0) {
                dataSend.rlistingId = JSON.parse(listings)[0];
            }
            dataSend.deal = deal.dealId;
            requestData = {
                "dealId": dataSend.deal,
                "rlistingId": dataSend.rlistingId,
                "currentPrice": parseInt(eleModal.find('.old-price').val().replace(/\,|\./g, '')),
                "negotiationPrice": parseInt(eleModal.find('.new-price').val().replace(/\,|\./g, '')),
                "buyerNote": eleModal.find('.condition').val(),
                "ownerNote": null,
                "note": eleModal.find('.note').val()
            };

        } else if (isPage == 'crm-dashboard') {
            dataSend.deal = tasksInfo.dealId != null ? tasksInfo.dealId : tasksInfo.leadId;
            dataSend.rlistingId = tasksInfo.rListingId;
            requestData = {
                "negotiationId": tasksInfo.negotiationId,
                "currentPrice": parseInt(eleModal.find('.old-price').val().replace(/\,|\./g, '')),
                "negotiationPrice": parseInt(eleModal.find('.new-price').val().replace(/\,|\./g, '')),
                "buyerNote": eleModal.find('.condition').val(),
                "ownerNote": null,
                "note": eleModal.find('.note').val()
            };
        } else if (isPage == 'tour-listing') {
            var isCheck = $(".selected-email-listing:checked");
            requestData = {
                "dealId": deal,
                "rlistingId": isCheck.val(),
                "currentPrice": parseInt(eleModal.find('.old-price').val().replace(/\,|\./g, '')),
                "negotiationPrice": parseInt(eleModal.find('.new-price').val().replace(/\,|\./g, '')),
                "buyerNote": eleModal.find('.condition').val(),
                "ownerNote": null,
                "note": eleModal.find('.note').val()
            };
        }
        requestData.actionCode = eleModal.find('.actionCode').val();

        var fieldRequire = ['#new-price'];
        var error = false;
        fieldRequire.forEach(function (item) {
            /* Check empty */
            if ($(item).data('validate-require') && $(item).val().trim().length == 0) {
                $(item).parent().first().find('.show-error').remove();
                var htmlError = '<div class="show-error" style="position: absolute; left: 15px; bottom: -20px; color:red; display:inline-block; font-size: 13px;">' + $(item).data('validate-message') + '</div>';
                $(item).parent().first().append(htmlError);
                error = true;
                return false;
            }
        });
        if (error)
            return false;

        $("#button-negotiate").prop("disabled", true);
        $.ajax({
                url: "/deal/send-negotiate",
                type: "POST",
                data: JSON.stringify(requestData),
                beforeSend: function (xhr) {
                    eleModal.find('.modal-body').prepend('<div class="loadding text-center"><i class="icon-loadding fa fa-spinner"></i><br>Đang gửi thông tin...</div>');
                }
            }).done(function (response) {
                eleModal.find('.loadding').first().remove();
                if (parseInt(response.code) == 200) {
                    dashboardNotify('success', 'Dữ liệu đã được gửi', eleModal.find('.modal-body'));
                    if (isPage == 'tour-listing') {
                        /* Tour negotiate */
                        location.href = '/crm-dashboard';
                    } else if (typeof tasksInfo != 'undefined' && typeof tasksInfo.negotiationId != 'undefined') {
                        /* repeat negotiate */
                        if (!doneTaks(tasksInfo.taskId)) {
                            location.href = '/crm-dashboard';
                        }
                    } else {
                        /* Deal negotiate */
                        /* Close poup after 3 second */
                        setTimeout(function () {
                            eleModal.modal('hide');
                        }, 3000);
                    }
                } else {
                    dashboardNotify('error', response.message, eleModal.find('.modal-body'));
                }
            }).fail(function () {
                dashboardNotify('error', 'Gửi thông tin thất bại', eleModal.find('.modal-body'));
            })
            .always(function () {
                $("#button-negotiate").prop("disabled", false);
            });
    };

    var showNegotiateModal = function (listingObj = null) {
        var eleModal = $('#modalNegotiate');
        var dataRlisting = null;
        var isPage = eleModal.data('page');
        if (listingObj == null) {
            if (isPage == 'deal' || isPage == 'lead') {
                var isCheck = $(".selected-email-listing:checked");
                isCheck.each(function () {
                    dataRlisting = $(this).data('rlisting');
                    return true;
                });
                if (isCheck.length > 1) {
                    dashboardNotify('error', 'Mỗi lần chỉ chọn 1 listing để thương lượng');
                    return false;
                }
                var listings = $('#arrayStoreListingForAction').val();
                if (listings.length == 0 || JSON.parse(listings).length == 0) {
                    dashboardNotify('error', 'Chọn ít nhất 1 listing để thương lượng');
                    return false;
                }
            } else if (isPage == 'crm-dashboard') {
                dataRlisting = {
                    'price': tasksInfo.currentPrice,
                    'negotiationPrice': tasksInfo.negotiationPrice,
                };
                if (parseInt(tasksInfo.defineId) == 117)
                    $("#button-send-negotiation").hide();
            } else if (isPage == 'tour-listing') {
                var isCheck = $(".selected-email-listing:checked");
                isCheck.each(function () {
                    dataRlisting = {
                        price: $(this).data('rlisting-price')
                    };
                    return true;
                });
                if (isCheck.length > 1) {
                    dashboardNotify('error', 'Mỗi lần chỉ chọn 1 listing để thương lượng');
                    return false;
                } else if (isCheck.length == 0) {
                    dashboardNotify('error', 'Chọn ít nhất 1 listing để thương lượng');
                    return false;
                }
            }
        } else {
            dataRlisting = listingObj;
            $('#arrayStoreListingForAction').val(JSON.stringify([dataRlisting.rlistingId]))
        }

        eleModal.unbind('shown.bs.modal');
        eleModal.modal('show');
        eleModal.modal().on('shown.bs.modal', function () {
            eleModal.find('.old-price').val(dataRlisting.price);
            if (listingObj != null) {
                eleModal.find('.actionCode').val(1);
            } else {
                eleModal.find('.actionCode').val(0);
            }
            eleModal.find('.old-price').removeData('mask');
            eleModal.find('.old-price').mask("#,##0", {
                reverse: true
            });
            eleModal.find('.new-price').val("");
            eleModal.find('.condition').val("");
            eleModal.find('.note').val("");
            if (isPage == 'crm-dashboard' && tasksInfo.data.length > 0) {
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                };
                $("#content-history").html("");
                tasksInfo.data.forEach(function (item, key) {
                    if (item.data) {
                        var html = "<div style='padding:5px; margin:10px; background-color: " + ((key % 2 == 0) ? "#eee" : "#fff") + "'>";
                        html += "<div class='col-md-2'>Lần: " + (key + 1) + "</div>";
                        html += "<div class='col-md-3'>" + item.data.negotiationPrice.toLocaleString() + "</div>";
                        html += "<div class='col-md-4'>" + new Date(item.data.createdDate).toLocaleDateString("vi-VN", options) + "</div>";
                        html += "<div class='col-md-3'>" + item.data.createdByName + "</div>";
                        html += "<div class='clearfix'></div></div>";
                        $("#content-history").append(html);
                        $("#history-negotiation").show();
                    }
                });
            }
            eleModal.find('.new-price').removeData('mask');
            eleModal.find('.new-price').mask("#,##0", {
                reverse: true
            });
            $('input,select').on('change keyup', function () {
                if ($(this).val() != -1 || $(this).val() != '') {
                    $(this).siblings('.show-error').hide();
                    $(this).siblings('.show-error-giay-to').hide();
                    $(this).siblings('.show-error-so-tien-vay').hide();
                }
            })
        });
    };
    var getCloseDealChannelTypes = function () {
        var closeDealChannelTypes = [];
        $.ajax({
            url: "/common/get-channel-types/12",
            type: "GET",
            async: false,
        }).done(function (response) {
            if (response.result) {
                closeDealChannelTypes = response.data[0].list;
            }
        });
        let html = "<select class='name form-control closedBy' onchange='return changeClosedBy(this);' >";
        for (var i = 0; i < closeDealChannelTypes.length; i++) {
            let item = closeDealChannelTypes[i];
            let selected = '';
            if (typeof deal !== 'undefined' && typeof deal.closedBy !== 'undefined' && deal.closedBy == item.id) {
                selected = 'selected';
            }
            html += "<option " + selected + " value=" + item.id + " data-children='" + JSON.stringify(item.childs) + "' >" + item.name + "</option>";
        }
        html += "</select>";
        return html;
    }

    window.changeClosedBy = function (selector) {
        let children = $(selector).find("option:selected").data('children');
        let closedByType = $(".formConfirmCloseDeal").find(".closedByType");
        let groupClosedByType = $(".formConfirmCloseDeal").find(".group-closedByType");
        let html = "";
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let selected = '';
            if (typeof deal !== 'undefined' && typeof deal.closedByType !== 'undefined' && deal.closedByType == child.id) {
                selected = 'selected';
            }
            html += "<option " + selected + "  value='" + child.id + "' >" + child.name + "</option>";
        }
        closedByType.html(html);
        if (children.length > 0) {
            groupClosedByType.removeClass("hidden");
        } else {
            groupClosedByType.addClass("hidden");
        }
    }
    var showModalConfirmCloseDeal = function (onYes) {
        var moveInDate = deal.moveInDate != '' ? moment.unix(deal.moveInDate / 1000).format("YYYY-MM-DD") : "";
        var expiredContract = deal.leasingSignedDate != '' ? moment.unix(deal.leasingSignedDate / 1000).format("YYYY-MM-DD") : "";
        var isBuy = deal.typeName === 'Mua' ? true : false;
        $.confirm({
            title: 'Đóng deal',
            content: `
            <form action="" class="formConfirmCloseDeal">
                <div class="form-group">
                <label>Tên khách hàng:</label>
                <input type="text" value="${deal.customerName}" name="newOwner" id="newOwner" class="name form-control" required />
                <label>Ngày dọn vào:</label>
                <input type="date" value="${moveInDate}" id="moveInDate" name="moveInDate" class="name form-control" required />
                ${ !isBuy ? 
                `
                <label>Ngày hết hạn hợp đồng:</label>
                <input type="date" value="${expiredContract}"  id="expiredContract" name="expiredContract" class="name form-control" required />
                ` : `` }
                <label>Chọn điều kiện:</label>
                ${getCloseDealChannelTypes()}
                <div class="group-closedByType hidden"><label>Chọn điều kiện:</label>
                <select class="name form-control closedByType" ></select>
                </div>
                </div>
            </form>
            `,
            buttons: {
                sayMyName: {
                    text: 'Hoàn thành',
                    btnClass: 'btn-orange',
                    action: onYes
                },
                moreButtons: {
                    text: 'Để sau',
                    // action: function () {
                    //     $.alert('you clicked on <strong>something else</strong>');
                    // }
                }
                // later: function () {
                //     // do nothing.
                // }
            },
            onOpen: function () {
                changeClosedBy($(".closedBy"));
            }
        })
    }
    var closeDeal = function () {
        showModalConfirmCloseDeal(function (e) {
            let theForm = $(".formConfirmCloseDeal");
            var inputName = theForm.find('input#newOwner');
            var inputDate = theForm.find('input#moveInDate');
            let inputExpiredDate = theForm.find('input#expiredContract');
            let inputClosedByType = theForm.find(".closedByType");
            let inputClosedBy = theForm.find(".closedBy");
            var errorText = theForm.find('.text-danger');
            if (!inputName.val().trim() || !inputDate.val().trim()) {
                $.alert({
                    title: "Lỗi!",
                    content: "Vui lòng điền đầy đủ thông tin.",
                    type: 'red'
                });
                return false;
            } else {
                // start proccess
                var postData = {
                    moveInDate: moment(inputDate.val()).unix() * 1000,
                    newOwner: inputName.val().trim(),
                    closedBy: inputClosedBy.val()
                };
                if (deal.typeName !== 'Mua') {
                    postData = {
                        moveInDate: moment(inputDate.val()).unix() * 1000,
                        leasingExpiredDate: moment(inputExpiredDate.val()).unix() * 1000,
                        newOwner: inputName.val().trim(),
                        closedBy: inputClosedBy.val()
                    };
                }

                if (inputClosedByType.val()) {
                    postData.closedByType = inputClosedByType.val();
                }
                $.ajax({
                    url: "/deal/close-deal/" + deal.dealId,
                    type: "POST",
                    data: JSON.stringify(postData),
                    beforeSend: function (xhr) {
                        showPropzyLoading();
                    }
                }).done(function (response) {
                    hidePropzyLoading();
                    if (typeof response.code != 'underfined' && response.code == 200) {
                        dashboardNotify('success', "Chốt deal thành công");
                        timer.submit({dealId: deal.dealId});
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    } else {
                        dashboardNotify('error', "Đã có lỗi sảy ra");
                    }

                }).fail(function () {
                    hidePropzyLoading();
                    dashboardNotify('error', "Đã có lỗi sảy ra");
                }).always(function () {
                    hidePropzyLoading();
                });
                // end proccess
                // $.alert('Hello ' + input.val() + ', i hope you have a great day!');
            }
        });
    };

    // **********************************************************************************
    var showModalTypeDeal = function (onYes) {
        $.confirm({
            title: 'Loại deal',
            content: '' +
                '<form action="" class="formConfirmCloseDeal">' +
                '<label>Chọn điều kiện:</label>' +
                getCloseDealChannelTypes() +
                '<div class="group-closedByType hidden"><label>Chọn điều kiện:</label>' +
                '<select class="name form-control closedByType" ></select>' +
                '</div>' +
                '</div>' +
                '</form>',
            buttons: {
                sayMyName: {
                    text: 'Hoàn thành',
                    btnClass: 'btn-orange',
                    action: onYes
                },
                moreButtons: {
                    text: 'Để sau',
                    action : function(){
                        if(typeof deal != "undefined" && deal.isUpdateCustomerInfo){
                            $('#updateCustomerAgent').modal("show");
                            $('#QuestionModal').modal("hide");
                        }
                    }
                    // action: function () {
                    //     $.alert('you clicked on <strong>something else</strong>');
                    // }
                }
                // later: function () {
                //     // do nothing.
                // }
            }
        });
    }
    var typeDeal = function (leadId = null) {
        showModalTypeDeal(function () {
            let req = [];
            let theForm = $(".formConfirmCloseDeal");
            let inputClosedByType = theForm.find(".closedByType");
            let inputClosedBy = theForm.find(".closedBy");
            var errorText = theForm.find('.text-danger');

            var postData = {
                closedBy: parseInt(inputClosedBy.val())
            };
            if (leadId != null) {
                postData.leadId = parseInt(leadId)
            } else {
                postData.dealId = parseInt(deal.dealId)
            }
            if (inputClosedByType.val()) {
                postData.closedByType = parseInt(inputClosedByType.val());
            }
            req.push(postData);
            $.ajax({
                url: "/deal/type-deal",
                type: "POST",
                data: JSON.stringify(req),
                beforeSend: function (xhr) {
                    showPropzyLoading();
                }
            }).done(function (response) {
                hidePropzyLoading();
                if (typeof response.code != 'underfined' && response.code == 200) {
                    dashboardNotify('success', "Thao tác thành công");
                    if(typeof deal != "undefined" && deal.isUpdateCustomerInfo){
                        $('#updateCustomerAgent').modal("show");
                        $('#QuestionModal').modal("hide");
                    }else{
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    }
                } else {
                    dashboardNotify('error', "Đã có lỗi sảy ra");
                }

            }).fail(function () {
                hidePropzyLoading();
                dashboardNotify('error', "Đã có lỗi sảy ra");
            }).always(function () {
                hidePropzyLoading();
            });
            // end proccess
            // $.alert('Hello ' + input.val() + ', i hope you have a great day!');
            // }
        });
    };

    var validateParams = function (fieldRequire) {
        var error = false;
        fieldRequire.forEach(function (item) {
            /* Check empty */
            if ($(item).data('validate-require') && $(item).val().trim().length == 0) {
                $(item).parent().first().find('.show-error').remove();
                var htmlError = '<div class="show-error" style="position: absolute; left: 15px; bottom: -20px; color:red; display:inline-block; font-size: 13px;">' + $(item).data('validate-message') + '</div>';
                $(item).parent().first().append(htmlError);
                error = true;
            }
        });
        return error;
    }

    var changeStatusNegotate = function (negotiationId, taskId, statusId) {
        var error = false;
        if (!negotiationId || !taskId || !statusId) {
            dashboardNotify('error', 'Bạn không thể gửi hủy vào lúc này');
            return false;
        }
        if (statusId != 3) {
            dataSend = {
                "taskId": taskId,
                "negotiationId": negotiationId,
                "statusId": statusId
            };
        } else {
            var fieldRequire = ['#reminder-date', '#reminder-time'];
            error = validateParams(fieldRequire);
            var dateSend = $("#reminder-date").val().trim().trim().replace(/(\d\d)-(\d\d)-(\d{4})/g, "$3/$2/$1");
            var timeSend = $("#reminder-time").val().trim().length == 0 ? '00:00' : $("#reminder-time").val().trim();
            var timestamp = Math.round(new Date(dateSend + " " + timeSend).getTime());

            if (timestamp < new Date().getTime()) {
                dashboardNotify('error', 'Thời gian hẹn không hợp lệ, thời gian nhở hơn thời gian hiện tại', $("#modalPeddingNegotiate").find('.modal-body'));
                $("#view-time").focus();
                error = true;
            }

            dataSend = {
                "taskId": taskId,
                "negotiationId": negotiationId,
                "statusId": statusId,
                "reminderDate": timestamp,
                "eventReason": {
                    "reasonId": parseInt($("#reason-pedding-negotation").val()),
                    "reasonContent": $("#reason-pedding-negotation").text()
                }
            };

        }
        /* Check error before action send date to server */
        if (error)
            return false;
        $.ajax({
                url: "/deal/change-status-negotate",
                type: "POST",
                data: JSON.stringify(dataSend),
                beforeSend: function (xhr) {
                    $('body').prepend('<div id="loadding" style="position:fixed; background-color: #fff; padding: 10px; border-radius: 5px; z-index: 1000; left:50%; top:50px;" class="text-center"><i class="icon-loadding fa fa-spinner"></i><br>Đang gửi thông tin...</div>');
                }
            }).done(function (response) {
                $('body').find('#loadding').first().remove();
                $('body').find('.alert-stop-negotiate').remove();
                if (response.code == 200) {
                    if (statusId != 3)
                        dashboardNotify('success', 'Dữ liệu đã được gửi');
                    else
                        dashboardNotify('success', 'Dữ liệu đã được gửi', $("#modalPeddingNegotiate").find('.modal-body'));
                    doneTaks(taskId);
                    if (statusId == 1) {
                        showModalDeposit();
                        $('#modal-deposit').on('hidden.bs.modal', function () {
                            location.href = '/crm-dashboard';
                        })
                    } else {
                        location.href = '/crm-dashboard';
                    }
                    // location.href='/crm-dashboard';
                } else {
                    dashboardNotify('error', response.message);
                }
            }).fail(function () {
                dashboardNotify('error', 'Gửi thông tin thất bại');
            })
            .always(function () {
                $('body').find('#loadding').first().remove();
            });

    }

    var doneTaks = function (taskId) {
        var error = false;
        $.ajax({
            'url': '/crm-dashboard/done-task/' + taskId,
            'type': 'get',
            'async': false
        }).done(function (response) {
            if (typeof response.code == "undefined" && parseInt(response.code) != 200)
                error = true;
        }).fail(function () {
            error = true;
        });
        return error;
    };

    var doneTaksV2 = function (taskId) {
        var data = {error: false, message: null};
        $.ajax({
            'url': '/crm-dashboard/done-task/' + taskId,
            'type': 'get',
            'async': false
        }).done(function (response) {
            if (typeof response.code == "undefined" || (parseInt(response.code) != 200 && parseInt(response.code) != 10000)) {
                data.error = true;
            } else {
               data.message = response.message; 
            }    
        }).fail(function () {
            data.error = true;
        });
        return data;
    };

    var showModalDeposit = function () {
        var eleModal = $('#modal-deposit');
        var isPage = eleModal.data('page');
        var priceNegotiate = 0,
            priceCurrent = 0;
        var isRepeatedDeposit = false;
        var dataGetDtail = {
            "listingId": null,
            "more": ''
        };
        var dataSend = {
            "dealId": null,
            "leadId": null,
            "negotiationId": null,
            "taskId": null,
            "scheduleTime": null,
            "listingId": null,
            "price": null,
            "depositPrice": null,
            "note": null,
            "isEsCrowService": null,
            "isLoanNeeded": null,
            "buyerAnswers": null,
            "ownerAnswers": null,
            "depositMeeting": {
                loanValue: 0,
                latitude: 0,
                longitude: 0,
                address: ''
            }
        };
        var priceCurrent = null;
        if (isPage == 'deal' || isPage == 'lead') {
            dataGetDtail.listingId = dataSend.listingId = parseInt(JSON.parse($("#arrayStoreListingForAction").val())[0]);
            var more = "";
            if (typeof deal !== 'undefined') {
                more = 'dealId|' + deal.dealId;
                dataSend.dealId = parseInt(deal.dealId);
            } else if (typeof lead !== 'undefined') {
                more = 'leadId|' + lead.leadId;
                dataSend.leadId = parseInt(lead.leadId);
            }
            dataGetDtail.more = more;
            filterValuations = $('.listingMatchingCRMJM .filterValuations').val();
            filterSourceBys = $('.listingMatchingCRMJM .filterSourceBys').val();
            filterLegals = $('.listingMatchingCRMJM .filterLegals').val();
            if (filterValuations != null && filterValuations.length > 0) {
                dataGetDtail.filterValuations = filterValuations.join();
            }
            if (filterSourceBys != null && filterSourceBys.length > 0) {
                dataGetDtail.filterSourceBys = filterSourceBys.join();
            }
            if (filterLegals != null && filterLegals.length > 0) {
                dataGetDtail.filterLegals = filterLegals.join();
            }
            var dataRlisting = $(".selected-listing-" + dataSend.listingId).data('rlisting');
            priceCurrent = dataRlisting.price;
            $.ajax({
                url: "/deal/last-negotiation/" + deal.dealId + "/" + dataRlisting.rlistingId,
                type: "GET",
                async: false
            }).done(function (response) {
                if (response.result != false && response.data.length != 0) {
                    priceCurrent = response.data.negotiationPrice;
                }
            });
        } else if (isPage == 'crm-dashboard') {
            if (typeof tasksInfo.depositId != 'undefined' && tasksInfo.depositId != null)
                isRepeatedDeposit = true;
            dataGetDtail.listingId = dataSend.listingId = typeof tasksInfo.rListingId != 'undefined' ? parseInt(tasksInfo.rListingId) : parseInt(tasksInfo.listingId);
            var more = "";
            if (tasksInfo.leadId != null && tasksInfo.dealId == null) {
                more = 'leadId|' + tasksInfo.leadId;
                dataSend.leadId = parseInt(tasksInfo.leadId);
            } else {
                more = 'dealId|' + tasksInfo.dealId;
                dataSend.dealId = parseInt(tasksInfo.dealId);
            }
            dataGetDtail.more = more;
            priceCurrent = tasksInfo.currentPrice;
            priceNegotiate = isRepeatedDeposit ? tasksInfo.price : tasksInfo.negotiationPrice;
            dataSend.depositId = tasksInfo.depositId;
        } else if (isPage == 'tour-listing') {
            dataGetDtail.listingId = dataSend.listingId = parseInt($(".selected-email-listing:checked").data('rlisting-id'));
            var more = "";
            if (typeof deal !== 'undefined') {
                more = 'dealId|' + deal;
                dataSend.dealId = parseInt(deal);
            } else if (typeof lead !== 'undefined') {
                more = 'leadId|' + lead;
                dataSend.leadId = parseInt(lead);
            }
            dataGetDtail.more = more;
            priceCurrent = $(".selected-email-listing:checked").data('rlisting-price');
        }
        /* Get detailt */
        var dataDetailt = null;
        $.ajax({
                'url': '/common/open-modal-listing-detail/get-data',
                'type': 'post',
                'data': JSON.stringify(dataGetDtail),
                'async': false,
                beforeSend: function (xhr) {
                    showPropzyLoading();
                }
            }).done(function (response) {
                if (typeof response.listingDetail != "undefined") {
                    $('#modal-deposit').modal("show");
                    $('#modalNegotiate').modal("hide");
                    dataDetailt = response.listingDetail;
                } else {
                    return false;
                }
            }).fail(function () {
                dashboardNotify('error', 'Không lấy được thông tin');
                return false;
            })
            .always(function () {
                hidePropzyLoading();
            });

        /* Process for deposit */
        $('#negotiate-price').removeData('mask');
        $('#negotiate-price').mask("#,##0", {
            reverse: true
        });
        $('#actual-commission').removeData('mask');
        $('#actual-commission').mask("#,##0", {
            reverse: true
        });
        $('#tpa-commission').removeData('mask');
        $('#tpa-commission').mask("#,##0", {
            reverse: true
        });
        $("#load-value").mask("#,##0", {
            reverse: true
        });
        var hardPrice = priceNegotiate == 0 ? priceCurrent : priceNegotiate;
        //hardPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        $(".hard-price").val(hardPrice);
        $(".hard-price").removeData('mask');
        $(".hard-price").mask("#,##0", {reverse: true});
        
        if(dataDetailt.listingTypeId == 2){ // case thuê
        	// Thông tin, giấy tờ cần thiết bên mua 
			$("#list_group_question").val(1);
			$("#list_group_question").trigger( "change" );
			$("#list_group_question option").attr('disabled','disabled');
			$("#list_group_question option[value=1]").removeAttr('disabled');
			// vay vốn
			$("#require-original-money").val('false');
			$("#require-original-money").trigger( "change" );
			$("#require-original-money").attr('disabled','disabled');
			$("#require-original-money option[value=false]").removeAttr('disabled');
        }
        var listingView = $('<div>');
        var eventView = $('<a>');
        eventView.css({
            'padding': '6px',
            'background': '#eee',
            'width': '100%',
            'display': 'inherit',
            'border': '1px solid #ccc'
        });
        eventView.attr('href', 'javascript:;');
        eventView.attr('id', 'ad123gdf2');
        eventView.text(dataSend.listingId);
        listingView.append(eventView);
        listingView.on("click", "#ad123gdf2", function (event) {
            JMDetail.openModalListingDetailForAllPage(dataSend.listingId);
            var zIndex = $('#modal-deposit').css('z-index');
            $('#listingDetailModal').css({
                'z-index': zIndex + 1
            });

        });
        $("#listing-id-view").html('');
        $("#listing-id-view").append(listingView);
        //dataDetailt.listingDetail.districtName
        $("#district-name-price").val(dataDetailt.districtName);
        var input = document.getElementById('address-deposit');
        var options = {
            componentRestrictions: {
                country: 'vi'
            }
        };
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            if (place.length == 0) {
                return;
            }
            if (!place.geometry) {
                return;
            }
            dataSend.depositMeeting.latitude = place.geometry.location.lat();
            dataSend.depositMeeting.longitude = place.geometry.location.lng();
        });
        var options = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        if (isRepeatedDeposit) {
            /* Prosess for repeat deposit */
            $("#modal-deposit #negotiate-price").val(tasksInfo.depositPrice.toLocaleString('en-GB'));

            $("#require-original-money").val(tasksInfo.isLoanNeeded + "").change();
            $("#require-service-escrow").val(tasksInfo.isEsCrowService + "").change();

            if (tasksInfo.isLoanNeeded) {
                $("#modal-deposit #load-value").val(tasksInfo.depositMeeting.loanValue.toLocaleString('en-GB'));
            }
            $("#modal-deposit #address-deposit").val(tasksInfo.depositMeeting.address);
            $("#modal-deposit #address-deposit").focus(function () {
                $(this).val("");
            });
            $("#modal-deposit #address-deposit").focusout(function () {
                if ($(this).val().length == 0)
                    $(this).val(tasksInfo.depositMeeting.address);
            });
            $("#modal-deposit #note-deposit").val(tasksInfo.note);
            var date_cureent = new Date(tasksInfo.depositMeeting.scheduleTime).toLocaleDateString('vi-VN', options);
            date_cureent = date_cureent.split(',');
            $("#modal-deposit #view-date").val(date_cureent[1].trim().replace(/\//g, '-'));
            $("#modal-deposit #view-time").val(date_cureent[0].trim());

            $("#modal-deposit #view-time").focusout(function () {
                if ($(this).val().length == 0)
                    $(this).val(date_cureent[0].trim());
            });

            $("#modal-deposit #view-date").focusout(function () {
                if ($(this).val().length == 0)
                    $(this).val(date_cureent[1].trim().replace(/\//g, '-'));
            });

            $("#modal-deposit input").prop('disabled', true);
            $("#modal-deposit select").prop('disabled', true);
            $("#modal-deposit textarea").prop('disabled', true);
            $("#modal-deposit #view-time").prop('disabled', false);
            $("#modal-deposit #view-date").prop('disabled', false);
            $("#modal-deposit #address-deposit").prop('disabled', false);
            $("#modal-deposit #tc-postion").prop('disabled', false);
            $.each($("#tc-postion").find('option'), function (key, item) {
                if ($(item).attr('data-address') == tasksInfo.depositMeeting.address) {
                    $("#tc-postion").val($(item).attr('value')).change();
                } else {
                    $("#tc-postion").val(3).change();
                }
            });
            
            // get value for commission and undisabled 4 field when get data deposit
            if (tasksInfo.actualCommission) {
                $("#modal-deposit #actual-commission").val(tasksInfo.actualCommission.toLocaleString('en-GB'))
            }
            if (tasksInfo.tpaCommission) {
                $("#modal-deposit #tpa-commission").val(tasksInfo.tpaCommission.toLocaleString('en-GB'))
            }
            if (tasksInfo.actualRate) {
                $("#modal-deposit #actual-rate").val(tasksInfo.actualRate.toLocaleString('en-GB'))
            }
            if (tasksInfo.tpaRate) {
                $("#modal-deposit #tpa-rate").val(tasksInfo.tpaRate.toLocaleString('en-GB'))
            }

            $("#modal-deposit #actual-commission").prop('disabled', false)
            $("#modal-deposit #tpa-commission").prop('disabled', false)
            $("#modal-deposit #actual-rate").prop('disabled', false)
            $("#modal-deposit #tpa-rate").prop('disabled', false)

            /* $('#old-time').show().html("Ngày giờ đặt cọc trước, " + new Date(tasksInfo.depositMeeting.scheduleTime).toLocaleDateString('vi-VN', options));*/
        }

        $("#send-deposit").unbind('click');
        $("#send-deposit").click(function () {
            /* Validate */
            var buyerAnswers = [];
            var ownerAnswers = [];
            $("#buyer-question input:visible, #buyer-question .select_question:visible").each(function (key, item) {
                if ($(item).attr('type') == 'checkbox') {
                    if ($(item).is(':checked')) {
                        if ($(item).parent('.sub-question').first()) {
                            if ($(item).parent('.sub-question').first().css("display") != 'none')
                                buyerAnswers.push({
                                    'questionId': $(item).data('question-id'),
                                    'questionItemId': $(item).data('id'),
                                    'value': $(item).val(),
                                });
                        } else {
                            buyerAnswers.push({
                                'questionId': $(item).data('question-id'),
                                'questionItemId': $(item).data('id'),
                                'value': $(item).val(),
                            });
                        }
                    }
                } else if ($(item).attr('type') == 'text') {
                    if (typeof $(item).data('question-id') !== 'undefined' && $(item).val() != '') {
                        if ($(item).parent('.sub-question').first()) {
                            if ($(item).parent('.sub-question').first().css("display") != 'none')
                                buyerAnswers.push({
                                    'questionId': $(item).data('question-id'),
                                    'questionItemId': $(item).data('id'),
                                    'value': $(item).val(),
                                });
                        } else {
                            buyerAnswers.push({
                                'questionId': $(item).data('question-id'),
                                'questionItemId': $(item).data('id'),
                                'value': $(item).val(),
                            });
                        }
                    }
                } else {
                    var order = null;
                    if ($(item).val() == '-1') {
                        order = $(item).next('input').val();
                    }
                    if ($(item).parent('.sub-question').first()) {
                        if ($(item).parent('.sub-question').first().css("display") != 'none')
                            buyerAnswers.push({
                                'questionId': $(item).data('question-id'),
                                'questionItemId': $(item).data('id'),
                                'value': $(item).val(),
                                'content': order
                            });
                    } else {
                        buyerAnswers.push({
                            'questionId': $(item).data('question-id'),
                            'questionItemId': $(item).data('id'),
                            'value': $(item).val(),
                            'content': order
                        });
                    }
                }
            });

            /* Validation element to send date to server */
            /* Defined field validate */
            var fieldRequire = ['#view-date', '#view-time', '#negotiate-price', '#actual-commission'];
            if ($("#tc-postion").val() == 3)
                fieldRequire.push('#address-deposit');
            var error = false;
            error = validateParams(fieldRequire);


            var dateSend = $("#view-date").val().trim().trim().replace(/(\d\d)-(\d\d)-(\d{4})/g, "$3/$2/$1");
            var timeSend = $("#view-time").val().trim().length == 0 ? '00:00' : $("#view-time").val().trim();
            var timestamp = Math.round(new Date(dateSend + " " + timeSend).getTime());
            /* Check time width before deposit. */
            if (isRepeatedDeposit && timestamp < tasksInfo.depositMeeting.scheduleTime && false) {
                dashboardNotify('error', 'Thời gian cuộc hẹn không được sớm hơn cuộc hẹn trước đó', eleModal.find('#time-view'));
                error = true;
            }
            if (timestamp < new Date().getTime()) {
                dashboardNotify('error', 'Thời gian hẹn không hợp lệ, thời gian nhỏ hơn hoặc bằng thời gian hiện tại', eleModal.find('#time-view'));
                $("#view-time").focus();
                error = true;
            }
            if (JSON.parse($('#require-original-money').val()) && $("#load-value").val().length == 0) {
                $('.show-error-so-tien-vay').show();
                // dashboardNotify('error','Nhập số tiền vay vốn hoặc chọn trạng thái không vay vốn',eleModal.find('#time-view'));
                error = true;
            }

            if ($("#list_group_question").val() == -1) {
                $('.show-error-giay-to').show();
                error = true;
            }


            dataSend.negotiationId = null;
            let eleModal = $('#modalNegotiate');
            let isPage = eleModal.data('page');
            if (isPage == 'crm-dashboard') {
                dataSend.negotiationId = tasksInfo.negotiationId;
                dataSend.taskId = tasksInfo.taskId;
            }
            dataSend.taskId = null;
            dataSend.scheduleTime = timestamp;
            dataSend.price = parseInt($(".hard-price").val().replace(/\.|\,/g, ''));
            dataSend.depositPrice = parseInt($("#negotiate-price").val().replace(/\.|\,/g, ''));
            dataSend.note = $("#note-deposit").val();
            dataSend.isEsCrowService = JSON.parse($('#require-service-escrow').val());
            dataSend.isLoanNeeded = JSON.parse($('#require-original-money').val());
            dataSend.buyerAnswers = buyerAnswers;
            dataSend.ownerAnswers = ownerAnswers;
            dataSend.depositMeeting.loanValue = parseInt($("#load-value").val().replace(/\.|\,/g, ''));
            var address = ($("#tc-postion").val() == 3 || $("#tc-postion").data('address') == -1) ? $("#address-deposit").val() : $("#tc-postion option:selected").data('address');
            dataSend.depositMeeting.address = address;
            dataSend.questionGroupId = $("#list_group_question").val();

            dataSend.actualCommission = parseInt($("#actual-commission").val().replace(/\.|\,/g, ''));
            dataSend.tpaCommission = parseInt($("#tpa-commission").val().replace(/\.|\,/g, ''));
            dataSend.actualRate = parseFloat($("#actual-rate").val());
            dataSend.tpaRate = parseFloat($("#tpa-rate").val());

            // return false;
            if (error) {
                return false;
            }
            $("#send-deposit").prop("disabled", true);
            $.ajax({
                url: "/deal/send-deposit",
                type: "POST",
                data: JSON.stringify(dataSend),
                beforeSend: function (xhr) {
                    showPropzyLoading();
                }
            }).done(function (response) {
                if (response.code == 200) {
                    dashboardNotify('success', 'Dữ liệu đã được gửi', eleModal.find('#time-view'));
                    dashboardNotify('success', 'Dữ liệu đã được gửi', $('#modal-deposit #time-view'));
                    
                    // remove negotiate
                    if ((isPage == 'crm-dashboard' && typeof tasksInfo.taskId != 'undefined' && tasksInfo.taskId)) {
                        var data = doneTaksV2(tasksInfo.taskId);
                        if (!data.error) {
                            dashboardNotify('success', data.message, eleModal.find('#time-view'));
                            dashboardNotify('success', data.message, $('#modal-deposit #time-view'));
                            location.href = '/crm-dashboard';
                        }
                    } else if (typeof taksid_for_deposit != "undefined" && taksid_for_deposit != 0) {
                        var data = doneTaksV2(taksid_for_deposit);
                        if (!data.error) {
                            dashboardNotify('success', data.message, eleModal.find('#time-view'));
                            dashboardNotify('success', data.message, $('#modal-deposit #time-view'));
                            location.href = '/crm-dashboard';
                        }
                    }
                    setTimeout(function () {
                        eleModal.modal('hide');
                        $('#modalNegotiate').modal("hide");
                        location.reload();
                    }, 3000);
                } else {
                    dashboardNotify('error', response.message, eleModal.find('#time-view'));
                    dashboardNotify('error', response.message, $('#modal-deposit #time-view'));
                }
            }).fail(function () {
                dashboardNotify('error', 'Gửi thông tin thất bại', eleModal.find('#time-view'));
                dashboardNotify('error', 'Gửi thông tin thất bại', $('#modal-deposit #time-view'));
            }).always(function () {
                hidePropzyLoading();
                $("#send-deposit").prop("disabled", false);
            });
        });
    };

    var printDeposit = function (tasksInfo) {
        var htmlPrint = htmlDeposit(tasksInfo);
        var mywindow = window.open('', 'In thông tin đặc cọc');
        mywindow.document.write('<html moznomarginboxes mozdisallowselectionprint><head><title>In thông tin đặc cọc</title>');
        mywindow.document.write('<style type="text/css" media="print">@page{ size: auto; margin: 0mm; #header{display: none} }</style></head><body>');
        mywindow.document.write(htmlPrint);
        mywindow.document.write('</body></html>');
        mywindow.print();
        mywindow.close();
        return true;
    }

    var cancelDeposit = function (depositId) {
        var error = false;
        if (depositId <= 0 && !isNumeric(depositId)) {
            dashboardNotify('error', "Hệ thống không nhận được thông tin đặt cọc", $('#modalCancelDeposit .modal-body'));
            error = true;
        }
        var content = '';
        if ($("#reason-cancel-deposit").find("option:selected").text() == "Khác") {
            if ($("#text-other").val().trim().length == 0) {
                dashboardNotify('error', "Hệ thống không nhận được thông tin đặt cọc", $('#modalCancelDeposit .modal-body'));
                return false;
            } else {
                content = $("#text-other").val().trim();
            }

        } else {
            content = $("#reason-cancel-deposit").find("option:selected").text().trim();
        }

        var dataPost = {
            "depositId": depositId,
            "reminderDate": null,
            "eventReason": {
                "reasonId": parseInt($("#reason-cancel-deposit").val()),
                "reasonContent": content
            }
        }
        if (error) {
            dashboardNotify('error', "Hệ thống không nhận được thông tin đặt cọc", $('#modalCancelDeposit .modal-body'));
            return false;
        }
        $.ajax({
                url: "/deal/close-deposit",
                type: "POST",
                data: JSON.stringify(dataPost),
                beforeSend: function (xhr) {
                    showPropzyLoading();
                }
            }).done(function (response) {
                if (typeof response.code != 'underfined' && response.code == 200) {
                    if (typeof tasksInfo != "undefined" && !doneTaks(tasksInfo.taskId)) {
                        dashboardNotify('success', "Hủy đặt cọc thành công", $("#modalCancelDeposit").find('.modal-body'));
                        location.href = '/crm-dashboard';
                    } else {
                        dashboardNotify('success', "Hủy đặt cọc thành công", $("#modalCancelDeposit").find('.modal-body'));
                        location.reload();
                    }
                } else {
                    dashboardNotify('error', "Đã có lỗi sảy ra");
                }

            }).fail(function () {
                dashboardNotify('error', "Đã có lỗi sảy ra");
            })
            .always(function () {
                hidePropzyLoading();
            });
    }

    var finishDeposit = function () {
        $("#finishDeposit").modal("show");
        $("#btn-finishDeposit").unbind('click');
        $("#btn-finishDeposit").click(function () {
            var dataPost = {
                depositId: tasksInfo.depositId
            };
            $.ajax({
                    url: "/deal/finish-deposit",
                    type: "POST",
                    data: JSON.stringify(dataPost),
                    beforeSend: function (xhr) {
                        showPropzyLoading();
                    }
                }).done(function (response) {
                    if (typeof response.code != 'underfined' && parseInt(response.code) == 200) {
                        if (!doneTaks(tasksInfo.taskId)) {
                            dashboardNotify('success', "Đã hoàn thành đặt cọc", "#finishDeposit .modal-body");
                            setTimeout(function () {
                                $("#finishDeposit").modal("hide");
                                location.href = '/crm-dashboard';
                            }, 2000);
                        }
                    } else {
                        dashboardNotify('error', "Đã có lỗi sảy ra", "#finishDeposit .modal-body");
                    }
                }).fail(function () {
                    dashboardNotify('error', "Đã có lỗi sảy ra", "#finishDeposit .modal-body");
                })
                .always(function () {
                    hidePropzyLoading();
                });
        });
    }

    var confirmDeposit = function (taskId) {
        var dataPost = {
            "taskId": taskId,
            "depositId": tasksInfo.depositId,
            "dealId": tasksInfo.dealId,
            "depositMeetingId": tasksInfo.depositMeetingId,
            "listingId": typeof tasksInfo.rlistingId != 'undefined' ? tasksInfo.rlistingId : tasksInfo.listingId,
            "scheduleTime": tasksInfo.depositMeeting.scheduleTime,
            "price": tasksInfo.depositPrice,
            "note": tasksInfo.note
        }
        $.ajax({
                url: "/deal/set-deposit",
                type: "POST",
                data: JSON.stringify(dataPost),
                beforeSend: function (xhr) {
                    showPropzyLoading();
                    dashboardNotify('success', "<div class='text-center'> <i class=\"icon-loadding fa fa-spinner\"></i><br>Đang gửi thông tin...</div>");
                }
            }).done(function (response) {
                if (typeof response.code != 'underfined' && parseInt(response.code) == 200) {
                    dashboardNotify('success', "Xác nhận xong thông tin đặt cọc");
                    if (!doneTaks(taskId))
                        location.href = '/crm-dashboard';

                } else {
                    dashboardNotify('error', response.message);
                }
            }).fail(function () {
                dashboardNotify('error', "Đã có lỗi sảy ra");
            })
            .always(function () {
                hidePropzyLoading();
            });
    }

    var htmlDeposit = function () {
        if (typeof tasksInfo.depositId == 'undefined') {
            return false;
        }
        var options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        var col1 = $("<div style='float:left; width: 50%'>");
        var col2 = $("<div style='float:left; width: 50%'>");
        col1.append('<div><b>Người bán: </b> ' + tasksInfo.ownerName + '</div>');
        col1.append('<div><b>Người mua: </b> ' + tasksInfo.customerName + '</div>');
        col1.append('<div><b>Ngày gặp đặt cọc: </b> ' + new Date(tasksInfo.depositMeeting.scheduleTime).toLocaleDateString("vi-VN", options) + '</div>');
        col1.append('<div><b>Địa điểm: </b> ' + tasksInfo.depositMeeting.address + '</div>');
        col1.append('<div><b>Số tiền đặt cọc: </b> ' + tasksInfo.formattedDepositPrice + '</div>');
        col1.append('<div><b>Giá chốt bán: </b> ' + tasksInfo.formattedPrice + '</div>');
        col2.append('<div><b>Vay vốn: </b> ' + (tasksInfo.isLoanNeeded ? tasksInfo.depositMeeting.loanValue.toLocaleString() : 'Không có') + '</div>');
        col2.append('<div><b>Ghi chú tờ SA tới BA: </b> ' + tasksInfo.note + '</div>');
        col2.append('<div><b>Trạng thái: </b> ' + tasksInfo.statusName + '</div>');
        return $('<div><div style="font-size: 20px; text-align: center; padding-bottom: 30px;"><b>THÔNG TIN ĐẶT CỌC</b></div>').append(col1).append(col2).html();
    }

    var covertToTPA = function (customerId) {
        // customer/{customerId}/send-tpa
        $.ajax({
                'url': '/common/covert-to-tpa/' + customerId,
                'type': 'post',
                'data': JSON.stringify({}),
                'async': false,
                beforeSend: function (xhr) {
                    showPropzyLoading();
                }
            }).done(function (response) {
                showPropzyAlert(response.message);
            }).fail(function () {
                dashboardNotify('error', 'Không lấy được thông tin');
                return false;
            })
            .always(function () {
                hidePropzyLoading();
            });
    }

    var openModalUpdateContract = function () {
        $('#modal-update-contract').modal().on('shown.bs.modal', function () {
            var files = new PropzyFileUploadLib({
                list: JSON.parse($('#appraisal-photo').attr('current-info')),
                url: baseUploadApiPublic + 'upload',
                source: 'props',
                wrapper: '#appraisal-photo'
            });
            $('#modal-update-contract').find('form').on('submit', function () {
                var dataPost = {
                    "dealId": deal.dealId,
                    "files": files.getList().length > 0 ? files.getList() : null,
                    "contractCode": $('#contractCode').val() != '' ? $('#contractCode').val() : null
                };
                $.ajax({
                    'url': '/deal/update-contract',
                    'type': 'post',
                    'data': JSON.stringify(dataPost),
                    'async': false,
                    beforeSend: function (xhr) {
                        showPropzyLoading();
                    }
                }).done(function (response) {
                    $.alert({
                        title: 'Thông báo!',
                        content: response.message,
                    });
                    if (!response.result)
                        return false;
                }).fail(function () {
                    dashboardNotify('error', 'Không lấy được thông tin');
                    return false;
                }).always(function () {
                    hidePropzyLoading();
                });
            })
        });
    }
    // kiểm tra agent đã tồn tại hay chưa
    var checkExistAgent = function (customerId, customerName) {
        $.ajax({
            url: `/agent/get-existing-agent-by-customer-id`,
            data: JSON.stringify({
                customerId: customerId
            }),
            type: "POST"
        }).done(function (response) {
            if (response.result) {
                if (response.data != null && response.data.length > 0) {
                    openModalCoverAgent(response.data, customerId);
                } else {
                    let htmlPhones = '';
                    let htmlEmails = '';
                    let phonesArr = [];
                    let emailArr = [];
                    if(typeof deal != 'undefined'){
                        let customerPhones = Base64.decode(deal.customerPhones);
                        phonesArr = customerPhones.split(',');
                        emailArr = deal.customerEmails.split(',');
                    }else{
                        let customerPhones = Base64.decode(lead.customerPhones);
                        phonesArr = customerPhones.split(',');
                        emailArr = lead.customerEmails.split(',');
                    }
                    
                    if(phonesArr[0] != ""){
                        $.each(phonesArr, function (index, phone) {
                            htmlPhones += `<div class="radio"><label ><input class="phone" value="${phone}" type="radio" name="phone" checked>${strMask(phone)}</label></div>`
                        })
                        $.each(emailArr, function (index, email) {
                            if(email.length > 0){
                                htmlEmails += `<div class="radio"><label><input class="email" value="${email}" type="radio" name="email" checked>${strMask(email)}</label></div>`
                            }
                        })
                        let contentConfirm = `<div class="panel panel-default">` +
                        `<div class="panel-heading">Chọn 1 số điện thoại</div>` +
                        `<div class="panel-body">${htmlPhones}` +
                        `</div>` +
                        `</div>`
                        
                        if(htmlEmails != "")
                        contentConfirm += `<div class="panel panel-default">`+
                        `<div class="panel-heading">Chọn 1 email</div>` +
                        `<div class="panel-body">${htmlEmails}` +
                        `</div>` +
                        `</div>`;
                        $.confirm({
                            title: 'Tạo môi giới',
                            content: contentConfirm,
                            buttons: {
                                formSubmit: {
                                    text: 'Tạo',
                                    btnClass: 'btn-blue',
                                    action: function () {
                                        // var name = this.$content.find('.name').val();
                                        // if(!name){
                                        //     $.alert('provide a valid name');
                                        //     return false;
                                        // }
                                        // $.alert('Your name is ' + name);
                                        let phone = this.$content.find('input.phone').val();
                                        let email = this.$content.find('input.email').val();
                                        // case tạo mới agent
                                        let dataFake = {
                                            name: customerName,
                                            phone: phone,
                                            email: email
                                        };
                                        Window.agentCreate = new AgentCreate({
                                            btnShowModal: '#btn-agent-create',
                                            sourceId: typeof deal != 'undefined' ? 1105 : 1104,
                                            dataFake: dataFake
                                        });
                                        Window.agentCreate.setDataSendRequest({
                                            leadId : typeof lead != 'undefined' ? lead.leadId : null,
                                            dealId : typeof deal != 'undefined' ? deal.dealId : null,
                                            customerId : customerId
                                        })
                                        $('#btn-agent-create').trigger('click');
                                    }
                                },
                                closeForm: {
                                    text: 'Đóng',
                                    action: function () {
                                        // 
                                    }
                                }
                            },
                            onContentReady: function () {
                                // bind to events
                                var jc = this;
                                this.$content.find('form').on('submit', function (e) {
                                    // if the user submits the form by pressing enter in the field.
                                    e.preventDefault();
                                    jc.$$formSubmit.trigger('click'); // reference the button and click it
                                });
                            }
                        });
                    }else{
                        Window.agentCreate = new AgentCreate({
                            btnShowModal: '#btn-agent-create',
                            sourceId: typeof deal != 'undefined' ? 1105 : 1104
                        })
                        $('#btn-agent-create').trigger('click');
                    }
                }
            }

        }).always(function () {
            $("#ajax-loading").hide();
        });
        return false;
    }
    // cover user to agent
    var openModalCoverAgent = function (agents, customerId) {
        let modal = $('#modal-result-check-agent');
        modal.modal();
        modal.on("shown.bs.modal", function () {
            let content = ``;
            $.each(agents, function (index, agent) {
                let dataJson = JSON.stringify(agent);
                let disabled = "";
                if (agent.statusId == 7) {
                    if (agent.customerId != null) { // nếu là môi giới chính thức nhưng đã có khách hàng trước đó 
                        disabled = "disabled"
                    }
                }
                content += `<tr> <td><input data-datajson='${dataJson}' name='agentId' data-statusid='${agent.statusId}' data-customerid='${customerId}' value='${agent.agentId}' ${disabled} type='checkbox'></td> <td>${agent.agentName}</td> <td>${strMask(agent.email)}</td> <td>${strMask(agent.phone)}</td> <td>${agent.statusName}</td></tr>`;
            });
            modal.find('tbody').html(content);
            // --------------Xử lý check, chọn 1 item------------------------------
            // the selector will match all input controls of type :checkbox
            // and attach a click event handler 
            modal.find("input:checkbox").on('click', function () {
                // in the handler, 'this' refers to the box clicked on
                var $box = $(this);
                if ($box.is(":checked")) {
                    // the name of the box is retrieved using the .attr() method
                    // as it is assumed and expected to be immutable
                    var group = "input:checkbox[name='" + $box.attr("name") + "']";
                    // the checked state of the group/box on the other hand will change
                    // and the current value is retrieved using .prop() method
                    $(group).prop("checked", false);
                    $box.prop("checked", true);
                } else {
                    $box.prop("checked", false);
                }
            });
            // --------------Xử lý submit cover customer to agent------------------------------
            modal.find('#coverAgentButton').on('click', function () {
                modal.find('input').each(function () {
                    if ($(this).is(':checked')) {
                        let customerId = $(this).data('customerid');
                        let agentId = $(this).val();
                        let dataJson = $(this).data('datajson');
                        let statusId = $(this).data('statusid');
                        if (statusId == 7) { // chuyển customer to agent
                            coverUserToAgent(customerId, agentId);
                        } else { //request tpa
                            requestTPA({
                                name: dataJson.agentName,
                                phone: dataJson.phone,
                                email: dataJson.email,
                                customerId: customerId,
                                requestType: 40,
                                sourceId: typeof deal != 'undefined' ? 1105 : 1104,
                                agentId: agentId,
                                leadId: typeof lead !== 'undefined' ? lead.leadId : null,
                                dealId: typeof deal !== 'undefined' ? deal.dealId : null
                            });
                        }
                    }
                })
            })
        })
    }

    var requestTPA = function (dataPost) {
        $.ajax({
            url: `/agent/send-request-tpa`,
            data: JSON.stringify(dataPost),
            type: "POST"
        }).done(function (response) {
            showPropzyAlert(response.message);
            if (response.result) {
                $('#modal-result-check-agent').modal('hide');
            }
        }).always(function () {
            $("#ajax-loading").hide();
        });
    }

    var coverUserToAgent = function (customerId, agentsId) {
        $.ajax({
            url: `/agent/convert-customer-to-agents`,
            data: JSON.stringify({
                customerId: customerId,
                agentsId: agentsId
            }),
            type: "POST"
        }).done(function (response) {
            showPropzyAlert(response.message);
            if (response.result) {
                $('#modal-result-check-agent').modal('hide');
            }
        }).always(function () {
            $("#ajax-loading").hide();
        });
    }

    var trackBAViewInfo = function (type, listingId) {
        let dealId = null;
        let leadId = null;
        if (typeof deal !== 'undefined') {
            if (typeof deal === 'object')
                dealId = deal.dealId;
        } else if (typeof lead !== 'undefined') {
            leadId = lead.leadId;
        }

        $.ajax({
            url: `/common/get-tracking-ba-view-info`,
            data: JSON.stringify({
                type:type,
                dealId: dealId,
                leadId: leadId,
                listingId: listingId
            }),
            type: "POST"
        }).done(function (response) {
            
        }).always(function () {
            $("#ajax-loading").hide();
        });
    }

    var showFullAddress = function (base64Obj) {
        let jsonObj = Base64.decode(base64Obj);
        let object = JSON.parse(jsonObj);
        
        // call tracking ba click view address
        trackBAViewInfo(2, object.rlistingId);

        //! moment.js locale configuration
        //! locale : Vietnamese [vi]
        //! author : Bang Nguyen : https://github.com/bangnk
        // import moment from '../moment';
        // export default
        moment.locale('vi', {
            months : ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"],
            monthsShort : ["Th01", "Th02", "Th03", "Th04", "Th05", "Th06", "Th07", "Th08", "Th09", "Th10", "Th11", "Th12"],
            monthsParseExact : true,
            weekdays : ["chủ nhật", "thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy"],
            weekdaysShort : ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            weekdaysMin : ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            weekdaysParseExact : true,
            meridiemParse: /sa|ch/i,
            isPM : function (input) {
                return /^ch$/i.test(input);
            },
            meridiem : function (hours, minutes, isLower) {
                if (hours < 12) {
                    return isLower ? 'sa' : 'SA';
                } else {
                    return isLower ? 'ch' : 'CH';
                }
            },
            longDateFormat : {
                LT : 'HH:mm',
                LTS : 'HH:mm:ss',
                L : 'DD/MM/YYYY',
                LL : 'D MMMM [năm] YYYY',
                LLL : 'D MMMM [năm] YYYY HH:mm',
                LLLL : 'dddd, D MMMM [năm] YYYY HH:mm',
                l : 'DD/M/YYYY',
                ll : 'D MMM YYYY',
                lll : 'D MMM YYYY HH:mm',
                llll : 'ddd, D MMM YYYY HH:mm'
            },
            calendar : {
                sameDay: '[Hôm nay lúc] LT',
                nextDay: '[Ngày mai lúc] LT',
                nextWeek: 'dddd [tuần tới lúc] LT',
                lastDay: '[Hôm qua lúc] LT',
                lastWeek: 'dddd [tuần rồi lúc] LT',
                sameElse: 'L'
            },
            relativeTime : {
                future : '%s tới',
                past : '%s trước',
                s : 'vài giây',
                ss : '%d giây' ,
                m : 'một phút',
                mm : '%d phút',
                h : 'một giờ',
                hh : '%d giờ',
                d : 'một ngày',
                dd : '%d ngày',
                M : 'một tháng',
                MM : '%d tháng',
                y : 'một năm',
                yy : '%d năm'
            },
            dayOfMonthOrdinalParse: /\d{1,2}/,
            ordinal : function (number) {
                return number;
            },
            week : {
                dow : 1, // Monday is the first day of the week.
                doy : 4  // The week that contains Jan 4th is the first week of the year.
            }
        });
        var newLabel = 'live: ';
        if(moment.unix(object.liveDate/1000).minutesFromNow() <= 60){
            newLabel = '<span style="color:red">new</span> ';
        }
        // return data+'<br/> <small style="color:gray">'+newLabel+moment.unix(object.liveDate/1000).fromNow()+'</small>';
        let html = object.address + '<br/>';
        if(typeof object.liveDate !== undefined && object.liveDate != null && object.liveDate != 'NA'){
            html = html+'<small style="color:gray">'+newLabel+moment.unix(object.liveDate/1000).fromNow()+'</small><br/>';
        }
        if (typeof object.statusQuoName !== 'undefined' && object.statusQuoName != null  && object.statusQuoName != 'NA') {
            html = html + '<span class="label label-large label-pink arrowed-in">'+object.statusQuoName+'</span>';
        }
        if (typeof object.formatRightTypeAndPrivacy !== 'undefined' && object.formatRightTypeAndPrivacy != null  && object.formatRightTypeAndPrivacy != 'NA') {
            html = html + '<span class="label label-large label-purple arrowed-in">'+object.formatRightTypeAndPrivacy;
        // if (typeof object.privacyName !== 'undefined' && object.privacyName != null && object.privacyName != 'NA') {
        //   data = data + ' - ' +object.privacyName;
        // }
        html = html+'</span>';
        }
        if(typeof object.latestHistory !== 'undefined' && object.latestHistory != 'NA' ) {
            html += '<a href="#" data-toggle="tooltip" title="Xem lịch sử hoạt động của chủ nhà" data-placement="right" style="display: block;" onClick="ModalOwnerActivities.show('+object.rlistingId+');return false;"><small style="color:#1831ec" class="text-muted"><i class="fa fa-clock-o" aria-hidden="true"></i> '+moment(object.latestHistory.historyTime).format('DD/MM/YYYY HH:mm')+' : '+ownerActivitesKey(object.latestHistory.code).name+'</small></a>';
            
        }
        if(typeof object.isOwner !== 'undefined' && object.isOwner){
            html = html + '<br/><span class="label label-large label-yellow arrowed-in">Chính chủ</span>';
        }

        // switch show --> hide content for previous address
        const previousAddressElement = $('.previous-show-full');
        previousAddressElement.html(selectedAddress);
        previousAddressElement.removeClass('previous-show-full');

        // save select address to global variable selectedAddress for next click
        selectedAddress = $('.show-full-address-'+object.rlistingId).html();
        
        // switch hide --> show content
        $('.show-full-address-'+object.rlistingId).html('');
        $('.show-full-address-'+object.rlistingId).html(html);
        $('.show-full-address-'+object.rlistingId).addClass('previous-show-full');
    };

    return {
        checkExistAgent: checkExistAgent,
        openModalCoverAgent: openModalCoverAgent,
        coverUserToAgent: coverUserToAgent,
        openModalUpdateContract: openModalUpdateContract,
        showWards: showWards,
        covertToTPA: covertToTPA,
        closeDeal: closeDeal,
        typeDeal: typeDeal,
        printDeposit: printDeposit,
        cancelDeposit: cancelDeposit,
        finishDeposit: finishDeposit,
        confirmDeposit: confirmDeposit,
        showMapDisplayListings: showMapDisplayListings,
        showNegotiateModal: showNegotiateModal,
        showModalDeposit: showModalDeposit,
        changeStatusNegotate: changeStatusNegotate,
        sendDataNegotiate: sendDataNegotiate,
        showPhotos: showPhotos,
        openPhoto: openPhoto,
        openModalListingDetail: openModalListingDetail,
        countTabFollowing: countTabFollowing,
        load: load,
        renderProgressList: renderProgressList,
        checkedFilterAdvance: checkedFilterAdvance,
        resetCheckedInput: resetCheckedInput,
        openModalListingDetailForAllPage: openModalListingDetailForAllPage,
        showFullAddress: showFullAddress,
        trackBAViewInfo: trackBAViewInfo
    };

})();