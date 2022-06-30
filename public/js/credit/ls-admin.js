$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});


$("#sectionSelectDate").hide();
$("#fromDate").datepicker();
$("#toDate").datepicker();

var tableUserNotPass = null;
var tableUserPass = null;
$(".btn-filter-today").on("click", function () {
    $("#sectionSelectDate").hide();
    $('#sectionFromToTable').hide();
    $('#sectionToDayTable').show();

    $(".btn-filter").removeClass("active");
    $(this).addClass("active");
    showPropzyLoading();
    $.ajax({
        "url": "/credit/ls-target-current-date",
        "type": "get"
    }).done(function (response) {
        var donutData = [
            {label: "Đạt chỉ tiêu cá nhân ( " + response.data.percent.numberUserPass + " )", data: response.data.percent.userPass, color: "#3c8dbc"},
            {label: "Không đạt chỉ tiêu cá nhân ( " + response.data.percent.numberUserNotPass + " )", data: response.data.percent.userNotPass, color: "#f39c12"}
        ];
        $.plot("#donut-chart", donutData, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    innerRadius: 0,
                    label: {
                        show: true,
                        radius: 1.5 / 3,
                        formatter: labelFormatter,
                        threshold: 0.1
                    }
                }
            },
            legend: {
                show: false
            }
        });
        if (tableUserNotPass) {
            tableUserNotPass.destroy();
        }
        tableUserNotPass = $(".tableUserNotPass").DataTable({
            "searching": false,
            "paging": false,
            "ordering": false,
            "lengthChange": false,
            "data": response.data.userNotPass,
            "columns": [
                {data: "userName"},
                {data: "targetValue", render: renderTargetValue}
            ]
        });
        if (tableUserPass) {
            tableUserPass.destroy();
        }
        tableUserPass = $(".tableUserPass").DataTable({
            "searching": false,
            "paging": false,
            "ordering": false,
            "lengthChange": false,
            "data": response.data.userPass,
            "columns": [
                {data: "userName"},
                {data: "targetValue", render: renderTargetValue}
            ]
        });

    }).always(function () {
        hidePropzyLoading();
    });
});
var renderTargetValue = function (data, type, object) {
    if (!data) {
        return "";
    }
    if (object.excecution && object.targetValue) {
        data = object.excecution + "/" + object.targetValue;
    }
    return data;
}
renderUndefined = function (data, type, object) {
    return "";
};
$(".btn-filter-today").click();
var scoreTable = null;
$(".btn-filter").on("click", function (event) {
    event.preventDefault();
    $(".btn-filter").removeClass("active");
    $(".btn-filter-today").removeClass("active");
    $(this).addClass("active");
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
    if ($("#fromDate").val().trim() === "") {
        showPropzyAlert("Chọn từ ngày");
        return false;
    } else if ($("#toDate").val() === "") {
        showPropzyAlert("Chọn đến ngày");
        return false;
    }
    var fromMoment = moment($("#fromDate").val());
    var toMoment = moment($("#toDate").val());
    var recentMoment = moment();
    if (toMoment > recentMoment) {
        toMoment = recentMoment;
    }
    getScoreTable(fromMoment, toMoment);
});

function getScoreTable(fromMoment, toMoment) {
    fromMoment = fromMoment.startOf("day");
    toMoment = toMoment.endOf("day");
    var postData = {
        "fromDate": fromMoment.unix() * 1000,
        "toDate": toMoment.unix() * 1000,
        "keySearch": null
    };
    showPropzyLoading();
    $.ajax({
        "url": "/credit/ls-target-from-to",
        "type": "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        try {
            scoreTable.destroy();
            $("#scoreTable").empty();
        } catch (ex) {
            console.log(ex);
        }
        //$("#scoreTable thead").html("");
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
        var lastRow = ["", ""];
        $(response.data.percentRate).each(function ($index, item) {
            lastRow.push(item);
        });
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
        });
        console.log('tableItems');
        console.log(tableItems);
        scoreTable = $("#scoreTable").DataTable({
            "searching": false,
            "paging": false,
            "ordering": false,
            "lengthChange": false,
            "data": tableItems,
            "scrollX": true,
            "columns": columns
        });
        scoreTable.row.add(lastRow).draw(false);
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


$(".section-edit-setting").hide();
$(".menu-edit-setting").on("click", function (event) {
    event.preventDefault();
    var target = $(this).attr("data-target");
    $(".section-edit-setting").hide();

    if (target === "editWorkingDaysWrapper") {
        getTargetMonths(currentYear);
    }

    $("#" + target).show();
});
$("#yearChooser li a").on("click", function (event) {
    event.preventDefault();
    $("#yearChooser li").removeClass("active");
    $(this).parents("li").addClass("active");
    var year = $(this).attr("data-value");
    getTargetMonths(year);
});

function getTargetMonths(year) {
    showPropzyLoading();
    $.ajax({
        url: "/credit/get-target-months?year=" + year,
        type: "get"
    }).done(function (response) {
        if (response.result) {
            var html = "";
            if (response.data && response.data.length > 0) {
                for (i = 0; i < response.data.length; i++) {
                    var item = response.data[i];
                    html += "<tr><td>" + item.month + "</td><td>";
                    if (item.isEditable) {
                        html += "<input class='value' type='text' data-id='" + item.id + "' data-month='" + item.month + "' value='" + (item.value !== null ? item.value : "") + "' />";
                        html += "</td><td>";
                        html += "<input type='text' class='calculateDate' value='" + (item.calculateDate !== null ? item.calculateDate : "") + "' />";
                    } else {
                        html += item.value;
                        html += "</td><td>"+ (item.calculateDate !== null ? item.calculateDate : "");
                    }
                    html += "</td></tr>";
                }
            } else {
                for (i = 1; i < 12; i++) {
                    html += "<tr><td>" + i + "</td><td>";
                    if (year > currentYear || (year == currentYear && i > currentMonth)) {
                        html += "<input class='value' type='text'  data-id='-1' data-month='" + i + "' value='" + 0 + "' />";
                    } else {
                        html += "N/A";
                        html += "</td><td>N/A";
                    }
                    html += "</td></tr>";
                }
            }
            $("#tableEditWorkingDays tbody").html(html);
        } else {
            showPropzyAlert(response.message);
        }
    }).always(function () {
        hidePropzyLoading();
    });
}
$(".saveWorkingDays").on("click", function (event) {
    event.preventDefault();
    var year = $("#yearChooser li.active a").attr("data-value");
    var months = [];
    var isValidate = true;
    var message = "";
    $("#tableEditWorkingDays input.value").each(function () {
        var value = $(this).val().trim();
        var month = $(this).attr("data-month");
        var id = $(this).attr("data-id");
        var calculateDate = $(this).parents("tr").find(".calculateDate").val();
        console.log(calculateDate);
        var reg = /^(0|[1-9]\d*)(\.\d+)?$/;
        if (!reg.test(value)) {
            message = "Nhập giá trị ngày hợp lệ";
            isValidate = false;
            return false;
        }
        if(!reg.test(calculateDate)){    
            message = "Nhập giá trị ngày chốt công hợp lệ";        
            isValidate = false;
            return false;
        }
        var item = {
            "id": id,
            "value": value !== "" ? value : null,
            "month": month,
            "year": year,
            "calculateDate": calculateDate
        };
        months.push(item);
    });
    if (!isValidate) {
        showPropzyAlert(message);
        return false;
    }
    showPropzyLoading();
    $.ajax({
        "url": "/credit/save-target-months",
        "type": "post",
        data: JSON.stringify({
            "months": months
        })
    }).done(function (response) {
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
});

function labelFormatter(label, series) {
    return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">' +
            label +
            "<br>" +
            Math.round(series.percent) + "%</div>";
}
var lsListDataTable = null;
$("#lsListSection").hide();
$("#showLsList").on("click", function (event) {
    event.preventDefault();
    var isReturn = false;
    $("#editBaseScoreWrapper input[type='text']").each(function () {
        var value = $(this).val();
        if (value.trim() === "") {
            isReturn = true;
            return;
        }
    });
    $("#editBaseScoreWrapper .txtTargetValue").each(function () {
        var value = $(this).val();
        var reg = /^(0|[1-9]\d*)(\.\d+)?$/;
        if (value.trim() === "" || !reg.test(value)) {
            isReturn = true;
            return;
        } else {
            value = parseFloat(value);
            if (value <= 0) {
                isReturn = true;
                return;
            }
        }
    });
    $("#editBaseScoreWrapper .txtBaseTargetValue").each(function () {
        var value = $(this).val();
        var reg = /^(0|[1-9]\d*)(\.\d+)?$/;
        if (value.trim() === "" || !reg.test(value)) {
            isReturn = true;
            return;
        } else {
            value = parseFloat(value);
            if (value <= 0) {
                isReturn = true;
                return;
            }
        }
    });
    if (isReturn) {
        showPropzyAlert("Nhập giá trị hợp lệ lớn hơn 0.");
        return false;
    }
    if (lsListDataTable) {
        lsListDataTable.destroy();
    }
    showPropzyLoading();
    $.ajax({
        "url": "/credit/get-ls-target-users",
        type: "get"
    }).done(function (response) {
        if (response.result) {
            lsListDataTable = $('#lsList').DataTable({
                //"paging": false,
                "lengthChange": false,
                "searching": false,
                "ordering": true,
                "info": false,
                "autoWidth": true,
                "scrollX": true,
                data: response.data,
                "columns": [
                    {data: "userId", render: lsListNameRender},
                    {data: "userId", render: naRender},
                    {data: "userId", render: naRender}
                ]
            });
        }
    }).always(function () {
        hidePropzyLoading();
    });
    $("#lsListSection").show();
});
var lsListNameRender = function (data, type, object) {
    isChecked = "";
    if (object.isTarget) {
        isChecked = "checked";
    }
    data = " <input type='checkbox' " + isChecked + " onclick=\"return checkIsSetTarget(this);\" value=" + object.userId + "  /> ";
    data += object.name;
    return data;
};
function checkIsSetTarget(selector) {
    var postData = {
        users: [
            {
                userId: parseInt($(selector).val()),
                isTarget: $(selector).prop("checked")
            }
        ]
    };
    showPropzyLoading();
    $.ajax({
        url: "/credit/check-ls-is-set-target",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (!response) {
            showPropzyAlert(response.message);
        }
    }).always(function () {
        hidePropzyLoading();
    });
}
var naRender = function (data, type, object) {
    return "N/A";
};
var lsListCityRender = function (data, type, object) {
    return "N/A";
};

$(".txtTargetValue").blur(function () {
    var id = $(this).attr("data-id");
    var value = $(this).val();

    var reg = /^(0|[1-9]\d*)(\.\d+)?$/;
    if (value.trim() === "" || !reg.test(value)) {
        showPropzyAlert("Nhập giá trị hợp lệ lớn hơn 0.");
        return false;
    } else {
        value = parseFloat(value);
        if (value <= 0) {
            showPropzyAlert("Nhập giá trị hợp lệ lớn hơn 0.");
            return false;
        }

    }
    var postData = {
        "id": id,
        "value": value !== "" ? value : null
    };
    showPropzyLoading();
    $.ajax({
        'url': "/credit/save-grading-scale",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        if (!response) {
            showPropzyAlert(response.message);
        }
    }).always(function () {
        hidePropzyLoading();
    });
});
$(".txtBaseTargetValue").blur(function () {
    var value = $(this).val();
    var reg = /^(0|[1-9]\d*)(\.\d+)?$/;
    if (value.trim() === "" || !reg.test(value)) {
        showPropzyAlert("Nhập giá trị hợp lệ lớn hơn 0.");
        return false;
    } else {
        value = parseFloat(value);
        if (value <= 0) {
            showPropzyAlert("Nhập giá trị hợp lệ lớn hơn 0.");
            return false;
        }

    }
    var postData = {
        "targetValue": value !== "" ? value : null
    };
    showPropzyLoading();
    $.ajax({
        'url': "/credit/save-target-value",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        if (!response) {
            showPropzyAlert(response.message);
        }
    }).always(function () {
        hidePropzyLoading();
    });
});
