import React from 'react';
import {Alert} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

function hasError(data) {
    return !Object.keys(data).includes('token');
}

export default async function followUser({ usuario_id, logado_id }) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log({
            "usuario_id": usuario_id,
            "logado_id": logado_id,
        });
        // Realiza o pedido do tip 'POST' para a API:
        let response = await fetch(
            "http://piupiuwer.polijr.com.br/usuarios/seguir/", 
            {
                method: 'POST',
                headers: new Headers ({  
                    Accept: 'application/json',
                    'Authorization': 'JWT ' + token,
                }),
                body: JSON.stringify({
                    "usuario_id": usuario_id,
                    "logado_id": logado_id,
                }),
            },
        );

        // Decodifica os dados para o formato json:
        let data = await response.json();
        console.log(data)
        if (!hasError(data)) {
            // Retorna os dados:
            return data;
        }
        else {
            // Retorna null:
            return null;
        }
        
    } catch (error) {
        // Caso haja algum erro, imprima-o e retorne null:
        console.error(error);
        return null;
    }
} 