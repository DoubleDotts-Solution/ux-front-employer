import React from "react";
import Img_Not_Found from "@/assets/images/Img_Not_Found.png";
import { Link } from "react-router-dom";
import ButtonUx from "@/components/common/button";

export const PageNotFound: React.FC = () => {
  return (
    <div className="relative">
      <div className=" relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] pt-[24px] pb-[48px] big:py-[72px] flex justify-center h-screen my-auto">
        <div className="flex flex-col items-center w-full max-w-[500px] my-auto">
          <img
            src={Img_Not_Found}
            alt="image"
            className="img-fluid mb-[16px] lg:mb-[32px]"
          />
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[24px] lg:text-[28px] desktop:text-[40px] desktop:leading-[48px] mb-[12px]">
            404: We Lost the Trail!
          </div>
          <p className="text-gray text-sm md:text-base desktop:text-xl text-center mb-[24px] lg:mb-[48px]">
            Looks like this page took a wrong turn. Let’s get you back on track!
          </p>
          <Link to={"/"}>
            <ButtonUx
              label="Go Back Home"
              buttonClassName="z-50 relative w-full h-[36px] lg:h-[40px] font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-8 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
