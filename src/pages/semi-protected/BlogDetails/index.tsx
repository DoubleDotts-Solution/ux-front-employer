/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Ic_left_arrow from "@/assets/images/Ic_left_arrow.svg";
import Ic_right_breadCrumb_arrow from "@/assets/images/Ic_right_breadCrumb_arrow.svg";
import { Link } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import twitter from "@/assets/images/Ic_twitter.svg";
import facebook from "@/assets/images/Ic_footer_facebook.svg";
// import insta from "@/assets/images/Ic_footer_insta.svg";
// import youtube from "@/assets/images/Ic_footer_youtube.svg";

const data = {
  data: {
    id: 2,
    title: "Navigating the UX Job Market: Stand Out in a Competitive Field",
    description:
      "<p>Welcome to \"Design Insights: Navigating UI/UX,\" where we dive deep into the dynamic world of user interface and user experience design. Whether you're a seasoned designer, a budding enthusiast, or simply curious about how digital experiences come to life, this blog aims to be your compass in the ever-evolving landscape of design.</p><p><br></p><p>User Interface (UI) and User Experience (UX) are integral components of any digital product. UI focuses on the look and feel—how elements are arranged and visually communicated to users. Meanwhile, UX delves into the overall experience—how users interact with the product, their journey, and the emotions evoked throughout.</p><p><br></p><p>In our journey through this blog, we'll explore:</p><p><br></p><p>Fundamentals of UI Design: From typography and color theory to layout and visual hierarchy, we'll uncover the principles that make interfaces not only functional but also aesthetically pleasing.</p><p><br></p><p>Enhancing UX through Research: Understanding user behavior and preferences is key to crafting meaningful experiences. We'll discuss methodologies like user testing, journey mapping, and persona development that shape superior UX.</p><p><br></p><p>Current Trends and Innovations: The design world is in constant motion. We'll keep you updated on the latest trends, emerging technologies, and innovative practices that push the boundaries of UI/UX design.</p>",
    image: "blog/81e54c104ea4f94dd668bf12fdeee1e9.png",
    updatedAt: "2024-10-17T06:01:21.565Z",
  },
  status: 200,
};

export const BlogsDetails: React.FC = () => {
  const blog = (data as any)?.data || [];

  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
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
            src={`https://uxjobsite.com/public/${blog.image}`}
            alt="blog-image"
            className="w-full sm:w-[240px] md:w-[300px] lg:w-auto"
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
