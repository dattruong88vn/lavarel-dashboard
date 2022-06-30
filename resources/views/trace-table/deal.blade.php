<?php
function renderAlley($object)
{
  // "listingPositions": {
  //             "rlistingId": 21407,
  //             "postion": null,
  //             "alleyId": null,
  //             "postionName": "Hẻm",
  //             "alleyTypeName": "Hẻm thông",
  //             "alleyName": "Xe ba gác",
  //             "widthFrontWay": null,
  //             "roadFrontageWidth": null,
  //             "widthValue": null,
  //             "alleyWidth": 4
  //         }
  if (empty($object)) {
    $return = "N/A";
  } else {
    $return = "N/A";
    // mặt tiền
    if (!empty($object->postionName) && $object->postionName != 'Hẻm') {
      $roadFrontageWidth = !empty($object->roadFrontageWidth) ? ' (' . $object->roadFrontageWidth . 'm)' : '';
      $return = $object->postionName . $roadFrontageWidth;
    } elseif (!empty($object->postionName)) {
      $alleyName = !empty($object->alleyName) ? ' - ' . $object->alleyName : '';

      $alleyWidth = !empty($object->alleyWidth) ? ' (' . $object->alleyWidth . 'm)' : '';
      $typeName = !empty($object->alleyTypeName) ? ' - ' . $object->alleyTypeName : '';

      $roadFrontageDistanceFrom = '';
      if ($object->roadFrontageDistanceFrom == 0) {
        $roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: <= 100m';
      } else if ($object->roadFrontageDistanceFrom == 100) {
        $roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: 100m - 200m';
      } else if ($object->roadFrontageDistanceFrom == 200) {
        $roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: 200m - 500m';
      } else if ($object->roadFrontageDistanceFrom == 500) {
        $roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: >500';
      }

      $return = $object->postionName . $alleyWidth . $typeName . $alleyName . $roadFrontageDistanceFrom;
    }
  }

  return $return;
}
?>
<div class="nav-tabs-custom">
  <ul id="countTabFollowing" class="nav nav-tabs">
    <!-- <li class="active pull-right"><a onclick="emailListingTableRender()" href="#email_tab_content" data-toggle="tab">Listing đã giới thiệu <span class="badge">{{!empty($countListing['sent_mail']) || $countListing['sent_mail'] == 0 ? $countListing['sent_mail']:"N/A"}}</span></a></li> -->
    <li class="active pull-right" id="like-listing-table"><a onclick="likeListingTableRender()" href="#ganery_tab_content" data-toggle="tab">Bộ sưu tập <span class="badge">{{!empty($countListing['basket']) || $countListing['basket'] == 0 ?$countListing['basket']:"N/A"}}</span></a></li>
    <li class="pull-right"><a onclick="notLikeListingTableRender();return false;" href="#not_like" data-toggle="tab">Listing đã xóa khỏi BST <span class="badge">{{!empty($countListing['not_basket']) || $countListing['not_basket'] == 0 ?$countListing['not_basket']:"N/A"}}</span></a></li>
    <li class="pull-right"><a href="#touredTab" data-toggle="tab">Listing đã xem <span class="badge">{{!empty($countListing['scheduled']) || $countListing['scheduled'] == 0 ? $countListing['scheduled']:"N/A"}}</span></a></li>
  </ul>
  <div class="tab-content">
    <div class="tab-pane customDatatable" id="email_tab_content">
      <div class="row">
        <div class="col-md-4">
          <select class="filterChange filterValuations form-control"></select>
        </div>
        <div class="col-md-4">
          <select class="filterChange filterLegals form-control"></select>
        </div>
        <div class="col-md-4">
          <select class="filterChange filterSourceBys form-control"></select>
        </div>
      </div>
      <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
      <table id="emailListing" class="table-striped-custom table table-striped prevent-copy min-width-full">
        <thead>
          <tr>
            <th></th>
            <th style="max-width: 200px">LID</th>
            <th style="">Mức yêu thích</th>
            <th style="">Phân loại</th>
            <th style="">Trạng thái</th>
            <th style="">Hình nhà</th>
            <th style="">Hình sổ</th>
            <th width="100px">Giá</th>
            <th width="250px">Diện tích (R x D)</th>
            <th width="200px">Địa chỉ</th>
            <th style="">Loại listing</th>
            <th style="">Hướng</th>
            <th width="100px" style="">Trạng thái ảo</th>
            <th>Người phụ trách</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div><!-- /.tab-pane -->
    <div class="tab-pane" id="touredTab">
      @if(isset($touredTab->list) && count($touredTab->list) > 0)
      @foreach($touredTab->list as $tour)
      <h4>Tour ngày {{ date('d-m-Y', $tour->scheduleTime/1000) }}</h4>
      <table class="table-striped-custom table table-striped prevent-copy">
        <THEAD>
          <tr>
            <th></th>
            <th style="">LID</th>
            <th style="">TTYT</th>
            <th style="">Trạng thái</th>
            <th style="">Hình nhà</th>
            <th style="">Hình sổ</th>
            <th width="100px">Giá</th>
            <th width="250px">Diện tích (R x D)</th>
            <th width="200px">Địa chỉ</th>
            <th style="">Loại listing</th>
            <th style="">Hướng</th>
            <th>Người phụ trách</th>
          </tr>
        </THEAD>
        <tbody>
          @foreach($tour->listings as $listing)
          <tr @if(isset($listing->isPrivate) && $listing->isPrivate)
            style='background-color:#4bc0c0'
            @elseif(isset($listing->isGuaranteed) && $listing->isGuaranteed)
            style='background-color:#ffcd56'
            @endif
            >

            <td><input type="checkbox" data-rlisting='{"rlistingId":{{$listing->rlistingId}},"price":{{$listing->price}}}' isBooked="true" onclick="storeCheckListing(this)" class="selected-email-listing selected-listing-{{$listing->rlistingId}}" value="{{$listing->rlistingId}}"></td>
            <td>
              <a href="#" onclick="JMDetail.openModalListingDetailForAllPage({{$listing->rlistingId}});return false;">{{$listing->rlistingId}}</a>
              <?php
              $label = "";
              switch ($listing->listingAction) {
                case "sent_sms":
                  $label = '<small class="label bg-blue">Đã SMS</small>';
                  break;
                case "diy_not_available":
                  $label = '<small class="label bg-orange">DIY (không còn trống)</small>';
                  break;
                case "sent_mail":
                  $label = '<small class="label bg-green">Đã Email</small>';
                  break;
                case "scheduled":
                  $label = '<small class="label bg-blue">Đã đi tour</small>';
                  break;
                case "sent_sms_and_email":
                  $label = '<small class="label bg-green">Đã sms &  email</small>';
                  break;
                case "liked":
                  $label = '<small class="label bg-red">Yêu thích</small>';
                  break;
                case "rejected":
                  $label = '<small class="label bg-orange">Từ chối hợp tác</small>';
                  break;
                case "rented":
                  $label = '<small class="label bg-orange">Đã bán - DealID: ' . $listing->dealId . '</small>';
                  break;
                case "deactivated":
                  $label = '<small class="label bg-orange">Tạm ngưng giao dịch</small>';
                  break;
                case "deactivated_by_saas":
                  $label = '<small class="label bg-orange">Tạm ngưng từ SaaS</small>';
                  break;
                default:
                  $label = '';
              }
              $sourceName = "";
              $arraySourceId = [171, 166, 3];
              if (in_array($listing->sourceId, $arraySourceId)) {
                $sourceName = '<small class="label bg-orange">Nguồn: ' . $listing->sourceName . '</small>';
              }
              $scorecardName = "";
              if ($listing->scorecardType != null) {
                switch ($listing->scorecardType) {
                  case 1637:
                    $colorLabel = "label-high";
                    break;
                  case 1638:
                    $colorLabel = "label-medium";
                    break;
                  case 1639:
                    $colorLabel = "label-low";
                    break;
                  default:
                    $colorLabel = "label-unclassified";
                    break;
                }
                // let html = "<a href='#' "+style+" onclick='JMDetail.openModalListingDetailForAllPage("+data+");return false;'>"+data+"</a> " + star + sourceName + isDiy +label;
                $scorecardName = "<p>" . (!empty($listing->scorecardType) ? "<span><i class='fa fa-circle " . $colorLabel . "'></i> " . $listing->scorecardName . "</span>" : "") . (!empty($listing->score) ? " - Điểm: (" . $listing->score . ")" : "") . "</p>";
              }
              ?>
              {!! $label.$sourceName.$scorecardName !!}
              @if(isset($listing->bpoLabel) && $listing->bpoLabel !== 'N/A' && $listing->bpoLabel !== 'C' && $listing->bpoLabel !== '' && $listing->bpoLabel !== 'Đã BPO')
              <p><b>BPO: {{ $listing->bpoLabel }}</b></p>
              @endif
              <!-- @if(isset($listing->bpoLabel) && $listing->bpoLabel !== 'N/A' && $listing->bpoLabel !== 'C' && $listing->bpoLabel !== '' && $listing->bpoLabel == 'Đã BPO')
                <small class="label bg-green"><b style="font-size: 12px;">{{ $listing->bpoLabel }}</b></small>
              @endif -->
            </td>
            <td>
              {{ $listing->favoriteOrder ? $listing->favoriteOrder : 'NA' }}
            </td>
            <!-- combile logic to show only one legal value  -->
            <td>{{ $listing->legal ? $listing->legal : 'NA' }}
              @if($leadDealDetail->progressId == 1 || $leadDealDetail->progressId == 3)
              <?php
              $jsonShowNego = json_encode((object) ['rlistingId' => $listing->rlistingId, 'price' => $listing->price]);
              ?>
              <br><a href="#" style="text-decoration: underline;" onclick="JMDetail.showNegotiateModal({{$jsonShowNego}}); return false;" class="label bg-orange">Xem xét lại</a>
              @endif

              @if(!empty($listing->inventoryStatusId) && $listing->inventoryStatusId == 1)
                <br><small class="label" style="background-color: #696969 !important;">Archived</small>
              @endif
            </td>

            <!-- @if(!empty($listing->inventoryStatusId) && $listing->inventoryStatusId == 1)
            <td>
              {{ $listing->legal ? $listing->legal : 'NA' }}
              <br><small class="label" style="background-color: #696969 !important;">Archived</small>
            </td>
            @else
            <td>
              {{ $listing->legal ? $listing->legal : 'NA' }}
            </td>
            @endif -->

            @if(!empty($listing->photo))
            <td>
              <img class="" onclick="JMDetail.openPhoto(this)" onerror="imgError(this);" style="width:48px;height: auto;" src="{{ $listing->photo->link }}">
              <div class="pinkBookPhotos hidden">{{ json_encode($listing->photoUrls || [$listing->photo->link]) }}</div>
              <!-- renderPhoto -->
            </td>
            @else
            <td></td>
            @endif

            <td>
              <div class="render-redOrPink-{{$listing->rlistingId}}"></div>
              <script>
                // tracking ba view pink or red in php layer
                $(document).ready(function() {
                  renderRedOrPinkBookForPHPLayer(JSON.parse(`{!!addslashes(json_encode($listing)) !!}`))
                });
              </script>
            </td>

            <td>{!! $listing->formatPrice !!}</td>
            <td>{!! $listing->floorSize !!} ({!! $listing->sizeWidth !!} x {!! $listing->sizeLength !!}) <br /> {!! renderAlley($listing->listingPositions) !!}</td>
            <?php
            $tmp = !empty($listing->privacyName) ? '-' . $listing->privacyName : '';
            ?>

            <td>
              <div class="render-address-{{$listing->rlistingId}}">
                {{ $listing->isShortAddress ? $listing->maskedAddress : $listing->address }}
              </div>
              @if(empty($listing->isShortAddress))
              <script>
                // tracking ba view address in php layer
                 $(document).ready(function() {
                  renderAddressForListingLeadDealForPHPLayer(JSON.parse(`{!!addslashes(json_encode($listing)) !!}`))
                });
              </script>
              @endif
            </td>

            <td>{!! $listing->sourceBy !!}</td>
            <td>{!! $listing->directionName !!}</td>
            <td width="100px">{!! $listing->assignedToName !!}</td>
          </tr>
          @endforeach
        </tbody>
      </table>
      @endforeach
      @else
      <table class="table-striped-custom table table-striped prevent-copy">
        <THEAD>
          <tr>
            <th></th>
            <th style="">LID</th>
            <th style="">TTYT</th>
            <th style="">Phân loại</th>
            <th style="">Trạng thái</th>
            <th style="">Hình nhà</th>
            <th style="">Hình sổ</th>
            <th style="">Giá</th>
            <th width="250px">Diện tích (R x D)</th>
            <th width="300px">Địa chỉ</th>
            <th style="">Loại listing</th>
            <th style="">Hướng</th>
            <th>Người phụ trách</th>
            <!-- <th style="">Trạng thái ảo</th> -->
          </tr>
        </THEAD>
      </table>
      @endif
    </div>

    <div class="tab-pane customDatatable" id="not_like">

      <table id="not_like_table" class="table-striped-custom table table-striped prevent-copy min-width-full">
        <thead>
          <tr>
            <th></th>
            <th style="max-width: 200px">LID</th>
            <th>Mức yêu thích</th>
            <th style="">Phân loại</th>
            <th style="">Trạng thái</th>
            <th style="">Hình nhà</th>
            <th style="">Hình sổ</th>
            <th width="100px">Giá</th>
            <th width="250px">Diện tích (R x D)</th>
            <th width="200px">Địa chỉ</th>
            <th style="">Loại listing</th>
            <th style="">Hướng</th>
            <th width="100px">Trạng thái ảo</th>
            <th>Người phụ trách</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div><!-- /.tab-pane -->

    <div class="tab-pane active customDatatable" id="ganery_tab_content">
      <div class="row">
        <div class="col-md-4">
          <select class="filterChange filterValuations form-control"></select>
        </div>
        <div class="col-md-4">
          <select class="filterChange filterLegals form-control"></select>
        </div>
        <div class="col-md-4">
          <select class="filterChange filterSourceBys form-control"></select>
        </div>
      </div>
      <table id="likeListing" class="table-striped-custom table table-striped prevent-copy min-width-full">
        <thead>
          <tr>
            <th></th>
            <th style="max-width: 200px">LID</th>
            <th>Mức yêu thích</th>
            <th style="">Phân loại</th>
            <th style="">Trạng thái</th>
            <th style="">Hình nhà</th>
            <th style="">Hình sổ</th>
            <th width="100px">Giá</th>
            <th width="250px">Diện tích (R x D)</th>
            <th width="200px">Địa chỉ</th>
            <th style="">Loại listing</th>
            <th style="">Hướng</th>
            <th width="100px">Trạng thái ảo</th>
            <th>Người phụ trách</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div><!-- /.tab-pane -->
  </div><!-- /.tab-content -->
</div><!-- nav-tabs-custom -->
<style type="text/css">
  .icon-loadding {
    -webkit-animation: spin 4s linear infinite;
    -moz-animation: spin 4s linear infinite;
    animation: spin 4s linear infinite;
  }

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
<script type="text/javascript">
  var renderAddressForListingLeadDealForPHPLayer = function(object) {
    let originObj = object;

    object = JSON.stringify(object);
    let stripHtmlData = Base64.encode(object);

    let html = `<div class='show-full-address-${originObj.rlistingId}'>
                  <a onclick="JMDetail.showFullAddress('${stripHtmlData}')" href='javascript:void(0)'>
                    Xem số nhà 
                  </a>${originObj.maskedAddress}
                </div>`;
    $('.render-address-' + originObj.rlistingId).html(html);
  }

  var renderRedOrPinkBookForPHPLayer = function(object) {
    // call tracking ba click view paper image
    returnValue = "<div class='tracking-paper-image-" + object.rlistingId + "'><a onclick='JMDetail.trackBAViewInfo(1, " + object.rlistingId + ")' href='javascript:void(0)'>";

    if (object.pinkBookPhotos && object.pinkBookPhotos.length > 0 && object.pinkBookPhotos != 'NA') {
      returnValue += '<img class="pinkBookPhoto" onerror="imgError(this);" style="width:48px;height: auto;" src="' + object.pinkBookPhotos[0] + '" />';
      returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.pinkBookPhotos) + '</div>';

    } else if (object.redBookPhotos && object.redBookPhotos.length > 0 && object.redBookPhotos != 'NA') {
      returnValue += '<img class="pinkBookPhoto" onerror="imgError(this);" style="width:48px;height: auto;" src="' + object.redBookPhotos[0] + '" />';
      returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.redBookPhotos) + '</div>';
    }
    returnValue += '</a></div>'

    $('.render-redOrPink-' + object.rlistingId).html(returnValue);
  }

  var imgError = function(image) {
    $(image).attr('src', '/images/404image.webp');
    // image.style.display = 'none';
  }

  var renderCheckbox = function(data, type, object) {
    var isBooked = false;
    if (object.isBooked) {
      isBooked = object.isBooked
    }
    var dataListing = {
      price: object.price,
      rlistingId: data
    };
    var view = object.numberViewed > 0 ? '<i class=\'viewed fa fa-eye\'></i>' : '';
    var dateAddGaneral = "";
    if (object.createdBasketDate && object.createdBasketDate != null && object.createdBasketDate != 'NA') {
      dateAddGaneral = '<small>BST (' + $.format.date(new Date(object.createdBasketDate), "dd/MM/yyyy HH:mm:ss") + ')</small>';
    }
    return '<input type="checkbox" data-rlisting=\'' + JSON.stringify(dataListing) + '\' isBooked="' + isBooked + '" onclick="storeCheckListing(this)" class="selected-email-listing selected-listing-' + data + '" value="' + data + '">' + view + '<br/>' + dateAddGaneral;
    // return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
  }

  var dateTimeRender = function(data, type, object) {
    if (!data)
      return "";
    return $.format.date(new Date(data), "dd/MM/yyyy HH:mm:ss");
  };

  var renderPhoto = function(data, type, object) {
    var returnValue = "NA";
    if (object.photo != 'NA' && object.photo && object.photo.link) {
      returnValue = '<img class="pinkBookPhoto" onerror="imgError(this);" style="width:48px;height: auto;" src="' + object.photo.link + '" />'
      returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.photoUrls || [object.photo.link]) + '</div>';

    }
    return returnValue;
  }

  var renderRedOrPinkBook = function(data, type, object) {

    // call tracking ba click view paper image
    returnValue = "<div class='tracking-paper-image-" + object.rlistingId + "'><a onclick='JMDetail.trackBAViewInfo(1, " + object.rlistingId + ")' href='javascript:void(0)'>";

    // if (object.photo && object.photo.length > 0) {
    //     returnValue += '<img class="redBookPhoto" style="width:48px;height: auto;" src="' + object.photo[0] + '" />';
    //     returnValue += '<div class="redBookPhotos hidden">' + JSON.stringify(object.photo) + '</div>';
    // }
    if (object.pinkBookPhotos && object.pinkBookPhotos.length > 0 && object.pinkBookPhotos != 'NA') {
      returnValue += '<img class="pinkBookPhoto" onerror="imgError(this);" style="width:48px;height: auto;" src="' + object.pinkBookPhotos[0] + '" />';
      returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.pinkBookPhotos) + '</div>';

    } else if (object.redBookPhotos && object.redBookPhotos.length > 0 && object.redBookPhotos != 'NA') {
      returnValue += '<img class="pinkBookPhoto" onerror="imgError(this);" style="width:48px;height: auto;" src="' + object.redBookPhotos[0] + '" />';
      returnValue += '<div class="pinkBookPhotos hidden">' + JSON.stringify(object.redBookPhotos) + '</div>';
    }
    returnValue += '</a></div>'
    return returnValue;
  };

  var renderEventContent = function(data, type, object) {
    var returnVal = "";
    if (object.scheduleTime) {
      returnVal += moment(object.scheduleTime).format('DD/MM/YYYY HH:mm:ss') + "<br/>";
    }
    if (data === null) {
      data = "";
    }
    returnVal += "<div class='textContainer_Truncate'>" + data + "</div>";
    return returnVal;
  };

  var modalListingDetail = function(data, type, object) {
    var label = "";
    if (object.listingAction) {
      switch (object.listingAction) {
        case "sent_sms":
          label = '<small class="label bg-blue">Đã SMS</small>'
          break;
        case "diy_not_available":
          label = '<small class="label bg-orange">DIY (không còn trống)</small>'
          break;
        case "portal":
          label = '<small class="label bg-blue">ĐLX Portal</small>'
          break;
        case "matched":
          label = '<small class="label bg-green">Matched</small>'
          break;
        case "sent_mail":
          label = '<small class="label bg-green">Đã Email</small>'
          break;
        case "scheduled":
          label = '<small class="label bg-blue">Đã đi tour</small>'
          break;
        case "sent_sms_and_email":
          label = '<small class="label bg-green">Đã SMS & Email</small>'
          break;
        case "liked":
          label = '<small class="label bg-red">Yêu thích</small>'
          break;
        case "rejected":
          label = '<small class="label bg-orange">Từ chối hợp tác</small>'
          break;
        case "rented":
          label = '<small class="label bg-orange">Đã bán - DealID: ' + object.dealId + '</small>'
          break;
        case "deactivated":
          label = '<small class="label bg-orange">Tạm ngưng giao dịch</small>'
          break;
        case "deactivated_by_saas":
          label = '<small class="label bg-orange">Tạm ngưng từ SaaS</small>'
          break;
        default:
          label = ""
      }
    }

    return "<a href='#' onclick='JMDetail.openModalListingDetailForAllPage(" + data + ");return false;'>" + data + "</a> " + label;

    // return "<a href='#' onclick='JMDetail.openModalListingDetailForAllPage("+data+")'>"+data+"</a>"
  }

  var modalListingDetailForLikeTable = function(data, type, object, meta) {
    // console.log('modalListingDetailForLikeTable');
    var label = "";
    var dateDLX = "";
    if (object.addedTime && object.addedTime != null && object.addedTime != 'NA') {
      dateDLX = ' (' + $.format.date(new Date(object.addedTime), "dd/MM/yyyy HH:mm:ss") + ')';
    }
    var dateAddGaneral = "";
    if (object.createdBasketDate && object.createdBasketDate != null && object.createdBasketDate != 'NA') {
      dateAddGaneral = ' ' + $.format.date(new Date(object.createdBasketDate), "dd/MM/yyyy HH:mm");
    }

    if (object.listingAction) {
      switch (object.listingAction) {
        case "portal":
          var scheduleTime = 'NA';
          if (typeof object.scheduleTime != 'undefined' && object.scheduleTime != 'NA') {
            scheduleTime = moment(object.scheduleTime).format('DD/MM/YYYY HH:mm')
          }
          label = '<ul style="background-color: blanchedalmond; padding-left: 5px; width: 155px; font-size: 10px; list-style-type: none;" class=""><li>ĐLX Portal</li><li>Ngày tạo: ' + dateDLX + '</li><li>Ngày đi: ' + scheduleTime + '</li></ul>';
          break;
        case "diy_not_available":
          label = '<small class="label bg-orange">DIY (không còn trống)</small>'
          break;
        case "matched":
          label = '<small class="label bg-green">Matched' + dateDLX + '</small>'
          break;
        case "liked":
          label = '<small class="label bg-red">Yêu thích</small>'
          break;
        case "rejected":
          label = '<small class="label bg-orange">Từ chối hợp tác</small>'
          break;
        case "rented":
          label = '<small class="label bg-orange">Đã bán - DealID: ' + object.dealId + '</small>'
          break;
        case "deactivated":
          label = '<small class="label bg-orange">Tạm ngưng giao dịch</small>'
          break;
        case "deactivated_by_saas":
          label = '<small class="label bg-orange">Tạm ngưng từ SaaS</small>'
          break;
        case "sent_sms":
          label = '<small class="label bg-blue">Đã SMS</small>'
          break;
        case "portal":
          label = '<small class="label bg-blue">ĐLX Portal</small>'
          break;
        case "matched":
          label = '<small class="label bg-green">Matched</small>'
          break;
        case "sent_mail":
          label = '<small class="label bg-green">Đã Email</small>'
          break;
        case "scheduled":
          label = '<small class="label bg-blue">Đã đi tour</small>'
          break;
        case "sent_sms_and_email":
          label = '<small class="label bg-green">Đã SMS & Email</small>'
          break;
        case "liked":
          label = '<small class="label bg-red">Yêu thích</small>'
          break;
        case "rejected":
          label = '<small class="label bg-orange">Từ chối hợp tác</small>'
          break;
        case "rented":
          label = '<small class="label bg-orange">Đã bán</small>'
          break;
        case "deactivated":
          label = '<small class="label bg-orange">Tạm ngưng giao dịch</small>'
          break;
        case "deactivated_by_saas":
          label = '<small class="label bg-orange">Tạm ngưng từ SaaS</small>'
          break;
        default:
          label = ""
      }
    }
    var star = '<a href="#" id="changeStarJM_' + data + '" onclick="return addGaneryCRM(' + data + ',this)"><i style="color:coral" class="fa fa-star-o"></i></a>';
    var isDiy = '';
    if (object.isDiy) {
      isDiy = '<span style="color: #fff; background-color: #f89406;border-radius: 3px;display: inherit;padding: 1px 3px;text-align: center;font-size: 12px;">DIY</span>';
    }

    return "<a href='#' onclick='JMDetail.openModalListingDetailForAllPage(" + data + ");return false;'>" + data + "</a> " + star + isDiy + label;
  }

  function emailListingTableRender(url = "/deal/listing-email/" + deal.dealId + "?typeListing=sent_mail") {
    $("#emailListing").dataTable().fnDestroy();
    $("#emailListing")
      .on('xhr.dt', function(e, settings, json, xhr) {
        window['isNeedChangeZoom'] = json.isNeedChangeZoom;

        var legals = json.filterSorts ? json.filterSorts.legals || [] : [];
        var sourceBys = json.filterSorts ? json.filterSorts.sourceBys || [] : [];
        var valuations = json.filterSorts ? json.filterSorts.valuations || [] : [];

        // render for valuations
        var valuationsSelect2 = [];
        $.each(valuations, function(key, value) {
          valuationsSelect2.push({
            id: value.value,
            text: value.value
          })
        })
        $('.filterValuations').select2({
          data: valuationsSelect2,
          multiple: true,
          placeholder: "Lọc theo phân loại",
        })

        // render for sourceBys
        var sourceBysSelect2 = [];
        $.each(sourceBys, function(key, value) {
          sourceBysSelect2.push({
            id: value.value,
            text: value.value
          })
        })
        $('.filterSourceBys').select2({
          data: sourceBysSelect2,
          multiple: true,
          placeholder: "Lọc theo loại listing",
        })


        // render for legals
        var dataSelect2 = [];
        $.each(legals, function(key, value) {
          dataSelect2.push({
            id: value.value,
            text: value.value
          })
        })
        $('.filterLegals').select2({
          data: dataSelect2,
          multiple: true,
          placeholder: "Lọc theo trạng thái",
        })
      })
      .DataTable({
        "processing": true,
        "searching": false,
        "serverSide": true,
        "ajax": url,
        "scrollX": true,
        "lengthChange": false,
        "drawCallback": function() {
          JMDetail ? JMDetail.openPhoto() : ''; // load function open Photos
          // *****************************
          $('.dataTables_paginate > .pagination').addClass('pagination-sm');
          var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
          pagination.toggle(this.api().page.info().pages > 1);
        },
        // "iDisplayLength": 1,
        "columns": [{
            data: 'rlistingId',
            orderable: false,
            render: renderCheckbox
          },
          // {data: 'createdDate', render: dateTimeRender},
          {
            data: 'rlistingId',
            orderable: false,
            render: modalListingDetailForTabFilterSearch
          },
          {
            data: 'levelLike',
            orderable: false
          },
          {
            data: 'valuationType',
            orderable: false,
            visible: false
          },
          {
            data: 'legal',
            orderable: false,
            render: renderLegal
          }, // format html
          {
            data: 'rlistingId',
            orderable: false,
            render: renderPhoto
          },
          {
            data: 'pinkBookPhotos',
            orderable: false,
            render: renderRedOrPinkBook
          },
          {
            data: 'formatPrice',
            orderable: true,
            render: renderPriceBankingComission
          },
          {
            data: 'lotSize',
            orderable: false,
            render: renderSforDealTableListing
          },
          {
            data: 'address',
            orderable: false,
            render: renderAddressForListingLeadDeal
          },
          {
            data: 'sourceBy',
            orderable: false
          },
          {
            data: 'directionName',
            orderable: false
          },
          {
            data: 'virtualStatus',
            orderable: false,
            render: renderVirtualStatus,
            className: 'virtualStatus' // add class to find this column for updating content after execute check empty
          }, {
            data: "assignedToName",
            orderable: false,
            render: renderAssignedPhone
          }
          // {data: 'directionName', orderable:false},
          // {data: 'updatedDate', orderable:false},
          // {data: 'content', orderable: false, render:renderEventContent}
        ],
        "order": [
          [7, 'desc']
        ],
        "language": {
          "paginate": {
            previous: "<",
            next: ">",
            first: "|<",
            last: ">|"
          },
          "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
          "emptyTable": "Chưa có dữ liệu",
          "infoEmpty": "",
        },
        "createdRow": function(row, data, index) {
          var listCheckOld = $('#arrayStoreListingForAction').val() ? JSON.parse($('#arrayStoreListingForAction').val()) : [];
          if ($.inArray(data.rlistingId.toString(), listCheckOld) > -1) {
            $(row).find(".selected-email-listing").prop("checked", true)
          }
          return renderRowColorListing(row, data);
        },
        "initComplete": function(settings, json) {
          console.log(json);
        }
      });
  }

  // $('#like-listing-table > a').on('shown.bs.tab', function (e) {
  //     $(".btn-remove-listing").show();
  // });
  // $('#like-listing-table > a').on('hidden.bs.tab', function (e) {
  //     $(".btn-remove-listing").hide();
  // });

  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    // var target = $(e.target).attr("href") // activated tab
    // alert(target);
    $(".btn-remove-listing").hide();
  });

  function removeListing() {
    var listCheckOld = $('#arrayStoreListingForAction').val() ? JSON.parse($('#arrayStoreListingForAction').val()) : [];
    if (!listCheckOld.length) {
      alert("Chọn listing để xóa");
      return true;
    }

    bootbox.confirm({
      message: 'Bạn có muốn xóa listings ra khỏi bộ sưu tập?',
      buttons: {
        confirm: {
          label: 'Tiếp tục',
          className: 'btn-success'
        },
        cancel: {
          label: 'Hủy',
          className: 'btn-danger'
        }
      },
      callback: function(result) {
        if (result) {
          var dataSend = {
            "basketId": deal.basketId,
            "dealId": deal.dealId,
            "rlistingIds": listCheckOld
          };


          $.ajax({
            'url': '/deal/delete-listing',
            'type': 'POST',
            'dataType': "json",
            'data': dataSend,
            'success': function(response) {
              if (response.result) {
                // console.log(response);
                // alert("Đã xóa thành công");
                $('#arrayStoreListingForAction').val("");
                likeListingTableRender();
                JMDetail.countTabFollowing();
              } else {
                alert("Đã có lỗi xảy ra!");
              }
            },
            'error': function() {
              alert("Đã có lỗi xảy ra!");
            }
          }).always(function() {

          });
        }
      }
    });
  }

  function likeListingTableRender(url = "/deal/listing-email/" + deal.dealId + "?typeListing=liked") {
    $("#likeListing").dataTable().fnDestroy();
    $("#likeListing")
      .on('xhr.dt', function(e, settings, json, xhr) {
        window['isNeedChangeZoom'] = json.isNeedChangeZoom;
        var legals = json.filterSorts ? json.filterSorts.legals || [] : [];
        var sourceBys = json.filterSorts ? json.filterSorts.sourceBys || [] : [];
        var valuations = json.filterSorts ? json.filterSorts.valuations || [] : [];
        // render for valuations
        var valuationsSelect2 = [];
        $.each(valuations, function(key, value) {
          valuationsSelect2.push({
            id: value.value,
            text: value.value
          })
        })
        $('#ganery_tab_content .filterValuations').select2({
          data: valuationsSelect2,
          multiple: true,
          placeholder: "Lọc theo phân loại",
        })

        // render for sourceBys
        var sourceBysSelect2 = [];
        $.each(sourceBys, function(key, value) {
          sourceBysSelect2.push({
            id: value.classify,
            text: value.value
          })
        })
        $('#ganery_tab_content .filterSourceBys').select2({
          data: sourceBysSelect2,
          multiple: true,
          placeholder: "Lọc theo loại listing",
        })


        // render for legals
        var dataSelect2 = [];
        $.each(legals, function(key, value) {
          dataSelect2.push({
            id: value.value,
            text: value.value
          })
        })
        $('#ganery_tab_content .filterLegals').select2({
          data: dataSelect2,
          multiple: true,
          placeholder: "Lọc theo trạng thái",
        })
        $(".btn-remove-listing").show();
      })
      .DataTable({
        "processing": true,
        "searching": false,
        "serverSide": true,
        "ajax": url,
        "scrollX": true,
        "lengthChange": false,
        "drawCallback": function() {
          JMDetail ? JMDetail.openPhoto() : ''; // load function open Photos
          // *****************************
          // ******************************
          $('.dataTables_paginate > .pagination').addClass('pagination-sm');
          var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
          pagination.toggle(this.api().page.info().pages > 1);
        },
        // "iDisplayLength": 1,
        "columns": [{
            data: 'rlistingId',
            orderable: false,
            render: renderCheckbox
          },
          // {data: 'createdDate', render: dateTimeRender},
          {
            data: 'rlistingId',
            orderable: false,
            render: suitableListing
          },
          {
            data: 'levelLike',
            orderable: false
          },
          {
            data: 'valuationType',
            orderable: false,
            visible: false
          },
          {
            data: 'legal',
            orderable: false,
            render: renderLegal
          }, // format html
          {
            data: 'rlistingId',
            orderable: false,
            render: renderPhoto
          },
          {
            data: 'pinkBookPhotos',
            orderable: false,
            render: renderRedOrPinkBook
          },
          {
            data: 'formatPrice',
            orderable: true,
            render: renderPriceBankingComission
          },
          {
            data: 'lotSize',
            orderable: false,
            render: renderSforDealTableListing
          },
          {
            data: 'address',
            orderable: false,
            render: renderAddressForListingLeadDeal
          },
          {
            data: 'sourceBy',
            orderable: false
          },
          {
            data: 'directionName',
            orderable: false
          },
          {
            data: 'virtualStatus',
            orderable: false,
            render: renderVirtualStatus,
            className: 'virtualStatus'
          }, {
            data: "assignedToName",
            orderable: false,
            render: renderAssignedPhone
          }
          // {data: 'directionName', orderable:false},
          // {data: 'updatedDate', orderable:false},
          // {data: 'content', orderable: false, render:renderEventContent}
        ],
        "order": [
          [7, 'desc']
        ],
        "createdRow": function(row, data, index) {
          return renderRowColorListing(row, data);
        },
        "language": {
          "paginate": {
            previous: "<",
            next: ">",
            first: "|<",
            last: ">|"
          },
          "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
          "emptyTable": "Chưa có dữ liệu",
          "infoEmpty": "",
        },
        "initComplete": function(settings, json) {

        }
      });
  }

  function notLikeListingTableRender(url = "/deal/listing-email/" + deal.dealId + "?typeListing=not_like") {
    $("#not_like_table").dataTable().fnDestroy();
    $("#not_like_table")
      .on('xhr.dt', function(e, settings, json, xhr) {
        //
        window['isNeedChangeZoom'] = json.isNeedChangeZoom;
        $(".btn-remove-listing").hide();
      })
      .DataTable({
        "processing": true,
        "searching": false,
        "serverSide": true,
        "ajax": url,
        "scrollX": true,
        "lengthChange": false,
        "drawCallback": function() {
          JMDetail ? JMDetail.openPhoto() : ''; // load function open Photos
          // *****************************
          // ******************************
          $('.dataTables_paginate > .pagination').addClass('pagination-sm');
          var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
          pagination.toggle(this.api().page.info().pages > 1);
        },
        // "iDisplayLength": 1,
        "columns": [{
            data: 'rlistingId',
            orderable: false,
            render: renderCheckbox
          },
          // {data: 'createdDate', render: dateTimeRender},
          {
            data: 'rlistingId',
            orderable: false,
            render: suitableListing
          },
          {
            data: 'levelLike',
            orderable: false
          },
          {
            data: 'valuationType',
            orderable: false,
            visible: false
          },
          {
            data: 'legal',
            orderable: false,
            render: renderLegal
          }, // format html
          {
            data: 'rlistingId',
            orderable: false,
            render: renderPhoto
          },
          {
            data: 'pinkBookPhotos',
            orderable: false,
            render: renderRedOrPinkBook
          },
          {
            data: 'formatPrice',
            orderable: true,
            render: renderPriceBankingComission
          },
          {
            data: 'lotSize',
            orderable: false,
            render: renderSforDealTableListing
          },
          {
            data: 'address',
            orderable: false,
            render: renderAddressForListingLeadDeal
          },
          {
            data: 'sourceBy',
            orderable: false
          },
          {
            data: 'directionName',
            orderable: false
          },
          {
            data: 'virtualStatus',
            orderable: false,
            render: renderVirtualStatus,
            className: 'virtualStatus'
          }, {
            data: "assignedToName",
            orderable: false,
            render: renderAssignedPhone
          }
          // {data: 'directionName', orderable:false},
          // {data: 'updatedDate', orderable:false},
          // {data: 'content', orderable: false, render:renderEventContent}
        ],
        "order": [
          [7, 'desc']
        ],
        "createdRow": function(row, data, index) {
          return renderRowColorListing(row, data);
        },
        "language": {
          "paginate": {
            previous: "<",
            next: ">",
            first: "|<",
            last: ">|"
          },
          "info": "Hiển thị _START_ đến _END_ của _TOTAL_",
          "emptyTable": "Chưa có dữ liệu",
          "infoEmpty": "",
        },
        "initComplete": function(settings, json) {

        }
      });

  }

  $(document).ready(function() {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
      e.target // activated tab
      e.relatedTarget // previous tab
      if ($(e.target).attr('href') == '#ganery_tab_content') {
        likeListingTableRender()
      }
    });

    $('.filterChange').change(function() {
      $("#emailListing").dataTable().fnDestroy();
      var filterUrl = "";
      filterValuations = $('.filterValuations').val();
      filterSourceBys = $('.filterSourceBys').val();
      filterLegals = $('.filterLegals').val();
      if (filterValuations != null && filterValuations.length > 0) {
        filterUrl += 'filterValuations=' + filterValuations.join() + '&';
      }
      if (filterSourceBys != null && filterSourceBys.length > 0) {
        filterUrl += 'filterSourceBys=' + filterSourceBys.join() + '&';
      }
      if (filterLegals != null && filterLegals.length > 0) {
        filterUrl += 'filterLegals=' + filterLegals.join();
      }
      var url = "/deal/listing-email/" + deal.dealId + "?typeListing=sent_mail&" + filterUrl;
      emailListingTableRender(url);
    })
    // *************************************************************
    $('#ganery_tab_content .filterChange').change(function() {
      $("#likeListing").dataTable().fnDestroy();
      var filterUrl = "";
      filterValuations = $('#ganery_tab_content .filterValuations').val();
      filterSourceBys = $('#ganery_tab_content .filterSourceBys').val();
      filterLegals = $('#ganery_tab_content .filterLegals').val();
      if (filterValuations != null && filterValuations.length > 0) {
        filterUrl += 'filterValuations=' + filterValuations.join() + '&';
      }
      if (filterSourceBys != null && filterSourceBys.length > 0) {
        filterUrl += 'filterSourceBys=' + filterSourceBys.join() + '&';
      }
      if (filterLegals != null && filterLegals.length > 0) {
        filterUrl += 'filterLegals=' + filterLegals.join();
      }
      var url = "/deal/listing-email/" + deal.dealId + "?typeListing=liked&" + filterUrl;
      likeListingTableRender(url);
    })

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('#_token').val()
      }
    });
  });
</script>