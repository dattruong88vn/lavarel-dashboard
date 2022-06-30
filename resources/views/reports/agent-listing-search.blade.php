@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='agent-listing-search'>
    <section></section>
    <section>
        <div class="db-tm-item table-listing-search">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">SỐ LISTING SEARCH</h3>
                        </div>
                        <div class="box-body">
                            <table id="search-list" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Ngày</th>
                                        <th>Tên</th>
                                        <th>Quận</th>
                                        <th>Loại hình</th>
                                        <th>Loại BĐS</th>
                                        <th>Giá</th>
                                        <th>Diện tích</th>
                                        <th>Hướng</th>
                                        <th>Bedrooms</th>
                                        <th>Bathrooms</th>
                                    </tr>
                                </thead>
                                <tbody>                                    
                                </tbody>
                            </table>
                        </div>
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
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>

<script type="text/javascript">
$(document).ready(function () {
    $("#search-list").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/report/get-agent-listing-search<?php echo html_entity_decode($queryString); ?>",
        "scrollX": true,
        /*
         "lengthMenu": [[2, 10, 25, 50, -1], [2, 10, 25, 50, "All"]]
         */
    });
});
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop