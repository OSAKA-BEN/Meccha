import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div className='flex flex-col gap-4'>
          <img src={assets.logo} alt='logo' className='mb-5 w-32' />
          <p className='text-gray-600 w-full md:w-2/3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quisquam.</p>
        </div>
        <div className=''>
          <p className='font-medium mb-5 text-xl'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className=''>
          <p className='font-medium mb-5 text-xl'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 9876543210</li>
            <li>contact@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className=''>
        <hr className='' />
        <p className='py-5 text-sm text-center'>© 2024 All rights reserved. Forever.com</p>
      </div>
    </div>
  )
}

export default Footer