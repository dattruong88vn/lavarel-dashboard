@extends('layout.default')

@section('content')
    <div class='dashboard'>
       <section>
            <h1>Giao Dịch Cần Ưu Tiên</h1>
        </section>
        <section>
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title"># </h3>
                        </div><!-- /.box-header -->
                        <div class="box-body">
                            <table id="table-transac" class="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Tên Khách Hàng</th>
                                    <th>Sale</th>
                                    <th>Type</th>
                                    <th>Số Listing Còn Lại</th>
                                    <th>Sale Agent</th>
                                    <th>Listing Agent</th>
                                    <th>#</th>
                                </tr>
                                </thead>
                                <tbody>

                                @foreach($noticedList as $item)
                                    <tr>
                                        <td>{{ $item->transactionId }}</td>
                                        <td>{{ $item->customer->name }}</td>
                                        <td>{{ $item->agent->name }}</td>
                                        <td align="center">
                                            @if ($item->requestId != null)
                                                <span class="icon-yes"></span>
                                            @else
                                                <span class="icon-no"></span>
                                            @endif
                                        </td>
                                        <td>{{ count($item->transactionRelatedListings) }}</td>
                                        <td><a href="javascript:void(0)" class="send-transaction" onclick="getRequestDataByTransaction({{isset($item->requestId) ? $item->requestId : -1}},{{$item->transactionId}},'{{ url('request-manager/get-detail/'.$item->requestId) }}',2)" transaction-id="{{$item->transactionId}}">Gửi Giao Dịch</a></td>
                                        <td><a href="javascript:void(0)" class="send-transaction" onclick="getRequestDataByTransaction({{isset($item->requestId) ? $item->requestId : -1}},{{$item->transactionId}},'{{ url('request-manager/get-detail/'.$item->requestId) }}',3)" transaction-id="{{$item->transactionId}}">Gửi Giao Dịch</a></td>
                                        <td><a href="/transaction-manager/noticed-transaction-history/1">Xem lịch sử</a></td>
                                    </tr>
                                @endforeach

                                </tbody>
                                <tfoot>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Tên Khách Hàng</th>
                                    <th>Sale</th>
                                    <th>Số Listing Còn Lại</th>
                                    <th>Sale Agent</th>
                                    <th>Listing Agent</th>
                                    <th>Action</th>
                                </tr>
                                </tfoot>
                            </table>
                        </div><!-- /.box-body -->

                    </div><!-- /.box -->
                </div>
            </div>
        </section>

        <div id="giao-dich-popup" class="white-popup mfp-hide zoom-anim-dialog" style="max-width:1000px">
              <a href="#" class="mpf-close-cus">X close</a>
              <div class="content-popup">
                  <div class="title">
                    <h1>Gửi Giao Dịch</h1>
                  </div>
                  <div class="inner-popup box">
                    <div class="box-body">
                      <form action="" id="frmSearchListing" name="frmSearchListing" method="post">
                            <input type="hidden" id="transactionId" value="">
                            <input type="hidden" id="type" value="">
                            <div class="form-group">
                                <label>Địa Điểm - <i class="check-all"><input type="checkbox" id="check-all">Check All</i></label>
                                <div class="checkbox">
                                    @foreach($districtList as $item)
                                        <label class="w-15">
                                            <input type="checkbox" id="requestListDistricts" name="requestListDistricts" value="{{ $item->districtId }}"
                                                   <?php
                                                   $requestListDistricts = df_ref($requestData['requestListDistricts'], array());
                                                   foreach ($requestListDistricts as $reqDistrict)
                                                       if($item->districtId == $reqDistrict['districtId'])
                                                           echo 'checked';
                                                   ?>
                                                   class="address-check">
                                            {{ $item->districtName }}
                                        </label>
                                    @endforeach
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label>Loại Hình Giao Dịch</label>
                                        <select id="listingTypeId" name="listingTypeId" class="form-control select2" style="width: 100%;">
                                            <option value="0">-- Chọn loại hình giao dịch --</option>
                                            <option value="{{ FOR_RENT }}">Thuê</option>
                                            <option value="{{ FOR_SELL }}">Mua</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label>Mục đích kinh doanh</label>
                                        <select id="purposeTypeId" name="purposeTypeId"class="form-control select2" style="width: 100%;">
                                            <option value="0">-- Chọn mục đích kinh doanh --</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label>Loại Bất Động Sản</label>
                                        <select id="propertyTypeId" class="form-control select2" style="width: 100%;" tabindex="-1" aria-hidden="true">
                                            <option value="0">-- Chọn loại hình bất động sản --</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <label>Phòng Ngủ</label>
                                        <select id="bedrooms" name="bedrooms" class="form-control select2" style="width: 100%;">
                                            <option value="0">-- Chọn số phòng ngủ</option>
                                            @for($i = 1 ; $i <= 10 ; $i++)
                                                <option value="{{ $i }}">{{ $i }}</option>
                                            @endfor
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <label>Phòng Tắm</label>
                                        <select id="bathrooms" name="bathrooms" class="form-control select2" style="width: 100%;">
                                            <option value="0">-- Chọn số phòng tắm</option>
                                            @for($i = 1 ; $i <= 10 ; $i++)
                                                <option value="{{ $i }}">{{ $i }}</option>
                                            @endfor
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <label>Hướng Nhà</label>
                                        <select name="" id="direction" class="form-control select2" style="width: 100%;" tabindex="-1" aria-hidden="true">
                                            @foreach(unserialize(SEL_DERECTION) as $key => $value)
                                                <option value="{{ $key }}">{{ $value }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <label>Năm Xây Dựng</label>
                                        <select name="" id="yearBuilt" class="form-control select2" style="width: 100%;" tabindex="-1" aria-hidden="true">
                                            <option value="0">-- Chọn năm xây dựng --</option>
                                            @foreach(unserialize(SEL_YEARS) as $key => $value)
                                                <option value="{{ $key }}" <?= df_ref($requestData['yearBuild']) == $key ? 'selected' : ''; ?>>{{ $value }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>


                            </div>

                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <label>Diện Tích Từ</label>
                                        <input type="text" id="minSize" name="minSize" class="form-control" value="" placeholder="Diện Tích Từ">
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <label>Đến</label>
                                        <input type="text" id="maxSize" name="maxSize" class="form-control" value="" placeholder="Đến">
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <label>Giá Từ</label>
                                        <input type="text" id="minPrice" name="minPrice" class="form-control" value="" placeholder="Giá Từ">
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <label>Đến</label>
                                        <input type="text" id="maxPrice" name="maxPrice" class="form-control" value="" placeholder="Đến">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Tạo cách đây (Số ngày)</label>
                                        <input type="text" id="timePosted" name="timePosted" class="form-control txt-dv" value="" placeholder="Tạo cách đây [x] ngày" style="width: 100%;">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label>Note</label>
                                        <textarea id="message" name="message" class="form-control" rows="2" placeholder="Note" tabindex="9">{{ df_ref($requestData['message']) }}</textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="box-footer">
                                <button type="button" id="btnSendTransaction" onclick="" class="btn btn-primary pull-right">Gửi</button>
                            </div>
                        </form>
                    </div>
                  </div>
              </div>
            </div>


    </div>
@endsection


@section('page-js')

    <script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
    <script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
    <script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>

    <script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <script src="{{loadAsset("/js/helper.js")}}"></script>
    <script>
        fixDataTableVNSearch("#table-transac");    
    </script>
    <script src="{{loadAsset("/js/dashboard.js")}}"></script>
    <script src="{{loadAsset("/js/function.js")}}"></script>
    <script language="JavaScript">
        json_str = '<?= json_encode($allListingTypeInfo); ?>';
        json_direction = '<?= json_encode(unserialize(SEL_DERECTION)); ?>';
        json_year = '<?= json_encode(unserialize(SEL_YEARS)); ?>';
        var listingTypeObj;
        var directionList;
        var yearList;

        $(function(){
            listingTypeObj = JSON.parse(json_str);
            directionList = JSON.parse(json_direction);
            yearList = JSON.parse(json_year);
            //console.log(directionList);

            $('#btnSendTransaction').click(function(){

                var dataPost;
                var arrDistrict = [];
                $('div.checkbox input:checkbox[name=requestListDistricts]').each(function() 
                {    
                    if($(this).is(':checked')){
                        var district = {
                            "districtId":$(this).val()
                        }
                    }
                      arrDistrict.push(district);
                });
                console.log(arrDistrict);

                var request = {
                   "bathrooms": $('#bathrooms').val() != 0 ? $('#bathrooms').val() : null,
                   "bedrooms":$('#bedrooms').val() != 0 ? $('#bedrooms').val() : null,
                   "confirmedListing":null,
                   "directionId":$('#direction').val() != 0 ? $('#direction').val() : null,
                   "listingTypeId":$('#listingTypeId').val() != 0 ? $('#listingTypeId').val() : null,
                   "propertyTypeId":$('#propertyTypeId').val() != 0 ? $('#propertyTypeId').val() : null,
                   "purposeId":$('#purposeTypeId').val() != 0 ? $('#purposeTypeId').val() : null,
                   "minSize":$('#minSize').val() != "" ? $('#minSize').val() : null,
                   "maxSize":$('#maxSize').val() != "" ? $('#maxSize').val() : null,
                   "minPrice":$('#minPrice').val() != "" ? $('#minPrice').val() : null,
                   "maxPrice":$('#maxPrice').val() != "" ? $('#maxPrice').val() : null,
                   "timePosted":$('#timePosted').val() != "" ? $('#timePosted').val() : null,
                   "yearBuild":$('#yearBuilt').val() != 0 ? $('#yearBuilt').val() : null,
                   "message":$('#message').val() != "" ? $('#message').val() : null,
                   "requestListDistricts":arrDistrict
                }

                dataPost = {
                    "transactionId":$('#transactionId').val(),
                    "type":$('#type').val(),
                    "request":request
                }

                post_sync("/transaction-manager/send-transaction", dataPost, true, function(data){
                    if(data['result'] == true){
                        showPageAlert('Message', data.message);
                    }
                    else{
                        showPageAlert('Message', data.message);
                    }       
               });  

                //console.log(data);
            });
        });

        function getRequestDataByTransaction(requestId, transactionId, url, type){
            if (requestId == -1) {
                displayPopup(transactionId, type, null);
            }else{
                if(url == 'none')
                    return;

                get_sync(url, false, function(data){
                    if(data.result) {
                        //showPageAlert('Message', data.message);
                        //current_link.attr('data-url', 'none');
                        //current_link.html('Đã gửi');
                        displayPopup(transactionId, type, data.data);
                    }
                    else
                        displayPopup(transactionId, type, null);
                });
            }
        }

        function displayPopup(transactionId, type, requestData){
            //Set value for request form
            if(requestData != null){
                console.log(requestData);
                districts = requestData.requestListDistricts;
                for(i = 0; i < districts.length; i++){
                    $('#requestListDistricts[value="'+districts[i].districtId+'"]').attr("checked","checked");
                }

                var listingTypeId = requestData.listingTypeId;
                var purposeTypeId = requestData.purposeId;
                var propertyTypeId = requestData.propertyTypeId;
                var bedrooms = requestData.bedrooms;
                var bathrooms = requestData.bathrooms;
                var directionId = requestData.directionId;
                var yearBuild = requestData.yearBuild;

                var htmtListingType='<option value="0">-- Chọn loại hình giao dịch --</option>';
                var htmlPurpose='<option value="0">-- Chọn mục đích kinh doanh --</option>';
                var htmlProperty='<option value="0">-- Chọn loại hình bất động sản --</option>';
                var htmlBedrooms='<option value="0">-- Chọn số phòng ngủ --</option>';
                var htmlBathrooms='<option value="0">-- Chọn số phòng tắm --</option>';
                var htmlDirection='<option value="0">-- Chọn hướng --</option>';
                var htmlYearBuilt='<option value="0">-- Chọn năm xây dựng --</option>';

                $.each(listingTypeObj, function( index, listing ) {
                    if(requestData.listingTypeId != null){
                        if(listing.id == requestData.listingTypeId)
                            htmtListingType += '<option value="'+listing.id+'" selected>'+listing.name+'</option>';
                        else
                            htmtListingType += '<option value="'+listing.id+'">'+listing.name+'</option>';

                        $.each(listing.list, function( index, purpose ) {
                            if(purposeTypeId != null){
                                if(purposeTypeId == purpose.id)
                                    htmlPurpose += '<option value="'+purpose.id+'" selected>'+purpose.name+'</option>';
                                else
                                    htmlPurpose += '<option value="'+purpose.id+'">'+purpose.name+'</option>';

                                $.each(purpose.list, function(index, property){
                                    if(propertyTypeId != null){
                                        if(property.id == propertyTypeId)
                                            htmlProperty += '<option value="'+property.id+'" selected>'+property.name+'</option>';
                                        else
                                            htmlProperty += '<option value="'+property.id+'">'+property.name+'</option>';
                                    }    
                                });
                            }
                        });
                    }
                });
                $('#listingTypeId').html(htmtListingType).select2();
                $('#purposeTypeId').html(htmlPurpose).select2();
                $('#propertyTypeId').html(htmlProperty).select2();

                for(i = 1; i <= 10; i++){
                    if(bedrooms != null){
                        if(bedrooms == i)
                            htmlBedrooms += '<option value="'+i+'" selected>'+i+'</option>';
                        else
                            htmlBedrooms += '<option value="'+i+'">'+i+'</option>';
                    }else{
                        htmlBedrooms += '<option value="'+i+'">'+i+'</option>';
                    }
                }
                $('#bedrooms').html(htmlBedrooms).select2();

                for(i = 1; i <= 10; i++){
                    if(bathrooms != null){
                        if(bathrooms == i)
                            htmlBathrooms += '<option value="'+i+'" selected>'+i+'</option>';
                        else
                            htmlBathrooms += '<option value="'+i+'">'+i+'</option>';
                    }else{
                        htmlBathrooms += '<option value="'+i+'">'+i+'</option>';
                    }
                }
                $('#bathrooms').html(htmlBathrooms).select2();

                $.each(directionList, function( index, direction ) {
                    if(directionId != null){
                        if(directionId == index)
                            htmlDirection += '<option value="'+index+'" selected>'+direction+'</option>';
                        else
                            if(index > 0)
                                htmlDirection += '<option value="'+index+'">'+direction+'</option>';
                    }else{
                        if(index > 0)
                            htmlDirection += '<option value="'+index+'">'+direction+'</option>';
                    }
                });

                $('#direction').html(htmlDirection).select2();

                $.each(yearList, function( index, year ) {
                    if(yearBuild != null){
                        if(yearBuild == index)
                            htmlYearBuilt += '<option value="'+index+'" selected>'+year+'</option>';
                        else
                            if(index > 0)
                                htmlYearBuilt += '<option value="'+index+'">'+year+'</option>';
                    }else{
                        if(index > 0)
                            htmlYearBuilt += '<option value="'+index+'">'+year+'</option>';
                    }
                });

                $('#yearBuilt').html(htmlYearBuilt).select2();

                if(requestData.minSize != null)
                    $('#minSize').val(requestData.minSize);
                if(requestData.maxSize != null)
                    $('#maxSize').val(requestData.maxSize);
                if(requestData.minPrice != null)
                    $('#minPrice').val(requestData.minPrice);
                if(requestData.maxPrice != null)
                    $('#maxPrice').val(requestData.maxPrice);
                if(requestData.timePosted != null)
                    $('#timePosted').val(requestData.timePosted);
            }
            $('#transactionId').val(transactionId);
            $('#type').val(type);
            //End set
            $.magnificPopup.open({
                items: {
                    src: '#giao-dich-popup',
                    type: 'inline',
                },
                closeOnBgClick: false,
                removalDelay: 50,
                callbacks: { 
                    close: function() {
                        // Will fire when popup is closed
                        //UI.GA.ga_post('Promoter Prep Signup' , 'Promoter Prep Signup Status', 'SignUp  Cancel');
                    }
                }
            });
        }

        $('#listingTypeId').change(function(){
            console.log('listingTypeId');
            var htmlProperty='<option value="0">-- Chọn loại hình bất động sản --</option>';
            var htmlPurpose='<option value="0">-- Chọn mục đích kinh doanh --</option>';
            curr_listing_id = parseInt($(this).val());
            if(curr_listing_id == 0)
            {
                $('#propertyTypeId').html(htmlProperty).select2();
                $('#purposeTypeId').html(htmlPurpose).select2();
                return;
            }
            $.each(listingTypeObj, function( index, listing ) {
                if(listing.id == curr_listing_id)
                {
                    $.each(listing.list, function( index, purpose ) {
                        htmlPurpose += '<option value="'+purpose.id+'">'+purpose.name+'</option>';
                    });
                    $('#propertyTypeId').html(htmlProperty).select2();
                }
            });

            $('#purposeTypeId').html(htmlPurpose).select2();
            $('#propertyTypeId').html(htmlProperty).select2();
        });

        $('#purposeTypeId').change(function(){
            curr_listing_id = parseInt($('#listingTypeId').val());
            curr_purpose_id = parseInt($(this).val());
            var htmlProperty='<option value="0">-- Chọn loại hình bất động sản --</option>';
            if(curr_purpose_id == 0)
            {
                $('#propertyTypeId').html(htmlProperty).select2();
                return;
            }

            $.each(listingTypeObj, function( index, listing ) {

                if(listing.id == curr_listing_id)
                {
                    $.each(listing.list, function( index, purpose ) {
                        if(purpose.id == curr_purpose_id) {
                            $.each(purpose.list, function(index, property){
                                htmlProperty += '<option value="'+property.id+'">'+property.name+'</option>';
                            });
                            $('#propertyTypeId').html(htmlProperty).select2();
                        }
                    });
                }

            });
        });
    </script>




@append

@section('page-css')
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop