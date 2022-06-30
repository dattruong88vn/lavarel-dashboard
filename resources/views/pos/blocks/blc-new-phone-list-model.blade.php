<div id="pos-phone-call-modal" class="modal fade" role="dialog" aria-hidden="true" data-backdrop="static" >
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
                <button type="button" id="btn-pos-close-phone" class="close">×</button>
                <div id="choose-phone-number" class="choose-phone-number" style="width:600px">
                    <div id="pos-phone-call-line-number"></div>
                    <div class="form-inline new-subPhone" id="pos-phone-call-new-phone"></div>
                    <div id="area-err"></div>
                    <div id="btn-group-footer">
                        <button id="btn-pos-revert-phones" type="button" class="btn btn-default btn-pos-phone-action-footer">Bỏ qua</button>
                        <button id="btn-pos-update-phones" type="button" class="btn btn-warning btn-pos-phone-action-footer">Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- Modal show list live --}}
<div id="pos-phone-listing-modal" class="modal fade" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content modal-lg">
            <div class="modal-body">
                <div class="form-group">
                    <button type="button" id="btn-pos-close-phone-listing" class="close close-custom" data-dismiss="modal">×</button>
                    <h4>Danh Sách Tin Đăng Trùng Số Điện Thoại</h4>
                </div>

                <div class="form-group">
                    <div class="nav-tabs-custom">
                        <ul class="nav nav-tabs">
                            <li class=" active pos-phone-listing-tab" data-type="2">
                                <a id="pos-phone-listing-tab-sa" href="#tab-listing-sa" data-toggle="tab" aria-expanded="true">Tin đăng SA <span class="label label-success" id="pos-phone-listing-label-sa">0</span></a>
                            </li>
                            <li class=" pos-phone-listing-tab" data-type="1">
                                <a id="pos-phone-listing-tab-pre" href="#tab-listing-pre" data-toggle="tab" aria-expanded="false">Tin đăng PRE <span class="label label-success" id="pos-phone-listing-label-pre">0</span></a>
                            </li>

                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab-listing-sa">
                                <table id="tb-phone-live-listing-sa" class="table table-hover table-bordered pos-table" width="100%">
                                    <thead>
                                    <tr>
                                        <th width="28px" style="width: 28px"></th>
                                        <th>ID</th>
                                        <th>Địa chỉ</th>
                                        <th>Tên chủ nhà</th>
                                        <th>Người phụ trách</th>
                                    </tr>
                                </table>
                            </div>
                            <!-- /.tab-pane -->
                            <div class="tab-pane" id="tab-listing-pre">
                                <table id="tb-phone-live-listing-pre" class="table table-hover table-bordered pos-table" width="100%">
                                    <thead>
                                    <tr>
                                        <th width="28px" style="width: 28px"></th>
                                        <th>ID</th>
                                        <th>Địa chỉ</th>
                                        <th>Tên chủ nhà</th>
                                        <th>Người phụ trách</th>
                                    </tr>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="form-group text-right">
                    <div id="btn-group-footer">
                        <button  type="button" id="btn-pos-phone-cancel-listing" class="btn btn-danger btn-pos-phone-action-footer">Hủy tin đăng</button>
                        <button  type="button" id="btn-pos-phone-merge-listing" class="btn btn-warning btn-pos-phone-action-footer">Gom tin đăng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Modal show reason --}}
<div id="pos-phone-cancel-modal" class="modal fade" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
                <div class="form-group">
                    <button type="button" id="btn-pos-close-phone-cancel" class="close close-custom" data-dismiss="modal">×</button>
                    <h4>Ghi chú cho hủy tin đăng</h4>
                </div>

                <div class="form-group">
                    <div class="col-md-12">
                        <div class="row">
                            <textarea rows="5" class="form-control" id="txt-note-cancel-listing-by-phone" style="display: initial"></textarea>
                        </div>

                    </div>
                </div>
                <div class="form-group text-right">
                </div>
                <div class="form-group text-right">
                    <div id="btn-group-footer">
                        <button  type="button" id="btn-pos-phone-cancel-listing-send" class="btn btn-danger btn-pos-phone-action-footer">Hủy tin đăng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ loadAsset("/js/pos/common/common-pos-call-phone-number.js")}}"></script>