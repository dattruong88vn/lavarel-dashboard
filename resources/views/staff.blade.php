@extends('layout.default')

@section('content')
<div class="staff-page">
    <div class="widgets-content">
        <div class="row">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <div class="info-box">
                <span class="info-box-icon bg-green"><i class="fa fa-flag-o"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text"><b>{{ $remainingListing[0]->userType->name }}</b></span>
                  <span class="info-box-number"><p>{{ $remainingListing[0]->count }}</p></span>
                </div><!-- /.info-box-content -->
              </div><!-- /.info-box -->
            </div><!-- /.col -->
            <div class="col-md-4 col-sm-6 col-xs-12">
              <div class="info-box">
                <span class="info-box-icon bg-yellow"><i class="fa fa-users"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text"><b>{{ $remainingListing[1]->userType->name }}</b></span>
                  <span class="info-box-number"><p>{{ $remainingListing[1]->count }}</p></span>
                </div><!-- /.info-box-content -->
              </div><!-- /.info-box -->
            </div><!-- /.col -->
            <div class="col-md-4 col-sm-6 col-xs-12">
              <div class="info-box">
                <span class="info-box-icon bg-red"><i class="fa fa-user-plus"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text"><b>{{ $remainingListing[2]->userType->name }}</b></span>
                  <span class="info-box-number"><p>{{ $remainingListing[2]->count }}</p></span>
                </div><!-- /.info-box-content -->
              </div><!-- /.info-box -->
            </div><!-- /.col -->
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-12">
            <div class="box box-info">
                <div class="box-header content-header">
                    <h1 >Quản lý nhân viên</h1>
                </div>
                <div class="box-body">
                    <div class="message">
                        <?php if(session()->has('assignAlert') && !session('assignAlert')->result) { ?>
                            <div class="alert alert-danger alert-dismissable">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <?= session('assignAlert')->message ?>
                            </div>
                        <?php } ?>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label>Từ ngày - đến ngày </label>
                            <div class="input-group">
                              <div class="input-group-addon">
                                <i class="fa fa-calendar"></i>
                              </div>
                              <input type="text" class="form-control pull-right active" id="calenda">
                            </div><!-- /.input group -->
                        </div>
                    </div>
                    <table id="table-staff" class="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Tên</th>
                            <th>Review</th>
                            <th>Create</th>
                            <th>Live Listing</th>
                            <th>Reviewing listing</th>
                          </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($staffs as $key => $staff): ?>
                                <tr>
                                    <td>{{ $staff->name }}</td>
                                    <td align="center">
                                        {{ $staff->numberAssignedToReview }}<br/>
                                        <a href="staff/assign-reviews/{{$staff->userId}}" >Assign</a>
                                        <!--<button type="button" class="btn btn-info btn-xs" onclick="modalAssignReview({{ $staff->userId }})">Assign</button>-->
                                    </td>
                                    <td align="center">
                                        {{ $staff->numberAssignedToCreate }}<br/>
                                        <button type="button" class="btn btn-info btn-xs" onclick="modalAssignCreate({{ $staff->userId }})">Assign</button>
                                    </td>
                                    <td align="center">{{ $staff->numberListingsLive }}</td>
                                    <td align="center">{{ $staff->numberListingsReviewing }}</td>
                                </tr>
                            <?php endforeach ?>
                            
                        </tbody>
                    </table>
                </div><!-- /.box-body -->
            </div><!-- /.box -->
        </div>
    </div>

<div class="modal fade" id="modal-assign-create">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Assign Create</h4>
            </div>
            <div class="modal-body">
                <div class="box-body">
                <form role="form" id="form-assign-create" class="form-horizontal" method="post">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group col-md-12">
                        <label>Số listing cần tạo </label>
                        <input name="numListing" type="text" class="form-control" placeholder="Enter ...">
                    </div>
                    <div class="form-group col-md-12">
                        <button type="submit" class="btn btn-info">Assign</button>
                    </div>
                </form>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="modal-assign-review">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Assign Review</h4>
            </div>
            <div class="modal-body">
                 <form id="form-assign-review" role="form" class="form-horizontal" method="post">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="box-body">
                        <div class="form-group col-md-12">
                            <label>Assign type</label>
                            <select name="typeOption" class="form-control">
                                <option value="">-- Vui lòng chọn--</option>
                                @foreach ($remainingListing as $remainingItem) 
                                    <option value="{{ $remainingItem->userType->id }}">{{ $remainingItem->userType->name }}  ({{ $remainingItem->count }})</option>
                                @endforeach 
                            </select>                           
                        </div>
                        <div class="form-group col-md-12">
                            <label>Số listing Assign Review</label>
                            <input name="numAssignListing" type="text" class="form-control" placeholder="Enter ...">
                        </div>
                        <div class="form-group col-md-12">
                            <button type="submit" class="btn btn-info">Ok</button>
                        </div>
                    </div>
                </form>  
            </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</div>

@endsection

@section('page-js')   
    <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
    <script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
    <script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
    <script src="{{loadAsset("/plugins/bootstrapValidator/language/vi_VN.js")}}"></script>
    <script src="{{loadAsset("/js/function.js")}}"></script>    
    <script src="{{loadAsset("/js/helper.js")}}"></script>
    <script>
        $(function () {
            var userId;    
            fixDataTableVNSearch("#table-staff");
            $("#table-staff").DataTable({

                 "aoColumns": [
                  null,
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false },
                  { "bSortable": false }
                ]
            });
            today = new Date();
            beginningOfToday = new Date(today.getFullYear(),today.getMonth() ,today.getDate());
            endingOfToday = new Date(today.getFullYear(),today.getMonth() ,today.getDate(), 23 , 59 , 59);
            startDate = getCookie("staff_from_date") ? new Date(parseInt(getCookie("staff_from_date"))) : beginningOfToday;
            endDate = getCookie("staff_to_date") ? new Date(parseInt(getCookie("staff_to_date"))) : endingOfToday;
            
            $("#calenda").daterangepicker({
                timePicker: false, 
                format: 'DD/MM/YYYY',
                startDate:  startDate,
                endDate: endDate,
                maxDate: endingOfToday,
                autoUpdateInput: true
            }, function(start, end, label){
                endDate = new Date(end._d.getFullYear(),end._d.getMonth() ,end._d.getDate(), 23 , 59 , 59);
                setCookie("staff_from_date", start._d.getTime(), 1);
                setCookie("staff_to_date", endDate.getTime(), 1);
                location.reload();
            });


          });

          function modalAssignCreate(uId){
            userId = uId;
            $('#modal-assign-create').modal();
          } 

          function modalAssignReview(uId){
            userId = uId;
            $('#modal-assign-review').modal();
          } 

          $('#form-assign-review').bootstrapValidator({
                message: 'This value is not valid',
        //        live: 'disabled',

                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    typeOption: {
                      
                        validators: {
                            notEmpty: {
                                 message: 'Vui lòng chọn giá trị'
                            }
                        }
                    },
                    numAssignListing: {
                        validators: {
                            notEmpty: {
                            },
                            digits: {
                            }
                        },

                    }
                }
            }).on('success.form.bv', function(e) {
                // Prevent form submission
                e.preventDefault();

                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data('bootstrapValidator');

                // Use Ajax to submit form data
                userType = $('select[name="typeOption"]').val();
                quantity = $('input[name="numAssignListing"]').val();
                url = "/lising-assign-review/"+userId+"/"+quantity+"/"+userType;

                window.location = url;
                
                //$('#modal-assign-review').modal('hide');
            });

            $('#form-assign-create').bootstrapValidator({
                message: 'This value is not valid',
        //        live: 'disabled',

                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    numListing: {
                        validators: {
                            notEmpty: {
                            },
                            digits: {
                            },
                            lessThan:{
                                value: 15
                            }
                        }
                    }
                }
            }).on('success.form.bv', function(e) {
                // Prevent form submission
                e.preventDefault();

                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data('bootstrapValidator');

                // Use Ajax to submit form data
                userType = $('select[name="typeOption"]').val();
                quantity = $('input[name="numListing"]').val();
                url = "/lising-assign-create/"+userId+"/"+quantity;

                window.location = url;
            });
    </script>   
@stop
@section('page-css')
    <link href="{{loadAsset("/css/staff.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
    
@stop


