import { createSlice } from '@reduxjs/toolkit';

import { IProviderSliceState } from '../../types/IProviderSliceState';
import { createProvider, getProvider } from '../thunks/providerThunk';

const initialState: IProviderSliceState = {
  user: null,
  createProviderStatus: null,
  providers: null,
};

export const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProvider.pending, (state) => {
        state.createProviderStatus = 'loading';
      })
      .addCase(createProvider.fulfilled, (state, { payload }) => {
        state.createProviderStatus = 'success';
        state.user = payload;
        window.localStorage.setItem('userId', payload.id);
      })
      .addCase(createProvider.rejected, (state) => {
        state.createProviderStatus = 'failed';
      });
  },
});

export default providerSlice.reducer;
