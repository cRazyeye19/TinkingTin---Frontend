import { combineReducers } from 'redux';

import authReducer from './AuthReducer';
import ticketReducer from './TicketReducer';
import userReducer from './UserReducer';
import resetReducer from './ResetReducer';
import commentReducer from './CommentReducer';

export const reducers = combineReducers({ authReducer, ticketReducer, userReducer, resetReducer, commentReducer })