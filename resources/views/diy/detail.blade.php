@extends('layout.default')

@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
    <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
    <h3 class="box-title"><a href='/diy'><i class="glyphicon glyphicon-arrow-left"></i></a> Detail Listing</h3>
    <div class="row">
        <div class="col-md-12">
            <div class="box box-info">
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Tên chủ tin đăng</label>
                                <input id="name" name="name" type="text" class="form-control" placeholder="Enter ..." value="{{$item->name}}">
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>SĐT chủ tin đăng</label>
                                <input id="phone" name="phone" type="text" class="form-control" placeholder="Enter ..." value="{{$item->phone}}">
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Email chủ tin đăng</label>
                                <input id="email" name="email" type="text" class="form-control" placeholder="Enter ..." value="{{$item->email}}">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-sm-12">
                            <label>Note</label>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-sm-12">
                            <textarea id="note" class="form-control" rows="6">{{$item->note}}</textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <button class="btnSaveOwner btn btn-success">Lưu</button>
                        </div>                        
                    </div>
                </div>
            </div>
            <div class="box box-info">
                <form role="form">
                    <input type="hidden" id="photos" name="photos" value="{{json_encode($item->photos)}}" />
                    <input type="hidden" id="latitude" name="latitude" value="{{!empty($item->latitude)? $item->latitude:0}}" />
                    <input type="hidden" id="longitude" name="longitude" value="{{!empty($item->longitude)? $item->longitude:0}}" />
                    <div class="box-body">                       
                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Loại hình giao dịch</label>
                                    <select class="form-control" id="listingTypeId">
                                        <option value="">Chọn loại hình giao dịch</option>                          
                                        <?php foreach ($propertyTypes as $key => $value): ?>
                                            <option value="{{$key}}" <?php echo $key == $item->listingTypeId ? "selected" : ""; ?> >{{$value}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                    <div class="errors"></div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Loại hình</label>
                                    <select class="form-control" id="propertyTypeId">
                                    </select>
                                    <div class="errors"></div>
                                </div>
                            </div>
                        </div>
                        <?php if (isset($item->fullAddress) && !empty($item->fullAddress) || !empty($item->address)): ?>
                            <div class="row">
                                <div class="col-md-12 col-xs-12">
                                    <div class="form-group row">
                                        <label class="col-sm-2">Địa chỉ khách nhập:</label>
                                        <div class="col-sm-8" id="fullAddress" >
                                            <?php if ($item->sourceType == 2): ?>
                                                {{$item->address}}
                                            <?php else: ?>
                                                {{$item->houseNumber}} {{$item->fullAddress}}
                                            <?php endif; ?>
                                        </div>
                                        <div class="errors"></div>
                                    </div>
                                </div>
                            </div>
                        <?php endif; ?>



                        <div class="row">
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Thành phố</label>
                                    <select id="cityId" class="cityId form-control">
                                        <option value="1">Hồ Chí Minh</option>
                                    </select>
                                    <div class="errors"></div>
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Quận</label>                                    
                                    <select id="districtId" class="districtId form-control">
                                        <option value="">Chọn quận</option>
                                    </select>
                                    <div class="errors"></div>
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Phường</label>                                   
                                    <select id="wardId" class="wardId form-control">
                                        <option value="">Chọn phường</option>
                                    </select>
                                    <div class="errors"></div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Số nhà</label>
                                    <input id="houseNumber" name="houseNumber" type="text" class="form-control" placeholder="Enter ..." value="{{isset($item->houseNumber)?$item->houseNumber:""}}">
                                    <div class="errors"></div>
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Đường</label>                                   
                                    <select id="streetId" class="streetId form-control">
                                        <option value="">Chọn đường</option>
                                    </select>
                                    <div class="errors"></div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Diện tích đất</label>
                                    <input id="lotSize" name="lotSize" type="text" class="form-control" placeholder="Enter ..." value="{{$item->lotSize}}">
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Dài</label>
                                    <input id="sizeLength" name="sizeLength" value="{{$item->sizeLength}}" type="text" class="form-control" placeholder="Enter ...">
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Rộng</label>
                                    <input id="sizeWidth" name="sizeWidth" value="{{$item->sizeWidth}}" type="text" class="form-control" placeholder="Enter ...">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Diện tích sử dụng</label>
                                    <input id="floorSize" name="floorSize" type="text" class="form-control" placeholder="Enter ..." value="{{$relatedListing?$relatedListing->floorSize:""}}" >
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Hẻm</label>
                                    <input id="alley" name="alley" type="text" class="form-control" placeholder="Enter ..." value="{{$relatedListing?$relatedListing->alley:""}}" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Số tầng</label>
                                    <input id="numberFloor" name="numberFloor" type="text" class="form-control" placeholder="Enter ..." value="{{$relatedListing?$relatedListing->listing->numberFloor:""}}" />
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Số tầng của building</label>
                                    <input id="numberOfFloorsBuilding" name="numberOfFloorsBuilding" type="text" class="form-control" placeholder="Enter ..." value="{{$relatedListing?$relatedListing->numberOfFloorsBuilding:""}}" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Phòng ngủ</label>
                                    <select id="bedRooms" name="bedRooms" class="form-control">
                                        <option value="">Chọn số phòng</option>
                                        <?php for ($i = 1; $i <= 10; $i++): ?>
                                            <option value="{{$i}}" {{$item->bedrooms==$i?"selected":""}} >{{$i}}</option>
                                        <?php endfor; ?>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>WC</label>
                                    <select id="bathRooms" name="bathRooms" class="form-control">
                                        <option value="">Chọn số phòng</option>
                                        <?php for ($i = 1; $i <= 10; $i++): ?>
                                            <option value="{{$i}}" {{$item->bathrooms==$i?"selected":""}} >{{$i}}</option>
                                        <?php endfor; ?>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Giấy chủ quyền</label>
                                    <select id="useRightType" name="useRightType" class="form-control">
                                        <option value="">Chọn loại giấy chủ quyền</option>                          
                                        <?php foreach ($useRightTypes as $key => $value): ?>
                                            <option value="{{$key}}" <?php echo (isset($item->useRightTypeId) && $item->useRightTypeId == $key) ? "selected" : ""; ?> >{{$value}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <input id="" name="" type="text" class="form-control" placeholder="Enter ...">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Ngày dọn vào</label>
                                    <div class="date">                                     
                                        <div class="input-group input-append date" id="datePicker">
                                            <input id="moveInDate" type="text" class="form-control" name="" value="{{$item->moveInDate?date('d/m/Y',$item->moveInDate/1000):""}}"/>
                                            <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Thời gian tối thiểu thuê hợp đồng</label>
                                    <input id="minContractDeadline" name="minContractDeadline" type="text" class="form-control" placeholder="Enter ..."  value="{{$item->minContractDeadline}}"/>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Giá</label>
                                    <input id="price" name="price" type="text" class="form-control" value="{{number_format($item->price,0,'.',',')}}" />
                                    <div class="errors" ></div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Giá thương lượng tối thiểu</label>
                                    <input id="minPrice" name="minPrice" type="text" class="form-control" value="{{number_format($item->minPrice,0,'.',',')}}">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Đặt cọc</label>
                                    <input id="depositText" name="depositText" type="text" class="form-control" placeholder="Enter ..."   value="{{$item->depositText}}" />
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>VAT</label>
                                    <select id="isVAT" name="isVAT" class="form-control">                          
                                        <option value="">Chọn loại VAT</option>
                                        <?php
                                        $isVAT = $item->isVAT ? 1 : 0;
                                        ?>
                                        <?php foreach ($vats as $key => $value): ?>
                                            <option value="{{$key}}" {{$isVAT==$key?"selected":""}}>{{$value}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label>Hoa hồng</label>
                                    <input id="commissionText" name="commissionText" type="text" class="form-control" value="{{$item->commissionText}}" />          
                                    <div class="errors"></div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                    <label for="isGuaranteed">Độc quyền</label> &nbsp;
                                    <input id="isGuaranteed" name="isGuaranteed" type="checkbox" {{$item->isGuaranteed?"checked":""}} />          
                                    <div class="errors"></div>
                                </div>
                            </div>
                        </div>

                        <div class="row hidden">
                            <div class="col-md-12 col-xs-12">
                                <div class="form-group">
                                    <label>Note dành cho LS/TM</label>
                                    <textarea class="form-control" name="description" id="description" rows="3" placeholder="Mô tả">{{$item->note}}</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="hidden">
                            <h3 class="box-title">Hình ảnh sớ/giấy tờ</h3>
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Sổ đỏ</label>
                                        <input class="file-image" multiple type="file" class="file" data-upload-url="/">
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Sổ đỏ</label>
                                        <input class="file-image" multiple type="file" class="file" data-upload-url="/">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php if (!empty($item->diyListings)): ?>
                            <h3 class="box-title">Hình ảnh Listing</h3>
                            <div class="row">
                                <?php
                                foreach ($item->diyListings as $diyListing):
                                    foreach ($diyListing->photoList as $key => $value):
                                        //var_dump($value); continue;
                                        ?>
                                        <div class="col-sm-2" style="padding:16px;">
                                            <img src="{{$value->link}}" style="max-width: 100%; height: auto" />
                                            <div class="text-center">{{$diyListing->categoryName}}</div>
                                            <div class="text-center">{{number_format($value->distance, 2)}}m</div>
                                        </div>
                                        <?php
                                    endforeach;
                                endforeach;
                                ?>
                            </div>
                        <?php endif; ?>
                        <?php if (!empty($item->rlistingId)): ?>
                            <h3 class="box-title">Hình ảnh Listing</h3>
                            <div class="row">
                                <?php
                                foreach ($item->relatedListing->mainPhotos as $mainPhoto):
                                    ?>
                                    <div class="col-sm-2" style="padding:16px;">
                                        <img src="{{$mainPhoto->url_thumb}}" style="max-width: 100%; height: auto" />
                                    </div>
                                    <?php
                                endforeach;
                                ?>
                            </div>
                        <?php endif; ?>
                        <div class="row hidden">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Phòng khách</label>
                                    <input class="file-image" multiple type="file" class="file" data-upload-url="/">
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Phòng ngủ</label>
                                    <input class="file-image" multiple type="file" class="file" data-upload-url="/">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12 no-print">
                                <?php if ($item->rlistingId == null): ?>
                                    <button id="btnSave" class="btn btn-primary pull-right" style="margin-left: 5px;">Lưu</button>
                                    <button id="btnCreateListing" class="btn btn-primary pull-right" style="margin-left: 5px;">Tạo tin đăng đầy đủ</button>
                                <?php endif; ?>
                                <button class="btn btn-success pull-right hidden">Báo chỉnh sửa</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>

</div>


@endsection


@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>
<script src="{{loadAsset("/js/template7.min.js")}}"></script>

<script src="{{loadAsset("/plugins/autocomplete/jquery.auto-complete.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM&libraries=places&sensor=false&language=vi-VN"></script>
<script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>
<script type="text/javascript">
var uploadUrl = "{{UPLOAD_URL}}";
var sourceType = "{{$sourceType}}";
var listingItem = <?php echo json_encode($item); ?>;
var wardId = "<?php echo $item->wardId; ?>";
var districtId = "<?php echo $item->districtId; ?>";
var streetId = "<?php echo isset($item->streetId) ? $item->streetId : null; ?>";
$(function () {
    $('#datePicker').datepicker({
        format: 'dd/mm/yyyy'
    });
    $(".file-image").fileinput({
        deleteUrl: "",
        allowedFileExtensions: ['jpg', 'png', 'gif'],
        overwriteInitial: false,
        allowedFileTypes: ['image'],
        maxFileCount: 1,
        slugCallback: function (filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
    });
});
</script>

<script type="text/javascript" src="{{loadAsset("/js/diy/detail.js")}}"></script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/listing.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop
