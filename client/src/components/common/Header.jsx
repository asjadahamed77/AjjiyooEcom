import React from 'react'
import TopBar from '../layout/TopBar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='border-b border-gray-200'>
      <TopBar />
      <Navbar />                    
    </div>
  )
}

export default Header
