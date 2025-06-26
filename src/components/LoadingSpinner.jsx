import React from "react";
import logo from '../assets/tt.svg';


const LoadingSpinner = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <div className="text-center">
        <img
          src={logo}
          alt="Tick-Track Logo"
          className="h-20 animate-pulse mx-auto"
        />
        <p className="text-neutral-400 mt-4 doto">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
