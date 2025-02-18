import { useEffect, useState } from "react";
import { toast } from "sonner";

const selectedProduct = {
  name: "Stylish Jacket",
  price: 1200,
  originalPrice: 1500,
  brand: "Puma",
  description:
    "This is a ultra super leather material Stylish jacket which was made at America,",
  material: "Leather Material",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],
  images: [
    { url: "https://picsum.photos/500/500/?random=1", altText: "Stylish" },
    { url: "https://picsum.photos/500/500/?random=2", altText: "Stylish" },
  ],
};

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }
    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddtoCart = ()=>{
    if(!selectedColor || !selectedSize){
        toast.error("Please select a size and color!!!")
    }
  }

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  return (
    <div className="sm:p-6">
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnail */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || "image"}
                className={`w-16 h-16 rounded-lg border cursor-pointer ${
                  mainImage === image.url
                    ? "border-2 border-black p-0.5"
                    : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="main"
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>
          </div>
          {/* Mobile Thumbnail */}
          <div className="md:hidden flex overscroll-x-scroll mb-4 space-x-4 ">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || "image"}
                className={`w-16 h-16 rounded-lg border cursor-pointer ${
                  mainImage === image.url
                    ? "border-2 border-black p-0.5"
                    : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Right Side */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              Rs.{selectedProduct.originalPrice}
            </p>
            <p className="text-xl text-gray-500 mb-2 ">
              Rs.{selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border cursor-pointer ${
                      selectedColor === color
                        ? "border-4 shadow-[0_10px_20px_rgba(0,0,0,0.8)] border-black "
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.5)",
                    }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border cursor-pointer ${
                      selectedSize === size
                        ? "bg-slate-200 shadow-[0_4px_6px_rgba(44,0,0,0.8)] border-2 border-black"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg cursor-pointer"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <button
            onClick={handleAddtoCart}
            className="bg-black text-white w-full py-2 px-6 rounded mb-4 cursor-pointer">
              ADD TO CART
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody className="">
                  <td className="py-1">Brand</td>
                  <td className="py-1">{selectedProduct.brand}</td>
                </tbody>
                <tbody>
                  <td className="py-1">Material</td>
                  <td className="py-1">{selectedProduct.material}</td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
