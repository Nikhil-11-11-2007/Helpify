import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createFaq      as createFaqApi,
  getFaqs        as getFaqsApi,
  updateFaq      as updateFaqApi,
  deleteFaq      as deleteFaqApi,
  getSettings    as getSettingsApi,
  updateSettings as updateSettingsApi,
} from '../../services/api.business';

// ─────────────────────────────────────────────
// Async Thunks
// ─────────────────────────────────────────────

export const fetchFaqs = createAsyncThunk(
  'business/getFaqs',
  async (_, { rejectWithValue }) => {
    try {
      return await getFaqsApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch FAQs');
    }
  }
);

export const addFaq = createAsyncThunk(
  'business/createFaq',
  async (faqData, { rejectWithValue }) => {
    try {
      return await createFaqApi(faqData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create FAQ');
    }
  }
);

export const editFaq = createAsyncThunk(
  'business/updateFaq',
  async ({ faqId, ...faqData }, { rejectWithValue }) => {
    try {
      return await updateFaqApi(faqId, faqData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update FAQ');
    }
  }
);

export const removeFaq = createAsyncThunk(
  'business/deleteFaq',
  async (faqId, { rejectWithValue }) => {
    try {
      await deleteFaqApi(faqId);
      return faqId; // Return ID so we can remove it from state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete FAQ');
    }
  }
);

export const fetchSettings = createAsyncThunk(
  'business/getSettings',
  async (_, { rejectWithValue }) => {
    try {
      return await getSettingsApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch settings');
    }
  }
);

export const saveSettings = createAsyncThunk(
  'business/updateSettings',
  async (settingsData, { rejectWithValue }) => {
    try {
      return await updateSettingsApi(settingsData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update settings');
    }
  }
);

// ─────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────

const initialState = {
  faqs:     [],    // Array of FAQ objects
  settings: null,  // Business AI settings object
  loading:  false,
  error:    null,
  success:  false,
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    clearBusinessError(state) {
      state.error = null;
    },
    clearBusinessSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // ── Fetch FAQs
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs    = action.payload;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── Add FAQ
      .addCase(addFaq.pending, (state) => {
        state.loading = true;
        state.error   = null;
        state.success = false;
      })
      .addCase(addFaq.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.faqs.push(action.payload);
      })
      .addCase(addFaq.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── Edit FAQ
      .addCase(editFaq.pending, (state) => {
        state.loading = true;
        state.error   = null;
        state.success = false;
      })
      .addCase(editFaq.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.faqs.findIndex((f) => f._id === action.payload._id);
        if (index !== -1) state.faqs[index] = action.payload;
      })
      .addCase(editFaq.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── Remove FAQ
      .addCase(removeFaq.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(removeFaq.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs    = state.faqs.filter((f) => f._id !== action.payload);
      })
      .addCase(removeFaq.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── Fetch Settings
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading  = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ── Save Settings
      .addCase(saveSettings.pending, (state) => {
        state.loading = true;
        state.error   = null;
        state.success = false;
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        state.loading  = false;
        state.success  = true;
        state.settings = action.payload;
      })
      .addCase(saveSettings.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { clearBusinessError, clearBusinessSuccess } = businessSlice.actions;
export default businessSlice.reducer;