/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Ic_location from "@/assets/images/Ic_location.svg";
import Ic_experience from "@/assets/images/Ic_experience.svg";
import Ic_time from "@/assets/images/Ic_time.svg";
import Ic_rupee from "@/assets/images/Ic_rupee.svg";
import { Link } from "react-router-dom";
import Ic_file from "@/assets/images/Ic_file.svg";
import Img_profile_no_data from "@/assets/images/Img_profile_no_data.png";
import {
  convertJobLocation,
  formatTimeAgo,
  getJobWorkPlaceType,
} from "@/lib/utils";
import Ic_option from "@/assets/images/Ic_option.svg";
import Ic_person from "@/assets/images/Ic_person.svg";
import { Pagination } from "@/components/common/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import JobTagsDisplay from "@/components/jobsTagDisplay";
import ButtonUx from "@/components/common/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Ic_close from "@/assets/images/Ic_close_black.svg";
import Ic_edit from "@/assets/images/Ic_edit.svg";
import Ic_trash_black from "@/assets/images/Ic_trash_black.svg";
import Ic_copy from "@/assets/images/Ic_copy.svg";
import Ic_refresh from "@/assets/images/Ic_refresh.svg";
import Ic_eye from "@/assets/images/Ic_eye.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Modal from "@/components/common/modal";
import Ic_briefcase from "@/assets/images/Ic_briefcase.svg";
import Ic_layout_grid from "@/assets/images/Ic_layout_grid.svg";

const jobPostedData = [
  {
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
      id: 2,
      name: "UPI",
      updatedAt: "2024-10-17T05:55:10.477Z",
    },
    apply_by: {
      id: 3,
      name: "Directly Submitting Resume",
      updatedAt: "2024-10-17T05:57:09.342Z",
    },
  },
  {
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
      id: 2,
      name: "UPI",
      updatedAt: "2024-10-17T05:55:10.477Z",
    },
    apply_by: {
      id: 3,
      name: "Directly Submitting Resume",
      updatedAt: "2024-10-17T05:57:09.342Z",
    },
  },
  {
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
  },
];
const AppliedJobData = {
  data: [
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
  ],
  pagination: {
    totalCount: 3,
    currentPage: 1,
    limit: 5,
    totalPages: 1,
  },
  status: 200,
};

const changeStatusFormSchema = z.object({
  job_status: z.string().min(1, {
    message: "Please select a workplace type.",
  }),
});

const JobPosted: React.FC = () => {
  const params = {
    page: 1,
    limit: 5,
    value: "",
  };
  const [searchJob, setSearchJob] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const toggleDropdown = (index: any, e: any) => {
    e.stopPropagation();
    setIsDropdownOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  // ----
  const [currentAppliedJobDataPage, setCurrentAppliedJobDataPage] = useState(1);

  const handleAppliedJobPageChange = (page: number) => {
    setCurrentAppliedJobDataPage(page);
  };

  const AppliedJobDataArray = (AppliedJobData as any)?.data || [];

  const [isChangeJobPost, setIsChangeJobPost] = useState(null);

  const toggleChangeJobPost = (index: any) => {
    setIsChangeJobPost((prevIndex) => (prevIndex === index ? null : index));
  };

  const [isConfirmDelete, setIsConfirmDelete] = useState(null);

  const body = document.querySelector("body");
  const onDelete = async (id: any) => {
    setIsChangeJobPost(null);
    if (isConfirmDelete) {
      setTimeout(() => {
        setIsConfirmDelete(null);
      }, 300);
      body?.classList.remove("overflow-hidden");
      body?.classList.remove("h-screen");
    } else {
      setIsConfirmDelete(id);
      body?.classList.add("overflow-hidden");
      body?.classList.add("h-screen");
    }
  };

  const popup = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popup.current && !popup.current.contains(event.target as Node)) {
        setIsChangeStatus(null);
        setIsDropdownOpen(null);
        setIsConfirmDelete(null);
        setIsChangeJobPost(null);
        setJobPreviewPopupVisible(null);
        body?.classList.remove("overflow-hidden");
        body?.classList.remove("h-screen");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteJobPost = async (id: any) => {
    console.log(id);
  };

  const [isChangeStatus, setIsChangeStatus] = useState(null);
  const onChangeStatus = async (id: any) => {
    setIsChangeJobPost(null);
    if (isChangeStatus) {
      setTimeout(() => {
        setIsChangeStatus(null);
      }, 300);
      body?.classList.remove("overflow-hidden");
      body?.classList.remove("h-screen");
    } else {
      setIsChangeStatus(id);
      body?.classList.add("overflow-hidden");
      body?.classList.add("h-screen");
    }
  };

  const changeStatusForm = useForm<z.infer<typeof changeStatusFormSchema>>({
    resolver: zodResolver(changeStatusFormSchema),
  });

  const onChangeStatusSubmit = async (data: any) => {
    console.log(data);
  };
  const [isJobPreviewPopupVisible, setJobPreviewPopupVisible] = useState(null);

  const openJobPreviewPopup = (id: any) => {
    if (isJobPreviewPopupVisible) {
      setTimeout(() => {
        setJobPreviewPopupVisible(null);
        setIsChangeJobPost(null);
      }, 300);
      body?.classList.remove("overflow-hidden");
      body?.classList.remove("h-screen");
    } else {
      setJobPreviewPopupVisible(id);
      body?.classList.add("overflow-hidden");
      body?.classList.add("h-screen");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-3 md:mb-6 justify-between">
        <p className="text-gray text-base md:text-lg desktop:text-xl">
          Total Job Posted:{" "}
          <span className="text-primary font-medium">
            {AppliedJobDataArray.length > 0
              ? AppliedJobData?.pagination.totalCount > 9
                ? AppliedJobData.pagination.totalCount
                : `0${AppliedJobData.pagination.totalCount}`
              : 0}
          </span>
        </p>
        <div className="w-full sm:w-[280px] md:w-[360px]">
          <div className="relative">
            <Input
              placeholder="Search for Jobs"
              className="bg-white border pl-8 placeholder:text-sm h-10 lg:h-10 border-gray5"
              onChange={(e: any) => {
                setSearchJob(e.target.value);
              }}
              value={searchJob || ""}
            />
            <Search className="absolute left-0 top-[2px] lg:top-[3px] m-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
      {AppliedJobDataArray.length > 0 ? (
        <>
          <div className="flex flex-col gap-5">
            {AppliedJobDataArray.map((job: any, index: any) => (
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
                    </div>
                  </div>
                  {/* <p className="text-base lg:text-lg text-gray">
                    Applied on:{" "}
                    <span className="text-primary font-medium">
                      {formatTimeAgo(job.createdAt)}
                    </span>
                  </p> */}
                  <div className="flex items-center gap-3">
                    <p className="text-base lg:text-lg text-primary">
                      {formatTimeAgo(job.createdAt)}
                    </p>
                    <div className="bg-[#EFECE5] h-[8px] w-[8px] rounded-full"></div>
                    <Link
                      to={"/profile?job-posted&&person-id=12"}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <img src={Ic_person} alt="person" />
                      <span className="text-primary font-semibold text-base lg:text-lg">
                        {job.appliedJobsCount}23
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
                <div className="w-full h-[1px] bg-gray5"></div>
                <div className="flex flex-col gap-4 lg:gap-2 lg:flex-row justify-between lg:items-center">
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 desktop:gap-5">
                    <JobTagsDisplay
                      tags={
                        job.tags?.split(",") ||
                        (job && job.jobs && job?.jobs?.tags?.split(","))
                      }
                    />
                  </div>
                  <div className="relative">
                    <img
                      src={Ic_option}
                      alt="option"
                      onClick={() => toggleChangeJobPost(index)}
                      className="cursor-pointer"
                    />
                    {isChangeJobPost === index && (
                      <ul
                        className="absolute bg-white z-50 right-0 border border-[#888888] rounded-[8px] w-max p-2"
                        ref={popup}
                      >
                        <Link to={`/edit-job/${job.id}`}>
                          <li className="whitespace-nowrap flex gap-3 items-center rounded-[8px] text-primary px-3 py-2 hover:bg-[#EFECE5] cursor-pointer">
                            <img src={Ic_edit} alt="edit" />
                            Edit
                          </li>
                        </Link>
                        <li
                          className="whitespace-nowrap flex gap-3 items-center rounded-[8px] text-primary px-3 py-2 hover:bg-[#EFECE5] cursor-pointer"
                          // onClick={() => openJobPreviewPopup(job.id)}
                        >
                          <img src={Ic_copy} alt="eye" />
                          Duplicate
                        </li>
                        <li
                          className="whitespace-nowrap flex gap-3 items-center rounded-[8px] text-primary px-3 py-2 hover:bg-[#EFECE5] cursor-pointer"
                          onClick={() => openJobPreviewPopup(job.id)}
                        >
                          <img src={Ic_eye} alt="eye" />
                          View Live
                        </li>
                        <li
                          className="whitespace-nowrap flex gap-3 items-center rounded-[8px] text-primary px-3 py-2 hover:bg-[#EFECE5] cursor-pointer"
                          onClick={() => onChangeStatus(job.id)}
                        >
                          <img src={Ic_refresh} alt="refresh" />
                          Update Status
                        </li>
                        <li
                          className="whitespace-nowrap flex gap-3 items-center rounded-[8px] text-primary px-3 py-2 hover:bg-[#EFECE5] cursor-pointer"
                          onClick={() => onDelete(job.id)}
                        >
                          <img src={Ic_trash_black} alt="delete" />
                          Delete
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {AppliedJobData?.pagination.totalCount > params.limit ? (
            <div className="flex justify-center mt-6 lg:mt-8">
              <Pagination
                currentPage={currentAppliedJobDataPage}
                totalPages={AppliedJobData?.pagination.totalPages}
                onPageChange={handleAppliedJobPageChange}
              />
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex items-center justify-center desktop:pb-[100px]">
          <div className="flex flex-col items-center w-full max-w-[490px]">
            <img
              src={Img_profile_no_data}
              alt="image"
              className="img-fluid mb-[16px] lg:mb-[24px]"
            />
            <h4 className="text-primary font-semibold text-lg sm:text-xl md:text-[24px] lg:text-[28px] desktop:text-[2rem] mb-1 md:mb-[8px]">
              Start Showcasing your Opportunities!
            </h4>
            <p className="text-gray mt-[8px] text-sm md:text-base desktop:text-lg text-center mb-[16px] lg:mb-[24px]">
              You haven’t posted any jobs yet. Post your first job to attract
              top UX talent and grow your team.
            </p>
            <Link to={"/post-job"}>
              <ButtonUx
                label="Post a Job for Free"
                buttonClassName="z-50 relative w-full h-10 lg:h-12 font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2"
              />
            </Link>
          </div>
        </div>
      )}

      {isConfirmDelete && (
        <Modal
          onClose={() => {
            setIsConfirmDelete(null);
          }}
          isOpen={true}
        >
          <div className="p-5 md:p-8" ref={popup}>
            <h3 className="text-primary font-semibold text-lg lg:text-xl desktop:text-2xl mb-1 text-center mt-3">
              Are you Want to delete?
            </h3>
            <div className="flex items-center pt-[8px] md:pt-[12px] gap-3 md:gap-6">
              <div className="w-full" onClick={onDelete}>
                <ButtonUx
                  label="Cancel"
                  buttonClassName="bg-white font-semibold text-base w-full border-2 border-primary rounded-[8px] px-6 py-2 h-10 lg:h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
                />
              </div>
              <div
                className="w-full"
                onClick={() => {
                  deleteJobPost(isConfirmDelete);
                }}
              >
                <ButtonUx
                  label="Confirm"
                  buttonClassName="font-semibold text-primary w-full bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-10 lg:h-12"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
      {isChangeStatus && (
        <Modal
          onClose={() => {
            setIsChangeStatus(null);
          }}
          isOpen={true}
        >
          <div className="p-5 md:p-8 w-full max-w-[454px]" ref={popup}>
            <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px] mb-4 desktop:mb-5 desktop:leading-[32px]">
              Update the Job Post Status of 'Graphic Designer'
            </h3>
            <Form {...changeStatusForm}>
              <form
                onSubmit={changeStatusForm.handleSubmit(onChangeStatusSubmit)}
              >
                <FormField
                  control={changeStatusForm.control}
                  name="job_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col gap-[12px]">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="job_status1"
                              {...field}
                              value="activate"
                              checked={field.value === "activate"}
                            />
                            <label
                              className="text-primary text-sm md:text-base desktop:text-xl"
                              htmlFor="job_status1"
                            >
                              Activate
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="job_status2"
                              {...field}
                              value="deactivate"
                              checked={field.value === "deactivate"}
                            />
                            <label
                              className="text-primary text-sm md:text-base desktop:text-xl"
                              htmlFor="job_status2"
                            >
                              Deactivate
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="job_status3"
                              {...field}
                              value="close"
                              checked={field.value === "close"}
                            />
                            <label
                              className="text-primary text-sm md:text-base desktop:text-xl"
                              htmlFor="job_status3"
                            >
                              Close
                            </label>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-3 md:gap-5 w-full mt-[24px] md:mt-[32px]">
                  <div className="w-full" onClick={onChangeStatus}>
                    <ButtonUx
                      label="Cancel"
                      buttonClassName="bg-white font-semibold text-base w-full border-2 border-primary rounded-[8px] px-6 py-2 h-10 lg:h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
                    />
                  </div>
                  <div className="w-full">
                    <ButtonUx
                      label="Confirm & Update"
                      buttonClassName="font-semibold text-primary w-full bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-10 lg:h-12"
                      type="submit"
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </Modal>
      )}
      {isJobPreviewPopupVisible && (
        <div
          className={`fixed inset-0 flex justify-center items-center`}
          style={{
            boxShadow: "0px 7px 14px 0px #080F3408",
            background: "#00000099",
            zIndex: "9999999999",
          }}
        >
          <div
            className="bg-white relative rounded-[12px] overflow-hidden shadow-lg w-[94%] md:w-[85%] h-max pt-4 md:pt-6 desktop:pt-8"
            ref={popup}
          >
            <img
              src={Ic_close}
              alt="close"
              className="absolute top-[16px] md:top-[24px] right-[16px] md:right-[24px]"
              onClick={openJobPreviewPopup}
            />
            <h4 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px] mb-6 px-4 md:px-6 desktop:px-8">
              Job Post Preview
            </h4>

            {jobPostedData.map(
              (job: any, index: any) =>
                job.id === isJobPreviewPopupVisible && (
                  <div key={index}>
                    <div className="bg-lightChiku p-3 lg:p-5 desktop:p-6 flex flex-col gap-4 mb-10">
                      <div className="flex flex-col sm:flex-row gap-2 lg:gap-0 justify-between">
                        <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                          <div className="flex flex-col gap-1">
                            <div className="text-gray text-sm md:text-lg font-medium">
                              Perry Street Software
                            </div>
                            <h2 className="text-primary text-2xl big:text-[40px] font-semibold leading-[36px] big:leading-[48px]">
                              {job?.position}
                            </h2>
                          </div>
                        </div>
                        <p className="text-base lg:text-lg text-gray">
                          {formatTimeAgo(job?.updatedAt)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 lg:gap-4 desktop:gap-5 items-center">
                        <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl flex items-center gap-2">
                          <img
                            src={Ic_layout_grid}
                            alt="icon"
                            className="w-[20px] h-[20px] md:w-auto md:h-auto"
                          />
                          {job?.position}
                        </span>
                        <div className="border-l border-gray5 h-[18px]"></div>
                        <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                          <img
                            src={Ic_location}
                            alt="location"
                            className="w-[20px] h-[20px] md:w-auto md:h-auto"
                          />
                          <span className="text-gray text-sm md:text-base desktop:text-xl relative">
                            {job?.location}
                          </span>
                        </div>
                        <div className="border-l border-gray5 h-[18px]"></div>
                        <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                          <img
                            src={Ic_experience}
                            alt="experience"
                            className="w-[20px] h-[20px] md:w-auto md:h-auto"
                          />
                          <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl">
                            {job?.job_experience}
                          </span>
                        </div>
                        <div className="border-l border-gray5 h-[18px]"></div>
                        <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                          <img
                            src={Ic_time}
                            alt="time"
                            className="w-[20px] h-[20px] md:w-auto md:h-auto"
                          />
                          <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl">
                            {job?.job_type?.name}
                          </span>
                        </div>
                        <div className="border-l border-gray5 h-[18px]"></div>
                        <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                          <img
                            src={Ic_rupee}
                            alt="rupee"
                            className="w-[20px] h-[20px] md:w-auto md:h-auto"
                          />
                          <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl">
                            {`${job?.currency?.symbol} ${job?.minimum_pay} - ${job?.currency?.symbol} ${job?.maximum_pay}`}
                          </span>
                        </div>
                        <div className="border-l border-gray5 h-[18px]"></div>
                        <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl flex items-center gap-2">
                          <img
                            src={Ic_briefcase}
                            alt="briefcase"
                            className="w-[20px] h-[20px] md:w-auto md:h-auto"
                          />
                          {job?.work_place_type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mb-4 md:mb-6">
                        <span className="text-primary text-sm lg:text-base">
                          Skills:
                        </span>
                        <JobTagsDisplay tags={job.tags.split(",")} />
                      </div>
                    </div>

                    <div
                      style={{
                        maxHeight: "calc(100vh - 600px)",
                        overflowY: "auto",
                      }}
                      className="overFlowYAuto px-4 md:px-6 desktop:px-8 pb-4 md:pb-6 desktop:pb-8"
                    >
                      <h4 className="mb-3 text-primary text-base md:text-xl desktop:text-[2rem] font-semibold">
                        Job Description
                      </h4>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: job.description,
                        }}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JobPosted;
