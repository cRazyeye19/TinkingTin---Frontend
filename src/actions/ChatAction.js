import * as ChatApi from '../api/ChatRequest';

export const fetchChats = () => async (dispatch) => {
    dispatch({ type: "FETCH_CHATS_REQUEST" });
    try {
        const { data } = await ChatApi.getAllChats();
        dispatch({ type: "FETCH_CHATS_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "FETCH_CHATS_FAILURE" });
    }
}