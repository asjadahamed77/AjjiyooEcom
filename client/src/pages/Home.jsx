import Hero from "../components/layout/Hero"
import GenderCollectionSection from "../components/products/GenderCollectionSection"
import NewArrivals from "../components/products/NewArrivals"
import ProductDetails from "../components/products/ProductDetails"
import ProductGrid from "../components/products/ProductGrid"

const placeholderProducts = [
  {
    _id : 1,
    name: "Stylish Jacket",
    price: 1750,
    images: [{url:"https://picsum.photos/500/500/?random=1",ltText: "Stylish" }]
},
{
    _id : 2,
    name: "Stylish Jacket",
    price: 1750,
    images: [{url:"https://picsum.photos/500/500/?random=2",ltText: "Stylish" }]
},
{
    _id : 3,
    name: "Stylish Jacket",
    price: 1750,
    images: [{url:"https://picsum.photos/500/500/?random=3",ltText: "Stylish" }]
},
{
    _id : 4,
    name: "Stylish Jacket",
    price: 1750,
    images: [{url:"https://picsum.photos/500/500/?random=4",ltText: "Stylish" }]
},
{
  _id : 5,
  name: "Stylish Jacket",
  price: 1750,
  images: [{url:"https://picsum.photos/500/500/?random=5",ltText: "Stylish" }]
},
{
  _id : 6,
  name: "Stylish Jacket",
  price: 1750,
  images: [{url:"https://picsum.photos/500/500/?random=6",ltText: "Stylish" }]
},
{
  _id : 7,
  name: "Stylish Jacket",
  price: 1750,
  images: [{url:"https://picsum.photos/500/500/?random=7",ltText: "Stylish" }]
},
{
  _id : 8,
  name: "Stylish Jacket",
  price: 1750,
  images: [{url:"https://picsum.photos/500/500/?random=8",ltText: "Stylish" }]
},
]


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
      <div className="mx-4 sm:mx-4 md:mx-6 lg:mx-12 xl:mx-20">
      <h2 className="text-3xl text-center font-bold mb-4 mt-12">
      Top Wear for Womens
      </h2>
      <ProductGrid products={placeholderProducts} />
      </div>
    </div>
  )
}

export default Home
