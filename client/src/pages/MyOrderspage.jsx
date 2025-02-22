import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddress: { city: "Aluthgama", district: "Kalutara" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/500/?random=1",
            },
          ],
          totalPrice: 12000,
          isPaid: true,
        },
        {
          _id: "65783",
          createdAt: new Date(),
          shippingAddress: { city: "Aluthgama", district: "Kalutara" },
          orderItems: [
            {
              name: "Product 2",
              image: "https://picsum.photos/500/500/?random=2",
            },
          ],
          totalPrice: 12000,
          isPaid: false,
        },
      ];

      setOrders(mockOrders);
    }, 1000);
  }, []);

  const handleRowClick = (orderId)=>{
    navigate(`/order/${orderId}`)
  }

  return (
    <div className="w-full md:max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      {/* Large Screen - Table View */}
      <div className="hidden lg:block relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 xl:py-3">Image</th>
              <th className="py-2 px-4 xl:py-3">Order Id</th>
              <th className="py-2 px-4 xl:py-3">Created</th>
              <th className="py-2 px-4 xl:py-3">Shipping Address</th>
              <th className="py-2 px-4 xl:py-3">Items</th>
              <th className="py-2 px-4 xl:py-3">Price</th>
              <th className="py-2 px-4 xl:py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={index}
                  onClick={()=>handleRowClick(order._id) }
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt="image"
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-2 sm:px-4 sm:py-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-2 px-2 sm:px-4 sm:py-4">
                    {new Date(order.createdAt).toLocaleDateString()} {" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:px-4 sm:py-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.district}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-2 sm:px-4 sm:py-4">
                    {order.orderItems.length}
                  </td>
                  <td className="py-2 px-2 sm:px-4 sm:py-4">Rs.{order.totalPrice}</td>
                  <td className="py-2 px-2 sm:px-4 sm:py-4 text-center">
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } px-4 py-2 rounded-full`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-4 px-4 text-center text-gray-500"
                >
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Small Screen - Card View */}
      <div className="lg:hidden space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              onClick={()=>handleRowClick(order._id) }
              className=" p-4 rounded-lg shadow-md hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={order.orderItems[0].image}
                  alt={order.orderItems[0].name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">#{order._id}</h3>
                  <p>{order.orderItems[0].name}</p>
                  <p className="text-gray-600">Rs.{order.totalPrice}</p>
                  <p className="text-sm mb-4">
                    {order.shippingAddress.city}, {order.shippingAddress.district}
                  </p>
                  <span
                    className={` mt-4 ${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    } px-4 py-2 rounded-full text-sm`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">You have no orders</p>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
