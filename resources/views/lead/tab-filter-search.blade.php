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
        <div class="matched-tabs">

        </div>
    </div>
    <div class="row">
        <div class="col-md-3">
            <select class="filterChangeJM filterValuations form-control"></select>
        </div>
        <div class="col-md-3">
            <select class="filterChangeJM filterLegals form-control"></select>
        </div>
        <div class="col-md-3">
            <select class="filterChangeJM filterSourceBys form-control"></select>
        </div>
        <div class="col-md-3 ">
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
    <table id="crm_jm_tableSearchListing" class="table-striped-custom table table-striped prevent-copy">
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
                <th>Diện tích (R x D)</th>
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
    #likeListing_wrapper .fa-star-o {
        display: none;
    }
</style>
<script type="text/javascript">
    var dateTimeRenderForTabFilterSearch = function(data, type, object) {
        if (!data)
            return "";
        return $.format.date(new Date(data), "dd/MM/yyyy");
    };
    var renderPhotoJM = function(data, type, object) {
        var returnValue = "";
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
    var renderAddress = function(data, type, object) {
        //! moment.js locale configuration
        //! locale : Vietnamese [vi]
        //! author : Bang Nguyen : https://github.com/bangnk
        // import moment from '../moment';
        // export default
        moment.locale('vi', {
            months: 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
            monthsShort: 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
            monthsParseExact: true,
            weekdays: 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
            weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
            weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
            weekdaysParseExact: true,
            meridiemParse: /sa|ch/i,
            isPM: function(input) {
                return /^ch$/i.test(input);
            },
            meridiem: function(hours, minutes, isLower) {
                if (hours < 12) {
                    return isLower ? 'sa' : 'SA';
                } else {
                    return isLower ? 'ch' : 'CH';
                }
            },
            longDateFormat: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM [năm] YYYY',
                LLL: 'D MMMM [năm] YYYY HH:mm',
                LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
                l: 'DD/M/YYYY',
                ll: 'D MMM YYYY',
                lll: 'D MMM YYYY HH:mm',
                llll: 'ddd, D MMM YYYY HH:mm'
            },
            calendar: {
                sameDay: '[Hôm nay lúc] LT',
                nextDay: '[Ngày mai lúc] LT',
                nextWeek: 'dddd [tuần tới lúc] LT',
                lastDay: '[Hôm qua lúc] LT',
                lastWeek: 'dddd [tuần rồi lúc] LT',
                sameElse: 'L'
            },
            relativeTime: {
                future: '%s tới',
                past: '%s trước',
                s: 'vài giây',
                ss: '%d giây',
                m: 'một phút',
                mm: '%d phút',
                h: 'một giờ',
                hh: '%d giờ',
                d: 'một ngày',
                dd: '%d ngày',
                M: 'một tháng',
                MM: '%d tháng',
                y: 'một năm',
                yy: '%d năm'
            },
            dayOfMonthOrdinalParse: /\d{1,2}/,
            ordinal: function(number) {
                return number;
            },
            week: {
                dow: 1, // Monday is the first day of the week.
                doy: 4 // The week that contains Jan 4th is the first week of the year.
            }
        });
        var newLabel = 'live: ';
        if (moment.unix(object.liveDate / 1000).minutesFromNow() <= 60) {
            newLabel = '<span style="color:red">new</span> ';
        }
        return data + '<br/> <small style="color:gray">' + newLabel + moment.unix(object.liveDate / 1000).fromNow() + '</small>';
    }
    var renderSForTabFilterSearch = function(data, type, object) {
        return object.formatSize + ' (' + object.sizeWidth + " x " + object.sizeLength + ')'; // làm tròn xuống
    }

    function addGaneryCRM(idListing, element) {
        // event.preventDefault();
        // find listing item to add to collection
        const selectedListing = dataListing.filter((item, k) => item.rlistingId === idListing)

        var postData = {
            "leadId": parseInt(lead.leadId),
            "dealId": null,
            "description": null,
            "relatedListings": [idListing],
            "searchScore": selectedListing[0].searchScore
        };
        // console.log(JSON.stringify(postData));return false;
        $.ajax({
            url: "/crm-dashboard/create-collection",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function(response) {
            console.log(response);
            if (response.result == false) {
                showPropzyAlert(response.message);
            } else {
                $('#changeStarJM_' + idListing).removeAttr('onclick');
                $('#changeStarJM_' + idListing).removeAttr('href');
                $('#changeStarJM_' + idListing).html('<i style="color:coral" class="fa fa-star"></i>');
                $(element).parent().parent().remove();
                // generateTableListingAtDetail();
                JMDetail.countTabFollowing();
                lead.basketId = response.data.basketId;
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

    function setSearchCondition(keywordSearch = '', typeCondition = '') {
        $("#crm_jm_tableSearchListing").dataTable().fnDestroy();
        const filterUrl = [];
        const filterValuations = $('.listingMatchingCRMJM .filterValuations').val();
        const filterSourceBys = $('.listingMatchingCRMJM .filterSourceBys').val();
        const filterLegals = $('.listingMatchingCRMJM .filterLegals').val();

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
        var url = "/lead/get-listing-for-filter-search/" + lead.leadId + "?" + toStringFilterUrl;

        generateTableListingAtDetail(url, 'search');
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

    function openModalListingDetai(idListing) {
        showPropzyLoading();
        var postData = {
            "listingId": parseInt(idListing)
        };
        $.ajax({
            'url': '/common/open-modal-listing-detail',
            'type': 'post',
            'data': JSON.stringify(postData)
        }).done(function(response) {
            if (response) {
                $('#listingDetailModal').html(response);
                $('#listingDetailModal').modal();
                renderStar();
            }
        }).always(function() {
            hidePropzyLoading();
        });
        return false;
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
        $('#crm_jm_formCustomSearchListing .btn-info').on('click', function() {
            var url = "/lead/get-listing-for-filter-search/" + lead.leadId + "?";
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
        })
        // alley length width yearbuilt yearBuiltFromTo
        // $("input[name='alleyFromTo']").val();
        // $("input[name='alleyToValue']").val();
        // $("input[name='lengthFromTo']").val();
        // $("input[name='lengthToValue']").val();
        // $("input[name='widthFromTo']").val();
        // $("input[name='widthToValue']").val();
        // console.log(JSON.parse($('#crm_jm_dataCustomsearch').html()));return false;
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
            url: "/lead/get-pin/" + lead.leadId,
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
                console.log(xhr.responseText);
            }
        });
    }

    function resetFilter(type = 'map') {
        $.ajax({
            type: "GET",
            url: "/lead/reset-filter/" + lead.leadId + "?type=" + type,
            async: true,
            cache: false,
            beforeSend: function() {
                $("#loadding-map").html('<b style="color: red;">Đang làm mới...</b>');
                $("#loadding-map").show();
            },
            success: function(data) {
                console.log(data);
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
                console.log(xhr.responseText);
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
                    $(this).text(text_control.text_quit);
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

    function generateTableListingAtDetail(url = "/lead/get-listing-for-filter-search/" + lead.leadId, type = "", data_post) {
        // destroy dataTable
        $("#crm_jm_tableSearchListing").dataTable().fnDestroy();

        // show loading
        showPropzyLoading()

        var ajax = {};
        ajax.url = url;
        ajax.type = 'POST';
        ajax.cache = true;
        ajax.async = true;
        ajax.data = {};
        ajax.data.initSearch = 0;
        if (data_post) {
            ajax.data.data_localtion = data_post;
        }
        if (url == "/lead/get-listing-for-filter-search/" + lead.leadId) {
            ajax.data.initSearch = 1;
        }
        if (activeMatchingTab) {
            ajax.data.activeMatchingTab = activeMatchingTab
        }
        ajax.dataSrc = function(json) {
            dataSetting = json ? json.setting : null;
            dataListing = json ? json.data : [];
            var json = json ? json : null;
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

                if (json) {
                    // set amount listings per tab
                    Object.keys(listMatchedTabs).map((k, tab) => {
                        $(`.${k} .amount`).html(`(${json.tabValue[k]})`)
                        totalListings += json.tabValue[k]

                        if (k === dataSetting.basic.tabConfiguration.activeMatchingTab) {
                            $(`.${k}`).addClass("active");
                            activeMatchingTab = dataSetting.basic.tabConfiguration.activeMatchingTab;
                        }
                    })

                    $('#countListing').html(totalListings)
                }
            });
            return json.data;
        }
        ajax.complete = function(json, type) {
            window['isNeedChangeZoom'] = json.responseJSON.isNeedChangeZoom;
            if (data_post) {
                data_localtion_first = data_post;
            }

            // reset total listings
            totalListings = 0
        };
        //$.ajax(ajax);
        var oTable = $('#crm_jm_tableSearchListing')
            .DataTable({
                "processing": true,
                "searching": true,
                "data": dataListing,
                // 'dom': 't' ,
                "serverSide": true,
                // "ajax": url,
                "ajax": ajax,
                //"paging": true,
                //"pageLength": 5,
                "scrollX": true,
                "lengthChange": false,
                "columnDefs": [{
                    "width": "2%",
                    "targets": 0
                }],
                "drawCallback": function() {
                    JMDetail ? JMDetail.openPhoto() : ''; // load function open Photos
                    // *****************************
                    // **********************
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
                        render: modalListingDetailForTabFilterSearch
                    },
                    {
                        data: 'valuationType',
                        orderable: false,
                        visible: false
                    },
                    {
                        data: 'legal',
                        orderable: false
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
                        render: renderPriceBankingComission
                    },
                    {
                        data: 'lotSize',
                        orderable: false,
                        render: renderSForTabFilterSearch
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
                    },
                    {
                        data: 'updatedDate',
                        orderable: true,
                        render: renderUpdatedDate
                    }, {
                        data: "assignedToName",
                        orderable: false,
                        render: renderAssignedPhone
                    }
                ],
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
                "createdRow": function(row, data, index) {
                    var listCheckOld = $('#arrayStoreListingForAction').val() ? JSON.parse($('#arrayStoreListingForAction').val()) : [];
                    if ($.inArray(data.rlistingId.toString(), listCheckOld) > -1) {
                        $(row).find(".selected-email-listing").prop("checked", true)
                    }
                    //oTable.page.info();
                    dataSetting.index = parseInt(this.api().page.info().page + '' + index);
                    return renderRowColorListing(row, data, dataSetting);
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
            // $("#crm_jm_tableSearchListing").dataTable().fnDestroy();
            oTable.search($('#searchListingDatable').val()).draw();
        } */
    }
</script>