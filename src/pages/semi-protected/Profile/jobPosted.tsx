/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Ic_location from "@/assets/images/Ic_location.svg";
import Ic_experience from "@/assets/images/Ic_experience.svg";
import Ic_time from "@/assets/images/Ic_time.svg";
import Ic_rupee from "@/assets/images/Ic_rupee.svg";
import { Link, useNavigate } from "react-router-dom";
import Ic_file from "@/assets/images/Ic_file.svg";
import Img_profile_no_data from "@/assets/images/Img_profile_no_data.png";
import { convertJobLocation, formatTimeAgo, getJobStatus } from "@/lib/utils";
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
import {
  useDeleteJobMutation,
  useJobChangeStatusMutation,
  useJobPostedQuery,
  useSingleJobDataMutation,
} from "@/store/slice/apiSlice/profileApi";
import { useSelector } from "react-redux";
import Loading from "@/components/common/loading";
import { PHOTO_URL } from "@/config/constant";
import { toast } from "react-hot-toast";
import { useCreateJobApiMutation } from "@/store/slice/apiSlice/jobsApi";

const changeStatusFormSchema = z.object({
  job_status: z.string().min(1, {
    message: "Please select a workplace type.",
  }),
});

const JobPosted: React.FC = () => {
  const [searchJob, setSearchJob] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const toggleDropdown = (index: any, e: any) => {
    e.stopPropagation();
    setIsDropdownOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  const navigate = useNavigate();
  // ----
  const [jobPostedPage, setJobPostedPage] = useState(1);

  const handleAppliedJobPageChange = (page: number) => {
    setJobPostedPage(page);
  };
  const params: any = {
    page: jobPostedPage,
    limit: 5,
    value: searchJob,
  };
  const userDetails = useSelector((state: any) => state.user)?.userDetails;

  const { data, isLoading, refetch } = useJobPostedQuery({
    data: params,
    id: userDetails?.id,
  });
  const AppliedJobDataArray = (data as any)?.data || [];

  const [isChangeJobPost, setIsChangeJobPost] = useState(null);

  const toggleChangeJobPost = (index: any) => {
    setIsChangeJobPost((prevIndex) => (prevIndex === index ? null : index));
  };

  const [isConfirmDelete, setIsConfirmDelete] = useState(null);

  const body = document.querySelector("body");
  const onDelete = async (id?: any) => {
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
  const [deleteJob] = useDeleteJobMutation();

  const deleteJobPost = async (id: any) => {
    try {
      const response: any = await deleteJob({
        id: id,
      });

      if (response && response.data.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
        });
        onDelete();
        refetch();
      } else {
        toast.error(response.error.data.message, {
          position: "top-right",
        });
        console.error("API error:", response.error);
      }
    } catch (error: any) {
      console.error("Validation error:", error);
      toast.error(error.error.message, {
        position: "top-right",
      });
    }
  };

  const [isChangeStatus, setIsChangeStatus] = useState(null);
  const onChangeStatus = async (id?: any) => {
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
  const [handleJobStatus] = useJobChangeStatusMutation();

  const onChangeStatusSubmit = async (data: any) => {
    try {
      const response: any = await handleJobStatus({
        id: Number(isChangeStatus),
        data: data,
      });

      if (response && response.data.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
        });
        changeStatusForm.reset();
        onChangeStatus();
        refetch();
      } else {
        toast.error(response.error.data.message, {
          position: "top-right",
        });
        console.error("API error:", response.error);
      }
    } catch (error: any) {
      console.error("Validation error:", error);
      toast.error(error.error.message, {
        position: "top-right",
      });
    }
  };
  const [isJobPreviewPopupVisible, setJobPreviewPopupVisible] = useState(null);
  const [jobPostedData, setJobPostedData] = useState<any>(null);
  const [singleJobData] = useSingleJobDataMutation();
  const openJobPreviewPopup = async (id: any) => {
    if (isJobPreviewPopupVisible) {
      setTimeout(() => {
        navigate("/profile");
        setJobPreviewPopupVisible(null);
        setIsChangeJobPost(null);
      }, 300);
      body?.classList.remove("overflow-hidden");
      body?.classList.remove("h-screen");
    } else {
      setJobPreviewPopupVisible(id);

      try {
        const response: any = await singleJobData({ id: id });

        if (response && response.data.status === 200) {
          setJobPostedData(response.data.data);
        } else {
          toast.error(response.error.data.message, {
            position: "top-right",
          });
          console.error("API error:", response.error);
        }
      } catch (error: any) {
        console.error("Validation error:", error);
        toast.error(error.error.message, {
          position: "top-right",
        });
      }
      navigate(`${location.pathname}?view-live`);
      body?.classList.add("overflow-hidden");
      body?.classList.add("h-screen");
    }
  };

  const [createJob] = useCreateJobApiMutation();

  const handleDuplicateJob = async (jobId: number) => {
    const jobToDuplicate = AppliedJobDataArray.find(
      (job: any) => job.id === jobId
    );
    if (!jobToDuplicate) {
      return;
    }
    const skillsIds = jobToDuplicate?.skills
      ?.map((skill: any) => skill.id)
      .join(",");

    const duplicatedJob = {
      // id: null,
      employer: userDetails?.id,
      job_title: jobToDuplicate?.job_title,
      category: jobToDuplicate?.category?.id,
      job_type: jobToDuplicate?.job_type?.id,
      currency: jobToDuplicate?.currency?.id,
      job_experience: jobToDuplicate?.job_experience,
      location: jobToDuplicate?.location,
      work_place_type: jobToDuplicate?.work_place_type,
      skills: skillsIds,
      description: jobToDuplicate?.description,
      tags: jobToDuplicate?.tags,
      minimum_pay: Number(jobToDuplicate?.minimum_pay),
      maximum_pay: Number(jobToDuplicate?.maximum_pay),
      pay_type: jobToDuplicate?.pay_type?.id,
      apply_by: jobToDuplicate?.apply_by?.id,
      apply_text: jobToDuplicate?.currency,
    };

    try {
      const response: any = await createJob({
        data: duplicatedJob,
      });

      if (response.data.status === 200) {
        refetch();
        toast.success("Job duplicated successfully", {
          position: "top-right",
        });
      } else {
        toast.error(response.error.data.message, {
          position: "top-right",
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  if (isLoading) {
    <Loading />;
  }
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-3 md:mb-6 justify-between">
        <p className="text-gray text-base md:text-lg desktop:text-xl">
          Total Job Posted:{" "}
          <span className="text-primary font-medium">
            {AppliedJobDataArray.length > 0
              ? (data as any)?.pagination.totalCount > 9
                ? (data as any).pagination.totalCount
                : `0${(data as any).pagination.totalCount}`
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
              <Link
                key={job?.id}
                className="border-2 border-primary rounded-[12px] md:rounded-2xl p-4 lg:p-5 desktop:p-6 flex flex-col gap-5 hover:shadow-shadow1"
                to={`/profile?job-posted&&person-id=${job?.id}`}
              >
                <div className="flex flex-col sm:flex-row gap-2 lg:gap-0 justify-between">
                  <div className="flex items-center gap-2 md:gap-3 lg:gap-4 desktop:gap-5">
                    {(userDetails?.logo || userDetails?.logo) && (
                      <img
                        src={`${PHOTO_URL}/${
                          userDetails?.logo || userDetails?.logo
                        }`}
                        alt="icon"
                        className="w-[55px] desktop:w-[80px] h-[55px] desktop:h-[80px] border border-gray5 rounded-[8px]"
                      />
                    )}
                    <div className="flex flex-col gap-2">
                      <h4 className="text-primary text-lg lg:text-xl desktop:text-2xl font-medium flex items-center gap-2 md:gap-3">
                        {job?.job_title}
                        <span
                          className={`font-normal text-sm md:text-base desktop:text-lg border border-primary rounded-lg px-4 py-0.5`}
                          style={{
                            background: getJobStatus(
                              job.job_status ||
                                (job && job.jobs && job?.job_status)
                            ).backgroundColor,
                          }}
                        >
                          {
                            getJobStatus(
                              job.job_status ||
                                (job && job.jobs && job?.job_status)
                            ).status
                          }{" "}
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-base lg:text-lg text-primary">
                      {formatTimeAgo(job.updatedAt)}
                    </p>
                    <div className="bg-[#EFECE5] h-[8px] w-[8px] rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <img src={Ic_person} alt="person" />
                      <span className="text-primary font-semibold text-base lg:text-lg">
                        {job.appliedJobsCount}
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
                        {convertJobLocation(job?.location)[0]}
                        &nbsp;
                        {convertJobLocation(job?.location).slice(1).length >
                          0 && (
                          <span
                            className="text-primary underline font-semibold cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(index, e);
                            }}
                          >
                            +{convertJobLocation(job?.location).slice(1).length}
                          </span>
                        )}
                        {isDropdownOpen === index && (
                          <div className="location-dropdown absolute">
                            {convertJobLocation(job?.location)
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
                        {job?.job_experience}
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
                        {job?.job_type.name}
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
                        {`${
                          job.currency?.symbol ||
                          job.jobs?.currency?.symbol ||
                          ""
                        } ${job.minimum_pay || job.jobs?.minimum_pay || ""} - ${
                          job.currency?.symbol ||
                          job.jobs?.currency?.symbol ||
                          ""
                        } ${job.maximum_pay || job.jobs?.maximum_pay || ""}`}
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
                        (job && job.jobs && job?.description),
                    }}
                    className="text-sm md:text-base lg:text-lg desktop:text-xl text-gray jobDescription"
                  />
                </div>
                <div className="w-full h-[1px] bg-gray5"></div>
                <div className="flex flex-col gap-4 lg:gap-2 lg:flex-row justify-between lg:items-center">
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 desktop:gap-5">
                    <JobTagsDisplay
                      tags={
                        job.skills || (job && job.jobs && job?.jobs?.skills)
                      }
                    />
                  </div>
                  <div className="relative">
                    <img
                      src={Ic_option}
                      alt="option"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleChangeJobPost(index);
                      }}
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
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDuplicateJob(job.id);
                          }}
                        >
                          <img src={Ic_copy} alt="eye" />
                          Duplicate
                        </li>
                        <li
                          className="whitespace-nowrap flex gap-3 items-center rounded-[8px] text-primary px-3 py-2 hover:bg-[#EFECE5] cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openJobPreviewPopup(job.id);
                          }}
                        >
                          <img src={Ic_eye} alt="eye" />
                          View Live
                        </li>
                        <li
                          className="whitespace-nowrap flex gap-3 items-center rounded-[8px] text-primary px-3 py-2 hover:bg-[#EFECE5] cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onChangeStatus(job.id);
                          }}
                        >
                          <img src={Ic_refresh} alt="refresh" />
                          Update Status
                        </li>
                        <li
                          className="whitespace-nowrap flex gap-3 items-center rounded-[8px] text-primary px-3 py-2 hover:bg-[#EFECE5] cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete(job.id);
                          }}
                        >
                          <img src={Ic_trash_black} alt="delete" />
                          Delete
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {(data as any)?.pagination.totalCount > params.limit ? (
            <div className="flex justify-center mt-6 lg:mt-8">
              <Pagination
                currentPage={(data as any)?.pagination.currentPage}
                totalPages={(data as any)?.pagination.totalPages}
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
            <h4 className="text-primary font-semibold text-lg sm:text-xl md:text-[24px] lg:text-[28px] desktop:text-[2rem] mb-1 md:mb-[8px] text-center">
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
                          <div className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              className="cursor-pointer"
                              id="job_status1"
                              {...field}
                              value="activate"
                              checked={field.value === "activate"}
                            />
                            <label
                              className="text-primary text-sm md:text-base desktop:text-xl cursor-pointer"
                              htmlFor="job_status1"
                            >
                              Activate
                            </label>
                          </div>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              className="cursor-pointer"
                              id="job_status2"
                              {...field}
                              value="deactivate"
                              checked={field.value === "deactivate"}
                            />
                            <label
                              className="text-primary text-sm md:text-base desktop:text-xl cursor-pointer"
                              htmlFor="job_status2"
                            >
                              Deactivate
                            </label>
                          </div>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              className="cursor-pointer"
                              id="job_status3"
                              {...field}
                              value="close"
                              checked={field.value === "close"}
                            />
                            <label
                              className="text-primary text-sm md:text-base desktop:text-xl cursor-pointer"
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
              className="absolute top-[16px] md:top-[24px] right-[16px] md:right-[24px] cursor-pointer"
              onClick={openJobPreviewPopup}
            />
            <h4 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px] mb-6 px-4 md:px-6 desktop:px-8">
              Job Post Preview
            </h4>
            {jobPostedData && jobPostedData && (
              <div
                style={{
                  maxHeight: "calc(100vh - 280px)",
                  overflowY: "auto",
                }}
                className="overFlowYAuto"
              >
                <div className="bg-lightChiku p-3 lg:p-5 desktop:p-6 flex flex-col gap-4 mb-10">
                  <div className="flex flex-col sm:flex-row gap-2 lg:gap-0 justify-between">
                    <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="text-gray text-sm md:text-lg font-medium">
                          {jobPostedData?.employer?.company_name}
                        </div>
                        <h2 className="text-primary text-2xl big:text-[40px] font-semibold leading-[36px] big:leading-[48px]">
                          {jobPostedData?.job_title}
                        </h2>
                      </div>
                    </div>
                    <p className="text-base lg:text-lg text-gray">
                      {formatTimeAgo(jobPostedData?.updatedAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:gap-4 desktop:gap-5 items-center">
                    <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl flex items-center gap-2">
                      <img
                        src={Ic_layout_grid}
                        alt="icon"
                        className="w-[20px] h-[20px] md:w-auto md:h-auto"
                      />
                      {jobPostedData?.category?.name}
                    </span>
                    <div className="border-l border-gray5 h-[18px]"></div>
                    <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                      <img
                        src={Ic_location}
                        alt="location"
                        className="w-[20px] h-[20px] md:w-auto md:h-auto"
                      />
                      <span className="text-gray text-sm md:text-base desktop:text-xl relative">
                        {convertJobLocation(jobPostedData?.location)[0]}
                        &nbsp;
                        {convertJobLocation(jobPostedData?.location).slice(1)
                          .length > 0 && (
                          <span
                            className="text-primary underline font-semibold cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(jobPostedData?.id, e);
                            }}
                          >
                            +
                            {
                              convertJobLocation(jobPostedData?.location).slice(
                                1
                              ).length
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
                    <div className="border-l border-gray5 h-[18px]"></div>
                    <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                      <img
                        src={Ic_experience}
                        alt="experience"
                        className="w-[20px] h-[20px] md:w-auto md:h-auto"
                      />
                      <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl">
                        {jobPostedData?.job_experience}
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
                        {jobPostedData?.job_type?.name}
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
                        {`${jobPostedData?.currency?.symbol || ""} ${
                          jobPostedData?.minimum_pay || ""
                        } - ${jobPostedData?.currency?.symbol || ""} ${
                          jobPostedData?.maximum_pay || ""
                        }`}{" "}
                      </span>
                    </div>
                    <div className="border-l border-gray5 h-[18px]"></div>
                    <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl flex items-center gap-2">
                      <img
                        src={Ic_briefcase}
                        alt="briefcase"
                        className="w-[20px] h-[20px] md:w-auto md:h-auto"
                      />
                      {jobPostedData?.work_place_type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <span className="text-primary text-sm lg:text-base">
                      Skills:
                    </span>
                    <JobTagsDisplay tags={jobPostedData?.skills} />
                  </div>
                </div>

                <div className=" px-4 md:px-6 desktop:px-8 pb-4 md:pb-6 desktop:pb-8">
                  <h4 className="mb-4 text-primary text-base md:text-xl desktop:text-[2rem] font-semibold">
                    Job Description
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jobPostedData?.description,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JobPosted;
