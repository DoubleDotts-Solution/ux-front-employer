import React from "react";
// import { Link } from "react-router-dom";
// import Ic_left_arrow from "@/assets/images/Ic_left_arrow.svg";
// import Ic_right_breadCrumb_arrow from "@/assets/images/Ic_right_breadCrumb_arrow.svg";
import Accordion from "@/components/common/accordion";

interface Faqs {
  answer: string;
  question: string;
}

interface GetFaqsResponse {
  data: Faqs[];
}
const data = {
  data: [
    {
      id: 8,
      question: "How can I reach customer support for additional help?",
      answer:
        "<p>You can reach customer support by emailing hello@uxjobsite.com or calling +91-991470022 during business hours (Mon-Sat, 9:30 AM – 10:00 AM).</p>",
      updatedAt: "2024-10-17T05:59:19.966Z",
    },
    {
      id: 7,
      question: "How do I reset my password if I forgot it?",
      answer:
        "<p>Click on “Forgot Password” on the login page and enter your registered email. You will receive an email with instructions to reset your password.</p>",
      updatedAt: "2024-10-17T05:59:07.834Z",
    },
    {
      id: 6,
      question: "How can employers view and contact potential candidates?",
      answer:
        "<p>Use the “Candidate Contacted” section to view all applicants for your posted jobs. You can view their profiles, download resumes, and use the provided contact information to reach out directly.</p>",
      updatedAt: "2024-10-17T05:58:49.826Z",
    },
    {
      id: 5,
      question: "How can employers post and manage job listings?",
      answer:
        "<p>Log in to your employer account and go to the “Jobs Posted” section to create a new job listing. Fill in the job title, location, experience level, and other details. Manage active, inactive, or closed job postings from the same section.</p>",
      updatedAt: "2024-10-17T05:58:30.397Z",
    },
    {
      id: 4,
      question:
        "Where can job seekers track their job applications and recommended jobs?",
      answer:
        "<p>Go to the “Jobs Applied” section to view all your submitted applications and their status. Check the “Recommended Jobs” section for personalized job suggestions based on your profile and skills.</p>",
      updatedAt: "2024-10-17T05:58:13.206Z",
    },
    {
      id: 3,
      question: "How do job seekers search and apply for jobs?",
      answer:
        "<p>Use the search bar at the top to filter jobs by title, company, location, or skills. For each job listing, click on the “Apply Now” button, upload your resume if prompted, and complete any additional application requirements.</p>",
      updatedAt: "2024-10-17T05:58:00.135Z",
    },
    {
      id: 2,
      question: "How can job seekers build and update their profile?",
      answer:
        "<p>Navigate to the “My Profile” section to fill in your personal details, add a profile photo, and upload your resume. You can update your information, such as location, experience, and skills, anytime to keep your profile up-to-date for potential employers.</p>",
      updatedAt: "2024-10-17T05:57:45.666Z",
    },
    {
      id: 1,
      question:
        "How do I register as a job seeker or employer on the platform?",
      answer:
        "<p>To register, select whether you are a Job Seeker or Employer on the registration page. Fill in the required fields (name, email, mobile number, location, and password) and complete the registration. Employers will need to provide additional company details like name and email ID.</p>",
      updatedAt: "2024-10-17T05:57:28.431Z",
    },
  ],
  pagination: {
    totalCount: 8,
    currentPage: 1,
    limit: 100,
    totalPages: 1,
  },
  status: 200,
};

export const Faqs: React.FC = () => {
  const faqs = (data as GetFaqsResponse)?.data || [];

  return (
    <div className="relative">
      <div className="bg-lightYellow  relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-6 md:py-[61px]">
        {/* <nav className="flex items-center gap-2 mb-5 md:mb-8">
          <Link to={"/"} aria-label="Go back to Companies">
            <img src={Ic_left_arrow} alt="Back arrow" />
          </Link>
          <Link to={"/"} aria-label="Go to Home">
            <span className="text-primary text-sm font-semibold">Home</span>
          </Link>
          <img src={Ic_right_breadCrumb_arrow} alt="Right arrow" />
          <span className="text-gray text-sm">FAQs</span>
        </nav> */}
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-primary text-2xl sm:text-3xl md:text-4xl desktop:text-5xl desktop:leading-[72px] font-semibold">
            FAQs
          </h2>
          <p className="text-gray text-sm md:text-base desktop:text-lg">
            Find answers to common questions and get the help you need.
          </p>
        </div>
      </div>
      <div className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[44px] desktop:py-[72px]">
        <div className="relative inline-block w-full h-max">
          <div className="relative bg-white py-2 px-6 desktop:px-8 rounded-xl border border-primary z-50 shadow-shadow1">
            <Accordion items={faqs} />
          </div>
        </div>
      </div>
    </div>
  );
};
