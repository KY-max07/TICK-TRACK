import React from "react";
import { SignInButton } from "@clerk/clerk-react";
import { Copy } from "lucide-react";
// import SpotlightCard from "../../components/SpotlightCard";


const LandingPage = () => {
  return (
    <div >
      <div className=" w-screen h-screen  relative bg-[url('src/assets/tick-track.jpg')] bg-cover bg-center text-neutral-300">
        <div className="w-full h-full bg-black/50 backdrop-blur-xl">
          <nav className="p-4 px-6 md:px-10 flex items-center justify-between">
            <img
              src="src\assets\tt.svg"
              alt="Tick-Track"
              className="h-4 md:h-7 cursor-pointer"
            />

            <div>
              <SignInButton mode="modal">
                <button className="doto text-md md:text-2xl hover:text-orange-500 relative lg:right-5 cursor-pointer">
                  SignIn
                </button>
              </SignInButton>
            </div>
          </nav>

          <div className="absolute top-80 flex flex-col w-screen justify-center items-center gap-5 md:gap-8">
            <div className="text-center">
              <h1 className="md:text-5xl text-xl  sm:text-2xl font-p font-light uppercase px-2">
                {" "}
                Plan it. track it. Complete it.
              </h1>
            </div>
            <img
              src="src\assets\tick-track-web.png"
              alt=""
              className="w-[70vw] z-100"
            />
            <h1 className="md:text-lg text-xs sm:text-sm  font-bold text-neutral-500 doto px-6 text-center">
              Organize your tasks, manage your time and boost your productivity
            </h1>
          </div>
        </div>
      </div>
      <div className="w-screen lg:min-h-screen  flex flex-col  items-center justify-center bg-[#000003] bg-[radial-gradient(#ffffff14_1px,#000007_1px)] bg-[size:10px_10px] text-neutral-50 ">
      <h2 className="font-light font-p text-[4vw] text-orange-900/80 text-center p-2 md:p-8 relative xl:top-12 bottom-35">
      Create, Organize and Prioritize * Intuitive Drag and Drop * Delete and Manage Tasks
      </h2>
      <SignInButton mode="modal">
        
      <button className=" cursor-pointer text-sm lg:text-2xl doto bg-neutral-800 border-1 rounded-full px-6 relative bottom-24 lg:top-8 hover:bg-neutral-600 transition-colors duration-200 ease-in-out flex items-center py-1 gap-2 justify-center"><div className="h-4 w-4 bg-orange-600 rounded-full"/>
        <h3>Are You Ready To be productive?</h3>
        </button>
      </SignInButton>
      
    
      </div>

      <footer className=" w-screen lg:h-130   h-160 relative bg-[url('src/assets/tick-track.jpg')] bg-cover bg-center text-neutral-300">
        <div className="w-full lg:h-130 h-160 bg-black/50 backdrop-blur-xl relative">
          <div className="grid lg:grid-cols-3 grid-cols-1 w-screen lg:h-60">
            <div className="border-neutral-700 border  bg-white/10 backdrop-blur-2xl p-4 relative ">
              <img
                src="src\assets\tt.svg"
                alt="Tick-Track"
                className="md:h-7 h-4 z-100"
              />
              <div className=" flex gap-3 px-6 relative pr-8 top-3 lg:top-25 lg:border lg:border-neutral-700 p-2 flex-col rounded lg:rounded-none lg:flex-row z-100">
                <h3 className="text-xs text-neutral-400 font-s ">
                  Your feedback and suggestions for improvement are most
                  welcome. Please feel free to share your thoughts.
                </h3>
                <button
                  className="doto hover:text-orange-500 bg-neutral-500/20 p-2 px-4 rounded-full text-neutral-500 flex items-center text-center justify-center cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "koushikyerraguntla@gmail.com"
                    );
                    alert("Email copied to cilpboard");
                  }}
                >
                  <Copy strokeWidth={1.25} className="h-4" />
                  <h4>Email</h4>
                </button>
              </div>
            </div>
            <div className="border-neutral-700 border  bg-white/10 backdrop-blur-2xl p-4">
              <h2 className="lg:text-6xl md:text-2xl text-xl doto text-center lg:text-left z-100">
                Bring your ideas to Live
              </h2>
            </div>
            <div className="border-neutral-700 border  bg-white/10 backdrop-blur-2xl p-4 pr-10 flex flex-col items-end">
             
              <a
                href="http://www.linkedin.com/in/koushik-yerraguntla"
                className="doto text-md md:text-2xl hover:text-orange-500 z-100"
                target="_blank"
                rel="noopener noreferrer"
              >
               LinkedIn
              </a>
              <a
                href="https://github.com/KY-max07"
                className="doto text-md md:text-2xl hover:text-orange-500 z-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.instagram.com/withonly_koushik/"
                className="doto text-md md:text-2xl hover:text-orange-500 z-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                 Instagram 
              </a>
              <a
                href="https://x.com/Koushik_KY"
                className="doto text-md md:text-2xl hover:text-orange-500 z-100"
                target="_blank"
                rel="noopener noreferrer"
                
              >
                X[Twitter]
              </a>
              <a
                href="https://www.facebook.com/"
                className="doto text-md md:text-2xl hover:text-orange-500 z-100"
                target="_blank"
                rel="noopener noreferrer"

              >
                Facebook
              </a>
            </div>
          </div>
          <h3 className=" text-[14vw] font-extrabold bg-gradient-to-b from-neutral-600/50 to-white/0 bg-clip-text text-transparent doto w-screen text-center absolute bottom-24 md:bottom-10 lg:bottom-0 z-100">
            TICK-TRACK
          </h3>
          <h2 className="absolute bottom-5 flex w-full justify-center text-neutral-600 doto text-xs z-100">
            &copy; 2025 Koushik | Roundbex. All Rights Reserved
          </h2>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
