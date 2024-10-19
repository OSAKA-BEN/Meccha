import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [ search, setSearch ] = useState('')
  const [ showSearch, setShowSearch ] = useState(false)
  const [ cartItems, setCartItems ] = useState({})
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const [ products, setProducts ] = useState([]);
  const [ token, setToken ] = useState('')
  const navigate = useNavigate()

  const addToCart = async (itemId, quantity = 1) => {
    let cartData = { ...cartItems };

    if (cartData[itemId]) {
      cartData[itemId] += quantity;
    } else {
      cartData[itemId] = quantity;
    }
  
    setCartItems(cartData);
  
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, quantity },
          { headers: { token } }
        );

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

const getCartCount = () => {
  let totalCount = 0;

  for (const itemId in cartItems) {
    const quantity = cartItems[itemId];
    if (quantity > 0) {
      totalCount += quantity;
    }
  }

  return totalCount;
};


  const updateQuantity = async (itemId, quantity) => {
    let cartData = { ...cartItems };

    if (quantity > 0) {
      cartData[itemId] = quantity;
    } else {
      delete cartData[itemId];
    }
  
    setCartItems(cartData);
  
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo && quantity > 0) {
        totalAmount += quantity * itemInfo.price;
      }
    }
  
    return totalAmount;
  }

  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
   }
  
   const getUserCart = async ( token ) => {
      try {
        const res = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } })
        if (res.data.success) {
          setCartItems(res.data.cartData)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
   }
  
    useEffect(() => {
      getProductsData();
    }, []);
  
    useEffect(() => {
      if (!token && localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        getUserCart(localStorage.getItem('token'))
      }
    }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken, 
    setCartItems,
    isCartOpen,
    openCart,
    closeCart
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
