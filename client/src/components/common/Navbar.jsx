import React, { useState } from "react";
import logo from "../../assets/ajjiyoo.png";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between mx-12">
        <Link to={"/"}>
          <img src={logo} alt="ajjiyoo" className="w-36" />
        </Link>
        <div className="hidden lg:flex items-center gap-6 text-sm text-gray-600">
          <Link to={"/"} className="hover:opacity-80">
            HOME
          </Link>
          <Link to={"/collections/all?gender=Men"} className="hover:opacity-80">
            MEN
          </Link>
          <Link
            to={"/collections/all?gender=Women"}
            className="hover:opacity-80"
          >
            WOMEN
          </Link>
          <Link
            to={"/collections/all?category=Top Wear"}
            className="hover:opacity-80"
          >
            TOP WEAR
          </Link>
          <Link
            to={"/collections/all?category=Bottom Wear"}
            className="hover:opacity-80"
          >
            BOTTOM WEAR
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to={"/admin"}
            className="block bg-black text-white text-sm px-2 py-1 rounded-full"
          >
            ADMIN
          </Link>
          <Link to={"/profile"} className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-600" />
          </Link>
          <div
            onClick={toggleCartDrawer}
            className="relative hover:text-black cursor-pointer "
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-600" />
            {
              cartItemCount > 0 && (
                <span className="absolute bg-[var(--mainColor)] text-white text-[10px] rounded-full -top-1 -right-2 px-2 py-0.5 ">
              {cartItemCount}
            </span>
              )
            }
          </div>
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <div
            onClick={toggleNavDrawer}
            className="block lg:hidden hover:text-black cursor-pointer "
          >
            <HiBars3BottomRight className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* mobile navigations */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-2/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4 ">
          <IoMdClose
            onClick={toggleNavDrawer}
            className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">MENU</h2>
          <div className="flex flex-col gap-4">
            <Link
              to={"/"}
              onClick={toggleNavDrawer}
              className="text-gray-600 hover:text-gray-800"
            >
              HOME
            </Link>
            <Link
              to={"/collections/all?gender=Men"}
              onClick={toggleNavDrawer}
              className="text-gray-600 hover:text-gray-800"
            >
              MEN
            </Link>
            <Link
              to={"/collections/all?gender=Women"}
              onClick={toggleNavDrawer}
              className="text-gray-600 hover:text-gray-800"
            >
              WOMEN
            </Link>
            <Link
              to={"/collections/all?category=Top Wear"}
              onClick={toggleNavDrawer}
              className="text-gray-600 hover:text-gray-800"
            >
              TOP WEAR
            </Link>
            <Link
              to={"/collections/all?category=Bottom Wear"}
              onClick={toggleNavDrawer}
              className="text-gray-600 hover:text-gray-800"
            >
              BOTTOM WEAR
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
