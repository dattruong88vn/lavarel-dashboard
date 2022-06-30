@extends('layout.default')
@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
    <form method="post" id="formCustomerInfo" class="form-horizontal">
        <section>
            <div>
                @include('lead.header-nav')
            </div>
            <div class="db-tm-item deal-tm-customer-info">
                <div class="row">
                  <div class="col-xs-12">
                    <h2 class="title-with-line"><span>THÔNG TIN CHUNG</span></h2>
                    <div class="box box-primary">
                      <div class="box-body">
                        <strong>Cập nhật lần cuối vào:</strong>
                        <p class="text-muted">
                            12-01-1991 00:00:00
                        </p>
                        <hr>
                        <strong>Trạng thái:</strong>
                        <p class="text-muted">
                            LEAD
                        </p>
                        <hr>
                        <strong>Tiến độ:</strong>
                        <div class="row margin">
                          <div class="col-sm-12">
                            <div class="range">
                              <input type="range" min="1" max="4" value="2">
                            </div>

                            <ul class="range-labels">
                              <li>Lead mới</li>
                              <li class="active selected">Tìm kiếm</li>
                              <li >Tư vấn</li>
                              <li >Meeting</li>
                            </ul>
                          </div>
                        </div>
                      <hr>
                      <div>
                        <a class="btn btn-app">
                          <i class="fa fa-mail-forward "></i> Reassign
                        </a>
                        <a class="btn btn-app">
                          <i class="fa fa-remove "></i> Hủy lead
                        </a>
                      </div>
                    </div>
                      </div><!-- /.box-body -->
                    </div><!-- /.box -->
                  </div><!-- /.col -->
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="title-with-line"><span>THÔNG TIN KHÁCH HÀNG</span></h2>
                        <div class="box box-primary">
                                <div class="box-body">
                                  <strong>Tên:</strong>
                                  <p class="text-muted">
                                      {{isset($request->customers)?$request->customers->name:"N/A"}} <!-- <a href="#" class="label label-danger"><i class="fa fa-phone"></i></a> <a href="#" class="label label-success"><i class="fa fa-envelope"></i></a> -->
                                  </p>

                                  <hr>

                                  <strong>Nguồn:</strong>
                                  <p class="text-muted">
                                      @foreach ($sources as $source)
                                        @if($source->sourceId == $request->sourceId)
                                            {{$source->sourceName}}
                                        @endif
                                      @endforeach
                                  </p>

                                  <hr>

                                  <strong>Đối tượng:</strong>
                                  <p class="text-muted">
                                    @foreach ($subjects as $subject)
                                        @if($subject->subjectId == $request->subjectId)
                                            {{$subject->subjectName}}
                                        @endif
                                    @endforeach
                                  </p>
                                  <hr>
                                  <div>
                                    <a class="btn btn-app">
                                      <i class="fa fa-phone"></i> Gọi
                                    </a>
                                    <a class="btn btn-app">
                                      <i class="fa fa-envelope"></i> Email
                                    </a>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- NHU CẦU -->
                    <div class="row">
                        <div class="col-md-12">
                            <h2 class="title-with-line"><span>THÔNG TIN NHU CẦU</span></h2>
                            
                            <div class="box box-primary">
                                    <div class="box-body">
                                            <strong>Tỉnh thành:</strong>
                                            <p class="text-muted">
                                                api chưa có
                                            </p>

                                            <hr>
                                            <strong>Hình thức giao dịch:</strong>
                                            <p class="text-muted">
                                                <?php
                                                $listingTypes = array(
                                                    1 => 'Mua',
                                                    2 => 'Thuê'
                                                );
                                                ?>
                                              <?php foreach ($listingTypes as $key => $value): ?>
                                                  <?php if($key == $request->listingTypeId): ?>
                                                      {{$value}}
                                                  <?php endif; ?>
                                              <?php endforeach; ?>
                                            </p>

                                            <hr>

                                            <strong>Loại bất động sản:</strong>
                                            <p class="text-muted">
                                                <?php foreach ($propertyTypes as $propertyType): ?>
                                                  <?php if($propertyType->propertyTypeID == $request->propertyTypeId): ?>
                                                      {{$propertyType->typeName}}
                                                  <?php endif; ?>
                                              <?php endforeach; ?>
                                            </p>

                                            <hr>
                                            <strong>Quận:</strong>
                                            <p class="text-muted">
                                                <?php foreach ($districts as $district): ?>                              
                                                    <?php if(in_array($district->districtId, $currentDistricts)): ?>
                                                        
                                                                <a 
                                                                    @if($district->districtId != $isPreferedDistrict)
                                                                        style="color:#777;"
                                                                    @else
                                                                        style="font-weight: bold;"
                                                                    @endif
                                                                href="#"> {{$district->districtName}} </a> &nbsp;&nbsp;
                                                    <?php endif; ?> 
                                                <?php endforeach; ?>
                                            </p>

                                            <hr>
                                            <div class="row">
                                                <div class="col-md-6" >
                                                    <strong>Ngăn sách tối thiểu:</strong>
                                                    <p class="text-muted">
                                                        {{number_format($request->initialBudgetFixed)}}
                                                    </p>
                                                </div>
                                                <div class="col-md-6" >
                                                    <strong>Ngân sách tối đa:</strong>
                                                    <p class="text-muted">
                                                        {{($lead->finalBudget!=''?$request->finalBudget:'N/A')}}
                                                    </p>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <strong>Diện tích tối thiểu:</strong>
                                                    <p class="text-muted">
                                                        {{($request->minSize!=''?$request->minSize:'N/A')}}
                                                    </p>
                                                </div>
                                                <div class="col-md-6">
                                                    <strong>Diện tích tối đa:</strong>
                                                    <p class="text-muted">
                                                        {{($request->maxSize!=''?$request->maxSize:'N/A')}}
                                                    </p>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <strong>Phòng ngủ:</strong>
                                                    <p class="text-muted">
                                                        {{($request->bedRooms!=''?$request->bedRooms:'N/A')}}
                                                    </p>
                                                </div>
                                                <div class="col-md-6">
                                                    <strong>Phòng tắm:</strong>
                                                    <p class="text-muted">
                                                        {{($request->bathRooms!=''?$request->bathRooms:'N/A')}}
                                                    </p>
                                                </div>
                                            </div>
                                            <hr>
                                            <strong>Ngày dự tính dọn vào:</strong>
                                            <p class="text-muted">
                                                <?php
                                                if ($request->moveInDate) {
                                                    $request->moveInDate = date('m/d/Y', $request->moveInDate / 1000);
                                                } else {
                                                    $request->moveInDate = NULL;
                                                }
                                                ?>
                                                {{($request->moveInDate!=''?$request->moveInDate:'N/A')}}
                                            </p>

                                            <hr>
                                            <strong>Khả năng đáp ứng của thị trường:</strong>
                                            <p class="text-muted">
                                                {{($lead->responsiveness!=''?$lead->responsiveness:'N/A')}}
                                            </p>

                                            <hr>

                                            <strong>Hướng:</strong>
                                            <p class="text-muted">
                                                <?php $i=0; ?>
                                                <?php foreach ($directions as $direction): ?>
                                                    <?php if(in_array($direction->dId, $currentDirections)): ?>
                                                        <a href="#"
                                                            @if($isPreferedDirection == $direction->dId)
                                                                style="font-weight:bold;"
                                                            @else
                                                                style="color:#fff;"
                                                            @endif
                                                        >
                                                            {{$direction->directionName}}
                                                        </a>
                                                        <?php if($isPreferedDirection == $direction->dId): ?>
                                                        <?php $i++; endif; ?>
                                                    <?php endif; ?> 
                                                <?php endforeach; ?>
                                                <?php if($i == 0): ?>
                                                    N/A
                                                <?php endif; ?>
                                            </p>

                                            <hr>

                                            <strong>Vị trí:</strong>
                                            <p class="text-muted">
                                                api chưa có
                                            </p>

                                            <hr>

                                            <strong>Năm xây dựng:</strong>
                                            <p class="text-muted">
                                                api chưa có
                                            </p>

                                            <hr>

                                            <strong>Tiện ích:</strong>
                                            <p class="text-muted">
                                                cái này style lại
                                            </p>

                                            <hr>
                                            
                                        <!-- end left -->
                                    </div>
                            </div>
                        </div>
                    </div> <!-- END NHU CẤU -->


                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <h3 class="box-title">KHÁCH HÀNG</h3>
                            </div>
                            <input type="hidden" id="customerId" name="customerId" value="{{$lead->customerId}}" />
                            <input type="hidden" id="requestId" name="requestId" value="{{$lead->requestId}}" />
                            <input type="hidden" id="leadId" name="leadId" value="{{$lead->leadId}}" />
                            <input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Tên KH *</label>
                                            <div class="col-sm-12">
                                                <p class="form-control-static">{{isset($request->customers)?$request->customers->name:"N/A"}}</p>
												<input type="hidden" id="customerName" name="customerName" value="{{isset($request->customers)?$request->customers->name:""}}"/>
                                                <div class="errors"></div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <?php
                                            if ($lead->dealId == null) {
                                                echo '<label for="" class="col-sm-12">Phone</label>';
                                            }
                                            ?>                                            
                                            <div class="col-sm-12">
                                                <?php
                                                if ($lead->dealId == null) {
                                                    ?>
                                                    <div class="input-group">
                                                        <input id="customerPhone" name="customerPhone" type="hidden" value="{{isset($request->customers)?$request->customers->phone:""}}"/>
                                                    </div>
                                                    <?php
                                                } else {
                                                    ?>													
                                                    <input id="customerPhone" name="customerPhone" type="hidden" class="form-control" value="{{isset($request->customers)?$request->customers->phone:""}}" placeholder="N/A" />
                                                    <?php
                                                }
                                                ?>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Email</label>
                                            <div class="col-sm-12">
                                                <div class="input-group">
                                                    <p class="form-control-static">{{isset($request->customers)?$request->customers->email:"N/A"}}</p>
													<input type="hidden" name="customerEmail" id="customerEmail" value="{{isset($request->customers)?$request->customers->email:""}}"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Nguồn</label>
                                            <div class="col-sm-12">
                                                <select id="sourceId" name="sourceId" class="hidden">
                                                    <?php foreach ($sources as $source): ?>
                                                        <option value="{{$source->sourceId}}" <?php echo $source->sourceId == $request->sourceId ? "selected='selected'" : ""; ?> >{{$source->sourceName}}</option>
                                                    <?php endforeach; ?>
                                                </select>
												<?php foreach ($sources as $source): ?>
													<?php if($source->sourceId == $request->sourceId): ?>
														<p class="form-control-static">{{$source->sourceName}}</p>
													<?php endif; ?>
												<?php endforeach; ?>
                                                <textarea id="sourceOther" name="sourceOther" class="form-control" rows="4" placeholder="Nhập nguồn khác" style="display: none">{{$request->sourceOther}}</textarea>
                                                <input type="hidden" id="sourceName" name="sourceName" value="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Do môi giới nào giới thiệu?</label>
                                            <div class="col-sm-12">
                                                <div name="agentName" class="agentName" value="" >{{!empty($lead->agentName)?$lead->agentName:'N/A'}}<br />{{$lead->agentPhone?"":$lead->agentPhone}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Đối tượng</label>
                                            <div class="col-sm-12">
                                                <?php foreach ($subjects as $subject): ?>
													<?php if($subject->subjectId == $request->subjectId): ?>
														<p class="form-control-static">{{$subject->subjectName}}</p>
													<?php endif; ?>
												<?php endforeach; ?>
												<select id="subjectId" name="subjectId" class="hidden">
                                                    <?php foreach ($subjects as $subject): ?>
                                                        <option value="{{$subject->subjectId}}" <?php echo $subject->subjectId == $request->subjectId ? "selected='selected'" : ""; ?>  >{{$subject->subjectName}}</option>
                                                    <?php endforeach; ?>
                                                </select>
                                                <input type="hidden" name="subjectName" id="subjectName" value="" />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <h3 class="box-title">GIAO DỊCH</h3>
                                <label class="control-label hidden"><input type="checkbox" id="isSpecialDeal" <?php echo!empty($lead->meetingId) ? "checked" : ""; ?> /> Special Deal</label>
                            </div>
                            <div class="box-body">
                                <div class="row hidden">
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
                                            <?php foreach ($devices as $key => $value): ?>
                                                <option value="{{$value}}" <?php echo $value == $request->device ? "selected='selected'" : ""; ?>  >{{$value}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Hình thức giao dịch *</label>
                                                    <div class="col-sm-12">
                                                        <?php
                                                        $listingTypes = array(
                                                            1 => 'Mua',
                                                            2 => 'Thuê'
                                                        );
                                                        ?>
														<?php foreach ($listingTypes as $key => $value): ?>
															<?php if($key == $request->listingTypeId): ?>
																<p class="form-control-static">{{$value}}</p>
															<?php endif; ?>
														<?php endforeach; ?>
                                                        <select id="listingTypeId" name="listingTypeId" class="hidden">
                                                            <?php foreach ($listingTypes as $key => $value): ?>
                                                                <option value={{$key}} <?php echo $key == $request->listingTypeId ? "selected='selected'" : ""; ?> >{{$value}}</option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6" >
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Loại bất động sản</label>
                                                    <div class="col-sm-12">
                                                        <?php foreach ($propertyTypes as $propertyType): ?>
															<?php if($propertyType->propertyTypeID == $request->propertyTypeId): ?>
																<p class="form-control-static">{{$propertyType->typeName}}</p>
															<?php endif; ?>
														<?php endforeach; ?>
														<select name="propertyTypeId" id="propertyTypeId" class="hidden">
                                                            <?php foreach ($propertyTypes as $propertyType): ?>
                                                                <option value="{{$propertyType->propertyTypeID}}" <?php echo $propertyType->propertyTypeID == $request->propertyTypeId ? "selected='selected'" : ""; ?> >{{$propertyType->typeName}}</option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                </div>  
                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Ngân sách ban đầu (dự trù)</label>
                                                    <div class="col-sm-10">
                                                        <p class="form-control-static">{{number_format($request->initialBudget,0,'.','')}}</p>
														<input id="initialBudget" name="initialBudget" type="hidden" value="{{number_format($request->initialBudget,0,'.','')}}"/>
                                                    </div>
                                                    <label for="" class="col-sm-2 control-label">ĐẾN</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12 control-label">&nbsp;</label>
                                                    <div class="col-sm-7 padding-r-0">
                                                        <p class="form-control-static">{{number_format($request->finalBudget,0,'.','')}}</p>
														<input id="finalBudget" name="finalBudget" type="hidden" value="{{number_format($request->finalBudget,0,'.','')}}"/>
                                                        <div class="errors"></div>
                                                    </div>
                                                    <div class="col-sm-5">
                                                        <?php
                                                        $currencies = array(
                                                            "VND" => "VND",
                                                            "USD" => "USD"
                                                        );
                                                        ?>
														<?php foreach ($currencies as $key => $value): ?>
															<?php if($key == $request->currency): ?>
																<p class="form-control-static">{{$value}}</p>
															<?php endif; ?>
														<?php endforeach; ?>
                                                        <select id="currency" name="currency" class="hidden" >
                                                            <?php foreach ($currencies as $key => $value): ?>
                                                                <option value="{{$key}}" <?php echo $key == $request->currency ? "selected='selected'" : ""; ?> >{{$value}}</option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Ngân sách ban đầu (Fixed) *</label>
                                                    <div class="col-sm-12">
                                                        <p class="form-control-static">{{number_format($request->initialBudgetFixed)}}</p>
														<input type="hidden" id="initialBudgetFixed" name="initialBudgetFixed" value="{{number_format($request->initialBudgetFixed)}}"/>
                                                        <div class="errors initialbudgetfixed-errors"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Ngân sách (final)</label>
                                                    <div class="col-sm-12">
                                                        <p class="form-control-static">{{($lead->finalBudget!=''?$request->finalBudget:'N/A')}}</p>
														<input id="leadFinalBudget" name="leadFinalBudget" type="hidden" value="{{$lead->finalBudget}}"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" >
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Diện tích:</label>
                                                    <div class="col-sm-5">
                                                        <p class="form-control-static">{{($request->minSize!=''?$request->minSize:'N/A')}}</p>
														<input id="minSize" name="minSize" type="hidden" class="form-control" value="{{$request->minSize}}"/>
                                                        <div class="errors"></div>
                                                    </div>
                                                    <label for="" class="col-sm-1 control-label">ĐẾN</label>
                                                    <div class="col-sm-5">
                                                        <p class="form-control-static">{{($request->maxSize!=''?$request->maxSize:'N/A')}}</p>
														<input id="maxSize" name="maxSize" type="hidden" value="{{$request->maxSize}}"/>
                                                        <div class="errors"></div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Ngày dự tính dọn vào *</label>
                                                    <div class="col-sm-12">
                                                        <div class="input-group date" data-provide="datepicker">
                                                            <?php
                                                            if ($request->moveInDate) {
                                                                $request->moveInDate = date('m/d/Y', $request->moveInDate / 1000);
                                                            } else {
                                                                $request->moveInDate = NULL;
                                                            }
                                                            ?>
															<p class="form-control-static">{{($request->moveInDate!=''?$request->moveInDate:'N/A')}}</p>
                                                            <input id="moveInDate" name="moveInDate" type="hidden" value="{{$request->moveInDate}}" />
                                                        </div>
                                                        <div class="errors"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group row">
                                                    <div class="col-sm-6">
                                                        <label for="" >Bed</label>
                                                        <div >
                                                            <p class="form-control-static">{{($request->bedRooms!=''?$request->bedRooms:'N/A')}}</p>
															<input id="bedRooms" name="bedRooms" type="hidden" value="{{$request->bedRooms}}"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <label for="" >Bath</label>
                                                        <div>
                                                            <p class="form-control-static">{{($request->bathRooms!=''?$request->bathRooms:'N/A')}}</p>
															<input id="bathRooms" name="bathRooms" type="hidden" value="{{$request->bathRooms}}"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Khả năng đáp ứng thị trường (%)</label>
                                                    <div class="col-sm-12">
                                                        <p class="form-control-static">{{($lead->responsiveness!=''?$lead->responsiveness:'N/A')}}</p>
														<input id="responsiveness" name="responsiveness" type="hidden" value="{{$lead->responsiveness}}"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-12">Phân loại:</label>
                                                    <div class="col-sm-12">
                                                        <?php foreach ($dealTypes as $dealType): ?>
															<?php if($dealType->typeId==$lead->typeId): ?>
																<p class="form-control-static">{{$dealType->typeName}}</p>
															<?php endif; ?>
														<?php endforeach; ?> 
														<select id="typeId" name="typeId" class="hidden">
                                                            <?php foreach ($dealTypes as $dealType): ?>
                                                                <option value="{{$dealType->typeId}}" {{$dealType->typeId==$lead->typeId?"selected='selected'":""}}>{{$dealType->typeName}}</option>
                                                            <?php endforeach; ?>
                                                        </select>                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Quận (*)</label>
                                            <div class="col-sm-12 errors district-errors"></div>
                                            <div class="row">
                                                <div class="col-sm-12">
													<?php foreach ($districts as $district): ?>                              
														<?php if(in_array($district->districtId, $currentDistricts)): ?>
															<div class="col-sm-6" >
																<p class="form-control-static">
																	<input class="districts" type="hidden" name="districtId[]" value="{{$district->districtId}}">
																	{{$district->districtName}}
																	<?php if($district->districtId == $isPreferedDistrict): ?>
																		<input type="hidden" name="isPrefered" value="{{$district->districtId}}">
																		(*) isPrefered
																	<?php endif; ?>
																</p>
															</div>
														<?php endif; ?> 
													<?php endforeach; ?>
												   <?php foreach ($districts as $district): ?>
                                                        <div class="col-sm-6 hidden" >
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

                                </div>


                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Hướng:</label>
                                    <div class="col-sm-10">
                                        <?php $i=0; ?>
										<?php foreach ($directions as $direction): ?>
											<?php if(in_array($direction->dId, $currentDirections)): ?>
												<input type="hidden" value="{{$direction->dId}}" name="directions[]"/>
												<p class="form-control-static">
												{{$direction->directionName}}
												<?php if($isPreferedDirection == $direction->dId): ?>
													<input type="hidden" name="isPreferedDirection" value="{{$direction->dId}}"/>
													(*) isPrefered
												<?php $i++; endif; ?>
												</p>
											<?php endif; ?> 
										<?php endforeach; ?>
										<?php if($i == 0): ?>
											<p class="form-control-static">N/A</p>
										<?php endif; ?>
                                    </div>
									<div class="hidden">
                                        <?php foreach ($directions as $direction): ?>
                                            <div class="checkbox col-sm-3" >
                                                <label class="no-bold"><input type="checkbox" value="{{$direction->dId}}" name="directions[]" class="directions" <?php echo in_array($direction->dId, $currentDirections) ? "checked='checked'" : "" ?> /> {{$direction->directionName}}</label>
                                                <label><input type="radio" name="isPreferedDirection" class="isPreferedDirection" value="{{$direction->dId}}" <?php echo $isPreferedDirection == $direction->dId ? "checked='checked'" : ""; ?> />Prefered</label>
                                            </div>
                                        <?php endforeach; ?>
                                        <div class="errors"></div>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Lưu ý khác</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">{{($request->note!=''?$request->note:'N/A')}}</p>
										<textarea id="note" name="note" class="hidden" placeholder="Lưu ý khác">{{$request->note}}</textarea>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">Tiện ích</label>
                                    <div class="col-sm-10" id="amenities">
                                        <div class="amenity-content">
                                            <?php $i=0; ?>
											<?php foreach ($amenities as $amenity): ?>
                                                <div class="col-md-3 utilitie-item-content">
													<?php if(in_array($amenity->id, $currentAmenities)): ?>
														<div class="checkbox">
															<label>
															<input type="hidden" data="0" name="amenityId[]" datatext="{{$amenity->amenityName}}" value="{{$amenity->id}}"/>
															{{$amenity->amenityName}}
															</label>
														</div>
													<?php $i++; endif; ?>
                                                    <div class="amenityc-child-content" data="3">
                                                        <?php foreach ($amenity->amenityChild as $amenityChild): ?>
                                                            <?php if(in_array($amenityChild->id, $currentAmenities)): ?>
															<div class="checkbox">
                                                                <label>
                                                                    <input type="hidden" data="0" name="amenityId[]" datatext="{{$amenityChild->amenityName}}" value="{{$amenityChild->id}}"/>
																	{{$amenityChild->amenityName}}
                                                                </label>
                                                            </div>
															<?php $i++; endif; ?>
                                                        <?php endforeach; ?>
                                                    </div>
                                                </div>
                                            <?php endforeach; ?>
											<?php if($i == 0): ?>
												<p class="form-control-static">N/A</p>
											<?php endif; ?>
                                        </div>
										<div class="hidden">
                                            <?php foreach ($amenities as $amenity): ?>
                                                <div class="col-md-3 utilitie-item-content">
                                                    <div class="checkbox">
                                                        <label>
                                                            <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenity->amenityName}}" value="{{$amenity->id}}" <?php echo in_array($amenity->id, $currentAmenities) ? "checked='checked'" : ""; ?> />
                                                            {{$amenity->amenityName}}
                                                        </label>
                                                    </div>
                                                    <div class="amenityc-child-content" data="3">
                                                        <?php foreach ($amenity->amenityChild as $amenityChild): ?>
                                                            <div class="checkbox">
                                                                <label>
                                                                    <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenityChild->amenityName}}" value="{{$amenityChild->id}}" <?php echo in_array($amenityChild->id, $currentAmenities) ? "checked='checked'" : ""; ?>  />
                                                                    {{$amenityChild->amenityName}}
                                                                </label>
                                                            </div>
                                                        <?php endforeach; ?>
                                                    </div>
                                                </div>
                                            <?php endforeach; ?>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 hidden">
                                    <ul>
                                        <?php foreach ($lead->leadReassignReason as $reassignReason): ?>                                        
                                            <li>{{date('d/m/y H:i:s',$reassignReason->createdDate/1000)}} {{isset($reassignReason->assignFromName)?$reassignReason->assignFromName:""}} => {{isset($reassignReason->assignToName)?$reassignReason->assignToName:""}} : {{$reassignReason->note}}</li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>

                                <div class="btn-group-request" style="position:fixed;bottom:0px;right:0px;z-index: 9999">
                                    <button type="button" id="btnFindListing" class="btn btn-success hidden">Tìm listing</button>                                    
                                </div>
                            </div>
                        </div>
                        <section class="box box-primary">
                            <div class="box-header with-border">
                                <div class="box-title"><span>Thông tin listing</span> <button id="btnSearchListing" class="btn btn-success margin">Tìm kiếm nâng cao</button></div>
                            </div>
                            <div class="box-body">
                                <div id="listings" style="margin-bottom:32px;max-height: 400px;overflow: scroll;">
								</div>
                            </div>
                        </section>
                        @include('shared.modal-search-listing',['data' => $lead])
                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <h3 class="box-title">THÔNG TIN THÊM</h3>
                            </div>
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Trạng thái</label>
                                            <div class="col-sm-12">
                                                <?php foreach ($statusList as $status): ?>
													<?php if($status->statusId == $lead->statusId): ?>
														<p class="form-control-static">{{$status->statusName}}</p>
													<?php endif; ?>
												<?php endforeach; ?>
												<select id="statusId" name="statusId" class="hidden">
                                                    <?php foreach ($statusList as $status): ?>
                                                        <option value="{{$status->statusId}}" <?php echo $status->statusId == $lead->statusId ? "selected='selected'" : ""; ?> >{{$status->statusName}}</option>
                                                    <?php endforeach; ?>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Sale Tham Gia</label>
                                            <div class="col-sm-12">
                                                <?php foreach ($sales as $sale): ?>
													<?php if($sale->agentId==$request->saleId): ?>
														<p class="form-control-static">{{$sale->name}}</p>
													<?php endif; ?>
												<?php endforeach; ?>
												<select id="saleId" name="saleId"  class="hidden">
                                                    <option value="">Chọn sale tham gia</option>
                                                    <?php foreach ($sales as $sale): ?>
                                                        <option value="{{$sale->agentId}}" {{$sale->agentId==$request->saleId?"selected='selected'":""}}>{{$sale->name}}</option>
                                                    <?php endforeach; ?>
                                                </select>
                                            </div>
                                        </div></div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Người chịu trách nhiệm chính</label>
                                            <div class="col-sm-12" {{$lead->assignedTo}}>
												<?php if($userId == $request->assignedTo): ?>
													<p class="form-control-static">{{$userName}}</p>
												<?php endif; ?>
												<?php
												if ($accounts):
													foreach ($accounts as $account):
														?>
														<?php if($account->userId == $lead->assignedTo): ?>
															<p class="form-control-static">{{$account->name}}</p>
														<?php endif; ?>
														<?php
													endforeach;
												endif;
												?>
                                        
												<select id="assignedTo" name="assignedTo"  class="hidden">
                                                    <option value={{$userId}}  <?php echo $userId == $request->assignedTo ? "selected='selected'" : ""; ?>  >{{$userName}}</option>
                                                    <?php
                                                    if ($accounts):
                                                        foreach ($accounts as $account):
                                                            ?>
                                                            <option value="{{$account->userId}}" <?php echo $account->userId == $lead->assignedTo ? "selected='selected'" : ""; ?>  >{{$account->name}}</option>
                                                            <?php
                                                        endforeach;
                                                    endif;
                                                    ?>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Do môi giới nào giới thiệu?</label>
                                            <div class="col-sm-12">
                                                <?php foreach ($agents as $agent): ?>
													<?php if($agent->agentId == $request->agentId): ?>
														<p class="form-control-static">{{$agent->name}}</p>
													<?php endif; ?>
												<?php endforeach; ?>
												<select id="agentId" name="agentId" class="hidden"  data-old-am="{{$request->amOfAgentPresenter}}">
                                                    <option value="">--- chọn môi giới ---</option>
                                                    <?php foreach ($agents as $agent): ?>
                                                        <option value="{{$agent->agentId}}" <?php echo $agent->agentId == $request->agentId ? "selected='selected'" : ""; ?>  >{{$agent->name}}</option>
                                                    <?php endforeach; ?>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">AM của môi giới giới thiệu</label>
                                            <div class="col-sm-12">
                                                <p class="form-control-static">N/A</p>
												<select id="amOfAgentPresenter" name="amOfAgentPresenter" class="hidden">
                                                    <option value="">--- chọn AM ---</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">Môi giới phục vụ</label>
                                            <div class="col-sm-12">
                                                <?php foreach ($agents as $agent): ?>
													<?php if(!empty($request->agentServe) && $agent->agentId == $request->agentServe): ?>
														<p class="form-control-static">{{$agent->name}}</p>
													<?php endif; ?>
												<?php endforeach; ?>
												<select id="agentServe" name="agentServe" class="hidden" data-old-am="{{$request->amOfAgentServe}}">
                                                    <option value="">--- chọn môi giới ---</option>
                                                    <?php foreach ($agents as $agent): ?>
                                                        <option value="{{$agent->agentId}}" <?php echo (!empty($request->agentServe) && $agent->agentId == $request->agentServe) ? "selected='selected'" : ""; ?>  >{{$agent->name}}</option>
                                                    <?php endforeach; ?>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="" class="col-sm-12">AM của môi giới phục vụ</label>
                                            <div class="col-sm-12">
                                                <p class="form-control-static">N/A</p>
												<select id="amOfAgentServe" name="amOfAgentServe" class="hidden">
                                                    <option value="">--- chọn AM ---</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <h2 class="title-with-line"><span>THÔNG TIN KHÁCH HÀNG</span></h2>
                                        <div class="box box-primary">
                                                <div class="box-body">
                                                  <strong>Tên:</strong>
                                                  <p class="text-muted">
                                                      {{isset($request->customers)?$request->customers->name:"N/A"}} <!-- <a href="#" class="label label-danger"><i class="fa fa-phone"></i></a> <a href="#" class="label label-success"><i class="fa fa-envelope"></i></a> -->
                                                  </p>

                                                  <hr>

                                                  <strong>Nguồn:</strong>
                                                  <p class="text-muted">
                                                      @foreach ($sources as $source)
                                                        @if($source->sourceId == $request->sourceId)
                                                            {{$source->sourceName}}
                                                        @endif
                                                      @endforeach
                                                  </p>

                                                  <hr>

                                                  <strong>Đối tượng:</strong>
                                                  <p class="text-muted">
                                                    @foreach ($subjects as $subject)
                                                        @if($subject->subjectId == $request->subjectId)
                                                            {{$subject->subjectName}}
                                                        @endif
                                                    @endforeach
                                                  </p>
                                                  <hr>
                                                  <div>
                                                    <a class="btn btn-app">
                                                      <i class="fa fa-phone"></i> Gọi
                                                    </a>
                                                    <a class="btn btn-app">
                                                      <i class="fa fa-envelope"></i> Email
                                                    </a>
                                                  </div>
                                                </div>
                                        </div>




                                        <div class="box box-primary">
                                            <div class="box-header with-border">
                                                <h3 class="box-title">KHÁCH HÀNG</h3>
                                            </div>
                                            <input type="hidden" id="customerId" name="customerId" value="{{$lead->customerId}}" />
                                            <input type="hidden" id="requestId" name="requestId" value="{{$lead->requestId}}" />
                                            <input type="hidden" id="leadId" name="leadId" value="{{$lead->leadId}}" />
                                            <input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />
                                            <div class="box-body">
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">Tên KH *</label>
                                                            <div class="col-sm-12">
                                                                <p class="form-control-static">{{isset($request->customers)?$request->customers->name:"N/A"}}</p>
                                                                <input type="hidden" id="customerName" name="customerName" value="{{isset($request->customers)?$request->customers->name:""}}"/>
                                                                <div class="errors"></div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <?php
                                                            if ($lead->dealId == null) {
                                                                echo '<label for="" class="col-sm-12">Phone</label>';
                                                            }
                                                            ?>                                            
                                                            <div class="col-sm-12">
                                                                <?php
                                                                if ($lead->dealId == null) {
                                                                    ?>
                                                                    <div class="input-group">
                                                                        <input id="customerPhone" name="customerPhone" type="hidden" value="{{isset($request->customers)?$request->customers->phone:""}}"/>
                                                                    </div>
                                                                    <?php
                                                                } else {
                                                                    ?>                                                  
                                                                    <input id="customerPhone" name="customerPhone" type="hidden" class="form-control" value="{{isset($request->customers)?$request->customers->phone:""}}" placeholder="N/A" />
                                                                    <?php
                                                                }
                                                                ?>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">Email</label>
                                                            <div class="col-sm-12">
                                                                <div class="input-group">
                                                                    <p class="form-control-static">{{isset($request->customers)?$request->customers->email:"N/A"}}</p>
                                                                    <input type="hidden" name="customerEmail" id="customerEmail" value="{{isset($request->customers)?$request->customers->email:""}}"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">Nguồn</label>
                                                            <div class="col-sm-12">
                                                                <select id="sourceId" name="sourceId" class="hidden">
                                                                    <?php foreach ($sources as $source): ?>
                                                                        <option value="{{$source->sourceId}}" <?php echo $source->sourceId == $request->sourceId ? "selected='selected'" : ""; ?> >{{$source->sourceName}}</option>
                                                                    <?php endforeach; ?>
                                                                </select>
                                                                <?php foreach ($sources as $source): ?>
                                                                    <?php if($source->sourceId == $request->sourceId): ?>
                                                                        <p class="form-control-static">{{$source->sourceName}}</p>
                                                                    <?php endif; ?>
                                                                <?php endforeach; ?>
                                                                <textarea id="sourceOther" name="sourceOther" class="form-control" rows="4" placeholder="Nhập nguồn khác" style="display: none">{{$request->sourceOther}}</textarea>
                                                                <input type="hidden" id="sourceName" name="sourceName" value="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">Do môi giới nào giới thiệu?</label>
                                                            <div class="col-sm-12">
                                                                <div name="agentName" class="agentName" value="" >{{!empty($lead->agentName)?$lead->agentName:'N/A'}}<br />{{$lead->agentPhone?"":$lead->agentPhone}}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">Đối tượng</label>
                                                            <div class="col-sm-12">
                                                                <?php foreach ($subjects as $subject): ?>
                                                                    <?php if($subject->subjectId == $request->subjectId): ?>
                                                                        <p class="form-control-static">{{$subject->subjectName}}</p>
                                                                    <?php endif; ?>
                                                                <?php endforeach; ?>
                                                                <select id="subjectId" name="subjectId" class="hidden">
                                                                    <?php foreach ($subjects as $subject): ?>
                                                                        <option value="{{$subject->subjectId}}" <?php echo $subject->subjectId == $request->subjectId ? "selected='selected'" : ""; ?>  >{{$subject->subjectName}}</option>
                                                                    <?php endforeach; ?>
                                                                </select>
                                                                <input type="hidden" name="subjectName" id="subjectName" value="" />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="box box-primary">
                                            <div class="box-header with-border">
                                                <h3 class="box-title">GIAO DỊCH</h3>
                                                <label class="control-label hidden"><input type="checkbox" id="isSpecialDeal" <?php echo!empty($lead->meetingId) ? "checked" : ""; ?> /> Special Deal</label>
                                            </div>
                                            <div class="box-body">
                                                <div class="row hidden">
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
                                                            <?php foreach ($devices as $key => $value): ?>
                                                                <option value="{{$value}}" <?php echo $value == $request->device ? "selected='selected'" : ""; ?>  >{{$value}}</option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="row">
                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                    <label for="" class="col-sm-12">Hình thức giao dịch *</label>
                                                                    <div class="col-sm-12">
                                                                        <?php
                                                                        $listingTypes = array(
                                                                            1 => 'Mua',
                                                                            2 => 'Thuê'
                                                                        );
                                                                        ?>
                                                                        <?php foreach ($listingTypes as $key => $value): ?>
                                                                            <?php if($key == $request->listingTypeId): ?>
                                                                                <p class="form-control-static">{{$value}}</p>
                                                                            <?php endif; ?>
                                                                        <?php endforeach; ?>
                                                                        <select id="listingTypeId" name="listingTypeId" class="hidden">
                                                                            <?php foreach ($listingTypes as $key => $value): ?>
                                                                                <option value={{$key}} <?php echo $key == $request->listingTypeId ? "selected='selected'" : ""; ?> >{{$value}}</option>
                                                                            <?php endforeach; ?>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6" >
                                                                <div class="form-group">
                                                                    <label for="" class="col-sm-12">Loại bất động sản</label>
                                                                    <div class="col-sm-12">
                                                                        <?php foreach ($propertyTypes as $propertyType): ?>
                                                                            <?php if($propertyType->propertyTypeID == $request->propertyTypeId): ?>
                                                                                <p class="form-control-static">{{$propertyType->typeName}}</p>
                                                                            <?php endif; ?>
                                                                        <?php endforeach; ?>
                                                                        <select name="propertyTypeId" id="propertyTypeId" class="hidden">
                                                                            <?php foreach ($propertyTypes as $propertyType): ?>
                                                                                <option value="{{$propertyType->propertyTypeID}}" <?php echo $propertyType->propertyTypeID == $request->propertyTypeId ? "selected='selected'" : ""; ?> >{{$propertyType->typeName}}</option>
                                                                            <?php endforeach; ?>
                                                                        </select>
                                                                    </div>
                                                                </div>  
                                                            </div>

                                                        </div>
                                                        <div class="row">
                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                    <label for="" class="col-sm-12">Ngân sách ban đầu (dự trù)</label>
                                                                    <div class="col-sm-10">
                                                                        <p class="form-control-static">{{number_format($request->initialBudget,0,'.','')}}</p>
                                                                        <input id="initialBudget" name="initialBudget" type="hidden" value="{{number_format($request->initialBudget,0,'.','')}}"/>
                                                                    </div>
                                                                    <label for="" class="col-sm-2 control-label">ĐẾN</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                    <label for="" class="col-sm-12 control-label">&nbsp;</label>
                                                                    <div class="col-sm-7 padding-r-0">
                                                                        <p class="form-control-static">{{number_format($request->finalBudget,0,'.','')}}</p>
                                                                        <input id="finalBudget" name="finalBudget" type="hidden" value="{{number_format($request->finalBudget,0,'.','')}}"/>
                                                                        <div class="errors"></div>
                                                                    </div>
                                                                    <div class="col-sm-5">
                                                                        <?php
                                                                        $currencies = array(
                                                                            "VND" => "VND",
                                                                            "USD" => "USD"
                                                                        );
                                                                        ?>
                                                                        <?php foreach ($currencies as $key => $value): ?>
                                                                            <?php if($key == $request->currency): ?>
                                                                                <p class="form-control-static">{{$value}}</p>
                                                                            <?php endif; ?>
                                                                        <?php endforeach; ?>
                                                                        <select id="currency" name="currency" class="hidden" >
                                                                            <?php foreach ($currencies as $key => $value): ?>
                                                                                <option value="{{$key}}" <?php echo $key == $request->currency ? "selected='selected'" : ""; ?> >{{$value}}</option>
                                                                            <?php endforeach; ?>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                    <label for="" class="col-sm-12">Ngân sách ban đầu (Fixed) *</label>
                                                                    <div class="col-sm-12">
                                                                        <p class="form-control-static">{{number_format($request->initialBudgetFixed)}}</p>
                                                                        <input type="hidden" id="initialBudgetFixed" name="initialBudgetFixed" value="{{number_format($request->initialBudgetFixed)}}"/>
                                                                        <div class="errors initialbudgetfixed-errors"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                    <label for="" class="col-sm-12">Ngân sách (final)</label>
                                                                    <div class="col-sm-12">
                                                                        <p class="form-control-static">{{($lead->finalBudget!=''?$request->finalBudget:'N/A')}}</p>
                                                                        <input id="leadFinalBudget" name="leadFinalBudget" type="hidden" value="{{$lead->finalBudget}}"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row" >
                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                    <label for="" class="col-sm-12">Diện tích:</label>
                                                                    <div class="col-sm-5">
                                                                        <p class="form-control-static">{{($request->minSize!=''?$request->minSize:'N/A')}}</p>
                                                                        <input id="minSize" name="minSize" type="hidden" class="form-control" value="{{$request->minSize}}"/>
                                                                        <div class="errors"></div>
                                                                    </div>
                                                                    <label for="" class="col-sm-1 control-label">ĐẾN</label>
                                                                    <div class="col-sm-5">
                                                                        <p class="form-control-static">{{($request->maxSize!=''?$request->maxSize:'N/A')}}</p>
                                                                        <input id="maxSize" name="maxSize" type="hidden" value="{{$request->maxSize}}"/>
                                                                        <div class="errors"></div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                    <label for="" class="col-sm-12">Ngày dự tính dọn vào *</label>
                                                                    <div class="col-sm-12">
                                                                        <div class="input-group date" data-provide="datepicker">
                                                                            <?php
                                                                            if ($request->moveInDate) {
                                                                                $request->moveInDate = date('m/d/Y', $request->moveInDate / 1000);
                                                                            } else {
                                                                                $request->moveInDate = NULL;
                                                                            }
                                                                            ?>
                                                                            <p class="form-control-static">{{($request->moveInDate!=''?$request->moveInDate:'N/A')}}</p>
                                                                            <input id="moveInDate" name="moveInDate" type="hidden" value="{{$request->moveInDate}}" />
                                                                        </div>
                                                                        <div class="errors"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6">
                                                                <div class="form-group row">
                                                                    <div class="col-sm-6">
                                                                        <label for="" >Bed</label>
                                                                        <div >
                                                                            <p class="form-control-static">{{($request->bedRooms!=''?$request->bedRooms:'N/A')}}</p>
                                                                            <input id="bedRooms" name="bedRooms" type="hidden" value="{{$request->bedRooms}}"/>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-6">
                                                                        <label for="" >Bath</label>
                                                                        <div>
                                                                            <p class="form-control-static">{{($request->bathRooms!=''?$request->bathRooms:'N/A')}}</p>
                                                                            <input id="bathRooms" name="bathRooms" type="hidden" value="{{$request->bathRooms}}"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                    <label for="" class="col-sm-12">Khả năng đáp ứng thị trường (%)</label>
                                                                    <div class="col-sm-12">
                                                                        <p class="form-control-static">{{($lead->responsiveness!=''?$lead->responsiveness:'N/A')}}</p>
                                                                        <input id="responsiveness" name="responsiveness" type="hidden" value="{{$lead->responsiveness}}"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6">
                                                                <div class="form-group">
                                                                    <label for="" class="col-sm-12">Phân loại:</label>
                                                                    <div class="col-sm-12">
                                                                        <?php foreach ($dealTypes as $dealType): ?>
                                                                            <?php if($dealType->typeId==$lead->typeId): ?>
                                                                                <p class="form-control-static">{{$dealType->typeName}}</p>
                                                                            <?php endif; ?>
                                                                        <?php endforeach; ?> 
                                                                        <select id="typeId" name="typeId" class="hidden">
                                                                            <?php foreach ($dealTypes as $dealType): ?>
                                                                                <option value="{{$dealType->typeId}}" {{$dealType->typeId==$lead->typeId?"selected='selected'":""}}>{{$dealType->typeName}}</option>
                                                                            <?php endforeach; ?>
                                                                        </select>                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">Quận (*)</label>
                                                            <div class="col-sm-12 errors district-errors"></div>
                                                            <div class="row">
                                                                <div class="col-sm-12">
                                                                    <?php foreach ($districts as $district): ?>                              
                                                                        <?php if(in_array($district->districtId, $currentDistricts)): ?>
                                                                            <div class="col-sm-6" >
                                                                                <p class="form-control-static">
                                                                                    <input class="districts" type="hidden" name="districtId[]" value="{{$district->districtId}}">
                                                                                    {{$district->districtName}}
                                                                                    <?php if($district->districtId == $isPreferedDistrict): ?>
                                                                                        <input type="hidden" name="isPrefered" value="{{$district->districtId}}">
                                                                                        (*) isPrefered
                                                                                    <?php endif; ?>
                                                                                </p>
                                                                            </div>
                                                                        <?php endif; ?> 
                                                                    <?php endforeach; ?>
                                                                   <?php foreach ($districts as $district): ?>
                                                                        <div class="col-sm-6 hidden" >
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

                                                </div>


                                                <div class="form-group">
                                                    <label for="" class="col-sm-2 control-label">Hướng:</label>
                                                    <div class="col-sm-10">
                                                        <?php $i=0; ?>
                                                        <?php foreach ($directions as $direction): ?>
                                                            <?php if(in_array($direction->dId, $currentDirections)): ?>
                                                                <input type="hidden" value="{{$direction->dId}}" name="directions[]"/>
                                                                <p class="form-control-static">
                                                                {{$direction->directionName}}
                                                                <?php if($isPreferedDirection == $direction->dId): ?>
                                                                    <input type="hidden" name="isPreferedDirection" value="{{$direction->dId}}"/>
                                                                    (*) isPrefered
                                                                <?php $i++; endif; ?>
                                                                </p>
                                                            <?php endif; ?> 
                                                        <?php endforeach; ?>
                                                        <?php if($i == 0): ?>
                                                            <p class="form-control-static">N/A</p>
                                                        <?php endif; ?>
                                                    </div>
                                                    <div class="hidden">
                                                        <?php foreach ($directions as $direction): ?>
                                                            <div class="checkbox col-sm-3" >
                                                                <label class="no-bold"><input type="checkbox" value="{{$direction->dId}}" name="directions[]" class="directions" <?php echo in_array($direction->dId, $currentDirections) ? "checked='checked'" : "" ?> /> {{$direction->directionName}}</label>
                                                                <label><input type="radio" name="isPreferedDirection" class="isPreferedDirection" value="{{$direction->dId}}" <?php echo $isPreferedDirection == $direction->dId ? "checked='checked'" : ""; ?> />Prefered</label>
                                                            </div>
                                                        <?php endforeach; ?>
                                                        <div class="errors"></div>
                                                    </div>
                                                </div>


                                                <div class="form-group">
                                                    <label for="" class="col-sm-2 control-label">Lưu ý khác</label>
                                                    <div class="col-sm-10">
                                                        <p class="form-control-static">{{($request->note!=''?$request->note:'N/A')}}</p>
                                                        <textarea id="note" name="note" class="hidden" placeholder="Lưu ý khác">{{$request->note}}</textarea>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="" class="col-sm-2 control-label">Tiện ích</label>
                                                    <div class="col-sm-10" id="amenities">
                                                        <div class="amenity-content">
                                                            <?php $i=0; ?>
                                                            <?php foreach ($amenities as $amenity): ?>
                                                                <div class="col-md-3 utilitie-item-content">
                                                                    <?php if(in_array($amenity->id, $currentAmenities)): ?>
                                                                        <div class="checkbox">
                                                                            <label>
                                                                            <input type="hidden" data="0" name="amenityId[]" datatext="{{$amenity->amenityName}}" value="{{$amenity->id}}"/>
                                                                            {{$amenity->amenityName}}
                                                                            </label>
                                                                        </div>
                                                                    <?php $i++; endif; ?>
                                                                    <div class="amenityc-child-content" data="3">
                                                                        <?php foreach ($amenity->amenityChild as $amenityChild): ?>
                                                                            <?php if(in_array($amenityChild->id, $currentAmenities)): ?>
                                                                            <div class="checkbox">
                                                                                <label>
                                                                                    <input type="hidden" data="0" name="amenityId[]" datatext="{{$amenityChild->amenityName}}" value="{{$amenityChild->id}}"/>
                                                                                    {{$amenityChild->amenityName}}
                                                                                </label>
                                                                            </div>
                                                                            <?php $i++; endif; ?>
                                                                        <?php endforeach; ?>
                                                                    </div>
                                                                </div>
                                                            <?php endforeach; ?>
                                                            <?php if($i == 0): ?>
                                                                <p class="form-control-static">N/A</p>
                                                            <?php endif; ?>
                                                        </div>
                                                        <div class="hidden">
                                                            <?php foreach ($amenities as $amenity): ?>
                                                                <div class="col-md-3 utilitie-item-content">
                                                                    <div class="checkbox">
                                                                        <label>
                                                                            <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenity->amenityName}}" value="{{$amenity->id}}" <?php echo in_array($amenity->id, $currentAmenities) ? "checked='checked'" : ""; ?> />
                                                                            {{$amenity->amenityName}}
                                                                        </label>
                                                                    </div>
                                                                    <div class="amenityc-child-content" data="3">
                                                                        <?php foreach ($amenity->amenityChild as $amenityChild): ?>
                                                                            <div class="checkbox">
                                                                                <label>
                                                                                    <input type="checkbox" data="0" class="utilitie" name="amenityId[]" datatext="{{$amenityChild->amenityName}}" value="{{$amenityChild->id}}" <?php echo in_array($amenityChild->id, $currentAmenities) ? "checked='checked'" : ""; ?>  />
                                                                                    {{$amenityChild->amenityName}}
                                                                                </label>
                                                                            </div>
                                                                        <?php endforeach; ?>
                                                                    </div>
                                                                </div>
                                                            <?php endforeach; ?>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-sm-6 hidden">
                                                    <ul>
                                                        <?php foreach ($lead->leadReassignReason as $reassignReason): ?>                                        
                                                            <li>{{date('d/m/y H:i:s',$reassignReason->createdDate/1000)}} {{isset($reassignReason->assignFromName)?$reassignReason->assignFromName:""}} => {{isset($reassignReason->assignToName)?$reassignReason->assignToName:""}} : {{$reassignReason->note}}</li>
                                                        <?php endforeach; ?>
                                                    </ul>
                                                </div>

                                                <div class="btn-group-request" style="position:fixed;bottom:0px;right:0px;z-index: 9999">
                                                    <button type="button" id="btnFindListing" class="btn btn-success hidden">Tìm listing</button>                                    
                                                </div>
                                            </div>
                                        </div>
                                        <section class="box box-primary">
                                            <div class="box-header with-border">
                                                <div class="box-title"><span>Thông tin listing</span> <button id="btnSearchListing" class="btn btn-success margin">Tìm kiếm nâng cao</button></div>
                                            </div>
                                            <div class="box-body">
                                                <div id="listings" style="margin-bottom:32px;max-height: 400px;overflow: scroll;">
                                                </div>
                                            </div>
                                        </section>
                                        @include('shared.modal-search-listing',['data' => $lead])
                                        <div class="box box-primary">
                                            <div class="box-header with-border">
                                                <h3 class="box-title">THÔNG TIN THÊM</h3>
                                            </div>
                                            <div class="box-body">
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">Trạng thái</label>
                                                            <div class="col-sm-12">
                                                                <?php foreach ($statusList as $status): ?>
                                                                    <?php if($status->statusId == $lead->statusId): ?>
                                                                        <p class="form-control-static">{{$status->statusName}}</p>
                                                                    <?php endif; ?>
                                                                <?php endforeach; ?>
                                                                <select id="statusId" name="statusId" class="hidden">
                                                                    <?php foreach ($statusList as $status): ?>
                                                                        <option value="{{$status->statusId}}" <?php echo $status->statusId == $lead->statusId ? "selected='selected'" : ""; ?> >{{$status->statusName}}</option>
                                                                    <?php endforeach; ?>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">Sale Tham Gia</label>
                                                            <div class="col-sm-12">
                                                                <?php foreach ($sales as $sale): ?>
                                                                    <?php if($sale->agentId==$request->saleId): ?>
                                                                        <p class="form-control-static">{{$sale->name}}</p>
                                                                    <?php endif; ?>
                                                                <?php endforeach; ?>
                                                                <select id="saleId" name="saleId"  class="hidden">
                                                                    <option value="">Chọn sale tham gia</option>
                                                                    <?php foreach ($sales as $sale): ?>
                                                                        <option value="{{$sale->agentId}}" {{$sale->agentId==$request->saleId?"selected='selected'":""}}>{{$sale->name}}</option>
                                                                    <?php endforeach; ?>
                                                                </select>
                                                            </div>
                                                        </div></div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">Người chịu trách nhiệm chính</label>
                                                            <div class="col-sm-12" {{$lead->assignedTo}}>
                                                                <?php if($userId == $request->assignedTo): ?>
                                                                    <p class="form-control-static">{{$userName}}</p>
                                                                <?php endif; ?>
                                                                <?php
                                                                if ($accounts):
                                                                    foreach ($accounts as $account):
                                                                        ?>
                                                                        <?php if($account->userId == $lead->assignedTo): ?>
                                                                            <p class="form-control-static">{{$account->name}}</p>
                                                                        <?php endif; ?>
                                                                        <?php
                                                                    endforeach;
                                                                endif;
                                                                ?>
                                                        
                                                                <select id="assignedTo" name="assignedTo"  class="hidden">
                                                                    <option value={{$userId}}  <?php echo $userId == $request->assignedTo ? "selected='selected'" : ""; ?>  >{{$userName}}</option>
                                                                    <?php
                                                                    if ($accounts):
                                                                        foreach ($accounts as $account):
                                                                            ?>
                                                                            <option value="{{$account->userId}}" <?php echo $account->userId == $lead->assignedTo ? "selected='selected'" : ""; ?>  >{{$account->name}}</option>
                                                                            <?php
                                                                        endforeach;
                                                                    endif;
                                                                    ?>
                                                                </select>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">Do môi giới nào giới thiệu?</label>
                                                            <div class="col-sm-12">
                                                                <?php foreach ($agents as $agent): ?>
                                                                    <?php if($agent->agentId == $request->agentId): ?>
                                                                        <p class="form-control-static">{{$agent->name}}</p>
                                                                    <?php endif; ?>
                                                                <?php endforeach; ?>
                                                                <select id="agentId" name="agentId" class="hidden"  data-old-am="{{$request->amOfAgentPresenter}}">
                                                                    <option value="">--- chọn môi giới ---</option>
                                                                    <?php foreach ($agents as $agent): ?>
                                                                        <option value="{{$agent->agentId}}" <?php echo $agent->agentId == $request->agentId ? "selected='selected'" : ""; ?>  >{{$agent->name}}</option>
                                                                    <?php endforeach; ?>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">AM của môi giới giới thiệu</label>
                                                            <div class="col-sm-12">
                                                                <p class="form-control-static">N/A</p>
                                                                <select id="amOfAgentPresenter" name="amOfAgentPresenter" class="hidden">
                                                                    <option value="">--- chọn AM ---</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">Môi giới phục vụ</label>
                                                            <div class="col-sm-12">
                                                                <?php foreach ($agents as $agent): ?>
                                                                    <?php if(!empty($request->agentServe) && $agent->agentId == $request->agentServe): ?>
                                                                        <p class="form-control-static">{{$agent->name}}</p>
                                                                    <?php endif; ?>
                                                                <?php endforeach; ?>
                                                                <select id="agentServe" name="agentServe" class="hidden" data-old-am="{{$request->amOfAgentServe}}">
                                                                    <option value="">--- chọn môi giới ---</option>
                                                                    <?php foreach ($agents as $agent): ?>
                                                                        <option value="{{$agent->agentId}}" <?php echo (!empty($request->agentServe) && $agent->agentId == $request->agentServe) ? "selected='selected'" : ""; ?>  >{{$agent->name}}</option>
                                                                    <?php endforeach; ?>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="" class="col-sm-12">AM của môi giới phục vụ</label>
                                                            <div class="col-sm-12">
                                                                <p class="form-control-static">N/A</p>
                                                                <select id="amOfAgentServe" name="amOfAgentServe" class="hidden">
                                                                    <option value="">--- chọn AM ---</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                            <th>Price (in VNĐ)</th>
                                            <th>Address</th>
                                            <th>Call owner to check availbility </th>
                                            <th>Deactivate</th>
                                            <th>Khách chọn đi xem</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($lead->rlistingsList as $listing): ?>
                                            <tr>
                                                <td>{{$listing->rlistingId}}</td>
                                                <td>{{$listing->bedRooms}}</td>
                                                <td>{{$listing->bathRooms}}</td>
                                                <td>{{$listing->formatSize}}</td>
                                                <td>{{$listing->formatPrice}}</td>
                                                <td>{{$listing->address}}</td>
                                                <td>N/A</td>
                                                <td><input type="checkbox" <?php $listing->isDeactivated ? "checked='checked'" : ""; ?> /></td>
                                                <td><input type="checkbox" <?php $listing->isSelected ? "checked='checked'" : ""; ?> /></td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </form>
    <section id="customerForm">
    </section>
</div>

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
@include('shared.modal-show-log-listing')
@endsection


@extends('templates.amenities-item')
@section('page-js')
<script src="{{loadAsset('/js/helper.js')}}"></script>
<script src="{{loadAsset('/plugins/chartjs/Chart.min.js')}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset('/plugins/daterangepicker/daterangepicker.js')}}"></script>
<script src="{{loadAsset('/plugins/jquery-dateformat/jquery-dateFormat.js')}}"></script>

<script src="{{loadAsset('/plugins/datepicker/bootstrap-datepicker.js')}}"></script>
<script src="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.js')}}"></script>
<script src="{{loadAsset('/plugins/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{loadAsset('/plugins/datatables/dataTables.bootstrap.min.js')}}"></script>

<script src="{{loadAsset('/dist/js/jquery.magnific-popup.min.js')}}"></script>
<script src="{{loadAsset('/js/dashboard.js')}}"></script>
<script src="{{loadAsset('/plugins/select2/select2.full.min.js')}}"></script>
<script src="{{loadAsset('/plugins/jquery-mask/jquery.mask.js')}}"></script>
<script src="{{loadAsset('/plugins/owl.carousel/owl-carousel/owl.carousel.js')}}"></script>
<script src="{{loadAsset('/js/template7.min.js')}}"></script>
<script src="/plugins/ionslider/ion.rangeSlider.min.js"></script>
<script type="text/javascript">
    var sheet = document.createElement('style'),  
      $rangeInput = $('.range input'),
      prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

    document.body.appendChild(sheet);

    var getTrackStyle = function (el) {  
      var curVal = el.value,
          val = (curVal - 1) * 16.666666667,
          style = '';
      
      // Set active label
      $('.range-labels li').removeClass('active selected');
      
      var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');
      
      curLabel.addClass('active selected');
      curLabel.prevAll().addClass('selected');
      
      // Change background gradient
      for (var i = 0; i < prefs.length; i++) {
        style += '.range {background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #fff ' + val + '%, #fff 100%)}';
        style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #b2b2b2 ' + val + '%, #b2b2b2 100%)}';
      }

      return style;
    }

    $rangeInput.on('input', function () {
      sheet.textContent = getTrackStyle(this);
    });

    // Change input value on label click
    $('.range-labels li').on('click', function () {
      var index = $(this).index();
      
      $rangeInput.val(index + 1).trigger('input');
      
    });



var leadId = "{{$lead -> leadId}}";
var dealId = <?php echo $lead->dealId ? $lead->dealId : "null"; ?>;
var currentAssignTo = "{{$lead->assignedTo}}";
var isBroadcast = false;
var level = 2;
var firstRun = true;
var lead = <?php echo json_encode($lead); ?>;
var customerReviewData = <?php echo json_encode($lead->customerReview); ?>;
var loanAdviceData = <?php echo json_encode($lead->bankLoanAdvice); ?>;
var noListingEmailTitle = "<?php echo "Propzy thông báo kết quả tìm kiếm " . $lead->request->listingType->typeName . " " . $lead->request->propertyType->typeName; ?>";

</script>
<script src="{{loadAsset('/js/lead/detail.js')}}"></script>

@stop
@section('page-css')
<link href="{{loadAsset('/plugins/datepicker/datepicker3.css')}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/daterangepicker/daterangepicker-bs3.css')}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/datatables/dataTables.bootstrap.css')}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/owl.carousel/owl-carousel/owl.carousel.css')}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/owl.carousel/owl-carousel/owl.theme.css')}}" rel="stylesheet" type="text/css" />
<!-- Ion Slider -->
<link rel="stylesheet" href="/plugins/ionslider/ion.rangeSlider.css">
<!-- ion slider Nice -->
<link rel="stylesheet" href="/plugins/ionslider/ion.rangeSlider.skinNice.css">
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

</style>
@stop
