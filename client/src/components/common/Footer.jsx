import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t pt-12 pb-8 ">
      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 lg:px-12" >
      <div>
        <h3 className="text-xl font-medium text-gray-800 mb-4">Newsletter</h3>
        <p className="text-gray-500 mb-4 text-sm">
    Be the first to hear about new products, exclusive events, and online offers.
        </p>
        <p className="text-sm">Sign up and get 10% off on your first order.</p>
        <form className="flex mt-2">
          <input type="email" placeholder="Enter your email" className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md transition-all focus:outline-none focus:ring-2 focus:ring-gray-500" required />
          <button type="submit" className="bg-black text-white px-6 py-3 rounded-r-md cursor-pointer text-sm  hover:bg-gray-800">Subscribe</button>
        </form>
      </div>
      <div>
      <h3 className="text-xl font-medium text-gray-800 mb-4">Shop</h3>
      <ul className="space-y-2 text-gray-600">
    <li>
      <Link to={'/'} className='hover:text-gray-800 transition-colors'>Men's Top wear </Link>
    </li>
    <li>
      <Link to={'/'} className='hover:text-gray-800 transition-colors'>Women's Top wear</Link>
    </li>
    <li>
      <Link to={'/'} className='hover:text-gray-800 transition-colors'>Men's Bottom wear</Link>
    </li>
    <li>
      <Link to={'/'} className='hover:text-gray-800 transition-colors' >Women's Bottom wear</Link>
    </li>
      </ul>
      </div>
      <div>
      <h3 className="text-xl font-medium text-gray-800 mb-4">Support</h3>
      <ul className="space-y-2 text-gray-600">
    <li>
      <Link to={'/'} className='hover:text-gray-800 transition-colors'>Contact us</Link>
    </li>
    <li>
      <Link to={'/'} className='hover:text-gray-800 transition-colors'>About us</Link>
    </li>
    <li>
      <Link to={'/'} className='hover:text-gray-800 transition-colors'>FAQs</Link>
    </li>
    <li>
      <Link to={'/'} className='hover:text-gray-800 transition-colors' >Features</Link>
    </li>
      </ul>
      </div>
      <div>
      <h3 className="text-xl font-medium text-gray-800 mb-4">Follow us</h3>
      <div className='flex items-center space-x-4 mb-6'>
<a href="#" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
<FaFacebook className='h-5 w-5'/>
</a>
<a href="#" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
<FaInstagram className='h-5 w-5'/>
</a>
<a href="#" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
<IoLogoWhatsapp className='h-5 w-5'/>
</a>
      </div>
      <p className='text-gray-500'>Call us</p>
      <p>
        <FiPhoneCall className='inline-block mr-2' />
        +94 76 125 7751
      </p>
      </div>
      </div>
      <div className='mx-auto mt-12 border-t border-gray-200 pt-6'> 
    <p className='text-gray-500 text-center tracking-tighter text-sm'>© 2025, Ajjiyoo. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
