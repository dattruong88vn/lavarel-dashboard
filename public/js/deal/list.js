// variable global for export
var statusIdExport = -1
var progressQuoIDExport = null

dateRender = function (data, type, object) {
  if (!data) return ""
  return $.format.date(new Date(data), "dd/MM/yyyy")
}

var dateTimeRender = function (data, type, object) {
  if (!data) return ""
  return $.format.date(new Date(data), "dd/MM/yyyy")
}

var renderLink = function (data, type, object) {
  let colorLabel =
    object.scoreCardType == "H1" || object.scoreCardType == "H2"
      ? "label-high"
      : object.scoreCardType == "M1" || object.scoreCardType == "M2"
      ? "label-medium"
      : object.scoreCardType == "L1" || object.scoreCardType == "L0"
      ? "label-low"
      : "label-unclassify"
  let html =
    "<a data-toggle='tooltip' title='" +
    object.projectBuildingName +
    "' href='/deal/detail/" +
    object.dealId +
    "'>" +
    data +
    "</a>"
  html += `<br><a href="#" class="label-primary evaluate-score-block-list">TM : ${
    object.leadProfileValue ? object.leadProfileValue : "N/A"
  }</a>`
  html += `<a href="#" class="label-success evaluate-score-block-list">BA : ${
    object.dealProfileValue ? object.dealProfileValue : "N/A"
  }</a>`
  html += `<a href="#" data-toggle='tooltip' title="LIDs: ${
    object.tourListingId && Array.isArray(object.tourListingId)
      ? "(" + object.tourListingId.join(", ") + ")"
      : "N/A"
  }" class="label-warning evaluate-score-block-list">CC : ${
    object.tourProfileValue ? object.tourProfileValue : "N/A"
  } </a>`
  html += `<p>${
    object.scoreCardType
      ? "<span><i class='fa fa-circle " +
        colorLabel +
        "'></i> " +
        object.scoreCardType +
        "</span>"
      : ""
  }</p>`
  return html
}

function generateListUrl(statusId, progressQuoIDs) {
  var baseUrl = "deal/get-list-deal/" + statusId
  var params = ""
  statusIdExport = statusId
  if (progressQuoIDs) {
    params += "progressQuoIDs=" + progressQuoIDs
    progressQuoIDExport = progressQuoIDs
  } else {
    progressQuoIDExport = null
  }

  if ($(".fromDate").is(":visible")) {
    var fromDate = $(".fromDate").val().trim()
    if (fromDate != "") {
      fromDate = moment(fromDate, "DD/MM/YYYY").unix() * 1000
      params += "&fromDate=" + fromDate
    } else {
      params += "&fromDate=" + 0
    }

    var toDate = $(".toDate").val().trim()
    if (toDate != "") {
      toDate = moment(toDate, "DD/MM/YYYY").unix() * 1000
      params += "&toDate=" + toDate
    } else {
      params += "&toDate=" + moment().unix() * 1000
    }
  }
  if ($("#memberField").length) {
    params += "&assignedTos=" + $("#memberField").val()
  }

  params += "&listingTypeId=" + $("#listingTypeId").val()
  params += "&propertyTypeId=" + $("#propertyTypeId").val()
  params += "&scoreCardType=" + $("#scoreCardType").val()

  $("#zoneId").length ? (params += "&zoneId=" + $("#zoneId").val()) : ""
  $("#teamId").length ? (params += "&teamId=" + $("#teamId").val()) : ""
  $("#districtId").length
    ? (params += "&districtId=" + $("#districtId").val())
    : ""
  $("#wardId").length ? (params += "&wardId=" + $("#wardId").val()) : ""
  $("#departmentId").length
    ? (params += "&departmentId=" + $("#departmentId").val())
    : ""
  $('#inputDealId').length ? (params += "&dealId=" + $("#inputDealId").val()) : '';

  return baseUrl + "?" + params
}

function handleGetDataWithStatus (statusId, obj = null) {
  $(obj).closest('.btn-group').find('.js-btn-group').html($(obj).text());
  $(obj).closest('.btn-group').find('.btn-default').addClass('active');
  showData(statusId);
}

var showData = function (statusId, progressQuoIDs) {
  $("#lead-list")
    .DataTable()
    .ajax.url(generateListUrl(statusId, progressQuoIDs))
    .load()
  return false
}

var renderProgressName = function (data, type, object) {
  if (typeof object.progressName === "undefined") {
    return "Server chưa trả về, ahihi"
  } else {
    return object.progressName != null ? object.progressName : "N/A"
  }
}

var renderPrice = function (data, type, object) {
  if (typeof object.initialBudgetFixed === "undefined") {
    return "Server chưa trả về, ahihi"
  } else {
    return object.initialBudgetFixed != null ? object.initialBudgetFixed : "N/A"
  }
}

var renderWardDictrictPrefer = function (data, type, object) {
  return data + " - " + object.preferWard
}

$(document).ready(function () {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $("#_token").val(),
    },
  })

  var getList = function (limit = 10) {
    var tableList = $("#lead-list").DataTable({
      processing: true,
      serverSide: true,
      ajax: "/deal/get-list-deal/-1?limit=" + limit,
      scrollX: false,
      lengthChange: true,
      autoWidth: false,
      lengthMenu: [
        [10, 25, 50],
        [10 + " records", 25 + " records", 50 + " records"],
      ],
      pagingType: "full_numbers",
      iDisplayLength: limit,
      drawCallback: function (oSettings) {
        $(".dataTables_paginate > .pagination").addClass("pagination-sm")
        var pagination = $(this)
          .closest(".dataTables_wrapper")
          .find(".dataTables_paginate")
        pagination.toggle(this.api().page.info().pages > 1)

        $('[data-toggle="popover"]').popover()

        $("body").on("click", function (e) {
          //did not click a popover toggle or popover
          if (
            $(e.target).data("toggle") !== "popover" &&
            $(e.target).parents(".popover.in").length === 0
          ) {
            $('[data-toggle="popover"]').popover("hide")
          }
        })
      },
      columns: [
        //23
        // {data: null, render: customKey, orderable: false},
        // {data: 'customerId', orderable: false},
        {
          data: "dealId",
          orderable: false,
          render: function (data, type, object) {
            var agentInfo = ""
            if (object.agentName != null) {
              agentInfo = object.agentName != null ? object.agentName : "N/A"
              agentInfo =
                ' <a data-toggle="tooltip" title="Môi giới: ' +
                agentInfo +
                '" href="#"> <i class="fa fa-black-tie" aria-hidden="true"></i></a>'
            }
            return data + agentInfo
          },
        },
        { data: "customerName", render: renderLink, orderable: false },
        // {data: 'customerEmail', orderable: false, visible: false},

        { data: "tmName" },
        {
          data: "timeCounter",
          orderable: false,
          render: function (data, type, object) {
            if (data) {
              return data
            }
            return "N/A"
          },
        },
        // {data: 'saleName', orderable: false, visible: false},

        // {data: 'agentName', orderable: false, visible: false},
        {
          data: "statusName",
          orderable: false,
          render: function (data, type, object) {
            var content = []
            content.push(
              "<div>- <b>LID:</b> <button class='btn btn-link' onclick='JMDetail.openModalListingDetailForAllPage(" +
                object.rListingId +
                ");return false;'>" +
                object.rListingId +
                "</button></div>"
            )
            content.push(
              "<div>- <b>Giá chốt:</b> " + object.formatNewPrice + "</div>"
            )
            content.push("<div>- <b>Quận:</b>" + object.districtName + "</div>")
            if (object.statusId == 27 || object.statusId == 29)
              return (
                '<button class="btn btn-link" href="#" data-toggle="popover" data-html="true" title="Nhu cầu" data-content="' +
                content.join("") +
                '"><i style="font-size:9px;" class="fa fa-gavel" aria-hidden="true"></i> ' +
                data +
                "</button>"
              )
            else return data
          },
        },
        {
          data: "progressName",
          orderable: false,
          render: progressQuoNameRender,
        },

        { data: "createdDate", render: dateTimeRender },
        { data: "lastUpdatedDate", render: dateTimeRender },
        { data: "formatPrice", orderable: false },

        // {data: 'leadCreatedDate', render: dateTimeRender, orderable: false, visible: false},
        // {data: 'listingTypeName', orderable: false, visible: false},

        {
          data: "propertyTypeName",
          orderable: false,
          render: function (data, type, object) {
            return object.listingTypeName + " - " + object.propertyTypeName
          },
        },
        {
          data: "preferDistrict",
          render: renderWardDictrictPrefer,
          orderable: false,
        },
        // {data: null, defaultContent: "", orderable: false, visible: false},
        // {data: 'moveInDate', render: dateRender, orderable: false, visible: false},

        { data: "sourceName", orderable: false },
        { data: "subjectName", orderable: false },

        // {data: 'recentlyStatusName', orderable: false, visible: false},
        // {data: 'lastActivityDate', render: dateTimeRender, defaultContent: "", orderable: false, visible: false},

        {
          data: "createdDate",
          render: leadDealRender.renderDaysOfBeingDeal,
          orderable: false,
        },
        // {data: null, defaultContent: "", orderable: false, visible: false},
        // {data: "dealId", render: renderAction, orderable: false, visible: isGroupAdmin},
      ],
      order: [[7, "desc"]],
      language: {
        search: "Tìm kiếm",
        paginate: {
          previous: "<",
          next: ">",
          first: "|<",
          last: ">|",
        },
        lengthMenu: "Hiển thị _MENU_ trên 1 trang",
        searchPlaceholder: "SDT, Tên, Email",
        info: "Hiển thị _START_ đến _END_ của _TOTAL_",
        emptyTable: "Chưa có dữ liệu",
        infoEmpty: "",
      },
      createdRow: function (row, data, index) {
        //console.log(data);
        if (!data.isActivated) {
          $("td", row).parent("tr").addClass("unactivated")
        }
        if (data.isNew) {
          $("td", row).parent("tr").addClass("item-new")
        }
      },
    })
  }
  // getList()
  /* 
  $(".fromDate").datepicker({
    format: "dd/mm/yyyy",
  })
  const todayDate = new Date()
  todayDate.setDate(todayDate.getDate() - 30)
  $(".fromDate").datepicker("setDate", todayDate)
  $(".toDate").datepicker({
    format: "dd/mm/yyyy",
  })
  $(".toDate").datepicker("setDate", new Date()) */

  // $(".assignedTos").select2()

  //$("#lead-list").dataTable().fnSetFilteringDelay(1000);
  /* $("#btn_filter_button_deal").click(function () {
    var filterUrl = "/deal/generate-filter-deal-button?"
    if ($(".fromDate").is(":visible")) {
      var fromDate = $(".fromDate").val().trim()
      if (fromDate != "") {
        fromDate = moment(fromDate, "DD/MM/YYYY").unix() * 1000
        filterUrl += "&fromDate=" + fromDate
      } else {
        filterUrl += "&fromDate=" + 0
      }

      var toDate = $(".toDate").val().trim()
      if (toDate != "") {
        toDate = moment(toDate, "DD/MM/YYYY").unix() * 1000
        filterUrl += "&toDate=" + toDate
      } else {
        filterUrl += "&toDate=" + moment().unix() * 1000
      }
    } else {
      filterUrl += "&fromDate=" + 0
      filterUrl += "&toDate=" + moment().unix() * 1000
    }
    if ($("#memberField").is(":visible")) {
      filterUrl += "&assignes=" + $("#memberField").val()
    }
    // new update filter
    filterUrl += "&listingTypeId=" + $("#listingTypeId").val()
    filterUrl += "&propertyTypeId=" + $("#propertyTypeId").val()
    filterUrl += "&scoreCardType=" + $("#scoreCardType").val()
    showPropzyLoading()
    $.post(filterUrl, {}, function (response) {
      $("#wrap_group_button_deal").html(response)
      hidePropzyLoading()
      showData(-1)
      return false
    })
    return false
  })
  $("#btn_filter_button_deal").trigger("click") */
  $(".btn-export").click(function () {
    var exportUrl = "/report/export-report/deal-list---" + statusIdExport + "?"

    var fromDate = $(".fromDate").val().trim()
    if (fromDate != "") {
      fromDate = moment(fromDate, "DD/MM/YYYY").unix() * 1000
      exportUrl += "&fromDate=" + fromDate
      $(".fromDate").css("border", "1px solid #dedede")
    } else {
      if ($("#memberField").val() == 0) {
        $(".fromDate").css("border", "1px solid red")
        return false
      }
      // exportUrl += "?fromDate=" + 0;
    }

    var toDate = $(".toDate").val().trim()
    if (toDate != "") {
      toDate = moment(toDate, "DD/MM/YYYY").unix() * 1000
      exportUrl += "&toDate=" + toDate
      $(".toDate").css("border", "1px solid #dedede")
    } else {
      if ($("#memberField").val() == 0) {
        $(".toDate").css("border", "1px solid red")
        return false
      }
      // exportUrl += "&toDate=" + (moment().unix()*1000);
    }

    if (progressQuoIDExport != null) {
      exportUrl += "&progressQuoIDs=" + progressQuoIDExport
    }

    exportUrl += "&assignedTos=" + $("#memberField").val()
    exportUrl += "&listingTypeId=" + $("#listingTypeId").val()
    exportUrl += "&propertyTypeId=" + $("#propertyTypeId").val()
    exportUrl += "&scorecardType=" + $("#scoreCardType").val()

    // showPropzyLoading();
    showPropzyLoading()
    $.post(exportUrl, {}, function (response) {
      if (response.result) {
        // return false;
        window.location.href = response.data.linkFile
      } else {
        alert(response.message)
      }
      hidePropzyLoading()
    })
    return false
  })
})
var renderAction = function (data, type, object) {
  data =
    "<a href='#' onclick=\"return deleteItem('" +
    object.dealId +
    "')\"><i class='glyphicon glyphicon-trash text-red'></i></a>"
  return data
}
function deleteItem(itemId) {
  if (!confirm("Bạn có chắc chắn muốn xóa deal này?")) {
    return false
  }
  showPropzyLoading()
  var currentRow = $(this)
  $.ajax({
    url: "/deal/delete/" + itemId,
    type: "get",
  })
    .done(function (response) {
      if (response.result) {
        window.location.reload()
      }
      showPropzyAlert(response.message)
    })
    .always(function () {
      hidePropzyLoading()
    })
}
