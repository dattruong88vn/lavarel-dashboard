<div class="form-group">
    <label for="" class="col-sm-2 control-label">Từ ngày</label>
    <div class="col-sm-3">
        <div id="from-date" class="input-group date date-overview-status">
            <input type="text" class="form-control">
            <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
            </div>
        </div>
    </div>
    <label for="" class="col-sm-2 control-label">Đến ngày</label>
    <div class="col-sm-3">
        <div id="to-date" class="input-group date date-overview-status">
            <input  type="text" class="form-control">
            <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
            </div>
        </div>
    </div>
</div>
<br>
<script type="text/javascript">
    var currentTime = (new Date()).getTime();
    var postData = {
        fromDate: <?=$postData['fromDate']?>,
        toDate: <?=$postData['toDate']?>
    }
    
    $(function(){
        $('.date-overview-status').datepicker({
            format: 'dd-mm-yyyy',
            autoclose: true
        });

        $('#from-date').on("changeDate", function (e) {
            postData.fromDate = e.date.getTime();
            refreshDateData();
        }).datepicker("update", new Date(postData.fromDate));

        $('#to-date').on("changeDate", function (e) {
            postData.toDate = e.date.getTime() + 86400000;
            refreshDateData();
        }).datepicker("update", new Date(postData.toDate - 1));
    })
</script>