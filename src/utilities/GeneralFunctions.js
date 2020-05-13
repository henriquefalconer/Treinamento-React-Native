export function getUserNameFromPiuId(piuId){
    return (piuId == null) ? null : JSON.parse(piuId).username;
}

export function getTimeFromPiuId(piuId){
    return (piuId == null) ? null : JSON.parse(piuId).time;
}

export function getApiPiuIdFromPiuId(piuId){
    return (piuId == null) ? null : JSON.parse(piuId).apiId;
}

export function createPiuId({ username, time, apiId }) {
    return JSON.stringify({
        username: username,
        time: time,
        apiId: apiId || -1,
    });
}

export async function wait(milliseconds) {
  return new Promise((resolve) =>
    setTimeout(
      () => { resolve('result') },
      milliseconds
    )
  );
}

export function getRelativeTime(timeInMilliseconds) {
    var relativeTime = "";

    var currentTime = Date.parse(new Date());

    var differenceInSeconds = (currentTime - timeInMilliseconds)/1000;

    if (differenceInSeconds < 0) {
        relativeTime = "Do futuro";
    } else if (differenceInSeconds < 60) {
        relativeTime = differenceInSeconds.toFixed(0) + " s";
    } else if (differenceInSeconds < 3600) {
        relativeTime = (differenceInSeconds/60).toFixed(0) + " min";
    } else if (differenceInSeconds < 3600*24) {
        relativeTime = (differenceInSeconds/3600).toFixed(0) + " h";
    } else if (differenceInSeconds < 3600*24*30) {
        if ((differenceInSeconds/3600/24).toFixed(0) > 1) relativeTime = 
            (differenceInSeconds/3600/24).toFixed(0) + " dias";
        else relativeTime = (differenceInSeconds/3600/24).toFixed(0) + " dia";
    } else if (differenceInSeconds < 3600*24*365) {
        if ((differenceInSeconds/3600/24/30).toFixed(0) > 1) relativeTime = 
            (differenceInSeconds/3600/24/30).toFixed(0) + " meses";
        else relativeTime = (differenceInSeconds/3600/24/30).toFixed(0) + " mês";
    } else {
        if ((differenceInSeconds/3600/24/365).toFixed(0) > 1) relativeTime = 
            (differenceInSeconds/3600/24/365).toFixed(0) + " anos";
        else relativeTime = (differenceInSeconds/3600/24/365).toFixed(0) + " ano";
    }

    return relativeTime;
}

export function createImgElement(classList, alt, src) {
    var img = document.createElement("img");
    classList.forEach(function(classItem){
        img.classList.add(classItem);
    });
    img.alt = alt;
    img.src = src;
    return img;
}

export function getDateFromMilisseconds(milliseconds) {
    const date = new Date(milliseconds);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

export function getApiFormatDate(milliseconds) {
    const date = new Date(milliseconds);
    return `${date.getFullYear().pad(4)}-${(date.getMonth() + 1).pad(2)}-${date.getDate().pad(2)}T${date.getHours().pad(2)}:${date.getMinutes().pad(2)}:${date.getSeconds().pad(2)}-${(date.getTimezoneOffset()/60).pad(2)}:00`;
}

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}