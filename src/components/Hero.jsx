import { useState } from "react";

export default function Hero() {
  const [currentImageId, setCurrentImageId] = useState(0);
  const images = [
    "https://www.spiritacademy.it/cache-img/homeblocks1/2000w/jpg/c-t1699866161-bt1699866207/img/cms/home/2023/cocktail-academy.jpg?t=1699866161&key=ae215c2d245fc1e28f67860bdc6092467d8a5bf149ec53dddc7c6e73e5128a9c&bt=1699866207",
    "https://www.spiritacademy.it/cache-img/homeblocks1/2000w/jpg/c-t1699866801-bt1699866808/img/cms/home/2023/spirit-guide.jpg?t=1699866801&key=209f6023052ff55cd37d32d0675b0ef6795eebd607eff90b635edb7078384694&bt=1699866808",
    "https://www.whiskyitaly.it/media/slidebanner/s/l/slideshow-mmd-cask-craft.jpg",
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
        className="w-full h-100 object-cover"
      />
      <button
        className="absolute top-50 left-0 mx-2 p-2 hover:cursor-pointer bg-neutral-800 rounded-full text-white text-2xl"
        onClick={prevImageId}
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>

      <button
        className="absolute top-50 right-0 mx-2 p-3 hover:cursor-pointer bg-neutral-800 rounded-full text-white text-2xl"
        onClick={nextImageId}
      >
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}
