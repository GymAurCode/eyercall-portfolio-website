import { motion, useMotionValue, useTransform } from "framer-motion";
import { Video, MessageCircle, Code } from "lucide-react";

function TiltCard({ title, desc, Icon, delay }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // tilt range
  const rotateX = useTransform(y, [0, 1], [15, -15]);
  const rotateY = useTransform(x, [0, 1], [-15, 15]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    let xPos = (e.clientX - rect.left) / rect.width;
    let yPos = (e.clientY - rect.top) / rect.height;

    // optional: clamp to avoid corner glitches
    xPos = Math.min(Math.max(xPos, 0.05), 0.95);
    yPos = Math.min(Math.max(yPos, 0.05), 0.95);

    x.set(xPos);
    y.set(yPos);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <div 
      data-aos="fade-up"
      data-aos-delay={delay}
      className="w-full max-w-sm"
    >
      <motion.div
        className="h-80 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-md 
                   border border-gray-200 dark:border-white/20 shadow-xl flex flex-col items-center 
                   justify-center text-gray-800 dark:text-white p-6 cursor-pointer 
                   hover:border-purple-400 hover:shadow-purple-500/30 theme-transition"
        style={{ rotateX, rotateY, willChange: "transform" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Icon className="w-12 h-12 text-purple-300 mb-4" />
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-200 text-center leading-relaxed">{desc}</p>
      </motion.div>
    </div>
  );
}

function CardsSection() {
  return (
    <section className="pt-10 min-h-screen z-30 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-black dark:to-purple-800 flex items-center justify-center px-6 py-12 relative theme-transition">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl justify-items-center">
        <TiltCard
          aos="fade-up"
          delay="50"
          title="Secure Video Meetings"
          desc="Host seamless and secure video meetings with Eyercall. Whether for online classes, business conferences, or personal discussions, enjoy a reliable and user-friendly platform built for crystal-clear communication."
          Icon={Video}
        />

        <TiltCard
          aos="fade-up"
          delay="200"
          title="Messaging & Courses"
          desc="Stay connected with built-in messaging for students and teachers, while also exploring a wide range of academic and professional courses to enhance your skills—all in one place."
          Icon={MessageCircle}
        />

        <TiltCard
          aos="fade-up"
          delay="300"
          title="Customs Website & More"
          desc="Get powerful, customized digital solutions tailored to your needs. From modern websites to advanced software development, Eyercall delivers everything you need to grow and scale your business."
          Icon={Code}
        />
      </div>
    </section>
  );
}

export default CardsSection;
