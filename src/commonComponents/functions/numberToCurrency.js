/**
 * Convert number to currency string format
 * @param {*} number 1000000.56
 * Output format 1.000.000,56
 */

const numberToCurrency = (number, thousandSeparator = '.') => {
    // Convert number to string
    let value = `${number}`;
    
    // Add . to amount of money
    let thousandPart = (value.split(',')[0]).replace(/\./g, '');
    let decimalPart = value.split(',')[1] || '';

    let count = 0;
    let tmp = '';
    if(thousandPart) {
        let i = thousandPart.length - 1;
        while(i >= 0) {
            count++;
            tmp = thousandPart[i].concat(tmp);

            if(count === 3 && i > 0) {
                tmp = thousandSeparator.concat(tmp);
                count = 0;
            }

            i--;
        }
        value = `${tmp}${(decimalPart || value.includes(',')) ? ',' : ''}${decimalPart}`;
    }
    return value;
}

export default numberToCurrency;