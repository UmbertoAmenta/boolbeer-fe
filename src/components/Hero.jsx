import { useState, useEffect } from "react";

export default function Hero() {
  // Definisci lo stato per l'indice dell'immagine corrente
  const [currentImageId, setCurrentImageId] = useState(0);

  // Definisci lo stato per gestire l'effetto di dissolvenza
  const [fade, setFade] = useState(false);

  // Array di immagini da utilizzare nel carosello
  const images = [
    "https://www.heinekenmalaysia.com/wp-content/uploads/2019/12/Anchor-Corporate-Website-Carousel-Banner-R4_110320.jpg",
    "https://www.greatlakesbrewing.com/sites/default/files/2022_wtatennisintheland_graphics_websitebanner.jpg",
    "https://www.supercars.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fxd502h20t7lh%2F9Qf7GFd7M9T6yiMPdlfnT%2F9860e7801a9c6f12208286af50298143%2FCoopers_Supercars_WebBanner_4800x1196px_v1.jpg&w=3840&q=75",
    "https://www.weine-mosel.de/media/55/cc/c0/1672906407/ENG_2022-11-10_Header_Banner_2.jpg?ts=1733300011",
    "https://www.finewinedelivery.co.nz/content/pagebuilder/67d1eeaca488f.png",
  ];

  // Funzione per passare all'immagine successiva
  const nextImageId = () => {
    // Attiva l'effetto di dissolvenza
    setFade(true);

    // Dopo 500 millisecondi, cambia l'immagine e disattiva la dissolvenza
    setTimeout(() => {
      setCurrentImageId((prevImageId) => (prevImageId + 1) % images.length);
      setFade(false);
    }, 500); // Tempo di dissolvenza
  };

  // Funzione per passare all'immagine precedente
  const prevImageId = () => {
    // Attiva l'effetto di dissolvenza
    setFade(true);

    // Dopo 500 millisecondi, cambia l'immagine e disattiva la dissolvenza
    setTimeout(() => {
      setCurrentImageId(
        (prevImageId) => (prevImageId - 1 + images.length) % images.length
      );
      setFade(false);
    }, 500); // Tempo di dissolvenza
  };

  // Effetto per cambiare l'immagine ogni 5 secondi
  useEffect(() => {
    // Crea un intervallo che chiama la funzione nextImageId ogni 5 secondi
    const intervalId = setInterval(() => {
      nextImageId();
    }, 7000); // 5000 millisecondi = 5 secondi

    // Rimuovi l'intervallo quando il componente viene smontato
    return () => clearInterval(intervalId);
  }, []); // Dipendenza vuota per eseguire l'effetto solo una volta al montaggio

  return (
    <div className="relative">
      {/* Immagine del carosello */}
      <img
        src={images[currentImageId]}
        alt="404: Image not found"
        className={`w-full h-120 object-cover shadow-md mb-8 transition-opacity duration-500 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
        // Quando fade è true, l'immagine diventa invisibile (opacity-0), altrimenti è completamente visibile (opacity-100).
      />

      {/* Pulsante per l'immagine precedente */}
      <button
        className="absolute top-50 left-0 mx-2 px-3 py-2 shadow-md hover:cursor-pointer bg-neutral-700 hover:bg-neutral-900 transition rounded-full text-white text-2xl"
        onClick={prevImageId}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      {/* Pulsante per l'immagine successiva */}
      <button
        className="absolute top-50 right-0 mx-2 px-3 py-2 shadow-md hover:cursor-pointer bg-neutral-700 hover:bg-neutral-900 transition rounded-full text-white text-2xl"
        onClick={nextImageId}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}
