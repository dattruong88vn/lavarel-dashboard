var scheduleListingsDataTable = null;

var formatTime = (value) => {
  value = parseInt(value + "");
  var returnValue = "";
  var hour = 0;
  var minute = 0;
  if (value > 60) {
      hour = Math.floor(value / 60);
  }
  minute = value - hour * 60;
  if (hour > 0) {
      returnValue = hour + " tiếng ";
  }
  returnValue += minute + " phút";
  return returnValue;
}

var Schedule = (function () {
  var makeScheduleModal = $("#makeScheduleModal");
  var startVisitDate = moment();
  var lastSelectedData = {};
  var callBack = null;

  var startVisitTime = makeScheduleModal.find("#whenTime").val();
  var isLoadConceirUser = false;
  var isNewModal = true;
  var isTMUser = false;

  $("#makeScheduleModal").modal({
    backdrop: "static",
    keyboard: false,
    show: false
  });

  function resetForm() {
    makeScheduleModal
      .find("#whenDate")
      .datepicker("setStartDate", moment().format("DD/MM/YYYY"));
    makeScheduleModal
      .find("#whenDate").datepicker('setDate', new Date());
    makeScheduleModal
      .find("#whenTime")
      .timepicker("setTime", moment().add(0.5, "h").format("HH:mm:ss"));
    makeScheduleModal
      .find(".note").val('');
    startVisitTime = makeScheduleModal.find("#whenTime").val();
    $("#checking-avai-cc-message").html("");
  }

  function parseStringListToFloatArr(strList) {
    return strList.split(';').map(item => parseFloat(item)).filter(Boolean);
  }

  makeScheduleModal
    .find("#whenTime")
    .timepicker({
      showMeridian: false,
    })
    .on("change", function () {
      var currentTime = $("#whenTime").val();
      if (currentTime != startVisitTime) {
        var listingIds = parseStringListToFloatArr($("#makeScheduleModal .listingIds").val());
        loadScheduleListingsDataTable(listingIds);
        startVisitTime = currentTime;
      }
      $("#formMakeSchedule").find("#socialUid").val("");
    });
  $("#whenDate")
    .datepicker({
      autoclose: true,
      format: 'dd/mm/yyyy'
    })
    .on("changeDate", function (e) {      
      var listingIds = parseStringListToFloatArr($("#makeScheduleModal .listingIds").val());
      loadScheduleListingsDataTable(listingIds);
      loadBookTourTime();
    }).on('hide', function() {
      if($("#whenDate").val() === '') {
        $("#whenDate").datepicker('setDate', new Date());
      }
    });

  $(".btnOpenScheduleForm").on("click", function (event) {
    event.preventDefault();
    isEditingSchedule = false;
    var addressList = [];
    var listingIdLinks = [];
    var listingIds = [];
    var fromTable = $(this).attr("data-from-table");

    $("#" + fromTable + " .select-listing:checked").each(function () {
      if ($(this).prop("disabled")) {
        return;
      }
      var listingId =
        '<a href="/listing/' +
        $(this).val() +
        '" target="_blank" >' +
        $(this).val() +
        "</a>";
      listingIdLinks.push(listingId);
      if ($.inArray(listingId, listingIds) < 0) {
        listingIds.push($(this).val());
      }
      var address = $(this).parents("tr").find("span.address").text();
      addressList.push(address);
    });
    if(listingIds.length > 4) {
      showPropzyAlert("Vui lòng chọn tối đa 4 listing");
      return;
    }
    if (listingIds.length <= 0) {
      showPropzyAlert("Chọn listing để đặt lịch");
      return;
    }
    loadScheduleListingsDataTable(listingIds, false, true);
    $("#makeScheduleModal .listingIds").val(listingIds.join(";"));
    //$("#makeScheduleModal .address").val(addressList.join(';\r\n'));
  });

  var showModalByListingIds = function (params) {
    var addressList = [];
    var listingIdLinks = [];
    var listingIds = params.listingIds;
    var fromTable = $(this).attr("data-from-table");
    callBack = params.onSave;

    $("#" + fromTable + " .select-listing:checked").each(function () {
      if ($(this).prop("disabled")) {
        return;
      }
      var listingId =
        '<a href="/listing/' +
        $(this).val() +
        '" target="_blank" >' +
        $(this).val() +
        "</a>";
      listingIdLinks.push(listingId);
      if ($.inArray(listingId, listingIds) < 0) {
        listingIds.push($(this).val());
      }
      var address = $(this).parents("tr").find("span.address").text();
      addressList.push(address);
    });
    if(listingIds.length > 4) {
      showPropzyAlert("Vui lòng chọn tối đa 4 listing");
      return;
    }
    if (listingIds.length <= 0) {
      showPropzyAlert("Chọn listing để đặt lịch");
      return;
    }
    // SHOW MODAL
    $("#makeScheduleModal").modal('show');
    loadScheduleListingsDataTable(listingIds, false, true);
    loadBookTourTime();
    $("#makeScheduleModal .listingIds").val(listingIds.join(";"));
    //$("#makeScheduleModal .address").val(addressList.join(';\r\n'));
  };

  const handleSubmitScheduleForm = function (e) {
    e.preventDefault();

    var theForm = $(e.target);
    theForm.find(".errors").html("");
    var isValidated = true;
    var date = theForm.find("#whenDate");
    if (date.val().trim() === "") {
      date.parent().parent().find(".errors").html("Chọn ngày");
      isValidated = false;
    }
    var time = theForm.find("#whenTime");
    if (time.val().trim() === "") {
      time.parent().parent().find(".errors").html("Chọn giờ");
      isValidated = false;
    }
    var theDate = moment(date.val() + " " + time.val(), "DD/MM/YYYY HH:mm");
    var now = moment();
    if (theDate.isBefore(now)) {
      date
        .parent()
        .parent()
        .find(".errors")
        .html("Ngày phải lớn hơn thời điểm hiện tại");
      isValidated = false;
    }
    
    var ccAsigneeSelected = $("#assignToConceirgeSelect").select2("data");
    var ccAssigeeVal = ccAsigneeSelected.length > 0 ? ccAsigneeSelected[0].id : '';
    var socialUid = ccAsigneeSelected.length > 0 ? ccAsigneeSelected[0].socialUid : null;

    if (ccAssigeeVal === '') {
      $("#formMakeSchedule").find(".txtSearchAssignTo").parent().find('.errors').html('Phải assign');
        isValidated = false;
    }

    if (!isValidated) {
        return false;
    }
    var scheduleTime =
      moment(time.val() + " " + date.val(), "HH:mm DD/MM/YYYY").unix() * 1000;
    var ccAsigneeSelected = $("#assignToConceirgeSelect").select2("data");
    var postData = {
      dealId: $("#formMakeSchedule").find("#dealId").val(),
      customerId: $("#formMakeSchedule").find("#customerId").val(),
      socialUid: socialUid,
      assignedTo: ccAssigeeVal,
      note: $("#formMakeSchedule").find(".note").val(),
      transportType: 1093, //default xe máy,
      scheduleTime: scheduleTime, // min time cua listing
      estimatedTime: $("#formMakeSchedule").find("#estimatedTime").val(),
      estimatedDate: $("#formMakeSchedule").find("#estimatedDate").val(),
      estimatedDistance: $("#formMakeSchedule")
        .find("#estimatedDistance")
        .val(),
      listingsList: [],
    };
    var listingIds = selectedScheduleRlistingIds;
    for (var i = 0; i < listingIds.length; i++) {
      var rlistingId = listingIds[i];
      var listingNote = theForm.find(".listingNote-" + rlistingId).val();
      var listingTime = theForm.find(".visitTime-" + rlistingId).val();
      var listingScheduleTime =
        moment(listingTime + " " + date.val(), "HH:mm DD/MM/YYYY").unix() *
        1000;
      var estimatedTime = theForm.find(".estimatedTime-" + rlistingId).val();
      var estimatedDistance = theForm
        .find(".estimatedDistance-" + rlistingId)
        .val();
      listing = {
        id: {
          rlistingId: rlistingId,
        },
        address: makeScheduleModal.find(".address-" + rlistingId).html(),
        scheduleTime: listingScheduleTime,
        note:  listingNote != "" ? listingNote : null,
        estimatedTime: estimatedTime,
        estimatedDistance: estimatedDistance,
        assignTo: makeScheduleModal
          .find("[asign-id-" + rlistingId + "]")
          .attr("asign-id-" + rlistingId), //người phụ trách
      };
      postData.listingsList.push(listing);
    }
    showPropzyLoading();
    //return;
    $.ajax({
      url: "/deal/make-schedule",
      type: "POST",
      data: JSON.stringify(postData),
    })
      .done(function (response) {
        if (response.result) {
          $("#makeScheduleModal").modal("hide");
          //generateScheduleTable(5);
          //getEmailListings();
          try {
            clearStoredIds();
            if (callBack) {
              callBack(response);
            } else {
              window.location.reload();
              getSentListingsDataTable();
              reloadTables();
            }
          } catch (ex) {}
          selectedScheduleRlistingIds = [];
        }
        if (
          (response.code == "10001" || response.code == "405") &&
          !$.isEmptyObject(response.data)
        ) {
          response.message =
            '<div style="padding:10px; margin-bottom: 10px; font-weight: bold; border-radius: 3px; border:1px solid #eee;">' +
            response.message +
            "</div>";
          $.each(response.data, function (key, item) {
            response.message +=
              '<div style="padding:10px; margin-bottom: 10px; font-weight: bold; border-radius: 3px; border:1px solid #eee;">' +
              item.message +
              "</div>";
          });
        }
        showPropzyAlert(response.message);
      })
      .fail(function() {
        showPropzyAlert();
      })
      .always(function () {
        hidePropzyLoading();
      });
  };

  $("#formMakeSchedule").on('submit', handleSubmitScheduleForm);

  $("#makeScheduleModal").on("show.bs.modal", function (e) {
    setTimeout(function () {
      $(".visitTime").timepicker({
        showMeridian: false,
      });
    }, 500);
    if(isNewModal) {
      resetForm();
    }
  });

  var loadScheduleListingsDataTable = function (
    listingIds,
    assignIdOfFirstRowAfterOrder = false,
    handleSelectCC = false
  ) {
    if($('#makeScheduleModal').data('bs.modal') && !$('#makeScheduleModal').data('bs.modal').isShown) {
      return;
    }

    if (listingIds.length <= 0) {
      return;
    }
    
    showPropzyLoading();

    const listAjax = [];

    var url = "/listing/find?isFilterSoldOut=true&rlistingIds=" + listingIds;
    if (isNaN(deal.dealId) === false) {
      url += "&dealId=" + deal.dealId;
    }

    listAjax.push(
      $.ajax({
        url: url,
        type: "get",
        async: true,
      })
    );

    if (!isLoadConceirUser) {
      listAjax.push(
        $.ajax({
          url: "/deal/get-assign-user-list",
          type: "get",
        })
      );
      listAjax.push(
        $.ajax({
          url: "/deal/is-tm-user",
          type: "get",
        })
      );
    }

    Promise.all(listAjax)
      .then(function (res) {
        const listingRes = res[0];
        const userRes = res[1];
        const isTMUserRes = res[2];

        if (userRes) {
          isLoadConceirUser = true;
          var data = userRes.data.map((item) => ({
            id: item.userId,
            text: item.name,
            socialUid: item.socialUid,
          }));
          $("#assignToConceirgeSelect").html('');
          $("#assignToConceirgeSelect")
            .select2({
              data: [
                {
                  id: '',
                  socialUid: '',
                  text: '-- Chọn --',
                },
                ...data
              ],
              multiple: false,
              placehoder: "",
              width: "resolve",
            })
            .on("change.select2", function (e) {
              checkAvailableConceirge();
            })
        }
        if(isTMUserRes) {
          isTMUser = isTMUserRes.data;
        }
        if (listingRes) {
          selectedScheduleRlistingIds = [];

          lastSelectedData = {
            ...lastSelectedData,
            ...(listingRes.data || {})
          };

          lastSelectedData.list.map(item => {
            selectedScheduleRlistingIds.push(item.rlistingId);
          })

          $("#makeScheduleModal .listingIds").val(selectedScheduleRlistingIds.join(";"));

          if (listingRes.code === '10001') {
            showPropzyAlert(listingRes.message);

            if(Object.keys(lastSelectedData.list).length === 0) {
              $("#makeScheduleModal").modal("hide");
            }
          }

          makeScheduleModal
            .find("#label_estimatedTime")
            .html(formatTime(lastSelectedData.estimatedTime / 60));
          makeScheduleModal
            .find("#estimatedTime")
            .val(lastSelectedData.estimatedTime);
          makeScheduleModal
            .find("#estimatedDistance")
            .val(lastSelectedData.distance);
          var whenTime = makeScheduleModal.find("#whenTime").val();
          var whenDate = makeScheduleModal.find("#whenDate").val();
          startVisitDate = moment(
            whenTime + " " + whenDate,
            "HH:mm DD/MM/YYYY"
          );
          var estimatedDate = moment(
            whenTime + " " + whenDate,
            "HH:mm DD/MM/YYYY"
          );
          estimatedDate.add(lastSelectedData.estimatedTime, "s");
          makeScheduleModal
            .find("#label_estimatedDate")
            .html(estimatedDate.format("HH:mm"));
          makeScheduleModal
            .find("#estimatedDate")
            .val(estimatedDate.unix() * 1000);
          startVisitTime = $("#whenTime").val();
          oldListings = [];
          $(".listingNote").each(function () {
            var listing = {
              rlistingId: $(this).attr("data-rlistingid"),
              note: isNewModal ? '' : $(this).val(),
            };
            oldListings.push(listing);
          });
          if (!startVisitDate.isValid()) {
            showPropzyAlert("Ngày giờ bắt đầu đi xem không đúng.");
            makeScheduleModal.find("#whenDate").datepicker("hide").datepicker("setStartDate", moment().format("DD/MM/YYYY"));
            return false;
          }
          previousVisitTime = 0;
          try {
            scheduleListingsDataTable.clear();
            scheduleListingsDataTable.destroy();
          } catch (Ex) {}
          scheduleListingsDataTable = $(
            "#makeScheduleModal .scheduleListings"
          ).DataTable({
            autoWidth: false,
            initComplete: function (settings, json) {
              $(".visitTime").timepicker({
                showMeridian: false,
              });
            },
            paging: false,
            lengthChange: false,
            searching: false,
            ordering: false,
            data: lastSelectedData.list,
            processing: false,
            serverSide: false,
            destroy: true,
            columns: [
              { data: "rlistingId", orderable: false },
              { data: "address", orderable: false, render: renderAddress },
              {
                data: "assignedName",
                orderable: false,
                render: renderCCAsignee,
              },
              { data: "createdByPhone", orderable: false, visible: false },
              { data: "duration", render: renderDuration },
              { data: "rlistingId", render: renderVisitTime, orderable: false },
              //{data: "rlistingId", render: renderVisitTime, orderable: false},
              { data: "distance", render: renderDistance, orderable: false },
              {
                data: "rlistingId",
                render: renderListingNote,
                orderable: false,
              },
              {
                data: "rlistingId",
                render: renderScheduleListingOrder,
                orderable: false,
              },
            ],
            rowCallback: function (row, data) {
              $(row).attr("row-assign-id", data.assignedId);
            },
          });

          // HANDLE SELECT CONCEIRGE USER
          if(handleSelectCC) {
            var selectedOpts = "";
            var isDisabled = false;

            if (
              assignIdOfFirstRowAfterOrder &&
              !$("#assignToConceirgeSelect").is(":disabled")
            ) {
              selectedOpts = $("#makeScheduleModal .scheduleListings")
                .children("tbody")
                .children("tr:first-child")
                .attr("row-assign-id");
            } else {
              if (
                lastSelectedData &&
                isTMUser &&
                lastSelectedData.list &&
                lastSelectedData.list.length > 0
              ) {
                  selectedOpts = lastSelectedData.list[0].assignedId || "";
              } else {
                selectedOpts = lastSelectedData.dealAssignedId;
                isDisabled = true;
              }
            }
            $("#assignToConceirgeSelect").val(selectedOpts).prop("disabled", isDisabled).trigger("change");
          }          
        
        
        }

        checkAvailableConceirge();

        if(isNewModal) {
          isNewModal = false;
        }
      })
      .finally(function () {
        hidePropzyLoading();
      });
  };

  var loadBookTourTime = function () {
    var theForm = $("#formMakeSchedule");
    var date = theForm.find("#whenDate");
    var time = theForm.find("#whenTime");
    var scheduleTime =
      moment(time.val() + " " + date.val(), "HH:mm DD/MM/YYYY").unix() * 1000;
    var postData = {
      customerId: $("#customerId").val(), // 'KT8970',
      date: scheduleTime, //      1595178000000
    };
    var scheduleWrapperEl = $('.schedule-list-wrapper');
    
    $.ajax({
      url: "/deal/get-book-tour-time",
      data: JSON.stringify(postData),
      type: "post",
    }).done(function (response) {
      scheduleWrapperEl.html("");

      if (response.result == true) {
        var scheduleContainerElm = $("<div></div>").addClass('schedule-container');
        if (response.data.length != 0) {
          var scheduleContainers = [];

          var scheduleContainerLabelElm = $("<div></div>").addClass('schedule-label-container');
          scheduleContainerLabelElm.html(`
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <label class="col-sm-12 control-label">Danh sách đặt lịch xem của khách hàng trong ngày</label>
                            </div>
                        </div>
                    `);

          response.data.map((item) => {
            var scheduleTimeTours = [];

            var dateStart = new Date(item.startedDate);
            var minuteStart = dateStart.getMinutes();
            var hourStart = dateStart.getHours();
            item.scheduleTime
              .sort((a, b) => {
                return a - b;
              })
              .map((itemScheduleTimeTour) => {
                var dateTour = new Date(itemScheduleTimeTour);
                var minuteTour = dateTour.getMinutes();
                var hourTour = dateTour.getHours();
                scheduleTimeTours.push(`
                                <div class="col-xs-1 bs-wizard-step ">
                                    <div class="text-center bs-wizard-stepnum">${
                                      hourTour +
                                      "h" +
                                      (minuteTour ? minuteTour : "")
                                    }</div>
                                    <div class="progress"><div class="progress-bar"></div></div>
                                    <a href="javascript:void(0)" style="background:#fbe8aa" class="bs-wizard-dot"></a>
                                </div>
                            `);
              });
            if (item.scheduleTime.length < 12) {
              scheduleTimeTours.push(`
                            <div class="col-xs-${
                              12 - item.scheduleTime.length
                            } bs-wizard-step ">
                                <div class="text-center bs-wizard-stepnum hide-tour-time">&nbsp;</div>
                                <div class="progress" style="width:100%"><div class="progress-bar"></div></div>
                            </div>
                        `);
            }

            scheduleContainers.push({
              start: `${hourStart + "h" + (minuteStart ? minuteStart : "")}`,
              end: scheduleTimeTours.join(""),
            });
          });
          let startHour = `<div class="form-group row">
                                        <div class="col-sm-12">
                                            <label class="col-sm-2 control-label">Giờ bắt đầu</label>
                                            <div class="col-sm-10">
                                                <ul class="nav nav-tabs">
                                                ${scheduleContainers
                                                  .map((item, id) => {
                                                    return `<li ${
                                                      id == 0
                                                        ? 'class="active"'
                                                        : ""
                                                    }><a class="tabs-pr" href="#schedule-idx-${id}" data-id="schedule-idx-${id}">${
                                                      item.start
                                                    }</a></li>`;
                                                  })
                                                  .join("")}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>`;
          let endHour = `<div class="tab-content">${scheduleContainers
            .map((item, id) => {
              return `<div class="tab-pane ${
                id == 0 ? "fade in active" : ""
              }" id="schedule-idx-${id}"><div class="form-group row">
                        <div class="col-sm-12">
                            <label class="col-sm-2 control-label">Giờ đi xem</label>
                            <div class="col-sm-10">
                                <div class="row bs-wizard-jm " style="border-bottom:0;">${
                                  item.end
                                }</div>
                            </div>
                        </div>
                    </div></div>`;
            })
            .join("")}</div>`;
          scheduleContainerElm.html(
            '<div id="schedule-time">' + startHour + endHour + "</div>"
          );
            scheduleWrapperEl.append(scheduleContainerLabelElm);
            scheduleWrapperEl.append(scheduleContainerElm);
            $("a.tabs-pr")
            .unbind("click")
            .click(function () {
              var $obj = $(this);
              $("a.tabs-pr").parent().removeClass("active");
              $obj.parent().addClass("active");
              $("div#schedule-time div.tab-content div.tab-pane")
                .removeClass("active")
                .removeClass("fade")
                .removeClass("in");
              $(
                "div#schedule-time div.tab-content div.tab-pane#" +
                  $obj.attr("data-id")
              )
                .addClass("active")
                .addClass("fade")
                .addClass("in");
            });
        } else {
          // ko có book tour
          scheduleWrapperEl.html("");
        }
      }
    }).fail(function() {
      showPropzyAlert();
    });
  };

  var renderAddress = function (data, type, object) {
    var returnValue =
      "<div class='address-" + object.rlistingId + "'>" + data + "</div>";
    return returnValue;
  };

  var renderCCAsignee = function (data, type, object) {
    var returnValue =
      "<div asign-id-" +
      object.rlistingId +
      "='" +
      object.assignedId +
      "'>" +
      data +
      "</div>";
    return returnValue;
  };

  var renderVisitTime = function (data, type, object) {
    startVisitDate.add(object.duration, "s");
    var returnVal = "<div class='input-group bootstrap-timepicker timepicker'>";
    returnVal +=
      "<input type='text' class='visitTime visitTime-" +
      object.rlistingId +
      "' data-rlistingId='" +
      object.rlistingId +
      "' value=" +
      startVisitDate.format("HH:mm") +
      " />";
    returnVal += "</div>";
    //previousVisitTime = object.duration;
    return returnVal;
  };

  var renderScheduleListingOrder = function (data, type, object) {
    var returnValue = "<div class='center'>";
    returnValue +=
      "<a onclick=\"return Schedule.orderScheduleListing('up', " +
      object.rlistingId +
      ");\"><i class='glyphicon  glyphicon-arrow-up'></i></a>";
    returnValue +=
      "<a onclick=\"return Schedule.orderScheduleListing('down', " +
      object.rlistingId +
      ");\"><i class='glyphicon  glyphicon-arrow-down'></i></a>";
    returnValue += "</div>";
    return returnValue;
  };

  var orderScheduleListing = function (direction, rlistingId) {
    var itemIndex = selectedScheduleRlistingIds.indexOf(rlistingId);
    var replaceItem = null;
    if (direction == "up") {
      if (itemIndex == 0) {
        return;
      }
      replaceItem = selectedScheduleRlistingIds[itemIndex - 1];
      selectedScheduleRlistingIds[itemIndex - 1] = rlistingId;
    } else if (direction == "down") {
      if (itemIndex == selectedScheduleRlistingIds.length - 1) {
        return;
      }
      replaceItem = selectedScheduleRlistingIds[itemIndex + 1];
      selectedScheduleRlistingIds[itemIndex + 1] = rlistingId;
    }
    selectedScheduleRlistingIds[itemIndex] = replaceItem;
    loadScheduleListingsDataTable(selectedScheduleRlistingIds, true, true);
    return false;
  };

  var isEditingSchedule = false;
  function editSchedule(scheduleId) {
    showPropzyLoading();
    $.ajax({
      url: "/deal/schedule-detail/" + scheduleId,
      type: "get",
    })
      .done(function (response) {
        if (response.result) {
          isEditingSchedule = true;
          var addressList = [];
          var listingIdLinks = [];
          var listingIds = [];
          $(response.data.listingsList).each(function (index, item) {
            if ($(this).prop("disabled")) {
              return;
            }
            var listingId =
              '<span class="listing-group">' +
              '<a href="/listing/' +
              item.id.rlistingId +
              '" target="_blank" >' +
              item.id.rlistingId +
              "</a>" +
              '<a href="#" class="text-red"><i class="glyphicon glyphicon-remove" onclick="return deleteScheduleListing(this, \'' +
              item.id.rlistingId +
              "')\"></i></a>" +
              "; </span>";
            listingIdLinks.push(listingId);
            listingIds.push(item.id.rlistingId);
            //var address = $(this).parents('tr').find('span.address').text();
            //addressList.push(address);
          });

          $("#makeScheduleModal #scheduleId").val(response.data.scheduleId);
          $("#makeScheduleModal .address").val(response.data.address);
          $("#makeScheduleModal #whenDate").val(
            moment(response.data.scheduleTime).format("DD/MM/YYYY")
          );
          // $("#makeScheduleModal #whenTime").val(moment(response.data.scheduleTime).format('HH:mm'));
          $("#makeScheduleModal .note").val(response.data.note);
          $("#makeScheduleModal .listings").html(listingIdLinks.join(""));
          $("#makeScheduleModal .listingIds").val(listingIds.join(";"));
          event.preventDefault();
          $("#makeScheduleModal").modal('true');
        }
      })
      .fail(function() {
        showPropzyAlert();
      })
      .always(function () {
        hidePropzyLoading();
      });
    return false;
  }

  $("#btnOpenBriefFormScheduleForm").on("click", function (event) {
    isEditingSchedule = false;
    var addressList = [];
    var listingIdLinks = [];
    var listingIds = [];
    $("#listing-to-send .select-listing:checked").each(function () {
      if ($(this).prop("disabled")) {
        return;
      }
      var listingId =
        '<a href="/listing/' +
        $(this).val() +
        '" target="_blank" >' +
        $(this).val() +
        "</a>";
      listingIdLinks.push(listingId);
      listingIds.push($(this).val());
      var address = $(this).parents("tr").find("span.address").text();
      addressList.push(address);
    });
    if (listingIds.length <= 0) {
      showPropzyAlert("Chọn listing để đặt lịch");
      return;
    }
    $("#makeScheduleModal .address").val(addressList.join(";\r\n"));
    $("#makeScheduleModal .listings").html(listingIdLinks.join("; "));
    $("#makeScheduleModal .listingIds").val(listingIds.join(";"));
    event.preventDefault();
    $("#makeScheduleModal").modal('show');
  });
  $("#btnContinueScheduleForm").on("click", function (event) {
    event.preventDefault();
    $(this).hide();
    $("#btnOpenScheduleForm").show();
    //var strListingIds = $("#makeScheduleModal .listingIds").val();
    var arrListingIds = selectedScheduleRlistingIds;
    $("#dataTableSentListings .select-listing:checked").each(function () {
      if ($(this).prop("disabled")) {
        return;
      }
      var value = $(this).val();
      //arrListingIds.push(value);
    });
    generateScheduleListingLinks(arrListingIds);
    $("#makeScheduleModal .listingIds").val(arrListingIds.join(";"));
    Schedule.loadScheduleListingsDataTable(arrListingIds);
  });

  $("#makeScheduleModal .btnAddlisting").on("click", function () {
    $("#makeScheduleModal").modal("hide");
    $("#btnContinueScheduleForm").show();
    $("#btnOpenScheduleForm").hide();
  });

  $(".btnCancelSchedule").on("click", function (event) {
    event.preventDefault();
    $("#makeScheduleModal").modal("hide");
    isNewModal = true;
    isEditingSchedule = false;
    typeof dataTableSentListings !== 'undefined' && dataTableSentListings.ajax.reload();
    selectedScheduleRlistingIds = [];
  });

  $(".tableAgents_wrapper").hide();

  const checkAvailableConceirge = function () {
    if($('#makeScheduleModal').data('bs.modal') && !$('#makeScheduleModal').data('bs.modal').isShown) {
      return;
    }

    var theForm = $("#formMakeSchedule");
    var date = theForm.find("#whenDate");
    var time = theForm.find("#whenTime");
    var ccAsigneeSelected = $("#assignToConceirgeSelect").data('select2') ? $("#assignToConceirgeSelect").select2("data") : [];
    var ccAssigneeName =
      ccAsigneeSelected.length > 0 ? ccAsigneeSelected[0].text : null;

    var postData = {
      socialUid:
        ccAsigneeSelected.length > 0 ? ccAsigneeSelected[0].socialUid : null,
      scheduleTime:
        moment(time.val() + " " + date.val(), "HH:mm DD/MM/YYYY").unix() * 1000,
      estimatedDate: theForm.find("#estimatedDate").val(),
    };

    $("#formMakeSchedule").find(".txtSearchAssignTo").parent().find('.errors').html('');
    showPropzyLoading();

    $("#checking-avai-cc-message").html("");

    $.ajax({
      url: "/deal/check-duplicated-tour",
      type: "POST",
      data: JSON.stringify(postData),
    })
      .done(function (res) {
        var finishTime = $("#label_estimatedDate").html();
        var estimatedStartTime = time.val();
        var estimatedDate = date.val();
        if (res.result && res.data) {
          $("#checking-avai-cc-message").html(
            `${ccAssigneeName} đã có tour vào khung giờ <strong>${estimatedStartTime}-${finishTime}</strong> ngày <strong>${estimatedDate}</strong>. <a href="#" id="btnOpenModalSameToursDetail" class="btnRed" style="text-decoration: underline;">Xem chi tiết</a>`
          );
          $("#btnOpenModalSameToursDetail").on("click", function () {
            handleOpenDuplicatedTourList(
              JSON.stringify({
                main: postData,
                addional: {
                  assignName: ccAssigneeName,
                  estimatedStartTime: estimatedStartTime,
                  estimatedFinishTime: finishTime,
                  estimatedDate: estimatedDate,
                },
              })
            );
          });
        }
      })
      .always(function () {
        hidePropzyLoading();
      });

    return false;
  };

  const handleOpenDuplicatedTourList = function (postData) {
    showPropzyLoading();

    $.ajax({
      url: "/deal/get-duplicated-tour-list",
      type: "POST",
      data: postData,
    })
      .done(function (res) {
        $("#sameToursDetailModal").modal().find("#same-tour-listing").html(res);        
      })
      .fail(function () {
        $("#sameToursDetailModal")
          .modal()
          .find("#same-tour-listing")
          .html(`<div style="padding: 0 50px">Không thể tải danh sách tour. Vui lòng thử lại</div>`);
      })
      .always(function () {
        hidePropzyLoading();
      });
  };

  return {
    loadScheduleListingsDataTable: loadScheduleListingsDataTable,
    orderScheduleListing: orderScheduleListing,
    showModalByListingIds: showModalByListingIds,
  };
})();
