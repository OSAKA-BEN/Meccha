import { useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import SearchBar from './SearchBar'
import ProfileDropdown from './ProfileDropdown'
import SettingsMenu from './SettingsMenu'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const { navigate, token, getCartCount, openCart } = useContext(ShopContext)
  const [ userData, setUserData ] = useState(null)

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        setUserData({
          name: decodedToken.name,
          email: decodedToken.email
        })
      } catch (error) {
        console.error("Error decoding token:", error)
        setUserData(null)
      }
    } else {
      setUserData(null)
    }
  }, [token])

  return (
    <div className='flex justify-between items-center py-5 font-medium'>
      <Link to='/'>
        <h1 className='text-2xl'><span className='font-medium text-white bg-red-500 px-2 py-1 rounded-md anton-regular'>Meccha</span><span className='text-black italic anton-regular ml-1'>Japan</span></h1>
      </Link>
      
      <div className='items-center justify-start flex-1 gap-4 hidden md:flex'>
        <SearchBar />
      </div>

      <div className='items-center justify-start flex-1 gap-4 hidden xl:flex'>
          <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink className='flex flex-col items-center gap-1' to='/'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink className='flex flex-col items-center gap-1' to='/products'>
            <p>ALL PRODUCTS</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink className='flex flex-col items-center gap-1' to='/about'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink className='flex flex-col items-center gap-1' to='/contact'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </ul>
      </div>

      <div className='flex items-center justify-end gap-6'>
        <div className="hidden lg:block">
          <SettingsMenu  />
        </div>
        {userData ? (
          <ProfileDropdown name={userData.name} email={userData.email} />
        ) : (
          <img onClick={() => navigate('/login')} src={assets.profile_icon} alt='profile' className='w-5 cursor-pointer' />
        )}
        <button onClick={openCart} className='relative'>
          <img src={assets.cart_icon} alt='cart' className='w-5 min-w-5' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </button>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} alt='menu' className='w-5 cursor-pointer xl:hidden' />
      </div>

      {/* Sidebar menu for smaller screens */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 z-50 ${visible ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
              <img src={assets.dropdown_icon} alt='dropdown' className='h-4 rotate-180' />
              <p>Back</p>
            </div>
            <SearchBar />
            <NavLink onClick={() => setVisible(false)}   className='py-2 pl-6 border' to='/'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)}   className='py-2 pl-6 border' to='/products'>ALL PRODUCTS</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>A PROPOS</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
            <SettingsMenu />
        </div>
      </div>
    </div>
  )
}

export default Navbar
