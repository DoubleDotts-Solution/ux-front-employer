/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ButtonUx from "@/components/common/button";
import Img_hero_sec_img from "@/assets/images/Img_hero_sec_img.png";
import { Login } from "@/pages/public";
import MadeInIndiaImg from "@/assets/images/Img_made_in_india.png";
import { Link } from "react-router-dom";

const MainSection: React.FC<{ isUserLogin: any }> = ({ isUserLogin }) => {
  return (
    <>
      <div className="bg-lightChiku2 py-[48px] md:py-[72px] big:py-[100px] relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] flex flex-col lg:flex-row gap-[40px] laptop:gap-[68px] sBig:gap-[200px]">
        <div className="w-full lg:w-[50%] desktop:w-[60%]">
          <h1 className="text-[32px] md:text-4xl lg:text-5xl big:text-7xl lg:leading-[60px] big:leading-[100px] font-semibold text-primary mb-4">
            Hire the Best UX Talent, Effortlessly!
          </h1>
          <p className="text-gray text-base sm:text-lg md:text-xl desktop:text-[20px] mb-4 md:mb-6 desktop:mb-8">
            From single projects to full-team hires, connect seamlessly with
            exceptional design professionals on our platform.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 relative">
            <Link to={"/post-job"}>
              <ButtonUx
                label="Post a Job for Free"
                buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 desktop:px-8 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-12"
              />
            </Link>
            <Link to={"/find-talent"}>
              <ButtonUx
                label="Explore Candidates"
                buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-6 desktop:px-8 py-2 h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
              />
            </Link>
          </div>
          {!isUserLogin && (
            <img
              src={Img_hero_sec_img}
              alt="image"
              className="mt-[36px] lg:mt-[44px] w-[226px]"
            />
          )}
        </div>
        {!isUserLogin ? (
          <div className="w-full lg:w-[50%] desktop:w-[40%]">
            <Login />
          </div>
        ) : (
          <div className="w-full lg:w-[50%] desktop:w-[40%] flex justify-end">
            <img src={Img_hero_sec_img} alt="image" className="" />
          </div>
        )}
        {!isUserLogin ? (
          <img
            src={MadeInIndiaImg}
            alt="Made in India"
            className="made_in_india bottom-[32px] laptop:bottom-[132px] right-[16px] laptop:right-[24px] w-[56px] h-[56px] lg:w-[66px] laptop:w-auto lg:h-[66px] laptop:h-[80px] hidden md:block absolute"
          />
        ) : (
          <img
            src={MadeInIndiaImg}
            alt="Made in India"
            className="made_in_india bottom-[32px] laptop:bottom-[-132px] right-[16px] laptop:right-[24px] w-[56px] h-[56px] lg:w-[66px] laptop:w-auto lg:h-[66px] laptop:h-[80px] hidden md:block absolute"
          />
        )}
      </div>
    </>
  );
};

export default MainSection;
