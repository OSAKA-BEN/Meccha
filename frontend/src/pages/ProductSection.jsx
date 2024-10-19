import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import ProductItems from '../components/ProductItems'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const ProductSection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [ showFilter, setShowFilter ] = useState(false)
  const [ filterProducts, setFilterProducts ] = useState([])
  const [ licence, setLicence ] = useState([])
  const [ sortType, setSortType ] = useState('relavent')
  const [ selectedCollection, setSelectedCollection ] = useState(null)
  const [ selectedSubCollection, setSelectedSubCollection ] = useState(null)
  const { section: sectionParam } = useParams()
  const [openCollections, setOpenCollections] = useState({})
  const navigate = useNavigate();
  const { search: searchParam } = useLocation();

  // Définition des collections avec leurs sous-collections
  const collections = {
    hobbies: {
      'Toys/Plush/Dolls': ['Plush', 'Mascots/Plush/Keychains', 'Toys', 'Board games', 'Children and Baby Toys', 'Japanese Dolls', 'Puzzles', 'Miniatures', 'Building Toys'],
      'Collectible card games': ['Display', 'Card sleeves', 'Deck boxes', 'Starter deck', 'Structure deck', 'Booster Cards'],
      'Magazines/Books/CD': ['Manga', 'Books', 'CD/DVD'],
      'Video games/Consoles': ['Video games', 'Consoles', 'Console accessories', 'Tamagotchi'],
    },
    home: {
      'Bedroom': ['Blanket', 'Cushions', 'Storage'],
      'Kitchen': ['Plates', 'Utensils', 'Mugs', 'Lunch boxes', 'Glasses', 'Bowls', 'Stainless Bottle'],
      'Bathroom': ['Towels', 'Bathroom accessories'],
      'Stationery': ['Pencil cases/Pen holders', 'Transparent pouches', 'Decorative Adhesive Tape', 'Pens/Pencils/Markers', 'Notebook'],
      'Comfort': [''],
      'Cleaning': [''],
    },
    clothing: {
      'Clothing/Accessories': ['Bags', 'Pouches', 'Wallets', 'Jewelry', 'Watches', 'Shoes', 'Sweater', 'Shirt', 'Pants', 'Jacket', 'Skirt', 'Dresses', 'Men\'s accessories', 'Women\'s accessories'],
      'Fashion': ['Socks', 'Hats', 'T-shirts', 'Shoes'],
      'Cosplay': ['Costumes', 'Wigs', 'Color contact lenses', 'Beauty products'],
    },
    figures: {
      'Figures': [''],
      'Mecha/Robot': ['Gunpla', 'Pre-assembled Mecha/Robots', 'Mecha accessories', 'Gundam figures'],
      'Chibi style': [''],
      'Articulated figures': [''],
      'Plastic model kits': [''],
    },
    miscellaneous: {
      'Various products': ['Badges', 'Sticker', 'Magnets', 'Coasters'],
      'Food': ['Instant Food', 'Candies', 'Chocolates'],
      'Beverages': ['Plastic bottles', 'Cans'],
      'Traditional crafts': ['Gold Leaf'],
    },
    Themes: {
      'Christmas': [''],
      'Halloween': [''],
      'Anime/Manga': [''],
      'Video games': [''],
      'Movies': [''],
      'Series': [''],
      'Pop Culture': [''],
      'Sports': [''],
      'Others': [''],
    }
  };

  const productLicence = ['Seven Deadly Sins', 'Bleach', 'Hololive', 'The Quintessential Quintuplets', 'One Piece', 'Pokemon', 'Azur Lane', 'Ten-chan', 'My Dress-Up Darling', 'The Legend of Zelda', 'Kirby', 'Nendoroid', 'Hello Kitty', 'Tachibana', 'The Idolmaster Cinderella Girls', 'Sonic', 'Immortal guild']


  const toggleLicence = (event) => {
    if (licence.includes(event.target.value)) {
      setLicence(prev => prev.filter((item) => item !== event.target.value))
    } else {
      setLicence(prev => [...prev, event.target.value])
    }
  }

  const toggleCollection = (collection) => {
    setOpenCollections(prev => ({...prev, [collection]: !prev[collection]}));
  }

  const handleFilter = (collection = null, subCollection = null) => {
    const params = new URLSearchParams();
    if (collection) params.set('collection', collection);
    if (subCollection) params.set('subCollection', subCollection);
    navigate(`/products?${params.toString()}`);
  }

  const applyFilter = () => {
    let productsCopy = products.filter(item => item.section === sectionParam)
    
    if (selectedCollection) {
      productsCopy = productsCopy.filter(item => item.collections === selectedCollection)
    }
    if (selectedSubCollection) {
      productsCopy = productsCopy.filter(item => item.subCollections === selectedSubCollection)
    }
    
    if (search) {
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (licence.length > 0) {
      productsCopy = productsCopy.filter((item) => licence.includes(item.licence))
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
     let fpCopy = filterProducts.slice()
     switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price) )
        break
      default:
        applyFilter()
        break
     }
  }

  useEffect(() => {
    setSelectedCollection(null)
    setSelectedSubCollection(null)
    setLicence([])
    setSortType('relavent')
    applyFilter()
  }, [sectionParam, products])

  useEffect(() => {
    applyFilter()
}, [selectedCollection, selectedSubCollection, licence, search, showSearch])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  useEffect(() => {
    const params = new URLSearchParams(searchParam);
    const collectionParam = params.get('collection');
    const subCollectionParam = params.get('subCollection');

    setSelectedCollection(collectionParam ? collectionParam : null);
    setSelectedSubCollection(subCollectionParam ? subCollectionParam : null);  
  }, [searchParam]);

  return (
    <>
      <div className='flex flex-col md:flex-row gap-4 pt-10 border-t'>
        {/* Section supérieure pour les écrans petits */}
        <div className='block md:hidden'>
          {/* Collections */}
          <div>
            <p className='text-xl mb-4'>COLLECTIONS</p>
            <button 
              onClick={() => handleFilter()}
              className="w-full p-2 mb-4 bg-gray-200 hover:bg-gray-300 rounded"
            >
              See All
            </button>
            <div className='flex flex-col gap-2'>
              {Object.entries(collections).map(([category, categoryCollections]) => (
                <div key={category} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleCollection(category)}
                    className="p-2 text-left w-full flex justify-between items-center"
                  >
                    <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                    <ChevronDown className={`transform transition-transform ${openCollections[category] ? 'rotate-180' : ''}`} />
                  </button>
                  {openCollections[category] && (
                    <div className="pl-4 py-2">
                      {Object.entries(categoryCollections).map(([collection, subCollections]) => (
                        <div key={collection} className="mb-2">
                          <a 
                            href="#" 
                            className="block py-1 text-sm font-bold hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              handleFilter(collection);
                            }}
                          >
                            {collection}
                          </a>
                          <div className="pl-4">
                            {subCollections.map((subCollection, index) => (
                              <a 
                                key={index} 
                                href="#" 
                                className="block py-1 text-sm hover:underline"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleFilter(collection, subCollection);
                                }}
                              >
                                {subCollection}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tri */}
          <div className='my-4'>
            <select onChange={(event) => setSortType(event.target.value)} className='border-2 border-gray-300 text-sm px-2 py-2 w-full'>
              <option value='relavent'>Sort by relevance</option>
              <option value='low-high'>Sort by: Price ascending</option>
              <option value='high-low'>Sort by: Price descending</option>
            </select>
          </div>

          {/* Filtres */}
          <div>
            <p onClick={() => setShowFilter(!showFilter)} className='text-xl flex items-center cursor-pointer gap-2 my-2 mb-4'>FILTERS
              <img src={assets.dropdown_icon} alt='filter' className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
            </p>
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
              <p className='mb-3 text-sm font-medium'>LICENCES</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                {productLicence.map(lic => (
                  <p className='flex gap-2' key={lic}>
                    <input type='checkbox' value={lic} id='' className='w-3' onChange={toggleLicence} /> {lic}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal pour les écrans md et supérieurs */}
        <div className='flex gap-4 w-full'>
          {/* Collections pour les écrans md */}
          <div className='hidden md:block w-1/6'>
            <p className='text-xl mb-4'>COLLECTIONS</p>
            <button 
              onClick={() => handleFilter()}
              className="w-full p-2 mb-4 bg-gray-200 hover:bg-gray-300 rounded"
            >
              See All
            </button>
            <div className='flex flex-col gap-2'>
              {Object.entries(collections).map(([category, categoryCollections]) => (
                <div key={category} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleCollection(category)}
                    className="p-2 text-left w-full flex justify-between items-center"
                  >
                    <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                    <ChevronDown className={`transform transition-transform ${openCollections[category] ? 'rotate-180' : ''}`} />
                  </button>
                  {openCollections[category] && (
                    <div className="pl-4 py-2">
                      {Object.entries(categoryCollections).map(([collection, subCollections]) => (
                        <div key={collection} className="mb-2">
                          <a 
                            href="#" 
                            className="block py-1 text-sm font-bold hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              handleFilter(collection);
                            }}
                          >
                            {collection}
                          </a>
                          <div className="pl-4">
                            {subCollections.map((subCollection, index) => (
                              <a 
                                key={index} 
                                href="#" 
                                className="block py-1 text-sm hover:underline"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleFilter(collection, subCollection);
                                }}
                              >
                                {subCollection}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Produits */}
          <div className='w-full px-4'>
            {/* Tri pour les écrans md */}
            <div className='hidden md:flex justify-between mb-4'>
              <select onChange={(event) => setSortType(event.target.value)} className='border-2 border-gray-300 text-sm px-2 py-2'>
                <option value='relavent'>Sort by relevance</option>
                <option value='low-high'>Sort by: Price ascending</option>
                <option value='high-low'>Sort by: Price descending</option>
              </select>
            </div>

            {/* Grille des produits */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
              {filterProducts.map((item, index) => (
                <ProductItems key={index} item={item} id={item._id} name={item.name} price={item.price} image={item.image} />
              ))}
            </div>
          </div>

          {/* Filtres pour les écrans md */}
          <div className='hidden md:block w-1/6'>
            <div className='mb-4'>
              <p className='text-xl mb-4'>FILTERS</p>
              {/* Licence Filter */}
              <div className={`border border-gray-300 pl-5 py-3 my-5`}>
                <p className='mb-3 text-sm font-medium'>LICENCES</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                  {productLicence.map(lic => (
                    <p className='flex gap-2' key={lic}>
                      <input type='checkbox' value={lic} id='' className='w-3' onChange={toggleLicence} /> {lic}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductSection