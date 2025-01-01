import React, { useEffect, useState } from "react";
import roundIcon from "@/assets/images/Ic_round.svg";
import triangleIcon from "@/assets/images/Ic_triangle.svg";
import AutoIcon from "@/assets/images/Ic_Auto.svg";
import shatkonIcon from "@/assets/images/Ic_shatkon.svg";
import squareIcon from "@/assets/images/Ic_square.svg";

const WhyLoveUs: React.FC = () => {
  const [activeDiv, setActiveDiv] = useState(0);
  const [visibleDiv, setVisibleDiv] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDiv((prev) => {
        const nextDiv = prev === 5 ? 0 : prev + 1;

        setTimeout(() => {
          setVisibleDiv(nextDiv);
        }, 600);

        return nextDiv;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            display: visibleDiv === 0 ? "flex" : "none",
            opacity: activeDiv === 0 ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
          className="flex items-center justify-center gap-6 lg:gap-8"
        >
          <img
            src={roundIcon}
            alt="Round icon"
            className="w-[20px] h-[20px] md:w-auto md:h-auto"
          />
          <img
            src={triangleIcon}
            alt="Triangle icon"
            className="w-[20px] h-[20px] md:w-auto md:h-auto"
          />
          <img
            src={AutoIcon}
            alt="Auto icon"
            className="w-[20px] h-[20px] md:w-auto md:h-auto"
          />
          <img
            src={shatkonIcon}
            alt="Shatkon icon"
            className="w-[20px] h-[20px] md:w-auto md:h-auto"
          />
          <img
            src={squareIcon}
            alt="Square icon"
            className="w-[20px] h-[20px] md:w-auto md:h-auto"
          />
        </div>

        <div
          style={{
            display: visibleDiv === 1 ? "flex" : "none",
            opacity: activeDiv === 1 ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
          className="flex items-center gap-1.5 sm:gap-3 justify-center"
        >
          <img
            src={AutoIcon}
            alt="Auto icon"
            className="w-[20px] h-[20px] md:w-auto md:h-auto"
          />
          <p className="text-gray text-xs sm:text-sm md:text-base desktop:text-lg">
            We make{" "}
            <span className="font-semibold text-primary">discovering</span> new
            opportunities simple
          </p>
        </div>

        <div
          style={{
            display: visibleDiv === 2 ? "flex" : "none",
            opacity: activeDiv === 2 ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
          className="flex items-center gap-1.5 sm:gap-3 justify-center"
        >
          <img
            src={roundIcon}
            alt="Round icon"
            className="w-[20px] h-[20px] md:w-auto md:h-auto"
          />
          <p className="text-gray text-xs sm:text-sm md:text-base desktop:text-lg">
            We make job hunting a{" "}
            <span className="font-semibold text-primary">joyful</span>{" "}
            experience
          </p>
        </div>

        <div
          style={{
            display: visibleDiv === 3 ? "flex" : "none",
            opacity: activeDiv === 3 ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
          className="flex items-center gap-1.5 sm:gap-3 justify-center"
        >
          <img
            src={triangleIcon}
            alt="Triangle icon"
            className="w-[20px] h-[20px] md:w-auto md:h-auto"
          />
          <p className="text-gray text-xs sm:text-sm md:text-base desktop:text-lg">
            We make every job a step toward{" "}
            <span className="font-semibold text-primary">growth</span>
          </p>
        </div>

        <div
          style={{
            display: visibleDiv === 4 ? "flex" : "none",
            opacity: activeDiv === 4 ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
          className="flex items-center gap-1.5 sm:gap-3 justify-center"
        >
          <img
            src={shatkonIcon}
            alt="Shatkon icon"
            className="w-[20px] h-[20px] md:w-auto md:h-auto"
          />
          <p className="text-gray text-xs sm:text-sm md:text-base desktop:text-lg">
            We make{" "}
            <span className="font-semibold text-primary">balancing</span> life
            and work a priority
          </p>
        </div>

        <div
          style={{
            display: visibleDiv === 5 ? "flex" : "none",
            opacity: activeDiv === 5 ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
          className="flex items-center gap-1.5 sm:gap-3 justify-center"
        >
          <img
            src={squareIcon}
            alt="Square icon"
            className="w-[20px] h-[20px] md:w-auto md:h-auto"
          />
          <p className="text-gray text-xs sm:text-sm md:text-base desktop:text-lg">
            We make your next{" "}
            <span className="font-semibold text-primary">inspiring</span> career
            move possible
          </p>
        </div>
      </div>
    </>
  );
};

export default WhyLoveUs;
