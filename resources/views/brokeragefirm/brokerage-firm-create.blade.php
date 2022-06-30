@extends('layout.default')

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="box box-info">
                <div class="box-header">
                   <h3 class="box-title">Tạo brokerage-firm</h3>
                    <!-- <small>Advanced and full of features</small> -->
                </div>
                <form id="create-form" method="post">
                    <div class="box-body">

                        <div class="row">
                          <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label>Tên</label>
                                <input type="text" id="name" name="name" class="form-control" value="" required="required" pattern="" title="">
                              </div>

                              <div class="form-group">
                                <label>Tên (english)</label>
                                <input type="text" id="name-en" name="name-en" class="form-control" value="" required="required" pattern="" title="">
                              </div>
                          </div>
                          <div class="col-md-6 col-xs-12">
                                <!--Images/Video-->
		                            <div class="col-md-12 col-xs-12">
		                                <div class="form-group imageBrokerageFirm">
		                                    <label>Hình ảnh</label>
		                                    <input id="" class="file-image-create" multiple type="file" class="file" data-upload-url="/brokerage-firm-manager/image-brokerage-firm-uploader">
		                                </div>
		                            </div>
	                            <!-- #Images/Video-->
                           </div>
                        </div><!-- /.row -->

                        <div class="row">
                            <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>Mô tả</label>
                                        <div class="form-group">
                                            <form>
                                                <textarea class="form-control" name="description" id="description" rows="3" placeholder="Mô tả Listing"></textarea>
                                            </form>
                                        </div> 
                                    </div>
                            </div>  
                          </div><!-- /.row -->
                          <div class="row">
                            <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>Mô tả (english)</label>
                                        <div class="form-group">
                                            <form>
                                                <textarea class="form-control" name="description-en" id="description-en" rows="3" placeholder="Mô tả Listing"></textarea>
                                            </form>
                                        </div> 
                                    </div>
                            </div>  
                          </div><!-- /.row -->
                    </div><!-- /.box-body -->
                    <div class="box-footer">
                        <input type="submit" id="post-brokerage-firm" class="btn btn-primary" value="Tạo">
                    </div>
                </form>
            </div><!-- /.box -->
        </div>
    </div>
@endsection

@section('page-js')   
    @extends('templates.progressing-item') 
    <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <!-- iCheck 1.0.1 -->
    <script src="{{loadAsset("/plugins/iCheck/icheck.min.js")}}"></script>
    <script src="{{loadAsset("/js/bootstrap-datepicker.min.js")}}"></script>

    <script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
    <script src="{{loadAsset("/plugins/wysihtml/wysihtml5.js")}}"></script>

    <script src="{{loadAsset("/js/template7.min.js")}}"></script>
    <script src="{{loadAsset("/js/define.js")}}"></script>
    <script src="{{loadAsset("/js/function.js")}}"></script>


    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM&libraries=places&sensor=false&language=vi-VN"></script>
    <script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>


    <script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
    <script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
    
    <script type="text/javascript">
      var isCreate = true; 
      $(function () {
        CKEDITOR.replace('description');
        CKEDITOR.replace('description-en');

        $(".file-image-create").fileinput({
            deleteUrl:"/brokerage-firm-manager/image-brokerage-firm-remover",
            allowedFileExtensions : ['jpg', 'png','gif'],
            overwriteInitial: false,
            allowedFileTypes: ['image'],
            maxFileCount: 1,
            slugCallback: function(filename) {
                return filename.replace('(', '_').replace(']', '_');
            }
        });
      });
    </script>
    <script src="{{loadAsset("/js/brokerage-firm.js")}}"></script>
@stop
@section('page-css')
    <!-- <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" /> -->
    <link href="{{loadAsset("/css/profilebuilding.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/css/listing-create.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/autocomplete/jquery.auto-complete.css")}}" rel="stylesheet" type="text/css" />

    <link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel="stylesheet" type="text/css" />
    

@stop
