<?php
function stopPostingMessage() {
    return 'Listing đã ngưng đăng tin';
}

function seconds2human($ss) {
    $m = floor(($ss%3600)/60);
    $h = floor(($ss%86400)/3600);
    
    return ($h > 0 ? "$h tiếng " : "") . "$m phút";
}

function renderPresentAndFutureTr($scheduleLoop, $listing, $isDisabled) {
    $isFeedback = $listing->isFeedback;
    $isDismiss = $listing->isDismiss;
    $isUnvailabel = $listing->isDismiss == false && !empty($listing->reasonName);
    ?>
    <tr class="{{$isDismiss?'feedback':''}} {{$isDismiss?'dismiss':''}}" data-rlisting-id="{{$listing->rlistingId}}" data-disabled="{{$isDisabled == 1 ? 'true' : 'false'}}">
        <td width="80px">
            <a href="#" onclick="JMDetail.openModalListingDetailForAllPage('{{$listing->rlistingId}}');return false;">{{$listing->rlistingId}} ({{$listing->listingTypeName}})</a>
            <?php if (!$isDismiss && $scheduleLoop->hasPermissionTourUpdate): ?>
                <a href="#" class="btn-remove-listing text-red" data-rlisting-id="{{$listing->rlistingId}}"><i class="glyphicon glyphicon-minus-sign"></i></a>
            <?php endif; ?>
            <input class="is-dismiss is-dismiss-{{$listing->rlistingId}}" type="hidden" value="{{$listing->isDismiss?1:0}}" />
            <input class="listing-item-{{$listing->rlistingId}}" type="hidden" value="{{json_encode($listing)}}" />
            <input class='estimatedTime-{{$listing->rlistingId}}' type='hidden' value='{{$listing->estimatedTime}}' />
            <input class='estimatedDistance-{{$listing->rlistingId}}' type='hidden' value='{{$listing->estimatedDistance}}' />
        </td>
        <td>{{$listing->address}}</td>
        <td>
            @if($scheduleLoop->hasPermissionTourUpdate)
            <div class="form-group">
                <div class="input-group bootstrap-timepicker timepicker">
                    <input type='text' class="form-control {{!$isDismiss ? 'listing-schedule-time' : ''}}" value="{{date('H:i',$listing->scheduleTime/1000)}}"  data-rlisting-id='{{$listing->rlistingId}}'/>
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>
            @else
                {{date('H:i',$listing->scheduleTime/1000)}}
            @endif
            <?php if(!empty($listing->timeViewFrom) && !empty($listing->timeViewTo)): ?>
                <div class="group-request-change-time" data-id='{{$listing->requestChangeTimeId}}'>
                    <div class="form-group">
                        <span>từ: {{date('d/m H:i',$listing->timeViewFrom/1000)}}</span>
                        <span>đến: {{date('d/m H:i',$listing->timeViewTo/1000)}}</span>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success btnConfirmChangeTime"><i class="fa fa-check"></i></button>
                        <button class="btn btn-warning btnRecheckListing" data-rlisting-id='{{$listing->rlistingId}}' ><i class="fa fa-refresh"></i></button>
                        <input class="listing-data-{{$listing->rlistingId}}" type="hidden" value="{{json_encode($listing)}}"  />
                    </div>
                </div>
            <?php endif; ?>
        </td>
        <td>
            @if($scheduleLoop->hasPermissionTourUpdate)
            <input type="text" data-rlisting-id='{{$listing->rlistingId}}' class="listing-note listing-note-{{$listing->rlistingId}} form-control" value="{{$listing->note !== null ? $listing->note : ''}}"  />
            @else
                {{$listing->note !== 'null' ? $listing->note : ''}}
            @endif
        </td>
        <td>
            <?php if (!empty($listing->percentValue)): ?>
                <a href='#' onclick="return showListingFeedBack({{$scheduleLoop->scheduleId}}, {{$listing->rlistingId}})">
                    {{number_format($listing->percentValue, 0)."%"}}
                </a>
            <?php else: ?>                                        
                <?php if ($isDismiss): ?>
                    <span>Listing này bị bỏ qua. {{!empty($listing->reasonName)?"Lý do: ".$listing->reasonName:""}}</span>
                <?php elseif($isUnvailabel): ?>
                    <span class="error">{{stopPostingMessage()}}</span>
                <?php endif; ?>
            <?php endif; ?>
        </td>               
        @if($scheduleLoop->hasPermissionTourUpdate)
        <td>
            @if(!$isDisabled)
            <a class="order-btn-up" onclick="return orderScheduleListing(this, 'up', {{$listing->rlistingId}})"  data-schedule-id="{{$scheduleLoop->scheduleId}}"><i class='glyphicon  glyphicon-arrow-up'></i></a>
            <a class="order-btn-down" onclick="return orderScheduleListing(this, 'down', {{$listing->rlistingId}})"  data-schedule-id="{{$scheduleLoop->scheduleId}}"><i class='glyphicon  glyphicon-arrow-down'></i></a>
            @endif
        </td>
        @endif
    </tr>
<?php
}

function renderScheduleSupports($scheduleId, $type = null) {
    ?>
    <table class="hidden table table-bordered table-schedule table-schedule-{{$type}}" data-schedule-id="{{$scheduleId}}">
        <thead>
            <tr><th>Thời gian</th><th>Sự cố</th><th>Vị trí hiện tại</th><th>Hướng giải quyết</th><th>Hoàn tất</th></tr>
        </thead>
        <tbody></tbody>
    </table>
    <?php
}

function renderPresentAndFutureSchedule($scheduleList, $title, $viewFeedBack, $showListingStatus, $isTMUser) {    
    foreach ($scheduleList as $scheduleLoop):
        ?>
        <section id="schedule{{$scheduleLoop->scheduleId}}" class="box box-primary schedule-box">            
            <div class="box-header with-border">
                <h3 class="box-title">{{$title}} <span class="lbScheduleDay-{{$scheduleLoop->scheduleId}}">{{date('d/m/Y',$scheduleLoop->scheduleTime/1000)}}</span> <span class="text-red">{{($scheduleLoop->scheduleTime/1000)<time()?"(Tour trễ)":""}}</span></h3>                
            </div>
            <input type="hidden" class="schedule-date schedule-date-{{$scheduleLoop->scheduleId}}" value="{{date('d-m-Y',$scheduleLoop->scheduleTime/1000)}}" />
            <input type="hidden" class="estimatedTime estimatedTime-{{$scheduleLoop->scheduleId}}" value="{{$scheduleLoop->estimatedTime}}" />
            <input type="hidden" class="estimatedDate estimatedDate-{{$scheduleLoop->scheduleId}}" value="{{$scheduleLoop->estimatedDate}}" />
            <input type="hidden" class="schedule-date-full schedule-date-full-{{$scheduleLoop->scheduleId}}" value="{{$scheduleLoop->scheduleTime}}" />
            <input type="hidden" class="estimatedDistance estimatedDistance-{{$scheduleLoop->scheduleId}}" name="estimatedDistance" value="{{$scheduleLoop->estimatedDistance}}" />
            <input type="hidden" class="permission-update-{{$scheduleLoop->scheduleId}}" value="{{$scheduleLoop->hasPermissionTourUpdate}}" />
            <div class="box-body schedule schedule-{{$scheduleLoop->scheduleId}}" data-schedule-id="{{$scheduleLoop->scheduleId}}">
                <?php if ($viewFeedBack && $scheduleLoop->isFeedback): ?>
                    <div style="margin-bottom: 16px;">
                        <button class="btn btn-warning btn-view-feedback" data-schedule-id="{{$scheduleLoop->scheduleId}}">Phản hồi</button>
                    </div>
                <?php endif; ?>
                <div style="margin-bottom: 16px;">
                    <div class="row">
                        <div class="col-sm-4" >
                            <label class="tour-label" data-schedule-time="{{$scheduleLoop->scheduleTime}}" data-reason-change-id="">Giờ bắt đầu (Dự kiến)</label>
                            <span>
                                <span class="lbScheduleTime-{{$scheduleLoop->scheduleId}}">{{date('H:i',$scheduleLoop->scheduleTime/1000)}}</span>
                                @if($scheduleLoop->hasPermissionTourUpdate)
                                <a class="btnUpdateScheduleTime" href="#" data-schedule-id="{{$scheduleLoop->scheduleId}}"><i class="fa fa-edit"></i></a>                                        
                                @endif
                            </span>
                        </div>
                        <div class="col-sm-4" >
                            <label class="tour-label">Thời gian đi (Dự kiến)</label>
                            <span data-estimate-time="{{$scheduleLoop->estimatedTime}}" class="lbEstimatedTime-{{$scheduleLoop->scheduleId}}">{{!empty($scheduleLoop->estimatedTime) ? seconds2human($scheduleLoop->estimatedTime) : '--'}}</span>
                            </span>
                        </div>
                        <div class="col-sm-4" >
                            <label class="tour-label">Giờ kết thúc (Dự kiến)</label>
                            <span data-estimate-date="{{$scheduleLoop->estimatedDate}}" data-estimate-distance="{{$scheduleLoop->estimatedDistance}}" class="lbEstimatedDate-{{$scheduleLoop->scheduleId}}">{{!empty($scheduleLoop->estimatedDate) ? date('H:i',$scheduleLoop->estimatedDate/1000) : '--'}}</span>
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12" >
                            <label class="tour-label">Nhân viên dẫn tour</label>
                            <span>
                                <span data-assigned-to="{{$scheduleLoop->assignedTo}}">{{$scheduleLoop->assignedToName}}</span>
                                @if($isTMUser && $scheduleLoop->hasPermissionTourUpdate)
                                <a class="btn-show-reassign" href="#" data-schedule-id="{{$scheduleLoop->scheduleId}}"><i class="fa fa-edit"></i></a>
                                @endif
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12" >
                            <label class="">Ghi chú</label>
                            <div class="col-sm-12">
                                <div class="row">
                                    @if($scheduleLoop->hasPermissionTourUpdate)
                                    <textarea class="col-sm-12 form-control tour-note" style="resize: none; height: 80px;">{{$scheduleLoop->note}}</textarea>
                                    @else
                                    {{$scheduleLoop->note}}
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php if ($scheduleLoop->scheduleListings): ?>
                    <table class="table table-bordered table-listing">
                        <thead>
                            <tr>
                                <th>LID</th>
                                <th>Địa chỉ</th>
                                <th>Giờ đi xem <br> (Dự kiến)</th>
                                <th>Ghi chú</th>
                                <th>Phù hợp</th>
                                @if($scheduleLoop->hasPermissionTourUpdate)
                                <th class="order-col">Sắp xếp</th>
                                @endif
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $disabledArr = [];
                            foreach ($scheduleLoop->scheduleListings as $listing):
                                if($listing->isDismiss) {
                                    array_push($disabledArr, $listing);
                                } else {
                                    renderPresentAndFutureTr($scheduleLoop, $listing, false);
                                }
                            endforeach;
                            foreach ($disabledArr as $listing):
                                renderPresentAndFutureTr($scheduleLoop, $listing, true);
                            endforeach;
                            ?>
                        </tbody>
                    </table>
                <?php endif; ?>

                <?php renderScheduleSupports($scheduleLoop->scheduleId); ?>
            </div>
            @if($scheduleLoop->hasPermissionTourUpdate)
            <div class="box-footer">                
                <button class="btn btn-warning btn-show-add-listing-modal" data-schedule-id="{{$scheduleLoop->scheduleId}}">Thêm listing</button>                
                <button class="btn btn-danger btn-cancel-schedule" data-schedule-id="{{$scheduleLoop->scheduleId}}">Hủy tour</button>
                <button class="btn btn-success btn-save-schedule" data-schedule-id="{{$scheduleLoop->scheduleId}}">Cập nhật</button>                
            </div>
            @endif
        </section>
        <?php
    endforeach;
}

function renderPresentTr($scheduleLoop, $listing) {
    $isFeedback = $listing->isFeedback;
    $isDismiss = $listing->isDismiss;
    $isUnvailabel = $listing->isDismiss == false && !empty($listing->reasonName);
?>
    <tr class="{{$isFeedback?'feedback':''}} {{$isDismiss?'dismiss':''}}" data-rlisting-id="{{$listing->rlistingId}}">
        <td width="80px">
            <a href="#" onclick="JMDetail.openModalListingDetailForAllPage('{{$listing->rlistingId}}');return false;">{{$listing->rlistingId}} ({{$listing->listingTypeName}})</a>
            <?php if (!$listing->isDismiss && !$listing->isFeedback): ?>
                <a href="#" class="btn-remove-listing text-red hidden" data-rlisting-id="{{$listing->rlistingId}}"><i class="glyphicon glyphicon-minus-sign"></i></a>
            <?php endif; ?>
            <input class="is-dismiss is-dismiss-{{$listing->rlistingId}}" type="hidden" value="{{$listing->isDismiss?1:0}}" />
            <input class="listing-item-{{$listing->rlistingId}}" type="hidden" value="{{json_encode($listing)}}" />
            <input class='estimatedTime-{{$listing->rlistingId}}' type='hidden' value='{{$listing->estimatedTime}}' />
            <input class='estimatedDistance-{{$listing->rlistingId}}' type='hidden' value='{{$listing->estimatedDistance}}' />
        </td>
        <td>{{$listing->address}}</td>
        <td>        
            <div class="form-group">
                {{date('H:i',$listing->scheduleTime/1000)}}
            </div>
            <?php if(!empty($listing->timeViewFrom) && !empty($listing->timeViewTo)): ?>
                <div class="group-request-change-time" data-id='{{$listing->requestChangeTimeId}}'>
                    <div class="form-group">
                        <span>từ: {{date('d/m H:i',$listing->timeViewFrom/1000)}}</span>
                        <span>đến: {{date('d/m H:i',$listing->timeViewTo/1000)}}</span>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success btnConfirmChangeTime"><i class="fa fa-check"></i></button>
                        <button class="btn btn-warning btnRecheckListing" data-rlisting-id='{{$listing->rlistingId}}' ><i class="fa fa-refresh"></i></button>
                        <input class="listing-data-{{$listing->rlistingId}}" type="hidden" value="{{json_encode($listing)}}"  />
                    </div>
                </div>
            <?php endif; ?>
        </td>
        <!--<td>Thứ tự đi xem</td>-->
        <td>{{$listing->note}}</td>
        <td>
            <?php if (!empty($listing->percentValue)): ?>
                <a href='#' onclick="return showListingFeedBack({{$scheduleLoop->scheduleId}}, {{$listing->rlistingId}})">
                    {{number_format($listing->percentValue, 0)."%"}}
                </a>
            <?php else: ?>                                        
                <?php if ($isDismiss): ?>
                    <span>Listing này bị bỏ qua {{!empty($listing->reasonName)?" Lý do: ".$listing->reasonName:""}}</span>
                <?php elseif ($isUnvailabel): ?>
                    <span class="error">{{stopPostingMessage()}}</span>
                <?php endif; ?>
            <?php endif; ?>
        </td>
    </tr>
<?php
}

function renderPresentSchedule($scheduleList, $title, $viewFeedBack, $showListingStatus) {
    foreach ($scheduleList as $scheduleLoop):
        ?>
        <section id="schedule{{$scheduleLoop->scheduleId}}" class="box box-primary schedule-box">
            <div class="box-header with-border">
                <h3 class="box-title">{{$title}} <span class="lbScheduleDay-{{$scheduleLoop->scheduleId}}">{{date('d/m/Y',$scheduleLoop->scheduleTime/1000)}}</span></h3>
            </div>
            <input type="hidden" class="schedule-date schedule-date-{{$scheduleLoop->scheduleId}}" value="{{date('d-m-Y',$scheduleLoop->scheduleTime/1000)}}" />
            <input type="hidden" class="estimatedTime estimatedTime-{{$scheduleLoop->scheduleId}}" value="{{$scheduleLoop->estimatedTime}}" />
            <input type="hidden" class="estimatedDate estimatedDate-{{$scheduleLoop->scheduleId}}" value="{{$scheduleLoop->estimatedDate}}" />
            <input type="hidden" class="schedule-date-full schedule-date-full-{{$scheduleLoop->scheduleId}}" value="{{$scheduleLoop->scheduleTime}}" />
            <input type="hidden" class="estimatedDistance estimatedDistance-{{$scheduleLoop->scheduleId}}" name="estimatedDistance" value="{{$scheduleLoop->estimatedDistance}}" />
            <div class="box-body schedule schedule-{{$scheduleLoop->scheduleId}}" data-schedule-id="{{$scheduleLoop->scheduleId}}">
                <?php if ($viewFeedBack && $scheduleLoop->isFeedback): ?>
                    <div style="margin-bottom: 16px;">
                        <button class="btn btn-warning btn-view-feedback" data-schedule-id="{{$scheduleLoop->scheduleId}}">Phản hồi</button>
                    </div>
                <?php endif; ?>
                <div style="margin-bottom: 16px;">
                    <div class="row">
                        <div class="col-sm-4" >
                            <label class="tour-label">Giờ bắt đầu (Dự kiến)</label>
                            <span class="lbScheduleTime-{{$scheduleLoop->scheduleId}}">{{date('H:i',$scheduleLoop->scheduleTime/1000)}}</span>
                        </div>
                        <div class="col-sm-4" >
                            <label class="tour-label">Thời gian đi (Dự kiến)</label>
                            <span class="lbScheduleTime-{{$scheduleLoop->estimatedTime}}">{{!empty($scheduleLoop->estimatedTime) ? seconds2human($scheduleLoop->estimatedTime) : '--'}}</span>
                        </div>
                        <div class="col-sm-4" >
                            <label class="tour-label">Giờ kết thúc (Dự kiến)</label>
                            <span class="lbScheduleTime-{{$scheduleLoop->estimatedDate}}">{{!empty($scheduleLoop->estimatedDate) ? date('H:i',$scheduleLoop->estimatedDate/1000) : '--'}}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12" >
                            <label class="tour-label">Nhân viên dẫn tour</label>
                            <span>{{$scheduleLoop->assignedToName}}</span>
                        </div>
                    </div>
                    <div>
                        <label class="tour-label">Ghi chú</label>
                        <div class="tour-note-val">{{$scheduleLoop->note}}</div>                            
                    </div>
                </div>
                <?php if ($scheduleLoop->scheduleListings): ?>
                    <input type="hidden" class="showListingStatus showListingStatus-{{$scheduleLoop->scheduleId}}" value="<?php echo $showListingStatus ? "1" : "0"; ?>" data-schedule-id="{{$scheduleLoop->scheduleId}}" />

                    <table class="table table-bordered table-listing present-listing table-view">
                        <thead>
                            <tr>
                                <th>LID</th>
                                <th>Địa chỉ</th>
                                <th>Giờ đi xem <br> (Dự kiến)</th>
                                <th>Ghi chú</th>
                                <th>Phù hợp</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $disabledArr = [];
                            foreach ($scheduleLoop->scheduleListings as $listing):
                                if($listing->isDismiss) {
                                    array_push($disabledArr, $listing);
                                } else {
                                    renderPresentTr($scheduleLoop, $listing);
                                }
                            endforeach;
                            foreach ($disabledArr as $listing):
                                renderPresentTr($scheduleLoop, $listing);
                            endforeach;
                            ?>
                        </tbody>
                    </table>
                <?php endif; ?>

                <?php renderScheduleSupports($scheduleLoop->scheduleId); ?>
            </div>
            @if($scheduleLoop->hasPermissionTourUpdate)
            <div class="box-footer">
                <button class="btn btn-warning btn-show-add-listing-modal" data-schedule-id="{{$scheduleLoop->scheduleId}}">Thêm listing</button>
                <button class="btn btn-success btn-show-request-update-tour" data-schedule-id="{{$scheduleLoop->scheduleId}}">Yêu cầu thay đổi</button>
            </div>
            @endif
        </section>
        <?php
    endforeach;
}

function renderTr($scheduleLoop, $listing, $type) { 
    $isDismiss = $listing->isDismiss;
    $isUnvailabel = $isDismiss == false && !empty($listing->reasonName);    
?>
    <tr>
        <td>
            <a href="#" onclick="JMDetail.openModalListingDetailForAllPage('{{$listing->rlistingId}}');return false;">{{$listing->rlistingId}} ({{$listing->listingTypeName}})</a>
        </td>
        <td>{{$listing->address}}</td>

        @if(!empty($listing->arrivedDate))
            <td>{{date('H:i',$listing->arrivedDate/1000)}}</td>
        @else
            <td>
                {{date('H:i',$listing->scheduleTime/1000)}} 
                {{$type == 'stop' ? "(Dự kiến)" : ""}}
            </td>
        @endif

        <td>{{!empty($listing->note)?$listing->note:""}}</td>
        <td>
            <?php if (!empty($listing->percentValue)): ?>
                <a href='#' class="starRenderPropzy" poin="{{number_format($listing->percentValue, 0)}}" onclick="return showListingFeedBack({{$scheduleLoop->scheduleId}}, {{$listing->rlistingId}})">
                    {{number_format($listing->percentValue, 0)."%"}}
                </a>
            <?php else: ?>                                      
                <?php if ($isDismiss): ?>
                    <span>Listing này bị bỏ qua {{!empty($listing->reasonName)?" Lý do: ".$listing->reasonName:""}}</span>
                <?php elseif ($isUnvailabel): ?>
                    <span class="error">{{stopPostingMessage()}}</span>
                <?php endif; ?>
            <?php endif; ?>
        </td>
    </tr>
<?php
}

function renderCancelAndPastList($schedules, $type, $title) {
    foreach ($schedules as $scheduleLoop):
        ?>
        <section id="schedule{{$scheduleLoop->scheduleId}}" class="box box-primary tour-{{$type}} schedule-box">
            <div class="box-header with-border">
                <h3 class="box-title">{{$title}} {{date('d/m/Y',$scheduleLoop->scheduleTime/1000)}}</h3>
                <?php if ($type == "canceled" || $type == "stop"): ?>
                    <div class="text-bold" style="margin-top:6px">{{isset($scheduleLoop->reasonName) && !empty($scheduleLoop->reasonName)?"Lý do: ".$scheduleLoop->reasonName:""}}</div>
                <?php endif; ?>
            </div>
            <div class="box-body">
                @if($type == "canceled")
                    <div class="row">
                        <div class="col-sm-4" >
                            <label class="tour-label">Giờ bắt đầu (Dự kiến)</label>
                            <span class="lbScheduleTime-{{$scheduleLoop->scheduleId}}">{{ date('H:i', $scheduleLoop->scheduleTime/1000) }}</span>
                        </div>
                        <div class="col-sm-4" >
                            <label class="tour-label">Thời gian đi (Dự kiến)</label>
                            <span class="lbScheduleTime-{{$scheduleLoop->estimatedTime}}">{{!empty($scheduleLoop->estimatedTime) ? seconds2human($scheduleLoop->estimatedTime) : '--'}}</span>
                        </div>
                        <div class="col-sm-4" >
                            <label class="tour-label">Giờ kết thúc (Dự kiến)</label>
                            <span class="lbScheduleTime-{{$scheduleLoop->estimatedDate}}">{{!empty($scheduleLoop->estimatedDate) ? date('H:i',$scheduleLoop->estimatedDate/1000) : '--'}}</span>
                        </div>
                    </div>
                @else
                    <div class="row">
                        <div class="col-sm-4" >
                            <label class="tour-label">Giờ bắt đầu</label>
                            <span class="lbScheduleTime-{{$scheduleLoop->scheduleId}}">
                                {{ !empty($scheduleLoop->actualStartedDate) ? date('H:i', $scheduleLoop->actualStartedDate/1000) :(!empty($scheduleLoop->scheduleTime) ? date('H:i', $scheduleLoop->scheduleTime/1000) : '--')}}
                            </span>
                        </div>
                        <div class="col-sm-4" >
                            <label class="tour-label">Thời gian đi</label>
                            <span class="lbScheduleTime-{{$scheduleLoop->estimatedTime}}">
                                {{ !empty($scheduleLoop->actualDuration) ? seconds2human($scheduleLoop->actualDuration) : (!empty($scheduleLoop->estimatedTime) ? seconds2human($scheduleLoop->estimatedTime) : '--')}}
                            </span>
                        </div>
                        <div class="col-sm-4" >
                            <label class="tour-label">Giờ kết thúc</label>
                            <span class="lbScheduleTime-{{$scheduleLoop->estimatedDate}}">
                                {{ !empty($scheduleLoop->actualEndedDate) ? date('H:i', $scheduleLoop->actualEndedDate/1000)  : (!empty($scheduleLoop->estimatedDate) ? date('H:i',$scheduleLoop->estimatedDate/1000) : '--')}}
                            </span>
                        </div>
                    </div>
                @endif

                <div class="row">
                    <div class="col-sm-12" >
                        <label class="tour-label">Nhân viên dẫn tour</label>
                        <span>{{$scheduleLoop->assignedToName}}</span>
                    </div>
                </div>
                <div>
                    <label class="tour-label">Ghi chú</label>
                    <div class="tour-note-val">{{$scheduleLoop->note}}</div>
                </div>
                <?php if ($scheduleLoop->isFeedback): ?>
                    <div style="margin-bottom: 16px;">
                        <button class="btn btn-warning btn-view-feedback" data-schedule-id="{{$scheduleLoop->scheduleId}}">Phản hồi</button>
                    </div>
                <?php endif; ?>
                <?php if ($scheduleLoop->scheduleListings): ?>
                    <table class="table table-bordered table-view">
                        <thead>
                            <tr>
                                <th>LID</th>
                                <th>Địa chỉ</th>
                                <!-- <th>Số điện thoại chủ nhà</th> -->
                                @if($type == "canceled")
                                <th>Giờ đi xem <br> (Dự kiến)</th>
                                @else
                                <th>Giờ đi xem</th>
                                @endif
                                <!--<th>Thứ tự đi xem</th>-->
                                <th>Ghi chú</th>
                                <th class="hidden">Phản hồi</th>
                                <th class="hidden">Trạng thái</th>
                                <th>Kết quả đi xem</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $disabledArr = [];
                            foreach ($scheduleLoop->scheduleListings as $listing):
                                if($listing->isDismiss) {
                                    array_push($disabledArr, $listing);
                                } else {
                                    renderTr($scheduleLoop, $listing, $type);
                                }
                            endforeach;
                            foreach ($disabledArr as $listing):
                                renderTr($scheduleLoop, $listing, $type);
                            endforeach;
                            ?>
                        </tbody>
                    </table>
                <?php endif; ?>


                <div style="margin-top:16px;">
                    <?php renderScheduleSupports($scheduleLoop->scheduleId, $type); ?>
                </div>
            </div>
        </section>
        <?php
    endforeach;
}
?>
@extends('layout.default')

@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard deal-tour'>
    <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
    <input type="hidden" id="dealId" value="{{$schedule->dealId}}" />
    
    <section class="box box-primary schedule-box">
        <div class="box-header with-border">
            <h3 class="box-title">Quản lý Tours</h3>
        </div>
        <div class="box-body">
            <div class="row">
                <div class="col-sm-12" >
                    <div class="row" >
                        <label class="col-sm-1 control-label">Tên KH</label>
                        <div class="col-sm-11 control-label">{{$schedule->customerName}}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php
    if ($schedule->presentList):
        renderPresentSchedule($schedule->presentList, 'Tour đang đi xem', TRUE, FALSE);
    endif;
    ?>
    <?php
    if ($schedule->furtureList):
        renderPresentAndFutureSchedule($schedule->furtureList, 'Tour sẽ đi xem', TRUE, FALSE, $isTMUser);
    endif;
    ?>

    <?php        
    if ($schedule->pastList):
        renderCancelAndPastList($schedule->pastList, "past", "Tour đã hoàn thành");
    endif;
    if ($schedule->cancelList):
        renderCancelAndPastList($schedule->cancelList, "canceled", "Đã hủy tour");
    endif;
    if ($schedule->stopList):
        renderCancelAndPastList($schedule->stopList, "stop", "Dừng đi xem tour");
    endif;
    ?>
</div>


<!-- add listings -->
<div id="modalAddListings" class="modal fade " role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">       
            <div class="modal-body">
                <input type="hidden" class="scheduleId" value="" />
                @include('deal.panel-customer-cart', ['showType'=>'add_listing_to_schedule'])
            </div>
            <!--
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            -->
        </div>

    </div> 
</div>
<!-- end add listings -->
@endsection


@include('deal.modal-ping-manager')
@include('deal.modal-feedback')
@include("tour.modal-request-update-tour")

@section('modal-container')
    @include("deal.modal-update-schedule-time")
@endsection


<!-- cancel tour -->
<div id="modalCancelTour" class="modal fade " role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">       
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Lý do hủy tour</h4>
            </div>
            <div class="modal-body">
                <input type="hidden" class="schedule-id" value="" />
                <input type="hidden" class="listing-id" value="" />
                <input type="hidden" class="type" value="tour" />
                <div class="errors"></div>
                <div class="reasons"></div>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-warning btn-save martop-txt">Lưu</a>
            </div>
        </div>

    </div>
</div>
<!-- end cancel tour -->

<!-- make call -->
<div id="modalReassign" class="modal fade " role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">       
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Thay đổi nhân viên dẫn tour</h4>
            </div>
            <div class="modal-body">
                <input type="hidden" class="socialUid" name="socialUid" value="" />
                <input type="hidden" class="scheduleId" name="scheduleId" value="" />
                <div class="form-group row">
                    <label class="col-sm-3">Nhân viên dẫn tour mới</label>
                    <div class="col-sm-9">
                        <select class="assignee-select form-control" style="width: 100%"><option value=''>Đang tải ...</option></select>
                        <div class="errors" ></div>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-3">Ghi chú</label>
                    <div class="col-sm-9">
                        <textarea class="note form-control" rows="6" placeholder="Nhập ghi chú lý do thay đổi nhân viên dẫn tour"></textarea>
                        <div class="errors"></div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn-save-reassign btn btn-success">Lưu</button>
            </div>
        </div>

    </div>
</div>
<!-- end make call -->


@extends('templates.amenities-item')
@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"></script>
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>

<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datetimepicker/bootstrap-datetimepicker.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>
<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script type="text/javascript">
    var supportId = "{{$supportId}}";
    var dealId = "{{$schedule->dealId}}";
    var leadId = "{{$schedule->leadId}}";    
</script>

<script src="{{loadAsset("/js/deal/tour.js")}}"></script>
<script src="{{loadAsset("/js/deal/schedule.js")}}"></script>
<script type="text/javascript" src="/js/jm_commons/leadDealDetail/scripts.js"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datetimepicker/bootstrap-datetimepicker.min.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.min.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<style>
    .errors{
        color:#f00;
    }
    .datepicker {
        z-index: 100000 !important;
    }
    .pac-container{ 
        z-index: 100000 !important;        
    }
    #image-slider{
        z-index:999999999;
    }
    #makeScheduleModal{
        padding-right: 0px !important;
    }
    #makeScheduleModal .modal-dialog{
        width: 100% !important;
        margin:0 auto;
    }

    .ui-autocomplete{
        z-index: 1000000;
        background: #fff;
    }
    .tableAgents_wrapper{
        position: absolute;
        z-index: 100000;
        background: #fff;
        width: 100%;
        box-shadow: 2px 2px 2px 2px #aaa;
        padding:6px;
    }

    .tour-canceled .box-title{
        color:#f00;        
    }

    .tour-label {
        width: 150px;
    }

    .tour-note-val {
        display: inline-block;
        width: calc(100% - 140px);
        vertical-align: top;
    }

    .schedule-box .table tr td:nth-child(1) {
        width: 90px;
    }

    .schedule-box .table tr td:nth-child(2) {
        width: 30%;
    }

    .schedule-box .table tr td:nth-child(3) {
        width: 130px;
    }

    .schedule-box .table tr td:nth-child(4) {
        width: 30%;
    }

    .schedule-box .table .order-col {
        width: 50px;
    }

    .input-group .input-group-addon {
        background-color: transparent;
    }
</style>
@stop
