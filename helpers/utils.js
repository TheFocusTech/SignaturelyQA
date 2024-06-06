export function getNumberFromDateAndTime() {
    let dt = new Date();
    const year = dt.getFullYear().toString().slice(-2);
    const month = (dt.getMonth() + 1).toString().padStart(2, "0");
    const day = dt.getDate().toString().padStart(2, "0");
    const hh = dt.getHours().toString().padStart(2, '0');
    const mm = dt.getMinutes().toString().padStart(2, '0');
    const ss = dt.getSeconds().toString().padStart(2, '0');
    const millis = dt.getMilliseconds().toString().padStart(3, '0');
    const date = `${year}${month}${day}${hh}${mm}${ss}${millis}`
    return date;
}