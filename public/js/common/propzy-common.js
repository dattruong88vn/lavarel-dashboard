var PROPZY_DATE = {
    getStringLastDateOfMonth: function (year, month) {
        var d = new Date(parseInt(year, 10), parseInt(month, 10) + 1, 0);
        return moment(d).format('DD/MM/YYYY');
    },
    getCurrentMonthYear: function () {
        var d = new Date();
        return {month: d.getMonth(), year: d.getFullYear()}
    },
    getLastDateOfThisMonth: function () {
        var d = PROPZY_DATE.getCurrentMonthYear();
        return PROPZY_DATE.getStringLastDateOfMonth(d.year, d.month);
    },
    getStringDateAfterDays: function (days = 0) {
        var d = new Date();
        d.setDate(d.getDate() + days);
        return moment(d).format('DD/MM/YYYY');
    },
    convertDMYToYMD: function (stringDate, stringSeparate = '/') {
        var arr = stringDate.split(stringSeparate);
        try {
            return arr[2] + stringSeparate + arr[1] + stringSeparate + arr[0];
        } catch (ex) {

        }
        return moment().format('YYYY' + stringSeparate + 'MM' + stringSeparate + 'DD');
    }

}
var PROPZY_STRING = {
    removeAccent: (s) => {
        return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
}