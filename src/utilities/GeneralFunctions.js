import { baseDeDados } from "./baseDeDados";

export function sortPius(piusIds){
    piusIds.sort(function(a, b){return getTimeFromPiuId(b) - getTimeFromPiuId(a)});
    piusIds.sort(function(a, b){return baseDeDados.getDadosPiuFromPiuId(b).hasDestaque() - baseDeDados.getDadosPiuFromPiuId(b).hasDestaque()});
}

export function getUserNameFromPiuId(piuId){
    return (piuId == null) ? null : piuId.split(":")[0];
}

export function getTimeFromPiuId(piuId){
    return (piuId == null) ? null : piuId.split(":")[1];
}

export function getRelativeTime(timeInMilliseconds) {
    var relativeTime = "";

    var currentTime = Date.parse(new Date());

    var differenceInSeconds = (currentTime - timeInMilliseconds)/1000;

    if (differenceInSeconds < 60) {
        relativeTime = differenceInSeconds.toFixed(0) + " s";
    } else if (differenceInSeconds < 3600) {
        relativeTime = (differenceInSeconds/60).toFixed(0) + " min";
    } else if (differenceInSeconds < 3600*24) {
        relativeTime = (differenceInSeconds/3600).toFixed(0) + " h";
    } else {
        relativeTime = (differenceInSeconds/3600/24).toFixed(0) + " dia";
        if ((differenceInSeconds/3600/24).toFixed(0) > 1) relativeTime = relativeTime + "s";
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