import * as CommentApi from "../api/CommentRequest";

export const createComment = (newComment) => async (dispatch) => {
    dispatch({ type: "CREATE_COMMENT_START" });
    try {
        const { data } = await CommentApi.createComment(newComment);
        dispatch({ type: "CREATE_COMMENT_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "CREATE_COMMENT_ERROR" });
    }
}

export const updateComment = (id, newUpdatedComment) => async (dispatch) => {
    dispatch({ type: "UPDATE_COMMENT_START" });
    try {
        const { data } = await CommentApi.updateComment(id, newUpdatedComment);
        dispatch({ type: "UPDATE_COMMENT_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "UPDATE_COMMENT_ERROR" });
    }
}

export const deleteComment = (id) => async (dispatch) => {
    dispatch({ type: "DELETE_COMMENT_START" });
    try {
        await CommentApi.deleteComment(id);
        dispatch({ type: "DELETE_COMMENT_SUCCESS", data: { _id: id } });
    } catch (error) {
        dispatch({ type: "DELETE_COMMENT_ERROR" });
    }
}

export const getAllComments = () => async (dispatch) => {
    dispatch({ type: "GET_ALL_COMMENTS_START" });
    try {
        const { data } = await CommentApi.getAllComments();
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

export const getAllReplies = (id) => async (dispatch) => {
    dispatch({ type: "GET_ALL_REPLIES_START" });
    try {
        const { data } = await CommentApi.getAllReplies(id);
        dispatch({ type: "GET_ALL_REPLIES_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "GET_ALL_REPLIES_ERROR" });
    }
}

export const editReply = (id, replyId, updatedReply) => async (dispatch) => {
    dispatch({ type: "EDIT_REPLY_START" });
    try {
        const { data } = await CommentApi.editReply(id, replyId, updatedReply);
        dispatch({ type: "EDIT_REPLY_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "EDIT_REPLY_ERROR" });
    }
}

export const deleteReply = (id, replyId) => async (dispatch) => {
    dispatch({ type: "DELETE_REPLY_START" });
    try {
        await CommentApi.deleteReply(id, replyId);
        dispatch({ type: "DELETE_REPLY_SUCCESS", data: { _id: replyId } });
    } catch (error) {
        dispatch({ type: "DELETE_REPLY_ERROR" });
    }
}