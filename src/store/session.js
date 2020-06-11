import { createSlice } from '@reduxjs/toolkit'
import { omit } from 'lodash'

const ROLES_PROP_NAME = 'https://cargopanel.io/role'

const sessionSlice = createSlice({
  name: 'session',
  initialState: {},
  reducers: {
    updateSession (state, action) {
      const user = action.payload
      const session = {
        ...omit(user, ROLES_PROP_NAME),
        role: user[ROLES_PROP_NAME]
      }
      return session
    }
  }
})

export const { updateSession } = sessionSlice.actions

export default sessionSlice.reducer
