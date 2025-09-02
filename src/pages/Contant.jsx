import { motion } from "framer-motion";
import { FiLinkedin, FiInstagram, FiGithub, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaEnvelope, FaPhone, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { emailjsConfig, teamMembers as emailTeamMembers } from "../config/emailjs.js";

const teamMembers = [
  {
    name: "Muhammad Asad",
    role: "Chief Executive Officer",
    email: "ceo.eyercall@gmail.com",
    phone: "+92-300-1234567",
    image: "./images/ceo.png",
    socials: { linkedin: "#", instagram: "#", github: "#" },
    description: "Leading Eyercall with vision and strategic direction"
  },
  {
    name: "Muhammad Hussnain",
    role: "Chief Technology Officer",
    email: "Hussnain@gmail.com",
    phone: "+92-300-7654321",
    image: "./images/hussnain.png",
    socials: { linkedin: "#", instagram: "#", github: "#" },
    description: "Ensuring security and reliability of our platform"
  }
];

// Contact Modal Component
const ContactModal = ({ isOpen, onClose, memberName, memberEmail }) => {
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
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: memberName,
        to_email: memberEmail,
        message: `Message for ${memberName}:\n\n${formData.message}`,
        subject: `Contact Request from ${formData.name}`,
        reply_to: formData.email,
        reply_to_name: formData.name
      };

      // Get the specific service and template for this team member
      const memberConfig = emailTeamMembers[memberEmail] || emailjsConfig;
      
      await emailjs.send(
        memberConfig.serviceId,
        memberConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );

      setSubmitStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitStatus("");
      }, 2000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Contact {memberName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your message"
            />
          </div>

          {/* Status Message */}
          {submitStatus && (
            <div className={`text-sm p-3 rounded-lg ${
              submitStatus.includes("successfully") 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}>
              {submitStatus}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function Contact() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState({ name: "", email: "" });

  const openContactModal = (memberName, memberEmail) => {
    setSelectedMember({ name: memberName, email: memberEmail });
    setIsModalOpen(true);
  };

  const closeContactModal = () => {
    setIsModalOpen(false);
    setSelectedMember({ name: "", email: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-black flex flex-col items-center justify-center z-30 relative px-4 py-16">
      
      {/* Main Big Box with only Contact Form - Reduced Height */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 mb-16 text-white mt-[50px]"
      >
        <h1 className="text-4xl font-bold mb-3">Contact Us & Queries</h1>
        <p className="text-lg text-gray-300 mb-5">
          If you want to create, build, or collaborate on any project, we are here to help you. 
          Reach out with your ideas or inquiries, and let's make something amazing together.
        </p>

        {/* Contact Form */}
        <form className="grid gap-3">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
          />
          <textarea
            rows={3}
            placeholder="Your Message"
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </motion.div>

      {/* Section Heading */}
      <h2 className="text-5xl mt-[50px] font-semibold text-white mb-10">Get in Touch with Our Experts</h2>

      {/* Team Member Boxes - Beautiful Cards */} 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl pb-[200px]">
        {teamMembers.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 * idx }}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-purple-800/30 transition-all duration-300 hover:scale-105 group"
          >
            {/* Profile Section */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-2xl group-hover:border-pink-400 transition-all duration-300"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">👤</span>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {member.name}
              </h3>
              <p className="text-purple-300 font-medium mb-3 text-lg">{member.role}</p>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {member.description}
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center space-x-3 text-gray-200 hover:text-purple-300 transition-colors">
                <FaEnvelope className="text-purple-400 text-lg" />
                <span className="text-sm">{member.email}</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-gray-200 hover:text-purple-300 transition-colors">
                <FaPhone className="text-purple-400 text-lg" />
                <span className="text-sm">{member.phone}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-6">
              <a 
                href={member.socials.linkedin} 
                className="text-2xl text-gray-300 hover:text-blue-400 hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a 
                href={member.socials.instagram} 
                className="text-2xl text-gray-300 hover:text-pink-500 hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a 
                href={member.socials.github} 
                className="text-2xl text-gray-300 hover:text-gray-100 hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>

            {/* Contact Button */}
            <div className="text-center">
              <button
                onClick={() => openContactModal(member.name, member.email)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                <FaEnvelope className="text-lg" />
                Contact Me
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={closeContactModal}
        memberName={selectedMember.name}
        memberEmail={selectedMember.email}
      />
    </div>
  );
}
