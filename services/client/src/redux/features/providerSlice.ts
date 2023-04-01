import { createSlice } from '@reduxjs/toolkit';

import { IProviderSliceState } from '../../types/IProviderSliceState';
import { createProvider, getProvider } from '../thunks/providerThunk';

const initialState: IProviderSliceState = {
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
      .addCase(createProvider.fulfilled, (state) => {
        state.createProviderStatus = 'success';
      })
      .addCase(createProvider.rejected, (state) => {
        state.createProviderStatus = 'failed';
      });
  },
});

export default providerSlice.reducer;
