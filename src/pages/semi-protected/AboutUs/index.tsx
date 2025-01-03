import React from "react";
// import { Link } from "react-router-dom";
// import Ic_left_arrow from "@/assets/images/Ic_left_arrow.svg";
// import Ic_right_breadCrumb_arrow from "@/assets/images/Ic_right_breadCrumb_arrow.svg";
import Img_about_us from "@/assets/images/Img_about_us.png";

export const AboutUs: React.FC = () => {
  return (
    <div className="relative">
      <div className="bg-lightYellow relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-6 md:py-[61px]">
        {/* <nav className="flex items-center gap-2 mb-5 md:mb-8">
          <Link to={"/companies"}>
            <img src={Ic_left_arrow} alt="arrow" />
          </Link>
          <Link to={"/"}>
            <span className="text-primary text-sm font-semibold">Home</span>
          </Link>
          <img src={Ic_right_breadCrumb_arrow} alt="arrow" />
          <span className="text-gray text-sm">AboutUs</span>
        </nav> */}
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-primary text-2xl sm:text-3xl md:text-4xl desktop:text-5xl desktop:leading-[60px] font-semibold">
            About Us
          </h2>
          <p className="text-gray text-sm md:text-base desktop:text-lg">
            Connecting talented UX professionals with great opportunities.
          </p>
        </div>
      </div>
      <div className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[44px] desktop:py-[72px] flex flex-col md:flex-row items-center gap-[30px] md:gap-[40px] desktop:gap-[100px]">
        <img
          src={Img_about_us}
          alt="image"
          className="w-[70%] sm:w-[50%] md:w-[40%] lg:w-auto"
        />
        <div>
          <h3 className="text-primary font-semibold text-xl md:text-2xl desktop:text-[2rem] mb-2 md:mb-4 lg:mb-8">
            Who we are?
          </h3>
          <p className="text-sm md:text-base lg:text-lg desktop:text-xl text-gray">
            We are a dedicated platform designed to connect UX professionals
            with meaningful opportunities. With a focus on simplicity and
            user-centered design, we aim to streamline the job search process
            for UX designers, researchers, and creators, while helping employers
            find top talent in the field. Our mission is to empower the UX
            community by providing a seamless, intuitive space to explore,
            showcase, and grow.
          </p>
        </div>
      </div>
    </div>
  );
};
