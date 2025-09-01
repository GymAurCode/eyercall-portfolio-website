import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

function CeoCard() {
  return (
    <section className="pt-[160px] pb-[100px] w-full bg-gradient-to-b from-gray-200 to-gray-100 dark:from-purple-800 dark:to-black text-gray-800 dark:text-white py-12 px-6 flex items-center justify-center z-30 relative theme-transition">
      <div className="w-full max-w-6xl min-h-[550px] bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[40%_60%] theme-transition">
        
        {/* Left Side - CEO Info */}
        <div
          className="flex flex-col items-center md:items-center justify-center p-10 text-center md:text-left"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <img
            src="./images/ceo.png" // <-- apni CEO image ka path yahan dalna
            alt="CEO"
            className="w-44 h-44 md:w-52 md:h-52 rounded-full border-4 border-purple-400 shadow-lg mb-6 object-cover bg-purple-500 "
          />
          <h2 className="text-3xl font-bold mb-2">M. Asad Shaukat</h2>
          <p className="text-purple-300 mb-6">CEO, Eyercall</p>
          
          <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-200">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Mail className="w-5 h-5 text-purple-400" />
              <a href="mailto:ceo@eyercall.com" className="hover:underline">
                ceo.eyercall@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Phone className="w-5 h-5 text-purple-400" />
              <span>+92-3064493249</span>
            </div>
          </div>
        </div>

        {/* Right Side - About CEO & Team */}
        <div
          className="p-10 flex flex-col justify-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h3 className="text-3xl font-bold mb-4">I'm the CEO of Eyercall</h3>
          <p className="text-gray-600 dark:text-gray-200 leading-relaxed mb-6">
            At Eyercall, we are building a platform that transforms the way 
            people connect, learn, and collaborate online. Our mission is to 
            deliver seamless video meetings, smart messaging, and powerful 
            digital solutions for everyone.
          </p>

          <div>
            <p className="text-gray-500 dark:text-gray-300 mb-4">
              We are a passionate team of{" "}
              <span className="font-semibold text-purple-300">4 members</span>, 
              working together to bring innovation and reliability to every project we deliver.
            </p>
            <Link to="/about">
              <button className="px-5 py-2 bg-purple-600 hover:bg-purple-950 rounded-lg font-medium transition">
                View Team Details
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CeoCard;
