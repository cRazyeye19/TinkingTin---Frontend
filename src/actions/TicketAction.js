import * as TicketApi from '../api/TicketRequest'

export const getAllTickets = () => async (dispatch) => {
    dispatch({ type: "GETTING_TICKETS_START" })
    try {
        const { data } = await TicketApi.getAllTickets();
        dispatch({ type: "GETTING_TICKETS_SUCCESS", data: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: "GETTING_TICKETS_FAILURE" })
    }
}

export const createTicket = (data) => async (dispatch) => {
    dispatch({ type: "TICKET_START" })
    try {
        const newTicket = await TicketApi.createTicket(data);
        console.log(newTicket);
        dispatch({ type: "TICKET_SUCCESS", data: newTicket.data })
        console.log(newTicket.data);
    } catch (error) {
        console.log(error)
        dispatch({ type: "TICKET_FAIL" })
    }
}

export const updateTicket = (id, updatedTicket) => async (dispatch) => {
    dispatch({ type: "UPDATING_TICKET_START" });
    try {
        const { data } = await TicketApi.updateTicket(id, updatedTicket);
        dispatch({ type: "UPDATING_TICKET_SUCCESS", data: data });
    } catch (error) {
        dispatch({ type: "UPDATING_TICKET_FAILURE" });
    }
}

export const deleteTicket = (id) => async (dispatch) => {
    dispatch({ type: "DELETING_TICKET_START" });
    try {
        await TicketApi.deleteTicket(id);
        dispatch({ type: "DELETING_TICKET_SUCCESS", data: { _id: id } });
    } catch (error) {
        dispatch({ type: "DELETING_TICKET_FAILURE" });
    }
}