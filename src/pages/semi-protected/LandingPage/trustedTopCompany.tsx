/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Ic_sparkle from "@/assets/images/Ic_sparkle.svg";
import Img_first_step_hiring from "@/assets/images/Img_first_step_hiring.png";
import ButtonUx from "@/components/common/button";
import { useNavigate } from "react-router-dom";

const TrustedTopCompany: React.FC<{ isUserLogin: any }> = ({ isUserLogin }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* --- */}
      <div className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] pt-[24px] pb-[48px] big:py-[72px] pt-0 big:pt-0">
        <span className="relative inline-block w-full">
          <div className="relative bg-black3 px-4 py-6 desktop:p-10 desktop:py-14 text-7xl rounded-[12px] md:rounded-[20px] z-50 flex flex-col lg:flex-row items-center gap-6 desktop:gap-24 w-full justify-end">
            <div className="w-full lg:w-[27%] flex justify-center items-center">
              <img
                src={Img_first_step_hiring}
                alt="image"
                className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-full"
              />
            </div>
            <div className="w-full lg:w-[56%]">
              <div className="text-white font-semibold text-[28px] leading-[35.2px] md:text-4xl desktop:text-[56px] mb-1.5 desktop:mb-3 desktop:leading-[72px] flex flex-wrap">
                The first step to hiring&nbsp;
                <span className="abc">brilliance&nbsp; </span>
                <span className="relative">
                  starts here.
                  <img
                    src={Ic_sparkle}
                    alt="icon"
                    className="absolute top-0 w-[24px] desktop:w-auto right-[-16px]"
                  />
                </span>
              </div>
              <p className="desktop:leading-9 text-gray3 text-base lg:text-xl desktop:text-2xl mb-5 desktop:mb-10">
                {isUserLogin
                  ? "Subscribe for Weekly Updates on New Roles and Industry Trends"
                  : "Discover top-notch talent for your UX projects today!"}
              </p>
              {isUserLogin ? (
                <div
                  onClick={() => navigate("/post-job")}
                  className="h-12 relative flex items-start"
                >
                  <ButtonUx
                    label="Post a Job For Free"
                    buttonClassName={`text-lg px-8 py-2 w-full md:w-max h-12 font-semibold border-2 rounded-[8px] hover:shadow-shadow1 border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 relative`}
                    type="submit"
                  />
                </div>
              ) : (
                <div
                  onClick={() => navigate("/create-account")}
                  className="h-12 relative flex items-start"
                >
                  <ButtonUx
                    label="Register"
                    buttonClassName={`text-lg px-8 py-2 w-full md:w-max h-12 font-semibold border-2 rounded-[8px] hover:shadow-shadow1 border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 relative`}
                    type="submit"
                  />
                </div>
              )}
            </div>
          </div>
          <span
            className={`absolute bottom-[-6px] left-[6px] h-full p-10 w-full rounded-[20px] border-2 border-primary z-40 transition-colors bg-transparent`}
          ></span>
        </span>
      </div>
    </>
  );
};

export default TrustedTopCompany;
