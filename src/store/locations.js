import { createSlice } from '@reduxjs/toolkit'

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {},
  reducers: {
    addLocations (state, action) {
      const locations = action.payload
      return Object.assign({}, state, locations)
    }
  }
})

export const { addLocations } = locationsSlice.actions

export default locationsSlice.reducer
