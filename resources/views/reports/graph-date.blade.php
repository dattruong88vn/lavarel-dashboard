<div class="form-group">
    <label for="" class="col-sm-1 control-label">From</label>
    <div class="col-sm-2">
        <div id="from-date" class="input-group date date-overview-status">
            <input type="text" class="form-control">
            <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
            </div>
        </div>
    </div>
    <label for="" class="col-sm-1 control-label">To</label>
    <div class="col-sm-2">
        <div id="to-date" class="input-group date date-overview-status">
            <input  type="text" class="form-control">
            <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
            </div>
        </div>
    </div>
    <div class="col-xs-6 quickDateSelected">
        <button target="0" class="btn btn-default days-ago">Today</button>
        <button target="7" class="btn btn-default days-ago">7 days</button>
        <button target="30" class="btn btn-default days-ago">1 month</button>
        <button target="" class="btn btn-default fromFirstMonth">MTD</button>
        <button target="90" class="btn btn-default fromFirstQuarter">QTD</button>
        <button target="365" class="btn btn-default fromFirstYear">YTD</button>
    </div>
</div>

<script type="text/javascript">
    $(function(){
        // Around and around
        $('.date-overview-status').datepicker({
            format: 'dd-mm-yyyy',
            autoclose: true
        }).datepicker("update", new Date());

        $('#from-date').on("changeDate", function (e) {
            selectionChange = true;
            postData.fromDate = e.date.getTime();
        });

        $('#to-date').on("changeDate", function (e) {
            selectionChange = true;
            postData.toDate = e.date.getTime() + 86400000;
        });

        $('.days-ago').click(function(){
            selectionChange = true;
            dayAgoTarget = parseInt($(this).attr("target"));
            postData.fromDate = dayAgo(dayAgoTarget);
            $('#from-date').datepicker("update", new Date(postData.fromDate));

            postData.toDate = currentTime;
            $('#to-date').datepicker("update", new Date(postData.toDate));
            return false;
        });
        $('.fromFirstQuarter').click(function(){
            selectionChange = true;
            postData.fromDate = getQuarterFirstDay();
            $('#from-date').datepicker("update", new Date(postData.fromDate));

            postData.toDate = currentTime;
            $('#to-date').datepicker("update", new Date(postData.toDate));
            return false;
        });
        $('.fromFirstMonth').click(function(){
            selectionChange = true;
            postData.fromDate = getMonthFirstDay();
            $('#from-date').datepicker("update", new Date(postData.fromDate));

            postData.toDate = currentTime;
            $('#to-date').datepicker("update", new Date(postData.toDate));
            return false;
        });
        $('.fromFirstYear').click(function(){
            selectionChange = true;
            postData.fromDate = getYearFirstDay();
            $('#from-date').datepicker("update", new Date(postData.fromDate));

            postData.toDate = currentTime;
            $('#to-date').datepicker("update", new Date(postData.toDate));
            return false;
        });
    });
</script>
<style type="text/css">
    .quickDateSelected  > button:focus {
            background-color: grey;
            color: white;
    }
</style>