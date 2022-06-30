<div id="deal-total-list-modal" class="modal" role="dialog" aria-hidden="false">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Danh sách deal listing</h4>
			</div>
			<div class="modal-body message">
				<div class="row">
					<div class="col-sm-12">
						<table id="deal-total-list-table" class="table table-bordered table-striped" width="100%" style="width: 100%;">
							<thead>
							<tr>
								<th>Deal Id</th>
								<th>BA</th>
								<th>Số điện thoại</th>
								<th>Trạng thái</th>
							</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
			</div>
		</div>

	</div>
</div>

<div id="tour-total-list-modal" class="modal" role="dialog" aria-hidden="false">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Danh sách tour listing</h4>
			</div>
			<div class="modal-body message">
				<div class="row">
					<div class="col-sm-12">
						<a id="showListingFeedbackForManager" href="javascript:void(0);" class="btn btn-info" data-rlistingId="0">Xem đánh giá &nbsp;
							<span id="listingFeedbackCountTour" class="label label-warning"></span>
						</a>
						<a id="btn-show-feedback-concierge" href="javascript:void(0);" class="btn btn-info" data-rlistingId="0">Đánh giá từ CC
							<span id="count-feedback-concierge" class="label label-warning"></span>
						</a>
					</div>
					<div class="col-sm-12">
						<table id="tour-total-list-table" class="table table-bordered table-striped" width="100%" style="width: 100%;">
							<thead>
							<tr>
								<th>Deal Id</th>
								<th>Tour Id</th>
								<th>BA</th>
								<th>CC</th>
								<th>Ngày giờ đi tour</th>
								<th>Trạng thái</th>
							</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
			</div>
		</div>

	</div>
</div>