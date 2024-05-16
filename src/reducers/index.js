import { combineReducers } from 'redux';

import authReducer from './AuthReducer';
import ticketReducer from './TicketReducer';
import userReducer from './UserReducer';
import resetReducer from './ResetReducer';
import commentReducer from './CommentReducer';
import notifReducer from './NotifReducer';

export const reducers = combineReducers({ authReducer, ticketReducer, userReducer, resetReducer, commentReducer, notifReducer })