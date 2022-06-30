<!-- Calendar -->
<div class="box box-solid bg-green-gradient">
    <div class="box-header">
        <i class="fa fa-calendar"></i>
        <h3 class="box-title">Lịch công việc</h3>
        <!-- tools box -->
        <div class="pull-right box-tools">
            <!-- button with a dropdown -->
            <div class="btn-group">
                <button class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bars"></i></button>
                <ul class="dropdown-menu pull-right" role="menu">
                    <li><a href="#">Add new event</a></li>
                    <li><a href="#">Clear events</a></li>
                    <li class="divider"></li>
                    <li><a href="#">View calendar</a></li>
                </ul>
            </div>
            <button class="btn btn-success btn-sm" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <button class="btn btn-success btn-sm" data-widget="remove"><i class="fa fa-times"></i></button>
        </div><!-- /. tools -->
    </div><!-- /.box-header -->
    <div class="box-body no-padding">
        <!--The calendar -->
        <div id="calendar" style="width: 100%"></div>
    </div><!-- /.box-body -->
</div><!-- /.box -->

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script>
$("#calendar").datepicker().on('changeDate', function (e) {
    var date = e.date.getDate();
    var month = e.date.getMonth();
    var year =e.date.getFullYear();
    var selectedDate = year+"-"+(month+1)+"-"+(date);
    getItem('',selectedDate,selectedDate);
    // `e` here contains the extra attributes
});
</script>