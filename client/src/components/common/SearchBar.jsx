import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductByFilters, setFilters } from "../../redux/slices/productsSlice";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = async(e)=>{
    e.preventDefault()
    dispatch(setFilters({ search: searchTerm }))
    dispatch(fetchProductByFilters({search: searchTerm}))
    navigate(`collections/all?search=${searchTerm}`)
    setIsOpen(false)
  }

  return (
    <div
      className={`flex items-center justify-center w-full transition-transform duration-300 ${
        isOpen ? "fixed top-0 left-0 w-full bg-white h-28 sm:h-24 z-50 border-b border-b-gray-200 " : ""
      }`}
    >
      {isOpen ? (
        <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              className="pl-2 bg-gray-100 px-4 py-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 text-gray-600 hover:text-gray-800 transform -translate-y-1/2 cursor-pointer"
            >
              <HiMagnifyingGlass className="h-6 w-6 " />
            </button>
          </div>
          <button
            onClick={handleSearchToggle}
            type="button"
            className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <div onClick={handleSearchToggle} className="cursor-pointer ">
          <HiMagnifyingGlass className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
