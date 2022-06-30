import number from './number';

export type DateRank = {
    from: string,
    to: string
}

class PropDateTime {
    FORMAT_DATE: string = 'YYYY-MM-DD';
    getCurrentDate() {
        return new Date();
    }
    getCurrentDateString(separator: string = '-') {
        return this.getDateString(this.getCurrentDate(), separator);
    }
    getDateString(date: Date, separator: string = '-') {
        return date.getFullYear() + separator + number.prefix(date.getMonth() + 1) + separator + number.prefix(date.getDate());
    }
    getNextDateString(days: number = 0, separator: string = '-') {
        const currentDate = this.getCurrentDate();
        currentDate.setDate(currentDate.getDate() + days);
        return this.getDateString(currentDate, separator);
    }
    getDateStringFromTimestamp(timestamp: number, separator: string = '-') {
        return this.getDateString(new Date(timestamp), separator);
    }
    getFullDateStringFromTimestamp(timestamp: number, separator: string = '-',) {
        let d = new Date(timestamp);
        return this.getDateString(d, separator) + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }
    getStartEndDateByDay(days:number) {
        let today = new Date();
        let priorDate = new Date().setDate(today.getDate()-days);
        return {
            startDate : priorDate,
            endDate : today.getTime()
        } 
    }
}

export default new PropDateTime();