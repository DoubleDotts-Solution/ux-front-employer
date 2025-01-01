/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Ic_filter from "@/assets/images/Ic_filter.svg";
import Ic_down_arrow from "@/assets/images/Ic_down_arrow.svg";
import JobPostDiv from "@/components/jobPostDiv";
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

const findNext = [
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

const categoryArray = [
  { name: "All Categories" },
  { name: "Product Designer" },
  { name: "UX Researcher" },
  { name: "UI Designer" },
  { name: "UX Writer" },
  { name: "UI Developer" },
  { name: "Graphic Designer" },
];
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
const jobTypeArray = [
  { name: "Internship" },
  { name: "Freelancing" },
  { name: "Part time" },
  { name: "All Jobs" },
];
const WorkPlaceTypeArray = [
  { name: "All" },
  { name: "On Site" },
  { name: "Hybrid" },
  { name: "Remote" },
];

const MainSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Relevant");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [WorkPlaceType, setWorkPlaceType] = useState<string[]>([]);
  const [Category, setCategory] = useState<string[]>([]);
  const [JobType, setJobType] = useState<string[]>([]);
  const [Experience, setExperience] = useState<any | null>(null);
  const [Location, setLocation] = useState<any | null>(null);

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
  console.log(Experience);

  // const GetAllJobParam: any = {
  //   ...(searchJob && { value: searchJob }),
  //   ...(Category && { category: Category }),
  //   ...(JobType && { job_type: JobType }),
  //   ...(PostedAt && {
  //     posted_at: PostedAt,
  //   }),
  //   ...(Location && { location: Location }),
  //   ...(WorkPlaceType && {
  //     work_place_type: WorkPlaceType,
  //   }),
  //   ...(minRange && { min_salary_range: minRange }),
  //   ...(maxRange && { max_salary_range: maxRange }),
  //   page: currentPage,
  //   limit: 5,
  // };

  // const { data: GetAllJob, isLoading } = useCompanyOpenRolesApiQuery({
  //   data: GetAllJobParam,
  // });
  // const findNext = (GetAllJob as any)?.data || [];

  // const { data: categoryData, isLoading: categoryDataLoading } =
  //   useGetCategoryApiQuery(params);
  // const categoryArray = (categoryData as any)?.data || [];

  // const { data: jobTypeData, isLoading: jobTypeDataLoading } =
  //   useGetTypeApiQuery(params);
  // const jobTypeArray = (jobTypeData as any)?.data || [];

  // const jobIdFromPath = location.pathname.match(/\/jobs\/(\d+)/)?.[1];

  // const matchedCategory = categoryArray.find(
  //   (category: any) => category.id == jobIdFromPath
  // );

  // useEffect(() => {
  //   if (matchedCategory) {
  //     setCategory(matchedCategory.name);
  //   } else {
  //     setCategory(null);
  //   }
  // }, [matchedCategory]);

  // const reverseTransform = (value: string | undefined) => {
  //   if (!value) return "";
  //   return value.replace(/-/g, " ").replace(/\s(?=[^,]*$)/, ", ");
  // };
  // const CategoryReverseTransform = (value: string | undefined) => {
  //   if (!value) return "";
  //   return value.replace(/-/g, " ").replace(/\s(?=[^,]*$)/, " ");
  // };

  // useEffect(() => {
  //   const queryParams: any = new URLSearchParams(location.search);

  //   if (queryParams.get("search")) {
  //     setSearchJob(CategoryReverseTransform(queryParams.get("search")));
  //   }
  //   if (queryParams.get("category")) {
  //     setCategory(CategoryReverseTransform(queryParams.get("category")));
  //   }
  //   if (queryParams.get("city")) {
  //     setLocation(reverseTransform(queryParams.get("city")));
  //   }
  // }, [location.search]);

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

  return (
    <div className="relative">
      <div className="bg-lightYellow relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[55px] lg:py-[72px] lg:leading-[60px] text-xl sm:text-2xl md:text-[2rem] lg:text-[2.5rem] desktop:text-[3rem] text-primary flex align-center font-semibold">
        Explore Open Roles Now
      </div>

      {/* ---- */}
      <div className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px]">
        <div className="pt-[24px] pb-[20px] lg:py-[30px] flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
          <p className="text-gray text-base lg:text-lg">
            {/* {findNext.length} out of{" "}
            {(GetAllJob as any)?.pagination?.totalCount}
            100 */}
            <span className="text-primary font-medium">1-20 of 2000</span>{" "}
            Search Result
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
                  {sortBy}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white p-2">
                <SelectGroup>
                  <SelectItem value="Relevant">Relevant</SelectItem>
                  <SelectItem value="Most Recent">Most Recent</SelectItem>
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
                  {/* {findNext.length} out of{" "}
            {(GetAllJob as any)?.pagination?.totalCount}
            100 */}
                  <span className="text-primary font-medium">1-20 of 2000</span>{" "}
                  Search Result
                </p>
                <div className="flex flex-col gap-4 lg:gap-4 laptop:gap-5 desktop:gap-8">
                  <JobPostDiv findNext={findNext} />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full flex-col py-16">
                <img
                  src={Img_no_jobs}
                  alt="img"
                  className="mb-2.5 md:mb-4 desktop:mb-6"
                />
                <h4 className="text-lg sm:text-xl md:text-[20px] desktop:text-[24px] text-primary font-semibold mb-1 md:mb-2 desktop:mb-3">
                  No Research Results Found
                </h4>
                <p className="text-gray text-sm md:text-base desktop:text-lg">
                  Please Try to Search Some Different Jobs
                </p>
              </div>
            )}

            {findNext.length > 5 ? (
              <div className="flex justify-center mt-7 lg:mt-9">
                {/* <Pagination
                  currentPage={(GetAllJob as any)?.pagination.currentPage}
                  totalPages={(GetAllJob as any)?.pagination.totalPages}
                  onPageChange={handlePageChange}
                /> */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={10}
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
