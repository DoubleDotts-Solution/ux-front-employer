import React from "react";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="relative">
      <div className="bg-lightYellow  relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-6 md:py-[48px]">
        <h2 className="text-primary text-2xl sm:text-3xl md:text-4xl desktop:text-5xl desktop:leading-[60px] font-semibold">
          Privacy Policy
        </h2>
      </div>
      <div className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[44px] desktop:py-[72px] flex flex-col gap-[20px] md:gap-[28px] desktop:gap-[32px]">
        <p className="text-sm md:text-base lg:text-lg text-[#787878]">
          Welcome to UXJobsite! We are committed to protecting your privacy.
          This Privacy Policy outlines how we collect, use, and protect your
          personal information when you visit our website
          (https://uxjobsite.com) or use any of our services (the “Services”).
          By using our site, you agree to the practices outlined in this policy.
          If we make any changes, they will be updated here, and continued use
          of our services indicates acceptance of the revised policy.
        </p>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            What Information We Collect
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              We collect various types of information depending on your role as
              a Job Seeker or Employer:
            </p>
            <ul className="list-disc pl-[20px] desktop:pl-[30px]">
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Job Seekers: Name, email, phone number, resume details,
                location, and professional experience.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Employers: Company name, contact details, job postings, and
                recruitment preferences.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Payment Information: For paid services, credit card and billing
                details are securely processed by third-party payment gateways
                such as Stripe.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            How We Use Your Information
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              Your information is used to:
            </p>
            <ul className="list-disc pl-[20px] desktop:pl-[30px]">
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Connect job seekers with relevant job opportunities.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Help employers find suitable candidates.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Send job alerts, updates, and promotional materials (you can
                opt-out anytime).
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Improve our website and services through user feedback.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Sharing Your Information
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              We only share your information under these circumstances:
            </p>
            <ul className="list-disc pl-[20px] desktop:pl-[30px]">
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                With Employers: Job seekers’ profiles and resumes are shared
                with employers when you apply for a job.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                With Service Providers: We may share data with trusted partners
                (e.g., payment processors) to help deliver our services.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Legal Compliance: If required by law or to protect our rights
                and users.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Security Measures
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              We prioritize data security and use industry-standard measures to
              protect your information. However, no online transmission is 100%
              secure. Users are encouraged to maintain strong, unique passwords
              and exercise caution when sharing sensitive information.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Your Rights and Choices
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              You have the right to:
            </p>
            <ul className="list-disc pl-[20px] desktop:pl-[30px]">
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Access and Update: View and update your profile information
                anytime.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Delete Your Account: Request account deletion by contacting us.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Opt-Out: Unsubscribe from marketing emails using the provided
                link.
              </li>
            </ul>
            <p className="text-sm md:text-base lg:text-lg text-[#787878] mt-[20px]">
              For detailed rights under GDPR (e.g., data portability or
              restriction of processing), please contact us at
              privacy@uxjobsite.com.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Aggregated Data
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              We may use your data in an aggregated and anonymised form for
              internal analysis, research, and reporting. This data will not
              identify you personally.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Changes to This Policy
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              We may update this Privacy Policy from time to time. If we make
              significant changes, we will notify you via email or a prominent
              notice on our site.{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Contact Us
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              If you have questions, concerns, or requests regarding your
              privacy, feel free to reach out:
            </p>
            <ul className="list-disc pl-[20px] desktop:pl-[30px]">
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Email: privacy@uxjobsite.com
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Phone: +91-8105338000
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
