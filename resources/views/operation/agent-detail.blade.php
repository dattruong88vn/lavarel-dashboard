@extends('layout.default')

@section('content')
    
    <div class='dashboard'>

      <section>
        <h1>
          Agent Detail
        </h1>
      </section>
      <section>
        <div class="row">
          <div class="col-md-6">
            <div class="box box-primary">
              <div class="box-header with-border">
                <h3 class="box-title">Thông Tin Cá Nhân</h3>
              </div>
              <div class="box-body">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control name" id="name" value="{{ $results->data->name }}" placeholder="Enter name">
                </div>
                <div class="form-group">
                  <label>Birthday</label>
                  <div class="input-group">
                    <div class="input-group-addon">
                      <i class="fa fa-clock-o"></i>
                    </div>
                    <input type="text" class="form-control pull-right birthDay" value="{{ $results->data->birthDay }}"  id="date-staff">
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input type="email" class="form-control email" id="email" value="{{ $results->data->email }}" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Phone</label>
                  <input type="text" class="form-control phone" id="phone" value="{{ $results->data->phone }}" placeholder="Enter phone">
                </div>

                <div class="form-group">
                  <label for="exampleInputEmail1">Address</label>
                  <input type="text" class="form-control address" id="address" value="{{ $results->data->address }}" placeholder="Enter address">
                </div>

                <div class="form-group">
                    <label>Gender</label>
                    <select name="gender" class="form-control select2 gender" id="gender" style="width: 100%;">
                      <option value="male" {{ $results->data->gender == "male" ? 'selected="selected"' : "" }}>Male</option>
                      <option value="female" {{ $results->data->gender == "female" ? 'selected="selected"' : "" }}>Female</option>
                    </select>
                </div>

              </div>
            </div>

            <div class="box box-primary">
              <div class="box-header with-border">
                <h3 class="box-title">Thông Tin Nghề Nghiệp</h3>
              </div>
              <div class="box-body">
                <div class="form-group">
                  <label>About Me</label>
                  <textarea class="form-control aboutMe" rows="3" placeholder="Enter ...">{{ $results->data->aboutMe }}</textarea>
                </div>

                <div class="form-group">
                  <label>About Me(English)</label>
                  <textarea class="form-control aboutMeEn" rows="3" placeholder="Enter ...">{{ $results->data->aboutMe_En }}</textarea>
                </div>
                <div class="user-panel">
                  <label for="name">Company logo</label>
                  <div class="image">
                    <!-- <img src='{{ $results->companyLogo or "../../dist/img/user2-160x160.jpg"}}' class="img-circle" alt="User Image"> -->
                    <!-- <input type="file" accept="image/png, image/jpeg" class="companyLogo"> -->
                    <input id="" class="companyLogo" multiple type="file" class="file" data-upload-url="/agent/imageAgentCompanyLogoUploader">
                  </div>

                </div>
                <div class="form-group">
                  <label>Tên Công Ty</label>
                  <input type="text" class="form-control comeFromCompany" value="{{ $results->data->comeFromCompany }}" placeholder="Enter ...">

                </div>
              </div>
            </div>

            <div class="box box-primary">
              <div class="box-header with-border">
                <h3 class="box-title">Admin</h3>
              </div>
              <div class="box-footer no-padding">
                <ul class="nav nav-stacked">
                  <li><span class="label label-warning"><a class="reset-pw-df">PW/Reset PW</a></span></li>
                  <li><span class="label label-warning" id="suspendAccount"><a>Suspend account</a></span></li>
                  <li><span class="label label-warning" id="brokerageFirm"><a >Assign to new brokerage firm</a></span></li>
                </ul>
              </div>
            </div>

            <div class="box box-primary">
              <div class="box-header with-border">
                <h3 class="box-title">Activities</h3>
              </div>
              <div class="box-footer no-padding">
                <ul class="nav nav-stacked">
                  <li><a href="/agent-support/agent-viewed"><p>Listing đã xem <span class="pull-right badge bg-blue">{{ $results->data->listingViewed }}</span></p></a></li>
                  <li><a href="/transactions"><p>Online Transactions <span class="pull-right badge bg-aqua">{{ $results->data->onlineTransaction }}</span></p></a></li>
                  <li><a href="/transactions"><p>Transactions assign by (AS, TM, BDE) <span class="pull-right badge bg-green">{{ $results->data->offlineTransaction }}</span></p></a></li>
                </ul>
              </div>
            </div>

          </div>
          <div class="col-md-6">

            <div class="box box-primary">
              <div class="box-header with-border">
                <h3 class="box-title">Thông Tin Tài Khoản</h3>
              </div>
              <div class="box-body">
                <div class="form-group">
                  <label for="name">Account ID</label>
                  <input type="text" class="form-control accountId" value="{{ $results->data->accountId }}" id="name" placeholder="Enter name">
                </div>
                <div class="form-group">
                  <label for="name">Agent ID</label>
                  <input type="text" class="form-control agentId" value="{{ $results->data->agentId }}" id="name" placeholder="Enter name">
                </div>
                <div class="form-group">
                  <label for="name">Social ID</label>
                  <input type="text" class="form-control socialUid" value="{{ $results->data->socialUid }}" id="name" placeholder="Enter name">
                </div>
                <div class="user-panel">
                  <label for="name">Avatar</label>
                  <div class="image">
                    <!-- <img src='{{ $results->photo or "../../dist/img/user2-160x160.jpg"}}' class="img-circle" alt="User Image"> -->
                   <!--  <input type="file" accept="image/png, image/jpeg" class="singleAvatar"> -->
                    <input id="" class="avatarLogo" multiple type="file" class="file" data-upload-url="/agent/imageAgentAvatarUploader">
                  </div>
                </div>
                
              </div>
            </div>

            <div class="box box-primary">
              <div class="box-header with-border">
                <h3 class="box-title">Agent Setting</h3>
              </div>
              <div class="box-body">
                <div class="form-group">
                  <label for="name">Listing type</label>

                  <div class="checkbox">
                    <label>
                      <input type="checkbox" class="listingTypeRent" {{ isset($purposeId1) && isset($purposeId2) ? $purposeId1 : "" }}>
                      Thuê
                    </label>
                  </div>

                  <div class="sub-checkbox group-check">
                    <div class="checkbox">
                      <label><input type="checkbox" listingTypeId="2" class="agentSettings" {{ isset($purposeId1) ? $purposeId1 : "" }} value="1">Để ở</label>
                      <label><input type="checkbox" listingTypeId="2" class="agentSettings" {{ isset($purposeId2) ? $purposeId2 : "" }} value="2">Để Thương mại</label>
                    </div>
                  </div>

                  <div class="checkbox">
                    <label><input type="checkbox" listingTypeId="1" class="agentSettings" {{ isset($purposeId3) ? $purposeId3 : "" }} value="3">Bán</label>
                  </div>
                  <!-- <div class="sub-checkbox">
                    <div class="checkbox">
                      <label><input type="checkbox" {{ isset($purposeId3) ? $purposeId3 : "" }} value="3">Ở</label>
                    </div>
                  </div> -->

                </div>

                <div class="form-group cus-checkbox">
                  <div><label for="name">Agent District</label></div>
                  @foreach($districtList as $key => $district)
                  <div class="checkbox">                  
                    <label>
                      <input type="checkbox" class="agentDistricts" value="{{$district->districtId}}"
                      @foreach($results->data->agentDistricts as $key => $result)
                        @if($district->districtId == $result->id->districtId)
                        checked 
                        @endif
                      @endforeach
                      ">
                      {{$district->districtName}}
                    </label>                  
                  </div>
                  @endforeach
              </div>

            </div>

            <div class="box box-warning">
              <div class="box-header with-border">
                <h3 class="box-title">Warning</h3>
              </div>
              <div class="box-footer no-padding">
                <ul class="nav nav-stacked">
                  <li><span class="label label-warning"><a class="report" reasonId="1" >Từ chối khách hàng</a></span></li>
                  <li><span class="label label-warning"><a class="report" reasonId="2" >Agent take deal offline</a></span></li>
                  <li>
                    <a href="#">Số lần đã bị block <span class="pull-right badge bg-green">{{ $results->data->numberLocked }}</span></a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
        <div class="box-footer">
          <input type="hidden" name="" id="agentId" class="form-control" value="{{ $results->data->agentId }}">
          <input type="hidden" name="" id="socialUid" class="form-control" value="{{ $results->data->socialUid }}">
          <input type="hidden" name="" id="brokerageFirmId" class="form-control" value="{{ $results->data->brokerageFirmId }}">
          <button type="submit" id="updateAgent" class="btn btn-primary pull-right">Submit</button>
        </div>
      </section>

    </div>

@endsection

@section('page-js')
  <script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
  <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
  <script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
  <script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
  
  <script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/jquery-confirm/jquery-confirm.min.js")}}"></script>
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM&libraries=places&sensor=false&language=vi-VN"></script>
  <script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>
  <script src="{{loadAsset("/js/dashboard.js")}}"></script>
  <script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
  <script type="text/javascript">

    var agentId = parseInt($('#agentId').val());
    $('#date-staff').datepicker({
        format: 'dd/mm/yyyy'
    });

    

    $('.agentSettings').click(function(){
      var groupCheck = $('.group-check input');
      if($('.group-check input:checked').length == $('.group-check input').length){
        $('.listingTypeRent').prop("checked", true);
      }else{
        $('.listingTypeRent').prop("checked", false);
      }
    });

    $('.listingTypeRent').click(function(){
      if($(this).is(':checked')){
        $('.group-check input').prop("checked", true);
      }else{
        $('.group-check input').prop("checked", false);
      }
    });

    var objectAgent = <?= json_encode($results->data) ?>

    $("#address").geocomplete()
      .bind("geocode:result", function(event, result){
        console.log(result);
        $('#lat').val(result.geometry.location.lat());
        $('#long').val(result.geometry.location.lng());

        objectAgent.latitude = result.geometry.location.lat();
        objectAgent.longitude = result.geometry.location.lng();              
    });
    
    $('#updateAgent').click(function(){
        var name = $('.name').val() || null;
        objectAgent.name = name;
        objectAgent.socialUser.name = name;

        var birthDay = $('.birthDay').val() || null;
        objectAgent.birthDay = birthDay;

        var email = $('.email').val() || null;
        objectAgent.email = email;
        objectAgent.socialUser.email = email;

        var phone = $('.phone').val() || null;
        objectAgent.phone = phone;
        objectAgent.socialUser.phone = phone;

        var gender = $('.gender').val() || null;
        objectAgent.gender = gender;
        objectAgent.socialUser.gender = gender;

        var address = $('.address').val() || null;
        objectAgent.address = address;
        objectAgent.socialUser.address = address;

        var accountId = $('.accountId').val() || null;
        objectAgent.accountId = accountId;

        var agentId = $('.agentId').val() || null;
        objectAgent.agentId = parseInt(agentId);

        var socialUid = $('.socialUid').val() || null;
        objectAgent.socialUid =  parseInt(socialUid);
        objectAgent.socialUser.socialUid = socialUid;

        var aboutMe = $('.aboutMe').val() || null;
        objectAgent.aboutMe = aboutMe;
        objectAgent.socialUser.aboutMe = aboutMe;

        var aboutMe_En = $('.aboutMeEn').val() || null;
        objectAgent.aboutMe_En = aboutMe_En;

        var comeFromCompany = $('.comeFromCompany').val() || null;
        objectAgent.comeFromCompany = comeFromCompany;

        var avatar = $('.agent-avatar');
        if(avatar.length == 1){
          avatar = avatar[0].getAttribute('src');
        }else{
          avatar = null;
        }
        objectAgent.photo =  avatar;
        objectAgent.socialUid.photo = avatar;

        var companyLogo = $('.agent-companylogo');
        if(companyLogo.length == 1){
          companyLogo = companyLogo[0].getAttribute('src');
        }else{
          companyLogo = null;
        }
        objectAgent.companyLogo =  companyLogo;       

        objectAgent.agentSettings = [];
        $.each($('.agentSettings:checked'), function(){
          objectAgent.agentSettings.push({
                                            id: {
                                            agentId: parseInt(agentId),
                                            purposeId: parseInt($(this).val()),
                                            },
                                            listingTypeId: parseInt($(this).attr('listingTypeId'))
                                          });

        });
        if(objectAgent.agentSettings.length == 0){
          objectAgent.agentSettings = null;
        }

        objectAgent.agentDistricts = [];
        $.each($('.agentDistricts:checked'), function(){
          objectAgent.agentDistricts.push({
                                           id: {
                                                agentId: parseInt(agentId),
                                                districtId: parseInt($(this).val())
                                                }
                                          });

        });
        if(objectAgent.agentDistricts.length == 0){
          objectAgent.agentDistricts = null;
        }

        console.log(objectAgent);
        post_sync("/agent/post-update", objectAgent, false, function(data){
        
          if(data.result){
            //if(data.result){
              //if(confirm("Bạn đã sửa thành công")) {
                alert(data.message);
                location.reload();
            }
            else {
              //location.reload();
              alert(data.message);
            }
          //}
          console.log(data);
        });
    });

    $('.report').click(function(){
        reasonId = parseInt($(this).attr('reasonId'));
        url = "/agent/report/"+agentId+"/"+reasonId;
        get_sync(url, false, function(data){
          if(data.result){
            alert(data.message);
          }else{
            alert(data.message);
          }
          return
        });
    });

    $('#suspendAccount').click(function(){
        socialUid = parseInt($('#socialUid').val());
        url = "/user/suspend-account/"+socialUid;
        get_sync(url, false, function(data){
          if(data.result){
            alert(data.message);
          }else{
            alert(data.message);
          }
          return
        });
    });

    $('#brokerageFirm').click(function(){
        brokerageFirmId = parseInt($('#brokerageFirmId').val());
        url = "/agent/assign-brokerage-firm/"+agentId+"/"+brokerageFirmId;
        get_sync(url, false, function(data){
          if(data.result){
            alert(data.message);
          }else{
            alert(data.message);
          }
        });
    });

    $('.reset-pw-df').click(function(){
        socialUid = parseInt($('#socialUid').val());
          objectPass = {
                 "socialUid":socialUid,
                 "newPassword":"Propzy2015"
          }

          url = "/user/reset-password";
          post_sync(url, objectPass, false, function(data){
            if(data.result){
              $.confirm({
                  title: '',
                  content: 'Password của bạn đã thay đổi',
                  confirm: function(button) {
                      
                  },
                  cancel: function(button) {
                      
                  },
                  cancelButton: "",
              });
            }else{
              alert(data.message);
            }
          });
       
    });

    var json_path = objectAgent.photo;
    var path = [];
    var pathConfig = [];
    if(json_path != ""){
        path.push("<img class='agent-avatar' src='"+json_path+"' class='file-preview-image' name='"+json_path+"' alt='"+json_path+"' title='"+json_path+"' />");
        pathConfig.push({
          caption: "",
          width: '120px',
          url: "/agent/imageAvatarRemover",
          //key: linkArr[linkArr.length - 1]
        });
    }   

    $('[type="file"].avatarLogo').fileinput({
        deleteUrl:"/agent/imageAvatarRemover",
        allowedFileExtensions : ['jpg', 'png','gif'],
        initialPreview: path,
        initialPreviewConfig: pathConfig,
        overwriteInitial: false,
        allowedFileTypes: ['image'],
        maxFileCount: 1,
        slugCallback: function(filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
    });

    var json_path = objectAgent.companyLogo;
    var path = [];
    var pathConfig = [];
    if(json_path != ""){
        path.push("<img class='agent-companylogo' src='"+json_path+"' class='file-preview-image' name='"+json_path+"' alt='"+json_path+"' title='"+json_path+"' />");
        pathConfig.push({
          caption: "",
          width: '120px',
          url: "/agent/imageAgentCompanyLogoRemover",
          //key: linkArr[linkArr.length - 1]
        });
    }

    $('[type="file"].companyLogo').fileinput({
        deleteUrl:"/agent/imageAgentCompanyLogoRemover",
        allowedFileExtensions : ['jpg', 'png','gif'],
        initialPreview: path,
        initialPreviewConfig: pathConfig,
        overwriteInitial: false,
        maxFileCount: 1,
        allowedFileTypes: ['image'],
        slugCallback: function(filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
    });

  </script>
@stop
@section('page-css')
  <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/jquery-confirm/jquery-confirm.min.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop
