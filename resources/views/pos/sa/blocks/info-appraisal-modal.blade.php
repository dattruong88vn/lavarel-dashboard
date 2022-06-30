{{-- Thông tin thẩm định (Appraisal)--}}
<div id="info-appraisal-modal" class="modal" role="dialog" aria-hidden="false">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content modal-lg">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Thẩm định</h4>
			</div>
			<div class="modal-body message">
				<div class="form-horizontal">
					<div class="form-group">
						<div class="col-md-6">
							<label for="appraisal-company" class="control-label required label-appraisal-company">Công ty thẩm định</label>
							<select id="appraisal-company" class="form-control"></select>
						</div>
						<div class="col-md-6">
							<label for="appraisal-type" class="control-label required label-appraisal-type">Loại thẩm định</label>
							<select id="appraisal-type" class="form-control"></select>
						</div>
					</div>
					<div class="form-group">
						<div class="col-md-12">
							<label for="appraisal-price" class="control-label required label-appraisal-price">Giá</label>
							<input id="appraisal-price" type="text" class="form-control">
						</div>
					</div>
					<div class="form-group appraisal-photo-group">
						<div class="col-md-12">
							<label for="appraisal-photo" class="control-label required label-appraisal-photo">Files đính kèm</label>
							<div id="appraisal-photo"></div>
						</div>
					</div>

				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				<button id="btn-update-appraisal-info" type="button" class="btn btn-success">Cập nhật</button>
			</div>
		</div>

	</div>
</div>
<script src="{{ loadAsset("/js/pos/common/files-upload_lib.js") }}"></script>
<script src="{{ loadAsset("/js/pos/sa/AppraisalInfo.js")}}" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function () {
        Window.apprailsalInfo = new AppraisalInfo();
    });
</script>
