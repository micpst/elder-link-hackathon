import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IProvider } from '../../types/IProvider';

export const createProvider = createAsyncThunk(
  'provider/createProvider',
  async (provider: IProvider) => {
    try {
      if (!provider.photo) return;
      const bodyFormData = new FormData();
      const photo = provider.photo;
      console.log(photo);
      bodyFormData.append('file', photo);
      delete provider.photo;
      const response = await axios.post('http://localhost:8000/rest/providers', provider);
      await axios({
        method: 'put',
        url: `http://localhost:8000/rest/providers/${response.data.id}/upload`,
        data: bodyFormData,
        headers: {
          'Content-Type': `multipart/form-data;`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);
