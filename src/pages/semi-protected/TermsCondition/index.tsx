import React from "react";

export const TermsCondition: React.FC = () => {
  return (
    <div className="relative">
      <div className="bg-lightYellow  relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-6 md:py-[48px]">
        <h2 className="text-primary text-2xl sm:text-3xl md:text-4xl desktop:text-5xl desktop:leading-[60px] font-semibold">
          Terms of Service
        </h2>
      </div>
      <div className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[44px] desktop:py-[72px] flex flex-col gap-[20px] md:gap-[28px] desktop:gap-[32px]">
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Acceptance of Terms
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              By using UX Jobsite, you agree to these Terms of Service. If you
              do not agree, please do not use the platform.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Description of Services
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              UX Jobsite provides an online platform for job seekers to find job
              opportunities and for employers to post jobs and connect with
              potential candidates. We reserve the right to modify or
              discontinue services without notice.{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            User Accounts
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              We only share your information under these circumstances:
            </p>
            <ul className="list-disc pl-[20px] desktop:pl-[30px]">
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Registration: You must register to access certain features.
                Provide accurate and complete information.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Account Responsibility: You are responsible for maintaining the
                confidentiality of your account details and activities under
                your account.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Account Termination: We may suspend or terminate your account if
                you violate these terms.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Use of the Platform
          </h3>
          <div>
            <ul className="list-disc pl-[20px] desktop:pl-[30px]">
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Accuracy: Employers must provide accurate information in job
                listings. Job seekers should submit truthful details in their
                profiles and applications.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Non-Binding: UX Jobsite is not involved in actual hiring
                decisions and does not guarantee employment.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Content Ownership
          </h3>
          <div>
            <ul className="list-disc pl-[20px] desktop:pl-[30px]">
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                User Content: You retain ownership of any content you upload
                (resumes, job listings, etc.). By uploading, you grant UX
                Jobsite a non-exclusive right to use, display, and distribute
                your content.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Platform Content: UX Jobsite owns all platform content (text,
                graphics, logos) and software. Do not copy or distribute any
                platform materials without permission.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Privacy
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              By using our platform, you agree to our Privacy Policy. This
              includes how we collect, use, and share your personal data.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Disclaimers
          </h3>
          <div>
            <ul className="list-disc pl-[20px] desktop:pl-[30px]">
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                We provide the platform "as-is" without warranties of any kind.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                We do not guarantee that the site will be available at all times
                or that it is free of errors.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                UX Jobsite is not responsible for any decisions made based on
                job listings or user content.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Limitation of Liability
          </h3>
          <div>
            <ul className="list-disc pl-[20px] desktop:pl-[30px]">
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                UX Jobsite will not be liable for any indirect, incidental, or
                consequential damages resulting from your use of the platform.
              </li>
              <li className="text-sm md:text-base lg:text-lg text-[#787878]">
                Our total liability in any matter related to the use of the site
                is limited to the amount you paid for the service, if
                applicable.{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Indemnification
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              You agree to indemnify and hold UX Jobsite harmless from any
              claims, losses, or damages resulting from your use of the platform
              or violation of these terms.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Modifications to the Terms
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              We may update these terms from time to time. Continued use of the
              platform after any changes signifies your acceptance of the
              revised terms.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Governing Law
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              These terms are governed by the laws of India. Any disputes will
              be resolved under the jurisdiction of the courts of Bangalore,
              India.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
            Contact Us
          </h3>
          <div>
            <p className="text-sm md:text-base lg:text-lg text-[#787878]">
              For questions regarding these Terms of Service, contact us at:
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
