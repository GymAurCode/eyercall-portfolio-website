import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <>
      {/* ✅ Background Footer */}
      <footer className="relative w-full h-[650px] bg-gray-100 z-10 dark:bg-black flex flex-col justify-center items-center overflow-hidden theme-transition">
        
        {/* ✅ Main Animated Heading */}
        <h1
          data-aos="zoom-in"
          data-aos-delay="200"
          className="

  font-bold font-bebas tracking-widest 
  text-[clamp(4rem,15vw,18rem)] text-center 
  drop-shadow-lg z-20 
  bg-gradient-to-r from-purple-900 to-gray-500 
  bg-clip-text text-transparent
"
        >
          Eyercall
        </h1>

        {/* ✅ Social Links */}
        <div className=" absolute bottom-10 flex flex-wrap gap-8 text-gray-700 dark:text-purple-200 text-3xl md:text-4xl 
                 justify-center px-6">
  <a href="https://github.com" target="_blank" rel="noopener noreferrer"
     className="hover:text-black hover:bg-white hover:rounded-full hover:scale-125 transition-all duration-300 cursor-pointer transform hover:rotate-12">
    <FaGithub />
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
     className="hover:text-blue-400   hover:scale-125 transition-all duration-300 cursor-pointer transform hover:rotate-12">
    <FaLinkedin />
  </a>
  <a
  href="https://instagram.com"
  target="_blank"
  rel="noopener noreferrer"
  className="cursor-pointer transform transition-all duration-300 hover:scale-125 hover:rotate-12 hover:text-pink-500 dark:text-purple-200 dark:hover:text-pink-600 "
>
  <FaInstagram />
</a>
  <a href="https://twitter.com" target="_blank" rel="noopenher noreferrer"
     className="hover:text-blue-600 hover:scale-125 transition-all duration-300 cursor-pointer transform hover:rotate-12">
    <FaTwitter />
  </a>
  <a href="mailto:contact@eyercall.com"
     className="hover:text-green-700 hover:scale-125 transition-all duration-300 cursor-pointer transform hover:rotate-12">
    <FaEnvelope />
  </a>
</div>
      </footer>


    </>
  );
}

export default Footer;
