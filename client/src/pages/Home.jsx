import Hero from "../components/layout/Hero"
import GenderCollectionSection from "../components/products/GenderCollectionSection"
import NewArrivals from "../components/products/NewArrivals"
import ProductDetails from "../components/products/ProductDetails"


const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection /> 
      <NewArrivals />
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4 mt-12">
      Best Seller
      </h2>
      <ProductDetails />
    </div>
  )
}

export default Home
