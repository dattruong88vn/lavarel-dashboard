<div id="modalCallOwnerScheduleView" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <form id="formCallOwnerScheduleView" method="post" class="form-horizontal">
                <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
				<div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Hiện trạng cho từng listing</h4>
                </div>
                <div class="modal-body">				
					<table class="table table-bordered">
						<thead>
						<tr>
							<th>Tên Listing</th>
							<th>Hiện trạng</th>
							<th>Ghi chú</th>
						<tr>
						</thead>
						<tbody id="listingCallOwnerScheduleView">

						</tbody>
					</table>
					<label>Ghi chú chung</label>
					<textarea class="form-control" rows="3" name="commonNote" id="commonNote"></textarea>
                </div>
                <div class="modal-footer">
					<button class="btn btn-success btnSave">Save</button>
                </div>
            </form>
        </div>

    </div>
</div>

<script type="text/javascript">
function changeStatusView(item){
	var statusView = $("#statusView_" + item + " option:selected").val();
	if(statusView==0){
		$("#info" + item).removeClass('hidden');
		$("#noteView" + item).addClass('hidden');
		$("#note_" + item).val('');
	}else{
		$("#info" + item).addClass('hidden');
		$("#noteView" + item).removeClass('hidden');
		$("#soldDate_" + item).val('');
		$("#price_" + item).val('');
	}
}

//var listingIds = [1054, 2534]; 
//showModalCallOwnerScheduleView(listingIds);
function showModalCallOwnerScheduleView(listingIds) {
    $("#modalCallOwnerScheduleView").modal();
    var html = '';
    var numberListing = listingIds.length;
    for (var i = 0; i < numberListing; i++) {
        var item = listingIds[i];
        html += '<tr>';
        html += '<td>' + item + '</td>';
        html += '<td>';
        html += '<input type="hidden" name="listingIds[]" value="' + item + '">';
        html += '<select class="form-control" id="statusView_' + item + '" name="statusView_' + item + '" onchange="changeStatusView(' + item + ')">';
        html += '<option value=""></option>';
        html += '<option value="1">Còn</option>';
        html += '<option value="0">Không</option>';
        html += '</select>';
        html += '<span class="errors"></span>';
        html += '</td>';
		html += '<td style="width:350px">';
			html += '<div id="info' + item + '" class="row hidden">';
				html += '<div class="form-group">';
					html += '<label class="col-sm-5 control-label">Thời gian bán</label>';
					html += '<div class="col-sm-7">';
						html += '<div class="input-group date" data-provide="datepicker" data-date-format="dd/mm/yyyy" data-date-end-date="0d">';
							html += '<input id="soldDate_' + item + '" name="soldDate_' + item + '" class="form-control" value="" />';
							html += '<div class="input-group-addon">';
								html += '<i class="fa fa-calendar"></i>';
							html += '</div>';
						html += '</div>';								
					html += '</div>';
				html += '</div>';
				html += '<div class="form-group">';
					html += '<label class="col-sm-5 control-label">Giá bán</label>';
					html += '<div class="col-sm-7">';
						html += '<input type="text" class="form-control" placeholder="" id="price_' + item + '" name="price_' + item + '">';
					html += '</div>';
				html += '</div>';
			html += '</div>';
			html += '<div id="noteView' + item + '">';
				html += '<input type="text" class="form-control" placeholder="Lưu ý đi xem" id="note_' + item + '" name="note_' + item + '">';
				html += '<span class="errors"></span>';
			html += '</div>';
		html += '</td>';
        html += '</tr>';

    }
    $("#listingCallOwnerScheduleView").html(html);
}

//save 
$("#modalCallOwnerScheduleView .btnSave").on("click", function (event) {
    $("#formCallOwnerScheduleView").find('.errors').html('');
    event.preventDefault();
    var isValidated = true;
    var detail_datas = [];
    $('input[name="listingIds[]"]').each(function () {
        var listingItem = $(this).val();
        var status = $("#statusView_" + listingItem + " option:selected").val();
        var checkNote = false;
        if (status.trim() == '') {
            isValidated = false;
            $("#statusView_" + listingItem).parent().find('.errors').html('Chưa chọn');
        }
        if (parseInt(status) == 1) {
            var checkNote = true;
        }

        var note = $("#note_" + listingItem).val();
        if (note.trim() == '' && checkNote) {
            isValidated = false;
            $("#note_" + listingItem).parent().find('.errors').html('Chưa nhập');
        }
        if (note.trim() != '') {
            note = note.trim();
        } else {
            note = null;
        }
		
        var price = $("#price_" + listingItem).val();
        if (price.trim() != '') {
            price = parseInt(price);
        } else {
            price = null;
        }
		
		var soldDate = $("#soldDate_" + listingItem).val();
        if (soldDate.trim() != '') {
			soldDate = moment(soldDate, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
			soldDate = moment(soldDate + ' 00:00:00').format("x");
			soldDate = parseInt(soldDate);
        } else {
            soldDate = null;
        }
		
        var detail_data = {
            "listingId": parseInt(listingItem),
            "status": parseInt(status),
            "price": price,
            "soldDate" : soldDate,
			"note": note,
        };
        detail_datas.push(detail_data);
    });
    var postData = {
        "commonNote": $("#commonNote").val(),
		"listingViews": detail_datas,
    }
	
	if (!isValidated) {
        return false;
    }
	
    //console.log(postData);
	showPropzyLoading();
	$.ajax({
        url: '/crm-dashboard/save-task-form/'+taskId+'/'+defineId,
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
		if(response.result){
			$("#modalCallOwnerScheduleView").modal('hide');
			showModalCreateTasks(taskId);
		}else{
			showPropzyAlert(response.message);
		}      
    }).always(function () {
        hidePropzyLoading();
    });
	
});
</script>