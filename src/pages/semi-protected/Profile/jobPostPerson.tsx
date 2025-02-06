/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Ic_right_breadCrumb_arrow from "@/assets/images/Ic_right_breadCrumb_arrow.svg";
import Ic_left_arrow from "@/assets/images/Ic_left_arrow.svg";
import { Link, useLocation } from "react-router-dom";
import Ic_location from "@/assets/images/Ic_location.svg";
import Ic_experience from "@/assets/images/Ic_experience.svg";
import Ic_time from "@/assets/images/Ic_time.svg";
import Ic_rupee from "@/assets/images/Ic_rupee.svg";
import Ic_file from "@/assets/images/Ic_file.svg";
import Ic_person from "@/assets/images/Ic_person.svg";
import { convertJobLocation, formatTimeAgo, getJobStatus } from "@/lib/utils";
import {
  useJobPostedQuery,
  useListOfJobSeekerQuery,
} from "@/store/slice/apiSlice/profileApi";
import Loading from "@/components/common/loading";
import { PHOTO_URL } from "@/config/constant";
import Ic_candidate_call from "@/assets/images/Ic_candidate_call.svg";
import Ic_candidate_mail from "@/assets/images/Ic_candidate_mail.svg";
import { useSelector } from "react-redux";

const JobPostedPerson: React.FC = () => {
  const location: any = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const personId = queryParams.get("person-id");
  const userDetails = useSelector((state: any) => state.user)?.userDetails;
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const toggleDropdown = (index: any, e: any) => {
    e.stopPropagation();
    setIsDropdownOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  const { data, isLoading } = useListOfJobSeekerQuery({ id: Number(personId) });
  const AppliedJobData = (data as any)?.data || [];

  if (isLoading) {
    <Loading />;
  }
  const params: any = {
    page: 1,
    limit: 999999999999999,
    value: "",
  };
  const { data: jobPostedAllData } = useJobPostedQuery({
    data: params,
    id: userDetails?.id,
  });

  const [jobPostedData, setJobPostedData] = useState<any>(null);

  const AppliedJobDataArray: any = (jobPostedAllData as any)?.data || [];

  useEffect(() => {
    if (personId && AppliedJobDataArray.length > 0) {
      const matchedData = AppliedJobDataArray.find(
        (data: any) => data.id === Number(personId)
      );

      setJobPostedData(matchedData || null);
    }
  }, [AppliedJobDataArray, personId]);

  const downloadResume = async (resume: any, e: any) => {
    e.stopPropagation();
    if (resume) {
      try {
        const response = await fetch(`${PHOTO_URL}/${resume}`);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const tempLink = document.createElement("a");
        tempLink.href = url;

        tempLink.setAttribute(
          "download",
          resume.split("/").pop() || "resume.pdf"
        );

        document.body.appendChild(tempLink);
        tempLink.click();

        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading the resume:", error);
      }
    } else {
      console.error("Resume not found");
    }
  };

  return (
    <>
      <nav className="flex items-center gap-2 mb-5 md:mb-[28px]">
        <Link to={"/profile?job-posted"}>
          <img src={Ic_left_arrow} alt="arrow" />
        </Link>
        <Link to={"/profile?job-posted"}>
          <span className="text-primary text-sm font-semibold">
            Jobs Posted
          </span>
        </Link>
        <img src={Ic_right_breadCrumb_arrow} alt="arrow" />
        <span className="text-gray text-sm">Candidate Contacted</span>
      </nav>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-2 lg:gap-0 justify-between">
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 desktop:gap-5">
            {userDetails?.logo && (
              <img
                src={`${PHOTO_URL}/${userDetails?.logo}`}
                alt="icon"
                className="w-[55px] desktop:w-[80px] h-[55px] desktop:h-[80px] border border-gray5 rounded-[8px]"
              />
            )}
            <div className="flex flex-col gap-2">
              <h4 className="text-primary text-lg lg:text-xl desktop:text-2xl font-medium flex items-center gap-2 md:gap-3">
                {jobPostedData?.job_title}
                <span
                  className={`font-normal whitespace-nowrap text-sm md:text-base desktop:text-lg border border-primary rounded-lg px-2 md:px-4 py-0.5`}
                  style={{
                    background: getJobStatus(jobPostedData?.job_status)
                      .backgroundColor,
                  }}
                >
                  {getJobStatus(jobPostedData?.job_status).status}
                </span>
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-base lg:text-lg text-primary">
              {formatTimeAgo(jobPostedData?.updatedAt)}
            </p>
            <div className="bg-[#EFECE5] h-[8px] w-[8px] rounded-full"></div>
            <div className="flex items-center gap-1">
              <img src={Ic_person} alt="person" />
              <span className="text-primary font-semibold text-base lg:text-lg">
                {jobPostedData?.appliedJobsCount}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2 lg:gap-4 desktop:gap-5 items-center">
            <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
              <img
                src={Ic_location}
                alt="location"
                className="w-[20px] h-[20px] md:w-auto md:h-auto"
              />
              <span className="text-gray text-sm md:text-base desktop:text-xl relative">
                {convertJobLocation(jobPostedData?.location)[0]}
                &nbsp;
                {convertJobLocation(jobPostedData?.location).slice(1)?.length >
                  0 && (
                  <span
                    className="text-primary underline font-semibold cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(jobPostedData?.id, e);
                    }}
                  >
                    +
                    {
                      convertJobLocation(jobPostedData?.location).slice(1)
                        ?.length
                    }
                  </span>
                )}
                {isDropdownOpen === jobPostedData?.id && (
                  <div className="location-dropdown absolute">
                    {convertJobLocation(jobPostedData?.location)
                      .slice(1)
                      .map((location, index) => (
                        <div key={index} className="dropdown-item">
                          {location}
                        </div>
                      ))}
                  </div>
                )}
              </span>
            </div>
            <div className="border-l border-primary h-[25px] lg:h-[30px]"></div>
            <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
              <img
                src={Ic_experience}
                alt="experience"
                className="w-[20px] h-[20px] md:w-auto md:h-auto"
              />
              <span className="text-gray text-sm md:text-base desktop:text-xl">
                {jobPostedData?.job_experience}
              </span>
            </div>
            <div className="border-l border-primary h-[25px] lg:h-[30px]"></div>
            <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
              <img
                src={Ic_time}
                alt="time"
                className="w-[20px] h-[20px] md:w-auto md:h-auto"
              />
              <span className="text-gray text-sm md:text-base desktop:text-xl">
                {jobPostedData?.job_type?.name}
              </span>
            </div>
            <div className="border-l border-primary h-[25px] lg:h-[30px]"></div>
            <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
              <img
                src={Ic_rupee}
                alt="rupee"
                className="w-[20px] h-[20px] md:w-auto md:h-auto"
              />
              <span className="text-gray text-sm md:text-base desktop:text-xl">
                {`${jobPostedData?.currency?.symbol || ""} ${
                  jobPostedData?.minimum_pay || ""
                } - ${jobPostedData?.currency?.symbol || ""} ${
                  jobPostedData?.maximum_pay || ""
                }`}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <img src={Ic_file} alt="icon" />
          <div
            dangerouslySetInnerHTML={{
              __html: jobPostedData?.description,
            }}
            className="text-sm md:text-base lg:text-lg desktop:text-xl text-gray jobDescription"
          />
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray5 my-4 md:my-6 desktop:my-8"></div>
      {AppliedJobData.length > 0 && (
        <>
          <div className="flex flex-col gap-5">
            {AppliedJobData.map((job: any, index: any) => (
              <div
                key={index}
                className="border-2 border-primary rounded-[12px] md:rounded-2xl p-4 lg:p-5 desktop:p-6 flex flex-col gap-5 hover:shadow-shadow1"
              >
                <div className="flex flex-col sm:flex-row gap-2 lg:gap-0 justify-between">
                  <div className="flex items-center gap-2 md:gap-3 lg:gap-4 desktop:gap-5">
                    {job?.job_seeker?.profile_photo && (
                      <img
                        src={`${PHOTO_URL}/${job?.job_seeker?.profile_photo}`}
                        alt="icon"
                        className="w-[55px] desktop:w-[80px] h-[55px] desktop:h-[80px] border border-gray5 rounded-[8px]"
                      />
                    )}
                    <div className="flex flex-col gap-2">
                      <h4 className="text-primary text-lg lg:text-xl desktop:text-2xl font-medium flex items-center gap-2 md:gap-3">
                        {job?.job_seeker?.name}
                      </h4>
                      <div className="text-gray text-sm md:text-base desktop:text-lg flex gap-2">
                        {job?.job_seeker?.job_title}
                        {job?.job_seeker?.resume && (
                          <span
                            className="text-primary font-semibold text-sm md:text-base desktop:text-lg cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadResume(job?.job_seeker?.resume, e);
                            }}
                          >
                            Download Resume
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-base lg:text-lg text-gray">
                    Applied on:{" "}
                    <span className="text-primary font-medium">
                      {formatTimeAgo(job?.updatedAt)}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2 lg:gap-4 desktop:gap-5 items-center">
                    <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
                      <img
                        src={Ic_location}
                        alt="location"
                        className="w-[20px] h-[20px] md:w-auto md:h-auto"
                      />
                      <span className="text-gray text-sm md:text-base desktop:text-xl">
                        {job?.job_seeker?.location}
                      </span>
                    </div>
                    <div className="border-l border-primary h-[25px] lg:h-[30px]"></div>
                    <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
                      <img
                        src={Ic_experience}
                        alt="experience"
                        className="w-[20px] h-[20px] md:w-auto md:h-auto"
                      />
                      <span className="text-gray text-sm md:text-base desktop:text-xl">
                        {job?.job_seeker?.total_experience} Years
                      </span>
                    </div>
                    <div className="border-l border-primary h-[25px] lg:h-[30px]"></div>
                    <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
                      <img
                        src={Ic_candidate_call}
                        alt="call"
                        className="w-[20px] h-[20px] md:w-auto md:h-auto"
                      />
                      <span className="text-gray text-sm md:text-base desktop:text-xl">
                        {job?.job_seeker?.mobile_no}
                      </span>
                    </div>
                    <div className="border-l border-primary h-[25px] lg:h-[30px]"></div>
                    <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
                      <img
                        src={Ic_candidate_mail}
                        alt="rupee"
                        className="w-[20px] h-[20px] md:w-auto md:h-auto"
                      />
                      <span className="text-gray text-sm md:text-base desktop:text-xl">
                        {job?.job_seeker?.email}
                      </span>
                    </div>
                  </div>
                </div>
                {job?.job_seeker?.bio && (
                  <div className="flex gap-2 items-center">
                    <img src={Ic_file} alt="icon" />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: job?.job_seeker?.bio,
                      }}
                      className="text-sm md:text-base lg:text-lg desktop:text-xl text-gray jobDescription"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default JobPostedPerson;
