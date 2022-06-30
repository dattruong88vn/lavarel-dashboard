function SAListingFeedback(disableAutoLoadData) {
    var _this = this
    var api = {
        getSAListingFeedback: "/pos/SaApi/getSAListingFeedback",
        getFeedbackConcierge: "/pos/SaApi/getFeedbackConcierge",
        getTourTotalList: "/pos/SaApi/getTourTotalList",
    }

    _this.init = init

    function init() {
        if (disableAutoLoadData != true) {
            renderTotal()
        }
        bindEvent()
    }

    function bindEvent() {
        $("body")
            .off("click", "#showListingFeedback")
            .on("click", "#showListingFeedback", function (e) {
                e.preventDefault()
                dataPost.rlistingId = Window.sa.data.rlistingId()
                feedback.loadData()
            })
        $("body")
            .off("click", "#btn-show-feedback-concierge-detail")
            .on("click", "#btn-show-feedback-concierge-detail", function (e) {
                e.preventDefault()
                dataPost.rlistingId = Window.sa.data.rlistingId()
                feedbackCC.loadData()
            })

        $("body").on("click", "#showListingFeedbackForManager", function (e) {
            e.preventDefault()
            dataPost.rlistingId = parseInt($(this).data("rlistingid"))
            feedback.loadData()
        })
        $("body").on("click", "#btn-show-feedback-concierge", function (e) {
            e.preventDefault()
            dataPost.rlistingId = parseInt($(this).data("rlistingid"))
            feedbackCC.loadData()
        })
    }

    var dataPost = {
        rlistingId: null,
    }
    stored = {}

    var feedback = {
        ids: {
            modalId: "#listing-feedback-table-modal",
            tableId: "#listing-feedback-table",
        },
        table: null,
        variables: {
            total: 0,
        },
        loadData: function () {
            try {
                feedback.table.destroy()
            } catch (Ex) {
                // nothing
            }
            getSAListingFeedback().done(function (json) {
                var data = renderDataFeedback(json)

                feedback.variables.total = json.recordsTotal
                $(feedback.ids.tableId).html("")
                feedback.table = $(feedback.ids.tableId).DataTable({
                    bSort: false,
                    autoWidth: true,
                    deferRender: false,
                    lengthChange: false,
                    paging: true,
                    searching: false,
                    language: DatatableHelper.languages.vn,
                    columns: data.columns,
                    data: data.columnData,
                })

                if (feedback.variables.total > 0) {
                    $(feedback.ids.modalId).modal()
                } else {
                    showPropzyAlert(
                        "Chưa có thông tin phản hồi nào cho tin đăng này."
                    )
                }
            })
        },
    }

    var feedbackCC = {
        ids: {
            modalId: "#sa-feedback-concierge-modal",
            tableId: "#tb-sa-feedback-concierge",
        },
        table: null,
        variables: {
            total: 0,
        },
        loadData: function () {
            try {
                feedbackCC.table.destroy()
                $(feedbackCC.ids.tableId).html("")
            } catch (Ex) {
                // nothing
            }
            getFeedbackConcierge().done(function (json) {
                var data = renderDataFeedbackCC(json)

                feedbackCC.variables.total = json.recordsTotal
                feedbackCC.table = $(feedbackCC.ids.tableId).DataTable({
                    bSort: false,
                    autoWidth: true,
                    deferRender: false,
                    lengthChange: false,
                    paging: true,
                    searching: false,
                    language: DatatableHelper.languages.vn,
                    columns: data.columns,
                    data: data.columnData,
                })

                if (feedbackCC.variables.total > 0) {
                    $(feedbackCC.ids.modalId).modal()
                } else {
                    showPropzyAlert(
                        "Chưa có thông tin phản hồi nào cho tin đăng này."
                    )
                }
            })
        },
    }
    function getSAListingFeedback() {
        return $.ajax({
            url: api.getSAListingFeedback,
            type: "POST",
            data: dataPost,
        })
    }
    function getFeedbackConcierge() {
        return $.ajax({
            url: api.getFeedbackConcierge,
            type: "POST",
            data: dataPost,
        })
    }
    function getTourTotalList() {
        return $.ajax({
            url: api.getTourTotalList,
            type: "POST",
            data: dataPost,
        })
    }

    function renderTotal() {
        dataPost.rlistingId = Window.sa.data.rlistingId()
        getTourTotalList().done(function (response) {
            var data = response.data
            var totalFeedback = 0
            var totalCCFeedback = 0
            $.each(data, function (index, val) {
                totalFeedback += val.totalFeedback
                totalCCFeedback += val.totalCCFeedback
            })
            $("#listingFeedbackCount").html(totalFeedback)
            $("#count-feedback-concierge-detail").html(totalCCFeedback)
        })
    }

    function renderDataFeedback(response) {
        var data = response.data
        var columns = [
            {
                class: "feedbackDate",
                title: "Ngày",
            },
        ]
        var columnData = []
        if (hasValue(data)) {
            var dataTitle = data[0]
            var dataValue = data.splice(1, data.length - 1)
            var columnsResponse = $.map(dataTitle.titles, function (
                val,
                index
            ) {
                return { title: val.name }
            })

            columns = columns.concat(columnsResponse)
            columnData = $.map(dataValue, function (val, index) {
                var contents = [
                    hasValue(val.createdDate)
                        ? moment(val.createdDate).format("DD/MM/YYYY")
                        : "N/A",
                ]
                $.each(val.results, function (i, e) {
                    if (e.code == "ykienkhac") {
                        contents.push(
                            "<div>" +
                                (hasValue(e.content) ? e.content : "") +
                                "</div>"
                        )
                    } else {
                        contents.push(
                            '<div class="rating rating_' +
                                e.percentValue / 20 +
                                '"></div>' +
                                "<div>" +
                                (!hasValue(e.reason) || e.reason == "N/A"
                                    ? ""
                                    : e.reason) +
                                "</div>"
                        )
                    }
                })
                return [contents]
            })
        }

        return {
            columns: columns,
            columnData: columnData,
        }
    }

    function renderDataFeedbackCC(response) {
        var data = response.data
        var columns = [
            {
                class: "feedbackDate",
                title: "Ngày",
            },
        ]
        var columnData = []
        if (hasValue(data)) {
            var dataTitle = data[0]
            var dataValue = data.splice(1, data.length - 1)
            var columnsResponse = $.map(dataTitle.titles, function (
                val,
                index
            ) {
                return { title: val.name }
            })

            columns = columns.concat(columnsResponse)
            columnData = $.map(dataValue, function (val, index) {
                var contents = [
                    hasValue(val.createdDate)
                        ? moment(val.createdDate).format("DD/MM/YYYY")
                        : "N/A",
                ]
                $.each(val.results, function (i, e) {
                    /*if(e.code == 'ykienkhac') {
                        contents.push('<div>' + (hasValue(e.content) ? e.content : '') + '</div>');
                    } else {
                        contents.push('<div class="rating rating_' + (e.percentValue / 20) + '"></div>' + '<div>' + ((!hasValue(e.reason) || e.reason == 'N/A') ? '' : e.reason) + '</div>');
                    }*/
                    contents.push(
                        "<div>" +
                            (hasValue(e.content) ? e.content : "") +
                            "</div>"
                    )
                })
                return [contents]
            })
        }

        return {
            columns: columns,
            columnData: columnData,
        }
    }
}
