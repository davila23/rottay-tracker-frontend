import React from 'react'
import styled from 'styled-components'

import { Logo } from 'cacodemon/components/atoms'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
`

const NotFound = () => (
  <Wrapper>
    <Logo style={{ fill: '#4020d0', height: 128 }} />
    <p style={{ marginTop: -30 }}>404 NOT FOUND :(</p>
  </Wrapper>
)

export default NotFound
