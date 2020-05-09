function doesntExist(data) {
    return data.length == 0;
}

function hasMultiple(data) {
    return data.length > 1;
}

export default async function getAllApiData() {
    try {

        const data = await new Promise((resolve, reject) => {
            // Cria um XMLHttpRequest:
            var oReq = new XMLHttpRequest();
    
            // oReq.addEventListener("progress", progress);
    
            // Abre e envia o pedido do tipo 'GET' para a API:
            oReq.open('GET', 'http://piupiuwer.polijr.com.br/usuarios/');
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
        
        return [data, null];
        
    } catch (error) {
        // Caso haja algum erro, imprime-o e retorne o erro:
        console.error(error);
        return [null, 'Erro de conexão.'];
    }
}