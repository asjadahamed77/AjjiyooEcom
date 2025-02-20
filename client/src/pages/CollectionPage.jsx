import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/products/FilterSidebar";
import SortOptions from "../components/products/SortOptions";
import ProductGrid from "../components/products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Stylish Jacket",
          price: 1750,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=1",
              altText: "Stylish",
            },
          ],
        },
        {
          _id: 2,
          name: "Casual Shirt",
          price: 1250,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=2",
              altText: "Casual",
            },
          ],
        },
        {
          _id: 3,
          name: "Elegant Dress",
          price: 2450,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=3",
              altText: "Elegant",
            },
          ],
        },
        {
          _id: 4,
          name: "Classic Jeans",
          price: 1600,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=4",
              altText: "Classic",
            },
          ],
        },
        {
          _id: 5,
          name: "Leather Jacket",
          price: 3200,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=5",
              altText: "Leather",
            },
          ],
        },
        {
          _id: 6,
          name: "Formal Suit",
          price: 4500,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=6",
              altText: "Formal",
            },
          ],
        },
        {
          _id: 7,
          name: "Summer T-Shirt",
          price: 850,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=7",
              altText: "Summer",
            },
          ],
        },
        {
          _id: 8,
          name: "Winter Coat",
          price: 3900,
          images: [
            {
              url: "https://picsum.photos/500/500/?random=8",
              altText: "Winter",
            },
          ],
        },
      ];

      setProducts(fetchedProducts);
    }, 1000);
  }, []);

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
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Products */}

        <ProductGrid products={products} />


      </div>
    </div>
  );
};

export default CollectionPage;
