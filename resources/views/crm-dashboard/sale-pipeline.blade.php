<?php use App\Libraries\UserAuth; ?>
@extends('layout.default')

@section('page-css')
	<style type="text/css">
   .chart {
     /* Setup the grid */
     display: grid;
     grid-auto-columns: 1fr;
     grid-template-rows: repeat(var(--scale, 100), minmax(0, 1fr)) 1.4rem;
     grid-column-gap: 5px;

     /* Generate background guides */
     /* (sub-pixel rounding errors make this imperfect) */
     --line-every: 10;
     background-image: linear-gradient(to bottom, #ccc 1px, transparent 1px);
     background-size: 100% calc((100% - 1.4rem) / var(--scale) * var(--line-every));
     
     /* other styles… */
     margin: 2em auto 1em;
     padding: 0 1em;
     position: relative;
     _max-width: 70vw;
     height: 365px;
   }

   .chart::after {
     _background: #fff;
     bottom: 0;
     content: ' ';
     height: 1.4rem;
     left: 0;
     position: absolute;
     right: 0;
   }


   /* Dates… */
   /* ------ */

   .date {
     align-items: center;
     display: flex;
     font-weight: bold;
     grid-row: -2 / span 1;
     justify-content: center;
     position: relative;
     text-align: center;
     z-index: 2;
   }


   /* Each bar on the graph… */
   /* ---------------------- */

   .bar {
     --start: calc(var(--scale) + 1 - var(--value));
     grid-row: var(--start) / -2;
     
     /* Background-Color */
     --position: calc(var(--start) / var(--scale) * 100%);
     _background-image: linear-gradient(to right, green, yellow, orange, red);
     background-size: 1600% 100%;
     background-position: var(--position) 0;
     
     /* Other styles… */
     border-radius: 5px 5px 0 0;
     color: #000;
     list-style: none;
     position: relative;
   }

   .value {
     background: #aca9a963;
     bottom: 100%;  
     display: inline-block;
     text-align: center;
     left: 50%;
     width: 100%;
     padding: 0 0.4em;
     position: absolute;
     transform: translate(-50%, -1px);
     -webkit-border-radius: 5px;
     -moz-border-radius: 5px;
     border-radius: 5px;
   }


   /* Global helpers… */
   /* --------------- */

   :root {
     font-size: 80%;
     font-family: sans-serif;
   }

   * {
     box-sizing: border-box;
   }
  </style>
@stop

@section('content')
  <div class="container">
    <div class="row" style="">
      {{-- <div class="col-md-4">
          <div style="background-color: rgba(255, 255, 255, 0.5);_position: absolute;_left: 23.5%;_top: 15%;z-index: 9;">
              @if(isset($ba_summary->reachedCover))
                <div style="padding: 10px;" class="progress-group">
                  <span class="progress-text">Đã đạt: {{$ba_summary->reachedCover}}%</span>
                  <span class="progress-number"><b>{{number_format($funel_all->deposit->depositPrice)}}</b>/{{number_format($ba_summary->target)}}</span>
                  <div class="progress sm">
                    <div class="progress-bar progress-bar-aqua" style="_background-color: #00c0ef57;width: {{$ba_summary->reachedCover}}%"></div>
                  </div>
                </div><!-- /.progress-group -->
              @else
            <div style="" class="alert alert-warning">
              Vui lòng set target.
            </div>
              @endif
          </div>
      </div>--}} 
      <div class="col-md-12">
          <div style="" class="form-inline">
              <div class="form-group" style="width: auto; margin:5px 5px 5px 0px">
                <select placeholder="Danh sách team" id="team-select" style="width:150px" class="form-control"></select>
              </div>
              <div class="form-group" style="width: auto; margin:5px 5px 5px 0px">
                <select placeholder="Danh sách nhân viên" id="users-select-filter" style="width:150px" class="form-control"></select>
              </div>
              <div class="form-group" style="width: auto; margin:5px 5px 5px 0px">
                <select onchange="changeListingTypeId($(this).val())" class="form-control">
                  <option value="1">Mua</option>
                  <option value="2">Thuê</option>
                </select>
              </div>
              <div class="form-group" style="width: auto; margin:5px 5px 5px 0px">
                  <label>Từ ngày:</label>
                  <input type="text" class="form-control fromDate" onchange="renderSalePipleV2()" value="{{date('01/m/Y')}}" placeholder="Từ ngày">
                </div>
                <div class="form-group" style="width: auto; margin:5px 5px 5px 0px">
                  <label>Đến ngày:</label>
                  <input type="text" class="form-control toDate" onchange="renderSalePipleV2()" value="{{date('d/m/Y')}}" placeholder="Đến ngày">
                </div>
              <div class="form-group" style="width: auto; margin:5px 5px 5px 0px">
                <select placeholder="Tất cả nhãn" id="card-type-select" style="width:200px" class="form-control" onchange="renderSalePipleV2()"></select>
              </div>
            </div>
      </div>
    </div>
  </div>
  
	<div class="">
		<!-- Expanding on https://css-tricks.com/making-a-bar-chart-with-css-grid/ -->

    <!-- Set "--scale" based on the data: in this case 100% -->
    <!-- Set "--value" values calculated as: "<scale> + 1 - <valueorrects-->
    <!-- (the +1 corrects for 1-index of grid-lines) -->

    <dl class="chart" style="--scale: 200;">
      
      <dt class="date" data-field="Consultation">Tư vấn</dt>
      <dd onclick="clickSaleFunel('tuvan')"  class="bar bar-booking" style="--value: 1;">
        <span class="value">0</span>
      </dd>

      <dt class="date" data-field="Touring">Touring</dt> 
      <dd onclick="clickSaleFunel('touring')" class="bar bar-touring" style="--value: 1;">
        <span class="value">0</span> 
      </dd>

      <dt class="date" data-field="Negotiating">Thương lượng</dt> 
      <dd onclick="clickSaleFunel('negotiating')" class="bar bar-negotiating" style="--value: 1;">
        <span class="value">0</span> 
      </dd>

      <dt class="date" data-field="Desposit">Đặt cọc</dt> 
      <dd onclick="clickSaleFunel('deposit')" class="bar bar-deposit" style="--value: 1;">
        <span class="value">0</span> 
      </dd>

      <dt class="date" data-field="CloseDeal">Đóng deal</dt> 
      <dd onclick="clickSaleFunel('closeDeal')" class="bar bar-meeting" style="--value: 1;">
        <span class="value">0</span> 
      </dd>
      
      <dt class="date" data-field="Pending">Pending</dt> 
      <dd onclick="clickSaleFunel('pending')" class="bar bar-touring" style="--value: 1;">
        <span class="value">0</span> 
      </dd>
    </dl>
	</div>

  <div id="wrapTableSaleFunel">
    <div style="display: none;" class="row nav-tabs-custom">
      <div class="col-md-12">
        <h2 class="title-with-line"><span style="background-color: white;">Tư vấn</span></h2>

        <div class="tab-content">
          <div class="tab-pane active" id="tab_1">
            <table id="booking-table" class="table table-striped table-striped-custom">
              <thead>
              <tr>
                <th>DealID</th>
                <th>Tên khách hàng</th>
                <th>Số ngày không đổi trạng thái</th>
                <th>Trạng thái trước đó</th>
                <th>Giá fix</th>
                <th>Tiến độ</th>
              </tr>
              </thead>
            </table>
          </div>
        </div><!-- /.tab-content -->
      </div>
    </div>

    <div style="display: none;" class="row nav-tabs-custom">
      <div class="col-md-12">
        <h2 class="title-with-line"><span style="background-color: white;">Pending</span></h2>

        <div class="tab-content">
          <div class="tab-pane active" id="tab_1">
            <table id="pending-table" class="table table-striped table-striped-custom">
              <thead>
              <tr>
                <th>DealID</th>
                <th>Tên khách hàng</th>
                <th>Số ngày không đổi trạng thái</th>
                <th>Trạng thái trước đó</th>
                <th>Giá fix</th>
                <th>Tiến độ</th>
              </tr>
              </thead>
            </table>
          </div>
        </div><!-- /.tab-content -->
      </div>
    </div>

    <div style="display: none;" class="row nav-tabs-custom">
      <div class="col-md-12">
        <h2 class="title-with-line"><span style="background-color: white;">Đóng deal</span></h2>

        <div class="tab-content">
          <div class="tab-pane active" id="tab_1">
            <h5 id="totalMeeting"></h5>
            <table id="meeting-table" class="table table-striped">
              <thead>
              <th>DealID</th>
                <th>Tên khách hàng</th>
                <th>Số ngày không đổi trạng thái</th>
                <th>Trạng thái trước đó</th>
                <th>Giá fix</th>
                <th>Tiến độ</th>
                <th>Listing ID</th>
                <th>Giá mua(giá cuối)</th>
              </tr>
              </thead>
            </table>
          </div>
        </div><!-- /.tab-content -->
      </div>
    </div>

    <div style="display: none;" class="row nav-tabs-custom">
      <div class="col-md-12">
        <h2 class="title-with-line"><span style="background-color: white;">Touring</span></h2>

        <div class="tab-content">
          <div class="tab-pane active" id="tab_1">
            <h5 id="totalTour"></h5>
            <table id="touring-table" class="table table-striped">
              <thead>
              <tr>
                <th>DealID</th>
                <th>Tên khách hàng</th>
                <th>Số ngày không đổi trạng thái</th>
                <th>Trạng thái trước đó</th>
                <th>Giá fix</th>
                <th>Tiến độ</th>
                <!-- <th>LPD</th> -->
                <!-- <th>LPC</th> -->
                <!-- <th>Tours</th> -->
                <th>Số listing đã xem</th>
                <th>Tổng số tour</th>
              </tr>
              </thead>
            </table>
          </div>
        </div><!-- /.tab-content -->
      </div>
    </div>

    <div style="display: none;" class="row nav-tabs-custom">
      <div class="col-md-12">
        <h2 class="title-with-line"><span style="background-color: white;">Thương lượng</span></h2>

        <div class="tab-content">
          <div class="tab-pane active" id="tab_1">
            <table id="negotiating-table" class="table table-striped">
              <thead>
              <tr>
                <th>DealID</th>
                <th>Tên khách hàng</th>
                <th>Số ngày không đổi trạng thái</th>
                <th>Trạng thái trước đó</th>
                <th>Giá fix</th>
                <th>Tiến độ</th>
                <th>Listing ID</th>
                <th>Giá thương lượng (giá cuối)</th>
              </tr>
              </thead>
            </table>
          </div>
        </div><!-- /.tab-content -->
      </div>
    </div>

    <div style="display: none;" class="row nav-tabs-custom">
      <div class="col-md-12">
        <h2 class="title-with-line"><span style="background-color: white;">Đặt cọc</span></h2>

        <div class="tab-content">
          <div class="tab-pane active" id="tab_1">
            <table id="deposit-table" class="table table-striped">
              <thead>
                <tr>
                <th>DealID</th>
                <th>Tên khách hàng</th>
                <th>Số ngày không đổi trạng thái</th>
                <th>Trạng thái trước đó</th>
                <th>Giá fix</th>
                <th>Tiến độ</th>
                <th>Listing ID</th>
                <th>Giá đặt cọc(giá cuối)</th>
              </tr>
              </thead>
            </table>
          </div>
        </div><!-- /.tab-content -->
      </div>
    </div>
    <!-- <div class="row" style="display: none;">
        <div class="col-md-12">
            <h2 class="title-with-line"><span>Booking</span></h2>
            <div class="box">
                <div class="box-body">
                    <table id="booking-table" class="table table-striped table-striped-custom">
                        <thead>
                            <tr>
                              <th>Tên KH</th>
                              <th>Điểm KH</th>
                              <th>Số ngày không đổi trạng thái</th>
                              <th>Tiến độ</th>
                              <th>LPD</th>
                            </tr>
                      </thead>
                      </table>
                </div>
            </div>
        </div>

    </div> -->

    <!-- <div class="row" style="display: none;">
        <div class="col-md-12">
            <h2 class="title-with-line"><span>Meeting <small id="totalMeeting"></small></span></h2>
            <div class="box">
                <div class="box-body">
                    <table id="meeting-table" class="table table-striped">
                        <thead>
                            <tr>
                              <th>Tên KH</th>
                              <th>Điểm KH</th>
                              <th>Số ngày không đổi trạng thái</th>
                              <th>Tiến độ</th>
                              <th>Số meeting</th>
                              <th>LPD</th>
                            </tr>
                      </thead>
                      </table>
                </div>
            </div>
        </div>

    </div> -->

    <!-- <div class="row" style="display: none;">
        <div class="col-md-12">
            <h2 class="title-with-line"><span>Tour <small id="totalTour"></small></span></h2>
            <div class="box">
                <div class="box-body">
                    <table id="touring-table" class="table table-striped">
                        <thead>
                            <tr>
                              <th>Tên khách hàng</th>
                              <th>Số ngày không đổi trạng thái</th>
                              <th>LPD</th>
                              <th>Tours</th>
                              <th>Số listing đã xem</th>
                            </tr>
                      </thead>
                      </table>
                </div>
            </div>
        </div>

    </div> -->

    <!-- <div class="row" style="display: none;">
        <div class="col-md-12">
            <h2 class="title-with-line"><span>Negotiate</span></h2>
            <div class="box">
                <div class="box-body">
                    <table id="negotiating-table" class="table table-striped">
                        <thead>
                            <tr>
                              <th>Tên KH</th>
                              <th>Listing ID đang thương lượng</th>
                            </tr>
                      </thead>
                      </table>
                </div>
            </div>
        </div>

    </div> -->

    <!-- <div class="row" style="display: none;">
        <div class="col-md-12">
            <h2 class="title-with-line"><span>Deposit</span></h2>
            <div class="box">
                <div class="box-body">
                    <table id="deposit-table" class="table table-striped">
                        <thead>
                            <tr>
                              <th>Tên KH</th>
                              <th>Listing ID đặt cọc</th>
                            </tr>
                      </thead>
                      </table>
                </div>
            </div>
        </div>

    </div> -->
  </div>
    {{--<table id="booking-table" class="table table-striped table-striped-custom">--}}
      {{--<thead>--}}
      {{--<tr>--}}
        {{--<th>Tên KH</th>--}}
        {{--<th>Điểm KH</th>--}}
        {{--<th>Số ngày không đổi trạng thái</th>--}}
        {{--<th>Giá fix</th>--}}
        {{--<th>Tiến độ</th>--}}
        {{--<!-- <th>LPL</th> -->--}}
        {{--<th>LPD</th>--}}
      {{--</tr>--}}
      {{--</thead>--}}
    {{--</table>--}}
@stop

@section('page-js')
  <script type="text/javascript">
    var listingTypeId = 1; 
    var fromDate = null;
    var toDate = null;
    
    function renderSalePipleV2(){
      $('#wrapTableSaleFunel .row').hide();
      var configChart = [
        ["Element", "Tổng số", { role: "style" }, {type: 'string', role: 'tooltip', 'p': {'html': true}} ]
      ];
      var changePosition = {
        Consultation: 'consultation-#3c8dbc',
        CloseDeal: 'closeDeal-#00c0ef',
        Touring: 'tour-#00a65a',
        Negotiating: 'negotiate-#f39c12',
        Pending: 'pending-#3c8dbc',
        Desposit: 'deposit-#f56954'
      }
      

      funnel_all = {
        negotiate: {
          total: 0,
          listingPrice: 0,
          dealPrice: 0,
          depositPrice: 0,
          formattedListingPrice: '0 ',
          formattedDealPrice: '0',
          formattedDepositPrice: '0',
          status: 26
        },
        consultation: {
          total: 0,
          listingPrice: 0,
          dealPrice: 0,
          depositPrice: 0,
          formattedListingPrice: '0 ',
          formattedDealPrice: '0 ',
          formattedDepositPrice: '0 ',
          status: 24
        },
        pending: {
          total: 0,
          listingPrice: 0,
          dealPrice: 0,
          depositPrice: 0,
          formattedListingPrice: '0 ',
          formattedDealPrice: '0 ',
          formattedDepositPrice: '0 ',
          status: 28
        },
        deposit: {
          total: 0,
          listingPrice: 0,
          dealPrice: 0,
          depositPrice: 0,
          formattedListingPrice: '0 ',
          formattedDealPrice: '0 ',
          formattedDepositPrice: '0 ',
          status: 29
        },
        closeDeal: {
          total: 0,
          listingPrice: 0,
          dealPrice: 0,
          depositPrice: 0,
          formattedListingPrice: '0 ',
          formattedDealPrice: '0 ',
          formattedDepositPrice: '0 ',
          status: 27
        },
        tour: {
          total: 0,
          listingPrice: 0,
          dealPrice: 0,
          depositPrice: 0,
          formattedListingPrice: '0 ',
          formattedDealPrice: '0 ',
          formattedDepositPrice: '0 ',
          status: 25
        }
      }
      var total = 0;
      fromDate = $(".fromDate").val().trim();
      if (fromDate != "") {
          fromDate = moment(fromDate, "DD/MM/YYYY").unix() * 1000;
      } else {
          fromDate = 0;
      }
      toDate = "23:59 "+$(".toDate").val().trim();
      if (toDate != "") {
          toDate = moment(toDate, "H:i DD/MM/YYYY").unix() * 1000;
      } else {
          toDate = moment().unix() * 1000;
      }
      showPropzyLoading();
      let userIds = $("#users-select-filter").val();
      let cardTypeId = $("#card-type-select").val();
      $.each(funnel_all, function(status,item){
        $.ajax({
        'url': '/crm-dashboard/get-data-sale-pipeline-by-type/'+listingTypeId+'/'+item.status+'/'+fromDate+'/'+toDate,
        'type': 'post',
        'data': JSON.stringify({
          "listUserIds": userIds == null ? ((currentUser.departmentIds.indexOf(12) != -1 && currentUser.departments[0].isGroupAdmin  == true) ? [-1] : [currentUser.userId]) : userIds,
          "departmentId":null,
          "scoreCardType":cardTypeId != null && cardTypeId != 0 ? cardTypeId : null
        })
        }).done(function (response) {
          console.log('----------response---------');
          console.log(response);
          funnel_all[status] = response.data;
          console.log('---EACH---');
          $.each(changePosition,function(key, value){
            $.each(funnel_all,function(k,v){
              var priceLabel = v.percent + '%';
              // if(key == 'Negotiating'){
              //   priceLabel = v.formattedListingPrice;
              // }else if(key == 'Desposit'){
              //   priceLabel = v.formattedDepositPrice;
              // }
              if(k == value.split('-')[0]){
                configChart.push([
                  key,
                  v.total,
                  value.split('-')[1],
                  priceLabel,
                  v.avgScore
                ]);
                if(v.total > total){
                  total = v.total;
                }
              }
            })
          })
          console.log('------------Total----------');
          console.log(total);
          console.log('------------Config chart----------');
          console.log(configChart);
          $.each(configChart,function(k,v){
            $('.date').each(function(index){
              if($(this).data('field') == v[0]){
                // var totalElement = (v[1]+1)*2;
                if(v[1] == total && v[1] != 0){
                  var totalElement = 100;
                }else{
                  var totalElement = Math.floor((v[1] * 100) / total); 
                }
                if(totalElement == 0){
                  totalElement = 1;
                }
                $(this).next().attr('style','--value:'+totalElement);
                if(totalElement > 365){
                  $(this).next().attr('style','--value:365');
                }
                var labelElement = v[3]+'<br/> Tổng số: '+v[1] + '<br/> Điểm TB: ' + Math.round(v[4] * 1000)/1000;
                $(this).next().find('.value').html(labelElement);
              }
            })
          })
          return false;
        }).always(function () {
          hidePropzyLoading();
        });
      })

      console.log('----done----');
    }
    function changeListingTypeId(id){
      $('#wrapTableSaleFunel .row').hide();
      listingTypeId = id;
      renderSalePipleV2();
    }
    
    $(document).ready(function(){
      loadDepartmentsForFilter();
      renderSalePipleV2();
      checkUserRole();
      $(".fromDate").datepicker({
        "format": "dd/mm/yyyy"
      });
      $(".toDate").datepicker({
        "format": "dd/mm/yyyy"
      });
      $(".nav a").on("click", function(){
         $(".nav").find(".active").removeClass("active");
         $(this).parent().addClass("active");
      });
    })
    
  </script>
  <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
  <script type="text/javascript" src="{{loadAsset('js\crm-sale-pipeline\sale-funel-config.js') }}"></script>
  <script type="text/javascript" src="{{loadAsset('js\crm-sale-pipeline\function.js') }}"></script>
  <script type="text/javascript" src="{{loadAsset('js\crm-sale-pipeline\scripts.js') }}"></script>
  <script type="text/javascript" src="{{loadAsset('js\jm_commons\leadDealDetail\scripts.js')}}"></script>
@stop