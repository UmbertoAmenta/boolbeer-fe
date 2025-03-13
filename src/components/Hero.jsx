import { useState } from "react";

export default function Hero() {
  const [currentImageId, setCurrentImageId] = useState(0);
  const images = [
    "https://www.spiritacademy.it/cache-img/homeblocks1/2000w/jpg/c-t1699866161-bt1699866207/img/cms/home/2023/cocktail-academy.jpg?t=1699866161&key=ae215c2d245fc1e28f67860bdc6092467d8a5bf149ec53dddc7c6e73e5128a9c&bt=1699866207",
    "https://www.greatlakesbrewing.com/sites/default/files/2022_wtatennisintheland_graphics_websitebanner.jpg",
    "https://www.supercars.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fxd502h20t7lh%2F9Qf7GFd7M9T6yiMPdlfnT%2F9860e7801a9c6f12208286af50298143%2FCoopers_Supercars_WebBanner_4800x1196px_v1.jpg&w=3840&q=75",
    "https://staging.delhidutyfree.co.in/media/wysiwyg/j1.jpg",
    "https://whiskypartners.com/wp-content/uploads/2023/05/whiskypartnerslimited.jpg",
  ];

  // carosello (il modulo permette l'effetto loop continuo)
  // funzionalità pulsante: immagine precedente
  const nextImageId = () => {
    setCurrentImageId((prevImageId) => (prevImageId + 1) % images.length);
  };

  // funzionalità pulsante: immagine successiva
  const prevImageId = () => {
    setCurrentImageId(
      (prevImageId) => (prevImageId - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative">
      <img
        src={images[currentImageId]}
        alt="404: Image not found"
        className="w-full h-120 object-cover shadow-md"
      />
      <button
        className="absolute top-50 left-0 mx-2 p-2 hover:cursor-pointer bg-neutral-800 rounded-full text-white text-2xl"
        onClick={prevImageId}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      <button
        className="absolute top-50 right-0 mx-2 p-3 hover:cursor-pointer bg-neutral-800 rounded-full text-white text-2xl"
        onClick={nextImageId}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}
