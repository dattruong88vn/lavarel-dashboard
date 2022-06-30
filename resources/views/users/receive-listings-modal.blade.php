<div id="receiveListingsModal" class="modal fade" tabindex="-1" role="dialog" >
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" onclick="closeReceiveListing()" aria-label="Close">×</button>
				<h4 class="modal-title text-center">Nhận listing</h4>
            </div>
            
			<div class="modal-body">
				<table id="list-assistants" class="dataTable">
					<thead>
						<tr>
							<th>Lựa chọn</th>
							<th>Tên user</th>
							<th>Tên quận</th>
							<th>Tên phường</th>
							<th>Trạng thái</th>
						</tr>
                    </thead>
					<tbody>
						<!-- <tr>
							<td>
								<select class="form-control">
									<option value="" selected>Chọn tác vụ</option>
									<option value="">Nhận listing từ</option>
									<option value="">Nhận listing và xóa quận của</option>
								</select>
							</td>
							<td>BSA - Nguyễn Xuân Hoàng</td>
							<td>Quận 6</td>
							<td>Phường 1, Phường 2</td>
                            <td>Mua, bán</td>
                        </tr> -->
                    </tbody>
				</table>
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col-lg-8"></div>
                    <div class="col-lg-2">
                        <button id="receiveListing" type="button" class="btn btn-orange w-100" data-dismiss="modal" onclick="receiveListing()" disabled>Nhận</button>
                    </div>
                    <div class="col-lg-2">
                        <button type="button" class="btn btn-default w-100" data-dismiss="modal" onclick="closeReceiveListing()">Bỏ qua</button>
                    </div>
                </div>
            </div>
            
		</div>
	</div>
</div>
<script>
    var table = null;
    var _dataListingListing = null;
    var userIdParent = null;
	$(document).ready(function() {
		// $('#list-assistants').dataTable({
		// 	language: {
		// 		search: 'Tìm kiếm',
		// 		paginate: {
		// 			previous: '<',
		// 			next: '>',
		// 			first: '|<',
		// 			last: '>|'
		// 		},
		// 		lengthMenu: 'Hiển thị _MENU_ trên 1 trang',
		// 		searchPlaceholder: 'Từ khóa',
		// 		info: 'Hiển thị _START_ đến _END_ của _TOTAL_',
		// 		emptyTable: 'Chưa có dữ liệu',
        //         infoEmpty: '',
        //         data
		// 	}
        // });
        table = $('#list-assistants').dataTable({
			language: {
				search: 'Tìm kiếm',
				paginate: {
					previous: '<',
					next: '>',
					first: '|<',
					last: '>|'
				},
				lengthMenu: 'Hiển thị _MENU_ trên 1 trang',
				searchPlaceholder: 'Từ khóa',
				info: 'Hiển thị _START_ đến _END_ của _TOTAL_',
				emptyTable: 'Chưa có dữ liệu',
                infoEmpty: '',
            },
            "columnDefs": [
                {
                    // The `data` parameter refers to the data for the cell (defined by the
                    // `data` option, which defaults to the column being worked with, in
                    // this case `data: 0`.
                    "render": function(data, type, row) {
                        return "<select id='" + row.userId + "' onchange='receiveListingValue()' class='form-control'>" +
                            "<option value='' selected>Chọn tác vụ</option>" +
                            "<option value='1'>Nhận listing từ</option>" +
                            "<option value='2'>Nhận listing và xóa quận của</option>" +
                            "</select>";
                    },
                    "targets": 0
                },
                // { "visible": false,  "targets": [ 3 ] }
            ],
            // data: [
            //         {
            //             districtIds: "2",
            //             districtNames: "Quận 2",
            //             listingTypeIDs: "1,2",
            //             listingTypeNames: "Mua|Bán,Thuê",
            //             name: "Nguyễn Phi Anh",
            //             updateCase: null,
            //             userId: 712,
            //             userName: "phianh",
            //             wardIDs: "13",
            //             wardIdDistrictId: "13-2",
            //             wardNames: "Phường An Lợi Đông"
            //         }
            //     ],
            columns: [
                { data: '' },
                { data: 'name' },
                { data: 'districtNames' },
                { data: 'wardNames' },
                { data: 'listingTypeNames'}
            ]
        });
    });
    // const showTransferDealsModal = () => {
	// 	$('#transferListingsModal').modal('hide');
    //     $('#transferDealsModal').modal();
    // }
    const showReceiveListingsModal = (data) => {
        _dataListing = data.assignUsers;
        this.userIdParent = data.userId;
        if (data.assignUsers.length > 0) {
            table.fnClearTable();
            table.fnAddData(data.assignUsers);
            
            $('#td-sel-zones').select2({
                width: '100%'
            });
    		$('#td-sel-teams').select2({
    			width: '100%'
            });
    		$('#td-sel-districts').select2({
    			width: '100%'
            });
    		$('#td-sel-wards').select2({
    			width: '100%'
            });
    		$('#td-sel-statuses').select2({
    			width: '100%'
            });
    		//$('#transferDealsModal').modal('hide');
            $('#receiveListingsModal').modal({
                backdrop: "static",
                keyboard: false
            });
        }
    }
    const receiveListingValue = () => {
        //$("#receiveListing").val();
        for (let index = 0; index < _dataListing.length; index++) {
            const element = _dataListing[index];
            _dataListing[index].updateCase = $("#" + element.userId).val();
        }
        if (_dataListing.filter((o) => {return (o.updateCase && o.updateCase)}).length > 0) {
            $('#receiveListing').prop('disabled', false);
        } else {
            $('#receiveListing').prop('disabled', true);
        }
    }
    const receiveListing = () => {
        let dataPost = {};
        dataPost.arrayListing = _dataListing.filter((o) => {return (o.updateCase && o.updateCase)});
        dataPost.userId = userIdParent;
        showPropzyLoading();
        axios
            .post("/user/receive-listing", dataPost)
            .then(function(xhr) {
                if (xhr.data.result) {
                    window.location.reload();
                    hidePropzyLoading();
                } else {
                    showPropzyAlert(xhr.data.message);
                    hidePropzyLoading();
                    //window.location.reload();
                }
            })
            .catch(function(error) {
                window.location.reload();
                hidePropzyLoading();
            });
    }
    const closeReceiveListing = () => {
        //table.clear().draw();
        showPropzyLoading();
        window.location.reload();
    }
</script>