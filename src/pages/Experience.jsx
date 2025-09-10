import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

export default function Experience() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // duration in ms, animate once
  }, []);

  const categories = [
    {
      title: "Automation Projects",
      projects: [
        "Smart Home Automation",
        "Factory Robot Control",
        "Automated Attendance System",
        "Industrial Conveyor Control",
        "IoT Sensor Automation",
        "Automated Lighting System",
        "Home Security Automation",
        "Smart Irrigation System",
        "Automated Inventory Control",
        "Office Automation Dashboard",
      ],
    },
    {
      title: "Database Projects",
      projects: [
        "Student Management System",
        "Library Database Management",
        "Hospital Record System",
        "E-commerce Database Design",
        "Banking Transaction System",
        "Inventory Database System",
        "Hotel Booking Database",
        "Employee Payroll System",
        "School Admission System",
        "Warehouse Management DB",
      ],
    },
    {
      title: "AI & ML Projects",
      projects: [
        "Chatbot Assistant",
        "Image Recognition App",
        "Stock Price Predictor",
        "Sentiment Analysis Tool",
        "Recommendation System",
        "Voice Command AI",
        "AI Game Bot",
        "Handwriting Recognition",
        "Facial Recognition System",
        "ML Spam Classifier",
      ],
    },
    {
      title: "Final Year Projects",
      projects: [
        "Eyercall Meeting App",
        "Online Quiz Platform",
        "Portfolio Builder Website",
        "E-Learning System",
        "Recipe Recommendation App",
        "Fitness Tracker App",
        "Event Management Portal",
        "Job Portal Platform",
        "Online Voting System",
        "Blog CMS System",
      ],
    },
    {
      title: "Web & Mobile Apps",
      projects: [
        "React E-commerce Platform",
        "Task Manager App",
        "Social Media Dashboard",
        "Video Streaming App",
        "Photo Editing Mobile App",
        "Cross-platform Chat App",
        "Weather Forecast App",
        "Travel Booking App",
        "Music Streaming Platform",
        "Online Polling App",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr pt-32 from-purple-300 to-gray-100 dark:from-purple-900 dark:to-black flex flex-col items-center justify-center relative z-30 py-16 pb-[200px]">
      <h1
        data-aos="fade-down"
        className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-700 via-blue-500 to-pink-600 bg-clip-text text-transparent dark:text-white mb-12 text-center"
      >
        Our Experience
      </h1>

      <div className="grid gap-10 w-full max-w-6xl px-6">
        {categories.map((category, catIndex) => (
          <div
            key={catIndex}
            data-aos="fade-up"
            data-aos-delay={catIndex * 100}
            className="bg-violet-300  dark:bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-700 via-blue-500 to-pink-600 bg-clip-text text-transparent dark:text-white mb-4">
              {category.title}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.projects.map((project, projIndex) => (
                <div
                  key={projIndex}
                  data-aos="zoom-in"
                  data-aos-delay={projIndex * 50}
                  className="bg-gray-400  dark:bg-white/10 backdrop-blur-lg border border-gray-500 dark:border-white/20 p-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 text-center"
                >
                  <h3 className="text-gray-800 dark:text-white font-medium text-sm">{project}</h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        data-aos="fade-up"
        className="text-center mt-12"
      >
        <div className="inline-block bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg mb-6">
          Interested in your own project?
        </div>

        <Link to="/contact">
          <button className="cont-foot mt-4 ml-4 bg-gray-400 dark:bg-white/20 backdrop-blur-lg text-black/80 dark:text-white font-semibold px-8 py-4 rounded-2xl border border-gray-500 dark:border-white/30 hover:bg-white transition-all duration-200 dark:hover:border-solid  dark:hover:border-black dark:hover:bg-gradient-to-r dark:hover:from-gray-900 dark:hover:to-purple-900 ">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
}
