
const checkout = {
    _id:"12345",
    createdAt: new Date(),
    checkoutItems : [
        {
            productId: 1,
            name:"Jacket",
            color:"Red",
            size: "M",
            price:1850,
            quantity: 1,
              image: "https://picsum.photos/200?random=1",
        },
        {
            productId: 2,
            name:"Jacket",
            color:"Red",
            size: "M",
            price:1850,
            quantity: 1,
              image: "https://picsum.photos/200?random=2",
        },
    ],
    shippingAddress: {
        address: "34 Kadiyawatte Road",
        city: "Aluthgama",
        country: "Sri Lanka"
    }
}

const OrderConfirmationPage = () => {
    const calculateEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt)
        orderDate.setDate(orderDate.getDate()+4) // set to 4 days
        return orderDate.toLocaleDateString()
    }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-600 mb-8">
        Thank you for your order!
      </h1>
     {
        checkout && <div className="p-6 rounded-lg border">
            <div className="flex justify-between mb-20">
                <div>
                    <h2 className="text-xl font-semibold">
                      Order Id:  {checkout._id}
                    </h2>
                    <p className="text-gray-500">Order Date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="text-sm text-emerald-600">Estimated Delivery:{" "} {calculateEstimatedDelivery(checkout.createdAt)}</p>
                </div>
            </div>
            <div className="mb-20">
                {
                    checkout.checkoutItems.map((item)=>(
                        <div key={item.productId} className="flex items-center mb-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md mr-4 object-cover" />
                                <div>
                                    <h4 className="text-md font-semibold">{item.name}</h4>
                                    <p className="text-gray-500 text-sm">{item.color} | {item.size}</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <h4 className="text-md font-semibold">Rs.{item.price}</h4>
                                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                </div>
                        </div>
                    ))
                }
            </div>
            {/* Payment and Delivery info */}
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h4 className="text-lg font-semibold mb-2">Payment</h4>
                    <p className="text-gray-500">PayPal</p>
                </div>
                <div>
                <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                <p className="text-gray-500">{checkout.shippingAddress.address},</p>
                <p className="text-gray-500">{checkout.shippingAddress.city}{", "}{checkout.shippingAddress.country}</p>
                </div>
            </div>
        </div>
     }
    </div>
  )
}

export default OrderConfirmationPage
