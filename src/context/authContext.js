import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const signUp = (dispatch) => {
    return ({ firstName, lastName, username, email, password }) => {
        const request = fetch('http://piupiuwer.polijr.com.br/usuarios/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'first_name': firstName,
                'last_name': lastName,
                'username': username,
                'email': email,
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
    { isSignedIn: false },
);