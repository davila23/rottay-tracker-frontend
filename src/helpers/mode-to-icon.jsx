import React from 'react'
import {
  FaGlobe as IconDefault,
  FaMotorcycle as IconCourier,
  FaPlane as IconAir,
  FaShip as IconSea,
  FaTrain as IconRail,
  FaTruck as IconRoad
} from 'react-icons/fa'

const modeToIcon = (mode, style = {}) => {
  switch (mode) {
    case 'AIR':
      return <IconAir style={style} />
    case 'COURIER':
      return <IconCourier style={style} />
    case 'RAIL':
      return <IconRail style={style} />
    case 'ROAD':
      return <IconRoad style={style} />
    case 'SEA':
      return <IconSea style={style} />
    default:
      return <IconDefault style={style} />
  }
}

export default modeToIcon
