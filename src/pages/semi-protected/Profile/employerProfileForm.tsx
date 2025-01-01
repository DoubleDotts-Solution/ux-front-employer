/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileData from "@/components/JobSeekerProfile/profileData";
import EditProfile from "@/components/JobSeekerProfile/editProfile";

// const data = {
//   profile: {
//     name: "John Doe",
//     job_title: "Product Manager",
//     company: "Lollipop Design Studio",
//     profile_picture: "J",
//     location: "Bengaluru, Karnataka",
//     salary_expectation: "₹10,00,000",
//     mobile_number: "+91-09837777722",
//     email: "johndoe@gmail.com",
//     portfolio: "Portfolio",
//     status: "Actively Looking",
//   },
//   about: {
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//   },
//   open_to_roles: [
//     "UI UX Designer",
//     "Product Designer",
//     "Product Manager",
//     "UX Designer",
//   ],
//   years_of_experience: {
//     total_experience: "4 Years",
//     relevant_experience: "3 Years",
//   },
//   current_job_details: {
//     company: "Lollipop Design Studio",
//     job_title: "Product Manager",
//     duration: "3 Years 4 Months",
//     status: "Present",
//   },
//   highest_education_qualification: {
//     university: "Harvard University",
//     degree: "Bachelor of Engineering",
//     field_of_study: "Computer Science",
//     gpa: "6.7/10",
//     graduation_year: "2018",
//   },
//   skills: [
//     "User Experience Design",
//     "Information Architecture",
//     "Wireframing",
//     "UI UX Design",
//     "User Research",
//     "Personas",
//     "Prototyping",
//     "UI Design",
//     "Heuristic Evaluation",
//   ],
//   preferred_job_type: ["Full-time", "Contract", "Freelancing"],
//   preferred_job_type_workplace: ["Remote", "Hybrid"],
//   open_to_relocate: {
//     status: "Yes",
//     locations: [
//       "Ahmedabad, Gujarat",
//       "Bangalore, Karnataka",
//       "Pune, Maharashtra",
//     ],
//   },
// };

const data = {
  profile: {
    name: "John Doe",
    job_title: "Product Manager",
    company: "Lollipop Design Studio",
    profile_picture: "J",
    location: "Bengaluru, Karnataka",
    salary_expectation: "₹10,00,000",
    mobile_number: "+91-09837777722",
    email: "johndoe@gmail.com",
    portfolio: "Portfolio",
    status: "Actively Looking",
  },
  about: {
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  open_to_roles: [
    "UI UX Designer",
    "Product Designer",
    "Product Manager",
    "UX Designer",
  ],
  years_of_experience: {
    total_experience: null,
    relevant_experience: null,
  },
  current_job_details: {
    experience: null,
  },
  highest_education_qualification: {
    education: null,
  },
  skills: [
    "User Experience Design",
    "Information Architecture",
    "Wireframing",
    "UI UX Design",
    "User Research",
    "Personas",
    "Prototyping",
    "UI Design",
    "Heuristic Evaluation",
  ],
  open_to_relocate: {
    status: "Yes",
    locations: [
      "Ahmedabad, Gujarat",
      "Bangalore, Karnataka",
      "Pune, Maharashtra",
    ],
  },
  preferred_job_type: ["Full-time", "Contract", "Freelancing"],
  preferred_workplace: ["Remote", "Hybrid"],
};

const calculateProfileCompleteness = (data: any) => {
  let filledFields = 0;
  let totalFields = 0;

  const countFilledFields = (obj: any) => {
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined) {
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          countFilledFields(obj[key]);
        } else if (Array.isArray(obj[key])) {
          filledFields += obj[key].length > 0 ? 1 : 0;
        } else {
          filledFields++;
        }
      }
      totalFields++;
    }
  };

  countFilledFields(data);
  return Math.round((filledFields / totalFields) * 100);
};

const EmployerProfileForm: React.FC = () => {
  const [value, setValue] = useState(0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isUpdateProfile = searchParams.has("update-profile");

  useEffect(() => {
    const completeness = calculateProfileCompleteness(data);
    setValue(completeness);
  }, []);

  return (
    <>
      {isUpdateProfile ? (
        <div className="lg:mb-[100px]">
          <EditProfile />
        </div>
      ) : (
        <div className="mb-[40px] lg:mb-[100px] px-4 sm:px-5 md:px-8 lg:p-0">
          <ProfileData value={value} />
        </div>
      )}
    </>
  );
};

export default EmployerProfileForm;
