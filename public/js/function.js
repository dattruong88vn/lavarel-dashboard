Template7.registerHelper('optionCreater', function (number, start, step) {
  str = '';
  if (step < 1) {
  }
  for (i = parseFloat(start); i < parseFloat(number); i += parseFloat(step)) {
    str +=
      '<option value=' +
      (step < 1 ? Math.round(i * 10) / 10 : i) +
      '> ' +
      (step < 1 ? Math.round(i * 10) / 10 : i) +
      '</option>';
  }
  return str;
});

var GET_segment = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
  function decode(s) {
    return decodeURIComponent(s.split('+').join(' '));
  }

  GET_segment[decode(arguments[1])] = decode(arguments[2]);
});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires;
}

function strMask(
  string,
  numFirstCharacter = 3,
  numLastCharacter = 3,
  character = '*'
) {
  if (string != null && string != '') {
    let total = numFirstCharacter + numLastCharacter;
    var l = string.length;
    return (
      string.substring(0, numFirstCharacter) +
      character.repeat(l - total) +
      string.substring(l - numFirstCharacter, l)
    );
  } else {
    return 'N/A';
  }
}

function validNumberDirect() {
  $('.numvad').keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (
      e.which != 8 &&
      e.which != 0 &&
      e.which != 44 &&
      (e.which < 48 || e.which > 57)
    ) {
      //display error message
      $('#errmsg').html('Digits Only').show().fadeOut('slow');
      return false;
    }
  });
}

function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
}

$.fn.waitUntilExists = function (handler, shouldRunHandlerOnce, isChild) {
  var found = 'found';
  var $this = $(this.selector);
  var $elements = $this
    .not(function () {
      return $(this).data(found);
    })
    .each(handler)
    .data(found, true);

  if (!isChild) {
    (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[
      this.selector
    ] = window.setInterval(function () {
      $this.waitUntilExists(handler, shouldRunHandlerOnce, true);
    }, 500);
  } else if (shouldRunHandlerOnce && $elements.length) {
    window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
  }

  return $this;
};

var post_sync_with_token = function (url, token, data, isSync, completed) {
  $('.modal-overlay').show();
  $.ajax({
    type: 'POST',
    url: url,
    headers: {
      'X-XSRF-TOKEN': token,
    },
    data: JSON.stringify(data),
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      $('.modal-overlay').hide();
      completed(data);
    },
    error: function (data) {
      $('.modal-overlay').hide();
    },
    async: isSync,
  });
};

var post_sync = function (url, data, isSync, completed) {
  $('.modal-overlay').show();
  $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      $('.modal-overlay').hide();
      completed(data);
    },
    error: function (data) {
      $('.modal-overlay').hide();
    },
    async: isSync,
  });
};

//String.prototype.parseDate = function (separator) {
//    var parts = this.split(separator);
//    console.log(parts);
//    return Date.parse(new Date(parts[2], parts[1] - 1, parts[0]));
//};

var get_sync = function (url, isSync, completed, showLoading) {
  if (showLoading) {
    showPropzyLoading();
  }
  $.ajax({
    type: 'GET',
    url: BASE_URL + url,
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      completed(data);
    },
    error: function (data) {
      $('.modal-overlay').hide();
    },
    async: isSync,
  }).always(function () {
    if (showLoading) {
      hidePropzyLoading();
    }
  });
};

var ajax_post_form = function (form, completed) {
  console.log(BASE_URL + form.attr('action'));
  $.ajax({
    type: 'POST',
    url: BASE_URL + form.attr('action'),
    data: form.serialize(),
    success: function (data) {
      completed(data);
    },
    error: function (data) {
      waitingDialog.hide();
      showPageAlert('Có lỗi xảy ra! Hãy thử lại');
    },
  });
};

var showPageAlert = function (
  strTitle,
  strContent,
  extendOptions,
  confirmFunc
) {
  // http://craftpip.github.io/jquery-confirm/
  confirm = 'OK';
  cancel = 'Cancel';
  options = {
    title: strTitle,
    content: strContent,
    confirmButton: confirm,
    cancelButton: cancel,
  };

  if (extendOptions != undefined && extendOptions != null)
    options = $.extend({}, options, extendOptions);

  options.confirm = function () {
    if (confirmFunc != null) confirmFunc();
  };

  $.alert(options);
};

var isBlank = function (str) {
  return !str || /^\s*$/.test(str);
};

var isEmail = function (s) {
  if (
    s.search(
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,4}$/
    ) != -1
  )
    return true;
  return false;
};
var isPhoneNumber = function (str) {
  valid = false;
  if ($.isNumeric(str) && str.length > 9 && str.length < 12) {
    var number = parseInt(str);
    if (number > 100000000) {
      if (
        str.substring(0, 2) != '00' &&
        str.substring(0, 3) != '+84' &&
        str.substring(0, 1) != '+'
      ) {
        valid = true;
      }
    }
  }
  return valid;
};

var wordLimiter = function (str, limit, end_char) {
  limit = limit || 10;
  end_char = end_char || '...';
  var arrWord = str.split(/[\s]+/);
  if (arrWord.length <= limit) return str;
  str = '';
  for (i = 0; i < limit; i++) str = str + ' ' + arrWord[i];
  return str + ' ' + end_char;
};

/**
 *
 * @param {string} selector ex: .imageListing
 * @param {Boolean} required
 * @returns {Boolean}
 */
function validateFileUpload(selector, required) {
  var result = true;
  if (required) {
    if ($(selector + ' .file-preview-frame').length == 0) {
      showPropzyAlert('Vui lòng ch�?n ít nhất một tấm ảnh');
      $(selector).focus();
      result = false;
    }
  }
  if ($(selector + ' .file-preview-frame').length > 0) {
    if (
      $(selector).find('.kv-upload-progress .progress-bar-success').length > 0
    ) {
      if (
        $(selector + ' .kv-upload-progress')
          .find('.progress-bar-success')
          .attr('aria-valuenow') < 100
      ) {
        showPropzyAlert('Quá trình upload ảnh chưa xong.');
        result = false;
      }
    }
  }
  return result;
}

function showPropzyAlert(
  message,
  title,
  callback,
  closeButtonHtml,
  eventName,
  name
) {
  if (hasValueV2(message)) {
    $('#alertModal .message').html(message);
  }
  if (hasValueV2(title)) {
    $('#alertModal .modal-title').html(title);
  } else {
    $('#alertModal .modal-title').html('Thông báo');
  }
  if (!hasValue(name)) {
    name = 'callback_' + Math.random();
    name = name.replace('.', '');
    // name = 'callback_' + Math.random().toString().replaceAll(',', '').replaceAll('.', '');
  }
  if (hasValue(callback)) {
    if (!hasValueV2(eventName)) {
      eventName = 'hidden.bs.modal';
    } else {
      // nothing
    }
    showPropzyAlert[name] = true;
    $('body')
      .off(eventName, '#alertModal')
      .on(eventName, '#alertModal', function (e) {
        e.preventDefault();
        if (showPropzyAlert[name] == true) {
          callback(e);
        }
        $('body').off(eventName, '#alertModal');
      });
  }
  if (!hasValueV2(closeButtonHtml)) {
    $('#alertModal .modal-footer .btn').text('Đóng');
  } else {
    $('#alertModal .modal-footer .btn').html(closeButtonHtml);
  }
  $('#alertModal').modal();
  delete showPageAlert[name];
}

function showPropzyAlertPopupGeneral(
  message,
  title,
  callback,
  closeButtonHtml,
  eventName,
  name
) {
  if (hasValueV2(message)) {
    $('#alertModalPopupGeneral .message').html(message);
  }
  if (hasValueV2(title)) {
    $('#alertModalPopupGeneral .modal-title').html(title);
  } else {
    $('#alertModalPopupGeneral .modal-title').html('Thông báo');
  }
  if (!hasValue(name)) {
    name = 'callback_' + Math.random();
    name = name.replace('.', '');
    // name = 'callback_' + Math.random().toString().replaceAll(',', '').replaceAll('.', '');
  }
  if (hasValue(callback)) {
    if (!hasValueV2(eventName)) {
      eventName = 'hidden.bs.modal';
    } else {
      // nothing
    }
    showPropzyAlertPopupGeneral[name] = true;
    $('body')
      .off(eventName, '#alertModalPopupGeneral')
      .on(eventName, '#alertModalPopupGeneral', function (e) {
        e.preventDefault();
        if (showPropzyAlertPopupGeneral[name] == true) {
          callback(e);
        }
        $('body').off(eventName, '#alertModalPopupGeneral');
      });
  }
  if (!hasValueV2(closeButtonHtml)) {
    $('#alertModalPopupGeneral .modal-footer .btn').text('Đóng');
  } else {
    $('#alertModalPopupGeneral .modal-footer .btn').html(closeButtonHtml);
  }
  $('#alertModalPopupGeneral').modal();
  delete showPageAlert[name];
}

function showPropzyConfirm(options) {
  var _confirmModal = '#confirmModal';
  var _options = {
    title: 'Thông báo',
    message: '',
    btn: {
      yes: {
        text: 'Có',
        show: true,
      },
      no: {
        text: 'Không',
        show: true,
      },
    },
    okCallback: function () {},
    cancelCallback: function () {},
  };
  _options = $.extend(true, _options, options);

  if (!_options.btn.no.show) {
    $(_confirmModal).find('#confirm-cancel-btn').hide();
    $(_confirmModal).find('.close').hide();
  } else {
    $(_confirmModal).find('#confirm-cancel-btn').show();
    $(_confirmModal).find('.close').show();
  }

  if (!_options.btn.yes.show) {
    // add option to hide yes button
    $(_confirmModal).find('#confirm-ok-btn').hide();
    $(_confirmModal).find('.close').hide();
  } else {
    $(_confirmModal).find('#confirm-ok-btn').show();
    $(_confirmModal).find('.close').show();
  }

  $(_confirmModal).find('#confirm-ok-btn').html(_options.btn.yes.text);
  $(_confirmModal).find('#confirm-cancel-btn').html(_options.btn.no.text);

  $(_confirmModal).on("hide.bs.modal", function (e) {
    typeof _options.closeCallback === 'function' && _options.closeCallback();
  });

  $('body')
    .off('click', _confirmModal + ' #confirm-ok-btn')
    .on('click', _confirmModal + ' #confirm-ok-btn', function (e) {
      e.preventDefault();
      _options.okCallback();
      $(_confirmModal).modal('hide');
    });
  $('body')
    .off('click', _confirmModal + ' #confirm-cancel-btn')
    .on('click', _confirmModal + ' #confirm-cancel-btn', function (e) {
      e.preventDefault();
      _options.cancelCallback();
      $(_confirmModal).modal('hide');
    });
  $(_confirmModal + ' .modal-title').html(_options.title);
  $(_confirmModal + ' .message').html(_options.message);
  $(_confirmModal).modal({ backdrop: 'static', keyboard: false });
}

function closePropzyAlert() {
  $('#alertModal').modal('hide');
}

function showPropzyLoading() {
  NProgress.start();
  $('#ajax-loading').show();
}

function hidePropzyLoading() {
  NProgress.done();
  NProgress.remove();
  $('#ajax-loading').hide();
}

function showPropzyLoadingBPO() {
  NProgress.start();
  $('#ajax-loading-bpo').show();
}

function hidePropzyLoadingBPO() {
  NProgress.done();
  NProgress.remove();
  $('#ajax-loading-bpo').hide();
}

function checkAliveSession() {
  $.ajax({
    url: '/is-session-alive',
    type: 'get',
  })
    .done(function (response) {
      if (!response.isAlive) {
        showPropzyAlert('Bạn đã bị logout. Vui lòng đăng nhập lại');
        window.location = '/logout';
      }
    })
    .always(function () {});
}

function number_format(number, decimals, dec_point, thousands_sep) {
  var n = number,
    prec = decimals;

  var toFixedFix = function (n, prec) {
    var k = Math.pow(10, prec);
    return (Math.round(n * k) / k).toString();
  };

  n = !isFinite(+n) ? 0 : +n;
  prec = !isFinite(+prec) ? 0 : Math.abs(prec);
  var sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep;
  var dec = typeof dec_point === 'undefined' ? '.' : dec_point;

  var s = prec > 0 ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec);
  //fix for IE parseFloat(0.55).toFixed(0) = 0;

  var abs = toFixedFix(Math.abs(n), prec);
  var _, i;

  if (abs >= 1000) {
    _ = abs.split(/\D/);
    i = _[0].length % 3 || 3;

    _[0] =
      s.slice(0, i + (n < 0)) + _[0].slice(i).replace(/(\d{3})/g, sep + '$1');
    s = _.join(dec);
  } else {
    s = s.replace('.', dec);
  }

  var decPos = s.indexOf(dec);
  if (prec >= 1 && decPos !== -1 && s.length - decPos - 1 < prec) {
    s += new Array(prec - (s.length - decPos - 1)).join(0) + '0';
  } else if (prec >= 1 && decPos === -1) {
    s += dec + new Array(prec).join(0) + '0';
  }
  return s;
}

function initWardForListingDescription(wardSelector, descriptionId) {
  $(wardSelector).change(function () {
    var wardId = $(this).val();
    var dataUrl = '/listing/get-address-suggestion/' + wardId;
    showPropzyLoading();
    $.ajax({
      url: dataUrl,
      type: 'get',
    })
      .done(function (response) {
        if (response.result) {
          var description = CKEDITOR.instances[descriptionId].getData();
          //console.log(description);
          description += response.data.description;
          CKEDITOR.instances[descriptionId].setData(description);
        }
      })
      .always(function () {
        hidePropzyLoading();
      });
  });
}

/////////// VALIDATE /////////////
function validatePhone(txtPhone) {
  var filter =
    /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  if (filter.test(txtPhone) && txtPhone.length <= 15 && txtPhone.length >= 4) {
    return true;
  } else {
    return false;
  }
}

function isValidPhone(phone) {
  var filter = /^[0-9]+$/;
  var validPhone = true;
  if (!filter.test(phone)) {
    validPhone = false;
  } else if (phone.length > 11) {
    validPhone = false;
  }
  return validPhone;
}

function isValidNumber(number) {
  var filter = /^[0-9]+$/;
  var validNumber = true;
  if (!filter.test(number)) {
    validNumber = false;
  }
  return validNumber;
}

function convertMinuteToHour(number) {
  var result = '';
  var minute = Math.round(number);
  var hour = Math.floor(number / 60);
  var minute = minute - hour * 60;

  if (hour > 24) {
    var day = Math.floor(number / 60 / 24);
    hour = Math.round(hour - day * 24);
    if (hour <= 0) {
      result = ' (trễ ' + day + ' ngày)';
    } else {
      result = ' (trễ ' + day + ' ngày ' + hour + ' gi�?)';
    }
  } else {
    if (hour <= 0) {
      if (minute > 0) {
        result = ' (trễ ' + minute + ' phút)';
      }
    } else {
      if (minute > 0) {
        return ' (trễ ' + hour + ' gi�? ' + minute + ' phút)';
      }
      return ' (trễ ' + hour + ' gi�?)';
    }
  }
  return result;
}

function dateStringToTimestamp(dateString, separator) {
  if (!hasValue(separator)) {
    separator = '/';
  }
  var parts = dateString.split(separator);
  var dateTime = new Date(parts[2], parts[1] - 1, parts[0]);
  return dateTime - 0;
}

function hasValue(value) {
  return (
    typeof value != undefined &&
    value != undefined &&
    value != null &&
    value != ''
  );
}

function formatCurrency(number, split, group, currency) {
  if (typeof split == undefined || split == undefined) split = ',';
  if (typeof group == undefined || group == undefined) group = '.';
  if (typeof currency == undefined || currency == undefined) currency = 'đ';

  number += '';
  x = number.split(split);
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + group + '$2');
  }
  return x1 + x2 + currency;
}

var dataTableLanguages = {
  vn: {
    sProcessing: '�?ang xử lý...',
    sLengthMenu: 'Xem _MENU_ mục',
    sZeroRecords: 'Không tìm thấy dòng nào phù hợp',
    sInfo: '�?ang xem _START_ đến _END_ trong tổng số _TOTAL_ mục',
    sInfoEmpty: '�?ang xem 0 đến 0 trong tổng số 0 mục',
    sInfoFiltered: '(được l�?c từ _MAX_ mục)',
    sInfoPostFix: '',
    sSearch: 'Tìm:',
    sUrl: '',
    oPaginate: {
      sFirst: '�?ầu',
      sPrevious: 'Trước',
      sNext: 'Tiếp',
      sLast: 'Cuối',
    },
  },
};

function getDataTableLanguage(languageCode) {
  return dataTableLanguages[languageCode];
}

function shortenInputStr(inputStr) {
  if (!inputStr) {
    return '';
  }
  var newInputStr = inputStr.split(' ');
  return newInputStr.shift() + '...';
}

function stripHtmlTags(str) {
  if (typeof str == undefined || str == undefined) {
    return '';
  }
  if (str === null || str === '') {
    return str;
  } else {
    str = str.toString();
  }
  return str.replace(/<[^>]*>/g, '');
}

function stripHtmlTags(str) {
  if (typeof str == undefined || str == undefined) {
    return '';
  }
  if (str === null || str === '') {
    return str;
  } else {
    str = str.toString();
  }
  return str.replace(/<[^>]*>/g, '');
}

function hasValue(value) {
  return (
    typeof value != undefined &&
    value != undefined &&
    value != null &&
    value != ''
  );
}

function formatDate(timestampString) {
  if (hasValue(timestampString)) {
    if (timestampString.toString().length < 13) {
      timestampString = timestampString * 1000;
    }
    var datetime = new Date(timestampString);
    if (typeof moment != undefined) {
      return moment(datetime).format('DD/MM/YYYY');
    }
    return timestampString;
  }
  return '';
}

function checkStringNotNull(inputText) {
  if (typeof inputText === 'undefined') {
    return false;
  } else if (
    inputText == null ||
    inputText == 'null' ||
    inputText == 'undefined' ||
    inputText.trim() == ''
  ) {
    return false;
  } else {
    return true;
  }
}

/**
 * AES JSON formatter for CryptoJS
 *
 * @author BrainFooLong (bfldev.com)
 * @link https://github.com/brainfoolong/cryptojs-aes-php
 */

var CryptoJSAesJson = {
  stringify: function (cipherParams) {
    var j = {
      ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
    };
    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    if (cipherParams.salt) j.s = cipherParams.salt.toString();
    return JSON.stringify(j);
  },
  parse: function (jsonStr) {
    var j = JSON.parse(jsonStr);
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ct),
    });
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    return cipherParams;
  },
};

// Dashboard decrypt
// require : aes.js
function dashboardDecrypt(encryptedString, key) {
  return JSON.parse(
    CryptoJS.AES.decrypt(encryptedString, key, {
      format: CryptoJSAesJson,
    }).toString(CryptoJS.enc.Utf8)
  );
}

// Phone number decrypt
// require : aes.js
function decryptPhoneNumber(phoneNumber) {
  return dashboardDecrypt(phoneNumber, readCookieByName('call-key'));
}

function readCookieByName(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length == 2) return parts.pop().split(';').shift();
}

function ajaxQueue() {
  var previous = new $.Deferred().resolve();

  return function (fn, fail) {
    if (typeof fn !== 'function') {
      throw 'must be a function';
    }

    return (previous = previous.then(fn, fail || fn));
  };
}

function createBootstrapNotification(params) {
  var _params = {
    message:
      'Turning standard Bootstrap alerts into "notify" like notifications',
  };

  _params = $.extend(_params, params);

  return $.notify(_params, {
    timer: 0,
    placement: {
      from: 'bottom',
      align: 'right',
    },
  });
}

function createNotification(params) {
  var _params = {
    message:
      'Turning standard Bootstrap alerts into "notify" like notifications',
    type: 'danger',
    from: 'top',
    align: 'center',
    timer: 1000,
    delay: 3000,
    element: 'body',
    callback: function () {
      return true;
    },
  };
  _params = $.extend(_params, params);
  return $.notify(
    {
      icon: 'notifications',
      message: _params.message,
    },
    {
      element: _params.element,
      type: _params.type,
      timer: _params.timer,
      delay: _params.delay,
      placement: {
        from: _params.from,
        align: _params.align,
      },
      onClosed: _params.callback,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp',
      },
    }
  );
}

function ajaxCall(ajax, callback) {
  ajaxStart();
  ajax().done(function (response) {
    callback(response);
    ajaxEnd();
  });
}

function ajaxStart() {
  if (!hasValue(showPropzyLoading.track)) {
    showPropzyLoading.track = [];
  }
  showPropzyLoading.track.push(1);
  showPropzyLoading();
}

function ajaxEnd() {
  showPropzyLoading.track.pop();
  if (showPropzyLoading.track.length == 0) {
    hidePropzyLoading();
  }
}

function hasValueV2(value) {
  return (
    (typeof value != undefined &&
      value != undefined &&
      value != null &&
      value != '') ||
    value == false
  );
}

function naturalStringCompare(a, b) {
  var ax = [],
    bx = [];

  a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
    ax.push([$1 || Infinity, $2 || '']);
  });
  b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
    bx.push([$1 || Infinity, $2 || '']);
  });

  while (ax.length && bx.length) {
    var an = ax.shift();
    var bn = bx.shift();
    var nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }

  return ax.length - bx.length;
}

function isArray(array) {
  return Array.isArray(array);
}

function errorsStart() {
  if (hasValue(errorsStart.count)) {
    errorsStart.count++;
  } else {
    errorsStart.count = 1;
    errorsStart.messages = [];
  }
}

function errorsEnd(clearErrors) {
  errorsStart.count--;
  if (errorsStart.count == 0) {
    if (errorsStart.messages.length > 0) {
      for (var i = 0; i < errorsStart.messages.length; i++) {
        console.log(errorsStart.messages[i]);
      }
      if (clearErrors == true) {
        errorsClear();
      }
    }
  }
}

function parseMonth(mnth) {
  switch (mnth.toLowerCase()) {
    case 'january':
    case 'jan':
    case 'enero':
      return 1;
    case 'february':
    case 'feb':
    case 'febrero':
      return 2;
    case 'march':
    case 'mar':
    case 'marzo':
      return 3;
    case 'april':
    case 'apr':
    case 'abril':
      return 4;
    case 'may':
    case 'mayo':
      return 5;
    case 'jun':
    case 'june':
    case 'junio':
      return 6;
    case 'jul':
    case 'july':
    case 'julio':
      return 7;
    case 'aug':
    case 'august':
    case 'agosto':
      return 8;
    case 'sep':
    case 'september':
    case 'septiembre':
    case 'setiembre':
      return 9;
    case 'oct':
    case 'october':
    case 'octubre':
      return 10;
    case 'nov':
    case 'november':
    case 'noviembre':
      return 11;
    case 'dec':
    case 'december':
    case 'diciembre':
      return 12;
  }
  return mnth;
}

function HumanToEpoch2(strDate) {
  strDate = strDate.replace(/[\,]/g, '');
  strDate = strDate.replace(/^\s+|\s+$/g, '');
  strDate = strDate.replace(/ +(?= )/g, '');
  strDate = strDate.replace(/^(\d+)\./, '$1');
  var ok = 0;
  var skipDate = 0;
  var content = '';
  var date = '';
  var format = '';
  var yr = 1970;
  var mnth = 1;
  var dy = 1;
  var hr = 0;
  var mn = 0;
  var sec = 0;
  var dmy = 1;
  if (!ok) {
    var dateTimeSplit = strDate.split(' ');
    var dateParts = dateTimeSplit[0].split('-');
    if (dateParts.length === 1) dateParts = dateTimeSplit[0].split('.');
    if (dateParts.length === 1) {
      dmy = 0;
      dateParts = dateTimeSplit[0].split('/');
    }
    if (dateParts.length === 1) {
      dmy = 1;
      if (dateTimeSplit.length > 2) {
        if (dateTimeSplit[2].split(':').length === 1) {
          strDate = strDate.replace(
            dateTimeSplit[0] + ' ' + dateTimeSplit[1] + ' ' + dateTimeSplit[2],
            dateTimeSplit[0] + '-' + dateTimeSplit[1] + '-' + dateTimeSplit[2]
          );
          dateTimeSplit = strDate.split(' ');
          dateParts = dateTimeSplit[0].split('-');
        }
      }
    }
    if (dateParts.length === 1) {
      dateParts = dateTimeSplit;
      if (dateTimeSplit.length > 3) timeParts = dateTimeSplit[4];
    }
    if (dateParts.length > 2) {
      if (dateParts[0] > 100) {
        yr = dateParts[0];
        mnth = parseMonth(dateParts[1]);
        dy = dateParts[2];
        format = 'YMD';
      } else {
        if (dmy) {
          dy = dateParts[0];
          mnth = parseMonth(dateParts[1]);
          yr = dateParts[2];
          format = 'DMY';
          if (!parseFloat(mnth) || !parseFloat(dy)) {
            dy = dateParts[1];
            mnth = parseMonth(dateParts[0]);
            format = 'MDY';
          }
        } else {
          mnth = parseMonth(dateParts[0]);
          dy = dateParts[1];
          yr = dateParts[2];
          format = 'MDY';
          if (!parseFloat(mnth) || !parseFloat(dy)) {
            dy = dateParts[0];
            mnth = parseMonth(dateParts[1]);
            format = 'DMY';
          }
        }
      }
      ok = 1;
    }
    if (ok && dateTimeSplit[1]) {
      var timeParts = dateTimeSplit[1].split(':');
      if (timeParts.length >= 2) {
        hr = timeParts[0];
        mn = timeParts[1];
      }
      if (timeParts.length >= 3) {
        sec = timeParts[2];
      }
      if (
        dateTimeSplit[2] &&
        dateTimeSplit[2].toLowerCase() === 'pm' &&
        parseFloat(hr) < 12
      )
        hr = parseFloat(hr) + 12;
      if (
        dateTimeSplit[2] &&
        dateTimeSplit[2].toLowerCase() === 'am' &&
        parseFloat(hr) === 12
      )
        hr = 0;
    }
  }
  if (!ok) {
    date = new Date(strDate);
    if (date.getFullYear() > 1900) {
      ok = 1;
      skipDate = 1;
    }
  }
  if (ok) {
    if (!skipDate) {
      if (mnth !== parseFloat(mnth)) mnth = parseMonth(mnth);
      if (yr < 30) yr = 2000 + parseFloat(yr);
      if (yr < 200) yr = 1900 + parseFloat(yr);
      var usedGMT = 0;
      if (
        (strDate.toUpperCase().indexOf('GMT') > 0 ||
          strDate.toUpperCase().indexOf('UTC') > 0) &&
        strDate.toUpperCase().indexOf('GMT+') == -1 &&
        strDate.toUpperCase().indexOf('UTC+') == -1
      ) {
        date = new Date(Date.UTC(yr, mnth - 1, dy, hr, mn, sec));
        usedGMT = 1;
      } else {
        date = new Date(yr, mnth - 1, dy, hr, mn, sec);
      }
    }
    content = date.getTime();
  }
  return content;
}

function renderStar() {
  $('.starRenderPropzy').each(function () {
    var render = '';
    var poin = $(this).attr('poin');
    switch (true) {
      case poin == 0:
        for (var i = 0; i <= 4; i++) {
          render += '<i class="fa fa-star-o" aria-hidden="true"></i>';
        }
        break;
      case poin > 0 && poin <= 20:
        render = '<i class="fa fa-star" aria-hidden="true"></i>';
        for (var i = 1; i <= 4; i++) {
          render += '<i class="fa fa-star-o" aria-hidden="true"></i>';
        }
        break;
      case poin <= 40 && poin > 20:
        for (var i = 0; i <= 1; i++) {
          render += '<i class="fa fa-star" aria-hidden="true"></i>';
        }
        for (var i = 1; i <= 3; i++) {
          render += '<i class="fa fa-star-o" aria-hidden="true"></i>';
        }
        break;
      case poin <= 60 && poin > 40:
        for (var i = 0; i <= 2; i++) {
          render += '<i class="fa fa-star" aria-hidden="true"></i>';
        }
        for (var i = 1; i <= 2; i++) {
          render += '<i class="fa fa-star-o" aria-hidden="true"></i>';
        }
        break;
      case poin <= 80 && poin > 60:
        for (var i = 0; i <= 3; i++) {
          render += '<i class="fa fa-star" aria-hidden="true"></i>';
        }
        for (var i = 1; i <= 1; i++) {
          render += '<i class="fa fa-star-o" aria-hidden="true"></i>';
        }
        break;
      case poin <= 100 && poin > 80:
        for (var i = 0; i <= 4; i++) {
          render += '<i class="fa fa-star" aria-hidden="true"></i>';
        }
        break;
      default:
        render = '';
    }
    $(this).html(render);
  });
}

function errorsAdd(data) {
  errorsStart.messages.push(data.message);
}

function errorsClear() {
  delete errorsStart.messages;
  errorsStart.messages = [];
}

function getStatusOfListings(rlistingIds) {
  var resp = {
    result: false,
    messages: '',
  };
  var postData = {
    rlistingIds: rlistingIds,
  };
  var jqXHR = $.ajax({
    url: '/deal/get-status-of-listings',
    data: JSON.stringify(postData),
    type: 'post',
    async: false,
  });

  var response = JSON.parse(jqXHR.responseText);
  if (response.code == '405' && !$.isEmptyObject(response.data)) {
    response.message = '';
    $.each(response.data, function (key, item) {
      response.message +=
        '<div style="padding:10px; margin-bottom: 10px; font-weight: bold; _border-radius: 3px; _border:1px solid #eee;">' +
        item.message +
        '</div>';
    });
    resp.result = true;
    resp.messages = response.message;
  }
  return resp;
}

function getNameCurrentUser(isFull = false) {
  if (hasValue(currentUser)) {
    var name = currentUser.name;
    if (isFull) {
      return name;
    } else {
      var result = name.split(' ');
      return result[result.length - 1];
    }
  }
}

// render trạng thái ảo datatable
var renderVirtualStatus = function (data, type, object) {
  var lastCheckedDate = '';
  if (object.lastCheckedDate != 'NA') {
    lastCheckedDate =
      ' (' +
      $.format.date(new Date(object.lastCheckedDate), 'dd/MM/yyyy HH:mm:ss') +
      ')';
  }
  return data + lastCheckedDate;
};

var renderDateDatatable = function (data, type, object) {
  var result = '';
  if (data != null && data != 'NA' && data != '') {
    result = $.format.date(new Date(data), 'MM/dd/yyyy HH:mm:ss');
  }
  return result;
};

function clearForm($form) {
  $form
    .find(':input')
    .not(':button, :submit, :reset, :hidden, :checkbox, :radio')
    .val('');
  $form.find(':checkbox, :radio').prop('checked', false);
}

function smsContact() {
  var sms = '';
  var hot_line = typeof hotLine !== 'undefined' ? hotLine : '';
  if (typeof currentUser !== 'undefined') {
    if (currentUser.voipId) {
      sms =
        'De duoc ho tro, LH ' +
        hot_line +
        ' nhan ' +
        currentUser.voipId +
        ' hoac ' +
        currentUser.phone +
        ' gap ' +
        currentUser.name;
    } else {
      sms =
        'De duoc ho tro, LH ' + currentUser.phone + ' gap ' + currentUser.name;
    }
  }
  return sms;
}

/**
 * @description get element set to global variable just click
 * @author JackSM
 * @since 04/06/2018
 *
 */
var globalElementJustClick = null;
$(document).ready(function () {
  validNumberDirect();
  // $('[data-toggle="popover"]').popover();
  $('body').click(function (event) {
    globalElementJustClick = event.target;
  });
});

/**
 *  function get object of owrner activities
 * @param $code
 * @returns {*}
 */
const ownerActivitesKey = function ($code) {
  const _activities = {
    OWNER_VIEW_LISTING: {
      name: 'Chủ nhà xem tin đăng',
      htmlModal: 'td',
    },
    NEW_EVENT: {
      name: 'Chủ nhà xem tin tức',
      htmlModal: 'tt',
    },
    DIY_AREA_PROPERTY: {
      name: 'Chủ nhà xem tin đăng cùng khu vực',
      htmlModal: 'kv',
    },
    DIY_AREA_PRICE_CHANGED_PROPERTY: {
      name: 'Chủ nhà xem tin đăng cùng khu vực được điều chỉnh giá',
      htmlModal: 'kvp',
    },
  };
  let _result = null;
  if (typeof _activities[$code] !== 'undefined') {
    _result = _activities[$code];
  }
  return _result;
};

const getNameListingType = function ($id) {
  const _listingType = {
    1: {
      sale: {
        name: 'Bán',
      },
      buy: {
        name: 'Mua',
      },
    },
    2: {
      sale: {
        name: 'Thuê',
      },
      buy: {
        name: 'Thuê',
      },
    },
    99: {
      sale: {
        name: 'Dự án',
      },
      buy: {
        name: 'Dự án',
      },
    },
  };
  let _result = null;
  if (typeof _listingType[$id] !== 'undefined') {
    _result = _listingType[$id];
  } else {
    _result = _listingType[1];
  }
  return _result;
};
const propzyNotifyAlert = function ($options) {
  let options = {
    title: 'Thông Báo',
    showProgressbar: false,
    placement: {
      from: 'top',
      align: 'center',
    },
    offset: 20,
    spacing: 10,
    z_index: 10000000000,
    delay: 3000,
    timer: 1000,
    message: '',
    type: 'propzy-notify-default',
    allow_dismiss: true,
  };
  $.extend(options, $options);
  $.notify(
    {
      title: options.title,
      message: options.message,
    },
    {
      type: options.type,
      showProgressbar: options.showProgressbar,
      placement: options.placement,
      offset: options.offset,
      spacing: options.spacing,
      z_index: options.z_index,
      delay: options.delay,
      timer: options.timer,
      allow_dismiss: options.allow_dismiss,
      position: 'fixed',
      animate: {
        enter: 'animated bounceInDown',
        exit: 'animated bounceOutUp',
      },
      template:
        '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button"  class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="title">{1}</span>' +
        '<span data-notify="message">{2}</span>' +
        '</div>',
    }
  );
};
$.fn.inputNumber = function (option) {
  this.off('input').on('input', function () {
    var text = null;
    // var text = '';
    /*if(option.isFloat) {
            text = Number.parseFloat(text);
            text = $.isNumeric(text) ? text : '';
        } else {
            text = Number.parseInt(text);
            text = $.isNumeric(text) ? text : '';
        }*/
    if (option.negative) {
      if (option.isFloat) {
        text = $(this)
          .val()
          .match(/[\d]|[\.]|^-?|^-?[\d]/g);
      } else {
        text = $(this)
          .val()
          .match(/[\d]|^-?|^-?[\d]/g);
      }
    } else {
      if (option.isFloat) {
        text = $(this)
          .val()
          .match(/[\d]|[\.]/g);
      } else {
        text = $(this).val().match(/[\d]/g);
      }
    }
    if (text && text.length > 0) {
      const textDot = text.filter((it) => it == '.');
      if (textDot && textDot.length > 1) {
        let newText = [];
        let isDot = false;
        text.forEach((it) => {
          if (it == '.') {
            if (!isDot) {
              isDot = true;
              newText.push(it);
            }
          } else {
            newText.push(it);
          }
        });
        text = newText;
      }
    }
    // add zero
    if (text && text.length > 0 && text[0] == '.') {
      text[0] = '0.';
    }
    text = !!text ? text.join('') : '';
    if (option.start && text < option.start) {
      text = option.start;
    }
    if (option.end && text > option.end) {
      text = option.end;
    }
    if (option.type) {
      switch (option.type) {
        case 'price': {
          var stringSplit = [];
          var textlength = text.length;
          //revert string
          text = text.split('').reverse().join('');
          for (let i = 0; i < textlength; i += 3) {
            stringSplit.push(text.slice(i, i + 3));
          }
          text = stringSplit.join(',');
          // revert again
          text = text.split('').reverse().join('');
          break;
        }
      }
    }
    $(this).val(text);
  });
};
$.fn.phoneBasic = function (options) {
  var setting = {
    country: 'VN',
    maxLength: 10,
    minLength: 10,
    zerroFirst: true,
    errMessenger: 'Số điện thoại',
  };
  $.extend(setting, options);

  this.off('keypress').on('keypress', function (e) {
    switch (setting.country) {
      case 'VN':
        var key = e.key;
        if ($.isNumeric(key)) {
          var length = $(this).val().length;
          if (length >= setting.maxLength) {
            e.preventDefault();
          } else {
            return;
          }
        } else if (
          $.inArray(key, [
            'Backspace',
            'Delete',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Tab',
          ]) > -1
        ) {
          return;
        } else {
          e.preventDefault();
        }
        break;
    }
  });
  this.off('paste').on('paste', function (e) {
    var _this = this;
    // Short pause to wait for paste to complete
    setTimeout(function () {
      var text = $(_this).val();
      if (!$.isNumeric(text)) {
        $(_this).val('');
      }
    }, 100);
  });
};

function trimText(str, wordCount) {
  var strArray = str.split(' ');
  var subArray = strArray.slice(0, wordCount);
  var result = subArray.join(' ');
  return result + '...';
}

function initPhoto360(element) {
  var photo = $(element).data('camera360');
  if (photo) {
    var html =
      "<iframe src='" + photo + "' frameborder='0' width='100%'/></iframe>";
    $('#iframeCamera').html(html);
  }
  $('#modalLoadImage360').modal();
  $('#modalLoadImage360').on('shown.bs.modal', function () {
    var heightFrame = $('#modalLoadImage360 .modal-content').height() - 31;
    $('#iframeCamera iframe').attr('height', heightFrame);
  });
}

var renderSforDealTableListing = function (data, type, objectListing) {
  // function dùng để render diện tích các table listing phù hợp, bảng theo dõi của Deal detail
  // hot fix prod ngày 29/11/2019
  let S = '';
  if (objectListing.listingPositions) {
    let object = objectListing.listingPositions;
    if (
      object.postionName &&
      object.postionName != 'Hẻm' &&
      object.postionName != 'N/A'
    ) {
      let roadFrontageWidth =
        object.roadFrontageWidth != 'NA' && object.roadFrontageWidth != 'N/A'
          ? ` (${object.roadFrontageWidth}m)`
          : '';
      S = object.postionName + roadFrontageWidth;
    } else if (
      object.postionName &&
      object.postionName != '' &&
      object.postionName != 'N/A'
    ) {
      // case hẻm
      let alleyName =
        object.alleyName != 'NA' &&
        object.alleyName != 'N/A' &&
        object.alleyName != null
          ? ` - ${object.alleyName}`
          : '';
      let alleyWidth =
        object.alleyWidth != 'NA' &&
        object.alleyWidth != 'N/A' &&
        object.alleyWidth != null
          ? ` (${object.alleyWidth}m)`
          : '';
      let typeName =
        object.alleyTypeName != 'NA' &&
        object.alleyTypeName != 'N/A' &&
        object.alleyTypeName != null
          ? ` - ${object.alleyTypeName}`
          : '';

      let roadFrontageDistanceFrom = '';
      if (object.roadFrontageDistanceFrom == 0) {
        roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: <= 100m';
      } else if (object.roadFrontageDistanceFrom == 100) {
        roadFrontageDistanceFrom =
          ' - Khoảng cách đến mặt tiền đường: 100m - 200m';
      } else if (object.roadFrontageDistanceFrom == 200) {
        roadFrontageDistanceFrom =
          ' - Khoảng cách đến mặt tiền đường: 200m - 500m';
      } else if (object.roadFrontageDistanceFrom == 500) {
        roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: >500';
      }

      S =
        object.postionName +
        alleyWidth +
        typeName +
        alleyName +
        roadFrontageDistanceFrom;
    }
  }

  return (
    objectListing.formatSize +
    ' (' +
    objectListing.sizeWidth +
    ' x ' +
    objectListing.sizeLength +
    ')' +
    '<br/>' +
    S
  ); // làm tròn xuống // làm tròn xuống
};

$.fn.serializeIncludeDisabled = function () {
  let disabled = this.find(':input:disabled').removeAttr('disabled');
  let serialized = this.serialize();
  disabled.attr('disabled', 'disabled');
  return serialized;
};

// for filter block
const generateLoadingElement = (parenetEle) => {
  const element = document.createElement('div');
  element.classList.add('overlay-filter');
  parenetEle.append(element);
};

var DEBUG = false; // tắt console.log = false
if (!DEBUG) {
  if (!window.console) window.console = {};
  var methods = ['debug', 'warn', 'info', 'group'];
  for (var i = 0; i < methods.length; i++) {
    console[methods[i]] = function () {};
  }
}

;( function( $, window, document, undefined ) {

	"use strict";
		// Create the defaults once
		var pluginName = "toggleValue",
			defaults = {};

		// The actual plugin constructor
		function ToggleValue ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( ToggleValue.prototype, {
			init: function() {
        const that = this;
        const self = $(this.element);
        that.btn = self.find('[data-btn]');
        that.target = self.find('[data-target]');
        that.orginEl = self.find('[data-origin]');
        that.toggleEl = self.find('[data-toggle-value]');
        that.toggleTxt = that.toggleEl.data('toggle-value');
        that.newEl = $(`<div>${that.toggleTxt}</div>`);
        that.newEl.insertAfter(that.orginEl);
        that.newEl.hide();
        
        that.bindBtnClickEvent();
        that.toggleEl.removeAttr('data-toggle-value');
			},
      bindBtnClickEvent: function() {
        const that = this;
        const self = $(this.element);
        that.btn.off('click.' + pluginName).on('click.' + pluginName, function() {
          const selfBtn = $(this);
          if(selfBtn.data('one-time') && selfBtn.data('opened')) {
            return false;
          }
          if(that.newEl.is(':hidden')) {
            that.newEl.show();
            that.orginEl.hide();
          } else {
            that.newEl.hide();
            that.orginEl.show();
          }
          typeof that.settings.callbackClick === 'function' && that.settings.callbackClick( $.extend( {}, {el: self}, that.settings.extendParams ));
        });
      },
      resetValue: function() {
        const that = this;
        that.newEl.hide();
        that.orginEl.show();
        that.btn.data('opened', false);
      },
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new ToggleValue( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );

const generateMaskedPhone = (phone) => {
  const phoneLength = phone.length;
    const PHONE_LENGTH_DEFAULT = 10;

    if (phoneLength < PHONE_LENGTH_DEFAULT) {
        const extraLength = PHONE_LENGTH_DEFAULT - phoneLength;
        phone = phone.concat(" ".repeat(extraLength)); 
    }

    return `${phone.slice(0, 3)}*****${phone.slice(8)}`;
}

function hideMiddleChars(str, startNum = 0, endNum = 0) {
  const newStr = [];
  const strLeng = str.length;
  for(var i=0;i<strLeng;i++) {
      if(i<startNum || i>=strLeng - endNum) {
          newStr.push(str[i]);
      } else {
          newStr.push('*')
      }
  }
  return newStr.join('');
}