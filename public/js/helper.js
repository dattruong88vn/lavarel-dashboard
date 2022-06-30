function RemoveVNSign(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    //str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
    //str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
    //str = str.replace(/^\-+|\-+$/g, "");//cắt bỏ ký tự - ở đầu và cuối chuỗi
    return str;
}
function fixDataTableVNSearch(tableSelector) {

    $(tableSelector + " tr").each(function () {
        var text = $(this).find("td").text().trim();
        text = RemoveVNSign(text);
        $(this).append("<td class='hidden' >" + text + "</td>");
    });
}
function getTuTrachCheckBoxs(type, checked) {
    if (type === undefined) {
        type = "";
    }
    $.ajax({
        url: '/get-tu-trach/' + type,
        type: 'get'
    }).done(function (response) {
        if (response) {
            for (var i = 0; i < response[type].length; i++) {
                $(".direction-" + response[type][i]).prop('checked', checked);
            }
        }
    }).always(function () {

    });
}

function repopulateTuTrachChecked(selector) {
    var selectedDirections = [];
    $(selector + ':checked').each(function () {
        selectedDirections.push($(this).val());
    });
    var strSelectedDirections = selectedDirections.sort().toString();
    $.ajax({
        url: '/get-tu-trach',
        type: 'get'
    }).done(function (response) {
        for (var x in response) {
            var tuTrach = response[x];
            tuTrach.sort();
            if (selectedDirections.length < tuTrach.length) {
                continue;
            }
            var matchCount = 0;
            for (var i = 0; i < tuTrach.length; i++) {
                if (strSelectedDirections.indexOf(tuTrach[i]) >= 0) {
                    matchCount++;
                }
            }
            console.log(matchCount);
            if (matchCount === tuTrach.length) {
                $("input.chon_tu_trach[value='" + x + "']").prop('checked', true);
            }
        }
    }).always();
}


function getCities(selector, selectedItem, callBack) {
    $.ajax({
        url: "/common/get-cities",
        type: "get"
    }).done(function (response) {
        var html = "";
        var selectedId = "";
        $(response).each(function (index, item) {
            var selected = "";
            if (selectedItem) {
                if (item.cityId == selectedItem) {
                    selected = "selected";
                    selectedId = item.cityId;
                }
            }
            html += "<option value='" + item.cityId + "' " + selected + ">" + item.cityName + "</option>";
        });
        $(selector).html(html);
        if (callBack !== undefined) {
            callBack(selectedId, selector);
        }
    }).always(function () {

    });
}

function getDistricts(cityId, selector, selectdItem, successCallback) {
    $.ajax({
        url: "/common/get-district/" + cityId,
        type: "get"
    }).done(function (response) {
        var html = "";
        $(response).each(function (index, item) {
            var selected = "";
            if (selectdItem) {
                if (selectdItem == item.districtId) {
                    selected = "selected";
                }
            }
            html += "<option value='" + item.districtId + "' " + selected + " >" + item.districtName + "</option>";
        });
        $(selector).html(html);
        if(successCallback){
            console.log("djflsdkfk dsf f");
            successCallback(selector);
        }
    }).always(function () {

    });
}


function getWards(districtId, selector, selectdItem, successCallback) {
    $.ajax({
        url: "/common/get-wards/" + districtId,
        type: "get"
    }).done(function (response) {
        var html = "";
        $(response.data).each(function (index, item) {
            var selected = "";
            console.log(selectdItem +"=="+ item.wardId);
            if (selectdItem) {
                if (selectdItem == item.wardId) {
                    selected = "selected";
                }
            }
            html += "<option value='" + item.wardId + "' " + selected + " >" + item.wardName + "</option>";
        });
        $(selector).html(html);
        if(successCallback){
            successCallback(selector);
        }
    }).always(function () {

    });
}

const NumberInputUtil = {
    REQUEST_BUY_PRICE: 'Bạn đang tạo một Request Mua với giá trị',
    REQUEST_HIRE_PRICE: 'Bạn đang tạo một Request Thuê với giá trị',
    LISTING_BUY_PRICE: 'Bạn đang tạo một Listing Bán với giá trị',
    LISTING_HIRE_PRICE: 'Bạn đang tạo một Listing Thuê với giá trị',
    ONE_BILLION : 1000000000,
    ONE_HUNDRED_MILLION : 100000000,
    arrNumber: ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'],
    readDozens: function (num, bol)
    {
        let str = "";
        let dozen = Math.floor(num / 10);
        let unit = num % 10;
        if (dozen > 1) {
            str = " " + this.arrNumber[dozen] + " mươi";
            if (unit == 1) {
                str += " mốt";
            }
        } else if (dozen == 1) {
            str = " mười";
            if (unit == 1) {
                str += " một";
            }
        } else if (bol && unit > 0) {
            str = " lẻ";
        }
        if (unit == 5 && dozen >= 1) {
            str += " lăm";
        } else if (unit > 1 || (unit == 1 && dozen == 0)) {
            str += " " + this.arrNumber[unit];
        }
        return str;
    },
    readBlock: function (num, bol)
    {
        let str = "";
        let hundred = Math.floor(num / 100);
        num = num % 100;
        if (bol || hundred > 0) {
            str = " " + this.arrNumber[hundred] + " trăm";
            str += this.readDozens(num, true);
        } else {
            str = this.readDozens(num, false);
        }
        return str;
    },
    readMillions: function (num, bol)
    {
        let str = "";
        let million = Math.floor(num / 1000000);
        num = num % 1000000;
        if (million > 0) {
            str = this.readBlock(million, bol) + " triệu";
            bol = true;
        }
        thousand = Math.floor(num / 1000);
        num = num % 1000;
        if (thousand > 0) {
            str += this.readBlock(thousand, bol) + " ngàn";
            bol = true;
        }
        if (num > 0) {
            str += this.readBlock(num, bol);
        }
        return str;
    },
    numberToText: function(number){
        if (number == 0) return this.arrNumber[0];
        let str = "", strBillion = "";
        do {
            billion = number % 1000000000;
            number = Math.floor(number / 1000000000);
            if (number > 0) {
                str = this.readMillions(billion, true) + strBillion + str;
            } else {
                str = this.readMillions(billion, false) + strBillion + str;
            }
            strBillion = " tỷ";
        } while (number > 0);
        return str + " đồng";
    },
    numberToLabel: function(selector){
        if ($(selector).length > 0) {
            let data = $(selector).val().replace(/\,/g, '');
            let content = $(selector).val().length > 0 ? this.numberToText(data) : "";
            let element = $(selector).parent().find(".lblTextNumber");
            if (element.length > 0) {
                element.html(this.capitalize(content.trim()));
            } else {
                $("<label class='lblTextNumber' style='font-weight:300;font-style:italic;font-size: 14px;color: #676767;'>" + this.capitalize(content.trim()) + "</label>").insertAfter(selector); 
            }
        }
    },
    capitalize: function (s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    },

    initAutoFormatSize: function () {
        $('.auto-format-size').each(function (i, v) {
            try {
                $(this).autoNumeric('init', {mDec: 2});
            } catch (e) {
                errorsAdd({
                    message: $(this).data('label') + ' : ' + e.message
                });
            }
        });
    }
};

const NumberInputUtilArea = {
    REQUEST_BUY_MIN_AREA: 'Bạn đang tạo một Request Mua với diện tích min ',
    REQUEST_HIRE_MIN_AREA: 'Bạn đang tạo một Request Thuê với diện tích min ',
    LISTING_SELL_LAND_AREA: 'Bạn đang tạo một Listing Bán với diện tích đất',
    LISTING_HIRE_LAND_AREA: 'Bạn đang tạo một Listing Thuê với diện tích đất',
    LISTING_SELL_USED_AREA: 'Bạn đang tạo một Listing Bán với diện tích sử dụng',
    LISTING_HIRE_USED_AREA: 'Bạn đang tạo một Listing Thuê với diện tích sử dụng',
    TEN_METER_AREA: 10,
    FIVE_HUNDRED_METER_AREA: 500,
    arrNumber: ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'],
    readDozens: function (num, bol)
    {
        let str = "";
        let dozen = Math.floor(num / 10);
        let unit = num % 10;
        if (dozen > 1) {
            str = " " + this.arrNumber[dozen] + " mươi";
            if (unit == 1) {
                str += " mốt";
            }
        } else if (dozen == 1) {
            str = " mười";
            if (unit == 1) {
                str += " một";
            }
        } else if (bol && unit > 0) {
            str = " lẻ";
        }
        if (unit == 5 && dozen >= 1) {
            str += " lăm";
        } else if (unit > 1 || (unit == 1 && dozen == 0)) {
            str += " " + this.arrNumber[unit];
        }
        return str;
    },
    readBlock: function (num, bol)
    {
        let str = "";
        let hundred = Math.floor(num / 100);
        num = num % 100;
        if (bol || hundred > 0) {
            str = " " + this.arrNumber[hundred] + " trăm";
            str += this.readDozens(num, true);
        } else {
            str = this.readDozens(num, false);
        }
        return str;
    },
    readMillions: function (num, bol)
    {
        let str = "";
        let million = Math.floor(num / 1000000);
        num = num % 1000000;
        if (million > 0) {
            str = this.readBlock(million, bol) + " triệu";
            bol = true;
        }
        thousand = Math.floor(num / 1000);
        num = num % 1000;
        if (thousand > 0) {
            str += this.readBlock(thousand, bol) + " ngàn";
            bol = true;
        }
        if (num > 0) {
            str += this.readBlock(num, bol);
        }
        return str;
    },
    numberToTextArea: function(number){
        if (number == 0) return this.arrNumber[0];
        let str = "", strBillion = "";
        do {
            billion = number % 1000000000;
            number = Math.floor(number / 1000000000);
            if (number > 0) {
                str = this.readMillions(billion, true) + strBillion + str;
            } else {
                str = this.readMillions(billion, false) + strBillion + str;
            }
            strBillion = " tỷ";
        } while (number > 0);
        return str;
    },
    numberToLabelArea: function(selector, isArea, isDotMark){
        if ($(selector).length > 0) {
            let arrNum = '';
            if (isDotMark) {
                // 1,233.05 -> split it to 1,233 and 05 
                arrNum = $(selector).val().split('.');
            } else {
                // 1233,05 -> split it to 1233 and 05 
                arrNum = $(selector).val().split(',');
            }
            let dataInt = arrNum[0].replace(/\,/g, '');
            let strFloatNum = '';
            let strIntNum = $(selector).val().length > 0 ? this.numberToTextArea(dataInt) : "";
            let strResult = '';
            let strDot = '';
            let areaText = '';

            if (dataInt) { // check value not empty
                areaText = isArea  ? ' mét vuông' : ' mét';
            }

            if (arrNum[1] != undefined && arrNum[1] != 0) { // case có xx.05 mét vuông

                strFloatNum = this.readFloatNumber(arrNum[1]);
                isDotMark ? strDot = ' chấm ' : strDot = ' phẩy ';
                strResult += strIntNum + strDot + strFloatNum + areaText;
            } else {
                strResult += strIntNum + areaText;
            }
            
            let element = $(selector).parent().find(".lblTextNumber");
            if (element.length > 0) {
                element.html(this.capitalize(strResult.trim()));
            } else {
                $("<label class='lblTextNumber' style='font-weight:300;font-style:italic;font-size: 14px;color: #676767;'>" + this.capitalize(strResult.trim()) + "</label>").insertAfter(selector); 
            }
        }
    },
    numberToStringArea: function(selector, isArea, isDotMark){
        if ($(selector).length > 0) {
            let arrNum = '';
            if (isDotMark) {
                // 1,233.05 -> split it to 1,233 and 05 
                arrNum = $(selector).val().split('.');
            } else {
                // 1233,05 -> split it to 1233 and 05 
                arrNum = $(selector).val().split(',');
            }
           
            let dataInt = arrNum[0].replace(/\,/g, '');
            let strFloatNum = '';
            let strIntNum = $(selector).val().length > 0 ? this.numberToTextArea(dataInt) : "";
            let strResult = '';
            let strDot = '';
            let areaText = '';

            if (dataInt) { // check value not empty
                areaText = isArea  ? ' mét vuông' : ' mét';
            }

            if (arrNum[1] != undefined && arrNum[1] != 0) { // case có xx.05 mét vuông
                strFloatNum = this.readFloatNumber(arrNum[1]);
                isDotMark ? strDot = ' chấm ' : strDot = ' phẩy ';
                strResult += strIntNum + strDot + strFloatNum + areaText;
            } else {
                strResult += strIntNum + areaText;
            }
            
            return strResult;
        }
    },
    readFloatNumber: function (number) {
        let str = '';
        if (number && number[0] == 0) {
            if (number[1] != undefined) {
                let unit = number[1] % 10;
                str += 'không ' + this.arrNumber[unit] ;
            } else {
                return '';
            }
        } else {
            if (number[1] == 0) {
                // case 12.40 -> 12 chấm 4 mét
                let unit = number[0] % 10;
                str = this.arrNumber[unit];
            } else {
                // case 12.41 -> 12 chấm 4 mươi mốt mét
                str = this.readDozens(number);
            }
        }   
        return str;
    },
    capitalize: function (s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
};
