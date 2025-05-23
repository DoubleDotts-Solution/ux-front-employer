import React, { useEffect, useMemo, useState } from "react";
import Ic_tab_profile from "@/assets/images/Ic_tab_profile.svg";
import Ic_tab_job from "@/assets/images/Ic_tab_job.svg";
// import Ic_profile_saved_job from "@/assets/images/Ic_profile_saved_job.svg";
import { useLocation, useNavigate } from "react-router-dom";
import EmployerProfileForm from "./employerProfileForm";
import JobPosted from "./jobPosted";
import JobPostedPerson from "./jobPostPerson";
// import SavedCandidate from "./savedCandidate";
// import CandidatePerson from "./candidatePerson";

type Tab = {
  label: {
    icon?: string;
    heading: string;
    description: string;
  };
};

const tabs: Tab[] = [
  {
    label: {
      icon: Ic_tab_profile,
      heading: "My Profile",
      description: "Modify Personal and Company Details",
    },
  },
  {
    label: {
      icon: Ic_tab_job,
      heading: "Jobs Posted",
      description: "Manage Posted Jobs",
    },
  },
  // {
  //   label: {
  //     icon: Ic_profile_saved_job,
  //     heading: "Saved Candidates",
  //     description: "Manage Saved Candidates",
  //   },
  // },
];

export const Profile: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const navigate = useNavigate();

  const location = useLocation();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    if (searchParams.has("job-posted") || searchParams.get("person-id")) {
      setActiveTabIndex(1);
    }
    // if (
    //   searchParams.has("saved-candidates") ||
    //   searchParams.get("candidate-id")
    // ) {
    //   setActiveTabIndex(2);
    // }
  }, [searchParams]);

  return (
    <div className="">
      <div
        className={`pt-[24px] desktop:pt-[56px] ${
          activeTabIndex !== 0 &&
          "pb-[44px] desktop:pb-[72px] px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px]"
        } flex flex-col lg:flex-row gap-[20px]`}
      >
        <div
          className={`w-full lg:w-[24%] flex flex-col justify-between pb-3 lg:pb-0 border-b border-primary lg:border-b-0 ${
            activeTabIndex === 0 &&
            "px-4 sm:px-5 md:px-8 lg:p-0 lg:ml-10 big:ml-[120px] xBig:ml-[200px]"
          }`}
        >
          <div className="overflow-x-auto overFlowScrollHidden lg:border border-primary lg:p-3 rounded-[8px]">
            <div className="flex lg:flex-col w-max lg:w-auto lg:min-w-full">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 md:p-3 desktop:p-5 flex gap-1.5 md:gap-2 desktop:gap-4 rounded-[8px] w-auto ${
                    activeTabIndex === index ? "bg-[#EFECE5]" : ""
                  }`}
                  onClick={() => {
                    setActiveTabIndex(index);
                    navigate("/profile");
                  }}
                >
                  <img
                    src={tab.label.icon}
                    alt={tab.label.heading}
                    className="w-[20px] h-[20px] md:w-[26px] desktop:w-auto md:h-[26px] desktop:h-auto"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-primary text-sm md:text-base desktop:text-lg font-semibold text-left">
                      {tab.label.heading}
                    </div>
                    <p className="text-gray text-xs md:text-sm text-left hidden lg:block">
                      {tab.label.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`w-full lg:w-[76%] ${
            activeTabIndex === 0 && "lg:mr-10 big:mr-[120px] xBig:mr-[200px]"
          }`}
        >
          {activeTabIndex === 0 && <EmployerProfileForm />}
          {activeTabIndex === 1 && (
            <>
              {searchParams.has("person-id") ? (
                <JobPostedPerson />
              ) : (
                <JobPosted />
              )}
            </>
          )}
          {/* {activeTabIndex === 2 && (
            <>
              {searchParams.has("candidate-id") ? (
                <CandidatePerson />
              ) : (
                <SavedCandidate />
              )}
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};
