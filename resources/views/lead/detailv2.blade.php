@extends('layout.default')

@section('content')
@if(Session::has('message'))
<script type="text/javascript">
    $(document).ready(function() {
        $.confirm({
            title: "Thông báo",
            content: "{{Session::get('message')}}",
            autoClose: "cancelAction|1000",
            buttons: {
                cancelAction: function() {
                    //
                }
            }
        })
    })
</script>
@endif


<div class="row">
    <div id="lead-root"></div>

    <div class="col-md-12">
        <h2 class="title-with-line"><span>THÔNG TIN KHÁCH HÀNG</span></h2>
        <div class="box box-primary">
            <div class="box-body">
                <strong>Campaign ID:</strong>
                <span class="">
                    {{ !empty($leadDealDetail->campaignId) ? $leadDealDetail->campaignId : 'N/A' }}
                </span>

                <hr>

                <strong>Tên:</strong>
                <span class="">
                    {{ $customer->name }}
                </span>

                <hr>

                <strong>Do môi giới nào giới thiệu:</strong>
                <span class="text-muted">
                    {{!empty($leadDealDetail->agentName)?$leadDealDetail->agentName:'N/A'}}
                </span>
                @if(!empty($leadDealDetail->trackingScheduleTime))
                <table style="margin-top: 5px;background: aliceblue;" class="table">
                    <tr>
                        <th>LID</th>
                        <th>Nguồn</th>
                        <th>Trạng thái môi giới</th>
                        <th>Ngày đi xem</th>
                        <th>Ngày tạo</th>
                        <th>Ghi chú của khách hàng</th>
                        <th>Thông tin khác</th>
                    </tr>
                    @foreach($leadDealDetail->trackingScheduleTime as $item)
                    <?php
                    $listingHtmlCover = [];
                    foreach ($item->rlistingIds as $listingHtml) {
                        $listingHtmlCover[] = empty($listingHtml) ? "N/A" : "<a onclick='JMDetail.openModalListingDetailForAllPage($listingHtml);return false;' href='#'>$listingHtml</a>";
                    }
                    ?>
                    <tr>
                        <td>{!!implode(', ', $listingHtmlCover)!!}</td>
                        <td>{{$item->sourceName}}</td>
                        <td>{{!empty($item->profileStatusName) ? $item->profileStatusName : 'N/A'}}</td>
                        <td>{{!empty($item->date) ? date('d-m-Y H:i', $item->date/1000) : 'N/A'}}</td>
                        <td>{{!empty($item->createdDate) ? date('d-m-Y H:i', $item->createdDate/1000) : 'N/A'}}</td>
                        <td>{{!empty($item->customerNote) ? $item->customerNote : 'N/A'}}</td>
                        <td>{{!empty($item->featureName) ? $item->featureName : 'N/A'}}</td> 
                    </tr>
                    @endforeach
                </table>
                @endif
                <hr>
                @include('shared.chanelDetailBlock')
                <?php
                $customerPhones = "";
                foreach ($leadDealDetail->customers->phoneList as $phone) {
                    //var_dump($phone);
                    $customerPhones .= base64_encode($phone->phone) . ",";
                }
                $customerPhones = substr($customerPhones, 0, strlen($customerPhones) - 1);
                ?>
                <input type="hidden" class="customerPhone" value="{{$customerPhones}}" />
                @if(empty($leadDealDetail->dealId) && $permissionDoAction == true)
                <div>
                    <a class="btn btn-app makeCall">
                        <i class="fa fa-phone"></i> Gọi (có {{count($leadDealDetail->customers->phoneList)}} số
                        ĐT)
                    </a>

                    <?php if (empty($leadDealDetail->progressQuoId) || $leadDealDetail->progressQuoId != 3 && $leadDealDetail->progressQuoId != 4) : ?>
                        <a class="btn btn-app btnSendMail">
                            <i class="fa fa-envelope"></i> Gửi (có {{count($leadDealDetail->customers->emailList)}}
                            Email)
                        </a>
                        <a class="btn btn-app" id="formDGKH" onclick="openModalQuestion('{{$leadDealDetail->leadId}}', '1')">
                            <i class="fa fa-id-card-o"></i> Đánh giá KH
                        </a>

                    <?php endif; ?>
                    <!-- <a class="btn btn-app" href="#" id="covertToTPA" onclick="JMDetail.covertToTPA('{{$leadDealDetail->customers->customerId}}');return false;">
                                <i class="fa fa-paper-plane-o"></i> Chuyển TPA
                            </a> -->
                    <a class="btn btn-app" href="/logs-active/index/{{$leadDealDetail->leadId}}">
                        <i class="fa fa-history" aria-hidden="true"></i> Lịch sử người dùng
                    </a>
                    @if(empty($leadDealDetail->customers->agentId))
                    <a class="btn btn-app" href="#" id="covertAgent" onclick="JMDetail.checkExistAgent('{{$leadDealDetail->customers->customerId}}','{{$customer->name}}');return false;">
                        <i class="fa fa-paper-plane-o"></i> Chuyển Agent
                    </a>
                    @endif
                </div>
                @endif

                @if(!empty($leadDealDetail->meeting))
                @if($leadDealDetail->meeting->assignTo == $curentUser->userId)
                <a class="btn btn-app makeCall">
                    <i class="fa fa-phone"></i> Gọi (có {{count($leadDealDetail->customers->phoneList)}} số
                    ĐT)
                </a>
                @endif
                @endif
            </div><!-- \ box-body -->
        </div><!-- \ box -->
    </div><!-- \ col-md-12 -->
    <script>
        $(document).ready(function() {
            @if(isset($leadDealDetail->requiredAction) && $leadDealDetail->requiredAction == 'question-form' && $leadDealDetail->listingTypeId == 1)

            openModalQuestion('{{$leadDealDetail->leadId}}', '1', 'auto', null, false);
            @elseif(isset($leadDealDetail->requiredAction) && $leadDealDetail->requiredAction == 'question-form' && $leadDealDetail->listingTypeId == 2)
            openModalQuestion('{{$leadDealDetail->leadId}}', '1', 'auto', null, true);
            // hidePropzyLoading();
            // $.notify("Bảng đánh giá khách hàng đang được tải lên ...", "info");
            @elseif(isset($leadDealDetail->requiredAction) && $leadDealDetail->requiredAction == 'create-meeting' && $filterDGKH)

            triggerSendToCrm();

            @elseif(isset($leadDealDetail->requiredAction) && $leadDealDetail->requiredAction == 'create-mortgage')
            $("#modalRequestBankLoan").modal({
                backdrop: 'static',
                keyboard: false
            });
            @endif
        })
    </script>
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
                            $leadDealDetail->moveInDate = date('m/d/Y', $leadDealDetail->moveInDate / 1000);
                        } else {
                            $leadDealDetail->moveInDate = NULL;
                        }
                        ?>
                        {{($leadDealDetail->moveInDate!=''?$leadDealDetail->moveInDate:'N/A')}}
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
                    </div>
                    <div class="col-md-6">
                        <strong>Diện tích tối thiểu:</strong>
                        <span class="text-muted">
                            {{($leadDealDetail->minSize!=''?$leadDealDetail->minSize:'N/A')}}
                        </span>
                        <hr>
                    </div>
                    <hr>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <strong>Diện tích tối đa:</strong>
                        <span class="text-muted">
                            {{($leadDealDetail->maxSize!=''?$leadDealDetail->maxSize:'N/A')}}
                        </span>
                        <hr>
                    </div>
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
                        <!-- <hr> -->
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
                        @if(!empty($leadDealDetail->wardsList))
                        <div class="row">
                            @foreach($leadDealDetail->wardsList as $distric)
                            <div class="col-md-6">
                                <div style="margin-bottom: 7px;"><b>{{ $distric['districtName'] }}:
                                        Phường</b></div>
                                <div>
                                    @foreach($distric['wards'] as $ward)
                                    @if($ward->isPrefered)
                                    <span class="btn btn-danger btn-xs">{{ $ward->name }} <i class="fa fa-star" style="color:yellow"></i></span>
                                    @else
                                    <span class="btn btn-primary btn-xs">{{ $ward->name }}</span>
                                    @endif
                                    @endforeach
                                </div>
                            </div>
                            @endforeach
                        </div>
                        @else
                        <div style="padding: 10px; border-radius: 3px; border:1px solid #cccc; background-color: #eee; text-align: centers">
                            Không có phường
                        </div>
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

                <hr>

                <strong>Tiện ích:</strong>
                <div class="row text-muted">
                    @foreach($leadDealDetail->amenitiesList as $amenities)
                    <div class="col-md-3">
                        <ul class="">
                            <li>{{$amenities->name}}
                                <!-- <ul>
                          <li>Phasellus iaculis neque</li>
                          <li>Purus sodales ultricies</li>
                          <li>Vestibulum laoreet porttitor sem</li>
                          <li>Ac tristique libero volutpat at</li>
                        </ul> -->
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
                <div class="row">
                    @if($permissionDoAction == true)
                    <?php if (empty($leadDealDetail->progressQuoId) || $leadDealDetail->progressQuoId != 3 && $leadDealDetail->progressQuoId != 4) : ?>
                        <div style="">
                            <!-- <a tabindex="0" role="button" id="manualinputlabel" data-toggle="popover" title="weclome to use the sql quer" data-html=true  data-original-title="weclome to use the sql query" data-content="content" class="btn btn-app">
                                    <i class="fa fa-mail-forward "></i> CRMv2
                                </a> -->
                            <?php if (empty($leadDealDetail->meeting) && empty($leadDealDetail->dealId)) : ?>

                                @if($leadDealDetail->requiredAction != 'question-form')

                                <a id="btnSendToCrm" class="btn btn-app ">
                                    <i class="fa fa-mail-forward "></i> Chuyển cho CRM
                                </a>

                                @endif
                            <?php endif; ?>
                            <?php if (!empty($leadDealDetail->meeting) && $leadDealDetail->meeting->statusId != 2 || !empty($leadDealDetail->meeting) && $leadDealDetail->meeting->statusId == 2 && $leadDealDetail->meeting->isBACancelMeeting) : ?>
                                <a id="btnShowMeeting" class="btn btn-app" data-meeting-id="{{$leadDealDetail->meeting->id}}">
                                    <i class="fa fa-mail-forward "></i> Xem lại meeting
                                </a>
                            <?php endif; ?>
                            @if(empty($leadDealDetail->dealId))
                            <a class="btn btn-app" onclick="broadcastAgent(this);return false;">
                                <i class="fa fa-paper-plane-o"></i> Broadcast
                            </a>
                            @endif
                            @if(!empty($leadDealDetail->dealId))
                            <a class="btn btn-app" data-toggle="modal" data-target="#modalRequestNote">
                                <i class="fa fa-sticky-note-o"></i> Ghi chú thêm
                            </a>
                            @endif
                        </div>


                    <?php endif; ?>
                    @endif
                    <div class="col-md-10 crm_jm_notes_wrap">
                        @if($leadDealDetail->notes != null)
                        @foreach($leadDealDetail->notes as $noteItem)
                        <div class="col-md-4">
                            <ul>
                                <li><b>Cập nhật lúc:</b> <span class="text-muted">{{date('d/m/y H:i:s',$noteItem->createdDate/1000)}}</span>
                                </li>
                                <li><b>Nội dung:</b> <span class="text-muted">{{$noteItem->note}}</span>
                                </li>
                                <li><b>Bởi: </b><span class="text-muted">{{$noteItem->userName}}</span></li>
                            </ul>
                        </div>
                        @endforeach
                        @endif
                    </div>
                </div>
                <!-- Modal -->
                <div id="modalRequestNote" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Nhập ghi chú thêm</h4>
                            </div>
                            <div class="modal-body">
                                <textarea class="form-control" rows='10'></textarea>
                                <hr>
                                <button class="btn bg-olive btn-submit btn-block">Hoàn thành</button>
                            </div>
                        </div>

                    </div>
                </div>
                <!--end left -->
            </div>
        </div>
    </div>

        <div id="boxListingMatchingJM" class="col-md-12">
            <h2 class="title-with-line"><span>DANH SÁCH LISTING PHÙ HỢP</span></h2>
            <!--Custom Tabs -->
            <div id="tabParent" class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="active"><a onclick="generateTableListingAtDetail()" href="#tab_1" data-toggle="tab">Listing
                            phù hợp <span id=
                                          "countListing" class="badge"></span></a></li>
                    <li><a onclick="likeListingTableRender()" href="#tab_2" data-toggle="tab">Bảng theo dõi</a></li>
                    <li class="pull-right"><a href="#crm_jm_formCustomSearchListing" id="showFormSearch" class=""><i
                                    class="fa fa-gear"></i> Lọc kết quả</a></li>
                </ul>
                <div class="tab-content">
                    @include('lead.tab-filter-search',['form_custom_search'=>$form_custom_search])
                    <div class="tab-pane" id="tab_2">
                        @include('trace-table.index')
                    </div><!--/.tab-pane -->
                    <hr>
                    <div>
                        <input type="hidden" id="arrayStoreListingForAction" value="" name="">
                        <input type="hidden" id="arrayStoreTourListingForAction" value="" name="">
                        @if($permissionDoAction == true)
                            @if(empty($leadDealDetail->dealId))
                                @if(empty($leadDealDetail->progressQuoId) || $leadDealDetail->progressQuoId != 3 && $leadDealDetail->progressQuoId != 4)
                                    <a class="btn btn-app btnOpenEmailForm">
                                        <i class="fa fa-paper-plane-o"></i> Gửi email/sms
                                    </a>


                                    <a class="btn btn-app btn-quick-check-listings">
                                        <i class="fa fa-check"></i> Check trống
                                    </a>
                                    <a class="btn btn-app btn-remove-listing" onclick="removeListing(); return false;"
                                       style="display: none;">
                                        <i class="fa fa-trash"></i> Xóa khỏi BST
                                    </a>
                                @endif
                            @endif
                        @endif
                        <!-- case này dùng để hiện nút BST cho BA khi vào lead -->
                        @if(!empty($leadDealDetail->meeting))
                            @if($leadDealDetail->meeting->assignTo == $curentUser->userId)
                                <a class="btn btn-app btn-remove-listing" onclick="removeListing(); return false;"
                                   style="display: none;">
                                    <i class="fa fa-trash"></i> Xóa khỏi BST
                                </a>
                                @if(!empty($leadDealDetail->basketId))
                                    <a target="_blank" href="/deal/redirect-agent-site/{{$leadDealDetail->basketId}}/{{$leadDealDetail->leadId}}?type=lead" class="btn btn-app"><i class = "fa fa-home"></i> Xem BST</a>
                                @endif
                            @endif
                        @endif

                    <a onclick="JMDetail.showMapDisplayListings();return false;" class="btn btn-app">
                        <i class="fa fa-map"></i> Bản đồ
                    </a>

                    <!-- <a class="btn btn-app">
                            <i class="fa fa-calendar-check-o"></i> Đặt lịch xem
                        </a> -->
                </div>
            </div>
            <!--/.tab-content -->
        </div>
        <!--nav-tabs-custom -->
    </div>
    <!--\col-md-12 -->

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
<!-- \ MODAL SLIDER -->
@include('shared.modal-meeting')
@include('shared.modal-choose-phone-number')
@include('shared.modal-choose-phone-numbers')
@include('shared.modal-choose-emails')
@include('shared.modal-choose-email-type')
@include('shared.modal-choose-send-type')
@include('shared.modal-send-sms')
@include('deal.email-listing-to-customer-modal')
@include('new-listing-match-lead.modal-config')
@include('shared.modal-result-check-exist-agent')
<button style="display:none" id="btn-agent-create"></button>
@include('shared.modal-create-agent')
@include('shared.mortgage-quick-info')
@include('commons.callingBoardModal')

@stop

@section('page-css')

<link href="{{loadAsset('/plugins/datatables/dataTables.bootstrap.css')}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/owl.carousel/owl-carousel/owl.carousel.css')}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/owl.carousel/owl-carousel/owl.theme.css')}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/css/jquery-ui.css')}}" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="{{loadAsset('/css/lead/style.css')}}">
<link href="{{loadAsset("/css/lead/detail.css")}}" rel="stylesheet" type="text/css" />


@stop
@section('page-js')
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>

<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset('/js/commons/deal/deal-functions.js')}}"></script>
<script src="{{loadAsset('/js/commons/deal/email-sms-sender.js')}}"></script>
<script src="{{loadAsset('/js/commons/deal/listing-email-sms-sender.js')}}"></script>
<script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>
<script type="text/javascript" src="{{loadAsset('/js/broadcast-agents/scripts.js')}}"></script>

<!-- SWAT OPTIMIZE -->
<script src="{{loadAsset('/js/swat_optimize/lead.js')}}"></script>

<script type="text/javascript">
    $(document).ready(function() {
        bindCallAssignedCallback('LEAD', lead.leadId);
        $('#arrayStoreListingForAction').val(null);
        $('#arrayStoreTourListingForAction').val(null);
        JMDetail.resetCheckedInput();
        setTimeout(function() {
            JMDetail.load();
        }, 1000);
        // checked district wards
        JMDetail.checkedFilterAdvance();

        $('#modalRequestNote .btn-submit').on('click', function() {
            var textareaRequestNote = $('#modalRequestNote textarea');
            if (textareaRequestNote.val() != "") {
                showPropzyLoading();
                // submit here
                var postData = {
                    "requestId": null,
                    "leadId": lead.leadId,
                    "note": textareaRequestNote.val()
                };
                $.ajax({
                    'url': '/lead-deal-commons/user-request-update',
                    'type': 'post',
                    'data': JSON.stringify(postData)
                }).done(function(response) {
                    if (response.result == true) {
                        textareaRequestNote.css({
                            'border': 'none'
                        });
                        $('.crm_jm_notes_wrap').prepend('<div class="col-md-4"><ul><li><b>Cập nhật lúc:</b> <span class = "text-muted">vừa xong</span></li><li><b>Nội dung:</b> <span class = "text-muted">' + textareaRequestNote.val() + '</span></li><li><b>Bởi:</b> <span class = "text-muted">{{ Session::get("user")->name }}</span></li></ul></div>');
                        textareaRequestNote.val('');
                        $('#modalRequestNote').modal('hide');
                    } else {
                        showPropzyAlert(response.message);
                    }
                    console.log(response);
                }).always(function() {
                    hidePropzyLoading();
                });
            } else {
                textareaRequestNote.css({
                    'border': '1px solid red'
                })
            }
        });

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

    // ********************************************************
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

    var lead = {
        "progressQuoId": "{{$leadDealDetail->progressQuoId}}",
        "leadId": "{{$leadDealDetail->leadId}}",
        "dealId": "{{$leadDealDetail->dealId}}",
        "timeInactive": "{{$leadDealDetail->timeInactive}}",
        "filterDGKH": "{{ $filterDGKH }}",
        "requiredAction": "{{$leadDealDetail->requiredAction}}",
        "meeting": "{{!empty($leadDealDetail->meeting)?$leadDealDetail->meeting->id:''}}",
        "meetingObj": <?php echo json_encode($leadDealDetail->meeting); ?>,
        "customerEmails": "{{$customerEmails}}",
        "customerPhones": "{{$customerPhones}}",
        "isUpdateCustomerInfo": {{!empty($lead->isUpdateCustomerInfo) ? $lead->isUpdateCustomerInfo : 0}},
        "basketId": "{{$leadDealDetail->basketId}}",
        "customerId": "{{$customer->customerId}}",
        "districtsList": "{{json_encode($leadDealDetail->districtsList)}}",
        "wardsList": "{{json_encode($leadDealDetail->wardsList)}}",
        "crmAssignedList": <?php echo json_encode(!empty($leadDealDetail->crmAssignedList) ? $leadDealDetail->crmAssignedList : []) ?>
    };
    // lead.meetingObj = JSON.parse(lead.meetingObj);
    //var noListingEmailTitle = "<?php echo "Propzy thông báo kết quả tìm kiếm " . $leadDealDetail->listingType->typeName . " " . $leadDealDetail->propertyType->typeName; ?>";
    var noListingEmailTitle = "Bất động sản phù hợp với nhu cầu của Quý khách";
    var currentUserName = "{{$currentUserName}}";
</script>
<script src="{{loadAsset('/js/lead/detail.js')}}"></script>
<script type="text/javascript" src="/js/jm_commons/leadDealDetail/scripts.js"></script>
<script type="text/javascript" src="/js/jm_commons/root.js"></script>
<script type="text/javascript" src="/js/lead/scripts.js"></script>
<script type="text/javascript">
    var intercom = Intercom.getInstance();
    intercom.on('reloadPage', function(data) {
        data = JSON.parse(data);
        $.each(data, function(k, v) {
            if (v.leadId == lead.leadId) {
                location.reload()
            }
        })
    });
</script>
<script type="text/javascript" src="/app/mortgage.js"></script>
<script type="text/javascript" src="/app/lead.js"></script>
@stop