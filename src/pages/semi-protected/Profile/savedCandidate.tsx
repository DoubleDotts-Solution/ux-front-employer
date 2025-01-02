/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Img_profile_no_data from "@/assets/images/Img_profile_no_data.png";
import { Pagination } from "@/components/common/pagination";
import ButtonUx from "@/components/common/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { convertJobLocation } from "@/lib/utils";
import Ic_location from "@/assets/images/Ic_location.svg";
import Ic_experience from "@/assets/images/Ic_experience.svg";
import Ic_saved_bookmark from "@/assets/images/Ic_saved_bookmark.svg";
import Ic_file from "@/assets/images/Ic_file.svg";
import Ic_candidate_call from "@/assets/images/Ic_candidate_call.svg";
import Ic_candidate_mail from "@/assets/images/Ic_candidate_mail.svg";
import { useSavedCandidateQuery } from "@/store/slice/apiSlice/profileApi";
import Loading from "@/components/common/loading";
import { useSelector } from "react-redux";

const SavedCandidate: React.FC = () => {
  const [searchJob, setSearchJob] = useState("");
  const [currentSavedJobDataPage, setCurrentSavedJobDataPage] = useState(1);
  const navigate = useNavigate();
  const params: any = {
    page: currentSavedJobDataPage,
    limit: 5,
    value: searchJob,
  };
  const handlePageChange = (page: number) => {
    setCurrentSavedJobDataPage(page);
  };
  const userDetails = useSelector((state: any) => state.user)?.userDetails;

  const { data, isLoading } = useSavedCandidateQuery({
    data: params,
    id: userDetails?.id,
  });
  const savedJobDataArray = (data as any)?.data || [];

  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const toggleDropdown = (index: any, e: any) => {
    e.stopPropagation();
    setIsDropdownOpen((prevIndex) => (prevIndex === index ? null : index));
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-3 md:mb-6 justify-between">
        <p className="text-gray text-base md:text-lg desktop:text-xl">
          Total Candidate:{" "}
          <span className="text-primary font-medium">
            {savedJobDataArray.length > 0
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
      {savedJobDataArray.length > 0 ? (
        <>
          <div className="flex flex-col gap-5">
            {savedJobDataArray &&
              savedJobDataArray.map((job: any, index: any) => (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/profile?saved-candidates&&candidate-id=2`);
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
                      <div className="flex flex-col gap-[6px]">
                        <h4 className="text-primary text-lg lg:text-xl desktop:text-2xl font-medium">
                          Karthikeyan R
                        </h4>
                        <div className="text-gray text-sm md:text-base desktop:text-lg flex items-center gap-2">
                          {job.employer?.company_name ||
                            (job &&
                              job.jobs &&
                              job?.jobs?.employer?.company_name)}
                          <span className="text-primary font-semibold cursor-pointer">
                            Download Resume
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 h-max">
                      <span
                        className={`relative bg-yellow rounded-[8px] border-2 border-primary z-50 flex items-center justify-center w-[40px] h-[36px] lg:h-[40px]`}
                      >
                        <img
                          src={Ic_saved_bookmark}
                          alt="Bookmark"
                          className="w-5 h-5"
                        />
                      </span>
                      <span className="text-gray text-sm md:text-base desktop:text-lg">
                        Saved
                      </span>
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
                            job.location ||
                              (job && job.jobs && job?.jobs?.location)
                          )[0]
                        }
                        &nbsp;
                        {convertJobLocation(
                          job.location ||
                            (job && job.jobs && job?.jobs?.location)
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
                              job.location ||
                                (job && job.jobs && job?.jobs?.location)
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
                        src={Ic_candidate_call}
                        alt="time"
                        className="w-[20px] h-[20px] md:w-auto md:h-auto"
                      />
                      <span className="text-gray text-sm md:text-base desktop:text-xl">
                        +91 8908906677
                      </span>
                    </div>
                    <div className="border-l border-primary h-[25px] lg:h-[30px]"></div>
                    <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                      <img
                        src={Ic_candidate_mail}
                        alt="rupee"
                        className="w-[20px] h-[20px] md:w-auto md:h-auto"
                      />
                      <span className="text-gray text-sm md:text-base desktop:text-xl">
                        karthi.r@gmail.com
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
                </div>
              ))}
          </div>
          {(data as any)?.pagination?.totalCount >
          (data as any)?.pagination?.limit ? (
            <div className="flex justify-center mt-7 lg:mt-9">
              <Pagination
                currentPage={(data as any)?.pagination.currentPage}
                totalPages={(data as any)?.pagination.totalPages}
                onPageChange={handlePageChange}
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
              Start Curating Your Job Opportunities!
            </h4>
            <p className="text-gray mt-[8px] text-sm md:text-base desktop:text-lg text-center mb-[16px] lg:mb-[24px]">
              Saving jobs helps you track roles you’re interested in. Begin by
              exploring available positions.
            </p>
            <Link to={"/"}>
              <ButtonUx
                label="Explore Jobs"
                buttonClassName="z-50 relative w-full h-[36px] lg:h-[40px] font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2"
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedCandidate;
