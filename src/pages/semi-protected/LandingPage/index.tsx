import MainSection from "./mainSection";
import TrustedEmployer from "./trustedEmployer";
import MadeInIndiaImg from "@/assets/images/Img_made_in_india.png";
import TrustedTopCompany from "./trustedTopCompany";
import WhyWeBestBet from "./whyWeBestBet";
import SimplifyHiring from "./simplifyHiring";
import BuildCompanyProfile from "./buildCompanyProfile";

export const LandingPage = () => {
  return (
    <div className="relative">
      <MainSection />
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
