import React from 'react'
import logo from '../../assets/ajjiyoo.png'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from 'react-icons/hi2'
const Navbar = () => {
  return (
    <div className='flex items-center justify-between mx-12'>
      <Link to={'/'}>
        <img src={logo} alt="ajjiyoo" className='w-36' />
      </Link>
      <div className='hidden lg:flex items-center gap-6 text-sm text-gray-600'>
        <Link to={'/'} className='hover:opacity-80'>HOME</Link>
        <Link to={'/men'} className='hover:opacity-80'>MEN</Link>
        <Link to={'/women'} className='hover:opacity-80'>WOMEN</Link>
        <Link to={'/top-wear'} className='hover:opacity-80'>TOP WEAR</Link>
        <Link to={'/bottom-wear'} className='hover:opacity-80'>BOTTOM WEAR</Link>
      </div>
      <div className='flex items-center gap-4'>
        <Link to={'/profile'} className='hover:text-black'>
        <HiOutlineUser className='h-6 w-6 text-gray-600' />
        </Link>
        <div className='relative hover:text-black cursor-pointer '>
        <HiOutlineShoppingBag className='h-6 w-6 text-gray-600' />
        <span className='absolute bg-[var(--mainColor)] text-white text-[10px] rounded-full -top-1 -right-2 px-2 py-0.5 '>4</span>
        </div>
        <div className='block lg:hidden hover:text-black cursor-pointer '>
          <HiBars3BottomRight className='h-6 w-6 text-gray-600'  />
        </div>
      </div>
    </div>
  )
}

export default Navbar
