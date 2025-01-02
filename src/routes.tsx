import { createBrowserRouter } from "react-router-dom";
import {
  AboutUs,
  Blogs,
  BlogsDetails,
  PostJob,
  ContactUs,
  Faqs,
  ForgotPassword,
  FindTalentDetail,
  FindTalent,
  Profile,
  LandingPage,
  PageNotFound,
  PrivacyPolicy,
  Register,
  ResetPassword,
  SearchJobPage,
  TermsCondition,
  VerifyOtp,
} from "./pages";
import { Layout } from "./layouts";
import AuthLayout from "./layouts/authLayout";
import UserLayout from "./layouts/userLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "/find-talent", element: <FindTalent /> },
      { path: "/post-job", element: <PostJob /> },
      { path: "/edit-job/:id", element: <PostJob /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/faqs", element: <Faqs /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-condition", element: <TermsCondition /> },
      { path: "*", element: <PageNotFound /> },
      { path: "/blog-details/:id", element: <BlogsDetails /> },
      { path: "change-password", element: <ResetPassword /> },
      { path: "/find-talent/:id", element: <FindTalentDetail /> },
      {
        path: "create-account",
        element: (
          <UserLayout>
            <Register />
          </UserLayout>
        ),
      },
      {
        path: "verify-email",
        element: (
          <UserLayout>
            <LandingPage />
          </UserLayout>
        ),
      },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      {
        path: "/profile",
        element: (
          <AuthLayout>
            <Profile />
          </AuthLayout>
        ),
      },
      { path: "/verify-otp", element: <VerifyOtp /> },
      { path: "/search-job", element: <SearchJobPage /> },
    ],
  },
]);
