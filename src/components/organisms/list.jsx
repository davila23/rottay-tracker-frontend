import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { AutoSizer, List as RVList } from 'react-virtualized'
import { Empty } from 'antd'

import { Shipment } from 'cacodemon/components/molecules'

import 'react-virtualized/styles.css'

const Wrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 5px 5px 8px 5px rgba(0, 0, 0, 0.2);
  height: 100%;
  overflow: hidden;
`

const List = ({ clickedShipmentId, setClickedShipmentId, shipments }) => {
  const [clickedShipmentRowHeight, setClickedShipmentRowHeight] = useState()
  const [hoveredShipment, setHoveredShipment] = useState()

  const listRef = useRef()

  useEffect(() => {
    listRef.current.recomputeRowHeights()
  }, [clickedShipmentId, clickedShipmentRowHeight])

  const getRowHeight = shipmentId =>
    shipmentId === clickedShipmentId && clickedShipmentRowHeight
      ? clickedShipmentRowHeight + 40
      : 156

  const rowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <Shipment
          clickedShipmentId={clickedShipmentId}
          getRowHeight={getRowHeight}
          hoveredShipment={hoveredShipment}
          setClickedShipmentId={setClickedShipmentId}
          setClickedShipmentRowHeight={setClickedShipmentRowHeight}
          setHoveredShipment={setHoveredShipment}
          shipment={shipments[index]}
        />
      </div>
    )
  }

  return (
    <Wrapper>
      <AutoSizer>
        {({ height, width }) => (
          <RVList
            height={height}
            noRowsRenderer={() => (
              <Empty
                description='No Shipments'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'center'
                }}
              />
            )}
            ref={listRef}
            rowCount={shipments.length}
            rowHeight={({ index }) => getRowHeight(shipments[index].id)}
            rowRenderer={rowRenderer}
            style={{ outline: 'none' }}
            width={width}
          />
        )}
      </AutoSizer>
    </Wrapper>
  )
}

export default List
