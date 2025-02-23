import { Link } from "react-router-dom";
const AdminHomePage = () => {
  const orders = [
    {
      _id: 12345,
      user: {
        name: "Asjad Ahamed",
      },
      totalPrice: 3540,
      status: "Processing",
    },
    {
      _id: 123245,
      user: {
        name: "Asjad Ahamed",
      },
      totalPrice: 3540,
      status: "Processing",
    },
    {
      _id: 12245,
      user: {
        name: "Asjad Ahamed",
      },
      totalPrice: 3540,
      status: "Processing",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ADMIN DASHBOARD</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl ">Rs.235650</p>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl ">231</p>
          <Link to={"/admin/orders"} className="text-blue-500 hover:underline">
            Manage Orders
          </Link>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl ">76</p>
          <Link
            to={"/admin/products"}
            className="text-blue-500 hover:underline"
          >
            Manage Products
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <td className="py-3 px-4">ORDER ID</td>
                <td className="py-3 px-4">USER</td>
                <td className="py-3 px-4">TOTAL PRICE</td>
                <td className="py-3 px-4">STATUS</td>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b bg-gray-50 hover:bg-gray-200 cursor-pointer"
                  >
                    <td className="p-4">{order._id}</td>
                    <td className="p-4">{order.user.name}</td>
                    <td className="p-4">{order.totalPrice}</td>
                    <td className="p-4">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
