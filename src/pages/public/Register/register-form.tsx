/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
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
import google from "@/assets/images/Img_login_google.svg";
import Ic_info from "@/assets/images/Ic_info.svg";
import Ic_valid from "@/assets/images/Ic_valid.png";
import Ic_close_black from "@/assets/images/Ic_close_black.svg";
import { Eye, EyeOff } from "lucide-react";
import ButtonUx from "@/components/common/button";
import { InputMobile } from "@/components/ui/inputMobile";
import { Link } from "react-router-dom";
import Img_subscribe_success from "@/assets/images/Img_subscribe_success.png";
import Modal from "@/components/common/modal";
import ApiUtils from "@/api/ApiUtils";
import { setCredentials } from "@/store/slice/auth.slice";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/store/slice/user.slice";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  website: z
    .string()
    .min(1, { message: "Website Link is required." })
    .url({ message: "Please enter a valid URL." }),
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
  mobile_no: z
    .string()
    .min(10, { message: "Please enter a valid phone number." })
    .regex(/^\+?\d{1,4}?\s?\d{1,14}$/, {
      message: "Please enter a valid phone number.",
    }),
  company_name: z.string().min(2, {
    message: "Job Title must be at least 2 characters.",
  }),
  logo: z.union([z.literal(null), z.string()]),
  country: z.union([z.literal(null), z.string()]),
  description: z.union([z.literal(null), z.string()]),
});

const RegisterForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [verifyMailBox, setVerifyMailBox] = useState(false);
  const [successfullyRegister, setSuccessfullyRegister] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // setSuccessfullyRegister(true);

    try {
      const response: any = await ApiUtils.authRegister(data);

      if (response) {
        const { accessToken, refreshToken, user } = response.data;
        dispatch(
          setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
            user,
          })
        );
        localStorage.setItem("employer_email", response.data.user.email);
        const userDetails = await ApiUtils.getSingleUser(user.id);

        dispatch(setUserDetails(userDetails?.data));
        setVerifyMailBox(true);
        toast.success("Register successfully", { position: "top-right" });
      } else {
        toast.error(response.error || "Registration failed", {
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

  const handleClose = () => {
    setSuccessfullyRegister(false);
  };

  return (
    <>
      <div className="flex flex-col gap-6 desktop:gap-[32px] p-5 md:p-8">
        <div className="flex flex-col gap-1 desktop:gap-3">
          <h4 className="text-primary text-lg sm:text-xl md:text-[20px] desktop:text-[24px] font-semibold">
            Create your UX Jobsite Profile
          </h4>
          <p className="text-sm md:text-base desktop:text-lg text-gray">
            Search & apply to jobs from Worlds No.1 UX Job Site
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-3 lg:gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <p
                        className={`mb-1 lg:mb-2 text-sm lg:text-base ${
                          fieldState?.error ? "text-red" : "text-primary"
                        }`}
                      >
                        Full Name
                      </p>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your Name"
                            {...field}
                            className={`bg-white
                                      ${
                                        fieldState?.error
                                          ? "border-red"
                                          : "border-[#777777] hover:border-primary focus:border-[3px] focus:border-gray7"
                                      } border-2 rounded-[8px]`}
                            type="text"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        Work Email ID
                      </p>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your Work Email ID"
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
              <div>
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <p
                        className={`mb-1 lg:mb-2 text-sm lg:text-base ${
                          fieldState?.error ? "text-red" : "text-primary"
                        }`}
                      >
                        Company Name
                      </p>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter Company Name"
                            {...field}
                            className={`bg-white
                                      ${
                                        fieldState?.error
                                          ? "border-red"
                                          : "border-[#777777] hover:border-primary focus:border-[3px] focus:border-gray7"
                                      } border-2 rounded-[8px]`}
                            type="text"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <p
                        className={`${
                          fieldState.error ? "text-red" : "text-primary"
                        } mb-1 text-sm lg:text-base`}
                      >
                        Company Website Link
                      </p>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter Company Website Link"
                            {...field}
                            className={`bg-white rounded-[8px] border-2 text-primary
                                          ${
                                            fieldState?.error
                                              ? "border-red"
                                              : "border-gray7 hover:border-primary focus:border-[3px] focus:border-gray7"
                                          } `}
                            type="text"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="mobile_no"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <p
                        className={`mb-1 lg:mb-2 text-sm lg:text-base ${
                          fieldState?.error ? "text-red" : "text-primary"
                        }`}
                      >
                        Mobile Number
                      </p>
                      <FormControl>
                        <div className="relative">
                          <InputMobile
                            placeholder="Enter your Mobile Number"
                            {...field}
                            className={`bg-white
                                      ${
                                        fieldState?.error
                                          ? "border-red"
                                          : "border-[#777777] hover:border-primary focus:border-[3px] focus:border-gray7"
                                      } border-2 rounded-[8px]`}
                            type="tel"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              <div className="col-span-2 text-primary text-sm">
                By registering, you agree to our{" "}
                <Link to={"/terms-condition"} className="font-semibold">
                  terms and conditions
                </Link>{" "}
                and{" "}
                <Link to={"/privacy-policy"} className="font-semibold">
                  privacy policy
                </Link>
                .
              </div>
              <div style={{ display: "none" }}>
                <input
                  type="text"
                  value=""
                  {...form.register("logo", { setValueAs: () => null })}
                />
              </div>
              <div style={{ display: "none" }}>
                <input
                  type="text"
                  value=""
                  {...form.register("country", { setValueAs: () => null })}
                />
              </div>
              <div style={{ display: "none" }}>
                <input
                  type="text"
                  value=""
                  {...form.register("description", { setValueAs: () => null })}
                />
              </div>
            </div>
            <div className="mt-[24px] md:mt-[32px] md:flex md:justify-center w-full">
              <ButtonUx
                label="Register"
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
          {verifyMailBox && (
            <div className="absolute top-6 z-50 flex-col sm:flex-row w-max lg:right-0 desktop:right-[-3rem] big:right-[-6rem] border border-primary rounded-[8px] bg-lightPurple py-2 px-2 desktop:px-4 flex gap-2 lg:gap-4 items-start">
              <div className="flex items-start gap-3">
                <img src={Ic_info} alt="info" />
                <div>
                  <h4 className="text-primary font-semibold text-sm md:text-base desktop:text-lg mb-1">
                    Verify your Email ID
                  </h4>
                  <p className="text-gray text-xs lg:text-sm">
                    We have sent you verification mail. Please verify <br />{" "}
                    that to continue
                  </p>
                </div>
              </div>
              <div
                className="text-primary font-medium text-sm cursor-pointer"
                onClick={() =>
                  window.open("https://mail.google.com/mail/", "_blank")
                }
              >
                Go to Mail
              </div>

              <img
                src={Ic_close_black}
                alt="close"
                className="cursor-pointer absolute sm:relative right-[12px] sm:right-auto"
                onClick={() => {
                  setVerifyMailBox(false);
                }}
              />
            </div>
          )}
        </div>
        <div className="flex justify-center items-center gap-[10px] md:gap-[20px] rounded-[8px] border border-gray5 p-3 bg-lightChiku2 cursor-pointer">
          <img
            src={google}
            alt="google"
            className="w-[20px] h-[20px] md:w-auto md:h-auto"
          />
          <span className="text-primary font-medium">Continue with Google</span>
        </div>
      </div>
      {successfullyRegister && (
        <Modal onClose={handleClose} isOpen={true}>
          <div className="p-4 md:p-6 desktop:p-8 flex flex-col items-center justify-center gap-4 desktop:gap-8">
            <img src={Img_subscribe_success} alt="image" />
            <h4 className="text-primary font-semibold text-center text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
              You are Successfully Register <br /> with us
            </h4>
            <div className="flex items-center gap-5 relative">
              <ButtonUx
                label="Cancel"
                buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-6 py-2 h-10 lg:h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
              />
              <ButtonUx
                label="Continue"
                buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-10 lg:h-12"
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RegisterForm;
