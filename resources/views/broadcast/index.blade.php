@extends('layout.default')
@section('page-js')
    <script src="{{loadAsset('/js/lightgallery-all.js')}}"></script>
    <script type="text/javascript" src="{{loadAsset('/js/broadcast-agents/scripts.js')}}"></script>
    <script type="text/javascript" src="{{loadAsset('/js/jm_commons/leadDealDetail/scripts.js')}}"></script>
    <script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css"/>
@stop
@section('content')
    <div style="margin-bottom: 10px" class="row search-broadcast">
        <div class="col-md-5 search">
            <div class="row">
                <div class="col-md-12">
                    <input id="searchKey" name="search" placeholder="Số điện thoại, tên khách hàng, leadId, dealId" type="text" class="form-control searchKey" value=""/>
                </div>
                <div style="margin-top: 5px" class="col-md-12">
                    <button id="btn-search" type="submit" class="btn btn-search btn-default btn-block btn-search-broadcast"><i class="fa fa-search" aria-hidden="true"></i> Tìm kiếm</button>
                </div>
            </div>
        </div>
        <div class="col-md-7 filter-broadcast">
            <div class="row">
                <div class="col-md-3">
                    <select id="district" name="district" class="list-districts form-control">
                        <option value="-1">Quận</option>
                        @foreach($districts as $key => $district)
                            <option value="{{ $district->districtId }}">{{ $district->districtName }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="col-md-3">
                    <input name="bookmarked" type="checkbox" id="bookmarked" value="1" class="fil-bookmark"/>Bookmarked
                </div>
                <div class="col-md-3">
                    <input name='startDate' id="startDate" type="text"
                           class="timestame datepicker fil-date form-control" value="" placeholder="Từ"/>
                </div>
                <div class="col-md-3">
                    <input name='endDate' id="endDate" type="text" class="timestame datepicker fil-date form-control"
                           value="" placeholder="Đến"/>
                </div>
                <div style="margin-top: 5px" class="col-md-6">
                    <select class="form-control" name="listingStatusId" id="listingStatusId"
                            style="_border-radius: 2px; _height: 30px;_width: 150px; _margin-top: 3px; _margin-left: 15px;">
                        <option value="-1">Trạng thái</option>
                        @foreach($list_status as $key => $item)
                            <option value="{{ $item->id }}">{{ $item->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div style="margin-top: 5px" class="col-md-6">
                    <button id="btn-filter" type="submit"
                            class="btn btn-filter btn-primary btn-block btn-filter-broadcast"><i class="fa fa-filter" aria-hidden="true"></i> Lọc
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="row broadcast-page">
        <div class="col-md-5" style="padding-right:0px;">
            <div class="left" style="_position: fixed; _width: 27%">
                <style>
                    .carousel-indicators li {
                        border: 1px solid #03A9F4;
                    }

                    .carousel-indicators .active {
                        width: 12px;
                        height: 12px;
                        margin: 0;
                        background-color: #03A9F4;
                    }
                </style>
                @foreach($list as $key => $items)
                    <div id="myCarousel<?php echo $key?>" class="carousel slide" data-ride="carousel"
                         data-interval="false">
                        <!-- Wrapper for slides -->
                        <div class="carousel-inner">
                            @foreach($items as $k => $item)
                                <div style="height:auto; overflow: hidden; padding: 0px; margin: 0px;"
                                     class="item <?php echo $k == 0 ? 'active' : '' ?>"
                                     data-slide-index="<?php echo $k ?>">
                                    <div class="box-footer box-comments" style="overflow: hidden">
                                        <div class="box-comment" style="overflow: hidden">
                                            <div class="comment-text">
                                                <span class="username">
                                                    {{$item->customerName}}
                                                    @if($item->response > 0)
                                                        <a href="#" data-broadcast-id="{{$item->broadcastId}}"
                                                           onclick="firstViewDetailBroadcast(this,{{$item->broadcastId}});return false;"
                                                           class="has-broadcast text-muted bold pull-right">Có {{$item->response}}
                                                            phản hồi từ agent <i class="fa fa-angle-double-right"
                                                                                 aria-hidden="true"></i></a>
                                                    @endif
                                                    - <span style="font-weight: 400">Ngày tạo: <?php echo date('d/m/Y', $item->createdDate); ?>
                                                        , vào lúc <?php echo date('H:i:s', $item->createdDate); ?></span>
                                                </span>
                                                <hr>
                                                <div>
                                                    Nhu cầu:
                                                    <ul>
                                                        @if(!empty($item->dealId))
                                                            <li>Deal ID: <a href="/deal/detail/{{$item->dealId}}">{{$item->dealId}}</a></li>
                                                        @else
                                                            <li>Lead ID: <a href="/lead/detail/{{$item->leadId}}">{{$item->leadId}}</a></li>
                                                        @endif
                                                        <li>Loại giao dịch: {{$item->data->transactionType}}</li>
                                                        <li>Loại bđs: {{ $item->data->propertyType }}</li>
                                                        <li>Quận: {{ $item->data->districts }}</li>
                                                        <li>Ngân sách: {{ $item->data->fixedBudget }}</li>
                                                        <li>Diện tích: {{ $item->data->size }} m²</li>
                                                        <li>Ghi chú: {{ !empty($item->data->note) ? $item->data->note : 'N/A' }}</li>
                                                    </ul>
                                                </div>
                                            </div><!-- /.comment-text -->
                                        </div><!-- /.box-comment -->
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <?php if(count($items) > 1) { ?>
                        <ol class="carousel-indicators"
                            style="left: 10px; bottom: -8px; margin-left: 0px; width: 80%; text-align: left; ">
                            @foreach($items as $k => $item)
                                <li data-target="#myCarousel<?php echo $key?>"
                                    <?php echo $k == 0 ? 'class="active"' : ''; ?> data-slide-to="<?php echo $k?>"><?php echo $k + 1?></li>
                            @endforeach
                        </ol>
                        <a class="carousel-control-left"
                           style="bottom: 5px; color: #fff;padding: 5px; position: absolute; right:30px; font-size: 12px; background-color: #3c8dbc;"
                           href="#myCarousel<?php echo $key?>" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-right"
                           style="bottom: 5px; color: #fff;padding: 5px; position: absolute; right: 5px; font-size: 12px; background-color: #3c8dbc;"
                           href="#myCarousel<?php echo $key?>" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right"></span>
                            <span class="sr-only">Next</span>
                        </a>
                        <?php } ?>
                    </div>
                @endforeach
            </div>
        </div>
        <div class="col-md-7" style="padding-left: 5px;">
            <div class="right" style="position: relative">
                <div class="content" style="padding: 0px;"></div>
            </div>
            <!-- <div class="box">
              <h4 style="text-align: center;" class="box-title">CHI TIẾT PHẢN HỒI TỪ AGENTS</h4>
              <div class="box-body">
                Click vào phản hồi của agent để xem thông tin chi tiết.
              </div>
            </div> -->
        </div>
    </div>
@stop
