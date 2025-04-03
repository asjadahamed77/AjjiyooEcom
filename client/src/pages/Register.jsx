import { useEffect, useState } from "react"
import logo from '../assets/ajjiyoo.png'
import { Link, useLocation, useNavigate } from "react-router-dom"
import registerImg from '../assets/register.webp'
import { register } from "../redux/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { mergeCart } from "../redux/slices/cartSlice"

const Register = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location  = useLocation()
    const {user, guestId} = useSelector((state)=>state.auth)
    const {cart} = useSelector((state)=>state.cart)

    // get redirect parameter and check if its checkout or something
    const redirect = new URLSearchParams(location.search).get('redirect') || '/'
    const isCheckoutRedirect = redirect.includes('checkout')

    useEffect(()=>{
      if(user){
        if(cart?.products?.length > 0 && guestId){
          dispatch(mergeCart({guestId, user})).then(()=>{
            navigate(isCheckoutRedirect ? '/checkout' : "/")
          })
        }else{
          navigate(isCheckoutRedirect ? '/checkout' : "/")
        }
      }
    },[user, cart, guestId, navigate, dispatch, isCheckoutRedirect])


    const handleSubmit = async (e)=> {
        e.preventDefault()
        dispatch(register({name, email, password}))
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
              Enter your name,email and password to register
          </p>
          <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
            type="text"
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:black"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>
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
          <button type="submit" className="bg-black text-white w-full py-2 rounded-lg hover:opacity-80 transition-colors mt-2" >Sign Up</button>
          <p className="mt-6 text-center text-sm"> 
             Already have an account ? <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500 hover:underline transition">Sign In</Link>
          </p>
      </form>
    </div>
    <div className="hidden md:block w-1/2 bg-gray-800">
    <div className="h-full flex flex-col justify-center items-center">
      <img src={registerImg} alt="login" className="h-[750px] w-full object-cover" />
    </div>

    </div>
  </div>
  )
}

export default Register
