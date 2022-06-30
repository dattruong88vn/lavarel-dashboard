<!-- make call -->
<div id="modalPingManager" class="modal fade " role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formPingManager" method="post" >                
                <input type="hidden" class="scheduleId" name="scheduleId" value="" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Ping your manager</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <label class="col-sm-2">DealID</label>
                            <div class="col-sm-10">
                                <div class="deal-id"></div>
                                <div class="errors"></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-4">
                            <label class="col-sm-4">Tên KH</label>
                            <div class="customer-name"></div>
                            <div class="errors"></div>
                        </div>
                        <div class="col-sm-3">
                            <label class="col-sm-4">SĐT</label>
                            <div class="customer-phone"></div>
                            <div class="errors"></div>
                        </div>
                        <div class="col-sm-5">
                            <label class="col-sm-4">Email</label>
                            <div class="customer-email"></div>
                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-4">
                            <label class="col-sm-4">Tên CS</label>
                            <div class="cs-name"></div>
                            <div class="errors"></div>
                        </div>
                        <div class="col-sm-3">
                            <label class="col-sm-4">SĐT</label>
                            <div class="cs-phone"></div>
                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <table class="listing table table-bordered">
                                <thead>
                                    <tr>
                                        <th>LID</th>
                                        <th>Địa chỉ</th>
                                        <th>Giờ đi xem</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-2">
                            <label>TM Note:</label>
                        </div>
                        <div class="col-sm-10">
                            <div class="tm-note"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <textarea class="note form-control" rows="6"></textarea>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-success btnSavePing">Solve</button>
                        <a href="#" class="btn btn-danger"  data-dismiss="modal" >Cancel</a>
                    </div>
                </div>
                <!--
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                -->
            </form>
        </div>

    </div>
</div>
<!-- end make call -->