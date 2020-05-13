import AsyncStorage from "@react-native-community/async-storage";

function hasError(data) {
    return !Object.keys(data).includes('id');
}

async function adicionarPiuAPI(usuario, texto) {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    console.log({
        'usuario': usuario, 
        'texto': texto,
    });
    return fetch(
        'http://piupiuwer.polijr.com.br/pius/', 
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token,
            }),
            body: JSON.stringify({
               usuario: usuario, 
               texto: texto,
            })
        }
    )
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        if (hasError(json)) {
            return 'Insira os dados corretamente.';
        } else {
            return null;
        }
    })
    .catch((error) => {
        return "Erro de conexão";
        console.log(error)
    })
}

export default adicionarPiuAPI;