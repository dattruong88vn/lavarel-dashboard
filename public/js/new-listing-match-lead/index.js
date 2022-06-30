var noListingEmailTitle = "Propzy đang tìm kiếm BĐS phù hợp với nhu cầu của quý khách";
CKEDITOR.replace("emailContent");
var NewListingMatchLead = (function(){
    var modalChooseListings = $("#modalChooseListings");
    var tableChooseListings = null;
    var getCustomerInfo = function(config){
        var postData = {
            leadId: config.leadId
        };
        $.ajax({
            url: "customer/get-detail-from-need",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (config.callBack) {
                config.callBack(response);
            }
        }).always(function () {
        });
    }
    var paramPostData = function () {
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
    };
    var pagination = {
        "currentPage": 1,
        "render": function (totalPages) {
            var html = "";
            for (var i = 1; i <= totalPages; i++) {
                var active = pagination.currentPage == i ? "active" : "";
                html += "<li class='" + active + "' ><a data-page='" + i + "' href='javascript:void(0);'>" + i + "</a></li>";
            }
            $(".pages").html(html);
            $(".pages>li>a").on("click", function (event) {
                pagination.currentPage = parseInt($(this).attr("data-page"));
                loadNewListingMatchLead();
            });
        }
    };
    var loadData = function (callBack) {
        var postData = paramPostData();
        postData.numberItem = 10;
        postData.page = pagination.currentPage;
        showPropzyLoading();
        $.ajax({
            "url": "/new-listing-match-lead/get-data-listing",
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
    var loadNewListingMatchLead = function () {
        loadData(function (response) {
            if (response.result) {
                var htmlContent = "";
                for (var i = 0; i < response.data.list.length; i++) {
                    var listing = response.data.list[i];
                    htmlContent += "<li class='row' style='padding-bottom: 40px; position: relative'>";
                    htmlContent += renderListings(listing);
                    htmlContent += "<div class='col-sm-8 listings-"+listing.rlistingId+"'>";
                    loadDataLeads(listing.rlistingId, 1);
                    htmlContent += "</div>";
                    htmlContent += "</li>";
                }
                $(".table-listings").html(htmlContent);
                initButton();
                pagination.render(response.data.totalPages);
                styleListings();
            }
        });
    };
    /* Render Listings */
    var renderListings = function(data)
    {
        var htmlContent = "";
        htmlContent += "<div class='col-sm-4 listing' data-match-id='" + data.id + "' data-id='" + data.rlistingId + "' style='position: relative' >";
        htmlContent += "<div class='show-listing-detail' >" + renderListingImage(data) + "</div>";
        htmlContent += renderListingLabel(data);
        htmlContent += "<div class='show-listing-detail' ><i class='fa fa-bars'></i> LID: " + data.rlistingId + "</div>";
        htmlContent += "<div><i class='fa fa-map-marker'></i> " + data.address + "</div>";
        htmlContent += "<div><i class='fa fa-usd' ></i> " + data.formatPrice + " - <i class='fa fa-window-maximize'></i> " + data.floorSize + " m<sup>2</sup></div>";
        htmlContent += "<a class='btn-remove-listing text-red' href='javascript:void(0);' data-rlisting-id='" + data.rlistingId + "' style='position:absolute; top: 0; left: 0' ><i class='fa fa-remove'></i></a>";
        htmlContent += "</div>";
        return htmlContent;
    };
    var renderListingLabel = function (data) {
        var htmlContent = "<div class='listing-label'>";
        if(data.isPrivate){
            htmlContent += "<label>Riêng tư</label>";
        }
        if(data.isGuaranteed){
            htmlContent += "<label>Độc quyền</label>";
        }
        htmlContent += "</div>";
        return htmlContent;
    };
    function renderListingImage(data) {
        var imgSrc = "/images/no-listing-image.png";
        if (data.photo) {
            imgSrc = data.photo.link;
        }
        var htmlImage = "<img style='width: 100%' src='" + imgSrc + "' />";
        return htmlImage;
    };
    /* end Render Listings */
    /* Render Leads */
    var loadDataLeads = function (listingId, page) {
        var postData = paramPostData();
        postData.numberItem = 3;
        postData.page = page;
        postData.rlistingId = listingId;
        showPropzyLoading();
        $.ajax({
            "url": "/new-listing-match-lead/lead-match-listing",
            "type": "POST",
            "data": JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                if(response.data.list)
                {
                    if (page > 1)
                    {
                        for(var i = 0; i < response.data.list.length; i++)
                        {
                            var htmlContent = renderItemLead(response.data.list[i]);
                            $(".table-lead-"+listingId).append(htmlContent);
                        }
                    } else {
                        $(".listings-"+listingId).html(renderLeads(listingId, response.data.list));
                    }
                    initButton();
                } else {
                    $(".more-listing-" + listingId).remove();
                }
            }
        }).always(function () {
            hidePropzyLoading();
        });
    };
    var renderLeads = function (listingId, data) {
        var htmlContent = "";
        htmlContent += "<table class='table table-bordered table-leads table-lead-" + listingId + "' >";
        for (var i = 0; i < data.length; i++) {
            htmlContent += renderItemLead(data[i]);
        }
        htmlContent += "</table>";
        if(data.length>2){
            htmlContent += "<a class='load-more-leads btn btn-warning more-listing-" + listingId + "' style='margin:0 auto;' href='javascript:void(0);' data-page=1 data-rlisting-id='" + listingId + "'>Xem thêm</a>";
        }
        return htmlContent;
    };
    var renderItemLead = function (data) {
        var grade = "good";
        if (data.score < 50) {
            grade = "bad";
        }
        grade = "lead-" + grade;
        var htmlContent = "";
        htmlContent += "<tr class='leads lead-" + data.leadId + " " + grade + "' data-score='"+data.score+"' >";
        htmlContent += "<td>";
        htmlContent += "<div class='customer' style='display: inline-block; line-height: 30px;'>";
        htmlContent += "<a href='/lead/detail/" + data.leadId + "' style='display: block;'>";
        htmlContent += data.customerName;
        htmlContent += "</a>";
        htmlContent += " <span >" + data.score + "</span>";
        htmlContent += "</div>";
        htmlContent += "<div style='display: inline-block; float:right'>";
        htmlContent += "<a href='/lead-history/index/" + data.leadId + "' target='_blank' class='btn btn-link' >Lịch sử lead: " + data.leadId + "</a> ";
        htmlContent += "<button class='btn btn-phone' data-lead-id='" + data.leadId + "' ><i class='fa fa-phone'></i> Gọi</button> ";
        htmlContent += "<button data-toggle='tooltip' data-placement='top' title='Hàng phù hợp' class='btn btn-choose-listings' data-lead-id='" + data.leadId + "' ><i class='fa fa-paper-plane-o'></i> Email/SMS listings</button>";
        htmlContent += " <button class='btn btn-email-sms' data-lead-id='" + data.leadId + "' ><i class='fa fa-envelope'></i> Email/SMS khác</button> ";
        htmlContent += "</div>";
        htmlContent += "</td>";
        htmlContent += "</tr>";
        return htmlContent;
    };
    /* end Render Leads */
    var initButton = function()
    {
        $(".listing .show-listing-detail").unbind("click");
        $(".listing .show-listing-detail").on('click', function (event) {
            var rlistingId = $(this).parent(".listing").attr("data-id");
            JMDetail.openModalListingDetailForAllPage(rlistingId);
        });
        $(".load-more-leads").unbind("click");
        $(".load-more-leads").on('click', function (e) {
            e.preventDefault();
            var page = parseInt($(this).attr("data-page"));
            var rlistingId = parseInt($(this).attr("data-rlisting-id"));
            loadDataLeads(rlistingId, page + 1);
            $(this).attr("data-page", page + 1);
        });
        $(".btn-remove-listing").unbind("click");
        $(".btn-remove-listing").on("click", function(e){
            e.preventDefault();
            var selector = $(this);
            var rlistingId = parseInt(selector.attr("data-rlisting-id"));
            var postData = {
                "ids": [
                    rlistingId
                ]
            };
            $.ajax({
                "url": "/new-listing-match-lead/close-listings",
                "type": "POST",
                "data": JSON.stringify(postData)
            }).done(function (response) {
                if (response.result) {
                    selector.parents("li").remove();
                } else {
                    showPropzyAlert(response.message);
                }
            }).always(function () {
                hidePropzyLoading();
            });
        });
        $(".btn-phone").unbind("click");
        $(".btn-phone").on("click", function(e){
            e.preventDefault();
            var leadId = $(this).attr("data-lead-id");
            getCustomerInfo({
                "leadId": leadId,
                "callBack": function(response) {
                    if(response.result){
                        var listPhoneNumbers = [];
                        if(response.data.phoneList){
                            for(var i=0; i<response.data.phoneList.length; i++){
                                listPhoneNumbers.push(response.data.phoneList[i]);
                            }
                        }
                        if(listPhoneNumbers.length > 1){
                            ModalChoosePhoneNumber.showModal({
                                phoneNumbers: listPhoneNumbers,
                                onItemChosen: function (data) {
                                    console.log(data);
                                    DealFunctions.makeCall({
                                        type: 78,
                                        phoneNumber: data.phoneNumber,
                                        dealId: null,
                                        leadId: leadId
                                    });
                                }
                            });
                        } else {
                            DealFunctions.makeCall({
                                type: 78,
                                phoneNumber: listPhoneNumbers[0],
                                dealId: null,
                                leadId: leadId
                            });
                        }
                    }
                    hidePropzyLoading();
                }
            });
        });
        $(".btn-email-sms").unbind("click");
        $(".btn-email-sms").on("click", function(e){
            e.preventDefault();
            var leadId = $(this).attr("data-lead-id");
            getCustomerInfo({
                "leadId": leadId,
                "callBack": function(response) {
                    if(response.result){
                        var listPhoneNumbers = [];
                        if(response.data.phoneList){
                            for(var i=0; i<response.data.phoneList.length; i++){
                                listPhoneNumbers.push(response.data.phoneList[i]);
                            }
                        }

                        var listEmails = [];
                        if(response.data.emailList){
                            for(var i=0; i<response.data.emailList.length; i++){
                                listEmails.push(response.data.emailList[i]);
                            }
                        }
                        /* form send mail other */
                        EmailSmsSender.sendMailOrSms({
                            dealId: null,
                            leadId: leadId,
                            customerEmails: listEmails.length > 0 ? listEmails.join(",") : "",
                            customerPhones: listPhoneNumbers.length > 0 ? listPhoneNumbers.join(",") : ""
                        });
                    }
                    hidePropzyLoading();
                }
            });
        });
        $(".btn-choose-listings").unbind("click");
        $(".btn-choose-listings").on("click", function(e){
            e.preventDefault();
            var leadId = $(this).attr("data-lead-id");
            var postData = paramPostData();
            postData.leadId = leadId;
            postData.rlistingId = $(this).parents("li").find(".listing").attr("data-id");
            $(".current-lead-id").val(leadId);
            showPropzyLoading();
            $.ajax({
                url: "/new-listing-match-lead/listing-matched-lead-send-mail",
                type: "post",
                data: JSON.stringify(postData)
            }).done(function (response) {
                if (response.result) {
                    try {
                        tableChooseListings.destroy();
                    } catch (ex) {
                        
                    }
                    tableChooseListings = $(".tableChooseListings").DataTable({
                        "data": response.data.list,
                        "processing": false,
                        "serverSide": false,
                        "searching": false,
                        "paging": false,
                        "ordering": false,
                        "columns": [
                            {data: "rlistingId", render: function(data, type, object){
                                var checked = "";
                                if(data == postData.rlistingId){
                                    checked = "checked";
                                }
                                return "<input type='checkbox' "+checked+" class='choose-listing' value='"+data+"'/>"
                            }},
                            {data: "rlistingId"},
                            {data: "address"},
                            {data: "score"}
                        ]
                    });
                }
            }).always(function () {
                hidePropzyLoading();
            });
            $("#modalChooseListings").modal({backdrop: 'static', keyboard: false});
        });
        $(".btn-email-sms-listings").unbind("click");
        $(".btn-email-sms-listings").on("click", function(e){
            e.preventDefault();
            var leadId = $("#modalChooseListings").find(".current-lead-id").val();
            var listingIds = [];
            $("#modalChooseListings").find(".choose-listing:checked").each(function(key, value){
                listingIds.push($(this).val());
            });
            if(listingIds.length == 0){
                showPropzyAlert('Không có listing để gửi');
                return false;
            }
            if(listingIds.length > 3){
                showPropzyAlert('Chỉ được chọn tối đa 3 listing');
                return false;
            }
            $("#modalChooseListings").modal('hide');
            getCustomerInfo({
                "leadId": leadId,
                "callBack": function(response) {
                    if(response.result){
                        var listPhoneNumbers = [];
                        if(response.data.phoneList){
                            for(var i=0; i<response.data.phoneList.length; i++){
                                listPhoneNumbers.push(response.data.phoneList[i]);
                            }
                        }
                        var listEmails = [];
                        if(response.data.emailList){
                            for(var i=0; i<response.data.emailList.length; i++){
                                listEmails.push(response.data.emailList[i]);
                            }
                        }
                        /* form send mail */
                        ListingsEmailSmsSender.sendMailOrSms({
                            leadId: leadId,
                            dealId: null,
                            customerEmails: listEmails.length > 0 ? listEmails.join(",") : "",
                            customerPhones: listPhoneNumbers.length > 0 ? listPhoneNumbers.join(",") : "",
                            rListingIds: listingIds,
                            photosPreview: [],
                            photos: []
                        });
                    }
                    hidePropzyLoading();
                }
            });
        });
    }
    var styleListings = function(){
        $(".table-leads").each(function(){
           var firstRowScore = $(this).find("tr:first-child").attr("data-score");
           $(this).find("tr").each(function(){
              var score = $(this).attr("data-score");
              if(score==firstRowScore){
                  $(this).addClass("first-child");
              }
           });           
        });
    }
    $(document).ready(function () {
        loadNewListingMatchLead();
        $(".btnShowConfig").on("click", function (e) {
            e.preventDefault();
            ConfigNewListings.showModal();
        });
        $(".btnFilterListingLead").on("click", function (e) {
            e.preventDefault();
            pagination.currentPage = 1;
            loadNewListingMatchLead();
        });
    });
})();