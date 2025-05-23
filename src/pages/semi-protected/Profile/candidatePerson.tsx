import React from "react";
import { Link } from "react-router-dom";
import Ic_right_breadCrumb_arrow from "@/assets/images/Ic_right_breadCrumb_arrow.svg";
import Ic_left_arrow from "@/assets/images/Ic_left_arrow.svg";
import Ic_profile_linkedin from "@/assets/images/Ic_profile_linkedin.svg";
import Ic_profile_globe from "@/assets/images/Ic_profile_globe.svg";
import Ic_profile_location from "@/assets/images/Ic_profile_location.svg";
import Ic_profile_call from "@/assets/images/Ic_profile_call.svg";
import Ic_profile_experience from "@/assets/images/Ic_profile_experience.svg";
import Ic_profile_link from "@/assets/images/Ic_profile_link.svg";
import Ic_profile_mail from "@/assets/images/Ic_profile_mail.svg";
import Ic_profile_salary from "@/assets/images/Ic_profile_salary.svg";
import Img_profile_no_data from "@/assets/images/Img_profile_no_data.png";

const CandidatePerson: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-4 md:gap-6 desktop:gap-8">
        <nav className="flex items-center gap-2">
          <Link to={"/find-talent"}>
            <img src={Ic_left_arrow} alt="arrow" />
          </Link>
          <Link to={"/profile?saved-candidates"}>
            <span className="text-primary text-sm font-semibold">
              Candidate Contacted
            </span>
          </Link>
          <img src={Ic_right_breadCrumb_arrow} alt="arrow" />
          <span className="text-gray text-sm">John Doe</span>
        </nav>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-[80px] h-[80px] md:w-[130px] md:h-[130px] lg:w-[180px] lg:h-[180px] desktop:w-[206px] desktop:h-[206px] border-2 border-primary bg-[#D2EBFF] rounded-[8px] flex items-center justify-center text-primary font-semibold text-2xl md:text-3xl desktop:text-[48px]">
            J
          </div>
          <div className="flex flex-col gap-4 flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
              <div className="flex flex-col gap-1">
                <div className="flex gap-3 items-center">
                  <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
                    John Doe
                  </div>
                  <div className="bg-lightChiku2 py-1 px-2 text-sm text-gray rounded-[8px]">
                    He/Him
                  </div>
                  <div className="bg-lightChiku2 py-1 px-2 text-sm text-gray rounded-[8px]">
                    Male
                  </div>
                </div>
                <div className="text-sm md:text-base desktop:text-lg text-gray font-medium">
                  Product Manager
                </div>
                <p className="text-primary text-sm lg:text-base">
                  at Lollipop Design Studio
                </p>
              </div>
              <div className="flex flex-col gap-4 items-start sm:items-end">
                <div className="flex items-center gap-4">
                  <a href="#">
                    <img src={Ic_profile_linkedin} alt="Linkedin" />
                  </a>
                  <a href="#">
                    <img src={Ic_profile_globe} alt="Linkedin" />
                  </a>
                  <a href="#">
                    <div className="text-primary font-semibold text-sm">
                      Resume
                    </div>
                  </a>
                </div>
                <div className="bg-lightGreen py-1 px-2 text-primary rounded-[8px] text-sm">
                  Actively Looking
                </div>
              </div>
            </div>
            <div className="w-full bg-gray5 h-[1px]"></div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-[48px] md:gap-[68px] desktop:gap-[80px]">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_location} alt="location" />
                  <span className="text-sm text-gray">
                    Bangalore, Karnataka
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_experience} alt="experience" />
                  <span className="text-sm text-gray">-</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_salary} alt="salary" />
                  <span className="text-sm text-gray">₹6,00,000</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_call} alt="call" />
                  <span className="text-sm text-gray">+91 8988737722</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_mail} alt="mail" />
                  <span className="text-sm text-gray">johndoe@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_link} alt="link" />
                  <Link to={""} className="text-sm text-primary font-semibold">
                    Portfolio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            About
          </div>
          <p className="text-gray text-sm md:text-base desktop:text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Open for Roles
          </div>
          <div className="flex gap-2 md:gap-3 items-center flex-wrap">
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              UI UX Designer
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              Product Designer
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              Product Manager
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              UX Designer
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Years of Experience
          </div>
          <div className="flex gap-5 md:gap-8 desktop:gap-12 items-center">
            <div className="flex-col flex gap-2">
              <span className="text-gray text-xs lg:text-sm">
                Total Experience
              </span>
              <span className="text-gray text-sm md:text-base desktop:text-lg">
                -
              </span>
            </div>
            <div className="flex-col flex gap-2">
              <span className="text-gray text-xs lg:text-sm">
                Relevant Experience
              </span>
              <span className="text-gray text-sm md:text-base desktop:text-lg">
                -
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Current Job Details
          </div>
          <div className="flex gap-3 items-center">
            <img
              src={Img_profile_no_data}
              alt="image"
              className="w-[48px] h-[48px]"
            />
            <p className="text-gray text-sm md:text-base desktop:text-lg">
              No Experience Added
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Highest Education Qualification
          </div>
          <div className="flex gap-3 items-center">
            <img
              src={Img_profile_no_data}
              alt="image"
              className="w-[48px] h-[48px]"
            />
            <p className="text-gray text-sm md:text-base desktop:text-lg">
              No Highest Education
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Tags
          </div>
          <div className="flex gap-2 md:gap-3 items-center flex-wrap">
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              User Experience Design
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              Information Architecture
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              Wire framing
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              UI UX Design
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              User Research
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              Personas
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              Prototyping
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              UI Design
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              Heuristic Evaluation
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Preferred Job Type
          </div>
          <div className="flex gap-2 md:gap-3 items-center flex-wrap">
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              Full-time
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              Contract
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              Freelancing
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Preferred Job Type Workplace
          </div>
          <div className="flex gap-2 md:gap-3 items-center flex-wrap">
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              Remote
            </div>
            <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
              Hybrid
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Open to Relocate
          </div>
          <div className="text-primary font-semibold text-sm md:text-base desktop:text-lg">
            Yes
          </div>
          <div>
            <div className="mb-2 text-xs lg:text-sm text-gray">
              Desire Locations
            </div>
            <div className="flex gap-2 md:gap-3 items-center flex-wrap">
              <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
                Ahmedabad, Gujarat
              </div>
              <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
                Bangalore, Karnataka
              </div>
              <div className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg">
                Pune, Maharashtra
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidatePerson;
