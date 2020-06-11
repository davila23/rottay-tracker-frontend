import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Col, Progress, Row, Space, Statistic, Steps } from 'antd'
import { config, useSpring } from 'react-spring'
import { FaMapMarkerAlt as IconOrigin } from 'react-icons/fa'
import { findDOMNode } from 'react-dom'
import { fromUnixTime } from 'date-fns'
import { GiCheckeredFlag as IconDestination } from 'react-icons/gi'
import { MdDone as IconComplete } from 'react-icons/md'
import { StaticMap } from 'react-map-gl'
import { TiArrowRight as IconArrow } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'

import manifest from 'cacodemon/manifest'
import { getCoordinates, modeToIcon } from 'cacodemon/helpers'
import { updateLegStatus } from 'cacodemon/store/shipments'

import 'typeface-gaegu'
import 'typeface-ubuntu-mono'

const Id = styled.div`
  color: white;
  font-family: 'Gaegu', cursive;
`

const Legs = styled.div`
  transform-origin: left top;
  transform: scale(0.8);
`

const LegTitle = styled.div`
  align-items: center;
  display: flex;
`

const WrapperLegs = styled.div`
  margin-top: 12px;
  padding-top: 3px;
`

const WrapperMap = styled.div`
  border-radius: 50px;
  height: 100px;
  margin-left: 14px;
  margin-top: 14px;
  overflow: hidden;
  width: 100px;
`

const WrapperProgress = styled.div`
  left: 12px;
  position: absolute;
  top: 12px;
`

const WrapperText = styled.div`
  align-items: flex-end;
  display: flex;
  height: 28px;
  margin-left: 12px;
  padding-left: 3px;
`

const Shipment = ({
  clickedShipmentId,
  getRowHeight,
  hoveredShipment,
  setClickedShipmentId,
  setClickedShipmentRowHeight,
  setHoveredShipment,
  shipment
}) => {
  const dispatch = useDispatch()
  const locationsStore = useSelector(state => state.locations)

  const [animatedProgress, setAnimatedProgress] = useState(0)
  const [coordinates, setCoordinates] = useState()
  const [currentLegIndex, setCurrentLegIndex] = useState(0)
  const [hasFinished, setHasFinished] = useState(false)
  const [progress, setProgress] = useState(0)
  const [spring, setSpring] = useState({
    config: config.wobbly,
    onFrame: ({ progress }) => setAnimatedProgress(progress)
  })
  const [step, setStep] = useState(0)

  const stepsRef = useRef()

  useEffect(() => {
    setCoordinates(shipment.legs[0].begin.coordinates)
  }, [])

  useEffect(() => {
    if (shipment.id === clickedShipmentId && stepsRef.current) {
      const height = findDOMNode(stepsRef.current).getBoundingClientRect()
        .height
      setClickedShipmentRowHeight(height)
    }
  }, [clickedShipmentId, stepsRef.current])

  useEffect(() => {
    if (!hasFinished) {
      setTimeout(() => {
        if (shipment.legs[currentLegIndex].status === 'INACTIVE') {
          dispatch(
            updateLegStatus({
              legIndex: currentLegIndex,
              shipmentId: shipment.id,
              status: 'ACTIVE'
            })
          )
          setCoordinates(
            getCoordinates({
              location: shipment.legs[currentLegIndex].begin,
              locations: locationsStore
            })
          )
          setStep(step + 1)
        } else if (shipment.legs[currentLegIndex].status === 'ACTIVE') {
          dispatch(
            updateLegStatus({
              legIndex: currentLegIndex,
              shipmentId: shipment.id,
              status: 'COMPLETE'
            })
          )
          setCoordinates(
            getCoordinates({
              location: shipment.legs[currentLegIndex].end,
              locations: locationsStore
            })
          )
          if (currentLegIndex < shipment.legs.length - 1) {
            setCurrentLegIndex(currentLegIndex + 1)
          } else {
            setHasFinished(true)
          }
          setStep(step + 1)
        }
      }, (Math.floor(Math.random() * 51) + 10) * 1000)
    }
  }, [progress])

  useEffect(() => {
    if (step > 0) {
      const progress =
        1 + Math.round(((step - 1) * 99) / (shipment.legs.length * 2 - 1))
      setProgress(progress)
      setSpring(Object.assign({}, spring, { to: { progress } }))
    }
  }, [step])

  useSpring(spring)

  const getCurrentStep = () => {
    if (shipment.id === clickedShipmentId) {
      return currentLegIndex + (step % 2) + (hasFinished ? 2 : 0)
    } else if (step > 0) {
      if (hasFinished) {
        return 2
      }
      return 1
    }
    return 0
  }

  const getLegTitle = leg => {
    const begin =
      typeof leg.begin !== 'string'
        ? 'Origin'
        : `${locationsStore[leg.begin].name} (${leg.begin})`
    const end =
      typeof leg.end !== 'string'
        ? 'Destination'
        : `${locationsStore[leg.end].name} (${leg.end})`
    return (
      <LegTitle>
        <Space size='small'>
          {begin}
          <IconArrow style={{ fontSize: '1.3em', marginLeft: -3 }} />
          {end}
          {leg.status === 'ACTIVE' && (
            <Statistic.Countdown
              format='D:HH:mm:ss'
              value={fromUnixTime(leg.eta)}
              valueStyle={{
                color: '#999999',
                fontFamily: '"Ubuntu Mono", monospace',
                fontSize: '1em',
                marginLeft: 8
              }}
            />
          )}
          {leg.status === 'COMPLETE' && (
            <IconComplete style={{ color: 'green', fontSize: '1.3em' }} />
          )}
        </Space>
      </LegTitle>
    )
  }

  const getSingleLeg = () => {
    const active = shipment.legs.find(leg => leg.status === 'ACTIVE')
    const completed = shipment.legs.filter(leg => leg.status === 'COMPLETE')
    const inactive = shipment.legs.filter(leg => leg.status === 'INACTIVE')
    return active || completed[completed.length - 1] || inactive[0]
  }

  const onClick = () => {
    if (clickedShipmentId !== shipment.id) {
      setClickedShipmentId(shipment.id)
    } else {
      setClickedShipmentId()
    }
  }

  const onMouseEnter = () => {
    if (hoveredShipment !== shipment.id) {
      setHoveredShipment(shipment.id)
    }
  }

  const onMouseLeave = () => {
    setHoveredShipment()
  }

  const rowHeight = getRowHeight(shipment.id)

  return coordinates ? (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Row
        style={{
          backgroundColor:
            shipment.id === hoveredShipment ? '#4020d0' : '#333333',
          cursor: 'pointer',
          height: 28
        }}
      >
        <Col span={12} style={{ display: 'flex', height: 28 }}>
          <WrapperText>
            <Id>{shipment.id}</Id>
          </WrapperText>
        </Col>
        <Col
          span={12}
          style={{
            alignItems: 'center',
            display: 'flex',
            height: 28,
            justifyContent: 'flex-end',
            paddingRight: 15
          }}
        >
          <Space>
            <Statistic.Countdown
              format='D:HH:mm:ss'
              value={fromUnixTime(shipment.legs[shipment.legs.length - 1].eta)}
              valueStyle={{
                color: '#999999',
                fontFamily: '"Ubuntu Mono", monospace',
                fontSize: '0.7em'
              }}
            />
            <Progress
              percent={animatedProgress}
              showInfo={false}
              size='small'
              steps={shipment.legs.length}
              strokeColor={animatedProgress === 100 ? '#72c040' : '#4091f7'}
            />
          </Space>
        </Col>
      </Row>
      <Row
        style={{
          backgroundColor:
            shipment.id === clickedShipmentId ? 'yellow' : '#fcf6f0',
          cursor: 'pointer',
          height: rowHeight - 28
        }}
      >
        <Col flex='128px' style={{ height: rowHeight - 28 }}>
          <WrapperMap>
            <StaticMap
              height={100}
              latitude={coordinates.lat}
              longitude={coordinates.lng}
              mapboxApiAccessToken={manifest.mapbox.token}
              width={100}
              zoom={3}
            />
          </WrapperMap>
          <WrapperProgress>
            <Progress
              percent={animatedProgress}
              showInfo={false}
              strokeLinecap='square'
              type='circle'
              strokeWidth={2}
              width={102}
            />
          </WrapperProgress>
        </Col>
        <Col flex='auto' style={{ height: rowHeight - 28 }}>
          <WrapperLegs>
            <Legs>
              <Steps
                current={getCurrentStep()}
                direction='vertical'
                ref={stepsRef}
                size='small'
              >
                <Steps.Step icon={<IconOrigin />} title={shipment.origin} />
                {shipment.id === clickedShipmentId ? (
                  shipment.legs.map((leg, index) => (
                    <Steps.Step
                      icon={modeToIcon(leg.mode)}
                      key={`${shipment.id}-${index}`}
                      title={getLegTitle(leg)}
                    />
                  ))
                ) : (
                  <Steps.Step
                    icon={modeToIcon(getSingleLeg().mode)}
                    title={getLegTitle(getSingleLeg())}
                  />
                )}
                <Steps.Step
                  icon={<IconDestination />}
                  title={shipment.destination}
                />
              </Steps>
            </Legs>
          </WrapperLegs>
        </Col>
      </Row>
    </div>
  ) : null
}

export default Shipment
