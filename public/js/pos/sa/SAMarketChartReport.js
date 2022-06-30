function SAMarketChartReport() {
    var _this = this;

    _this.init = function () {
        initVAR();
        bindEvent();

        _this.draw();
    };

    function initVAR() {
        _this.unitNumber = '#numberUnit';
        _this.unit = '#unit';
        _this.container = 'chart';
        _this.chart = null;
        _this.draw = function () {
            _this.data().done(function (response) {
                var pointProvides = {
                    x: [],
                    y: [],
                    fill: 'tozeroy',
                    type: 'scatter',
                    name: 'Biểu đồ cung',
                    hoverinfo: 'x',
                    marker: {
                        color: '#23b7e5'
                    }
                };

                if (hasValue(response.data)) {
                    for (var i in response.data.pointProvides) {
                        pointProvides.x.push(response.data.pointProvides[i].x);
                        pointProvides.y.push(response.data.pointProvides[i].y);
                    }
                }

                var pointRequests = {
                    x: [],
                    y: [],
                    fill: 'tozeroy',
                    type: 'scatter',
                    name: 'Biểu đồ cầu',
                    hoverinfo: 'x',
                    marker: {
                        color: '#2A80E5'
                    }
                };

                if (hasValue(response.data)) {
                    for (var i in response.data.pointRequests) {
                        pointRequests.x.push(response.data.pointRequests[i].x);
                        pointRequests.y.push(response.data.pointRequests[i].y);
                    }
                }

                var currentPoint = {
                        x: [response.data.currentPoint.x],
                        y: [response.data.currentPoint.y],
                        mode: 'markers+text',
                        text: '<b>' + numberWithCommas(response.data.currentPoint.x) + '</b>',
                        textfont: {
                            family: 'sans serif',
                            size: 18,
                            color: '#ff7f0e'
                        },
                        textposition: 'top',
                        marker: {
                            size: 30, color:
                                'red'
                        },
                        type: 'scatter',
                        name: 'Giá hiện tại',
                        hoverinfo: 'skip'
                    }
                ;

                var data = [pointProvides, pointRequests, currentPoint];

                var layout = {
                    xaxis: {
                        title: 'Giá'
                        // range: $.merge([0], response.data.coordXs)
                    },
                    yaxis: {
                        title: 'Số lượng'
                        // range: $.merge([0], response.data.coordYs)
                    },
                    legend: {
                        orientation: 'h'
                    }
                };

                _this.chart = Plotly.newPlot(_this.container, data, layout, {displayModeBar: false});
            });
        };

        _this.data = function () {
            var data = {};
            data.rlistingId = Window.jsData.rlistingId;
            data.numberUnit = $(_this.unitNumber).val();
            data.unit = $(_this.unit).val();

            return Window.sa.api.marketReportChartData(data);
        };

        _this.update = function () {
            _this.data().done(function (response) {
                var pointProvides = {
                    x: [],
                    y: [],
                    fill: 'tozeroy',
                    type: 'scatter',
                    name: 'Biểu đồ cung',
                    hoverinfo: 'x',
                    marker: {
                        color: '#23b7e5'
                    }
                };

                for (var i in response.data.pointProvides) {
                    pointProvides.x.push(response.data.pointProvides[i].x);
                    pointProvides.y.push(response.data.pointProvides[i].y);
                }

                var pointRequests = {
                    x: [],
                    y: [],
                    fill: 'tozeroy',
                    type: 'scatter',
                    name: 'Biểu đồ cầu',
                    hoverinfo: 'x',
                    marker: {
                        color: '#2A80E5'
                    }
                };

                for (var i in response.data.pointRequests) {
                    pointRequests.x.push(response.data.pointRequests[i].x);
                    pointRequests.y.push(response.data.pointRequests[i].y);
                }

                var currentPoint = {
                        x: [response.data.currentPoint.x],
                        y: [response.data.currentPoint.y],
                        mode: 'markers+text',
                        text: '<b>' + numberWithCommas(response.data.currentPoint.x) + '</b>',
                        textfont: {
                            family: 'sans serif',
                            size: 58,
                            color: '#ff7f0e'
                        },
                        textposition: 'top',
                        marker: {
                            size: 50, color:
                                'red'
                        },
                        type: 'scatter',
                        name: 'Giá hiện tại',
                        hoverinfo: 'skip'
                    }
                ;

                var data = [pointProvides, pointRequests, currentPoint];

                var layout = {
                    xaxis: {
                        title: 'Giá'
                        // range: $.merge([0], response.data.coordXs)
                    },
                    yaxis: {
                        title: 'Số lượng'
                        // range: $.merge([0], response.data.coordYs)
                    },
                    legend: {
                        orientation: 'h'
                    }
                };

                Plotly.redraw(_this.container, data, layout, {displayModeBar: false});
            });
        }
    }

    function bindEvent() {
        $(_this.unitNumber).on('change', function (e) {
            e.preventDefault();
            _this.update();
        });

        $(_this.unit).on('change', function (e) {
            e.preventDefault();
            _this.update();
        });
    }

    function numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
}