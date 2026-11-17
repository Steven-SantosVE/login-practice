import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import userService from '../../api/users'

export const Route = createFileRoute('/__guest/login')({
  component: RouteComponent,
})

const boxShadow = " shadow-[0_0_10px_2px_rgba(147,51,234,0.6),0_0_10px_2px_rgba(37,99,235,0.4),0_0_10px_2px_rgba(239,68,68,0.25)]"

function RouteComponent() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clearForm = () => {
      setName('');
      setPassword('');
  }

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          await userService.login(name, password);
          clearForm();
          navigate({ to: '/' });

          console.log('User loged in successfully:');
      } catch (error) {
          console.error('Error login user:', error);
      }
  }

  return (
    <div className="flex flex-col min-h-screen w-full h-full items-center">
      <div className="w-[90vw] h-[56vh] flex justify-center items-center mt-[20%] rounded-3xl">
        <div id="register-form-container" className={`h-fit w-fit px-4 py-4 bg-gray-700 rounded-4xl ${boxShadow}`}>
          <div className="relative w-fit">
              <div className={`m-5 w-fit rounded-4xl bg-white px-4 py-3 text-[1rem] font-bold text-black ${boxShadow}`}> 
                  Taskora
              </div>        
          </div> 
          <div className="text-white text-center m-10 mt-18">
              <h1 className="text-3xl">
              Log in to your account
              </h1>
              <h2>
              Flow starts here
              </h2>
          </div>
          <form className="flex flex-col w-full justify-center items-center rounded-4xl gap-3 mt-14" onSubmit={handleLogin}>
              <input type="text" placeholder="Username" value={name} onChange={(e)=> setName(e.target.value)} className="bg-white px-4 py-2 rounded-3xl w-[80%]"/>
              <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} className="bg-white px-4 py-2 rounded-3xl w-[80%]"/>
              <input type="submit" value="Login" className="mt-3 bg-[#8B5CF6] hover:bg-[#7C4DD6] font-bold text-white px-6 py-3 w-[80%] rounded-4xl hover:cursor-pointer"/>
          </form>
          <div className="w-full flex my-4 justify-end pr-10 hover:cursor-pointer">
              <div className="flex bg-white w-fit p-4 rounded-4xl">
                  <img className="w-5" src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg" alt="Google Favicon"/>
                  <p className="place-content-center">oogle</p>
              </div>
          </div>
          <div className="text-white flex gap-1 m-6 mt-17">
              <p>Don't have an account?</p>
              <Link to="/register" className="underline">Register</Link>
          </div>
        </div>

        <div className="" id="login-image-container">

        </div>
      </div>
    </div>
  )
}
