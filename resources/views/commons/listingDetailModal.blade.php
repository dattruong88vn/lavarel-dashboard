<?php
    use function GuzzleHttp\json_encode;

    function renderGoodBadListing($listingDetail,$nameField){
        $listingAdvantage = [];
        if($nameField == 'feedbackOfCRM'){
            if($listingDetail->$nameField != null && !empty($listingDetail->$nameField)){
                foreach($listingDetail->$nameField as $item){
                    $listingAdvantage[] = $item->reason;
                }
            }
        }else{
            $listingAdvantage = json_decode($listingDetail->$nameField);
        }
        if(!empty($listingAdvantage)){
            $tmpRender = "<ul>";
            foreach($listingAdvantage as $item){
                $tmpRender .= "<li>$item</li>";
            }
            $tmpRender .= "</ul>";
            $renderGoodAttr = $tmpRender;
        }else{
            $renderGoodAttr = "N/A";
        }
        return $renderGoodAttr;
    }

    function renderlegal($object){
        $return = "N/A";
        if(!empty($object->legal)){
            $return = $object->legal;
        }

        $privacy = "";
        if(!empty($object->privacy)){
            switch ($object->privacy) {
                case 1:
                    $privacy = " (Sở hữu chung)";
                    break;
                case 2:
                    $privacy = " (Sở hữu riêng)";
                    break;
                default:
                    $privacy = "";
                    break;
            }
        }
        return $return.$privacy;
    }


    function renderAlley($object){
        // "listingPositions": {
        //             "rlistingId": 21407,
        //             "postion": null,
        //             "alleyId": null,
        //             "postionName": "Hẻm",
        //             "alleyTypeName": "Hẻm thông",
        //             "alleyName": "Xe ba gác",
        //             "widthFrontWay": null,
        //             "roadFrontageWidth": null,
        //             "widthValue": null,
        //             "alleyWidth": 4
        //         }
        if(empty($object)){
            $return = "N/A";
        }else{
            $return = "N/A";
           // mặt tiền
            if(!empty($object->postionName) && $object->postionName != 'Hẻm'){
                $roadFrontageWidth = !empty($object->roadFrontageWidth) ? ' ('.$object->roadFrontageWidth.'m)' : '';
                $return = $object->postionName.$roadFrontageWidth ;
            }elseif( !empty($object->postionName) ){
                $alleyName = !empty($object->alleyName) ? ' - '.$object->alleyName : '';

                $alleyWidth = !empty($object->alleyWidth) ? ' ('.$object->alleyWidth.'m)' : '';
                $typeName = !empty($object->alleyTypeName) ? ' - '.$object->alleyTypeName : '';

                $roadFrontageDistanceFrom = '';
                if ($object->roadFrontageDistanceFrom == 0) {
                    $roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: <= 100m';
                } else if ($object->roadFrontageDistanceFrom == 100) {
                    $roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: 100m - 200m';
                } else if ($object->roadFrontageDistanceFrom == 200) {
                    $roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: 200m - 500m';
                } else if ($object->roadFrontageDistanceFrom == 500) {
                  $roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: >500';
                }

                $return = $object->postionName . $alleyWidth . $typeName . $alleyName. $roadFrontageDistanceFrom;
            }
        }

        return $return;
    }
?>
<div class = "modal-dialog modal-lg">

    <!--Modal content-->
    <div class = "modal-content">
        <div class = "modal-header">
            <button type = "button" class = "close" data-dismiss = "modal">&times;
            </button>
            <h4 class = "modal-title">
            	THÔNG TIN LISTING <a href='{{$listingDetail->link}}' target="_blank" >#{{$listingDetail->rlistingId}}</a>
            	@if($listingDetail->mortgaged)
            		<span style="color:red;font-weight: bold;">(Thế chấp)</span>
            	@endif
            </h4>
        </div>
        <div class = "modal-body">
            @if($listingDetail->photos != null)
            <div class="row" style="position: relative">
                	<div class="col-md-12">
<?php
$jsonPhotos = [];
foreach ($listingDetail->photos as $item){
    $jsonPhotos[] = ['src'=>$item->link,'text'=>''];
}
$jsonPhoto360s = [];
foreach ($listingDetail->photo360s as $item){
    $jsonPhoto360s[] = ['src'=>$item->link,'text'=>''];
}
// if(!empty($listingDetail->plan->photos)){
//     foreach ($listingDetail->plan->photos as $key => $value) {
//         $jsonPhotos[] = ['src'=>$item->link,'text'=>'Hình ảnh quy hoạch'];
//     }
// }
// if(!empty($listingDetail->valuationInfo->photos)){
//     foreach ($listingDetail->valuationInfo->photos as $key => $value) {
//         $jsonPhotos[] = ['src'=>$item->link,'text'=>'Hình ảnh thẩm định'];
//     }
// }
?>
                        <div style="background:gray;">
                            <img class="pinkBookPhoto" onerror="imgError(this);" style="width:100%; opacity:0.7;" src="{{$jsonPhotos[0]['src']}}">
                            <div class="pinkBookPhotos hidden"><?php echo json_encode($jsonPhotos);?></div>
                            <a href="#" class="pinkBookPhoto viewmoreimg" style="text-align: center;">Bấm để xem {{count($jsonPhotos)}} ảnh</a>
                            @if(count($jsonPhoto360s) > 0)
                                <a href="javascript:void(0);" class="pinkBookPhoto360" data-camera360="{{$jsonPhoto360s[0]['src']}}"><img src="/images/img-360.gif" alt=""/></a>
                            @endif
                        </div>
                    </div>
                </div>
            @endif

            <div class="listingInfoModal">
                <h4 style="margin-top: 20px;" class="title-with-line"><span style="background-color: white;">CHI TIẾT</span></h4>

                <div class="row">
                    <div class="col-md-4">
                        <b>Lên live: </b> {{ !empty($listingDetail->numberDaysOfLive) ? $listingDetail->numberDaysOfLive : 'N/A'}} ngày trước
                    </div>
                    <div class="col-md-4">
                        <b>Diện tích:</b> {{ !empty($listingDetail->lotSize) ? $listingDetail->lotSize . ' &#x33a1;' : 'N/A'}}
                    </div>
                    <div class="col-md-4">
                        <b>Rộng - Dài:</b> {{ $listingDetail->sizeWidth != null ? $listingDetail->sizeWidth : 'N/A'}} - {{ $listingDetail->sizeLength != null ? $listingDetail->sizeLength : 'N/A'}}
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <b>Đơn giá:</b> {{ $listingDetail->formatPrice != null ? $listingDetail->formatPrice : 'N/A'}}
                    </div>
                    <div class="col-md-4">
                        <b>Năm XD:</b> {{ $listingDetail->yearBuilt != null ? $listingDetail->yearBuilt : 'N/A' }}
                    </div>
                    <div class="col-md-4">
                        <b>Kết cấu:</b> {{ $listingDetail->formatNumberFloor == '--' ? "N/A" : $listingDetail->formatNumberFloor }}
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <b>Vị trí:</b> {{renderAlley($listingDetail->listingPositions)}}
                    </div>
                    
                    <div class="col-md-4">
                        <b>Phòng ngủ - WC:</b> {{ $listingDetail->bedrooms != null ? $listingDetail->bedrooms : 'N/A' }} - {{ $listingDetail->bathrooms != null ? $listingDetail->bathrooms : 'N/A' }}
                    </div>
                    <div class="col-md-4">
                        <b>Giá thuê:</b> {{ !empty($listingDetail->formatPriceForStatusQuo) ? $listingDetail->formatPriceForStatusQuo : 'N/A'}}
                    </div>
                </div>
                @if(!empty($listingDetail->scorecardType))
                <div class="row">
                    <div class="col-md-4">
                        <p>
                            <strong>Nhãn: </strong>
                            @if($listingDetail->scorecardType == 1637)
                                <span><i class="fa fa-circle label-high"></i> {{ isset($listingDetail->scorecardName) ? $listingDetail->scorecardName : 'N/A'}}</span>
                            @elseif($listingDetail->scorecardType == 1638)
                                <span><i class="fa fa-circle label-medium"></i> {{ isset($listingDetail->scorecardName) ? $listingDetail->scorecardName : 'N/A'}}</span>
                            @elseif($listingDetail->scorecardType == 1639)
                                <span><i class="fa fa-circle label-low"></i> {{ isset($listingDetail->scorecardName) ? $listingDetail->scorecardName : 'N/A'}}</span>
                            @else
                                <span><i class="fa fa-circle label-unclassified"></i>{{ !empty($listingDetail->scorecardName) ? $listingDetail->scorecardName : 'N/A'}}</span> 
                            @endif
                            @if(isset($listingDetail->score))
                                <span> (Điểm: {{$listingDetail->score}})</span>
                            @endif
                        </p>
                    </div>
                </div>
                @endif
                @if(!empty($listingDetail->buildingInfo))
                    <hr>
                    <div class="row">
                        <div class="col-md-4">
                            <b>Tên building:</b> {{!empty($listingDetail->buildingInfo->buildingName) ? $listingDetail->buildingInfo->buildingName : 'N/A'}}
                        </div>
                        <div class="col-md-4">
                            <b>Block:</b> {{!empty($listingDetail->buildingInfo->blockName) ? $listingDetail->buildingInfo->blockName : 'N/A'}}
                        </div>
                        <div class="col-md-4">
                            <b>Số tầng:</b> {{!empty($listingDetail->buildingInfo->numberFloor) ? $listingDetail->buildingInfo->numberFloor : 'N/A'}}
                        </div>
                        <div class="col-md-4">
                            <b>Vị trí:</b> {{!empty($listingDetail->buildingInfo->floorsFomat) ? $listingDetail->buildingInfo->floorsFomat : 'N/A'}}
                        </div>
                    </div>
                @endif
            </div>

            <div class="listingInfoModal">
                <?php
                    $jsonImg = [];
                ?>
                 @if(!empty($listingDetail->plan->photos))
                    @foreach($listingDetail->plan->photos as $url)
                        @if(isImage($url->link))
                            <!-- <img style="width: 5%" src="{{$url->link}}" alt="..." class="margin pinkBookPhoto"> -->
                            <?php
                                $jsonImg[] = (object)['thumb' => $url->link, 'src' => $url->link];
                            ?>
                        @else
                            <!-- <img style="width: 5%" src="https://cdn2.vectorstock.com/i/1000x1000/67/21/document-file-internet-page-upload-icon-vector-19856721.jpg" alt="..." class="margin pinkBookPhoto"> -->
                            <?php
                                $jsonImg[] = (object)['thumb' => $url->link, 'src' => $url->link, 'text' => 'Tải về: '.$url->fileName];
                            ?>
                        @endif
                    @endforeach
                @endif
                <h4 style="margin-top: 20px;" class="title-with-line"><span style="background-color: white;">THÔNG TIN QUY HOẠCH  <a style="position: absolute;right: 0;" href="#" class="pinkBookPhoto label label-primary pull-right">{{count($jsonImg)}} files đính kèm</a><div class="pinkBookPhotos hidden"><?php echo json_encode($jsonImg); ?></div></span></h4>

                <div class="row">
                    <div class="col-md-4">
                        <b>Loại quy hoạch:</b> {{ !empty($listingDetail->plan->typeName) ? $listingDetail->plan->typeName : 'N/A'}}
                    </div>
                    <div class="col-md-4">
                        <b>Diện tích bị quy hoạch: </b> {{ !empty($listingDetail->plan->area) ? $listingDetail->plan->area . ' &#x33a1; (' . round(($listingDetail->plan->area/$listingDetail->lotSize)*100,2) .'%)' : 'N/A'}}
                    </div>
                    <div class="col-md-4">
                        <b>Diện tích còn lại:</b> {{ !empty($listingDetail->plan->area) ? $listingDetail->lotSize - $listingDetail->plan->area . ' &#x33a1; (' . round(100-(($listingDetail->plan->area/$listingDetail->lotSize)*100),2) .'%)' : 'N/A'}}
                    </div>
                    <div class="col-md-4">
                        <b>Lộ giới:</b> {{ !empty($listingDetail->plan->rightOfWay) ? $listingDetail->plan->rightOfWay : 'N/A'}}
                    </div>
                    <div class="col-md-8">
                        <b>Ghi chú:</b> {{ !empty($listingDetail->plan->note) ? $listingDetail->plan->note : 'N/A'}}
                    </div>
                </div>
            </div>

            <div class="listingInfoModal">
                <?php
                    $jsonImg = [];
                ?>
                @if(!empty($listingDetail->valuationInfo->files))
                        @foreach($listingDetail->valuationInfo->files as $url)
                            @if(isImage($url->link))
                                <!-- <img style="width: 5%" src="{{$url->link}}" alt="..." class="margin pinkBookPhoto"> -->
                                <?php
                                    $jsonImg[] = (object)['thumb' => $url->link, 'src' => $url->link];
                                ?>
                            @else
                                <!-- <div style="display: inline-block; width:150px; height: 100px;" class="margin pinkBookPhoto">{{ $url->fileName }}</div> -->
                                <?php
                                    $jsonImg[] = (object)['thumb' => $url->link, 'src' => $url->link, 'text' =>  'Tải về: '.$url->fileName];
                                ?>
                            @endif
                        @endforeach
                            <!-- <a class="btn btn-app pinkBookPhoto">
                                <span class="badge bg-yellow">3</span>
                                <i class="fa fa-paperclip"></i> Files đính kèm 
                            </a> -->
                @endif
                <h4 style="margin-top: 20px;" class="title-with-line"><span style="background-color: white;">THẨM ĐỊNH GIÁ <a style="position: absolute;right: 0;" href="#" class="pinkBookPhoto label label-primary pull-right">{{count($jsonImg)}} files đính kèm</a><div class="pinkBookPhotos hidden"><?php echo json_encode($jsonImg); ?></div></span> </h4>

                <div class="row">
                    <div class="col-md-4">
                        <b>Công ty thẩm định: </b> {{ !empty($listingDetail->valuationInfo->companyName) ? $listingDetail->valuationInfo->companyName : 'N/A'}}
                    </div>
                    <div class="col-md-4">
                        <b>Loại thẩm định:</b> {{ !empty($listingDetail->valuationInfo->typeName) ? $listingDetail->valuationInfo->typeName : 'N/A'}}
                    </div>
                    <div class="col-md-4">
                        <b>Giá thẩm định:</b> {{ !empty($listingDetail->valuationInfo->price) ? number_format($listingDetail->valuationInfo->price) : 'N/A'}}
                    </div>
                </div>
            </div>

            @if(!empty($listingDetail->latitude) && !empty($listingDetail->longitude))
                <div class="">
                    <h4 class="title-with-line"><span style="background-color: white;">BẢN ĐỒ</span></h4>
                    <div id="map" lat="{{$listingDetail->latitude}}" long="{{$listingDetail->longitude}}" data-zoom="{{isset($listingDetail->isNeedChangeZoom) ? $listingDetail->isNeedChangeZoom : '0'}}"></div>
                </div>
            @endif

            <div class="">
                <h4 class="title-with-line"><span style="background-color: white;">TỔNG QUAN</span></h4>
                <div class="row">
                    <div class="col-md-6">
                        <b>Trạng thái listing:</b> {{ $listingDetail->JMStatusId }}
                        <br>
                        @if (!empty($listingDetail->ownerAppStatus))
                            <small style="color: #fb7533"><i class="fa fa-mobile" aria-hidden="true"></i> {{ $listingDetail->ownerAppStatus->statusFormat }}</small>
                        @endif
                    </div>

                    <div class="col-md-6">
                        <b>Lần cuối check trống:</b> {{ $listingDetail->checkedDate != null ? date('d-m-Y', $listingDetail->checkedDate/1000) : 'N/A' }}
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <b>Lượt đi xem:</b> {{ $listingDetail->numberOfViewings != null ? $listingDetail->numberOfViewings : 'N/A' }}
                    </div>

                    <div class="col-md-6">
                        <?php
                        $liveDate = $listingDetail->numberDaysOfLive != null ? $listingDetail->numberDaysOfLive : 'NA';
                        $numberOfViewingsConcat = $listingDetail->numberOfViewings . '/' . $liveDate;
                        ?>
                        <b>Mật độ được chọn đi xem:</b> {{ $listingDetail->numberOfViewings != null ?  $numberOfViewingsConcat : 'N/A' }}
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <b>Đặc điểm tốt: </b>{!! renderGoodBadListing($listingDetail,'listingAdvantage') !!}
                    </div>
                    <div class="col-md-6">
                        <b>Đặc điểm xấu: </b>{!! renderGoodBadListing($listingDetail,'listingDisadvantage') !!}
                    </div>
                </div>

               <div class="row">
                   <!-- <div class="col-md-12">
                       <b>{{ $listingDetail->statusName != null ? $listingDetail->statusName : 'N/A' }}</b>
                   </div> -->
                   <!-- <div class="col-md-12">
                       <b>Đánh giá của CC:</b> {{ $listingDetail->feedbackOfCC != null ? $listingDetail->feedbackOfCC : 'N/A' }}
                   </div> -->
                   <div class="col-md-6">
                       <b>Lần cuối cập nhật:</b> <a onclick="getLogListing({{$listingDetail->rlistingId}});return false;" href="#">{{ $listingDetail->updatedDate != null ? date('d-m-Y', $listingDetail->updatedDate/1000) : 'N/A' }}</a>
                   </div>
                   <div class="col-md-6">
                       <b>Vấn đề pháp lý:</b> {{ renderlegal($listingDetail) }}
                   </div>
               </div>
               <div class="row">
                   <div class="col-md-6">
                       <b>Thông tin quy hoạch: </b> {{ $listingDetail->planningInfo != null ? $listingDetail->planningInfo : 'N/A' }}
                   </div>
                   <div class="col-md-6">
                       <b>Loại nhà:</b> {{ $listingDetail->constructionTypeName != null ? $listingDetail->constructionTypeName : 'N/A' }}
                   </div>
               </div>
               <div class="row">
                   <div class="col-md-6">
                       <b>Ghi chú thông tin địa chỉ: </b> {{ $listingDetail->addressNote != null ? $listingDetail->addressNote : 'N/A' }}
                   </div>
                   <div class="col-md-6">
 <?php
    $commissionText = [];
    if(!empty($listingDetail->commissionList)){
        foreach($listingDetail->commissionList as $commissionItem){
            if($commissionItem->formatCommission != ''){
                $commissionText[] = $commissionItem->formatCommission;
            }
        }
    }
 ?>
                    <b>Hoa hồng: </b> 
                    @if(!empty($commissionText))
                        <ul>
                            <li>
                                {!! implode("</li><li>",$commissionText) !!}
                            </li>
                        </ul>
                    @else
                        N/A
                    @endif

                	</div>
               </div>
               <div class="row">
                 <div class="col-md-12">
                   <b>Nguồn: </b> {{ in_array($listingDetail->sourceId, [171,166,3]) ? $listingDetail->sourceName : 'N/A' }}
                 </div>
               </div>
               @if(isset($listingDetail->legalsOfListing))
                    <div class="row">
                        <div class="col-md-12 textContainer_Truncate">
                            <b>Thông tin pháp lý:</b>
                            @if($listingDetail->legalsOfListing != null && !empty($listingDetail->legalsOfListing))
                            <ul>
                                @foreach($listingDetail->legalsOfListing as $item)
                                    <li>{{$item->legalName}} {{ $item->content != null ? '( '.$item->content.' )' : ''}}</li>
                                @endforeach
                            </ul>
                            @else
                                N/A
                            @endif
                        </div>
                    </div>
                @endif


                <div class="row">
                    <div class="col-md-12 textContainer_Truncate">
                        <b>Đánh giá của CRM:</b> {!! renderGoodBadListing($listingDetail,'feedbackOfCRM') !!}
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <?php
                            $renderStar = '<b class="starRenderPropzy" poin="'.$listingDetail->avgScoreAfterWatching.'"></b>';
                            $renderStarTest = '<b class="starRenderPropzy" poin="20"></b>';

                        ?>
                        <!-- <b>Điểm đánh giá TB sau khi xem:</b>{!! $renderStarTest !!} -->
                        <b>Điểm đánh giá TB sau khi xem:</b> {!! $listingDetail->avgScoreAfterWatching != null ? $renderStar : 'N/A' !!}
                    </div>
                    <!-- <div class="col-md-12">
                        {{ $listingDetail->percentLikeListing != null ? $listingDetail->percentLikeListing : 'N/A' }} <b>khách thích listing này sau xem.</b><br/> <b>- Lý do:</b> {{ !empty(json_decode($listingDetail->reasonLikeListing) ) ? implode(', ',json_decode($listingDetail->reasonLikeListing)) : 'N/A' }}
                    </div>
                    <div class="col-md-12">
                        {{ $listingDetail->percentNotLikeListing != null ? $listingDetail->percentNotLikeListing : 'N/A' }} <b>khách không thích listing này sau xem</b>. <br/><b>- Lý do:</b> {{ !empty(json_decode($listingDetail->reasonNotLikeListing) ) ? implode(', ',json_decode($listingDetail->reasonNotLikeListing)) : 'N/A' }}</p>
                    </div> -->
                </div>

            </div>

            @if(!empty($listingDetail->review) && !empty($listingDetail->review))
            <div class="row">
                <h4 class="title-with-line"><span style="background-color: white;">ĐÁNH GIÁ</span></h4>
                <div class="col-md-12">
                    <table class="table-striped-custom table table-striped">
                        <thead>
                            <tr>
                                <th >Tiêu chí</th>
                                <th >Đánh giá (lần)</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($listingDetail->review as $value)
                                <?php
                                    $value = (array) $value;
                                    $questions = array_keys($value)[0];
                                    $reasons = $value[$questions];
                                ?>
                            <tr>
                                <td>{{ $questions  }}</td>
                                <td>
                                    <ul style="padding-left: 0px;">
                                        @foreach($reasons as $reason)
                                            <li> {{$reason->reasonName}} ({{ $reason->number }})
                                            @if(!empty($reason->reasonContent))
                                                <br><p style="padding-left:5px">- {{ $reason->reasonContent }}</p>
                                            @endif
                                            </li>
                                        @endforeach
                                    </ul>

                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
            @endif

            @if(!empty($listingDetailCompare))
            <div class="row">
                <h4 class="title-with-line"><span style="background-color: white;">SO SÁNH</span></h4>
                <div class="col-md-12">
                    <table class="table-striped-custom table table-striped">
                        <thead>
                            <tr>
                                <th >Tiêu chuẩn</th>
                                <th >Listing bạn chọn</th>
                                <th>Còn lại</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $avgListing = json_decode($listingDetailCompare->avgListing);
                            ?>
                            <tr>
                                <td>Giá</td>
                                <td>{{ $listingDetailCompare->formatPrice != null ? $listingDetailCompare->formatPrice : 'N/A' }}</td>
                                <td>{{ $avgListing->formatPrice != null ? $avgListing->formatPrice : 'N/A' }}</td>
                            </tr>
                            <tr>
                                <td>Giá/m2</td>
                                <td>{{ !empty($listingDetailCompare->formatPricePerSquareMeterOfLotSize) ? $listingDetailCompare->formatPricePerSquareMeterOfLotSize : 'N/A' }}</td>
                                <td>{{ !empty($avgListing->formatPricePerSquareMeterOfLotSize) ? $avgListing->formatPricePerSquareMeterOfLotSize : 'N/A' }}</td>
                            </tr>
                            <tr>
                                <td>Diện tích đất</td>
                                <td>{{ !empty($listingDetailCompare->lotSize) ? $listingDetailCompare->lotSize : 'N/A' }}</td>
                                <td>{{ !empty($avgListing->lotSize) ? $avgListing->lotSize : 'N/A' }}</td>
                            </tr>
                            <tr>
                                <td>Diện tích sử dụng</td>
                                <td>{{ $listingDetailCompare->floorSize != null ? $listingDetailCompare->floorSize : 'N/A' }}</td>
                                <td>{{ $avgListing->floorSize != null ? $avgListing->floorSize : 'N/A' }}</td>
                            </tr>
                            <tr>
                                <td>Lượt view (tour)</td>
                                <td>{{ !empty($listingDetailCompare->numberOfViewings) ? $listingDetailCompare->numberOfViewings : 'N/A' }}</td>
                                <td>{{ !empty($avgListing->numberOfViewings) ? $avgListing->numberOfViewings : 'N/A' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            @endif
        </div>
    </div>

</div>

@include('shared.modal-show-log-listing')
