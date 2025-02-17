import men from '../../assets/mens-collection.webp'
import women from '../../assets/womens-collection.webp'
import { Link } from 'react-router-dom'
const GenderCollectionSection = () => {
  return (
    <div className='py-24 flex flex-col sm:flex-row justify-center gap-16 lg:gap-32 px-4 sm:px-6 md:px-12 lg:px-16'>
      <div className='max-w-[400px] max-h-[600px] relative group'>
        <img src={men} alt="men" className='w-full h-full object-cover' />
        <div className='absolute bottom-20 p-4 w-[220px] bg-white text-black ml-16 rounded-xl border-2 border-black cursor-pointer group-hover:-translate-y-4 duration-500 transition-all'>
<p className='text-sm'>MENS COLLECTIONS</p>
<Link to={'/collections/all?gender=men'} className='text-xs underline mt-2'>SHOP NOW</Link>
        </div>
      </div>
      <div className='max-w-[400px] max-h-[600px] relative group'>
        <img src={women} alt="women" className='w-full h-full object-cover' />
        <div className='absolute bottom-20 p-4 w-[220px] bg-white text-black ml-16 rounded-xl border-2 border-black cursor-pointer group-hover:-translate-y-4 duration-500 transition-all'>
<p className='text-sm'>WOMENS COLLECTIONS</p>
<Link to={'/collections/all?gender=women'} className='text-xs underline mt-2'>SHOP NOW</Link>
        </div>
      </div>
    </div>
  )
}

export default GenderCollectionSection
