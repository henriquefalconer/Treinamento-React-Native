import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const signOut = (dispatch) => {
    return;
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signOut },
    { isSignedIn: false },
);