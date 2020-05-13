import AsyncStorage from "@react-native-community/async-storage";

async function sendRequest({ apiUserId, apiPiuId }) { 
    return await fetch(
        'http://piupiuwer.polijr.com.br/pius/favoritar/',
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + (await AsyncStorage.getItem('token')),
            }),
            body: JSON.stringify({
                'usuario': apiUserId,
                'piu': apiPiuId,
            }),
        },
    );
}

const MAX_RETRIES = 4;

export default async function destacarPiuApi({ apiUserId, apiPiuId }) {
    let response = null;

    let retryCount = 0;

    while (response == null && retryCount < MAX_RETRIES) {
        try {
            // Realiza o pedido do tipo 'POST' para a API:
            response = await sendRequest({ apiUserId, apiPiuId });

            if (!response.status.startsWith(2)) {
                response = null;
                retryCount++;
            }
    
        } catch (e) {
            retryCount++;
        }
    }


    if (retryCount < MAX_RETRIES) {
        console.log("destacarPiuApi: piu sent with " + retryCount + " retries.")
    } else {
        console.log("destacarPiuApi: piu was not sent after " + retryCount + " retries.")
    }

}