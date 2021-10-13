/**
 * Format the provided date in the dd/mm/yyyy format
 *
 * @param date
 * @constructor
 */
export function FormatDate(date:Date) : string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
}

/**
 * Format the provided date to be appropriately displayed next to a message
 * e.g. Today/Yesterday at 1:27pm or 13/10/2021 at 1:27pm
 *
 * @param date
 * @constructor
 */
export function FormatMessageTime(date:Date) : string {
    const today = new Date();
    const time = " at "+FormatTime(date);
    if (date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()) {

        return "Today" + time;

    } else if (date.getDate() === today.getDate()-1 &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()) {

        return "Yesterday" + time;

    } else  {

        return FormatDate(date) + time;
    }
}

/**
 * Format the provided date into a hh:mm am/pm format
 *
 * @param date
 * @constructor
 */
export function FormatTime(date:Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ' ' + ampm;
}