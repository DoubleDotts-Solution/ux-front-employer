import React, { useState } from "react";
import Ic_plus from "@/assets/images/Ic_plus.svg";
import Ic_minus from "@/assets/images/Ic_minus.svg";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className={`py-3 md:py-4 desktop:py-6 ${
            index !== items.length - 1 ? "border-b border-primary" : ""
          }`}
        >
          <button
            className={`w-full focus:outline-none flex justify-between gap-2 md:gap-3 items-center`}
            onClick={() => toggleAccordion(index)}
          >
            <div
              className={`text-primary text-lg md:text-xl desktop:text-2xl text-left ${
                openIndex === index ? "font-medium" : ""
              }`}
            >
              {item.question}
            </div>
            {openIndex === index ? (
              <img
                src={Ic_minus}
                alt="minus"
                className="w-[20px] md:w-[24px] h-[20px] md:h-[24px] desktop:w-auto desktop:h-auto"
              />
            ) : (
              <img
                src={Ic_plus}
                alt="plus"
                className="w-[20px] md:w-[24px] h-[20px] lg:w-auto lg:h-auto"
              />
            )}
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pt-2 md:pt-3 text-sm md:text-base lg:text-lg desktop:text-xl text-[#787878]">
              <div dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
