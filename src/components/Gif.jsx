import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function LottieAnimation() {
  return (
    <div className="flex justify-center items-center h-screen bg-transparent px-4">
      {/* Responsive container */}
      <div className="w-[60vw] h-[60vw] max-w-[350px] max-h-[350px] min-w-[250px] min-h-[250px] sm:w-[40vw] sm:h-[40vw] xs:w-[150px] xs:h-[150px] ">
        <DotLottieReact
          src="https://lottie.host/416a729c-fecb-4d8f-b100-6a1044407cd6/0FDR4FjgF6.lottie"
          loop
          autoplay
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default LottieAnimation;
