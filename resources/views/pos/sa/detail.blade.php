<?php

use App\Libraries\UserAuth; ?>
<?php
$isGroupAdmin = false;
if (UserAuth::checkIsGroupAdminonType($currentUser->departments, ["ZONE", "GROUP", "DEPARTMENT"])) {
    $isGroupAdmin = true;
}
?>

<?php

if ($role != 'create') {
    $detailData = json_decode($jsDetailData);
    $useApp = $detailData->useApp;
    $isLogAcive = $detailData->isHasTracking;
} else {
    $useApp = 0;
    $isLogAcive = false;
}
// if ($role == 'edit' && $currentUser->userId != 159) {
//     $right = false;
//     if (isset($jsDetailData)) {
//         $right = ($currentUser->userId == $detailData->assignedTo);
//     }
// } else {
//     $right = true;
// }
//dd($detailData);

?>
@extends('layout.default')
@section('content')
<div class='dashboard'>
    <div class="row">
        <div class="col-md-12 warning-time-count">
            @if(!empty($detailData->timeCounter))
            <p>Thời gian xử lý: {{ $detailData->timeCounter }}</p>
            @endif
        </div>
        <div class="col-md-12">
            <!-- Hidden -->
            <div id="sa-detail-form">
                @if($role =='edit')
                <div class="box box-info">
                    <div class="box-body">
                        <div class="form-horizontal">
                            <div class="row source-group form-group sa-btn-action-top">
                                <div class="col-md-8">
                                    <a id="showNoteCRMList" href="javascript:void(0);" class="btn btn-success btn-sm">Ghi chú TM/CRM</a>
                                    <a id="showListingFeedback" href="javascript:void(0);" class="btn btn-info btn-sm">Phản hồi từ KH
                                        <span id="listingFeedbackCount" class="label label-warning "></span>
                                    </a>
                                    <a id="btn-show-feedback-concierge-detail" href="javascript:void(0);" class="btn btn-info btn-sm">Phản hồi từ CC
                                        <span id="count-feedback-concierge-detail" class="label label-warning"></span>
                                    </a>
                                    <a id="showMarketReport" href="javascript:void(0);" class="btn btn-warning btn-sm" target="_blank">Market Report</a>

                                    @if($detailData->inventoryStatusId == 1) {{-- listing archive --}}
                                    <button id="show-apprailsal-info" class="btn btn-sm btn-primary" disabled="disabled" target="_blank" data-rlisting="{{$detailData->rlistingId}}">Thẩm định</button>
                                    @else 
                                    <button id="show-apprailsal-info" class="btn btn-sm btn-primary" target="_blank" data-rlisting="{{$detailData->rlistingId}}">Thẩm định</button>
                                    @endif
                                    
                                    @if($isLogAcive)
                                    <a id="show-log-active" href="/logs-active/index/{{$detailData->rlistingId}}?typeLRListing=SA" target="_blank" class="btn btn-success btn-sm">Lịch sử</a>
                                    @endif
                                    <button id="showHisCall" data-entitytype="RLISTING" data-entityid="{{$detailData->rlistingId}}" class="btn btn-success btn-sm">Lịch sử cuộc gọi</button>
                                </div>
                                @if($detailData->scorecardType != null)
                                <div class="col-md-2">
                                    <div id="change_card_type" data-rlisting="{{$detailData->rlistingId}}" data-scorecard="{{$detailData->scorecardType}}"></div>
                                    <p>
                                        <span>{{ isset($detailData->score) ? $detailData->score : 'N/A'}}</span>
                                    </p>
                                    <p>
                                        @if($detailData->scorecardType == 1637)
                                        <span><i class="fa fa-circle label-high"></i> {{ isset($detailData->scorecardName) ? $detailData->scorecardName : 'N/A'}}</span>
                                        @elseif($detailData->scorecardType == 1638)
                                        <span><i class="fa fa-circle label-medium"></i> {{ isset($detailData->scorecardName) ? $detailData->scorecardName : 'N/A'}}</span>
                                        @elseif($detailData->scorecardType == 1639)
                                        <span><i class="fa fa-circle label-low"></i> {{ isset($detailData->scorecardName) ? $detailData->scorecardName : 'N/A'}}</span>
                                        @elseif($detailData->scorecardType == 1655)
                                        <span><i class="fa fa-circle label-unclassified"></i> {{ isset($detailData->scorecardName) ? $detailData->scorecardName : 'N/A'}}</span>
                                        @else
                                        <span>{{'N/A'}}</span>
                                        @endif
                                    </p>
                                </div>
                                @endif
                            </div>
                            <div class="row source-group">
                                <div class="col-md-12">
                                    <ul class="list-group" id="countAggreate-valuation-wrapper">
                                        <div class="col-md-3 col-sm-4 col-xs-2">
                                            <div class="row">
                                                <li class="list-group-item countAggreate-wrapper" id="countAggreate-deal"><span class="badge">0</span> Số deal </li>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-4  col-xs-2">
                                            <div class="row">
                                                <li class="list-group-item countAggreate-wrapper" id="countAggreate-tour"><span class="badge">0</span> Số tour </li>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-4  col-xs-2">
                                            <div class="row">
                                                <li class="list-group-item valuation-wrapper" id="valuation-type"><span class="badge">Chưa có</span> Loại định giá </li>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-4  col-xs-2">
                                            <div class="row">
                                                <li class="list-group-item valuation-wrapper" id="valuation-price-format"><span class="badge">Chưa có</span> Trị giá </li>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-4  col-xs-2">
                                            <div class="row">
                                                <li class="list-group-item" id="isPrivateOrGuaranteed" style="display:none"><span class="badge">Chưa live</span> Loại tin đăng </li>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-4  col-xs-2">
                                            <div class="row">
                                                <li class="list-group-item" id="guaranteedExpiredDateInfo" style="display:none"><span class="badge">Chưa có</span> Ngày hết hạn độc quyền </li>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @endif
                <div class="box box-info">
                    <div class="box-body">
                        <div class="form-horizontal">
                            @if($role != 'create')
                            <!-- For edit or view listing at sa -->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div id="link-wrapper" class="col-md-4"></div>
                                        <div id="customerServiceRequest-wrapper" class="col-md-8"></div>
                                    </div>

                                    <div class="row">
                                        <div id="crawlerStatus-wrapper" class="col-md-4"></div>
                                        <div id="sourceName-wrapper" class="col-md-4"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div id="infoChannel-wrapper" class="col-md-4"></div>
                                        <div id="infoChannelChild-wrapper" class="col-md-4"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div id="agent-info" class="row agent-info">
                                        <div id="agentId-wrapper" class="col-md-4"></div>
                                        <div id="agentEmail-wrapper" class="col-md-4"></div>
                                        <div id="isOwner-wrapper" class="col-md-4"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="owner-info" class="row owner-info">
                                <div id="mockSurnameId-wrapper" class="col-md-4"></div>
                                <div id="name-wrapper" class="col-md-4"></div>
                                <div id="phone-wrapper" class="col-md-4"></div>
                                <div id="email-wrapper" class="col-md-4"></div>
                            </div>
                            @if($role == 'edit')
                                @if($detailData->inventoryStatusId == 1) {{-- listing archive --}}
                                <div class="row use-diy-group" style="pointer-events: none;opacity: 0.4;"></div>
                                @else 
                                <div class="row use-diy-group"></div>
                                @endif
                            @endif
                            @else
                            <div class="row source-group">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div id="link-wrapper" class="col-md-12"></div>
                                    </div>
                                    <div class="row">
                                        <div id="sourceId-wrapper" class="col-md-4"></div>
                                        <div id="tc-wrapper" class="col-md-4"></div>
                                    </div>
                                    <div class="row">
                                        <div id="infoChannel-wrapper" class="col-md-4"></div>
                                        <div id="infoChannelChild-wrapper" class="col-md-4"></div>
                                    </div>
                                    <div class="row">
                                        <div id="crawlerStatus-wrapper" class="col-md-4"></div>
                                    </div>
                                    <div class="row agent-info" id="agent-info">
                                        <div id="agentId-wrapper" class="col-md-4"></div>
                                        <div id="agentEmail-wrapper" class="col-md-4"></div>
                                        <div id="isOwner-wrapper" class="col-md-4"></div>
                                    </div>
                                    <div id="owner-info" class="row owner-info">
                                        <div id="mockSurnameId-wrapper" class="col-md-4"></div>
                                        <div id="name-wrapper" class="col-md-4"></div>
                                        <div id="phone-wrapper" class="col-md-4"></div>
                                        <div id="email-wrapper" class="col-md-4"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row use-diy-group"></div>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="box box-info diyInfo-group">
                    <div class="box-body">
                        <div class="form-horizontal">
                            <div class="row diyPhotos-group">
                                <div class="col-md-12">
                                    <label for="diyPhotos" class="control-label">Hình ảnh cập nhật từ chủ nhà</label>
                                </div>
                                <div id="diyPhotos-wrapper" class="col-md-12"></div>
                            </div>
                            <div class="row diyPrice-group">
                                <div id="diyPrice-wrapper" class="col-md-12">
                                </div>
                            </div>
                            <div class="row diyContent-group">
                                <div id="diyContent-wrapper" class="col-md-12">
                                </div>
                            </div>
                            <div class="row isDoneForDiy-group">
                                <div id="isDoneForDiy-wrapper" class="col-md-12">
                                </div>
                            </div>
                            <div id="diyStopReasonList-wrapper"></div>
                        </div>
                    </div>
                </div>
                <div class="box box-info">
                    <div class="box-body">
                        <div class="form-horizontal">
                            <div class="row owner-info">
                                <div id="listingTypeId-wrapper" class="col-md-3"></div>
                                <div id="realEstateGroup-wrapper" class="col-md-3"></div>
                                <div id="propertyTypeId-wrapper" class="col-md-3"></div>
                                <div id="error-propertyTypeId-wrapper" class="col-md-3 col-md-offset-6"></div>
                            </div>
                            <div class="row project-group">
                                <div id="projectId-wrapper" class="col-md-4"></div>
                            </div>
                            <div class="row building-group">
                                <div id="buildingId-wrapper" class="col-md-3"></div>
                                <div id="blockId-wrapper" class="col-md-3"></div>
                                <div id="numberFloor_building-wrapper" class="col-md-3"></div>
                                <div id="modelCode-wrapper" class="col-md-3"></div>
                            </div>
                            <div class="row address-group">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div id="cityId-wrapper" class="col-md-3"></div>
                                        <div id="districtId-wrapper" class="col-md-3"></div>
                                        <div id="wardId-wrapper" class="col-md-3"></div>
                                        <div id="streetId-wrapper" class="col-md-3"></div>
                                    </div>
                                    <div class="row">

                                        <div id="houseNumber-wrapper" class="col-md-3"></div>
                                        <div id="landCode-wrapper" class="col-md-3"></div>
                                        <div id="mapCode-wrapper" class="col-md-3"></div>
                                        <div id="mapYear-wrapper" class="col-md-3"></div>
                                    </div>
                                    <div class="row">
                                        <div id="check-address-wrapper" class="col-md-12  text-right"></div>
                                    </div>
                                    <div class="row">
                                        <div id="address-wrapper" class="col-md-6"></div>
                                        <div id="shortAddress-wrapper" class="col-md-6"></div>
                                    </div>
                                    <div class="row">
                                        @if($role != 'create' && $detailData->inventoryStatusId == 1) {{-- listing archive --}}
                                            <div style="pointer-events: none;opacity: 0.4;">
                                                <div id="x-wrapper" class="col-md-2"></div>
                                                <div id="y-wrapper" class="col-md-2"></div>
                                                <div id="convert-wrapper" class="col-md-2"><button class="convert btn btn-success" style="margin-top: 27px;"> Chuyển <i class="glyphicon glyphicon-chevron-right"></i></button> </div>
                                            </div>
                                        @else 
                                            <div id="x-wrapper" class="col-md-2"></div>
                                            <div id="y-wrapper" class="col-md-2"></div>
                                            <div id="convert-wrapper" class="col-md-2"><button class="convert btn btn-success" style="margin-top: 27px;"> Chuyển <i class="glyphicon glyphicon-chevron-right"></i></button> </div>
                                        @endif
                                        <div id="latitude-wrapper" class="col-md-3"></div>
                                        <div id="longitude-wrapper" class="col-md-3"></div>
                                    </div>
                                    <div class="row">
                                        <div id="oldAddress-wrapper" class="col-md-12"></div>
                                    </div>
                                    <div class="row">
                                        <div id="addressNote-wrapper" class="col-md-12"></div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row position-group">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div id="position-wrapper" class="col-md-3"></div>
                                        <div id="roadPrice-wrapper" class="col-md-3"></div>
                                        <div class="col-md-12 frontWay-group">
                                            <div class="row">
                                                <div id="roadFrontageWidth-wrapper" class="col-md-3"></div>
                                                <div class="col-md-3">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label for="" class="control-label">&nbsp;</label>
                                                        </div>
                                                        <div id="haveBeSide-wrapper" class="col-md-12"></div>
                                                    </div>
                                                </div>
                                                <div id="widthFrontWay-widthValue-wrapper" class="col-md-6">
                                                    <div class="row">
                                                        <div id="widthFrontWay-wrapper" class="col-md-6"></div>
                                                        <div id="widthValue-wrapper" class="col-md-6"></div>
                                                    </div>
                                                    <div class="row">
                                                        <div id="widthFrontWay-widthValue-wrapper-error" class="col-md-12"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 alley-group">
                                            <div class="row">
                                                <div id="alleyId-wrapper" class="col-md-3"></div>
                                                <div id="roadFrontageDistance-wrapper" class="col-md-3"></div>
                                                <div id="alleyType-wrapper" class="col-md-3"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row alley-group">
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div id="alleyWidth-wrapper" class="col-md-3"></div>
                                                <div id="widthFrontWay-alley-wrapper" class="col-md-3"></div>
                                                <div class="col-md-3">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label for="" class="control-label">&nbsp;</label>
                                                        </div>
                                                        <div id="haveBeSide-alley-wrapper" class="col-md-12"></div>
                                                    </div>
                                                </div>
                                                <div id="widthValue-alley-wrapper" class="col-md-3"></div>
                                            </div>
                                            @if (!empty($seller_drafts->alleyWidth))
                                            <div class="row">
                                                <div id="alleyWidthDraft" class="col-md-3">
                                                    <span style="color: red">Hẻm: <span>{{$seller_drafts->alleyWidth->value}}</span>m.</span> <a onclick="fillDraftToFields('#alleyWidthDraft', '#alleyWidth')"><u>Cập nhật</u></a> | <a onclick="skipDrafts('#alleyWidthDraft', '#alleyWidth')"><u>Bỏ qua</u></a>
                                                </div>
                                            </div>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row house-info-group">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div id="lotSize-wrapper" class="col-md-3"></div>
                                        <div id="floorSize-wrapper" class="col-md-3"></div>
                                        <div id="sizeLength-wrapper" class="col-md-3"></div>
                                        <div id="sizeWidth-wrapper" class="col-md-3"></div>
                                    </div>
                                    <div class="row">
                                        <div id="directionId-wrapper" class="col-md-3"></div>
                                        <div id="numberFloor_not_building-wrapper" class="col-md-3"></div>
                                        <div id="buildingFloors-wrapper" class="col-md-3"></div>
                                        <div id="bedRooms-wrapper" class="col-md-3"></div>
                                        <div id="bathRooms-wrapper" class="col-md-3"></div>
                                    </div>
                                    <div class="row">
                                        <div id="directionIdDraft" class="col-md-3">
                                            @if (!empty($seller_drafts->direction))
                                            <span style="color:red">Hướng: <span>{{$seller_drafts->direction->name}}</span>. </span> <a onclick="fillDraftToFields('#directionIdDraft', '#directionId', '{{$seller_drafts->direction->value}}')"><u>Cập nhật</u></a> | <a onclick="skipDrafts('#directionIdDraft', '#directionId')"><u>Bỏ qua</u></a>
                                            @endif
                                        </div>
                                        <div id="numberFloorDraft" class="col-md-3">
                                            @if (!empty($seller_drafts->numberFloor))
                                            <span style="color:red">Số lầu: <span>{{$seller_drafts->numberFloor->value}}</span>. </span> <a onclick="fillDraftToFields('#numberFloorDraft', '#numberFloor_not_building')"><u>Cập nhật</u></a> | <a onclick="skipDrafts('#numberFloorDraft', '#numberFloor_not_building')"><u>Bỏ qua</u></a>
                                            @endif
                                        </div>
                                        <div id="bedRoomsDraft" class="col-md-3">
                                            @if (!empty($seller_drafts->bedRooms))
                                            <span style="color:red">Số phòng ngủ: <span>{{$seller_drafts->bedRooms->value}}</span>. </span> <a onclick="fillDraftToFields('#bedRoomsDraft', '#bedRooms')"><u>Cập nhật</u></a> | <a onclick="skipDrafts('#bedRoomsDraft', '#bedRooms')"><u>Bỏ qua</u></a>
                                            @endif
                                        </div>
                                        <div id="bathRoomsDraft" class="col-md-3">
                                            @if (!empty($seller_drafts->bathRooms))
                                            <span style="color:red">Số phòng tắm: <span>{{$seller_drafts->bathRooms->value}}</span>. </span> <a onclick="fillDraftToFields('#bathRoomsDraft', '#bathRooms')"><u>Cập nhật</u></a> | <a onclick="skipDrafts('#bathRoomsDraft', '#bathRooms')"><u>Bỏ qua</u></a>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div id="houseCastings-wrapper" class="col-md-3"></div>
                                        <div id="yearBuilt-wrapper" class="col-md-3"></div>
                                        <div id="yearFixed-wrapper" class="col-md-3"></div>
                                    </div>
                                    <div class="row">
                                        <div id="isMezzanine-wrapper" class="col-md-2"></div>
                                        <div id="isRooftop-wrapper" class="col-md-2"></div>
                                        <div id="isAttic-wrapper" class="col-md-2"></div>
                                        <div id="isPenhouse-wrapper" class="col-md-2"></div>
                                        <div id="isBasement-wrapper" class="col-md-2"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div id="houseTypeId-wrapper" class="col-md-3"></div>
                                        <div id="constructionTypeId-wrapper" class="col-md-6"></div>
                                        <div id="depreciation-wrapper" class="col-md-3"></div>

                                    </div>
                                </div>
                            </div>
                            <div class="row havePlanning-group">
                                <hr>
                                <div class="col-md-12">
                                    <div class="row">
                                        <div id="havePlanning-wrapper" class="col-md-3"></div>
                                        <div id="planing-type-wrapper" class="col-md-3"></div>
                                        <div id="planing-area-wrapper" class="col-md-3"></div>
                                        <div id="planing-area-other-wrapper" class="col-md-3"></div>
                                    </div>
                                    <div class="row">
                                        <div id="planing-right-of-way-wrapper" class="col-md-3"></div>
                                        <div id="planing-note-wrapper" class="col-md-9"></div>
                                    </div>
                                    <div class="row planing-photos-group form-group">
                                        <div class="col-md-12">
                                            <label for="planing-photos" class="control-label">Hình ảnh quy hoạch</label>
                                        </div>
                                        <div id="planing-photos-wrapper" class="col-md-12"></div>
                                    </div>
                                </div>

                            </div>

                            <div class="row price-group">
                                <hr>
                                <div id="price-wrapper" class="col-md-3"></div>
                                <div id="currency-wrapper" class="col-md-3"></div>
                                <div id="minPrice-wrapper" class="col-md-3"></div>
                            </div>
                            @if (!empty($seller_drafts->price))
                            <div class="row">
                                <div id="priceDraft" class="col-md-3 auto-format-vnd"><span style="color: red">Giá: <span>{{number_format($seller_drafts->price->value)}}</script></span>. </span> <a onclick="fillDraftToFields('#priceDraft', '#price')"><u>Cập nhật</u></a> | <a onclick="skipDrafts('#priceDraft', '#price')"><u>Bỏ qua</u></a></span></div>
                                <div id="" class="col-md-3"></div>
                                <div id="" class="col-md-3"></div>
                            </div>
                            @endif

                            <div class="row status-quo-group">
                                <div id="statusQuoId-wrapper" class="col-md-3"></div>
                                <div id="priceForStatusQuo-wrapper" class="col-md-3"></div>
                            </div>
                            <div class="row">
                                <div id="commission-wrapper"></div>
                                <div id="commissionText-wrapper" class="col-md-3"></div>
                            </div>
                            <div id='contract-deposit-group' class="row">
                                <div id="minContractDeadline-wrapper" class="col-md-3"></div>
                                <div id="deposit-wrapper" class="col-md-3"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="row right-type-group">
                                        <div id="useRightTypeId-wrapper" class="col-md-6"></div>
                                        <div id="privacy-wrapper" class="col-md-6"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="row mortgaged-group">
                                        <div class="col-md-6">
                                            <label for="mortgaged" class="control-label">Thế chấp ngân hàng</label>
                                            <div class="row">
                                                <div id="mortgaged-wrapper" class="col-md-12 sa-mortgaged-wrapper"></div>
                                            </div>
                                        </div>
                                        <div id="bankId-wrapper" class="col-md-6"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="row contract-group">
                                        <div class="col-md-6">
                                            <label for="afterSigningContract" class="control-label">Thời gian bàn giao</label>
                                            <div class="row">
                                                <div id="afterSigningContract-wrapper" class="col-md-12 sa-afterSigningContract-wrapper"></div>
                                            </div>
                                        </div>
                                        <div id="moveInDate-wrapper" class="col-md-6"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row info-houseShape-group">
                                <div id="houseShape-wrapper" class="col-md-3"></div>
                                <div id="otherHouseShape-wrapper" class="col-md-3 info-otherHouseShape-group"></div>
                            </div>
                            <div class="row ">

                            </div>
                            <div class="row crawler-info-group">
                                <div id="crawlerInfoNote-wrapper" class="col-md-6"></div>
                                <div id="prescreenerNote-wrapper" class="col-md-6"></div>
                            </div>
                            <div class="row">
                                <div id="note-wrapper" class="col-md-12"></div>
                            </div>
                            <div class="row">
                                <div id="isCashBack-wrapper" class="col-md-3"></div>
                                <div id="useDefaultPhoto-wrapper" class="col-md-4"></div>
                            </div>
                            <div class="row">
                                <div id="campaignId-wrapper" class="col-md-3"></div>
                                <div class="col-md-3">
                                    <label class="control-label" style="height: 15px;"></label>
                                    <div class="row">
                                        <div id="campaignChecked-wrapper" class="col-md-12"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group virtualTouring-group">
                                <div id="virtualTouring-wrapper" class="col-md-12"></div>
                            </div>
                            <div class="form-group photos-group">
                                <div class="col-md-12">
                                    <label for="photos" class="control-label">Hình ảnh nhà</label>
                                </div>
                                <div id="photos-wrapper" class="col-md-12"></div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-12">
                                    <label for="photos-360" class="control-label">Hình ảnh 360 <a href="/360.pdf" target="_blank"><small>(Hướng dẫn sử dụng)</small></a></label>
                                </div>
                                <div id="photos-360" class="col-md-12"></div>
                            </div>
                            <div class="form-group photoGcns-group">
                                <div class="col-md-12">
                                    <label for="photoGcns" class="control-label">Hình ảnh giấy chứng nhận</label>
                                </div>
                                <div id="photoGcns-wrapper" class="col-md-12"></div>
                            </div>
                            <div class="form-group photoSa-group">
                                <div class="col-md-12">
                                    <label for="photoSa" class="control-label">Hình ảnh chỉ SA nhìn thấy</label>
                                </div>
                                <div id="photoSa-wrapper" class="col-md-12"></div>
                            </div>
                            <div class="row">
                                <div id="title-wrapper" class="col-md-12"></div>
                                <div id="description-wrapper" class="col-md-12"></div>
                            </div>
                            <div class="row">
                                <div id="advantages-wrapper" class="col-md-12"></div>
                            </div>
                            <div class="row">
                                <div id="disadvantages-wrapper" class="col-md-12"></div>
                            </div>
                            <div class="row">
                                <div id="amenitiesList-wrapper" class="col-md-12"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box box-info">
                    <div class="box-body">
                        <div class="form-horizontal">
                            <div class="row">
                                <div class="col-md-12">
                                    <label for="" class="control-label">Hỗ trợ dịch vụ pháp lý</label>
                                </div>
                                <div id="haveSupportLegal-wrapper" class="col-md-12"></div>
                                <div id="haveSupportLegal-list" class="col-md-12 hidden">
                                    <label for="" class="control-label">Dịch vụ yêu cầu</label>
                                </div>
                            </div>
                            <div class="row">
                                <div id="legalStatusList-wrapper" class="col-md-12"></div>
                            </div>
                            @if (!empty($propzy_services))
                            <div class="row">
                                <div id="" class="col-md-12">
                                    <div><label for="" style="color: red" class="control-label">Hỗ trợ dịch vụ khác từ Propzy</label></div>
                                    @foreach ($propzy_services as $service)
                                    <div><label class="checkbox"><input id="propzy_service_{{$service->id}}" type="checkbox" {{$service->checked ? "checked" : ""}} name="propzy_services" value="{{$service->id}}" data-text="Nhà nghị định 61" data-control="checkbox" null=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>{{$service->name}}</label></div>
                                    @endforeach
                                    <div class="col-md-4" style="padding: 0">
                                        <textarea class="form-control editor legalStatusList-input" id="propzy_service_4_input" placeholder="Dịch vụ khác" style="display: none;">{{$propzy_services[3]->note}}</textarea>
                                    </div>
                                    <script>
                                        $(document).ready(function() {
                                            function initPropzyServices() {
                                                if ($("#propzy_service_4").prop("checked")) {
                                                    $("#propzy_service_4_input").show();
                                                } else {
                                                    $("#propzy_service_4_input").hide();
                                                }
                                            }
                                            initPropzyServices();
                                            $("#propzy_service_4").click(function() {
                                                initPropzyServices();
                                            });
                                        });
                                    </script>
                                </div>
                            </div>
                            @endif

                        </div>
                    </div>
                </div>
                <div class="box box-info">
                    <div class="box-body">
                        <div class="form-horizontal">
                            <div class="row meta-tag-group">
                                <div id="metaTitle-wrapper" class="col-md-12"></div>
                                <div id="metaKeywords-wrapper" class="col-md-12"></div>
                                <div id="metaDescription-wrapper" class="col-md-12"></div>
                            </div>
                        </div>
                    </div>
                </div>
                @if($right)
                <div id="sa-btn-group-footer" class="box box-info">
                    <div class="box-body btn-group-fixed">
                        <div class="form-horizontal">
                            <div class="row">
                                <div class="col-md-12 text-center btn-group-action">
                                    @if($role =='view')
                                        <div id="switch-wrapper"></div>
                                    @else
                                        <a id="live-btn" href="javascript:void(0);" class="btn btn-success"><i class="glyphicon glyphicon-eye-open"></i> Đăng tin</a>
                                        @if($role == 'edit')
                                            <a id="valuation-btn" href="javascript:void(0);" class="btn btn-success"><i class="glyphicon glyphicon-zoom-in"></i> Thẩm định</a>
                                        @endif
                                        <a id="save-btn" href="javascript:void(0);" class="btn btn-info"><i class="glyphicon glyphicon-floppy-save"></i> Lưu</a>
                                        <a id="save-remind-btn" href="javascript:void(0);" class="btn btn-warning"><i class="glyphicon glyphicon-time"></i> Lưu & Nhắc nhở</a>
                                        @if($role == 'edit')
                                            @if($detailData->inventoryStatusId == 1) {{-- listing archive --}}
                                                <button disabled="disabled" id="cancel-btn" class="btn btn-danger">
                                                    <i class="glyphicon glyphicon-trash"></i> Ngưng đăng tin
                                                </button>
                                                <button disabled="disabled" class="show-reassign-listing-modal-btn btn btn-warning">
                                                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Reassign
                                                </button>
                                            @else 
                                                <a id="cancel-btn" href="javascript:void(0);" class="btn btn-danger"><i class="glyphicon glyphicon-trash"></i> Ngưng đăng tin</a>
                                                <button class="show-reassign-listing-modal-btn btn btn-warning">
                                                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Reassign
                                                </button>
                                            @endif

                                            @if(!empty($useApp))
                                                <a id="update-info-owner-btn" href="javascript:void(0);" class="btn btn-warning"><i class="fa fa-user"></i> Bổ sung thông tin</a>
                                            @endif
                                        @elseif($role =='create')
                                            <a id="cancel-btn" href="javascript:void(0);" class="btn btn-danger"><i class="glyphicon glyphicon-trash"></i> Hủy</a>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @else
                <div id="sa-btn-group-footer" class="box box-info">
                    <div class="box-body btn-group-fixed">
                        <div class="form-horizontal">
                            <div class="row">
                                <p><code>Tin đăng này không thuộc quyền phụ trách của bạn.</code></p>
                            </div>
                        </div>
                    </div>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>

@include('pos.sa.blocks.make-live-listing-modal')
@include('pos.sa.blocks.create-reminder-modal')
@if($role =='edit')
@include('pos.sa.blocks.noteCRMList')
@include('pos.sa.blocks.addNewNoteCRMModal')
@include('pos.sa.blocks.cancel-listing-modal')
@include('pos.sa.blocks.listingFeedback')
@include('pos.sa.blocks.update-info-owner-modal')
@endif
@include('pos.blocks.blc-new-phone-list-model')
@include('pos.blocks.blc-reassign-listing-modal')

@include('pos.blocks.blc-reassign-listing-modal-v2')

@include('pos.blocks.imageEditor')
@include('pos.blocks.blc-new-bank-model')
@include('pos.sa.blocks.update-info-owner-modal')
@include('pos.sa.blocks.info-appraisal-modal')
@include('shared.modal-create-agent')
@include('pos.sa.blocks.update-status-listing-xl')
@include('pos.sa.modals.virtual-touring-modal-preview')
@include('shared.modal-histories-call');
<script>
    const saPageRole = '{{$role}}';
    $(document).ready(function() {
        if (hasValue(Window.reAssignListing)) {
            Window.reAssignListing.addListOver({
                [Window.jsDetailData.rlistingId]: {
                    id: Window.jsDetailData.rlistingId
                }
            });
        }
    });
</script>

<!-- Modal -->
<div id="bsaNotifyModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Thông báo: <span id="bsaNotifyModalName"></span></h4>
            </div>
            <div class="modal-body">
                <div>
                    <table>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Listing ID</th>
                                    <th>Chủ nhà</th>
                                    <th>SĐT</th>
                                    <th>Địa chỉ</th>
                                    <th>Giá</th>
                                    <th>Loại hình</th>
                                    <th>Loại BĐS</th>
                                    <th>Yêu cầu từ chủ nhà</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td id="bsaNotifyModalListingId"></td>
                                    <td id="bsaNotifyModalListingName"></td>
                                    <td id="bsaNotifyModalListingPhone"></td>
                                    <td id="bsaNotifyModalListingAddress"></td>
                                    <td id="bsaNotifyModalListingPrice"></td>
                                    <td id="bsaNotifyModalListingType"></td>
                                    <td id="bsaNotifyModalListingPropertyType"></td>
                                    <td id="bsaNotifyModalListingSellerRequest"></td>
                                </tr>
                            </tbody>
                        </table>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>



@endsection
@section('page-js')
<script type="text/javascript" src="/js/histories/index.js"></script>
{{--<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAfcRzKuW8jJJc6NMGYfRX8n2XaAWq6v2k&libraries=places&sensor=false&language=vi-VN"></script>--}}
<script src="{{ loadAsset("/js/pos/common/plugins/paging/table.hpaging.min.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{ loadAsset("/plugins/priceFormat/autoNumeric.js")}}"></script>
<script src="{{ loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>

<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
<script src="{{ loadAsset("js/helper.js")}}"></script>
<script src="{{ loadAsset("/js/pos/sa/SAApi.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/plugins/fancy/jquery.fancybox.min.js") }}"></script>
<script src="{{ loadAsset("/js/pos/common/images-pos-editor-lib.js") }}"></script>
<script src="{{ loadAsset("/js/pos/common/images-360.js") }}"></script>
<script src="{{ loadAsset("/js/pos/common/images-pos-lib.js") }}"></script>
<script src="{{ loadAsset("/js/pos/common/FileHelper.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/SAFormFields.js")}}"></script>
<script src="{{ loadAsset("/js/pos/sa/SAData.js")}}"></script>
<script src="{{ loadAsset("/js/pos/sa/SACancel.js")}}"></script>
<script src="{{ loadAsset("/js/pos/sa/SAPhoto.js")}}"></script>
<script src="{{ loadAsset("/js/pos/sa/SADetail.js")}}"></script>
<script src="{{ loadAsset("/js/pos/sa/SAField.js")}}"></script>
<script src="{{ loadAsset("/js/pos/sa/SAMain.js")}}"></script>
<script src="{{ loadAsset("/js/pos/sa/SACall.js")}}"></script>
<script src="{{ loadAsset("/js/pos/sa/SAValidation_N.js")}}"></script>
@if($role == 'edit')
<script src="{{ loadAsset("/js/pos/sa/SAListingFeedback.js")}}"></script>
<script src="{{ loadAsset("/js/pos/sa/SADetailNoteForCRMManager.js")}}"></script>
@endif
<script src="{{ loadAsset("js/pos/common/AddNewStreet.js") }}"></script>
<script>
    Window.sa = {};
    Window.sa.api = new SAApi();
    @if($role == 'create')
    Window.jsDetailData = {
        "formId": 'formDef',
        "realEstateGroupId": null,
        "rlistingId": null,
        "useDefaultPhoto": false,
        "socialUid": null,
        "syncId": null,
        "syncToken": null,
        "modelCode": null,
        "address": null,
        "houseNumber": null,
        "oldAddress": null,
        "shortAddress": null,
        "bathRooms": null,
        "bedRooms": null,
        "description": null,
        "floors": null,
        "numberFloor": null,
        "isDeleted": false,
        "isPrivate": false,
        "isMezzanine": false,
        "isRooftop": false,
        "isPenhouse": false,
        "isAttic": false,
        "facility": {
            "numberBasement": 0,
        },
        "vat": null,
        "isVAT": false,
        "isReviewed": false,
        "isAvailable": false,
        "reviewedDate": null,
        "lastActivity": null,
        "latitude": null,
        "listingTypeName": null,
        "longitude": null,
        "lotSize": null,
        "floorSize": null,
        "numberPhotoMapFromBuilding": null,
        "deposit": null,
        "note": null,
        "hotPhoto": null,
        "isHotListing": false,
        "sizeLength": null,
        "sizeWidth": null,
        "price": null,
        "priceVnd": null,
        "minPrice": null,
        "noteForMinPrice": null,
        "promoterFees": null,
        "commissionPrice": null,
        "currency": "VND",
        "deposit": null,
        "allowChange": null,
        "smallSize": null,
        "title": null,
        "totalViews": null,
        "unit": null,
        "buildingId": null,
        "listingId": null,
        "blockId": null,
        "yearBuilt": null,
        "yearFixed": null,
        "source": null,
        "sourceId": null,
        "numberAvailable": null,
        "floorsTo": null,
        "propertyPosition": null,
        "alley": null,
        "commissionText": null,
        "amenityText": null,
        "feesText": null,
        "rightOfWay": null,
        "reasonId": null,
        "reasonNote": null,
        "solutionId": null,
        "haveSupportLegal": false,
        "useDiy": null,
        "reasonNotUseDiy": null,
        "roadFrontageDistanceFrom": null,
        "roadFrontageDistanceTo": null,
        "moveInDate": null,
        "cityId": 1,
        "districtId": null,
        "wardId": null,
        "streetId": null,
        "directionId": null,
        "listingTypeId": null,
        "propertyTypeId": null,
        "useRightTypeId": null,
        "privacy": null,
        "houseCastings": null,
        "noteForAgent": null,
        "statusQuoId": 161,
        "priceForStatusQuo": null,
        "statusQuoDate": null,
        "commissionList": [],
        "status": null,
        "position": null,
        "amenitiesList": [],
        "formatAmenity": null,
        "legalStatusList": [],
        "formatLegalStatus": null,
        "socialCommunications": [{
            "id": {
                "socialUid": -1
            },
            "email": null,
            "name": null,
            "phone": null,
            "noteForPhone": null,
            "agentType": null,
            "phones": []
        }],
        "metaTag": null,
        "advantages": [],
        "disadvantages": [],
        "diyInfo": null,
        "crawlerInfo": null,
        "account": null,
        "socialUser": null,
        "feesList": null,
        "formatPrice": null,
        "formatShortPrice": null,
        "formatLotSize": null,
        "formatSize": null,
        "formatServiceFees": null,
        "formatSmallSize": null,
        "formatDeposit": null,
        "formatSizeWidth": null,
        "formatSizeLength": null,
        "formatLID": null,
        "block": null,
        "directionName": null,
        "districtName": null,
        "linkOfListing": null,
        "isTemp": false,
        "fromId": null,
        "customerServiceRequest": null,
        "isDoneForDiy": false,
        "rlMoveInDate": {
            "moveInNow": false,
            "afterSigningContract": false,
            "moveInDate": null,
            "afterNumberDays": null
        },
        "guaranteedExpiredDate": null,
        "autoTranslate": false,
        "isGuaranteed": false,
        "isFull": false,
        "allowEdit": false,
        "numberOfFloorsBuilding": null,
        "minContractDeadline": null,
        "isMine": true,
        "relatedListingAgent": null,
        "relatedListingConstruction": null,
        "classify": null,
        "channelTypeId": null,
        "channelTypeChildId": null,
        "tcid": null,
        isCashBack: false,
        autoAssign: false,
    };
    Window.jsDetailDataOld = Object.assign({}, Window.jsDetailData);

    if (localStorage.getItem("newSaForBuyNewHouse") !== null) {
        var localItems = JSON.parse(localStorage.getItem("newSaForBuyNewHouse"));
        $.extend(true, Window.jsDetailData, {
            socialCommunications: localItems.socialCommunications,
            classify: localItems.classify,
            agent: localItems.agent

        });
        $.extend(true, Window.jsDetailDataOld, {
            socialCommunications: localItems.socialCommunications,
            classify: localItems.classify,
            agent: localItems.agent

        });
        localStorage.removeItem("newSaForBuyNewHouse");

    }

    @elseif($role == 'edit' || $role == 'view')
    Window.jsDetailData = {!!$jsDetailData!!};
    Window.jsDetailDataOld = {!!$jsDetailData!!};
    @endIf
    Window.jsRole = "{!! $role !!}";
    $(document).ready(function() {
        var f = function() {
            if (!hasValue(Window.sa)) {
                setTimeout(f, 100);
                return;
            }
            if (!hasValue(Window.sa.data)) {
                setTimeout(f, 100);
                return;
            }
            if (Window.sa.data.statusId() == 3) {
                if (!Window.jsDetailData.isPrivate && !Window.jsDetailData.isGuaranteed) {
                    $('#isPrivateOrGuaranteed .badge').text('Thường');
                } else {
                    if (Window.jsDetailData.isPrivate) {
                        $('#isPrivateOrGuaranteed .badge').text('Riêng tư');
                    } else {
                        $('#isPrivateOrGuaranteed .badge').text('Độc quyền');
                        $('#guaranteedExpiredDateInfo .badge').text(Window.sa.data.guaranteedExpiredDate());
                        $('#guaranteedExpiredDateInfo').show();
                    }
                }
            }
            $('#isPrivateOrGuaranteed').show();
        };
        f();
    });
</script>
<script type="text/javascript" src="/app/change_card_type.js"></script>
<script type="text/javascript">
    function fillDraftToFields(draftId, fieldId, value = null) {
        if ("#directionId" === fieldId) {
            $("#select2-directionId-container").text($(draftId).children().children(":first").text());
            $(fieldId).val(value);
        } else if ("#alleyWidth" === fieldId) {
            $(fieldId).val(parseFloat($(draftId).children().children(":first").text().replaceAll(",", "")).toFixed(2)).change();
        } else {
            $(fieldId).val($(draftId).children().children(":first").text().replaceAll(",", "")).change();
        }
        skipDrafts(draftId, fieldId);
        if ("#price" === fieldId || "#alleyWidth" === fieldId) {
            $(fieldId).trigger("keyup");
        }

    }

    function skipDrafts(draftId, fieldId) {
        $(draftId).css({
            'visibility': 'hidden'
        });
        if ("#directionId" === fieldId) {
            $(fieldId).next().children().children().css({
                'border-color': '#d2d6de'
            });
        } else {
            $(fieldId).css({
                'border-color': '#d2d6de'
            });
        }

    }

    $(window).load(function() {
        //bind event skip delete
        $(".file-preview-seller-del").click(function() {
            $(this).parent().css({
                "border-color": "#ddd"
            });
            $(this).hide();
        });

        //bind event pre view
        // $(".pre-view").click(function() {
        //     $(this).parent().prev().prev().trigger("click");
        // });

        // $(".update-new").click(function() {
        //     $(this).parent().remove();
        // });

        Window.sa.data.seller_drafts = JSON.parse('<?php echo json_encode($seller_drafts ?? null) ?>');
        
        if (Window.sa.data.seller_drafts) {
            if (Window.sa.data.seller_drafts.other?.value || false) {
                $("#noteSA").val(Window.sa.data.noteSA() + "\n" + Window.sa.data.seller_drafts.other.value).change();
            }

            if (Window.sa.data.seller_drafts.alleyWidth?.value || false) {
                $("#alleyWidth").css({
                    "border-color": "red"
                });
            }
            if (Window.sa.data.seller_drafts.bathRooms?.value || false) {
                $("#bathRooms").css({
                    "border-color": "red"
                });
            }
            if (Window.sa.data.seller_drafts.bedRooms?.value || false) {
                $("#bedRooms").css({
                    "border-color": "red"
                });
            }
            if (Window.sa.data.seller_drafts.numberFloor?.value || false) {
                $("#numberFloor_not_building").css({
                    "border-color": "red"
                });
            }

            if (Window.sa.data.seller_drafts.direction?.value || false) {
                $("#directionId").next().children().children().css({
                    "border-color": "red"
                });
            }
            /* if (Window.sa.data.seller_drafts.other?.value || false) {
                $("#noteSA").css({
                    "border-color": "red"
                });
            } */
            if (Window.sa.data.seller_drafts.price?.value || false) {
                $("#price").css({
                    "border-color": "red"
                });
            }
        }
    });
</script>
<!-- script lightbox here -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.min.js" integrity="sha512-Y2IiVZeaBwXG1wSV7f13plqlmFOx8MdjuHyYFVoYzhyRr3nH/NMDjTBSswijzADdNzMyWNetbLMfOpIPl6Cv9g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
    // #code
    $(document).ready(()=>{
        // delegate calls to data-toggle="lightbox"
            $(document).delegate('*[data-toggle="lightbox"]:not([data-gallery="navigateTo"])', 'click', function(event) {
                event.preventDefault();
                return $(this).ekkoLightbox({
                    onShown: function() {
                        if (window.console) {
                            return console.log('onShown event fired');
                        }
                    },
                    onContentLoaded: function() {
                        if (window.console) {
                            return console.log('onContentLoaded event fired');
                        }
                    },
                    onNavigate: function(direction, itemIndex) {
                        if (window.console) {
                            return console.log('Navigating '+direction+'. Current item: '+itemIndex);
                        }
                    }
                });
            });
    })
</script>
<!-- /script lightbox here -->
@stop
@section('page-css')
<link href="{{ loadAsset("/js/pos/common/plugins/ckeditor/skins/office2013/editor.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/js/pos/common/plugins/ckeditor/skins/office2013/dialog.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/jquery.fancybox.min.css")}}" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.css" integrity="sha512-Velp0ebMKjcd9RiCoaHhLXkR1sFoCCWXNp6w4zj1hfMifYB5441C+sKeBl/T/Ka6NjBiRfBBQRaQq65ekYz3UQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<style>
    span.help-block.sa-error {
        margin: 0;
    }

    .sa-afterSigningContract-wrapper .form-group {
        margin-bottom: 0;
    }

    [id$='-multi-column-check-list'] {
        padding-bottom: 10px;
    }

    .photos-group,
    .photoGcns-group {
        padding-bottom: 10px;
    }
</style>
<link rel="stylesheet" type="text/css" href="{{loadAsset('/css/histories/index.css')}}"/>
@stop