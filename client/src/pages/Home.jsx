import { useEffect, useState } from "react"
import Hero from "../components/layout/Hero"
import FeaturedCollection from "../components/products/FeaturedCollection"
import FeaturesSection from "../components/products/FeaturesSection"
import GenderCollectionSection from "../components/products/GenderCollectionSection"
import NewArrivals from "../components/products/NewArrivals"
import ProductDetails from "../components/products/ProductDetails"
import ProductGrid from "../components/products/ProductGrid"
import {useDispatch, useSelector} from 'react-redux'
import { fetchProductByFilters } from "../redux/slices/productsSlice"
import axios from "axios"


const Home = () => {
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector((state)=> state.products)
  const [bestSellerProduct,setBestSellerProduct] = useState(null)

  useEffect(()=>{
    // Fetch products for a specific collection
    dispatch(
      fetchProductByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8

      })
    )
    // Fetch best seller product
    const fetchBestSeller = async()=>{
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/best-seller`)
        setBestSellerProduct(data)
      } catch (error) {
        console.error(error);
        
      }
    }
    fetchBestSeller()
  },[dispatch])

  return (
    <div>
      <Hero />
      <GenderCollectionSection /> 
      <NewArrivals />
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4 mt-12">
      Best Seller
      </h2>
   {
    bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : <p className="text-center text-gray-500">Loading best seller product ...</p>
   }
      <div className="mx-4 sm:mx-4 md:mx-6 lg:mx-12 xl:mx-20">
      <h2 className="text-3xl text-center font-bold mb-4 mt-12">
      Top Wear for Womens
      </h2>
      <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  )
}

export default Home
