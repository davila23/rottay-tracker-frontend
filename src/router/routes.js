import { Login, Shipments } from 'cacodemon/components/pages'

const routes = {
  protected: [
    {
      path: '/',
      redirect: '/shipments'
    },
    {
      path: '/shipments',
      component: Shipments
    }
  ],
  public: [
    {
      path: '/login',
      component: Login
    }
  ]
}

export default routes
