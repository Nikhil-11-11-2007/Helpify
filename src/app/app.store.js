import { configureStore } from '@reduxjs/toolkit';

import authReducer     from '../layers/state/auth/auth.slice';
import businessReducer from '../layers/state/business/business.slice';
import chatReducer     from '../layers/state/chat/chat.slice';
import ticketsReducer  from '../layers/state/tickets/tickets.slice';

const store = configureStore({
  reducer: {
    auth:     authReducer,
    business: businessReducer,
    chat:     chatReducer,
    tickets:  ticketsReducer,
  },
});

export default store;