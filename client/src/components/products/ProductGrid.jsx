import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductGrid = () => {
  const {products, loading, error } = useSelector((state)=> state.products)
  if (loading) {
    return <p className="text-center text-gray-500">Loading ... </p>;
  }

  if (error) {
    return <p className="text-center text-gray-500">Error: {error} </p>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <p className="text-center text-gray-500">No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {products.map((product, index) => (
        <Link
          key={index}
          to={`/product/${product._id}`}
          className="block"
        >
          <div className="w-full h-80 mb-4">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          <h3 className="text-sm mb-2">{product.name}</h3>
          <p className="tracking-tighter text-sm font-medium text-gray-500">
            Rs.{product.price}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
