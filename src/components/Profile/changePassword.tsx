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
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import ButtonUx from "../common/button";
import { useUpdatePasswordApiMutation } from "@/store/slice/apiSlice/profileApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { clearCredentials } from "@/store/slice/auth.slice";

const passwordFormSchema = z
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
    new_password: z
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
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

const ChangePassword: React.FC = () => {
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
  });
  const [handlePassword] = useUpdatePasswordApiMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onPasswordFormSubmit = async (
    data: z.infer<typeof passwordFormSchema>
  ) => {
    const formData = {
      password: data.new_password,
    };
    try {
      const response: any = await handlePassword({
        data: formData,
      });

      if (response) {
        toast.success("Submit successfully", { position: "top-right" });
        // form.reset();

        sessionStorage.removeItem("__ux_jobs_access_token__");
        localStorage.removeItem("__ux_jobs_refresh_token__");
        localStorage.removeItem("role");

        dispatch(clearCredentials());

        navigate("/");
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
  return (
    <div className="lg:shadow-shadow2 rounded-[8px] relative">
      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(onPasswordFormSubmit)}>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-5 w-full p-4 sm:px-5 md:px-8 lg:p-6">
            <div>
              <FormField
                control={passwordForm.control}
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
                        className={`${
                          fieldState.error ? "text-red" : "text-primary"
                        } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                      >
                        Current Password (Min 8 Characters)
                      </p>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter current password"
                            {...field}
                            className={`bg-white rounded-[8px] border-2
                                      ${
                                        fieldState?.error
                                          ? "border-red"
                                          : "border-gray6 hover:border-primary focus:border-[2px] focus:border-primary"
                                      } `}
                            type={isPasswordVisible ? "text" : "password"}
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
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
            <div></div>
            <div>
              <FormField
                control={passwordForm.control}
                name="new_password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <p
                      className={`${
                        fieldState.error ? "text-red" : "text-primary"
                      } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                    >
                      New Password (Min 8 Characters)
                    </p>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter new password"
                          {...field}
                          className={`bg-white rounded-[8px] border-2
                                      ${
                                        fieldState?.error
                                          ? "border-red"
                                          : "border-gray6 hover:border-primary focus:border-[2px] focus:border-primary"
                                      } `}
                          type="password"
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
                control={passwordForm.control}
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
                        className={`${
                          fieldState.error ? "text-red" : "text-primary"
                        } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                      >
                        Confirm Password (Min 8 Characters)
                      </p>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter confirm password"
                            {...field}
                            className={`bg-white rounded-[8px] border-2
                                      ${
                                        fieldState?.error
                                          ? "border-red"
                                          : "border-gray6 hover:border-primary focus:border-[2px] focus:border-primary"
                                      } `}
                            type={isPasswordVisible ? "text" : "password"}
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
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
          <div className="mt-[24px] md:mt-[32px] flex justify-end w-full gap-5 items-center sticky bottom-0 bg-white z-50 shadow-shadow2 p-4">
            <div onClick={() => passwordForm.reset()}>
              <ButtonUx
                label="Cancel"
                buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-8 py-2 h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
              />
            </div>
            <ButtonUx
              label="Save"
              buttonClassName={`text-lg px-8 py-2 w-max h-12 font-semibold border-2 rounded-[8px] ${
                passwordForm.formState.isValid
                  ? "border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 hover:shadow-shadow1"
                  : "border-gray7 bg-[#D8D8D8] text-[#767676]"
              }`}
              type="submit"
              disabled={!passwordForm.formState.isValid}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
