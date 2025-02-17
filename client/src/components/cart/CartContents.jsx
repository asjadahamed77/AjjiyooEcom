
import { RiDeleteBinLine } from "react-icons/ri";

const CartContents = () => {
    const cartProducts = [
        {
            productId : 1,
            name : "T-Shirt",
            size : "M",
            quantity: 1,
            color : "Red",
            price : 2500,
            image : "https://picsum.photos/200?random=1"
        },
        {
            productId : 2,
            name : "Shirt",
            size : "L",
            quantity: 1,
            color : "Blue",
            price : 6500,
            image : "https://picsum.photos/200?random=2"
        },
        {
            productId : 3,
            name : "T-Shirt",
            size : "M",
            quantity: 1,
            color : "Red",
            price : 2500,
            image : "https://picsum.photos/200?random=3"
        },
        {
            productId : 4,
            name : "T-Shirt",
            size : "M",
            quantity: 1,
            color : "Red",
            price : 2500,
            image : "https://picsum.photos/200?random=4"
        },
        {
            productId : 5,
            name : "T-Shirt",
            size : "M",
            quantity: 1,
            color : "Red",
            price : 2500,
            image : "https://picsum.photos/200?random=5"
        },{
            productId : 6,
            name : "T-Shirt",
            size : "M",
            quantity: 1,
            color : "Red",
            price : 2500,
            image : "https://picsum.photos/200?random=6"
        },
        {
            productId : 7,
            name : "T-Shirt",
            size : "M",
            quantity: 1,
            color : "Red",
            price : 2500,
            image : "https://picsum.photos/200?random=7"
        }

    ]
  return (
    <div>
      {
        cartProducts.map((product,index)=>(
            <div key={index} className='flex items-start justify-between  py-4 border-b '>
                <div className='flex items-start'>
                    <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
                </div>
                <div>
                    <h3>{product.name}</h3>
                    <p className='text-sm text-gray-500'>
                        size: {product.size} | color: {product.color}
                    </p>
                    <div className='flex items-center mt-2'>
                        <button className='border border-gray-500 cursor-pointer rounded px-2 py-0.5 text-xl font-medium'>-</button>
                        <span className='mx-2'>{product.quantity}</span>
                        <button className='border border-gray-500 cursor-pointer rounded px-2 py-0.5 text-xl font-medium'>+</button>
                    </div>

                </div>
                <div>
                    <p>Rs.{product.price.toLocaleString()}</p>
                    <button className="ml-6 mt-4">
                        <RiDeleteBinLine className='h-6 w-6 cursor-pointer   text-red-600' />
                    </button>
                </div>
            </div>
        ))
      }
      
    </div>
  )
}

export default CartContents
