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
        default:
            return state
    }
}

export default commentReducer