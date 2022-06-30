/**
 * Convert number to date
 * @param number epoch time 1595355472000
 * Output  22/07/2020
 */

const numberToDate = number => {

    if(!number) {
        return 'N/A';
    }

    const datetime = new Date(number);
    
    const date = (`0${datetime.getDate()}`).slice(-2);
    const month = (`0${datetime.getMonth() + 1}`).slice(-2);
    const year = datetime.getFullYear();

    return `${date}/${month}/${year}`;
}

export default numberToDate;
