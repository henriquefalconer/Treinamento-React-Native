import createDataContext from "./createDataContext";
import baseDeDados from "../utilities/baseDeDados";

const baseDeDadosReducer = (state, action) => {
    switch (action.type) {
        case 'change_base_de_dados':
            return { ...state, baseDeDados: action.payload };
        default:
            return state;
    }
};

const setPiusApiListener = (dispatch) => {
    return async () => {
        do {
            // Carregar pius do servidor à base de dados local:
            const change = await baseDeDados.carregarAllDataFromApi();
    
            // Implementar pius, caso algo tenha sido modificado na base de dados local:
            if (change) {
                dispatch({ type: 'change_base_de_dados', payload: await baseDeDados.montarPiusList()});
            }

            await this.wait(1000);

            console.log("reloaded feed");
        } while (this._isMounted)
    }
};

const signIn = (dispatch) => {
    return ({ username, password }) => {
        const request = fetch('http://piupiuwer.polijr.com.br/login/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        })
        .catch((error) => {
          console.error(error);
        });
    };
};

const signOut = (dispatch) => {
    return;
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signIn, signUp, signOut },
    { baseDeDados: baseDeDados },
);