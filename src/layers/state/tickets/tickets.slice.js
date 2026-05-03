import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getTickets          as getTicketsApi,
  getTicketById       as getTicketByIdApi,
  updateTicketStatus  as updateTicketStatusApi,
  replyToTicket       as replyToTicketApi,
} from '../../services/api.tickets';

// ─────────────────────────────────────────────
// Async Thunks
// ─────────────────────────────────────────────

export const fetchTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getTicketsApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tickets');
    }
  }
);

export const fetchTicketById = createAsyncThunk(
  'tickets/getById',
  async (ticketId, { rejectWithValue }) => {
    try {
      return await getTicketByIdApi(ticketId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch ticket');
    }
  }
);

export const changeTicketStatus = createAsyncThunk(
  'tickets/updateStatus',
  async ({ ticketId, status }, { rejectWithValue }) => {
    try {
      return await updateTicketStatusApi(ticketId, status);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update ticket status');
    }
  }
);

export const sendTicketReply = createAsyncThunk(
  'tickets/reply',
  async ({ ticketId, content }, { rejectWithValue }) => {
    try {
      return await replyToTicketApi(ticketId, { content });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send reply');
    }
  }
);

// ─────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────

const initialState = {
  tickets:       [],   // Array of all ticket objects
  activeTicket:  null, // Single ticket with full chat history
  loading:       false,
  error:         null,
  success:       false,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    clearTicketsError(state) {
      state.error = null;
    },
    clearTicketsSuccess(state) {
      state.success = false;
    },
    clearActiveTicket(state) {
      state.activeTicket = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ── Fetch All Tickets
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── Fetch Single Ticket
      .addCase(fetchTicketById.pending, (state) => {
        state.loading      = true;
        state.error        = null;
        state.activeTicket = null;
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        state.loading      = false;
        state.activeTicket = action.payload;
      })
      .addCase(fetchTicketById.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── Change Ticket Status
      .addCase(changeTicketStatus.pending, (state) => {
        state.loading = true;
        state.error   = null;
        state.success = false;
      })
      .addCase(changeTicketStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Update in tickets list
        const index = state.tickets.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.tickets[index] = action.payload;
        // Update active ticket if it's open
        if (state.activeTicket?._id === action.payload._id) {
          state.activeTicket = action.payload;
        }
      })
      .addCase(changeTicketStatus.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── Send Reply
      .addCase(sendTicketReply.pending, (state) => {
        state.loading = true;
        state.error   = null;
        state.success = false;
      })
      .addCase(sendTicketReply.fulfilled, (state, action) => {
        state.loading      = false;
        state.success      = true;
        state.activeTicket = action.payload;
      })
      .addCase(sendTicketReply.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { clearTicketsError, clearTicketsSuccess, clearActiveTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;