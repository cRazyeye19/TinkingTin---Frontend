import * as AuthApi from '../api/AuthRequest';

export const logIn = (formData) => async (dispatch) => {

    dispatch({ type: "AUTH_START" });
    try {
        const { data } = await AuthApi.logIn(formData);
        dispatch({ type: "AUTH_SUCCESS", data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "AUTH_FAIL" });
    }
}

export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
        const { data } = await AuthApi.signUp(formData);
        dispatch({ type: "AUTH_SUCCESS", data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "AUTH_FAIL" });
    }
}

export const resetPass = (userData) => async (dispatch) => {
    dispatch({ type: "FORGOT_START" });
    try {
        const { data } = await AuthApi.resetPass(userData);
        dispatch({ type: "FORGOT_SUCCESS", data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "FORGOT_FAIL" });
    }
}

export const forgotPass = (id, token, updatedPassword) => async (dispatch) => {
    dispatch({ type: "NEW_PASS_START" });
    try {
        const { data } = await AuthApi.forgotPass(id, token, updatedPassword);
        dispatch({ type: "NEW_PASS_SUCCESS", data: data });
    } catch (error) {
        console.log(error)
        dispatch({ type: "NEW_PASS_FAIL" });
    }
}

export const logOut = () => async (dispatch) => {
    dispatch({ type: "LOG_OUT" });
}