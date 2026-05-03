import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  register  as registerApi,
  login     as loginApi,
  getMe     as getMeApi,
  verifyEmail as verifyEmailApi,
} from '../../services/api.auth';

// ─────────────────────────────────────────────
// Async Thunks
// ─────────────────────────────────────────────

export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      return await registerApi(formData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      return await loginApi(formData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const fetchMe = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      return await getMeApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token, { rejectWithValue }) => {
    try {
      return await verifyEmailApi(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Email verification failed');
    }
  }
);

// ─────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────

const initialState = {
  user:    null,    // Current logged-in admin object
  loading: false,   // True while any async call is pending
  error:   null,    // Error message string or null
  success: false,   // True after a successful action (register, verify)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    clearAuthSuccess(state) {
      state.success = false;
    },
    logout(state) {
      state.user    = null;
      state.error   = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // ── Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error   = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user    = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── Get Me
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user    = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error   = null;
        state.success = false;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { clearAuthError, clearAuthSuccess, logout } = authSlice.actions;
export default authSlice.reducer;