<div id="sendMailModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Email</h4>
            </div>
            <div class="modal-body">
                <form id="formEmail" method="post">
                    <div class="form-group row">
                        <label class="col-sm-2">To</label>
                        <div class="col-sm-10">

                            <input id="emailsTo" name="emailsTo" type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">CC</label>
                        <div class="col-sm-10">

                            <input id="emailsCc" name="emailsCc" type="text" class="form-control" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2">Subject</label>
                        <div class="col-sm-10">
                            <input  id="emailSubject" name="subject" type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-xs-12">
                            <textarea id="emailContent" name="content" class="form-control" rows="16"></textarea>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button id="btnSendMail" class="btn btn-success">Send</button>
                        <a href="#" class="btn btn-danger"  data-dismiss="modal" >Cancel</a>
                    </div>
                </form>
            </div>
        </div>
        <!--
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
        -->
    </div>

</div>
