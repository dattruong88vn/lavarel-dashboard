@extends('layout.default')
@section('content')
    <div class="dashboard">
        @include('pos.sa.blocks.negotiationHistoryFilterForm')
        @include('pos.sa.blocks.negotiationHistoryTable')
    </div>
@endsection
@section('page-js')
    <script>
        Window.negotiationHistory = {
            negotiationId: {{ $data['negotiationId'] }},
            dealId: {{ $data['dealId'] }}
        };
    </script>
    <script src="{{ loadAsset("/js/common/error_messages.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
    <script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    
    <script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/MyForm.js")}}"></script>
    <script src="{{ loadAsset("/plugins/priceFormat/autoNumeric.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/sa/SANegotiationHistory.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/sa/SAApi.js")}}"></script>
@endsection
@section('page-css')
    <link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>    
    <style>
        .form-group{
            width: auto !important;
        }
    </style>
@endsection