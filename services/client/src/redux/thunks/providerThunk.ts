import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProvider } from '../../types/IProvider';

export const createProvider = createAsyncThunk(
  'provider/createProvider',
  async (provider: IProvider) => {
    try {
      const response = await axios.post('http://localhost:8000/rest/providers', provider);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);
