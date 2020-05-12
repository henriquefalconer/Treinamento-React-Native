import AsyncStorage from "@react-native-community/async-storage";


async function adicionarPiuAPI(usuario, texto) {
    const token = await AsyncStorage.getItem('token');
    return fetch(
        'http://piupiuwer.polijr.com.br/pius/ ', 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization': 'JW T' + token,
            },
            body: JSON.stringify({
               'usuario': usuario, 
               'texto': texto
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