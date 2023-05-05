import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: 'light',
  checkedStatus: true
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateState: (state, action) =>{
      state.data = action.payload
    },
    updateCheckedStatus: (state, action) =>{
      state.checkedStatus = action.payload
    }
  }
})

 
export const { updateState, updateCheckedStatus } = themeSlice.actions

export default themeSlice.reducer


