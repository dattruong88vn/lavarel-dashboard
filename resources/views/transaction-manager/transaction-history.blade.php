@extends('layout.default')


@section('content')
    <div class='dashboard'>
        <section>
            <h1>History</h1>
        </section>
        <section>
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">Danh Sách Listing</h3>
                        </div>
                        <div class="box-body">
                            <table id="table-request" class="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>Tên</th>
                                    <th>Loại hình giao dịch</th>
                                    <th>Ngày</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($historyList as $item)
                                    <tr>
                                        <td><a href="{{ url('transaction-manager/history-detail/'.$item->id) }}">{{ $item->name }}</a></td>
                                        <td>{{ $item->typeName }}</td>
                                        <td>{{ date('d/m/Y H:i:s', $item->createdDate / 1000) }}</td>
                                    </tr>
                                @endforeach
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th>Tên</th>
                                    <th>Loại hình giao dịch</th>
                                    <th>Ngày</th>
                                </tr>
                                </tfoot>
                            </table>
                        </div><!-- /.box-body -->

                    </div><!-- /.box -->
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
@append

@section('page-css')
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop