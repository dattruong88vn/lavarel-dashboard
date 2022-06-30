$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});


$("#sectionSelectDate").hide();
$("#fromDate").datepicker();
$("#toDate").datepicker();
var scoreTable = null;
$(".btn-filter").on("click", function (event) {
    $(".btn-filter").removeClass("active");
    $(this).addClass("active");
    event.preventDefault();
    $('#sectionFromToTable').show();
    $('#sectionToDayTable').hide();
    var type = $(this).attr("data-filter-type");
    var fromMoment = null;
    var toMoment = moment().endOf('day');
    if (scoreTable) {
        scoreTable.clear().draw();
    }
    $("#sectionSelectDate").hide();
    switch (type) {
        case "1":
            fromMoment = moment().startOf('day');
            getScoreTable(fromMoment, toMoment);
            break;
        case "2":
            fromMoment = moment().startOf('isoweek');
            //toMoment = moment().endOf('isoweek');            
            getScoreTable(fromMoment, toMoment);
            break;
        case "3":
            fromMoment = moment().startOf('month');
            //toMoment = moment().endOf('month');
            getScoreTable(fromMoment, toMoment);
            break;
        case "4":
            // xử lý cho chọn fromdate - todate
            if (scoreTable) {
                scoreTable.clear().draw();
                //scoreTable.destroy();
            }
            $("#sectionSelectDate").show();
            break;
    }
});


$(".btnViewFromTo").on("click", function () {
    var fromMoment = moment($("#fromDate").val());
    var toMoment = moment($("#toDate").val());
    console.log(fromMoment);
    console.log(toMoment);
    getScoreTable(fromMoment, toMoment);
});

function getSelectedLsIds() {
    var items = [];
    $(".lsItem:checked").each(function () {
        var value = $(this).val();
        items.push(value);
    });
    return items;
}

function getScoreTable(fromMoment, toMoment) {
    fromMoment = fromMoment.startOf("day");
    toMoment = toMoment.endOf("day");
    var lsIds = getSelectedLsIds();
    if (lsIds.length <= 0) {
        showPropzyAlert("Phải chọn LS");
        return false;
    }
    var postData = {
        "fromDate": fromMoment.unix() * 1000,
        "toDate": toMoment.unix() * 1000,
        "keySearch": getSelectedLsIds() + ""
    };
    showPropzyLoading();
    $.ajax({
        "url": "/credit/ls-target-from-to",
        "type": "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (scoreTable) {
            scoreTable.destroy();
            $("#scoreTable").empty();
        }
        $("#scoreTable thead").html("");
        var columns = [
            {title: "name", data: "1"}
        ];
        $(response.data.title).each(function ($index, item) {
            var column = {
                title: item,
                data: $index + 2 + "",
                render: renderDateItem
            };
            columns.push(column);
        });
        console.log(lastRow);
        var tableItems = [];
        $(response.data.list).each(function ($index, item) {
            var tableItem = {
                0: item.userId,
                1: item.lsName
            };
            var currentCol = 2;
            $(item.dailys).each(function ($subIndex, dateItem) {
                tableItem[currentCol + ""] = dateItem;
                currentCol++;
            });
            tableItems.push(tableItem);
            console.log(tableItem);
        });
        //console.log(tableItems)
        scoreTable = $("#scoreTable").DataTable({
            "searching": false,
            "paging": false,
            "ordering": false,
            "lengthChange": false,
            "data": tableItems,
            "scrollX":true,
            "columns": columns
        });

        if (response.data.percentRate && response.data.percentRate.length>0) {
            var lastRow = [];
            lastRow.push("");
            lastRow.push("");
            $(response.data.percentRate).each(function ($index, item) {
                lastRow.push(item.perRateBad + " / " + item.perRateGood + "");
            });
            scoreTable.row.add(lastRow).draw(false);
        }
    }).always(function () {
        hidePropzyLoading();
    });
}



var renderDateItem = function (data, type, object) {
    if (typeof (data) !== "object") {
        return data;
    }
    returnValue = data.rate;
    if (data.execution.trim() !== "") {
        returnValue += " ( " + data.execution + " / " + data.targetValue + " )";
    }
    return returnValue;
};



var lsListTable = null;
$(".btnSearchLs").on("click", function (event) {
    event.preventDefault();
    var lsSearchTerm = $(".lsSearchTerm").val();
    if (lsSearchTerm.trim() === "") {
        showPropzyAlert("Nhập từ khóa cần tìm!");
        return false;
    }
    var postData = {
        "term": lsSearchTerm
    };
    $.ajax({
        "url": "/credit/search-ls",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        if (lsListTable) {
            lsListTable.clear().draw();
        }
        if (response.result) {
            if (lsListTable) {
                lsListTable.destroy();
            }
            lsListTable = $('#lsList').DataTable({
                "paging": false,
                "lengthChange": false,
                "searching": false,
                "ordering": true,
                "info": false,
                "autoWidth": true,
                "data": response.data,
                "columns": [
                    {data: "userName", render: renderName},
                    {data: "districts"},
                    {data: "cities"}
                ]

            });
        }
    }).always(function () {

    });
});

var renderName = function (data, type, object) {
    var returnValue = "";
    returnValue = "<label>";
    returnValue += "<input type='checkbox' class='lsItem' value='" + object.userId + "' > ";
    returnValue += data;
    returnValue += "</label>";
    return returnValue;
};