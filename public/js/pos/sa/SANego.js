function SANego() {
  this.init = function () {
    initVAR();
  };

  function initVAR() {
    new history().init();
  }

  function history() {
    var _this = this;
    var rlistingId = null;
    var phone = null;

    _this.init = function () {
      bindEvent();
    };

    function bindEvent() {
      $("body")
        .off("click", ".showNegoHistoryList")
        .on("click", ".showNegoHistoryList", function () {
          rlistingId = $(this).data("rlistingId");
          if (hasValue(rlistingId)) {
            rlistingId = parseInt(rlistingId);
            loadNegoHistoryList();
          } else {
            showPropzyAlert("rlistingId không hợp lệ.");
          }
        });
      $("body")
        .off("click", ".negoAction")
        .on("click", ".negoAction", function () {
          var action = $(this).data("action");
          negoActionList[action]();
        });
    }
    var filter = {
      ui: {
        negoStatus: {
          id: "#negoStatus",
          type: "multiSelect2",
          wrapper: "#negoStatus-wrapper",
          attrs: {
            id: "negoStatus",
            class: "form-control",
            value: "",
            placeholder: "Chọn trạng thái thương lượng"
          },
          options: {
            type: "ajax",
            data: function () {
              return api.getNegoStatusList();
            },
            callback: function (response) {
              var optionList = [];
              if (response.result) {
                $.each(response.data, function (id, item) {
                  optionList.push({
                    value: item.statusId,
                    text: item.statusName
                  });
                });
              }
              return optionList;
            }
          }
        }
      }
    };
    var myFilterForm = new MyForm(filter);
    myFilterForm.init();

    var negoCancel = {
      ui: {
        negoCancelReason: {
          id: "#negoCancelReason",
          type: "select2",
          wrapper: "#negoCancelReason-wrapper",
          attrs: {
            id: "negoCancelReason",
            class: "form-control",
            value: "",
            placeholder: "Lý do từ chố i thương lượng"
          },
          options: {
            type: "ajax",
            data: function () {
              return api.getNegoCancelReasonList();
            },
            callback: function (response) {
              var optionList = [];
              if (response.result) {
                $.each(response.data, function (id, item) {
                  optionList.push({
                    value: item.statusId,
                    text: item.statusName
                  });
                });
              }
              return optionList;
            }
          }
        },
        negoCancelNote: {
          id: "#negoCancelNote",
          type: "textarea",
          wrapper: "#negoCancelNote-wrapper",
          attrs: {
            id: "negoCancelNote",
            class: "form-control",
            value: "",
            placeholder: "Ghi chú"
          }
        }
      }
    };
    var myNegoCancelForm = new MyForm(negoCancel);
    myNegoCancelForm.init();

    var negoNew = {
      ui: {
        negoNewPrice: {
          id: "#negoNewPrice",
          type: "input",
          wrapper: "#negoNewPrice-wrapper",
          attrs: {
            id: "negoNewPrice",
            class: "form-control",
            value: "",
            placeholder: "Ghi chú"
          }
        },
        negoNewNote: {
          id: "#negoNewNote",
          type: "textarea",
          wrapper: "#negoNewNote-wrapper",
          attrs: {
            id: "negoNewNote",
            class: "form-control",
            value: "",
            placeholder: "Ghi chú"
          }
        }
      }
    };
    var myNegoNewForm = new MyForm(negoNew);
    myNegoNewForm.init();

    var table = null;
    var tableId = "#negoHistoryList";
    var popupId = "#negoHistoryListPopup";
    var api = {
      getNegoHistoryList: "/pos/SaApi/getNegoHistoryList"
    };
    var searchParams = {};

    function updateSearchParams() {
      searchParams = $.extend(true, searchParams, filterForm.data());
    }

    var negoActionList = {
      negoCancelSave: function () {
        var data = myNegoCancelForm.data();
      },
      negoNewSave: function () {
        var data = myNegoNewForm.data();
      }
    };

    function loadNegoHistoryList() {
      ajaxStart();
      var columns = [{
        data: "dealId",
        render: function (data, type, object) {
          return object.dealId;
        }
      }];
      try {
        table.destroy();
      } catch (Ex) {
        // nothing
      }
      table = $(tableId)
        .DataTable({
          processing: false,
          serverSide: false,
          bSort: false,
          ajax: {
            url: api.getNegoHistoryList,
            type: "POST",
            data: {
              rlistingId: rlistingId,
              searchParams: searchParams
            }
          },
          autoWidth: true,
          deferRender: false,
          lengthChange: false,
          paging: true,
          searching: false,
          ordering: true,
          language: DatatableHelper.languages.vn,
          columns: columns
        })
        .off("processing.dt")
        .on("processing.dt", function (e, settings, processing) {
          if (processing) {
            ajaxStart();
          } else {
            $(popupId).modal();
            ajaxEnd();
          }
        })
        .on("xhr.dt", function (e, settings, json, xhr) {
          ajaxEnd();
        });
    }
  }
}