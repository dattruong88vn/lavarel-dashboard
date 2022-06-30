const moment = require("moment");

/**
*	Những start up function làm chung cho cả desktop và mobile.
*	@author: Phan Minh Hoang <hoang.phan@propzy.com>
*/
$(document).ready(function () {
    Compare.init();
    TrackUserRoute.init();
    reloadAssets(version);
});
var TrackUserRoute = (function () {

    var init = function () {
        let visitedList = getVisitedList();
        let visitedItem = {
            url: window.location.href,
            visitedDate: moment().unix() * 1000
        };
        visitedList.push(visitedItem);
        setVisitedList(visitedList);
    };

    var getVisitedList = function () {
        let visitedList = window.localStorage.getItem("visitedList");
        if (!visitedList) {
            visitedList = [];
        } else {
            visitedList = JSON.parse(visitedList);
        }
        return visitedList;
    };

    var setVisitedList = function (list) {
        list = JSON.stringify(list);
        window.localStorage.setItem("visitedList", list);
    };

    var clearVisitedList = function () {
        window.localStorage.setItem("visitedList", []);
    };

    return {
        init: init,
        getVisitedList: getVisitedList,
        setVisitedList: setVisitedList,
        clearVisitedList: clearVisitedList
    };

})();