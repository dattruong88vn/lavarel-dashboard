<!-- make call -->
<div id="makeCallReminderModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formMakeCallReminderModal" method="post" >
                <input type="hidden" class="reminderTypeId" name="reminderTypeId" value=1 />
                <input type="hidden" id="customerId" name="customerId" value="{{$request->customerId}}" />
                <input type="hidden" id="dealId" name="dealId" value="{{$deal->dealId}}" />
                <input type="hidden" class="customerName" name="customerName" value="{{$request->customers->name}}" />
                <input type="hidden" class="customerPhone" name="customerPhone" value="{{$request->customers->phone}}" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">New call </h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-sm-2">When</label>
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
                                    <input id="whenTime" type="text" class="form-control input-small">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                </div>
                                <div class="errors"></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2"></label>
                        <div class="col-sm-10 input-group">
                            <label><input  type="checkbox" checked="checked" /> set reminder</label> <input type="text" class="reminderTime" name="reminderTime" size="4" /> mins

                            <div class="errors"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Type</label>
                        <div class="col-sm-10">
                            <select class="type" name="type">
                                <option value=1>Inbound</option>
                                <option value=2>Outbound</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">With</label>
                        <div class="col-sm-10">
                            <span>{{$request->customers->name}}</span>
                            <a href="tel:{{$request->customers->phone}}" class="tel">{{$request->customers->phone}}</a>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Subject</label>
                        <div class="col-sm-10">
                            <div>
                                <!--<input type="text" name="subject" class="form-control subject" placeholder="Please specify the call subject." />-->
                                <select name="subject" class="form-control subject">                                    
                                </select>
                                <input type="hidden" name="defineId" class="defineId" value="" />
                                <div class="errors"></div>
                            </div>
                            <div>
                                <textarea name="content" class="form-control content" rows="4"></textarea>
                                <div class="errors"></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Responsible persion</label>
                        <div class="col-sm-10">
                            <select id="userId" name="userId" class="form-control select2" style="width:100%" >
                                <option value="{{$userId}}">{{$userName}}</option>
                                <?php foreach ($sales as $sale): ?>
                                    <option value="{{$sale->agentId}}">{{$sale->name}}</option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Status</label>
                        <div class="col-sm-10">
                            <select class="statusId" name="statusId">
                                <option value=1>Pending</option>
                                <option value=2>Done</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Priority</label>
                        <div class="col-sm-10">
                            <select class="priorityId" name="priorityId">
                                <option value=1>Low</option>
                                <option value=2>High</option>
                                <option value=3>Normal</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-success btnSaveCallReminder">Save</button>
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