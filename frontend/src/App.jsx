import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Verify from './pages/Verify'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Banner from './components/Banner'
import ProductSection from './pages/ProductSection.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import  { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <CartDrawer />
      <Banner />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductSection />} />
        <Route path='/about' element={<About />} /> 
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}