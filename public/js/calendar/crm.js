var ajax = function (urlApi) {
    return $.post(urlApi);
}

var filterData = function (response) {
    response = JSON.parse(response);
    var tasks = [];
    if(response.result == true){
        $.each(response.data,function(k,v){
            $.each(v.list,function (kl,vl) {
                vl.title = vl.taskName;
                vl.start = new Date(vl.createdDate)
                vl.backgroundColor = "#f56954" //red
                vl.borderColor = "#f56954" //red
                tasks.push(vl);
            })
        })
    }
    return tasks;
}

var CRM_CallCalendar = async function () {
    var response = await ajax('/calendar/get-tasks');
    var tasks = filterData(response);
    CalendarPropzy.init(tasks);
}

$(function () {
    // Custom your config
    var myConfig = CalendarPropzy.customConfig;
    //Set khi hover lên task sẽ hilight title
    myConfig.eventMouseover = function(calEvent, jsEvent) {
        var tooltip = '<div class="tooltipevent" style="width:100px;height:100px;background:#ccc;position:absolute;z-index:10001;">' + calEvent.title + '</div>';
        var $tooltip = $(tooltip).appendTo('body');

        $(this).mouseover(function(e) {
            $(this).css('z-index', 10000);
            $tooltip.fadeIn('500');
            $tooltip.fadeTo('10', 1.9);
        }).mousemove(function(e) {
            $tooltip.css('top', e.pageY + 10);
            $tooltip.css('left', e.pageX + 20);
        });
    }

    myConfig.eventMouseout =  function(calEvent, jsEvent) {
        $(this).css('z-index', 8);
        $('.tooltipevent').remove();
    }
    // \\ //Set khi hover lên task sẽ hilight title
    // Xử lý khi user bấm vào tasks tại đây
    myConfig.eventClick = function(event) {
        if (event.title) {
            console.log(event)
        }
    }
    // \\ Custom your config
    CRM_CallCalendar();
})