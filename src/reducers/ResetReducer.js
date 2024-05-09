const resetReducer = (state = {newPass: null, updateLoading: false, loading: false, error: false}, action) => {
    switch (action.type) {
        case "FORGOT_START":
            return { ...state, loading: true, error: false };
        case "FORGOT_SUCCESS":
            return { ...state, newPass: action.data, updateLoading: false, error: false };
        case "FORGOT_FAIL":
            return { ...state, loading: false, error: true };
        case "NEW_PASS_START":
            return { ...state, updateLoading: true, error: false };
        case "NEW_PASS_SUCCESS":
            return { ...state, newPass: action.data, updateLoading: false, error: false };
        case "NEW_PASS_FAIL":
            return { ...state, updateLoading: false, error: true };
        default:
            return state;
    }
}

export default resetReducer