import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
  data: [],
  loading: false
}


export const fetchCountriesAsync = createAsyncThunk(
  "countries/fetchCountries",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data.message || 'Unknown error';
      rejectWithValue(errorMessage);
    }
  }
);

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountriesAsync.fulfilled, (state, { payload }) => {
      state.loading = false
      state.data = payload
    })
    builder.addCase(fetchCountriesAsync.rejected, (state, action) => {
      console.log(action.payload)
    })
    builder.addCase(fetchCountriesAsync.pending, (state, action) => {        
      state.loading = true
    })
  }
})



export const { updateState } = countriesSlice.actions

export default countriesSlice.reducer