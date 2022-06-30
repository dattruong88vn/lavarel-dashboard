/**
 * Convert number to time
 * @param number epoch time 1595355472000
 * Output  hh:mm:ss
 */

const numberToTime = number => {

    if(!number) {
        return 'N/A';
    }

    const datetime = new Date(number);
    
    const hour = (`0${datetime.getHours()}`).slice(-2);
    const min = (`0${datetime.getMinutes()}`).slice(-2);
    const second = (`0${datetime.getSeconds()}`).slice(-2);

    return `${hour}:${min}:${second}`;
}

export default numberToTime;
