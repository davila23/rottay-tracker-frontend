import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { debounce } from 'lodash'
import { Layout } from 'antd'
import { useSelector } from 'react-redux'

import AssetBackground from 'cacodemon/assets/background.jpg'
import { List, Map, Nav, Tasks } from 'cacodemon/components/organisms'
import { QuoteForm } from 'cacodemon/components/molecules'
import { useApi } from 'cacodemon/hooks'

const Background = styled.div`
  background-image: url(${AssetBackground});
  background-repeat: no-repeat;
  background-size: cover;
  height: ${({ height }) => height};
`

const Shipments = () => {
  const api = useApi()
  const shipmentsStore = useSelector(state => state.shipments)
  const utilsStore = useSelector(state => state.utils)

  const [clickedShipmentId, setClickedShipmentId] = useState()
  const [dimensions, setDimensions] = useState()
  const [isQuoteFormVisible, setQuoteFormVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const [searching, setSearching] = useState(false)
  const [shipments, setShipments] = useState([])

  useEffect(() => {
    api.getShipments()
  }, [])

  useEffect(() => {
    if (dimensions) {
      setReady(true)
    }
  }, [dimensions])

  useEffect(() => {
    const shipments = Object.values(shipmentsStore)
    if (shipments.length) {
      setShipments(shipments)
    }
  }, [shipmentsStore])

  useEffect(() => {
    if (utilsStore.dimensions) {
      const height = utilsStore.dimensions.height - 64
      const width = utilsStore.dimensions.width
      const leftWidth = Math.floor(width * 0.3)
      const dimensionsMap = {
        width: leftWidth > 392 ? leftWidth : 392
      }
      dimensionsMap.height = Math.floor(dimensionsMap.width * 0.75)
      const dimensionsList = {
        height,
        width: width - dimensionsMap.width
      }
      const dimensionsTasks = {
        height: height - dimensionsMap.height,
        width: dimensionsMap.width
      }
      setDimensions({
        height,
        list: dimensionsList,
        map: dimensionsMap,
        tasks: dimensionsTasks,
        width
      })
    }
  }, [utilsStore.dimensions])

  const onCancel = () => {
    setQuoteFormVisible(false)
  }

  const onOk = quote => {
    console.log('quote', quote)
    setQuoteFormVisible(false)
  }

  const search = debounce(value => {
    if (value.length) {
      setSearching(true)
      console.log(`Searching ${value}`)
    } else {
      setSearching(false)
    }
  }, 300)

  const showQuoteForm = () => {
    setQuoteFormVisible(true)
  }

  return ready ? (
    <Layout>
      <QuoteForm onCancel={onCancel} onOk={onOk} visible={isQuoteFormVisible} />
      <Layout.Header
        style={{
          backgroundColor: 'white',
          boxShadow: '0 5px 8px 5px rgba(0, 0, 0, 0.2)',
          padding: '0 24px',
          zIndex: 1
        }}
      >
        <Nav
          search={search}
          searching={searching}
          showQuoteForm={showQuoteForm}
        />
      </Layout.Header>
      <Layout.Content>
        <Background height={dimensions.height}>
          <table style={{ height: dimensions.height, width: dimensions.width }}>
            <tbody>
              <tr>
                <td
                  style={{
                    height: dimensions.map.height,
                    padding: 20,
                    width: dimensions.map.width
                  }}
                >
                  <Map
                    clickedShipmentId={clickedShipmentId}
                    dimensions={{
                      height: dimensions.map.height - 40,
                      width: dimensions.map.width - 40
                    }}
                    shipments={shipments}
                  />
                </td>
                <td
                  rowSpan='2'
                  style={{
                    height: dimensions.list.height,
                    padding: '20px 20px 20px 0',
                    width: dimensions.list.width
                  }}
                >
                  <List
                    clickedShipmentId={clickedShipmentId}
                    setClickedShipmentId={setClickedShipmentId}
                    shipments={shipments}
                  />
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    height: dimensions.tasks.height,
                    padding: '0 20px 20px 20px',
                    width: dimensions.tasks.width
                  }}
                >
                  <Tasks />
                </td>
              </tr>
            </tbody>
          </table>
        </Background>
      </Layout.Content>
    </Layout>
  ) : null
}

export default Shipments
