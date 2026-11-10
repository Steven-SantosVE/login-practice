import { createFileRoute } from '@tanstack/react-router'
import { Link, Outlet, redirect } from '@tanstack/react-router'
import { useState } from 'react'

const isAuth = false;

export const Route = createFileRoute('/')({
  beforeLoad: () => {
      if (!isAuth) {
          throw redirect({
              to: '/register',
          })
      }
  },

  component: RouteComponent,
})

function RouteComponent() {
  const [userRole, setUserRole] = useState('User'); // Default role is 'user'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-slate-900">
      <div className="text-3xl font-bold text-amber-50 underline decoration-amber-600 decoration-1 underline-offset-10">
        Welcome to my Login project! {userRole}
      </div>
    </div>
  )
}
