@extends('layout.operation')

@section('content')
    
    <div class='dashboard'>

      <section>
        <h1>
          Agent Create
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
                  <input type="text" class="form-control name" id="name" value="" placeholder="Enter name">
                </div>
                <div class="form-group">
                  <label>Birthday</label>
                  <div class="input-group">
                    <div class="input-group-addon">
                      <i class="fa fa-clock-o"></i>
                    </div>
                    <input type="text" class="form-control pull-right birthDay" value=""  id="date-staff">
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input type="email" class="form-control email" id="exampleInputEmail1" value="" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Phone</label>
                  <input type="text" class="form-control phone" id="phone" value="" placeholder="Enter phone">
                </div>

                <div class="form-group">
                  <label for="exampleInputEmail1">Address</label>
                  <input type="text" class="form-control address" id="address" value="" placeholder="Enter address">
                </div>

                <div class="form-group">
                    <label>Gender</label>
                    <select name="gender" class="form-control select2 gender" id="gender" style="width: 100%;">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
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
                  <textarea class="form-control aboutMe" rows="3" placeholder="Enter ..."></textarea>
                </div>
                <div class="form-group">
                  <label>About Me(English)</label>
                  <textarea class="form-control aboutMeEn" rows="3" placeholder="Enter ..."></textarea>
                </div>
                <div class="user-panel">
                  <label for="name">Company logo</label>
                  <div class="image">
                    <!-- <img src='../../dist/img/user2-160x160.jpg' class="img-circle" alt="User Image"> -->
                    <input id="" class="companyLogo" multiple type="file" class="file" data-upload-url="/agent/imageAgentCompanyLogoUploader">
                  </div>
                </div>
                <div class="form-group">
                  <label>Tên Công Ty</label>
                  <input type="text" class="form-control comeFromCompany" value="" placeholder="Enter ...">
                </div>
              </div>
            </div>

            <!-- <div class="box box-primary">
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
                  <li><a href="/agent-support/agent-viewed"><p>Listing đã xem <span class="pull-right badge bg-blue"></span></p></a></li>
                  <li><a href="/transactions"><p>Online Transactions <span class="pull-right badge bg-aqua"></span></p></a></li>
                  <li><a href="/transactions"><p>Transactions assign by (AS, TM, BDE) <span class="pull-right badge bg-green"></span></p></a></li>
                </ul>
              </div>
            </div> -->

          </div>
          <div class="col-md-6">

            <div class="box box-primary">
              <div class="box-header with-border">
                <h3 class="box-title">Thông Tin Tài Khoản</h3>
              </div>
              <div class="box-body">
                <!-- <div class="form-group">
                  <label for="name">Account ID</label>
                  <input type="text" class="form-control accountId" value="" id="name" placeholder="Enter name">
                </div>
                <div class="form-group">
                  <label for="name">Agent ID</label>
                  <input type="text" class="form-control agentId" value="" id="name" placeholder="Enter name">
                </div>
                <div class="form-group">
                  <label for="name">Social ID</label>
                  <input type="text" class="form-control socialUid" value="" id="name" placeholder="Enter name">
                </div> -->
                <div class="user-panel">
                  <label for="name">Avatar</label>
                  <div class="image">
                    <!-- <img src='../../dist/img/user2-160x160.jpg' class="img-circle" alt="User Image"> -->
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
                      <input type="checkbox" class="listingTypeRent">
                      Thuê
                    </label>
                  </div>

                  <div class="sub-checkbox group-check">
                    <div class="checkbox">
                      <label><input type="checkbox" listingTypeId="2" class="agentSettings" value="1">Để ở</label>
                      <label><input type="checkbox" listingTypeId="2" class="agentSettings" value="2">Để Thương mại</label>
                    </div>
                  </div>

                  <div class="checkbox">
                    <label><input type="checkbox" listingTypeId="1" class="agentSettings" value="3">Bán</label>
                  </div>
                  <!-- <div class="sub-checkbox">
                    <div class="checkbox">
                      <label><input type="checkbox"  value="3">Ở</label>
                    </div>
                  </div> -->

                </div>

                <div class="form-group cus-checkbox">
                  <div><label for="name">Agent District</label></div>
                  @foreach($districtList as $key => $district)
                  <div class="checkbox">                  
                    <label>
                      <input type="checkbox" class="agentDistricts" value="{{$district->districtId}}">
                      {{$district->districtName}}
                    </label>                  
                  </div>
                  @endforeach
              </div>

            </div>

            <!-- <div class="box box-warning">
              <div class="box-header with-border">
                <h3 class="box-title">Warning</h3>
              </div>
              <div class="box-footer no-padding">
                <ul class="nav nav-stacked">
                  <li><span class="label label-warning"><a class="report" reasonId="1" >Từ chối khách hàng</a></span></li>
                  <li><span class="label label-warning"><a class="report" reasonId="2" >Agent take deal offline</a></span></li>
                  <li>
                    <a href="#">Số lần đã bị block <span class="pull-right badge bg-green">0</span></a>
                  </li>
                </ul>
              </div>
            </div> -->

          </div>
        </div>
        <div class="box-footer">
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

    $("#address").geocomplete()
      .bind("geocode:result", function(event, result){
        console.log(result);
        $('#lat').val(result.geometry.location.lat());
        $('#long').val(result.geometry.location.lng());

        objectAgent.latitude = result.geometry.location.lat();
        objectAgent.longitude = result.geometry.location.lng();              
    });

    var objectAgent =  {
        "birthDay": "20/01/2016",
        "email": "email@gmail.com",
        "name": "name",
        "phone": "23456787",
        "photo": "http://vn.media.propzy.com/avatar/nguyen_hung_cuong_agent.jpg",
        "aboutMe": "về tôi",
        "aboutMe_En": "about me",
        "latitude": 0,
        "longitude": 0,
        "address": "tp ho chí minh",
        "comeFromCompany": "cong ty",
        "companyLogo": null,
        "numberOfViews": 0,
        "gender": "male",
        "agentDistricts": [{
          "id": {
            "agentId": null,
            "districtId": 1
          }
        }],
        "agentSettings": [{
          "id": {
            "agentId": null,
            "purposeId": 2
          },
          "listingTypeId": 2
        }, {
          "id": {
            "agentId": null,
            "purposeId": 3
          },
          "listingTypeId": 1
        }]
      }    
    $('#updateAgent').click(function(){
        var name = $('.name').val() || null;
        objectAgent.name = name;

        var birthDay = $('.birthDay').val() || null;
        objectAgent.birthDay = birthDay;

        var email = $('.email').val() || null;
        objectAgent.email = email;

        var phone = $('.phone').val() || null;
        objectAgent.phone = phone;

        var gender = $('.gender').val() || null;
        objectAgent.gender = gender;

        var address = $('.address').val() || null;
        objectAgent.address = address;

        var aboutMe = $('.aboutMe').val() || null;
        objectAgent.aboutMe = aboutMe;

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
                                            agentId: null,
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
                                                agentId: null,
                                                districtId: parseInt($(this).val())
                                                }
                                          });

        });
        if(objectAgent.agentDistricts.length == 0){
          objectAgent.agentDistricts = null;
        }
        console.log(objectAgent);

        post_sync("/agent/post-create", objectAgent, false, function(data){
          console.log(objectAgent);
          if(data.result){
            //if(data.result){
              //if(confirm("Bạn đã sửa thành công")) {
                alert(data.message);
                //location.reload();
            }
            else {
              //location.reload();
              alert(data.message);
            }
          //}
          console.log(data);
        });
    });

    $('[type="file"].avatarLogo').fileinput({
        deleteUrl:"/agent/imageAvatarRemover",
        allowedFileExtensions : ['jpg', 'png','gif'],
        overwriteInitial: false,
        allowedFileTypes: ['image'],
        maxFileCount: 1,
        slugCallback: function(filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
    });

    $('[type="file"].companyLogo').fileinput({
        deleteUrl:"/agent/imageAgentCompanyLogoRemover",
        allowedFileExtensions : ['jpg', 'png','gif'],
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
  <link href="{{loadAsset("/dist/css/jquery.ezdz.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop
