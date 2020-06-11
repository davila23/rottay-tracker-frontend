import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

import AssetBackgroundLogin from 'cacodemon/assets/background-login.png'
import { Logo } from 'cacodemon/components/atoms'
import { useAuth } from 'cacodemon/hooks'

const Background = styled.div`
  background-image: url(${AssetBackgroundLogin});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`

const Panel = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  min-width: 320px;
  width: 32vw;
`

const Login = () => {
  const { login } = useAuth()

  return (
    <Background>
      <Panel>
        <Logo style={{ fill: '#4020d0', marginBottom: 24, width: 250 }} />
        <div style={{ width: 200 }}>
          <Button block onClick={login} type='primary'>
            Login
          </Button>
        </div>
      </Panel>
    </Background>
  )
}

export default Login
