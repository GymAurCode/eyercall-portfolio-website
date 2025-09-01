import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import LottieAnimation from "./Gif";

function HeroSection() {
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.to(imgRef.current, {
      rotationY: 360,         // Y-axis par rotate hoga
      repeat: -1,             // infinite loop
      duration: 8,            // ek rotation ka time (jitna zyada utna smooth)
      ease: "linear",         // smooth constant speed
      transformOrigin: "center center",
    });
  }, []);

  return (
    <section className="z-30 h-screen bg-gradient-to-b from-gray-100 to-white dark:from-purple-950 dark:to-black flex xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden min-h-screen theme-transition">

      {/* Left Section */}
      <div className="z-30 xl:mb-0 mb-[20%]">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.3,
            duration: 1.5,
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold z-30 mb-6 text-gray-800 dark:text-white"
        >
          Building Fast <br /> Reliable Results
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
            delay: 1.8,
            duration: 1.5,
          }}
          className="text-xl md:text-xl lg:text-2xl text-gray-600 dark:text-purple-200 max-w-2xl"
        >
          We deliver robust, production-ready websites and web apps with speed
          and precision. Every project is backed by clean code, clear
          communication, and a commitment to getting it done, on time, every
          time.
        </motion.p>
      </div>

      {/* Right Section - Rotating 3D Image
      <div className="flex justify-center items-center z-40">
        <img
          ref={imgRef}
          src="./images/3dtool.webp"
          alt="3D Tool"
          className="w-[350px] md:w-[450px] lg:w-[500px] drop-shadow-2xl"
        />
      </div> */}

      <LottieAnimation />
    </section>
  );
}

export default HeroSection;
