/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Ic_left_arrow from "@/assets/images/Ic_left_arrow.svg";
import Ic_right_breadCrumb_arrow from "@/assets/images/Ic_right_breadCrumb_arrow.svg";
import { Link } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import twitter from "@/assets/images/Ic_twitter.svg";
import facebook from "@/assets/images/Ic_footer_facebook.svg";
import { useGetSingleBlogApiQuery } from "@/store/slice/apiSlice/blogApi";
import Loading from "@/components/common/loading";
import { PHOTO_URL } from "@/config/constant";
// import insta from "@/assets/images/Ic_footer_insta.svg";
// import youtube from "@/assets/images/Ic_footer_youtube.svg";

export const BlogsDetails: React.FC = () => {
  const { data, isLoading } = useGetSingleBlogApiQuery(
    location.pathname.match(/\/blog-details\/(\d+)/)?.[1]
  );

  const blog = (data as any)?.data || [];

  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="relative">
      <div className="bg-lightYellow relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] pt-5 md:pt-6 pb-6 md:pb-10">
        <nav className="flex items-center gap-2 mb-5 md:mb-[30px]">
          <Link to={"/blogs"}>
            <img src={Ic_left_arrow} alt="arrow" />
          </Link>
          <Link to={"/"}>
            <span className="text-primary text-sm font-semibold">Home</span>
          </Link>
          <img src={Ic_right_breadCrumb_arrow} alt="arrow" />
          <Link to={"/blogs"}>
            <span className="text-primary text-sm font-semibold">Blogs</span>
          </Link>
          <img src={Ic_right_breadCrumb_arrow} alt="arrow" />
          <span className="text-gray text-sm truncate">{blog.title}</span>
        </nav>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-center">
          <img
            src={`${PHOTO_URL}/${blog.image}`}
            alt="blog-image"
            className="w-full sm:w-[240px] md:w-[300px] lg:w-[356px] rounded-[12px]"
          />

          <div>
            <h2 className="text-primary text-2xl big:text-[40px] font-semibold leading-[36px] big:leading-[48px] mb-4 lg:mb-6">
              {blog.title}
            </h2>
            <div className="flex flex-wrap items-center gap-[10px]">
              <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl">
                Share This Article:
              </span>
              <FacebookShareButton url={currentUrl}>
                <img
                  src={facebook}
                  alt="facebook"
                  className="w-[28px] h-[28px] md:w-[32px] md:h-[32px]"
                />
              </FacebookShareButton>
              <TwitterShareButton url={currentUrl}>
                <img
                  src={twitter}
                  alt="twitter"
                  className="w-[28px] h-[28px] md:w-[32px] md:h-[32px]"
                />
              </TwitterShareButton>
              {/* <LinkedinShareButton url={currentUrl}>
                <img
                  src={insta}
                  alt="insta"
                  className="w-[28px] h-[28px] md:w-[32px] md:h-[32px]"
                />
              </LinkedinShareButton>
              <LinkedinShareButton url={currentUrl}>
                <img
                  src={youtube}
                  alt="youtube"
                  className="w-[28px] h-[28px] md:w-[32px] md:h-[32px]"
                />
              </LinkedinShareButton> */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-[44px] lg:gap-[20px] px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] pb-[44px] desktop:pb-[72px] pt-[24px] lg:pt-[48px]">
        <div
          dangerouslySetInnerHTML={{ __html: blog.description }}
          className="text-sm md:text-base lg:text-lg desktop:text-xl text-gray"
        />
      </div>
    </div>
  );
};
