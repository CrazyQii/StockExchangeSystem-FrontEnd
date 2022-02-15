export function formatDate(timestamp) {
    // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
    let date = new Date(Number(timestamp));
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let seconds = date.getSeconds();
    month = month < 10 ? ('0' + month) : month
    day = day < 10 ? ('0' + day) : day
    hour = hour < 10 ? '0' + hour : hour
    min = min < 10 ? '0' + min : min
    seconds = seconds < 10 ? '0' + seconds : seconds
    return `${year}-${month}-${day} ${hour}:${min}:${seconds}`

}