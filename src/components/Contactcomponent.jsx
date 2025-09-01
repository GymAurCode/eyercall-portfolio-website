import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { emailjsConfig } from "../config/emailjs.js";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

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
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-[200px] pb-[160px] w-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-black dark:to-purple-900 px-6 py-20 z-30 relative theme-transition">
      {/* Heading */}
      <div
        className="max-w-5xl mx-auto text-center mb-10"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">Get in Touch</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Have questions or want to work with us? Fill the form below or reach us directly.
        </p>
      </div>

      {/* Content Grid */}
      <div className="max-w-4xl mx-auto bg-white/80 dark:bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-10 grid md:grid-cols-2 gap-10 theme-transition">
        
        {/* Left Side - Contact Info */}
        <div
          className="flex flex-col justify-center space-y-6 text-left"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Contact Information</h3>
          <p className="text-gray-600 dark:text-gray-300">
            We're here to help you with Eyercall services. Reach out via form or use the info below.
          </p>

          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-200">
            <FaEnvelope className="text-purple-400 text-xl" />
            <span>ceo.eyercall@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-200">
            <FaPhoneAlt className="text-purple-400 text-xl" />
            <span>+92 3064493249</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-200">
            <FaMapMarkerAlt className="text-purple-400 text-xl" />
            <span>Lahore, Pakistan</span>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-400"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            rows="4"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-400"
            required
          ></textarea>
          
          {/* Status Message */}
          {submitStatus && (
            <div className={`text-sm p-3 rounded-lg ${
              submitStatus.includes("successfully") 
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}>
              {submitStatus}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
