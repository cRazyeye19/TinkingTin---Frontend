const ticketReducer = (state = { tickets: [], loading: false, error: false, uploading: false, updateLoading: false }, action) => {
    switch (action.type) {
        case "GETTING_TICKETS_START":
            return { ...state, loading: true, error: false };
        case "GETTING_TICKETS_SUCCESS":
            return { ...state, tickets: action.data, loading: false, error: false };
        case "GETTING_TICKETS_FAILURE":
            return { ...state, loading: false, error: true };
        case "TICKET_START":
            return { ...state, uploading: true, error: false };
        case "TICKET_SUCCESS":
            const existingTicketIndex = state.tickets.findIndex(ticket => ticket._id === action.data._id);
            return existingTicketIndex !== -1 ? { ...state, tickets: [...state.tickets.slice(0, existingTicketIndex), action.data, ...state.tickets.slice(existingTicketIndex + 1)], uploading: false, error: false } : { ...state, tickets: [action.data, ...state.tickets], uploading: false, error: false };
        case "TICKET_FAIL":
            return { ...state, uploading: false, error: true };
        case "UPDATING_TICKET_START":
            return { ...state, updateLoading: true, error: false };
        case "UPDATING_TICKET_SUCCESS":
            const updatedTicketIndex = state.tickets.findIndex(ticket => ticket._id === action.data._id);
            return updatedTicketIndex !== -1 ? { ...state, tickets: [...state.tickets.slice(0, updatedTicketIndex), action.data, ...state.tickets.slice(updatedTicketIndex + 1)], updateLoading: false, error: false } : { ...state, tickets: [action.data, ...state.tickets], updateLoading: false, error: false };
        case "UPDATING_TICKET_FAILURE":
            return { ...state, updateLoading: false, error: true };
        case "DELETING_TICKET_START":
            return { ...state, updateLoading: true, error: false };
        case "DELETING_TICKET_SUCCESS":
            return { ...state, tickets: state.tickets.filter(ticket => ticket._id !== action.data._id) };
        case "DELETING_TICKET_FAILURE":
            return { ...state, updateLoading: false, error: true };
        default:
            return state;
    }
}

export default ticketReducer;