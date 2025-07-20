import * as NotifApi from '../api/NotifRequest';

export const createNotif = (newNotification) => async (dispatch) => {
    dispatch({ type: "CREATE_NOTIF_START" })
    try {
        const { data } = await NotifApi.createNotif(newNotification);
        dispatch({ type: "CREATE_NOTIF_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "CREATE_NOTIF_FAILURE", error: error.message });
    }
}

export const getNotifs = () => async (dispatch) => {
    dispatch({ type: "GET_NOTIFS_START" })
    try {
        const { data } = await NotifApi.getNotifs();
        dispatch({ type: "GET_NOTIFS_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "GET_NOTIFS_FAILURE", error: error.message });
    }
}

export const deleteNotif = (id) => async (dispatch) => {
    dispatch({ type: "DELETE_NOTIF_START" })
    try {
        await NotifApi.deleteNotif(id);
        dispatch({ type: "DELETE_NOTIF_SUCCESS", data: id });
    } catch (error) {
        dispatch({ type: "DELETE_NOTIF_FAILURE", error: error.message });
    }
}

export const deleteAllNotifs = () => async (dispatch) => {
    dispatch({ type: "DELETE_ALL_NOTIFS_START" })
    try {
        await NotifApi.deleteAllNotifs();
        dispatch({ type: "DELETE_ALL_NOTIFS_SUCCESS" });
    } catch (error) {
        dispatch({ type: "DELETE_ALL_NOTIFS_FAILURE", error: error.message });
    }
}

export const toggleReadNotif = (id, readStatus) => async (dispatch) => {
    dispatch({ type: "TOGGLE_READ_NOTIF_START" });
    try {
        await NotifApi.updateNotif(id, { read: !readStatus });
        dispatch({ type: "TOGGLE_READ_NOTIF_SUCCESS", data: { id, read: !readStatus } });
    } catch (error) {
        dispatch({ type: "TOGGLE_READ_NOTIF_FAILURE", error: error.message });
    }
}