<!-- make call -->
<div id="CallReminderModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formMakeCallReminderModal" method="post" >
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Reminder detail</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-sm-3">When</label>
                        <div class="col-sm-9">
                            <div id="whenDate"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">set reminder</label>
                        <div class="col-sm-9">
                            <span id="reminderTime" name="reminderTime"></span> mins
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">Type</label>
                        <div class="col-sm-9">
                            <div id="type" name="type">
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">With</label>
                        <div class="col-sm-9">
                            <span id="with"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">Tiêu đề</label>
                        <div class="col-sm-9">
                            <div id="subject">                                
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">Nội dung</label>
                        <div class="col-sm-9">
                            <div id="content">
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">Responsible person</label>
                        <div class="col-sm-9" id="responsiblePerson">

                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">Status</label>
                        <div class="col-sm-9">
                            <div id="status"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">Priority</label>
                        <div class="col-sm-9">
                            <div id="priority">
                            </div>
                        </div>
                    </div>
                    <div class="form-group text-center">
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