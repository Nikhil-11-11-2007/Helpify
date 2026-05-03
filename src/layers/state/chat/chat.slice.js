import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  sendMessage      as sendMessageApi,
  getChatMessages  as getChatMessagesApi,
} from '../../services/api.chat';

// ─────────────────────────────────────────────
// Async Thunks
// ─────────────────────────────────────────────

export const sendChatMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      return await sendMessageApi(messageData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

export const fetchChatMessages = createAsyncThunk(
  'chat/getMessages',
  async (chatId, { rejectWithValue }) => {
    try {
      return await getChatMessagesApi(chatId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch messages');
    }
  }
);

// ─────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────

const initialState = {
  messages:      [],   // Array of message objects in the active chat
  activeChatId:  null, // Current chat session ID
  loading:       false,
  error:         null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChatError(state) {
      state.error = null;
    },
    clearChat(state) {
      state.messages     = [];
      state.activeChatId = null;
      state.error        = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ── Send Message
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading      = false;
        state.activeChatId = action.payload.chatId ?? state.activeChatId;
        // Append both the customer message and AI reply returned from backend
        if (action.payload.messages) {
          state.messages.push(...action.payload.messages);
        }
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── Fetch Messages
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.loading  = false;
        state.messages = action.payload;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { clearChatError, clearChat } = chatSlice.actions;
export default chatSlice.reducer;