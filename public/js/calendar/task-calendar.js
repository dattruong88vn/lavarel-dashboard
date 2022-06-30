class TaskCalendar extends CalendarProps {
    constructor(props) {
        // call contructor of parent
        super(props);
        this._IS_ADMIN = props.isAdmin === true ? true : false;
        this._DEPARTMENT = props.department ? props.department : null;
        this._LIST_EVENT = [];
        this._LIST_EXIST_EVENT_MONTH = new Set();
        this._MAP_EVENTS_GROUP = new Map();
        this._API = new Map();
        this._IS_MONTH = true;
        this.addApiUrl();
        this.loadFilter();
        this.filterCalendarAction();
        this.bindEvents();
        this.loadActionTask();
        this.initCalendar();
        Window.calendarActionClickTask = new Map();
    }

    addApiUrl() {
        this._API.set('GET_USER_BY_DEPARTMENT','/calendar/get-user-by-department');
    }

    /**
     * @override : formatDataCalendar of calendar
     * @param data
     * @returns {Array}
     */
    formatDataCalendar(data) {
        const that = this;
        const dataFormat = [];
        const timeNow = moment().unix() * 1000;
        that._MAP_EVENTS_GROUP = new Map();
        data.forEach(task => {
            task.list.forEach(list => {
                let color = '';
                let typeColor = 0;
                switch (list.priorityId) {
                    case 1 : {
                        //low
                        color = that._EVENT_COLOR.azure;
                        typeColor = 1;
                        break;
                    }
                    case 2 : {
                        //hight
                        color = that._EVENT_COLOR.orange;
                        typeColor = 3;
                        break;
                    }
                    case 3 : {
                        //nomal
                        color = that._EVENT_COLOR.green;
                        typeColor = 2;
                        break;
                    }
                }
                if(typeof list.endDate !== 'undefined' && list.endDate != null){
                    if(list.endDate < timeNow) {
                        color = that._EVENT_COLOR.red;
                        typeColor = 4;
                    }
                }

                if(typeof list.isClosed !== 'undefined' && list.isClosed != null){
                    if(list.isClosed) {
                        color = that._EVENT_COLOR.default;
                        typeColor = 0;
                    }
                }

                let title = '';
                if (list.taskName) {
                    title = list.taskName;
                    if(typeof GET_segment["deparment"] !== 'undefined' && list.dealAssignedTo == currentUser.userId){
                        title = '<i class="fa fa-user-circle" aria-hidden="true"></i> '+title;
                    }
                } else {
                    title = that._TASK_CODE[list.defineId] ? that._TASK_CODE[list.defineId].name : 'N/A';
                    if(typeof GET_segment["deparment"] !== 'undefined' && list.dealAssignedTo == currentUser.userId){
                        title = '<i class="fa fa-user-circle" aria-hidden="true"></i> '+title;
                    }
                }

                const endDate = that._IS_MONTH ? list.startDate : list.endDate;
                const event = {
                    id : typeof GET_segment["deparment"] !== 'undefined' ? list.scheduleId : list.taskId,
                    isClosed : list.isClosed,
                    title: title,
                    defineId : list.defineId,
                    data : list,
                    start: list.startDate,
                    end: endDate,
                    realEnd : list.endDate,
                    allDay: false,
                    className: color,
                    typeColor : typeColor
                };
                dataFormat.push(event);
                // set event group in map
                const dateStart = moment(event.start).format('YYYY-MM-DD');
                let setEvents = null;
                if(that._MAP_EVENTS_GROUP.has(dateStart)) {
                    setEvents = that._MAP_EVENTS_GROUP.get(dateStart).add(event);
                } else {
                    setEvents = new Set([event]);
                }
                that._MAP_EVENTS_GROUP.set(dateStart, setEvents);

            });
        });
        that._LIST_EVENT = dataFormat;
        // sort map and render
        that._MAP_EVENTS_GROUP = new Map([...that._MAP_EVENTS_GROUP.entries()].sort());
        that.renderNotifyCalendar();
        return dataFormat;
    }
    
    configEventsCalendar() {
        const that = this;
        that._CONFIG.events = function(start, end, timezone, callback) {
            // console.log("star ->>" + moment(start).format("DD/MM/YYYY"));
            // console.log("end ->>" + moment(end).format("DD/MM/YYYY"));
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
        const that = this;
        that._CONFIG.eventMouseover = function (event, jsEvent, view) {
            var tooltip = '<div class="tooltip-event-calendar">' + event.title + '</div>';
            var $tooltip = $(tooltip).appendTo('body');

            if(view.type != "month") {
                $(this).mouseover(function (e) {
                    $(this).css('z-index', 10000);
                    $tooltip.fadeIn('500');
                    $tooltip.fadeTo('10', 1.9);
                }).mousemove(function (e) {
                    $tooltip.css('top', e.pageY + 10);
                    $tooltip.css('left', e.pageX + 20);
                });
            }
        };
        // mouse out
        that._CONFIG.eventMouseout = function (event, jsEvent, view) {
            $(this).css('z-index', 8);
            $('.tooltip-event-calendar').remove();
        };
        // event click
        that._CONFIG.eventClick = function (event, jsEvent, view) {
            if(view.type !== "month") {
                if (typeof that._TASK_CODE[event.defineId] !== 'undefined') {
                    if (Window.calendarActionClickTask.has(that._TASK_CODE[event.defineId].code)) {
                        Window.calendarActionClickTask.get(that._TASK_CODE[event.defineId].code)(event);
                    }
                } else {
                    window.location.href = "/crm-dashboard/task-detail/" + event.data.taskId + "?defineId=" + event.defineId;
                }
            }
        };
        that._CONFIG.eventRender  = function (event, element, view) {
            element.find('span.fc-title, div.fc-title').html(element.find('span.fc-title, div.fc-title').text().replace(/<br\s*[\/]?>/gi, "\n"));
            if(view.type == "month") {

                //let isShow = false;
                let total = 0;
                let dateStart = moment(event.start).format('YYYY-MM-DD');
                if (!that._LIST_EXIST_EVENT_MONTH.has(dateStart)) {
                    let color = '';
                    let eventsInDay = that._MAP_EVENTS_GROUP.get(dateStart);
                    if (eventsInDay) {
                        total = eventsInDay.size;
                        let typeColors = [];
                        eventsInDay.forEach(it => {
                            that._LIST_EXIST_EVENT_MONTH.add(dateStart);
                            typeColors.push(it.typeColor);
                        });
                        let maxTypeColor = Math.max(...typeColors);
                        switch (maxTypeColor) {
                            case 0 : {
                                color = that._EVENT_COLOR.default;
                                break;
                            }
                            case 1 : {
                                color = that._EVENT_COLOR.azure;
                                break;
                            }
                            case 2 : {
                                color = that._EVENT_COLOR.green;
                                break;
                            }
                            case 3 : {
                                color = that._EVENT_COLOR.orange;
                                break;
                            }
                            case 4 : {
                                color = that._EVENT_COLOR.red;
                                break;
                            }
                        }
                    }
                    return $('<div class="fc-events-group-month fc-event-group-task '+ color +'" data-date="'+dateStart+'">' + total + '</div>');
                }
                return $('<div></div>');
            }
        };
        that._CONFIG.eventAfterAllRender = function (view) {
            that._LIST_EXIST_EVENT_MONTH.clear();
        };
    }

    renderNotifyCalendar(_date) {
        const that = this;
        let liGroup = ``;
        if(that._MAP_EVENTS_GROUP.size > 0) {
            let mapGroup = null;
            if(_date) {
                if (that._MAP_EVENTS_GROUP.has(_date)) {
                    mapGroup = new Map([[_date, that._MAP_EVENTS_GROUP.get(_date)]]);
                } else {
                    mapGroup = new Map();
                }
            } else {
                mapGroup = new Map(...[that._MAP_EVENTS_GROUP.entries()]);
            }
            mapGroup.forEach(groupDate => {
                let date = '';
                let li = ``;
                if (groupDate && groupDate.size > 0) {
                    date = moment(groupDate.values().next().value.start).format('DD/MM/YYYY');
                    groupDate = new Set([...groupDate].sort(function (a, b) {
                        return b.typeColor - a.typeColor;
                    }));
                    groupDate.forEach(event => {
                        let duration = moment.duration((event.realEnd - event.start)).get('hours') + ' giờ ' + moment.duration((event.realEnd - event.start)).get('minutes') + ' phút';
                        let timeStart = moment(event.start).format('HH:mm');
                        let timeEnd = moment(event.realEnd).format('HH:mm');
                        li += `<div class="calendar-notify-events" data-id="${event.id}">
                                    <div>
                                        <div class="calendar-notify-events-content">
                                            <div>${event.title}</div>
                                            <span style="font-style: italic">${timeStart} - ${timeEnd} (${duration} )</span>
                                        </div>
                                    </div>
                                    <div class="fc-event-define-task ${event.className}"></div>
                                </div>`;
                    });
                }
                liGroup += `<div class="calendar-notify-group-day">
                                <p>${date}</p>
                                <button type="button" class="btn" data-toggle="modal" data-target="#myModal">Kiểm tra</button>
                                <ul>
                                    <li>${li}</li>
                                </ul>
                            </div>`;
            });
        }
        let htmlGroupDate = `<div class="">

                                <div class="calendar-notify-header">
                                    <span class="fa fa-close calendar-notify-close"></span>
                                </div>
                               
                                <div class="calendar-notify-content">
                                    <ul>
                                        <li>
                                            ${liGroup}
                                        </li>
                                    </ul>
                                </div>

                            </div>`;

        $('#group-event-month-calendar').html(htmlGroupDate);
    }
    async loadFilter() {
        const that = this;
        if(that._IS_ADMIN || typeof GET_segment["deparment"] !== 'undefined') {
            $.ajax({
                url: that._API.get('GET_USER_BY_DEPARTMENT'),
                type: "GET",
                data: { departmentId :  that._DEPARTMENT, flagDepartment : GET_segment["deparment"]},
            })
                .success(xhr => {
                    let data = [{
                        id: 0,
                        text: 'Tất cả'
                    }];
                    if(xhr.result) {
                        let dataContent = xhr.data.map(it => {
                            return {
                                id: it.userId,
                                text: it.name
                            };
                        });
                        data = data.concat(dataContent);
                    }
                    $("#calendar-filter-users").select2({
                        data: data,
                    });
                })
                .fail(err => {
                    let data = [{
                        id: 0,
                        text: 'Tất cả'
                    }];
                    $("#calendar-filter-users").select2({
                        data: data,
                    });
                });

        }
        // load task
        let typeTask = [];
        let taskCodes = [];
        switch (that._DEPARTMENT) {
            case 14: {
                break;
            }
            case 15 : {
                break ;
            }
            case 16 : {
                break;
            }
            case 17 : {
                taskCodes = [0, 121, 123, 125, 130, 132, 134, 136, 140];
                break;
            }
            case 12 : {
                taskCodes = [32,9999];
                break;
            }
            case 5 : {
                break;
            }
        }
        typeTask = taskCodes.map(id => {
            return {
                id : id,
                text : that._TASK_CODE[id] ? that._TASK_CODE[id].name : 'N/A'
            };
        });
        // $('#calendar-filter-type-task').select2({
        //     data: typeTask,
        // });
        $.ajax({
            url: "common/get-define-ids",
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({deparmentId:that._DEPARTMENT})
        }).done(function(data){
            var resultTmp = [];
            $.each(data,function (k,v) {
                resultTmp.push(v);
                // if(v.childsList.length > 0){
                //     $.each(v.childsList,function (kchild,vchild) {
                //         resultTmp.push(vchild);
                //     })
                // }
            })
            var result = $.map(resultTmp, function (x) {
                return {
                    id: x.defineId,
                    text: x.name
                };

            });
            result.unshift({id:0,text:"Tất cả"})
            $("#calendar-filter-type-task").select2({
                data: result,
            });
        });
        let isClosed = [{id : -1, text : 'Tất cả'}, {id : 0, text : 'Chưa hoàn thành'}, {id : 1, text : 'Đã hoàn thành'}];
        $('#calendar-filter-is-closed').select2({
            data: isClosed,
        });
        $('#calendar-filter-status').select2();

    }

    filterCalendarAction() {
        const that = this;
        // update filter
        let departmentIdList  = '';
        let defineIds = '';
        let userIdList = '';
        let isClosed = null;
        let statusCC = null;
        if (document.getElementById('calendar-filter-users')) {
            userIdList = $('#calendar-filter-users').val() && $('#calendar-filter-users').val() > 0 ?  $('#calendar-filter-users').val() : null;
        }
        if (document.getElementById('calendar-filter-type-task')) {
            defineIds = $('#calendar-filter-type-task').val();
        }
        if (document.getElementById('calendar-filter-is-closed')) {
            isClosed = Number.parseInt($('#calendar-filter-is-closed').val());
        }
        if (document.getElementById('calendar-filter-status')) {
            if($('#calendar-filter-status').val() != ''){
                statusCC = Number.parseInt($('#calendar-filter-status').val());
            }
        }

        that.updateFilter({
            departmentIdList : departmentIdList,
            defineIds : defineIds,
            userIdList : userIdList,
            isClosed : isClosed,
            statusCC : statusCC
        });

    }
    clearFilterCalendarAction() {
        const that = this;
        let departmentIdList  = '';
        let defineIds = '';
        let userIdList = '';
        let isClosed = null;
        let statusCC = null;
        if (document.getElementById('calendar-filter-users')) {
            $('#calendar-filter-users').val(0).select2();
        }

        if (document.getElementById('calendar-filter-type-task')) {
            let defaultType = 0;
            switch (that._DEPARTMENT) {
                case 14: {
                    break;
                }
                case 15 : {
                    break ;
                }
                case 16 : {
                    break;
                }
                case 17 : {
                    defaultType = 0;
                    break;
                }
                case 5 : {
                    break;
                }
            }
            $('#calendar-filter-type-task').val(defaultType).select2();
            if (defaultType > 0) {
                defineIds = defaultType;
            }
        }
        if (document.getElementById('calendar-filter-is-closed')) {
            $('#calendar-filter-is-closed').val(-1).select2();
        }
        if (document.getElementById('calendar-filter-status')) {
            $('#calendar-filter-status').val('').select2();
        }

        that.updateFilter({
            departmentIdList : departmentIdList,
            defineIds : defineIds,
            userIdList : userIdList,
            isClosed : isClosed,
            statusCC : statusCC
        });
    }
    openNotifyCalendar(isShow) {
        if(isShow) {
            $('.calendar-wrapper').addClass('calendar-group-open');
        } else {
            $('.calendar-wrapper').removeClass('calendar-group-open');
        }
    }

    bindEvents() {
        const that = this;
        $(document).on('click', '#calendar-filter-btn', function () {
            that.filterCalendarAction();
            $(that._WRAPPER).fullCalendar('refetchEvents');
        });
        $(document).on('click', '#calendar-filter-btn-clear', function () {
            that.clearFilterCalendarAction();
            $('#calendar-filter-btn').trigger('click');
            // $(that._WRAPPER).fullCalendar('refetchEvents');
        });

        $('#calendar').on('click', '.fc-events-group-month', function (e) {
            //console.log('fc-events-group-month is click');
            that.openNotifyCalendar(true);
            that.renderNotifyCalendar($(this).data('date'));
        });
        /**
         * button click month
         * */
        $('#calendar').on('click', '.fc-month-button', function (e) {
            console.log('fc-month-button is clicked!');
            that._IS_MONTH = true;
        });
        $('#calendar').on('click', '.fc-agendaWeek-button', function (e) {
            console.log('fc-agendaWeek-button is clicked!');
            that._IS_MONTH = false;
            that.openNotifyCalendar(false);

            //that.renderNotifyCalendar();
        });
        $('#calendar').on('click', '.fc-agendaDay-button', function (e) {
            console.log('fc-agendaDay-button is clicked!');
            that._IS_MONTH = false;
            that.openNotifyCalendar(false);
        });
        $('#calendar').on('click', '.fc-prev-button', function (e) {
            console.log('fc-prev-button is clicked!');
            //that.renderNotifyCalendar();
        });
        $('#calendar').on('click', '.fc-next-button', function (e) {
            console.log('fc-prev-button is clicked!');
            //that.renderNotifyCalendar();
        });
        $(document).on('click', '.calendar-notify-header', function (e) {
            e.preventDefault();
            that.openNotifyCalendar(false);
        });
        $('#calendar').on('click', '.fc-month-view .fc-day', function (e) {
            that.openNotifyCalendar(true);
            that.renderNotifyCalendar($(this).data('date'));
        });
        $(document).on('click', '.calendar-notify-events', function (e) {
            e.preventDefault();

            //
            const eventId = $(this).data('id');
            let event = that._LIST_EVENT.filter(it => it.id == eventId);
            if (event && event.length > 0) {
                event = event[0];
                if(typeof that._TASK_CODE[event.defineId] !== 'undefined'){
                    if( Window.calendarActionClickTask.has(that._TASK_CODE[event.defineId].code)) {
                        Window.calendarActionClickTask.get(that._TASK_CODE[event.defineId].code)(event);
                    }
                }else{
                    if(event.defineId != 142)
                        window.location.href = "/crm-dashboard/task-detail/"+event.data.taskId+"?defineId="+event.defineId;
                }

            }

        });

        // export
        // $(document).on('click', '#calendar-export-btn', function () {
        //     showPropzyLoading();
        //     $.post('/calendar/export', that._FILTER, function (response) {
        //         if (response.result) {
        //             // return false;
        //             window.location.href = response.data.linkFile;
        //         } else {
        //             alert(response.message);
        //         }
        //         hidePropzyLoading();
        //     });
        // });
    }

    loadActionTask() {
        let codeLoad = new Set();
        const that = this;
        const department = that._DEPARTMENT;
        switch (department) {
            case 14: {
                break;
            }
            case 15 : {
                break ;
            }
            case 16 : {
                break;
            }
            case 17 : {
                codeLoad.add(121).add(123).add(125).add(130).add(132).add(134).add(136).add(140);
                break;
            }
            case 12 : {
                codeLoad.add(32).add(9999);
                break;
            }
            case 5 : {
                break;
            }
        }
        codeLoad.forEach(async (it) => {
            if(that._TASK_CODE[it]) {
                var url = '/js/calendar/action-task/'+ that._TASK_CODE[it].script +'.js';
                jQuery.ajax({
                    url: url,
                    dataType: 'script',
                    success: function () {
                        // console.log('----> load script '+ that._TASK_CODE[it].script + ' is success!');
                    },
                    async: true
                });
            }
        });

    }
}
$(document).ready(function () {
    //code xử lý export
    $('#daterange-btn').daterangepicker(
        {
            locale: { applyLabel: 'Tải', cancelLabel: 'Đóng' },
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
        }
    ).on('apply.daterangepicker', function(ev, picker) {
        let start = picker.startDate._d;
        let end = picker.endDate._d;
        start = moment(start).unix() * 1000;
        end = moment(end).unix() * 1000;
        let filter = {fromDate:start,toDate:end};
        showPropzyLoading();
        $.post('/calendar/export', filter, function (response) {
            if (response.result) {
                // return false;
                window.location.href = response.data.linkFile;
            } else {
                alert(response.message);
            }
            hidePropzyLoading();
        });
    });
    //\\end code xử lý export
    Window.taskCalendar = new TaskCalendar({
        'wrapper' : '#calendar',
        'isAdmin' : currentUser.departments[0].isGroupAdmin,
        // 'department' : currentUser.departments[0].departmentId,
        'department' : parseInt(departmentId) //17, //12
    });

});