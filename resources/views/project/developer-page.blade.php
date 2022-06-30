@extends('layout.default')

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="box box-info">
                <div class="box-header">
                   <h3 class="box-title">{{ $title }}</h3>
                    <!-- <small>Advanced and full of features</small> -->
                </div>
                <form role="form" id="form-create-developer">
                    <div class="box-body">

                        <div class="row">
                          <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label>Tên nhà đầu tư</label>
                                <input type="text" id="investorName" name="investorName" class="form-control" value="{{ $developer->data->investorName or ""}}" required="required" pattern="" title="">
                              </div>
                          </div>
                          <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label>Tên nhà phát triển</label>
                                <input type="text" id="developer" name="developer" class="form-control" value="{{ $developer->data->developer or ""}}">
                              </div>
                          </div>
                        </div>
                        
                        <div class="row">
                          <div class="col-xs-12">
                                  <div class="form-group">
                                      <label>Về chúng tôi</label>
                                      <div class="form-group">
                                         
                                              <textarea class="form-control" name="aboutMe" id="aboutMe" rows="3" placeholder="Mô tả Listing">{{ $developer->data->aboutMe or ""}}</textarea>
                                         
                                      </div> 
                                  </div>
                          </div>  
                        </div><!-- /.row -->
                        <div class="row">
                          <div class="col-xs-12">
                                  <div class="form-group">
                                      <label>Về chúng tôi(english)</label>
                                      <div class="form-group">
                                         
                                              <textarea class="form-control" name="aboutMeEn" id="aboutMeEn" rows="3" placeholder="Mô tả Listing">{{ $developer->data->aboutMeEn or ""}}</textarea>
                                          
                                      </div> 
                                  </div>
                          </div>  
                        </div><!-- /.row -->

                        <div class="row">
                          <div class="col-xs-12">
                                  <div class="form-group">
                                      <label>Mô tả</label>
                                      <div class="form-group">
                                          
                                              <textarea class="form-control" name="description" id="description" rows="3" placeholder="Mô tả Listing">{{ $developer->data->description or ""}}</textarea>
                                          
                                      </div> 
                                  </div>
                          </div>  
                        </div><!-- /.row -->

                        <div class="row">
                          <!--Images/Video-->
                            <div class="col-md-12 col-xs-12">
                                <div class="form-group imageListing">
                                    <label>Hình ảnh</label>
                                    <input id="" class="file-image-create" multiple type="file" class="file" data-upload-url="/imageDeveloperUploader">
                                </div>
                            </div>
                            <!-- #Images/Video-->                          
                         </div> <!-- /.row -->
                        
                    </div><!-- /.box-body -->
                    <div class="box-footer">
                        <input type="hidden" name="investorId" id="investorId" class="form-control" value="{{ $developer->data->investorId or ""}}">
                        <button type="submit" class="btn btn-primary">Tạo</button>
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
    <script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>

    <script src="{{loadAsset("/js/template7.min.js")}}"></script>
    <script src="{{loadAsset("/js/define.js")}}"></script>
    <script src="{{loadAsset("/js/function.js")}}"></script>


    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxnZfouFB3w2WEQQTzSnjdAsDLIBU5BVU&libraries=places&sensor=false&language=vi-VN"></script>
    <script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>


    <script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
    
    <script type="text/javascript">
    var path; 
    var pathConfig;
      $(function () {
          
          CKEDITOR.replace('aboutMe');
          CKEDITOR.replace('aboutMeEn');
          CKEDITOR.replace('description');
          path = [];
            <?php if(isset($developer) && $developer->result){ ?>
              path = ['<img src="<?= $developer->data->logo ?>"/>'];
            <?php }?>
          pathConfig =[
              {
                  caption: '', 
                  width: '120px', 
                  url: '/imageDeveloperRemover', // server delete action 
                  key: 100, 
                  extra: {id: 100}
              }
          ]
          $(".file-image-create").fileinput({
              deleteUrl:"/imageDeveloperRemover",
              allowedFileExtensions : ['jpg', 'png','gif'],
              maxFileCount: 1,
              initialPreview: path,
              initialPreviewConfig: pathConfig,
              overwriteInitial: false,
              allowedFileTypes: ['image'],
              slugCallback: function(filename) {
                  return filename.replace('(', '_').replace(']', '_');
              }
          });

          $('#form-create-developer').bootstrapValidator({
                  message: 'This value is not valid',
                   //container: 'tooltip',         
                  //locale: 'vi_VN',
                  excluded:  ':hidden',
                  feedbackIcons: {
                      valid: 'glyphicon glyphicon-ok',
                      invalid: 'glyphicon glyphicon-remove',
                      validating: 'glyphicon glyphicon-refresh'
                  },
                  live: 'submitted',
                  fields: {
                      investorName: {
                          validators: {
                              notEmpty: {
                              }
                          }
                      },            
                      // aboutMe: {
                      //     validators: {
                      //         notEmpty: {
                                 
                      //         }
                      //     }
                      // },
                      // aboutMeEn: {
                      //     validators: {
                      //         notEmpty: {
                                 
                      //         }
                      //     }
                      // },
                      // description: {
                      //     validators: {
                      //         notEmpty: {
                                 
                      //         }
                      //     }
                      // }
                  }
              }).on('error.form.bv', function(e) {
                  
                   var $form   = $(e.target);
                  $form.bootstrapValidator('disableSubmitButtons', false);
              }).on('success.form.bv', function(e, data) {
                  e.preventDefault();

                  investorId = $('#investorId').val();
                  investorName = $('#investorName').val() || null;
                  developer = $('#developer').val() || null;
                  aboutMe = CKEDITOR.instances['aboutMe'].getData() || null;
                  aboutMeEn = CKEDITOR.instances['aboutMeEn'].getData() || null;
                  description = CKEDITOR.instances['description'].getData() || null;

                  var object = {
                    "investorName": investorName,
                    "aboutMe": aboutMe,
                    "aboutMeEn": aboutMeEn,
                    "description": description,
                    "logo": null,
                    "investorId": null,
                    developer : developer
                  };

                  $(".imageListing .file-preview .file-preview-initial").each(function(idx, element){
                    var fileName = $(element).find("img").attr('src');
                    object.logo = fileName;
                  });
                 
                  if(investorId != ""){
                      object.investorId = investorId
                  }

                  // console.log(object);
                  post_sync("/developer-post", object, true, function(data){
                      //  console.log(data);
                       if(data.result){
                        if(investorId == ""){
                         alert("Tạo thành công" + " investorId: " +data['data'].investorId);
                        }else{
                          alert("Sửa thành công" + " investorId: " +data['data'].investorId);
                        }
                       }else{
                          alert(data.message);
                       }
                  });
          });
        });


    </script>
    <script src="{{loadAsset("/js/developer.js")}}"></script>
@stop
@section('page-css')
    <!-- <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" /> -->
    <link href="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/css/profilebuilding.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/css/listing-create.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/autocomplete/jquery.auto-complete.css")}}" rel="stylesheet" type="text/css" />

    <link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
    

@stop
