@extends('layout.default')
@section('content')
<!-- nội dung của các page để ở đây. -->
<h4>KPI Setting</h4>
<div style="position:relative">
    <div style="width:1000px; margin: 0 auto">
        <div class="grid-header" style="width:100%">
            <!-- <label>KPI Setting</label> -->
            <!-- <span style="float:right" class="ui-icon ui-icon-search" title="Toggle search panel"
            onclick="toggleFilterRow()"></span> -->
        </div>
        <div class="row">
            <div class="col-md-5">
                <div class="row">
                    <div class="col-md-10" style="padding-right:0px">
                        <input id="searchString" placeholder="Nhập để tìm kiếm" class="form-control"/>
                    </div>
                    <div class="col-md-2" style="padding-left:0px">
                        <button style="float: right" class="btn btn-default" id="searchButton">Tìm kiếm</button> 
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <select id="listingTypes" class="form-control">
                    <option value="1">Mua</option>
                    <option value="2">Thuê</option>
                </select>
            </div>

            <div class="col-md-4">
                <select class="form-control" id="date" style="float: right">

                <script>
                    var d = new Date();
                    var m = d.getMonth() + 1;
                    var y = d.getFullYear();
                    var m1 = (m - 1) <= 0 ? (m - 1 + 12) + "/" + (y - 1) : (m - 1) + "/" + y;;
                    var m2 = (m - 2) <= 0 ? (m - 2 + 12) + "/" + (y - 1) : (m - 2) + "/" + y;;
                    var m3 = (m - 3) <= 0 ? (m - 3 + 12) + "/" + (y - 1) : (m - 3) + "/" + y;
                    var m4 = (m - 4) <= 0 ? (m - 4 + 12) + "/" + (y - 1) : (m - 4) + "/" + y;
                    document.write("<option>Tháng " + (m + 1) + "/" + y + "</option>");
                    document.write("<option selected>Tháng " + (m) + "/" + y + "</option>");
                    document.write("<option>Tháng " + m1 + "</option>");
                    document.write("<option>Tháng " + m2 + "</option>");
                    document.write("<option>Tháng " + m3 + "</option>");
                    document.write("<option>Tháng " + m4 + "</option>");
                </script>

                <!-- <option default selected>Tháng <script>document.write(m)</script>/<script>document.write(y)</script>  </option>
                <option>Tháng <script>document.write(m-1)</script>/<script>document.write(y)</script>  </option>
                <option>Tháng <script>document.write(m-2)</script>/<script>document.write(y)</script>  </option>
                <option>Tháng <script>document.write(m-3)</script>/<script>document.write(y)</script>  </option>
                <option>Tháng <script>document.write(m-4)</script>/<script>document.write(y)</script>  </option> -->
                </select>
            </div>
        </div>
        <br />
        <br />
        <div id="myGrid" style="width:99%;height:300px;"></div>
        <!-- <div id="pager" style="width:100%;height:20px;"></div> -->
        <br />
        <br />
        <div style="text-align: right">
            <ul id="pagination" class="pagination-sm"></ul>
        </div>
        <!-- Modal -->
        <div id="baModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close closeDetailBa" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" style="display: inline-block">KPI (Month to date)</h4>
                        <div class="pull-right" style="display: inline-block; margin-right: 20px">
                            <label class="checkbox-inline"><input type="checkbox" id="mua" checked value="" style="height: 20px; width: 20px"><span style="line-height: 30px">Mua</span></label>
                            <label class="checkbox-inline"><input type="checkbox" id="thue" checked value="" style="height: 20px; width: 20px"><span style="line-height: 30px">Thuê</span></label>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="col-xs-6">
                            Deal đã chốt
                        </div>
                        <div id="dealNumber" class="col-xs-6 text-right">
                            Number
                        </div>
                        <div class="col-xs-12">
                            <div class="progress">
                                <div id="dealPercent" class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            Doanh thu
                        </div>
                        <div id="revenueNumber" class="col-xs-6 text-right">
                            Number
                        </div>
                        <div class="col-xs-12">
                            <div class="progress">
                                <div id="revenuePercent" class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="closeDetailBa" type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="options-panel"> -->
</div>
</div>
@endsection
@section('page-js')
<script src="{{loadAsset('/js/kpi-setting/firebugx.js')}}"></script>
<!-- <script src="{{loadAsset('/js/kpi-setting/jquery-1.12.4.min.js')}}"></script> -->
<script src="{{loadAsset('/js/kpi-setting/jquery-ui.min.js')}}"></script>
<script src="{{loadAsset('/js/kpi-setting/jquery.event.drag-2.3.0.js')}}"></script>
<script src="{{loadAsset('/js/kpi-setting/slick.core.js')}}"></script>
<script src="{{loadAsset('/js/kpi-setting/slick.formatters.js')}}"></script>
<script src="{{loadAsset('/js/kpi-setting/slick.editors.js')}}"></script>
<script src="{{loadAsset('/js/kpi-setting/slick.rowselectionmodel.js')}}"></script>
<script src="{{loadAsset('/js/kpi-setting/slick.grid.js')}}"></script>
<script src="{{loadAsset('/js/kpi-setting/slick.dataview.js')}}"></script>
<script src="{{loadAsset('/js/kpi-setting/slick.pager.js')}}"></script>
<script src="{{loadAsset('/js/kpi-setting/slick.columnpicker.js')}}"></script>
<script src="{{loadAsset('/js/kpi-setting/jquery.twbsPagination.min.js')}}"></script>
<script>
    function isIEPreVer9() {
        var v = navigator.appVersion.match(/MSIE ([\d.]+)/i);
        return (v ? v[1] < 9 : false);
    }
    var initTable;
    var dataView;
    var grid;
    var data = [];
    var columns = [{
            id: "seq",
            name: "#",
            field: "seq",
            // behavior: "select",
            // cssClass: "cell-selection",
            width: 40,
            // cannotTriggerInsert: true,
            // resizable: false,
            // selectable: false,
            // excludeFromColumnPicker: true
        },
        {
            id: "name",
            name: "Tên",
            field: "name",
            width: 450,
            minWidth: 120,
            cssClass: "cell-title",
            // editor: Slick.Editors.Text,
            // validator: requiredFieldValidator,
            // sortable: true
            formatter: linkFormatter = function(row, cell, value, columnDef, dataContext) {
                //<a href="#/Link/' + dataContext['id'] + '">
                return '<a href="" data-toggle="modal" data-target="#baModal" class="openModal"><span style="color: blue">' + value + '</a><span></a>';
            }
        },
        {
            id: "numberDeal",
            name: "Số lượng deal phải chốt",
            field: "numberDeal",
            width: 250,
            editor: Slick.Editors.CustomEditor,
            // editorFixedDecimalPlaces: 3,
            sortable: true
        },
        {
            id: "commission",
            defaultSortAsc: false,
            name: "Doanh Thu",
            field: "commission",
            width: 250,
            // resizable: false,
            // formatter: Slick.Formatters.PercentCompleteBar,
            editor: Slick.Editors.CustomEditor,
            sortable: true
        },
    ];
    var options = {
        columnPicker: {
            columnTitle: "Columns",
            hideForceFitButton: false,
            hideSyncResizeButton: false,
            forceFitTitle: "Force fit columns",
            syncResizeTitle: "Synchronous resize",
        },
        editable: true,
        enableAddRow: false,
        enableCellNavigation: true,
        asyncEditorLoading: true,
        forceFitColumns: true,
        topPanelHeight: 5,
        autoHeight: true
    };
    var sortcol = "title";
    var sortdir = 1;
    var percentCompleteThreshold = 0;
    var searchString = "";

    function requiredFieldValidator(value) {
        if (value == null || value == undefined || !value.length) {
            return {
                valid: false,
                msg: "This is a required field"
            };
        } else {
            return {
                valid: true,
                msg: null
            };
        }
    }

    function myFilter(item, args) {
        if (item["percentComplete"] < args.percentCompleteThreshold) {
            return false;
        }
        if (args.searchString != "" && item["title"].indexOf(args.searchString) == -1) {
            return false;
        }
        return true;
    }

    function percentCompleteSort(a, b) {
        return a["percentComplete"] - b["percentComplete"];
    }

    function comparer(a, b) {
        var x = a[sortcol],
            y = b[sortcol];
        return (x == y ? 0 : (x > y ? 1 : -1));
    }

    function toggleFilterRow() {
        grid.setTopPanelVisibility(!grid.getOptions().showTopPanel);
    }
    $(".grid-header .ui-icon")
        .addClass("ui-state-default ui-corner-all")
        .mouseover(function(e) {
            $(e.target).addClass("ui-state-hover")
        })
        .mouseout(function(e) {
            $(e.target).removeClass("ui-state-hover")
        });
    $(function() {
        // prepare the data
        function renderView() {
            getBa();
            dataView.setItems(data);
            grid.invalidate();
            $('#pagination').twbsPagination('destroy');
            $('#pagination').twbsPagination({
                initiateStartPageClick: false,
                totalPages: totalPages ? totalPages : 1,
                first: 'Trang đầu',
                prev: 'Trở lại',
                next: 'Kế tiếp',
                last: 'Trang cuối',
                onPageClick: (page, currentPage) => {
                    getBa(currentPage);
                    dataView.setItems(data);
                    grid.invalidate();
                }
            });
        }
        $('#searchString').keypress(function(event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                renderView();
            }
        });
        $('#searchButton').click(function() {
            renderView();
        });

        $("#listingTypes").change(()=>{
            renderView();
        })

        $('#date').change(function() {
            renderView();
            let selectedDate = $("#date").find(":selected").val().replace('Tháng ', '').replace('/', '');
            //grid = new Slick.Grid("#myGrid", dataView, columns, options);
            if (selectedDate < m + "" + y) {
                console.log(grid);
                let newColumns = [{
                        id: "seq",
                        name: "#",
                        field: "seq",
                        // behavior: "select",
                        // cssClass: "cell-selection",
                        width: 40,
                    },
                    {
                        id: "name",
                        name: "Tên",
                        field: "name",
                        width: 450,
                        minWidth: 120,
                        cssClass: "cell-title",
                        //editor: Slick.Editors.Text,
                        // validator: requiredFieldValidator,
                        // sortable: true
                        formatter: linkFormatter = function(row, cell, value, columnDef, dataContext) {
                            //<a href="#/Link/' + dataContext['id'] + '">
                            return '<a href="" data-toggle="modal" data-target="#baModal" class="openModal"><span style="color: blue">' + value + '</a><span></a>';
                        }
                    },
                    {
                        id: "numberDeal",
                        name: "Số lượng deal phải chốt",
                        field: "numberDeal",
                        width: 250,
                        //editor: Slick.Editors.Text,
                        sortable: true
                    },
                    {
                        id: "commission",
                        defaultSortAsc: false,
                        name: "Doanh Thu",
                        field: "commission",
                        width: 250,
                        sortable: true
                    },
                ];
                //     grid = new Slick.Grid("#myGrid", dataView, newColumns, options);
                grid.setColumns(newColumns);
            } else {
                grid.setColumns(columns);
            }
        });
        getBa();
        var totalPages;

        function getBa(currentPage = 1) {
            showPropzyLoading();
            $.ajax({
                url: "/kpi-setting/getBa",
                dataType: 'json',
                data: {
                    currentPage: currentPage,
                    textSearch: $("#searchString").val(),
                    date: $("#date").find(":selected").val(),
                    listingTypes:[$("#listingTypes").val()]
                },
                async: false,
                success: onSuccess,
                error: function() {
                    //onError(fromPage, toPage)
                }
            });
        }
        $('#pagination').twbsPagination({
            totalPages: totalPages,
            //visiblePages: 10,
            startPage: 1,
            initiateStartPageClick: false,
            first: 'Trang đầu',
            prev: 'Trở lại',
            next: 'Kế tiếp',
            last: 'Trang cuối',
            onPageClick: (page, currentPage) => {
                getBa(currentPage);
                dataView.setItems(data);
                grid.invalidate();
            }
        });
        //onSuccess();
        function onSuccess(resp) {
            hidePropzyLoading();
            data = [];
            if (resp.data.list !== undefined && resp.data.list.length !== 0) {
                for (var i = 0; i < resp.data.list.length; i++) {
                    var d = (data[i] = {});
                    d["id"] = resp.data.list[i].userId + "_" + i;
                    d["seq"] = i + 1;
                    d["name"] = resp.data.list[i].name;
                    d["numberDeal"] = number_format(resp.data.list[i].numberDeal);
                    //d["numberDeal"] = resp.data.list[i].numberDeal;
                    d["commission"] = number_format(resp.data.list[i].commission);
                    //d["commission"] = resp.data.list[i].commission;
                }
            } else {
                data = [];

            }
            totalPages = resp.data.totalPages;
            console.log("data", data);
            initTable = true;
        }
        dataView = new Slick.Data.DataView({
            inlineFilters: true
        });
        grid = new Slick.Grid("#myGrid", dataView, columns, options);
        grid.setSelectionModel(new Slick.RowSelectionModel());

        // dataView.setPagingOptions({
        //     pageSize: 5,
        // });

        //var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
        var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);
        // move the filter panel defined in a hidden div into grid top panel
        $("#inlineFilterPanel")
            .appendTo(grid.getTopPanel())
            .show();
        grid.onCellChange.subscribe(function(e, args) {
            dataView.updateItem(args.item.id, args.item);
        });

        function mua() {
            $("#dealNumber").text(detailBaResp.data.sell.numberDeal + " / " + (detailBaResp.data.numberDealConfig ? detailBaResp.data.numberDealConfig : "0") );
            $("#revenueNumber").text(detailBaResp.data.sell.formatTotalCommission + " / " + detailBaResp.data.formatCommissionConfig);
            $('#dealPercent').css({
                'width': (detailBaResp.data.sell.numberDealPercent * 100) + "%"
            });
            $('#revenuePercent').css({
                'width': (detailBaResp.data.sell.totalCommissionPercent * 100) + "%"
            });

            $("#dealPercent").removeClass("progress-bar-danger");
            $("#dealPercent").removeClass("progress-bar-warning");
            $('#dealPercent').removeClass('progress-bar-success');
            $("#revenuePercent").removeClass("progress-bar-danger");
            $("#revenuePercent").removeClass("progress-bar-warning");
            $('#revenuePercent').removeClass('progress-bar-success');

            if (detailBaResp.data.sell.numberDealPercent * 100 < 50) {
                $('#dealPercent').addClass('progress-bar-danger');
                //$('#revenuePercent').addClass('progress-bar-danger');
            } else if (detailBaResp.data.sell.numberDealPercent * 100 >= 50 && detailBaResp.data.sell.numberDealPercent * 100 <= 75) {
                $('#dealPercent').addClass('progress-bar-warning');
                //$('#revenuePercent').addClass('progress-bar-warning');
            } else {
                $('#dealPercent').addClass('progress-bar-success');
                //$('#revenuePercent').addClass('progress-bar-success');
            }

            if (detailBaResp.data.sell.totalCommissionPercent * 100 < 50) {
                $('#revenuePercent').addClass('progress-bar-danger');
            } else if (detailBaResp.data.sell.totalCommissionPercent * 100 >= 50 && detailBaResp.data.sell.totalCommissionPercent * 100 <= 75) {
                $('#revenuePercent').addClass('progress-bar-warning');
            } else {
                $('#revenuePercent').addClass('progress-bar-success');
            }
        }

        function thue() {

            $("#dealNumber").text(detailBaResp.data.rent.numberDeal + " / " + (detailBaResp.data.numberDealConfig ? detailBaResp.data.numberDealConfig : "0"));
            $("#revenueNumber").text(detailBaResp.data.rent.formatTotalCommission + " / " + detailBaResp.data.formatCommissionConfig);
            $('#dealPercent').css({
                'width': (detailBaResp.data.rent.numberDealPercent * 100) + "%"
            });
            $('#revenuePercent').css({
                'width': (detailBaResp.data.rent.totalCommissionPercent * 100) + "%"
            });

            $("#dealPercent").removeClass("progress-bar-danger");
            $("#dealPercent").removeClass("progress-bar-warning");
            $('#dealPercent').removeClass('progress-bar-success');
            $("#revenuePercent").removeClass("progress-bar-danger");
            $("#revenuePercent").removeClass("progress-bar-warning");
            $('#revenuePercent').removeClass('progress-bar-success');

            if (detailBaResp.data.rent.numberDealPercent * 100 < 50) {
                $('#dealPercent').addClass('progress-bar-danger');
                //$('#revenuePercent').addClass('progress-bar-danger');
            } else if (detailBaResp.data.rent.numberDealPercent * 100 >= 50 && detailBaResp.data.rent.numberDealPercent * 100 <= 75) {
                $('#dealPercent').addClass('progress-bar-warning');
                //$('#revenuePercent').addClass('progress-bar-warning');
            } else {
                $('#dealPercent').addClass('progress-bar-success');
                //$('#revenuePercent').addClass('progress-bar-success');
            }

            if (detailBaResp.data.rent.totalCommissionPercent * 100 < 50) {
                $('#revenuePercent').addClass('progress-bar-danger');
            } else if (detailBaResp.data.rent.totalCommissionPercent * 100 >= 50 && detailBaResp.data.rent.totalCommissionPercent * 100 <= 75) {
                $('#revenuePercent').addClass('progress-bar-warning');
            } else {
                $('#revenuePercent').addClass('progress-bar-success');
            }
        }

        function muaThue() {

            $("#dealPercent").removeClass("progress-bar-danger");
            $("#dealPercent").removeClass("progress-bar-warning");
            $('#dealPercent').removeClass('progress-bar-success');
            $("#revenuePercent").removeClass("progress-bar-danger");
            $("#revenuePercent").removeClass("progress-bar-warning");
            $('#revenuePercent').removeClass('progress-bar-success');

            //mua bán checked
            $("#dealNumber").text(detailBaResp.data.sell.numberDeal + " mua - " + detailBaResp.data.rent.numberDeal + " thuê / " + (detailBaResp.data.numberDealConfig ? detailBaResp.data.numberDealConfig : "0"));
            $("#revenueNumber").text(detailBaResp.data.sell.formatTotalCommission + " mua - " + detailBaResp.data.rent.formatTotalCommission + " thuê / " + detailBaResp.data.formatCommissionConfig);
            $('#dealPercent').css({
                'width': (detailBaResp.data.sell.numberDealPercent * 100) + (detailBaResp.data.rent.numberDealPercent * 100) + "%"
            });
            $('#revenuePercent').css({
                'width': (detailBaResp.data.sell.totalCommissionPercent * 100) + (detailBaResp.data.rent.totalCommissionPercent * 100) + "%"
            });

            if ((detailBaResp.data.sell.numberDealPercent * 100) + (detailBaResp.data.rent.numberDealPercent * 100) < 50) {
                $('#dealPercent').addClass('progress-bar-danger');
                //$('#revenuePercent').addClass('progress-bar-danger');
            } else if ((detailBaResp.data.sell.numberDealPercent * 100) + (detailBaResp.data.rent.numberDealPercent * 100) >= 50 && (detailBaResp.data.sell.numberDealPercent * 100) + (detailBaResp.data.rent.numberDealPercent * 100) <= 75) {
                $('#dealPercent').addClass('progress-bar-warning');
                //$('#revenuePercent').addClass('progress-bar-warning');
            } else {
                $('#dealPercent').addClass('progress-bar-success');
                //$('#revenuePercent').addClass('progress-bar-success');
            }

            if ((detailBaResp.data.sell.totalCommissionPercent * 100) + (detailBaResp.data.rent.totalCommissionPercent * 100) < 50) {
                //$('#dealPercent').addClass('progress-bar-danger');
                $('#revenuePercent').addClass('progress-bar-danger');
            } else if ((detailBaResp.data.sell.totalCommissionPercent * 100) + (detailBaResp.data.rent.totalCommissionPercent * 100) >= 50 && (detailBaResp.data.sell.totalCommissionPercent * 100) + (detailBaResp.data.rent.totalCommissionPercent * 100) <= 75) {
                //$('#dealPercent').addClass('progress-bar-warning');
                $('#revenuePercent').addClass('progress-bar-warning');
            } else {
                //$('#dealPercent').addClass('progress-bar-success');
                $('#revenuePercent').addClass('progress-bar-success');
            }

        }
        $('#mua').click(function() {
            if ($('#mua').is(":checked") && $('#thue').is(":checked")) {
                muaThue();
            }
            //thue code here
            else {
                $('#thue').prop("checked", true);
                thue();
            }
        });
        $('#thue').click(function() {
            if ($('#thue').is(":checked") && $('#mua').is(":checked")) {
                muaThue();
            }
            //mua code here
            else {
                $('#mua').prop("checked", true);
                mua();
            }
        });

        $('.closeDetailBa').click(function() {
            $('#mua').prop("checked", true);
            $('#thue').prop("checked", true);
        });
        var detailBaResp;
        grid.onClick.subscribe(function(e, args) {
            if (args.cell == 1) {
                showPropzyLoading();
                $.ajax({
                    url: "/kpi-setting/getdetailba",
                    dataType: 'json',
                    data: {
                        userIds: data[args.row].id.split("_")[0],
                    },
                    async: false,
                    success: function(resp) {
                        hidePropzyLoading();
                        console.log(resp);
                        detailBaResp = resp;
                        muaThue();
                    },
                    error: function() {}
                });
            }

        });
        grid.onAddNewRow.subscribe(function(e, args) {
            var item = {
                "num": data.length,
                "id": "new_" + (Math.round(Math.random() * 10000)),
                "title": "New task",
                "duration": "1 day",
                "percentComplete": 0,
                "start": "01/01/2009",
                "finish": "01/01/2009",
                "effortDriven": false
            };
            $.extend(item, args.item);
            dataView.addItem(item);
        });
        grid.onKeyDown.subscribe(function(e) {
            // select all rows on ctrl-a
            if (e.which != 65 || !e.ctrlKey) {
                return false;
            }
            var rows = [];
            for (var i = 0; i < dataView.getLength(); i++) {
                rows.push(i);
            }
            grid.setSelectedRows(rows);
            e.preventDefault();
        });
        grid.onSort.subscribe(function(e, args) {
            sortdir = args.sortAsc ? 1 : -1;
            sortcol = args.sortCol.field;
            if (isIEPreVer9()) {
                // using temporary Object.prototype.toString override
                // more limited and does lexicographic sort only by default, but can be much faster
                var percentCompleteValueFn = function() {
                    var val = this["percentComplete"];
                    if (val < 10) {
                        return "00" + val;
                    } else if (val < 100) {
                        return "0" + val;
                    } else {
                        return val;
                    }
                };
                // use numeric sort of % and lexicographic for everything else
                dataView.fastSort((sortcol == "percentComplete") ? percentCompleteValueFn : sortcol, args.sortAsc);
            } else {
                // using native sort with comparer
                // preferred method but can be very slow in IE with huge datasets
                dataView.sort(comparer, args.sortAsc);
            }
        });
        // wire up model events to drive the grid
        // !! both dataView.onRowCountChanged and dataView.onRowsChanged MUST be wired to correctly update the grid
        // see Issue#91
        dataView.onRowCountChanged.subscribe(function(e, args) {
            grid.updateRowCount();
            grid.render();
        });
        dataView.onRowsChanged.subscribe(function(e, args) {
            grid.invalidateRows(args.rows);
            grid.render();
            if (initTable == false) {
                $.ajax({
                    url: "/kpi-setting/editBa",
                    dataType: 'json',
                    data: {
                        userId: data[args.rows].id.split("_")[0],
                        date: $("#date").find(":selected").val(),
                        numberDeal: data[args.rows].numberDeal,
                        commission: data[args.rows].commission,
                    },
                    async: false,
                    success: function(resp) {
                        console.log("resp", resp);
                    },
                    error: function() {}
                });
            }
            initTable = false;
        });

        dataView.onPagingInfoChanged.subscribe(function(e, pagingInfo) {
            grid.updatePagingStatusFromView(pagingInfo);
            // show the pagingInfo but remove the dataView from the object, just for the Cypress E2E test
            delete pagingInfo.dataView;
            console.log('on After Paging Info Changed - New Paging:: ', pagingInfo);
        });
        dataView.onBeforePagingInfoChanged.subscribe(function(e, previousPagingInfo) {
            // show the previous pagingInfo but remove the dataView from the object, just for the Cypress E2E test
            delete previousPagingInfo.dataView;
            console.log('on Before Paging Info Changed - Previous Paging:: ', previousPagingInfo);
        });
        var h_runfilters = null;
        // wire up the slider to apply the filter to the model
        $("#pcSlider,#pcSlider2").slider({
            "range": "min",
            "slide": function(event, ui) {
                Slick.GlobalEditorLock.cancelCurrentEdit();
                if (percentCompleteThreshold != ui.value) {
                    window.clearTimeout(h_runfilters);
                    h_runfilters = window.setTimeout(updateFilter, 10);
                    percentCompleteThreshold = ui.value;
                }
            }
        });
        // wire up the search textbox to apply the filter to the model
        $("#txtSearch,#txtSearch2").keyup(function(e) {
            Slick.GlobalEditorLock.cancelCurrentEdit();
            // clear on Esc
            if (e.which == 27) {
                this.value = "";
            }
            searchString = this.value;
            updateFilter();
        });

        function updateFilter() {
            dataView.setFilterArgs({
                percentCompleteThreshold: percentCompleteThreshold,
                searchString: searchString
            });
            dataView.refresh();
        }
        $("#btnSelectRows").click(function() {
            if (!Slick.GlobalEditorLock.commitCurrentEdit()) {
                return;
            }
            var rows = [];
            for (var i = 0; i < 10 && i < dataView.getLength(); i++) {
                rows.push(i);
            }
            grid.setSelectedRows(rows);
        });
        // initialize the model after all the events have been hooked up
        dataView.beginUpdate();
        dataView.setItems(data);
        dataView.setFilterArgs({
            percentCompleteThreshold: percentCompleteThreshold,
            searchString: searchString
        });
        dataView.setFilter(myFilter);
        dataView.endUpdate();
        // if you don't want the items that are not visible (due to being filtered out
        // or being on a different page) to stay selected, pass 'false' to the second arg
        dataView.syncGridSelection(grid, true);
        $("#gridContainer").resizable();
    })
</script>
@stop
@section('page-css')
<style>
    .cell-title {
        font-weight: bold;
    }

    .cell-effort-driven {
        text-align: center;
    }

    .cell-selection {
        border-right-color: silver;
        border-right-style: solid;
        background: #f5f5f5;
        color: gray;
        text-align: right;
        font-size: 10px;
    }

    .slick-row.selected .cell-selection {
        background-color: transparent;
        /* show default selected row background */
    }

    input.editor-text {
        width: 100%;
        height: 100%;
        border: 0;
        margin: 0;
        background: transparent;
        outline: 0;
        padding: 0;
    }
</style>

<link href="{{loadAsset('/css/kpi-setting/slick.grid.css') }}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/css/kpi-setting/slick.pager.css') }}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/css/kpi-setting/jquery-ui.css') }}" rel="stylesheet" type="text/css" />

<!-- <link href="{{loadAsset('/css/kpi-setting/examples.css') }}" rel="stylesheet" type="text/css" /> -->
<!-- <link href="{{loadAsset('/css/kpi-setting/slick.columnpicker.css') }}" rel="stylesheet" type="text/css" /> -->
@stop
