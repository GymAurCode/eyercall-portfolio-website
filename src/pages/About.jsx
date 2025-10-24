import React, { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { FiLinkedin, FiTwitter, FiGithub,  FiShield, FiTrendingUp, FiGlobe, FiBarChart2 } from "react-icons/fi";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaDocker, FaGithub, FaGitAlt, FaStar, FaEnvelope } from "react-icons/fa";
import { SiExpress, SiSqlite, SiMongodb, SiTypescript, SiElectron, SiPrisma, SiGreensock, SiThreedotjs, SiPostgresql, SiBootstrap, SiTailwindcss, SiNextdotjs } from "react-icons/si"
import emailjs from "@emailjs/browser";
import { emailjsConfig, teamMembers } from "../config/emailjs.js";

// Simple Page component (kept for completeness)
const Page = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className={`w-full h-full flex items-center  justify-center text-center font-semibold text-lg shadow-md ${
        props.className || ""
      }`}
      style={{
        backgroundColor: "white",
        border: "1px solid #ddd",
      }}
    >
      {props.children}
    </div>
  );
});

// Cover Page (optional reusable)
const CoverPage = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-full flex items-center justify-center text-center font-bold text-2xl"
      style={{
        background: "linear-gradient(135deg, #6B21A8, #000)",
        color: "white",
        border: "2px solid #333",
      }}
    >
      {props.children}
    </div>
  );
});

// Star Rating Component
const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: "Website Visitor",
        from_email: "visitor@eyercall.com",
        message: `Rating: ${rating}/5 stars\n\nA visitor rated Eyercall ${rating} out of 5 stars on the website.`,
        to_email: "ceo.eyercall@gmail.com"
      };

      // Use CEO's specific configuration
      const ceoConfig = teamMembers["ceo.eyercall@gmail.com"];

      await emailjs.send(
        ceoConfig.serviceId,
        ceoConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error("Rating submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-green-600 mb-2">Rating Submitted!</h3>
        <p className="text-sm text-gray-600">Thank you for rating us {rating}/5 stars!</p>
        <p className="text-xs text-gray-500 mt-2">Your feedback has been sent to our team.</p>
      </div>
    );
  }

  return (
    <div 
      className="text-center"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      {/* Stars */}
      <div 
        className="flex justify-center space-x-2 mb-6"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setRating(star);
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
              setHover(star);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setHover(0);
            }}
            className="text-4xl transition-all duration-200 hover:scale-110 focus:outline-none"
          >
            <FaStar
              className={`${
                star <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Rating Text */}
      <div 
        className="mb-6"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-semibold text-gray-800">
          {rating === 0 ? "Select a rating" : `You rated us ${rating}/5 stars`}
        </p>
        {rating > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent!"}
          </p>
        )}
      </div>

      {/* Submit Button */}
      {rating > 0 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleRatingSubmit();
          }}
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Rating"}
        </button>
      )}
    </div>
  );
};

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
    
    // Check if all fields are filled
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
      const memberConfig = teamMembers[memberEmail] || emailjsConfig;
      
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
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-xl font-medium text-gray-700 mb-1">
              Your Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

function MyBook() {
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

  // Create an encoded SVG data URI for the subtle leather pores — this avoids messy escaping in JSX.
  const poresSVG = "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>" +
    "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>" +
    "<feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0'/></filter>" +
    "<rect width='100%' height='100%' filter='url(%23n)'/></svg>";
  const poresDataUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(poresSVG)}")`;

  return (
    <div className=" bg-gradient-to-tr from-purple-300 to-gray-100 dark:bg-gradient-to-tr dark:from-gray-900 dark:to-purple-700 text-gray-800 dark:text-white py-12 px-6 flex items-center justify-center z-50  theme-transition pt-[120px] pb-[250px]">
      <HTMLFlipBook
        width={370}
        height={500}
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true}
        size="fixed"
      >
        {/* --- COVER: realistic brown leather look --- */}
        <div className="relative w-full h-full shadow-gray-700 rounded-2xl overflow-hidden">
          {/* Base leather radial gradient */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'radial-gradient(120% 90% at 50% 25%, #9c6a3c 0%, #7a4c28 40%, #59361d 70%, #3b2314 100%)',
            }}
          />

          {/* Fine leather pores (data URI) */}
          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
            style={{
              backgroundImage: poresDataUrl,
              backgroundSize: "140px 140px",
            }}
          />

          {/* Leather grain (subtle streaks) */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)',
            }}
          />

          {/* Spine shading */}
          <div
            className="absolute top-0 left-[8%] h-full w-[7%] rounded-l-2xl opacity-60"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.55), rgba(255,255,255,0.12) 35%, rgba(0,0,0,0.5))',
              filter: 'blur(0.5px)',
            }}
          />

          {/* Page block hint (edge) */}
          <div
            className="absolute top-[4%] right-[3%] h-[92%] w-[1.5%] rounded-r-2xl opacity-30"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.35), rgba(255,255,255,0.5) 45%, rgba(0,0,0,0.6))',
              filter: 'blur(0.4px)',
            }}
          />

          {/* Edge bevel */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.55), inset 0 0 0 2px rgba(0,0,0,0.35)',
            }}
          />

          {/* Gloss highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(60% 30% at 50% 28%, rgba(255,255,255,0.25), rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 60%)',
              mixBlendMode: 'screen',
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ boxShadow: 'inset 0 0 140px 40px rgba(0,0,0,0.65)' }}
          />

          {/* Foreground content (title) */}
          <div className="relative z-10 flex flex-col justify-center items-center h-full">
            <h1 className="font-bold mt-[10px] text-2xl md:text-4xl text-amber-100 drop-shadow-md">Eyercall</h1>
            <p className="w-[240px] md:w-[280px] text-xs md:text-sm text-amber-100 mt-[200px] md:mt-[280px] text-center">"Small steps, great journeys—together we build the future."</p>
          </div>
        </div>


        {/* page 1 */}

        {/* --- INNER PAGES (demo) --- */}
        <div className="demopage">
          <div className="flex flex-col items-center justify-center text-center p-10 bg-amber-50  h-[500px] rounded-2xl shadow-md">
  {/* Heading */}
  <h1 className="text-3xl md:text-3xl font-extrabold text-gray-900">
    Welcome to <span className="text-indigo-600">Eyercall</span>
  </h1>

  {/* Tagline */}
  <h3 className="text-lg md:text-xl font-semibold text-gray-600 mt-3 italic">
    Seamless Video Meetings, Smarter Collaboration
  </h3>

  {/* Divider */}
  <div className="w-20 h-1 bg-indigo-600 mt-4 mb-6 rounded-full"></div>

  {/* Intro Text */}
  <p className="text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed">
    <span className="font-bold text-indigo-600">Eyercall</span> is a modern video 
    conferencing platform that provides a seamless experience beyond Zoom and Google 
    Meet. It is designed not only for professional meetings but also for online learning 
    and effective collaboration.
  </p>
</div>
 </div>



               {/* page 2 */}
<div className="flex flex-col items-center justify-center text-center p-4 md:p-6 pt-8 md:pt-12 bg-amber-50 h-[400px] md:h-[500px] rounded-xl shadow-md">
  {/* Page Title */}
  <h2 className="text-3xl font-bold text-gray-900 mb-4">
    What <span className="text-indigo-600">Eyercall</span> Offers
  </h2>

  {/* Short Description */}
  <p className="text-gray-700 text-sm sm:text-md text-justify max-w-xl mb-6 leading-relaxed">
    Eyercall is not just about video calls. It also provides a real-time chat system 
    and smart collaboration tools. Our mission is to give businesses, students, and 
    professionals a single platform where communication and learning are smooth and effective.
  </p>

  {/* Features Boxes */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
    <div className="p-3 bg-indigo-100 rounded-lg shadow hover:bg-indigo-200 transition-colors">
      <h4 className="font-semibold text-indigo-700">🎥 HD Video Calls & Meetings</h4>
    </div>
    <div className="p-3 bg-indigo-100 rounded-lg shadow hover:bg-indigo-200 transition-colors">
      <h4 className="font-semibold text-indigo-700">💬 Real-time Chat System</h4>
    </div>
    <div className="p-3 bg-indigo-100 rounded-lg shadow hover:bg-indigo-200 transition-colors">
      <h4 className="font-semibold text-indigo-700">🔒 Secure & Reliable Platform</h4>
    </div>
    <div className="p-3 bg-indigo-100 rounded-lg shadow hover:bg-indigo-200 transition-colors">
      <h4 className="font-semibold text-indigo-700">🖱 Easy-to-use Interface</h4>
    </div>
  </div>
</div>






<div className="demopage bg-amber-50 flex items-center justify-center  ">
  <div className="h-[500px] md:h-[500px] w-[370px] md:w-[370px]  bg-amber-50 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-4 md:p-6 flex flex-col items-center text-center relative">
    
    {/* Decorative Gradient Circle Background */}
    <div className="absolute top-0 left-0 w-full h-1/3 rounded-t-2xl"></div>

    {/* CEO Image */}
     <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg mb-4">
    <img 
      src="./images/ceo.png" 
      alt="Team Member" 
      className="w-full h-full object-cover bg-gray-300"
    />
  </div>
    {/* CEO Name */}
    <h2 className="mt-4 text-2xl font-bold text-gray-800">Muhammad Asad</h2>

    {/* CEO Title */}
    <p className="text-sm font-bold text-blue-600">Chief Executive Officer - Eyercall</p>

    {/* Divider */}
    <div className="w-16 h-[2px] bg-blue-600 my-3 rounded-full"></div>

    {/* Short Bio */}
    <p className="text-gray-600 text-sm leading-relaxed px-4 text-justify">
      Driving Eyercall’s mission forward with innovation, trust, and a vision to deliver 
      clean water solutions worldwide. Focused on long-term growth and social impact.
    </p>

    {/* Achievements / Highlights */}
    <ul className="mt-4 text-sm text-gray-700 space-y-1 text-left -ml-[60px]">
      <li>✔ 10+ Years of Industry Experience</li>
      <li>✔ Visionary Leadership</li>
      <li>✔ Social Impact Initiatives</li>
    </ul>

    {/* Contact / Social Links */}
    <div className="mt-auto flex justify-center gap-6 pb-3">
      <a href="https://linkedin.com" target="_blank" rel="noreferrer">
        <i className="bi bi-linkedin text-2xl text-blue-600 hover:text-blue-800 transition"></i>
      </a>
      <a href="mailto:ceo@eyercall.com">
        <i className="bi bi-envelope text-2xl text-red-500 hover:text-red-700 transition"></i>
      </a>
    </div>
  </div>
</div>





<div className="demopage bg-amber-50  py-10">
  <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
    <h1 className="font-bold text-gray-800  text-2xl underline">
      CEO - Idea and Vision
    </h1>

    {/* Paragraph */}
    <p className="mt-6 text-gray-700 text-justify leading-relaxed text-sm w-[300px]">
      <span className="font-semibold">M. Asad</span> is the visionary founder and CEO of 
      <span className="font-semibold"> Eyercall</span>, a next-generation video communication 
      platform designed to redefine the way people connect, collaborate, and learn. His idea for Eyercall 
      was born from a passion to create a secure, reliable, and student-friendly alternative 
      to global platforms integrating not only seamless video calling 
      but also real-time chat and collaboration tools.
    </p>
    <p className="text-justify text-sm  w-[300px] text-gray-700 mt-6">
      <span className="font-semibold">M. Asad</span> envisions Eyercall as a global platform that helps students, teachers, and professionals connect easily. His vision is to make Eyercall advanced yet simple, accessible for everyone, and impactful by bridging gaps in learning and communication worldwide.
    </p>

  
  </div>
</div>






                {/* Page 3 - Team Member */}
<div className="demopage flex flex-col items-center justify-center text-center p-6 bg-amber-50 h-[500px] rounded-xl shadow-md">
  {/* Profile Image */}
  <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg mb-4 ml-[87px] ">
    <img 
      src="./images/hussnain.png" 
      alt="Team Member" 
      className="w-full h-full object-cover bg-gray-300"
    />
  </div>

  {/* Name */}
  <h2 className="text-2xl font-bold text-gray-900">Muhammad Hussnain</h2>

  {/* Role */}
  <p className="text-indigo-600 font-semibold mt-1">Cybersecurity Specialist</p>

  {/* Email */}
  <p className="text-gray-600 mt-1 font-bold">Hussnain@gmail.com
  <button
    onClick={() => openContactModal("Umer Mughal", "developer.eyercall@gmail.com")}
    className=" px-1 py-1 ml-9 w-[250px] bg-indigo-600 justify-center text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 text-xs"
    >
    <FaEnvelope className="w-4 h-4" />
    Contact Me
  </button>
  </p>


  {/* Short Paragraph */}
  <p className="text-gray-700 text-justify max-w-md mt-3 leading-relaxed ">
    I am part of the Eyercall team, focusing on cybersecurity and ensuring all our video 
    meetings, chat systems, and collaboration tools are safe and reliable for businesses, 
    students, and professionals.
  </p>

  {/* Social Icons - left aligned */}
  <div className="flex space-x-4 mt-4 ml-[107px] ">
    <a href="https://linkedin.com/in/ahmedkhan" target="_blank" rel="noreferrer">
      <FiLinkedin className="w-6 h-6 text-indigo-600 hover:scale-110 transition-transform"/>
    </a>
    <a href="https://twitter.com/ahmedkhan" target="_blank" rel="noreferrer">
      <FiTwitter className="w-6 h-6 text-blue-400 hover:scale-110 transition-transform"/>
    </a>
    <a href="https://github.com/ahmedkhan" target="_blank" rel="noreferrer">
      <FiGithub className="w-6 h-6 text-gray-800 hover:scale-110 transition-transform"/>
    </a>
  </div>
</div>





        {/* Page 4 - Team Member Skills */}
<div className=" demopage flex flex-col items-center justify-center p-6 bg-amber-50 h-[500px] rounded-xl shadow-md border-s-black border-solid">
  
  {/* Title */}
  <h2 className="text-xl font-bold text-gray-900 mb-4">Muhammad Hussnain - <span className="text-indigo-600">Skills & Expertise</span></h2>

  {/* Skills Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-2 gap-5 text-center mt-10">
    
    {/* Cybersecurity */}
    <div className="flex flex-col items-center">
      <FiShield className="w-7 h-7 text-indigo-600 mb-2" />
      <p className="font-semibold text-gray-800">Cybersecurity</p>
    </div>

    {/* SEO */}
    <div className="flex flex-col items-center">
      <FiTrendingUp className="w-7 h-7 text-green-600 mb-2" />
      <p className="font-semibold text-gray-800">SEO</p>
    </div>

    {/* Digital Marketing */}
    <div className="flex flex-col items-center">
      <FiGlobe className="w-7 h-7 text-blue-500 mb-2" />
      <p className="font-semibold text-gray-800">Digital Marketing</p>
    </div>

    {/* Data Analysis */}
    <div className="flex flex-col items-center">
      <FiBarChart2 className="w-7 h-7 text-purple-500 mb-2" />
      <p className="font-semibold text-gray-800">Data Analysis</p>
    </div>
  </div>

  {/* Experience Section */}
  <div className="mt-6 text-justify max-w-md">
    <h3 className="text-lg font-bold text-indigo-600 text-center mb-2">Experience</h3>
    <p className="text-gray-700 leading-relaxed text-justfy">
      Ahmed Khan has over <span className="font-semibold">5 years of experience</span> in 
      cybersecurity, digital marketing, and SEO. He specializes in protecting 
      digital platforms, growing online businesses, and making communication tools 
      like Eyercall secure and efficient.
    </p>
  </div>
</div>




         {/* Page 3 - Team Member */}
<div className="demopage flex flex-col items-center justify-center text-center p-6 bg-amber-50 h-[500px] rounded-xl shadow-md">
  {/* Profile Image */}
  <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg mb-4 ml-[86px]">
    <img 
      src="/images/Umer.png" 
      alt="Team Member" 
      className=" bg-gray-300 w-full h-40 object-center "
    />
  </div>

  {/* Name */}
  <h2 className="text-2xl font-bold text-gray-900">Muhammad Umer</h2>

  {/* Role */}
  <p className="text-indigo-600 font-semibold mt-1">Full stack developer</p>

  {/* Email */}
  <p className="text-gray-800 mt-1 font-bold">developer.eyercall@gmail.com
  <button
    onClick={() => openContactModal("Umer Mughal", "developer.eyercall@gmail.com")}
    className=" px-1 py-1 ml-9 w-[250px] bg-indigo-600 justify-center text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 text-xs"
    >
    <FaEnvelope className="w-4 h-4" />
    Contact Me
  </button>
  {/* Contact Button */}
    </p>
  {/* Short Paragraph */}
  <p className="text-gray-700 text-justify max-w-md mt-3 leading-relaxed">
    I am a full-stack developer at Eyercall, building robust and scalable web applications. I focus on creating efficient, reliable, and user-friendly digital solutions for businesses and individuals.
  </p>

  {/* Social Icons - left aligned */}
  <div className="flex space-x-4 mt-4 self-start ml-[109px]">
    <a href="https://linkedin.com/in/umer-mughal-7461a7373" target="_blank" rel="noreferrer">
      <FiLinkedin className="w-6 h-6 text-indigo-600 hover:scale-110 transition-transform"/>
    </a>
    <a href="https://x.com/1umermughal" target="_blank" rel="noreferrer">
      <FiTwitter className="w-6 h-6 text-blue-400 hover:scale-110 transition-transform"/>
    </a>
    <a href="https://github.com/GymAurCode/" target="_blank" rel="noreferrer">
      <FiGithub className="w-6 h-6 text-gray-800 hover:scale-110 transition-transform"/>
    </a>
  </div>
</div>





{/* page 6 */}
<div className="demopage flex flex-col items-center justify-center bg-amber-50">
  <div className="flex flex-col items-center justify-start w-[370px] sm:w-[370px] min-h-[500px] bg-amber-50 shadow-lg rounded-xl p-4 sm:p-6">
    
    {/* Title */}
    <h2 className="text-xl font-bold text-gray-900 mb-4">Umer Mughal - <span className="text-indigo-600">Skills & Expertise</span></h2>

    {/* Icons Grid */}
    <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-6 w-full justify-items-center p-1 sm:p-3 text-white/80">
      {[
        <FaHtml5 className="text-orange-500 text-2xl sm:text-3xl md:text-4xl bi bi-html5" />,
<FaCss3Alt className="text-blue-500 text-2xl sm:text-3xl md:text-4xl bi bi-css3" />,
<FaJs className="text-yellow-400 text-2xl sm:text-3xl md:text-4xl bi bi-js" />,
<SiBootstrap className="text-purple-600 text-2xl sm:text-3xl md:text-4xl bi" />,
<SiTailwindcss className="text-blue-400 text-2xl sm:text-3xl md:text-4xl bi" />,
<FaReact className="text-blue-400 text-2xl sm:text-3xl md:text-4xl bi bi-react" />,
<FaNodeJs className="text-green-600 text-2xl sm:text-3xl md:text-4xl bi bi-node" />,
<SiExpress className="text-gray-700 text-2xl sm:text-3xl md:text-4xl bi" />,
<SiSqlite className="text-blue-400 text-2xl sm:text-3xl md:text-4xl bi" />,
<SiMongodb className="text-green-500 text-2xl sm:text-3xl md:text-4xl bi" />,
<FaDocker className="text-blue-400 text-2xl sm:text-3xl md:text-4xl bi bi-docker" />,
<FaGithub className="text-gray-800 text-2xl sm:text-3xl md:text-4xl bi bi-github" />,
<FaGitAlt className="text-red-500 text-2xl sm:text-3xl md:text-4xl bi bi-git" />,
<SiGreensock className="text-green-400 text-2xl sm:text-3xl md:text-4xl bi" />,
<FaDatabase className="text-indigo-500 text-2xl sm:text-3xl md:text-4xl bi bi-database" />,
<SiTypescript className="text-blue-600 text-2xl sm:text-3xl md:text-4xl bi" />,
<SiElectron className="text-gray-600 text-2xl sm:text-3xl md:text-4xl bi" />,
<SiPrisma className="text-teal-400 text-2xl sm:text-3xl md:text-4xl bi" />,
<SiPostgresql className="text-sky-600 text-2xl sm:text-3xl md:text-4xl bi bi-postgresql" />,
<SiThreedotjs className="text-black text-2xl sm:text-3xl md:text-4xl bi" />,
<SiNextdotjs className="text-black text-2xl sm:text-3xl md:text-4xl bi" />,


      ].map((icon, index) => (
        <div
          key={index}
          className="flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          {icon}
        </div>
      ))}
    </div>

    {/* Experience Section */}
    <h2 className="text-xl sm:text-xl font-bold mt-6 mb-3 text-black">
      Experience
    </h2>
    <p className="text-xs sm:text-sm text-gray-600 text-justify leading-relaxed">
      I have over 2 years of professional experience as a Full-Stack Developer, specializing in building robust, scalable web applications using modern frontend and backend technologies. I focus on designing efficient architectures, integrating databases seamlessly, and delivering smooth end-to-end user experiences with clean, maintainable code.
    </p>
  </div>
</div>







                {/* Page 3 - Team Member */}
<div className="flex flex-col items-center text-center justify-start p-6 bg-amber-50 h-[500px] rounded-xl shadow-md">
  {/* Profile Image */}
  <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg mb-4 ml-[86px]">
    <img 
      src="/images/waleed.jpg" 
      alt="Team-ready" 
      className="w-full h-full object-cover"
    />
  </div>

  {/* Name */}
  <h2 className="text-2xl font-bold text-gray-900">Waleed jafar</h2>

  {/* Role */}
  <p className="text-indigo-600 font-semibold mt-1">Senior Front-end developer</p>

  {/* Email */}
  <p className="text-gray-800 mt-1 font-bold">developer2.eyercall@gmail.com
  <button
    onClick={() => openContactModal("Umer Mughal", "developer.eyercall@gmail.com")}
    className=" px-1 py-1 ml-9 w-[250px] bg-indigo-600 justify-center text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 text-xs"
    >
    <FaEnvelope className="w-4 h-4" />
    Contact Me
  </button>
  </p>

  

  {/* Short Paragraph */}
  <p className="text-gray-700 text-justify max-w-md mt-3 leading-relaxed">
    I am part of the Eyercall team, focusing on cybersecurity and ensuring all our video 
    meetings, chat systems, and collaboration tools are safe and reliable for businesses, 
    students, and professionals.
  </p>

  {/* Social Icons - left aligned */}
  <div className="flex space-x-4 mt-4 self-start ml-[109px]">
    <a href="https://linkedin.com/in/ahmedkhan" target="_blank" rel="noreferrer">
      <FiLinkedin className="w-6 h-6 text-indigo-600 hover:scale-110 transition-transform"/>
    </a>
    <a href="https://twitter.com/ahmedkhan" target="_blank" rel="noreferrer">
      <FiTwitter className="w-6 h-6 text-blue-400 hover:scale-110 transition-transform"/>
    </a>
    <a href="https://github.com/ahmedkhan" target="_blank" rel="noreferrer">
      <FiGithub className="w-6 h-6 text-gray-800 hover:scale-110 transition-transform"/>
    </a>
  </div>
</div>



        
        
                 {/* page 6 */}
<div className="demopage flex flex-col items-center justify-center bg-amber-50">
  <div className="flex flex-col items-center justify-start w-[370px] h-[500px] bg-amber-50 shadow-lg rounded-xl p-6">
    
    {/* Title */}
    <h2 className="text-xl font-bold text-gray-900 mb-4">Waleed jafar - <span className="text-indigo-600">Skills & Expertise</span></h2>

    {/* Icons Grid */}
    <div className="grid grid-cols-3 sm:grid-cols-3 gap-7 w-full justify-items-center p-4 text-white/80">
      {[
        <FaHtml5 className="text-orange-500 text-4xl" />,
        <FaCss3Alt className="text-blue-500 text-4xl" />,
        <FaJs className="text-yellow-400 text-4xl" />,
        <FaReact className="text-blue-400 text-4xl" />,
        <FaGithub className="text-gray-800 text-4xl" />,
        <FaGitAlt className="text-red-500 text-4xl" />,
        <SiGreensock className="text-green-400 text-4xl" />,
<SiTypescript className="text-blue-600 text-2xl sm:text-3xl md:text-4xl bi" />,
<SiTailwindcss className="text-blue-400 text-2xl sm:text-3xl md:text-4xl bi" />,


      ].map((icon, index) => (
        <div
          key={index}
          className="flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          {icon}
        </div>
      ))}
    </div>

    {/* Experience Section */}
    <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800">
      Experience
    </h2>
    <p className="text-sm text-gray-600 text-justify">
      I have over 2 years of professional experience in web development, 
      working on both frontend and backend technologies. I have developed 
      and maintained responsive web applications, optimized performance, 
      and collaborated on scalable solutions using modern frameworks and tools.
    </p>
  </div>
</div>






           <div className="demopage w-[370px] h-[500px] flex flex-col items-center justify-center text-center rounded-2xl  bg-amber-50 p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-amber-900 mb-4">Thank You!</h2>

      {/* Message */}
      <p className="text-sm text-gray-700 leading-relaxed mb-6">
        We appreciate your time exploring our journey. <br />
        Together, let’s build a future full of innovation and connection.
      </p>

      {/* Divider */}
      <div className="w-20 h-[2px] bg-amber-400 mb-6"></div>

      {/* Closing Note */}
      <p className="text-xs text-gray-600 italic">
        “This is just the beginning of something big.”
      </p>

      {/* Footer Note */}
      <footer className="absolute bottom-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Eyercall — Crafted with ❤️ by Our Team
      </footer>
    </div>





  
   <div className="demopage flex flex-col items-center justify-center bg-amber-50">
  <div className="flex flex-col items-center justify-center w-[370px] h-[500px] bg-amber-50 shadow-lg rounded-xl p-6">
    
    {/* Title */}
    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
      Rate Our Work
    </h2>

    {/* Subtitle */}
    <p className="text-gray-600 text-center mb-8 text-sm">
      How would you rate your experience with Eyercall? Your feedback helps us improve!
    </p>

         {/* Star Rating Component */}
     <div 
       onClick={(e) => e.stopPropagation()} 
       onMouseDown={(e) => e.stopPropagation()}
       onMouseUp={(e) => e.stopPropagation()}
       onTouchStart={(e) => e.stopPropagation()}
       onTouchEnd={(e) => e.stopPropagation()}
       className="w-full flex justify-center"
     >
       <StarRating />
     </div>

    {/* Thank you message */}
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-500">
        Thank you for your feedback! 💝
      </p>
    </div>
  </div>
</div>







{/* --- BACK COVER --- */}
<div className="relative w-full h-full shadow-gray-700 rounded-2xl overflow-hidden">
  {/* Base leather radial gradient */}
  <div
    className="absolute inset-0 rounded-2xl"
    style={{
      background:
        'radial-gradient(120% 90% at 50% 25%, #9c6a3c 0%, #7a4c28 40%, #59361d 70%, #3b2314 100%)',
    }}
  />

  {/* Fine leather pores (reuse same SVG) */}
  <div
    className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
    style={{
      backgroundImage: poresDataUrl,
      backgroundSize: "140px 140px",
    }}
  />

  {/* Spine shading */}
  <div
    className="absolute top-0 left-[85%] h-full w-[7%] rounded-r-2xl opacity-50"
    style={{
      background:
        "linear-gradient(90deg, rgba(0,0,0,0.55), rgba(255,255,255,0.12) 35%, rgba(0,0,0,0.5))",
      filter: "blur(0.5px)",
    }}
  />

  {/* Vignette */}
  <div
    className="absolute inset-0 rounded-2xl pointer-events-none"
    style={{ boxShadow: "inset 0 0 140px 40px rgba(0,0,0,0.65)" }}
  />

  {/* Foreground content */}
  <div className="relative z-10 flex justify-center items-center h-full">
    <h1 className="font-bold text-2xl text-amber-100 italic tracking-wider">
      Thank You
    </h1>
  </div>
</div>
      
        
      </HTMLFlipBook>
      
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

export default MyBook;
