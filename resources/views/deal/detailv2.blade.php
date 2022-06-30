@extends('layout.default')

@section('content')
<?php date_default_timezone_set('Asia/Ho_Chi_Minh'); ?>

<?php if ($leadDealDetail->disabledFeature) : ?>
    <div class="row">
        <div class="col-md-12">
            <div class="custom-alert alert alert-warning" role="alert">
                <strong>Deal Của Bạn Đã Bị Đóng Vì Đã Có Một BA Khác Đặt Cọc/Chốt Deal Với Khách Hàng Cho Nhu Cầu Này</strong>
                <p>Bạn sẽ không thể tiếp tục xử lý deal này do nhu cầu của khách hàng đã được một BA khác chăm sóc thành công</p>
            </div>
        </div>
    </div>
<?php endif ?>

<div class="row">
    <div class="col-md-12">
        <h2 class="title-with-line"><span>THÔNG TIN CHUNG</span></h2>
        <div class="box box-primary">
            <div class="box-body">
                <div class="row">
                    <div class="col-md-4">
                        <strong>Cập nhật lần cuối vào:</strong>
                        {{ date('d-m-Y', $leadDealDetail->lastUpdatedDate/1000) }}
                    </div>
                    <div class="col-md-2 evaluate-score">
                        <div class="label-primary evaluate-score-block" data-title="Điểm đánh giá khách hàng của TM">
                            <label>TM</label>
                            <br>
                            <label>{{ isset($leadDealDetail->leadProfileValue) ? $leadDealDetail->leadProfileValue : 'N/A'}}</label>
                        </div>
                    </div>
                    <div class="col-md-2 evaluate-score">
                        <div class="label-success evaluate-score-block" data-title="Điểm đánh giá khách hàng của BA">
                            <label>BA</label>
                            <br>
                            <label>{{ isset($leadDealDetail->dealProfileValue) ? $leadDealDetail->dealProfileValue : 'N/A'}}</label>
                        </div>
                    </div>
                    <div class="col-md-2 evaluate-score">
                        <div class="label-warning evaluate-score-block" data-title="Điểm đánh giá khách hàng của CC">
                            <label>CC</label>
                            <br>
                            <label>{{ isset($leadDealDetail->tourProfileValue) ? $leadDealDetail->tourProfileValue : 'N/A'}}
                                {{ isset($leadDealDetail->tourListingId) ?  ' (' . implode(', ', $leadDealDetail->tourListingId) .')': ''}}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <strong>Thời gian xử lý:</strong>
                        <span class="text-muted">{{ isset($leadDealDetail->timeCounter) ? $leadDealDetail->timeCounter : 'N/A'}}</span>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-6 col-xs-6">
                        <strong>Ngày dự kiến chốt deal:</strong>
                        <span class="text-muted">
                            {{ isset($leadDealDetail->customerEvaluate->expectedClosingDate) ? date('d-m-Y', $leadDealDetail->customerEvaluate->expectedClosingDate/1000) : '' }}
                        </span>
                    </div>
                    <div class="col-md-6 col-xs-6">
                        <strong>Trạng thái:</strong>
                        <span class="text-muted">
                            {{$leadDealDetail->statusName}}
                        </span>
                    </div>
                </div>
                
                @if(!empty($leadDealDetail->scoreCardType ))
                <hr>
                <div class="row">
                    <div class="col-md-12">
                        <strong>Nhãn:</strong>
                        @if($leadDealDetail->scoreCardType == "H1" || $leadDealDetail->scoreCardType == "H2")
                        <span class="label label-success">{{ isset($leadDealDetail->scoreCardType) ? $leadDealDetail->scoreCardType : 'N/A'}}</span>
                        @elseif($leadDealDetail->scoreCardType == "M1" || $leadDealDetail->scoreCardType == "M2")
                        <span class="label label-warning">{{ isset($leadDealDetail->scoreCardType) ? $leadDealDetail->scoreCardType : 'N/A'}}</span>
                        @elseif($leadDealDetail->scoreCardType == "L0" || $leadDealDetail->scoreCardType == "L1")
                        <span class="label label-danger">{{ isset($leadDealDetail->scoreCardType) ? $leadDealDetail->scoreCardType : 'N/A'}}</span>
                        @else
                        <span>{{'N/A'}}</span>
                        @endif
                    </div>
                </div>
                @endif
                <hr>
                <strong>Tiến độ:</strong>
                <div render="deal" typeId="{{ $leadDealDetail->dealId }}" id="renderProgressList" class="row bs-wizard-jm margin" style="border-bottom:0;">
                    <?php
                    $flag = false;
                    count($leadDealDetail->progressList) <= 6 ? $col = 2 : $col = 1;
                    ?>
                    @foreach($leadDealDetail->progressList as $progress)
                    <?php
                    $classStep = 'disabled';
                    $bg = '';
                    if ($leadDealDetail->progressId == $progress->progressId) {
                        $classStep = 'active';
                        $flag = true;
                        $bg = 'background-color:#fbe8aa;';
                    } elseif (!$flag) {
                        $classStep = 'complete';
                    }
                    ?>
                    <div class="col-xs-{{$col}} bs-wizard-step {{$classStep}} ">
                        <div class="text-center bs-wizard-stepnum">{{$progress->progressName}}
                        </div>
                        <div class="progress">
                            <div style="background-color: #e1e1d0;" class="progress-bar"></div>
                        </div>
                        <a href="#" class="bs-wizard-dot" style="{{$bg}}"></a>
                        <div style="text-align: center;">
                            @if($progress->lable != null)
                            <span class="label label-warning">{{ $progress->lable }}</span>
                            @endif
                        </div>
                        @if($progress->progressQuoList != null && count($progress->progressQuoList) > 0)
                        <div class="bs-wizard-info text-center">
                            @foreach($progress->progressQuoList as $progressQuoName)
                            <span class="label label-warning">{{ $progressQuoName->progressQuoName ?? 'Close by Deposit' }}</span>
                            @endforeach
                        </div>
                        @endif
                    </div>
                    @endforeach
                </div>
                <div>
                    <hr>
                    <a class="btn btn-app" href="/deal-history/index/{{$leadDealDetail->dealId}}">
                        <i class="fa fa-history"></i> Lịch sử
                    </a>
                    <?php if (empty($leadDealDetail->progressQuoId) || $leadDealDetail->progressQuoId != 3 && $leadDealDetail->progressQuoId != 4) : ?>
                        <?php if ($currentGroup['departmentId'] == 12 && $isCurrentAdmin) : ?>
                            @if($leadDealDetail->statusId != 27 && !$leadDealDetail->disabledFeature)
                            <a class="btn btn-app btnReassign">
                                <i class="fa fa-mail-forward "></i> Reassign
                            </a>
                            @endif
                        <?php endif; ?>
                        @if($leadDealDetail->statusId != 27 && $permissionDoAction == true && !$leadDealDetail->disabledFeature)
                        <a href="/deal/update/{{$leadDealDetail->dealId}}" class="btn btn-app">
                            <i class="fa fa-edit"></i> Sửa
                        </a>
                        <?php
                        // status id = 29: đang cọc
                        // status id = 27: close deal

                        ?>
                        @if($leadDealDetail->statusId != 29)
                        <a class="btn btn-app btnCancelDeal">
                            <i class="fa fa-remove "></i> Hủy deal
                        </a>
                        @endif
                        <a class="btn btn-app btnShowConfig">
                            <i class="fa fa-cog"></i> Điều chỉnh tiêu chí
                        </a>
                        @endif

                    <?php endif; ?>

                    @if ($leadDealDetail->progressQuoId == 3 || $leadDealDetail->progressQuoId == 4)
                    @if (!$leadDealDetail->isGroup || $leadDealDetail->isReopen)
                    <a class="btn btn-app btnUnlockDeal">
                        <i class="fa fa-unlock"></i> Kích hoạt
                    </a>
                    @endif
                    @endif

                </div>
            </div><!-- \ box-body -->
        </div><!-- \ box -->
    </div><!-- \ col-md-12 -->

    <div class="col-md-12">
        <h2 class="title-with-line"><span>THÔNG TIN KHÁCH HÀNG</span></h2>
        <div class="box box-primary">
            <div class="box-body">
                <strong>Campaign ID:</strong>
                <span class="">
                    {{ !empty($leadDealDetail->campaignId) ? $leadDealDetail->campaignId : 'N/A' }}
                </span>
                <hr>
                <div class="row">
                    <div class="col-md-6 col-xs-6">
                        <strong>Tên:</strong>
                        <span>{{ $customer->name }}</span>
                    </div>
                    <div class="col-md-6 col-xs-6">
                        <strong>Đánh giá khách hàng:</strong>
                        <span>{{ $leadDealDetail->customerEvaluate->isHot == true ? 'Khách hàng tiềm năng' : ''}}</span>
                    </div>
                </div>
                @include('deal.module-meeting-agent')
                <hr>
                @include('shared.chanelDetailBlock')
                <div>
                    <?php
                    $customerPhones = "";
                    foreach ($leadDealDetail->customers->phoneList as $phone) {
                        //var_dump($phone);
                        $customerPhones .= base64_encode($phone->phone) . ",";
                    }
                    $customerPhones = substr($customerPhones, 0, strlen($customerPhones) - 1);
                    ?>
                    <input type="hidden" class="customerPhone" value="{{$customerPhones}}" />
                    @if (!$leadDealDetail->disabledFeature)
                    <a class="btn btn-app makeCall">
                        <i class="fa fa-phone"></i> Gọi (có {{count($leadDealDetail->customers->phoneList)}} số ĐT)
                    </a>
                    @endif

                    @if($leadDealDetail->statusId != 27 && $permissionDoAction == true)
                    <?php if (empty($leadDealDetail->progressQuoId) || $leadDealDetail->progressQuoId != 3 && $leadDealDetail->progressQuoId != 4) : ?>
                        @if (!$leadDealDetail->disabledFeature)
                        <a class="btn btn-app btnSendMail">
                            <i class="fa fa-envelope"></i> Gửi (có {{count($leadDealDetail->customers->emailList)}} Email)
                        </a>
                        <a class="btn btn-app btnOpenModalQuestion" onclick="openModalQuestion('{{$leadDealDetail->leadId}}', '1')">
                            <i class="fa fa-id-card-o"></i> Đánh giá KH
                        </a>
                        @endif
                    <?php endif; ?>
                    @endif
                    <!-- <a class="btn btn-app" href="#" id="covertToTPA" onclick="JMDetail.covertToTPA('{{$leadDealDetail->customers->customerId}}');return false;">
                    <i class="fa fa-paper-plane-o"></i> Chuyển TPA
                </a> -->
                    @if (!$leadDealDetail->disabledFeature)
                    <a class="btn btn-app" href="#" onclick="JMDetail.openModalUpdateContract();return false;">
                        <i class="fa fa-handshake-o" aria-hidden="true"></i> Thông tin HĐ
                    </a>

                    <a class="btn btn-app" href="/logs-active/index/{{$leadDealDetail->leadId}}">
                        <i class="fa fa-history" aria-hidden="true"></i> Lịch sử người dùng
                    </a>
                    @endif
                    @if(empty($leadDealDetail->customers->agentId))
                    <a class="btn btn-app" href="#" id="covertAgent" onclick="JMDetail.checkExistAgent('{{$leadDealDetail->customers->customerId}}','{{$customer->name}}');return false;">
                        <i class="fa fa-paper-plane-o"></i> Chuyển Agent
                    </a>
                    @endif
                </div>
            </div><!-- \ box-body -->
        </div><!-- \ box -->
    </div><!-- \ col-md-12 -->

    <!-- XỬ LÝ SLIDE NHU CẦU - JM -->
    <?php

    ?>
    <!-- \ XỬ LÝ SLIDE NHU CẦU - JM -->
    <div class="col-md-12">
        {!! $neadListTitle !!}

        <div class="box box-primary">
            <div class="box-body">
                <div class="row">
                    <div class="col-md-6">
                        <strong>Nhóm bất động sản:</strong>
                        <span class="text-muted">
                        {{ $leadDealDetail->propertyTypeGroup->name }}
                        </span>
                        <hr>
                    </div>
                    <div class="col-md-6">
                        <strong>Loại bất động sản:</strong>
                        <span class="text-muted">
                            @if( !empty($leadDealDetail->projectBuildingName) )
                            {{$leadDealDetail->projectBuildingName}}
                            @else
                            {{ $leadDealDetail->propertyType->typeName }}
                            @endif
                        </span>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <strong>Nguồn:</strong>
                        <span class="text-muted">
                            {{ $leadDealDetail->sourceName }}
                            @if( $leadDealDetail->sourceId == 17 && !empty($leadDealDetail->sourceTCName))
                            - {{$leadDealDetail->sourceTCName}}
                            @endif
                        </span>

                        <hr>
                    </div>
                    <div class="col-md-6">
                        <strong>Mục đích:</strong>
                        <span class="text-muted">
                            {{$purpose}}
                        </span>

                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <strong>Hình thức giao dịch:</strong>
                        <span class="text-muted">
                            {{ $leadDealDetail->listingType->typeName }}
                        </span>

                        <hr>
                    </div>

                    <div class="col-md-6">
                        <strong>Đối tượng:</strong>
                        <span class="text-muted">
                            {{ $leadDealDetail->subjectName }}
                        </span>
                        <hr>
                    </div>

                </div>

                <div class="row">
                    <div class="col-md-6">
                        <strong>Khoảng giá khách tìm kiếm:</strong>
                        <span class="text-muted">
                            @if(isset($leadDealDetail->formatFinalBudget) && !empty($leadDealDetail->formatFinalBudget))
                                @if(isset($leadDealDetail->formatInitialBudget) && !empty($leadDealDetail->formatInitialBudget))
                                    {{$leadDealDetail->formatInitialBudget}} - {{$leadDealDetail->formatFinalBudget}}
                                @else
                                    <= {{$leadDealDetail->formatFinalBudget}} 
                                @endif
                            @else 
                                @if(isset($leadDealDetail->formatInitialBudget) && !empty($leadDealDetail->formatInitialBudget))
                                    >= {{$leadDealDetail->formatInitialBudget}}
                                @else
                                    N/A
                                @endif
                            @endif
                        </span>
                        <hr>
                    </div>
                    <div class="col-md-6">
                        <strong>Ngân sách khách đang có:</strong>
                        <span class="text-muted">
                            {{isset($leadDealDetail->formatInitialBudgetFixed) && !empty($leadDealDetail->formatInitialBudgetFixed) ? $leadDealDetail->formatInitialBudgetFixed : 'N/A'}}
                        </span>
                        <hr>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <strong>Ngày dự tính dọn vào:</strong>
                        <span class="text-muted">
                            <?php
                            if ($leadDealDetail->moveInDate) {

                                $leadDealDetail->moveInDateFormat = date('m/d/Y', $leadDealDetail->moveInDate / 1000);
                            } else {
                                $leadDealDetail->moveInDateFormat = NULL;
                            }
                            ?>
                            {{($leadDealDetail->moveInDateFormat!=''?$leadDealDetail->moveInDateFormat:'N/A')}}
                        </span>

                        <hr>
                    </div>
                    <div class="col-md-6">
                        <strong>Năm xây dựng:</strong>
                        <span class="text-muted">
                            {{($leadDealDetail->yearBuilt!=''?$leadDealDetail->yearBuilt:'N/A')}}
                        </span>
                        <hr>
                    </div>
                </div>

                <div class="row">

                    <div class="col-md-6">
                        <strong>Khả năng đáp ứng của thị trường:</strong>
                        <span class="text-muted">
                            {{($leadDealDetail->responsiveness!=''?$leadDealDetail->responsiveness:'N/A')}}
                        </span>

                        <hr>
                    </div>

                </div>

                <div class="row">
                    <div class="col-md-6">
                        <strong>Diện tích tối thiểu:</strong>
                        <span class="text-muted">
                            {{($leadDealDetail->minSize!=''?$leadDealDetail->minSize:'N/A')}}
                        </span>
                        <hr>
                    </div>
                    <div class="col-md-6">
                        <strong>Diện tích tối đa:</strong>
                        <span class="text-muted">
                            {{($leadDealDetail->maxSize!=''?$leadDealDetail->maxSize:'N/A')}}
                        </span>
                        <hr>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <strong>Phòng ngủ:</strong>
                        <span class="text-muted">
                            {{($leadDealDetail->bedRooms!=''?$leadDealDetail->bedRooms:'N/A')}}
                        </span>
                        <hr>
                    </div>
                    <div class="col-md-6">
                        <strong>Phòng tắm:</strong>
                        <span class="text-muted">
                            {{($leadDealDetail->bathRooms!=''?$leadDealDetail->bathRooms:'N/A')}}
                        </span>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <strong>Tỉnh thành:</strong>
                        <span class="text-muted">
                            @foreach($leadDealDetail->cityList as $city)
                            {{ $city->name }}
                            @endforeach
                        </span>

                        <hr>
                    </div>
                    <div class="col-md-6">
                        <strong>Vị trí: </strong>
                        <span class="text-muted">
                            @if($leadDealDetail->propertyType->typeName == 'Chung cư/Căn hộ')
                            N/A
                            @else
                            {!! renderPosition($leadDealDetail) !!}
                            @endif

                        </span>
                    </div>
                </div>



                <div class="row">
                    <div class="col-md-12">
                        <strong>Quận:</strong>
                        @foreach($leadDealDetail->districtsList as $district)
                        @if($district->isPrefered)
                        <span class="btn btn-danger btn-xs">{{ $district->name }} <i class="fa fa-star" style="color:yellow"></i></span>
                        @else
                        <span class="btn btn-primary btn-xs">{{ $district->name }}</span>
                        @endif
                        @endforeach

                        <hr>
                        @if(!empty($leadDealDetail->wardList))
                        <div class="row">
                            @foreach($leadDealDetail->wardList as $distric)
                            <div class="col-md-6">
                                <div style="margin-bottom: 7px;"> <b>{{ $distric['districtName'] }}: Phường</b></div>
                                <div>
                                    @foreach($distric['wards'] as $ward)
                                    @if($ward->isPrefered)
                                    <span class="btn btn-danger btn-xs">{{ $ward->wardName }} <i class="fa fa-star" style="color:yellow"></i></span>
                                    @else
                                    <span class="btn btn-primary btn-xs">{{ $ward->wardName }}</span>
                                    @endif
                                    @endforeach
                                </div>
                            </div>
                            @endforeach
                        </div>
                        @else
                        <div style="padding: 10px; border-radius: 3px; border:1px solid #cccc; background-color: #eee; text-align: centers">Không có phường</div>
                        @endif
                    </div>
                </div>
                <hr>
                <strong>Hướng:</strong>
                @foreach($leadDealDetail->directionsList as $direction)
                @if($direction->isPrefered)
                <span class="btn btn-danger btn-xs">{{ $direction->name }} <i class="fa fa-star" style="color:yellow"></i></span>
                @else
                <span class="btn btn-primary btn-xs">{{ $direction->name }}</span>
                @endif
                @endforeach
                <hr />
                <strong>Tiện ích:</strong>
                <div class="row text-muted">
                    @foreach($leadDealDetail->amenitiesList as $amenities)
                    <div class="col-md-3">
                        <ul class="">
                            <li>{{$amenities->name}}
                            </li>
                        </ul>
                    </div>
                    @endforeach
                </div>
                <hr>

                <strong>Lưu ý khác:</strong>
                <div class="row text-muted">
                    <div class="col-md-12">{!! $leadDealDetail->note !!}</div>
                </div>


                <hr>
                <strong>Ghi chú:</strong>
                <div class="row">
                    @if($leadDealDetail->statusId != 27 && $permissionDoAction == true)
                    <?php if (empty($leadDealDetail->progressQuoId) || $leadDealDetail->progressQuoId != 3 && $leadDealDetail->progressQuoId != 4) : ?>
                        <div style="">
                        </div>


                    <?php endif; ?>
                    @endif
                    <div class="col-md-10 crm_jm_notes_wrap">
                        @if($leadDealDetail->notes != null)
                        @foreach($leadDealDetail->notes as $noteItem)
                        <div class="col-md-4">
                            <ul>
                                <li><b>Cập nhật lúc:</b> <span class="text-muted">{{date('d/m/y H:i:s',$noteItem->createdDate/1000)}}</span></li>
                                <li><b>Nội dung:</b> <span class="text-muted">{{$noteItem->note}}</span></li>
                                <li><b>Bởi: </b><span class="text-muted">{{$noteItem->userName}}</span></li>
                            </ul>
                        </div>
                        @endforeach
                        @endif
                    </div>
                </div>

                <hr>
                @if($leadDealDetail->statusId != 27 && $permissionDoAction == true)
                <div>
                    <a class="btn btn-app" onclick="broadcastAgent(this);return false;">
                        <i class="fa fa-paper-plane-o"></i> Broadcast
                    </a>
                </div>
                @endif

            </div>
        </div>
    </div>

    <div id="ba_mortgage"></div>

    <div id="boxListingMatchingJM" class="col-md-12">
        <h2 class="title-with-line"><span>DANH SÁCH LISTING PHÙ HỢP</span></h2>
        <!--Custom Tabs -->
        <div id="tabParent" class="nav-tabs-custom">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab_1" data-toggle="tab">Listing phù hợp <span id="countListing" class="badge"></span></a></li>
                <li><a onclick="likeListingTableRender()" href="#tab_2" data-toggle="tab">Bảng theo dõi</a></li>
                <li class="pull-right"><a href="#crm_jm_formCustomSearchListing" id="showFormSearch" class=""><i class="fa fa-gear"></i> Lọc kết quả</a></li>
            </ul>
            <div class="tab-content">
                @include('deal.tab-filter-search',['form_custom_search'=>$form_custom_search])
                <div class="tab-pane" id="tab_2">
                    @include('trace-table.deal')
                </div>
                <!--/.tab-pane -->
                <hr>
                <?php $permissionShowToolbar  = (empty($leadDealDetail->progressQuoId) || $leadDealDetail->progressQuoId != 3 && $leadDealDetail->progressQuoId != 4 ) && $leadDealDetail->statusId != 27 && $permissionDoAction == true ?>
                <div>
                    @if($permissionShowToolbar || $add_tour_permission)
                        <input type="hidden" id="arrayStoreListingForAction" value="" name="">
                        <input type="hidden" id="arrayStoreTourListingForAction" value="" name="">
                    @endif
                    @if($permissionShowToolbar)
                        <a class="btn btn-app btnOpenEmailForm">
                            <i class="fa fa-paper-plane-o"></i> Gửi email/sms
                        </a>

                        @if (!$leadDealDetail->disabledFeature)
                        <a class="btn btn-app btnShowTransferPSForm">
                            <i class="fa fa-gavel"></i> Chuyển PS
                        </a>
                        @endif
                    @endif
                    <a class="btn btn-app btnShowScheduleModal">
                        <i class="fa fa-calendar-check-o"></i> Đặt lịch xem
                    </a>
                    @if($permissionShowToolbar)
                        @if (!$leadDealDetail->disabledFeature)
                        <a class="btn btn-app btn-quick-check-listings">
                            <i class="fa fa-check"></i> Check trống
                        </a>
                        <a class="btn btn-app btn-show-market-report">
                            <i class="fa fa-flag"></i> Market report
                        </a>                        
                        @endif
                    @endif
                    <a href="/deal/tour/{{$leadDealDetail->dealId}}" class="btn btn-app"><i class="fa fa-map-marker"></i> Tour</a>
                    @if($permissionShowToolbar)
                        @if(!empty($leadDealDetail->basketId))
                        <a target="_blank" href="/deal/redirect-agent-site/{{$leadDealDetail->basketId}}/{{$leadDealDetail->dealId}}" class="btn btn-app"><i class="fa fa-home"></i> Xem BST</a>
                        @endif

                        <a onclick="JMDetail.showMapDisplayListings();return false;" class="btn btn-app">
                            <i class="fa fa-map"></i> Bản đồ
                        </a>
                        <div style="display:inline-block" id="modal-checking-planning"></div>
                        <?php if ($leadDealDetail->progressId == 4 || $leadDealDetail->progressId == 6 || $leadDealDetail->progressId == 7) {  ?>
                            @if (!$leadDealDetail->disabledFeature)
                            <a onclick="JMDetail.showNegotiateModal();return false;" class="btn btn-app">
                                <i class="fa fa-dollar"></i> Thương lượng
                            </a>
                            @endif
                        <?php } ?>
                        <a class="btn btn-app btn-remove-listing" onclick="removeListing(); return false;" style="display: none;">
                            <i class="fa fa-trash"></i> Xóa khỏi BST
                        </a>
                    @endif
                </div>

                <?php if ($leadDealDetail->progressId == 9 && $leadDealDetail->statusId == 29 && $leadDealDetail->isDepositDone) {  ?>
                    <button class="btn btn-app" onclick="JMDetail.closeDeal();return false;">
                        <i class="fa fa-check "></i>
                        Chốt deal
                    </button>
                <?php } ?>
                <?php if (!empty($leadDealDetail->depositId) && !($leadDealDetail->progressId == 8 && $leadDealDetail->statusId == 27)) {  ?>
                    <button class="btn btn-app" style="background-color: red; color: #fff; " data-toggle="modal" data-target="#modalCancelDeposit">
                        <i class="fa fa-remove "></i>
                        Hủy đặt cọc
                    </button>
                <?php } ?>
            </div>
            <!--/.tab-content -->
        </div>
        <!--nav-tabs-custom -->
    </div>
    <!--\col-md-12 -->

    <?php if (!empty($listBaBsa)) : ?>
        <span class="nav-link arrow-left glyphicon glyphicon-chevron-left" onclick="openNav()"></span>
        <div class="nav-link arrow-right">
            <i class="fa fa-chevron-right" aria-hidden="true" onclick="closeNav()"></i>
            <span>Tiến độ của các BA khác</span>
        </div>

        <div id="mySidenav" class="sidenav">
            <?php foreach ($listBaBsa as $ba) : ?>
                <a href="/deal/detail-in-group/{{$ba->dealId}}" target="_blank">{{$ba->baName}} - {{$ba->dealId}}</a>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>
<!--\ row -->


<!--MODAL LISTING DETAIL -->
<div id="listingDetailModal" class="modal fade" role="dialog">

</div> <!-- \ MODAL LISTING DETAIL -->

<!-- MODAL SLIDER -->
<div id="image-slider" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div id="owl-carousel" class="owl-carousel owl-theme">
                </div>
            </div>
        </div>

    </div>
</div>
<!-- MODAL CHANGE CARD TYPE -->
<div id="modalChangeCardType" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Thay nhãn</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <label class="col-md-4">Nhãn</label>
                    <div class="col-md-8">
                        <select id="scoreCardType" style="width: 100%" class="form-control"></select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-4">Nội dung thay đổi (<span class="text-danger">*</span>)</label>
                    <div class="col-md-8">
                        <textarea id="contentChangeCardType" col="3" class="form-control"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-success btnSaveChangeCardType">Lưu</button>
            </div>
        </div>

    </div>
</div>
<!-- \ MODAL SLIDER -->
@include('shared.modal-update-contract')
@include('shared.modal-negotiate')
@include('shared.modal-deposit')
@include('shared.modal-cancel-deposit')
@include('shared.modal-meeting')
@include('shared.modal-choose-phone-number')
@include('shared.modal-choose-phone-numbers')
@include('shared.modal-choose-emails')
@include('shared.modal-choose-email-type')
@include('shared.modal-choose-send-type')
@include('shared.modal-send-sms')
@include('shared.modal-add-infos-new-customer')
@include('deal.email-listing-to-customer-modal')
@include('deal.modal-schedule')
@include('deal.form-transfer-ps')
@include('deal.modal-search-listings-result-overview')
@include('deal.modal-reassign-responsible-person', ['assignedTo'=>$leadDealDetail->assignedTo])
@include('deal.modal-same-tours-details')
@include('shared.modal-update-status-pending-reason')
@include('shared.modal-unclock-reason')
@include('new-listings.modal-config')
@include('shared.modal-result-check-exist-agent')
@include('shared.updateCustomerInfoForAgent')
<button style="display:none" id="btn-agent-create"></button>
@include('shared.modal-create-agent')
@include('shared.mortgage-quick-info')
@include('commons.callingBoardModal')
@stop

@section('page-css')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css">
<link href="{{loadAsset('/plugins/datatables/dataTables.bootstrap.css')}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/css/deal/detail.css")}}" rel="stylesheet" type="text/css" />
<style type="text/css">
    .crm_jm_notes_wrap .col-md-4 {
        margin-bottom: 10px;
        border-left: 1px solid #dedede;
    }
</style>
<style>
    /*file upload*/
    .propzy-upload-file-wrapper {
        border: 1px solid #ccc;
        padding: 15px 10px;
    }

    .propzy-upload-file-wrapper .propzy-upload-file-action-top {
        border-radius: 15px;
        margin-left: 5px;
    }

    .propzy-upload-file-wrapper .propzy-upload-file-item {
        display: inline-block;
        width: 100%;
    }

    .propzy-upload-file-wrapper .propzy-upload-file-item .propzy-upload-file-item-col {
        float: left;
    }

    .propzy-upload-file-wrapper .propzy-upload-file-item .propzy-upload-file-item-thumb {
        width: 100px;
        height: 80px;
        vertical-align: middle;
        text-align: center;
        display: table-cell;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .propzy-upload-file-wrapper .propzy-upload-file-item-thumb>img {
        max-width: 100px;
        max-height: 80px;
    }

    .propzy-upload-file-wrapper .propzy-upload-file-item .propzy-upload-file-info {
        height: 20px;
    }

    .propzy-upload-file-wrapper .propzy-upload-file-item .propzy-upload-file-info>* {
        font-style: italic;
        font-weight: normal;
        padding: 0;
        float: left;
    }

    .propzy-upload-file-wrapper .propzy-upload-file-item .propzy-upload-file-info button {
        padding: 2px 12px;
        margin-left: 5px;
        border-radius: 20px;
    }

    .propzy-upload-file-wrapper .propzy-upload-file-item .progress {
        margin: 0;
        height: 3px;
        padding: 1px;
        background: rgba(255, 255, 255);
        border-radius: 6px;
    }

    .propzy-upload-file-wrapper .propzy-upload-file-item .progress-bar {
        width: 100%;
        height: 3px;
        border-radius: 4px;
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
        transition: 0.4s linear;
        transition-property: width, background-color;
    }

    .errors {
        color: #f00;
    }

    .datepicker {
        z-index: 100000 !important;
    }

    .pac-container {
        z-index: 100000 !important;
    }

    #image-slider {
        z-index: 999999999;
    }

    .ui-autocomplete {
        z-index: 1000000;
        background: #fff;
    }

    .tableAgents_wrapper {
        position: absolute;
        z-index: 100000;
        background: #fff;
        width: 100%;
        box-shadow: 2px 2px 2px 2px #aaa;
        padding: 6px;
    }




    #modalSearchListingsResultOverview {
        padding-right: 0px !important;
    }

    #modalSearchListingsResultOverview .modal-dialog {
        width: 100% !important;
        margin: 0 auto;
    }
</style>
@stop
@section('page-js')
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/js/gmap3.js")}}"></script>
<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>

<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset('/js/commons/deal/deal-functions.js')}}"></script>
<script src="{{loadAsset('/js/commons/deal/email-sms-sender.js')}}"></script>
<script src="{{loadAsset('/js/commons/deal/listing-email-sms-sender.js')}}"></script>
<script src="{{loadAsset('/js/deal/schedule.js')}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js"></script>
<script type="text/javascript" src="{{loadAsset('/js/broadcast-agents/scripts.js')}}"></script>
<!-- <script src="{{ loadAsset("/js/pos/common/plugins/axios/axios.min.js")}}"></script> -->
<script src="{{ loadAsset("/js/pos/common/files-upload_lib.js") }}"></script>
<script type="text/javascript" src="{{ loadAsset("js/commons/jquery.bpo-box.js")}}"></script>

<script type="text/javascript">
    $(document).ready(function() {
        bindCallAssignedCallback('DEAL', deal.dealId);
        $('#arrayStoreListingForAction').val(null);
        $('#arrayStoreTourListingForAction').val(null);

        JMDetail.checkedFilterAdvance();
        JMDetail.resetCheckedInput();
        JMDetail.load();

        // tooltip
        $(document).off('mouseover', '.evaluate-score .evaluate-score-block').on('mouseover ', '.evaluate-score .evaluate-score-block', function(e) {
            const _messtool = $(this).data('title');
            const _tooltip = '<div class="tooltip-event-props">' + _messtool + '</div>';
            const $tooltip = $(_tooltip).appendTo('body');
            $(this).mouseover(function(e) {
                $(this).css('z-index', 10000);
                $tooltip.fadeIn('500');
                $tooltip.fadeTo('10', 1.9);
            }).mousemove(function(e) {
                $tooltip.css('top', e.pageY + 10);
                $tooltip.css('left', e.pageX + 20);
            });

        });
        $(document).off('mouseout', '.evaluate-score .evaluate-score-block').on('mouseout ', '.evaluate-score .evaluate-score-block', function() {
            $('.tooltip-event-props').remove();
        });
    })

    <?php if (!empty($listBaBsa)) : ?>

        function openNav() {
            $('#mySidenav').attr('style', 'width: 250px')
            // document.getElementById("mySidenav").style.width = "250px";
            $('.arrow-left').attr('style', 'display: none')
            $('.arrow-right').attr('style', 'display: block; width: 280px')
        }

        function closeNav() {
            $('#mySidenav').attr('style', 'width: 0')
            // document.getElementById("mySidenav").style.width = "0";
            $('.arrow-left').attr('style', 'display: block')
            $('.arrow-right').attr('style', 'display: none; width: 0')
        }
    <?php endif ?>

    function storeCheckListing(element) {

        var store = $('#arrayStoreListingForAction').val();
        var storeBook = $('#arrayStoreTourListingForAction').val()
        if (store == '') {
            store = [];
        } else {
            store = JSON.parse(store); // this is a array
        }
        if (storeBook == '') {
            storeBook = [];
        } else {
            storeBook = JSON.parse(storeBook); // this is a array
        }

        if ($(element).is(":checked")) {
            store.push($(element).val());
            if ($(element).attr('isBooked') == 'true') {
                storeBook.push($(element).val());
            }
        } else {
            store.remove($(element).val());
            if ($(element).attr('isBooked') == 'true') {
                storeBook.remove($(element).val());
            }
        }
        var uniqueNames = [];
        var uniqueNamesBook = [];
        $.each(store, function(i, el) {
            if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });
        $.each(storeBook, function(i, el) {
            if ($.inArray(el, uniqueNamesBook) === -1) uniqueNamesBook.push(el);
        });
        storeBook = uniqueNamesBook;
        store = uniqueNames;
        $('#arrayStoreListingForAction').val(JSON.stringify(store))
        $('#arrayStoreTourListingForAction').val(JSON.stringify(storeBook))
    }

    var deal = {
        "progressQuoId": "{{$leadDealDetail->progressQuoId}}",
        "statusId": "{{$leadDealDetail->statusId}}",
        "dealId": "{{$leadDealDetail->dealId}}",
        "typeName": "{{$leadDealDetail->listingType->typeName }}",
        "moveInDate": "{{$leadDealDetail->moveInDate}}",
        "leasingSignedDate": "{{$leadDealDetail->leasingSignedDate}}",
        "leadId": "{{$leadDealDetail->leadId}}",
        "meeting": "{{!empty($leadDealDetail->meeting)?$leadDealDetail->meeting->id:''}}",
        "timeInactive": "{{$leadDealDetail->timeInactive}}",
        "customerEmails": "{{$customerEmails}}",
        "customerPhones": "{{$customerPhones}}",
        "customerId": "{{$customer->customerId}}",
        "customerName": "{{$customer->name}}",
        "isFormProfile": "{{$leadDealDetail->isFormProfile}}",
        "basketId": "{{$leadDealDetail->basketId}}",
        "districtsList": "{{json_encode($leadDealDetail->districtsList)}}",
        "wardsList": "{{json_encode($leadDealDetail->wardsList)}}",
        "closedBy": "{{$leadDealDetail->closedBy}}",
        "closedByType": "{{$leadDealDetail->closedByType}}",
        "isUpdateCustomerInfo": "{{!empty($leadDealDetail->isUpdateCustomerInfo) ? $leadDealDetail->isUpdateCustomerInfo : 0}}",
        "disabledFeature": "{{$leadDealDetail->disabledFeature}}"

    };
    //var noListingEmailTitle = "<?php echo "Propzy thông báo kết quả tìm kiếm " . $leadDealDetail->listingType->typeName . " " . $leadDealDetail->propertyType->typeName; ?>";
    var noListingEmailTitle = "Bất động sản phù hợp với nhu cầu của Quý khách";
    var addTourPermission = Boolean("{{$add_tour_permission}}");
    var isPendingDeal = Boolean("{{$is_pending_deal}}");
    var dealStatus = "{{$deal_status}}";
    var currentUserName = "{{$currentUserName}}";
    
</script>
<script src="{{loadAsset('/js/deal/detail.js')}}"></script>
<script src="{{loadAsset('/js/commons/jquery.number-percent.js')}}"></script>
<script type="text/javascript" src="{{loadAsset('/js/jm_commons/leadDealDetail/scripts.js')}}"></script>
<script type="text/javascript" src="{{loadAsset('/app/ba_mortgage.js')}}"></script>
<script type="text/javascript" src="{{loadAsset('/app/mortgage.js')}}"></script>
<script type="text/javascript" src="{{loadAsset('/app/deal_checking_planning.js')}}"></script>
@stop