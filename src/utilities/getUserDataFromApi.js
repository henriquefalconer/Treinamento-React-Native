function doesntExist(data) {
    return data.length == 0;
}

function hasMultiple(data) {
    return data.length > 1;
}

export default async function getUserDataFromApi(username) {
    try {
        // Realiza o pedido do tipo 'GET' para a API:
        let response = await fetch(
            `http://piupiuwer.polijr.com.br/usuarios/?search=${username}`, 
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        );

        // Decodifica os dados para o formato json:
        let data = await response.json();

        if (doesntExist(data)) {
            // Retorna o erro:
            return [null, 'Usuário não existe.'];
        } else if (hasMultiple(data)) {
            // Retorna o erro:
            return [null, 'Há mais de um usuário com essa identificação.'];
        } else {
            // Retorna os dados:
            return [data[0], null];
        }
        
    } catch (error) {
        // Caso haja algum erro, imprima-o e retorne o erro:
        console.error(error);
        return [null, 'Erro de conexão.'];
    }
}