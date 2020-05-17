export const IconType = {
    Ionicons: 'ionicons',
    FontAwesome: 'font-awesome',
    MaterialIcons: 'material-icons',
    MaterialCommunityIcons: 'material-community-icons',
    Octicons: 'octicons',
}

export function abreviar(string) {
    return (count(string, " ") > 0) ? string.substring(0, string.indexOf(" ")+1) + string.substring(string.lastIndexOf(" ")+1, string.length).substring(0, 1) + "." : string;
};

export function firstLastName(string) {
    return (count(string, " ") > 1) ? string.substring(0, string.indexOf(" ")+1) + string.substring(string.lastIndexOf(" ")+1, string.length) : string;
};

export function count(string, substring, caseSensitive) {
    // Se caseSensitive for indefinido, ele é considerada falsa:
    return ((caseSensitive ? string : string.toLowerCase()).match(new RegExp((caseSensitive ? substring : substring.toLowerCase()), "g")) || []).length;
}; 

String.prototype.setImgurSize = String.prototype.getImgurSmallSize || 
      function(imgurSize){
          return this.split(".jpg")[0] + imgurSize + ".jpg";
      };

export const ImgurSize = {
    small: "s",
    medium: "m",
    large: "l",
}

export const TipoDeFeed = {
    contatos: "contatos",
    apenasPiusDoUsuario: "apenasPiusDeUsuario",
    piusERespostasDoUsuario: "apenasRespostasDeUsuario",
    curtidasDoUsuario: "tudoDoUsuario",
}