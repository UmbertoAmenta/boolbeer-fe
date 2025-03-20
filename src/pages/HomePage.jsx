import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import FilteredSection from "../components/FilteredSection";
import AgeVerificationModal from "../components/AgeVerificationModal";

export default function HomePage({ isVerified, setIsVerified }) {
  useEffect(() => {
    if (isVerified === null) {
      // Blocca lo scroll quando la modale è aperta
      document.body.style.overflow = "hidden";
    } else {
      // Riabilita lo scroll quando la modale è chiusa
      document.body.style.overflow = "auto";
    }
  }, [isVerified]);

  return (
    <div>
      {isVerified === null && (
        <AgeVerificationModal
          onClose={() => setIsVerified(true)}
          onDeny={() => setIsVerified(false)}
        />
      )}
      <Hero />
      <div className="container xl:max-w-320 mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800">Gli ultimi arrivi</h2>
        <FilteredSection />
        <h2 className="text-2xl font-bold text-gray-800 mt-2">I più venduti</h2>
        <FilteredSection />
      </div>
    </div>
  );
}
