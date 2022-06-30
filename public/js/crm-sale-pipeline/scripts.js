var define = {
	tuvan : 24,
	closeDeal : 27,
	touring : 25,
    pending : 28,
	negotiating : 26,
	deposit : 29
};

var functionRender = {
	24 : 'RenderTableBooking',
	27 : 'RenderTableMeeting',
	25 : 'RenderTableTour',
	26 : 'RenderTableNego',
    28 : 'RenderTablePending',
	29 : 'RenderTableDepo'
}


$(function() {
    $(".monthPicker").datepicker({
        format: "mm-yyyy",
        endDate: '+0m',
        viewMode: "months", 
        minViewMode: "months"
    }).on('changeDate', function(ev){ 
    	// ev.format('dd/mm/yyyy');
    	window.location = '/crm-dashboard/default-screen?date='+ev.format('mm/yyyy');
        console.log(ev.format('mm/yyyy'));
        $(".monthPicker").datepicker('hide'); 
    });

    $("#daterange-list a").click(function(){
        var date = $(this).data('date');
        window.location = '/crm-dashboard/default-screen?date='+date;

    });
});