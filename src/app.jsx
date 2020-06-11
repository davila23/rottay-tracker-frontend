import React, { createContext, useEffect, useState } from 'react'
import Swagger from 'swagger-client'
import { createClient } from 'urql'
import { useDispatch, useSelector } from 'react-redux'

import manifest from 'cacodemon/manifest'
import Router from 'cacodemon/router'
import { createAuthClient } from 'cacodemon/helpers'
import { updateDimensions } from 'cacodemon/store/utils'
import { updateSession } from 'cacodemon/store/session'
import { useDimensions } from 'cacodemon/hooks'

import 'antd/dist/antd.css'

export const ApiClients = createContext()
export const AuthClient = createContext()

const App = () => {
  const dimensions = useDimensions()
  const dispatch = useDispatch()
  const utilsStore = useSelector(state => state.utils)

  const [apiClientRead, setApiClientRead] = useState()
  const [apiClientWrite, setApiClientWrite] = useState()
  const [authClient, setAuthClient] = useState()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const initializeApiRead = async () => {
      try {
        const client = createClient({ url: manifest.api.read })
        setApiClientRead(client)
      } catch (error) {
        console.error(error)
      }
    }
    const initializeApiWrite = async () => {
      try {
        const client = await Swagger({ url: manifest.api.write })
        setApiClientWrite(client)
      } catch (error) {
        console.error(error)
      }
    }
    const initializeAuth = async () => {
      try {
        const authClient = await createAuthClient({
          audience: manifest.auth0.audience,
          client_id: manifest.auth0.client_id,
          domain: manifest.auth0.domain,
          redirect_uri: window.location.origin
        })
        if (
          window.location.search.includes('code=') &&
          window.location.search.includes('state=')
        ) {
          await authClient.handleRedirectCallback()
        }
        const isAuthenticated = await authClient.isAuthenticated()
        if (isAuthenticated) {
          const user = await authClient.getUser()
          dispatch(updateSession(user))
        }
        setAuthClient(authClient)
      } catch (error) {
        console.error(error)
      }
    }
    initializeApiRead()
    initializeApiWrite()
    initializeAuth()
  }, [])

  useEffect(() => {
    dispatch(updateDimensions(dimensions))
  }, [dimensions])

  useEffect(() => {
    if (
      apiClientRead &&
      apiClientWrite &&
      authClient &&
      utilsStore.dimensions
    ) {
      setReady(true)
    }
  }, [apiClientRead, apiClientWrite, authClient, utilsStore.dimensions])

  return ready ? (
    <>
      <style>
        {`
          .ant-space-item {
            display: flex;
          }
          .mapboxgl-ctrl-bottom-left {
            display: none;
          }
          .mapboxgl-ctrl-bottom-right {
            display: none;
          }
          .ReactVirtualized__Grid__innerScrollContainer {
            border-bottom: 1px dashed #cccccc;
          }
        `}
      </style>
      <ApiClients.Provider
        value={{
          read: apiClientRead,
          write: apiClientWrite
        }}
      >
        <AuthClient.Provider value={authClient}>
          <Router />
        </AuthClient.Provider>
      </ApiClients.Provider>
    </>
  ) : null
}

export default App
