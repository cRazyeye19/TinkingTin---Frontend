import * as CommentApi from "../api/CommentRequest";

export const createComment = (newComment) => async (dispatch) => {
    dispatch({ type: "CREATE_COMMENT_START" });
    try {
        const { data } = await CommentApi.createComment(newComment);
        console.log(data);
        dispatch({ type: "CREATE_COMMENT_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "CREATE_COMMENT_ERROR" });
    }
}

export const updateComment = (id, updatedComment) => async (dispatch) => {
    
}

export const getAllComments = () => async (dispatch) => {
    dispatch({ type: "GET_ALL_COMMENTS_START" });
    try {
        const { data } = await CommentApi.getAllComments();
        console.log(data);
        dispatch({ type: "GET_ALL_COMMENTS_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "GET_ALL_COMMENTS_ERROR" });
    }
}

export const addReply = (id, newReply) => async (dispatch) => {
    dispatch({ type: "ADD_REPLY_START" });
    try {
        const { data } = await CommentApi.addReply(id, newReply);
        console.log(data);
        dispatch({ type: "ADD_REPLY_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "ADD_REPLY_ERROR" });
    }
}