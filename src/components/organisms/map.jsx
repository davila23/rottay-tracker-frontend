import bbox from '@turf/bbox'
import React, { useEffect, useState } from 'react'
import ReactMapGL, {
  FlyToInterpolator,
  Layer,
  Source,
  WebMercatorViewport
} from 'react-map-gl'
import styled from 'styled-components'
import { config, useSpring } from 'react-spring'
import { useSelector } from 'react-redux'

import manifest from 'cacodemon/manifest'
import { ShipmentPath } from 'cacodemon/components/molecules'
import { shipmentsToGeoJSON } from 'cacodemon/helpers'

import 'mapbox-gl/dist/mapbox-gl.css'

const Wrapper = styled.div`
  border-radius: 12px;
  box-shadow: -5px 5px 8px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`

const Map = ({ clickedShipmentId, dimensions, shipments }) => {
  const locationsStore = useSelector(state => state.locations)

  const [circleRadius, setCircleRadius] = useState(0)
  const [circleStrokeWidth, setCircleStrokeWidth] = useState(0)
  const [startAnimations, setStartAnimations] = useState(false)
  const [textOpacity, setTextOpacity] = useState(0)
  const [viewport, setViewport] = useState({
    latitude: 5,
    longitude: 0,
    zoom: 1
  })
  const [viewportReady, setViewportReady] = useState(false)

  useEffect(() => {
    if (shipments.length && viewportReady) {
      const [minLng, minLat, maxLng, maxLat] = bbox(
        shipmentsToGeoJSON({
          detailed: !!clickedShipmentId || shipments.length === 1,
          locations: locationsStore,
          shipments: clickedShipmentId
            ? [shipments.find(shipment => shipment.id === clickedShipmentId)]
            : shipments
        })
      )
      const webMercatorViewport = new WebMercatorViewport(viewport)
      const { latitude, longitude, zoom } = webMercatorViewport.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat]
        ],
        { padding: clickedShipmentId ? 50 : 30 }
      )
      setViewport(
        Object.assign({}, viewport, {
          latitude,
          longitude,
          transitionDuration: 500,
          transitionInterpolator: new FlyToInterpolator(),
          zoom
        })
      )
    }
  }, [clickedShipmentId, shipments, viewportReady])

  useEffect(() => {
    if (!viewport.height && !viewport.width) {
      setViewport(
        Object.assign({}, viewport, {
          height: dimensions.height,
          width: dimensions.width
        })
      )
    }
  }, [dimensions])

  useEffect(() => {
    if (viewport.height && viewport.width) {
      setViewportReady(true)
    }
  }, [viewport])

  useSpring({
    config: config.wobbly,
    from: { circleRadius: 0, circleStrokeWidth: 0, textOpacity: 0 },
    onFrame: ({ circleRadius, circleStrokeWidth, textOpacity }) => {
      setCircleRadius(circleRadius)
      setCircleStrokeWidth(circleStrokeWidth)
      setTextOpacity(textOpacity > 1 ? 1 : textOpacity)
    },
    to: {
      circleRadius: startAnimations ? 10 : 0,
      circleStrokeWidth: startAnimations ? 2 : 0,
      textOpacity: startAnimations ? 1 : 0
    }
  })

  const layerCluster = {
    type: 'circle',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': '#6236f3',
      'circle-radius': circleRadius,
      'circle-stroke-color': 'white',
      'circle-stroke-width': circleStrokeWidth
    }
  }

  const layerClusterCount = {
    type: 'symbol',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 10
    },
    paint: {
      'text-color': 'white',
      'text-opacity': textOpacity
    }
  }

  const layerPoint = {
    type: 'circle',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#6236f3',
      'circle-radius': circleRadius / 2,
      'circle-stroke-color': 'white',
      'circle-stroke-width': circleStrokeWidth / 2
    }
  }

  const onLoad = () => {
    setStartAnimations(true)
  }

  return viewportReady ? (
    <Wrapper>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={manifest.mapbox.token}
        onLoad={onLoad}
        onViewportChange={setViewport}
      >
        {!!clickedShipmentId || shipments.length === 1 ? (
          <ShipmentPath
            shipment={
              clickedShipmentId
                ? shipments.find(shipment => shipment.id === clickedShipmentId)
                : shipments[0]
            }
          />
        ) : (
          <Source
            cluster
            data={shipmentsToGeoJSON({
              locations: locationsStore,
              shipments
            })}
            type='geojson'
          >
            <Layer {...layerCluster} />
            <Layer {...layerClusterCount} />
            <Layer {...layerPoint} />
          </Source>
        )}
      </ReactMapGL>
    </Wrapper>
  ) : null
}

export default Map
