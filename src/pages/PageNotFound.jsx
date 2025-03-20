export default function PageNotFound() {
  return (
    <div className="flex items-center justify-center gap-x-6 h-screen bg-gray-100 text-gray-800">
      <img
        src="https://media1.tenor.com/m/ZMPSEuvSoXMAAAAd/sunakook-cat.gif"
        alt="Gattino ubriaco"
        className="notfound-gif"
      />
      <div className="text-center">
        <h1 className="text-6xl font-bold text-orange-500 animate-fadeIn">
          404
        </h1>
        <p className="text-xl mt-4 text-gray-600">
          Oops! La pagina che stai cercando non esiste.
        </p>
        <a
          href="/"
          className="mt-8 inline-block px-6 py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-400 transition duration-300">
          Torna alla Home
        </a>
      </div>
    </div>
  );
}
