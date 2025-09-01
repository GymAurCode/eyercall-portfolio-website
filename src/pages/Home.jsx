import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence } from "framer-motion";
import Cards from "../components/Cards";
import HeroSection from "../components/HeroSection";
import CustomCursor from "../components/CustomCursor";
import Bigcard from "../components/Bigcard";
import Contact from "../components/Contactcomponent";

export default function Home() {
  return (
    <>
      {/* AnimatePresence ensures smoother exit animations */}
      <AnimatePresence mode="wait">
        <HeroSection />
      </AnimatePresence>
      <Cards />
      <CustomCursor />
      <Bigcard />
      <Contact />
    </>
  );
}
