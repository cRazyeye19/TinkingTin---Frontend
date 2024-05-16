const initialState = {
    notifs: [],
    loading: false,
    error: null,
};

const notifReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_NOTIF_START":
        case "GET_NOTIFS_START":
        case "DELETE_NOTIF_START":
        case "DELETE_ALL_NOTIFS_START":
            return {
                ...state,
                loading: true,
                error: null,
            };
        
        case "CREATE_NOTIF_SUCCESS":
            return {
                ...state,
                loading: false,
                notifs: [...state.notifs, action.data],
            };

        case "GET_NOTIFS_SUCCESS":
            return {
                ...state,
                loading: false,
                notifs: action.data,
            };

        case "DELETE_NOTIF_SUCCESS":
            return {
                ...state,
                loading: false,
                notifs: state.notifs.filter(notif => notif._id !== action.data),
            };

        case "DELETE_ALL_NOTIFS_SUCCESS":
            return {
                ...state,
                loading: false,
                notifs: [],
            };

        case "CREATE_NOTIF_FAILURE":
        case "GET_NOTIFS_FAILURE":
        case "DELETE_NOTIF_FAILURE":
        case "DELETE_ALL_NOTIFS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return state;
    }
};

export default notifReducer;