/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Ic_left_arrow from "@/assets/images/Ic_left_arrow.svg";
import Ic_right_breadCrumb_arrow from "@/assets/images/Ic_right_breadCrumb_arrow.svg";
import { Link } from "react-router-dom";
import JobsOpportunity from "@/components/jobsOpportunity";
import Ic_profile_location from "@/assets/images/Ic_profile_location.svg";
import Ic_profile_experience from "@/assets/images/Ic_profile_experience.svg";
import Ic_profile_link from "@/assets/images/Ic_profile_link.svg";
import Ic_profile_salary from "@/assets/images/Ic_profile_salary.svg";
import Img_profile_no_data from "@/assets/images/Img_profile_no_data.png";
import { useGetSingleFindTalentQuery } from "@/store/slice/apiSlice/findTalentApi";
import Loading from "@/components/common/loading";
import { PHOTO_URL } from "@/config/constant";
import Img_company from "@/assets/images/Img_company.svg";
import Ic_education from "@/assets/images/Ic_education.svg";

export const FindTalentDetail: React.FC = () => {
  const { data, isLoading } = useGetSingleFindTalentQuery(
    location.pathname.match(/\/find-talent\/(\d+)/)?.[1]
  );

  const userDetails = (data as any)?.data || [];

  if (isLoading) {
    return <Loading />;
  }
  const transformToArray = (value: any) =>
    value
      ? value.split(",").map((item: any) => item.trim().replace(/^'|'$/g, ""))
      : [];

  const openForRoleArray = transformToArray(
    typeof userDetails?.open_for_role === "string"
      ? userDetails?.open_for_role
      : ""
  );

  const preferJobTypeArray = transformToArray(
    typeof userDetails?.preferred_job_type === "string"
      ? userDetails?.preferred_job_type
      : ""
  );
  const preferWorkPlaceArray = transformToArray(
    typeof userDetails?.preferred_wrok_place === "string"
      ? userDetails?.preferred_wrok_place
      : ""
  );

  const relocateLocationArray =
    userDetails?.readyToRelocate === "yes" &&
    userDetails?.relocate_preferred_location
      .split("','")
      .map((loc: string) => loc.replace(/^'|'$/g, ""));

  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    const options: any = { year: "numeric", month: "long" };
    return formattedDate.toLocaleDateString("en-US", options);
  };

  const calculateDateDifference = (startDate: string) => {
    const start = new Date(startDate);
    const today = new Date();

    const yearsDifference = today.getFullYear() - start.getFullYear();
    let monthsDifference = today.getMonth() - start.getMonth();

    if (monthsDifference < 0) {
      monthsDifference += 12;
    }

    const years =
      monthsDifference === 12 ? yearsDifference + 1 : yearsDifference;

    const result = [];
    if (years > 0) {
      result.push(`${years} Years`);
    }
    if (monthsDifference > 0) {
      result.push(`${monthsDifference} Months`);
    }

    return result.length ? result.join(" ") : "Less than a month";
  };
  return (
    <div className="relative">
      <div className="bg-lightYellow  relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] pt-5 md:pt-6 pb-6 md:pb-10">
        <nav className="flex items-center gap-2 mb-5 md:mb-[30px]">
          <Link to={"/find-talent"}>
            <img src={Ic_left_arrow} alt="arrow" />
          </Link>
          <Link to={"/"}>
            <span className="text-primary text-sm font-semibold">Home</span>
          </Link>
          <img src={Ic_right_breadCrumb_arrow} alt="arrow" />
          <Link to={"/find-talent"}>
            <span className="text-primary text-sm font-semibold">
              Find Talent
            </span>
          </Link>
          <img src={Ic_right_breadCrumb_arrow} alt="arrow" />
          <span className="text-gray text-sm">Candidate</span>
        </nav>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-[80px] h-[80px] md:w-[130px] md:h-[130px] lg:w-[180px] lg:h-[180px] desktop:w-[206px] desktop:h-[206px] border-2 border-primary bg-[#D2EBFF] rounded-[8px] flex items-center justify-center text-primary font-semibold text-2xl md:text-3xl desktop:text-[48px]">
            {userDetails?.profile_photo ? (
              <img
                src={`${PHOTO_URL}/${userDetails?.profile_photo}`}
                alt="profile"
                className="w-full h-full"
              />
            ) : (
              userDetails &&
              userDetails?.name &&
              userDetails?.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex flex-col gap-4 flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
              <div className="flex flex-col gap-1">
                <div className="flex gap-3 items-center">
                  <div
                    className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]"
                    style={{
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      WebkitFilter: "blur(12px)",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    {userDetails?.name}
                  </div>
                  {userDetails && userDetails?.pronouns && (
                    <div className="bg-lightChiku2 py-1 px-2 text-sm text-gray rounded-[8px]">
                      {userDetails && userDetails?.pronouns}
                    </div>
                  )}
                  {userDetails && userDetails?.gender && (
                    <div className="bg-lightChiku2 py-1 px-2 text-sm text-gray rounded-[8px]">
                      {userDetails?.gender}
                    </div>
                  )}
                </div>
                <div className="text-sm md:text-base desktop:text-lg text-gray font-medium">
                  {userDetails && userDetails?.job_title}
                </div>
                <p className="text-primary text-sm lg:text-base">
                  {userDetails &&
                  userDetails?.current_company &&
                  userDetails?.current_company.name
                    ? userDetails?.current_company.name
                    : "-"}
                </p>
              </div>
              {/* <div className="flex flex-col gap-4 items-start sm:items-end">
                <div className="bg-lightGreen py-1 px-2 text-primary rounded-[8px] text-sm">
                  Actively Looking
                </div>
              </div> */}
            </div>
            <div className="w-full bg-gray5 h-[1px]"></div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-[48px] md:gap-[68px] desktop:gap-[80px]">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_location} alt="location" />
                  <span className="text-sm text-gray">
                    {userDetails && userDetails?.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_experience} alt="experience" />
                  <span className="text-sm text-gray">
                    {userDetails && userDetails?.total_experience
                      ? `${userDetails?.total_experience} Years`
                      : "-"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_salary} alt="salary" />
                  <span className="text-sm text-gray">
                    {userDetails && userDetails?.current_salary_currency
                      ? userDetails?.current_salary_currency.slice(
                          userDetails?.current_salary_currency.indexOf("(") + 1,
                          userDetails?.current_salary_currency.indexOf(")")
                        )
                      : "-"}{" "}
                    {userDetails && userDetails?.current_salary_fixed_amount
                      ? userDetails?.current_salary_fixed_amount
                      : "-"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img src={Ic_profile_link} alt="link" />
                  <a
                    href={userDetails?.portfolio_link}
                    target="__blank"
                    className="text-sm text-primary font-semibold"
                  >
                    Portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:gap-6 desktop:gap-8 px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[48px]">
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            About
          </div>
          <p className="text-gray text-sm md:text-base desktop:text-lg">
            {userDetails && userDetails?.bio ? userDetails?.bio : "-"}
          </p>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Open for Roles
          </div>
          <div className="flex gap-2 md:gap-3 items-center flex-wrap">
            {openForRoleArray && openForRoleArray.length > 0
              ? openForRoleArray.map((role: string, index: number) => {
                  return (
                    <div
                      className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg"
                      key={index}
                    >
                      {role}
                    </div>
                  );
                })
              : "-"}
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
                {userDetails && userDetails?.total_experience
                  ? `${userDetails?.total_experience} Years`
                  : "-"}
              </span>
            </div>
            <div className="flex-col flex gap-2">
              <span className="text-gray text-xs lg:text-sm">
                Relevant Experience
              </span>
              <span className="text-gray text-sm md:text-base desktop:text-lg">
                {userDetails && userDetails?.relevant_experience
                  ? `${userDetails?.relevant_experience} Years`
                  : "-"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Current Job Details
          </div>
          {userDetails && userDetails?.current_company?.name ? (
            <div className="flex gap-3 items-center">
              <div className="w-[48px] h-[48px] sm:w-[58px] md:w-[74px] sm:h-[58px] md:h-[74px]">
                {userDetails?.current_company?.logo &&
                userDetails?.current_company?.logo !== "null" ? (
                  <img
                    src={`${PHOTO_URL}/${userDetails?.current_company?.logo}`}
                    alt="company"
                    className="w-full h-full"
                  />
                ) : (
                  <img
                    src={Img_company}
                    alt="company"
                    className="w-full h-full"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm md:text-base desktop:text-lg font-medium text-primary">
                  {userDetails?.current_company?.name}
                </div>
                <p className="text-xs md:text-sm text-primary">
                  {userDetails?.current_job_title}
                </p>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray">
                  {formatDate(userDetails?.current_job_start_date)} to Present
                  <div className="h-[12px] w-[1px] bg-gray5"></div>
                  {calculateDateDifference(userDetails?.current_job_start_date)}
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Highest Education Qualification
          </div>
          {userDetails && userDetails?.education_institute?.name ? (
            <div className="flex gap-3 items-center">
              <div className="w-[48px] h-[48px] sm:w-[58px] md:w-[74px] sm:h-[58px] md:h-[74px]">
                {userDetails?.education_institute?.logo &&
                userDetails?.education_institute?.logo !== "null" ? (
                  <img
                    src={`${PHOTO_URL}/${userDetails?.education_institute?.logo}`}
                    alt="company"
                    className="w-full h-full"
                  />
                ) : (
                  <img
                    src={Ic_education}
                    alt="education"
                    className="w-full h-full"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm md:text-base desktop:text-lg font-medium text-primary">
                  {userDetails?.education_institute?.name}
                </div>
                <p className="text-xs md:text-sm text-primary">
                  {userDetails?.degree?.name}
                </p>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray">
                  {userDetails?.gpa} GPA
                  <div className="h-[12px] w-[1px] bg-gray5"></div>
                  {userDetails?.graduation_year}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <img
                src={Img_profile_no_data}
                alt="image"
                className="w-[48px] h-[48px]"
              />
              <p className="text-gray text-sm md:text-base desktop:text-lg text-center">
                No Highest Education
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Tags
          </div>
          <div className="flex gap-2 md:gap-3 items-center flex-wrap">
            {userDetails &&
            userDetails?.skills &&
            userDetails?.skills?.length > 0
              ? userDetails?.skills?.map((skill: any, index: number) => {
                  return (
                    <div
                      className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg"
                      key={index}
                    >
                      {skill.name}
                    </div>
                  );
                })
              : "-"}
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Preferred Job Type
          </div>
          <div className="flex gap-2 md:gap-3 items-center flex-wrap">
            {preferJobTypeArray && preferJobTypeArray.length > 0
              ? preferJobTypeArray.map((item: string, index: number) => {
                  return (
                    <div
                      className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg"
                      key={index}
                    >
                      {item}
                    </div>
                  );
                })
              : "-"}
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Preferred Job Type Workplace
          </div>
          <div className="flex gap-2 md:gap-3 items-center flex-wrap">
            {preferWorkPlaceArray && preferWorkPlaceArray.length > 0
              ? preferWorkPlaceArray.map((item: string, index: number) => {
                  return (
                    <div
                      className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg"
                      key={index}
                    >
                      {item}
                    </div>
                  );
                })
              : "-"}
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3 desktop:gap-4">
          <div className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Open to Relocate
          </div>
          <div className="text-primary font-semibold text-sm md:text-base desktop:text-lg">
            {userDetails?.readyToRelocate === "yes" ? "Yes" : "No"}
          </div>
          {userDetails?.readyToRelocate === "yes" && (
            <div>
              <div className="mb-2 text-xs lg:text-sm text-gray">
                Desire Locations
              </div>
              <div className="flex gap-2 md:gap-3 items-center flex-wrap">
                {relocateLocationArray && relocateLocationArray.length > 0
                  ? relocateLocationArray.map((item: string, index: number) => {
                      return (
                        <div
                          className="bg-lightChiku2 py-1 px-2 rounded-[8px] text-gray text-sm md:text-base desktop:text-lg"
                          key={index}
                        >
                          {item}
                        </div>
                      );
                    })
                  : "-"}
              </div>
            </div>
          )}
        </div>
      </div>
      <JobsOpportunity />
    </div>
  );
};
