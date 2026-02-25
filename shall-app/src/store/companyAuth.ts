import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAssociatedCompanies, type Company } from '@/api/company';

export interface CompanyAuthState {
  companies: Company[];
  selectedCompany: Company | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CompanyAuthState = {
  companies: [],
  selectedCompany: null,
  isLoading: false,
  error: null,
};

export const loadCompanies = createAsyncThunk<
  Company[],
  void,
  { rejectValue: string }
>('companyAuth/loadCompanies', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchAssociatedCompanies();
    return data;
  } catch (err) {
    console.error(err);
    return rejectWithValue('Unable to load associated companies.');
  }
});

const companyAuthSlice = createSlice({
  name: 'companyAuth',
  initialState,
  reducers: {
    setSelectedCompany: (state, action: PayloadAction<Company>) => {
      state.selectedCompany = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCompanies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companies = action.payload;
        if (!state.selectedCompany && action.payload.length > 0) {
          state.selectedCompany = action.payload[0];
        }
      })
      .addCase(loadCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unable to load companies.';
      });
  },
});

export const { setSelectedCompany } = companyAuthSlice.actions;
export default companyAuthSlice.reducer;
