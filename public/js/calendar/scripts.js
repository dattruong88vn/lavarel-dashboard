// DEV by JackSM
var CalendarPropzy = (function() {
    // CONFIG
    var customConfig = {};
    var configDefault = function () {
        return {
            height: 'auto',
            lang: 'vi',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            buttonText: {
                today: 'Hôm nay',
                month: 'Tháng',
                week: 'Tuần',
                day: 'Ngày'
            },
            eventLimit: true,
            editable: false,
            droppable: false,
            events : [],
        }
    }
    customConfig = configDefault();
    // \CONFIG

    var renderCalendar = function (response) {

        var tasks = response;

        customConfig.events = tasks

        $('#calendar').fullCalendar(customConfig);
    }

    var init = function (response) {
        renderCalendar(response);
    }

    return {
        init : init,
        customConfig : customConfig
    };

})();

class CalendarProps {
    constructor(props = {}) {
        // default config
        const that = this;

        this._EVENT_COLOR = {
            'blue' : 'event-blue',
            'green' : 'event-green',
            'red' : 'event-red',
            'azure' : 'event-azure',
            'orange' : 'event-orange',
            'default' : 'event-default',
            'rose' : 'event-rose'
        };
        this._TASK_CODE = {
            0 : {
                'code' : 'ALL',
                'script' : 'noneScript',
                'name': 'Tất cả'
            },
            32 :  {
                'code' : 'CRM_XAC_NHAN_NHU_CAU_SAU_MEETING',
                'script' : 'CRM_XAC_NHAN_NHU_CAU_SAU_MEETING',
                'name': 'Xác nhận metting'
            },
            121 : {
                'code' : 'REQUEST_CONTACT_DEPOSIT_FOR_SA',
                'script' : 'SA-redirect',
                'name': 'Hỗ trợ đặt cọc'
            },
            123 : {
                'code' : 'SA_LIVED_LISTING',
                'script' : 'SA-redirect',
                'name': 'Live tinh đăng'
            },
            125 : {
                'code' : 'SA_RECALL_OWNER',
                'script' : 'SA-redirect',
                'name': 'Gọi điện chủ nhà'
            },
            130 : {
                'code' : 'SA_FEEDBACK_EMPTY_CHECK',
                'script' : 'SA-feedback-empty-code',
                'name': 'Trả lời check trống'
            },
            132 : {
                'code' : 'SA_FEEDBACK_DEAL',
                'script' : 'SA-feedback-deal',
                'name': 'Trả lời thương lượng'
            },
            134 : {
                'code' : 'SA_FEEDBACK_DEPOSIT',
                'script' : 'SA-feedback-deposit',
                'name': 'Trả lời đặt cọc'
            },
            136 : {
                'code' : 'SA_UPDATE_POSITION',
                'script' : 'SA-update_position',
                'name': 'Cập nhật vị trí'
            },
            140 : {
                'code' : 'SA_CANCEL_DEPOSIT',
                'script' : 'SA-cancel-deposit',
                'name': 'Hủy đặt cọc'
            },
            9999 : {
                'code' : 'CRM_TOUR_TASK',
                'script' : 'CRM_TOUR_TASK',
                'name': 'Tour'
            }
        };
        that._CONFIG = props.config ? props.config : {
            timezone:'local',
            height: 'auto',
            timeFormat: 'H:mm',
            lang: 'vi',
            displayEventTime: false,
            eventRender: function (event, element) {

            },
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            eventLimit: true,
            editable: false,
            droppable: false
        };
        that._WRAPPER = props.wrapper ? props.wrapper : null;
        that._URL_TASK = props.url ? props.url : '/calendar/get-tasks';
        let urlParams = new URLSearchParams(window.location.search);
        let departmentSesg = urlParams.get('deparment');

        that._FILTER = {
            "departmentSesg":departmentSesg,
            "departmentIdList" : "",
            "defineIds" : '',
            "userIdList" : '',
            "fromDate": null,
            "isClosed" : null,
            "toDate": null

        };
        // throw exception
        if(!that._WRAPPER)
            throw ('WRAPPER to include content calender is not exist!');

    }

    initCalendar() {

        // call render calendar
        const that = this;
        // bind event;
        that.events();
        console.log(this._CONFIG);
        $(that._WRAPPER).fullCalendar(this._CONFIG);

        // setInterval(function (e) {
        //     $(that._WRAPPER).fullCalendar('refetchEvents');
        // }, 10000);
    }

    reloadCalendar() {
        const that = this;
        $(that._WRAPPER).fullCalendar('refetchEvents');
    }


    updateFilter(data) {
        const that = this;
        that._FILTER.departmentIdList = data.departmentIdList != null ? data.departmentIdList : that._FILTER.departmentIdList;

        that._FILTER.defineIds = data.defineIds != null ? data.defineIds : that._FILTER.defineIds;
        that._FILTER.fromDate = data.start != null ? data.start.unix() * 1000 : that._FILTER.fromDate;
        that._FILTER.toDate = data.end != null ? data.end.unix() * 1000 : that._FILTER.fromDate;

        if (typeof (data.defineIds) !== "undefined") {
            that._FILTER.defineIds = data.defineIds != 0 ? data.defineIds : null;
        }

        if (typeof data.userIdList !== 'undefined') {
            if (data.userIdList == 0) {
                that._FILTER.userIdList = null;
            } else {
                that._FILTER.userIdList = data.userIdList;
            }
        }
        if (data.isClosed != null) {
            switch (data.isClosed) {
                case 0 : {
                    that._FILTER.isClosed = false;
                    break;
                }
                case 1 : {
                    that._FILTER.isClosed = true;
                    break;
                }
                default : {
                    that._FILTER.isClosed = null;
                    break;
                }
            }
        }
        if (typeof data.statusCC !== 'undefined') {
            if (data.statusCC == '') {
                that._FILTER.statusCC = null;
            } else {
                that._FILTER.statusCC = data.statusCC;
            }
        }

    }

    async updateCalender(callback) {
        const that = this;
        let data = [];
        let filter = that._FILTER;
        console.log(GET_segment["deparment"]);
        if(typeof GET_segment["deparment"] !== 'undefined' && GET_segment["deparment"] == "cc"){
            filter.deparmentFlag = 'cc';
        }
        await $.ajax({
            method: "POST",
            url: that._URL_TASK,
            data: filter,
            dataType: "json"
        })
        .done(function( response ) {
            if (response.result) {
                data = response.data;
            }
        })
        .fail(function (err) {
            console.error(err);
        });

        callback(that.formatDataCalendar(data));

    }

    /** format data to include
     *
     * @param data
     * @returns {Array}
     */
    formatDataCalendar(data) {
        const that = this;
        const dataFormat = [];
        const timeNow = moment().unix() * 1000;
        data.forEach(task => {
            task.list.forEach(list => {
                let color = '';
                switch (list.priorityId) {
                    case 1 : {
                        //low
                        color = that._EVENT_COLOR.rose;
                        break;
                    }
                    case 2 : {
                        //hight
                        color = that._EVENT_COLOR.orange;
                        break;
                    }
                    case 3 : {
                        //nomal
                        color = that._EVENT_COLOR.azure;
                        break;
                    }
                }
                if(list.scheduleTime < timeNow) {
                    color = that._EVENT_COLOR.default;
                }
                dataFormat.push({
                    id : list.taskId,
                    title: list.taskName,
                    start: task.date,
                    end: list.scheduleTime,
                    allDay: false,
                    className: color
                });
            });
        });
        return dataFormat;
    }


    /**
     * Function return color event
     */
    getColorEvent() {
        return this._EVENT_COLOR;
    }

    /**
     * function event for calendar
     */

    events() {
        const that = this;
        that.configEventsCalendar();
        that.configCalendarOthers();
    }

    configEventsCalendar() {
        const that = this;
        that._CONFIG.events = function(start, end, timezone, callback) {
            that.updateFilter({
                start : start,
                end : end
            });
            that.updateCalender(function (e) {
                callback(e);
            });
        };
    }
    configCalendarOthers() {
        //override todo
    }

}


