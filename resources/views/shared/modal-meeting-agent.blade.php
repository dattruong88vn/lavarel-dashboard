<!-- Modal -->
<form method="post" action="/deal/meeting-agent-for-commmission" onsubmit="return submitAgentCommission();" id="modal-meeting-agent" class="modal fade" role="dialog">
  <input type="hidden" name="dealId" value="{{$deal->dealId}}">
  <input type="hidden" name="scheduleTime">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">MÔI GIỚI - LỊCH THANH TOÁN</h3>
      </div>
      <div class="modal-body">
        <form role="form">
            <!-- date -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Ngày</label>
                  <input required name="date" oninvalid="this.setCustomValidity('Vui lòng không được để trống ngày')" oninput="this.setCustomValidity('')" type="text" value="{{date('d/m/Y')}}" class="form-control datepicker">
                </div>
              </div>
              <div class="col-md-6">
                <!-- hour -->
                <div class="form-group">
                  <label>Giờ</label>
                  <div style="width: 100%" class="input-group bootstrap-timepicker">
                      <input required oninvalid="this.setCustomValidity('Vui lòng không được để trống giờ')" oninput="this.setCustomValidity('')" style="padding-left: 5px;" id="scheduleTime" name="time" type="text" class="form-control input-small whenTime" value="">
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <!-- note -->
                <div class="form-group">
                  <label>Ghi chú</label>
                  <textarea name="note" class="form-control" rows="3"></textarea>
                </div>
              </div>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" style="border:none;" class="btn btn-default pull-left" data-dismiss="modal"> Đóng</button>
        <button type="submit" class="btn btn-propzy"> Gửi</button>
      </div>
    </div>

  </div>
</form>

<script type="text/javascript">
  function submitAgentCommission(){ // process form data
    var form = {}; $("#modal-meeting-agent").serializeArray().map(function(x){form[x.name] = x.value;}); // serialize to object
    var date = moment(form['date'] + " " + form['time'], "DD/MM/YYYY HH:mm"); // cover to timestamp
    $('input[name=scheduleTime]').val(date.unix() * 1000); // set scheduleTime
  }
  $('#modal-meeting-agent').on('shown.bs.modal', function() { // on shown modal
      $('.datepicker').datepicker({ autoclose: true, startDate: '0 days', format: "dd/mm/yyyy" }); // datepicker
      $("#scheduleTime").timepicker({ showMeridian:false }); // timepicker
  })
  @if(Session::has('message'))
    $(document).ready(function(){
      $.notify("{{ Session::get('message') }}"); 
    })
  @endif // mesg flash after submit form
</script>