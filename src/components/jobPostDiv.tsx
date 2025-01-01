/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Ic_location from "@/assets/images/Ic_location.svg";
import Ic_experience from "@/assets/images/Ic_experience.svg";
import Ic_file from "@/assets/images/Ic_file.svg";
import Ic_call from "@/assets/images/Ic_call.svg";
import { useNavigate } from "react-router-dom";
import { convertJobLocation } from "@/lib/utils";
import JobTagsDisplay from "./jobsTagDisplay";

interface JobPostDivProps {
  findNext: any;
}

const JobPostDiv: React.FC<JobPostDivProps> = ({ findNext }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const toggleDropdown = (index: any, e: any) => {
    e.stopPropagation();
    setIsDropdownOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  const navigate = useNavigate();

  function maskPhoneNumber(phoneNumber: any) {
    const sanitized = phoneNumber.replace(/[^+\d]/g, "");
    return sanitized.replace(
      /^(\+\d{2})?(\d{1})\d*(\d{1})$/,
      (_: any, countryCode: any, firstDigit: any, lastDigit: any) => {
        return `${countryCode || ""}${firstDigit}********${lastDigit}`;
      }
    );
  }

  return (
    <>
      {findNext &&
        findNext.map((job: any, index: any) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                `/find-talent/${job.id || (job && job.jobs && job?.jobs?.id)}`
              );
            }}
            key={job.id || (job && job.jobs && job?.jobs?.id)}
            className="border-2 border-primary rounded-[12px] md:rounded-2xl p-4 lg:p-5 desktop:p-6 flex flex-col gap-5 hover:shadow-shadow1 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-0 justify-between">
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4 desktop:gap-5">
                {(job.employer?.logo ||
                  (job && job.jobs && job?.jobs?.employer?.logo)) && (
                  <img
                    src={`https://uxjobsite.com/public/${
                      job.employer?.logo ||
                      (job && job.jobs && job?.jobs?.employer?.logo)
                    }`}
                    alt="icon"
                    className="w-[55px] desktop:w-[80px] h-[55px] desktop:h-[80px] border border-gray5 rounded-[8px]"
                  />
                )}
                <div className="flex flex-col gap-2">
                  <h4
                    className="text-primary text-lg lg:text-xl desktop:text-2xl font-medium flex items-center gap-2 md:gap-3"
                    style={{
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      WebkitFilter: "blur(12px)",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {job.position || (job && job.jobs && job?.jobs?.position)}
                  </h4>
                  <div className="text-gray text-sm md:text-base desktop:text-lg font-medium cursor-pointer">
                    {job.position || (job && job.jobs && job?.jobs?.position)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 lg:gap-4 desktop:gap-5 items-center">
              <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                <img
                  src={Ic_location}
                  alt="location"
                  className="w-[20px] h-[20px] md:w-auto md:h-auto"
                />
                <span className="text-gray text-sm md:text-base desktop:text-xl relative">
                  {
                    convertJobLocation(
                      job.location || (job && job.jobs && job?.jobs?.location)
                    )[0]
                  }
                  &nbsp;
                  {convertJobLocation(
                    job.location || (job && job.jobs && job?.jobs?.location)
                  ).slice(1).length > 0 && (
                    <span
                      className="text-primary underline font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(index, e);
                      }}
                    >
                      +
                      {
                        convertJobLocation(
                          job.location ||
                            (job && job.jobs && job?.jobs?.location)
                        ).slice(1).length
                      }
                    </span>
                  )}
                  {isDropdownOpen === index && (
                    <div className="location-dropdown absolute">
                      {convertJobLocation(
                        job.location || (job && job.jobs && job?.jobs?.location)
                      )
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
              <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                <img
                  src={Ic_experience}
                  alt="experience"
                  className="w-[20px] h-[20px] md:w-auto md:h-auto"
                />
                <span className="text-gray text-sm md:text-base desktop:text-xl">
                  {job.job_experience ||
                    (job && job.jobs && job?.jobs?.job_experience)}
                </span>
              </div>
              <div className="border-l border-primary h-[25px] lg:h-[30px] hidden sm:block"></div>
              <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                <img
                  src={Ic_call}
                  alt="time"
                  className="w-[20px] h-[20px] md:w-auto md:h-auto"
                />
                <span className="text-gray text-sm md:text-base desktop:text-xl">
                  {maskPhoneNumber("+91 8458575427")}
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <img src={Ic_file} alt="icon" />
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    job.description ||
                    (job && job.jobs && job?.jobs?.description),
                }}
                className="text-sm md:text-base lg:text-lg desktop:text-xl text-gray jobDescription"
              />
            </div>
            <div className="border-t w-full border-gray5"></div>
            <div className="flex flex-col gap-4 lg:gap-2 lg:flex-row justify-between lg:items-center">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 desktop:gap-5">
                <JobTagsDisplay
                  tags={
                    job.tags?.split(",") ||
                    (job && job.jobs && job?.jobs?.tags?.split(","))
                  }
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default JobPostDiv;
