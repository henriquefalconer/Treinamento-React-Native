import { AsyncStorage } from "@react-native-community/async-storage";

export default async function sendLikeToApi({apiPiuId, apiUserId}) {

    try {
        // Realiza o pedido do tipo 'POST' para a API:
        return await fetch(
            'http://piupiuwer.polijr.com.br/pius/dar-like/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': await AsyncStorage.getItem('token'),
                },
                body: JSON.stringify({
                    'piu': apiPiuId,
                    'usuario': apiUserId,
                }),
            },
        );
    } catch (e) {
        console.log('ERRO em sendLikeToApi: ' + e);
        return 'ERRO';
    }

}