var PropzyActivePopups = [];

var Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function (e) {
    var t = '';
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = ((n & 3) << 4) | (r >> 4);
      u = ((r & 15) << 2) | (i >> 6);
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64;
      } else if (isNaN(i)) {
        a = 64;
      }
      t =
        t +
        this._keyStr.charAt(s) +
        this._keyStr.charAt(o) +
        this._keyStr.charAt(u) +
        this._keyStr.charAt(a);
    }
    return t;
  },
  decode: function (e) {
    var t = '';
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9+/=]/g, '');
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = (s << 2) | (o >> 4);
      r = ((o & 15) << 4) | (u >> 2);
      i = ((u & 3) << 6) | a;
      t = t + String.fromCharCode(n);
      if (u != 64) {
        t = t + String.fromCharCode(r);
      }
      if (a != 64) {
        t = t + String.fromCharCode(i);
      }
    }
    t = Base64._utf8_decode(t);
    return t;
  },
  _utf8_encode: function (e) {
    e = e.replace(/rn/g, 'n');
    var t = '';
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192);
        t += String.fromCharCode((r & 63) | 128);
      } else {
        t += String.fromCharCode((r >> 12) | 224);
        t += String.fromCharCode(((r >> 6) & 63) | 128);
        t += String.fromCharCode((r & 63) | 128);
      }
    }
    return t;
  },
  _utf8_decode: function (e) {
    var t = '';
    var n = 0;
    var r = (c1 = c2 = 0);
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++;
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
        n += 2;
      } else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode(
          ((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        n += 3;
      }
    }
    return t;
  },
};
// H??m d??ng ????? m?? h??a
// Base64.encode("Chu???i c???n m?? h??a");
// H??m d??ng ????? gi???i m??
// Base64.decode("Chu???i ???? m?? h??a");

$(document).ready(function () {
  $('#initialBudget,#finalBudget,#initialBudgetFixed').keyup(function () {
    var num = $(this).val();
    num = parseInt(num.replace(/,/g, ''));
    $(this).parent().find('.alert-warning').remove();
    if (num > 50000000000) {
      $(this)
        .parent()
        .append(
          '<div class="alert alert-warning"><strong>L??u ??!</strong> B???n c?? ch???c ch???n v???i ng??n s??ch n??y?</div>'
        );
    }
  });
});

var postDataPriceTags = async (priceTagData) => {
  let taggingDisplay = {};
  let taggingOthers = [];
  if (priceTagData.tagging !== undefined && priceTagData.tagging.length > 0) {
    priceTagData.tagging.map((tag, index) => {
      let tagId = tag.id;
      if (index === 0) {
        taggingDisplay = {
          id: tagId,
          count: priceTagData.taggingCounter[tagId],
        };
      } else {
        let temp = {
          id: tagId,
          count: priceTagData.taggingCounter[tagId],
        };
        taggingOthers.push(temp);
      }
    });
  }
  let dataTagPost = {
    listingId: priceTagData.listingId,
    taggingDisplay: taggingDisplay,
    taggingOthers: taggingOthers,
  };
  await postPriceTagsAPI(dataTagPost);
};

var postPriceTagsAPI = async (data) => {
  const configPostPriceTag = {
    method: 'post',
    url: '/price-tag/tag-tracking/view-listing',
    data: data,
  };

  await axios(configPostPriceTag)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

function renderPriceBankingComission(data, type, object) {
  if (object.mortgaged == true) {
    data += '<br/>- Th??? ch???p';
  }
  // var textComission = number_format(object.commissionPrice);
  // if(object.commissionPrice == 'NA'){
  //     if(object.commissionFrom == object.commissionTo){
  //         textComission = object.commissionFrom+"%";
  //     }else{
  //         textComission = object.commissionFrom+"% - "+object.commissionTo+"%";
  //     }
  // }
  var commissionArr = [];
  if (object.commissionList.length > 0 && object.commissionList != 'NA') {
    object.commissionList.forEach(function (item, index) {
      if (item.formatCommission != null && item.formatCommission != '') {
        commissionArr.push(item.formatCommission);
      }
    });
  }
  if (commissionArr.length > 0) {
    data +=
      '<br/> Hoa h???ng: <ul><li>' +
      commissionArr.join('</li><li>') +
      '</li></ul>';
  }
  if (!isNaN(object.bpoCloseGrade) && typeof priceTagsDealDetail === 'function') {
    data +=
      '<div class="pricetag-' +
      object.rlistingId +
      '">' +
      priceTagsDealDetail(object.rlistingId) +
      '</div>';
  }

  if (hasValue(object.bpoLabel) && !isNaN(object.bpoLabel) && typeof priceTagsDealDetail === 'function') {
    data +=
      '<div class="pricetag-' +
      object.rlistingId +
      '">' +
      priceTagsDealDetail(object.rlistingId) +
      '</div>';
  }
  return data;
}

var modalListingDetailForTabFilterSearch = function (data, type, object) {
  // var dealGlobal = JSON.parse(deal.detail.replace(/&quot;/g,'"'));
  if (typeof deal !== 'undefined') {
    var districtsList = JSON.parse(deal.districtsList.replace(/&quot;/g, '"'));
    var wardsList = JSON.parse(deal.wardsList.replace(/&quot;/g, '"'));
    // console.log(JSON.parse(wardsList));
    // console.log(preferWard);
  } else {
    var districtsList = JSON.parse(lead.districtsList.replace(/&quot;/g, '"'));
    var wardsList = JSON.parse(lead.wardsList.replace(/&quot;/g, '"'));
  }
  var preferDistrict = 0;
  var preferWard = 0;
  if (wardsList.length > 0) {
    $.each(wardsList, function (k, v) {
      if (v.isPrefered) {
        preferWard = v.id;
        return false;
      }
    });
  }
  var curentListingDistrict = object.districtId;
  var curentListingWard = object.wardId;
  var style = '';
  if (preferWard == curentListingWard) {
    style =
      "style='background:yellow' title='Listing matching ph?????ng y??u th??ch' data-toggle='tooltip'";
  }
  // console.log(curentListingDistrict);
  // console.log(curentListingWard);
  var star =
    '<a href="#" id="changeStarJM_' +
    data +
    '" onclick="return addGaneryCRM(' +
    data +
    ',this)"><i style="color:coral" class="fa fa-star-o"></i></a>';
  if (object.isBasket) {
    star = '<i style="color:coral" class="fa fa-star"></i>';
  }
  var label = '';
  var dateDLX = '';
  if (
    object.addedTime &&
    object.addedTime != null &&
    object.addedTime != 'NA'
  ) {
    dateDLX =
      ' ' + $.format.date(new Date(object.addedTime), 'dd/MM/yyyy HH:mm');
  }
  switch (object.listingAction) {
    case 'sent_sms':
      label = '<small class="label bg-blue">???? SMS</small>';
      break;
    case 'diy_not_available':
      label = '<small class="label bg-orange">DIY (kh??ng c??n tr???ng)</small>';
      break;
    case 'portal':
      var scheduleTime = 'NA';
      if (
        typeof object.scheduleTime != 'undefined' &&
        object.scheduleTime != 'NA'
      ) {
        scheduleTime = moment(object.scheduleTime).format('DD/MM/YYYY HH:mm');
      }
      label =
        '<ul style="background-color: blanchedalmond; padding-left: 5px; width: 155px; font-size: 10px; list-style-type: none;" class=""><li>??LX Portal</li><li>Ng??y t???o: ' +
        dateDLX +
        '</li><li>Ng??y ??i: ' +
        scheduleTime +
        '</li></ul>';
      // label += '<br/><small class="label bg-blue">- Ng??y t???o:'+dateDLX+' - Ng??y ??i: '+dateDLX+'</small>'
      break;
    case 'matched':
      label = '<small class="label bg-green">Matched' + dateDLX + '</small>';
      break;
    case 'sent_mail':
      label = '<small class="label bg-green">???? Email</small>';
      break;
    case 'scheduled':
      label = '<small class="label bg-blue">???? ??i tour</small>';
      break;
    case 'sent_sms_and_email':
      label = '<small class="label bg-green">???? sms &  email</small>';
      break;
    case 'liked':
      label = '<small class="label bg-red">Y??u th??ch</small>';
      break;
    case 'rejected':
      label = '<small class="label bg-orange">T??? ch???i h???p t??c</small>';
      break;
    case 'rented':
      var labelDealId = '';
      if (object.dealId != null && object.dealId != 'NA') {
        labelDealId = ' - DealID: ' + object.dealId;
      }
      var labelNote = '';
      if (object.statusReasonName != null && object.statusReasonName != 'NA') {
        labelNote = ' (' + object.statusReasonName + ')';
      }
      label =
        '<small class="label bg-orange">???? b??n' +
        labelDealId +
        labelNote +
        '</small>';
      break;
    case 'deactivated':
      label = '<small class="label bg-orange">T???m ng??ng giao d???ch</small>';
      break;
    case 'deactivated_by_saas':
      label = '<small class="label bg-orange">T???m ng??ng t??? SaaS</small>';
      break;
    default:
      label = '';
  }
  var isDiy = '';
  // if(object.isDiy){
  //     isDiy = '<span style="color: #fff; background-color: #f89406;border-radius: 3px;display: inherit;padding: 1px 3px;text-align: center;font-size: 12px;">DIY</span>';
  // }
  var sourceName = '',
    arraySourceId = [171, 166, 3];
  if (arraySourceId.indexOf(object.sourceId) > -1) {
    sourceName =
      '<small class="label bg-orange">Ngu???n: ' + object.sourceName + '</small>';
  }
  let html = '';
  if (object.scorecardType != null) {
    let colorLabel =
      object.scorecardType == 1637
        ? 'label-high'
        : object.scorecardType == 1638
        ? 'label-medium'
        : object.scorecardType == 1639
        ? 'label-low'
        : 'label-unclassified';
    let priceCardLabel =
      object.pricecardTypeCode == 'PRICE_CARD_A'
        ? 'label-price-a'
        : object.pricecardTypeCode == 'PRICE_CARD_B'
        ? 'label-price-b'
        : object.pricecardTypeCode == 'PRICE_CARD_C'
        ? 'label-price-c'
        : object.pricecardTypeCode == 'PRICE_CARD_D'
        ? 'label-price-d'
        : '';

    html +=
      "<a href='#' " +
      style +
      " onclick='JMDetail.openModalListingDetailForAllPage(" +
      data +
      '); postDataPriceTags(dataPriceTags[' +
      object.rlistingId +
      "]); return false;'>" +
      data +
      '</a> ' +
      star +
      sourceName +
      isDiy +
      label;
    html += `<p>${
      object.scorecardType && object.scorecardType != 'NA'
        ? "<span><i class='fa fa-circle " +
          colorLabel +
          "'></i> " +
          object.scorecardName +
          '</span>'
        : ''
    } ${object.score != 'NA' ? ` - ??i???m: (${object.score})` : ''}</p>`;
    // html += `<p>${object.pricecardTypeCode && object.pricecardTypeCode != "NA" ? "<span><i class='fa fa-circle "+ priceCardLabel +"'></i> "+ object.pricecardName +"</span>" : ""}</p>`
  }
  return html;
};

var suitableListing = function (data, type, object) {
  if (typeof deal !== 'undefined') {
    var wardsList = JSON.parse(deal.wardsList.replace(/&quot;/g, '"'));
  } else {
    var wardsList = JSON.parse(lead.wardsList.replace(/&quot;/g, '"'));
  }
  var preferWard = 0;
  if (wardsList.length > 0) {
    $.each(wardsList, function (k, v) {
      if (v.isPrefered) {
        preferWard = v.id;
        return false;
      }
    });
  }
  var curentListingWard = object.wardId;
  var style = '';
  if (preferWard == curentListingWard) {
    style =
      "style='background:yellow' title='Listing matching ph?????ng y??u th??ch' data-toggle='tooltip'";
  }
  var star =
    '<a href="#" id="changeStarJM_' +
    data +
    '" onclick="return addGaneryCRM(' +
    data +
    ',this)"><i style="color:coral" class="fa fa-star-o"></i></a>';
  if (object.isBasket) {
    star = '<i style="color:coral" class="fa fa-star"></i>';
  }
  var label = '';
  var dateDLX = '';
  if (
    object.addedTime &&
    object.addedTime != null &&
    object.addedTime != 'NA'
  ) {
    dateDLX =
      ' ' + $.format.date(new Date(object.addedTime), 'dd/MM/yyyy HH:mm');
  }
  switch (object.listingAction) {
    case 'sent_sms':
      label = '<small class="label bg-blue">???? SMS</small>';
      break;
    case 'diy_not_available':
      label = '<small class="label bg-orange">DIY (kh??ng c??n tr???ng)</small>';
      break;
    case 'portal':
      var scheduleTime = 'NA';
      if (
        typeof object.scheduleTime != 'undefined' &&
        object.scheduleTime != 'NA'
      ) {
        scheduleTime = moment(object.scheduleTime).format('DD/MM/YYYY HH:mm');
      }
      label =
        '<ul style="background-color: blanchedalmond; padding-left: 5px; width: 155px; font-size: 10px; list-style-type: none;" class=""><li>??LX Portal</li><li>Ng??y t???o: ' +
        dateDLX +
        '</li><li>Ng??y ??i: ' +
        scheduleTime +
        '</li></ul>';
      break;
    case 'matched':
      label = '<small class="label bg-green">Matched' + dateDLX + '</small>';
      break;
    case 'sent_mail':
      label = '<small class="label bg-green">???? Email</small>';
      break;
    case 'scheduled':
      label = '<small class="label bg-blue">???? ??i tour</small>';
      break;
    case 'sent_sms_and_email':
      label = '<small class="label bg-green">???? sms &  email</small>';
      break;
    case 'liked':
      label = '<small class="label bg-red">Y??u th??ch</small>';
      break;
    case 'rejected':
      label = '<small class="label bg-orange">T??? ch???i h???p t??c</small>';
      break;
    case 'rented':
      var labelDealId = '';
      if (object.dealId != null && object.dealId != 'NA') {
        labelDealId = ' - DealID: ' + object.dealId;
      }
      var labelNote = '';
      if (object.statusReasonName != null && object.statusReasonName != 'NA') {
        labelNote = ' (' + object.statusReasonName + ')';
      }
      label =
        '<small class="label bg-orange">???? b??n' +
        labelDealId +
        labelNote +
        '</small>';
      break;
    case 'deactivated':
      label = '<small class="label bg-orange">T???m ng??ng giao d???ch</small>';
      break;
    case 'deactivated_by_saas':
      label = '<small class="label bg-orange">T???m ng??ng t??? SaaS</small>';
      break;
    default:
      label = '';
  }
  var isDiy = '';
  var sourceName = '',
    arraySourceId = [171, 166, 3];
  if (arraySourceId.indexOf(object.sourceId) > -1) {
    sourceName =
      '<small class="label bg-orange">Ngu???n: ' + object.sourceName + '</small>';
  }
  let html = '';
  if (object.scorecardType != null) {
    let colorLabel =
      object.scorecardType == 1637
        ? 'label-high'
        : object.scorecardType == 1638
        ? 'label-medium'
        : object.scorecardType == 1639
        ? 'label-low'
        : 'label-unclassified';

    html +=
      "<a href='#' " +
      style +
      " onclick='JMDetail.openModalListingDetailForAllPage(" +
      data +
      '); postDataPriceTags(dataPriceTags[' +
      object.rlistingId +
      "]);return false;'>" +
      data +
      '</a> ' +
      star +
      sourceName +
      isDiy +
      label;
    html += `<p>${
      object.scorecardType && object.scorecardType != 'NA'
        ? "<span><i class='fa fa-circle " +
          colorLabel +
          "'></i> " +
          object.scorecardName +
          '</span>'
        : ''
    } ${object.score != 'NA' ? ` - ??i???m: (${object.score})` : ''}</p>`;
  }

  // use bpoCloseGrade variable
  if (
    object.bpoCloseGrade &&
    object.bpoCloseGrade !== '' &&
    object.bpoCloseGrade !== 'NA'
  ) {
    html += `<p><b>BPO: ${object.bpoCloseGrade}</b></p>`;
  }
  // if(object.bpoCloseGrade && object.bpoCloseGrade !== '' && object.bpoCloseGrade !== 'NA') {
  //     html += `<small class="label bg-green"><b style="font-size: 12px;">${object.bpoCloseGrade}</b></small>`;
  // }

  // use bpoLabel variable
  if (
    object.bpoLabel &&
    object.bpoLabel !== '' &&
    object.bpoCloseGrade !== 'NA'
  ) {
    html += `<p><b>BPO: ${object.bpoLabel}</b></p>`;
  }
  // if(object.bpoLabel && object.bpoLabel !== '' && object.bpoCloseGrade !== 'NA') {
  //     html += `<small class="label bg-green"><b style="font-size: 12px;">${object.bpoLabel}</b></small>`;
  // }

  return html;
};

var renderUpdatedDate = function (data, type, object) {
  let dateText = moment(data).format('DD/MM/YYYY HH:mm');
  return `${dateText}`;
};

var handleMakeCall = function(phoneNumber, assignedName, rlistingId) {
  CCall.makeCall({
    callId: 'callToaSSigned',
    "phoneNumber": phoneNumber,
    "leadId": null,
    showLoading: false,    
    otherParams: {
      assignedName,
      rlistingId,
      hidePopupHistoryCall: true,
    }
});
}

var handleOpeningPhoneBoard = function(rlistingId = '', assignedName = '') {
  const modal = $('#callingBoard');
  const phoneListEle = modal.find('.phone-list');
  const internalPhoneListEle = modal.find('.internal-phone-list');
  modal.find('.modal-header-heading').html(assignedName);
  phoneListEle.html('');
  showPropzyLoading();
  $.ajax({
    url: '/common/get-assigned-phone-from-rlisting/' + rlistingId,
    type: 'get',
  })
  .done(function (response) {
    if (response.result) {
      const listPhonesData = response.data || [];
      const internalPhones = [];
      const listPhones = listPhonesData.filter(i => {
        const is3cx = i.phoneType === '3cx';
        is3cx && internalPhones.push(i);
        return !is3cx;
      });

      if(listPhones.length > 1) {
        // T???m th???i ???n call n???i b???
        // internalPhones.length > 0 && internalPhoneListEle.html('<button class="btn btn-success full-width"><div class="internal-phone">G???i qua s??? n???i b???</div><i class="fa fa-volume-control-phone" aria-hidden="true"></i></button>')
        listPhones.map(i => {
          phoneListEle.append(`
            <div class="input-group">
              <input readonly class="form-control" id="name" name="name" value="${hideMiddleChars(i.id, 2, 2)}" />
              <span id="sa-call-btn9" class="show-pos-call input-group-addon input-group-addon-success-btn make-call" data-type="1" onClick='handleMakeCall("${i.id || ''}","${assignedName}","${rlistingId}")'>
                  <i class="fa fa-volume-control-phone" aria-hidden="true"></i>
              </span>
            </div>
          `);
        })
        
        modal.modal('show');
      } else {
        listPhones.length !== 0 && handleMakeCall(listPhones[0].id, assignedName, rlistingId);
      }
    } else {
      showPropzyAlert(response.message);
    }
  })
  .fail(function () {
    showPropzyAlert();
  })
  .always(function () {
    hidePropzyLoading();
  });    
}

var bindCallAssignedCallback = function(type = 'DEAL', id = '') {
  CCall.bindCallEvent('callToaSSigned', {
    onCallEnded: function() {
      const common = {
        comments: [
          {
            "categoryId": 100,
            "categoryName": "M???c ????ch g???i",
            "photos": [],
            "comments": [
              {
                "comment": "G???i cho ng?????i ph??? tr??ch listing"
              }
            ]
          },
          {
            "categoryId": 101,
            "categoryName": "K???t qu??? g???i",
            "photos": [],
            "comments": [
              {
                "id": null,
                "comment": "N/A"
              }
            ]
          },
          {
            "categoryId": 103,
            "categoryName": "Ghi ch??",
            "photos": [],
            "comments": [
              {
                "id": null,
                "comment": `G???i t??? ${currentUserName || ''} (${window._scopeState?.extClientTool || ''}) ?????n ${window._storeConfigCall?.otherParams?.assignedName || ''} (${window._storeConfigCall?.phoneNumber || ''})` 
              }
            ]
          }
        ]
      }
      Window.updateTrackHistoryCall({
        "entityType": type,
        "entityId": id,
        ...common
      }).then(function(res) {
        if(!res.result) {
          showPropzyAlert(res.message);  
        }
      }, function(err) {
        showPropzyAlert();
      });

      Window.updateTrackHistoryCall({
        "direction": "inbound",
        "entityType": "RLISTING",
        "entityId": window._storeConfigCall?.otherParams?.rlistingId || '',
        ...common
      }).then(function(res) {
        if(!res.result) {
          showPropzyAlert(res.message);  
        }
      }, function(err) {
        showPropzyAlert();        
      });

      Window.endCallProcess();
    }
  });
}

var renderAssignedPhone = function (data, type, object) {
  return `<div>${data}</div>
          <button style="margin-top: 8px" class="btn btn-success btn-round" onClick='handleOpeningPhoneBoard("${object.rlistingId}", "${object.assignedToName}")'><span class="txt">G???i</span><i class="fa fa-phone icon" aria-hidden="true"></i></button>`;
};

var renderLegal = function (data, type, object) {
  let html = 'NA';
  if (object.inventoryStatusId == 1) {
    html += `<br><small class="label" style="background-color: #696969 !important;">Archived</small>`;
  }
  return html;
};

var renderAddressForListingLeadDeal = function (data, type, object) {
  let originObj = object;

  object = JSON.stringify(object);
  let stripHtmlData = Base64.encode(object);

  let html = `<div class="show-full-address-${originObj.rlistingId}"><a onClick="JMDetail.showFullAddress('${stripHtmlData}')" href='javascript:void(0)'>Xem s??? nh?? </a>${originObj.maskedAddress}</div>`;

  if (originObj.isShortAddress) {
    html = `<div>${originObj.maskedAddress}</div>`;
  }
  
  return html;
};

// momment timestam to minutes from now function
moment.fn.minutesFromNow = function () {
  return Math.floor((+new Date() - +this) / 60000);
};
function renderRowColorListing(row, data, setting = null) {
  // remove hightlight listing matching
  // if (data.searchScore && setting.basic.highlightNumber) {
  //     if(data.searchScore >= setting.basic.highlightScore && setting.index < setting.basic.highlightNumber) {
  //         $(row).css({"font-weight": "900", "background-color": "gainsboro"});
  //         return;
  //     }
  // }
  if (data.isPrivate) {
    $(row).css('background-color', 'rgba(75, 192, 192, 0.29)');
    // 'data-toggle="tooltip" title="Hooray!"'
    $(row).attr('data-toggle', 'tooltip');
    $(row).attr('title', 'LISTING RI??NG T??');
  } else if (data.isGuaranteed) {
    $(row).css('background-color', 'rgb(253, 241, 203)');
    $(row).attr('data-toggle', 'tooltip');
    $(row).attr('title', 'LISTING ?????C QUY???N');
  }
  //  liveType - liveTypeName
  //  195
  //  196 - Ri??ng t??
  //  197 - ?????c quy???n
  //  198 - D???ch v??? - #ffe1e1
  switch (data.liveType) {
    case 196:
      $(row).css('background-color', 'rgba(75, 192, 192, 0.29)');
      break;
    case 197:
      $(row).css('background-color', 'rgb(253, 241, 203)');
      break;
    case 198:
      $(row).css('background-color', '#ffe1e1');
      break;
    default:
      break;
  }
  $(row).attr('data-toggle', 'tooltip');
  $(row).attr('data-placement', 'auto top');
  $(row).attr('title', data.liveTypeName);
  //    if(data.isPrivate){
  //      $(row).css("background-color","rgba(75, 192, 192, 0.29)");
  //      // 'data-toggle="tooltip" title="Hooray!"'
  //      $(row).attr('data-toggle','tooltip');
  //      $(row).attr('title','LISTING RI??NG T??');
  //    }else if(data.isGuaranteed){
  //      $(row).css("background-color","rgb(253, 241, 203)");
  //      $(row).attr('data-toggle','tooltip');
  //      $(row).attr('title','LISTING ?????C QUY???N');
  //    }
}
var dateRender = function (data, type, object) {
  if (!data) return '';
  return moment(data).format('DD/MM/YYYY HH:mm');
};
var progressQuoNameRender = function (data, type, object) {
  var progressQuoNameText =
    object.progressQuoName && object.progressQuoName != null
      ? ' &nbsp;<span class="label label-warning">(' +
        object.progressQuoName +
        ')</span>'
      : '';
  return data + progressQuoNameText;
};
var timeRender = function (data, type, object) {
  if (!data) return '';
  return moment(data).format('HH:mm');
};
var dateConvertRender = function (data, type, object) {
  if (!data) return '';
  return $.format.date(new Date(data), 'dd/MM/yyyy HH:mm:ss');
};
var shortDateRender = function (data, type, object) {
  if (!data) return '';
  return moment(data).format('DD/MM/YYYY');
};
var ellapseTimeRender = function (data, type, object) {
  if (!data) return '';
  data = showEllapseTime(data);
  return data;
};
var showEllapseTime = function (data) {
  var returnValue = '';
  var start = moment(data);
  var now = moment();
  var diffDays = now.diff(start, 'days');
  var diffHours = now.diff(start, 'hours');
  var diffMinutes = now.diff(start, 'minutes');
  diffMinutes = diffMinutes - diffHours * 60;
  diffHours = diffHours - diffDays * 24;
  if (diffDays > 0) {
    returnValue += diffDays + 'd';
  }
  if (diffHours > 0) {
    returnValue += ' ' + diffHours + 'h';
  }
  if (diffMinutes > 0) {
    returnValue += ' ' + diffMinutes + "'";
  }
  return returnValue;
};
// h??m n??y tr??ng v???i dateRender nh??ng s??? d???ng v???i m???c ????ch kh??c. C?? nhi???u ch??? h??m dateRender s??? b??? override n??n ph???i s??? d???ng h??m n??y
var dateTimeRender = function (data, type, object) {
  if (!data) return '';
  return $.format.date(new Date(data), 'dd/MM/yyyy HH:mm:ss');
};
var renderIndex = function (data, type, object, meta) {
  return meta.row + meta.settings._iDisplayStart + 1;
};
var datePrettyRender = function (data, type, object) {
  if (!data) return '';
  return $.format.prettyDate(new Date(data));
};
var thousandDelimiterRender = function (data, type, object) {
  if (data == null) return '';
  var n = data.toString(),
    p = n.indexOf('.');
  return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) {
    return p < 0 || i < p ? $0 + '.' : $0;
  });
};
var dayAgo = function (numberDay) {
  return currentTime - numberDay * 86400000 - (currentTime % 86400000);
};
var getQuarter = function () {
  var today = new Date();
  return Math.floor((today.getMonth() + 3) / 3);
};
var getQuarterFirstDay = function () {
  quarter = getQuarter();
  month = (quarter - 1) * 3;
  date = new Date();
  date.setMonth(month);
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date.getTime();
};
var getMonthFirstDay = function () {
  date = new Date();
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date.getTime();
};
var getYearFirstDay = function () {
  date = new Date();
  date.setMonth(0);
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date.getTime();
};
var customKey = function (data, type, object, meta) {
  return meta.row + meta.settings._iDisplayStart + 1;
};
if ($('#_token').val()) {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('#_token').val(),
    },
  });
}
var dayAgo = function (numberDay) {
  return currentTime - numberDay * 86400000 - (currentTime % 86400000);
};
$(function () {
  JModuleFunctionHelper.console_warning();
  $('.alert-auto-close')
    .fadeTo(2000, 500)
    .slideUp(500, function () {});
  $('#check-all').click(function () {
    $('.address-check:checkbox').not(this).prop('checked', this.checked);
  });
  try {
    $('.select2').select2();
  } catch (ex) {}
  //Calendar
  try {
    $('#calendar').datepicker();
    $('#date-user').datepicker({
      format: 'dd-mm-yyyy',
    });
    $('#date-staff').datepicker({
      format: 'dd-mm-yyyy',
    });
    $('#date-listing').daterangepicker({
      timePicker: true,
      timePickerIncrement: 30,
      format: 'MM/DD/YYYY h:mm A',
    });
    $('#table-listing').DataTable();
    //$("#table-request").DataTable();
    $('#date-overview').daterangepicker();
  } catch (Ex) {}
  $('#table-brokerage').DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: false,
    info: true,
    autoWidth: true,
  });
  $('#table-transac').DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: true,
    info: true,
    autoWidth: true,
  });
  $('#table-overview').DataTable({
    paging: false,
    lengthChange: true,
    searching: false,
    ordering: false,
    info: false,
    autoWidth: true,
  });
  $('#table-assign-one').DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: false,
    info: true,
    autoWidth: true,
  });
  $('#table-assign-multi').DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: false,
    info: true,
    autoWidth: true,
  });
  $('#table-assign-bde-one').DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: false,
    info: true,
    autoWidth: true,
  });
  $('#table-assign-bde-multi').DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: false,
    info: true,
    autoWidth: true,
  });
  $('#report-rent-buy').DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: false,
    info: true,
    autoWidth: true,
  });
  $('#report-transaction').DataTable({
    paging: false,
    lengthChange: false,
    searching: false,
    ordering: false,
    info: false,
    autoWidth: false,
  });
  /*$('#tableAgentsList').DataTable({
     "paging": true,
     "lengthChange": true,
     "searching": true,
     "ordering": false,
     "info": true,
     "autoWidth": true
     });*/
  $('#tableSaleAgent').DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: false,
    info: true,
    autoWidth: true,
  });
  $('#tableListingAgent').DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: false,
    info: true,
    autoWidth: true,
  });
  try {
    $('.add-assign').magnificPopup({
      items: {
        src: '#assign-popup',
        type: 'inline',
      },
      closeOnBgClick: false,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom',
      callbacks: {
        close: function () {
          // Will fire when popup is closed
          //UI.GA.ga_post('Promoter Prep Signup' , 'Promoter Prep Signup Status', 'SignUp  Cancel');
        },
      },
    });
    $('.assign-br-firm').magnificPopup({
      items: {
        src: '#assign-br-firm',
        type: 'inline',
      },
      closeOnBgClick: false,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom',
      callbacks: {
        close: function () {
          // Will fire when popup is closed
          //UI.GA.ga_post('Promoter Prep Signup' , 'Promoter Prep Signup Status', 'SignUp  Cancel');
        },
      },
    });
    $('.sent-agent').magnificPopup({
      items: {
        src: '#agent-popup',
        type: 'inline',
      },
      closeOnBgClick: false,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom',
      callbacks: {
        close: function () {
          // Will fire when popup is closed
          //UI.GA.ga_post('Promoter Prep Signup' , 'Promoter Prep Signup Status', 'SignUp  Cancel');
        },
      },
    });
    $('.add-invite').magnificPopup({
      items: {
        src: '#invite-popup',
        type: 'inline',
      },
      closeOnBgClick: false,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom',
      callbacks: {
        close: function () {
          // Will fire when popup is closed
          //UI.GA.ga_post('Promoter Prep Signup' , 'Promoter Prep Signup Status', 'SignUp  Cancel');
        },
      },
    });
    $('.add-assign-multi-agent').magnificPopup({
      items: {
        src: '#assign-agent-popup-multi',
        type: 'inline',
      },
      closeOnBgClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom',
      callbacks: {
        close: function () {
          // Will fire when popup is closed
        },
      },
    });
    $('.add-assign-one-agent').magnificPopup({
      items: {
        src: '#assign-agent-popup-one',
        type: 'inline',
      },
      closeOnBgClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom',
      callbacks: {
        close: function () {
          // Will fire when popup is closed
        },
      },
    });
    $('.add-assign-multi-bde').magnificPopup({
      items: {
        src: '#assign-bde-popup-multi',
        type: 'inline',
      },
      closeOnBgClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom',
      callbacks: {
        close: function () {
          // Will fire when popup is closed
        },
      },
    });
    $('.add-assign-one-bde').magnificPopup({
      items: {
        src: '#assign-bde-popup-one',
        type: 'inline',
      },
      closeOnBgClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom',
      callbacks: {
        close: function () {
          // Will fire when popup is closed
        },
      },
    });
    $('.assign-tm').magnificPopup({
      items: {
        src: '#tm-popup',
        type: 'inline',
      },
      closeOnBgClick: false,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom',
      callbacks: {
        close: function () {
          // Will fire when popup is closed
          //UI.GA.ga_post('Promoter Prep Signup' , 'Promoter Prep Signup Status', 'SignUp  Cancel');
        },
      },
    });
    $('.mpf-close-cus').click(function () {
      $.magnificPopup.close();
    });
  } catch (ex) {}
  //-----------------------
  //- MONTHLY SALES CHART -
  //-----------------------
  //// Get context with jQuery - using jQuery's .get() method.
  //var salesChartCanvas = $("#salesChart").get(0).getContext("2d");
  //// This will get the first returned node in the jQuery collection.
  //var salesChart = new Chart(salesChartCanvas);
  //
  //var salesChartData = {
  //    labels: ["January", "February", "March", "April", "May", "June", "July"],
  //    datasets: [
  //        {
  //            label: "Electronics",
  //            fillColor: "rgb(210, 214, 222)",
  //            strokeColor: "rgb(210, 214, 222)",
  //            pointColor: "rgb(210, 214, 222)",
  //            pointStrokeColor: "#c1c7d1",
  //            pointHighlightFill: "#fff",
  //            pointHighlightStroke: "rgb(220,220,220)",
  //            data: [65, 59, 80, 81, 56, 55, 40]
  //        },
  //        {
  //            label: "Digital Goods",
  //            fillColor: "rgba(60,141,188,0.9)",
  //            strokeColor: "rgba(60,141,188,0.8)",
  //            pointColor: "#3b8bba",
  //            pointStrokeColor: "rgba(60,141,188,1)",
  //            pointHighlightFill: "#fff",
  //            pointHighlightStroke: "rgba(60,141,188,1)",
  //            data: [28, 48, 40, 19, 86, 27, 90]
  //        }
  //    ]
  //};
  //
  //var salesChartOptions = {
  //    //Boolean - If we should show the scale at all
  //    showScale: true,
  //    //Boolean - Whether grid lines are shown across the chart
  //    scaleShowGridLines: false,
  //    //String - Colour of the grid lines
  //    scaleGridLineColor: "rgba(0,0,0,.05)",
  //    //Number - Width of the grid lines
  //    scaleGridLineWidth: 1,
  //    //Boolean - Whether to show horizontal lines (except X axis)
  //    scaleShowHorizontalLines: true,
  //    //Boolean - Whether to show vertical lines (except Y axis)
  //    scaleShowVerticalLines: true,
  //    //Boolean - Whether the line is curved between points
  //    bezierCurve: true,
  //    //Number - Tension of the bezier curve between points
  //    bezierCurveTension: 0.3,
  //    //Boolean - Whether to show a dot for each point
  //    pointDot: false,
  //    //Number - Radius of each point dot in pixels
  //    pointDotRadius: 4,
  //    //Number - Pixel width of point dot stroke
  //    pointDotStrokeWidth: 1,
  //    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  //    pointHitDetectionRadius: 20,
  //    //Boolean - Whether to show a stroke for datasets
  //    datasetStroke: true,
  //    //Number - Pixel width of dataset stroke
  //    datasetStrokeWidth: 2,
  //    //Boolean - Whether to fill the dataset with a color
  //    datasetFill: true,
  //    //String - A legend template
  //    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%=datasets[i].label%></li><%}%></ul>",
  //    //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
  //    maintainAspectRatio: true,
  //    //Boolean - whether to make the chart responsive to window resizing
  //    responsive: true
  //};
  //
  ////Create the line chart
  //salesChart.Line(salesChartData, salesChartOptions);
  //---------------------------
  //- END MONTHLY SALES CHART -
  //---------------------------
  //- LINE CHART -
  //--------------
  //var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
  //var lineChart = new Chart(lineChartCanvas);
  //var lineChartOptions = salesChartOptions;
  //lineChartOptions.datasetFill = false;
  //lineChart.Line(salesChartData, lineChartOptions);
});
/*=== Ho??ng ===*/
var showLeadIdOrDealId = function (data, type, object) {
  if (data == null) {
    data =
      "<a target='_blank' href='/lead/detail/" +
      object.leadId +
      "' >L" +
      object.leadId +
      '</a>';
  } else {
    data =
      "<a target='_blank' href='/deal/detail/" +
      object.dealId +
      "' >D" +
      object.dealId +
      '</a>';
  }
  return data;
};
/*=== Steven ===*/
var getRegions = function (completed) {
  get_sync('/report/get-regions', true, function (response) {
    var html = '';
    if (response.result) {
      for (var x in response.data) {
        var item = response.data[x];
        html +=
          "<option value='" +
          item.regionId +
          "' >" +
          item.regionName +
          '</option>';
      }
    }
    $('#regions').html(html).select2();
    if (completed != null) {
      completed();
    }
  });
};
var getCitiesByRegions = function (regionIds, completed) {
  post_sync(
    '/report/get-cities-by-regions',
    { regionIdsList: regionIds },
    true,
    function (response) {
      var html = '';
      if (response.result) {
        for (var x in response.data) {
          var item = response.data[x];
          html +=
            "<option value='" +
            item.cityId +
            "' >" +
            item.cityName +
            '</option>';
        }
      }
      $('#cities').html(html).select2();
      if (completed != null) {
        completed();
      }
    }
  );
};
var getDistrictsByCities = function (regionIds, cityIds, completed) {
  data = {
    regionIdsList: regionIds,
    cityIdsList: cityIds,
  };
  post_sync('/report/get-districts-by-cities', data, true, function (response) {
    var html = '';
    if (response.result) {
      for (var x in response.data) {
        var item = response.data[x];
        html +=
          "<option value='" +
          item.districtId +
          "' >" +
          item.districtName +
          '</option>';
      }
    }
    $('#districts').html(html).select2();
    if (completed != null) {
      completed();
    }
  });
};
var processValueForGoogle = function (freshData) {
  returnData = [['Name', 'Value']];
  $(freshData).each(function (idx, element) {
    arr = new Array(element.name, element.value);
    returnData.push(arr);
  });
  return returnData;
};
var parseIntArray = function (arr) {
  if (arr == null) return arr;
  for (var i = 0; i < arr.length; i++) arr[i] = +arr[i];
  return arr;
};
function strToSlug(str) {
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
  str = str.replace(/??|??|???|???|??/g, 'i');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
  str = str.replace(/???|??|???|???|???/g, 'y');
  str = str.replace(/??/g, 'd');
  return str;
}
function showListingFeedBack(scheduleId, rlistingId) {
  $('#modalFeedBack .modal-body').html('');
  showPropzyLoading();
  $.ajax({
    url: '/deal/schedule-feedbacks/' + scheduleId + '/' + rlistingId + '/2',
    type: 'get',
  })
    .done(function (response) {
      if (response.result) {
        var html = "<table class='feedback-content table table-bordered' >";
        html +=
          "<tr><th>C??u h???i</th><th style='width:110px'>K???t qu???</th><th>L?? do</th></tr>";
        for (var i = 0; i < response.data.length; i++) {
          var item = response.data[i];
          html += '<tr>';
          html += '<td>' + item.questionName + '</td>';
          html +=
            "<td><span class='starRenderPropzy' poin='" +
            item.percentValue +
            "'>" +
            item.percentValue +
            '</span></td>';
          html += '<td>' + (item.reasonName ? item.reasonName : '') + '</td>';
          html += '</tr>';
        }
        html += '</table>';
        $('#modalFeedBack').find('.modal-body').html(html);
        renderStar();
        $('#modalFeedBack').modal();
      } else {
        showPropzyAlert(response.message);
      }
    })
    .always(function () {
      hidePropzyLoading();
    });
  return false;
}
function findCrms(reminderDate, currentId) {
  if (!reminderDate) {
    var whenDate = modalCreateMeeting.find('.whenDate').val();
    var whenTime = modalCreateMeeting.find('.whenTime').val();
    var reminderDate =
      moment(whenDate + ' ' + whenTime, 'MM/DD/YYYY HH:mm').unix() * 1000;
  }
  var postData = {
    reminderDate: reminderDate,
    currentCrmId: currentId ? currentId : null,
  };
  $.ajax({
    url: '/deal/find-crms',
    type: 'post',
    data: JSON.stringify(postData),
  })
    .done(function (response) {
      var html = "<option value='' >Ch???n ng?????i ph??? tr??ch meeting</option>";
      for (var i = 0; i < response.data.length; i++) {
        var item = response.data[i];
        html +=
          "<option value='" +
          item.userId +
          "' " +
          (item.userId == currentId ? 'selected' : '') +
          ' >' +
          item.name +
          ' ' +
          (item.availableTime ? ' - ' + item.availableTime : '') +
          '</option>';
      }
      modalCreateMeeting.find('.assignTo').html(html).select2();
    })
    .always(function () {});
}
function findFreeCrms(modal, reminderDate, currentId) {
  if (!reminderDate) {
    var whenDate = modal.find('.whenDate').val();
    var whenTime = modal.find('.whenTime').val();
    var reminderDate =
      moment(whenDate + ' ' + whenTime, 'MM/DD/YYYY HH:mm').unix() * 1000;
  }
  var postData = {
    reminderDate: reminderDate,
    currentCrmId: currentId ? currentId : null,
  };
  $.ajax({
    url: '/deal/find-crms',
    type: 'post',
    data: JSON.stringify(postData),
  })
    .done(function (response) {
      var html = "<option value='' >Ch???n ng?????i ph??? tr??ch meeting</option>";
      for (var i = 0; i < response.data.length; i++) {
        var item = response.data[i];
        html +=
          "<option value='" +
          item.userId +
          "' " +
          (item.userId == currentId ? 'selected' : '') +
          ' >' +
          item.userName +
          ' ' +
          (item.availableTime ? ' - ' + item.availableTime : '') +
          '</option>';
      }
      modal.find('.assignTo').html(html).select2();
    })
    .always(function () {});
}
function printMoreOption(ArrayStringPrint, data) {
  var divInfo = '';
  for (var i = 0; i < ArrayStringPrint.length; i++) {
    var arrayLabelKey = ArrayStringPrint[i].split('_');
    var value = data[arrayLabelKey[1]];
    var label = arrayLabelKey[0];
    // if !empty value label
    if (value != '') {
      if (arrayLabelKey[1] == 'DaMuaBaoNhieuCanTruocDo') {
        switch (value) {
          case '1_3':
            divInfo += '<div><label>-- ' + label + ':</label> 1-3</div>';
            break;
          case '3+':
            divInfo += '<div><label>-- ' + label + ':</label> >3</div>';
            break;
          default:
            divInfo += '<div><label>-- ' + label + ':</label> 0</div>';
        }
      } else {
        divInfo += '<div><label>-- ' + label + ':</label> ' + value + '</div>';
      }
    }
  }
  return divInfo;
}
var renderHistoryContent = function (data, type, object) {
  var returnValue = '';
  if (!object.defineId) {
    return data;
  }
  if (object.defineId == 32) {
    var item = JSON.parse(object.dataJson);
    var insertMore = Object(item.moreOption);
    // console.log(insertMore);
    returnValue += '<h4>* V??? nhu c???u kh??ch h??ng</h4>';
    if (item.purpose) {
      returnValue +=
        '<div><label>M???c ????ch mua:</label> ' +
        (item.purposeText ? item.purposeText : item.purpose) +
        '</div>' +
        printMoreOption(
          [
            'Mong mu???n thu???n l???i_MongMuonThuanLoi',
            'L?? do mua nh??_LyDoMuaNha',
            '???? mua bao nhi??u c??n tr?????c ????y_DaMuaBaoNhieuCanTruocDo',
            'Mua cho ai_MuaChoAi',
            'Kh??? n??ng huy ?????ng v???n t???i ??a_HuyDongVonToiDa',
            'Th???i gian mong mu???n thu h???i v???n_ThoiGianThuHoiVon',
          ],
          insertMore
        );
    }
    if (item.findHowLong) {
      returnValue +=
        '<div><label>T??m nh?? bao l??u:</label> ' +
        (item.findHowLongText ? item.findHowLongText : item.findHowLong) +
        '</div>' +
        printMoreOption(
          [
            'Thao kh???o gi?? qua_ThamKhaoGiaQua',
            '???? ??i xem v???i MG_DaDiXemVoiMG',
            'C?? ti???p t???c ??i xem v???i MG_CoTiepTucDiXemVoiMG',
          ],
          insertMore
        );
    }
    if (item.numberOfViewed) {
      returnValue +=
        '<div><label>???? xem bao nhi??u c??n:</label> ' +
        (item.numberOfViewedText
          ? item.numberOfViewedText
          : item.numberOfViewed) +
        '</div>' +
        printMoreOption(
          ['??ang xem x??t listing ngo??i_DangXemXetListingNgoai'],
          insertMore
        );
    }
    if (item.agencySupport) {
      returnValue +=
        '<div><label>??i v???i m??i gi???i:</label> ' +
        (item.agencySupportText ? item.agencySupportText : item.agencySupport) +
        '</div>';
    }
    returnValue += '<div><label>Mua cho ai:</label> ' + item.buyFor + '</div>';
    returnValue +=
      '<div><label>Ai l?? ng?????i quy???t ?????nh: </label> ' +
      item.whoDecision +
      '</div>';
    if (item.price) {
      returnValue +=
        '<div><label>Kho???n gi??:</label> ' +
        (item.priceText ? item.priceText : item.price) +
        '</div>';
    }
    returnValue += '<div><label>Khu v???c:</label> ' + item.area + '</div>';
    if (item.budgetType) {
      returnValue +=
        '<div><label>Ng??n s??ch:</label> ' +
        (item.budgetTypeText ? item.budgetTypeText : item.budgetType) +
        '</div>' +
        printMoreOption(
          [
            'C?? s???n bao nhi??u_CoSanBaoNhieu',
            'Th???m ?????nh kho???n vay_ThamDinhKhoanVay',
            'C?? c???n Propzy h??? tr???_CoCanPropzyHoTro',
            'Ng?????i th??n l?? ai_NguoiThanLaAi',
            'H??? tr??? bao nhi??u_HoTroBaoNhieu',
            'Ngu???n h??? tr??? c?? s???n_NguoiHoTroCoSan',
            'L?? do_LyDoThoiHan',
          ],
          insertMore
        );
    }
    returnValue +=
      '<div><label>Vay bao nhi??u:</label> ' + item.borrowPrice + '</div>';
    if (item.time) {
      returnValue +=
        '<div><label>Th???i gian ph???i mua:</label> ' +
        (item.timeText ? item.timeText : item.time) +
        '</div>' +
        printMoreOption(['L?? do_LyDoThoiHan'], insertMore);
    }
    returnValue += '<div><label>Di???n t??ch:</label> ' + item.size + '</div>';
    returnValue += '<div><label>H?????ng:</label> ' + item.direction + '</div>';
    if (item.propertyPosition) {
      returnValue +=
        '<div><label>V??? tr??:</label> ' +
        (item.propertyPositionText
          ? item.propertyPositionText
          : item.propertyPosition) +
        '</div>';
    }
    returnValue +=
      '<div><label>Y???u t??? quan tr???ng nh???t:</label> ' +
      item.importantFactor +
      '</div>';
    if (item.customer) {
      returnValue += '<h4>* V??? th??ng tin kh??ch h??ng</h4>';
      if (item.customer.job) {
        returnValue +=
          '<div><label>Ngh??? nghi???p:</label> ' + item.customer.job + '</div>';
      }
      returnValue +=
        '<div><label>????? tu???i:</label> ' + item.customer.age + '</div>';
      returnValue +=
        '<div><label>Thu nh???p:</label> ' + item.customer.income + '</div>';
      returnValue +=
        '<div><label>Nh?? c?? bao nhi??u ng?????i:</label> ' +
        item.customer.numberOfFamilyMembers +
        '</div>';
      if (item.customer.accommodationType) {
        returnValue +=
          '<div><label>N??i ??? hi???n t???i:</label> ' +
          (item.customer.accommodationTypeText
            ? item.customer.accommodationTypeText
            : item.customer.accommodationType) +
          '</div>';
      }
      returnValue +=
        '<div><label>?????a ch??? hi???n t???i:</label> ' +
        item.customer.address +
        '</div>';
      if (item.customer.purpose) {
        returnValue +=
          '<div><label>M???c ????ch mua nh??:</label> ' +
          (item.customer.purpose ? item.customer.purpose : '') +
          '</div>';
      }
    }
  }
  return returnValue;
};
function initBookPhotos() {
  $('.pinkBookPhoto').on('click', function (event) {
    event.preventDefault();
    var photos = JSON.parse(
      $(this).parents('tr').find('input.pinkBookPhotos').val()
    );
    if (photos) {
      var html = '';
      for (var x in photos) {
        html +=
          "<div class='item' style='text-align:center'><img onerror='imgError(this);' src='" +
          photos[x] +
          "' /></div>";
      }
      initSlideModal(html);
    }
  });
  $('.redBookPhoto').on('click', function (event) {
    event.preventDefault();
    var photos = JSON.parse(
      $(this).parents('tr').find('input.redBookPhotos').val()
    );
    if (photos) {
      var html = '';
      for (var x in photos) {
        html +=
          "<div class='item' style='text-align:center'><img onerror='imgError(this);' src='" +
          photos[x] +
          "' /></div>";
      }
      initSlideModal(html);
    }
  });
}
function initSlideModal(html) {
  try {
    $('#owl-carousel').data('owlCarousel').destroy();
  } catch (ex) {}
  $('#owl-carousel').html(html);
  $('#owl-carousel').owlCarousel({
    singleItem: true,
    navigation: true,
    navigationText: ['tr?????c', 'sau'],
  });
  $('#image-slider').modal();
  $('#owl-carousel img').hover(function () {
    $(this).elevateZoom({ scrollZoom: true });
  });
  $('#image-slider').on('hidden.bs.modal', function () {
    $('.zoomContainer').remove();
    console.log('remove');
  });
}
function defineNoteFunction() {
  $('.noteListing').on('click', function (event) {
    event.preventDefault();
    $('#noteListingId').val($(this).attr('data-listing-id'));
    $('#noteContent').val($(this).attr('data-value'));
    $('#noteForListing').modal('show');
    // console.log($(this).attr('data-value') + ' --- ' + $(this).attr('data-listing-id'));
  });
  $('#btnUpdateNote').on('click', function (event) {
    $.ajax({
      url: '/listing/note-for-listing',
      type: 'post',
      data: $('#formNoteForListing').serialize(),
    })
      .done(function (response) {
        // console.log(response);
        location.reload();
      })
      .always(function () {
        $('#noteForListing').modal('hide');
      });
  });
}
function openModalListingDetai(idListing) {
  showPropzyLoading();
  var postData = {
    listingId: parseInt(idListing),
  };
  $.ajax({
    url: '/common/open-modal-listing-detail',
    type: 'post',
    data: JSON.stringify(postData),
  })
    .done(function (response) {
      if (response) {
        $('#listingDetailModal').html(response);
        $('#listingDetailModal').modal();
        renderStar();
        $('#listingDetailModal img').hover(function () {
          $(this).elevateZoom({ scrollZoom: true });
        });
        $('#listingDetailModal').on('hidden.bs.modal', function () {
          $('.zoomContainer').remove();
          console.log('remove');
        });
      }
    })
    .always(function () {
      hidePropzyLoading();
      return false;
    });
}
var ProductRender = {
  renderRlistingId: function (data, type, object) {
    // " onclick='addGaneryCRM("+data+")'
    let _onClick = `onClick="return postDataPriceTags(dataPriceTags[${object.rlistingId}]); return true"`;
    var returnValue =
      '<a ' +
      "onclick='JMDetail.openModalListingDetailForAllPage(" +
      data +
      '); postDataPriceTags(dataPriceTags[' +
      object.rlistingId +
      "]);return false;' href='#'>" +
      data +
      '</a>';
    if (object.statusName) {
      returnValue += '<div>' + object.statusName + '</div>';
    }
    if (object.cartId) {
      returnValue +=
        '<span class="fa fa-minus-circle pull-right btnRed" id="myCart' +
        object.cartId +
        '" onclick="deletebListingMyCart(' +
        object.cartId +
        ');"></span>';
    }
    return returnValue;
  },
  renderListingImage: function (data, type, object) {
    if (!data) {
      return '';
    }
    data = "<img src='" + data + "' style='max-height:32px;' />";
    return data;
  },
  renderUseRightImages: function (data, type, object) {
    var returnValue = '';
    if (object.redBookPhotos) {
      returnValue =
        "<img onerror='imgError(this);' class='redBookPhoto' src='" +
        object.redBookPhotos[0] +
        "' style='max-height:32px;' />";
      returnValue +=
        "<input type='hidden' class='redBookPhotos' value='" +
        JSON.stringify(object.redBookPhotos) +
        "' />";
    }
    if (object.pinkBookPhotos) {
      returnValue =
        "<img onerror='imgError(this);' class='redBookPhoto' src='" +
        object.pinkBookPhotos[0] +
        "' style='max-height:32px;' />";
      returnValue +=
        "<input type='hidden' class='redBookPhotos' value='" +
        JSON.stringify(object.pinkBookPhotos) +
        "' />";
    }
    return returnValue;
  },
  renderOwner: function (data, type, object) {
    var returnValue = '<div>- ' + object.ownerType + '</div>';
    returnValue += '<div>- ' + object.ownerName + '</div>';
    returnValue += '<div>- ' + object.ownerPhone + '</div>';
    return returnValue;
  },
  renderSelectListing: function (data, type, object) {
    var disabled = '';
    var checked = '';
    var disableQuickCheck =
      object.isAvailableForQuickCheck == false ? 'disable-quick-check' : '';
    data =
      "<input type='checkbox' class='select-listing selected-email-listing " +
      disableQuickCheck +
      "' value='" +
      object.rlistingId +
      "' " +
      disabled +
      ' ' +
      checked +
      ' />';
    data += "<span class='address hidden'>" + object.address + '</span>';
    return data;
  },
  renderListingCountDayFromLastUpdate: function (data, type, object) {
    var returnValue = (moment().unix() - data / 1000) / 86400;
    returnValue = Math.ceil(returnValue);
    /*
         if (object.isFeedback) {
         returnValue = '<a href="#" class="getLogListing" data-listing-id="' + object.rlistingId + '">' + returnValue + '</a>';
         }
         */
    returnValue =
      '<a href="#" class="getLogListing" data-listing-id="' +
      object.rlistingId +
      '">' +
      returnValue +
      '</a>';
    return returnValue;
  },
  renderSize: function (data, type, object) {
    var returnValue = data;
    if (object.sizeWidth || object.sizeLength) {
      returnValue = object.sizeLength + 'x' + object.sizeWidth;
    }
    return returnValue;
  },
};
function agentSelected(socialUid, name) {
  $('#formMakeSchedule #socialUid').val(socialUid);
  $('.txtSearchAssignTo').val(name);
  $('.tableAgents_wrapper').hide();
}
$('.btnCloseAgentSuggest').on('click', function () {
  $('.tableAgents_wrapper').hide();
  $('.txtSearchAssignTo').val('');
  $('#formMakeSchedule #socialUid').val('');
});
var ReassignMeeting = function () {
  var myForm = $('#formReassignMeeting');
  function findCrms(reminderDate, currentId) {
    if (!reminderDate) {
      var whenDate = myForm.find('.whenDate').val();
      var whenTime = myForm.find('.whenTime').val();
      var reminderDate =
        moment(whenDate + ' ' + whenTime, 'MM/DD/YYYY HH:mm').unix() * 1000;
    }
    var postData = {
      reminderDate: reminderDate,
      currentCrmId: currentId ? currentId : null,
    };
    $.ajax({
      url: '/deal/find-crms',
      type: 'post',
      data: JSON.stringify(postData),
    })
      .done(function (response) {
        var html = "<option value='' >Ch???n ng?????i ph??? tr??ch meeting</option>";
        for (var i = 0; i < response.data.length; i++) {
          var item = response.data[i];
          html +=
            "<option value='" +
            item.userId +
            "' " +
            (item.userId == currentId ? 'selected' : '') +
            ' >' +
            item.userName +
            ' ' +
            (item.availableTime ? ' - ' + item.availableTime : '') +
            '</option>';
        }
        myForm.find('.assignTo').html(html).select2();
      })
      .always(function () {});
  }
  findCrms(null, null);
  myForm
    .find('.whenDate')
    .datepicker()
    .on('changeDate', function (e) {
      findCrms(null, null);
    });
  myForm
    .find('.whenTime')
    .timepicker({
      showMeridian: false,
    })
    .on('changeTime.timepicker', function (e) {
      findCrms(null, null);
    });
  myForm.find('.tCId').change(function () {
    var tcId = $(this).val();
    setChooseAddressVisible(myForm, tcId == 0);
  });
  setChooseAddressVisible(myForm, myForm.find('.tCId').val() == 0);
  $('.btnSaveReassignMeeting').on('click', function (event) {
    event.preventDefault();
    var whenDate = myForm.find('.whenDate').val();
    var whenTime = myForm.find('.whenTime').val();
    var date = moment(whenDate + ' ' + whenTime, 'MM/DD/YYYY HH:mm');
    var postData = {
      id: myForm.find('.meetingId').val(),
      //"taskId": myForm.find(".taskId").val(),
      tCId: myForm.find('.tCId').val(),
      reminderDate: date.unix() * 1000,
      assignTo: parseInt(myForm.find('.assignTo').val()),
      //"reminderTime": parseInt(modalCreateMeeting.find(".reminderTime").val()),
      noteTm: myForm.find('.noteTm').val(),
    };
    myForm.find('.errors').html('');
    var isValid = true;
    if (!postData.assignTo) {
      myForm.find('.assignTo').parent().find('.errors').html('Ch???n ng?????i ph??? tr??ch meeting.');
      isValid = false;
    }
    if (postData.tCId == '-1') {
      myForm.find('.tCId').parent().find('.errors').html('Ch???n TC');
      isValid = false;
    }
    if (postData.tCId == 0) {
      postData.address = myForm.find('.address').val();
      if (postData.address.trim() == '') {
        myForm.find('.address').parent().find('.errors').html('Ch???n ?????a ch???');
        myForm.find('#lat').val();
        myForm.find('#long').val();
        isValid = false;
      } else if (
        myForm.find('#lat').val().trim() == '' ||
        myForm.find('#long').val().trim() == ''
      ) {
        myForm
          .find('.address')
          .parent()
          .find('.errors')
          .html('?????a ch??? kh??ng h???p l??? vui l??ng ch???n l???i.');
        myForm.find('.address').val();
        postData.address = null;
        isValid = false;
      } else {
        postData.longitude = myForm.find('#long').val().trim();
        postData.latitude = myForm.find('#lat').val().trim();
      }
    }
    if (postData.reminderDate == null) {
      myForm
        .find('.whenDate')
        .parent()
        .parent()
        .find('.errors')
        .html('Ch???n ng??y / gi???');
      isValid = false;
    } else {
      var nowTimestamp = moment().unix() * 1000;
      if (postData.reminderDate <= nowTimestamp) {
        myForm
          .find('.whenDate')
          .parent()
          .parent()
          .find('.errors')
          .html('Ng??y gi??? ph???i l???n h??n hi???n t???i.');
        isValid = false;
      }
    }
    if (!postData.noteTm.trim()) {
      myForm.find('.noteTm').parent().find('.errors').html('Nh???p ghi ch??');
      isValid = false;
    }
    if (!isValid) {
      return false;
    }
    // postData.type = 'type';
    showPropzyLoading();
    $.ajax({
      url: '/deal/update-meeting',
      type: 'post',
      data: JSON.stringify(postData),
    })
      .done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
          var intercom = Intercom.getInstance();
          intercom.emit(
            'closeModalCancleMeeting',
            $('#formReassignMeeting').find('#meetingId').val()
          );
          window.location = '/';
        }
      })
      .always(function () {
        hidePropzyLoading();
      });
  });
  $(myForm.find('.address'))
    .geocomplete()
    .bind('geocode:result', function (event, result) {
      myForm.find('#lat').val(result.geometry.location.lat());
      myForm.find('#long').val(result.geometry.location.lng());
    });
};
function RequestUpdate(requestId, leadId) {
  this.form = $('#form-request-update');
  this.leadId = leadId;
  this.requestId = requestId;
  var current = this;
  this.init = function () {
    this.findSelector('.btnSaveNote').on('click', function (event) {
      event.preventDefault();
      var notes = current.findSelector('.notes').val();
      if (notes.trim() == '') {
        showPropzyAlert('Nh???p n???i dung ghi ch??!');
        current.findSelector('.notes').focus();
        return false;
      }
      var postData = {
        requestId: parseInt(current.requestId),
        leadId: parseInt(current.leadId),
        note: notes,
      };
      showPropzyLoading();
      $.ajax({
        url: '/lead-deal-commons/user-request-update',
        type: 'post',
        data: JSON.stringify(postData),
      })
        .done(function (response) {
          showPropzyAlert(response.message);
          if (response.result) {
            current.findSelector('.notes').val('');
            window.location.reload();
          }
        })
        .always(function () {
          hidePropzyLoading();
        });
    });
  };
  this.findSelector = function (selector) {
    return this.form.find(selector);
  };
}
var renderListingCountDayFromLastUpdate = function (data, type, object) {
  var returnValue = (moment().unix() - data / 1000) / 86400;
  returnValue = Math.ceil(returnValue);
  /*
     if (object.isFeedback) {
     returnValue = '<a href="#" class="getLogListing" data-listing-id="' + object.rlistingId + '">' + returnValue + '</a>';
     }
     */
  returnValue =
    '<a href="#" class="getLogListing" data-listing-id="' +
    object.rlistingId +
    '">' +
    returnValue +
    '</a>';
  return returnValue;
};
var leadDealRender = {
  renderDaysOfBeingLead: function (data, type, object) {
    var returnValue = (moment().unix() - object.createdDate / 1000) / 86400;
    if (object.createdDateOfDeal) {
      returnValue =
        (object.createdDateOfDeal - object.createdDate) / (86400 * 1000);
    }
    returnValue = Math.ceil(returnValue);
    return returnValue;
  },
  renderDaysOfBeingDeal: function (data, type, object) {
    var returnValue = (moment().unix() - object.createdDate / 1000) / 86400;
    returnValue = Math.ceil(returnValue);
    return returnValue;
  },
};
var text2Slug = function (alias) {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
  str = str.replace(/??|??|???|???|??/g, 'i');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???  |???|???|???/g, 'o');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
  str = str.replace(/???|??|???|???|???/g, 'y');
  str = str.replace(/??/g, 'd');
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
    '-'
  );
  / t??m v?? thay th??? c??c k?? t??? ?????c bi???t trong chu???i sang k?? t??? - /;
  str = str.replace(/-+-/g, '-'); //thay th??? 2- th??nh 1-
  str = str.replace(/^\-+|\-+$/g, '');
  //c???t b??? k?? t??? - ??? ?????u v?? cu???i chu???i
  return str;
};
window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
};
function doneTask(taskId) {
  showPropzyLoading();
  $.ajax({
    url: '/crm-dashboard/done-task/' + taskId,
    type: 'get',
  })
    .done(function (response) {
      showPropzyAlert(response.message);
      if (response.result) {
        window.location = '/';
      }
    })
    .always(function () {
      hidePropzyLoading();
    });
}
// dev by JackSmall 24/10/2017
function imgError(image) {
  $(image).attr('src', '/images/404image.png');
  // image.style.display = 'none';
}
function clearStoredIds() {
  try {
    $('#arrayStoreListingForAction').val('');
    $('#arrayStoreTourListingForAction').val('');
  } catch (ex) {}
}
$(document).ready(function () {
  renderStar();
});
// \ dev by JackSmall 24/10/2017
function setChooseAddressVisible(container, isVisible) {
  if (isVisible) {
    container.find('.chooseAddress').show();
  } else {
    container.find('.chooseAddress').hide();
  }
}
globalMenuStatus = $('body').attr('class');
