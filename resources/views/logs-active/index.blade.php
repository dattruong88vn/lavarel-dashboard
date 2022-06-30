@extends('layout.default')

@section('content')
        <!-- row -->
        <div class="row">
            <div class="col-md-12">
                <!-- The time line -->
                <ul class="timeline">
                    @foreach($logs as $log)
                        <li class="time-label">
                          <span class="bg-blue">
                              {{date('H:i d/m/Y', $log->createdDate/1000)}}
                          </span>
                            </li>
                            <li>
                                <i class="fa fa-dot-circle-o bg-blue"></i>
                                <div class="timeline-item">
                                    @if(!empty($log->rlistingIdList))
                                    <?php
                                        $srcs = [];
                                        foreach ($log->rlistingIdList as $item){
                                            $srcs[] = '<a onclick="JMDetail.openModalListingDetailForAllPage('.$item.');return false;" href="#">'.$item.'</a>';
                                        }
                                    ?>
                                    <h3 class="timeline-header">Listing: {!! implode(', ',$srcs) !!}</h3>
                                    @endif
                                        <div class="timeline-body">
                                        <table class="table table-striped">
                                            <tbody><tr>
                                                <th width="85%">URL</th>
                                                <th>Ngày xem</th>
                                            </tr>
                                            @foreach($log->visitList as $dlxInfo)
                                            <tr>
                                                <td><a target="_blank" href="{{$dlxInfo->url}}">{{$dlxInfo->url}}</a></td>
                                                <td>{{!empty($dlxInfo->visitedDate) ? date('H:i:s d/m/Y', $dlxInfo->visitedDate/1000) : 'N/A'}}</td>
                                            </tr>
                                                @endforeach
                                            </tbody></table>
                                    </div>
                                </div>
                            </li>
                            <!-- END timeline item -->
                        @endforeach
                    <li>
                        <i class="fa fa-clock-o bg-gray"></i>
                    </li>
                </ul>
                {!! $paging !!}
            </div><!-- /.col -->
        </div><!-- /.row -->
    @stop

@section('page-js')
    <script src="{{loadAsset("/js/dashboard.js")}}"></script>
    <script type="text/javascript" src="/js/jm_commons/leadDealDetail/scripts.js"></script>
    @stop

@section('page-css')
    @stop