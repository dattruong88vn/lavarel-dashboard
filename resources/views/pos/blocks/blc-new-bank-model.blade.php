<div id="pos-new-bank-modal" class="modal fade" role="dialog" aria-hidden="true" data-backdrop="static" >
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
                <div class="form-group">
                    <button type="button" class="close close-custom" data-dismiss="modal">×</button>
                    <h4>Thêm mới ngân hàng</h4>
                </div>
                <div style="width:600px">
                    <div class="row form-group">
                        <div class="col-md-12">
                            <label class="control-label required">Code</label>
                            <div class="">
                                <input class="form-control" type="text" name="bank-code" placeholder="Ex : VietinbankA" data-name="code">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <label class="control-label required">Tên ngân hàng</label>
                            <div class="">
                                <input class="form-control" type="text" name="bank-name" placeholder="Ex : VietinbankA" data-name="name">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <label class="control-label required">Lãi suất (%)</label>
                            <div class="">
                                <input  class="form-control" type="text" name="bank-interested-rate" placeholder="Ex : 7" data-name="interestedRate">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="checkbox">
                                <label>
                                    <input  type="checkbox" value="true" name="bank-contracted" data-name="contracted">
                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
                                    Đã ký hợp đồng
                                </label>
                            </div>
                        </div>
                    </div>



                    <div id="btn-group-footer" class="text-right">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                        <button id="btn-pos-add-bank-save" type="button" class="btn btn-success btn-pos-phone-action-footer">Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ loadAsset("/js/pos/common/common-pos-new-bank.js")}}"></script>