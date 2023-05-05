import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
  data: null,
  profileId: null
}


export const fetchGoogleAccount = createAsyncThunk(
  'signIn/fetchGoogleAccount',
 async  ( token, { rejectWithValue, dispatch } ) => {
  try{
    const response = await axios
    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
      headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
      }
  })
    dispatch(updateProfileIdState(response.data.id))
    return response.data
  }catch(error) {
      const errorMessage = error.response.data.message || 'Unknown error';
      rejectWithValue (errorMessage)
    }
  }
)



export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    updateProfileIdState: (state, action) =>{
      state.profileId = action.payload
    },
    updateSignInDataState: (state, action) =>{
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoogleAccount.rejected, (state, action) => {
        console.log(action.payload)
      })
      builder.addCase(fetchGoogleAccount.fulfilled, (state, action) =>{
        state.data = action.payload
      })
    }
})

 
export const { updateProfileIdState, updateSignInDataState } = signInSlice.actions

export default signInSlice.reducer