@extends('layout.default')

@section('content')
<div class="row">

    <div class="col-md-12">
        <h2 class="title-with-line"><span>THÔNG TIN KHÁCH HÀNG</span></h2>
        <div class="box box-primary">
            <div class="box-body">
                <strong>Tên:</strong>
                <span class="">
                    {{ $customer->name }}
                </span>
                <hr>
                <strong>Do môi giới nào giới thiệu:</strong>
                <span class="text-muted">
                    {{!empty($leadDealDetail->agentName)?$leadDealDetail->agentName:'N/A'}}
                </span>
                <hr>
                @include('shared.chanelDetailBlock')
                <div>
                    <a class="btn btn-app" href="/request-history/index/{{$leadDealDetail->requestId}}">
                        <i class="fa fa-history"></i> Lịch sử
                    </a>
                    <a class="btn btn-app btnAddInfos hidden" title="Chuyển Khách hàng thành Môi giới">
                        <i class="fa fa-exchange"></i> K.Hàng <span style="font-size: 11px;" class="glyphicon glyphicon-arrow-right small-glyphicon"></span> M.Giới
                    </a>
                </div>
            </div>
        </div>
    </div>


    <div class="col-md-12">
        <h2 class="title-with-line"><span>THÔNG TIN NHU CẦU</span></h2>

        <div class="box box-primary">
            <div class="box-body">
                <div class="row">
                    <div class="col-md-6">
                        <strong>Loại bất động sản:</strong>
                        <span class="text-muted">
                            {{ $leadDealDetail->propertyType->typeName }}
                        </span>

                        <hr>
                    </div>
                    <div class="col-md-6">
                        <strong>Nhóm bất động sản:</strong>
                        <span class="text-muted">
                            {{ $leadDealDetail -> propertyTypeGroup -> name }}
                        </span>

                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <strong>Nguồn:</strong>
                        <span class="text-muted">
                            {{ $leadDealDetail->sourceName }}
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
                        <strong>Ngân sách tối thiểu:</strong>
                        <span class="text-muted">
                            {{isset($leadDealDetail->formatInitialBudget) && !empty($leadDealDetail->formatInitialBudget) ? $leadDealDetail->formatInitialBudget : 'N/A'}}
                        </span>
                        <hr>
                    </div>
                    <div class="col-md-6">
                        <strong>Ngân sách tối đa:</strong>
                        <span class="text-muted">
                            {{isset($leadDealDetail->formatFinalBudget) && !empty($leadDealDetail->formatFinalBudget) ? $leadDealDetail->formatFinalBudget : 'N/A'}}
                        </span>
                        <hr>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <strong>Ngân sách khách đang có:</strong>
                        <span class = "text-muted">
                            {{isset($leadDealDetail->formatInitialBudgetFixed) && !empty($leadDealDetail->formatInitialBudgetFixed) ? $leadDealDetail->formatInitialBudgetFixed : 'N/A'}}
                        </span>
                        <hr>
                    </div>
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
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <strong>Năm xây dựng:</strong>
                        <span class="text-muted">
                            {{($leadDealDetail->yearBuilt!=''?$leadDealDetail->yearBuilt:'N/A')}}
                        </span>
                        <hr>
                    </div>
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

                        <hr>
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
                                <div style="margin-bottom: 7px;"> <b>{{ $distric['districtName'] }}: Phường</b></div>
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
                    <div style="" class="btn-group col-md-2">
                        <a class="btn btn-app" data-toggle="modal" data-target="#modalRequestNote">
                            <i class="fa fa-sticky-note-o"></i> Ghi chú thêm
                        </a>
                    </div>
                    <div class="col-md-10 crm_jm_notes_wrap">
                        @if($leadDealDetail->notes != null && count($leadDealDetail->notes)>0)
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

                <!--end left -->
            </div>
        </div>
    </div>

</div>
<!--\ row -->
@include('shared.modal-add-infos-new-customer-request')
@stop

@section('page-css')
<style type="text/css">
    .crm_jm_notes_wrap .col-md-4 {
        margin-bottom: 10px;
        border-left: 1px solid #dedede;
    }
</style>
@stop
@section('page-js')
<script src="{{loadAsset('/js/request/detail.js')}}"></script>
<script type="text/javascript">
    $(document).ready(function() {
        $('#modalRequestNote .btn-submit').on('click', function() {
            var textareaRequestNote = $('#modalRequestNote textarea');
            if (textareaRequestNote.val() != "") {
                showPropzyLoading();
                // submit here
                var postData = {
                    "requestId": parseInt({{$leadDealDetail->requestId}}),
                    "leadId": null,
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
        })
    });
    var request = {
        "requestId": "{{$leadDealDetail->requestId}}",
        "customerEmails": "{{$customerEmails}}",
        "customerPhones": "{{$customerPhones}}",
        "customerId": "{{$customer->customerId}}"
    };
</script>
@stop