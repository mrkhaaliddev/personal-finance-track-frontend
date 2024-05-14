import React, { useEffect, useState } from "react";
import JtechLogo from "../assets/Jtech Logo.png";
import image from "../assets/image.jpeg";
import khalid from "../assets/khalid.png";
import myPic from "../assets/myPic.png";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, Circle } from "react-feather";
const SideImages = () => {
  const navigate = useNavigate();
  const Sliders = [
    {
      url: khalid,
    },
    {
      url: image,
    },

    {
      url: myPic,
    },
    {
      url: image,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? Sliders.length - 1 : currentIndex - 1);
  };
  const nextSlide = () => {
    setCurrentIndex(currentIndex === Sliders.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(); // Move to the next slide
    }, 3000); // Change this value to 3000 for a 3-second delay

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentIndex, Sliders.length]); // Dependencies array includes things that if changed, should re-setup the interval

  const gotoSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div>
      <div className="w-full lg:mx-14 lg:my-0">
        <div className="cursor-pointer Logo">
          <img
            src={JtechLogo}
            onClick={() => navigate("#")}
            alt=""
            width={110}
          />
        </div>
        <section className="max-w-[500px] h-[450px] w-full ml-5 relative">
          {/* <img src={image} alt="" width={500} className="pb-10" /> */}
          <div
            style={{ backgroundImage: `url(${Sliders[currentIndex].url})` }}
            className="w-[425px] h-[400px] bg-center bg-cover duration-500"
          ></div>
        </section>
        <div className="mb-5">
          <h1 className="text-[25px] w-full font-semibold pb-1">
            Welcome back!
          </h1>
          <p className="text-[15px] text-slate-400 font-normal">
            Start managing your finance faster and better
          </p>
          <p className="text-[15px] text-slate-400 font-normal">
            Start managing your finance faster and better
          </p>
        </div>
        <div className="flex items-center ml-40 gap-x-3">
          <div>
            <ChevronLeft
              onClick={prevSlide}
              className="cursor-pointer w-7 h-7 rounded-full text-[#5CB4AD]"
            />
          </div>
          <div className="flex justify-center gap-x-1">
            {Sliders.map((_, slideIndex) => (
              <div key={slideIndex}>
                <Circle
                  key={slideIndex}
                  onClick={() => gotoSlide(slideIndex)}
                  className={`cursor-pointer w-2 h-2 bg-slate-900 rounded-full ${
                    currentIndex === slideIndex ? "" : "opacity-40"
                  }`}
                />
              </div>
            ))}
          </div>
          <div>
            <ChevronRight
              onClick={nextSlide}
              className="cursor-pointer w-7 h-7 rounded-full text-[#5CB4AD]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideImages;
