
var noListingEmailTitle = "Propzy đang tìm kiếm BĐS phù hợp với nhu cầu của quý khách";
CKEDITOR.replace("emailContent");
var NewListings = (function () {

    var modalChooseListings = $("#modalChooseListings");
    var dataTableChooseListings = null;

    var getCustomerInfo = function (config) {
        var postData = {
            "dealId": config.dealId
        };
        $.ajax({
            "url": "customer/get-detail-from-need",
            "type": "POST",
            "data": JSON.stringify(postData)
        }).done(function (response) {
            if (config.callBack) {
                config.callBack(response);
            }
        }).always(function () {

        });
    };

    var getCorePostData = function () {
        var item = {
            "fromDate": 0,
            "toDate": moment().unix() * 1000,
        };
        var textFromDate = $("#fromDate").val();
        var textToDate = $("#toDate").val();
        if (textFromDate.trim() !== "") {
            item.fromDate = moment(textFromDate, 'DD-MM-YYYY').unix() * 1000;
        }
        if (textToDate.trim() !== "") {
            item.toDate = moment(textToDate, 'DD-MM-YYYY').unix() * 1000;
        }
        item.listingTypeId = $("#listingTypeId").val();
        return item;
    }

    var loadData = function (callBack) {
        var postData = getCorePostData();
//            "isPrivate": false,
        postData.numberItem = 3;
        postData.page = pagination.currentPage;
        showPropzyLoading();
        $.ajax({
            "url": "/new-listings/data",
            "type": "post",
            "data": JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                callBack(response);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    };


    function renderImage(listing) {
        var imgSrc = "/images/no-listing-image.png";
        if (listing.photo) {
            imgSrc = listing.photo.link;
        }
        var htmlImage = "<img style='width: 100%' src='" + imgSrc + "' />";
        return htmlImage;
    }

    var renderListingLabel = function (listing) {
        var htmlContent = "<div class='listing-label'>";
        if(listing.isPrivate){
            htmlContent += "<label>Riêng tư</label>";
        }
        if(listing.isGuaranteed){
            htmlContent += "<label>Độc quyền</label>";
        }
        htmlContent += "</div>";
        return htmlContent;
    }

    var renderListing = function (listing) {
        var htmlContent = "";
        htmlContent += "<div class='col-sm-4 listing' data-match-id='" + listing.id + "' data-id='" + listing.rlistingId + "' style='position: relative' >";
        htmlContent += "<div class='show-listing-detail' >" + renderImage(listing) + "</div>";
        htmlContent += renderListingLabel(listing);
        htmlContent += "<div class='show-listing-detail' ><i class='fa fa-bars'></i> LID: " + listing.rlistingId + "</div>";
        htmlContent += "<div><i class='fa fa-map-marker'></i> " + listing.address + "</div>";
        htmlContent += "<div><i class='fa fa-usd' ></i> " + listing.formatPrice + " - <i class='fa fa-window-maximize'></i> " + listing.floorSize + " m<sup>2</sup></div>";
        htmlContent += "<a class='btn-remove-listing text-red' href='#' data-rlisting-id='" + listing.rlistingId + "' style='position:absolute; top: 0; left: 0' ><i class='fa fa-remove'></i></a>";
        htmlContent += "</div>";
        return htmlContent;
    };

    var renderDeal = function (deal) {
        var grade = "good";
        if (deal.score < 50) {
            grade = "bad";
        }
        grade = "deal-" + grade;
        var htmlDeals = "";
        htmlDeals += "<tr class='deal deal-" + deal.dealId + " " + grade + "' data-score='"+deal.score+"' >";
        htmlDeals += "<td>";
        htmlDeals += "<div class='customer' style='display: inline-block; line-height: 30px;'>";
        htmlDeals += "<a href='/deal/detail/" + deal.dealId + "' style='display: block;'>";
        htmlDeals += deal.customerName;
        htmlDeals += "</a>";
        htmlDeals += " <span >" + deal.score + "</span>";
        htmlDeals += "</div>";
        htmlDeals += "<div style='display: inline-block; float:right'>";
        htmlDeals += "<a href='/deal-history/index/" + deal.dealId + "' target='_blank' class='btn btn-link' >Lịch sử deal: " + deal.dealId + "</a> ";
        htmlDeals += "<button class='btn btn-phone' data-deal-id='" + deal.dealId + "' ><i class='fa fa-phone'></i> Gọi</button> ";
        htmlDeals += "<button data-toggle='tooltip' data-placement='top' title='Hàng phù hợp' class='btn btn-choose-listings' data-deal-id='" + deal.dealId + "' ><i class='fa fa-paper-plane-o'></i> Email/SMS listings</button>";
        htmlDeals += " <button class='btn btn-email-sms' data-deal-id='" + deal.dealId + "' ><i class='fa fa-envelope'></i> Email/SMS khác</button> ";
        htmlDeals += "</div>";
        htmlDeals += "</td>";
        htmlDeals += "</tr>";
        return htmlDeals;
    };

    var renderDeals = function (listing) {
        if (!listing.deals) {
            return "";
        }
        var htmlDeals = "<div class='col-sm-8'>";
        htmlDeals += "<table class='table table-bordered table-deals table-deals-" + listing.rlistingId + "' >";
        for (var i = 0; i < listing.deals.length; i++) {
            var deal = listing.deals[i];
            htmlDeals += renderDeal(deal);
        }
        htmlDeals += "</table>";
        if(listing.deals.length>2){
            htmlDeals += "<a class='load-more-deals btn btn-warning' style='margin:0 auto;' href='#' data-page=0 data-rlisting-id='" + listing.rlistingId + "'>Xem thêm</a>";
        }
        htmlDeals += "</div>";
        return htmlDeals;
    }

    var initLoadMoreDealsButton = function () {
        $(".load-more-deals").unbind("click");
        $(".load-more-deals").on("click", function (event) {
            var postDataDeals = getCorePostData();
            postDataDeals.numberItem = 3;
            var selector = $(this);
            event.preventDefault();
            var rlistingId = $(this).attr("data-rlisting-id");
            var page = $(this).attr("data-page");
            postDataDeals.page = parseInt(page) + 1;
            $(this).attr("data-page", postDataDeals.page);
            showPropzyLoading();
            postDataDeals.rlistingId = rlistingId;
            $.ajax({
                "url": "/new-listings/deals-match-listing",
                "type": "post",
                "data": JSON.stringify(postDataDeals)
            }).done(function (response) {
                console.log(response);
                if (response.data.list) {
                    showMoreDeals(rlistingId, response.data.list);
                } else {
                    selector.remove();
                }
                initButton();
            }).always(function () {
                hidePropzyLoading();
            });
        });
    };

    var showMoreDeals = function (rlistingId, deals) {
        var htmlDeals = "";
        for (var i = 0; i < deals.length; i++) {
            var deal = deals[i];
            if ($(".table-deals-" + rlistingId + " .deal-" + deal.dealId).length <= 0) {
                htmlDeals += renderDeal(deal);
            }
        }
        $(".table-deals-" + rlistingId).append(htmlDeals);
    }

    function initButton() {
        initLoadMoreDealsButton();
        $(".listing .show-listing-detail").unbind("click");
        $(".listing .show-listing-detail").on('click', function (event) {
            var rlistingId = $(this).parent(".listing").attr("data-id");
            JMDetail.openModalListingDetailForAllPage(rlistingId);
        });

        $(".btn-phone").unbind("click");
        $(".btn-phone").on("click", function (event) {
            event.preventDefault();
            var dealId = $(this).attr("data-deal-id");
            getCustomerInfo({
                "dealId": dealId,
                "callBack": function (response) {
                    if (response.result) {
                        var phoneNumbers = [];
                        for (var i = 0; i < response.data.phoneList.length; i++) {
                            phoneNumbers.push(response.data.phoneList[i].phone);
                        }
                        if (phoneNumbers.length > 1) {
                            ModalChoosePhoneNumber.showModal({
                                phoneNumbers: phoneNumbers,
                                onItemChosen: function (data) {
                                    console.log(data);
                                    DealFunctions.makeCall({
                                        type: 78,
                                        phoneNumber: data.phoneNumber,
                                        dealId: dealId,
                                        leadId: null
                                    });
                                }
                            });
                        } else {
                            DealFunctions.makeCall({
                                type: 78,
                                phoneNumber: phoneNumbers[0],
                                dealId: dealId,
                                leadId: null
                            });
                        }
                    }
                }
            });
        });

        $(".btn-email-sms").unbind("click");
        $(".btn-email-sms").on("click", function (event) {
            event.preventDefault();
            var dealId = $(this).attr("data-deal-id");
            getCustomerInfo({
                "dealId": dealId,
                "callBack": function (response) {
                    if (response.result) {
                        var phoneNumbers = [];
                        if (response.data.phoneList) {
                            for (var i = 0; i < response.data.phoneList.length; i++) {
                                phoneNumbers.push(response.data.phoneList[i].phone);
                            }
                        }

                        var emails = [];
                        if (response.data.emailList) {
                            for (var i = 0; i < response.data.emailList.length; i++) {
                                emails.push(response.data.emailList[i].email);
                            }
                        }


                        EmailSmsSender.sendMailOrSms({
                            dealId: dealId,
                            leadId: null,
                            customerEmails: emails.length > 0 ? emails.join(",") : "",
                            customerPhones: phoneNumbers.length > 0 ? phoneNumbers.join(",") : ""
                        });
                    }
                }
            });
        });


        $(".btn-choose-listings").unbind("click");
        $(".btn-choose-listings").on("click", function (event) {
            event.preventDefault();
            var dealId = $(this).attr("data-deal-id");
            $(".current-deal-id").val(dealId);
            var postData = getCorePostData();
            postData.dealId = dealId;
            postData.rlistingId = $(this).parents("li").find(".listing").attr("data-id");
            showPropzyLoading();
            $.ajax({
                "url": "/new-listings/listing-matched-deal",
                "type": "POST",
                "data": JSON.stringify(postData)
            }).done(function (response) {
                console.log(response);
                try {
                    dataTableChooseListings.destroy();
                } catch (ex) {
                }
                if (response.result) {
                    dataTableChooseListings = $(".dataTableChooseListings").DataTable({
                        "lengthChange": false,
                        //"scrollY": "200",
                        "processing": false,
                        "serverSide": false,
                        "searching": false,
                        "data": response.data.list,
                        "ordering": false,
                        "paging": false,
                        "createdRow": function (row, data, index) {
                            if (data.rlistingId == postData.rlistingId) {
                             $(row).css("background-color","rgba(75, 192, 192, 0.29)");
                            }
                        },
                        "columns": [
                            {"data": "rlistingId", render: function (data, type, object) {
                                    var checked = "";
                                    if (data == postData.rlistingId) {
                                        checked = "checked";
                                    }
                                    return "<input type='checkbox' " + checked + " class='choose-listing' value='" + data + "' />";
                                }},
                            {"data": "rlistingId"},
                            {"data": "address"},
                            {"data": "score"}
                        ]
                    });
                }
            }).always(function () {
                hidePropzyLoading();
            });

            modalChooseListings.modal();
        });

        $(".btn-email-sms-listings").unbind("click");
        $(".btn-email-sms-listings").on("click", function (event) {
            event.preventDefault();
            var dealId = modalChooseListings.find(".current-deal-id").val();
            var rListingIds = [];
            modalChooseListings.find(".choose-listing:checked").each(function () {
                var rlistingId = $(this).val();
                rListingIds.push(rlistingId);
            });
            if (rListingIds.length <= 0) {
                showPropzyAlert('Không có listing để gửi');
                return false;
            } else if (rListingIds.length > 3) {
                showPropzyAlert('Chỉ được chọn tối đa 3 listing');
                return false;
            }
            modalChooseListings.modal('hide');
            showPropzyLoading();
            getCustomerInfo({
                "dealId": dealId,
                "callBack": function (response) {
                    if (response.result) {
                        var phoneNumbers = [];
                        if (response.data.phoneList) {
                            for (var i = 0; i < response.data.phoneList.length; i++) {
                                phoneNumbers.push(response.data.phoneList[i].phone);
                            }
                        }

                        var emails = [];
                        if (response.data.emailList) {
                            for (var i = 0; i < response.data.emailList.length; i++) {
                                emails.push(response.data.emailList[i].email);
                            }
                        }

                        ListingsEmailSmsSender.sendMailOrSms({
                            leadId: null,
                            dealId: dealId,
                            customerEmails: emails.length > 0 ? emails.join(",") : "",
                            customerPhones: phoneNumbers.length > 0 ? phoneNumbers.join(",") : "",
                            rListingIds: rListingIds,
                            photosPreview: [],
                            photos: []
                        });
                    }
                    hidePropzyLoading();

                }
            });
        });

        $(".btn-remove-listing").unbind("click");
        $(".btn-remove-listing").on("click", function (event) {
            event.preventDefault();
            var id = $(this).parents(".listing").attr("data-match-id");
            var postData = {
                "ids": [
                    id
                ]
            };
            var selector = $(this);
            showPropzyLoading();
            $.ajax({
                "url": "/new-listings/close-listings",
                "type": "POST",
                "data": JSON.stringify(postData)
            }).done(function (response) {
                console.log(selector);
                if (response.result) {
                    selector.parents("li").remove();
                } else {
                    showPropzyAlert(response.message);
                }
            }).always(function () {
                hidePropzyLoading();
            });
        });
    }



    var loadNewListings = function () {
        loadData(function (response) {
            if (response.result) {
                var htmlContent = "";
                console.log(response.data.list);
                for (var i = 0; i < response.data.list.length; i++) {
                    var listing = response.data.list[i];
                    htmlContent += "<li class='row' style='padding-bottom: 36px; margin-bottom: 36px; position: relative'>";
                    htmlContent += renderListing(listing);
                    htmlContent += renderDeals(listing);
                    htmlContent += "</li>";
                }
                $(".table-listings").html(htmlContent);
                initButton();
                pagination.render(response.data.totalPages);
                styleListings();
            }
        });
    }

    var pagination = {
        "currentPage": 1,
        "render": function (totalPages) {
            var html = "";
            for (var i = 1; i <= totalPages; i++) {
                var active = pagination.currentPage == i ? "active" : "";

                html += "<li class='" + active + "' ><a data-page='" + i + "' href='#'>" + i + "</a></li>";
            }
            $(".pages").html(html);
            $(".pages>li>a").on("click", function (event) {
                //event.preventDefault();
                pagination.currentPage = parseInt($(this).attr("data-page"));
                loadNewListings();
            });
        }
    };
    
    var styleListings = function(){
        $(".table-deals").each(function(){
           var firstRowScore = $(this).find("tr:first-child").attr("data-score");
           $(this).find("tr").each(function(){
              var score = $(this) .attr("data-score");
              if(score==firstRowScore){
                  $(this).addClass("first-child");
              }
           });           
        });
    }

    $(document).ready(function () {
        loadNewListings();
        $(".btnShowConfig").on("click", function (event) {
            event.preventDefault();
            ConfigNewListings.showModal();
        });
        $(".btnFilterNewListings").on("click", function (event) {
            event.preventDefault();
            pagination.currentPage = 1;
            loadNewListings();
        });
    });

})();

