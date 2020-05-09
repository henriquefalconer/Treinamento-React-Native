import AsyncStorage from "@react-native-community/async-storage";

async function sendRequest(apiPiuId, apiUserId) { 
    return await fetch(
        'http://piupiuwer.polijr.com.br/pius/dar-like/',
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + (await AsyncStorage.getItem('token')),
            }),
            body: JSON.stringify({
                'piu': apiPiuId,
                'usuario': apiUserId,
            }),
        },
    );
}

export default async function sendLikeToApi({apiPiuId, apiUserId, maxRetries}) {
    let response = null;

    let retryCount = 0;

    while (response == null && retryCount <= maxRetries) {
        try {
            // Realiza o pedido do tipo 'POST' para a API:
            response = await sendRequest(apiPiuId, apiUserId);

            if (response.status != 200) {
                response = null;
                retryCount++;
            }
    
        } catch (e) {
            retryCount++;
        }
    }

    return retryCount;

}