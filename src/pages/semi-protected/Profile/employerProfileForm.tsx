/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileData from "@/components/Profile/profileData";
import EditProfile from "@/components/Profile/editProfile";
import { useSelector } from "react-redux";

const calculateProfileCompleteness = (data: any) => {
  const fields = [
    "company_name",
    "country",
    "description",
    "designation",
    "email",
    "logo",
    "mobile_no",
    "name",
    "verifyEmail",
    "website",
  ];

  const filledFields = fields.filter((field) =>
    typeof data[field] === "string" ? data[field].trim() : data[field]
  ).length;

  const completenessPercentage = Math.round(
    (filledFields / fields.length) * 100
  );

  return completenessPercentage || 0;
};

const EmployerProfileForm: React.FC = () => {
  const userDetails = useSelector((state: any) => state.user)?.userDetails;

  const [value, setValue] = useState(0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isUpdateProfile = searchParams.has("update-profile");

  useEffect(() => {
    const completeness = calculateProfileCompleteness(userDetails);
    setValue(completeness);
  }, [userDetails]);

  return (
    <>
      {isUpdateProfile ? (
        <div className="lg:mb-[100px]">
          <EditProfile />
        </div>
      ) : (
        <div className="mb-[40px] lg:mb-[100px] px-4 sm:px-5 md:px-8 lg:p-0">
          <ProfileData value={value} userDetails={userDetails} />
        </div>
      )}
    </>
  );
};

export default EmployerProfileForm;
