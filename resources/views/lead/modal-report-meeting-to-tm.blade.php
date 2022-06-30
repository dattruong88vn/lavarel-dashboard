<div id="modalReportMeetingToTm" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formMakeSchedule" method="post" >
                <input type="hidden" id="customerId" name="customerId" value="{{$lead->request->customerId}}" />
                <input type="hidden" id="leadId" name="leadId" value="{{$lead->leadId}}" />
                <input type="hidden" id="dealId" name="dealId" value="{{$lead->dealId}}" />
                <input type="hidden" id="scheduleId" name="scheduleId" value="" />
                <div class="modal-header">
                    <button type="button" class="close btnCancelSchedule">&times;</button>
                    <h4 class="modal-title">Báo Meeting cho TM</h4>
                </div>
                <div class="modal-body">

                    <div class="form-group row">
                        <div class="col-sm-12">                            
                            <div class="errors errors-reportMeetingType"></div>
                            <?php foreach ($reportMeetingToTmTypes as $key => $value): ?>
                                <div>
                                    <label><input class="reportMeetingType" name="reportMeetingTypes" type="radio" value="{{$key}}" /> {{$value}}</label>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>                    
                    <div class="form-group text-center">
                        <button class="btn btn-success btnReportMeetingToTm">Báo</button>
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