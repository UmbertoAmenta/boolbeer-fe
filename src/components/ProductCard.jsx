import { Link } from "react-router";

export default function ProductCard({
  image,
  name,
  volume,
  abv,
  description,
  price,
  link,
}) {
  return (
    <Link to={link} className="block">
      <div className="flex flex-row gap-5 bg-white rounded-lg shadow-md p-4 my-4 w-100 h-60 mx-auto  border-gray-200 transform transition duration-300 hover:scale-105">
        <div className="">
          <img
            src={image}
            alt={name}
            className="w-30 h-35 object-cover rounded-lg"
          />
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-800 mb-2 inline">
            {name}
          </h4>
          <ul className="text-gray-600">
            <li>Volume alcolico: {abv}%</li>
            <li>{description}</li>
            <li>Prezzo: €{price}</li>
            <li>Volume: {volume}ml</li>
          </ul>
        </div>
      </div>
    </Link>
  );
}
