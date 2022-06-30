<div id="modalSearchListingsResultOverview" class="modal fade" role="dialog" style="height:auto; max-height: 100%; overflow: scroll">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

                <h4 class="modal-title">TỔNG QUAN KẾT QUẢ TÌM KIẾM</h4>
            </div>

            <div class="modal-body">
                <div class="col-sm-6">
                    <div class="row">
                        <div class="col-sm-6">
                            <label>Tổng số lượng listing: </label>
                            <span class="totalItems"></span>
                        </div>
                        <div class="col-sm-6">
                            <label>Số ngày (TB) trên Propzy: </label>
                            <span class="totalOfLiveDays"></span>
                        </div>

                        <div class="col-sm-6">
                            <label>Giá trung bình: </label>
                            <span class="avgPrice"></span>
                        </div>
                        <div class="col-sm-6">
                            <label>Giá trị nhà ở vị trí thứ <span class="medianHome"></span>: </label>
                            <span class="formatMiddlePrice"></span>
                        </div>
                        <div class="col-sm-6">
                            <label>Giá thấp nhất: </label>
                            <span class="formatMinPrice"></span>
                        </div>
                        <div class="col-sm-6">
                            <label>Giá m<sup>2</sup> trung bình: </label>
                            <span class="formatPricePerSquareMeter"></span>
                        </div>
                        <div class="col-sm-6">
                            <label>Giáp với:</label>
                            <span class="vicinityArea"></span>
                        </div>
                    </div>
                    <div>
                        <h4>Thông tin giao dịch gần nhất:</h4>
                        <hr style="margin-top:0px;" />
                        <div class="col-xs-12">
                            <div class="row">
                                <div class="col-xs-12">
                                    <label>Ngày có giao dịch: </label>
                                    <span class="dateRecentTrx"></span>
                                    <a class="showTableRencentTrx" href="#"><i class="glyphicon glyphicon-arrow-down"></i></a>
                                </div>
                                <div class="recentTransactionsWrapper" style="box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);padding: 16px">
                                    <div class="button-group">
                                        <button class="changeDataTableRecentTrxDateRange btn btn-warning active" data-value="30">1 tháng</button>
                                        <button class="changeDataTableRecentTrxDateRange btn btn-warning" data-value="180">6 tháng</button>
                                        <button class="changeDataTableRecentTrxDateRange btn btn-warning" data-value="365">1 năm</button>
                                        <a href="#" class="hideTableRencentTrx pull-right"><i class="glyphicon glyphicon-remove"></i></a>
                                    </div>
                                    <table class="dataTableRecentTrx table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Ngày có giao dịch gần nhất</th>
                                                <th>Địa chỉ</th>
                                                <th>Giá trị</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <label>Giá trị của giao dịch: </label>
                            <span class="valueRecentTrx"></span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div id="listing_map" style="width: 680px; height: 250px; max-width: 100%" class="pull-right"></div>
                </div>
                <div>
                    <table class="table table-bordered dataTableSearchResultOverview">
                        <thead>
                            <tr>
                                <th>LID</th>
                                <th>Giá</th>
                                <th>Giá m<sup>2</sup> đất</th>
                                <th>Giá m<sup>2</sup> sử dụng</th>
                                <th>Dài (đất)</th>
                                <th>Rộng (đất)</th>
                                <th>Diện tích SD</th>
                                <th>Bed - Bath</th>
                                <th>Số tầng</th>
                                <th>Mặt tiền</th>
                                <th>Hẻm</th>
                                <th>FSBO</th>
                                <th>Số ngày trên Propzy</th>
                                <th>Đã verify?</th>
                                <th>Số lượt đi xem</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    /**
     * show modal search listing result overview
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @since crm sprint 2
     * @type module
     */
    var SearchListingsResultOverview = (function() {
        var myModal = $("#modalSearchListingsResultOverview");
        var myConfig = null;
        var myPostData = null;
        var dataTableSearchResultOverview = null;
        var markers = [];
        var map = null;

        function showModal(config) {
            showPropzyLoading();
            myConfig = config;
            var postData = null;
            var postDataUrl = "";
            if (config.dealId) {
                postDataUrl = "/deal/get-post-data-for-market-report/" + deal.dealId + "?";
            } else if (config.leadId) {
                postDataUrl = "/lead/get-post-data-for-market-report/" + config.leadId + "?";
            }
            postData = generatePostData({
                url: postDataUrl,
                done: function(postData) {
                    myPostData = postData;
                    showData(myPostData);
                    loadDataTableRecentTrx({
                        "postData": myPostData,
                        "daysToSubtract": 30
                    });
                }
            });
        }

        var generatePostData = function(params) {
            url = params.url;
            var locations = {};
            var fromTo = [];
            var wardsList = [];
            var districtsList = [];
            var directionsList = [];
            var privateListing = [];
            $('#crm_jm_formCustomSearchListing .districtsList:checked').each(function() {
                districtsList.push($(this).val());
            });
            if (districtsList.length > 0) {
                locations['districtsList'] = districtsList;
                // url += "districtsList="+JSON.stringify(districtsList)+"&"; privateListing
            } else {
                locations['districtsList'] = '';
            }

            $('#crm_jm_formCustomSearchListing .ward:checked').each(function() {
                wardsList.push($(this).val());
            });
            if (wardsList.length > 0) {
                locations['wardsList'] = wardsList;
                // url += "wardsList="+JSON.stringify(wardsList)+"&"; 
            } else {
                locations['wardsList'] = '';
            }
            // ************************** JACK SMALL ************************************* 
            $('#crm_jm_formCustomSearchListing .privateListing:checked').each(function() {
                privateListing = $(this).val();
            });
            if (privateListing.length > 0) {
                locations['privateListing'] = privateListing;
                // url += "wardsList="+JSON.stringify(wardsList)+"&"; 
            } else {
                locations['privateListing'] = '';
            }
            // ************************** JACK SMALL ************************************* 
            $('#crm_jm_formCustomSearchListing .status').each(function() {
                if ($(this).is(":checked")) {
                    locations[$(this).attr('statusname')] = true;
                } else {
                    locations[$(this).attr('statusname')] = false;
                }
            });
            // ************************** JACK SMALL ************************************* 
            $('#crm_jm_formCustomSearchListing .directionsAdvange:checked').each(function() {
                directionsList.push($(this).val());
            });
            if (directionsList.length > 0) {
                locations['directionsList'] = directionsList;
                // url += "wardsList="+JSON.stringify(wardsList)+"&"; 
            } else {
                locations['directionsList'] = '';
            }
            // ************************** JACK SMALL ************************************* 
            if (Object.keys(locations).length > 0) {
                // console.log(locations)
                url += 'locations=' + JSON.stringify(locations) + '&';
            }
            // console.log(locations);
            if ($("input[name='alleyFromTo']").val() != "" && $("input[name='alleyToValue']").val() != "") {
                var pushItem = {
                    'type': 'alley',
                    'fromValue': $("input[name='alleyFromTo']").val(),
                    'toValue': $("input[name='alleyToValue']").val()
                };
                fromTo.push(pushItem);
            }

            if ($("input[name='lengthFromTo']").val() != "" && $("input[name='lengthToValue']").val() != "") {
                var pushItem = {
                    'type': 'length',
                    'fromValue': $("input[name='lengthFromTo']").val(),
                    'toValue': $("input[name='lengthToValue']").val()
                }
                fromTo.push(pushItem);
            }

            if ($("input[name='widthFromTo']").val() != "" && $("input[name='widthToValue']").val() != "") {
                fromTo.push({
                    'type': 'width',
                    'fromValue': $("input[name='widthFromTo']").val(),
                    'toValue': $("input[name='widthToValue']").val()
                });
            }

            if ($("input[name='yearBuiltFromTo']").val() != "") {
                fromTo.push({
                    'type': 'yearbuilt',
                    'fromValue': $("input[name='yearBuiltFromTo']").val(),
                    'toValue': 9999999999999
                });
            }
            if (fromTo.length > 0) {
                url += "fromTo=" + JSON.stringify(fromTo) + "&";
            }
            $.ajax({
                url: url,
                type: 'get'
            }).done(function(response) {
                if (params.done) {
                    params.done(response)
                }
                console.log(response);
            });
        };


        function clearMarker() {
            for (var i = 0; i < markers.length; i++) {
                try {
                    markers[i].setMap(null);
                } catch (ex) {}
            }
            markers = [];
        }

        function destroyDataTable(dataTable) {
            try {
                dataTable.destroy();
            } catch (Ex) {}
        }

        function showDataTable(items) {
            destroyDataTable(dataTableSearchResultOverview);
            clearMarker();
            dataTableSearchResultOverview = myModal.find(".dataTableSearchResultOverview").DataTable({
                "processing": true,
                "serverSide": false,
                "data": items,
                "lengthChange": false,
                "paging": true,
                "searching": false,
                "ordering": false,
                "columns": [
                    //{"data": "rlistingId"},
                    {
                        "data": "rlistingId",
                        render: function(data, type, object) {
                            return "<a href='#' onclick='JMDetail.openModalListingDetailForAllPage(" + data + ");return false;' >" + data + "</a>";
                        }
                    },
                    {
                        "data": "formatPrice"
                    },
                    {
                        "data": "formatPricePerSquareMeterOfLotSize"
                    },
                    {
                        "data": "formatPricePerSquareMeterOfFloorSize"
                    },
                    {
                        "data": "sizeLength"
                    },
                    {
                        "data": "sizeWidth"
                    },
                    {
                        "data": "floorSize"
                    },
                    {
                        "data": "bedrooms",
                        render: function(data, type, object) {
                            var returnValue = object.bedrooms != null ? object.bedrooms : "N/A";
                            returnValue += " - ";
                            returnValue += object.bathrooms != null ? object.bathrooms : "N/A";
                            return returnValue;
                        }
                    },
                    {
                        "data": "formatNumberFloor",
                        render: function(data, type, object) {
                            return data ? data : "0";

                        }
                    },
                    {
                        "data": "propertyPosition",
                        render: function(data, type, object) {
                            if (data == null) {
                                return "N/A";
                            }
                            return "<div class='text-center'><i class='fa " + (data == 1 ? "fa-check-square-o" : "fa-square-o") + "'></i></div>";
                        }
                    },
                    {
                        "data": "countAlley",
                        render: function(data, type, object) {
                            if (data == null) {
                                return "N/A";
                            }
                            return data ? data : "0";
                        }
                    },
                    {
                        "data": "source",
                        render: function(data, type, object) {
                            //return "<div class='text-center'><i class='fa " + (data == 3 ? "fa-check" : "fa-unchecked") + "'></i></div>";
                            return "<div class='text-center'><i class='fa " + (data == 3 ? "fa-check-square-o" : "fa-square-o") + "'></i></div>";
                        }
                    },
                    {
                        "data": "numberDaysOfLive"
                    },
                    {
                        "data": "isPrivate",
                        render: function(data, type, object) {
                            return "<div class='text-center'><i class='fa " + (!data ? "fa-check-square-o" : "fa-square-o") + "'></i></div>";
                            //return !data ? "rồi" : "chưa";
                        }
                    },
                    {
                        "data": "numberOfViewings"
                    }
                ],
                "createdRow": function(row, data, index) {
                    if (data.statusId == 7) {
                        $(row).addClass("sold-item");
                    }
                }
            });

            myModal.find(".listing-status").each(function() {});
        }

        function showData(postData) {
            var dataUrl = "/deal/search-listings-result-overView?_myajax=1";
            var mapClass = "listing_map_" + moment().unix();
            var mapCanvas = $("<div class='" + mapClass + "' style='width: 680px; height: 250px; max-width: 100%'></div>");
            $("#listing_map").html("");
            $("#listing_map").append(mapCanvas);
            myModal.modal();
            showPropzyLoading();
            $.ajax({
                url: dataUrl,
                type: "post",
                data: JSON.stringify(postData)
            }).done(function(response) {
                //console.log(response);
                showDataTable(response.data.list);
                myModal.find(".totalItems").html(response.data.totalItems);
                myModal.find(".totalOfLiveDays").html(response.data.totalOfLiveDays);
                myModal.find(".dateRecentTrx").html(response.data.dateRecentTrx);
                myModal.find(".valueRecentTrx").html(response.data.valueRecentTrx);
                myModal.find(".avgPrice").html(response.data.avgPrice);
                myModal.find(".formatMiddlePrice").html(response.data.formatMiddlePrice);
                myModal.find(".formatMinPrice").html(response.data.formatMinPrice);
                myModal.find(".formatPricePerSquareMeter").html(response.data.formatPricePerSquareMeter);
                myModal.find(".vicinityArea").html(response.data.vicinityArea);
                var medianHome = Math.floor(parseFloat(response.data.totalItems) / 2) + 1;
                myModal.find(".medianHome").html(medianHome);
                var markerValues = [];
                var infoWindows = [];
                var kmllayers = [];
                var kmllayerUrls = [];
                if (response.data && response.data.list) {
                    for (var i = 0; i < response.data.list.length; i++) {
                        var item = response.data.list[i];
                        if (item.longitude && item.latitude) {
                            var marker = {
                                position: [item.latitude, item.longitude],
                                icon: "http://maps.google.com/mapfiles/kml/paddle/red-circle.png"
                            };
                            markerValues.push(marker);
                            infoWindows.push({
                                content: "<div style='width:260px'><div><img class='pull-left' style='max-width:49%' src = '" + item.photo.link + "' /></div><div style='max-width:49%' class='pull-right'><div><b>LID: <a href='" + item.link + "' target='_blank'>" + item.rlistingId + "</a></b></div>" + item.address + "</div></div>",
                                position: marker.position
                            });
                            var kmlUrl = "http://124.158.14.32:8888/kmz/" + text2Slug(item.districtName).toLowerCase() + ".kmz";
                            if ($.inArray(kmlUrl, kmllayerUrls) < 0) {
                                kmllayers.push({
                                    "url": kmlUrl
                                });
                            }
                            kmllayerUrls.push(kmlUrl);
                        }
                        /*
                         if (markerValues.length > 10) {
                         break;
                         }
                         */
                    }
                }
                var centerPosition = markerValues.length > 0 ? markerValues[0].position : [10.794019, 106.679694];
                $(mapCanvas).gmap3({
                        center: centerPosition,
                        zoom: 13, 
                        maxZoom: response.data.isNeedChangeZoom ? 15 : undefined
                    })
                    .marker(markerValues)
                    .infowindow(infoWindows)
                    .then(function(infoWindows) {
                        map = this.get(0);
                        markers = this.get(1);
                        for (var i = 0; i < markers.length; i++) {
                            var marker = markers[i];
                            marker.index = i;
                            marker.addListener('click', function() {
                                var currentInfoWindow = infoWindows[this.index];
                                $(infoWindows).each(function(index, item) {
                                    item.close();
                                });
                                $(markers).each(function(index, item) {
                                    item.setIcon("http://maps.google.com/mapfiles/kml/paddle/red-circle.png");
                                });
                                this.setIcon('http://maps.google.com/mapfiles/kml/paddle/grn-circle.png');
                                currentInfoWindow.open(map, this);
                            });
                        }
                    })
                    .kmllayer(kmllayers);
                /*
                 .on("click", function(a){
                 console.log(a);
                 });
                 */
            }).always(function() {
                hidePropzyLoading();
            });
        }
        var dataTableRecentTrx = null;

        function loadDataTableRecentTrx(params) {
            var daysToSubtract = params.daysToSubtract;
            var toDate = moment();
            var fromDate = moment().subtract(daysToSubtract, 'days');
            var postUrl = "/deal/search-listings-recent-transactions?_myajax=1&toDate=" + (toDate.unix() * 1000) + "&fromDate=" + (fromDate.unix() * 1000);
            try {
                dataTableRecentTrx.destroy();
            } catch (Ex) {}
            dataTableRecentTrx = myModal.find(".dataTableRecentTrx").DataTable({
                "processing": true,
                "serverSide": false,
                "ajax": {
                    url: postUrl,
                    type: 'post',
                    data: function(d) {
                        return JSON.stringify(params.postData);
                    },
                    contentType: "text/plain",
                    success: function(response) {
                        if (response.code === "401") {
                            showPropzyAlert(response.message);
                        }
                    },
                    complete: function(response, type) {
                        if (response.responseJSON.code === "401") {
                            window.location.href = "/deal/detail/" + deal.dealId;
                        }
                    }
                },
                "lengthChange": false,
                "paging": true,
                "searching": false,
                "ordering": false,
                "columns": [
                    //{"data": "rlistingId"},
                    {
                        "data": "createdDate",
                        render: dateRender,
                        width: "110px"
                    },
                    {
                        "data": "address"
                    },
                    {
                        "data": "formatPrice",
                        width: "93px"
                    }
                ]
            });

        }

        myModal.find(".recentTransactionsWrapper").hide();
        myModal.find(".showTableRencentTrx").on("click", function() {
            var days = parseInt(myModal.find(".changeDataTableRecentTrxDateRange.active").attr("data-value"));
            loadDataTableRecentTrx({
                "postData": myPostData,
                "daysToSubtract": days
            });
            myModal.find(".recentTransactionsWrapper").toggle();
        });
        myModal.find(".hideTableRencentTrx").on("click", function(event) {
            event.preventDefault();
            myModal.find(".recentTransactionsWrapper").toggle();
        });

        myModal.find(".changeDataTableRecentTrxDateRange").on("click", function(event) {
            event.preventDefault();
            myModal.find(".changeDataTableRecentTrxDateRange").removeClass("active");
            $(this).addClass("active");
            var days = parseInt($(this).attr("data-value"));
            loadDataTableRecentTrx({
                "postData": myPostData,
                "daysToSubtract": days
            });
        });

        return {
            showModal: showModal
        };
    })();
</script>