import { assets } from "../assets/assets";

const NewsLetterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className='text-center'>
      <div className="max-w-md mx-auto">
        <div className="bg-cover bg-center h-40" style={{ backgroundImage: `url(${assets.newsletter})` }}></div>
      </div>
      <p className='text-white bg-black text-lg md:text-2xl font-medium max-w-md mx-auto rounded-lg px-4 py-2'>Subscribe now & get 20% off</p>
      <p className="text-gray-600 mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quisquam.</p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input type='email' placeholder='Enter your email' className='w-full sm:flex-12 outline-none py-2 px-4' required />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox