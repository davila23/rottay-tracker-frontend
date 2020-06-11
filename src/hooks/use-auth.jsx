import { useContext } from 'react'
import { useDispatch } from 'react-redux'

import { AuthClient } from 'cacodemon/app'
import { updateSession } from 'cacodemon/store/session'

const useAuth = () => {
  const authClient = useContext(AuthClient)
  const dispatch = useDispatch()

  const login = async () => {
    try {
      await authClient.loginWithPopup()
      const user = await authClient.getUser()
      dispatch(updateSession(user))
    } catch (error) {
      if (error.toString() === 'Error: Could not open popup') {
        await authClient.loginWithRedirect()
      } else {
        console.error(error)
      }
    }
  }

  const logout = async () => {
    await authClient.logout({ returnTo: window.location.origin })
  }

  return { login, logout }
}

export default useAuth
