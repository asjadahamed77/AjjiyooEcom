import { useEffect, useState } from "react";

const MyOrderspage = () => {
  const [orders, setOrders] = useState([]);

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

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700 ">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order Id</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4 ">
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
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:px-4 sm:py-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city},${order.shippingAddress.district}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-2 sm:px-4 sm:py-4">
                    {
                        order.orderItems.length
                    }
                  </td>
                  <td className="py-2 px-2 sm:px-4 sm:py-4">
                   Rs.{
                        order.totalPrice
                    }
                  </td>
                  <td className={`py-2 px-2 sm:px-4 sm:py-4 text-center`}>
                  <span className={` ${order.isPaid ? "bg-green-100 text-green-700":" bg-red-100 text-red-700"} px-4 py-2 rounded-full`}>
                  {
                        order.isPaid? "Paid":"Pending"
                    }
                  </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderspage;
