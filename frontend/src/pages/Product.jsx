import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import { X, ZoomIn } from 'lucide-react'


const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [ productData, setProductData ] = useState(false)
  const [ image, setImage ] = useState('')
  const [ quantity, setQuantity ] = useState(1)
  const [ showCarousel, setShowCarousel ] = useState(false)

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId])

  const handleQuantityChange = (change) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + change))
  }

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
    {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} key={index} src={item} alt={productData.title} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
            ))}
          </div>
          <div className='w-full sm:w-[80%] relative group'>
            <img src={image} alt={productData.title} className='w-full h-auto' />
            <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <ZoomIn 
                className='w-12 h-12 cursor-pointer text-gray-800'
                onClick={() => setShowCarousel(true)}
              />
            </div>
          </div>
        </div>
        {/* Product Infos */}
        <div className='flex-1'>
            <h1 className='text-2xl font-medium mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt='star' className='w-3 5' />
              <img src={assets.star_icon} alt='star' className='w-3 5' />
              <img src={assets.star_icon} alt='star' className='w-3 5' />
              <img src={assets.star_icon} alt='star' className='w-3 5' />
              <img src={assets.star_icon} alt='star' className='w-3 5' />
              <p className='pl-2'>122</p>
            </div>
            <p className='text-3xl font-medium mt-5'>{currency}{productData.price}</p>
            <p className='md:w-4/5 text-gray-500 mt-5'>{productData.description}</p>
            <p className='md:w-4/5 text-gray-800 mt-5'>Licence : <span className='font-medium px-3 py-2 bg-blue-100 border border-blue-500 ml-2'>{productData.licence}</span></p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Quantity</p>
              <div className='flex items-center gap-2'>
                <button onClick={() => handleQuantityChange(-1)} className='border py-2 px-4 bg-gray-100'>-</button>
                <span className='py-2 px-4'>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className='border py-2 px-4 bg-gray-100'>+</button>
              </div>
            </div>
            <button onClick={() => addToCart(productData._id, quantity)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
              ADD TO CART
            </button>
            <hr className='mt-8 sm:w-4/5' />
            <div className='text-base text-gray-500 mt-5 flex gap-1 justify-center flex-wrap'>
              <div className='flex items-center border px-5 py-3'><img src={assets.money_icon} alt='envoyé' className='w-6 h-6 inline-block mr-2' /> Satisfait ou remboursé</div>
              <div className='flex items-center border px-5 py-3'><img src={assets.envoi_icon} alt='envoyé' className='w-6 h-6 inline-block mr-2' /> Envoi suivi de A a Z</div>
              <div className='flex items-center border px-5 py-3'><img src={assets.earth_icon} alt='envoyé' className='w-6 h-6 inline-block mr-2' /> Livraison mondiale.</div>
              <div className='flex items-center border px-5 py-3'><img src={assets.japan_icon} alt='envoyé' className='w-6 h-6 inline-block mr-2' /> Produits authentiques du Japon</div>
              <div className='flex items-center border px-5 py-3'><img src={assets.payment} alt='envoyé' className='w-6 h-6 inline-block mr-2' /> Paiement sécurisé</div>
            </div>
        </div>
      </div>

      {/* Carousel Modal */}
      {showCarousel && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <div className='relative w-full max-w-4xl'>
            <X  
              className='absolute top-4 right-4 sm:text-black md:text-white text-4xl cursor-pointer'
              onClick={() => setShowCarousel(false)}
            />
            <div className='flex justify-center'>
              <img src={image} alt={productData.title} className='max-h-[80vh] max-w-full' />
            </div>
            <div className='flex justify-center mt-4'>
              {productData.image.map((item, index) => (
                <img 
                  key={index} 
                  src={item} 
                  alt={`${productData.title} ${index + 1}`} 
                  className={`w-16 h-16 mx-2 cursor-pointer ${item === image ? 'border-2 border-white' : ''}`}
                  onClick={() => setImage(item)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Description & Review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts collection={productData.collections} subCollection={productData.subCollections} />

    </div>
  ) : (
    <div className='opacity-0'>

    </div>
  )
}

export default Product