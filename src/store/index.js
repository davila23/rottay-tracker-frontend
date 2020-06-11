import { configureStore } from '@reduxjs/toolkit'

import locations from './locations'
import session from './session'
import shipments from './shipments'
import utils from './utils'

const store = configureStore({
  devTools: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  reducer: {
    locations,
    session,
    shipments,
    utils
  }
})

export default store
