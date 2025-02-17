import { useState, useEffect } from 'react';
import img1 from '../../assets/hero/hero1.jpeg';
import img2 from '../../assets/hero/hero2.jpeg';
import img3 from '../../assets/hero/hero3.jpeg';
import img4 from '../../assets/hero/hero4.jpeg';

const images = [img1, img2, img3, img4];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full relative h-[90vh]'>
      <img src={images[currentImage]} alt='image' className='w-full h-full object-cover transition-opacity duration-1000' />
      <div className='absolute inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center'>
        <div className='text-white p-8'>
          <h1 className='text-6xl md:text-6xl lg:text-6xl'>Unleash Your Style <br className='hidden md:block' />Trendy Dresses for Every Occasion!</h1>
          <p className='hidden md:block text-xl mt-2 text-gray-300'>Discover the Latest Fashion, Unmatched Quality, and Exclusive Deals.</p>
          <button className='mt-4 px-8 py-2 border-2 border-white cursor-pointer hover:bg-white hover:text-black transition-opacity duration-300'>SHOP NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;