function doesntExist(data) {
    return data.length == 0;
}

function hasMultiple(data) {
    return data.length > 1;
}

export default async function getUserDataFromApi({username, progress}) {
    try {

        const data = await new Promise((resolve, reject) => {
            // Cria um XMLHttpRequest:
            var oReq = new XMLHttpRequest();
    
            // oReq.addEventListener("progress", progress);
    
            // Abre e envia o pedido do tipo 'GET' para a API:
            oReq.open('GET', `http://piupiuwer.polijr.com.br/usuarios/?search=${username}`);
            oReq.send();
    
            // Espera o pedido ter concluído:
            oReq.onreadystatechange = function() {
                if (oReq.readyState == XMLHttpRequest.DONE) {
    
                    // Decodifica os dados para o formato json:
                    let data = JSON.parse(oReq.responseText);

                    resolve(data);
                }
            }
        });
    
        if (doesntExist(data)) {
            // Retorna o erro:
            return [null, `Usuário ${username} não existe.`];
        } else if (hasMultiple(data)) {
            // Retorna o erro:
            return [null, `Há mais de um usuário com a identificação ${username}.`];
        } else {
            // Retorna os dados:
            return [data[0], null];
        }
        
    } catch (error) {
        // Caso haja algum erro, imprime-o e retorne o erro:
        console.error(error);
        return [null, 'Erro de conexão.'];
    }
}