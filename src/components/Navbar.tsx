/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HandIcon from "@/assets/images/handLogo.png";
import Ic_menu from "@/assets/images/Ic_menu.svg";
import Ic_down_arrow from "@/assets/images/Ic_down_arrow.svg";
import ButtonUx from "./common/button";
import Ic_profile from "@/assets/images/Ic_profile.svg";
// import Ic_saved_jobs from "@/assets/images/Ic_saved_jobs.svg";
import Ic_logout from "@/assets/images/Ic_logout.svg";
import Ic_job_applied from "@/assets/images/Ic_job_applied.svg";
import Ic_search from "@/assets/images/Ic_search.svg";
import Img_cancel from "@/assets/images/Img_cancel.png";
import SearchJob from "./searchJob";
import Modal from "./common/modal";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { PHOTO_URL, VITE_PUBLIC_JOB_SEEKER_URL } from "@/config/constant";
import { clearCredentials } from "@/store/slice/auth.slice";

export const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const location = useLocation();
  const currentPath = location.pathname;

  const [hasShadow, setHasShadow] = useState(false);
  const dispatch = useDispatch();
  const [isUserLogin, setIsUserLogin] = useState(false);
  const userDetails = useSelector((state: any) => state.user)?.userDetails;
  const AccessToken = sessionStorage.getItem("__ux_employer_access_");

  useEffect(() => {
    if (userDetails?.verifyEmail === "yes" && AccessToken) {
      setIsUserLogin(true);
    } else {
      setIsUserLogin(false);
    }
  }, [userDetails, AccessToken]);

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
        setSearchDivOpen(false);
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
      navigate(`${location.pathname}?logout`);
      setIsConfirmLogout(true);
      body?.classList.add("overflow-hidden");
      body?.classList.add("h-screen");
    }
  };
  const logout = () => {
    localStorage.removeItem("employer_email");
    dispatch(clearCredentials());
    onLogout();
    toast.success("Logged out successfully", { position: "top-right" });

    navigate("/");
  };
  return (
    <div
      className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] py-2 sticky top-0 bg-white w-full"
      style={{
        zIndex: "999",
        boxShadow:
          currentPath === "/"
            ? hasShadow
              ? "0px 4px 12px 0px #00000014"
              : "none"
            : "0px 4px 12px 0px #00000014",
      }}
    >
      <div className="flex items-center justify-between relative">
        <div
          className={`gap-3 laptop:gap-10 flex items-center ${
            (!isUserLogin || (isUserLogin && currentPath === "/")) &&
            "laptop:w-[57%]"
          } laptop:justify-between`}
        >
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
          {currentPath !== "/create-account" && (
            <div className="hidden laptop:flex items-center gap-6 big:gap-10 font-semibold text-lg laptop:text-xl">
              <Link
                to={"/find-talent"}
                className={`font-medium text-primary hover-underline-animation-navbar hover-underline-animation text-lg border-b-2 border-t-2 ${
                  currentPath === "/find-talent"
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
          )}
        </div>
        {/* Buttons */}
        {isUserLogin ? (
          <>
            <div className="hidden laptop:flex items-center gap-4">
              {currentPath !== "/" && (
                <div
                  className="border h-[40px] rounded-[8px] flex gap-2 py-[10px] px-3 items-center border-gray5 desktop:w-[276px]"
                  onClick={toggleSearchDiv}
                >
                  <img src={Ic_search} alt="search" />{" "}
                  <span className="text-gray text-sm">
                    Search for Skills, Companies
                  </span>
                </div>
              )}
              <div
                className="gap-3 flex cursor-pointer"
                onClick={toggleDropdown}
              >
                <div className="border-2 border-primary overflow-hidden z-50 flex items-center justify-center w-[40px] h-[36px] lg:h-[40px] rounded-[8px] bg-[#D2EBFF] font-semibold">
                  {userDetails?.logo ? (
                    <img
                      src={`${PHOTO_URL}/${userDetails?.logo}`}
                      alt="profile"
                      className="w-full h-full"
                    />
                  ) : (
                    userDetails &&
                    userDetails?.company_name.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="flex gap-2 items-start">
                  <div>
                    <h5 className="text-primary font-semibold">
                      {userDetails && userDetails?.company_name}
                    </h5>
                    <p className="text-gray text-xs">
                      {userDetails && userDetails?.name}
                    </p>
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
                {/* <div
                  onClick={() => {
                    navigate("/profile?saved-candidates");
                    setIsDropdownOpen(false);
                  }}
                  className="flex gap-3 items-center py-2 px-3 rounded-[8px] hover:bg-lightChiku cursor-pointer"
                >
                  <img src={Ic_saved_jobs} alt="profile" />
                  <span className="text-primary text-base">
                    Saved Candidates
                  </span>
                </div> */}
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
              <img src={Ic_search} alt="search" onClick={toggleSearchDiv} />
              <div
                className="border-2 border-primary overflow-hidden z-50 flex items-center justify-center w-[32px] h-[32px] rounded-[8px] bg-[#D2EBFF] font-semibold"
                onClick={toggleDropdown}
              >
                {userDetails?.profile_photo ? (
                  <img
                    src={`${PHOTO_URL}/${userDetails?.profile_photo}`}
                    alt="profile"
                    className="w-full h-full"
                  />
                ) : (
                  userDetails &&
                  userDetails?.company_name.charAt(0).toUpperCase()
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {currentPath === "/create-account" ? (
              <>
                <div className="text-sm md:text-base desktop:text-lg flex gap-2 items-center">
                  <span className="text-gray hidden sm:block">
                    Already Registered?
                  </span>
                  <Link
                    to={"/"}
                    className="text-primary font-semibold flex items-center"
                  >
                    Login <span className="hidden sm:block">&nbsp;Here</span>
                  </Link>
                </div>
              </>
            ) : (
              <div className="hidden laptop:flex items-center gap-4 relative">
                <Link to="/">
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
                <a
                  href={`${VITE_PUBLIC_JOB_SEEKER_URL}`}
                  className="text-primary text-lg font-medium hover-underline-animation-navbar hover-underline-animation"
                >
                  For Job Seekers
                </a>
              </div>
            )}
          </>
        )}

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
            {/* <div
              onClick={() => {
                navigate("/profile?saved-candidates");
                setIsDropdownOpen(false);
              }}
              className="flex gap-3 items-center py-2 px-3 rounded-[8px] hover:bg-lightChiku cursor-pointer"
            >
              <img src={Ic_saved_jobs} alt="profile" />
              <span className="text-primary text-base">Saved Candidates</span>
            </div> */}
            <div
              onClick={onLogout}
              className="flex gap-3 items-center py-2 px-3 rounded-[8px] hover:bg-lightChiku cursor-pointer"
            >
              <img src={Ic_logout} alt="profile" />
              <span className="text-primary text-base">Logout</span>
            </div>
          </div>
        )}
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
        <div className="bg-white h-max border-b-2 px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] border-primary pb-6">
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
          <div className="flex flex-col items-start font-medium">
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
          {!isUserLogin && (
            <>
              <div className="w-full flex gap-[16px] mt-[40px]">
                <Link to="/" className="w-1/2" onClick={toggleDrawer}>
                  <ButtonUx
                    label="Login"
                    buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-6 py-2 h-[40px] text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3 w-full"
                  />
                </Link>
                <Link
                  to={"/create-account"}
                  className="w-1/2"
                  onClick={toggleDrawer}
                >
                  <ButtonUx
                    label="Register"
                    buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-[40px] w-full"
                  />
                </Link>
              </div>
              <div className="w-full border-t border-gray5 my-4"></div>
              <a
                href={`${VITE_PUBLIC_JOB_SEEKER_URL}`}
                className="text-center w-full py-2 mb-6 text-primary text-lg font-medium"
              >
                For Job Seekers
              </a>
            </>
          )}
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
            <div
              className="bg-white pt-3 pb-8 px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px]"
              ref={dropdownRef}
            >
              <div className="flex items-center font-bold text-2xl laptop:text-[28px] big:text-[34px] tracking-wider mb-6">
                <span className="text-primary">ux</span>
                <img
                  src={HandIcon}
                  alt=""
                  className="pr-[2.25px] ml-[-2.25px] w-[25px] h-[30px] laptop:w-auto laptop:h-auto"
                />
                <span className="text-primary">jobsite</span>
              </div>
              <SearchJob onClose={toggleSearchDiv} />
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
              <div className="w-full" onClick={logout}>
                <ButtonUx
                  label="Yes, Logout"
                  buttonClassName="bg-white font-semibold text-base w-full border-2 border-primary rounded-[8px] px-6 py-2 h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
                />
              </div>
              <div className="w-full" onClick={onLogout}>
                <ButtonUx
                  label="No, Stay"
                  buttonClassName="font-semibold text-primary w-full bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-12"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
