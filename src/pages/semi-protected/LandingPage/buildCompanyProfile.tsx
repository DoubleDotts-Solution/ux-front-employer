import React from "react";
import Img_buildCompanyProfile from "@/assets/images/Img_buildCompanyProfile.png";
import Img_find_talent from "@/assets/images/Img_find_talent.png";
import Img_success_design from "@/assets/images/Img_success_design.png";
import ButtonUx from "@/components/common/button";
import { Link } from "react-router-dom";

const BuildCompanyProfile: React.FC = () => {
  return (
    <>
      <div className="bg-lightChiku2 py-[48px] md:py-[72px] big:py-[100px] relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] flex flex-col md:flex-row gap-[34px] laptop:gap-[68px] desktop:gap-[110px] justify-end items-center">
        <div className="w-full md:w-[30%] lg:w-[27%] flex items-center justify-center">
          <img
            src={Img_buildCompanyProfile}
            alt="image"
            className="w-[90%] sm:w-[60%] md:w-full"
          />
        </div>
        <div className="w-full md:w-[64%] lg:w-[58%]">
          <h4 className="text-primary font-semibold text-[24px] leading-9 md:text-[32px] desktop:text-[40px] mb-3 lg:mb-5 desktop:leading-[48px]">
            Showcase your Brand, Leave a Lasting Impact
          </h4>
          <p className="text-base sm:text-lg md:text-xl desktop:text-[20px] text-gray mb-4 md:mb-6 desktop:mb-8">
            Create a compelling company profile to highlight your story, values,
            and startup-driven focus. Grow your visibility, connect with
            millions of professionals, and build your brand with ease.
          </p>
          <Link to={"/profile"}>
            <ButtonUx
              label="Build Your Company Profile"
              buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-12"
            />
          </Link>
        </div>
      </div>
      <div className="py-[48px] md:py-[72px] big:py-[100px] relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] flex flex-col-reverse md:flex-row gap-[34px] laptop:gap-[68px] desktop:gap-[110px] justify-end items-center">
        <div className="w-full md:w-[64%] lg:w-[58%]">
          <h4 className="text-primary font-semibold text-[24px] leading-9 md:text-[32px] desktop:text-[40px] mb-3 lg:mb-5 desktop:leading-[48px]">
            A Job Board Designed for Success.
          </h4>
          <p className="text-base sm:text-lg md:text-xl desktop:text-[20px] text-gray mb-4 md:mb-6 desktop:mb-8">
            Reach millions of motivated job seekers with no limits on postings.
            Share detailed job descriptions that include culture, work style,
            and team insights to attract the perfect fit.
          </p>
          <Link to={"/post-job"}>
            <ButtonUx
              label="Post a Job for Free"
              buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-12"
            />
          </Link>
        </div>
        <div className="w-full md:w-[30%] lg:w-[27%] flex items-center justify-center">
          <img
            src={Img_find_talent}
            alt="image"
            className="w-[90%] sm:w-[60%] md:w-full"
          />
        </div>
      </div>
      <div className="bg-lightChiku2 py-[48px] md:py-[72px] big:py-[100px] relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] flex flex-col md:flex-row gap-[34px] laptop:gap-[68px] desktop:gap-[110px] justify-end items-center">
        <div className="w-full md:w-[30%] lg:w-[27%] flex items-center justify-center">
          <img
            src={Img_success_design}
            alt="image"
            className="w-[90%] sm:w-[60%] md:w-full"
          />
        </div>
        <div className="w-full md:w-[64%] lg:w-[58%]">
          <h4 className="text-primary font-semibold text-[24px] leading-9 md:text-[32px] desktop:text-[40px] mb-3 lg:mb-5 desktop:leading-[48px]">
            Access a Global Talent Pool with Ease.
          </h4>
          <p className="text-base sm:text-lg md:text-xl desktop:text-[20px] text-gray mb-4 md:mb-6 desktop:mb-8">
            Tap into a diverse network of 10M+ startup-ready professionals.
            Whether you're hiring for a specific role or building a dream team,
            find top-tier candidates across industries, skill levels, and
            backgrounds—all in seconds.
          </p>
          <Link to={"/find-talent"}>
            <ButtonUx
              label="Find Talent"
              buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-12"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default BuildCompanyProfile;
