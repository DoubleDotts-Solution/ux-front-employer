import React from "react";
import Accordion from "@/components/common/accordion";
import Loading from "@/components/common/loading";
import { useGetFaqsApiQuery } from "@/store/slice/apiSlice/faqApi";

interface Faqs {
  answer: string;
  question: string;
}

interface GetFaqsResponse {
  data: Faqs[];
}

export const Faqs: React.FC = () => {
  const params = {
    page: 1,
    limit: 100,
    value: "",
  };

  const { data, isLoading } = useGetFaqsApiQuery(params);
  const faqs = (data as GetFaqsResponse)?.data || [];
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="relative">
      <div className="bg-lightYellow  relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-6 md:py-[61px]">
        <div className="flex flex-col gap-[12px]">
          <div className="text-primary text-2xl sm:text-3xl md:text-4xl desktop:text-5xl desktop:leading-[72px] font-semibold">
            FAQs
          </div>
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
