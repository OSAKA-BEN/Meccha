import Title from "../components/Title"
import { assets } from '../assets/assets'
import NewsLetterBox from "../components/NewsLetterBox"

const About = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-2xl text-center pt-8 border-t-2 border-gray-300">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="about" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <h1 className="font-bold text-4xl text-black">Welcome to Meccha Japan</h1>
          <p>We are your Japanese online store, let&apos;s travel to Japan through Meccha Japan to find your exclusive products and do shopping as if you were in Akihabara. <br/>
          Buy exclusive products available only on the Japanese market almost impossible to find elsewhere. <br/>
          Find limited edition products like Pokémon, unique Nendoroids, collector figurines and other rare collectible card games to complete your collection. Meccha Japan is here to provide you with the best online shopping experience in Japan.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1="OUR" text2="VALUES" />   
      </div>

      <div className="flex flex-col mb-12">
        <p className="text-gray-600">Fun/ENTERTAINMENT, we want our customers to have the best possible experience on Meccha-Japan. Our technical team is constantly searching for new features to make our users' experience as pleasant as possible. Each year, Meccha Japan improves and offers new features to ensure a unique shopping experience.</p>
      </div>

      <div className="text-xl py-4">
        <Title text1="OUR" text2="EXPERIENCE" />
      </div>

      <div className="flex flex-col mb-12">
        <p className="text-gray-600">Thanks to our 5 years of experience as a Japanese retailer, our 200,000 orders delivered to over 70 countries around the world, our services are improving day by day. Our team is here to serve you and offer you always more features in the future. We hope that your experience on our site is the best. If you have any questions, please check our help page where you will find all the information about our processes and how we take care of your orders from your purchase to the delivery of your package.</p>
      </div>

      <div className="text-xl py-4">
        <Title text1="WE" text2="RECRUIT" />
      </div>

      <div className="flex flex-col mb-12">
        <p className="text-gray-600">We are recruiting talented, passionate and motivated staff, you can check our recruitment page. We take care of our employees as we take care of our clients. Located 15 minutes from the famous Osaka Castle, and as a member of our team you will benefit from all the benefits and benefits offered to our employees. We have the ambition to become the online store offering the widest selection of Japanese products.</p>
      </div>

      <div className="text-xl py-4">
        <Title text1="BECOME" text2="OUR PARTNER" />
      </div>

      <div className="flex flex-col mb-12">
        <p className="text-gray-600">We are constantly looking for new partners to promote our products. If you think your passion and your community are in line with our brand image, please check our partner link: Contact us!</p>
      </div>

      <NewsLetterBox />

    </div>
  )
}

export default About