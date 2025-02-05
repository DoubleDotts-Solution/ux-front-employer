/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Ic_search from "@/assets/images/Ic_search.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Ic_briefcase from "@/assets/images/Ic_briefcase.svg";
import Ic_layout_grid from "@/assets/images/Ic_layout_grid.svg";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonUx from "@/components/common/button";
import MultiSelectAutoSuggestions from "@/components/ui/multiSelectAutoSuggest";
import Ic_info_circle_black from "@/assets/images/Ic_info_circle_black.svg";
import QuillRichEditor from "@/components/ui/editor";
import Ic_close from "@/assets/images/Ic_close_black.svg";
import { TextArea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import Ic_location from "@/assets/images/Ic_location.svg";
import Ic_experience from "@/assets/images/Ic_experience.svg";
import Ic_time from "@/assets/images/Ic_time.svg";
import Ic_rupee from "@/assets/images/Ic_rupee.svg";
import Img_cancel from "@/assets/images/Img_cancel.png";
import Img_subscribe_success from "@/assets/images/Img_subscribe_success.png";
import Modal from "@/components/common/modal";
import { useGetCategoryQuery } from "@/store/slice/apiSlice/categoryApi";
import {
  useCreateJobApiMutation,
  useGetJobTypeQuery,
  useUpdateJobApiMutation,
} from "@/store/slice/apiSlice/jobsApi";
import { useGetCurrencyQuery } from "@/store/slice/apiSlice/currencyApi";
import { useGetPayTypeQuery } from "@/store/slice/apiSlice/payTypeApi";
import { useGetApplyByQuery } from "@/store/slice/apiSlice/applyByApi";
import {
  useGetSkillsQuery,
  useSingleJobDataMutation,
} from "@/store/slice/apiSlice/profileApi";
import { useSelector } from "react-redux";
import { PHOTO_URL } from "@/config/constant";
import JobTagsDisplay from "@/components/jobsTagDisplay";
import MultiSelectAutoSuggestionsSkills from "@/components/ui/multiSelectAutoSuggestSkills";

const ExperienceArray = [
  { name: "Fresher (Less then 1 Year)" },
  { name: "1 year" },
  { name: "2 years" },
  { name: "3 years" },
  { name: "4 years" },
  { name: "5 years" },
  { name: "6 years" },
  { name: "7 years" },
];
interface Option {
  value: string;
  label: string;
}
interface Option2 {
  value: number;
  label: string;
}

export const PostJobForm: React.FC = () => {
  const [isJobPreviewPopupVisible, setJobPreviewPopupVisible] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const userDetails = useSelector((state: any) => state.user)?.userDetails;

  const params: any = {
    page: 1,
    limit: 999999999999999,
    value: "",
  };
  const [singleJobData] = useSingleJobDataMutation();
  const id = Number(location.pathname.match(/\/edit-job\/(\d+)/)?.[1]);
  const [selectedApplyBy, setSelectedApplyBy] = useState("");

  const { data: SalaryCurrencyData } = useGetCurrencyQuery(params);
  const SalaryCurrencyName = (SalaryCurrencyData as any)?.data || [];

  const SalaryCurrencyArray: Option[] =
    SalaryCurrencyName && SalaryCurrencyName.length > 0
      ? SalaryCurrencyName.map(
          (data: { name: string; symbol: string; id: number }) => ({
            value: data.id,
            label: `${data.name} (${data.symbol})`,
          })
        )
      : [];

  const mapDataToOptions = (data: any[]) =>
    data && data.length > 0
      ? data.map((item: { id: number; name: string }) => ({
          value: item.id,
          label: item.name,
        }))
      : [];

  const { data: category } = useGetCategoryQuery(params);
  const categoryName = (category as any)?.data || [];
  const categoryArray: any = mapDataToOptions(categoryName);

  const { data: jobTypeData } = useGetJobTypeQuery(params);
  const jobTypeName = (jobTypeData as any)?.data || [];
  const jobTypeArray: any = mapDataToOptions(jobTypeName);

  const { data: PayTypeData } = useGetPayTypeQuery(params);
  const PayTypeName = (PayTypeData as any)?.data || [];
  const payTypeArray: any = mapDataToOptions(PayTypeName);

  const { data: ApplyByData } = useGetApplyByQuery(params);
  const ApplyByName = (ApplyByData as any)?.data || [];
  const applyByArray: any = mapDataToOptions(ApplyByName);

  const { data: skills } = useGetSkillsQuery(params);
  const skillsName = (skills as any)?.data || [];
  const options: Option2[] = mapDataToOptions(skillsName);

  const formSchema = z
    .object({
      job_title: z.string().min(2, {
        message: "Job Title must be at least 2 characters.",
      }),
      category: z.number().min(1, {
        message: "Category must be specified.",
      }),
      job_type: z.number().min(1, {
        message: "Job type must be specified.",
      }),
      job_experience: z.string().min(2, {
        message: "Job Experience must be at least 2 characters.",
      }),
      location: z.array(z.string()).nonempty({
        message: "At least one location must be selected.",
      }),
      work_place_type: z.string().min(1, {
        message: "Please select a workplace type.",
      }),
      description: z
        .string()
        .min(10, "Job description must be at least 10 characters.")
        .nonempty("Description is required."),
      skills: z.array(z.number()).nonempty({
        message: "At least one skill must be selected.",
      }),
      minimum_pay: z.number().min(0, {
        message: "Minimum pay must be at least 0",
      }),
      maximum_pay: z.number().min(0, {
        message: "Maximum pay must be at least 0",
      }),
      currency: z.number().min(1, { message: "Currency must be specified." }),
      pay_type: z.number().min(1, {
        message: "Pay Type must be specified.",
      }),
      apply_by: z.number().min(1, {
        message: "Apply by must be specified.",
      }),
      apply_text: z.string().min(1, { message: "Apply text is required." }),
    })
    .superRefine((data, ctx: any) => {
      const selectedApplyByName = ApplyByName.find(
        (job: any) => job.id === data.apply_by
      )?.name;

      if (
        selectedApplyByName === "Link" &&
        !z
          .string()
          .regex(
            /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/.*)?$/,
            { message: "Please enter a valid URL." }
          )
          .safeParse(data.apply_text).success
      ) {
        ctx.addIssue({
          path: ["apply_text"],
          message: "Please provide a valid URL.",
        });
      }

      if (
        selectedApplyByName === "Email ID" &&
        !z.string().email().safeParse(data.apply_text).success
      ) {
        ctx.addIssue({
          path: ["apply_text"],
          message: "Please provide a valid email.",
        });
      }

      if (
        selectedApplyByName === "Directly Submitting Resume" &&
        !z.string().min(2).safeParse(data.apply_text).success
      ) {
        ctx.addIssue({
          path: ["apply_text"],
          message: "Please provide some instructions.",
        });
      }

      if (data.minimum_pay > data.maximum_pay) {
        ctx.addIssue({
          path: ["minimum_pay"],
          message: "Minimum pay must not be greater than maximum pay.",
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await singleJobData({ id: id });

      if (response && response.data.status === 200) {
        const data = response.data.data;

        if (!form.getValues("job_title")) {
          form.setValue("job_title", data?.job_title);
        }
        if (!form.getValues("category")) {
          form.setValue("category", data?.category?.id);
        }
        if (data?.location) {
          const str = data?.location;
          const locations = str
            .split("', '")
            .map((item: any) => item.replace(/'/g, ""));
          if (locations.length > 0 && !form.getValues("location")) {
            form.setValue("location", locations);
          }
        }
        if (!form.getValues("job_experience")) {
          form.setValue("job_experience", data?.job_experience);
        }
        if (!form.getValues("job_type")) {
          form.setValue("job_type", data?.job_type?.id);
        }
        if (!form.getValues("work_place_type")) {
          form.setValue("work_place_type", data?.work_place_type);
        }
        if (!form.getValues("description")) {
          form.setValue("description", data?.description);
        }
        const skillIds = data?.skills.map((skill: any) => Number(skill.id));
        if (!form.getValues("skills")) {
          form.setValue("skills", skillIds);
        }
        if (!form.getValues("currency")) {
          form.setValue("currency", data?.currency?.id);
        }
        if (!form.getValues("pay_type")) {
          form.setValue("pay_type", data?.pay_type?.id);
        }
        if (!form.getValues("apply_by")) {
          form.setValue("apply_by", data?.apply_by?.id);
          setSelectedApplyBy(data?.apply_by?.name);
        }
        if (!form.getValues("minimum_pay")) {
          form.setValue("minimum_pay", Number(data?.minimum_pay));
        }
        if (!form.getValues("maximum_pay")) {
          form.setValue("maximum_pay", Number(data?.maximum_pay));
        }
        if (!form.getValues("apply_text")) {
          form.setValue("apply_text", data?.apply_text);
        }

        form.clearErrors();
        form.trigger();

        setIsDataFetched(true);
      } else {
        console.error("API error:", response.error);
      }
    };

    if (
      id &&
      jobTypeArray.length &&
      categoryArray.length &&
      applyByArray.length &&
      SalaryCurrencyArray.length &&
      payTypeArray.length &&
      !isDataFetched
    ) {
      fetchData();
    }
  }, [
    id,
    jobTypeArray.length,
    categoryArray.length,
    applyByArray.length,
    SalaryCurrencyArray.length,
    payTypeArray.length,
    isDataFetched,
    singleJobData,
    form,
  ]);

  const [createJob] = useCreateJobApiMutation();
  const [updateJob] = useUpdateJobApiMutation();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formValue: any = {
      employer: userDetails?.id,
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (
          key === "skills" &&
          Array.isArray(value) &&
          value.every((skill) => typeof skill === "number")
        ) {
          formValue[key] = value.join(",");
        } else if (key === "location" && Array.isArray(value)) {
          formValue[key] = value.map((location) => `'${location}'`).join(", ");
        } else {
          formValue[key] = value;
        }
      }
    });

    if (id) {
      try {
        const response: any = await updateJob({
          data: formValue,
          id: id,
        });

        if (response.data.status === 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });
          setIsSuccess(true);
        } else {
          toast.error(response.error.data.message, {
            position: "top-right",
          });
          console.error("API error:", response.error);
        }
      } catch (error: any) {
        console.error("Validation error:", error);
        toast.error(error.error.message, {
          position: "top-right",
        });
      }
    } else {
      try {
        const response: any = await createJob({
          data: formValue,
        });

        if (response.data.status === 200) {
          toast.success(response.data.message, {
            position: "top-right",
          });
          setIsSuccess(true);
        } else {
          toast.error(response.error.data.message, {
            position: "top-right",
          });
          console.error("API error:", response.error);
        }
      } catch (error: any) {
        console.error("Validation error:", error);
        toast.error(error.error.message, {
          position: "top-right",
        });
      }
    }
  };

  const handleLocationMenuChange = (selectedOptions: Option[] = []) => {
    const locationMenu: any = Array.isArray(selectedOptions)
      ? selectedOptions.map((option) => option.value)
      : selectedOptions;

    if (locationMenu.length > 0) {
      form.setValue("location", locationMenu);
      form.clearErrors("location");
    }
  };

  const [wordCount, setWordCount] = useState(0);
  const maxWords = 2000;

  const countWords = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const handleSkillsChange = (selectedOptions: { value: number }[]) => {
    const skills = selectedOptions.map((option) => option.value);

    if (skills.length > 10) {
      form.setError("skills", {
        type: "manual",
        message: "You can select up to 10 tags only.",
      });
      return;
    }

    if (skills.length > 0) {
      form.setValue("skills", skills as [number, ...number[]]);
      form.clearErrors("skills");
    } else {
      form.setError("skills", {
        type: "manual",
        message: "Please select at least one tag.",
      });
    }
  };

  const handleMinPayChange = (value: string) => {
    const minPayValue = parseFloat(value);
    const maxPayValue = form.getValues("maximum_pay");
    if (minPayValue > maxPayValue) {
      form.setError("minimum_pay", {
        message: "Minimum pay should not be greater than maximum pay",
      });
    } else {
      form.clearErrors("minimum_pay");
      form.setValue("minimum_pay", minPayValue);
    }
  };

  const handleMaxPayChange = (value: string) => {
    const maxPayValue = parseFloat(value);
    const minPayValue = form.getValues("minimum_pay");
    if (maxPayValue < minPayValue) {
      form.setError("maximum_pay", {
        message: "Maximum pay should not be less than minimum pay",
      });
    } else {
      form.clearErrors("maximum_pay");
    }
    form.setValue("maximum_pay", maxPayValue);
  };
  const [charCount, setCharCount] = useState(0);
  const maxChars = 100;
  const SalaryCurrency = form.watch("currency");
  const popup = useRef<HTMLDivElement>(null);
  const body = document.querySelector("body");

  const openJobPreviewPopup = () => {
    if (isJobPreviewPopupVisible) {
      setTimeout(() => {
        setJobPreviewPopupVisible(false);
      }, 300);
      body?.classList.remove("overflow-hidden");
      body?.classList.remove("h-screen");
    } else {
      setJobPreviewPopupVisible(true);
      body?.classList.add("overflow-hidden");
      body?.classList.add("h-screen");
    }
  };
  const openCancelPopup = () => {
    setJobPreviewPopupVisible(false);

    if (isCancel) {
      setTimeout(() => {
        setIsCancel(false);
      }, 300);
      body?.classList.remove("overflow-hidden");
      body?.classList.remove("h-screen");
    } else {
      setIsCancel(true);
      body?.classList.add("overflow-hidden");
      body?.classList.add("h-screen");
    }
  };
  const openSuccessPopup = () => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 300);
      body?.classList.remove("overflow-hidden");
      body?.classList.remove("h-screen");
    } else {
      setIsSuccess(true);
      body?.classList.add("overflow-hidden");
      body?.classList.add("h-screen");
    }
  };
  const openLoginPopup = () => {
    if (isLogin) {
      setTimeout(() => {
        setIsLogin(false);
      }, 300);
      body?.classList.remove("overflow-hidden");
      body?.classList.remove("h-screen");
    } else {
      setIsLogin(true);
      body?.classList.add("overflow-hidden");
      body?.classList.add("h-screen");
    }
  };
  const formValues = form.getValues();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const locationsMenu = Array.isArray(formValues.location)
    ? formValues.location
    : [];

  const firstLocation = locationsMenu[0];
  const otherLocations = locationsMenu.slice(1);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const getCurrencySymbol = (currencyId: any) => {
    const selectedCurrency = SalaryCurrencyName.find(
      (cur: any) => cur.id === currencyId
    );
    return selectedCurrency ? selectedCurrency.symbol : null;
  };

  const SkillArrayForTag =
    Array.isArray(formValues?.skills) && formValues?.skills.length > 0
      ? formValues?.skills.map((id) => {
          const skill = skillsName.find((skill: any) => skill.id === id);
          return skill ? skill : null;
        })
      : [];

  return (
    <>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 md:gap-6 desktop:gap-8 w-full px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px] py-[48px] desktop:pt-[60px] desktop:pb-[72px]">
              <div className="bg-white flex flex-col gap-2.5 md:gap-4 desktop:gap-6">
                <h4 className="text-primary font-semibold text-lg md:text-xl desktop:text-2xl">
                  Job Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 desktop:grid-cols-3 gap-3 lg:gap-4 desktop:gap-6">
                  <div>
                    <FormField
                      control={form.control}
                      name="job_title"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`${
                              fieldState.error ? "text-red" : "text-primary"
                            } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                          >
                            Job Title
                          </p>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Enter Job Title"
                                {...field}
                                className={`bg-white rounded-[8px] border-2 text-primary
                                  ${
                                    fieldState?.error
                                      ? "border-red"
                                      : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                  } `}
                                value={field.value}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-primary text-xs mt-1 lg:mt-2 flex items-center gap-1">
                      <img src={Ic_info_circle_black} alt="icon" /> Please
                      specify a single job position. Do not write in full caps.
                    </p>
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`${
                              fieldState.error ? "text-red" : "text-primary"
                            } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                          >
                            Category
                          </p>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(Number(value));
                              }}
                              value={String(field.value)}
                            >
                              <SelectTrigger
                                className={`bg-white ${
                                  fieldState.error
                                    ? "border-red"
                                    : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                } text-base text-primary border-2 rounded-[8px]`}
                              >
                                <SelectValue placeholder="Select Category">
                                  {(() => {
                                    const selectedCategoryName =
                                      categoryName.find(
                                        (cat: any) => cat.id === field.value
                                      )?.name || "Select Category";
                                    return selectedCategoryName;
                                  })()}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectGroup>
                                  {categoryArray.map(
                                    ({ value, label }: Option) => (
                                      <SelectItem key={value} value={value}>
                                        {label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-primary text-xs mt-1 lg:mt-2 flex items-center gap-1">
                      <img src={Ic_info_circle_black} alt="icon" />
                      Choose a category that best fits the job.
                    </p>
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ fieldState, field }) => (
                        <FormItem>
                          <p
                            className={`${
                              fieldState.error ? "text-red" : "text-primary"
                            } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                          >
                            Location
                          </p>
                          <FormControl>
                            <div className="relative">
                              <MultiSelectAutoSuggestions
                                onChange={handleLocationMenuChange}
                                placeholder="Enter Location"
                                className={`bg-white ${
                                  fieldState.error
                                    ? "border-red"
                                    : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                } text-base text-primary border-2 rounded-[8px]`}
                                value={field.value}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="pt-3" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="job_experience"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`${
                              fieldState.error ? "text-red" : "text-primary"
                            } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                          >
                            Experience Level
                          </p>
                          <FormControl>
                            <div className="relative">
                              <Select
                                onValueChange={(value: any) => {
                                  field.onChange(value);
                                }}
                                value={field.value}
                              >
                                <SelectTrigger
                                  className={`bg-white ${
                                    fieldState.error
                                      ? "border-red"
                                      : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                  } text-base text-primary border-2 rounded-[8px]`}
                                >
                                  <SelectValue placeholder="Select Experience Level" />
                                </SelectTrigger>

                                <SelectContent className="bg-white">
                                  <SelectGroup>
                                    {ExperienceArray.map(
                                      (data: any, index: number) => (
                                        <SelectItem
                                          key={index}
                                          value={data.name}
                                        >
                                          {data.name}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
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
                      name="job_type"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`${
                              fieldState.error ? "text-red" : "text-primary"
                            } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                          >
                            Job Type
                          </p>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(Number(value));
                              }}
                              value={String(field.value)}
                            >
                              <SelectTrigger
                                className={`bg-white ${
                                  fieldState.error
                                    ? "border-red"
                                    : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                } text-base text-primary border-2 rounded-[8px]`}
                              >
                                <SelectValue placeholder="Select Job Type">
                                  {(() => {
                                    const selectedJobTypeName =
                                      jobTypeName.find(
                                        (job: any) => job.id === field.value
                                      )?.name || "Select Job Type";
                                    return selectedJobTypeName;
                                  })()}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectGroup>
                                  {jobTypeArray.map(
                                    ({ value, label }: Option) => (
                                      <SelectItem key={value} value={value}>
                                        {label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full md:col-span-2 desktop:col-span-1 relative">
                    <FormField
                      control={form.control}
                      name="work_place_type"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`${
                              fieldState.error ? "text-red" : "text-primary"
                            } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                          >
                            Choose Workplace Type
                          </p>
                          <FormControl>
                            <div className="flex items-center gap-[24px] lg:gap-[32px] h-[36px] lg:h-[48px]">
                              <div className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  className="cursor-pointer"
                                  id="work_place_type1"
                                  {...field}
                                  value="on-site"
                                  checked={field.value === "on-site"}
                                />
                                <label
                                  className="text-primary text-sm md:text-base desktop:text-lg cursor-pointer"
                                  htmlFor="work_place_type1"
                                >
                                  On-Site
                                </label>
                              </div>
                              <div className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  className="cursor-pointer"
                                  id="work_place_type2"
                                  {...field}
                                  value="hybrid"
                                  checked={field.value === "hybrid"}
                                />
                                <label
                                  className="text-primary text-sm md:text-base desktop:text-lg cursor-pointer"
                                  htmlFor="work_place_type2"
                                >
                                  Hybrid
                                </label>
                              </div>
                              <div className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  className="cursor-pointer"
                                  id="work_place_type3"
                                  {...field}
                                  value="remote"
                                  checked={field.value === "remote"}
                                />
                                <label
                                  className="text-primary text-sm md:text-base desktop:text-lg cursor-pointer"
                                  htmlFor="work_place_type3"
                                >
                                  Remote
                                </label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="border-t w-full border-gray5"></div>

              <div className="bg-white flex flex-col gap-2.5 md:gap-4 desktop:gap-6">
                <h4 className="text-primary font-semibold text-lg md:text-xl desktop:text-2xl">
                  Job Description
                </h4>
                <div className="grid grid-cols-1 gap-3 lg:gap-4 desktop:gap-6">
                  <div>
                    <p
                      className={`${
                        form.formState.errors.description
                          ? "text-red"
                          : "text-primary"
                      } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                    >
                      Job Description
                    </p>
                    <div className="border-gray6 border-2 rounded-[8px] p-2 md:p-3 quill_editor_div">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <QuillRichEditor
                                initialValue={field.value}
                                onChange={(value) => {
                                  const currentWordCount = countWords(value);

                                  if (currentWordCount <= maxWords) {
                                    field.onChange(value);
                                    setWordCount(currentWordCount);
                                  }
                                }}
                                maxLength={maxWords}
                                placeholder="Enter About the Jobs & Description"
                              />
                            </FormControl>
                            <FormMessage className="pt-3" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <p className="text-gray text-sm text-right mt-1">
                      {wordCount}/{maxWords} words
                    </p>
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`${
                              fieldState.error ? "text-red" : "text-primary"
                            } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                          >
                            Skills(Max 10)
                          </p>
                          <FormControl>
                            <div className="relative">
                              <FormControl>
                                <div className="relative">
                                  <MultiSelectAutoSuggestionsSkills
                                    onChange={(selectedOptions: any) =>
                                      handleSkillsChange(selectedOptions)
                                    }
                                    placeholder="e.g., UI UX Design, Product Design"
                                    className={`bg-white pl-8 lg:pl-9 flex items-center h-full ${
                                      fieldState.error
                                        ? "border-red"
                                        : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                    } text-base text-primary border-2 rounded-[8px]`}
                                    value={field.value}
                                    options={options}
                                  />
                                </div>
                              </FormControl>
                              <div className="bg-white absolute top-[2px] left-[2px] h-[52px] w-[40px] rounded-[8px]">
                                <img
                                  src={Ic_search}
                                  alt="search"
                                  className="top-[14px] left-[8px] lg:left-[12px] relative"
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="border-t w-full border-gray5"></div>

              <div className="bg-white flex flex-col gap-2.5 md:gap-4 desktop:gap-6">
                <h4 className="text-primary font-bold text-lg md:text-xl desktop:text-2xl">
                  Set the Salary Range
                  {/* (Optional) */}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 desktop:grid-cols-3 gap-3 lg:gap-4 desktop:gap-6">
                  <div>
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`${
                              fieldState.error ? "text-red" : "text-primary"
                            } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                          >
                            Currency
                          </p>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(Number(value));
                              }}
                              value={String(field.value)}
                            >
                              <SelectTrigger
                                className={`bg-white ${
                                  fieldState.error
                                    ? "border-red"
                                    : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                } text-base text-primary border-2 rounded-[8px]`}
                              >
                                <SelectValue placeholder="Choose Currency">
                                  {(() => {
                                    const selectedCurrencyName =
                                      SalaryCurrencyName.find(
                                        (cur: any) => cur.id === field.value
                                      );

                                    if (!selectedCurrencyName) {
                                      return "Choose Currency";
                                    }

                                    return `${selectedCurrencyName.name} (${selectedCurrencyName.symbol})`;
                                  })()}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectGroup>
                                  {SalaryCurrencyArray.map(
                                    ({ value, label }) => (
                                      <SelectItem key={value} value={value}>
                                        {label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="hidden desktop:block"></div>
                  <div className="hidden desktop:block"></div>
                  <div>
                    <FormField
                      control={form.control}
                      name="minimum_pay"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`${
                              fieldState.error ? "text-red" : "text-primary"
                            } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                          >
                            Minimum Pay
                          </p>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Enter Fixed Amount"
                                {...field}
                                className={`bg-white rounded-[8px] border-2 text-primary pl-7
                                          ${
                                            fieldState?.error
                                              ? "border-red"
                                              : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                          } `}
                                type="number"
                                onChange={(e: any) => {
                                  if (!SalaryCurrency) {
                                    form.setError("minimum_pay", {
                                      type: "manual",
                                      message: "First Select Salary Currency",
                                    });
                                  } else {
                                    const value = e.target.value;
                                    handleMinPayChange(value);
                                  }
                                }}
                              />
                              <span className="absolute top-[13px] left-[8px] lg:left-[12px] text-primary text-base">
                                {(() => {
                                  const selectedCurrencyName =
                                    SalaryCurrencyName.find(
                                      (cur: any) => cur.id === SalaryCurrency
                                    );

                                  if (!selectedCurrencyName) {
                                    return null;
                                  }

                                  return selectedCurrencyName.symbol;
                                })()}
                              </span>
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
                      name="maximum_pay"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`${
                              fieldState.error ? "text-red" : "text-primary"
                            } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                          >
                            Maximum Pay
                          </p>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Enter Fixed Amount"
                                {...field}
                                className={`bg-white rounded-[8px] border-2 text-primary pl-7
                                          ${
                                            fieldState?.error
                                              ? "border-red"
                                              : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                          } `}
                                type="number"
                                onChange={(e: any) => {
                                  if (!SalaryCurrency) {
                                    form.setError("maximum_pay", {
                                      type: "manual",
                                      message: "First Select Salary Currency",
                                    });
                                  } else {
                                    const value = e.target.value;
                                    handleMaxPayChange(value);
                                  }
                                }}
                              />
                              <span className="absolute top-[13px] left-[8px] lg:left-[12px] text-primary text-base">
                                {(() => {
                                  const selectedCurrencyName =
                                    SalaryCurrencyName.find(
                                      (cur: any) => cur.id === SalaryCurrency
                                    );

                                  if (!selectedCurrencyName) {
                                    return null;
                                  }

                                  return selectedCurrencyName.symbol;
                                })()}
                              </span>
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
                      name="pay_type"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`${
                              fieldState.error ? "text-red" : "text-primary"
                            } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                          >
                            Payment Type
                          </p>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(Number(value));
                              }}
                              value={String(field.value)}
                            >
                              <SelectTrigger
                                className={`bg-white ${
                                  fieldState.error
                                    ? "border-red"
                                    : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                } text-base text-primary border-2 rounded-[8px]`}
                              >
                                <SelectValue placeholder="Choose Payment Type">
                                  {(() => {
                                    const selectedPayTypeName =
                                      PayTypeName.find(
                                        (pay: any) => pay.id === field.value
                                      )?.name || "Choose Payment Type";
                                    return selectedPayTypeName;
                                  })()}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectGroup>
                                  {payTypeArray.map(
                                    ({ value, label }: Option) => (
                                      <SelectItem key={value} value={value}>
                                        {label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="border-t w-full border-gray5"></div>

              <div className="bg-white rounded-[8px] flex flex-col gap-2.5 md:gap-4 desktop:gap-6">
                <h4 className="text-primary font-semibold text-lg md:text-xl desktop:text-2xl">
                  Select Application Method
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 desktop:gap-6">
                  <div>
                    <FormField
                      control={form.control}
                      name="apply_by"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <p
                            className={`${
                              fieldState.error ? "text-red" : "text-primary"
                            } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                          >
                            Apply Via
                          </p>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(Number(value));
                                const selectedApplyByName = ApplyByName.find(
                                  (job: any) => job.id === value
                                )?.name;
                                setSelectedApplyBy(selectedApplyByName);
                              }}
                              value={String(field.value)}
                            >
                              <SelectTrigger
                                className={`bg-white ${
                                  fieldState.error
                                    ? "border-red"
                                    : "border-gray7 hover:border-primary focus:border-[2px] focus:border-primary"
                                } text-base text-primary border-2 rounded-[8px]`}
                              >
                                <SelectValue placeholder="Choose One">
                                  {(() => {
                                    const selectedApplyByName =
                                      ApplyByName.find(
                                        (job: any) => job.id === field.value
                                      )?.name || "Choose One";
                                    return selectedApplyByName;
                                  })()}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectGroup>
                                  {applyByArray.map(
                                    ({ value, label }: Option) => (
                                      <SelectItem key={value} value={value}>
                                        {label}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {selectedApplyBy === "Directly Submitting Resume" && (
                      <p className="text-primary text-xs mt-1 lg:mt-2 flex items-center gap-1">
                        <img src={Ic_info_circle_black} alt="icon" />
                        Applicants will apply by filling out the application
                        form without leaving the job board. You will receive ann
                        email when a new application is submitted.
                      </p>
                    )}
                  </div>
                  {selectedApplyBy === "Link" && (
                    <div>
                      <FormField
                        control={form.control}
                        name="apply_text"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <p
                              className={`${
                                fieldState.error ? "text-red" : "text-primary"
                              } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                            >
                              Link to Apply
                            </p>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="Enter the link"
                                  {...field}
                                  className={`bg-white rounded-[8px] border-2 ${
                                    fieldState?.error
                                      ? "border-red"
                                      : "border-gray6 hover:border-primary focus:border-[2px] focus:border-primary"
                                  }`}
                                  type="text"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className="text-primary text-xs mt-1 lg:mt-2 flex items-center gap-1">
                        <img src={Ic_info_circle_black} alt="icon" />
                        Applicants will be redirected to the provided external
                        URL to apply to the job.
                      </p>
                    </div>
                  )}
                  {selectedApplyBy === "Email ID" && (
                    <div>
                      <FormField
                        control={form.control}
                        name="apply_text"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <p
                              className={`${
                                fieldState.error ? "text-red" : "text-primary"
                              } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                            >
                              Email to Apply
                            </p>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="Enter the email ID"
                                  {...field}
                                  className={`bg-white rounded-[8px] border-2 ${
                                    fieldState?.error
                                      ? "border-red"
                                      : "border-gray6 hover:border-primary focus:border-[2px] focus:border-primary"
                                  }`}
                                  type="email"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className="text-primary text-xs mt-1 lg:mt-2 flex items-center gap-1">
                        <img src={Ic_info_circle_black} alt="icon" />
                        Applicants will apply by sending their applications to
                        the provided email address.
                      </p>
                    </div>
                  )}
                  {selectedApplyBy === "Directly Submitting Resume" && (
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="apply_text"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <p
                              className={`${
                                fieldState.error ? "text-red" : "text-primary"
                              } mb-[6px] lg:mb-2 text-sm lg:text-base`}
                            >
                              Add Instructions
                            </p>
                            <FormControl>
                              <div className="relative">
                                <TextArea
                                  placeholder="Send Cover Letter & Portfolio"
                                  {...field}
                                  className={`bg-white  
                                  ${
                                    fieldState?.error
                                      ? "border-red"
                                      : "border-gray6 hover:border-primary focus:border-[2px] focus:border-primary"
                                  } border-2 rounded-[8px] lg:h-[100px]`}
                                  onChange={(e) => {
                                    let inputValue = e.target.value;

                                    if (inputValue.length > maxChars) {
                                      inputValue = inputValue.slice(
                                        0,
                                        maxChars
                                      );
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
                      <p className="text-gray text-sm text-right mt-1">
                        {charCount}/{maxChars}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between w-full gap-2 md:gap-5 md:items-center sticky bottom-0 bg-white shadow-shadow2 p-4 px-4 sm:px-5 md:px-8 lg:px-10 big:px-[120px] xBig:px-[200px]">
              <div
                onClick={() => form.formState.isValid && openJobPreviewPopup()}
              >
                <ButtonUx
                  label="Preview Job"
                  buttonClassName={`bg-white border-2 font-semibold text-base rounded-[8px] px-6 desktop:px-8 py-2 h-12
                      ${
                        form.formState.isValid
                          ? "text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3 border-primary"
                          : "border-gray7 text-[#767676]"
                      }`}
                  disabled={!form.formState.isValid}
                />
              </div>
              <div className="flex items-center gap-3 md:gap-5">
                <ButtonUx
                  label="Import from URL"
                  buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-6 desktop:px-8 py-2 h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
                />
                <ButtonUx
                  label="Post a Job"
                  buttonClassName={`text-lg px-6 desktop:px-8 py-2 h-12 font-semibold border-2 rounded-[8px] w-max ${
                    form.formState.isValid
                      ? "border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 hover:shadow-shadow1"
                      : "border-gray7 bg-[#D8D8D8] text-[#767676]"
                  }`}
                  type="submit"
                  disabled={!form.formState.isValid}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>

      {isJobPreviewPopupVisible && form.formState.isValid && (
        <div
          className={`fixed inset-0 flex justify-center items-center`}
          style={{
            boxShadow: "0px 7px 14px 0px #080F3408",
            background: "#00000099",
            zIndex: "9999999999",
          }}
        >
          <div
            className="bg-white relative rounded-[12px] overflow-hidden shadow-lg w-[94%] md:w-[85%] h-max pt-4 md:pt-6 desktop:pt-8"
            ref={popup}
          >
            <img
              src={Ic_close}
              alt="close"
              className="absolute top-[16px] md:top-[24px] right-[16px] md:right-[24px]"
              onClick={openJobPreviewPopup}
            />
            <h4 className="text-primary font-semibold text-lg sm:text-xl md:text-[20px] desktop:text-[24px] mb-6 px-4 md:px-6 desktop:px-8">
              Job Post Preview
            </h4>
            <div
              style={{
                maxHeight: "calc(100vh - 280px)",
                overflowY: "auto",
              }}
              className="overFlowYAuto"
            >
              <div className="bg-lightChiku p-3 lg:p-5 desktop:p-6 flex flex-col gap-4 mb-10">
                <div className="flex flex-col sm:flex-row gap-2 lg:gap-0 justify-between">
                  <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                    {userDetails?.logo && (
                      <img
                        src={`${PHOTO_URL}/${userDetails?.logo}`}
                        alt="icon"
                        className="w-[55px] desktop:w-[80px] h-[55px] desktop:h-[80px] rounded-[12px]"
                      />
                    )}
                    <div className="flex flex-col gap-1">
                      <div className="text-gray text-sm md:text-lg font-medium">
                        {userDetails?.company_name}
                      </div>
                      <h2 className="text-primary text-2xl big:text-[40px] font-semibold leading-[36px] big:leading-[48px]">
                        {(() => {
                          const selectedCategoryName =
                            categoryName.find(
                              (cat: any) => cat.id === formValues?.category
                            )?.name || null;
                          return selectedCategoryName;
                        })()}
                      </h2>
                    </div>
                  </div>
                  <p className="text-base lg:text-lg text-gray">Now</p>
                </div>
                <div className="flex flex-wrap gap-2 lg:gap-4 desktop:gap-5 items-center">
                  <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl flex items-center gap-2">
                    <img
                      src={Ic_layout_grid}
                      alt="icon"
                      className="w-[20px] h-[20px] md:w-auto md:h-auto"
                    />
                    {formValues?.job_title}
                  </span>
                  <div className="border-l border-gray5 h-[18px]"></div>
                  <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                    <img
                      src={Ic_location}
                      alt="location"
                      className="w-[20px] h-[20px] md:w-auto md:h-auto"
                    />
                    <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl relative">
                      <span className="location-link">{firstLocation}</span>
                      &nbsp;
                      {otherLocations.length > 0 && (
                        <span
                          className="text-primary underline cursor-pointer"
                          onClick={toggleDropdown}
                        >
                          +{otherLocations.length}
                        </span>
                      )}
                      {dropdownVisible && (
                        <div className="location-dropdown absolute">
                          {otherLocations.map((location, index) => (
                            <div key={index} className="dropdown-item">
                              {location}
                            </div>
                          ))}
                        </div>
                      )}
                    </span>
                  </div>
                  <div className="border-l border-gray5 h-[18px]"></div>
                  <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                    <img
                      src={Ic_experience}
                      alt="experience"
                      className="w-[20px] h-[20px] md:w-auto md:h-auto"
                    />
                    <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl">
                      {formValues.job_experience}
                    </span>
                  </div>
                  <div className="border-l border-gray5 h-[18px]"></div>
                  <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                    <img
                      src={Ic_time}
                      alt="time"
                      className="w-[20px] h-[20px] md:w-auto md:h-auto"
                    />
                    <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl">
                      {(() => {
                        const selectedJobTypeName =
                          jobTypeName.find(
                            (job: any) => job.id === formValues?.job_type
                          )?.name || null;
                        return selectedJobTypeName;
                      })()}
                    </span>
                  </div>
                  <div className="border-l border-gray5 h-[18px]"></div>
                  <div className="flex items-center gap-1 md:gap-2 w-[47%] sm:w-auto whitespace-nowrap">
                    <img
                      src={Ic_rupee}
                      alt="rupee"
                      className="w-[20px] h-[20px] md:w-auto md:h-auto"
                    />

                    <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl">
                      {getCurrencySymbol(SalaryCurrency)}{" "}
                      {formValues?.minimum_pay} -{" "}
                      {getCurrencySymbol(SalaryCurrency)}{" "}
                      {formValues?.maximum_pay}
                    </span>
                  </div>
                  <div className="border-l border-gray5 h-[18px]"></div>
                  <span className="text-primary text-sm md:text-base lg:text-lg desktop:text-xl flex items-center gap-2">
                    <img
                      src={Ic_briefcase}
                      alt="briefcase"
                      className="w-[20px] h-[20px] md:w-auto md:h-auto"
                    />
                    {formValues?.work_place_type}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <span className="text-primary text-sm lg:text-base">
                    Skills:
                  </span>
                  <JobTagsDisplay tags={SkillArrayForTag} />
                </div>
              </div>
              <div className="px-4 md:px-6 desktop:px-8 pb-4 md:pb-6 desktop:pb-8">
                <h4 className="mb-3 text-primary text-base md:text-xl desktop:text-[2rem] font-semibold">
                  Job Description
                </h4>
                <div
                  dangerouslySetInnerHTML={{ __html: formValues?.description }}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between w-full gap-2 md:gap-5 md:items-center sticky bottom-0 bg-white shadow-shadow2 px-4 md:px-6 desktop:px-8 py-4">
              <div onClick={openCancelPopup}>
                <ButtonUx
                  label="Cancel"
                  buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-6 desktop:px-8 py-2 h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
                />
              </div>
              <div className="flex items-center gap-3 md:gap-5">
                <div onClick={openJobPreviewPopup}>
                  <ButtonUx
                    label="Edit Job Post"
                    buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-6 desktop:px-8 py-2 h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
                  />
                </div>
                <div
                  onClick={() => {
                    onSubmit(formValues);
                    openJobPreviewPopup();
                  }}
                >
                  <ButtonUx
                    label="Post a Job"
                    buttonClassName={`text-lg px-6 desktop:px-8 py-2 h-12 font-semibold border-2 rounded-[8px] w-max ${
                      form.formState.isValid
                        ? "border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 hover:shadow-shadow1"
                        : "border-gray7 bg-[#D8D8D8] text-[#767676]"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCancel && (
        <Modal onClose={openCancelPopup} isOpen={true}>
          <div className="p-4 md:p-6 desktop:p-8 flex flex-col items-center justify-center gap-4 desktop:gap-8">
            <img src={Img_cancel} alt="image" />
            <div>
              <h4 className="text-primary font-semibold text-center text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
                Are you Sure you want to Cancel?
              </h4>
              <p className="text-gray text-sm md:text-base desktop:text-lg mt-3 text-center">
                By Clicking on cancel you will Loose the Data that <br /> you
                have add for Create a Job.
              </p>
            </div>
            <div className="flex items-center gap-5 relative mt-4">
              <div
                onClick={() => {
                  form.reset();
                  openCancelPopup();
                }}
              >
                <ButtonUx
                  label="Yes, Cancel"
                  buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-6 py-2 h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
                />
              </div>
              <div onClick={openCancelPopup}>
                <ButtonUx
                  label="No, Keep"
                  buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-12"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
      {isSuccess && (
        <Modal onClose={openSuccessPopup} isOpen={true}>
          <div className="p-4 md:p-6 desktop:p-8 flex flex-col items-center justify-center gap-4 desktop:gap-8">
            <img src={Img_subscribe_success} alt="image" />
            <div>
              <h4 className="text-primary font-semibold text-center text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
                Job Post Successfully Submitted for Review!
              </h4>
              <p className="text-gray text-sm md:text-base desktop:text-lg mt-3 text-center">
                Thank you! We’re reviewing your job post and will publish it
                soon.
              </p>
              <div className="flex items-center justify-center gap-5 relative mt-4">
                <Link to="/">
                  <ButtonUx
                    label="Go to Home"
                    buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-12"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {isLogin && (
        <Modal onClose={openLoginPopup} isOpen={true}>
          <div className="p-4 md:p-6 desktop:p-8 flex flex-col items-center justify-center gap-4 desktop:gap-8">
            <img src={Img_cancel} alt="image" />
            <div>
              <h4 className="text-primary font-semibold text-center text-lg sm:text-xl md:text-[20px] desktop:text-[24px]">
                You did’t Login as a Recruiter
              </h4>
              <p className="text-gray text-sm md:text-base desktop:text-lg mt-3 text-center">
                For Posting a Job you need to Register or Login with us
              </p>
            </div>
            <div className="flex items-center gap-5 relative">
              <Link to="/">
                <ButtonUx
                  label="Login"
                  buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-6 py-2 h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
                />
              </Link>
              <Link to="/crate-account">
                <ButtonUx
                  label="Register"
                  buttonClassName="font-semibold text-primary bg-yellow text-base border-2 border-primary rounded-[8px] px-6 py-2 hover:bg-yellow1 hover:shadow-shadow1 focus:bg-yellow2 h-12"
                />
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
