import React, { useEffect, useRef } from "react";
import Ic_amazon from "@/assets/images/Ic_amazon.svg";
import Ic_figma from "@/assets/images/Ic_figma.svg";
import Ic_google from "@/assets/images/Ic_google.svg";
import Ic_zoho from "@/assets/images/Ic_zoho.svg";
import Ic_cocacola from "@/assets/images/Ic_cocacola.svg";
import Ic_jpmorgan from "@/assets/images/Ic_jpmorgan.svg";
import MarqueeSlider from "@/components/marqueeSlider";

const TrustedUxEmployee = [
  Ic_figma,
  Ic_zoho,
  Ic_jpmorgan,
  Ic_amazon,
  Ic_google,
  Ic_cocacola,
];

const TrustedEmployer: React.FC = () => {
  const section4Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const path = document.getElementById("animatedPathEmployers");

    const playAnimation = () => {
      if (path) {
        const animation = path.animate(
          [{ strokeDasharray: "0, 1000" }, { strokeDasharray: "500, 1000" }],
          {
            duration: 1500,
            iterations: 1,
            fill: "forwards",
          }
        );

        setTimeout(() => {
          animation.pause();
        }, 565);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          playAnimation();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (section4Ref.current) {
      observer.observe(section4Ref.current);

      section4Ref.current.addEventListener("mouseenter", playAnimation);
    }

    return () => {
      if (section4Ref.current) {
        observer.unobserve(section4Ref.current);
        section4Ref.current.removeEventListener("mouseenter", playAnimation);
      }
    };
  }, []);

  return (
    <>
      <div className="pt-[24px] pb-[48px] big:py-[72px]" ref={section4Ref}>
        <div className="flex flex-col gap-[4px] mb-8 lg:mb-10 desktop:mb-12 px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px]">
          <div className="text-primary text-2xl md:text-3xl desktop:text-4xl font-semibold desktop:leading-[54px]">
            Featured{" "}
            <span className="relative">
              Employers.
              <svg
                width="191"
                height="10"
                viewBox="0 0 191 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-[-4px] left-0 w-full"
                style={{ rotate: "180deg" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M188.853 3.02217C151.48 6.29907 113.403 5.52413 75.8985 6.65768C51.0986 7.41091 26.3047 8.60811 1.52156 9.30004C0.778509 9.31994 0.1594 8.88345 0.139143 8.32111C0.119336 7.75877 0.706264 7.28739 1.44886 7.26749C26.2293 6.57561 51.0205 5.37846 75.8178 4.62527C113.255 3.49292 151.261 4.27252 188.566 1.00019C189.305 0.936287 189.968 1.33473 190.05 1.89259C190.127 2.45053 189.588 2.95495 188.853 3.02217Z"
                  stroke="#1A8779"
                  strokeWidth="2"
                  fill="none"
                  id="animatedPathEmployers"
                />
              </svg>
            </span>
          </div>
          <p className="text-gray text-sm md:text-base desktop:text-lg">
            Trusted by leading organizations worldwide.
          </p>
        </div>
        <div className="w-[98.2vw] overflow-hidden px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px]">
          <MarqueeSlider
            slides={TrustedUxEmployee}
            length={TrustedUxEmployee.length > 6 ? 6 : TrustedUxEmployee.length}
          />
        </div>
      </div>
    </>
  );
};

export default TrustedEmployer;
