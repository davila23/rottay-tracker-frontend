import { createSlice } from '@reduxjs/toolkit'

const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState: {},
  reducers: {
    addShipments (state, action) {
      const shipments = action.payload
      shipments.forEach(shipment => {
        if (!state[shipment.id]) {
          state[shipment.id] = shipment
        }
      })
    },
    updateLegStatus (state, action) {
      const { legIndex, shipmentId, status } = action.payload
      state[shipmentId].legs[legIndex].status = status
    }
  }
})

export const { addShipments, updateLegStatus } = shipmentsSlice.actions

export default shipmentsSlice.reducer
