import axios from 'axios'
import { difference } from 'lodash'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import manifest from 'cacodemon/manifest'
import { addLocations } from 'cacodemon/store/locations'
import { addShipments } from 'cacodemon/store/shipments'
import { ApiClients } from 'cacodemon/app'
import { generateFakeShipmentsData } from 'cacodemon/helpers'

const useApi = () => {
  const apiClients = useContext(ApiClients)
  const dispatch = useDispatch()
  const locationsStore = useSelector(state => state.locations)

  // Should this be handled by Mancubus?
  const getAddressInfo = async address => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${manifest.google.maps_api_key}`
    )
    if (
      response.status === 200 &&
      response.data.results.length &&
      response.data.results[0]
    ) {
      return response.data.results[0]
    }
    return {}
  }

  const getLocations = async locodes => {
    const missingLocodes = difference(locodes, Object.keys(locationsStore))
    if (missingLocodes.length) {
      const response = await apiClients.write.apis.geo.getLocations({
        locodes: missingLocodes
      })
      if (response.status === 200) {
        dispatch(addLocations(response.body.locations))
      }
    }
  }

  const getShipments = async () => {
    const shipments = await generateFakeShipmentsData(
      5,
      getAddressInfo,
      getLocations
    )
    dispatch(addShipments(shipments))
  }

  return {
    getAddressInfo,
    getLocations,
    getShipments
  }
}

export default useApi
