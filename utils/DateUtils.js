/*****************************
 * @providesModule DateUtils *
 * @created_by Kds           *
 *****************************/

import moment from 'moment';

import { isUndefined, isNumber, isNumeric } from './Utils';

export function isDate(d) {
    if (!d) { return false; }
    if (!isNumeric(parseFloat(d)) && new Date(d).getTime() > 0) { return true; }
    if (new Date(parseFloat(d)).getTime() > 0) { return true; }
    return false;
}

export function getDateObj(d, format) {
    if (format) { return new Date(moment(d, format).toString()); }
    if (d && !isDate(d)) { return null; }
    if (d && isNumber(d)) { let ts = parseInt(d); return new Date(`${ts}`.length === 10 ? ts * 1000 : ts); }
    if (d) { return new Date(d); }
    return new Date();
}

export function getTimestamp(d, format) {
    let dateObj = getDateObj(d, format);
    return !isUndefined(dateObj) ? dateObj.getTime() : null;
}

export function isTimestamp(timestamp) {
    if (!timestamp) { return false; }
    if (new Date(parseFloat(timestamp)).getTime() > 0) { return true; }
    return false;
}

export function getDateOffset(offset, d) {
    let curDate = getDateObj(d);
    let utcDate = curDate.getTime() + (curDate.getTimezoneOffset() * 60000);
    let newDateWithOffset = new Date(utcDate + (3600000 * parseInt(offset)));
    return newDateWithOffset.getTime();
}

export function dateDiff(type, past, present) {
    let t1 = getTimestamp(past), t2 = getTimestamp(present);
    let d1 = getDateObj(past), d2 = getDateObj(present);
    if (!t2 || !t1 || t2 < t1) { return null; }
    switch (type) {
        case 'ms':
            return parseInt(t2 - t1);
        case 's':
            return parseInt((t2 - t1) / (1000));
        case 'min':
            return parseInt((t2 - t1) / (60 * 1000));
        case 'h':
            return parseInt((t2 - t1) / (3600 * 1000));
        case 'd':
            return parseInt((t2 - t1) / (24 * 3600 * 1000));
        case 'w':
            return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
        case 'm':
            let d1Y = d1.getFullYear(), d2Y = d2.getFullYear();
            let d1M = d1.getMonth(), d2M = d2.getMonth();
            return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
        case 'y':
            return d2.getFullYear() - d1.getFullYear();
        default: return null;
    }
}

export function isValidDate(date, format) {
    if (!date || !format) { return false; }
    return moment(date, format, true).isValid();
}

export function getCustomDate(format, d, { type, is24h, reverse } = {}) {
    let finalFormat = format;
    if (['default', 'nation'].includes(format)) {
        let timeFormat = type === 'd_m' ? '' : `${is24h ? 'hh' : 'HH'}:mm`, dateFormat = '';
        switch (format) {
            case 'default':
                dateFormat = 'DD/MM/YYYY';
                break;
            case 'nation':
                let compNation = 'vn', isVn = compNation === 'vn';
                // let compNation = getCompanyInfo('nation') || 'vn', isVn = compNation === 'vn';
                dateFormat = `${isVn ? 'DD/MM' : 'MM/DD'}${type === 'd_m' ? '' : '/YYYY'}`;
                break;
            default: break;
        }
        finalFormat = type === 'sort' ? dateFormat :
            type === 'time' ? timeFormat : (reverse ? dateFormat + ' ' + timeFormat : timeFormat + ' ' + dateFormat);
    }
    return moment(getTimestamp(d)).format(finalFormat);
}

export function getDateFormat(format, { type, is24h, reverse } = {}) {
    let finalFormat = '';
    if (['default', 'nation'].includes(format)) {
        let timeFormat = type === 'd_m' ? '' : `${is24h ? 'hh' : 'HH'}:mm`, dateFormat = '';
        switch (format) {
            case 'default':
                dateFormat = 'DD/MM/YYYY';
                break;
            case 'nation':
                let compNation = getCompanyInfo('nation') || 'vn', isVn = compNation === 'vn';
                dateFormat = `${isVn ? 'DD/MM' : 'MM/DD'}${type === 'd_m' ? '' : '/YYYY'}`;
                break;
            default: break;
        }
        finalFormat = type === 'sort' ? dateFormat : (reverse ? dateFormat + ' ' + timeFormat : timeFormat + ' ' + dateFormat);
    }
    return finalFormat;
}

export function lastDateTime(type, last, cur, toDate) {
    if (!type || !last || last <= 0) { return null; }
    let now = cur || null;
    switch (type) {
        case 'ms':
            let lmsDate = getDateObj(now);
            lmsDate.setMilliseconds(lmsDate.getMilliseconds() - last);
            if (toDate) { return lmsDate; }
            return lmsDate.getTime();
        case 's':
            let lsecDate = getDateObj(now);
            lsecDate.setSeconds(lsecDate.getSeconds() - last);
            if (toDate) { return lsecDate; }
            return lsecDate.getTime();
        case 'min':
            let lminDate = getDateObj(now);
            lminDate.setMinutes(lminDate.getMinutes() - last);
            if (toDate) { return lminDate; }
            return lminDate.getTime();
        case 'h':
            let lhDate = getDateObj(now);
            lhDate.setHours(lhDate.getHours() - last);
            if (toDate) { return lhDate; }
            return lhDate.getTime();
        case 'd':
            let ldDate = getDateObj(now);
            ldDate.setDate(ldDate.getDate() - last);
            if (toDate) { return ldDate; }
            return ldDate.getTime();
        case 'm':
            let lmDate = getDateObj(now);
            lmDate.setMonth(lmDate.getMonth() - last);
            if (toDate) { return lmDate; }
            return lmDate.getTime();
        case 'y':
            let lyDate = getDateObj(now);
            lyDate.setFullYear(lyDate.getFullYear() - last);
            if (toDate) { return lyDate; }
            return lyDate.getTime();
        default:
            return now;
    }
}

export function nextDateTime(type, next, cur, toDate) {
    if (!type || !isNumber(next) || parseInt(next) <= -1) { return null; }
    let now = cur || null; next = parseInt(next);
    switch (type) {
        case 'ms':
            let nmsDate = getDateObj(now);
            nmsDate.setMilliseconds(nmsDate.getMilliseconds() + next);
            if (toDate) { return nmsDate; }
            return nmsDate.getTime();
        case 's':
            let nsecDate = getDateObj(now);
            nsecDate.setSeconds(nsecDate.getSeconds() + next);
            if (toDate) { return nsecDate; }
            return nsecDate.getTime();
        case 'min':
            let nminDate = getDateObj(now);
            nminDate.setMinutes(nminDate.getMinutes() + next);
            if (toDate) { return nminDate; }
            return nminDate.getTime();
        case 'h':
            let nhDate = getDateObj(now);
            nhDate.setHours(nhDate.getHours() + next);
            if (toDate) { return nhDate; }
            return nhDate.getTime();
        case 'd':
            let ndDate = getDateObj(now);
            ndDate.setDate(ndDate.getDate() + next);
            if (toDate) { return ndDate; }
            return ndDate.getTime();
        case 'm':
            let nmDate = getDateObj(now);
            nmDate.setMonth(nmDate.getMonth() + next);
            if (toDate) { return nmDate; }
            return nmDate.getTime();
        case 'y':
            let nyDate = getDateObj(now);
            nyDate.setFullYear(nyDate.getFullYear() + next);
            if (toDate) { return nyDate; }
            return nyDate.getTime();
        default:
            return now;
    }
}

export function getMonthDate(inputDate) {
    if (inputDate && !isDate(inputDate)) { return null; } let date;
    if (!inputDate) { date = getDateObj(); } else { date = getDateObj(inputDate); }
    let y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1), lastDay = new Date(y, m + 1, 1);
    lastDay.setMilliseconds(lastDay.getMilliseconds() - 1);
    let day_till_now = dateDiff('d', firstDay.getTime(), date.getTime()) + 1;
    return {
        firstDay: firstDay,
        lastDay: lastDay,
        day_till_now: day_till_now,
        current_date: date,
        current_date_ts: date.getTime(),
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        firstDay_ts: firstDay.getTime(),
        lastDay_ts: lastDay.getTime(),
        month_total_day: lastDay.getDate(),
    }
}

export function getYearDate() {
    let date = new Date(), y = date.getFullYear();
    let firstDay = new Date(y, 0, 1);
    let lastDay = new Date(y, 12, 0);
    return { firstDay: firstDay.getTime(), lastDay: lastDay.getTime() }
}

export function getBEOfDate(type, kind, dInput) {
    if (!type) { return null; }
    switch (kind) { case 'b': break; case 'e': break; default: return null; }
    let date = getDateObj(null), formatDate;
    if (dInput) { date = getDateObj(dInput); }
    let y = date.getFullYear(), m = date.getMonth(), d = date.getDate();
    switch (type) {
        case 'd':
            if (kind === 'b') { formatDate = new Date(y, m, d); }
            if (kind === 'e') { formatDate = new Date(y, m, d + 1); }
            break;
        case 'm':
            if (kind === 'b') { formatDate = new Date(y, m, 1); }
            if (kind === 'e') { formatDate = new Date(y, m + 1, 1); }
            break;
        case 'y':
            if (kind === 'b') { formatDate = new Date(y, 0, 1); }
            if (kind === 'e') { formatDate = new Date(y + 1, 0, 1); }
            break;
        default: break;
    }
    if (!formatDate) { return null; }
    if (kind === 'b') { formatDate.setHours(0); formatDate.setMinutes(0); formatDate.setSeconds(0); }
    if (kind === 'e') { formatDate.setMilliseconds(formatDate.getMilliseconds() - 1); }
    return formatDate.getTime();
}

export function isLeapYear(year) {
    if (isUndefined(year)) { return false; }
    let yearInt = parseInt(year);
    if (((yearInt % 4 === 0) && (yearInt % 100 !== 0)) || (yearInt % 400 === 0)) { return true; }
    return false;
}

export function getTotalDayOfYear(date) {
    if (!date) { return null; }
    let year;
    if (String(date).length !== 4 && isDate(date)) {
        year = getDateObj(date).getFullYear();
    } else {
        year = parseInt(date);
    }
    if (!year || year <= 0) { return null; }
    if (isLeapYear(year)) { return 366; }
    return 365;
}

export function getTotalDayOfMonth(month, year) {
    let curDate = new Date();
    if (month && isDate(month) && parseInt(month) > 31) {
        curDate = getDateObj(month);
        curDate.setMonth(curDate.getMonth() + 1);
        curDate.setDate(0);
    } else if (month && year) {
        curDate = new Date(year, month, 0);
    } else {
        curDate.setMonth(curDate.getMonth() + 1);
        curDate.setDate(0);
    }
    return curDate.getDate();
}

export function isSameDayDate(date1, date2) {
    if (!date1 || !date2 || !isDate(date1) || !isDate(date2)) { return false; }
    if (getCustomDate('DD/MM/YYYY', date1) === getCustomDate('DD/MM/YYYY', date2)) { return true; }
    return false;
}

export function isSameMonthDate(date1, date2) {
    if (!date1 || !date2 || !isDate(date1) || !isDate(date2)) { return false; }
    if (getMonthDate(date1).firstDay_ts === getMonthDate(date2).firstDay_ts) { return true; }
    return false;
}

export function isSameYearDate(date1, date2) {
    if (!date1 || !date2 || !isDate(date1) || !isDate(date2)) { return false; }
    if (getDateObj(date1).getFullYear() === getDateObj(date2).getFullYear()) { return true; }
    return false;
}

export function getDateInRange(type, dateFrom, dateTo, format) {
    if (!type || !dateFrom || !dateTo || !isDate(dateFrom) || !isDate(dateTo)
        || getTimestamp(dateFrom) > getTimestamp(dateTo)) { return null }
    let dateFormat;
    switch (type) {
        case 'd': dateFormat = format || 'YYYY-MM-DD'; break;
        case 'm': dateFormat = format || 'YYYY-MM'; break;
        case 'y': dateFormat = format || 'YYYY'; break;
        default: return null;
    }
    let dateRange = dateDiff(type, dateFrom, dateTo) + 1, dateInRanges = [];
    let beginDate = getBEOfDate(type, 'b', dateFrom), endDate = getTimestamp(dateTo);
    for (let i = 0; i < dateRange; i++) {
        let curDate = nextDateTime(type, i, beginDate);
        if (curDate <= endDate) {
            dateInRanges.push({
                date: getCustomDate(dateFormat, curDate),
                beginDate: getBEOfDate(type, 'b', curDate),
                endDate: getBEOfDate(type, 'e', curDate),
            });
        }
    }
    return dateInRanges;
}

export function getDateRange(type, dateFrom, dateTo) {
    if (!type || !dateFrom || !isDate(dateFrom) || (dateTo && !isDate(dateTo))) { return null; }
    switch (type) {
        case 'd': break; case 'm': break; case 'y': break;
        default: return null;
    }
    return dateDiff(type, getTimestamp(dateFrom), getTimestamp(dateTo)) + 1;
}

export function convertTime(time, from, to, fixed) {
    if (!isNumber(time) || !from || !to || (!isUndefined(fixed) && !isNumber(fixed))) { return null; }
    let timeValue = parseFloat(time), fixedValue = fixed ? parseInt(fixed) : 2, convertedTime;
    switch (from) {
        case 'ms':
            switch (to) {
                case 'ms': convertedTime = timeValue; break;
                case 's': convertedTime = timeValue / 1000; break;
                case 'm': convertedTime = timeValue / 1000 / 60; break;
                case 'h': convertedTime = timeValue / 1000 / 60 / 60; break;
                default: return null;
            }
            break;
        case 's':
            switch (to) {
                case 'ms': convertedTime = timeValue * 1000; break;
                case 's': convertedTime = timeValue; break;
                case 'm': convertedTime = timeValue / 60; break;
                case 'h': convertedTime = timeValue / 60 / 60; break;
                default: return null;
            }
            break;
        case 'm':
            switch (to) {
                case 'ms': convertedTime = timeValue * 1000 * 60; break;
                case 's': convertedTime = timeValue * 60; break;
                case 'm': convertedTime = timeValue; break;
                case 'h': convertedTime = timeValue / 60; break;
                default: return null;
            }
            break;
        case 'h':
            switch (to) {
                case 'ms': convertedTime = timeValue * 1000 * 60 * 60; break;
                case 's': convertedTime = timeValue * 60 * 60; break;
                case 'm': convertedTime = timeValue * 60; break;
                case 'h': convertedTime = timeValue; break;
                default: return null;
            }
            break;
        default: return null;
    }
    return parseFloat((convertedTime).toFixed(fixedValue));
}

export function timeConversion(millisec) {
    let seconds = parseFloat((millisec / 1000).toFixed(1));
    let minutes = parseFloat((millisec / (1000 * 60)).toFixed(1));
    let hours = parseFloat((millisec / (1000 * 60 * 60)).toFixed(1));
    let days = parseFloat((millisec / (1000 * 60 * 60 * 24)).toFixed(1));
    if (seconds < 60) {
        return `${seconds} Sec`;
    } else if (minutes < 60) {
        return `${minutes} Min`;
    } else if (hours < 24) {
        return `${hours} Hrs`;
    } else {
        return `${days} Days`;
    }
}

export function getWeeksInMonth(m, y, isSunStartWeek) {
    let month = m ? m : new Date().getMonth();
    let year = y ? y : new Date().getFullYear();
    let weeks = [],
        firstDate = new Date(year, month, 1),
        lastDate = new Date(year, month + 1, 0),
        numDays = lastDate.getDate();
    let start = 1;
    let end = 7 - firstDate.getDay();
    if (!isSunStartWeek) {
        if (firstDate.getDay() === 0) {
            end = 1;
        } else {
            end = 7 - firstDate.getDay() + 1;
        }
    }
    while (start <= numDays) {
        let mTxt = (month + 1 < 10 ? '0' : '') + (month + 1);
        let startTxt = (start < 10 ? '0' : '') + start;
        let endTxt = (end < 10 ? '0' : '') + end;
        let startFull = mTxt + '/' + startTxt + '/' + year;
        let endFull = mTxt + '/' + endTxt + '/' + year;
        weeks.push({
            startDay: start,
            startDayTxt: startTxt,
            startDayFull: startFull,
            startDayBegin: getBEOfDate('d', 'b', startFull),
            startDayEND: getBEOfDate('d', 'e', startFull),
            endDay: end,
            endDayTxt: endTxt,
            endDayFull: endFull,
            endDayBegin: getBEOfDate('d', 'b', endFull),
            endDayEND: getBEOfDate('d', 'e', endFull),
            dayFullFormat: 'DD/MM/YYYY'
        });
        start = end + 1;
        end = end + 7;
        end = start === 1 && end === 8 ? 1 : end;
        if (end > numDays) {
            end = numDays;
        }
    }
    return weeks;
}

export function getCurDayText(type, kind) {
    let vi_shorts = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    let vi_longs = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    let vi_long_txts = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    let en_shorts = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let en_longs = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let curDay = getDateObj().getDay()
    switch (type) {
        case 'vi':
            switch (kind) {
                case 's':
                    return vi_shorts[curDay];
                case 'l':
                    return vi_longs[curDay];
                case 'lt':
                    return vi_long_txts[curDay];
                default:
                    return '';
            }
        case 'en':
            switch (kind) {
                case 's':
                    return en_shorts[curDay];
                case 'l':
                    return en_longs[curDay];
                default:
                    return '';
            }
        default:
            return '';
    }
}

export function dateToISO(d) {
    return getDateObj(d).toISOString();
}

export function convertDHM(t) {
    let cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        day = Math.floor(t / cd),
        hour = Math.floor((t - day * cd) / ch),
        minute = Math.round((t - day * cd - hour * ch) / 60000);
    if (minute === 60) {
        hour++;
        minute = 0;
    }
    if (hour === 24) {
        day++;
        hour = 0;
    }
    return { day, hour, minute }
}

export function getDelayTime(from, type, value) {
    let time = 0, timeout = nextDateTime(type, value, from), now = getTimestamp();
    if (timeout > now) { time = dateDiff('ms', now, timeout); }
    return time;
}