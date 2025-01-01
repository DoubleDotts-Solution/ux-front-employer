/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Ic_right_breadCrumb_arrow from "@/assets/images/Ic_right_breadCrumb_arrow.svg";
import Ic_left_arrow from "@/assets/images/Ic_left_arrow.svg";
import { Link } from "react-router-dom";
import Ic_location from "@/assets/images/Ic_location.svg";
import Ic_experience from "@/assets/images/Ic_experience.svg";
import Ic_time from "@/assets/images/Ic_time.svg";
import Ic_rupee from "@/assets/images/Ic_rupee.svg";
import Ic_file from "@/assets/images/Ic_file.svg";
import Ic_person from "@/assets/images/Ic_person.svg";
import {
  convertJobLocation,
  formatTimeAgo,
  getJobWorkPlaceType,
} from "@/lib/utils";

const jobPostedData = {
  id: 1,
  position: "UI Designer",
  job_experience: "3 year",
  work_place_type: "on-site",
  location: "Surat, India",
  description:
    "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.&nbsp;</p>",
  tags: "UI Designer",
  minimum_pay: "10000",
  maximum_pay: "20000",
  apply_text: "add resume ",
  job_status: "activate",
  is_approved: "approved",
  createdAt: "2024-10-22T05:49:55.734Z",
  updatedAt: "2024-10-23T12:47:49.353Z",
  category: {
    id: 4,
    name: "UI Designer",
    updatedAt: "2024-10-17T05:50:24.463Z",
  },
  job_type: {
    id: 2,
    name: "Full-time",
    updatedAt: "2024-10-17T05:55:30.382Z",
  },
  currency: {
    id: 1,
    name: "ruppee",
    symbol: "₹",
    updatedAt: "2024-10-17T06:40:49.873Z",
  },
  employer: {
    id: 2,
    company_name: "Doubledotts2",
    logo: "company/4e130718c71cdde71ba636c59847a333.jpg",
    website: "https://doubledotts.com/",
    country: "Usa",
    description:
      "<p>Developing engaging and intuitive mobile App that enhancing user engagement and experience to drive business growth.</p>",
    updatedAt: "2024-10-23T04:33:40.340Z",
  },
  pay_type: {
    id: 1,
    name: "Cash",
    updatedAt: "2024-10-17T05:55:03.136Z",
  },
  apply_by: {
    id: 3,
    name: "Directly Submitting Resume",
    updatedAt: "2024-10-17T05:57:09.342Z",
  },
};
const AppliedJobData = [
  {
    id: 3,
    createdAt: "2024-10-25T05:14:54.337Z",
    updatedAt: "2024-10-25T05:14:54.337Z",
    jobs: {
      id: 3,
      position: "UI Designer",
      job_experience: "5 year",
      work_place_type: "hybrid",
      location: "Bangalore, India",
      description:
        "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, w</p>",
      tags: "UI Designer",
      minimum_pay: "100",
      maximum_pay: "200",
      apply_text: "send cover letter",
      job_status: "activate",
      is_approved: "approved",
      createdAt: "2024-10-25T05:13:55.225Z",
      updatedAt: "2024-10-25T05:14:11.531Z",
      category: {
        id: 4,
        name: "UI Designer",
        updatedAt: "2024-10-17T05:50:24.463Z",
      },
      job_type: {
        id: 4,
        name: "Freelancing",
        updatedAt: "2024-10-17T05:55:41.647Z",
      },
      currency: {
        id: 3,
        name: "Dollar",
        symbol: "$",
        updatedAt: "2024-10-17T06:41:22.686Z",
      },
      pay_type: {
        id: 2,
        name: "UPI",
        updatedAt: "2024-10-17T05:55:10.477Z",
      },
      apply_by: {
        id: 3,
        name: "Directly Submitting Resume",
        updatedAt: "2024-10-17T05:57:09.342Z",
      },
      employer: {
        id: 2,
        company_name: "Doubledotts2",
        logo: "company/4e130718c71cdde71ba636c59847a333.jpg",
        website: "https://doubledotts.com/",
        country: "Usa",
        description:
          "<p>Developing engaging and intuitive mobile App that enhancing user engagement and experience to drive business growth.</p>",
        updatedAt: "2024-10-23T04:33:40.340Z",
      },
    },
  },
  {
    id: 2,
    createdAt: "2024-10-23T04:45:57.159Z",
    updatedAt: "2024-10-23T04:45:57.159Z",
    jobs: {
      id: 2,
      position: "Ux writer",
      job_experience: "5 year",
      work_place_type: "hybrid",
      location: "Surat, India",
      description:
        "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
      tags: "UI Designer",
      minimum_pay: "100",
      maximum_pay: "200",
      apply_text: "send cover letter",
      job_status: "activate",
      is_approved: "approved",
      createdAt: "2024-10-23T04:35:29.761Z",
      updatedAt: "2024-10-23T12:47:53.244Z",
      category: {
        id: 5,
        name: "UX Writer",
        updatedAt: "2024-10-17T05:50:32.307Z",
      },
      job_type: {
        id: 3,
        name: "Contract",
        updatedAt: "2024-10-17T05:55:36.181Z",
      },
      currency: {
        id: 3,
        name: "Dollar",
        symbol: "$",
        updatedAt: "2024-10-17T06:41:22.686Z",
      },
      pay_type: {
        id: 2,
        name: "UPI",
        updatedAt: "2024-10-17T05:55:10.477Z",
      },
      apply_by: {
        id: 3,
        name: "Directly Submitting Resume",
        updatedAt: "2024-10-17T05:57:09.342Z",
      },
      employer: {
        id: 2,
        company_name: "Doubledotts2",
        logo: "company/4e130718c71cdde71ba636c59847a333.jpg",
        website: "https://doubledotts.com/",
        country: "Usa",
        description:
          "<p>Developing engaging and intuitive mobile App that enhancing user engagement and experience to drive business growth.</p>",
        updatedAt: "2024-10-23T04:33:40.340Z",
      },
    },
  },
  {
    id: 1,
    createdAt: "2024-10-22T06:09:51.080Z",
    updatedAt: "2024-10-22T06:09:51.080Z",
    jobs: {
      id: 1,
      position: "UI Designer",
      job_experience: "3 year",
      work_place_type: "on-site",
      location: "Surat, India",
      description:
        "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.&nbsp;</p>",
      tags: "UI Designer",
      minimum_pay: "10000",
      maximum_pay: "20000",
      apply_text: "add resume ",
      job_status: "activate",
      is_approved: "approved",
      createdAt: "2024-10-22T05:49:55.734Z",
      updatedAt: "2024-10-23T12:47:49.353Z",
      category: {
        id: 4,
        name: "UI Designer",
        updatedAt: "2024-10-17T05:50:24.463Z",
      },
      job_type: {
        id: 2,
        name: "Full-time",
        updatedAt: "2024-10-17T05:55:30.382Z",
      },
      currency: {
        id: 1,
        name: "ruppee",
        symbol: "₹",
        updatedAt: "2024-10-17T06:40:49.873Z",
      },
      pay_type: {
        id: 1,
        name: "Cash",
        updatedAt: "2024-10-17T05:55:03.136Z",
      },
      apply_by: {
        id: 3,
        name: "Directly Submitting Resume",
        updatedAt: "2024-10-17T05:57:09.342Z",
      },
      employer: {
        id: 2,
        company_name: "Doubledotts2",
        logo: "company/4e130718c71cdde71ba636c59847a333.jpg",
        website: "https://doubledotts.com/",
        country: "Usa",
        description:
          "<p>Developing engaging and intuitive mobile App that enhancing user engagement and experience to drive business growth.</p>",
        updatedAt: "2024-10-23T04:33:40.340Z",
      },
    },
  },
];

const JobPostedPerson: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const toggleDropdown = (index: any, e: any) => {
    e.stopPropagation();
    setIsDropdownOpen((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <>
      <nav className="flex items-center gap-2 mb-5 md:mb-[28px]">
        <Link to={"/find-talent"}>
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
            {jobPostedData.employer?.logo && (
              <img
                src={`https://uxjobsite.com/public/${jobPostedData.employer?.logo}`}
                alt="icon"
                className="w-[55px] desktop:w-[80px] h-[55px] desktop:h-[80px] border border-gray5 rounded-[8px]"
              />
            )}
            <div className="flex flex-col gap-2">
              <h4 className="text-primary text-lg lg:text-xl desktop:text-2xl font-medium flex items-center gap-2 md:gap-3">
                {jobPostedData?.position}
                <span
                  className={`font-normal text-sm md:text-base desktop:text-lg border border-primary rounded-lg px-4 py-0.5`}
                  style={{
                    background: getJobWorkPlaceType(
                      jobPostedData.work_place_type ||
                        (jobPostedData && jobPostedData.work_place_type)
                    ).backgroundColor,
                  }}
                >
                  {
                    getJobWorkPlaceType(
                      jobPostedData.work_place_type ||
                        (jobPostedData && jobPostedData.work_place_type)
                    ).status
                  }{" "}
                </span>
              </h4>
            </div>
          </div>
          {/* <p className="text-base lg:text-lg text-gray">
                    Applied on:{" "}
                    <span className="text-primary font-medium">
                      {formatTimeAgo(jobPostedData.createdAt)}
                    </span>
                  </p> */}
          <div className="flex items-center gap-3">
            <p className="text-base lg:text-lg text-primary">
              {formatTimeAgo(jobPostedData.createdAt)}
            </p>
            <div className="bg-[#EFECE5] h-[8px] w-[8px] rounded-full"></div>
            <Link
              to={"/profile?job-posted&&person-id=12"}
              className="flex items-center gap-1 cursor-pointer"
            >
              <img src={Ic_person} alt="person" />
              <span className="text-primary font-semibold text-base lg:text-lg">
                23
              </span>
            </Link>
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
                Bangalore
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
                {jobPostedData.job_experience}
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
                {jobPostedData.job_type.name}
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
                {`${jobPostedData.currency?.symbol} ${jobPostedData.minimum_pay} - ${jobPostedData.currency?.symbol} ${jobPostedData.maximum_pay}`}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <img src={Ic_file} alt="icon" />
          <div
            dangerouslySetInnerHTML={{
              __html:
                jobPostedData.description ||
                (jobPostedData && jobPostedData.description),
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
                key={job?.jobs?.id}
                className="border-2 border-primary rounded-[12px] md:rounded-2xl p-4 lg:p-5 desktop:p-6 flex flex-col gap-5 hover:shadow-shadow1"
              >
                <div className="flex flex-col sm:flex-row gap-2 lg:gap-0 justify-between">
                  <div className="flex items-center gap-2 md:gap-3 lg:gap-4 desktop:gap-5">
                    {(job?.employer?.logo || job?.jobs?.employer?.logo) && (
                      <img
                        src={`https://uxjobsite.com/public/${
                          job?.employer?.logo || job?.jobs?.employer?.logo
                        }`}
                        alt="icon"
                        className="w-[55px] desktop:w-[80px] h-[55px] desktop:h-[80px] border border-gray5 rounded-[8px]"
                      />
                    )}
                    <div className="flex flex-col gap-2">
                      <h4 className="text-primary text-lg lg:text-xl desktop:text-2xl font-medium flex items-center gap-2 md:gap-3">
                        {job?.jobs?.position}
                        <span
                          className={`font-normal text-sm md:text-base desktop:text-lg border border-primary rounded-lg px-4 py-0.5`}
                          style={{
                            background: getJobWorkPlaceType(
                              job.work_place_type ||
                                (job && job.jobs && job?.jobs?.work_place_type)
                            ).backgroundColor,
                          }}
                        >
                          {
                            getJobWorkPlaceType(
                              job.work_place_type ||
                                (job && job.jobs && job?.jobs?.work_place_type)
                            ).status
                          }{" "}
                        </span>
                      </h4>
                      <div className="text-gray text-sm md:text-base desktop:text-lg font-medium">
                        {job?.employer?.company_name ||
                          job?.jobs?.employer?.company_name}
                      </div>
                    </div>
                  </div>
                  <p className="text-base lg:text-lg text-gray">
                    Applied on:{" "}
                    <span className="text-primary font-medium">
                      {formatTimeAgo(job.createdAt)}
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
                      <span className="text-gray text-sm md:text-base desktop:text-xl relative">
                        {convertJobLocation(job?.jobs.location)[0]}
                        &nbsp;
                        {convertJobLocation(job?.jobs.location).slice(1)
                          .length > 0 && (
                          <span
                            className="text-primary underline font-semibold cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(index, e);
                            }}
                          >
                            +
                            {
                              convertJobLocation(job?.jobs.location).slice(1)
                                .length
                            }
                          </span>
                        )}
                        {isDropdownOpen === index && (
                          <div className="location-dropdown absolute">
                            {convertJobLocation(job?.jobs.location)
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
                        {job?.jobs?.job_experience}
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
                        {job?.jobs?.job_type.name}
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
                        {`${job.jobs?.currency?.symbol} ${job.jobs?.minimum_pay} - ${job.jobs?.currency?.symbol} ${job.jobs?.maximum_pay}`}
                      </span>
                    </div>
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
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default JobPostedPerson;
