function SAMarketReportMain() {
    var _this = this;

    _this.init = function () {
        initVAR();
        initREPORT();
    };

    function initVAR() {
        Window.sa = {};
        Window.sa.api = new SAApi();
        Window.sa.report = new SAMarketReport();
    }

    function initREPORT() {
        Window.sa.report.init();
    }

}

$(document).ready(function () {
    (new SAMarketReportMain()).init();
});