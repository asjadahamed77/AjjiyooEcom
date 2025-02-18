const selectedProduct = {
    name : "Stylish Jacket",
    price : 1200,
    originalPrice : 1500,
    description: "This is a ultra super leather material Stylish jacket which was made at America,",
    material : "Leather Material",
    sizes : ["S","M","L","XL"],
    colors: ["Red", "Black"],
    images : [
        { url: "https://picsum.photos/500/500/?random=1", altText: "Stylish" },
        { url: "https://picsum.photos/500/500/?random=2", altText: "Stylish" },
    ]
}

const ProductDetails = () => {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Thumbnail */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {
                selectedProduct.images.map((image,index)=>(
                    <img key={index} src={image.url} alt={image.altText || "image"} className="w-16 h-16 rounded-lg border cursor-pointer" />
                ))
            }
          </div>
          {/* Main Image */}
            <div className="md:w-1/2">
          <div className="mb-4">
          <img src={selectedProduct.images[0]?.url} alt="main" className="h-auto w-full rounded-lg object-cover" />
          </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
