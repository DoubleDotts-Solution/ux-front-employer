/* eslint-disable @typescript-eslint/no-explicit-any */
import MainSection from "./mainSection";
import TrustedEmployer from "./trustedEmployer";
import MadeInIndiaImg from "@/assets/images/Img_made_in_india.png";
import TrustedTopCompany from "./trustedTopCompany";
import WhyWeBestBet from "./whyWeBestBet";
import SimplifyHiring from "./simplifyHiring";
import BuildCompanyProfile from "./buildCompanyProfile";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const LandingPage = () => {
  const location = useLocation();
  const [isUserLogin, setIsUserLogin] = useState(false);
  const userDetails = useSelector((state: any) => state.user)?.userDetails;
  const AccessToken = sessionStorage.getItem("__ux_employer_access_");

  useEffect(() => {
    if (userDetails?.verifyEmail === "yes" && AccessToken) {
      setIsUserLogin(true);
    } else {
      setIsUserLogin(false);
    }
  }, [userDetails, AccessToken, location.search]);

  return (
    <div className="relative">
      <MainSection isUserLogin={isUserLogin} />
      <WhyWeBestBet />
      <SimplifyHiring />
      <BuildCompanyProfile />
      <TrustedEmployer />
      <TrustedTopCompany />

      <img
        src={MadeInIndiaImg}
        alt="Made in India"
        className="made_in_india fixed z-50 bottom-[32px] laptop:bottom-[24px] right-[30px] laptop:right-[24px] w-[51px] h-[51px] md:hidden md:w-auto md:h-auto"
      />
    </div>
  );
};
