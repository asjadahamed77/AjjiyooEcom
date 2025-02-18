import { Link } from "react-router-dom"
import featured from '../../assets/featured.webp'
const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        <div className="lg:w-1/2 lg:text-left text-center p-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Comfort and Style
            </h2>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 ">
Apparel for your everyday life
            </h2>
            <p className="text-lg text-gray-600 mb-6">
                Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.
            </p>
            <Link to={'/collections/all'} className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:opacity-80">
            SHOP NOW
            </Link>
        </div>
        <div className="lg:w-1/2">
            <img src={featured} alt="image" className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl " />
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection
