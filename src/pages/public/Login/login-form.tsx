/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import google from "@/assets/images/Img_login_google.svg";
import Ic_valid from "@/assets/images/Ic_valid.png";
import { Eye, EyeOff } from "lucide-react";
import ButtonUx from "@/components/common/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ApiUtils from "@/api/ApiUtils";
import { setCredentials } from "@/store/slice/auth.slice";
import { setUserDetails } from "@/store/slice/user.slice";
import { useGoogleLogin } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/config/constant";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(2, { message: "Email must be at least 2 characters long." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/\d/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character.",
    }),
});

const LoginForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const tokenResponse = await ApiUtils.verifyEmailWithTokenKey({
          token: query.get("token") as string,
          key: query.get("key") as string,
        });

        if (tokenResponse.status === 200) {
          const { accessToken, refreshToken } = tokenResponse.data.message;
          if (accessToken && refreshToken) {
            sessionStorage.setItem("__ux_employer_access_", accessToken);
            localStorage.setItem("__ux_employer_refresh_", refreshToken);
          }

          // navigate("/login");
        }
      } catch (error: any) {
        toast.error(error.data.data.message || "Something went wrong!", {
          position: "top-right",
        });
        console.error("Unexpected error:", error);
      }
    };
    if (query.get("token") && query.get("key")) {
      verifyEmail();
    }
  }, [query]);

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response: any = await ApiUtils.authLogin(data);
      if (response.data.accessToken) {
        const { accessToken, refreshToken, user } = response.data;
        dispatch(
          setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
            user,
          })
        );
        localStorage.setItem("employer_email", response.data.user.email);
        if (searchParams.has("applied-job-post")) {
          const appliedJobPostId = searchParams.get("applied-job-post");
          navigate(`/job-details/${appliedJobPostId}`);
        } else {
          navigate("/");
        }

        const userDetails = await ApiUtils.getSingleUser(user.id);

        dispatch(setUserDetails(userDetails?.data));
        toast.success("Login successfully", { position: "top-right" });
      } else {
        toast.error(response.data.message || "Check Email or Password", {
          position: "top-right",
        });

        console.error("API error:", response.error);
      }
    } catch (error: any) {
      toast.error(error.data.message, {
        position: "top-right",
      });

      console.error("Validation error:", error);
    }
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const data: any = await ApiUtils.authGoogleLogin({
        token: response.access_token,
      });

      if (data?.status === 200) {
        const { accessToken, refreshToken, user } = data.data;
        dispatch(
          setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
            user,
          })
        );
        localStorage.setItem("employer_email", user.email);
        if (searchParams.has("applied-job-post")) {
          const appliedJobPostId = searchParams.get("applied-job-post");
          navigate(`/job-details/${appliedJobPostId}`);
        } else {
          navigate("/");
        }

        const userDetails = await ApiUtils.getSingleUser(user.id);

        dispatch(setUserDetails(userDetails?.data));
        toast.success("Login successfully", { position: "top-right" });
      } else {
        toast.error(data.data.message || "Something went Wrong!", {
          position: "top-right",
        });
      }
    } catch (error: any) {
      console.error("Validation error:", error);
      toast.error(error.data.message, {
        position: "top-right",
      });
      if (error.data.message === "User not found. Please register first.") {
        setTimeout(() => {
          navigate("/create-account");
        }, 2000);
      }
      return;
    }
  };

  const handleGoogleLoginError = (error: any) => {
    console.error("Google login error", error);
    toast.error("Google login failed. Please try again.", {
      position: "top-right",
    });
  };

  const googleLoginOptions: any = {
    clientId: GOOGLE_CLIENT_ID,
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginError,
    redirectUri: "http://localhost:5173",
  };

  const googleLogin = useGoogleLogin(googleLoginOptions);
  return (
    <>
      <div className="flex flex-col gap-6 desktop:gap-[32px] p-5 md:p-8">
        <div className="flex flex-col gap-1 desktop:gap-3">
          <h4 className="text-primary text-lg sm:text-xl md:text-[20px] desktop:text-[24px] font-semibold">
            Welcome to UX Jobsite
          </h4>
          <p className="text-sm md:text-base desktop:text-lg text-gray">
            Enter your Email ID and Password to Login
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 lg:gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <p
                        className={`mb-1 lg:mb-2 text-sm lg:text-base ${
                          fieldState?.error ? "text-red" : "text-primary"
                        }`}
                      >
                        Email ID
                      </p>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your email ID"
                            {...field}
                            className={`bg-white
                                      ${
                                        fieldState?.error
                                          ? "border-red"
                                          : "border-[#777777] hover:border-primary focus:border-[3px] focus:border-gray7"
                                      } border-2 rounded-[8px]`}
                            type="email"
                          />
                        </div>
                      </FormControl>
                      {fieldState?.error?.message && (
                        <p
                          className={
                            "text-sm text-destructive text-red flex items-center"
                          }
                        >
                          <img
                            src={Ic_valid}
                            alt="invalid"
                            className="w-4 h-4 mr-2"
                          />
                          <span>{fieldState?.error?.message}</span>
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => {
                      const [isPasswordVisible, setIsPasswordVisible] =
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useState(false);

                      const togglePasswordVisibility = () => {
                        setIsPasswordVisible((prev) => !prev);
                      };

                      return (
                        <FormItem>
                          <p
                            className={`mb-1 lg:mb-2 text-sm lg:text-base ${
                              fieldState?.error ? "text-red" : "text-primary"
                            }`}
                          >
                            Password (Min 8 Characters)
                          </p>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Enter the password"
                                {...field}
                                className={`bg-white
                                      ${
                                        fieldState?.error
                                          ? "border-red"
                                          : "border-[#777777] hover:border-primary focus:border-[3px] focus:border-gray7"
                                      } border-2 rounded-[8px]`}
                                type={isPasswordVisible ? "text" : "password"}
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                aria-label={
                                  isPasswordVisible
                                    ? "Hide password"
                                    : "Show password"
                                }
                              >
                                {isPasswordVisible ? (
                                  <Eye className="text-gray w-[18px]" />
                                ) : (
                                  <EyeOff className="text-gray w-[18px]" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <Link
                    to={"/forgot-password"}
                    className="font-semibold text-primary text-base underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-[24px] md:mt-[32px] md:flex md:justify-center w-full">
              <ButtonUx
                label="Login"
                buttonClassName={`text-lg px-8 desktop:px-14 py-2 w-full h-10 lg:h-12 font-semibold border-2 rounded-[8px] ${
                  form.formState.isValid
                    ? "border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 hover:shadow-shadow1"
                    : "border-gray7 bg-[#D8D8D8] text-[#767676]"
                }`}
                type="submit"
              />
            </div>
          </form>
        </Form>
        <div className="w-full flex justify-center items-center relative">
          <span
            style={{
              background: "linear-gradient(90deg, #ffffff 0%, #c8c8c8 100%)",
              height: "1px",
              width: "100%",
            }}
          ></span>
          <span className="text-base text-primary bg-white px-[24px] relative z-50">
            or
          </span>
          <span
            style={{
              background: "linear-gradient(90deg, #C8C8C8 0%, #FFFFFF 100%)",
              height: "1px",
              width: "100%",
            }}
          ></span>
        </div>
        <div
          className="flex justify-center items-center gap-[10px] md:gap-[20px] rounded-[8px] border border-gray5 p-3 bg-lightChiku2 cursor-pointer"
          onClick={() => googleLogin()}
        >
          <img
            src={google}
            alt="google"
            className="w-[20px] h-[20px] md:w-auto md:h-auto"
          />
          <span className="text-primary font-medium">Continue with Google</span>
        </div>
        <div className="text-gray text-sm md:text-base desktop:text-lg text-center">
          Didn’t Registered?{" "}
          <Link to={"/create-account"} className="text-primary font-semibold">
            Register Here
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
