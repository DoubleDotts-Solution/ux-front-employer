import React from "react";
import WhyLoveUs from "@/components/whyLoveUs";
import ResetPasswordForm from "./reset-password-form";

export const ResetPassword: React.FC = () => {
  return (
    <div className="relative">
      <div className="bg-lightChiku3 relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[48px] big:py-[72px] flex flex-col desktop:flex-row gap-[28px] desktop:gap-[83px] justify-center desktop:items-center">
        <div className="w-full desktop:w-[36%]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl desktop:text-5xl mb-1.5 desktop:mb-3 desktop:leading-[60px] text-primary font-semibold">
            Forgot Password
          </h2>
          <p className="text-gray text-base md:text-lg desktop:text-xl mb-5 desktop:mb-10">
            Need a new password? We'll guide you through the reset process.
          </p>
          <div className="w-max">
            <WhyLoveUs />
          </div>
        </div>
        <div className="w-full desktop:w-[40%] bg-white rounded-xl border-primary border">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};
