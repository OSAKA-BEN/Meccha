import { assets } from "../assets/assets";

const cardData = [
  { image: assets.pokemon_universe, backgroundColor: "bg-[#ffe000]", title: "Pokemon", textColor:'text-black' },
  { image: assets.zelda_universe, backgroundColor: "bg-[#c2ff95]", title: "Zelda", textColor:'text-black'   },
  { image: assets.sonic_universe, backgroundColor: "bg-[#101592]", title: "Sonic", textColor:'text-white' },
  { image: assets.one_piece_universe, backgroundColor: "bg-[#ffffff]", title: "One Piece", textColor:'text-black' },
  { image: assets.pikmin_universe, backgroundColor: "bg-[#a2f5ff]", title: "Pikmin", textColor:'text-black' },
  { image: assets.halloween_universe, backgroundColor: "bg-[#382247]", title: "Halloween", textColor:'text-white' },
  { image: assets.dragon_quest_universe, backgroundColor: "bg-[#68edff]", title: "Dragon Quest", textColor:'text-black' },
  { image: assets.frieren_universe, backgroundColor: "bg-[#e5faff]", title: "Frieren", textColor:'text-black' },
];

const Universes = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4 py-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`${card.backgroundColor} p-4 flex flex-col items-center shadow-md border border-gray-800 hover:scale-105 transition-all duration-300`}
        >
          <img
            src={card.image}
            alt={`Card ${index + 1}`}
            className="mb-4 rounded w-full h-40 object-contain"
          />
          <h3 className={`text-base font-bold mb-2 uppercase ${card.textColor}`}>{card.title}</h3>
          <button className="mt-auto px-4 py-2 bg-black text-white rounded active:bg-gray-700">
            Learn More
          </button>
        </div>
      ))}
    </div>
  );
};

export default Universes;