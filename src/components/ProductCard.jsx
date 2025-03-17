import { Link } from "react-router";

export default function ProductCard({
  image,
  name,
  volume,
  abv,
  description,
  price,
  link,
  product_disponibility,
  brand,
}) {
  return (
    <Link to={link} className="block">
      <div className="bg-white/30 rounded-lg shadow-md p-4 my-4 w-60 mx-auto border-gray-200 transform transition duration-300 hover:scale-105 hover:bg-white">
        <div className="relative">
          <img
            src={`http://localhost:3000/imgs/${image}`}
            alt={name}
            className="h-60 rounded-lg object-contain p-3 m-auto"
          />
          <img
            src={`http://localhost:3000/imgs/loghi_brands/${brand}`}
            alt=""
            className="w-10 absolute top-0"
          />
          <div className="truncate w-50 hover:whitespace-normal transition-all duration-300">
            <h4 className="text-xl font-bold text-gray-800 mb-2 inline ">
              {name}
            </h4>
          </div>
        </div>
        <span className="text-orange-700 font-bold">{price}€</span>

        <div className="flex justify-between text-gray-600">
          <span>ABV {abv}%</span>
          <span>{volume}ml</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Pz. disponibili: {product_disponibility}</span>
        </div>
      </div>
    </Link>
  );
}
