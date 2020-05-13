import React from 'react';
import {Alert} from 'react-native';

function hasError(data) {
    return !Object.keys(data).includes('token');
}

export default async function signUp({ nome, sobrenome, username, password }) {
    try {
        // Realiza o pedido do tip 'POST' para a API:
        let response = await fetch(
            'http://piupiuwer.polijr.com.br/usuarios/', 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'first_name': nome,
                    'last_name': sobrenome,
                    'username': username,
                    'email': email,
                    'password': password,
                }),
            },
        );

        // Decodifica os dados para o formato json:
        let data = await response.json();

        // Imprime os dados obtidos:
        console.log(data);

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