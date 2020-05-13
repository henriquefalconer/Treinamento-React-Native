import AsyncStorage from "@react-native-community/async-storage";

function hasError(data) {
    return !Object.keys(data).includes('id');
}

async function deletePiuAPI(id) {
    try {

        const token = await AsyncStorage.getItem('token');
    
        const response = await fetch(
            `http://piupiuwer.polijr.com.br/pius/${id}/`, 
            {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + token,
                }),
            }
        );

        console.log(response);

    } catch (e) {
        console.log("ERRO em deletePiuAPI: " + e);
    }

}

export default deletePiuAPI;