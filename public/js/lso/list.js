$(document).ready(function() {
	// INIT
	main.init();

	// Search
	$("button#search-listing-action").click(function() {
		main.processSearch();
	});

	// Tình trạng
	$("#statusId").on("change", function() {
		main.processSearch();
	});

	// Nguồn chủ nhà
	$("#sourceId").on("change", function() {
		main.processSearch();
	});

	// Nguồn tin đăng
	$("#lsoSourceId").on("change", function() {
		main.processSearch();
	});

	// Tạo mới listing
	$("#create-listing-btn").click(function() {
		window.location.replace('/lso/create');
	})

	$("body").on("click", ".assign-lso-btn", function(e) {
		e.preventDefault();
		$("#assignedTo").select2({data: main.lsoMembers});
		if ($.isNumeric($(this).data('assigned-to'))) {
			$("#assignedTo").select2('val', $(this).data('assigned-to'));
		}
		if ($.isNumeric($(this).data('id'))) {
			$("#reassignLsoId").val($(this).data('id'));
		}
		$("#reassign-modal").modal("show");
	});

	$("body").on("click", "#process-reassign-btn", function(e) {
		e.preventDefault();
		if ($.isNumeric($("#assignedTo").val())) {
			var confirmed = confirm("Bạn có muốn assign cho nhân viên này?");
			if (confirmed) {
				main.reassignLso($("#reassignLsoId").val(), $("#assignedTo").val());
			}
		} else {
			showPropzyAlert("Xin vui lòng chọn nhân viên LSO");
		}
	});

	$("body").on("click", ".delete-lso-btn", function(e) {
		var confirmed = confirm("Bạn có muốn xóa LSO này ?");
		if (confirmed) {
			var lsoId = $(this).data('id');
			main.deleteLso(lsoId);
		}
	});
});
