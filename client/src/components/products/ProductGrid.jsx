import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {products.map((product,index) => (
        <Link
          key={index}
          to={`/product/${product._id}`}
          className="block "
        >
          <div className="w-full h-80 mb-4">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="w-full h-full rounded-lg object-cover"
          />
          </div>
        
            <h3 className="text-sm mb-2">{product.name}</h3>
            <p className="tracking-tighter text-sm font-medium text-gray-500">Rs.{product.price}</p>
        
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
