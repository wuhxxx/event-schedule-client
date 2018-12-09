// Convert number of minutes to time string like "09:00"
export default function toTimeString(time) {
    if (typeof time !== "number" || time < 0 || time > 1440)
        return new Error("Invalid input for toTimeString()");

    let hour = ~~(time / 60);
    let minute = ~~(time % 60);

    hour = hour < 10 ? "0" + hour : String(hour);
    minute = minute < 10 ? "0" + minute : String(minute);

    return `${hour}:${minute}`;
}
