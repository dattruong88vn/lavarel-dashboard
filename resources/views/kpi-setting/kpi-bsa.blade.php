@extends('layout.default')
@section('content')
<!-- nội dung của các page để ở đây. -->
<h4>KPI Setting</h4>
<div style="position:relative">
    <div style="width:1077px; margin: 0 auto">
        <div class="grid-header" style="width:100%">
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
                    <option value="1">Bán</option>
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
        <!-- <div>
            <input id="searchString" placeholder="Nhập để tìm kiếm" style="width: 300px" />
            <button id="searchButton">Tìm kiếm</button>
            <select id="date" style="float: right; height: 26px">
                <script>
                    var d = new Date();
                    var m = d.getMonth() + 1;
                    var y = d.getFullYear();
                    var m1 = (m - 1) <= 0 ? (m - 1 + 12) + "/" + (y - 1) : (m - 1) + "/" + y;
                    var m2 = (m - 2) <= 0 ? (m - 2 + 12) + "/" + (y - 1) : (m - 2) + "/" + y;
                    var m3 = (m - 3) <= 0 ? (m - 3 + 12) + "/" + (y - 1) : (m - 3) + "/" + y;
                    var m4 = (m - 4) <= 0 ? (m - 4 + 12) + "/" + (y - 1) : (m - 4) + "/" + y;
                    document.write("<option>Tháng " + (m + 1) + "/" + y + "</option>");
                    document.write("<option selected>Tháng " + (m) + "/" + y + "</option>");
                    document.write("<option>Tháng " + m1 + "</option>");
                    document.write("<option>Tháng " + m2 + "</option>");
                    document.write("<option>Tháng " + m3 + "</option>");
                    document.write("<option>Tháng " + m4 + "</option>");
                </script>
            </select>
        </div> -->
        <br />
        <br />
        <div id="myGrid" style="width:98%;height:300px;"></div>
        <!-- <div id="pager" style="width:100%;height:20px;"></div> -->
        <br />
        <br />
        <div style="text-align: right">
            <ul id="pagination" class="pagination-sm"></ul>
        </div>
        <!-- Modal -->
        <div id="bsaModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">KPI Month to date</h4>
                    </div>
                    <div class="modal-body">
                        <p>BSA: <span id="bsaName">Name</span></p>
                        <div class="col-xs-6">Live listing balance</div>
                        <div class="col-xs-6 text-right" id="liveListingBalanceNumber">0/0</div>
                        <div class="col-xs-12">
                            <div class="progress">
                                <div id="liveListingBalancePercent" class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div style="display: inline">Live listing churn out</div>
                            <div id="liveListingChurnOutNumber" style="display: inline" class="pull-right">0/0</div>
                        </div>
                        <div class="col-xs-6">
                            <div style="display: inline">New live listing XL</div>
                            <div id="newLiveListingXLNumber" style="display: inline" class="pull-right">0/0</div>
                        </div>
                        <div class="col-xs-6">
                            <div class="progress">
                                <div id="liveListingChurnOutPercent" class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="progress">
                                <div id="newLiveListingXLPercent" class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div style="display: inline">Monetize XL</div>
                            <div id="monetizeXLNumber" style="display: inline" class="pull-right">0/0</div>
                        </div>
                        <div class="col-xs-6">
                            <div style="display: inline">Monetize</div>
                            <div id="monetizeNumber" style="display: inline" class="pull-right">0/0</div>
                        </div>
                        <div class="col-xs-6">
                            <div class="progress">
                                <div id="monetizeXLPercent" class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="progress">
                                <div id="monetizePercent" class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
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
            width: 250,
            minWidth: 120,
            cssClass: "cell-title",
            // editor: Slick.Editors.Text,
            // validator: requiredFieldValidator,
            // sortable: 
            formatter: linkFormatter = function(row, cell, value, columnDef, dataContext) {
                //<a href="#/Link/' + dataContext['id'] + '">
                return '<a href="" data-toggle="modal" data-target="#bsaModal" class="openModal"><span style="color: blue">' + value + '</a><span></a>';
            }
        },
        {
            id: "liveListingBalance",
            name: "Live listing Balance",
            field: "liveListingBalance",
            width: 175,
            editor: Slick.Editors.CustomEditor,
            sortable: true
        },
        {
            id: "liveListingChurnOut",
            defaultSortAsc: false,
            name: "Live listing ChurnOut",
            field: "liveListingChurnOut",
            width: 175,
            // resizable: false,
            // formatter: Slick.Formatters.PercentCompleteBar,
            editor: Slick.Editors.CustomEditor,
            sortable: true
        },
        {
            id: "newLiveListingXL",
            name: "New live listing XL",
            field: "newLiveListingXL",
            minWidth: 175,
            editor: Slick.Editors.CustomEditor,
            sortable: true
        },
        {
            id: "monetizeXL",
            name: "Monetize XL",
            field: "monetizeXL",
            width: 120,
            editor: Slick.Editors.CustomEditor,
            sortable: true
        },
        {
            id: "monetize",
            name: "Monetize",
            width: 120,
            cssClass: "cell-effort-driven",
            field: "monetize",
            // formatter: Slick.Formatters.Checkbox,
            editor: Slick.Editors.CustomEditor,
            cannotTriggerInsert: true,
            sortable: true
        }
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
        forceFitColumns: false,
        topPanelHeight: 1,
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
        function renderView() {
            getBsa();
            dataView.setItems(data);
            grid.invalidate();
            $('#pagination').twbsPagination('destroy');
            $('#pagination').twbsPagination({
                first: 'Trang đầu',
                prev: 'Trở lại',
                next: 'Kế tiếp',
                last: 'Trang cuối',
                initiateStartPageClick: false,
                totalPages: totalPages ? totalPages : 1,
                onPageClick: (page, currentPage) => {
                    getBsa(currentPage);
                    dataView.setItems(data);
                    grid.invalidate();
                }
            });
        }
        // prepare the data
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
                let newColumns = [{
                        id: "seq",
                        name: "#",
                        field: "seq",
                        width: 40,
                    },
                    {
                        id: "name",
                        name: "Tên",
                        field: "name",
                        width: 250,
                        minWidth: 120,
                        cssClass: "cell-title",
                        formatter: linkFormatter = function(row, cell, value, columnDef, dataContext) {
                            //<a href="#/Link/' + dataContext['id'] + '">
                            return '<a href="" data-toggle="modal" data-target="#bsaModal"><span style="color: blue">' + value + '</a><span></a>';
                        }
                    },
                    {
                        id: "liveListingBalance",
                        name: "Live listing Balance",
                        field: "liveListingBalance",
                        width: 175,
                        sortable: true
                    },
                    {
                        id: "liveListingChurnOut",
                        defaultSortAsc: false,
                        name: "Live listing ChurnOut",
                        field: "liveListingChurnOut",
                        width: 175,
                        sortable: true
                    },
                    {
                        id: "newLiveListingXL",
                        name: "New live listing XL",
                        field: "newLiveListingXL",
                        minWidth: 175,
                        sortable: true
                    },
                    {
                        id: "monetizeXL",
                        name: "Monetize XL",
                        field: "monetizeXL",
                        width: 120,
                        sortable: true
                    },
                    {
                        id: "monetize",
                        name: "Monetize",
                        width: 120,
                        cssClass: "cell-effort-driven",
                        field: "monetize",
                        cannotTriggerInsert: true,
                        sortable: true
                    }
                ];
                grid.setColumns(newColumns);
            } else {
                grid.setColumns(columns);
            }
        });
        getBsa();
        var totalPages;
        function getBsa(currentPage = 1) {
            showPropzyLoading();
            $.ajax({
                url: "/kpi-setting/getbsa",
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
                getBsa(currentPage);
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

                    d["liveListingBalance"] = number_format(resp.data.list[i].liveListingBalance);
                    d["liveListingChurnOut"] = number_format(resp.data.list[i].liveListingChurnOut);
                    d["newLiveListingXL"] = number_format(resp.data.list[i].newLiveListingXL);
                    d["monetizeXL"] = number_format(resp.data.list[i].monetizeXL);
                    d["monetize"] = number_format(resp.data.list[i].monetize);

                }
            } else {
                data = [];
            }
            totalPages = resp.data.totalPages;
            initTable = true;
        }
        dataView = new Slick.Data.DataView({
            inlineFilters: true
        });
        grid = new Slick.Grid("#myGrid", dataView, columns, options);
        grid.setSelectionModel(new Slick.RowSelectionModel());
        dataView.setPagingOptions({
            pageSize: 10,
        });
        //var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
        var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);
        // move the filter panel defined in a hidden div into grid top panel
        $("#inlineFilterPanel")
            .appendTo(grid.getTopPanel())
            .show();
        grid.onCellChange.subscribe(function(e, args) {
            dataView.updateItem(args.item.id, args.item);
        });
        grid.onClick.subscribe(function(e, args) {
            //event handling code.
            if (args.cell == 1) {
                showPropzyLoading();
                $('#bsaName').text(data[args.row].name);
                let selectedDate = $("#date").find(":selected").val().replace('Tháng ', '').split("/");
                let month = selectedDate[0];
                let year = selectedDate[1];
                $('#liveListingBalance').css({
                    'width': "100%"
                });
                $.ajax({
                    url: "/kpi-setting/getdetailbsa",
                    dataType: 'json',
                    data: {
                        userIds: data[args.row].id.split("_")[0],
                        configTime: Date.parse(year + "-" + month),
                    },
                    async: false,
                    success: function(resp) {
                        hidePropzyLoading();
                        console.log(resp);
                        $('#liveListingBalanceNumber').text(resp.data.liveListingBalance + "/" + resp.data.liveListingBalanceConfig);
                        $('#liveListingBalancePercent').css({
                            'width': resp.data.liveListingBalanceTarget * 100 + "%"
                        });

                        $("#liveListingBalancePercent").removeClass("progress-bar-danger");
                        $("#liveListingBalancePercent").removeClass("progress-bar-warning");
                        $('#liveListingBalancePercent').removeClass('progress-bar-success');
                        if (resp.data.liveListingBalanceTarget * 100 < 50) {
                            $('#liveListingBalancePercent').addClass('progress-bar-danger');   
                        } else if (resp.data.liveListingBalanceTarget * 100 >= 50 && resp.data.liveListingBalanceTarget * 100 <= 75) {
                            $('#liveListingBalancePercent').addClass('progress-bar-warning');
                        } else {
                            $('#liveListingBalancePercent').addClass('progress-bar-success');
                        }

                        $('#liveListingChurnOutNumber').text(resp.data.liveListingChurnOut + "/" + resp.data.liveListingChurnOutConfig);
                        $('#liveListingChurnOutPercent').css({
                            'width': resp.data.liveListingChurnOutTarget * 100 + "%"
                        });

                        $("#liveListingChurnOutPercent").removeClass("progress-bar-danger");
                        $("#liveListingChurnOutPercent").removeClass("progress-bar-warning");
                        $('#liveListingChurnOutPercent').removeClass('progress-bar-success');

                        if (resp.data.liveListingChurnOutTarget * 100 < 50) {
                            $('#liveListingChurnOutPercent').addClass('progress-bar-danger');
                        } else if (resp.data.liveListingChurnOutTarget * 100 >= 50 && resp.data.liveListingChurnOutTarget * 100 <= 75) {
                            $('#liveListingChurnOutPercent').addClass('progress-bar-warning');
                        } else {
                            $('#liveListingChurnOutPercent').addClass('progress-bar-success');
                        }
                        $('#newLiveListingXLNumber').text(resp.data.newLiveListingXL + "/" + resp.data.newLiveListingXLConfig);
                        $('#newLiveListingXLPercent').css({
                            'width': resp.data.newLiveListingXLTarget * 100 + "%"
                        });

                        $("#newLiveListingXLPercent").removeClass("progress-bar-danger");
                        $("#newLiveListingXLPercent").removeClass("progress-bar-warning");
                        $('#newLiveListingXLPercent').removeClass('progress-bar-success');

                        if (resp.data.newLiveListingXLTarget * 100 < 50) {
                            $('#newLiveListingXLPercent').addClass('progress-bar-danger');
                        } else if (resp.data.newLiveListingXLTarget * 100 >= 50 && resp.data.newLiveListingXLTarget * 100 <= 75) {
                            $('#newLiveListingXLPercent').addClass('progress-bar-warning');
                        } else {
                            $('#newLiveListingXLPercent').addClass('progress-bar-success');
                        }

                        $('#monetizeXLNumber').text(resp.data.monetizeXL + "/" + resp.data.monetizeXLConfig);
                        $('#monetizeXLPercent').css({
                            'width': resp.data.monetizeXLTarget * 100 + "%"
                        });

                        $("#monetizeXLPercent").removeClass("progress-bar-danger");
                        $("#monetizeXLPercent").removeClass("progress-bar-warning");
                        $('#monetizeXLPercent').removeClass('progress-bar-success');

                        if (resp.data.monetizeXLTarget * 100 < 50) {
                            $('#monetizeXLPercent').addClass('progress-bar-danger');
                        } else if (resp.data.monetizeXLTarget * 100 >= 50 && resp.data.monetizeXLTarget * 100 <= 75) {
                            $('#monetizeXLPercent').addClass('progress-bar-warning');
                        } else {
                            $('#monetizeXLPercent').addClass('progress-bar-success');
                        }

                        $("#monetizePercent").removeClass("progress-bar-danger");
                        $("#monetizePercent").removeClass("progress-bar-warning");
                        $('#monetizePercent').removeClass('progress-bar-success');
                        
                        $('#monetizeNumber').text(resp.data.monetize + "/" + resp.data.monetizeConfig);
                        $('#monetizePercent').css({
                            'width': resp.data.monetizeTarget * 100 + "%"
                        });

                        if (resp.data.monetizeTarget * 100 < 50) {
                            $('#monetizePercent').addClass('progress-bar-danger');
                        } else if (resp.data.monetizeTarget * 100 >= 50 && resp.data.monetizeTarget * 100 <= 75) {
                            $('#monetizePercent').addClass('progress-bar-warning');
                        } else {
                            $('#monetizePercent').addClass('progress-bar-success');
                        }
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
                    url: "/kpi-setting/editBsa",
                    dataType: 'json',
                    data: {
                        userId: data[args.rows].id.split("_")[0],
                        date: $("#date").find(":selected").val(),
                        liveListingBalance: data[args.rows].liveListingBalance,
                        liveListingChurnOut: data[args.rows].liveListingChurnOut,
                        newLiveListingXL: data[args.rows].newLiveListingXL,
                        monetizeXL: data[args.rows].monetizeXL,
                        monetize: data[args.rows].monetize
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