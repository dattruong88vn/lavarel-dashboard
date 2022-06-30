@extends('layout.default')

@section('content')

    <div class='dashboard'>
        {{ csrf_field() }}
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                <div class="box-header with-border">
                  <h3 class="box-title">Danh sách tài khoản</h3>
                </div><!-- /.box-header -->
                <div class="box-body">
                  <div class="table-responsive">
                    <table id="table-accounts" class="table table-bordered table-striped" style="width: 100%">
                      <thead>
                        <tr>
                            <th>ID</th>
                            <th style="min-width: 150px">Tên</th>
                            <th>Tài khoản</th>
                            <th style="min-width: 100px">Email</th>
                            <th>Quận</th>
                            <th style="min-width: 100px">Ngày tạo</th>
                            <th style="min-width: 100px">Ngày cập nhật</th>
                            <th style="min-width: 100px">Trạng thái</th>
                            <th style="width: 30px">#</th>
                        </tr>
                      </thead>
                      <tbody>
                          <?php
                          if ($accountList):
                              foreach ($accountList as $key => $account):
                                  ?>
                                  <tr>
                                      <td>{{ $account->userId}}</td>
                                      <td><a href="account-manager/update/{{$account->userId}}" data-toggle="tooltip" title="Chỉnh sửa">{{ $account->name }}</a></td>
                                      <td>{{ isset($account->userName) ? $account->userName : 'N/A' }}</td>
                                      <td>{{ isset($account->email) ? $account->email : 'N/A' }}</td>
                                      <td>{{ isset($account->districtNames) ? $account->districtNames : 'N/A' }}</td>
                                      <td class="text-center">{{ date('d-m-Y', $account->createdDate/1000) }}</td>
                                      <td class="text-center">{{ date('d-m-Y', $account->updatedDate/1000) }}</td>
                                      <td>{{ $account->statusName }}</td>
                                      <td align="center">
                                          @if ($account->statusId == 2)
                                            <a href="#" data-toggle="tooltip" title="Bấm để khoá"><i class="fa lock fa-unlock" data-userId="{{ $account->userId}}" data-statusId="3" aria-hidden="true"></i></a>
                                          @elseif ($account->statusId == 3)
                                            <a href="#" data-toggle="tooltip" title="Bấm để mở khoá"><i class="fa lock fa-lock" data-userId="{{ $account->userId}}" data-statusId="2" aria-hidden="true"></i></a>
                                          @endif
                                          <a href="account-manager/update/{{$account->userId}}" data-toggle="tooltip" title="Chỉnh sửa"><i class="fa fa-fw fa-edit"></i></a>
                                          <!--<a title="Block Account" href="account-manager/block/{{$account->userId}}"><i class="fa fa-fw fa-lock"></i></a>
                                          <a title="Block Account" href="account-manager/delete/{{$account->userId}}"><i class="fa fa-fw fa-trash"></i></a>-->
                                      </td>
                                  </tr>
                              <?php endforeach;
                          endif;
                          ?>
                      </tbody>
                      <tfoot>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Tài khoản</th>
                            <th>Email</th>
                            <th>Quận</th>
                            <th>Ngày tạo</th>
                            <th>Ngày cập nhật</th>
                            <th>Trạng thái</th>
                            <th>#</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div><!-- /.box-body -->
              </div><!-- /.box -->
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
    <script src="{{loadAsset("/js/helper.js")}}"></script>
  <script>
      $(function () {
          fixDataTableVNSearch("#table-accounts");
          $("#table-accounts").DataTable();
          // Tooltip
          $('[data-toggle="tooltip"]').tooltip();
      });

      // Khoá, Mở khoá tài khoản
      $(".lock").click(function(e) {
        e.preventDefault();
        var postData = {
          userId: $(this).data('userid'),
          statusId: $(this).data('statusid'),
        };
        showPropzyLoading();
        $.ajax({
          url: "/set-status",
          headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
          },
          type: "POST",
          data: JSON.stringify(postData)
        }).done(function(response) {
          showPropzyAlert(response.message + ". Đang tải dữ liệu mới..");
          if (response.result) {
            setTimeout(function() {
              window.location.reload();
            }, 1000);
          }
        }).always(function(err) {
          hidePropzyLoading();
        });
      });
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
