import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HandIcon from "@/assets/images/handLogo.png";
import Ic_menu from "@/assets/images/Ic_menu.svg";
import Ic_down_arrow from "@/assets/images/Ic_down_arrow.svg";
import ButtonUx from "./common/button";
import Ic_profile from "@/assets/images/Ic_profile.svg";
import Ic_saved_jobs from "@/assets/images/Ic_saved_jobs.svg";
import Ic_logout from "@/assets/images/Ic_logout.svg";
import Ic_job_applied from "@/assets/images/Ic_job_applied.svg";
import Ic_search from "@/assets/images/Ic_search.svg";
import Img_cancel from "@/assets/images/Img_cancel.png";
import SearchJob from "./searchJob";
import Modal from "./common/modal";

export const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const location = useLocation();
  const currentPath = location.pathname;

  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchDivOpen, setSearchDivOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearchDiv = () => {
    setSearchDivOpen(!searchDivOpen);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isConfirmLogout, setIsConfirmLogout] = useState(false);

  const body = document.querySelector("body");
  const onLogout = async () => {
    if (isConfirmLogout) {
      setTimeout(() => {
        setIsConfirmLogout(false);
      }, 300);
      body?.classList.remove("overflow-hidden");
      body?.classList.remove("h-screen");
    } else {
      setIsConfirmLogout(true);
      body?.classList.add("overflow-hidden");
      body?.classList.add("h-screen");
    }
  };

  return (
    <div
      className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] py-2 sticky top-0 bg-white w-full"
      style={{
        zIndex: "999",
        boxShadow: hasShadow ? "0px 4px 12px 0px #00000014" : "none",
      }}
    >
      <div className="flex items-center justify-between relative">
        <div className="gap-[12px] flex items-center laptop:w-[57%] laptop:justify-between">
          <div className="laptop:hidden relative">
            <button
              onClick={toggleDrawer}
              className="pb-0 flex items-center justify-center"
            >
              <img src={Ic_menu} alt="menu" />
            </button>
          </div>
          <Link to={"/"}>
            <div className="flex items-center font-bold text-2xl laptop:text-[28px] big:text-[34px] tracking-wider">
              <span className="text-primary">ux</span>
              <img
                src={HandIcon}
                alt=""
                className="pr-[2.25px] ml-[-2.25px] w-[25px] h-[30px] laptop:w-auto laptop:h-auto"
              />
              <span className="text-primary">jobsite</span>
            </div>
          </Link>
          {/* Nav items */}
          <div className="hidden laptop:flex items-center gap-3 big:gap-12 font-semibold text-lg laptop:text-xl">
            <Link
              to={"/find-talent"}
              className={`font-medium text-primary hover-underline-animation-navbar hover-underline-animation text-lg border-b-2 border-t-2 ${
                currentPath === "/find-talent" ||
                currentPath.startsWith("/find-talent/") ||
                currentPath.startsWith("/find-talent/")
                  ? "nav_active"
                  : "border-transparent"
              }`}
            >
              Find Talent
            </Link>
            <Link
              to={"/post-job"}
              className={`font-medium text-primary hover-underline-animation-navbar hover-underline-animation text-lg border-b-2 border-t-2 ${
                currentPath === "/post-job"
                  ? "nav_active"
                  : "border-transparent"
              }`}
            >
              Post a Job
            </Link>
            <Link
              to={"/blogs"}
              className={`font-medium text-primary hover-underline-animation-navbar hover-underline-animation text-lg border-b-2 border-t-2 ${
                currentPath === "/blogs" ||
                currentPath.startsWith("/blog-details/")
                  ? "nav_active"
                  : "border-transparent"
              }`}
            >
              Blogs
            </Link>
          </div>
        </div>
        {/* Buttons */}
        {/* <div className="hidden laptop:flex items-center gap-4 relative">
          <Link to="/login">
            <ButtonUx
              label="Login"
              buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-6 py-2 h-[40px] text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
            />
          </Link>
          <Link to={"/create-account"}>
            <ButtonUx
              label="Register"
              buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-[40px]"
            />
          </Link>
          <div className="border-l border-gray5 h-[18px] w-1"></div>
          <p className="text-primary text-lg font-medium">For Job Seekers</p>
        </div> */}
        <div className="hidden laptop:flex items-center gap-4">
          <div
            className="border h-[40px] rounded-[8px] flex gap-2 py-[10px] px-3 items-center border-gray5 desktop:w-[276px]"
            onClick={toggleSearchDiv}
          >
            <img src={Ic_search} alt="search" />{" "}
            <span className="text-gray text-sm">
              Search for Skills, post-job
            </span>
          </div>
          <div className="gap-3 flex">
            <div className="border-2 border-primary z-50 flex items-center justify-center w-[40px] h-[36px] lg:h-[40px] rounded-[8px] bg-[#D2EBFF] font-semibold">
              J
            </div>
            <div
              className="flex gap-2 items-start cursor-pointer"
              onClick={toggleDropdown}
            >
              <div>
                <h5 className="text-primary font-semibold">John Doe</h5>
                <p className="text-gray text-xs">UX Designer</p>
              </div>
              <img src={Ic_down_arrow} alt="arrow" />
            </div>
          </div>
        </div>
        {isDropdownOpen && (
          <div
            className="absolute right-0 w-60 bg-white border border-primary rounded-[8px] z-50 top-12 p-2"
            ref={dropdownRef}
          >
            <div
              onClick={() => {
                navigate("/profile");
                setIsDropdownOpen(false);
              }}
              className="flex gap-3 items-center py-2 px-3 rounded-[8px] hover:bg-lightChiku cursor-pointer"
            >
              <img src={Ic_profile} alt="profile" />
              <span className="text-primary text-base">My Profile</span>
            </div>
            <div
              onClick={() => {
                navigate("/profile?job-posted");
                setIsDropdownOpen(false);
              }}
              className="flex gap-3 items-center py-2 px-3 rounded-[8px] hover:bg-lightChiku cursor-pointer"
            >
              <img src={Ic_job_applied} alt="profile" />
              <span className="text-primary text-base">Jobs Posted</span>
            </div>
            <div
              onClick={() => {
                navigate("/profile?saved-candidates");
                setIsDropdownOpen(false);
              }}
              className="flex gap-3 items-center py-2 px-3 rounded-[8px] hover:bg-lightChiku cursor-pointer"
            >
              <img src={Ic_saved_jobs} alt="profile" />
              <span className="text-primary text-base">Saved Candidates</span>
            </div>
            <div
              onClick={onLogout}
              className="flex gap-3 items-center py-2 px-3 rounded-[8px] hover:bg-lightChiku cursor-pointer"
            >
              <img src={Ic_logout} alt="profile" />
              <span className="text-primary text-base">Logout</span>
            </div>
          </div>
        )}
        <div className="flex laptop:hidden items-center gap-3">
          <Link to={"/search-job"}>
            <img src={Ic_search} alt="search" />
          </Link>
          <Link
            to={"/profile"}
            className="border-2 border-primary z-50 flex items-center justify-center w-[32px] h-[32px] rounded-[8px] bg-[#D2EBFF] font-semibold"
          >
            J
          </Link>
        </div>
      </div>
      {/* Side Drawer */}
      <div
        style={{
          transition: "transform 1s, box-shadow 1s",
          transform: isDrawerOpen ? "translateY(0)" : "translateY(-100%)",
          // background: isDrawerOpen ? "rgba(0, 0, 0, 0.6)" : "",
        }}
        className={`fixed top-0 left-0 w-full h-screen z-50`}
      >
        <div className="bg-white h-max border-b-2 px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] border-primary">
          <div className="flex items-center justify-between py-2">
            <div className="gap-[12px] flex items-center">
              <Link to={"/"}>
                <div className="flex items-center font-bold text-2xl laptop:text-[28px] big:text-[34px] tracking-wider">
                  <span className="text-primary">ux</span>
                  <img
                    src={HandIcon}
                    alt=""
                    className="pr-[2.25px] ml-[-2.25px] w-[25px] h-[30px] laptop:w-auto laptop:h-auto"
                  />
                  <span className="text-primary">jobsite</span>
                </div>
              </Link>
            </div>
            <button onClick={toggleDrawer} className="text-3xl">
              &times;
            </button>
          </div>
          <div className="flex flex-col items-start font-medium mb-[40px]">
            <Link
              to={"/find-talent"}
              className="text-primary text-lg py-[14px]"
              onClick={toggleDrawer}
            >
              Find Talent
            </Link>
            <Link
              to={"/post-job"}
              className="text-primary text-lg py-[14px]"
              onClick={toggleDrawer}
            >
              Post a Job
            </Link>
            <Link
              to={"/blogs"}
              className="text-primary text-lg py-[14px]"
              onClick={toggleDrawer}
            >
              Blogs
            </Link>
          </div>
          <div className="w-full flex gap-[16px]">
            <Link to="/login" className="w-1/2">
              <ButtonUx
                label="Login"
                buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-6 py-2 h-[40px] text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3 w-full"
              />
            </Link>
            <Link to={"/create-account"} className="w-1/2">
              <ButtonUx
                label="Register"
                buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-[40px] w-full"
              />
            </Link>
          </div>
          <div className="w-full border-t border-gray5 my-4"></div>
          <div className="text-center w-full py-2 mb-6 text-primary text-lg font-medium">
            For Job Seekers
          </div>
        </div>
      </div>
      {searchDivOpen && (
        <>
          <div
            className="absolute top-0 left-0 w-full h-screen bg-[#00000033]"
            style={{
              zIndex: 999999999999999,
            }}
          >
            <div className="bg-white pt-3 pb-8 px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px]">
              <div className="flex items-center font-bold text-2xl laptop:text-[28px] big:text-[34px] tracking-wider mb-6">
                <span className="text-primary">ux</span>
                <img
                  src={HandIcon}
                  alt=""
                  className="pr-[2.25px] ml-[-2.25px] w-[25px] h-[30px] laptop:w-auto laptop:h-auto"
                />
                <span className="text-primary">jobsite</span>
              </div>
              <SearchJob />
            </div>
          </div>
        </>
      )}

      {isConfirmLogout && (
        <Modal
          onClose={() => {
            onLogout();
          }}
          isOpen={true}
        >
          <div className="p-4 md:p-6 desktop:p-8 flex flex-col items-center justify-center gap-4 desktop:gap-8">
            <img src={Img_cancel} alt="image" />

            <h4 className="text-primary font-semibold text-center text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
              Are you Sure you want to Logout?
            </h4>
            <div className="flex items-center pt-[8px] md:pt-[12px] gap-3 md:gap-6">
              <div className="w-full" onClick={onLogout}>
                <ButtonUx
                  label="Yes, Logout"
                  buttonClassName="bg-white font-semibold text-base w-full border-2 border-primary rounded-[8px] px-6 py-2 h-10 lg:h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
                />
              </div>
              <div className="w-full">
                <ButtonUx
                  label="No, Stay"
                  buttonClassName="font-semibold text-primary w-full bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-10 lg:h-12"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
