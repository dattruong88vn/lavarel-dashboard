@extends('layout.kyc')

@section('content')
    <div id="root"></div>
@endsection

@section('page-js')
    <script>
        var urlParams = new URLSearchParams(window.location.search);
        var dealId = urlParams.get('dealId');
        var deal = {
            dealId: dealId
        }
        var GG_KEY = "{{GG_KEY}}";
    </script>
    <script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/axios/axios.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <script src="{{loadAsset("/js/deal/schedule.js")}}"></script>
    <script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
    <script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
    <script src="{{loadAsset("/js/dashboard.js")}}"></script>
    <script src="{{loadAsset('/js/commons/deal/deal-functions.js')}}"></script>
    <script src="{{loadAsset("/app/kyc.js?v=2.3")}}"></script>
@endsection
@section('page-css')
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{loadAsset("/css/slick-carousel/slick-theme.min.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/css/slick-carousel/slick.min.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/css/kyc/kyc.css")}}" rel="stylesheet" type="text/css" />
    <style>
        #alertModal {
            z-index: 9999 !important;
        }
        #modalSearchListingsResultOverview .modal-dialog {
            min-width: 1200px !important;
        }
        #modalPaymentSchedule .modal-dialog {
            min-width: 850px !important;
        }
        #modalPaymentSchedule .modal-body {
            padding: 0;
        }
    </style>
@endsection
