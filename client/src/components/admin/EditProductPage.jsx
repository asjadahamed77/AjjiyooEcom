import { useState } from "react";

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/200?random=1",
      },
      {
        url: "https://picsum.photos/200?random=2",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async(e)=>{
    const file = e.target.files[0]
    console.log(file);
    
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
  }

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl mb-6 font-bold">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Product Description
          </label>
          <textarea
            cols={4}
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Sizes (comma seperated)</label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(',')}
            onChange={(e)=> setProductData({...productData, sizes: e.target.value.split(',').map((size)=>size.trim())})}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Colors (comma seperated)</label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(',')}
            onChange={(e)=> setProductData({...productData, colors: e.target.value.split(',').map((color)=>color.trim())})}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
        <label className="block font-semibold mb-2">Upload Image</label>
        <input type="file" onChange={handleImageUpload} />
        <div className="flex gap-4 mt-4">
    {
        productData.images.map((image,index)=>(
            <div key={index}>
                <img src={image.url} alt={"product"} className="w-20 h-20 rounded object-cover " />
            </div>
        ))
    }
        </div>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-600 px-4 py-2 text-sm rounded-lg duration-300 transition cursor-pointer text-white mt-2">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
