<div id="modalUpdateStatusPendingReason" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Lý do hủy?</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <label for="sel1" class="col-sm-2">Chọn lý do:</label>
                    <div class="col-sm-10">
                        <select class="form-control reasonId"></select>
                        <div class="errors errors-reasonId"></div>
                    </div>
                </div>
                <section class="reminder">
                    <div class="form-group row">
                        <label class="col-sm-2">Vào lúc</label>
                        <div class="col-md-5">
                            <div class="input-group bootstrap-timepicker">
                                <input name="whenTime" type="text" class="form-control input-small whenTime" value="">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="input-group">
                                <input name="whenDate" class="form-control whenDate" value="{{date('d/m/Y')}}" />
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>					
                        </div>
                        <div class="col-sm-offset-4 col-sm-8">
                            <span class="errors reminderDateErrors"></span>
                        </div>
                    </div>
                </section>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-cornfirm">Xác nhận</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script src="{{loadAsset('/js/swat_optimize/updateStatusReasonPendingModal.js')}}"></script>
