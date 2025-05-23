/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Ic_info from "@/assets/images/Ic_info.svg";
import Ic_valid from "@/assets/images/Ic_valid.png";
import Ic_close_black from "@/assets/images/Ic_close_black.svg";
import ButtonUx from "@/components/common/button";
import { toast } from "react-hot-toast";
import ApiUtils from "@/api/ApiUtils";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(2, { message: "Email must be at least 2 characters long." }),
});

const ForgotPasswordForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [verifyMailBox, setVerifyMailBox] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // setVerifyMailBox(true);
    try {
      const response: any = await ApiUtils.forgotPassword(data);
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
        });
        setVerifyMailBox(true);
      } else {
        toast.error(
          response.error ||
            "We couldn't find an account with that email. Please double-check and try again.",
          {
            position: "top-right",
          }
        );
        console.error("Forgot Password error:", response.error);
      }
    } catch (error: any) {
      toast.error(
        "We couldn't find an account with that email. Please double-check and try again.",
        {
          position: "top-right",
        }
      );
      console.error("Unexpected error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 desktop:gap-[32px] p-5 md:p-8">
        <div className="flex flex-col gap-1 desktop:gap-3">
          <div className="text-primary text-lg sm:text-xl md:text-[20px] desktop:text-[24px] font-semibold">
            Enter your Registered Email ID
          </div>
          <p className="text-sm md:text-base desktop:text-lg text-gray">
            We’ll send you a verification mail to Reset your Password
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
                        className={`mb-[6px] lg:mb-2 text-sm lg:text-base ${
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
                                          : "border-[#777777] hover:border-primary focus:border-[2px] focus:border-primary"
                                      } rounded-[8px]`}
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
            </div>
            <div className="mt-[24px] md:mt-[32px] md:flex md:justify-center w-full relative">
              <ButtonUx
                label="Submit"
                buttonClassName={`text-lg px-8 desktop:px-14 py-2 w-full h-12 font-semibold border-2 rounded-[8px] ${
                  form.formState.isValid
                    ? "border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 hover:shadow-shadow1"
                    : "border-gray7 bg-[#D8D8D8] text-[#767676]"
                }`}
                type="submit"
              />
              {verifyMailBox && (
                <div className="absolute top-7 z-50 flex-col sm:flex-row w-max lg:right-0 desktop:right-[-3rem] big:right-[-6rem] border border-primary rounded-[8px] bg-lightPurple py-2 px-2 desktop:px-4 flex gap-2 lg:gap-4 items-start">
                  <div className="flex items-start gap-3">
                    <img src={Ic_info} alt="info" />
                    <div>
                      <div className="text-primary font-semibold text-sm md:text-base desktop:text-lg mb-1">
                        Verify your Email ID
                      </div>
                      <p className="text-gray text-xs lg:text-sm">
                        Password reset link has been sent to your email.
                        <br /> Please check your inbox and follow the
                        instructions
                        <br /> to reset your password.
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
          </form>
        </Form>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
