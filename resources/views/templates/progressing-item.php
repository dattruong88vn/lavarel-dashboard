<script id="progressing-tmpl" type="text/template7">
    <form class="form-horizontal">
        <div class="box-body">
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label required">Tên</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="processing-name" placeholder="Tên">
                </div>
            </div>
            <div id="processingImage{{noEventDate}}" class="processingImage form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Hình ảnh</label>
                <div class="col-md-10 processing-photos-wrapper-{{noEventDate}}"></div>
            </div>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">Ngày bắt đầu</label>
                <div class="col-sm-10">
                    <div class="date">
                        <div class="date-picker input-group input-append date" id="datePicker{{noEventDate}}">
                            <input class="form-control eventDate" id="eventDate{{noEventDate}}" type="text" name="eventDate" value="">
                            <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label required">Tiến độ</label>
                <div class="col-sm-10">
                    <label class="radio">
                        <input type="radio" value="{{tab_ID}}" name="process-radio" id="started{{noEventDate}}">
                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
                    </label>
                </div>
            </div>
        </div><!-- /.box-body -->
    </form>
</script>