import React from "react";
import { PostJobForm } from "./postJobForm";

export const PostJob: React.FC = () => {
  return (
    <>
      <div className="relative">
        <div className="bg-lightYellow relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[40px] lg:py-[48px]">
          <h2 className="lg:leading-[60px] text-xl sm:text-2xl md:text-[2rem] lg:text-[2.5rem] desktop:text-[3rem] text-primary font-semibold mb-3 lg:mb-4">
            Post Your Job for Free & Hire Top UX Talent
          </h2>
          <p className="text-gray text-sm md:text-base desktop:text-lg w-full max-w-[957px]">
            Access top-notch designers, UX researchers, UX writers, UI
            designers, developers, and graphic designers. The best talent is
            waiting. Simplified hiring at your fingertips.
          </p>
        </div>
        <PostJobForm />
      </div>
    </>
  );
};
