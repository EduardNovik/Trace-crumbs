import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
  data: [],
  loading: false
}


export const fetchPhotosAsync = createAsyncThunk(
  "photos/fetchPhotos",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}`);
      return response.data.results;
    } catch (error) {
      const errorMessage = error.response.data.message || "Unknown error";
      rejectWithValue(errorMessage);
    }
  }
);


export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    updatePhotosState: (state, action) =>{
      state.data = action.payload
      console.log(state.data)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPhotosAsync.fulfilled, (state, { payload }) => {
      state.loading = false
      state.data = payload
    })
    builder.addCase(fetchPhotosAsync.rejected, (state, action) => {
      console.log(action.payload)
    })
    builder.addCase(fetchPhotosAsync.pending, (state, action) => {        
      state.loading = true
    })
  }
})


export const { updatePhotosState } = photosSlice.actions

export default photosSlice.reducer