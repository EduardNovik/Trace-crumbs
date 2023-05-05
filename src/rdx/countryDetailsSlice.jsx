import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  data: [],
}


export const countryDetailsSlice = createSlice({
  name: 'countryDetails',
  initialState,
  reducers: {
    updateCountryDetailsState: (state, action) =>{
      state.data = action.payload
    }
  }
})


 
export const { updateCountryDetailsState } = countryDetailsSlice.actions

export default countryDetailsSlice.reducer
