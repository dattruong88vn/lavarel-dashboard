var postData = {
    regionIdsList: null,
    cityIdsList: null,
    districtIdsList: null,
    name: null
};
var targetFormPostData = {
    regionIdsList: null,
    cityIdsList: null,
    districtIdsList: null,
    name: null
};
var agentsTable = null;


$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });



    function split(val) {
        return val.split(/,\s*/);
    }
    function extractLast(term) {
        return split(term).pop();
    }

    $("#name").autocomplete({
        source: function (request, response) {
            var dataUrl = "/agent/get-ams-auto-complete?regionIdsList=" + postData.regionIdsList + "&cityIdsList=" + postData.cityIdsList + "&districtIdsList=" + postData.districtIdsList + "&name=" + extractLast(request.term);
            $.getJSON(dataUrl, {}, response);
        },
        search: function () {
            // custom minLength
            var term = extractLast(this.value);
            if (term.length < 2) {
                return false;
            }
        },
        focus: function () {
            // prevent value inserted on focus
            return false;
        },
        select: function (event, ui) {
            this.value = ui.item.name;
            $("#btnSearch").click();
            return false;
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li>")
                .append("<div>" + item.name + "</div>")
                .appendTo(ul);
    };

    getSystemCredit();
    getRegions("#targetRegions");
    searchAmsForTarget();
    $("#targetRegions").change(function () {
        selectionChange = true;
        targetFormPostData.regionIdsList = parseIntArray($(this).val());
        getCitiesByRegions("#targetCities", postData.regionIdsList, function(){
            searchAmsForTarget();
        });
    });
    $("#targetCities").change(function () {
        selectionChange = true;
        targetFormPostData.cityIdsList = parseIntArray($(this).val());
        getDistrictsByCities("#targetDistricts", $("#regions").val(), postData.cityIdsList, function(){
            searchAmsForTarget();
        });
    });
    $("#targetDistricts").change(function () {
        selectionChange = true;
        targetFormPostData.districtIdsList = parseIntArray($(this).val());
        searchAmsForTarget();
    });

    $(".btnSaveTarget").on("click", function (event) {
        event.preventDefault();
        var socialUidsList = parseIntArray($("#ams").val());
        if (socialUidsList === null || socialUidsList.length <= 0) {
            socialUidsList = [];
            $.ajax({
                url: "/agent/get-ams-for-set-target?regionIdsList=" + targetFormPostData.regionIdsList + "&cityIdsList=" + targetFormPostData.cityIdsList + "&districtIdsList=" + targetFormPostData.districtIdsList,
                type: "get"
            }).done(function (response) {
                $(response.data).each(function (index, item) {
                    socialUidsList.push(item.socialUid);
                });
                saveTarget(socialUidsList);
            });
        } else {
            saveTarget(socialUidsList);
        }

    });

    $(".btnSaveSystemCredit").on("click", function (event) {
        event.preventDefault();
        saveSystemCredit();
    });

    searchByRegion();
    $("#btnSearch").click(function (event) {
        event.preventDefault();
        /*
         if (postData.regionIdsList === null) {
         showPropzyAlert("Vui lòng chọn ít nhất một khu vực");
         return false;
         }
         */
        searchByRegion();
    });

    $(".btnShowAssignModal").on("click", function (event) {
        event.preventDefault();
        $("#setTargetModal").modal();
    });

});
var saveTarget = function (socialUidsList) {
    var postData = [];
    $("#setTargetModal tr.target").each(function () {
        var targetType = $(this).attr("targetType");
        var targetScore = $(this).find(".targetScore").val();
        var targetValue = $(this).find(".targetValue").val();
        postData.push({
            "socialUidsList": socialUidsList,
            "targetValue": targetValue,
            "targetType": targetType,
            "targetScore": targetScore
        });
    });
    showPropzyLoading();
    $.ajax({
        url: "/agent/save-ams-target",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
};

var saveSystemCredit = function () {
    var postData = [];
    $("#formSetSystemCredit tr.credit").each(function () {
        var creditType = $(this).attr("creditType");
        var creditValue = $(this).find(".creditValue").val();
        postData.push({
            "creditValue": creditValue,
            "creditType": creditType
        });
    });
    showPropzyLoading();
    $.ajax({
        url: "/agent/save-system-credit",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
};

var getSystemCredit = function () {
    $.ajax({
        url: "/agent/get-system-credit",
        type: "get"
    }).done(function (response) {
        if (response.result) {
            $(response.data).each(function (index, item) {
                $("tr.credit-" + item.creditType + " .creditValue").val(item.creditValue);
            });
        }
    }).always(function () {

    });
}

var searchByRegion = function () {
    if (agentsTable !== null) {
        agentsTable.destroy();
    }
    postData.name = $("#name").val().trim();
    agentsTable = $("#agentsList").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/agent/get-preview-for-set-target?regionIdsList=" + postData.regionIdsList + "&cityIdsList=" + postData.cityIdsList + "&districtIdsList=" + postData.districtIdsList + "&name=" + postData.name,
        "scrollX": true,
        "ordering": false,
        "lengthChange": false,
        "searching": false,
        "columns": [
            {data: 'amName'},
            {data: 'phone'},
            {data: 'email'},
            {data: 'address'},
            {data: 'districtList'},
            {data: 'createdByName'},
            {data: 'createdDate', render: dateRender},
            {data: 'updatedDate', render: dateRender}
        ]
    });
}

function searchAmsForTarget() {
    $.ajax({
        url: "/agent/get-ams-for-set-target?regionIdsList=" + targetFormPostData.regionIdsList + "&cityIdsList=" + targetFormPostData.cityIdsList + "&districtIdsList=" + targetFormPostData.districtIdsList,
        type: "get"
    }).done(function (response) {
        var html = "";
        $(response.data).each(function (index, item) {
            html += "<option value='" + item.socialUid + "' >" + item.name + "</option>";
        });
        $("#ams").html(html).select2();
    }).always(function () {

    });
}


var getRegions = function (selector, completed) {
    get_sync('/report/get-regions', true, function (response) {
        var html = '';
        if (response.result) {
            for (var x in response.data) {
                var item = response.data[x];
                html += "<option value='" + item.regionId + "' >" + item.regionName + "</option>"
            }
        }
        $(selector).html(html).select2();
        if (completed != null) {
            completed();
        }
    });
}
var getCitiesByRegions = function (selector, regionIds, completed) {
    post_sync('/report/get-cities-by-regions', {"regionIdsList": regionIds}, true, function (response) {
        var html = '';
        if (response.result) {
            for (var x in response.data) {
                var item = response.data[x];
                html += "<option value='" + item.cityId + "' >" + item.cityName + "</option>"
            }
        }
        $(selector).html(html).select2();
        if (completed != null) {
            completed();
        }
    });
}
var getDistrictsByCities = function (selector, regionIds, cityIds, completed) {
    data = {
        "regionIdsList": regionIds,
        "cityIdsList": cityIds
    };
    post_sync('/report/get-districts-by-cities', data, true, function (response) {
        var html = '';
        if (response.result) {
            for (var x in response.data) {
                var item = response.data[x];
                html += "<option value='" + item.districtId + "' >" + item.districtName + "</option>"
            }
        }
        $(selector).html(html).select2();
        if (completed != null) {
            completed();
        }
    });
}