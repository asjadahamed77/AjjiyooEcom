
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const TopBar = () => {
  return (
    <div className='bg-[var(--mainColor)]  text-white py-2' >
      <div className=' mx-4 flex items-center justify-center lg:justify-between'>
        <div className='hidden lg:flex items-center gap-4'>
            <a href="" className='hover:text-gray-300'>
                <FaFacebook className='h-5 w-5'/>
            </a>
            <a href="" className='hover:text-gray-300'>
                <FaInstagram className='h-5 w-5'/>
            </a>
            <a href="" className='hover:text-gray-300'>
                <IoLogoWhatsapp className='h-5 w-5'/>
            </a>
        </div>
        <div className='text-xs lg:text-sm text-center'>
            <span>We proudly deliver across Sri Lanka – fast, reliable, and right to your doorstep!</span>
        </div>
        <div className='hidden lg:block text-sm text-center hover:text-gray-300'>
        <a href="tel: +94761257751">
            <span>Call us: +94 76 125 7751</span>
        </a>
        </div>
      </div>
    </div>
  )
}

export default TopBar
