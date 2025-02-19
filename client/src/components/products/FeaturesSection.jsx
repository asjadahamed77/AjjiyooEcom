import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi2"


const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center ">
        <div className="flex flex-col items-center">
        <div className="p-4 rounded-full mb-4">
        <HiShoppingBag className="text-xl" />
        </div>
        <h4 className="tracking-tighter mb-4">FREE SRI LANKAN SHIPPING</h4>
        <p className="text-gray-600 tracking-tighter text-sm">
            On all orders over Rs.10000.00
        </p>
        </div>

        <div className="flex flex-col items-center">
        <div className="p-4 rounded-full mb-4">
        <HiArrowPathRoundedSquare className="text-xl" />
        </div>
        <h4 className="tracking-tighter mb-4">45 DAYS RETURN</h4>
        <p className="text-gray-600 tracking-tighter text-sm">
            Money back guarantee
        </p>
        </div>

        <div className="flex flex-col items-center">
        <div className="p-4 rounded-full mb-4">
        <HiOutlineCreditCard className="text-xl" />
        </div>
        <h4 className="tracking-tighter mb-4">SECURE CHECKOUT</h4>
        <p className="text-gray-600 tracking-tighter text-sm">
            100% secure checkout process
        </p>
        </div>


      </div>
    </section>
  )
}

export default FeaturesSection
