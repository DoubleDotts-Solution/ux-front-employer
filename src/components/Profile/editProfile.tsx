import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileForm from "./profileForm";
import ChangePassword from "./changePassword";

type Tab = {
  label: string;
};

const tabs: Tab[] = [
  {
    label: "Profile",
  },
  {
    label: "Change Password",
  },
];

const EditProfile: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-3 px-4 sm:px-5 md:px-8 lg:p-0">
        <h3 className="text-primary font-semibold text-xl md:text-2xl desktop:text-[2rem]">
          Edit Profile
        </h3>
        <Link
          to={"/profile"}
          className="text-primary font-semibold text-sm lg:text-base"
        >
          See Public View
        </Link>
      </div>
      <div className="flex border-b border-gray5 gap-6 desktop:gap-10 items-center mb-1 md:mb-5 desktop:mb-6 overflow-x-auto overFlowScrollHidden mx-4 sm:mx-5 md:mx-8 lg:mx-0">
        {tabs.map((tab, index) => (
          <div
            className={`py-1.5 md:py-2 desktop:py-3 border-b-4 text-sm md:text-base desktop:text-lg cursor-pointer whitespace-nowrap ${
              activeTabIndex === index
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-gray"
            }`}
            onClick={() => {
              setActiveTabIndex(index);
            }}
            key={index}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div>
        {activeTabIndex === 0 && <ProfileForm />}
        {activeTabIndex === 1 && <ChangePassword />}
      </div>
    </>
  );
};

export default EditProfile;
