@extends('layout.default')

@section('content')
    
    <div class='dashboard'>
        <section>
          <h1>
            Quản Lý Listing
          </h1>
        </section>
        <section>
          <div class="row">
            <div class="col-md-8">
              <div class="box">
                <div class="box-header with-border">
                  <h3 class="box-title">#</h3>
                </div><!-- /.box-header -->
                <div class="box-body">
                  <table class="table table-bordered">
                    <tr>
                      <th>&nbsp;</th>
                      <th>Total</th>
                      <th>By Agents</th>
                      <th>By BDE</th>
                      <th>Organic</th>
                      <th>By Developers</th>
                    </tr>
                    <tr>
                      <td>Số listing đang chờ review</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>Số listing live</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>Số listing off</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    
                  </table>
                </div><!-- /.box-body -->
                <div class="box-footer clearfix">
                  <ul class="pagination pagination-sm no-margin pull-right">
                    <li><a href="#">&laquo;</a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">&raquo;</a></li>
                  </ul>
                </div>
              </div><!-- /.box -->
            </div>
          </div>

      		<div class="row">
            <div class="col-md-12">
              <div class="box box-solid">
                <div class="box-header with-border">
                  <h3 class="box-title">Filter</h3>
                </div><!-- /.box-header -->
                <div class="box-body">
                  <div class="row">
                    <div class="col-md-9 cus-filter">

                      <div class="form-group pull-left">
                          <label>By Agents (Not Approve)</label>
                          <select class="form-control select2" style="width: 100%;">
                            <option>1</option>
                            <option>2</option>
                          </select>
                        </div>

                      <div class="form-group pull-left">
                        <label>By Agents (Approved)</label>
                        <select class="form-control select2"  style="width: 100%;">
                          <option>1</option>
                          <option>2</option>
                        </select>
                      </div>

                      <div class="form-group pull-left">
                        <label>Organic</label>
                        <select class="form-control select2"  style="width: 100%;">
                          <option>1</option>
                          <option>2</option>
                        </select>
                      </div>

                      <div class="form-group pull-left">
                        <label>BDE</label>
                        <select class="form-control select2"  style="width: 100%;">
                          <option>1</option>
                          <option>2</option>
                        </select>
                      </div>

                      <div class="form-group pull-left">
                        <label>Developers</label>
                        <select class="form-control select2"  style="width: 100%;">
                          <option>1</option>
                          <option>2</option>
                        </select>
                      </div>

                    </div>
                    
                    <div class="col-md-3">
                      <div class="form-group">
                        <label>Date and time range:</label>
                        <div class="input-group">
                          <div class="input-group-addon">
                            <i class="fa fa-clock-o"></i>
                          </div>
                          <input type="text" class="form-control pull-right" id="date-listing">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <div class="box">
                  <div class="box-header">
                    <h3 class="box-title">#</h3>
                  </div><!-- /.box-header -->
                  <div class="box-body">
                    <table id="table-listing" class="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>LID</th>
                          <th>Date Mang Về</th>
                          <th>Date Live</th>
                          <th>Date Off</th>
                          <th>DB/Listing Agent/Owner Info</th>
                          <th>LS Input</th>
                          <th>Price</th>
                          <th>Source</th>
                          <th>Size</th>
                          <th>Class</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td><a href="/listing-service/listing">listing 01</a></td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2</td>
                          <td>hi</td>
                          <td>$200</td>
                          <td>ABC</td>
                          <td>OIU</td>
                          <td>BDJ</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td><a href="/listing-service/listing">listing 01</a></td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2</td>
                          <td>hi</td>
                          <td>$200</td>
                          <td>ABC</td>
                          <td>OIU</td>
                          <td>BDJ</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td><a href="/listing-service/listing">listing 01</a></td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2</td>
                          <td>hi</td>
                          <td>$200</td>
                          <td>ABC</td>
                          <td>OIU</td>
                          <td>BDJ</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td><a href="/listing-service/listing">listing 01</a></td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2</td>
                          <td>hi</td>
                          <td>$200</td>
                          <td>ABC</td>
                          <td>OIU</td>
                          <td>BDJ</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td><a href="/listing-service/listing">listing 01</a></td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2</td>
                          <td>hi</td>
                          <td>$200</td>
                          <td>ABC</td>
                          <td>OIU</td>
                          <td>BDJ</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td><a href="/listing-service/listing">listing 01</a></td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2</td>
                          <td>hi</td>
                          <td>$200</td>
                          <td>ABC</td>
                          <td>OIU</td>
                          <td>BDJ</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td><a href="/listing-service/listing">listing 01</a></td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2</td>
                          <td>hi</td>
                          <td>$200</td>
                          <td>ABC</td>
                          <td>OIU</td>
                          <td>BDJ</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td><a href="/listing-service/listing">listing 01</a></td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2/29/2015</td>
                          <td>2</td>
                          <td>hi</td>
                          <td>$200</td>
                          <td>ABC</td>
                          <td>OIU</td>
                          <td>BDJ</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>#</th>
                          <th>LID</th>
                          <th>Date Mang Về</th>
                          <th>Date Live</th>
                          <th>Date Off</th>
                          <th>DB/Listing Agent/Owner Info</th>
                          <th>LS Input</th>
                          <th>Price</th>
                          <th>Source</th>
                          <th>Size</th>
                          <th>Class</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
            </div>
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
  <script src="{{loadAsset("/js/dashboard.js")}}"></script>
@stop
@section('page-css')
  <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop
