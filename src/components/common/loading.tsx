import React from "react";
import Img_loading from "@/assets/images/Img_loading.png";

const Loading: React.FC = () => {
  return (
    <div className="relative">
      <div className=" relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] pt-[24px] pb-[48px] big:py-[72px] flex justify-center my-auto h-screen">
        <div className="flex flex-col items-center w-full max-w-[500px] my-auto">
          <img
            src={Img_loading}
            alt="image"
            className="img-fluid mb-[16px] lg:mb-[32px]"
          />
          <div className="text-primary text-lg sm:text-xl md:text-[20px] desktop:text-[24px] font-semibold mb-[12px]">
            Hang Tight! We’re Fetching Your Data
          </div>
          <p className="text-gray mt-[8px] text-sm md:text-base desktop:text-xl text-center">
            Gathering all the latest jobs and insights. Just a moment, please!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
