import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const { search, setSearch } = useContext(ShopContext)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    setSearch(e.target.value)
    navigate('/products')
  }

  return  (
    <div className="w-full">
      <div className="inline-flex items-center justify-start border border-gray-400 my-2 mx-3 rounded-md max-w-xs w-full">
        <input 
          type="text" 
          placeholder="Search a product..." 
          value={search} 
          onChange={handleSearch} 
          className="w-full outline-none bg-inherit text-sm px-5 py-2" 
        />
        <Search alt='' className='w-6 text-black mx-4'/>
      </div>
    </div>
  ) 
}

export default SearchBar