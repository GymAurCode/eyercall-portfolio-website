import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 
                 text-gray-700 dark:text-gray-300 hover:from-violet-200 hover:to-purple-200 
                 dark:hover:from-violet-600 dark:hover:to-purple-600 transition-all duration-300
                 shadow-lg hover:shadow-xl"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <FiSun className="w-5 h-5" />
        ) : (
          <FiMoon className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
