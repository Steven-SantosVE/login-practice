import { createFileRoute, redirect, Outlet, useNavigate } from '@tanstack/react-router';
import { useState } from 'react'
import checkAuth from "../../api/auth"
import userService  from "../../api/users"

export const Route = createFileRoute('/__authenticated/')({
  beforeLoad: async () => {
      const isAuth = await checkAuth();

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
  const navigate = useNavigate();

  const handleLogout = async () =>{
    try {
      await userService.logout();
      console.log("User has succesfully been loged out")

      navigate({
        to: "/login",
        replace: true
      });}
    catch (err){
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-slate-900">
      <div className="text-3xl font-bold text-amber-50 underline decoration-amber-600 decoration-1 underline-offset-10">
        Welcome to my Login project! {userRole}
      </div>
      <button onClick={handleLogout} className="p-3 text-white bg-orange-500 rounded-4xl font-semibold hover:cursor-pointer">Log out</button>
    </div>
  )
}
