@extends('layout.default') @section('content')
<!-- Modal -->
<div id="modalEndTour" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg" style="width: 90%;">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Kết quả đi Tour</h4>
            </div>
            <div class="modal-body">
                <p>Some text in the modal.</p>
            </div>
        </div>

    </div>
</div>

<div style="" class="row">
    <ol class="breadcrumb">
        <li><a href="/{{ strtolower($type) }}"><i class="fa fa-list"></i> Quản
                lý {{$type}}</a></li>
        <li><a href="/{{ strtolower($type) }}/detail/{{$id}}"><i class="fa fa-info"></i> Chi tiết {{$type}} </a></li>
        <li class="active">Lịch sử</li>
    </ol>
    <h2 class="title-with-line">
        <span>THÔNG TIN LỊCH SỬ {{ $type }} #{{ $id }}</span>
    </h2>
    <div class="box box-primary">
        <div class="box-body">
            <div class="col-md-12 customDatatable">

                <div class="historyFilterWrap" style="display: none; padding: 5px; background-color: #3498db;">
                    <select class="historyFilter form-control" placeHolder="Lọc theo hành động"></select>
                </div>
                <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
                <table style="background-color: gainsboro" id="historiesTable" class="table-bordered-custom table table-bordered">
                    <thead>
                        <tr>
                            <th>Thời gian</th>
                            <th style="position: relative;" width="100px">Hành động <a href="javscript:;" data-placement="bottom" data-toggle="popover" data-popover-content="#action-popover" style="position: absolute; top: 8px; right: 8px; color: rgb(244, 244, 244); opacity: 0.5;" href="#"><i class="fa fa-filter"></i></a>
                                <div id="action-popover" class="hidden">
                                    <div class="nav nav-pills nav-stacked">
                                        <strong>Chọn 1 hoặc nhiều hành động</strong>
                                        <hr>
                                        <div class="filterActionTooltip"></div>
                                        <hr>
                                        <button onclick="renderFilter()" class="btn btn-block btn-default">Lọc</button>
                                    </div>
                                </div> <input type="text" class="hidden" id="selectTypeName" value="[]" style="color: #000"> <input type="text" class="hidden" id="selectAction" value="[]" style="color: #000">
                            </th>
                            <th width="100px" style="position: relative;">Thông tin <a href="javscript:;" data-placement="bottom" data-toggle="popover" data-popover-content="#typeName-popover" style="position: absolute; top: 8px; right: 8px; color: rgb(244, 244, 244); opacity: 0.5;" href="#"><i class="fa fa-filter"></i></a>
                                <div id="typeName-popover" class="hidden">
                                    <div class="nav nav-pills nav-stacked">
                                        <strong>Chọn 1 hoặc nhiều hành động</strong>
                                        <hr>
                                        <div class="filterInfoActionTooltip"></div>
                                        <hr>
                                        <button onclick="renderFilter()" class="btn btn-block btn-default">Lọc</button>
                                    </div>
                                </div>
                            </th>
                            <th width="550px">Chi tiết</th>
                            <th>Bởi</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@stop 
@section('page-css')
<link rel="stylesheet" type="text/css" href="/css/tooltipster.bundle.min.css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.css" integrity="sha512-Velp0ebMKjcd9RiCoaHhLXkR1sFoCCWXNp6w4zj1hfMifYB5441C+sKeBl/T/Ka6NjBiRfBBQRaQq65ekYz3UQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" type="text/css" href="{{loadAsset('/css/histories/index.css')}}"/>
@stop 
@section('page-js')
<script type="text/javascript" src="/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script type="text/javascript" src="/js/Collapse-Long-Content-View-More-jQuery/jquery.show-more.js"></script>

<script src="/js/dashboard.js"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script type="text/javascript" src="/js/jm_commons/leadDealDetail/scripts.js"></script>
<script type="text/javascript" src="/js/tooltipster.bundle.js"></script>
<script type="text/javascript" src="/js/histories/index.js"></script>
<script type="text/javascript">
    var dataFilter = {
        actionFilter: [],
        typeNameFiler: []
    };
    $(document).ready(function() {
        $('.tooltip').tooltipster({
            side: 'bottom',
            trigger: 'custom',
            interactive: true,
            triggerOpen: {
                click: true
            },
            triggerClose: {
                click: true
            }
        });

        historyDatatable();

        $('.historyFilter').on('change', function() {

            var actionFilter = $(this).val();
            $("#historiesTable").dataTable().fnDestroy();
            if (actionFilter != null && actionFilter.length > 0) {
                var url = "/deal-history/store-histories/{{ $id }}/{{ $type }}?actionFilter=" + JSON.stringify(actionFilter);
                historyDatatable(url);
            } else {
                historyDatatable();
            }
        })

    })

    function renderFilter() {
        dataFilter = {
            actionFilter: [],
            typeNameFiler: []
        };
        var filter = '';
        dataFilter.typeNameFiler = JSON.parse($("#selectTypeName").val());
        dataFilter.actionFilter = JSON.parse($("#selectAction").val());
        $.each(dataFilter, function(key, item) {
            if (item.length > 0) {
                filter += key + "=" + JSON.stringify(item) + "&";
            }
        });
        $('[data-toggle=popover]').popover('hide');
        $("#historiesTable").dataTable().fnDestroy();
        if (filter != '') {
            var url = "/deal-history/store-histories/{{ $id }}/{{ $type }}?" + filter;
            historyDatatable(url);
        } else {
            historyDatatable();
        }
    }


    var openModalEndTour = function(json) {
        showPropzyLoading();
        var postData = {
            "json": JSON.stringify(json)
        };
        $.ajax({
            'url': '/common/open-modal-end-tour',
            'type': 'post',
            'data': JSON.stringify(postData)
        }).done(function(response) {
            if (response) {
                $('#modalEndTour .modal-body').html(response);
                $('#modalEndTour').modal();
                renderStar();
            }
        }).always(function() {
            hidePropzyLoading();
        });
    }

    var dateTimeRenderHistories = function(data, type, object) {
        if (!data)
            return "";
        return $.format.date(new Date(data), "HH:mm:ss dd/MM/yyyy");
    };

    function showMoreHistoriesDetail(element) {
        $(element).hide();
        $(element).siblings().show('slow');
    }

    function hideMoreHistoriesDetail(element) {
        $(element).parent().hide();
        $(element).parent().siblings().hide();
        $(element).parent().siblings('.showMoreHistories').show();
        $(element).parents('td').addClass('historyActive');
        setTimeout(function() {
            $('.historyActive').removeClass();
        }, 1500);
    }

    function groupByEntity(object) {
        var errMess = [];
        var res = [];
        var emptyVal = 'N/A';
        if (typeof object.entity !== 'undefined') {
            if (object.entity == 'tour') {

                if (typeof object.contentType !== 'undefined') {

                    switch (object.contentType) {
                        case 1:
                            if (object.scheduleTime != null) {
                                res.push("<p class='historiesDefault'><b>Thời Gian Đi Tour</b>: " + $.format.date(new Date(object.scheduleTime), "HH:mm:ss dd/MM/yyyy") + "</p>");
                            }
                            if (object.customerName != null) {
                                res.push("<p class='historiesDefault'><b>Khách Hàng</b>: " + object.customerName + "</a></p>");
                            }
                            if (object.typeId == 17) {
                                res.push("<p class='historiesDefault'><b>Lý do hủy tour</b>: " + object.reasonNames + "</a></p>");
                            }
                            if (object.conciergeName != null) {
                                res.push("<p class='historiesDefault'><b>Tên Concirge</b>: " + object.conciergeName + "</a></p>");
                            }
                            if (object.transportName != null) {
                                res.push("<p class='historiesDefault'><b>Phương tiện</b>: " + object.transportName + "</a></p>");
                            }
                            if (object.listings != null) {
                                var textListing = '<div class="historiesDefault"><b>Listings</b>: <br/>';
                                var arrToStr = [];
                                $.each(object.listings, function(key, value) {
                                    note = '';
                                    if (typeof value.note !== 'undefined' && value.note != '' && value.note != null) {
                                        note = '<b>- Ghi chú: </b> ' + value.note
                                    }
                                    arrToStr.push('- <a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + value.rlistingId + ');return false;">' + value.rlistingId + ' </a> ' + note);

                                })
                                textListing += arrToStr.join("<br/>")
                                res.push(textListing + '</div>');
                            }

                            if (object.typeId == 25) {
                                var onclk = '';
                                if (typeof object.contentType !== 'undefined') {
                                    onclk = "onclick='openModalEndTour(" + JSON.stringify(object.listings) + ");return false'";
                                }
                                res.push("<div class='historiesDefault'><a " + onclk + " class='linkOpenEndTour' href='#'>Kết quả đi tour</a></div>");
                            }
                            if (object.note != null) {
                                res.push("<p class='historiesDefault'>Chú ý: " + object.note + "</p>");
                            }

                            if (object.typeId == 96 || object.typeId == 97) {
                                var arrToStr = [];
                                res.push("<div class='historiesDefault'><b>Lý do: </b>" + object.reasonName + "</div>");
                                if (object.listingIds != null && object.listingIds.length > 0) {
                                    $.each(object.listingIds, function(k, v) {
                                        arrToStr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + v + ');return false;">' + v + ' </a> ');
                                    })
                                    var listings = arrToStr.join(', ');
                                    res.push('<div class="historiesDefault"><b>Listings:</b> ' + listings + '</div>')
                                }
                                if (object.note != null) {
                                    res.push("<p class='historiesDefault'><b>Ghi chú</b>: " + object.note + "</p>");
                                }
                            }
                            break;
                        case 2:
                            var renderTable = '<table class="table table-bordered"><th>Giá trị cũ</th><th>Giá trị mới</th><tbody>';

                            $.each(object.compares, function(key, value) {
                                var dem = value.olds.length;
                                if (dem < value.news.length) {
                                    dem = value.news.length;
                                }
                                for (var i = 0; i < dem; i++) {
                                    var a = i in value.olds ? value.olds[i].value : '';
                                    var b = i in value.news ? value.news[i].value : ''
                                    renderTable += "<tr><td>" + value.description + " : " + a + "</td><td>" + value.description + " : " + b + "</td></tr>"
                                }
                            })
                            renderTable += "</tbody></table>";

                            if (object.listings != null) {
                                var textListing = '<div class="historiesDefault">';
                                var arrToStr = [];

                                $.each(object.listings, function(key, value) {
                                    note = '';
                                    if (typeof value.note !== 'undefined' && value.note != '' && value.note != null) {
                                        note = '<b>- Ghi chú: /b>' + value.note
                                    }
                                    arrToStr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + value.rlistingId + ');return false;">' + value.rlistingId + '</a> ' + note);

                                })
                                textListing += arrToStr.join("<br/>")
                                res.push(textListing + '</div>');
                            }
                            res.push(renderTable);
                            break;
                        case 3:
                            if (object.scheduleTime != null) {
                                res.push("<p class='historiesDefault'><b>Thời Gian Đi Tour</b>: " + $.format.date(new Date(object.scheduleTime), "HH:mm:ss dd/MM/yyyy") + "</p>");
                            }
                            if (object.customerName != null) {
                                res.push("<p class='historiesDefault'><b>Khách Hàng</b>: " + object.customerName + "</p>");
                            }
                            if (object.note != null) {
                                res.push("<p class='historiesDefault'><b>Chú ý</b>: " + object.note + "</p>");
                            }
                            if (object.listings != null) {
                                var textListing = '<div class="historiesDefault">';
                                var arrToStr = [];
                                $.each(object.listings, function(key, value) {
                                    note = '';
                                    if (typeof value.note !== 'undefined' && value.note != '') {
                                        note = '<b>- Ghi chú: </b>' + value.note
                                    }
                                    arrToStr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + value.rlistingId + ');return false;">' + value.rlistingId + '</a> ' + note);

                                })
                                textListing += arrToStr.join("<br/>")
                                res.push(textListing + '</div>');
                            }

                            if (object.typeId != 14 && object.typeId != 15 && object.typeId != 16) {
                                var renderTable = '<table class="table table-bordered"><th width="240px">Giá trị cũ</th><th>Giá trị mới</th><tbody>';

                                $.each(object.compares, function(key, value) {
                                    var dem = value.olds.length;
                                    if (dem < value.news.length) {
                                        dem = value.news.length;
                                    }
                                    for (var i = 0; i < dem; i++) {
                                        if (value.fieldName == 'ScheduleTime') {
                                            var a = i in value.olds ? $.format.date(new Date(value.olds[i].value), "HH:mm:ss dd/MM/yyyy") : '';
                                            var b = i in value.news ? $.format.date(new Date(value.news[i].value), "HH:mm:ss dd/MM/yyyy") : '';
                                        } else {
                                            var a = i in value.olds ? value.olds[i].value : '';
                                            var b = i in value.news ? value.news[i].value : '';
                                        }
                                        renderTable += "<tr><td><b>" + value.description + " </b>: " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                                    }
                                })
                                renderTable += "</tbody></table>";
                                res.push(renderTable);
                            } else { // THÊM MÀU CHO ADD VÀ REMOVE
                                var renderTable = '<table class="table table-bordered"><th>Giá trị cũ</th><th>Giá trị mới</th><tbody>';

                                $.each(object.compares, function(key, value) {
                                    var dem = value.olds.length;
                                    if (dem < value.news.length) {
                                        dem = value.news.length;
                                    }

                                    var arrA = [],
                                        arrB = [];
                                    $.each(value.olds, function(key, value) {
                                        arrA.push(value.value.rlistingId);
                                    });
                                    $.each(value.news, function(key, value) {
                                        arrB.push(value.value.rlistingId);
                                    });

                                    for (var i = 0; i < dem; i++) {
                                        var a = i in value.olds ? value.olds[i].value.rlistingId + ' <p><b>Thời gian đi tour</b>: ' + $.format.date(new Date(value.olds[i].value.scheduleTime), "HH:mm:ss dd/MM/yyyy") + '</p>' : '';
                                        var flagA = i in value.olds ? value.olds[i].value.rlistingId : 0;
                                        var b = i in value.news ? value.news[i].value.rlistingId + ' <p><b>Thời gian đi tour</b>: ' + $.format.date(new Date(value.news[i].value.scheduleTime), "HH:mm:ss dd/MM/yyyy") + '</p>' : '';
                                        var flagB = i in value.news ? value.news[i].value.rlistingId : 0;

                                        if (a != '') {
                                            var classChange = '';
                                            if (arrB.indexOf(flagA) <= -1 && object.typeId == 16) {
                                                classChange = 'class="historiesOlds"';
                                            }
                                            a = "<td " + classChange + "><b>" + value.description + "</b> : " + a + "</td>";
                                        } else {
                                            a = "<td></td>";
                                        }

                                        if (b != '') {
                                            var classChange = '';
                                            if (arrA.indexOf(flagB) <= -1 && object.typeId == 15) {
                                                classChange = 'class="historiesNews"';
                                            }
                                            b = "<td " + classChange + "><b>" + value.description + "</b> : " + b + "</td>";
                                        } else {
                                            b = "<td></td>";
                                        }
                                        renderTable += "<tr>" + a + b + "</tr>"
                                    }
                                    renderTable += "</tbody></table>";
                                    res.push(renderTable);
                                })
                            }

                            break
                        default:
                            res.push("Ngoài case cmnr");
                    }
                } else {
                    errMess.push("Không tồn tại contentType");
                }
            } else if (object.entity == 'deal' || object.entity == 'lead' || object.entity == 'request') {
                if (typeof object.contentType !== 'undefined') {
                    switch (object.contentType) {
                        case 1:
                            if (object.typeId == 196) {
                                var arrNoteElm = [];
                                if (object.channelNote) {
                                    arrNoteElm.push(`<li>${ object.channelNote }</li>`)
                                }
                                if (typeof object.customers != null) {
                                    arrNoteElm.push(`<li>Tên khách hàng: ${ object.customers.name }</li>`)
                                }
                                if (object.createdByName) {
                                    arrNoteElm.push(`<li>BA clone: ${ object.createdByName }</li>`)
                                }
                                if (object.cloneReason) {
                                    arrNoteElm.push(`<li>Lý do clone: ${ object.cloneReason }</li>`)
                                }
                                if (object.note) {
                                    arrNoteElm.push(`<li>Note: ${ object.note }</li>`)
                                }
                                if (arrNoteElm.length != 0) {
                                    res.push('<p class="historiesDefault"><b>Chi tiết: </b></p>');
                                    res.push(`<ul style="background:white">${arrNoteElm.join("")}</ul>`);
                                }
                            }
                            if (object.typeId == 76) {
                                res.push('<div class="historiesDefault"><b>Listing: </b> <a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + object.rlistingId + ');return false;">' + object.rlistingId + ' </a></div>');
                                if (typeof object.newPrice !== 'undefined') {
                                    res.push('<div class="historiesDefault"><b>Giá chốt: </b>' + object.newPrice + '</div>')
                                }
                            }
                            if (object.typeId == 100 || object.typeId == 99) {
                                res.push('<div class="historiesDefault">' + object.reasonName + '</div>')
                            }
                            if (object.typeId == 148) {
                                res.push('<div class="historiesDefault">' + object.closedByName + '</div>')
                                if (object.closedByTypeName != null) {
                                    res.push('<div class="historiesDefault">' + object.closedByTypeName + '</div>')
                                }
                            }
                            // 22
                            if (object.typeId == 22 || object.typeId == 23) {
                                res.push("<p class='historiesDefault'><b>Tạo mới deal</b>: <a target='_blank' href='/deal/detail/" + object.dealId + "'>" + object.dealId + "</a></p>");
                            }

                            if (object.typeId == 18 || object.typeId == 20) {
                                res.push("<p class='historiesDefault'><b>Tạo mới request</b>: <a target='_blank' href='/request/detail/" + object.requestId + "'>" + object.requestId + "</a></p>");
                            }

                            if (object.typeId == 19 || object.typeId == 21) {
                                res.push("<p class='historiesDefault'><b>Tạo mới lead</b>: <a target='_blank' href='/request/detail/" + object.leadId + "'>" + object.leadId + "</a></p>");
                            }

                            if (object.typeId == 69 || object.typeId == 68) {
                                res.push('<p class="historiesDefault"><b>Lý do hủy: </b> ' + object.reasonName + '</p>');
                            }

                            if (object.typeId == 50 || object.typeId == 47) {
                                res.push('<p class="historiesDefault"><b>Nội dung: </b> ' + object.note + '</p>')
                            }

                            if (object.typeId == 127) {
                                res.push('<p class="historiesDefault">' + object.data + '</p>');
                                if (object.customerName != null) {
                                    res.push('<p class="historiesDefault"><b>Tên khách hàng: </b>' + object.customerName + '</p>');
                                }
                                if (object.moveInDate != null) {
                                    res.push('<p class="historiesDefault"><b>Ngày dọn vô: </b>' + moment.unix(object.moveInDate / 1000).format("DD-MM-YYYY") + '</p>');
                                }
                                if (typeof object.closedByName !== 'undefined' && object.closedByName != null) {
                                    var string = '<p class="historiesDefault"><b>Loại: </b>' + object.closedByName;
                                    if (typeof object.closedByTypeName !== 'undefined' && object.closedByTypeName != null) {
                                        string += ' - ' + object.closedByTypeName;
                                    }
                                    res.push(string + "</p>");
                                }
                            }
                            if (object.typeId == 173) {
                                if (object.msnv != null) {
                                    res.push('<p class="historiesDefault"><b>Mã nhân viên giới thiệu: </b>' + object.msnv + '</p>');
                                } else if (object.msnv== null) {
                                    res.push('<p class="historiesDefault"><b>Mã nhân viên giới thiệu: </b></p>');
                                }
                            }

                            // auto assign lead
                            if (object.typeId === 207) {
                                res.push('<p class="historiesDefault"><b>Người nhận: </b> ' + object.assigneeName + '</p>');
                            }

                            var arrayDLXPortal = [1, 2, 6, 7, 140, 141, 142, 143];
                            var arrayDLXPortalListings = [3, 4];
                            if (arrayDLXPortal.indexOf(object.typeId) != -1) {

                                if (object.dealId != null) {
                                    res.push('<div class="historiesDefault"><b>DealId:</b> ' + object.dealId + '</div>');
                                } else {
                                    res.push('<div class="historiesDefault"><b>LeadId:</b> ' + object.leadId + '</div>');
                                }
                                res.push('<div class="historiesDefault"><b>Chuyển cho:</b> ' + object.assignedName + '</div>');
                                res.push('<div class="historiesDefault"><b>Giá:</b> ' + object.finalBudget + '</div>');
                                if (object.cityList != null && object.cityList.length > 0) {
                                    var arrCity = [];
                                    $.each(object.cityList, function(k, v) {
                                        arrCity.push(v.cityName);
                                    })
                                    res.push('<div class="historiesDefault"><b>Thành phố:</b> ' + arrCity.join(', ') + '</div>')
                                }
                                if (object.districtsList != null && object.districtsList.length > 0) {
                                    var arrDistricts = [];
                                    $.each(object.districtsList, function(k, v) {
                                        districsRender = v.districtName;
                                        if (v.isPrefered == true) {
                                            districsRender += ' <i class="fa fa-star" style="color:orange;" aria-hidden="true"></i>';
                                        }
                                        arrDistricts.push(districsRender);
                                    })
                                    res.push('<div class="historiesDefault"><b>Quận:</b> ' + arrDistricts.join(', ') + '</div>')
                                }
                            } else if (arrayDLXPortalListings.indexOf(object.typeId) != -1) {
                                if (object.dealId != null) {
                                    res.push('<div class="historiesDefault"><b>DealId:</b> ' + object.dealId + '</div>');
                                } else {
                                    res.push('<div class="historiesDefault"><b>LeadId:</b> ' + object.leadId + '</div>');
                                }
                                var arrToStr = [];
                                if (object.listingIds != null) {
                                    $.each(object.listingIds, function(k, v) {
                                        arrToStr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + v + ');return false;">' + v + ' </a> ');
                                    })
                                    var listings = arrToStr.join(', ');
                                    res.push('<div class="historiesDefault"><b>Listings:</b> ' + listings + '</div>')
                                }

                            }
                            break;
                        case 2:
                            var renderTable = '<table class="table table-bordered"><th width="240px">Giá trị cũ</th><th>Giá trị mới</th><tbody>';

                            $.each(object.compares, function(key, value) {
                                if (value.olds == null) {
                                    value.olds = [];
                                }
                                if (value.news == null) {
                                    value.news = [];
                                }
                                var dem = value.olds.length;
                                if (dem < value.news.length) {
                                    dem = value.news.length;
                                }
                                if (value.type == 'LIST_OBJECT') {
                                    var tdOldsArr = [];
                                    var tdNewsArr = [];
                                    $.each(value.olds, function(ko, vo) {
                                        if (value.fieldName == 'rlistingIds') {
                                            tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vo.value + ');return false;">' + vo.value + ' </a>');
                                        } else if (value.fieldName == 'customersPhone') {
                                            tdOldsArr.push("xxx-xxx-xxx-" + vo.value.substring(vo.value.length - 2, vo.value.length))
                                        } else if (value.fieldName == 'customersEmails' && vo.value != null) {
                                            tdOldsArr.push(vo.value.substring(0, 2) + "@xx.xx");
                                        } else if (value.fieldName == 'wardInDistricts') {
                                            var hoverWardsArray = [];
                                            $.each(vo.value.wards, function(kwid, vwid) {
                                                hoverWardsArray.push(vwid.wardName);
                                            });
                                            var stringHover = hoverWardsArray.join(', ');
                                            distsAtag = '<a href="javascript:void(0);" data-toggle="tooltip" title="' + stringHover + '">' + vo.value.districtName + '</a>';
                                            tdOldsArr.push(distsAtag);
                                        } else {
                                            tdOldsArr.push(vo.value);
                                        }
                                    });
                                    $.each(value.news, function(kn, vn) {
                                        if (value.fieldName == 'rlistingIds') {
                                            tdNewsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vn.value + ');return false;">' + vn.value + ' </a>');
                                        } else if (value.fieldName == 'customersPhone') {
                                            tdNewsArr.push("xxx-xxx-xxx-" + vn.value.substring(vn.value.length - 2, vn.value.length))
                                        } else if (value.fieldName == 'customersEmails' && vn.value != null) {
                                            tdNewsArr.push(vn.value.substring(0, 2) + "@xx.xx");
                                        } else if (value.fieldName == 'wardInDistricts') {
                                            var hoverWardsArray = [];
                                            $.each(vn.value.wards, function(kwid, vwid) {
                                                hoverWardsArray.push(vwid.wardName);
                                            });
                                            var stringHover = hoverWardsArray.join(', ');
                                            distsAtag = '<a href="javascript:void(0);" data-toggle="tooltip" title="' + stringHover + '">' + vn.value.districtName + '</a>';
                                            tdNewsArr.push(distsAtag);
                                        } else {
                                            tdNewsArr.push(vn.value);
                                        }
                                    })
                                    var a = tdOldsArr.join(', ');
                                    var b = tdNewsArr.join(', ');
                                    a = a != '' ? a : emptyVal;
                                    b = b != '' ? b : emptyVal;
                                    renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                                } else if (value.type == 'ARRAY') {
                                    var tdOldsArr = [];
                                    var tdNewsArr = [];
                                    $.each(value.olds, function(ko, vo) {
                                        if (value.fieldName == 'rlistingIds') {
                                            $.each(vo.value, function(krlist, vrlist) {
                                                tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                            })
                                        } else if (value.fieldName == 'customersPhone') {
                                            $.each(vo.value, function(krlist, vrlist) {
                                                tdOldsArr.push("xxx-xxx-xxx-" + vrlist.substring(vrlist.length - 2, vrlist.length))
                                            })
                                        } else if (value.fieldName == 'customersEmails') {
                                            $.each(vo.value, function(krlist, vrlist) {
                                                tdOldsArr.push(vrlist.substring(0, 2) + "@xx.xx");
                                            })
                                        } else if (value.fieldName == 'comment') {
                                            let ulElm = '<div style="width:350px;overflow: auto;"><ul>';
                                            if (vo.value.length == 0) {
                                                ulElm += `<li>N/A</li>`;
                                            } else {
                                                $.each(vo.value, function(krlist, vrlist) {
                                                    ulElm += `<li>${vrlist}</li>`;
                                                })
                                            }
                                            ulElm += '</ul></div>';
                                            tdOldsArr.push(ulElm);
                                        } else {
                                            $.each(vo.value, function(krlist, vrlist) {
                                                tdOldsArr.push(vrlist);
                                            })
                                        }
                                    });
                                    $.each(value.news, function(kn, vn) {
                                        if (value.fieldName == 'rlistingIds') {
                                            $.each(vn.value, function(krlist, vrlist) {
                                                tdNewsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                            })
                                        } else if (value.fieldName == 'customersPhone') {
                                            $.each(vn.value, function(krlist, vrlist) {
                                                tdNewsArr.push("xxx-xxx-xxx-" + vrlist.substring(vrlist.length - 2, vrlist.length))
                                            })
                                        } else if (value.fieldName == 'customersEmails') {
                                            $.each(vn.value, function(krlist, vrlist) {
                                                tdNewsArr.push(vrlist.substring(0, 2) + "@xx.xx");
                                            })
                                        } else if (value.fieldName == 'comment') {
                                            let ulElm = '<div style="width:350px;overflow: auto;"><ul>';
                                            if (vn.value.length == 0) {
                                                ulElm += `<li>N/A</li>`;
                                            } else {
                                                $.each(vn.value, function(krlist, vrlist) {
                                                    ulElm += `<li>${vrlist}</li>`;
                                                })
                                            }
                                            ulElm += '</ul></div>';
                                            tdNewsArr.push(ulElm);
                                        } else {
                                            $.each(vn.value, function(krlist, vrlist) {
                                                tdNewsArr.push(vrlist);
                                            })
                                        }
                                    })
                                    var a = tdOldsArr.join(', ');
                                    var b = tdNewsArr.join(', ');
                                    a = a != '' ? a : emptyVal;
                                    b = b != '' ? b : emptyVal;
                                    renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                                } else if (value.type == 'FROM_TO') {
                                    for (var i = 0; i < dem; i++) {
                                        if (i in value.olds && value.olds[i].value.type != 'yearbuilt') {
                                            var a = 'từ ' + value.olds[i].value.fromValue + ' đến ' + value.olds[i].value.toValue;
                                        } else if (i in value.olds) {
                                            var a = value.olds[i].value.fromValue;
                                        } else {
                                            var a = emptyVal;
                                        }
                                        if (i in value.news && value.news[i].value.type != 'yearbuilt') {
                                            var b = 'từ ' + value.news[i].value.fromValue + ' đến ' + value.news[i].value.toValue;
                                        } else if (i in value.news) {
                                            var b = value.news[i].value.fromValue;
                                        } else {
                                            var b = emptyVal;
                                        }
                                        renderTable += "<tr><td><b>" + value.description + "</b>: " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                                    }
                                } else {
                                    for (var i = 0; i < dem; i++) {

                                        var a = i in value.olds ? value.olds[i].value : emptyVal
                                        var b = i in value.news ? value.news[i].value : emptyVal
                                        if (value.fieldName == 'moveInDate') {
                                            a = a != 'N/A' ? $.format.date(new Date(a), "dd/MM/yyyy") : emptyVal
                                            b = b != 'N/A' ? $.format.date(new Date(b), "dd/MM/yyyy") : emptyVal
                                        } else if (value.fieldName == 'phone') {
                                            if (a != emptyVal) {
                                                a = "xxx-xxx-xxx-" + a.substring(a.length - 2, a.length);
                                            }
                                        }
                                        renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                                    }
                                }
                            })
                            renderTable += "</tbody></table>";

                            res.push(renderTable);
                            break;
                        case 3:
                            //
                            if (object.note != '' || object.note != null) {
                                res.push('<p class="historiesDefault">' + object.note + '</p>');
                            }
                            var renderTable = '<table class="table table-bordered"><th width="240px">Giá trị cũ</th><th>Giá trị mới</th><tbody>';

                            $.each(object.compares, function(key, value) {
                                if (value.olds == null) {
                                    value.olds = [];
                                }
                                if (value.news == null) {
                                    value.news = [];
                                }
                                var dem = value.olds.length;
                                if (dem < value.news.length) {
                                    dem = value.news.length;
                                }
                                if (value.type == 'LIST_OBJECT') {
                                    var tdOldsArr = [];
                                    var tdNewsArr = [];
                                    $.each(value.olds, function(ko, vo) {
                                        if (value.fieldName == 'rlistingIds') {
                                            tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vo.value + ');return false;">' + vo.value + ' </a>');
                                        } else if (value.fieldName == 'customersPhone') {
                                            tdOldsArr.push("xxx-xxx-xxx-" + vo.value.substring(vo.value.length - 2, vo.value.length))
                                        } else if (value.fieldName == 'customersEmails' && vo.value != null) {
                                            tdOldsArr.push(vo.value.substring(0, 2) + "@xx.xx");
                                        } else if (value.fieldName == 'wardInDistricts') {
                                            var hoverWardsArray = [];
                                            $.each(vo.value.wards, function(kwid, vwid) {
                                                hoverWardsArray.push(vwid.wardName);
                                            });
                                            var stringHover = hoverWardsArray.join(', ');
                                            distsAtag = '<a href="javascript:void(0);" data-toggle="tooltip" title="' + stringHover + '">' + vo.value.districtName + '</a>';
                                            tdOldsArr.push(distsAtag);
                                        } else {
                                            tdOldsArr.push(vo.value);
                                        }
                                    });
                                    $.each(value.news, function(kn, vn) {
                                        if (value.fieldName == 'rlistingIds') {
                                            tdNewsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vn.value + ');return false;">' + vn.value + ' </a>');
                                        } else if (value.fieldName == 'customersPhone') {
                                            tdNewsArr.push("xxx-xxx-xxx-" + vn.value.substring(vn.value.length - 2, vn.value.length))
                                        } else if (value.fieldName == 'customersEmails' && vn.value != null) {
                                            tdNewsArr.push(vn.value.substring(0, 2) + "@xx.xx");
                                        } else if (value.fieldName == 'wardInDistricts') {
                                            var hoverWardsArray = [];
                                            $.each(vn.value.wards, function(kwid, vwid) {
                                                hoverWardsArray.push(vwid.wardName);
                                            });
                                            var stringHover = hoverWardsArray.join(', ');
                                            distsAtag = '<a href="javascript:void(0);" data-toggle="tooltip" title="' + stringHover + '">' + vn.value.districtName + '</a>';
                                            tdNewsArr.push(distsAtag);
                                        } else {
                                            tdNewsArr.push(vn.value);
                                        }
                                    })
                                    var a = tdOldsArr.join(', ');
                                    var b = tdNewsArr.join(', ');
                                    a = a != '' ? a : emptyVal;
                                    b = b != '' ? b : emptyVal;
                                    renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                                } else if (value.type == 'ARRAY') {
                                    var tdOldsArr = [];
                                    var tdNewsArr = [];
                                    $.each(value.olds, function(ko, vo) {
                                        if (value.fieldName == 'rlistingIds') {
                                            $.each(vo.value, function(krlist, vrlist) {
                                                tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                            })
                                        } else if (value.fieldName == 'customersPhone') {
                                            $.each(vo.value, function(krlist, vrlist) {
                                                tdOldsArr.push("xxx-xxx-xxx-" + vrlist.substring(vrlist.length - 2, vrlist.length))
                                            })
                                        } else if (value.fieldName == 'customersEmails') {
                                            $.each(vo.value, function(krlist, vrlist) {
                                                tdOldsArr.push(vrlist.substring(0, 2) + "@xx.xx");
                                            })
                                        } else {
                                            $.each(vo.value, function(krlist, vrlist) {
                                                tdOldsArr.push(vrlist);
                                            })

                                        }
                                    });
                                    $.each(value.news, function(kn, vn) {
                                        if (value.fieldName == 'rlistingIds') {
                                            $.each(vn.value, function(krlist, vrlist) {
                                                tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                            })
                                        } else if (value.fieldName == 'customersPhone') {
                                            $.each(vn.value, function(krlist, vrlist) {
                                                tdOldsArr.push("xxx-xxx-xxx-" + vrlist.substring(vrlist.length - 2, vrlist.length))
                                            })
                                        } else if (value.fieldName == 'customersEmails') {
                                            $.each(vn.value, function(krlist, vrlist) {
                                                tdOldsArr.push(vrlist.substring(0, 2) + "@xx.xx");
                                            })
                                        } else {
                                            $.each(vn.value, function(krlist, vrlist) {
                                                tdOldsArr.push(vrlist);
                                            })

                                        }
                                    })
                                    var a = tdOldsArr.join(', ');
                                    var b = tdNewsArr.join(', ');
                                    a = a != '' ? a : emptyVal;
                                    b = b != '' ? b : emptyVal;
                                    renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                                } else if (value.type == 'FROM_TO') {
                                    for (var i = 0; i < dem; i++) {
                                        if (i in value.olds && value.olds[i].value.type != 'yearbuilt') {
                                            var a = 'từ ' + value.olds[i].value.fromValue + ' đến ' + value.olds[i].value.toValue;
                                        } else if (i in value.olds) {
                                            var a = value.olds[i].value.fromValue;
                                        } else {
                                            var a = emptyVal;
                                        }
                                        if (i in value.news && value.news[i].value.type != 'yearbuilt') {
                                            var b = 'từ ' + value.news[i].value.fromValue + ' đến ' + value.news[i].value.toValue;
                                        } else if (i in value.news) {
                                            var b = value.news[i].value.fromValue;
                                        } else {
                                            var b = emptyVal;
                                        }
                                        renderTable += "<tr><td><b>" + value.description + "</b>: " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                                    }
                                } else {
                                    for (var i = 0; i < dem; i++) {

                                        var a = i in value.olds ? value.olds[i].value : emptyVal
                                        var b = i in value.news ? value.news[i].value : emptyVal
                                        if (value.fieldName == 'moveInDate') {
                                            a = a != 'N/A' ? $.format.date(new Date(a), "dd/MM/yyyy") : emptyVal
                                            b = b != 'N/A' ? $.format.date(new Date(b), "dd/MM/yyyy") : emptyVal
                                        }
                                        renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                                    }
                                }
                            })
                            renderTable += "</tbody></table>";
                            res.push(renderTable);
                            break
                        case 4:
                            const link = '/calendar-task/detail/' + object.taskId;
                            res.push('<div class="historiesDefault"><a href="' + link + '">' + object.taskName + '</a></div>');
                            break;
                        default:
                            res.push("Ngoài case cmnr");
                    }
                }
            } else if (object.entity == 'sms') {
                switch (object.contentType) {
                    case 1:
                        if (object.listingIds != null) {
                            var arrToStr = [];
                            $.each(object.listingIds, function(k, v) {
                                arrToStr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + v + ');return false;">' + v + ' </a> ');
                            })
                            var listings = arrToStr.join(', ');
                            var showDetail = '<b>- Listings</b>: ' + listings;
                            res.push('<div class="historiesDefault">' + showDetail + '</div>');
                        }

                        if (object.customerPhones != null) {
                            $.each(object.customerPhones, function(k, v) {
                                res.push('<div class="historiesDefault"><b>- Khách hàng: </b>' + v.customerName + '</div>');
                                if (v.body != null) {
                                    res.push('<div class="historiesDefault"><b>- Nội dung: </b>' + v.body.substring(0, v.body.length - 20) + ' ...' + '</div>');
                                }
                                res.push('<div class="historiesDefault"><b>- Trạng thái: </b>' + (v.msg || 'N/A') + '</div>');
                            })
                        } else if (object.ownerPhones != null && object.customerPhones == null) {
                            $.each(object.ownerPhones, function(k, v) {
                                res.push('<div class="historiesDefault"><b>- Người bán: </b>' + v.ownerName + '</div>');
                                if (v.body != null) {
                                    res.push('<div class="historiesDefault"><b>- Nội dung: </b>' + v.body.substring(0, v.body.length - 20) + ' ...' + '</div>');
                                }
                                res.push('<div class="historiesDefault"><b>- Trạng thái: </b>' + (v.msg || 'N/A') + '</div>');
                            })
                        }

                        break;
                    default:
                        res.push("Ngoài case cmnr");
                }
            } else if (object.entity == 'listing') {
                switch (object.contentType) {
                    case 1:
                        var nameFrom = object.createdByName;
                        var nameTo = object.assignName;
                        var arrToStr = [];
                        $.each(object.listingIds, function(k, v) {
                            arrToStr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + v + ');return false;">' + v + ' </a> ');
                        })
                        var listings = arrToStr.join(', ');
                        var showDetail = nameFrom + ' gửi yêu cầu check trống đến ' + nameTo + ' (' + listings + ')';

                        if (object.typeId == 73) {
                            res.push('<div class="historiesDefault"><b>Listings:</b> ' + listings + '</div>');
                            res.push('<div class="historiesDefault"><b>Kết quả:</b> ' + object.statusName + '</div>');
                            if (object.note != null) {
                                res.push('<div class="historiesDefault"><b>Ghi chú:</b> ' + object.note + '</div>');
                            }
                        } else {
                            res.push('<div class="historiesDefault">' + showDetail + '</div>');
                        }
                        break;
                }
            } else if (object.entity == 'email') {
                switch (object.contentType) {
                    case 1:
                        if (object.typeId == 57 || object.typeId == 144) { // Chuyển cho PS
                            if (object.listingIds != null) {
                                var arrToStr = [];
                                $.each(object.listingIds, function(k, v) {
                                    arrToStr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + v + ');return false;">' + v + ' </a> ');
                                })
                                var listings = arrToStr.join(', ');
                                res.push('<div class="historiesDefault"><b>Listings:</b> ' + listings + '</div>');
                            }
                            var liString = ""
                            $.each(object.psServices, function(k, v) {
                                liString += '<li>' + v.name + '</li>';
                            })
                            res.push('<div class="historiesDefault"><b>Dịch vụ yêu cầu: </b><ul>' + liString + '</ul></div>');
                            if (object.note != null) {
                                res.push('<div class="historiesDefault"><b>Ghi chú: </b>' + object.note + '</div>');
                            }
                        } else if (object.typeId == 181) {
                            res.push('<div class="historiesDefault">' + object.typeName + '</div>');
                        } else {
                            if (object.customerName != null) {
                                res.push('<div class="historiesDefault"><b>Người nhận: ' + object.customerName + '</b></div>')
                            }
                            if (object.listingIds != null) {
                                var arrToStr = [];
                                $.each(object.listingIds, function(k, v) {
                                    arrToStr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + v + ');return false;">' + v + ' </a> ');
                                })
                                var listings = arrToStr.join(', ');
                                res.push('<div class="historiesDefault"><b>Listings:</b> ' + listings + '</div>');
                            }
                            res.push('<div class="historiesDefault"><b>Nội dung email:</b><div>' + object.content + '</div></div>')
                        }

                        break;
                }
            } else if (object.entity == 'customers') {
                switch (object.contentType) {
                    case 1:
                        res.push('<div class="historiesDefault"><b>Tên khách hàng: </b>' + object.customerName + '</div>');
                        res.push('<div class="historiesDefault"><b>CMND: </b>' + object.customerCMND + '</div>');
                        res.push('<div class="historiesDefault"><b>Số ĐT: </b>' + object.customerPhone + '</div>');
                        break;
                }
            } else if (object.entity == 'call') {
                render_entity_call(res,object);
            } else if (object.entity == 'deal_contract') {
                switch (object.contentType) {
                    case 2:
                        var renderTable = '<table class="table table-bordered"><th width="240px">Giá trị cũ</th><th>Giá trị mới</th><tbody>';

                        $.each(object.compares, function(key, value) {
                            if (value.olds == null) {
                                value.olds = [];
                            }
                            if (value.news == null) {
                                value.news = [];
                            }
                            var dem = value.olds.length;
                            if (dem < value.news.length) {
                                dem = value.news.length;
                            }
                            if (value.type == 'LIST_OBJECT') {
                                var tdOldsArr = [];
                                var tdNewsArr = [];
                                var checkDeleteFile = [];

                                $.each(value.news, function(kn, vn) {
                                    if (value.fieldName == 'rlistingIds') {
                                        if (object.typeId == 52) {
                                            $.each(vn.value, function(krlist, vrlist) {
                                                tdNewsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                            })
                                        } else {
                                            tdNewsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vn.value + ');return false;">' + vn.value + ' </a>');
                                        }
                                    } else if (value.fieldName == 'customersPhone') {
                                        tdNewsArr.push("xxx-xxx-xxx-" + vn.value.substring(vn.value.length - 2, vn.value.length))
                                    } else if (value.fieldName == 'customersEmails') {
                                        tdNewsArr.push(vn.value.substring(0, 2) + "@xx.xx");
                                    } else if (value.fieldName == 'files') {
                                        var resp = [];
                                        $.each(vn.value, function(k, v) {
                                            checkDeleteFile.push(v.fileName);
                                            resp.push("<a href='" + v.link + "' download>" + v.fileName + "</a><br/>");
                                        })
                                        tdNewsArr.push(resp.join(', '));
                                    } else {
                                        tdNewsArr.push(vn.value);
                                    }
                                });

                                $.each(value.olds, function(ko, vo) {
                                    if (value.fieldName == 'rlistingIds') {
                                        if (object.typeId == 52) {
                                            $.each(vo.value, function(krlist, vrlist) {
                                                tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                            })
                                        } else {
                                            tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vo.value + ');return false;">' + vo.value + ' </a>');
                                        }
                                    } else if (value.fieldName == 'customersPhone') {
                                        tdOldsArr.push("xxx-xxx-xxx-" + vo.value.substring(vo.value.length - 2, vo.value.length))
                                    } else if (value.fieldName == 'customersEmails') {
                                        tdOldsArr.push(vo.value.substring(0, 2) + "@xx.xx");
                                    } else if (value.fieldName == 'files') {
                                        var resp = [];
                                        $.each(vo.value, function(k, v) {
                                            if (checkDeleteFile.indexOf(v.fileName) != -1) {
                                                resp.push("<a href='" + v.link + "' download>" + v.fileName + "</a><br/>");
                                            } else {
                                                resp.push(v.fileName);
                                            }
                                        })
                                        tdOldsArr.push(resp.join(', '));
                                    } else {
                                        tdOldsArr.push(vo.value);
                                    }
                                });
                                var a = tdOldsArr.join(', ');
                                var b = tdNewsArr.join(', ');
                                a = a != '' ? a : emptyVal;
                                b = b != '' ? b : emptyVal;
                                renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                            } else if (value.type == 'ARRAY') {
                                var tdOldsArr = [];
                                var tdNewsArr = [];
                                $.each(value.olds, function(ko, vo) {
                                    if (value.fieldName == 'rlistingIds') {
                                        $.each(vo.value, function(krlist, vrlist) {
                                            tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                        })
                                        // tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage('+vo.value+');return false;">'+vo.value+' </a>');
                                    } else if (value.fieldName == 'customersPhone') {
                                        $.each(vo.value, function(krlist, vrlist) {
                                            tdOldsArr.push("xxx-xxx-xxx-" + vrlist.substring(vrlist.length - 2, vrlist.length))
                                        })
                                    } else if (value.fieldName == 'customersEmails') {
                                        $.each(vo.value, function(krlist, vrlist) {
                                            tdOldsArr.push(vrlist.substring(0, 2) + "@xx.xx");
                                        })
                                    } else {
                                        $.each(vo.value, function(krlist, vrlist) {
                                            tdOldsArr.push(vrlist);
                                        })

                                    }
                                });
                                $.each(value.news, function(kn, vn) {
                                    if (value.fieldName == 'rlistingIds') {
                                        $.each(vn.value, function(krlist, vrlist) {
                                            tdNewsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                        })
                                    } else if (value.fieldName == 'customersPhone') {
                                        $.each(vn.value, function(krlist, vrlist) {
                                            tdNewsArr.push("xxx-xxx-xxx-" + vrlist.substring(vrlist.length - 2, vrlist.length))
                                        })
                                    } else if (value.fieldName == 'customersEmails') {
                                        $.each(vn.value, function(krlist, vrlist) {
                                            tdNewsArr.push(vrlist.substring(0, 2) + "@xx.xx");
                                        })
                                    } else {
                                        $.each(vn.value, function(krlist, vrlist) {
                                            tdNewsArr.push(vrlist);
                                        })

                                    }
                                })
                                var a = tdOldsArr.join(', ');
                                var b = tdNewsArr.join(', ');
                                a = a != '' ? a : emptyVal;
                                b = b != '' ? b : emptyVal;
                                renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                            } else {
                                for (var i = 0; i < dem; i++) {
                                    var a = i in value.olds ? value.olds[i].value : emptyVal
                                    var b = i in value.news ? value.news[i].value : emptyVal

                                    renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                                }
                            }
                        })
                        renderTable += "</tbody></table>";

                        res.push(renderTable);
                        break;
                }
            } else if (object.entity == 'basket') {
                switch (object.contentType) {
                    case 2:
                        var renderTable = '<table class="table table-bordered"><th width="240px">Giá trị cũ</th><th>Giá trị mới</th><tbody>';

                        $.each(object.compares, function(key, value) {
                            if (value.olds == null) {
                                value.olds = [];
                            }
                            if (value.news == null) {
                                value.news = [];
                            }
                            var dem = value.olds.length;
                            if (dem < value.news.length) {
                                dem = value.news.length;
                            }
                            if (value.type == 'LIST_OBJECT') {
                                var tdOldsArr = [];
                                var tdNewsArr = [];
                                $.each(value.olds, function(ko, vo) {
                                    if (value.fieldName == 'rlistingIds') {
                                        if (object.typeId == 52) {
                                            $.each(vo.value, function(krlist, vrlist) {
                                                tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                            })
                                        } else {
                                            tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vo.value + ');return false;">' + vo.value + ' </a>');
                                        }
                                    } else if (value.fieldName == 'customersPhone') {
                                        tdOldsArr.push("xxx-xxx-xxx-" + vo.value.substring(vo.value.length - 2, vo.value.length))
                                    } else if (value.fieldName == 'customersEmails') {
                                        tdOldsArr.push(vo.value.substring(0, 2) + "@xx.xx");
                                    } else {
                                        tdOldsArr.push(vo.value);
                                    }
                                });
                                $.each(value.news, function(kn, vn) {
                                    if (value.fieldName == 'rlistingIds') {
                                        if (object.typeId == 52) {
                                            $.each(vn.value, function(krlist, vrlist) {
                                                tdNewsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                            })
                                        } else {
                                            tdNewsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vn.value + ');return false;">' + vn.value + ' </a>');
                                        }
                                    } else if (value.fieldName == 'customersPhone') {
                                        tdNewsArr.push("xxx-xxx-xxx-" + vn.value.substring(vn.value.length - 2, vn.value.length))
                                    } else if (value.fieldName == 'customersEmails') {
                                        tdNewsArr.push(vn.value.substring(0, 2) + "@xx.xx");
                                    } else {
                                        tdNewsArr.push(vn.value);
                                    }
                                })
                                var a = tdOldsArr.join(', ');
                                var b = tdNewsArr.join(', ');
                                a = a != '' ? a : emptyVal;
                                b = b != '' ? b : emptyVal;
                                renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                            } else if (value.type == 'ARRAY') {
                                var tdOldsArr = [];
                                var tdNewsArr = [];
                                $.each(value.olds, function(ko, vo) {
                                    if (value.fieldName == 'rlistingIds') {
                                        $.each(vo.value, function(krlist, vrlist) {
                                            tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                        })
                                    } else if (value.fieldName == 'customersPhone') {
                                        $.each(vo.value, function(krlist, vrlist) {
                                            tdOldsArr.push("xxx-xxx-xxx-" + vrlist.substring(vrlist.length - 2, vrlist.length))
                                        })
                                    } else if (value.fieldName == 'customersEmails') {
                                        $.each(vo.value, function(krlist, vrlist) {
                                            tdOldsArr.push(vrlist.substring(0, 2) + "@xx.xx");
                                        })
                                    } else {
                                        $.each(vo.value, function(krlist, vrlist) {
                                            tdOldsArr.push(vrlist);
                                        })

                                    }
                                });
                                $.each(value.news, function(kn, vn) {
                                    if (value.fieldName == 'rlistingIds') {
                                        $.each(vn.value, function(krlist, vrlist) {
                                            tdNewsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                        })
                                    } else if (value.fieldName == 'customersPhone') {
                                        $.each(vn.value, function(krlist, vrlist) {
                                            tdNewsArr.push("xxx-xxx-xxx-" + vrlist.substring(vrlist.length - 2, vrlist.length))
                                        })
                                    } else if (value.fieldName == 'customersEmails') {
                                        $.each(vn.value, function(krlist, vrlist) {
                                            tdNewsArr.push(vrlist.substring(0, 2) + "@xx.xx");
                                        })
                                    } else {
                                        $.each(vn.value, function(krlist, vrlist) {
                                            tdNewsArr.push(vrlist);
                                        })

                                    }
                                })
                                var a = tdOldsArr.join(', ');
                                var b = tdNewsArr.join(', ');
                                a = a != '' ? a : emptyVal;
                                b = b != '' ? b : emptyVal;
                                renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                            } else {
                                for (var i = 0; i < dem; i++) {
                                    var a = i in value.olds ? value.olds[i].value : emptyVal
                                    var b = i in value.news ? value.news[i].value : emptyVal
                                    renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                                }
                            }
                        })
                        renderTable += "</tbody></table>";
                        res.push(renderTable);
                        break;
                }
            } else if (object.entity == 'meeting') {
                switch (object.contentType) {
                    case 1:

                        if (object.reasonName != null) {
                            res.push('<div class="historiesDefault"><b>Lý do: </b>' + object.reasonName + '</div>');
                        }

                        if (object.note != null) {
                            res.push('<div class="historiesDefault"><b>Ghi chú: </b>' + object.note + '</div>');
                        }

                        if (object.reminderDate != null) {
                            res.push('<div class="historiesDefault"><b>Thời gian meeting: </b> ' + $.format.date(new Date(object.reminderDate), "HH:mm:ss dd/MM/yyyy") + '</div>');
                        }
                        if (object.tCId == 0) {
                            res.push('<div class="historiesDefault"><b>Địa điểm: </b>' + object.address + '</div>');
                        } else if (object.tCName != null) {
                            res.push('<div class="historiesDefault"><b>Trung tâm giao dịch: </b> ' + object.tCName + '</div>');
                        }
                        if (object.customerName != null) {
                            res.push('<div class="historiesDefault"><b>Tên khách hàng: </b>' + object.customerName + '</div>');
                        }
                        if (object.assignToName != null) {
                            res.push('<div class="historiesDefault"><b>Chuyển cho: </b>' + object.assignToName + '</div>');
                        }
                        if (object.rejectReasonName != null) {
                            res.push('<div class="historiesDefault"><b>Lý do từ chối: </b> ' + object.rejectReasonName + '</div>');
                        }
                        if (object.noteTm != null) {
                            res.push('<div class="historiesDefault"><b>Ghi chú cho meeting: </b>' + object.noteTm + '</div>');
                        }
                        if (object.dealId != null) {
                            res.push('<div class="historiesDefault"><b>Deal: </b><a target="_blank" href="/deal/detail/' + object.dealId + '">' + object.dealId + '</a></div>');
                        }
                        break;
                    case 2:
                        var renderTable = '<table class="table table-bordered"><th width="240px">Giá trị cũ</th><th>Giá trị mới</th><tbody>';

                        $.each(object.compares, function(key, value) {
                            if (value.olds == null) {
                                value.olds = [];
                            }
                            if (value.news == null) {
                                value.news = [];
                            }
                            var dem = value.olds.length;
                            if (dem < value.news.length) {
                                dem = value.news.length;
                            }
                            if (value.type == 'LIST_OBJECT') {
                                var tdOldsArr = [];
                                var tdNewsArr = [];
                                $.each(value.olds, function(ko, vo) {
                                    if (value.fieldName == 'rlistingIds') {
                                        if (object.typeId == 52) {
                                            $.each(vo.value, function(krlist, vrlist) {
                                                tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                            })
                                        } else {
                                            tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vo.value + ');return false;">' + vo.value + ' </a>');
                                        }
                                    } else if (value.fieldName == 'customersPhone') {
                                        tdOldsArr.push("xxx-xxx-xxx-" + vo.value.substring(vo.value.length - 2, vo.value.length))
                                    } else if (value.fieldName == 'customersEmails') {
                                        tdOldsArr.push(vo.value.substring(0, 2) + "@xx.xx");
                                    } else {
                                        tdOldsArr.push(vo.value);
                                    }
                                });
                                $.each(value.news, function(kn, vn) {
                                    if (value.fieldName == 'rlistingIds') {
                                        if (object.typeId == 52) {
                                            $.each(vn.value, function(krlist, vrlist) {
                                                tdNewsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                            })
                                        } else {
                                            tdNewsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vn.value + ');return false;">' + vn.value + ' </a>');
                                        }
                                    } else if (value.fieldName == 'customersPhone') {
                                        tdNewsArr.push("xxx-xxx-xxx-" + vn.value.substring(vn.value.length - 2, vn.value.length))
                                    } else if (value.fieldName == 'customersEmails') {
                                        tdNewsArr.push(vn.value.substring(0, 2) + "@xx.xx");
                                    } else {
                                        tdNewsArr.push(vn.value);
                                    }
                                })
                                var a = tdOldsArr.join(', ');
                                var b = tdNewsArr.join(', ');
                                a = a != '' ? a : emptyVal;
                                b = b != '' ? b : emptyVal;
                                renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                            } else if (value.type == 'ARRAY') {
                                var tdOldsArr = [];
                                var tdNewsArr = [];
                                $.each(value.olds, function(ko, vo) {
                                    if (value.fieldName == 'rlistingIds') {
                                        $.each(vo.value, function(krlist, vrlist) {
                                            tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                        })
                                    } else if (value.fieldName == 'customersPhone') {
                                        $.each(vo.value, function(krlist, vrlist) {
                                            tdOldsArr.push("xxx-xxx-xxx-" + vrlist.substring(vrlist.length - 2, vrlist.length))
                                        })
                                    } else if (value.fieldName == 'customersEmails') {
                                        $.each(vo.value, function(krlist, vrlist) {
                                            tdOldsArr.push(vrlist.substring(0, 2) + "@xx.xx");
                                        })
                                    } else {
                                        $.each(vo.value, function(krlist, vrlist) {
                                            tdOldsArr.push(vrlist);
                                        })

                                    }
                                });
                                $.each(value.news, function(kn, vn) {
                                    if (value.fieldName == 'rlistingIds') {
                                        $.each(vn.value, function(krlist, vrlist) {
                                            tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                        })
                                    } else if (value.fieldName == 'customersPhone') {
                                        $.each(vn.value, function(krlist, vrlist) {
                                            tdOldsArr.push("xxx-xxx-xxx-" + vrlist.substring(vrlist.length - 2, vrlist.length))
                                        })
                                    } else if (value.fieldName == 'customersEmails') {
                                        $.each(vn.value, function(krlist, vrlist) {
                                            tdOldsArr.push(vrlist.substring(0, 2) + "@xx.xx");
                                        })
                                    } else {
                                        $.each(vn.value, function(krlist, vrlist) {
                                            tdOldsArr.push(vrlist);
                                        })

                                    }
                                })
                                var a = tdOldsArr.join(', ');
                                var b = tdNewsArr.join(', ');
                                a = a != '' ? a : emptyVal;
                                b = b != '' ? b : emptyVal;
                                renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                            } else {
                                for (var i = 0; i < dem; i++) {
                                    var a = i in value.olds ? value.olds[i].value : emptyVal
                                    var b = i in value.news ? value.news[i].value : emptyVal
                                    if (value.fieldName == 'reminderDate') {
                                        a = a != emptyVal ? $.format.date(new Date(a), "HH:mm:ss dd/MM/yyyy") : a;
                                        b = b != emptyVal ? $.format.date(new Date(b), "HH:mm:ss dd/MM/yyyy") : b;
                                    }
                                    if (value.olds.length > 0 && value.olds[i].id == 0) {
                                        a = value.olds[i].note == null ? emptyVal : value.olds[i].note;
                                    }
                                    if (value.news.length > 0 && value.news[i].id == 0) {
                                        b = value.news[i].note == null ? emptyVal : value.news[i].note;
                                    }
                                    renderTable += "<tr><td><b>" + value.description + "</b> : " + a + "</td><td><b>" + value.description + "</b> : " + b + "</td></tr>"
                                }
                            }
                        })
                        renderTable += "</tbody></table>";
                        res.push(renderTable);
                        break;
                }
            } else if (object.entity == 'old') {
                switch (object.contentType) {
                    case 1:
                        res.push('<div class="historiesDefault"><b>Hành động: </b> ' + object.oldTypeName + '</div>');
                        res.push('<div class="historiesDefault">' + object.oldContent + '</div>');
                        break;
                }
            } else if (object.entity == 'task') {
                switch (object.contentType) {
                    case 1:
                        res.push('<div class="historiesDefault"><b>Task: </b> ' + object.taskName + ((object.statusName) ? " - <span style='font-weight:bold'>" + object.statusName + '</span>' : '') + '</div>');
                        break;
                }
            } else if (object.entity == 'diy') {
                switch (object.contentType) {
                    case 1:
                        res.push('<div class="historiesDefault"><b>Thời gian đi xem từ: </b> ' + $.format.date(new Date(object.timeViewFrom), "HH:mm:ss dd/MM/yyyy") + ' <b>đến:</b> ' + $.format.date(new Date(object.timeViewTo), "HH:mm:ss dd/MM/yyyy") + '</div>');
                        res.push('<div class="historiesDefault"><b>ListingId: </b><a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + object.rlistingId + ');return false;">' + object.rlistingId + ' </a></div>');
                        break;
                }
            } else if (object.entity == 'profile_customer') {
                if (object.oldType != null) {
                    object.contentType = 1;
                }
                switch (object.contentType) {
                    case 1:
                        if (object.typeId == 70) {
                            var renderOldProfile = renderQuestionForm(object.resultQuestionLog.resultQuestion);
                            res.push('<div class="historiesDefault">' + renderOldProfile + '</div>');
                        } else {
                            res.push('<div class="historiesDefault"><b>Hành động: </b> ' + object.oldTypeName + '</div>');
                            res.push('<div class="historiesDefault">' + object.content + '</div>');
                        }

                        break;
                    case 2:
                        var pointOld = object.oldProfileValue != null ? object.oldProfileValue : 'N/A';
                        var pointNew = object.newProfileValue != null ? object.newProfileValue : 'N/A';
                        var wrapPointA = '<div><b>Điểm đánh giá:</b> ' + pointOld + '</div><hr/>';
                        var wrapPointB = '<div><b>Điểm đánh giá:</b> ' + pointNew + '</div><hr/>';
                        var renderTable = '<table class="table table-bordered"><th width="240px">Giá trị cũ</th><th>Giá trị mới</th><tbody>';
                        value = object.questionCompares;
                        var a = renderQuestionForm(value.olds);
                        var b = renderQuestionForm(value.news);

                        renderTable += "<tr><td>" + wrapPointA + a + "</td><td>" + wrapPointB + b + "</td></tr>"
                        renderTable += "</tbody></table>";
                        res.push(renderTable);
                        break;
                }

            } else if (object.entity == 'lead_deal') {
                switch (object.contentType) {
                    case 1: //removedRlistingIds
                        if (object.action == 'sms') {
                            if (object.listingIds != null) {
                                var arrToStr = [];
                                $.each(object.listingIds, function(k, v) {
                                    arrToStr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + v + ');return false;">' + v + ' </a> ');
                                })
                                var listings = arrToStr.join(', ');
                                var showDetail = '<b>- Listings</b>: ' + listings;
                                res.push('<div class="historiesDefault">' + showDetail + '</div>');
                            }

                            if (object.customerPhones != null) {
                                $.each(object.customerPhones, function(k, v) {
                                    res.push('<div class="historiesDefault"><b>- Khách hàng: </b>' + v.customerName + '</div>');
                                    res.push('<div class="historiesDefault"><b>- Nội dung: </b>' + v.body.substring(0, v.body.length - 20) + ' ...' + '</div>');
                                    res.push('<div class="historiesDefault"><b>- Trạng thái: </b>' + (v.msg || 'N/A') + '</div>');
                                })
                            } else if (object.ownerPhones != null && object.customerPhones == null) {
                                $.each(object.ownerPhones, function(k, v) {
                                    res.push('<div class="historiesDefault"><b>- Người bán: </b>' + v.ownerName + '</div>');
                                    res.push('<div class="historiesDefault"><b>- Nội dung: </b>' + v.body.substring(0, v.body.length - 20) + ' ...' + '</div>');
                                    res.push('<div class="historiesDefault"><b>- Trạng thái: </b>' + (v.msg || 'N/A') + '</div>');
                                })
                            }
                        } else {
                            var tdOldsArr = [];
                            if (object.removedRlistingIds != null && object.removedRlistingIds.length > 0) {
                                $.each(object.removedRlistingIds, function(krlist, vrlist) {
                                    tdOldsArr.push('<a href="#" onclick="JMDetail.openModalListingDetailForAllPage(' + vrlist + ');return false;">' + vrlist + ' </a>');
                                })
                                var a = tdOldsArr.join(', ');
                                res.push('<div class="historiesDefault"><b>Listings: ' + a + '</b> Vừa được xóa khỏi bộ sưu tập</div>');
                            }
                        }


                        break;
                }
            } else if (object.entity == 'deal_commission') {
                switch (object.contentType) {
                    case 1: //removedRlistingIds
                        if (object.action == 'sms') {
                            if (object.smsList != null) {
                                $.each(object.smsList, function(k, v) {
                                    res.push('<div class="historiesDefault"><b>- Mô giới: </b>' + v.agentName + '</div>');
                                    res.push('<div class="historiesDefault"><b>- Nội dung: </b>' + v.body.substring(0, v.body.length - 20) + ' ...' + '</div>');
                                    res.push('<div class="historiesDefault"><b>- Trạng thái: </b>' + (v.msg || 'N/A') + '</div>');
                                })
                            }
                        } else {
                            res.push('<div class="historiesDefault"><b>Ghi chú: </b>' + object.note + '</div>');
                            res.push('<div class="historiesDefault"><b>Thời gian: </b>' + $.format.date(new Date(object.scheduleTime), "HH:mm:ss dd/MM/yyyy") + '</div>');
                        }
                        break;
                }
            } else if (object.entity == "deal_deposit") {
                switch (object.contentType) {
                    case 2:
                        if (typeof object.data.eventReason == 'undefined') {
                            var options = {
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric'
                            };
                            res.push(' <div class="historiesDefault"><b>Giá chốt cọc:</b> ' + object.data.formattedPrice + '</div>');
                            res.push('<div class="historiesDefault"><b>Thời gian hẹn:</b> ' + new Date(object.data.scheduleTime).toLocaleDateString("vi-VN", options) + '</div>');
                            res.push('<div class="historiesDefault"><b>Có yêu cầu vốn:</b> ' + (object.data.isLoanNeeded ? ((typeof object.data.depositMeeting !== "undefined") ? object.data.depositMeeting.loanValue.toLocaleString('de-DE') : 'Không') : 'Không') + '</div>');
                            res.push('<div class="historiesDefault"><b>Địa chỉ:</b> ' + ((typeof object.data.depositMeeting !== "undefined") ? object.data.depositMeeting.address : 'Không có') + '</div>');
                            res.push('<div class="historiesDefault hidden"><b>Có sử dụng dịch vụ Escrow:</b> ' + (object.data.isEsCrowService ? 'Có' : 'Không') + '</div>');
                            res.push('<div class="historiesDefault"><b>Trạng thái:</b> ' + object.data.statusName + '</div>');
                            res.push('<div class="historiesDefault"><b>Listing:</b><a href="javascript:;" onclick="JMDetail.openModalListingDetailForAllPage(' + object.data.listingId + ');return false;"> ' + object.data.listingId + '</a></div>');
                            res.push('<div class="historiesDefault"><b>dealId:</b> <a target="_blank" href="/deal/detail/' + object.data.dealId + '">' + object.data.dealId + '</a></div>');
                            if (typeof object.data.buyerAnswers != "undefined") {
                                var question_result = '<b>Giấy tờ bên bán (' + object.data.questionGroupName + ')</b><div style="padding-left: 10px;">';
                                $.each(object.data.buyerAnswers, function(key, item) {
                                    if (item.control == "checkbox") {
                                        question_result += '<p><b>- ' + item.answer + '</b></p>';
                                        if (!$.isEmptyObject(item.subResults)) {
                                            question_result += '<div style="padding-left:10px; margin-top: -5px;margin-bottom: 5px;">';
                                            $.each(item.subResults, function(key1, item1) {
                                                if (item1.control == "checkbox") {
                                                    question_result += '<span style="display: inline-block;background-color: #337ab7;padding: 3px;margin-right: 3px;border-radius: 3px;color: #fff;">' + item1.answer + '</span>';
                                                } else if (item1.control == "text") {
                                                    question_result += '<span style="display: inline-block;background-color: #337ab7;padding: 3px;margin-right: 3px;border-radius: 3px;color: #fff;">' + item1.answer + ':' + item1.value + '</span>';
                                                }
                                            });
                                            question_result += '</div>';
                                        }
                                    } else if (item.control == "text" || item.control == "datetime") {
                                        question_result += '<p><b>- ' + item.answer + '</b>:' + item.value + "</p>";
                                    } else if (item.control == "combobox") {
                                        var valueText = "N/A";
                                        if (item.values != null) {
                                            if (item.value == "-1") {
                                                valueText = item.content;
                                            } else {
                                                var eachValues = JSON.parse(item.values);
                                                $.each(eachValues, function(k, v) {
                                                    if (v.id == item.value) {
                                                        valueText = v.Name;
                                                        return false;
                                                    }
                                                })
                                            }
                                        }
                                        question_result += '<p><b>- ' + item.answer + '</b>:' + valueText + "</p>";
                                    }
                                });
                                res.push('<div class="historiesDefault">' + question_result + '</div></div>');
                            }
                            res.push('<div class="historiesDefault"><b>Assign đến:</b> ' + object.assignedName + '</div>');
                            res.push('<div class="historiesDefault"><b>Ghi chú:</b> ' + ((object.data.note == null || object.data.note.trim().length) == 0 ? 'Không có' : object.data.note) + '</div>');
                        } else {
                            res.push('<div class="historiesDefault"><b>Listing:</b><a href="javascript:;" onclick="JMDetail.openModalListingDetailForAllPage(' + object.data.listingId + ');return false;"> ' + object.data.listingId + '</a></div>');
                            res.push('<div class="historiesDefault"><b>Lý do:</b>' + object.data.eventReason.reasonContent + '</div>');
                            res.push('<div class="historiesDefault"><b>Trạng thái:</b>' + object.data.statusName + '</div>');
                        }
                        break;
                }
            } else if (object.entity == "deal_negotiation") {
                switch (object.contentType) {
                    case 2:
                        if (object.data) {
                            res.push('<div class="historiesDefault"><b>Thương lượng lần:</b> ' + object.data.negotiationTimes + '</div>');
                            res.push('<div class="historiesDefault"><b>Giá:</b> ' + object.data.currentPrice.toLocaleString('de-DE') + '</div>');
                            res.push('<div class="historiesDefault"><b>Giá thương lượng: </b> ' + object.data.negotiationPrice.toLocaleString('vi-VN') + '</div>');
                            res.push('<div class="historiesDefault"><b>Trạng thái:</b> ' + object.data.statusName + '</div>');
                            if (object.data.statusId == 4 && typeof object.data.negotiationEventReason != "undefined") {
                                if (object.data.negotiationEventReason.reasonContent.length != 0)
                                    res.push('<div class="historiesDefault"><b>Lý do hủy:</b> ' + object.data.negotiationEventReason.reasonContent + '</div>');
                                else
                                    res.push('<div class="historiesDefault"><b>Lý do hủy:</b> ' + object.data.negotiationEventReason.reasonName + '</div>');
                            }
                            res.push('<div class="historiesDefault"><b>Listing:</b><a href="javascript:;" onclick="JMDetail.openModalListingDetailForAllPage(' + object.data.rListingId + ');return false;"> ' + object.data.rListingId + '</a></div>');
                            res.push('<div class="historiesDefault"><b>dealId:</b> <a target="_blank" href="/deal/detail/' + object.data.dealId + '">' + object.data.dealId + '</a></div>');
                            res.push('<div class="historiesDefault"><b>Assign đến:</b> ' + object.data.assignedToName + '</div>');
                            if (currentUser.userId == object.createdBy)
                                res.push('<div class="historiesDefault"><b>Điều kiện:</b> ' + ((typeof object.data.buyerNote != "undefined" && object.data.buyerNote != null && object.data.buyerNote != 'undefined' && object.data.buyerNote.trim().length != 0) ? object.data.buyerNote : "Không có") + '</div>');
                            else
                                res.push('<div class="historiesDefault"><b>Điều kiện:</b> ' + ((object.data.ownerNote != null && object.data.ownerNote != "undefined" && object.data.ownerNote.trim().length != 0) ? object.data.ownerNote : "Không có") + '</div>');
                            res.push('<div class="historiesDefault"><b>Ghi chú:</b> ' + ((object.data.note == null || object.data.note.trim().length == 0) ? 'Không có' : object.data.note) + '</div>');
                        }
                        break;
                }


            } else if (object.entity == 'deal_match_listing_value' || object.entity == 'lead_match_listing_value') {
                switch (object.contentType) {
                    case 2:
                        var renderTable = '<table class="table table-bordered"><th>Giá trị cũ</th><th>Giá trị mới</th><tbody>';
                        if (object.oldData.length > 0) {
                            $.each(object.oldData, function(key, value) {
                                var contentB = "NA";
                                var isUse = value.isUse == true ? "Có" : "Không";
                                var content = "Điểm: " + value.maxValue + " | Tiêu chí tính điểm: " + isUse;
                                var contentSub = "";
                                if (value.subCongif.length > 0) {
                                    contentSub = "<ul>";
                                    $.each(value.subCongif, function(kSub, valueSub) {
                                        var isUseSub = valueSub.isUse == true ? "Có" : "Không";
                                        if (valueSub.typeId == 6) {
                                            var pointSub = "Độ rộng: " + valueSub.valueInputText + "m";
                                        } else {
                                            var pointSub = "Điểm: " + valueSub.maxValue;
                                        }
                                        contentSub += "<li><b>" + valueSub.typeName + "</b> " + pointSub + " | Tiêu chí tính điểm: " + isUseSub + "</li>";
                                    })
                                    contentSub += "</ul>"
                                }
                                content = content + contentSub;
                                if (object.newData.length > 0) {
                                    for (var i = 0; i < object.newData.length; i++) {
                                        if (typeof object.newData[i].typeId !== 'undefined') {
                                            if (object.newData[i].typeId == value.typeId) {
                                                var isUseB = object.newData[i].isUse == true ? "Có" : "Không";
                                                contentB = "Điểm: " + object.newData[i].maxValue + " | Tiêu chí tính điểm: " + isUseB;
                                                var contentSub = "";
                                                if (object.newData[i].subCongif.length > 0) {
                                                    contentSub = "<ul>";
                                                    $.each(object.newData[i].subCongif, function(kSub, valueSub) {
                                                        var isUseSub = valueSub.isUse == true ? "Có" : "Không";
                                                        if (valueSub.typeId == 6) {
                                                            var pointSub = "Độ rộng: " + valueSub.valueInputText + "m";
                                                        } else {
                                                            var pointSub = "Điểm: " + valueSub.maxValue;
                                                        }
                                                        contentSub += "<li><b>" + valueSub.typeName + "</b> " + pointSub + " | Tiêu chí tính điểm: " + isUseSub + "</li>";
                                                    })
                                                    contentSub += "</ul>"
                                                }
                                                contentB = contentB + contentSub;
                                            }
                                        }
                                    }
                                }
                                renderTable += "<tr><td><b>" + value.typeName + ":</b> " + content + "</td><td>" + contentB + "</td></tr>";

                            })
                        } else if (object.newData.length > 0) {
                            $.each(object.newData, function(key, value) {
                                var contentA = "NA";
                                var isUse = value.isUse == true ? "Có" : "Không";
                                var content = "Điểm: " + value.maxValue + " | Tiêu chí tính điểm: " + isUse;
                                var contentSub = "";
                                if (value.subCongif.length > 0) {
                                    contentSub = "<ul>";
                                    $.each(value.subCongif, function(kSub, valueSub) {
                                        var isUseSub = valueSub.isUse == true ? "Có" : "Không";
                                        if (valueSub.typeId == 6) {
                                            var pointSub = "Độ rộng: " + valueSub.valueInputText + "m";
                                        } else {
                                            var pointSub = "Điểm: " + valueSub.maxValue;
                                        }
                                        contentSub += "<li><b>" + valueSub.typeName + "</b> " + pointSub + " | Tiêu chí tính điểm: " + isUseSub + "</li>";
                                    })
                                    contentSub += "</ul>"
                                }
                                content = content + contentSub;
                                if (object.oldData.length > 0) {
                                    for (var i = 0; i < object.oldData.length; i++) {
                                        if (typeof object.oldData[i].typeId !== 'undefined') {
                                            if (object.oldData[i].typeId == value.typeId) {
                                                var isUseA = object.oldData[i].isUse == true ? "Có" : "Không";
                                                contentA = "Điểm: " + object.oldData[i].maxValue + " | Tiêu chí tính điểm: " + isUseA;
                                                var contentSub = "";
                                                if (object.oldData[i].subCongif.length > 0) {
                                                    contentSub = "<ul>";
                                                    $.each(object.oldData[i].subCongif, function(kSub, valueSub) {
                                                        var isUseSub = valueSub.isUse == true ? "Có" : "Không";

                                                        if (valueSub.typeId == 6) {
                                                            var pointSub = "Độ rộng: " + valueSub.valueInputText + "m";
                                                        } else {
                                                            var pointSub = "Điểm: " + valueSub.maxValue;
                                                        }
                                                        contentSub += "<li><b>" + valueSub.typeName + "</b> " + pointSub + " | Tiêu chí tính điểm: " + isUseSub + "</li>";
                                                    })
                                                    contentSub += "</ul>"
                                                }
                                                contentA = contentA + contentSub;
                                            }
                                        }
                                    }
                                }
                                renderTable += "<tr><td><b>" + value.typeName + ":</b> " + contentA + "</td><td>" + content + "</td></tr>";

                            })
                        } else {
                            renderTable += "<tr><td>NA</td><td>NA</td></tr>";
                        }
                        renderTable += "</tbody></table>";
                        res.push(renderTable);
                        break;
                    default:
                        res.push("Ngoài case cmnr");
                }
            } else if (["mortgage_result_bank", 'mortgage_request'].indexOf(object.entity) > -1) {
                if (typeof(object.contentType) !== undefined) {
                    switch (object.contentType) {
                        case 1: {
                            //mortgage_request
                            if (object.typeId === 152) {
                                //Không có nhu cầu vay
                                res.push(`<p class="historiesDefault">${object.typeName}</p>`)
                            }
                            if (object.typeId === 151) {
                                //có nhu cầu vay vốn
                                res.push(`<p class="historiesDefault"><b>Hôn nhân:</b> ${object.data.isMarried ? 'Đã kết hôn' : 'Độc thân'} </p>`);
                                res.push(`<p class="historiesDefault"><b>Số tiền có sẵn:</b> ${object.data.initCapital ? object.data.initCapital : 0} </p>`);
                                res.push(`<p class="historiesDefault"><b>Số tiền cần vay:</b> ${object.data.loan ? object.data.loan : 0} </p>`);
                                res.push(`<p class="historiesDefault"><b>Số tiền trả NH gần nhất:</b> ${object.data.latestAmount ? object.data.latestAmount : 0} </p>`);

                                if (Array.isArray(object.data.mortgageRequestDocuments)) {
                                    let mortgageRequestDocuments = [];
                                    mortgageRequestDocuments = object.data.mortgageRequestDocuments.map(it => {
                                        return `<tr><td> ${it.channelTypeName}</td>  <td> ${it.income ? it.income : 'N/a'} </td> </tr>`;
                                    }).join('');
                                    const tableMorgage = `<table class="table table-bordered"><tbody><tr><th>Thu nhập từ</th><th>Số tiền</th></tr>${mortgageRequestDocuments}</tbody></table>`;
                                    res.push(tableMorgage);
                                }

                            }
                            if (object.typeId === 154) {
                                res.push(`<p class="historiesDefault"><b>Trạng thái cũ:</b> ${object.data.oldStatusName ? object.data.oldStatusName : 'N/a'} </p>`);
                                res.push(`<p class="historiesDefault"><b>Trạng thái mới:</b> ${object.data.newStatusName ? object.data.newStatusName  : 'N/a'} </p>`);
                            }
                            if (object.typeId === 157) {
                                const data = object.newData;
                                res.push(`<p class="historiesDefault"><b>Tên khách hàng:</b> ${data.customerName ? data.customerName : 'N/a'} </p>`);
                                res.push(`<p class="historiesDefault"><b>Trạng thái:</b> ${data.statusName ? data.statusName  : 'N/a'} </p>`);
                                res.push(`<p class="historiesDefault"><b>rlistingId:</b> ${data.rlistingId ? data.rlistingId  : 'N/a'} </p>`);
                                res.push(`<p class="historiesDefault"><b>Hôn nhân:</b> ${data.isMarried ? 'Đã kết hôn' : 'Độc thân'} </p>`);

                                const profiles = data.profiles.map(profile => {
                                    const childs = profile.childs.map(child => {
                                        const profileInfos = child.profileInfos.map(info => {
                                            return (`     + ${info.name || ''} : (${info.photoGcns ? info.photoGcns.length : 0} ảnh) <br/>`);
                                        });
                                        return (`  - ${child.name} : <br/> ${profileInfos.join('<br/>')}`);
                                    });
                                    return (`<p class="historiesDefault"><b>${profile.name } :</b> <br/> ${childs.join('<br/>')} </p>`)
                                })
                                res.push(profiles.join(''));
                            }
                            //mortgage_result_bank
                            if (object.typeId === 164) {

                                //isSatisfactory
                                res.push(`<p class="historiesDefault"><b>${object.data.isSatisfactory ? `Đủ điều kiện vay` : `Không đủ điều kiện vay`}</b></p>`);
                                // banks
                                if (Array.isArray(object.data.banks)) {
                                    let banks = [];
                                    banks = object.data.banks.map(it => {
                                        return `<tr><td> ${it.name}</td> </tr>`;
                                    }).join('');
                                    const tableMorgage = `<table class="table table-bordered"><tbody><tr><th>Tên ngân hàng</th></tr>${banks}</tbody></table>`;
                                    res.push(tableMorgage);
                                }
                                // note
                                res.push(`<p class="historiesDefault"><b>Ghi chú:</b> ${object.data.note} </p>`);
                            }
                            if (object.typeId === 165) {
                                //BA mở lại nhu cầu vay vốn
                                res.push(`<p class="historiesDefault"><b>Hôn nhân:</b> ${object.data.isMarried ? 'Đã kết hôn' : 'Độc thân'} </p>`);
                                res.push(`<p class="historiesDefault"><b>Số tiền có sẵn:</b> ${object.data.initCapital ? object.data.initCapital : 0} </p>`);
                                res.push(`<p class="historiesDefault"><b>Số tiền cần vay:</b> ${object.data.loan ? object.data.loan : 0} </p>`);
                                res.push(`<p class="historiesDefault"><b>Số tiền trả NH gần nhất:</b> ${object.data.latestAmount ? object.data.latestAmount : 0} </p>`);

                                if (Array.isArray(object.data.documents)) {
                                    let documents = [];
                                    documents = object.data.documents.map(it => {
                                        return `<tr><td> ${it.channelTypeName}</td>  <td> ${it.income ? it.income : 'N/a'} </td> </tr>`;
                                    }).join('');
                                    const tableMorgage = `<table class="table table-bordered"><tbody><tr><th>Thu nhập từ</th><th>Số tiền</th></tr>${documents}</tbody></table>`;
                                    res.push(tableMorgage);
                                }
                            }
                            break;
                        }
                        case 2: {
                            if ([162, 163, 166, 167, 168, 169, 171].indexOf(object.typeId) > -1) {
                                const trcompare = object.compares.map(block => {
                                    let olds = [];
                                    let news = [];
                                    if (Array.isArray(block.olds)) {
                                        olds = block.olds.map(it => {
                                            return it.value;
                                        })
                                    }
                                    if (Array.isArray(block.news)) {
                                        news = block.news.map(it => {
                                            return it.value;
                                        })
                                    }
                                    return (`<tr><td> <b>${block.description} :</b>   ${olds.join(' - ')}  </td>  <td> <b>${block.description} : </b>  ${news.join(' - ')}  </td> </tr>`)
                                });
                                const tableCompare = `<table class="table table-bordered"><tbody><tr><th>Giá trị cũ</th><th>Giá trị mới</th></tr>${trcompare.join('')}</tbody></table>`;
                                res.push(tableCompare);
                            }
                            break;
                        }
                        default: {
                            if (object.typeId === 159) {
                                const trcompare = [];
                                // old value
                                trcompare.push(`<tr><td>${object.oldData.isSatisfactory ? `Đủ điều kiện vay` : `Không đủ điều kiện vay`}</td><td>${object.newData.isSatisfactory ? `Đủ điều kiện vay` : `Không đủ điều kiện vay`                                            }</td></tr>`);

                                // banks
                                const banksOld = object.oldData.banks.map(bank => {
                                    return (`
                                                <p class="historiesDefault">${bank.bankName}</p>
                                                <p class="historiesDefault"><b>Số tiền có thể vay:</b>${bank.bankName} - ${bank.interestRate1} - ${bank.maxLoanTerm} - ${bank.earlyRepaymentFee} - ${bank.maxLoanTerm} - ${bank.loanPrice}</p>
                                                <p class="historiesDefault"><b>Thời hạn vay:</b>${bank.loanYear}</p>`);
                                });
                                const banksNew = object.newData.banks.map(bank => {
                                    return (`
                                                <p class="historiesDefault">${bank.bankName}</p>
                                                <p class="historiesDefault"><b>Số tiền có thể vay:</b>${bank.bankName} - ${bank.interestRate1} - ${bank.maxLoanTerm} - ${bank.earlyRepaymentFee} - ${bank.maxLoanTerm} - ${bank.loanPrice}</p>
                                                <p class="historiesDefault"><b>Thời hạn vay:</b>${bank.loanYear}</p>`);
                                });
                                trcompare.push(`<tr><td><b>Ghi chú:</b>${banksOld}</td><td> <b>Ghi chú:</b>${banksNew}</td></tr>`);
                                //note
                                trcompare.push(`<tr><td><b>Ghi chú:</b>${object.oldData.note}</td><td> <b>Ghi chú:</b>${object.newData.note}</td></tr>`);
                                let tableCompare = `<table class="table table-bordered"><tbody><tr><th>Giá trị cũ</th><th>Giá trị mới</th></tr>${trcompare.join('')}</tbody></table>`;
                                tableCompare = tableCompare.replace(new RegExp('undefined', 'g'), 'N/A');
                                res.push(tableCompare);
                            }
                            break;
                        }
                    }
                }
            } else if (["mortgage_request_document_info"].indexOf(object.entity) > -1) {
                if (typeof(object.contentType) !== undefined) {
                    switch (object.contentType) {
                        case 1: {
                            break;
                        }
                        case 2: {

                            break;
                        }
                        default: {
                            const trcompare = [];

                            object.oldData.map((chanel, index) => {
                                trcompare.push(`<tr><td>${chanel.channelTypeName} <b>(${chanel.isRequired ? `Yêu cầu cập nhật` : `Đủ hồ sơ vay`})</b></td><td>${object.newData[index].channelTypeName} <b>(${object.newData[index].isRequired ? `Yêu cầu cập nhật` : `Đủ hồ sơ vay`})</b></td></tr>`);
                            });

                            trcompare.push(`<tr><td><b>Ghi chú:</b>${object.oldData.note}</td><td> <b>Ghi chú:</b>${object.newData.note}</td></tr>`);
                            let tableCompare = `<table class="table table-bordered"><tbody><tr><th>Giá trị cũ</th><th>Giá trị mới</th></tr>${trcompare.join('')}</tbody></table>`;
                            tableCompare = tableCompare.replace(new RegExp('undefined', 'g'), 'N/A');
                            res.push(tableCompare);
                            // }
                            break;
                        }
                    }
                }
            } else if (object.entity == 'deal_check_planning') {
                switch (object.contentType) {
                    case 1:
                        if (object.action == 'create' || object.action == 'update') {
                            res.push('<div class="historiesDefault"><b>- Listing IDs: </b>' + object.rListingIDs + '</div>');
                            res.push('<div class="historiesDefault"><b>- Thời gian: </b>' + moment.unix(object.scheduleTime / 1000).format("DD-MM-YYYY") + '</div>');
                        } else if (object.action == 'delete') {
                            res.push(object.typeName);
                        }
                        break;
                    default:
                        res.push("N/A");
                }
            } else {
                errMess.push("Không tồn tại entity");
            }
        }

        if (errMess.length > 0) {
            return errMess;
        } else {
            // res.push("<div style='text-align:right'><a class='hideMoreHistories' onClick='hideMoreHistoriesDetail(this);return false;' href='#'>Bấm để ẩn thông tin <i class='fa fa-angle-up' ></i></a></div>");
            return res;
        }
    }

    function renderQuestionForm(data) {
        data = {
            'resultQuestion': JSON.stringify(data)
        };
        var returnProfile = '';
        $.ajax({
            async: false,
            url: "/deal-history/render-profile",
            type: "post",
            data: data
        }).done(function(response) {
            returnProfile = response;
        })
        return returnProfile;
    }

    function renderChangeHistories(data, type, object) {
        var render = "";
        var res = groupByEntity(object);
        $.each(res, function(key, value) {
            render += value;
        });
        return '<div class="view_more_history">' + render + '</div>';
    }
    var countEventCheckbox = 0;

    function historyDatatable(url = "/deal-history/store-histories/{{ $id }}/{{ $type }}") {
        $("#historiesTable").one('xhr.dt', function(e, settings, json, xhr) {
            countEventCheckbox++;
            var filter = json.response.data.filter.filter;
            var GlobalfilterArray = [],
                GlobalInfofilterArray = [];
            $.each(filter, function(k, v) {
                if (v.columnName == "action") {
                    GlobalfilterArray = v.value;
                }
                if (v.columnName == "typeId") {
                    GlobalInfofilterArray = v.value;
                }
            })
            if (!$.isEmptyObject(GlobalfilterArray)) {
                var contentFilter = '';
                $.each(GlobalfilterArray, function(k, v) {
                    var checked = "";
                    if (dataFilter.actionFilter.includes(v)) {
                        checked = "checked='checked'";
                    }
                    contentFilter += "<div class=\"checkbox\"><label><input " + checked + " class='checkboxAction' type='checkbox' value='" + v + "'>" + v + "</label></div>";
                });
            }
            $('.filterActionTooltip').html(contentFilter);

            if (!$.isEmptyObject(GlobalInfofilterArray)) {
                var contentFilter = '';
                $.each(GlobalInfofilterArray, function(k, v) {
                    var checked = "";
                    if (dataFilter.typeNameFiler.includes(v.typeId + '')) {
                        checked = "checked='checked'";
                    }
                    contentFilter += "<div class=\"checkbox\"><label><input " + checked + " class='checkboxTypeName' type='checkbox' value='" + v.typeId + "'>" + v.typeName + "</label></div>";
                });
                $('.filterInfoActionTooltip').html(contentFilter);
            }

            if (countEventCheckbox == 1) {
                $(document).on('click', '.checkboxTypeName,.checkboxAction', function(e) {
                    var selectTypeName = JSON.parse($("#selectTypeName").val());
                    var selectAction = JSON.parse($("#selectAction").val());
                    if (this.checked) {
                        if ($(e.target).hasClass('checkboxTypeName')) {
                            selectTypeName.push($(this).val());
                            $("#selectTypeName").val(JSON.stringify(selectTypeName));
                        } else {
                            selectAction.push($(this).val());
                            $("#selectAction").val(JSON.stringify(selectAction));
                        }
                    } else {
                        if ($(e.target).hasClass('checkboxTypeName')) {
                            selectTypeName.splice(selectTypeName.indexOf($(this).val()), 1);
                            $("#selectTypeName").val(JSON.stringify(selectTypeName));
                        } else {
                            selectAction.splice(selectAction.indexOf($(this).val()), 1);
                            $("#selectAction").val(JSON.stringify(selectAction));
                        }
                    }
                });
                $('[data-toggle=popover]').popover({
                    container: 'body',
                    html: true,
                    trigger: 'click',
                    content: function() {
                        var clone = $($(this).data('popover-content')).removeClass('hide');
                        return clone.html();
                    }
                });
                $('body').on('click', function(e) {
                    $('[data-toggle="popover"]').each(function() {
                        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                            $(this).popover('hide');
                        }
                    });
                });
            }

        }).DataTable({
            "processing": true,
            "searching": false,
            "serverSide": true,
            "ajax": url,
            "scrollX": false,
            "lengthChange": false,
            "drawCallback": function() {
                // $('.showMoreHistories').each(function(){
                //     $(this).siblings().hide();
                // })
                $('.view_more_history').showMore({
                    minheight: 80,
                    buttontxtmore: "xem thêm <i class='fa fa-angle-down' ></i>",
                    buttontxtless: "thu gọn <i class='fa fa-angle-up' ></i>",

                });

                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                pagination.toggle(this.api().page.info().pages > 1);
            },
            "columns": [{
                    data: 'createdDate',
                    render: dateTimeRenderHistories
                },
                {
                    data: 'action',
                    orderable: false
                },
                {
                    data: 'typeName',
                    orderable: false
                },
                {
                    data: 'createdDate',
                    orderable: false,
                    render: renderChangeHistories
                },
                {
                    data: 'createdByName',
                    orderable: false
                }
            ],
            "order": [
                [0, 'desc']
            ],
            "language": {
                "paginate": {
                    previous: "<",
                    next: ">",
                    first: "|<",
                    last: ">|"
                },
                "info": "Trang _PAGE_ của _PAGES_",
                "emptyTable": "Chưa có lịch sử thay đổi",
                "infoEmpty": "",
            },
            "initComplete": function(settings, json) {
                //
                // showPropzyLoading();
            }
        });
    }
</script>

<!-- script lightbox here -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.min.js" integrity="sha512-Y2IiVZeaBwXG1wSV7f13plqlmFOx8MdjuHyYFVoYzhyRr3nH/NMDjTBSswijzADdNzMyWNetbLMfOpIPl6Cv9g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
    // #code
    $(document).ready(()=>{
        // delegate calls to data-toggle="lightbox"
            $(document).delegate('*[data-toggle="lightbox"]:not([data-gallery="navigateTo"])', 'click', function(event) {
                event.preventDefault();
                return $(this).ekkoLightbox({
                    onShown: function() {
                        if (window.console) {
                            return console.log('onShown event fired');
                        }
                    },
                    onContentLoaded: function() {
                        if (window.console) {
                            return console.log('onContentLoaded event fired');
                        }
                    },
                    onNavigate: function(direction, itemIndex) {
                        if (window.console) {
                            return console.log('Navigating '+direction+'. Current item: '+itemIndex);
                        }
                    }
                });
            });
    })
</script>
<!-- /script lightbox here -->
@stop