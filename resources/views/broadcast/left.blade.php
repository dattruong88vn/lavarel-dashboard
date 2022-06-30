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
                                        <li>Ghi chú: {{ $item->data->note }}</li>
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