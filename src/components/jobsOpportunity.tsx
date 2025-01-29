/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Ic_sparkle from "@/assets/images/Ic_sparkle.svg";
import Img__dream_job from "@/assets/images/Img__dream_job.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Img_subscribe_success from "@/assets/images/Img_subscribe_success.png";
import { toast } from "react-hot-toast";
import ButtonUx from "./common/button";
import { useCreateSubscribeApiMutation } from "@/store/slice/apiSlice/subscribeApi";

const JobsOpportunity: React.FC = () => {
  const subScribeFormSchema = z.object({
    email: z
      .string()
      .min(2, { message: "Email must be at least 2 characters." })
      .email({ message: "Please enter a valid email address." }),
    is_subscribe: z.literal("yes"),
  });
  const subScribeForm = useForm({
    resolver: zodResolver(subScribeFormSchema),
    defaultValues: {
      email: "",
      is_subscribe: "yes",
    },
  });

  // ---pop-up----
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popup = useRef<HTMLDivElement>(null);
  const body = document.querySelector("body");
  const [createSubscribe] = useCreateSubscribeApiMutation();

  const handleTogglePopup = () => {
    if (isPopupVisible) {
      setTimeout(() => {
        setPopupVisible(false);
        body?.classList.remove("overflow-hidden");
        body?.classList.remove("h-screen");
      }, 300);
    } else {
      setPopupVisible(true);
      body?.classList.add("overflow-hidden");
      body?.classList.add("h-screen");

      // Automatically close popup after 2 seconds
      setTimeout(() => {
        setPopupVisible(false);
        body?.classList.remove("overflow-hidden");
        body?.classList.remove("h-screen");
      }, 2000);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popup.current && !popup.current.contains(event.target as Node)) {
        setPopupVisible(false);
        body?.classList.remove("overflow-hidden");
        body?.classList.remove("h-screen");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubScribeFormSubmit = async (data: unknown) => {
    try {
      const response = await createSubscribe({ data: data }).unwrap();

      if (response.status === 200) {
        handleTogglePopup();
        toast.success("Subscribe successfully", { position: "top-right" });
        subScribeForm.reset();
      } else {
        toast.error(response.error || "Registration failed", {
          position: "top-right",
        });
        console.error("API error:", response.error);
      }
    } catch (error: any) {
      toast.error(
        "This email address is already subscribed to our newsletter.",
        {
          position: "top-right",
        }
      );
      console.error("Validation error:", error);
    }
  };

  const validSubScribeForm = subScribeForm.formState.isValid;
  return (
    <>
      {/* --- */}
      <div className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[48px] relative z-30">
        <span className="relative inline-block w-full">
          <div className="relative bg-black3 p-4 desktop:p-10 text-7xl rounded-[20px] z-50 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 desktop:gap-14 w-full">
            <div className="bg-purple2 pl-[20px] py-[12px] sm:py-[20px] sm:pl-[28px] md:pl-[36px] desktop:pl-8 big:pl-10 desktop:pr-[50px] w-full rounded-[8px] md:rounded-2xl flex justify-between xBig:gap-6 items-center">
              <h2 className="text-primary font-semibold text-[2rem] leading-[35.2px] sm:leading-[40px] md:leading-[48px] md:text-[2.5rem] desktop:text-[48px] desktop:leading-[60px]">
                Land on your dream job
              </h2>
              <img
                src={Img__dream_job}
                alt="icon"
                className="w-[135px] sm:w-[200px] lg:w-[336px] big:w-[53%] xBig:w-auto"
              />
            </div>
            <div className="w-full">
              <h3 className="text-white font-semibold text-[32px] leading-[35.2px] md:text-4xl desktop:text-[40px] mb-1.5 desktop:mb-3 desktop:leading-[48px] flex flex-wrap">
                Never Miss a Job&nbsp;
                <span className="relative abc flex items-center gap-[12px] w-max">
                  Opportunity
                  <img src={Ic_sparkle} alt="icon" />
                </span>
              </h3>
              <p className="desktop:leading-9 text-gray3 text-lg lg:text-xl desktop:text-2xl mb-5 desktop:mb-10">
                Subscribe for Weekly Updates on New Roles and Industry Trends
              </p>
              <Form {...subScribeForm}>
                <form
                  onSubmit={subScribeForm.handleSubmit(onSubScribeFormSubmit)}
                  className="flex flex-col md:flex-row gap-3 md:gap-6 h-max"
                >
                  <div className="w-full">
                    <FormField
                      control={subScribeForm.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Enter Your Email Address"
                                {...field}
                                className={`bg-transparent text-primary bg-white border-2 placeholder:text-gray8
                                  ${
                                    fieldState?.error
                                      ? "border-red"
                                      : "border-gray"
                                  } `}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div style={{ display: "none" }}>
                    <Input
                      type="text"
                      value="yes"
                      {...subScribeForm.register("is_subscribe")}
                    />
                  </div>
                  <ButtonUx
                    label="Subscribe"
                    buttonClassName={`text-lg px-8 py-2 w-full md:w-max h-12 font-semibold border-2 rounded-[8px] ${
                      validSubScribeForm
                        ? "border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 hover:shadow-shadow1"
                        : "border-gray7 bg-[#D8D8D8] text-[#767676]"
                    }`}
                    type="submit"
                  />
                </form>
              </Form>
            </div>
          </div>
          <span
            className={`absolute bottom-[-6px] left-[6px] h-full p-10 w-full rounded-[20px] border-2 border-primary z-40 transition-colors bg-transparent`}
          ></span>
        </span>
      </div>

      {isPopupVisible && (
        <div
          className={`fixed inset-0 flex justify-center items-center`}
          style={{
            boxShadow: "0px 7px 14px 0px #080F3408",
            background: "#00000099",
            zIndex: "9999",
          }}
        >
          <div
            className="bg-white relative rounded-xl shadow-lg p-4 md:p-6 lg:p-8 flex flex-col items-center mx-[16px] sm:mx-[20px] md:m-0 w-full max-w-[518px]"
            ref={popup}
          >
            <img
              src={Img_subscribe_success}
              alt="success"
              className="w-[100px] md:w-[125px] desktop:w-auto"
            />
            <h4 className="mt-6 mb-1 text-primary text-lg sm:text-xl md:text-[20px] desktop:text-[24px] font-semibold text-center desktop:leading-[2rem]">
              You have Successfully Subscribed to our Newsletter!{" "}
            </h4>
            <p className="text-gray text-sm md:text-base desktop:text-lg text-center">
              Thank you! Stay tuned for top UX job alerts and updates.{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default JobsOpportunity;
