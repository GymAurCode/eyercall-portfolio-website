import { useState, useEffect } from "react";

function ThemeImage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    // Initial check
    setIsDark(html.classList.contains("dark"));

    // Observe <html> class changes
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <img
      src={isDark ? "/images/eyercall-gif.gif" : "/images/lightmoodlogo.gif"}
      alt="Eyercall Logo"
      className="w-40 h-auto"
    />
  );
}

export default ThemeImage;
