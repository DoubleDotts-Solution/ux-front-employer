/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Ic_email from "@/assets/images/Ic_email_black.svg";
import Ic_call from "@/assets/images/Ic_call_black.png";
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
import { TextArea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import ButtonUx from "@/components/common/button";
import { InputMobile } from "@/components/ui/inputMobile";
import Loading from "@/components/common/loading";
import { useCreateContactApiMutation } from "@/store/slice/apiSlice/contactApi";
import { parsePhoneNumber } from "react-phone-number-input";
import { phoneNumberValidations } from "@/config/phoneValidation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  purpose: z.string().min(2, {
    message: "Purpose must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(2, { message: "Email must be at least 2 characters long." }),
  message: z.string().min(2, {
    message: "Message must be at least 10 characters.",
  }),
  mobile_no: z.string().refine(
    (value) => {
      const parsedNumber = parsePhoneNumber(value);
      const countryCode = parsedNumber?.countryCallingCode
        ? `+${parsedNumber.countryCallingCode}`
        : "";
      const phoneNumber = parsedNumber?.nationalNumber || "";

      const validator = phoneNumberValidations[countryCode];
      return validator ? validator(phoneNumber) : false;
    },
    {
      message: "Please enter a valid phone number for the selected country.",
    }
  ),
});

export const ContactUs: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [handleContact, { isLoading }] = useCreateContactApiMutation();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response: any = await handleContact(data);

      if (response && response.data.status === 200) {
        toast.success("Submit successfully", { position: "top-right" });
        form.reset();
      } else {
        toast.error(response.error || "Registration failed", {
          position: "top-right",
        });
        console.error("API error:", response.error);
      }
    } catch (error: any) {
      toast.error("Something Went Wrong!", {
        position: "top-right",
      });
      console.error("Validation error:", error);
    }
  };

  const validForm = form.formState.isValid;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="relative">
      <div className="bg-lightYellow  relative px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-6 md:py-[61px]">
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-primary text-2xl sm:text-3xl md:text-4xl desktop:text-5xl font-semibold desktop:leading-[54px]">
            Contact Us
          </h2>
          <p className="text-gray text-sm md:text-base desktop:text-lg">
            Have questions or need assistance? Reach out to our team for
            support.
          </p>
        </div>
      </div>
      <div className="px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[44px] desktop:py-[72px] flex justify-center">
        <div className="relative inline-block w-full h-max max-w-[692px]">
          <div className="relative bg-white p-4 sm:p-5 lg:p-8 border border-primary z-50 flex flex-col gap-4 md:gap-6 lg:gap-8 shadow-shadow1 rounded-[12px]">
            <h3 className="text-primary text-lg md:text-xl lg:text-[24px] font-semibold">
              Get In Touch With Us
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 lg:gap-6 md:grid md:grid-cols-2">
                  <div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`mb-[6px] lg:mb-2 text-sm lg:text-base ${
                              fieldState?.error ? "text-red" : "text-primary"
                            }`}
                          >
                            Name
                          </p>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Enter your Name"
                                {...field}
                                className={`bg-white border-2 text-primary
                                  ${
                                    fieldState?.error
                                      ? "border-red"
                                      : "border-gray6 hover:border-primary focus:border-[2px] focus:border-primary"
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
                                className={`bg-white text-primary border-2
                                  ${
                                    fieldState?.error
                                      ? "border-red"
                                      : "border-gray6 hover:border-primary focus:border-[2px] focus:border-primary"
                                  } `}
                                type="email"
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
                            className={`mb-[6px] lg:mb-2 text-sm lg:text-base ${
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
                                className={`text-primary border-2
                                  ${
                                    fieldState?.error
                                      ? "border-red"
                                      : "border-gray6 hover:border-primary focus:border-[2px] focus:border-primary focus:bg-lightYellow2 disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-none focus-visible:shadow-none placeholder:text-[#767676] placeholder:text-base lg:placeholder:text-lg"
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
                      name="purpose"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`mb-[6px] lg:mb-2 text-sm lg:text-base ${
                              fieldState?.error ? "text-red" : "text-primary"
                            }`}
                          >
                            Purpose
                          </p>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Enter your purpose"
                                {...field}
                                className={`bg-white text-primary border-2
                                  ${
                                    fieldState?.error
                                      ? "border-red"
                                      : "border-gray6 hover:border-primary focus:border-[2px] focus:border-primary"
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
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`mb-[6px] lg:mb-2 text-sm lg:text-base ${
                              fieldState?.error ? "text-red" : "text-primary"
                            }`}
                          >
                            Message
                          </p>
                          <FormControl>
                            <div className="relative">
                              <TextArea
                                placeholder="Enter the message"
                                {...field}
                                className={`bg-white text-primary
                                  ${
                                    fieldState?.error
                                      ? "border-red"
                                      : "border-gray6 hover:border-primary focus:border-[2px] focus:border-primary"
                                  } border-2 lg:h-[100px]`}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="mt-[24px] flex justify-center">
                  <ButtonUx
                    label="Send Enquiry"
                    buttonClassName={`text-lg px-8 desktop:px-14 py-2 w-max h-12 font-semibold border-2 rounded-[8px] ${
                      validForm
                        ? "border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 hover:shadow-shadow1"
                        : "border-gray7 bg-[#D8D8D8] text-[#767676]"
                    }`}
                    type="submit"
                  />
                </div>
              </form>
            </Form>
            <div className="w-full flex justify-center items-center">
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #ffffff 0%, #c8c8c8 100%)",
                  height: "1px",
                  width: "100%",
                }}
              ></span>
              <span className="text-base text-gray font-semibold bg-white px-[24px] relative z-50">
                or
              </span>
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #C8C8C8 0%, #FFFFFF 100%)",
                  height: "1px",
                  width: "100%",
                }}
              ></span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-[12px] md:gap-[14px]">
                <div className="relative inline-block h-[32px] w-[32px] md:w-[40px] desktop:w-[56px] md:h-[40px] desktop:h-[56px]">
                  <span className="relative h-full w-full rounded-[8px] border border-primary z-50 flex flex-col items-center justify-center hover:shadow-shadow1">
                    <img src={Ic_email} alt="email" className="" />
                  </span>
                </div>
                <div>
                  <h4 className="mb-[2px] text-gray text-base lg:text-lg">
                    Email Us
                  </h4>
                  <p className="text-lg lg:text-xl text-primary font-medium">
                    hello@uxjobsite.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[12px] md:gap-[14px]">
                <div className="relative inline-block h-[32px] w-[32px] md:w-[40px] desktop:w-[56px] md:h-[40px] desktop:h-[56px]">
                  <span className="relative h-full w-full rounded-[8px] border border-primary z-50 flex flex-col items-center justify-center hover:shadow-shadow1">
                    <img src={Ic_call} alt="call" className="" />
                  </span>
                </div>
                <div>
                  <h4 className="mb-[2px] text-gray text-base lg:text-lg">
                    Call Us
                  </h4>
                  <p className="text-lg lg:text-xl text-primary font-medium">
                    +91-8105338000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
