import greatCircle from '@turf/great-circle'
import midpoint from '@turf/midpoint'
import React from 'react'
import { BsDot as IconLeg } from 'react-icons/bs'
import { FaMapMarkerAlt as IconOrigin } from 'react-icons/fa'
import { getCoordinates, modeToIcon } from 'cacodemon/helpers'
import { GiCheckeredFlag as IconDestination } from 'react-icons/gi'
import { Layer, Marker, Source } from 'react-map-gl'
import { point } from '@turf/helpers'
import { useSelector } from 'react-redux'

const getColor = status => {
  switch (status) {
    case 'ACTIVE':
      return 'blue'
    case 'COMPLETE':
      return 'green'
    case 'INACTIVE':
      return '#999999'
    default:
      return 'black'
  }
}

const ShipmentPath = ({ shipment }) => {
  const locationsStore = useSelector(state => state.locations)

  const coordinates = []

  const points = shipment.legs.map(leg => {
    coordinates.push(
      getCoordinates({
        location: leg.begin,
        locations: locationsStore
      })
    )
    return point([
      coordinates[coordinates.length - 1].lng,
      coordinates[coordinates.length - 1].lat
    ])
  })

  coordinates.push(
    getCoordinates({
      location: shipment.legs[shipment.legs.length - 1].end,
      locations: locationsStore
    })
  )

  points.push(
    point([
      coordinates[coordinates.length - 1].lng,
      coordinates[coordinates.length - 1].lat
    ])
  )

  const modes = points.map(
    (point, index) => points[index + 1] && midpoint(point, points[index + 1])
  )
  modes.pop()

  const paths = points.map(
    (point, index) => points[index + 1] && greatCircle(point, points[index + 1])
  )
  paths.pop()

  return [
    <Marker
      key={`${shipment.id}-origin`}
      latitude={coordinates[0].lat}
      longitude={coordinates[0].lng}
    >
      <IconOrigin
        style={{
          color: '#4020d0',
          fontSize: '2em',
          transform: 'translate(-50%, -100%)'
        }}
      />
    </Marker>,
    ...shipment.legs.map(
      (leg, index) =>
        index !== 0 && (
          <Marker
            key={`${shipment.id}-leg-${index}`}
            latitude={coordinates[index].lat}
            longitude={coordinates[index].lng}
          >
            <IconLeg
              style={{
                color: '#4020d0',
                fontSize: '2em',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </Marker>
        )
    ),
    ...shipment.legs.map((leg, index) => (
      <Marker
        key={`${shipment.id}-mode-${index}`}
        latitude={modes[index].geometry.coordinates[1]}
        longitude={modes[index].geometry.coordinates[0]}
      >
        {modeToIcon(leg.mode, {
          color: getColor(leg.status),
          fontSize: '0.8em',
          transform: 'translate(-50%, -100%)'
        })}
      </Marker>
    )),
    <Marker
      key={`${shipment.id}-destination`}
      latitude={coordinates[coordinates.length - 1].lat}
      longitude={coordinates[coordinates.length - 1].lng}
    >
      <IconDestination
        style={{
          color: '#4020d0',
          fontSize: '2em',
          transform: 'translate(-92%, -100%)'
        }}
      />
    </Marker>,
    <Source
      data={{
        type: 'FeatureCollection',
        features: paths
      }}
      key={`${shipment.id}-paths`}
      type='geojson'
    >
      <Layer
        paint={{
          'line-color': '#bbbbbb'
        }}
        type='line'
      />
    </Source>
  ]
}

export default ShipmentPath
