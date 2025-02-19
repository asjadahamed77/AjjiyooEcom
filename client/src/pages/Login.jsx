import { useState } from "react"
import logo from '../assets/ajjiyoo.png'
import { Link } from "react-router-dom"
import loginImg from '../assets/login.webp'
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = async (e)=> {
        e.preventDefault()
    }

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-lg border shadow-sm">
            <div className="flex justify-center mb-6">
                <img src={logo} alt="ajjiyoologo" className="w-36" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">Hi there! ✋🏻</h2>
            <p className="text-center mb-6">
                Enter your username and password to login
            </p>
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
              type="email"
              className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:black"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Password</label>
                <input
              type="password"
              className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>
            <button type="submit" className="bg-black text-white w-full py-2 rounded-lg hover:opacity-80 transition-colors mt-2" >Sign In</button>
            <p className="mt-6 text-center text-sm"> 
                Do not have an account ? <Link to={'/register'} className="text-blue-500 hover:underline transition">Sign Up</Link>
            </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800">
      <div className="h-full flex flex-col justify-center items-center">
        <img src={loginImg} alt="login" className="h-[750px] w-full object-cover" />
      </div>

      </div>
    </div>
  )
}

export default Login
