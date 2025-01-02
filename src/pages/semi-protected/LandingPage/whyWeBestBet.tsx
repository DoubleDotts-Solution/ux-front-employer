import React, { useEffect, useRef } from "react";
import Ic_best_best_access_ux from "@/assets/images/Ic_best_best_access_ux.svg";
import Ic_best_best_hire_process from "@/assets/images/Ic_best_best_hire_process.svg";
import Ic_best_best_employer_support from "@/assets/images/Ic_best_best_employer_support.svg";
import Ic_best_best_reach_top_talent from "@/assets/images/Ic_best_best_reach_top_talent.svg";
import LikeImg from "@/assets/images/Img_like.png";

const WhyWeBestBet: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;

    if (!path) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    const startAnimation = () => {
      if (!path) return;

      const animation = path.animate(
        [{ strokeDashoffset: totalLength }, { strokeDashoffset: 0 }],
        {
          duration: 1500,
          fill: "forwards",
        }
      );

      setTimeout(() => {
        animation.pause();
      }, 1500);
    };

    startAnimation();

    const handleMouseEnter = () => {
      if (path) {
        const animation = path.animate(
          [{ strokeDashoffset: totalLength }, { strokeDashoffset: 0 }],
          {
            duration: 1500,
            fill: "forwards",
          }
        );

        setTimeout(() => {
          animation.pause();
        }, 1500);
      }
    };

    const handleMouseLeave = () => {
      if (path) {
        path.style.strokeDashoffset = `${totalLength}`;
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mouseenter", handleMouseEnter);
      section.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (section) {
        section.removeEventListener("mouseenter", handleMouseEnter);
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const jobItems = [
    {
      icon: Ic_best_best_access_ux,
      title: "Access to Verified UX Professionals",
      description:
        "Discover top-tier candidates with verified portfolios and proven expertise in UX design.",
    },
    {
      icon: Ic_best_best_hire_process,
      title: "Streamlined Hiring Process",
      description:
        "Post jobs, review applications, and make hires seamlessly—all in one platform.",
    },
    {
      icon: Ic_best_best_employer_support,
      title: "Dedicated Employer Support",
      description:
        "Get personalized assistance to find the right talent quickly and efficiently.",
    },
    {
      icon: Ic_best_best_reach_top_talent,
      title: "Reach top talent faster",
      description:
        "Connect with skilled professionals actively looking for opportunities.",
    },
  ];

  return (
    <>
      <div
        className="bg-lightChiku px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[48px] big:py-[72px]"
        ref={sectionRef}
      >
        <div className="flex items-start lg:items-center gap-2 lg:gap-8">
          <img src={LikeImg} alt="like" className="w-[60px] desktop:w-auto" />
          <div>
            <h2 className="text-primary text-xl md:text-3xl desktop:text-4xl font-semibold desktop:leading-[54px] mb-[4px]">
              Why We’re Your{" "}
              <span className="relative">
                Best Bet
                <svg
                  width="179"
                  height="78"
                  viewBox="0 0 179 78"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-[-24px] desktop:top-[-20px] left-0 desktop:left-[-4px] w-full"
                >
                  <path
                    ref={pathRef}
                    d="M116.122 68.7392C162.496 56.0776 188.191 32.3484 173.513 15.7385C158.835 -0.871291 109.342 -4.07193 62.9681 8.58971C16.5938 21.2513 -9.10113 44.9805 5.57689 61.5904C20.2549 78.2002 69.7476 81.4009 116.122 68.7392Z"
                    stroke="#6F20D0"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-gray text-sm desktop:text-lg">
              From quick job posts to finding perfect-fit candidates—we’ve got
              you covered.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mt-8 lg:mt-12">
          {jobItems.map((job, index) => (
            <div className="relative inline-block w-full h-full" key={index}>
              <span className="relative bg-lightGray rounded-[12px] md:rounded-2xl border-2 border-primary z-50 flex items-start w-full h-full p-4 md:p-6 desktop:p-8 gap-3 lg:gap-5">
                <img
                  src={job.icon}
                  alt="product designer"
                  className="w-[32px] h-[32px] lg:w-auto lg:h-auto"
                />
                <div>
                  <h3 className="text-primary text-lg sm:text-xl md:text-[20px] desktop:text-[24px] font-medium mb-1.5 lg:mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray text-base sm:text-lg md:text-xl desktop:text-[20px]">
                    {job.description}
                  </p>
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WhyWeBestBet;
