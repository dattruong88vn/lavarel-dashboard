<div class="tab-pane active customDatatable listingMatchingCRMJM" id="tab_1">
    <!-- FORM LISTING SEARCJ -->
    <div class="" id="crm_jm_formCustomSearchListing">
        <ul class="nav nav-tabs">
            <li class="active"><a href="#form-location" data-toggle="tab">Chọn theo khu vực</a></li>
            <li><a id="load-map-draw" href="#form-map" data-toggle="tab">Theo bản đồ</a></li>
        </ul>
        <div class="tab-content" style="padding: 10px; background-color: #fff; border: 1px solid #ddd; margin-bottom: 15px;">
            <div class="tab-pane active" id="form-location">
                {!! $form_custom_search['districtType'] !!}
            </div>
            <div class="tab-pane" id="form-map" style="position: relative">
                <div id="map-filter-container" style="width: 100%; height: 500px;"></div>
                <div id="loadding-map" style="display:none; background-color: #ffffffb3; font-size:18px; width: 100%; height: 500px; position: absolute; top: 0px; left: 0px; padding: 250px; text-align: center"> <b style="color: red;">Đang tải bản đồ</b> </div>
                <div class="reset-map text-center" style="margin-top: 10px;"><button class="btn btn-block btn-primary">Làm mới</button> </div>
                {!! $form_custom_search['location_map'] !!}
            </div>
        </div>
        <div class="row">
            <div class="col-md-2"><b>Dài:</b></div>
            <div class="col-md-5">
                {!! $form_custom_search['lengthFromTo'] !!}
            </div>
            <div class="col-md-5">
                {!! $form_custom_search['lengthToValue'] !!}
            </div>
        </div>
        <div class="row">
            <div class="col-md-2"><b>Rộng:</b></div>
            <div class="col-md-5">
                {!! $form_custom_search['widthFromTo'] !!}
            </div>
            <div class="col-md-5">
                {!! $form_custom_search['widthToValue'] !!}
            </div>
        </div>
        {!! $form_custom_search['directionType'] !!}
        <div class="row">
            <div class="col-md-2"><b>Năm xây dựng:</b></div>
            <div class="col-md-10">
                {!!$form_custom_search['yearBuiltFromTo']!!}
            </div>
        </div>
        {!! $form_custom_search['privateListing'] !!}
        {!! $form_custom_search['classify'] !!}
        <div class="row action-btn">
            <div class="col-md-7 col-md-offset-2">
                <button class="btn btn-block btn-info"><i class="fa fa-search"> </i> Tìm kiếm với tiêu chí vừa chọn</button>
            </div>
            <div class="col-md-3">
                <button class="btn btn-block btn-danger btn-reset">Reset</button>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="matched-tabs"></div>
    </div>
    <div class="row">
        <div class="filter-listing-col">
            <select class="filterChangeJM filterValuations form-control"></select>
        </div>
        <div class="filter-listing-col">
            <select class="filterChangeJM filterLegals form-control"></select>
        </div>
        <div class="filter-listing-col">
            <select class="filterChangeJM filterSourceBys form-control"></select>
        </div>
        <div class="filter-listing-col">
            <span id="bpo-span" class="bpo-box"></span>
            <input id="initialBox" name="initialBudget" data-from="" data-to="" data-id-from="fromBPO" data-id-to="toBPO" data-id-bpo-span="bpo-span" type="hidden" class="form-control bpo-box" value="" />
            <input id="fromBPO" name="fromBPO" type="hidden" value="" />
            <input id="toBPO" name="toBPO" type="hidden" value="" />
        </div>
        <div class="filter-listing-col">
            <div class="input-group">
                <input id="searchListingDatable" placeholder="Tìm kiếm với ID hoặc địa chỉ" type="text" class="form-control">
                <span class="input-group-btn">
                    <button id="btn_searchListingDatable" class="btn btn-info btn-flat" type="button"><i class="fa fa-search"> </i></button>
                </span>
            </div>
            <!-- <input type="text" placeholder="Tìm kiếm nhanh" class="form-control" name="" > -->
        </div>
    </div>
    <!--\ FORM LISTING SEARCJ -->
    <table id="crm_jm_tableSearchListing" class="table-striped-custom table table-striped prevent-copy min-width-full">
        <thead>
            <tr>
                <th></th>
                <th style="max-width: 200px">LID</th>
                <!-- <th >Mức yêu thích</th> -->
                <th style="">Phân loại</th>
                <th style="">Trạng thái</th>
                <th style="">Hình nhà</th>
                <th style="">Hình sổ</th>
                <th width="100px">Giá</th>
                <th width="250px">Diện tích (R x D)</th>
                <th width="250px">Địa chỉ</th>
                <th style="">Loại listing</th>
                <th style="">Hướng</th>
                <th width="100px">Trạng thái ảo</th>
                <th>Ngày cập nhật</th>
                <th>Người phụ trách</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
<style type="text/css">
    .draw-listing.active {
        background-color: #00c0ef !important;
        color: #fff !important;
    }

    #likeListing_wrapper .fa-star-o {
        display: none;
    }

    .filter-listing-col {
        position: relative;
        min-height: 1px;
        padding-right: 15px;
        padding-left: 15px;
        float: left;
        width: 20%;
    }
</style>
<script type="text/javascript">
    var dateTimeRenderForTabFilterSearch = function(data, type, object) {
        if (!data)
            return "";
        return $.format.date(new Date(data), "dd/MM/yyyy");
    };
    var renderPhotoJM = function(data, type, object) {
        var returnValue = "NA";
        if (object.photo != 'NA' && object.photo && object.photo.link) {
            returnValue = '<img onerror="imgError(this);" class="pinkBookPhoto" style="width:48px;height: auto;" src="' + object.photo.link + '" />'
            returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.photoUrls || [object.photo.link]) + '</div>';
        }
        return returnValue;
    }
    var renderRedOrPinkBook = function(data, type, object) {
        returnValue = "";
        // if (object.photo && object.photo.length > 0) {
        //     returnValue += '<img class="redBookPhoto" style="width:48px;height: auto;" src="' + object.photo[0] + '" />';
        //     returnValue += '<div class="redBookPhotos hidden">' + JSON.stringify(object.photo) + '</div>';
        // }
        if (object.pinkBookPhotos && object.pinkBookPhotos.length > 0 && object.pinkBookPhotos != 'NA') {
            returnValue += '<img onerror="imgError(this);" class="pinkBookPhoto" style="width:48px;height: auto;" src="' + object.pinkBookPhotos[0] + '" />';
            returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.pinkBookPhotos) + '</div>';
        } else if (object.redBookPhotos && object.redBookPhotos.length > 0 && object.redBookPhotos != 'NA') {
            returnValue += '<img onerror="imgError(this);" class="pinkBookPhoto" style="width:48px;height: auto;" src="' + object.redBookPhotos[0] + '" />';
            returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.redBookPhotos) + '</div>';
        }
        return returnValue;
    };
    var renderEventContent = function(data, type, object) {
        var returnVal = "";
        if (object.scheduleTime) {
            returnVal += moment(object.scheduleTime).format('DD/MM/YYYY HH:mm:ss') + "<br/>";
        }
        if (data === null) {
            data = "";
        }
        returnVal += "<div class='textContainer_Truncate'>" + data + "</div>";
        return returnVal;
    };
    var renderSForTabFilterSearch = function(data, type, object) {
        return object.floorSize + ' (' + object.sizeWidth + " x " + object.sizeLength + ')'; // làm tròn xuống // làm tròn xuống
    }

    function addGaneryCRM(idListing, element) {
        if (deal.disabledFeature) {
            return false;
        }

        // event.preventDefault();
        // find listing item to add to collection
        const selectedListing = dataListing.filter((item, k) => item.rlistingId === idListing)

        let postData = {
            "dealId": parseInt(deal.dealId),
            "leadId": null,
            "description": null,
            "relatedListings": [idListing],
            "searchScore": selectedListing[0].searchScore
        };
        $.ajax({
            url: "/crm-dashboard/create-collection",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function(response) {
            if (response.result == false) {
                showPropzyAlert(response.message);
            } else {
                $('#changeStarJM_' + idListing).removeAttr('onclick');
                $('#changeStarJM_' + idListing).removeAttr('href');
                $('#changeStarJM_' + idListing).html('<i style="color:coral" class="fa fa-star"></i>');
                $(element).parent().parent().remove();
                JMDetail.countTabFollowing();
                deal.basketId = response.data.basketId;
            }
        }).always(function() {
            // hidePropzyLoading();
        });
        return false;
    }
    const getListMatchedTab = () => {
        showPropzyLoading();

        $.ajax({
            url: "/deal/get-list-matched-tabs",
            type: "post",
        }).done(function(response) {
            Object.keys(response.tabs).map((k, v) => {
                let activedTab = ''
                if (k === response.activeMatchingTab) {
                    activedTab = ' active'
                }
                $('.matched-tabs').append(
                    `<div class="tab ${k}${activedTab}" onclick="changeTab('${k}')">
                        ${response.tabs[k].label} <span class="amount">(${response.tabs[k].value})</span>
                    </div>`
                )
            })

            // get list tabs and actived tabs
            listMatchedTabs = response.tabs
            activeMatchingTab = response.activeMatchingTab

            // get listings after get active matched tab
            // generateTableListingAtDetail();
            setSearchCondition();
        }).always(function() {
            hidePropzyLoading();
        });

        return false;
    }

    async function setSearchCondition(keywordSearch = '', typeCondition = '') {
        $("#crm_jm_tableSearchListing").dataTable().fnDestroy();
        const filterUrl = [];
        const filterValuations = $('.listingMatchingCRMJM .filterValuations').val();
        const filterSourceBys = $('.listingMatchingCRMJM .filterSourceBys').val();
        const filterLegals = $('.listingMatchingCRMJM .filterLegals').val();
        const filterBPOs = $('#initialBox').val();

        var locations = {}
        var fromTo = [];
        var wardsList = [];
        var districtsList = [];
        var positionsList = [];
        var directionsList = [];
        var privateListing = [];

        if (filterValuations && filterValuations.length > 0) {
            const filterValuationConvert = 'filterValuations=' + filterValuations.join()
            filterUrl.push(filterValuationConvert);
        }
        if (filterSourceBys && filterSourceBys.length > 0) {
            const filterSourceBysConvert = 'filterSourceBys=' + filterSourceBys.join()
            filterUrl.push(filterSourceBysConvert);
        }
        if (filterLegals && filterLegals.length > 0) {
            const filterLegalsConvert = 'filterLegals=' + filterLegals.join()
            filterUrl.push(filterLegalsConvert)
        }
        if (filterBPOs) {
            const filterBPOsConvert = 'filterBPOs=' + filterBPOs
            filterUrl.push(filterBPOsConvert)
        }

        if (keywordSearch.length > 0) {
            let filterKeywordConvert = 'searchKeywords=' + keywordSearch
            filterUrl.push(filterKeywordConvert)
        }

        // update fitler 
        $('#crm_jm_formCustomSearchListing .districtsList:checked').each(function() {
            districtsList.push($(this).val());
        });
        if (districtsList.length > 0) {
            locations['districtsList'] = districtsList;
            // url += "districtsList="+JSON.stringify(districtsList)+"&"; privateListing
        } else {
            locations['districtsList'] = '';
        }
        $('#crm_jm_formCustomSearchListing .positionsList:checked').each(function() {
            positionsList.push($(this).val());
        });
        if (positionsList.length > 0) {
            locations['positionsList'] = positionsList;
            // url += "wardsList="+JSON.stringify(wardsList)+"&";
        } else {
            locations['positionsList'] = '';
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
            filterUrl.push('locations=' + JSON.stringify(locations));

        }
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
            // fromTo.push({
            //   'type': 'yearbuilt','fromValue': $("input[name='yearBuiltFromTo']").val(),'toValue': 9999999999999
            //   });
            fromTo.push({
                'type': 'yearbuilt',
                'fromValue': $("input[name='yearBuiltFromTo']").val()
            });
        }
        if (fromTo.length > 0) {
            filterUrl.push("fromTo=" + JSON.stringify(fromTo));
        }
        var classify = [];
        $.each($("#crm_jm_formCustomSearchListing input[name='classifyList[]']:checked"), function() {
            classify.push($(this).val());
        });
        if (classify.length > 0) {
            filterUrl.push("classifyList=" + JSON.stringify(classify))
        } //isOwner
        var isOwner = $("#crm_jm_formCustomSearchListing input[name='isOwner']:checked").val() == 1 ? true : false;
        filterUrl.push("isOwner=" + isOwner);

        const toStringFilterUrl = filterUrl.join('&')
        var url = "/deal/get-listing-for-filter-search/" + deal.dealId + "?" + toStringFilterUrl;

        generateTableListingAtDetail(url, 'search');
        await getDaTaPriceTags(dataListId);
    }

    function changeTab(tab) {
        // find matched active tab, then remove active class 
        $('.matched-tabs').find('.active').removeClass('active')
        // add active class to specific tab
        $('.' + tab).addClass('active')
        $('#searchListingDatable').val('')
        if (keywordSearch) {
            $('#searchListingDatable').val(keywordSearch)
        }

        // call api by specific tab
        activeMatchingTab = tab
        setSearchCondition(keywordSearch);
    }

    // ================= PriceTags ===============
    let dataPriceTags = {};
    let dataListId = [];
    let getDaTaPriceTags = async function(listId) {
        if (listId !== undefined && listId !== null && listId.length > 0) {
            // get origin array list id to display price tags after call api
            const originListId = listId.slice()
            
            listId = listId.join(',');
            
            const configGetPriceTag = {
                method: 'get',
                url: `/price-tag/tag-listing/aggregate-by-listing-ids/${listId}`,
            };

            try {
                const res = await axios(configGetPriceTag);

                dataPriceTags = {
                    ...res.data.data
                };

                // check to display price tags
                originListId.map(id => {
                    showPriceTags(id);
                })

            } catch (error) {

                console.log('error', error);
            }
        }
    };

    function priceTagsDealDetail(id) {
        const tagsdata = [];
        let style = '';
        let html = '';
        let tooltip = '';
        if (dataPriceTags[id] !== undefined) {
            if (dataPriceTags[id].hasOwnProperty('tagging') && dataPriceTags[id].tagging !== []) {
                dataPriceTags[id].tagging.map((item) => {
                    let temp = {
                        tagId: 0,
                        tagName: '',
                        vote: 0,
                        color: ''
                    };
                    temp.tagId = item.id;
                    temp.tagName = item.tagName;
                    temp.vote = dataPriceTags[id].taggingCounter[item.id];
                    temp.color = item.attributes !== null ? item.attributes.color : '';
                    tagsdata.push(temp);
                });
            }
        }

        if (tagsdata !== undefined && tagsdata.length > 0) {
            if (tagsdata[0].color !== '') {
                style = `background: ${tagsdata[0].color};`;
            }
            let tooltipInner = '';
            if (tagsdata.length > 0) {
                tagsdata.forEach((tag, index) => {
                    if (index === 0) {
                        tooltipInner += '';
                    } else {
                        tooltipInner += `<li>${tag.tagName} (${tag.vote})</li>`;
                    }
                });
            }

            if (tooltipInner === '') {
                tooltip = ''
            } else {
                tooltip += `<button class='tag-more' data-toggle="tooltip" data-html="true" data-placement="right" title="<ul>
   ${tooltipInner}
   </ul>">
 </button>`
            }

            if (tooltip === '') {
                html += `<div class='tag-display no-more'>
    <div
      class="tag" style="${style}"
    >
      ${tagsdata[0].tagName} (${tagsdata[0].vote})
    </div>
  </div>`
            } else {
                html += `<div class='tag-display'>
    <div
      class="tag" style="${style}"
    >
      ${tagsdata[0].tagName} (${tagsdata[0].vote})
    </div>
    ${tooltip}
  </div>`
            }
        }
        return html;

    };

    function showPriceTags(id) {
        let html = priceTagsDealDetail(id);
        $(`.pricetag-${id}`).empty();
        $(`.pricetag-${id}`).append(html);
    }

    // **************************************************
    let activeMatchingTab = null
    let listMatchedTabs = []
    let keywordSearch = ''
    $(function() {
        $('#crm_jm_formCustomSearchListing').hide();

        getListMatchedTab(activeMatchingTab);
    })
    Array.prototype.remove = function() {
        var what, a = arguments,
            L = a.length,
            ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    }; // xóa item array value
    $(document).ready(function() {
        $('#crm_jm_tableSearchListing #example-select-all').on('click', function() {
            $('#crm_jm_tableSearchListing input[type="checkbox"]').prop('checked', this.checked);
        })
        $('#showFormSearch').on('click', function() {
            $('#crm_jm_formCustomSearchListing').toggle('low');
        })
        // **************************************************
        $('#btn_searchListingDatable').on('click', function() {
            keywordSearch = $('#searchListingDatable').val()
            setSearchCondition(keywordSearch, 'search')
        });
        // ******************************************************
        $('#crm_jm_formCustomSearchListing .btn-reset').on('click', function() {
            $('#crm_jm_formCustomSearchListing > div:not(.action-btn)').map((key, child) => {
                // reset text input
                $(child).find('input[type="text"]').val('')

                // reset list checkbox, radio input
                if ($(child).find('input[type="checkbox"], input[type="radio"]')) {
                    $(child).find('input[type="checkbox"], input[type="radio"]').map((k, v) => {
                        $(v).prop("checked", false)
                    })
                }

            })

            return false
        })
        $('#crm_jm_formCustomSearchListing .btn-info').on('click', async function() {
            var url = "/deal/get-listing-for-filter-search/" + deal.dealId + "?";
            var locations = {}
            var fromTo = [];
            var wardsList = [];
            var districtsList = [];
            var positionsList = [];
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
            $('#crm_jm_formCustomSearchListing .positionsList:checked').each(function() {
                positionsList.push($(this).val());
            });
            if (positionsList.length > 0) {
                locations['positionsList'] = positionsList;
                // url += "wardsList="+JSON.stringify(wardsList)+"&";
            } else {
                locations['positionsList'] = '';
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
                url += 'locations=' + JSON.stringify(locations) + '&';
            }
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
                // fromTo.push({
                //   'type': 'yearbuilt','fromValue': $("input[name='yearBuiltFromTo']").val(),'toValue': 9999999999999
                //   });
                fromTo.push({
                    'type': 'yearbuilt',
                    'fromValue': $("input[name='yearBuiltFromTo']").val()
                });
            }
            if (fromTo.length > 0) {
                url += "fromTo=" + JSON.stringify(fromTo) + "&";
            }
            var classify = [];
            $.each($("#crm_jm_formCustomSearchListing input[name='classifyList[]']:checked"), function() {
                classify.push($(this).val());
            });
            if (classify.length > 0) {
                url += "classifyList=" + JSON.stringify(classify) + "&";
            } //isOwner
            var isOwner = $("#crm_jm_formCustomSearchListing input[name='isOwner']:checked").val() == 1 ? true : false;
            url += "isOwner=" + isOwner + "&";
            // return false;
            $("#crm_jm_tableSearchListing").dataTable().fnDestroy();
            var data_location = $.trim($("#location_map").val()).length ? JSON.parse($("#location_map").val()) : null;
            generateTableListingAtDetail(url, "", data_location);
            await getDaTaPriceTags(dataListId);
        })
    });
    var list_latLng_draw = [];
    var list_latLng_draw_DEBUG = [];
    var drawing_poply = false;
    var enable_draw = false;
    var flightPath = null; /* Đối tượng polygonLine */
    var bermudaTriangle = null; /* Đối tượng polygon */
    var infowindow;
    var bounds;
    var map;
    var data_listing = null;
    var data_localtion_first = $("#location_map").val() ? JSON.parse($("#location_map").val()) : null;
    var polyOptions = {
        strokeWeight: 0,
        fillOpacity: 0.45,
        editable: true,
        fillColor: '#FF1493'
    };
    var selectedShape = null;
    var drawingManager = null;
    var is_mobile = false;
    var ua = navigator.userAgent,
        browser = {
            iPad: /iPad/.test(ua),
            iPhone: /iPhone/.test(ua),
            Android: /Android/.test(ua)
        };
    $.each(browser, function(key, item) {
        if (item) {
            is_mobile = true;
        }
    });
    var text_control = !is_mobile ? {
        text_draw: 'Vẽ để lọc',
        text_quit: 'bỏ vẽ'
    } : {
        text_draw: 'Nhấp để vẽ',
        text_quit: 'bỏ vẽ'
    };
    $(document).ready(function() {
        $('#load-map-draw').on('click', function() {
            loadPinMap(data_localtion_first);
        });
        $(".reset-map").click(function() {
            resetFilter();
        });
    });

    function loadPinMap(dataSend) {
        var districtsList = [];
        var data_send = {};
        data_send.areaZoning = dataSend;
        $('#crm_jm_formCustomSearchListing .districtsList').each(function() {
            districtsList.push({
                "id": $(this).val()
            });
        });
        data_send.districtsList = districtsList;
        //return false;
        $.ajax({
            type: "POST",
            url: "/deal/get-pin/" + deal.dealId,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data_send),
            async: true,
            cache: false,
            beforeSend: function() {
                $("#loadding-map").html('<b style="color: red;">Đang tải bản đồ...</b>');
                $("#loadding-map").show();
            },
            success: function(data) {
                if (data) {
                    marker_draw({
                        'data': data.list,
                        'isNeedChangeZoom': data.isNeedChangeZoom
                    });
                } else {
                    $("#map-filter-container").text("Không có listing để hiển thị");
                }
                $("#loadding-map").hide();
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $("#loadding-map").html('<b style="color: red;">Đã có lỗi xảy ra');
            }
        });
    }

    function resetFilter(type = 'map') {
        $.ajax({
            type: "GET",
            url: "/deal/reset-filter/" + deal.dealId + "?type=" + type,
            async: true,
            cache: false,
            beforeSend: function() {
                $("#loadding-map").html('<b style="color: red;">Đang làm mới...</b>');
                $("#loadding-map").show();
            },
            success: function(data) {
                if (data.result) {
                    data_localtion_first = null;
                    $("#location_map").val("");
                    $('#load-map-draw').trigger('click');
                    $('#crm_jm_formCustomSearchListing .btn-info').trigger("click");
                } else {
                    alert("Đã có lỗi sảy ra...");
                }
                $("#loadding-map").hide();
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $("#loadding-map").html('<b style="color: red;">Đã có lỗi xảy ra');
            }
        });
    }

    function marker_draw(dataListing) {
        drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: false,
            markerOptions: {
                draggable: true
            },
            polygonOptions: polyOptions
        });
        /* Xử lý MAP, vẽ khi search */
        var styledMapType = new google.maps.StyledMapType(
            [{
                featureType: 'poi.business',
                elementType: 'labels',
                stylers: [{
                    "visibility": "off"
                }]
            }], {
                name: 'styled_map'
            });
        map = new google.maps.Map(document.getElementById('map-filter-container'), {
            scaleControl: true,
            zoom: 14,
            streetViewControl: false,
            overviewMapControl: true,
            scrollwheel: true,
            disableDoubleClickZoom: true,
            center: {
                lat: 10.7553411,
                lng: 106.41504
            },
            maxZoom: dataListing.isNeedChangeZoom ? 17 : undefined
        });
        bounds = new google.maps.LatLngBounds();
        //Associate the styled map with the MapTypeId and set it to display.
        infowindow = new google.maps.InfoWindow(); /* SINGLE */
        controlCustomMap();
        $.each(dataListing.data, function(k, v) {
            var marker = new google.maps.Marker({
                position: {
                    lat: Number(v.latitude),
                    lng: Number(v.longitude)
                },
                map: map
            });
            google.maps.event.addListener(marker, 'mouseover', function() {
                infowindow.close(); // Close previously opened infowindow
                infowindow.setContent("<div id='infowindow'><a href='#' onclick='JMDetail.openModalListingDetailForAllPage(" + v.rlistingId + ");return false;'>#" + v.rlistingId + "</a> (" + v.address + ")</div>");
                if (!drawing_poply)
                    infowindow.open(map, marker);
            });
            bounds.extend(new google.maps.LatLng(v.latitude, v.longitude));
        });
        if (!is_mobile) {
            map.addListener('mousedown', function() {
                if (enable_draw) {
                    drawing_poply = true;
                    flightPath = new google.maps.Polyline({
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                        draggable: false,
                        clickable: false
                    });
                    flightPath.setMap(map);
                }
            });
            map.addListener('mousemove', function(event) {
                var myLatLng = event.latLng;
                var lat = myLatLng.lat();
                var lng = myLatLng.lng();
                if (enable_draw && drawing_poply) {
                    list_latLng_draw.push(new google.maps.LatLng(lat, lng));
                    list_latLng_draw_DEBUG.push([lat, lng]);
                    var path = flightPath.getPath();
                    path.push(event.latLng);
                }
            });
            map.addListener('mouseup', function() {
                if (enable_draw) {
                    if (list_latLng_draw.length != 0) {
                        $('#draw-listing').trigger('click');
                        flightPath.setMap(null);
                        data_localtion_first = list_latLng_draw_DEBUG;
                        drawPolygon(list_latLng_draw, true);
                        $("#location_map").val(JSON.stringify(list_latLng_draw_DEBUG));
                        loadPinMap(data_localtion_first);
                        list_latLng_draw = [];
                        list_latLng_draw_DEBUG = [];
                    } else {
                        alert("Nhấn chuột và kéo để vẽ. Thả chuột khi vẽ xong bản đồ");
                    }
                }
                drawing_poply = false;
            });
        } else {
            google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
                if (e.type != google.maps.drawing.OverlayType.MARKER) {
                    // Switch back to non-drawing mode after drawing a shape.
                    drawingManager.setDrawingMode(null);
                    selectedShape = e.overlay;
                    selectedShape.setEditable(true);
                    $("#draw-listing").trigger('click');
                }
            });
            google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
                var coordinates = (polygon.getPath().getArray());
                var data_send = [];
                if (coordinates) {
                    $.each(coordinates, function(key, item) {
                        data_send.push([item.lat(), item.lng()]);
                    });
                    $("#location_map").val(JSON.stringify(data_send));
                    data_localtion_first = data_send;
                    loadPinMap(data_send);
                }
                drawingManager.setMap(null);
            });
        }
        if (data_localtion_first) {
            drawPolygon(data_localtion_first, false);
        } else {
            if (!bounds.isEmpty())
                map.fitBounds(bounds);
        }
    }

    function drawPolygon(data_input, type = true) {
        bounds = new google.maps.LatLngBounds();
        var data_draw = [];
        if (type) {
            data_draw = data_input;
            $.each(data_input, function(k, v) {
                bounds.extend(v);
            });
        } else {
            data_input.push(data_input[0]);
            $.each(data_input, function(k, v) {
                data_draw.push(new google.maps.LatLng(v[0], v[1]));
                bounds.extend(new google.maps.LatLng(v[0], v[1]));
            });
        }
        bermudaTriangle = new google.maps.Polygon({
            paths: data_draw,
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 3,
            fillColor: '#FF0000',
            fillOpacity: 0,
            draggable: false,
            clickable: false
        });
        bermudaTriangle.setMap(map);
        map.fitBounds(bounds);
    }

    function setOptionForMap() {
        var showInforMap = 'off';
        var draggable = false;
        if (!enable_draw) {
            draggable = true;
            showInforMap = 'on';
        }
        map.setOptions({
            styles: [{
                    featureType: 'poi',
                    elementType: 'all',
                    stylers: [{
                        "visibility": showInforMap
                    }]
                },
                {
                    featureType: 'administrative',
                    elementType: 'all',
                    stylers: [{
                        "visibility": showInforMap
                    }]
                },
                {
                    featureType: 'transit',
                    elementType: 'all',
                    stylers: [{
                        "visibility": showInforMap
                    }]
                },
            ],
            draggable: draggable
        });
    }

    function controlCustomMap() {
        var back_container = document.createElement('div');
        var back_listing = $("<div id='draw-listing' class='draw-listing' style='margin-top: 10px;user-select: none; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; border-radius: 2px; cursor: pointer; background-color: rgb(255, 255, 255); padding: 7px 10px; font-size: 14px; font-weight: bold'>");
        back_listing.text(text_control.text_draw);
        back_container.appendChild(back_listing.get(0));
        back_listing.click(function() {
            if (!is_mobile) {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active');
                    $(this).text(text_control.text_quit);
                    enable_draw = true;
                    setOptionForMap();
                    /* Xóa hết line khi khởi tạo */
                    if (bermudaTriangle != null)
                        bermudaTriangle.setMap(null);
                    if (flightPath != null)
                        flightPath.setMap(null);
                } else {
                    $(this).removeClass('active');
                    $(this).text(text_control.text_draw);
                    if (!drawing_poply && !$.isEmptyObject(data_localtion_first))
                        drawPolygon(data_localtion_first, false);
                    enable_draw = false;
                    setOptionForMap();
                }
            } else {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active');
                    $(this).text(text_control.text_quit);
                    if (bermudaTriangle != null)
                        bermudaTriangle.setMap(null);
                    if (flightPath != null)
                        flightPath.setMap(null);
                    setOptionForMap();
                    if (selectedShape)
                        selectedShape.setMap(null);
                    drawingManager.setMap(map);
                    drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
                } else {
                    $(this).removeClass('active');
                    $(this).text(text_control.text_draw);
                    if (!$.isEmptyObject(data_localtion_first))
                        drawPolygon(data_localtion_first, false);
                    setOptionForMap();
                }
            }
        });
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(back_container);
    }
    let dataSetting = null
    let dataListing = null
    let totalListings = 0

    function generateTableListingAtDetail(url = "/deal/get-listing-for-filter-search/" + deal.dealId, type = "", data_post) {
        // destroy dataTable
        $("#crm_jm_tableSearchListing").dataTable().fnDestroy();
        // show loading
        showPropzyLoading()

        let ajax = {};
        //var setting = {};
        ajax.url = url;
        ajax.type = 'POST';
        ajax.cache = true;
        ajax.async = false;
        ajax.data = {};
        ajax.data.initSearch = 0;
        if (data_post) {
            ajax.data.data_localtion = data_post;
        }
        if (url == "/deal/get-listing-for-filter-search/" + deal.dealId) {
            ajax.data.initSearch = 1;
        }
        if (activeMatchingTab) {
            ajax.data.activeMatchingTab = activeMatchingTab
        }
        // set reponse data

        ajax.dataSrc =
            function(json) {
                dataSetting = json ? json.setting : null;
                dataListing = json ? json.data : [];
                var json = json ? json : null;
                dataListId = dataListing.map(data => {
                    return data.rlistingId;
                })


                $(document).ready(function() {
                    $('#countListing').html(totalListings)

                    // var JMlistingMatchingRender =  "Listing phù hợp <span class='bage'>"+json.recordsTotal+"</span>";
                    // $('#JMlistingMatching a').html(JMlistingMatchingRender)
                    var legals = json.filterSorts ? json.filterSorts.legals || [] : [];
                    var sourceBys = json.filterSorts ? json.filterSorts.sourceBys || [] : [];
                    var valuations = json.filterSorts ? json.filterSorts.valuations || [] : [];
                    // render for valuations
                    var valuationsSelect2 = [];
                    $.each(valuations, function(key, value) {
                        valuationsSelect2.push({
                            id: value.value,
                            text: value.value
                        })
                    })
                    $('.listingMatchingCRMJM .filterValuations').select2({
                        data: valuationsSelect2,
                        multiple: true,
                        placeholder: "Lọc theo phân loại",
                    })
                    // render for sourceBys
                    var sourceBysSelect2 = [];
                    $.each(sourceBys, function(key, value) {
                        sourceBysSelect2.push({
                            id: value.value,
                            text: value.value
                        })
                    })
                    $('.listingMatchingCRMJM .filterSourceBys').select2({
                        data: sourceBysSelect2,
                        multiple: true,
                        placeholder: "Lọc theo loại listing",
                    })
                    // render for legals
                    var dataSelect2 = [];
                    $.each(legals, function(key, value) {
                        dataSelect2.push({
                            id: value.value,
                            text: value.value
                        })
                    })
                    $('.listingMatchingCRMJM .filterLegals').select2({
                        data: dataSelect2,
                        multiple: true,
                        placeholder: "Lọc theo trạng thái",
                    })

                    if (json && json.tabValue) {
                        // set amount listings per tab
                        Object.keys(listMatchedTabs).map((k, tab) => {
                            $(`.${k} .amount`).html(`(${json.tabValue[k]})`);
                            totalListings += json.tabValue[k];
                            if (k === dataSetting.basic.tabConfiguration.activeMatchingTab) {
                                $(`.${k}`).addClass("active");
                                activeMatchingTab = dataSetting.basic.tabConfiguration.activeMatchingTab;
                            }
                        })

                        $('#countListing').html(totalListings)
                    }
                });
                if (json && json.data) {
                    return json.data;
                }
                return [];
            }

        ajax.complete = function(json, type) {
            window['isNeedChangeZoom'] = json.responseJSON.isNeedChangeZoom;
            if (data_post) {
                data_localtion_first = data_post;
            }
            // reset total listings
            totalListings = 0
        };
        // $.ajax(ajax);
        var oTable = $('#crm_jm_tableSearchListing')
            .DataTable({
                "processing": true,
                "searching": true,
                // 'dom': 't' ,
                "serverSide": true,
                "ajax": ajax,
                "paging": true,
                "scrollX": true,
                "lengthChange": false,
                "columnDefs": [{
                    "width": "2%",
                    "targets": 0
                }],
                "drawCallback": function() {
                    JMDetail ? JMDetail.openPhoto() : ''; // load function open Photos
                    // *****************************
                    $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                    var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                    pagination.toggle(this.api().page.info().pages > 1);
                },
                // "iDisplayLength": 1,
                "columns": [{
                        data: 'rlistingId',
                        orderable: false,
                        render: renderCheckbox
                    },
                    {
                        data: 'rlistingId',
                        orderable: true,
                        //orderable: false,
                        render: suitableListing
                    },
                    {
                        data: 'valuationType',
                        orderable: false,
                        visible: false
                    },
                    {
                        data: 'legal',
                        orderable: false,
                        render: renderLegal
                    }, // format html
                    {
                        data: 'rlistingId',
                        orderable: false,
                        render: renderPhotoJM
                    },
                    {
                        data: 'pinkBookPhotos',
                        orderable: false,
                        render: renderRedOrPinkBook
                    },
                    {
                        data: 'formatPrice',
                        orderable: true,
                        //orderable: false,
                        render: renderPriceBankingComission

                    },
                    {
                        data: 'lotSize',
                        orderable: false,
                        render: renderSforDealTableListing
                    },
                    {
                        data: 'address',
                        orderable: false,
                        render: renderAddressForListingLeadDeal
                    },
                    {
                        data: 'sourceBy',
                        orderable: false
                    },
                    {
                        data: 'directionName',
                        orderable: false
                    },
                    {
                        data: 'virtualStatus',
                        orderable: false,
                        render: renderVirtualStatus,
                        className: 'virtualStatus' // add class to find this column for updating content after execute check empty
                    }, {
                        data: 'updatedDate',
                        orderable: true,
                        render: renderUpdatedDate
                    }, {
                        data: "assignedToName",
                        orderable: false,
                        render: renderAssignedPhone
                    }

                ],
                "createdRow": function(row, data, index) {
                    var listCheckOld = $('#arrayStoreListingForAction').val() ? JSON.parse($('#arrayStoreListingForAction').val()) : [];
                    if ($.inArray(data.rlistingId.toString(), listCheckOld) > -1) {
                        $(row).find(".selected-email-listing").prop("checked", true)
                    }
                    dataSetting.index = parseInt(this.api().page.info().page + '' + index);
                    return renderRowColorListing(row, data, dataSetting);
                },
                "language": {
                    "paginate": {
                        previous: "<",
                        next: ">",
                        first: "|<",
                        last: ">|"
                    },
                    "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
                    "emptyTable": "Chưa có dữ liệu",
                    "infoEmpty": "",
                },
                "initComplete": function(settings, json) {}
            })
            .off("processing.dt")
            .on("processing.dt", function(e, settings, processing) {
                if (processing) {
                    showPropzyLoading()
                }

                // assign to dataPost
                let dataPost = {
                    ...data_post
                }
                if (settings.ajax) {
                    settings.ajax.data = function(d) {
                        if (activeMatchingTab) {
                            dataPost.activeMatchingTab = activeMatchingTab
                        }

                        Object.assign(d, {
                            ...dataPost,
                        })
                        return d
                    }
                }

                if (!processing) {
                    hidePropzyLoading()
                }
            });
        /* if (type == 'search') {
            oTable.search($('#searchListingDatable').val()).draw();
        } */
    }
</script>