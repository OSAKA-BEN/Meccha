import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItems = ({id, image, name, price}) => {

  const { currency } = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer'to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img src={image[0]} alt={name} className='hover:scale-110 transition ease-in-out duration-300' />
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
      </div>
    </Link>
  )
}

export default ProductItems