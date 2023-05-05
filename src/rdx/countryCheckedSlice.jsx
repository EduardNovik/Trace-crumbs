import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  data: {}
}


export const countryCheckedSlice = createSlice({
  name: 'countryChecked',
  initialState,
  reducers: {
    updateCountryCheckedState: (state, action) =>{
      state.data = action.payload
    }
  }
})


 
export const { updateCountryCheckedState } = countryCheckedSlice.actions

export default countryCheckedSlice.reducer
