import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import AOS from "aos";          // AOS import
import "aos/dist/aos.css";      // AOS CSS import

function Main() {
  console.log("Main component rendering");
  useEffect(() => {
    console.log("Main useEffect running - initializing AOS");
    AOS.init({
      duration: 800, // har animation ki speed (ms)
    });
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
