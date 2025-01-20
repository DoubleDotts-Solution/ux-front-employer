import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "@/components/common/pagination";
import { useGetBlogsApiQuery } from "@/store/slice/apiSlice/blogApi";
import { PHOTO_URL } from "@/config/constant";
import Loading from "@/components/common/loading";

interface Blog {
  id: number;
  title: string;
  image: string;
}
interface Pagination {
  limit: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
interface GetBlogsResponse {
  data: Blog[];
  pagination: Pagination;
}

export const Blogs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const params = {
    page: currentPage,
    limit: blogsPerPage,
    value: "",
  };

  const { data, isLoading } = useGetBlogsApiQuery(params);
  const blogs = (data as GetBlogsResponse)?.data || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const section5Ref = useRef<HTMLDivElement | null>(null);
  const path1Ref = useRef<SVGPathElement | null>(null);
  const path2Ref = useRef<SVGPathElement | null>(null);

  const startAnimations = () => {
    if (path1Ref.current) {
      const animation1 = path1Ref.current.querySelector("animate");
      if (animation1) {
        (animation1 as SVGAnimateElement).beginElement();
        setTimeout(() => {
          path1Ref.current?.setAttribute("fill", "#070707");
        }, 1000);
      }
    }

    if (path2Ref.current) {
      const animation2 = path2Ref.current.querySelector("animate");
      if (animation2) {
        (animation2 as SVGAnimateElement).beginElement();
        setTimeout(() => {
          path2Ref.current?.setAttribute("fill", "#070707");
        }, 2000);
      }
    }
  };

  const resetAnimations = () => {
    if (path1Ref.current) {
      path1Ref.current.setAttribute("fill", "none");
      const animation1 = path1Ref.current.querySelector("animate");
      if (animation1) {
        (animation1 as SVGAnimateElement).setAttribute("begin", "0s");
      }
    }
    if (path2Ref.current) {
      path2Ref.current.setAttribute("fill", "none");
      const animation2 = path2Ref.current.querySelector("animate");
      if (animation2) {
        (animation2 as SVGAnimateElement).setAttribute("begin", "0s");
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resetAnimations();
          startAnimations();
        }
      },
      { threshold: 0.1 }
    );

    if (section5Ref.current) {
      observer.observe(section5Ref.current);
    }

    return () => {
      if (section5Ref.current) {
        observer.unobserve(section5Ref.current);
      }
    };
  }, []);

  const handleSection5MouseEnter = () => {
    resetAnimations();
    startAnimations();
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="relative">
      <div
        className="bg-lightYellow relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-6 md:py-8 desktop:py-[61px]"
        ref={section5Ref}
        onMouseEnter={handleSection5MouseEnter}
      >
        <div className="flex flex-col gap-[4px]">
          <h2 className="text-primary text-xl sm:text-2xl md:text-[2rem] lg:text-[2.5rem] desktop:text-[3rem] desktop:leading-[60px] font-semibold mb-3">
            The Blog{" "}
            <span className="relative">
              Spot.
              <svg
                width="40"
                height="41"
                viewBox="0 0 40 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[10px] right-[-45px]"
              >
                <g clipPath="url(#clip0_515_18701)">
                  <path
                    ref={path1Ref}
                    d="M1.51786 4.04957L0.742053 22.1492C0.493793 28.1109 0.0283071 34.1032 0.0826138 40.0726C0.0903719 41.0304 3.09276 40.4021 3.1781 39.4748C3.73668 33.5362 3.78323 27.5208 4.03149 21.5591L4.79178 3.6511C4.84609 2.32543 1.5489 2.97677 1.51011 4.05723L1.51786 4.04957Z"
                    fill="none"
                    stroke="#070707"
                    strokeWidth="3"
                  >
                    <animate
                      attributeName="stroke-dasharray"
                      from="0 200"
                      to="200 200"
                      dur="2s"
                      begin="0s"
                      fill="freeze"
                    />
                  </path>
                  <path
                    ref={path2Ref}
                    d="M2.02213 5.17389C12.3947 4.64516 22.7518 3.63366 33.0468 2.30033L31.9839 1.17389C27.7635 4.56087 23.3802 7.71796 18.7796 10.5839C18.1047 11.0053 17.8952 11.6643 18.7952 11.9172C24.6448 13.5494 30.4944 15.1892 36.3362 16.8367L37.5543 15.0743C25.7464 17.1049 13.9308 19.2429 2.23936 21.8559C1.79715 21.9555 0.912723 22.331 0.935997 22.8904C0.959272 23.4498 1.82818 23.4957 2.2316 23.4191C13.8455 21.1739 25.4439 18.8597 37.1043 16.8521C37.6706 16.7524 38.524 16.5455 38.8421 15.9938C39.1214 15.5111 38.7956 15.2199 38.3223 15.0896C32.4649 13.4651 26.6076 11.8329 20.758 10.1931L20.7735 11.5264C25.5525 8.52255 30.1685 5.25819 34.5364 1.69497C35.4984 0.913358 34.164 0.468913 33.4735 0.56853C23.3026 1.9555 13.0697 2.87504 2.81346 3.5034C2.28591 3.53405 1.35494 3.85589 1.15322 4.40761C0.951514 4.95933 1.54113 5.19688 2.02213 5.17389Z"
                    fill="none"
                    stroke="#070707"
                    strokeWidth="1.5"
                  >
                    <animate
                      attributeName="stroke-dasharray"
                      from="0 500"
                      to="500 500"
                      dur="4s"
                      begin="2s"
                      fill="freeze"
                    />
                  </path>
                </g>
                <defs>
                  <clipPath id="clip0_515_18701">
                    <rect
                      width="39"
                      height="40"
                      fill="#070707"
                      transform="translate(0.0826416 0.546875)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-gray text-sm md:text-base desktop:text-lg">
            Insights and Trends in the World of UX.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] pb-[44px] desktop:pb-[72px]">
        <p className="text-primary font-medium pt-[24px] pb-[20px] lg:pb-[32px]  lg:pt-[48px] text-base lg:text-lg">
          {blogs.length > 0
            ? (data as GetBlogsResponse).pagination.limit *
                ((data as GetBlogsResponse).pagination.currentPage - 1) +
              1
            : 0}
          -
          {Math.min(
            blogs.length,
            (data as GetBlogsResponse)?.pagination.limit *
              (data as GetBlogsResponse)?.pagination.currentPage
          )}{" "}
          of {(data as GetBlogsResponse)?.pagination?.totalCount || 0}{" "}
          <span className="font-normal text-gray">Search Result</span>
        </p>
        <div className="w-full">
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {blogs.map((blog: Blog) => (
                <Link
                  to={`/blog-details/${blog.id}`}
                  key={blog.id}
                  className="w-full border-2 border-primary rounded-[12px] md:rounded-2xl p-3 desktop:p-4 flex flex-col gap-3 lg:gap-4 desktop:gap-6 bg-white hover:shadow-shadow1"
                >
                  <img
                    src={`${PHOTO_URL}/${blog.image}`}
                    alt="blog-image"
                    className="w-full h-[265px] rounded-[12px]"
                  />
                  <p className="text-primary text-base md:text-lg desktop:text-xl">
                    {blog.title}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            "No Data Found"
          )}
          {(data as GetBlogsResponse)?.pagination?.totalCount >
          (data as GetBlogsResponse)?.pagination?.limit ? (
            <div className="flex justify-center mt-7 lg:mt-9">
              <Pagination
                currentPage={(data as GetBlogsResponse)?.pagination.currentPage}
                totalPages={(data as GetBlogsResponse)?.pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
