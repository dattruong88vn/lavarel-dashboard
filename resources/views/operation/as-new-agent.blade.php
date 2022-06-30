@extends('layout.default')

@section('content')
    
    <div class='dashboard'>
      <section>
        <h1>
          Quản Lý Agent Mới
        </h1>
      </section>
      <section>
        <div class="row">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <a href="/agent-support/agent">
              <div class="info-box">
                <span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>
                <div class="info-box-content">
                    <span class="info-box-text">Thêm</span>
                    <span class="info-box-number">Agent</span>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <a href="#" class="sent-agent">
              <div class="info-box">
                <span class="info-box-icon bg-red"><i class="ion ion-ios-people-outline"></i></span>
                <div class="info-box-content">
                    <span class="info-box-text">Gửi Form</span>
                    <span class="info-box-number">Agent</span>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <a href="#" class="add-invite">
              <div class="info-box">
                <span class="info-box-icon bg-green"><i class="ion ion-ios-people-outline"></i></span>
                <div class="info-box-content">
                    <span class="info-box-text">Mời Định Hướng</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section>
        <div class="row">
          <div class="col-md-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">#</h3>
              </div><!-- /.box-header -->
              <div class="box-body">
                <table id="table-request" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Điện Thoại</th>
                      <th>Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody>
                  @foreach($results->data as $key => $result)
                    <tr>
                      <td>{{$key+1}}.</td>
                      <td><a href="/agent-support/agent/{{ $result->agentId }}">{{ $result->agentName }}</a></td>
                      <td>{{ $result->email }}</td>
                      <td>{{ $result->phone }}</td>
                      <td>
                        <div class="form-group">
                          <select class="form-control select2 status" agentId="{{ $result->agentId }}" style="width: 100%;">
                            <option value="1" {{ $result->statusId == 1 ? 'selected="selected"' : ""}}>Pending</option>
                            <option value="2" {{ $result->statusId == 2 ? 'selected="selected"' : ""}}>Sent Form 1</option>
                            <option value="3" {{ $result->statusId == 3 ? 'selected="selected"' : ""}}>Sent Form 2</option>
                            <option value="4" {{ $result->statusId == 4 ? 'selected="selected"' : ""}}>Orientation 1</option>
                            <option value="5" {{ $result->statusId == 5 ? 'selected="selected"' : ""}}>Orientation 2</option>
                            <option value="6" {{ $result->statusId == 6 ? 'selected="selected"' : ""}}>Orientation 3</option>
                            <option value="7" {{ $result->statusId == 7 ? 'selected="selected"' : ""}}>Approved</option>
                            <option value="8" {{ $result->statusId == 8 ? 'selected="selected"' : ""}}>Decline</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  @endforeach
                  </tbody>
                  <tfoot>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Điện Thoại</th>
                      <th>Trạng Thái</th>
                    </tr>
                  </tfoot>
                </table>
              </div><!-- /.box-body -->
              
            </div><!-- /.box -->
          </div>
        </div>
      </section>
    </div>

    <div id="agent-popup" class="white-popup mfp-hide zoom-anim-dialog">
      <a href="#" class="mpf-close-cus">X close</a>
      <div class="content-popup">
          <div class="title">
            <h1>Assign</h1>
          </div>
          <div class="inner-popup">
            <div class="box-body">
              <form role="form">
                <div class="form-group">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox">
                      Agent 1
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input type="checkbox">
                      Agent 2
                    </label>
                  </div>
                  <div class="checkbox">
                    <label>
                      <input type="checkbox">
                      Agent 3
                    </label>
                  </div>

                  <div class="checkbox">
                    <label>
                      <input type="checkbox">
                      Agent 4
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <button class="btn btn-block btn-primary">Tạo</button>
                  </div>
                  <div class="col-md-6">
                    <button class="btn btn-block btn-primary">Gửi</button>
                  </div>
                </div>
                
              </form>
            </div>
          </div>
      </div>
  </div>


    <div id="invite-popup" class="white-popup mfp-hide zoom-anim-dialog">
      <a href="#" class="mpf-close-cus">X close</a>
      <div class="content-popup">
          <div class="title">
            <h1>Assign</h1>
            Request #1
          </div>
          <div class="inner-popup box">
            <div class="box-body">
              <form role="form">
                <table id="table-assign" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Agent Name</th>
                      <th>Date Create</th>
                      <th>Address</th>
                      <th>Type</th>
                      <th width="10%">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Nguyễn B</td>
                      <td>11-7-2014</td>
                      <td>Quận 1</td>
                      <td>Sales</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    <tr>
                      <td>Nguyễn W</td>
                      <td>11-7-2014</td>
                      <td>Quận 2</td>
                      <td>Rent</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    <tr>
                      <td>Nguyễn B</td>
                      <td>11-7-2014</td>
                      <td>Quận 1</td>
                      <td>Sales</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    <tr>
                      <td>Nguyễn W</td>
                      <td>11-7-2014</td>
                      <td>Quận 2</td>
                      <td>Rent</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    <tr>
                      <td>Nguyễn B</td>
                      <td>11-7-2014</td>
                      <td>Quận 1</td>
                      <td>Sales</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    <tr>
                      <td>Nguyễn W</td>
                      <td>11-7-2014</td>
                      <td>Quận 2</td>
                      <td>Rent</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    <tr>
                      <td>Nguyễn B</td>
                      <td>11-7-2014</td>
                      <td>Quận 1</td>
                      <td>Sales</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    <tr>
                      <td>Nguyễn W</td>
                      <td>11-7-2014</td>
                      <td>Quận 2</td>
                      <td>Rent</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    
                  </tbody>
                </table>
                <button class="btn btn-block btn-primary">Gửi</button>
              </form>
            </div>
          </div>
      </div>
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
  <script src="{{loadAsset("/js/dashboard.js")}}"></script>
  <script type="text/javascript">
      $('.status').change(function() {
        var agentId = $(this).attr('agentId');
        var statusId = $(this).val();
        console.log(statusId);
        var objStatus = {
             "agentId": parseInt(agentId),
             "statusId":parseInt(statusId),
             "note": null
        }

        post_sync("/agent/change-status", objStatus, false, function(data){
          if(data.result){
              alert(data.message);
          }
          else {
            alert(data.message);
          }
          console.log(data);
        });
      })
  </script>
@stop
@section('page-css')
  <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop
