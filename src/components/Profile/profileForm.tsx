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
import { Input } from "../ui/input";
import Ic_trash from "@/assets/images/Ic_trash.svg";
import ButtonUx from "../common/button";
import AutocompleteInput from "../ui/inputLocation";
import Ic_search from "@/assets/images/Ic_search.svg";
import Ic_check_circle from "@/assets/images/Ic_check_circle.svg";
import { TextArea } from "../ui/textarea";
import { InputMobile } from "../ui/inputMobile";
import { PHOTO_URL } from "@/config/constant";
import { useDispatch, useSelector } from "react-redux";
import AutocompleteSearchInput from "../ui/inputSearch";
import {
  useGetDesignationQuery,
  useUpdateProfileApiMutation,
} from "@/store/slice/apiSlice/profileApi";
import ApiUtils from "@/api/ApiUtils";
import { setUserDetails } from "@/store/slice/user.slice";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { parsePhoneNumber } from "react-phone-number-input";
import { phoneNumberValidations } from "@/config/phoneValidation";

const formSchema = z.object({
  company_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  website: z
    .string()
    .min(1, { message: "Profile Link is required." })
    .regex(
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/.*)?$/,
      { message: "Please enter a valid URL." }
    ),
  logo: z.union([
    z
      .instanceof(File)
      .nullable()
      .refine((file) => file === null || file.size <= 10 * 1024 * 1024, {
        message: "File size must be less than 10MB.",
      })
      .optional(),
    z.string().optional(),
  ]),
  country: z.string().min(1, {
    message: "Location must be specified.",
  }),
  description: z.string().max(200, {
    message: "About Company must be at least 200 characters.",
  }),
  name: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(2, { message: "Email must be at least 2 characters long." })
    .optional(),
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
  designation: z.string().min(1, { message: "Designation must be specified." }),
});

const ProfileForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  const userDetails = useSelector((state: any) => state.user)?.userDetails;

  const dispatch = useDispatch();

  const params: any = {
    page: 1,
    limit: 999999999,
    value: "",
  };

  const { data } = useGetDesignationQuery(params);
  const company = (data as any)?.data || [];
  const designationName =
    company && company.length > 0
      ? company.map((company: any) => ({
          label: company.name,
        }))
      : [];

  useEffect(() => {
    if (!userDetails) return;

    const fieldsToSet = [
      { key: "company_name", value: userDetails.company_name },
      { key: "website", value: userDetails.website },
      { key: "country", value: userDetails.country },
      { key: "description", value: userDetails.description },
      { key: "logo", value: userDetails.logo },
      { key: "designation", value: userDetails.designation?.name },
      { key: "mobile_no", value: userDetails.mobile_no },
      { key: "name", value: userDetails.name },
      { key: "email", value: userDetails.email },
    ];

    fieldsToSet.forEach(({ key, value }) => {
      if (value) {
        form.setValue(key as any, value);
      }
    });

    form.trigger();
  }, [userDetails]);

  const [handleProfile] = useUpdateProfileApiMutation();

  const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.website && !/^https?:\/\//i.test(data.website)) {
      data.website = `https://${data.website}`;
    }

    const designationValue = company.find((a: any) => {
      return a.name === data.designation;
    })?.id;
    const formData = new FormData();
    if (data.email) {
      formData.append("email", data.email);
    }
    if (data.company_name) {
      formData.append("company_name", data.company_name);
    }
    if (data.country) {
      formData.append("country", data.country);
    }
    if (data.description) {
      formData.append("description", data.description);
    }
    if (data.designation) {
      formData.append("designation", designationValue);
    }
    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.mobile_no) {
      formData.append("mobile_no", data.mobile_no);
    }
    if (data.website) {
      formData.append("website", data.website);
    }
    if (data.logo) {
      formData.append("logo", data.logo);
    } else if (data.logo === null) {
      formData.append("logo", "null");
    }

    try {
      const response: any = await handleProfile({
        data: formData,
        id: userDetails?.id,
      });

      if (response && response.data.status === 200) {
        toast.success("Submit successfully", { position: "top-right" });
        // form.reset();
        const userDetail = await ApiUtils.getSingleUser(userDetails?.id);
        dispatch(setUserDetails(userDetail.data));
      } else {
        toast.error(response.error, {
          position: "top-right",
        });
        console.error("API error:", response.error);
      }
    } catch (error: any) {
      console.error("Validation error:", error);
      toast.error("Something Went Wrong!", {
        position: "top-right",
      });
    }
  };
  const [imageUrl, setImageUrl] = React.useState<any | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      form.setValue("logo", files[0]);
      setImageUrl(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const [charCount, setCharCount] = useState(0);
  const maxChars = 200;

  const handleResetAndSubmit = () => {
    form.setValue("logo", null);
    setImageUrl(null);

    form.handleSubmit(onFormSubmit)();
  };

  return (
    <div className="lg:shadow-shadow2 rounded-[8px] relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <div className="p-4 sm:px-5 md:px-8 lg:p-6">
            <div>
              <h4 className="text-primary text-lg sm:text-xl md:text-[20px] desktop:text-[24px] font-semibold mb-3 desktop:mb-5">
                Company Details
              </h4>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-5 desktop:gap-6 w-full">
                <div>
                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <p
                          className={`${
                            fieldState.error ? "text-red" : "text-primary"
                          } mb-1 text-sm lg:text-base`}
                        >
                          Company Name
                        </p>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter Company Name"
                              {...field}
                              className={`bg-white rounded-[8px] border-2 text-primary
                                          ${
                                            fieldState?.error
                                              ? "border-red"
                                              : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
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
                                              : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
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
                <div className="flex items-center gap-6">
                  <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] desktop:w-[78px] desktop:h-[78px] border-2 border-primary bg-[#D2EBFF] rounded-[8px] flex items-center justify-center text-primary font-semibold text-xl md:text-2xl desktop:text-[2rem]">
                    {imageUrl ? (
                      <img
                        src={URL.createObjectURL(imageUrl)}
                        alt="image"
                        className="h-full w-full"
                      />
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span
                      className="flex items-center gap-2 text-sm lg:text-base font-semibold text-primary cursor-pointer py-2 px-6 border-2 border-primary rounded-[8px]"
                      onClick={handleClick}
                    >
                      Upload Profile Photo
                    </span>
                    {(userDetails?.logo || imageUrl) && (
                      <span
                        className="flex items-center gap-1 text-xs lg:text-sm w-max font-medium text-red cursor-pointer"
                        onClick={handleResetAndSubmit}
                      >
                        <img src={Ic_trash} alt="delete" /> Remove
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    name="logo"
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <p
                          className={`${
                            fieldState.error ? "text-red" : "text-primary"
                          } mb-1 text-sm lg:text-base`}
                        >
                          Company Location
                        </p>
                        <FormControl>
                          <div className="relative">
                            <AutocompleteInput
                              value={field.value || ""}
                              onChange={(newValue) => field.onChange(newValue)}
                              placeholder="Choose Location"
                              className={`bg-white ${
                                fieldState.error
                                  ? "border-red"
                                  : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                              } text-base text-primary border-2 rounded-[8px]`}
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
                    name="description"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <p
                          className={`${
                            fieldState.error ? "text-red" : "text-primary"
                          } mb-1 lg:mb-2 text-sm lg:text-base`}
                        >
                          About the Company
                        </p>
                        <FormControl>
                          <div className="relative">
                            <TextArea
                              placeholder="Enter About Company"
                              {...field}
                              className={`bg-white  
                                  ${
                                    fieldState?.error
                                      ? "border-red"
                                      : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                  } border-2 rounded-[8px] lg:h-[100px]`}
                              onChange={(e) => {
                                let inputValue = e.target.value;

                                if (inputValue.length > maxChars) {
                                  inputValue = inputValue.slice(0, maxChars);
                                }

                                setCharCount(inputValue.length);
                                field.onChange(inputValue);
                              }}
                              value={field.value || ""}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-primary text-sm text-right mt-1">
                    {charCount}/{maxChars}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray5 w-full my-4 md:my-5 desktop:my-6 h-[1px]"></div>
            <div>
              <h4 className="text-primary text-lg sm:text-xl md:text-[20px] desktop:text-[24px] font-semibold mb-3 desktop:mb-5">
                Contact Person Details
              </h4>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-5 desktop:gap-6 w-full">
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <p
                          className={`${
                            fieldState.error ? "text-red" : "text-primary"
                          } mb-1 text-sm lg:text-base`}
                        >
                          Full Name
                        </p>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter Full Name"
                              {...field}
                              className={`bg-white rounded-[8px] border-2 text-primary
                                          ${
                                            fieldState?.error
                                              ? "border-red"
                                              : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
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
                    name="designation"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <p
                          className={`${
                            fieldState.error ? "text-red" : "text-primary"
                          } mb-1 text-sm lg:text-base`}
                        >
                          Designation
                        </p>
                        <FormControl>
                          <div className="relative">
                            <AutocompleteSearchInput
                              value={field.value || ""}
                              onChange={(newValue) => {
                                field.onChange(newValue);
                              }}
                              options={designationName}
                              placeholder="Type to Search"
                              className={`${
                                fieldState.error ? "border-red" : ""
                              } text-base text-primary border-2 rounded-[8px] pl-8 lg:pl-9 bg-white border-gray7 hover:border-primary focus:border-[2px] focus:border-primary`}
                            />
                            <img
                              src={Ic_search}
                              alt="search"
                              className="absolute top-[8px] lg:top-[13px] left-[8px] lg:left-[12px]"
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
                          className={`${
                            fieldState.error ? "text-red" : "text-primary"
                          } mb-1 text-sm lg:text-base`}
                        >
                          Work Email Id
                        </p>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Enter your email ID"
                              {...field}
                              className={`bg-white rounded-[8px] border-2 text-primary
                                ${
                                  fieldState?.error
                                    ? "border-red"
                                    : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                } `}
                              type="email"
                            />
                            <img
                              src={Ic_check_circle}
                              alt="icon"
                              className="absolute top-[8px] lg:top-[12px] right-[8px] lg:right-[12px]"
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
                          className={`${
                            fieldState.error ? "text-red" : "text-primary"
                          } mb-1 text-sm lg:text-base`}
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
                                          : "border-[#777777] hover:border-primary focus:border-[2px] focus:border-primary"
                                      } border-2 rounded-[8px]`}
                              type="tel"
                            />
                            {userDetails?.verifyOtp === "yes" ? (
                              <img
                                src={Ic_check_circle}
                                alt="icon"
                                className="absolute top-[8px] lg:top-[12px] right-[8px] lg:right-[12px]"
                              />
                            ) : (
                              <Link
                                to={"/verify-otp"}
                                className="text-primary text-sm font-semibold absolute top-[10px] lg:top-[14px] right-[8px] lg:right-[12px]"
                                onClick={() => {
                                  localStorage.setItem(
                                    "triggerResendOTP",
                                    "true"
                                  );
                                }}
                              >
                                Verify
                              </Link>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[24px] md:mt-[32px] flex justify-end w-full gap-5 items-center sticky bottom-0 bg-white shadow-shadow2 p-4">
            <div onClick={() => form.reset()}>
              <ButtonUx
                label="Cancel"
                buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-8 py-2 h-10 lg:h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
              />
            </div>
            <ButtonUx
              label="Save"
              buttonClassName={`text-lg px-8 py-2 w-max h-10 lg:h-12 font-semibold border-2 rounded-[8px] ${
                form.formState.isValid
                  ? "border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 hover:shadow-shadow1"
                  : "border-gray7 bg-[#D8D8D8] text-[#767676]"
              }`}
              type="submit"
              disabled={!form.formState.isValid}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
