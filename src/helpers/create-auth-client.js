import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js'

const createAuthClient = async options => {
  let auth0
  try {
    auth0 = await createAuth0Client(options)
  } catch (error) {
    if (error.error !== 'consent_required') {
      throw error
    }
    auth0 = new Auth0Client(options)
  }
  return auth0
}

export default createAuthClient
