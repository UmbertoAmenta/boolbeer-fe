import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-gray-800">
      <img
        src="https://media1.tenor.com/m/ZMPSEuvSoXMAAAAd/sunakook-cat.gif"
        alt="Gattino ubriaco"
        className="h-100 shadow-md rounded-2xl"
      />
      <div className="text-center space-y-2">
        <h1 className="text-6xl font-bold text-orange-500 animate-fadeIn">
          404
        </h1>
        <p className="text-xl text-gray-600">
          Oops! La pagina che stai cercando non esiste.
        </p>
        <button className="px-6 py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-400 transition duration-300 cursor-pointer">
          <Link to="/">Torna alla Home</Link>
        </button>
      </div>
    </div>
  );
}
