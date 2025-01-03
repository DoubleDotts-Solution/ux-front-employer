/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Ic_filter from "@/assets/images/Ic_filter.svg";
import Ic_down_arrow from "@/assets/images/Ic_down_arrow.svg";
import AutocompleteInput from "@/components/ui/inputLocation";
import ButtonUx from "@/components/common/button";
import { Pagination } from "@/components/common/pagination";
import JobsOpportunity from "@/components/jobsOpportunity";
import Img_no_jobs from "@/assets/images/Img_no_jobs.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetFindTalentApiQuery } from "@/store/slice/apiSlice/findTalentApi";
import Loading from "@/components/common/loading";
import JobTagsDisplay from "@/components/jobsTagDisplay";
import Ic_location from "@/assets/images/Ic_location.svg";
import Ic_experience from "@/assets/images/Ic_experience.svg";
import Ic_file from "@/assets/images/Ic_file.svg";
import Ic_call from "@/assets/images/Ic_call.svg";
import { useNavigate } from "react-router-dom";
import { convertJobLocation } from "@/lib/utils";
import { PHOTO_URL } from "@/config/constant";
import { useGetCategoryQuery } from "@/store/slice/apiSlice/categoryApi";
import { useGetJobTypeQuery } from "@/store/slice/apiSlice/jobsApi";

const ExperienceArray = [
  { name: "Fresher (Less then 1 Year)" },
  { name: "1 year" },
  { name: "2 years" },
  { name: "3 years" },
  { name: "4 years" },
  { name: "5 years" },
  { name: "6 years" },
  { name: "7 years" },
];
const WorkPlaceTypeArray = [
  { name: "All" },
  { name: "On Site" },
  { name: "Hybrid" },
  { name: "Remote" },
];

const MainSection: React.FC = () => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const toggleDropdown = (index: any, e: any) => {
    e.stopPropagation();
    setIsDropdownOpen((prevIndex) => (prevIndex === index ? null : index));
  };
  function maskPhoneNumber(phoneNumber: any) {
    const sanitized = phoneNumber.replace(/[^+\d]/g, "");
    return sanitized.replace(
      /^(\+\d{2})?(\d{1})\d*(\d{1})$/,
      (_: any, countryCode: any, firstDigit: any, lastDigit: any) => {
        return `${countryCode || ""}${firstDigit}********${lastDigit}`;
      }
    );
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevant");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [WorkPlaceType, setWorkPlaceType] = useState<string[]>([]);
  const [Category, setCategory] = useState<string[]>([]);
  const [JobType, setJobType] = useState<string[]>([]);
  const [Experience, setExperience] = useState<any | null>(null);
  const [Location, setLocation] = useState<any | null>(null);
  const [Value, setValue] = useState<any | null>(null);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const body = document.querySelector("body");

  const handleTogglePopup = () => {
    if (isPopupVisible) {
      setAnimationClass("popup-exit");
      setTimeout(() => {
        setPopupVisible(false);
        setAnimationClass("");
        body?.classList.remove("overflow-hidden");
        body?.classList.remove("h-screen");
      }, 300);
    } else {
      setPopupVisible(true);
      setAnimationClass("popup-enter");
      body?.classList.add("overflow-hidden");
      body?.classList.add("h-screen");
    }
  };

  const GetAllJobParam: any = {
    ...(sortBy && { sort_by: sortBy }),
    ...(Value && { value: Value }),
    ...(Experience && { job_experience: Experience }),
    ...(Category &&
      Category.length > 0 && {
        category: Category.map((item) => item).join(", "),
      }),
    ...(WorkPlaceType &&
      WorkPlaceType.length > 0 &&
      WorkPlaceType.some((item) => item !== "All") && {
        work_place_type: WorkPlaceType.filter((item) => item !== "All")
          .map((item) => {
            if (item === "Remote") return "remote";
            if (item === "On Site") return "on_site";
            if (item === "Hybrid") return "hybrid";
            return "";
          })
          .filter(Boolean)
          .join(", "),
      }),
    ...(JobType &&
      JobType.length > 0 && {
        job_type: JobType.map((item) => item).join(", "),
      }),
    ...(Location && { location: Location }),
    ...(Location && { location: Location }),
    page: currentPage,
    limit: 5,
  };

  const { data: GetAllJob, isLoading } =
    useGetFindTalentApiQuery(GetAllJobParam);
  const findNext = (GetAllJob as any)?.data || [];

  const getFilterDataParam: any = {
    page: 1,
    limit: 999999999999999,
    value: "",
  };

  const { data: categoryData } = useGetCategoryQuery(getFilterDataParam);
  const categoryArray = (categoryData as any)?.data || [];

  const { data: jobTypeData } = useGetJobTypeQuery(getFilterDataParam);
  const jobTypeArray = (jobTypeData as any)?.data || [];

  const reverseTransform = (value: string | null): string => {
    if (!value) return "";
    return value
      .split("-")
      .map((item) => item.replace(/_/g, " "))
      .join(",");
  };
  const formatString = (value: string | null): string => {
    if (!value) return "";
    return value
      .split("-")
      .map((word) => {
        if (!isNaN(Number(word))) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  const decodeToReadableFormat = (value: string): string => {
    if (!value) return "";
    return decodeURIComponent(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const queryParams: any = new URLSearchParams(location.search);

      if (
        queryParams.get("search") ||
        queryParams.get("category") ||
        queryParams.get("city") ||
        queryParams.get("remote")
      ) {
        const value = reverseTransform(queryParams.get("search"));
        const experience = formatString(queryParams.get("experience"));
        const location = decodeToReadableFormat(queryParams.get("city"));
        const work_place_type = queryParams.get("remote");

        if (value) {
          setValue(value);
        }
        if (experience) {
          setExperience(experience);
        }
        if (location) {
          setLocation(location);
        }
        if (work_place_type) {
          setWorkPlaceType([work_place_type]);
        }
      }
    };

    fetchData();
  }, []);

  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const handleToggleAccordion = (type: string) => {
    setOpenIndex(openIndex === type ? null : type);
  };

  const validFilter: any =
    Category.length === 0 &&
    JobType.length === 0 &&
    Location == null &&
    WorkPlaceType.length === 0 &&
    Experience == null;

  if (isLoading) {
    <Loading />;
  }
  return (
    <div className="relative">
      <div className="bg-lightYellow relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[55px] lg:py-[72px] lg:leading-[60px] text-xl sm:text-2xl md:text-[2rem] lg:text-[2.5rem] desktop:text-[3rem] text-primary flex align-center font-semibold">
        Browse Exceptional UX Talent
      </div>

      {/* ---- */}
      <div className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px]">
        <div className="pt-[24px] pb-[20px] lg:py-[30px] flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
          <p className="text-gray text-base lg:text-lg">
            {findNext.length > 0
              ? (GetAllJob as any).pagination.limit *
                  ((GetAllJob as any).pagination.currentPage - 1) +
                1
              : 0}
            -
            {Math.min(
              findNext.length,
              (GetAllJob as any)?.pagination.limit *
                (GetAllJob as any)?.pagination.currentPage
            )}{" "}
            of {(GetAllJob as any)?.pagination?.totalCount || 0} Search Result
          </p>
          <div className="w-full sm:w-[280px] md:w-[360px]">
            <Select
              onValueChange={(value) => {
                setSortBy(value);
              }}
              value={sortBy || ""}
            >
              <SelectTrigger
                className={`bg-white border-gray6 data-[state=open]:border-2 data-[state=open]:border-primary focus:shadow-shadow1 hover:shadow-shadow1 text-base border-2 rounded-[8px]`}
              >
                <SelectValue placeholder="Choose SortOut">
                  <span className="text-gray font-normal">Sort by:</span>{" "}
                  {sortBy === "relevant" ? "Relevant" : "Most Recent"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white p-2">
                <SelectGroup>
                  <SelectItem value="relevant">Relevant</SelectItem>
                  <SelectItem value="most_recent">Most Recent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="hidden lg:block w-1/4">
            <div className="relative inline-block w-full h-max">
              <div className="relative bg-white p-5 rounded-xl border-2 border-primary z-50">
                <div className="flex items-center justify-between pb-4 border-b border-gray4 mb-4">
                  <span className="text-primary font-semibold text-xl">
                    Filter
                  </span>
                  <span
                    className={`text-primary font-semibold text-base cursor-pointer ${
                      validFilter ? "text-opacity-35" : ""
                    }`}
                    onClick={() => {
                      if (!validFilter) {
                        setCategory([]);
                        setJobType([]);
                        setLocation(null);
                        setWorkPlaceType([]);
                      }
                    }}
                  >
                    Reset Filter
                  </span>
                </div>
                <div>
                  <div className="flex flex-col gap-4">
                    <div className="w-full">
                      <p
                        className={`text-primary font-medium flex items-center justify-between cursor-pointer`}
                        onClick={() => handleToggleAccordion("Category")}
                      >
                        Category
                        <img
                          src={Ic_down_arrow}
                          alt="arrow"
                          className={
                            openIndex === "Category" ? "rotate-180" : ""
                          }
                        />
                      </p>

                      {openIndex === "Category" && (
                        <div className="bg-white mt-2">
                          {categoryArray.map((data: any) => (
                            <label
                              className="py-2 container text-base text-gray"
                              htmlFor={data.name}
                            >
                              {data.name}
                              <input
                                type="checkbox"
                                id={data.name}
                                value={data.name}
                                checked={Category.includes(data.name)}
                                onChange={() =>
                                  setCategory((prevState: any[]) =>
                                    prevState.includes(data.name)
                                      ? prevState.filter(
                                          (item) => item !== data.name
                                        )
                                      : [...prevState, data.name]
                                  )
                                }
                                className="mr-2"
                              />
                              <span className="checkmark checkmark_black"></span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="border-t border-gray5 w-full"></div>
                    <div className="w-full">
                      <p
                        className={`text-primary font-medium flex items-center justify-between cursor-pointer`}
                        onClick={() => handleToggleAccordion("JobType")}
                      >
                        Job Type
                        <img
                          src={Ic_down_arrow}
                          alt="arrow"
                          className={
                            openIndex === "JobType" ? "rotate-180" : ""
                          }
                        />
                      </p>
                      {openIndex === "JobType" && (
                        <div className="bg-white mt-2">
                          {jobTypeArray.map((data: any) => (
                            <label
                              className="py-2 container text-base text-gray"
                              htmlFor={data.name}
                            >
                              {data.name}
                              <input
                                type="checkbox"
                                id={data.name}
                                value={data.name}
                                checked={JobType.includes(data.name)}
                                onChange={() =>
                                  setJobType((prevState: any[]) =>
                                    prevState.includes(data.name)
                                      ? prevState.filter(
                                          (item) => item !== data.name
                                        )
                                      : [...prevState, data.name]
                                  )
                                }
                                className="mr-2"
                              />
                              <span className="checkmark checkmark_black"></span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="border-t border-gray5 w-full"></div>
                    <div className="w-full">
                      <p
                        className={`text-primary font-medium flex items-center justify-between cursor-pointer`}
                        onClick={() => handleToggleAccordion("Location")}
                      >
                        Location
                        <img
                          src={Ic_down_arrow}
                          alt="arrow"
                          className={
                            openIndex === "Location" ? "rotate-180" : ""
                          }
                        />
                      </p>
                      {openIndex === "Location" && (
                        <div className="bg-white mt-2">
                          <AutocompleteInput
                            onChange={(value) => {
                              setLocation(value);
                            }}
                            value={Location || ""}
                            placeholder="Choose Location"
                            className={`bg-white text-base font-medium text-gray border-2 rounded-[8px]`}
                          />
                        </div>
                      )}
                    </div>
                    <div className="border-t border-gray5 w-full"></div>
                    <div className="w-full">
                      <p
                        className={`text-primary font-medium flex items-center justify-between cursor-pointer`}
                        onClick={() => handleToggleAccordion("Experience")}
                      >
                        Experience
                        <img
                          src={Ic_down_arrow}
                          alt="arrow"
                          className={
                            openIndex === "Experience" ? "rotate-180" : ""
                          }
                        />
                      </p>
                      {openIndex === "Experience" && (
                        <div className="bg-white mt-2 h-auto max-h-[130px] big:max-h-[280px] overflow-y-auto overflowYScroll">
                          {ExperienceArray.map((exp, index) => (
                            <div
                              className={`p-2 cursor-pointer text-primary ${
                                Experience === exp.name
                                  ? "bg-[#EFECE5] font-medium"
                                  : ""
                              }`}
                              onClick={() => setExperience(exp.name)}
                              key={index}
                            >
                              {exp.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="border-t border-gray5 w-full"></div>
                    <div className="w-full">
                      <p
                        className={`text-primary font-medium flex items-center justify-between cursor-pointer`}
                        onClick={() => handleToggleAccordion("WorkPlace")}
                      >
                        WorkPlace Type
                        <img
                          src={Ic_down_arrow}
                          alt="arrow"
                          className={
                            openIndex === "WorkPlace" ? "rotate-180" : ""
                          }
                        />
                      </p>
                      {openIndex === "WorkPlace" && (
                        <div className="bg-white mt-2">
                          {WorkPlaceTypeArray.map((data: any) => (
                            <label
                              className="py-2 container text-base text-gray"
                              htmlFor={data.name}
                            >
                              {data.name}
                              <input
                                type="checkbox"
                                id={data.name}
                                value={data.name}
                                checked={WorkPlaceType.includes(data.name)}
                                onChange={() =>
                                  setWorkPlaceType((prevState: any[]) =>
                                    prevState.includes(data.name)
                                      ? prevState.filter(
                                          (item) => item !== data.name
                                        )
                                      : [...prevState, data.name]
                                  )
                                }
                                className="mr-2"
                              />
                              <span className="checkmark checkmark_black"></span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[4px] left-[4px] rounded-xl border-2 border-primary z-40 h-full w-full transition-colors bg-black"></div>
            </div>
          </div>
          <div className="w-full lg:w-3/4">
            {findNext.length > 0 ? (
              <>
                <p className="text-gray text-base lg:text-lg mb-4">
                  {findNext.length > 0
                    ? (GetAllJob as any).pagination.limit *
                        ((GetAllJob as any).pagination.currentPage - 1) +
                      1
                    : 0}
                  -
                  {Math.min(
                    findNext.length,
                    (GetAllJob as any)?.pagination.limit *
                      (GetAllJob as any)?.pagination.currentPage
                  )}{" "}
                  of {(GetAllJob as any)?.pagination?.totalCount || 0} Search
                  Result
                </p>
                <div className="flex flex-col gap-4 lg:gap-4 laptop:gap-5 desktop:gap-8">
                  {findNext &&
                    findNext.map((job: any, index: any) => (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/find-talent/${job.id}`);
                        }}
                        key={job.id}
                        className="border-2 border-primary rounded-[12px] md:rounded-2xl p-4 lg:p-5 desktop:p-6 flex flex-col gap-5 hover:shadow-shadow1 cursor-pointer"
                      >
                        <div className="flex flex-col sm:flex-row gap-2 lg:gap-0 justify-between">
                          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 desktop:gap-5">
                            {job && job?.profile_photo && (
                              <img
                                src={`${PHOTO_URL}/${job.profile_photo}`}
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
                                {job?.name}
                              </h4>
                              <div className="text-gray text-sm md:text-base desktop:text-lg">
                                {job.job_title}
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
                              {convertJobLocation(job.location)[0]}
                              &nbsp;
                              {convertJobLocation(job.location).slice(1)
                                .length > 0 && (
                                <span
                                  className="text-primary underline font-semibold"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleDropdown(index, e);
                                  }}
                                >
                                  +
                                  {
                                    convertJobLocation(job.location).slice(1)
                                      .length
                                  }
                                </span>
                              )}
                              {isDropdownOpen === index && (
                                <div className="location-dropdown absolute">
                                  {convertJobLocation(job.location)
                                    .slice(1)
                                    .map((location, index) => (
                                      <div
                                        key={index}
                                        className="dropdown-item"
                                      >
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
                              {job?.total_experience} Years
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
                              {maskPhoneNumber(job?.mobile_no)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <img src={Ic_file} alt="icon" />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: job.bio,
                            }}
                            className="text-sm md:text-base lg:text-lg desktop:text-xl text-gray jobDescription"
                          />
                        </div>
                        <div className="border-t w-full border-gray5"></div>
                        <div className="flex flex-col gap-4 lg:gap-2 lg:flex-row justify-between lg:items-center">
                          <div className="flex flex-wrap items-center gap-3 md:gap-4 desktop:gap-5">
                            <JobTagsDisplay tags={job.skills} />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full flex-col py-16">
                <img
                  src={Img_no_jobs}
                  alt="img"
                  className="mb-2.5 md:mb-4 desktop:mb-6"
                />
                <h4 className="text-lg sm:text-xl md:text-[20px] desktop:text-[24px] text-primary font-semibold mb-1 md:mb-2 desktop:mb-3 text-center">
                  No Research Results Found
                </h4>
                <p className="text-gray text-sm md:text-base desktop:text-lg">
                  Please Try to Search Some Different Jobs
                </p>
              </div>
            )}

            {(GetAllJob as any)?.pagination?.totalCount >
            (GetAllJob as any)?.pagination?.limit ? (
              <div className="flex justify-center mt-7 lg:mt-9">
                <Pagination
                  currentPage={(GetAllJob as any)?.pagination.currentPage}
                  totalPages={(GetAllJob as any)?.pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* --- */}
      <JobsOpportunity />
      <div
        className="sticky bottom-0 z-30 bg-white py-[12px] lg:hidden flex justify-center items-center gap-2 cursor-pointer"
        style={{ boxShadow: "0px 0px 12px 0px #91741C33" }}
        onClick={handleTogglePopup}
      >
        <span className="text-sm font-semibold">Filter</span>
        <img src={Ic_filter} alt="filter" />
      </div>

      {isPopupVisible && (
        <div
          className={`fixed inset-0 flex justify-center items-end z-40 ${animationClass}`}
          style={{
            boxShadow: "0px 7px 14px 0px #080F3408",
            background: "#00000099",
            zIndex: 999999999999999,
          }}
        >
          <div className="bg-white relative rounded shadow-lg w-full">
            <div className="p-5 inline-block w-full h-max">
              <div className="flex items-center justify-between pb-4 border-b border-gray4 mb-4">
                <span className="text-primary font-semibold text-xl">
                  Filter
                </span>
                <span
                  className="text-primary font-semibold text-base cursor-pointer"
                  onClick={() => {
                    if (!validFilter) {
                      handleTogglePopup();
                      setCategory([]);
                      setJobType([]);
                      setLocation(null);
                      setWorkPlaceType([]);
                    }
                  }}
                >
                  Reset Filter
                </span>
              </div>
              <div>
                <div className="flex flex-col gap-4">
                  <div className="w-full">
                    <p
                      className={`text-primary font-medium flex items-center justify-between cursor-pointer`}
                      onClick={() => handleToggleAccordion("Category")}
                    >
                      Category
                      <img
                        src={Ic_down_arrow}
                        alt="arrow"
                        className={openIndex === "Category" ? "rotate-180" : ""}
                      />
                    </p>

                    {openIndex === "Category" && (
                      <div className="bg-white mt-2">
                        {categoryArray.map((data: any) => (
                          <label
                            className="py-2 container text-base text-gray"
                            htmlFor={data.name}
                          >
                            {data.name}
                            <input
                              type="checkbox"
                              id={data.name}
                              value={data.name}
                              checked={Category.includes(data.name)}
                              onChange={() =>
                                setCategory((prevState: any[]) =>
                                  prevState.includes(data.name)
                                    ? prevState.filter(
                                        (item) => item !== data.name
                                      )
                                    : [...prevState, data.name]
                                )
                              }
                              className="mr-2"
                            />
                            <span className="checkmark checkmark_black"></span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray5 w-full"></div>
                  <div className="w-full">
                    <p
                      className={`text-primary font-medium flex items-center justify-between cursor-pointer`}
                      onClick={() => handleToggleAccordion("JobType")}
                    >
                      Job Type
                      <img
                        src={Ic_down_arrow}
                        alt="arrow"
                        className={openIndex === "JobType" ? "rotate-180" : ""}
                      />
                    </p>
                    {openIndex === "JobType" && (
                      <div className="bg-white mt-2">
                        {jobTypeArray.map((data: any) => (
                          <label
                            className="py-2 container text-base text-gray"
                            htmlFor={data.name}
                          >
                            {data.name}
                            <input
                              type="checkbox"
                              id={data.name}
                              value={data.name}
                              checked={JobType.includes(data.name)}
                              onChange={() =>
                                setJobType((prevState: any[]) =>
                                  prevState.includes(data.name)
                                    ? prevState.filter(
                                        (item) => item !== data.name
                                      )
                                    : [...prevState, data.name]
                                )
                              }
                              className="mr-2"
                            />
                            <span className="checkmark checkmark_black"></span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray5 w-full"></div>
                  <div className="w-full">
                    <p
                      className={`text-primary font-medium flex items-center justify-between cursor-pointer`}
                      onClick={() => handleToggleAccordion("Location")}
                    >
                      Location
                      <img
                        src={Ic_down_arrow}
                        alt="arrow"
                        className={openIndex === "Location" ? "rotate-180" : ""}
                      />
                    </p>
                    {openIndex === "Location" && (
                      <div className="bg-white mt-2">
                        <AutocompleteInput
                          onChange={(value) => {
                            setLocation(value);
                          }}
                          value={Location || ""}
                          placeholder="Choose Location"
                          className={`bg-white text-base font-medium text-gray border-2 rounded-[8px]`}
                        />
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray5 w-full"></div>
                  <div className="w-full">
                    <p
                      className={`text-primary font-medium flex items-center justify-between cursor-pointer`}
                      onClick={() => handleToggleAccordion("Experience")}
                    >
                      Experience
                      <img
                        src={Ic_down_arrow}
                        alt="arrow"
                        className={
                          openIndex === "Experience" ? "rotate-180" : ""
                        }
                      />
                    </p>
                    {openIndex === "Experience" && (
                      <div className="bg-white mt-2 h-auto max-h-[130px] big:max-h-[280px] overflow-y-auto overflowYScroll">
                        {ExperienceArray.map((exp, index) => (
                          <div
                            className={`p-2 cursor-pointer text-primary ${
                              Experience === exp.name
                                ? "bg-[#EFECE5] font-medium"
                                : ""
                            }`}
                            onClick={() => setExperience(exp.name)}
                            key={index}
                          >
                            {exp.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray5 w-full"></div>
                  <div className="w-full">
                    <p
                      className={`text-primary font-medium flex items-center justify-between cursor-pointer`}
                      onClick={() => handleToggleAccordion("WorkPlace")}
                    >
                      WorkPlace Type
                      <img
                        src={Ic_down_arrow}
                        alt="arrow"
                        className={
                          openIndex === "WorkPlace" ? "rotate-180" : ""
                        }
                      />
                    </p>
                    {openIndex === "WorkPlace" && (
                      <div className="bg-white mt-2">
                        {WorkPlaceTypeArray.map((data: any) => (
                          <label
                            className="py-2 container text-base text-gray"
                            htmlFor={data.name}
                          >
                            {data.name}
                            <input
                              type="checkbox"
                              id={data.name}
                              value={data.name}
                              checked={WorkPlaceType.includes(data.name)}
                              onChange={() =>
                                setWorkPlaceType((prevState: any[]) =>
                                  prevState.includes(data.name)
                                    ? prevState.filter(
                                        (item) => item !== data.name
                                      )
                                    : [...prevState, data.name]
                                )
                              }
                              className="mr-2"
                            />
                            <span className="checkmark checkmark_black"></span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="sticky bottom-0 z-50 bg-white py-[10px] px-[16px] flex items-center gap-4 w-full"
              style={{ boxShadow: "0px 0px 12px 0px #91741C33" }}
            >
              <div
                className="w-full"
                onClick={() => {
                  handleTogglePopup();
                  setCategory([]);
                  setJobType([]);
                  setLocation(null);
                  setWorkPlaceType([]);
                }}
              >
                <ButtonUx
                  label="Close"
                  buttonClassName="w-full h-[34px] bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-6 py-2 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
                />
              </div>
              <div className="w-full" onClick={handleTogglePopup}>
                <ButtonUx
                  label="Apply"
                  buttonClassName="w-full font-semibold text-primary bg-yellow text-base border-2 h-[34px] border-primary rounded-[8px] px-8 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSection;
