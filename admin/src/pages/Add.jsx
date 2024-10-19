import { useState } from "react";
import { assets } from "../assets/assets"
import axios from "axios"
import { backendURL } from "../App";
import { toast } from "react-toastify";


const Add = ({ token }) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [collections, setCollections] = useState('');
  const [subCollections, setSubCollections] = useState('');
  const [licence, setLicence] = useState('');
  const [price, setPrice] = useState('');
  const [bestSeller, setBestSeller] = useState(false);

  const productCollections = {
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('collections', collections);
      formData.append('subCollections', subCollections);
      formData.append('licence', licence);
      formData.append('price', price);
      formData.append('bestSeller', bestSeller);

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const res = await axios.post(`${backendURL}/api/product/add`, formData, {
        headers: { token }
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setBestSeller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  return (
    <form className="flex flex-col w-full items-start gap-3" onSubmit={onSubmitHandler}>
      <div>
        <p className="mb-2">
          Upload Image
        </p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="upload" />
          </label>
          <input type="file" id="image1" className="hidden" onChange={(e) => setImage1(e.target.files[0])} />
          <label htmlFor="image2">
            <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="upload" />
          </label>
          <input type="file" id="image2" className="hidden" onChange={(e) => setImage2(e.target.files[0])} />
          <label htmlFor="image3">
            <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="upload" />
          </label>
          <input type="file" id="image3" className="hidden" onChange={(e) => setImage3(e.target.files[0])} />
          <label htmlFor="image4">
            <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="upload" />
          </label>
          <input type="file" id="image4" className="hidden" onChange={(e) => setImage4(e.target.files[0])} />
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">
          Product Name
        </p>
        <input className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Product Name" required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="w-full">
        <p className="mb-2">
          Product Description
        </p>
        <textarea className="w-full max-w-[500px] px-3 py-2" placeholder="Product Description" required value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">
            Collection
          </p>
          <select className="w-full px-3 py-2" value={collections} onChange={(e) => {
            setCollections(e.target.value);
            setSubCollections('');
          }}>
            <option value="">Select a collection</option>
            {Object.keys(productCollections).flatMap(category => 
              Object.keys(productCollections[category]).map(col => (  
                <option key={col} value={col}>{col}</option>
              ))
            )}
          </select>
        </div>
        <div>
          <p className="mb-2">
            Sub Collection
          </p>
          <select className="w-full px-3 py-2" value={subCollections} onChange={(e) => setSubCollections(e.target.value)}>
            <option value="">Select a sub collection</option>
            {collections && Object.values(productCollections).flatMap(category => 
              category[collections] ? category[collections].map(subCol => (
                <option key={subCol} value={subCol}>{subCol}</option>
              )) : []
            )}
          </select>
        </div>
        <div>
          <p className="mb-2">
            Licence
          </p>
          <select className="w-full px-3 py-2" value={licence} onChange={(e) => setLicence(e.target.value)}>
            <option value="">Select a licence</option>
            {productLicence.map(lic => (
              <option key={lic} value={lic}>{lic}</option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">
            Price
          </p>
          <input className="w-full sm:w-[120px] px-3 py-2" type="number" placeholder="Product Price" required value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input type="checkbox" id="bestseller" checked={bestSeller} onChange={() => setBestSeller(prev => !prev)} />
        <label htmlFor="bestseller" className="cursor-pointer">Add to bestseller</label>
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">ADD</button>
    </form>
  )
}

export default Add
