/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
import ButtonUx from "@/components/common/button";
import Ic_edit from "@/assets/images/Ic_edit.svg";
import Ic_profile_location from "@/assets/images/Ic_profile_location.svg";
import Ic_profile_call from "@/assets/images/Ic_profile_call.svg";
import Ic_profile_link from "@/assets/images/Ic_profile_link.svg";
import Ic_profile_mail from "@/assets/images/Ic_profile_mail.svg";
import { PHOTO_URL } from "@/config/constant";

const ProfileData: React.FC<{ value: number; userDetails: any }> = ({
  value,
  userDetails,
}) => {
  return (
    <>
      <div className="rounded-[12px] p-3 desktop:p-6 bg-lightChiku2 flex flex-col gap-4 md:gap-5">
        <div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between p-2.5 pb-4 lg:p-4 bg-white">
            <p className="text-primary text-sm lg:text-base">
              Boost Your Hiring Success with a Standout Recruiter Profile
            </p>
            <span className="text-primary text-sm lg:text-base font-medium">
              {value}% Profile Completed
            </span>
          </div>
          <div className="w-full h-2 bg-gray5 relative">
            <div
              className="h-full bg-green2"
              style={{ width: `${value}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-primary text-sm md:text-base desktop:text-lg font-medium mb-1">
              Keep Your Profile Fresh and Ready for Top Talent
            </h4>
            <p className="text-sm text-gray">
              Helps attract the best candidates by showcasing your hiring
              expertise and preferences.
            </p>
          </div>
          <Link to={"/profile?update-profile"}>
            <ButtonUx
              label="Update"
              buttonClassName="z-50 relative w-max h-10 lg:h-12 font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2"
            />
          </Link>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4 md:gap-6 desktop:gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
          <h3 className="text-primary font-semibold text-xl md:text-2xl desktop:text-[2rem]">
            What Job Seeker will See
          </h3>
          <Link
            to={"/profile?update-profile"}
            className="flex items-center gap-3"
          >
            <img src={Ic_edit} alt="edit" />
            <span className="text-primary text-base font-semibold">
              Edit Profile
            </span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-[80px] h-[80px] md:w-[130px] md:h-[130px] lg:w-[180px] lg:h-[180px] desktop:w-[206px] desktop:h-[206px] border-2 border-primary bg-[#D2EBFF] rounded-[8px] flex items-center justify-center text-primary font-semibold text-2xl md:text-3xl desktop:text-[48px]">
            {userDetails?.logo ? (
              <img
                src={`${PHOTO_URL}/${userDetails?.logo}`}
                alt="profile"
                className="w-full h-full"
              />
            ) : (
              userDetails && userDetails?.company_name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex flex-col gap-4 flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
              <div className="flex flex-col gap-1">
                <div className="flex gap-3 items-center">
                  <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
                    {userDetails && userDetails?.company_name}
                  </h3>
                </div>
                <div className="text-sm md:text-base desktop:text-lg text-gray font-medium">
                  {userDetails && userDetails?.name}
                </div>
                <p className="text-primary text-sm lg:text-base">
                  {userDetails && userDetails?.designation
                    ? userDetails?.designation?.name
                    : "-"}
                </p>
              </div>
            </div>
            <div className="w-full bg-gray5 h-[1px]"></div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-[48px] md:gap-[68px] desktop:gap-[80px]">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_location} alt="location" />
                  <span className="text-sm text-gray">
                    {userDetails && userDetails?.country
                      ? userDetails?.country
                      : "-"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_link} alt="link" />
                  <a
                    href={userDetails?.website}
                    target="__blank"
                    className="text-sm text-primary font-semibold cursor-pointer"
                  >
                    Website
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_call} alt="call" />
                  <span className="text-sm text-gray">
                    {userDetails && userDetails?.mobile_no
                      ? userDetails?.mobile_no
                      : "-"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_mail} alt="mail" />
                  <span className="text-sm text-gray">
                    {userDetails && userDetails?.email
                      ? userDetails?.email
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <h4 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            About
          </h4>
          <p className="text-gray text-sm md:text-base desktop:text-lg">
            {userDetails && userDetails?.description
              ? userDetails?.description
              : "-"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileData;
