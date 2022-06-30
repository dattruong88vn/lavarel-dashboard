@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='page-request'>
    <form method="post" id="formCustomerInfo" class="form-horizontal">
        <section>
            <div class="db-tm-item deal-tm-customer-info">
                <div class="row">
                    <div class="col-md-12">                
                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <h3 class="box-title">THÔNG TIN VÀ NHU CẦU KHÁCH HÀNG {{$request->customerId}}</h3>
                            </div>
                            <input type="hidden" id="customerId" name="customerId" value="{{$request->customerId}}" />
                            <input type="hidden" id="requestId" name="requestId" value="{{$request->requestId}}" />
                            <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-sm-5">
                                        <div class="form-group">
                                            <label for="" class="col-sm-4 control-label">Tên khách hàng *</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="customerName" name="customerName" placeholder="Tên khách hàng" value="{{$request->customers->name}}"  placeholder="N/A">
                                                <div class="errors"></div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="" class="col-sm-4 control-label">Phone</label>
                                            <div class="col-sm-6">
                                                <div class="input-group">
                                                    <input id="customerPhone" name="customerPhone" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" class="form-control " value="{{$request->customers->phone}}" placeholder="N/A" />
                                                    <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                                </div>
                                                <div class="errors"></div>
                                            </div>
                                            <div class="col-sm-2">
                                                <button type="button" id="checkphone" >Check</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="" class="col-sm-4 control-label">Email</label>
                                            <div class="col-sm-6">
                                                <div class="input-group">
                                                    <input type="email" name="customerEmail" id="customerEmail" class="form-control"  value="{{$request->customers->email}}" placeholder="N/A" />
                                                    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                                                </div>
                                                <div class="errors"></div>
                                            </div>
                                            <div class="col-sm-2">
                                                <button type="button" id="checkEmail" >Check</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="" class="col-sm-4 control-label">Hình thức giao dịch *</label>
                                            <div class="col-sm-8">
                                                <?php
                                                $listingTypes = array(
                                                    1 => 'Mua',
                                                    2 => 'Thuê'
                                                );
                                                ?>
                                                <select id="listingTypeId" name="listingTypeId" class="form-control">
                                                    <option value="">N/A</option>
                                                    <?php foreach ($listingTypes as $key => $value): ?>
                                                        <option value={{$key}} <?php echo $key == $request->listingTypeId ? "selected='selected'" : ""; ?> >{{$value}}</option>
                                                    <?php endforeach; ?>
                                                </select>

                                                <div class="errors" ></div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="" class="col-sm-4 control-label">Loại bất động sản</label>
                                            <div class="col-sm-8">
                                                <select name="propertyTypeId" id="propertyTypeId" class="form-control" style="width: 100%;">
                                                    <option value="">N/A</option>
                                                    <?php foreach ($propertyTypes as $propertyType): ?>
                                                        <option value="{{$propertyType->propertyTypeID}}" <?php echo $propertyType->propertyTypeID == $request->propertyTypeId ? "selected='selected'" : ""; ?> >{{$propertyType->typeName}}</option>
                                                    <?php endforeach; ?>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-7">
                                        <div class="form-group">
                                            <label for="" class="col-sm-2 control-label">Quận (*)</label>
                                            <div class="col-sm-10">
                                                <div class="errors district-errors"></div>
                                                <?php foreach ($districts as $district): ?>
                                                    <div class="col-sm-6" >
                                                        <label>
                                                            <input class="districts" type="checkbox" name="districtId[]" value="{{$district->districtId}}" <?php echo in_array($district->districtId, $currentDistricts) ? "checked='checked'" : ""; ?>>
                                                            {{$district->districtName}}
                                                        </label>
                                                        <span>
                                                            <input type="radio" name="isPrefered" class="isPrefered" value="{{$district->districtId}}" <?php echo $district->districtId == $isPreferedDistrict ? "checked='checked'" : ""; ?> >
                                                            Prefered
                                                        </span>
                                                    </div>
                                                <?php endforeach; ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Ngân sách ban đầu<br/>(dự trù)</label>
                                    <div class="col-sm-4">
                                        <input id="initialBudget" name="initialBudget" type="text" class="form-control" value="{{$request->initialBudget}}" placeholder="N/A" />
                                    </div>
                                    <label for="" class="col-sm-1 control-label">ĐẾN</label>
                                    <div class="col-sm-3">
                                        <input id="finalBudget" name="finalBudget" type="text" class="form-control" value="{{$request->finalBudget}}" placeholder="N/A"  />
                                    </div>
                                    <div class="col-sm-2">
                                        <?php
                                        $currencies = array(
                                            "VND" => "VND",
                                            "USD" => "USD"
                                        );
                                        ?>
                                        <select id="currency" name="currency" class="form-control" >
                                            <?php foreach ($currencies as $key => $value): ?>
                                                <option value="{{$key}}" <?php echo $key == $request->currency ? "selected='selected'" : ""; ?> >{{$value}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Ngân sách ban đầu<br/>(Fixed)</label>
                                    <div class="col-sm-4">
                                        <input id="initialBudgetFixed" name="initialBudgetFixed" type="text" value="{{number_format($request->initialBudgetFixed)}}" class="form-control" placeholder="N/A" />
                                    </div>

                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Diện tích:</label>
                                    <div class="col-sm-4">
                                        <input id="minSize" name="minSize" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" class="form-control " placeholder="m2" value="{{$request->minSize}}" placeholder="N/A" />
                                        <div class="errors"></div>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">to</label>
                                    <div class="col-sm-4">
                                        <input id="maxSize" name="maxSize" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" class="form-control" placeholder="m2" value="{{$request->maxSize}}" placeholder="N/A" />
                                        <div class="errors"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Hướng:</label>
                                    <div class="col-sm-10">
                                        <?php foreach ($directions as $direction): ?>
                                            <div class="checkbox col-sm-3" >
                                                <label class="no-bold"><input type="checkbox" value="{{$direction->dId}}" name="directions[]" class="directions direction-{{$direction->dId}}" <?php echo in_array($direction->dId, $currentDirections) ? "checked='checked'" : "" ?> /> {{$direction->directionName}}</label>
                                                <label><input type="radio" name="isPreferedDirection" class="isPreferedDirection" value="{{$direction->dId}}" <?php echo in_array($direction->dId, $currentDirections) ? "checked='checked'" : ""; ?> />Prefered</label>
                                            </div>
                                        <?php endforeach; ?>

                                        <div class="checkbox col-sm-3" >
                                            <label class="no-bold"><input type="checkbox" value="tay_tu_trach" class=" directions chon_tu_trach" /> Tây tứ trạch</label>
                                        </div>
                                        <div class="checkbox col-sm-3" >
                                            <label class="no-bold"><input type="checkbox" value="dong_tu_trach" class="directions chon_tu_trach" /> Đông tứ trạch</label>
                                        </div>
                                        <div class="errors"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Lưu ý khác</label>
                                    <div class="col-sm-10">
                                        <textarea id="note" name="note" class="form-control" placeholder="Lưu ý khác">{{$request->note}}</textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Phòng ngủ:</label>
                                    <div class="col-sm-4">
                                        <input id="bedRooms" name="bedRooms" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" class="form-control" value="{{$request->bedRooms}}" placeholder="N/A"  />
                                    </div>
                                    <label for="" class="col-sm-2 control-label">Phòng tắm:</label>
                                    <div class="col-sm-4">
                                        <input id="bathRooms" name="bathRooms" onkeypress='return event.charCode >= 48 && event.charCode <= 57' type="text" class="form-control" value="{{$request->bathRooms}}" placeholder="N/A"   />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Tiện ích</label>
                                    <div class="col-sm-10" id="amenities">
                                        <div class="amenity-content">
                                            <?php 
                                                $child = [];
                                                foreach ($amenities as $key => $value) {
                                                    if(count($value->amenityChild)>0){
                                                        $child[] = $amenities[$key];
                                                        unset($amenities[$key]);
                                                    }
                                                }

                                                usort($child, function ($a, $b){
                                                    return  count($a->amenityChild) - count($b->amenityChild);
                                                });
                                                // $amenities = array_merge($amenities,$child);
                                            ?>
                                            <div class="notChild">
                                                <?php foreach ($amenities as $amenity): ?>
                                                    
                                                            <div class="col-md-4 utilitie-item-content">
                                                                <div class="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenity->amenityName}}" value="{{$amenity->id}}" <?php echo in_array($amenity->id, $currentAmenities) ? "checked='checked'" : ""; ?> />
                                                                        {{$amenity->amenityName}}
                                                                    </label>
                                                                </div>
                                                                @if( count( $amenity->amenityChild ) > 0 )
                                                                <div style="padding-left: 10px; border-left: 1px solid #dedede" class="amenityc-child-content" data="3">
                                                                    <?php foreach ($amenity->amenityChild as $amenityChild): ?>
                                                                        <div class="checkbox">
                                                                            <label>
                                                                                <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenityChild->amenityName}}" value="{{$amenityChild->id}}" <?php echo in_array($amenityChild->id, $currentAmenities) ? "checked='checked'" : ""; ?>  />
                                                                                {{$amenityChild->amenityName}}
                                                                            </label>
                                                                        </div>
                                                                    <?php endforeach; ?>
                                                                </div>
                                                                @endif
                                                            </div>
                                                    
                                                <?php endforeach; ?>
                                            </div>

                                            <div class="hasChild">
                                                <?php foreach ($child as $amenity): ?>
                                                    
                                                            <div class="col-md-4 utilitie-item-content">
                                                                <div class="checkbox">
                                                                    <label>
                                                                        <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenity->amenityName}}" value="{{$amenity->id}}" <?php echo in_array($amenity->id, $currentAmenities) ? "checked='checked'" : ""; ?> />
                                                                        {{$amenity->amenityName}}
                                                                    </label>
                                                                </div>
                                                                @if( count( $amenity->amenityChild ) > 0 )
                                                                <div style="padding-left: 10px; border-left: 1px solid #dedede" class="amenityc-child-content" data="3">
                                                                    <?php foreach ($amenity->amenityChild as $amenityChild): ?>
                                                                        <div class="checkbox">
                                                                            <label>
                                                                                <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenityChild->amenityName}}" value="{{$amenityChild->id}}" <?php echo in_array($amenityChild->id, $currentAmenities) ? "checked='checked'" : ""; ?>  />
                                                                                {{$amenityChild->amenityName}}
                                                                            </label>
                                                                        </div>
                                                                    <?php endforeach; ?>
                                                                </div>
                                                                @endif
                                                            </div>
                                                    
                                                <?php endforeach; ?>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Ngày dự tính dọn vào</label>
                                    <div class="col-sm-4">
                                        <div class="input-group date" data-provide="datepicker">
                                            <?php
                                            if ($request->moveInDate) {
                                                $request->moveInDate = date('m/d/Y', $request->moveInDate / 1000);
                                            } else {
                                                $request->moveInDate = NULL;
                                            }
                                            ?>
                                            <input id="moveInDate" name="moveInDate" class="form-control" value="{{$request->moveInDate}}" placeholder="N/A" >
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>                                            
                                        </div>
                                        <div class="errors"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Nguồn *</label>
                                    <div class="col-sm-4">
                                        <select id="sourceId" name="sourceId" class="form-control">
                                            <option value="">N/A</option>
                                            <?php foreach ($sources as $source): ?>
                                                <option value="{{$source->sourceId}}" <?php echo $source->sourceId == $request->sourceId ? "selected='selected'" : ""; ?> >{{$source->sourceName}}</option>
                                            <?php endforeach; ?>

                                        </select>
                                        <textarea id="sourceOther" name="sourceOther" class="form-control" rows="4" placeholder="Nhập nguồn khác" style="display: none">{{$request->sourceOther}}</textarea>
                                        <input type="hidden" id="sourceName" name="sourceName" value="" />
                                        <div class="errors" ></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Status</label>
                                    <div class="col-sm-4">
                                        <select id="statusId" name="statusId"  class="form-control">
                                            <option value="">N/A</option>
                                            <?php foreach ($statusList as $status): ?>
                                                <option value="{{$status->statusId}}" <?php echo $status->statusId == $request->statusId ? "selected='selected'" : ""; ?> >{{$status->statusName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" name="statusName" id="statusName" value="" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Responsible person</label>
                                    <div class="col-sm-4">
                                        <select id="assignedTo" name="assignedTo"  class="form-control">
                                            <option value="">N/A</option>
                                            <option value={{$userId}}  <?php echo $userId == $request->assignedTo ? "selected='selected'" : ""; ?>  >{{$userName}}</option>
                                            <?php
                                            if ($accounts):
                                                foreach ($accounts as $account):
                                                    ?>
                                                    <option value="{{$account->userId}}" <?php echo $account->userId == $request->assignedTo ? "selected='selected'" : ""; ?>  >{{$account->name}}</option>
                                                    <?php
                                                endforeach;
                                            endif;
                                            ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Đối tượng *</label>
                                    <div class="col-sm-4">
                                        <select id="subjectId" name="subjectId" class="form-control">
                                            <option value="">N/A</option>
                                            <?php foreach ($subjects as $subject): ?>
                                                <option value="{{$subject->subjectId}}" <?php echo $subject->subjectId == $request->subjectId ? "selected='selected'" : ""; ?>  >{{$subject->subjectName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" name="subjectName" id="subjectName" value="" />
                                        <div class="errors" ></div>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">Thiết bị</label>
                                    <div class="col-sm-4">
                                        <?php
                                        $devices = array(
                                            "N/A",
                                            "Desktop",
                                            "Mobile"
                                        );
                                        ?>
                                        <select id="device" name="device" class="form-control">
                                            <option value="">N/A</option>
                                            <?php foreach ($devices as $key => $value): ?>
                                                <option value="{{$value}}" <?php echo $value == $request->device ? "selected='selected'" : ""; ?>  >{{$value}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Do môi giới nào giới thiệu?</label>
                                    <div class="col-sm-4">
                                        <select id="agentId" name="agentId">
                                            <option value="">N/A</option>
                                            <?php foreach ($agents as $agent): ?>
                                                <option value="{{$agent->agentId}}" <?php echo $agent->agentId == $request->agentId ? "selected='selected'" : ""; ?>  >{{$agent->name}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="hidden" name="agentName" id="agentName" value="" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Khả năng đáp ứng thị trường (%)</label>
                                    <div class="col-sm-4">
                                        <input id="responsiveness" name="responsiveness" type="number" class="form-control" value="{{$request->responsiveness}}" placeholder="N/A" />
                                    </div>
                                </div>
                                <div class="btn-group-request" style="position:fixed;bottom:0px;right:0px;z-index: 100000000">
                                    <button type="button" id="createLead" class="btn btn-success">Tạo lead</button>
                                    <button type="button" id="saveAndUpdate" class="btn btn-warning margin">Lưu Request và update sau</button>
                                </div>
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>

            <div class="db-tm-item deal-tm-customer-need hidden">
                <div class="row">
                    <div class="col-md-12">                
                        <div class="box box-primary">
                            <div class="box-body">
                                <table id="pending-requests"  class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>LID</th>
                                            <th>Bed</th>
                                            <th>Bath</th>
                                            <th>Size</th>
                                            <th>Price (USD)</th>
                                            <th>Price (in VNĐ)</th>
                                            <th>Location</th>
                                            <th>Source</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php for ($i = 0; $i < 6; $i++): ?>
                                            <tr>
                                                <td>{{$i}}</td>
                                                <td>{{$i}}</td>
                                                <td>{{$i}}</td>
                                                <td>{{$i}}</td>
                                                <td>{{$i}}</td>
                                                <td>{{$i}}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        <?php endfor; ?>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </form>
</div>

<!-- agent call -->
<div id="agentCallReminderModal" class="modal fade db-tm-item" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-center">THÔNG BÁO</h4>
            </div>
            <div class="modal-body">
                <h4>Số điện thoại này có thể thuộc về môi giới sau đây:</h4>
                <div class="form-group row">
                    <div class="col-sm-3">
                        <img src="http://dummyimage.com/600x400" class="thumbnail" style="width:100%" />
                    </div>
                    <div class="col-sm-9">
                        <table id="agent-info"  class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Tên</th>
                                    <th>Chuyên môn</th>
                                    <th>SDT</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="text-center">
                        <a href="#" class="margin"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a>
                        <a href="#" class="margin"><span class="icon-st-item"><i class="fa fa-envelope"></i></span></a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<!-- end agent call -->

<!-- agent call -->
<div id="customerCallReminderModal" class="modal fade db-tm-item" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-center">THÔNG BÁO</h4>
            </div>
            <div class="modal-body">
                <h4>Số điện thoại này có thể thuộc về khách hàng sau đây:</h4>
                <div class="form-group row">
                    <div class="col-sm-3">
                        <img src="http://dummyimage.com/600x400" class="thumbnail" style="width:100%" />
                    </div>
                    <div class="col-sm-9">
                        <table id="agent-info"  class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Tên</th>
                                    <th>Trạng thái của giao dịch gần đây nhất</th>
                                    <th>SDT</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="text-center">
                        <a href="#" class="margin"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a>
                        <a href="#" class="margin"><span class="icon-st-item"><i class="fa fa-envelope"></i></span></a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<!-- end agent call -->

<!-- modalMissingInfo -->
<div id="modalMissingInfo" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Thông tin bị thiếu.</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <div class="col-sm-12">
                        <textarea id="areaMissingInfo" name="areaMissingInfo" rows="6" class="form-control">{{$request->missingInfo}}</textarea>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button id="saveAndUpdate_step_2" type="button" class="btn btn-primary">Lưu Request và update sau</button>
                {{--<button type="button" class="btn btn-default" data-dismiss="modal">Lưu Request và update sau</button>--}}
            </div>
        </div>

    </div>
</div>
<!-- end modalMissingInfo -->

@endsection



@extends('templates.amenities-item')
@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<script src="{{loadAsset("js/helper.js")}}"></script>

<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script type="text/javascript" src="{{loadAsset("js/request/common.js")}}"></script>
<script>
<?php if ($request->leadAssignTo): ?>
    $(".btn").remove();
<?php endif; ?>
</script>
<script type="text/javascript" src="{{loadAsset("js/request/update.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/css/listing-create.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<style>
    .errors{
        color:#f00;
    }
</style>
@stop