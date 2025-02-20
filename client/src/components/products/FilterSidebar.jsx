import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 25000,
  });

  const [priceRange, setPriceRange] = useState([0, 25000]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const brands = [
    "Occo",
    "Ajgooo",
    "Polo",
    "LC",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 25000,
    });

    setPriceRange([0, params.maxPrice || 25000]);
  }, [searchParams]);

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>
      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              className="h-4 w-4 mr-2 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700 text-sm">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              className="h-4 w-4 mr-2 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700 text-sm">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              className="w-8 h-8 rounded-full transition duration-300 hover:scale-105 border border-gray-600 cursor-pointer"
              style={{backgroundColor: color.toLowerCase()}}
            ></button>
          ))}
        </div>
      </div>
      {/* Size Filter */}
      <div className="mb-6">
      <label className="block text-gray-600 font-medium mb-2">Size</label>
      {
        sizes.map((size)=>(
            <div key={size} className="flex items-center mb-1">
               <input type="checkbox" name="size" className="mr-2 h-4 w-4  text-blue-500 focus:ring-blue-400 border-gray-300" />
               <span className="text-gray-600">{size}</span>
            </div>
        ))
      }
      </div>

      <div className="mb-6">
      <label className="block text-gray-600 font-medium mb-2">Material</label>
      {
        materials.map((material)=>(
            <div key={material} className="flex items-center mb-1">
               <input type="checkbox" name="material" className="mr-2 h-4 w-4  text-blue-500 focus:ring-blue-400 border-gray-300" />
               <span className="text-gray-600">{material}</span>
            </div>
        ))
      }
      </div>

      <div className="mb-6">
      <label className="block text-gray-600 font-medium mb-2">Size</label>
      {
        brands.map((brand)=>(
            <div key={brand} className="flex items-center mb-1">
               <input type="checkbox" name="brand" className="mr-2 h-4 w-4  text-blue-500 focus:ring-blue-400 border-gray-300" />
               <span className="text-gray-600">{brand}</span>
            </div>
        ))
      }
      </div>

      {/* Price Range */}
      <div className="mb-8">
      <label className="block text-gray-600 font-medium mb-2">Price Range</label>
      <input type="range" name="priceRange" min={0} max={25000} className="w-full h-2 rounded-lg bg-gray-300 appearance-none cursor-pointer" />
      <div className="flex justify-between text-gray-600 mt-2">
<span>Rs.0</span>
<span>Rs.{priceRange[1]}</span>
      </div>
      </div>

    </div>
  );
};

export default FilterSidebar;
