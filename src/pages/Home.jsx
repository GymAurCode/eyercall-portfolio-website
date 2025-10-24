
import { AnimatePresence } from "framer-motion";
import Cards from "../components/Cards";
import HeroSection from "../components/HeroSection";
import CustomCursor from "../components/CustomCursor";
import Bigcard from "../components/Bigcard";

export default function Home() {
  return (
    <>
    
      {/* AnimatePresence ensures smoother exit animations */}
      <AnimatePresence mode="wait">
        <HeroSection />
      </AnimatePresence>
          <section className="w-full h-screen flex justify-center items-center flex-col  bg-purple-600  dark:from-black dark:via-purple-900 dark:to-black text-black dark:text-white py-20 px-4 text-center">
      <h1 className="text-8xl font-bold  mb-4">Welcome to Eyercall</h1>
      <p className="text-lg mb-6">
        Your one-stop solution for inventory and business management. Explore the future with us!
      </p>
      <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
        Get Started
      </button>
    </section>
      <Cards />
       <section className="w-full h-screen flex justify-center items-center flex-col  bg-purple-600  dark:from-black dark:via-purple-900 dark:to-black text-black dark:text-white py-20 px-4 text-center">
      <h1 className="text-8xl font-bold  mb-4">Welcome to Eyercall</h1>
      <p className="text-lg mb-6">
        Your one-stop solution for inventory and business management. Explore the future with us!
      </p>
      <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
        Get Started
      </button>
    </section>

      <CustomCursor />

      
      <Bigcard />
    </>
  );
}
