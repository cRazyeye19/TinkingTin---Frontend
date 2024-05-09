const initialState = {
    users: [],
    updateLoading: false,
    loading: false,
    error: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETTING_ALL_USERS_START":
            return {
                ...state,
                loading: true
            };
        case "GETTING_ALL_USERS_SUCCESS":
            return {
                ...state,
                loading: false,
                users: action.data,
                error: false
            };
        case "GETTING_ALL_USERS_FAILURE":
            return {
                ...state,
                loading: false,
                error: "Failed to fetch users"
            };
        case "UPDATING_ASSIGNEE_START":
            return {
                ...state,
                updateLoading: true,
                error: false
            }
        case "UPDATING_ASSIGNEES_SUCCESS":
            const updatedAssigneeIndex = state.users.findIndex(user => user._id === action.data._id);
            return updatedAssigneeIndex !== -1 ? { ...state, users: [...state.users.slice(0, updatedAssigneeIndex), action.data, ...state.users.slice(updatedAssigneeIndex + 1)], updateLoading: false, error: false }
                : { ...state, users: [action.data, ...state.users], updateLoading: false, error: false };
        case "UPDATING_ASSIGNEES_FAILURE":
            return {
                ...state,
                updateLoading: false,
                error: "Failed to update assignee"
            }
        default:
            return state;
    }
};

export default userReducer;