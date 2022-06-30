<div id="makeScheduleModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formMakeSchedule" method="post" >
                <input type="hidden" id="customerId" name="customerId" value="{{$lead->request->customerId}}" />
                <input type="hidden" id="leadId" name="leadId" value="{{$lead->leadId}}" />
                <input type="hidden" id="scheduleId" name="scheduleId" value="" />
                <div class="modal-header">
                    <button type="button" class="close btnCancelSchedule">&times;</button>
                    <h4 class="modal-title">Đặt lịch xem</h4>
                </div>
                <div class="modal-body">

                    <div class="form-group row">
                        <label class="col-sm-2">Tên</label>
                        <div class="col-sm-10">
                            {{isset($lead->request->customers)?$lead->request->customers->name:""}}
                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Thông tin liên hệ</label>
                        <div class="col-sm-10">
                            <a href="tel:{{isset($lead->request->customers)?$lead->request->customers->phone:""}}" class="tel">{{isset($lead->request->customers)?$lead->request->customers->phone:""}}</a><br />
                            <a href="mailto:{{isset($lead->request->customers)?$lead->request->customers->email:""}}" class="tel">{{isset($lead->request->customers)?$lead->request->customers->email:""}}</a>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Thời gian</label>
                        <div class="col-sm-10">
                            <div class="col-md-6">
                                <div class="input-group date" data-provide="datepicker">
                                    <input id="whenDate" name="whenDate" class="form-control" />
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                </div>
                                <div class="errors"></div>
                            </div>
                            <div class="col-md-6">
                                <div class="input-group bootstrap-timepicker timepicker">
                                    <input id="whenTime" type="text" class="whenTime form-control input-small">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                </div>
                                <div class="errors"></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Địa điểm</label>
                        <div class="col-sm-10">
                            <div>
                                <textarea name="address" class="address form-control" rows ='6' ></textarea>
                                <div class="errors"></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Thông tin listing</label>
                        <div class="col-sm-10">
                            <span class="listings">                              
                            </span> <span> <a href="#listing-to-send" class="btnAddlisting"><i class="glyphicon glyphicon-plus-sign"></i></a></span>
                            <input type="hidden" name="listingIds" class="listingIds" value="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Lưu ý</label>
                        <div class="col-sm-10">
                            <div>
                                <textarea name="note" class="form-control note" rows="6"></textarea>
                                <div class="errors"></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-success btnSaveSchedule">Save</button>
                        <a href="#" class="btn btn-danger btnCancelSchedule" >Cancel</a>
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