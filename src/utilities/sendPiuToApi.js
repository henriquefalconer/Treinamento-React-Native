import AsyncStorage from "@react-native-community/async-storage";
import * as GeneralFunctions from "./GeneralFunctions";
import { baseDeDados, loggedInUser } from "./baseDeDados";

async function sendRequest({ usuario, texto }) { 
    return await fetch(
        'http://piupiuwer.polijr.com.br/pius/',
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + (await AsyncStorage.getItem('token')),
            }),
            body: JSON.stringify({
                'usuario': usuario,
                'texto': texto,
            }),
        },
    );
}

const MAX_RETRIES = 4;

function insertPiuReplyInfo(message, piuReplyId) {
    return piuReplyId != null 
        ? `(replyTo:${GeneralFunctions.getApiPiuIdFromPiuId(piuReplyId)}) ${message}` 
        : message
}

export default async function sendPiuToApi({ mensagem, piuReplyId }) {
    let response = null;

    let retryCount = 0;

    const piuData = {
        usuario: baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.apiId,
        texto: insertPiuReplyInfo(mensagem, piuReplyId),
        horario: new Date(),
    };

    while (response == null && retryCount < MAX_RETRIES) {
        try {
            // Realiza o pedido do tipo 'POST' para a API:
            response = await sendRequest(piuData);

            if (response.status != 200 && response.status != 201) {
                response = null;
                retryCount++;
            }
    
        } catch (e) {
            retryCount++;
        }
    }


    if (retryCount < MAX_RETRIES) {
        console.log("sendPiuToApi: piu sent with " + retryCount + " retries.")
    } else {
        console.log("sendPiuToApi: piu was not sent after " + retryCount + " retries.")
    }

}