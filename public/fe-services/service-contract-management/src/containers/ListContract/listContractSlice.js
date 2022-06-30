import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'listContract',
  initialState: [],
  reducers: {
    fetch(state, action) {
      console.log("fetch","state",state,"action",action)
    }
  }
})

export const { fetch } = slice.actions

export default slice.reducer