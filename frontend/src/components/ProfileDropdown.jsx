import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, ShoppingBag, LogOut, User2, Bell } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

export default function ProfileDropdown({ name, email }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setToken, setCartItems, navigate } = useContext(ShopContext)

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  }


  return (
    <div className="md:relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center focus:outline-none"
      >
        <User2 alt="Profile" className="w-6 h-6 rounded-full" />
      </button>
      {isOpen && (
        <div className="absolute right-0 w-80 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="p-4 border-b border-gray-200">
            <p className="font-semibold text-gray-800">{name}</p>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <p>{email}</p>
            </div>
          </div>
          <div className="py-2">
            <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
              <User className="w-4 h-4 mr-3" />
              My Profile
            </Link>
            <Link to="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
              <ShoppingBag className="w-4 h-4 mr-3" />
              Orders
            </Link>
            <Link to="/alerts" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
              <Bell className="w-4 h-4 mr-3" />
              My Alerts
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">2</span>
            </Link>
          </div>
          <div className="px-4 py-2">
            <button
              onClick={logout}
              className="flex w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}