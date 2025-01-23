import { Link } from "react-router-dom";
import HandIcon from "@/assets/images/handLogo.png";
import call from "@/assets/images/Ic_footer_call.svg";
import email from "@/assets/images/Ic_footer_email.svg";
import linkedIn from "@/assets/images/Ic_footer_linkedIn.svg";
import twitter from "@/assets/images/Ic_footer_twitter.svg";
import instagram from "@/assets/images/Ic_footer_insta.svg";
import youtube from "@/assets/images/Ic_footer_youtube.svg";
import ButtonUx from "./common/button";
import { VITE_PUBLIC_JOB_SEEKER_URL } from "@/config/constant";

const Footer = () => {
  return (
    <>
      <div className="bg-black border-t border-gray2 px-4 sm:px-5 md:px-8 py-[48px] lg:px-10 big:px-[120px] xBig:px-[200px] desktop:py-[80px] relative z-30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[1.5rem] lg:gap-[16rem] mb-8 lg:mb-12">
          <div>
            <Link to={"/"}>
              <div className="flex items-center font-bold text-2xl laptop:text-[28px] big:text-[34px] tracking-wider mb-2 md:mb-4">
                <span className="text-white">ux</span>
                <img
                  src={HandIcon}
                  alt=""
                  className="pr-[2.25px] ml-[-2.25px] w-[25px] h-[30px] laptop:w-auto laptop:h-auto"
                />
                <span className="text-white">jobsite</span>
              </div>
            </Link>
            <p className="text-white text-sm lg:text-base w-[84%] md:w-full">
              Connecting top talent with leading employers in the design and
              tech industries, helping professionals thrive in their careers.
            </p>
          </div>
          <a href={`${VITE_PUBLIC_JOB_SEEKER_URL}`}>
            <ButtonUx
              label="For Job Seekers"
              buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-[40px]"
            />
          </a>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-nowrap gap-8 lg:gap-20 mb-4 lg:mb-12">
          <div>
            <h4 className="text-white font-medium text-lg desktop:text-xl mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 lg:gap-3">
              <Link
                to={"/find-talent"}
                className="text-white text-sm lg:text-base"
              >
                Find Talent
              </Link>
              <Link
                to={"/post-job"}
                className="text-white text-sm lg:text-base"
              >
                Post a Job
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium text-lg desktop:text-xl mb-4">
              Explore
            </h4>
            <div className="flex flex-col gap-2 lg:gap-3">
              <Link
                to={"/about-us"}
                className="text-white text-sm lg:text-base"
              >
                About Us
              </Link>
              <Link
                to={"/contact-us"}
                className="text-white text-sm lg:text-base"
              >
                Contact Us
              </Link>
              <Link to={"/faqs"} className="text-white text-sm lg:text-base">
                FAQs
              </Link>
              <Link to={"/blogs"} className="text-white text-sm lg:text-base">
                Blogs
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium text-lg desktop:text-xl mb-4">
              Contact Us
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-start">
                <img src={call} alt="call" />
                <p className="text-white text-sm lg:text-base">
                  +91-8105338000 <br />
                  (Mon-Sat: 9:30 AM - 10:00 AM)
                </p>
              </div>
              <div className="flex gap-3">
                <img src={email} alt="email" />
                <p className="text-white text-sm lg:text-base">
                  hello@uxjobsite.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 lg:pt-8 border-t border-gray3 flex flex-col md:flex-row md:items-center gap-2 justify-between">
          <div>
            <div className="flex items-center gap-2 lg:gap-3 mb-2 sm:w-full justify-between sm:justify-start">
              <Link
                to={"/terms-condition"}
                className="text-white text-sm lg:text-base"
              >
                Terms of Service
              </Link>
              <div className="border-l border-[#FFFFFF] h-[24px]"></div>
              <Link
                to={"/privacy-policy"}
                className="text-white text-sm lg:text-base"
              >
                Privacy Policy
              </Link>
            </div>
            <p className="text-white text-sm lg:text-base">
              Copyright © 2024 UXJobsite. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/company/uxjobsite/"
              target="__blank"
            >
              <img src={linkedIn} alt="linkedIn" />
            </a>
            <a href="https://x.com/Ux_jobsite" target="__blank">
              <img src={twitter} alt="twitter" />
            </a>
            <a href="https://www.instagram.com/uxjobsite" target="__blank">
              <img src={instagram} alt="instagram" />
            </a>
            <a href="https://www.youtube.com/@UXJobsite" target="__blank">
              <img src={youtube} alt="youtube" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
