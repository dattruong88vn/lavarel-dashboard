<div id="modal-edit-training" style="z-index: 1051" class= "modal fade" role = "dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content modal-lg">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="title-traing-action">Tạo khóa học</h4>
            </div>
            <div class="modal-body">
                <div id="content-cancel-crawler">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12">
                                <input type="hidden" name="course-id" id="course-id">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label class="control-label required" for="name-training">Tên khóa học</label>
                                <input id="name-training" name="name-training" validate="require|max:32|min:3" placeholder="Nhập tên khóa học" type="text" class="form-control" />
                            </div>
                            <div class="col-md-6">
                                <label class="control-label required" for="center-training">Trung tâm đến học</label>
                                <select id="center-training" name="center-training" class="form-control"></select>
                            </div>

                        </div>
                    </div>
                    <div class="form-group tc-other-address" style="display: none">
                        <div class="row">
                            <div class="col-md-12">
                                <label class="control-label required" for="address-training">Địa chỉ khác</label>
                                <input id="address-training" name="address-training" type="text" class="form-control" />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="checkbox">
                                    <label for="require-training" class="control-label">
                                        <input id="require-training" type="checkbox" value="true">
                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
                                        Bắt buộc
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-4">
                                <label class="control-label required" for="start-date-training">Ngày khai giảng</label>
                                <div class="input-group date-range date">
                                    <input id="start-date-training" name="start-date-training" formatter="date" placeholder="Nhập ngày khai giảng" type="text" class="form-control" />
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-th"></span>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-4">
                                <label class="control-label required" for="start-date-training">Giờ khai giảng</label>
                                <div class="input-group bootstrap-timepicker timepicker">
                                    <input id="start-time-training" name="start-time-training"  placeholder="Nhập giờ" type="text" class="form-control" />
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                </div>

                            </div>
                            <div class="col-md-4">
                                <label class="control-label required" for="time-training">Thời lượng học (Phút)</label>
                                <input id="time-training" name="time-training" placeholder="Nhập thời gian" type="text" class="form-control" />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12">
                                <label class="control-label" for="des-training">Mô tả</label>
                                <textarea id="des-training" name="des-training" placeholder="Nhập mô tả khóa học" class="form-control" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <div style="padding: 10px; background-color: #eee; border: dashed 2px #ccc;">
                                    <button id="btn-file" type="button" class="btn btn-info">Tài liệu đính kèm</button>
                                    <input name="file-training" type="file" class="form-control hidden" />
                                    <div id="name_file" style="font-size: 12px; margin-top: 5px;"><i>Vui lòng chọn file word, excel và pdf</i></div>
                                    <input id="path-file-training" name="path-file-training" type="hidden"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{--<form id="data-send" action="/pos/training/store" method="post">

                        <div class="hidden">

                            <input type="text" name="csrf-token" value="{{ csrf_token() }}">
                        </div>
                        <div class="form-group">

                        </div>
                        <div class="form-group">
                            <label><input name="require-training" type="checkbox" value="1"/> Là bắt buộc</label>
                        </div>
                        <div class="form-group">
                            <select name="center-training" class="form-control">
                                <option value="-1">Trung tâm khóa học</option>
                                @foreach($list_center as $item)
                                    <option data-address="{{$item->address}}" value="{{$item->tCId}}">{{$item->name}}</option>
                                @endforeach
                            </select>
                            <div class="address" style="display: none">
                                <label style="margin-top: 10px">Nhập địa chỉ khác</label>
                                <input class="form-control" type="text" name="address-training" value="">
                            </div>
                            <script type="text/javascript">
                                $("select[name='center-training']").change(function(){
                                    if($(this).val()==8){
                                        $("input[name='address-training']").val("");
                                        $(".address").show();
                                    }else{
                                        $(".address").hide();
                                        $("input[name='address-training']").val($(this).find('option:selected').data("address"));
                                    }
                                });
                            </script>
                        </div>

                        <div class="form-group">
                            <div class="input-group" style="width: 100%;">
                                <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-th"></span>
                                </div>
                                <input name="starte-date-training" formatter="date" placeholder="Ngày khai giảng" type="text" class="form-control" />
                            </div>
                        </div>

                        <div class="form-group">
                            <input name="time-training" placeholder="Thời lượng khóa học" type="text" class="form-control" />
                        </div>

                        <div class="form-group">
                            <textarea name="des-training" placeholder="Mô tả khóa học" class="form-control"></textarea>
                        </div>

                        <div class="row form-group">

                        </div>
                    </form>--}}
                </div>
                <div class="modal-footer">
                    <button type="button" id="submit-form-training" class="btn btn-primary">Tạo khóa học</button>
                    <button type="button" data-dismiss="modal" class="btn btn-danger">Bỏ qua</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $("input[name='starte-date-training']").datepicker({format: "dd/mm/yyyy", autoclose: true});
</script>
