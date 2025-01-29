import React from "react";
import Img_recruitment from "@/assets/images/Img_recruitment.png";
import WhyLoveUs from "@/components/whyLoveUs";
import RegisterForm from "./register-form";

export const Register: React.FC = () => {
  return (
    <div className="relative">
      <div className="bg-lightChiku3 relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] pt-[24px] pb-[48px] big:py-[72px] flex flex-col desktop:flex-row gap-[28px] desktop:gap-[83px]">
        <div className="w-full desktop:w-[40%]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl desktop:text-5xl mb-1.5 desktop:mb-3 desktop:leading-[60px] text-primary font-semibold">
            Register your Employer Account
          </h2>
          <p className="text-gray text-base md:text-lg desktop:text-xl mb-5 desktop:mb-10">
            Sign up to post jobs and connect with top candidates.
          </p>
          <div className="mb-[24px] lg:mb-[52px] w-max">
            <WhyLoveUs />
          </div>
          <img
            src={Img_recruitment}
            alt="Image"
            className="w-[184px] md:w-[240px] lg:w-auto"
          />
        </div>
        <div className="w-full desktop:w-[60%] bg-white rounded-xl border-primary border">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};
