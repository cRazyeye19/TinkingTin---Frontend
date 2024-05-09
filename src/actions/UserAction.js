import * as UserApi from "../api/UserRequest";
export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: "UPDATING_USER_START" });
    try {
        const { data } = await UserApi.updateUser(id, formData);
        console.log("Action ko receive hoa hy ye : ", data)
        dispatch({ type: "UPDATING_USER_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "UPDATING_USER_FAILURE" });
    }
}

export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: "GETTING_ALL_USERS_START" });
    try {
        const { data } = await UserApi.getAllUsers();
        dispatch({ type: "GETTING_ALL_USERS_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "GETTING_ALL_USERS_FAILURE" });
    }
}

export const updateAssignee = (id, updatedUser) => async (dispatch) => {
    dispatch({ type: "UPDATING_ASSIGNEES_START" });
    try {
        const { data } = await UserApi.updateAssignee(id, updatedUser);
        dispatch({ type: "UPDATING_ASSIGNEES_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "UPDATING_ASSIGNEES_FAILURE" });
    }
}