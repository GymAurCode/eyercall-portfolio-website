import { motion, AnimatePresence , useMotionValue, useTransform  } from "framer-motion";
import { FiGithub, FiTwitter, FiLinkedin, FiMenu, FiX } from "react-icons/fi"; 
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import emailjs from "@emailjs/browser";
import { emailjsConfig } from "../config/emailjs.js";

const Header = () => {
    const location = useLocation();

    //Toggle the menu open/close
    const [isOpen, setIsOpen] = useState(false);
    const toogleMenu = () => {
        setIsOpen(!isOpen);
    };

    // State to track if the contact form is open
    const [contactFormOpen, setContactFormOpen] = useState(false);

    // Contact form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("");

    const openContactForm = () => setContactFormOpen( true );
    const closeContactForm = () => {
        setContactFormOpen( false );
        setFormData({ name: "", email: "", message: "" });
        setSubmitStatus("");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if all fields are filled
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("");

        try {
            // EmailJS configuration
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: "ceo.eyercall@gmail.com"
            };

            // Send email using EmailJS
            const response = await emailjs.send(
                emailjsConfig.serviceId,
                emailjsConfig.templateId,
                templateParams,
                emailjsConfig.publicKey
            );

            if (response.status === 200) {
                setSubmitStatus("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
                // Close form after 2 seconds
                setTimeout(() => {
                    closeContactForm();
                }, 2000);
            }
        } catch (error) {
            console.error("Email sending failed:", error);
            setSubmitStatus("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <header className="absolute w-full z-50 transition-all duration-300 theme-transition">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo Name */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
          }}
        >
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r  flex items-center justify-center text-purple-600 font-bold text-xl mr-3 ">
              <img src="./images/eyercall.png" alt="Eyercall Logo" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
              Eyercall
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
       <nav className="ml-[180px] lg:flex hidden space-x-8">
  {[
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" }
  ].map((item, index) => (
      <motion.div
      className=""
      initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.7 + index * 0.2,
         }}
      key={item.name}
      >
        <Link
          to={item.path}
          className={`relative text-gray-700 dark:text-gray-300 hover:text-violet-400 font-medium transition-colors duration-300 group ${
            location.pathname === item.path ? 'text-violet-400' : ''
          }`}
        >
          {item.name}
          <span className={`absolute -bottom-[6px] left-1/2 h-0.5 bg-gradient-to-r from-pink-600 via-purple-400 to-blue-500 group-hover:w-[120%] transition-all duration-300 transform -translate-x-1/2 ${
            location.pathname === item.path ? 'w-[120%]' : 'w-0'
          }`}></span>
        </Link>
      </motion.div>
  ))}
</nav>


       {/* Social icons - Desktop */}

           <div className="md:flex items-center space-x-4 hidden">
               
               <motion.a
               className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300" 
               initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{delay: 1.3, duration: 0.8}}
                
                href="#">
                  <FiGithub className="w-6 h-6" />
               </motion.a>

               <motion.a
               className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300" 
               initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{delay: 1.4, duration: 0.8}}
                
                href="#">
                  <FiTwitter className="w-6 h-6" />
               </motion.a>

               <motion.a
               className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300" 
               initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{delay: 1.5, duration: 0.8}}
                
                href="#">
                  <FiLinkedin className="w-6 h-6" />
               </motion.a>

               <motion.div
               className=""
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{
                delay: 1.6, 
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15,
            }}
               >
                 <ThemeToggle />
               </motion.div>

           </div>

           {/* Send message Button */}

           <motion.button 
           onClick={openContactForm}
           className="-  px-5 py-1 rounded-lg 
  bg-gradient-to-r from-gray-400 to-gray-100 
  dark:from-gray-400 dark:to-gray-100 
  text-violet-700 dark:text-violet-700 
  font-bold 
  hover:from-violet-700 hover:to-purple-700 hover:text-white 
  dark:hover:from-violet-700 dark:hover:to-purple-700 dark:hover:text-white 
  transition-all duration-500 
  hidden md:inline-block"
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{
            delay: 1.6, 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15,
        }}
        >
            Send Message
           </motion.button>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
          <motion.button 
          whileTap={{ scale: 0.7 }}
          onClick={toogleMenu}
          className="text-gray-700 dark:text-gray-300">
            {isOpen ? <FiX className="h-6 w-6"/> : <FiMenu className="h-6 w-6" />}
          </motion.button>
      </div>
</div>

   {/* Mobile Menu */}
     <motion.div
     initial={{ height: 0, opacity: 0 }}
     animate={{
        opacity: isOpen ? 1 : 0,
        height: isOpen ? "auto" : 0,
     }}
     className="md:hidden overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5 theme-transition">
          <nav className="flex flex-col space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Experience", path: "/experience" },
                { name: "Contact", path: "/contact" }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={toogleMenu}
                  className={`text-gray-800 dark:text-gray-300 font-medium py-2 hover:text-violet-400 transition-colors ${
                    location.pathname === item.path ? 'text-violet-400' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
          </nav>

          <div className="pt-4 border-t border-gray-300 dark:border-gray-700">

            <div className="flex space-x-5 items-center">
              <a href="#">
                <FiGithub className="w-5 h-5 text-gray-800 dark:text-gray-300"/>
              </a>

              <a href="#">
                <FiTwitter className="w-5 h-5 text-gray-800 dark:text-gray-300"/>
              </a>

              <a href="#">
                <FiLinkedin className="w-5 h-5 text-gray-800 dark:text-gray-300"/>
              </a>
              
              {/* Theme Toggle for Mobile */}
              <ThemeToggle />
            </div>

            <button
            onClick={()=> {
                toogleMenu()
                openContactForm()
            }}
             className="mt-4 block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 font-bold">
                Contact Me
            </button>
                 
          </div>
     </motion.div>

     {/* Contact Form */}

     <AnimatePresence>
     {contactFormOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}    
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black/50 background-blur-sm z-50 flex items-center justify-center p-4"
        >

            <motion.div
            initial={{scale: 0.8, opacity:0, y: 30}}
            animate={{scale: 1, opacity:1, y:0}}
            exit={{scale: 0.8, opacity: 0, y: 30}}
            transition={{
                type:"spring",
                damping: 30,
                stiffness: 200,
                duration: 0.8
            }}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 theme-transition"
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300">
                        Get In Touch
                    </h1>

                    <button onClick={closeContactForm}>
                        <FiX className="w-5 h-5 text-gray-800 dark:text-gray-300" />
                    </button>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                       <div>
                        <label htmlFor="name" className="block  text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                            Name
                            </label>
                            <input 
                            type="text" 
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Names"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 
                            focus:border-violet-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                            />
                       </div>

                       <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                            Email
                            </label>
                            <input 
                            type="email" 
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Your Email"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 
                            focus:border-violet-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                            />
                       </div>


                       <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                            Message
                            </label>
                            <textarea 
                            rows="4"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="How can we help you?"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 
                            focus:border-violet-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                            />
                       </div>

                       <motion.button
                       type="submit"
                       whileHover={{scale: 1.03}}
                       whileTap={{scale: 0.97}}
                       disabled={isSubmitting}
                         className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to via-violet-400 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-violet-600">
                         {isSubmitting ? "Sending..." : "Send Message"}
                       </motion.button>
                       {submitStatus && (
                           <p className={`text-center mt-2 ${submitStatus.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                               {submitStatus}
                           </p>
                       )}
                </form>
              
            </motion.div>

        </motion.div>
     )}
     </AnimatePresence>

    </header>
  );
};

export default Header;
