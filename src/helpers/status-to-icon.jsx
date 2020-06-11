import React from 'react'
import {
  FaCheckCircle as IconComplete,
  FaClock as IconActive,
  FaGlobe as IconDefault,
  FaTimesCircle as IconInactive
} from 'react-icons/fa'

import theme from 'cacodemon/theme'

const statusToIcon = status => {
  switch (status) {
    case 'ACTIVE':
      return <IconActive style={{ color: theme.status.active }} />
    case 'COMPLETE':
      return <IconComplete style={{ color: theme.status.complete }} />
    case 'INACTIVE':
      return <IconInactive style={{ color: theme.status.inactive }} />
    default:
      return <IconDefault />
  }
}

export default statusToIcon
