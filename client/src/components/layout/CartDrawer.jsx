import React from 'react'
import { IoMdClose } from 'react-icons/io'
import CartContents from '../cart/CartContents'

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  return (
    <div className={`fixed top-0 right-0 z-50 w-6/7 sm:w-1/2 xl:w-1/4 h-full bg-white shadow-lg transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Main container with flex and scrollable content */}
      <div className="flex flex-col h-full">
        
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleCartDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
          </button>
        </div>

        {/* Cart content (scrollable) */}
        <div className="flex-grow p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <CartContents />
        </div>

      
        <div className="p-4 bg-white">
          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 cursor-pointer transition">
            Checkout
          </button>
          <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
            Shipping, taxes, and discount codes calculated at checkout.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
