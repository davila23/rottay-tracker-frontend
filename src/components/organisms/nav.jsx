import React from 'react'
import styled from 'styled-components'
import { Avatar, Badge, Button, Input, Menu, Space } from 'antd'
import { IoMdNotificationsOutline as IconBell } from 'react-icons/io'
import { useSelector } from 'react-redux'

import { Logo } from 'cacodemon/components/atoms'
import { useAuth } from 'cacodemon/hooks'

const Home = styled.div`
  align-self: center;
  cursor: pointer;
  display: flex;
  margin-right: 12px;
`

const Left = styled.div`
  display: flex;
`

const Right = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
`

const Wrapper = styled.div`
  display: flex;
  height: 64px;
  justify-content: space-between;
`

const count = Math.floor(Math.random() * 5)

const Nav = ({ search, searching, showQuoteForm }) => {
  const { logout } = useAuth()
  const { picture } = useSelector(state => state.session)

  return (
    <Wrapper>
      <Left>
        <Home onClick={() => console.log('Home clicked!')}>
          <Logo style={{ height: 16 }} />
        </Home>
        <Menu
          defaultSelectedKeys={['1']}
          mode='horizontal'
          style={{ lineHeight: '62px' }}
        >
          <Menu.Item key='1'>Shipments</Menu.Item>
          <Menu.Item key='2'>Analytics</Menu.Item>
        </Menu>
      </Left>
      <Right>
        <Space size='middle'>
          <Button onClick={showQuoteForm} type='primary'>
            Get a quote
          </Button>
          <Input.Search
            allowClear
            loading={searching}
            onChange={event => search(event.currentTarget.value)}
            placeholder='Search'
            style={{ width: 200 }}
          />
          <Badge count={count} offset={[-3, 3]}>
            <IconBell
              style={{
                color: 'gray',
                cursor: 'pointer',
                fontSize: '2em'
              }}
            />
          </Badge>
          <Avatar
            onClick={logout}
            size={32}
            src={picture}
            style={{ cursor: 'pointer' }}
          />
        </Space>
      </Right>
    </Wrapper>
  )
}

export default Nav
