const initialState = {
    comments: [],
    loading: false,
    error: false
}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_COMMENT_START":
            return { ...state, loading: true, error: false }
        case "CREATE_COMMENT_SUCCESS":
            return {
                ...state,
                comments: [action.data, ...state.comments],
                loading: false,
                error: false
            };
        case "CREATE_COMMENT_ERROR":
            return { ...state, loading: false, error: true }
        case "GET_ALL_COMMENTS_START":
            return { ...state, loading: true, error: false }
        case "GET_ALL_COMMENTS_SUCCESS":
            return { ...state, comments: action.data, loading: false, error: false }
        case "GET_ALL_COMMENTS_ERROR":
            return { ...state, loading: false, error: true }
        case "UPDATE_COMMENT_START":
            return { ...state, loading: false, error: true }
        case "UPDATE_COMMENT_SUCCESS":
            // Find the index of the updated comment in the state array
            const updateIndex = state.comments.findIndex(comment => comment._id === action.data._id);
            // Create a new state array with the updated comment
            const updateComments = [...state.comments];
            updateComments[updateIndex] = action.data;
            return { ...state, comments: updateComments, loading: false, error: false };
        case "UPDATE_COMMENT_ERROR":
            return { ...state, loading: false, error: true }
        case "ADD_REPLY_START":
            return { ...state, loading: false, error: true }
        case "ADD_REPLY_SUCCESS":
            const commentIndex = state.comments.findIndex(comment => comment._id === action.data.commentId);
            const updatedComment = { ...state.comments[commentIndex] };
            updatedComment.replies.push(action.data);
            const updatedComments = [...state.comments];
            updatedComments[commentIndex] = updatedComment;
            return { ...state, comments: updatedComments, loading: false, error: false };
        case "ADD_REPLY_ERROR":
            return { ...state, loading: false, error: true }
        case "EDIT_REPLY_START":
            return { ...state, loading: false, error: true }
        case "EDIT_REPLY_SUCCESS":
            const isCommentIndex = state.comments.findIndex(comment => comment._id === action.data._id);
            if (isCommentIndex === -1) {
                return state; 
            }
            const isUpdatedComments = [...state.comments];
            const replyIndex = isUpdatedComments[isCommentIndex].replies.findIndex(reply => reply._id === action.data.replies[0]._id); 
            if(replyIndex === -1) {
                return state;
            }
            isUpdatedComments[isCommentIndex].replies[replyIndex] = action.data.replies[0];
            return {...state, comments: isUpdatedComments, loading: false, error: false };
        case "EDIT_REPLY_ERROR":
            return { ...state, loading: false, error: true }
        case "DELETE_REPLY_START":
            return { ...state, loading: false, error: true }
        case "DELETE_REPLY_SUCCESS":
            const selectedCommentIndex = state.comments.findIndex(comment => comment._id === action.data.commentId);
            if(selectedCommentIndex === -1) {
                return state;
            }
            const selectedCommentUpdated = [...state.comments];
            const selectedReplyIndex = selectedCommentUpdated[selectedCommentIndex].replies.findIndex(reply => reply._id === action.data.replyId);
            if(selectedReplyIndex === -1) {
                return state;
            }
            selectedCommentUpdated[selectedCommentIndex].replies.splice(selectedReplyIndex, 1);
            return { ...state, comments: selectedCommentUpdated, loading: false, error: false };
        case "DELETE_REPLY_ERROR":
            return { ...state, loading: false, error: true }
        case "DELETE_COMMENT_START":
            return { ...state, loading: false, error: true }
        case "DELETE_COMMENT_SUCCESS":
            const filteredComments = state.comments.filter(comment => comment._id !== action.id);
            return { ...state, comments: filteredComments, loading: false, error: false };
        case "DELETE_COMMENT_ERROR":
            return { ...state, loading: false, error: true }
        case "GET_ALL_REPLIES_START":
            return { ...state, loading: true, error: false }
        case "GET_ALL_REPLIES_SUCCESS":
            return { ...state, comments: action.data, loading: false, error: false }
        case "GET_ALL_REPLIES_ERROR":
            return { ...state, loading: false, error: true }
        default:
            return state
    }
}

export default commentReducer