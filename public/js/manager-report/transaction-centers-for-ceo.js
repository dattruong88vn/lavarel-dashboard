var TransactionCentersReportForCeo = (function () {
    var filterPanel = $("#panelFilter");
    var filterControl = {
        txtFromDate: filterPanel.find(".fromDate"),
        txttoDate: filterPanel.find(".toDate")
    };
    window.randomScalingFactor = function () {
        return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    };

    var canvasLptLprByRegions = $("#canvas-lpt-lpr-by-regions");
    var canvasDealByStatus = $("#canvas-deal-by-status");
    var canvasDealByRegions = $("#canvas-deal-by-regions");
    var canvasDealDealWithToursLastSevenDays = $("#canvas-deal-with-tours-last-seven-days");

    filterControl.txtFromDate.datepicker();
    filterControl.txttoDate.datepicker();

    showLptLprByResions();
    showDealByStatus();
    showDealByRegions();
    showDealWithToursLastSevenDays();

    function showLptLprByResions() {
        var postData = {};
        $.ajax({
            url: "/manager-report/get-lpt-lpr-by-regions",
            typpe: "post",
            data: postData
        }).done(function (response) {
            var ctx = canvasLptLprByRegions.get(0).getContext("2d");
            var districtNames = [];
            var lptValue = [];
            var lpRValue = [];
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                districtNames[i] = item.districtName;
                lptValue[i] = item.lptValue;
                lpRValue[i] = item.lprValue;
            }
            var horizontalBarChartData = {
                labels: districtNames,
                datasets: [{
                        label: 'LPT',
                        backgroundColor: "#c0504d",
                        borderColor: "#c0504d",
                        borderWidth: 1,
                        data: lptValue
                    }, {
                        label: 'LPR',
                        backgroundColor: "#4f81bd",
                        borderColor: "#4f81bd",
                        data: lpRValue
                    }]

            };
            window.myHorizontalBar = new Chart(ctx, {
                type: 'horizontalBar',
                data: horizontalBarChartData,
                options: {
                    // Elements options apply to all of the options unless overridden in a dataset
                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                    elements: {
                        rectangle: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: false,
                        text: 'Chart.js Horizontal Bar Chart'
                    }
                }
            });
        }).always(function () {

        });
    }

    function showDealByStatus() {
        var postData = {};
        $.ajax({
            url: "/manager-report/get-deal-by-all-status",
            typpe: "post",
            data: postData
        }).done(function (response) {
            var ctx = canvasDealByStatus.get(0).getContext("2d");
            var statusNames = [];
            var value = [];
            var lpRValue = [];
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                statusNames[i] = item.statusName;
                value[i] = item.value;
            }
            window.reportDealByStatus = new Chart(ctx, {
                type: 'pie',
                data: {
                    datasets: [{
                            data: value,
                            backgroundColor: [
                                window.chartColors.red,
                                window.chartColors.orange,
                                window.chartColors.yellow,
                            ],
                            label: 'Dataset 1'
                        }],
                    labels: statusNames
                },
                options: {
                    responsive: true
                }
            });
        }).always(function () {

        });
    }

    function showDealByRegions() {
        var postData = {};
        $.ajax({
            url: "/manager-report/report-deal-by-regions",
            typpe: "post",
            data: postData
        }).done(function (response) {
            console.log(response);
            var ctx = canvasDealByRegions.get(0).getContext("2d");
            var names = [];
            var value = [];
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                names[i] = item.districtName;
                value[i] = item.value;
            }
            window.reportDealByRegions = new Chart(ctx, {
                type: 'pie',
                data: {
                    datasets: [{
                            data: value,
                            backgroundColor: [
                                window.chartColors.red,
                                window.chartColors.orange,
                                window.chartColors.yellow,
                            ],
                            label: 'Dataset 1'
                        }],
                    labels: names
                },
                options: {
                    responsive: true
                }
            });
        }).always(function () {

        });
    }

    function showDealWithToursLastSevenDays() {
        var postData = {};
        $.ajax({
            url: "/manager-report/report-deal-with-tours-last-seven-days",
            typpe: "post",
            data: postData
        }).done(function (response) {
            console.log(response);
            var ctx = canvasDealDealWithToursLastSevenDays.get(0).getContext("2d");
            var options = {
                maintainAspectRatio: true,
                spanGaps: true,
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                scales: {
                    xAxes: [{
                            ticks: {
                                autoSkip: false,
                                maxRotation: 0
                            }
                        }]
                },
                title: {
                    display: false,
                    text: 'Chart.js Horizontal Bar Chart'
                }
            };
            var names = [];
            var values = [];
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                names[i] = item.districtName;
                values[i] = item.value;
            }

            var data = {
                labels: names,
                datasets: [
                    {
                        label: "",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: values,
                        fill: false
                    }
                ]
            };
            var chartDealWithToursLastSevenDays = new Chart(ctx, {
                type: 'line',
                data: data,
                options: options
            });
        }).always(function () {

        });
    }

})();