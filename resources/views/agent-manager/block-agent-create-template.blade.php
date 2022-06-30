<?php
/**
 * Created by PhpStorm.
 * User: hooaluu
 * Date: 6/5/2019
 * Time: 2:06 PM
 */
?>
<div class="row" id="agent-detail">
    <div class="col-md-12">
        <div class="box box-primary">
            <div class="box-body">
                @if($pageTypeAgent == 'EDIT')
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label class="control-label" for="agent-info-statusName"> Trạng thái môi giới </label>
                                    </div>
                                    <div class="col-md-12">
                                        <span class="form-control-static" id="agent-info-statusName" style="    padding: 5px;"> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label class="control-label" for="agent-info-statusName"> &nbsp; </label>
                                    </div>
                                    <div class="col-md-12">
                                        <button class="btn btn-sm btn-success" id="agent-info-change-status"><i class="fa fa-undo"></i> Kiểm duyệt </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endif
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="control-label" for="agent-info-name"> Tên môi giới </label>
                                </div>
                                <div class="col-md-12">
                                    <input type="text" id="agent-info-name" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="control-label" for="agent-info-email"> Email </label>
                                </div>
                                <div class="col-md-12">
                                    <input type="email" id="agent-info-email" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="control-label" for="agent-info-phone"> Số điện thoại </label>
                                </div>
                                <div class="col-md-12">
                                    <input type="text" id="agent-info-phone" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @if($pageTypeAgent == 'CREATE')
                   {{-- <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12 text-right">
                                        <button class="btn btn-sm btn-success"><i class="fa fa-search"></i> Kiểm tra </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>--}}
                @endif
                <div class="row agent-info-source-create-wrapper">
                    <div class="col-md-4">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="control-label" for="agent-info-source-create">Nguồn tạo </label>
                                </div>
                                <div class="col-md-12">
                                    <select class="form-control" id="agent-info-source-create"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="control-label" for="agent-info-agentTypeId">Loại môi giới </label>
                                </div>
                                <div class="col-md-3 ">
                                    <label class="checkbox ">
                                        <input name="agent-info-agentTypeId" type="checkbox" class="agent-info-agentTypeId" value="37">
                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Khách Mua
                                    </label>
                                </div>
                                <div class="col-md-3 ">
                                    <label class="checkbox ">
                                        <input name="agent-info-agentTypeId" type="checkbox" class="agent-info-agentTypeId" value="36">
                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Khách Bán
                                    </label>
                                </div>
                                <div class="col-md-4 ">
                                    <label class="checkbox ">
                                        <input name="agent-info-agentTypeId" type="checkbox" class="agent-info-agentTypeId" value="38">
                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Người dẫn đường (CC-Agent)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {{--<div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="control-label" for="contractSigned">Hợp đồng </label>
                                </div>
                                <div class="col-md-3 ">
                                    <label class="checkbox ">
                                        <input name="contractSigned" type="checkbox" class="contractSigned" id="contractSigned">
                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Đã ký hợp đồng
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>--}}
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="control-label" for="agent-info-listingTypeId">Loại hình </label>
                                </div>
                                <div class="col-md-6 ">
                                    <label class="checkbox ">
                                        <input name="agent-info-listingType" type="checkbox" class="agent-info-listingType" value="1">
                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Bán
                                    </label>
                                </div>
                                <div class="col-md-6">
                                    <label class="checkbox ">
                                        <input name="agent-info-listingType" type="checkbox" class="agent-info-listingType" value="2">
                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Thuê
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="control-label" for="agent-info-propertyTypeId">Loại Bất động sản </label>
                                </div>
                                <div class="col-md-12">
                                    <select class="form-control" id="agent-info-propertyTypeId" multiple></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">

                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="control-label" for="agent-info-districts">Quận hoạt động </label>
                                    <label class="checkbox " style="display: inline-block; margin-left: 20px;">
                                        <input name="agent-info-districts-check-all" type="checkbox" class="agent-info-districts-check-all" id="agent-info-districts-check-all">
                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Chọn tất cả
                                    </label>
                                </div>
                                <div class="agent-info-districts-active-wrapper"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="control-label" for="agent-info-district-primary">Quận hoạt động chính </label>
                                </div>
                                <div class="col-md-12">
                                    <select class="form-control" id="agent-info-district-primary"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-12 text-right">
                                    <button class="btn  btn-primary" id="agent-info-save-agent"><i class="fa fa-save"></i> Lưu </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
