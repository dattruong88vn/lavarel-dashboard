var clickSaleFunel = function(key) {
	
	// var funnelClick = "all";
	// var key = d.label.raw.split(":")[0].toLowerCase();
	// var key = 'booking';
	// key = key.split(" ")[1];
	// console.log(funnel_all[key]);
	console.log(key+ '-' +define[key]);
	// alert(d.label.raw);

	var tableName = '#'+key+'-table';
	if(key == 'tuvan'){
		tableName = '#booking-table';
	}else if(key == 'closeDeal'){
		tableName = '#meeting-table';
	}
	console.log(tableName);
	$('#wrapTableSaleFunel .row').hide();
	// $(tableName).closest('.row').show();
	$(tableName).parents('.row').show();
	window[functionRender[define[key]]](tableName,define[key]);
	// $(".nav-tabs").each(function() {
	//    if($(this).is(":visible")){
	//    		$(this).find('li').removeClass('active');
	//    		$(this).find('li:first').addClass('active');
	//    	// $('.nav-tabs li:first').addClass('active');
	//    } 
	// });
	// RenderTableTour(define[key]); 
	$('html,body').animate({
	    scrollTop: $(tableName).offset().top},
	    'slow');
}

var renderLPL = function(data,type,object) {
	return '<a onclick="generateModalLPL('+object.dealID+');return false;" href="#">'+data+'</a>';
}

var renderPosition = function(data,type,object) {
	return data == 1 ? 'Mặt tiền' : 'Hẻm';
}

var renderCustomerFeedback = function(data,type,object) {
	
	if(data != null){
		data = JSON.parse(data);
		var returnFeedBack = '';
		returnFeedBack += '<li>Thích/Không thích: '
		returnFeedBack += data.customerFeedback == 0 ? 'Không' : 'Có';
		returnFeedBack += '</li>';
		returnFeedBack += '<li>Tại sao: '+data.reason+'</li>';
		returnFeedBack += '<li>Xem xét: ';
		returnFeedBack += data.investigate == 0 ? 'Không' : 'Có';
		returnFeedBack += '</li>';
		
		return '<ul>'+returnFeedBack+'</ul>';
	}
	return '<ul><li>N/A</li></ul>';
	
}

var renderPrice = function(data, type, object){
	return Number(data.toFixed(1)).toLocaleString()+'đ';
}

var renderCustomer = function(data,type,object){
	return "<a href='/deal/detail/"+object.dealID+"'>"+data+"</a>";
}

var renderLPD = function(data,type,object) {
	return '<a onclick="generateModalLPD('+object.dealID+');return false;" href="#">'+data+'</a>';
}

var renderTourLink = function(data,type,object) {
	return '<a target="_blank" href="/deal/tour/'+object.dealID+'">'+data+'</a>';
}

var renderDealDetail = function(data,type,object) {
	return '<a target="_blank" href="/deal/detail/'+object.dealID+'">'+data+'</a>';
}

var renderViewed = function(data,type,object) {
	return '<a onclick="generateModalViewed('+object.dealID+');return false;" href="#">'+data+'</a>';
}

var generateModalViewed = function(dealId) {
	var LPLModal = $('body').find('#viewedModal').length
	if(LPLModal > 0){
		$('body').find('#viewedModal').each(function(){
			$(this).remove();
		})
	}
	$('body').append( '<div id = "viewedModal" class = "modal fade modal-fullscreen-md-down" role = "dialog"><div style="" class="modal-dialog" role="document"> <div style="" class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">Số listing đã xem</h4> </div> <div class="modal-body"> <table id="viewed-table" class="table table-striped"> <thead> <tr><th>LID</th> <th width="20%">Địa chỉ</th> <th width="20%">SA</th> <th>Ngày đi tour</th> <th>KH đánh giá</th> <th>Lượt đi xem (của các BA khác)</th> <th>Trạng thái</th> <th>Giá</th> <th>Giá/m2</th> <th>Diện tích</th> <th>Mặt tiền/Hẻm</th> </tr> </thead> </table> </div>  </div></div></div>' );
	$('#viewedModal').on('shown.bs.modal', function () {
			RenderTableViewed(dealId);
        }).modal();
}

var openCalendar = function() {
	$(".monthPicker").datepicker("show");
	$('.rmViewAll').remove();
	$(".datepicker-months").append('<div class="rmViewAll" style="text-align:center;"><a onclick="redirectViewAll()" href="/crm-dashboard/default-screen">Xem tất cả</a></div>');
	// $('input[name="daterange"]').daterangepicker();
}

function redirectViewAll() {
	window.location = '/crm-dashboard/default-screen';
}

var RenderTableViewed = function(dealId) {
	$('#viewed-table').dataTable().fnDestroy();
	// var fromDate = $('#fromDate').val();
	// var toDate = $('#toDate').val();
	// if($('#trackingFilterDate').val() == 'all'){
		fromDate = 0;
		toDate = 9999999999999;
	// }
	$('#viewed-table').DataTable({
	    "processing": true,
	    "searching": false,
	    "serverSide": true,
	    "ajax": "/crm-dashboard/get-viewed?dealId="+dealId+"&fromDate="+fromDate+"&toDate="+toDate,
	    "scrollX": false,
	    "lengthChange": false,
	    "drawCallback": function () {
	                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
	                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
	                    pagination.toggle(this.api().page.info().pages > 1);
	            },
	    // "iDisplayLength": 1,
	    "columns": [
	    	{data: 'r_ID', orderable:false,render:renderListingId},
	        {data: 'address', orderable: false},
	        {data: 'sa', orderable: false},
	        {data: 'dateInTour', orderable: false, render: renderDateInTour},
	        {data: 'customerFeedback', orderable: false, render: renderCustomerFeedback},
	        {data: 'allReview', orderable: false},
	        {data: 'listingStatus', orderable: false, render: renderStatus},
	        {data: 'price', orderable: false, render: renderPrice},
	        {data: 'pricePerMetre', orderable: false},
	        {data: 'floorSize', orderable: false},
	        {data: 'position', orderable: false, render: renderPosition}
	    ],
	    "order": [[0, 'desc']],
	    "language":
	        {
	            "paginate" : {
	                previous: "<",
	                next: ">",
	                first: "|<",
	                last: ">|"
	            },
	            "info": "Trang _PAGE_ của _PAGES_",
	            "emptyTable": "Chưa có lịch sử thay đổi",
	            "infoEmpty": "",
	        },
	    "initComplete": function(settings, json) {
	    		// 
	      }   
	});
}



var renderDateInTour = function(data,type,object) {
	var returnDate = [];
	if(data != null){
		var arrDate = data.split(',');
		$.each(arrDate,function(k,v){
			returnDate.push(formatDate(v));
		})
	}
	return returnDate.join(', ');
}

var renderStatus = function(data, type, object) {
	var returnStatus = [data];
	if(object.legalStatus != null){
		returnStatus.push(object.legalStatus)
	}
	return returnStatus.join('<hr style="margin:0px;"/>');
}

var renderDuration = function(data,type,object){
	var seconds = parseInt(data, 10);

	var days = Math.floor(seconds / (3600*24));
	seconds  -= days*3600*24;
	var hrs   = Math.floor(seconds / 3600);
	seconds  -= hrs*3600;
	var mnts = Math.floor(seconds / 60);
	seconds  -= mnts*60;

	if(seconds > 0 || hrs > 0 || mnts > 0){
		days = days +1;
	}
	return days + ' ngày';
}

var generateModalLPD = function(dealId) {
	var LPLModal = $('body').find('#LPDModal').length
	if(LPLModal > 0){
		$('body').find('#LPDModal').each(function(){
			$(this).remove();
		})
	}
	$('body').append( '<div id = "LPDModal" class = "modal fade modal-fullscreen-md-down" role = "dialog"><div style="" class="modal-dialog" role="document"> <div style="" class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">LPD</h4> </div> <div class="modal-body"> <table id="LPD-table" class="table table-striped"> <thead> <tr><th>LID</th> <th width="30%">Địa chỉ</th> <th width="20%">SA</th> <th width="15%">Ngày đi tour</th> <th width="15%">KH đánh giá</th> <th width="15%">Lượt đi xem (của các BA khác)</th> <th>Trạng thái</th> <th>Giá</th> <th>Giá/m2</th> <th>Diện tích</th> <th>Mặt tiền/Hẻm</th> </tr> </thead> </table> </div>  </div></div></div>' );
	$('#LPDModal').on('shown.bs.modal', function () {
			RenderTableLPD(dealId);
        }).modal();
}

var generateModalLPL = function(dealId) {
	var LPLModal = $('body').find('#LPLModal').length
	if(LPLModal > 0){
		$('body').find('#LPLModal').each(function(){
			$(this).remove();
		})
	}
	$('body').append( '<div id = "LPLModal" class = "modal fade modal-fullscreen-md-down" role = "dialog"><div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">LPL</h4> </div> <div class="modal-body"> <table id="LPL-table" class="table table-striped"> <thead> <tr> <th width="30%">Địa chỉ</th> <th width="30%">SA</th> <th>Ngày đi tour</th> <th>KH đánh giá</th> <th>Lượt đi xem (của các BA khác)</th> <th>Trạng thái</th> <th>Giá</th> <th>Giá/m2</th> <th>Diện tích</th> <th>Mặt tiền/Hẻm</th> </tr> </thead> </table> </div>  </div></div></div>' );
	$('#LPLModal').on('shown.bs.modal', function () {
            RenderTableLPL(dealId);
        }).modal();
}

var renderListingId = function(data,type,object){
	return "<a href='#' onclick='JMDetail.openModalListingDetailForAllPage("+data+");return false;'>"+data+"</a>";
}

var RenderTableLPD = function(dealId) {
	$('#LPD-table').dataTable().fnDestroy();
	// var fromDate = $('#fromDate').val();
	// var toDate = $('#toDate').val();
	// if($('#trackingFilterDate').val() == 'all'){
		fromDate = 0;
		toDate = 9999999999999;
	// }
	$('#LPD-table').DataTable({
	    "processing": true,
	    "searching": false,
	    "serverSide": true,
	    "ajax": "/crm-dashboard/get-lpd?dealId="+dealId+"&fromDate="+fromDate+"&toDate="+toDate,
	    "scrollX": false,
	    "lengthChange": false,
	    "drawCallback": function () {
	                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
	                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
	                    pagination.toggle(this.api().page.info().pages > 1);
	            },
	    // "iDisplayLength": 1,
	    "columns": [
	    	{data: 'r_ID',orderable:false, render:renderListingId},
	        {data: 'address', orderable: false},
	        {data: 'sa', orderable: false},
	        {data: 'dateInTour', orderable: false, render: renderDateInTour},
	        {data: 'customerFeedback', orderable: false, render: renderCustomerFeedback},
	        {data: 'allReview', orderable: false},
	        {data: 'listingStatus', orderable: false, render: renderStatus},
	        {data: 'price', orderable: false, render: renderPrice},
	        {data: 'pricePerMetre', orderable: false},
	        {data: 'floorSize', orderable: false},
	        {data: 'position', orderable: false, render: renderPosition}
	    ],
	    // "order": [[0, 'desc']],
	    "language":
	        {
	            "paginate" : {
	                previous: "<",
	                next: ">",
	                first: "|<",
	                last: ">|"
	            },
	            "info": "Trang _PAGE_ của _PAGES_",
	            "emptyTable": "Chưa có lịch sử thay đổi",
	            "infoEmpty": "",
	        },
	    "initComplete": function(settings, json) {
	    		// 
	      }   
	});
}

var RenderTableLPL = function(dealId) {
	$('#LPL-table').dataTable().fnDestroy();
	$('#LPL-table').DataTable({
	    "processing": true,
	    "searching": false,
	    "serverSide": true,
	    "ajax": "/crm-dashboard/get-lpl?dealId="+dealId+"&fromDate="+$('#fromDate').val()+"&toDate="+$('#toDate').val(),
	    "scrollX": false,
	    "lengthChange": false,
	    "drawCallback": function () {
	                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
	                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
	                    pagination.toggle(this.api().page.info().pages > 1);
	            },
	    // "iDisplayLength": 1,
	    "columns": [
	        {data: 'address', orderable: false},
	        {data: 'sa', orderable: false},
	        {data: 'dateInTour', orderable: false, render: renderDateInTour},
	        {data: 'customerFeedback', orderable: false, render: renderCustomerFeedback},
	        {data: 'allReview', orderable: false},
	        {data: 'listingStatus', orderable: false, render: renderStatus},
	        {data: 'price', orderable: false, render: renderPrice},
	        {data: 'pricePerMetre', orderable: false},
	        {data: 'floorSize', orderable: false},
	        {data: 'position', orderable: false, render: renderPosition}
	    ],
	    // "order": [[0, 'desc']],
	    "language":
	        {
	            "paginate" : {
	                previous: "<",
	                next: ">",
	                first: "|<",
	                last: ">|"
	            },
	            "info": "Trang _PAGE_ của _PAGES_",
	            "emptyTable": "Chưa có lịch sử thay đổi",
	            "infoEmpty": "",
	        },
	    "initComplete": function(settings, json) {
	    		// 
	      }   
	});
}

var RenderTableBooking = function(tableName,status,type='default') { //nay là table tu vấn 
	$(tableName).dataTable().fnDestroy();
	// var status = 24;
	if(type == 'default'){
		var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate="+fromDate+"&toDate="+toDate+"&listingTypeId="+listingTypeId;
		$('#trackingFilterDate').val('default');
	}else{
		$('#trackingFilterDate').val('all');
		var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate=0&toDate=9999999999999&listingTypeId="+listingTypeId;
	}
	let visibleUsers = $('#users-select-filter').next(".select2-container").is(":visible");
	let userIds = null;
	if(visibleUsers){ // hiện danh sách nhân viên (case admin)
		let selectUser = $('#users-select-filter').val();
		userIds = selectUser == null && (currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? -1 : selectUser;
	}else{ // user bình thường
		userIds = currentUser.userId;
	}
	
	// let userIds = selectUser == null && (currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? -1 : selectUser;
	urlAjax = `${urlAjax}&listUserIds=${userIds}&scoreCardType=${$("#card-type-select").val()}`;
	// if(type == 'default'){
	// 	var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate="+$('#fromDate').val()+"&toDate="+$('#toDate').val();
	// 	$('#trackingFilterDate').val('default');
	// }else{
	// 	$('#trackingFilterDate').val('all');
	// 	var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate=0&toDate=9999999999999";
	// }
	$(tableName).DataTable({
	    "processing": true,
	    "searching": false,
	    "serverSide": true,
	    "ajax": urlAjax,
	    "scrollX": false,
	    "lengthChange": false,
	    "drawCallback": function () {
	                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
	                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
	                    pagination.toggle(this.api().page.info().pages > 1);
	            },
	    // "iDisplayLength": 1,
	    "columns": [
	        {data: 'dealId', orderable: false},
	        {data: 'customerName', orderable: false},
	        {data: 'duration', orderable: false},
	        {data: 'previousStatusName',orderable:false},
	        {data: 'formattedPrice',orderable:false},
	        {data: 'statusName',orderable:false},
	    ],
	    "order": [[2, 'desc']],
	    "language":
	        {
	            "paginate" : {
	                previous: "<",
	                next: ">",
	                first: "|<",
	                last: ">|"
	            },
	            "info": "Trang _PAGE_ của _PAGES_",
	            "emptyTable": "Chưa có lịch sử thay đổi",
	            "infoEmpty": "",
	        },
	    "initComplete": function(settings, json) {
	    		// 
	      }   
	});
}

var RenderTablePending = function(tableName,status,type='default') {
    $(tableName).dataTable().fnDestroy();
    
	if(type == 'default'){
		var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate="+fromDate+"&toDate="+toDate+"&listingTypeId="+listingTypeId;
		$('#trackingFilterDate').val('default');
	}else{
		$('#trackingFilterDate').val('all');
		var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate=0&toDate=9999999999999&listingTypeId="+listingTypeId;
	}
	let visibleUsers = $('#users-select-filter').next(".select2-container").is(":visible");
	let userIds = null;
	if(visibleUsers){ // hiện danh sách nhân viên (case admin)
		let selectUser = $('#users-select-filter').val();
		userIds = selectUser == null && (currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? -1 : selectUser;
	}else{ // user bình thường
		userIds = currentUser.userId;
	}
	// let selectUser = $("#users-select-filter").val();
	// let userIds = selectUser == null && (currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? -1 : selectUser;
	urlAjax = `${urlAjax}&listUserIds=${userIds}&scoreCardType=${$("#card-type-select").val()}`;
    // if(type == 'default'){
    //     var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate="+$('#fromDate').val()+"&toDate="+$('#toDate').val();
    //     $('#trackingFilterDate').val('default');
    // }else{
    //     $('#trackingFilterDate').val('all');
    //     var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate=0&toDate=9999999999999";
    // }
    $(tableName).DataTable({
        "processing": true,
        "searching": false,
        "serverSide": true,
        "ajax": urlAjax,
        "scrollX": false,
        "lengthChange": false,
        "drawCallback": function () {
            $('.dataTables_paginate > .pagination').addClass('pagination-sm');
            var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
            pagination.toggle(this.api().page.info().pages > 1);
        },
        // "iDisplayLength": 1,
        "columns": [
            // {data: 'customerName', orderable: false, render: renderDealDetail},
            // {data: 'point', orderable: false},
            // {data: 'duration', orderable: true},
            // {data: 'formattedPrice',orderable:false},
            // {data: 'progressing', orderable: false},
            // // {data: 'listingPerLead', orderable: false, render: renderLPL},
            // {data: 'listingPerDeal', orderable: false, render: renderLPD}
            {data: 'dealId', orderable: false},
	        {data: 'customerName', orderable: false},
	        {data: 'duration', orderable: false},
	        {data: 'previousStatusName',orderable:false},
	        {data: 'formattedPrice',orderable:false},
	        {data: 'statusName',orderable:false},
        ],
        "order": [[2, 'desc']],
        "language":
            {
                "paginate" : {
                    previous: "<",
                    next: ">",
                    first: "|<",
                    last: ">|"
                },
                "info": "Trang _PAGE_ của _PAGES_",
                "emptyTable": "Chưa có lịch sử thay đổi",
                "infoEmpty": "",
            },
        "initComplete": function(settings, json) {
            //
        }
    });
}

var RenderTableMeeting = function(tableName,status, type = 'default') {
	$(tableName).dataTable().fnDestroy();
	
	if(type == 'default'){
		var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate="+fromDate+"&toDate="+toDate+"&listingTypeId="+listingTypeId;
		$('#trackingFilterDate').val('default');
	}else{
		$('#trackingFilterDate').val('all');
		var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate=0&toDate=9999999999999&listingTypeId="+listingTypeId;
	}
	let visibleUsers = $('#users-select-filter').next(".select2-container").is(":visible");
	let userIds = null;
	if(visibleUsers){ // hiện danh sách nhân viên (case admin)
		let selectUser = $('#users-select-filter').val();
		userIds = selectUser == null && (currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? -1 : selectUser;
	}else{ // user bình thường
		userIds = currentUser.userId;
	}
	// let selectUser = $("#users-select-filter").val();
	// let userIds = selectUser == null && (currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? -1 : selectUser;
	urlAjax = `${urlAjax}&listUserIds=${userIds}&scoreCardType=${$("#card-type-select").val()}`;
	// if(type == 'default'){
	// 	var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate="+$('#fromDate').val()+"&toDate="+$('#toDate').val();
	// 	$('#trackingFilterDate').val('default');
	// }else{
	// 	$('#trackingFilterDate').val('all');
	// 	var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate=0&toDate=9999999999999";
	// }
	$(tableName).on('xhr.dt', function ( e, settings, json, xhr ) {
		// $('#totalMeeting').html('Tổng số meeting: '+json.response.data.additional.totalMeetings);
	}).DataTable({
	    "processing": true,
	    "searching": false,
	    "serverSide": true,
	    "ajax": urlAjax,
	    "scrollX": false,
	    "lengthChange": false,
	    "drawCallback": function () {
	                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
	                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
	                    pagination.toggle(this.api().page.info().pages > 1);
	            },
	    // "iDisplayLength": 1,
	    "columns": [
	    	{data: 'dealId', orderable: false},
	        {data: 'customerName', orderable: false},
	        {data: 'duration', orderable: false},
	        {data: 'previousStatusName',orderable:false},
	        {data: 'formattedPrice',orderable:false},
	        {data: 'statusName',orderable:false},
	        {data: 'deposit',orderable:false,render:function(data,type,object){
	        	return data.rlistingId;
	        }},
	        {data: 'deposit',orderable:false,render:function(data,type,object){
	        	return data.depositFormatedPrice;
	        }},
	        // {data: 'customerName', orderable: false, render: renderDealDetail},
	        // {data: 'point', orderable: false},
	        // {data: 'duration', orderable: true},
	        // {data: 'formattedPrice',orderable:false},
	        // {data: 'progressing', orderable: false},
	        // {data: 'meetings', orderable: false},
	        // // {data: 'listingPerLead', orderable: false, render: renderLPL},
	        // {data: 'listingPerDeal', orderable: false, render: renderLPD}
	    ],
	    "order": [[2, 'desc']],
	    "language":
	        {
	            "paginate" : {
	                previous: "<",
	                next: ">",
	                first: "|<",
	                last: ">|"
	            },
	            "info": "Trang _PAGE_ của _PAGES_",
	            "emptyTable": "Chưa có lịch sử thay đổi",
	            "infoEmpty": "",
	        },
	    "initComplete": function(settings, json) {
	    		// 
	      }   
	});
}


var RenderTableTour = function(tableName,status, type = 'default') {
	$(tableName).dataTable().fnDestroy();
	
	if(type == 'default'){
		var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate="+fromDate+"&toDate="+toDate+"&listingTypeId="+listingTypeId;
		$('#trackingFilterDate').val('default');
	}else{
		$('#trackingFilterDate').val('all');
		var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate=0&toDate=9999999999999&listingTypeId="+listingTypeId;
	}
	let visibleUsers = $('#users-select-filter').next(".select2-container").is(":visible");
	let userIds = null;
	if(visibleUsers){ // hiện danh sách nhân viên (case admin)
		let selectUser = $('#users-select-filter').val();
		userIds = selectUser == null && (currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? -1 : selectUser;
	}else{ // user bình thường
		userIds = currentUser.userId;
	}
	// let selectUser = $("#users-select-filter").val();
	// let userIds = selectUser == null && (currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? -1 : selectUser;
	urlAjax = `${urlAjax}&listUserIds=${userIds}&scoreCardType=${$("#card-type-select").val()}`;
	$(tableName).on('xhr.dt', function ( e, settings, json, xhr ) {
		// $('#totalTour').html('Tổng số tour: '+json.response.data.additional.totalTours);
	}).DataTable({
	    "processing": true,
	    "searching": false,
	    "serverSide": true,
	    "ajax": urlAjax,
	    "scrollX": false,
	    "lengthChange": false,
	    "drawCallback": function () {
	                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
	                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
	                    pagination.toggle(this.api().page.info().pages > 1);
	            },
	    // "iDisplayLength": 1,
	    "columns": [
	    	{data: 'dealId', orderable: false},
	        {data: 'customerName', orderable: false},
	        {data: 'duration', orderable: false},
	        {data: 'previousStatusName',orderable:false},
	        {data: 'formattedPrice',orderable:false},
	        {data: 'statusName',orderable:false},
	        {data: 'seenListingCount',orderable:false},
	        {data: 'seenTourCount',orderable:false},
	        // {data: 'listingPerLead', orderable: false, render: renderLPL}, 
	        // {data: 'listingPerDeal', orderable: false, render: renderLPD},
	        // {data: 'listingPerClient', orderable: false},
	        // {data: 'tours', orderable: false, render: renderTourLink},
	        // {data: 'viewedListings', orderable: false, render: renderViewed}
	    ],
	    "order": [[0, 'desc']],
	    "language":
	        {
	            "paginate" : {
	                previous: "<",
	                next: ">",
	                first: "|<",
	                last: ">|"
	            },
	            "info": "Trang _PAGE_ của _PAGES_",
	            "emptyTable": "Chưa có lịch sử thay đổi",
	            "infoEmpty": "",
	        },
	    "initComplete": function(settings, json) {
	    		// 
	      }   
	});
}

var RenderTableNego = function(tableName,status,type='default') {
	$(tableName).dataTable().fnDestroy();
	
	if(type == 'default'){
		var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate="+fromDate+"&toDate="+toDate+"&listingTypeId="+listingTypeId;
		$('#trackingFilterDate').val('default');
	}else{
		$('#trackingFilterDate').val('all');
		var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate=0&toDate=9999999999999&listingTypeId="+listingTypeId;
	}
	let visibleUsers = $('#users-select-filter').next(".select2-container").is(":visible");
	let userIds = null;
	if(visibleUsers){ // hiện danh sách nhân viên (case admin)
		let selectUser = $('#users-select-filter').val();
		userIds = selectUser == null && (currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? -1 : selectUser;
	}else{ // user bình thường
		userIds = currentUser.userId;
	}
	// let selectUser = $("#users-select-filter").val();
	// let userIds = selectUser == null && (currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? -1 : selectUser;
	urlAjax = `${urlAjax}&listUserIds=${userIds}&scoreCardType=${$("#card-type-select").val()}`;
	// if(type == 'default'){
	// 	var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate="+$('#fromDate').val()+"&toDate="+$('#toDate').val();
	// 	$('#trackingFilterDate').val('default');
	// }else{
	// 	$('#trackingFilterDate').val('all');
	// 	var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate=0&toDate=9999999999999";
	// }
	$(tableName).DataTable({
	    "processing": true,
	    "searching": false,
	    "serverSide": true,
	    "ajax": urlAjax,
	    "scrollX": false,
	    "lengthChange": false,
	    "drawCallback": function () {
	                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
	                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
	                    pagination.toggle(this.api().page.info().pages > 1);
	            },
	    // "iDisplayLength": 1,
	    "columns": [
	        {data: 'dealId', orderable: false},
	        {data: 'customerName', orderable: false},
	        {data: 'duration', orderable: false},
	        {data: 'previousStatusName',orderable:false},
	        {data: 'formattedPrice',orderable:false},
	        {data: 'statusName',orderable:false},
	        {data: 'negotiations',orderable:false,render:function(data,type,object){
	        	let render = '';
	        	$.each(data,function(k,v){
	        		render += v.rlistingId+'<hr/>';
	        	})
	        	return render.slice(0, render.length-5);
	        }},
	        {data: 'negotiations',orderable:false,render:function(data,type,object){
	        	let render = '';
	        	$.each(data,function(k,v){
	        		render += v.negotiationFormatedPrice+'<hr/>';
	        	})
	        	return render.slice(0, render.length-5);
	        }},
	    ],
	    // "order": [[0, 'desc']],
	    "language":
	        {
	            "paginate" : {
	                previous: "<",
	                next: ">",
	                first: "|<",
	                last: ">|"
	            },
	            "info": "Trang _PAGE_ của _PAGES_",
	            "emptyTable": "Chưa có lịch sử thay đổi",
	            "infoEmpty": "",
	        },
	    "initComplete": function(settings, json) {
	    		// 
	      }   
	});
}

var RenderTableDepo = function(tableName,status, type = 'default') {
	$(tableName).dataTable().fnDestroy();
	
	if(type == 'default'){
		var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate="+fromDate+"&toDate="+toDate+"&listingTypeId="+listingTypeId;
		$('#trackingFilterDate').val('default');
	}else{
		$('#trackingFilterDate').val('all');
		var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate=0&toDate=9999999999999&listingTypeId="+listingTypeId;
	}
	let visibleUsers = $('#users-select-filter').next(".select2-container").is(":visible");
	let userIds = null;
	if(visibleUsers){ // hiện danh sách nhân viên (case admin)
		let selectUser = $('#users-select-filter').val();
		userIds = selectUser == null && (currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? -1 : selectUser;
	}else{ // user bình thường
		userIds = currentUser.userId;
	}
	// let selectUser = $("#users-select-filter").val();
	// let userIds = selectUser == null && (currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? -1 : selectUser;
	urlAjax = `${urlAjax}&listUserIds=${userIds}&scoreCardType=${$("#card-type-select").val()}`;
	// if(type == 'default'){
	// 	var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate="+$('#fromDate').val()+"&toDate="+$('#toDate').val();
	// 	$('#trackingFilterDate').val('default');
	// }else{
	// 	$('#trackingFilterDate').val('all');
	// 	var urlAjax = "/crm-dashboard/get-table-sale-pineline?status="+status+"&fromDate=0&toDate=9999999999999";
	// }
	console.log(urlAjax); 
	$(tableName).DataTable({
	    "processing": true,
	    "searching": false,
	    "serverSide": true,
	    "ajax": urlAjax,
	    "scrollX": false,
	    "lengthChange": false,
	    "drawCallback": function () {
	                $('.dataTables_paginate > .pagination').addClass('pagination-sm');
	                var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
	                    pagination.toggle(this.api().page.info().pages > 1);
	            },
	    // "iDisplayLength": 1,
	    "columns": [
	        {data: 'dealId', orderable: false},
	        {data: 'customerName', orderable: false},
	        {data: 'duration', orderable: false},
	        {data: 'previousStatusName',orderable:false},
	        {data: 'formattedPrice',orderable:false},
	        {data: 'statusName',orderable:false},
	        {data: 'deposit',orderable:false,render:function(data,type,object){
	        	return data.rlistingId;
	        }},
	        {data: 'deposit',orderable:false,render:function(data,type,object){
	        	return data.depositFormatedPrice;
	        }},
	    ],
	    // "order": [[0, 'desc']],
	    "language":
	        {
	            "paginate" : {
	                previous: "<",
	                next: ">",
	                first: "|<",
	                last: ">|"
	            },
	            "info": "Trang _PAGE_ của _PAGES_",
	            "emptyTable": "Chưa có lịch sử thay đổi",
	            "infoEmpty": "",
	        },
	    "initComplete": function(settings, json) {
	    		// 
	      }   
	});
}

function loadDepartmentsForFilter(){
	$("#team-select").select2({
		placeholder: "Danh sách team",
		multiple: true
	});
	  
	$("#users-select-filter").select2({
		placeholder: "Danh sách nhân viên",
		multiple: true
	});

	let departments = currentUser.departments;
	let types = departments.map(function(type,indexRole){
		return type.department.departmentType;
	});

	$.ajax({
		'url': '/crm-dashboard/get-card-type',
		'type': 'get'
	}).done(function (response) {
		if(response.data.length > 0){
			$("#card-type-select").append(`<option value="0">Tất cả nhãn</option>`); 
			$.each(response.data, function (index, item) {
				$("#card-type-select").append(`<option value="${item.code}">${item.name}</option>`);
			})
		}
	});

	if((currentUser.departmentIds.indexOf(12) != -1 && departments[0].isGroupAdmin == true) || (types.indexOf("GROUP") != -1 && departments[0].isGroupAdmin == true)){ //group
		// load nhân viên
		let = departmentIdsGroup = [];
		$.each(currentUser.departments,function(index,item){ 
			if(item.department.departmentType == "GROUP" || item.department.departmentType == "DEPARTMENT"){
				departmentIdsGroup.push(item.departmentId);
			}
		})

		$.ajax({
			'url': '/departments/get-list-users-json',
			'type': 'post',
			'data': JSON.stringify({"ids":departmentIdsGroup})
			}).done(function (response) {
				if(response.result){
					if(response.data.length > 0){
						$("#users-select-filter").html('');
						$.each(response.data, function (index,item) {
							// return `<option value="${item.id}">${item.departmentName}</option>`;
							if(item.name != null && item.name != ""){
								$("#users-select-filter").append(`<option value="${item.userId}">${item.name}</option>`);
							}
						})
					}
					hidePropzyLoading();
				}else{
					hidePropzyLoading();
					showPropzyAlert(response.message);
				}
			})
	} else if(types.indexOf("ZONE") != -1 && departments[0].isGroupAdmin == true){ //zone
		// load bình thường
		let = departmentIdsZone = [];
		$.each(currentUser.departments,function(index,item){
			if(item.department.departmentType == "ZONE"){
				departmentIdsZone.push(item.id);
			}
		})

		$.ajax({
		'url': '/departments/get-list-team-json',
		'type': 'post',
		'data': JSON.stringify({parentIds:departmentIdsZone})
		}).done(function (response) {
			if(response.length > 0){
			$.each(response, function (index,item) {
				// return `<option value="${item.id}">${item.departmentName}</option>`;
				$("#team-select").append(`<option value="${item.id}">${item.departmentName}</option>`) 
			})
			}
		})
		
		$("#team-select").on("change",function(){
			showPropzyLoading();
			$.ajax({
			'url': '/departments/get-list-users-json',
			'type': 'post',
			'data': JSON.stringify({"ids":$("#team-select").val()})
			}).done(function (response) {
				if(response.result){
					if(response.data.length > 0){
						$("#users-select-filter").html('');
						$.each(response.data, function (index,item) {
							// return `<option value="${item.id}">${item.departmentName}</option>`;
							if(item.name != null && item.name != ""){
								$("#users-select-filter").append(`<option value="${item.userId}">${item.name}</option>`);
							}
						})
					}
					hidePropzyLoading();
				}else{
					hidePropzyLoading();
					showPropzyAlert(response.message);
				}
			})
		})
	}
  }

  function checkUserRole(){
	$('#team-select, #users-select-filter').next(".select2-container").hide();
	let departments = currentUser.departments;
	let types = departments.map(function(type,indexRole){
	  return type.department.departmentType;
	})
	// console.log("JSP",types, types.indexOf("ZONE"), types.indexOf("GROUP"));
	if((currentUser.departmentIds.indexOf(12) != -1 && departments[0].isGroupAdmin == true) || (types.indexOf("GROUP") != -1 && departments[0].isGroupAdmin == true)){ //group
		// load nhân viên
		$('#users-select-filter').next(".select2-container").show();
	} else if(types.indexOf("ZONE") != -1 && departments[0].isGroupAdmin == true){ //zone
		// load bình thường
		$('#team-select, #users-select-filter').next(".select2-container").show();
	}
  }