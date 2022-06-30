<div id="makeScheduleModal" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formMakeSchedule" method="post" >
                <input type="hidden" id="customerId" name="customerId" value="{{$leadDealDetail->customers->customerId}}" />
                <input type="hidden" id="socialUid" name="socialUid" value="" />
                <input type="hidden" id="dealId" name="dealId" value="{{$leadDealDetail->dealId}}" />
                <input type="hidden" id="scheduleId" name="scheduleId" value="" />
                <input type="hidden" id="estimatedDistance" name="estimatedDistance" value="" />
                <!--
                <div class="modal-header">
                    <button type="button" class="close btnCancelSchedule">&times;</button>
                    <h4 class="modal-title">Đặt lịch xem</h4>
                </div>
                -->
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="form-field-label control-label">Thông tin KH</label>
                        <div class="form-field-wrapper">
                            {{isset($leadDealDetail->customers)?$leadDealDetail->customers->name:""}}
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-3">
                            <div class="row">
                                <label class="col-sm-6 control-label">Giờ bắt đầu đi xem</label>
                                <div class="col-sm-6 input-time form-field">
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input id="whenTime" type="text" class="form-control input-small">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                    <div class="errors"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="row">
                                <label class="col-sm-6 control-label">Ngày bắt đầu đi xem</label>
                                <div class="col-sm-6 form-field">
                                    <div class="input-group date">
                                        <input id="whenDate" name="whenDate" class="form-control" value="<?php echo date('m/d/Y'); ?>" />
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </div>
                                    </div>
                                    <div class="errors"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="row">
                                <label class="col-sm-4 control-label">Thời gian đi</label>
                                <div class="col-sm-6">
                                    <div id="label_estimatedTime" ></div>
                                    <input type="hidden" id="estimatedTime" value="" />
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="row">
                                <label class="col-sm-4 control-label">Giờ kết thúc</label>
                                <div class="col-sm-6">
                                    <div id="label_estimatedDate" ></div>
                                    <input type="hidden" id="estimatedDate" value="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-12">
                            <div class="row">
                                <label class="control-label form-field-label">Nhân viên dẫn Tour</label>
                                <div class="form-field-wrapper">
                                    <div class="form-field">
                                        <select class="txtSearchAssignTo form-control" name="assignTo" id="assignToConceirgeSelect" style="width: 350px">
                                            <option value=''>Đang tải ...</option>
                                        </select>
                                        <div class="errors"></div>
                                    </div>
                                    <div class="form-field">
                                        <div class="errors m-t-7" id="checking-avai-cc-message"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4"></div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-12">
                            <div class="row">
                                <label class="form-field-label control-label">Ghi chú</label>
                                <div class="form-field-wrapper">
                                    <div>
                                        <textarea name="note" class="form-control note" rows="6" style="resize: none"></textarea>
                                        <div class="errors"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4"></div>
                    </div>

                    <hr>
                    
                    <div class="schedule-list-wrapper"></div>
                    
                    <div class="form-group row">
                        <label class="col-sm-12 control-label">Sản phẩm đi xem lần này</label>
                        <div class="col-sm-12">
                            <table class="scheduleListings table table-bordered">
                                <thead>
                                    <tr>
                                        <th>LID</th>
                                        <th>Địa chỉ</th>
                                        <th>Người phụ trách</th>
                                        <th>SĐT chủ listing</th>
                                        <th>Thời gian(Phút)</th>
                                        <th>Giờ đến</th>
                                        <th>Khoảng cách(KM)</th>
                                        <th>Ghi chú</th>
                                        <th>Sắp xếp</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <span class="listings hidden">                              
                            </span> 
                            <span> 
                                <a href="#customer-listings" class="m-t-7 btn btn-warning btnAddlisting"><i class="glyphicon glyphicon-plus-sign"></i> Thêm</a>
                            </span>
                            <input type="hidden" name="listingIds" class="listingIds" value="" />
                            <input type="hidden" name="briefFormIds" class="briefFormIds" value="" />
                        </div>
                    </div>
                   
                    <div class="form-group text-center">
                        <a href="#" class="btn btn-danger btnCancelSchedule" >Hủy bỏ</a>
                        <button class="btn btn-success btnSaveSchedule">Đặt lịch xem</button>
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