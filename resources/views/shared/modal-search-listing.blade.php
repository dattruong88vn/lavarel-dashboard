<div id="modalSearchListing" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Tiêu chí tìm kiếm - <span style="color:#f00;">Số listing phù hợp (chưa nằm trong giỏ hàng): <span class="totalItems">0</span></span></h4>
            </div>
            <div class="modal-body">
                <form id="formSeachListing">
                    <input type="hidden" class="historyType" name="historyType" value="" />
                    <div class="form-group row">
                        <label class="control-label col-sm-2">Quận: </label>
                        <div class="col-md-10">
                            <div class="row" id="districtType"></div>
                        </div>
                    </div>
                    <input type="hidden" class="wardIds" value="" />
                    <!--
                    <div class="form-group row">
                        <label class="control-label col-sm-2">Phường: </label>
                        <div class="col-md-10">
                            <div class="row" id="wardType"></div>
                        </div>
                    </div>
                    -->
                    <div class="form-group row">
                        <label class="control-label col-sm-2">Hẻm: </label>
                        <div class="col-md-4" id="alleyFromTo"></div>
                        <label class="control-label col-sm-1">đến</label>
                        <div class="col-md-4" id="alleyToValue"></div>
                    </div>
                    <div class="form-group row">
                        <label class="control-label col-sm-2">Dài: </label>
                        <div class="col-md-4" id="lengthFromTo"></div>
                        <label class="control-label col-sm-1">đến</label>
                        <div class="col-md-4" id="lengthToValue"></div>
                        <label class="no-bold control-label col-sm-1" id="checkLength"></label>
                    </div>
                    <div class="form-group row">
                        <label class="control-label col-sm-2">Rộng: </label>
                        <div class="col-md-4" id="widthFromTo"></div>
                        <label class="control-label col-sm-1">đến</label>
                        <div class="col-md-4" id="widthToValue"></div>
                        <label class="no-bold control-label col-sm-1" id="checkWidth"></label>
                    </div>
                    <div class="form-group row">
                        <label class="control-label col-sm-2">Hướng: </label>
                        <div class="col-sm-10">
                            <div class="row" id="directionType"></div>
                        </div>	
                    </div>					
                    <div class="form-group row">
                        <label class="control-label col-sm-2">Năm XD: </label>
                        <div class="col-md-4" id="yearBuiltFromTo"></div>
                        <label class="control-label col-sm-1">đến</label>
                        <div class="col-md-4" id="yearBuiltToValue"></div>
                    </div>
                    <div class="form-group row">
                        <label class="control-label col-sm-2">Loại: </label>
                        <div class="col-md-5" id="privateListing"></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" type="reset" id="btnDoResetSearchListing">Reset filter</button>
                <button class="btn btn-success" id="btnDoSearchListing">Tìm kiếm</button>
            </div>
        </div>
    </div>
</div>