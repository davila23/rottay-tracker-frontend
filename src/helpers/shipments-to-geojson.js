import { getCoordinates } from 'cacodemon/helpers'

const shipmentsToGeoJSON = ({ detailed = false, locations, shipments }) => {
  if (detailed) {
    const coordinatesDestination = getCoordinates({
      location: shipments[0].legs[shipments[0].legs.length - 1].end,
      locations
    })
    return {
      type: 'FeatureCollection',
      features: [
        ...shipments[0].legs.map((leg, index) => {
          const coordinates = getCoordinates({
            location: leg.begin,
            locations
          })
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: Object.values(coordinates).reverse()
            },
            properties: { id: `${shipments[0].id}-${index}` }
          }
        }),
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: Object.values(coordinatesDestination).reverse()
          },
          properties: { id: `${shipments[0].id}-${shipments[0].legs.length}` }
        }
      ]
    }
  } else {
    return {
      type: 'FeatureCollection',
      features: [
        ...shipments.map(shipment => {
          const coordinates = getCoordinates({
            location: shipment.legs[shipment.legs.length - 1].end,
            locations
          })
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: Object.values(coordinates).reverse()
            },
            properties: { id: shipment.id }
          }
        })
      ]
    }
  }
}

export default shipmentsToGeoJSON
