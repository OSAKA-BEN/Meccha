import { Earth, CreditCard, Headphones } from 'lucide-react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-2 text-center py-20 sm:text-sm md:text-base items-center text-gray-700'>
      <div className='flex flex-col items-center justify-center gap-4 grow'>
        <Earth className='h-12 w-12 m-auto mb-5' />
        <p className='font-semibold'>Worldwide Shipping</p>
        <p className='text-gray-400'>We deliver worldwide</p>
      </div>
      <div className='flex flex-col items-center justify-center gap-4 grow'>
        <CreditCard className='h-12 w-12 m-auto mb-5' />
        <p className='font-semibold'>Secure Payment</p>
        <p className='text-gray-400'>We use Stripe to secure your payments</p>
        <div className='w-full px-8'>
          <img src={assets.payment_methods} alt='payment_methods' className='w-full h-full' />
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-4 grow'>
        <Headphones className='h-12 w-12 m-auto mb-5' />
        <p className='font-semibold'>Customer Service</p>
        <p className='text-gray-400'>We do our best to meet your needs</p>
      </div>
    </div>
  )
}

export default OurPolicy