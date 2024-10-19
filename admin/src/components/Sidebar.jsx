import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border border-r-2" >
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink to="/add" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
          <img src={assets.add_icon} alt="logo" className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink to="/list" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
          <img src={assets.order_icon} alt="logo" className="w-5 h-5" />
          <p className="hidden md:block">List items</p>
        </NavLink>
        <NavLink to="/orders" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
          <img src={assets.order_icon} alt="logo" className="w-5 h-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar