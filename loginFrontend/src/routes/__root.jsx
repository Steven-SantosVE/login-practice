import { Outlet, createRootRoute } from '@tanstack/react-router'

import  Navbar from '../components/layout/Navbar'
import  Footer  from '../components/layout/Footer'

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  ),
})