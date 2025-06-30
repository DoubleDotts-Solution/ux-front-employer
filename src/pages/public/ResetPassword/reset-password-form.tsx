/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";
import ButtonUx from "@/components/common/button";
import Img_subscribe_success from "@/assets/images/Img_subscribe_success.png";
import Modal from "@/components/common/modal";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import ApiUtils from "@/api/ApiUtils";

const formSchema = z
  .object({
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
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

const ResetPasswordForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [successfullyRegister, setSuccessfullyRegister] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const tokenResponse = await ApiUtils.changePasswordWithTokenKey({
          token: query.get("token") as string,
          key: query.get("key") as string,
        });

        if (tokenResponse.status === 200) {
          const { accessToken, refreshToken } = tokenResponse.data.message;
          if (accessToken && refreshToken) {
            sessionStorage.setItem("__ux_employer_access_", accessToken);
            localStorage.setItem("__ux_employer_refresh_", refreshToken);
          }
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response: any = await ApiUtils.resetPassword({
        password: data.password,
      });
      if (response) {
        toast.success("Reset password SuccessFully.", {
          position: "top-right",
        });
        setSuccessfullyRegister(true);
      } else {
        console.error("API error:", response.error);
        toast.error(response.error, {
          position: "top-right",
        });
      }
    } catch (error: any) {
      console.error("Validation error:", error);
      toast.error("Something Went Wrong!", {
        position: "top-right",
      });
    }
  };

  const handleClose = () => {
    setSuccessfullyRegister(false);
  };
  return (
    <>
      <div className="flex flex-col gap-6 desktop:gap-[32px] p-5 md:p-8">
        <div className="flex flex-col gap-1 desktop:gap-3">
          <div className="text-primary text-lg sm:text-xl md:text-[20px] desktop:text-[24px] font-semibold">
            Reset your Password
          </div>
          <p className="text-sm md:text-base desktop:text-lg text-gray">
            Set a New Password for your Account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 lg:gap-6">
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
                          className={`mb-[6px] lg:mb-2 text-sm lg:text-base ${
                            fieldState?.error ? "text-red" : "text-primary"
                          }`}
                        >
                          New Password (Min 8 Characters)
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
                                          : "border-[#777777] hover:border-primary focus:border-[2px] focus:border-primary"
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
                                <EyeOff className="text-gray w-[18px]" />
                              ) : (
                                <Eye className="text-gray w-[18px]" />
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
              <div>
                <FormField
                  control={form.control}
                  name="confirm_password"
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
                          className={`mb-[6px] lg:mb-2 text-sm lg:text-base ${
                            fieldState?.error ? "text-red" : "text-primary"
                          }`}
                        >
                          Confirm Password (Min 8 Characters)
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
                                          : "border-[#777777] hover:border-primary focus:border-[2px] focus:border-primary"
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
                                <EyeOff className="text-gray w-[18px]" />
                              ) : (
                                <Eye className="text-gray w-[18px]" />
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
            </div>
            <div className="mt-[24px] md:mt-[32px] md:flex md:justify-center w-full">
              <ButtonUx
                label="Reset Password"
                buttonClassName={`text-lg px-8 desktop:px-14 py-2 w-full h-12 font-semibold border-2 rounded-[8px] ${
                  form.formState.isValid
                    ? "border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 hover:shadow-shadow1"
                    : "border-gray7 bg-[#D8D8D8] text-[#767676]"
                }`}
                type="submit"
              />
            </div>
          </form>
        </Form>
      </div>
      {successfullyRegister && (
        <Modal onClose={handleClose} isOpen={true}>
          <div className="p-4 md:p-6 desktop:p-8 flex flex-col items-center justify-center gap-4 desktop:gap-8">
            <img src={Img_subscribe_success} alt="image" />
            <div className="text-primary font-semibold text-center text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
              Your Password has been
              <br /> Successfully Rest
            </div>
            <div className="flex items-center gap-5 relative">
              <div onClick={() => setSuccessfullyRegister(false)}>
                <ButtonUx
                  label="Cancel"
                  buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-6 py-2 h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
                />
              </div>
              <div
                onClick={() => {
                  navigate("/");
                  sessionStorage.removeItem("__ux_employer_access_");
                  localStorage.removeItem("__ux_employer_refresh_");
                }}
              >
                <ButtonUx
                  label="Continue"
                  buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-12"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ResetPasswordForm;
