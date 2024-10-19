import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <>
    <div className='relative h-72 border border-gray-800'>
      {/* Image de fond */}
      <img src={assets.hero2_img} alt='hero' className='w-full h-full object-cover' />
    </div>
      {/* Contenu centré */}
      <div className='flex items-center justify-center py-8'>
        <div className='text-black text-center'>
          <div className='flex items-center justify-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-black'></p>
            <p className='font-medium text-sm md:text-base'>YOUR ONLINE SHOP</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 md:text-5xl leading-relaxed'>From JAPAN</h1>
          <div className='flex items-center justify-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-black'></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero