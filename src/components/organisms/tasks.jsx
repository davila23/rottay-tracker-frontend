import React from 'react'
import styled from 'styled-components'
import { Empty } from 'antd'

const Wrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: -5px 5px 8px 5px rgba(0, 0, 0, 0.2);
  height: 100%;
  overflow: hidden;
`

const Tasks = () => {
  return (
    <Wrapper>
      <Empty
        description='No Tasks'
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      />
    </Wrapper>
  )
}

export default Tasks
