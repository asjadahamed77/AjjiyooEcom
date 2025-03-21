import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/products/FilterSidebar";
import SortOptions from "../components/products/SortOptions";
import ProductGrid from "../components/products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
  const {collection} = useParams()
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const {products, loading, error } = useSelector((state)=> state.products)
  const queryParams = Object.fromEntries([...searchParams])

 
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };


  useEffect(() => {
    
    dispatch(fetchProductByFilters({collection, ...queryParams}))
     
  }, [dispatch,collection,searchParams]);



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading ... </p>;
  }

  if (error) {
    return <p className="text-center text-gray-500">Error: {error} </p>;
  }


  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden w-32 flex justify-center items-center border border-gray-600 p-2 mt-2 ml-2 rounded-2xl "
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } duration-300 transition-all fixed bg-white inset-y-0 left-0 z-50 w-64 overflow-y-auto lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase">All Collections</h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Products */}

        <ProductGrid products={products} loading={loading} error={error} />


      </div>
    </div>
  );
};

export default CollectionPage;
