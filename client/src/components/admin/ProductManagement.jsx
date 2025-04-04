import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, fetchAdminProducts } from "../../redux/slices/adminProductSlice";
const ProductManagement = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=> state.auth || state)
  const {products, loading, error} = useSelector((state)=> state.adminProducts)
  useEffect(()=>{
    if(!user || user.role !== 'admin'){
      navigate('/')
    }else{
      dispatch(fetchAdminProducts())
    }
  },[dispatch])

  const handleDelete = (id) => {
    if(window.confirm("Are you sure want to delete the product?")){
      dispatch(deleteProduct(id))
        
    }
  }

  if(loading) return <p className="text-gray-500">Loading...</p>
  if(error) return <p className="text-red-500">Error: {error}</p>

  return (
    <div className="max-w-7xl p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-700">
            <tr>
              <td className="py-3 px-4">Name</td>
              <td className="py-3 px-4">Price</td>
              <td className="py-3 px-4">SKU</td>
              <td className="py-3 px-4">Actions</td>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b bg-gray-50 cursor-pointer hover:bg-gray-200"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">Rs.{product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    <Link to={`/admin/products/${product._id}/edit`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                        Edit
                    </Link>
                    <button onClick={()=> handleDelete(product._id)} 
                          className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600"
                        >
                Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-600 p-4">
No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
