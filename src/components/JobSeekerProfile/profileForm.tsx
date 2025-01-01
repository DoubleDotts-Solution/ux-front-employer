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
import ButtonUx from "../common/button";
import AutocompleteInput from "../ui/inputLocation";
import { TextArea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputMobile } from "../ui/inputMobile";

const formSchema = z.object({
  company_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  website_link: z
    .string()
    .min(1, { message: "Profile Link is required." })
    .url({ message: "Please enter a valid URL." }),
  profile_photo: z
    .instanceof(File)
    .nullable()
    .refine((file) => file === null || file.size <= 100 * 1024 * 1024, {
      message: "File size must be less than 100MB.",
    })
    .optional(),
  location: z.string().min(1, {
    message: "Location must be specified.",
  }),
  about_company: z
    .string()
    .max(200, {
      message: "About Company must be at least 200 characters.",
    })
    .optional(),
  full_name: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(2, { message: "Email must be at least 2 characters long." })
    .optional(),
  mobile_no: z
    .string()
    .min(10, { message: "Please enter a valid phone number." })
    .regex(/^\+?\d{1,4}?\s?\d{1,14}$/, {
      message: "Please enter a valid phone number.",
    })
    .optional(),
  designation: z.string().min(1, { message: "Designation must be specified." }),
});

const ProfileForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  const [imageUrl, setImageUrl] = React.useState<any | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      form.setValue("profile_photo", files[0]);
      setImageUrl(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const [charCount, setCharCount] = useState(0);
  const maxChars = 200;

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
                    name="website_link"
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
                <div className="flex items-center gap-6">
                  <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] desktop:w-[78px] desktop:h-[78px] border-2 border-primary bg-[#D2EBFF] rounded-[8px] flex items-center justify-center text-primary font-semibold text-xl md:text-2xl desktop:text-[2rem]">
                    {imageUrl ? (
                      <img
                        src={URL.createObjectURL(imageUrl)}
                        alt="image"
                        className="h-full w-full"
                      />
                    ) : (
                      "J"
                    )}
                  </div>
                  <span
                    className="flex items-center gap-2 text-sm lg:text-base font-semibold text-primary cursor-pointer py-2 px-6 border-2 border-primary rounded-[8px]"
                    onClick={handleClick}
                  >
                    Upload Profile Photo
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    name="profile_photo"
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="location"
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
                                  : "border-gray7 hover:border-primary focus:border-[3px] focus:border-gray7"
                              } text-base text-gray border-2 rounded-[8px]`}
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
                    name="about_company"
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
                              placeholder="Enter About Compony"
                              {...field}
                              className={`bg-white  
                                  ${
                                    fieldState?.error
                                      ? "border-red"
                                      : "border-gray7 hover:border-primary focus:border-[3px] focus:border-gray7"
                                  } border-2 rounded-[8px] lg:h-[100px]`}
                              onChange={(e) => {
                                if (e.target.value.length <= maxChars) {
                                  setCharCount(e.target.value.length);
                                  field.onChange(e);
                                }
                              }}
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
                    name="full_name"
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
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            value={field.value}
                          >
                            <SelectTrigger
                              className={`bg-white ${
                                fieldState.error
                                  ? "border-red"
                                  : "border-gray7 hover:border-primary focus:border-[3px] focus:border-gray7"
                              } text-base text-primary border-2 rounded-[8px]`}
                            >
                              <SelectValue placeholder="Enter Total Years of Experience" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectGroup>
                                <SelectItem value="Designation 1">
                                  Designation 1
                                </SelectItem>
                                <SelectItem value="Designation 2">
                                  Designation 2
                                </SelectItem>
                                <SelectItem value="Designation 3">
                                  Designation 3
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
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
                                    : "border-gray7 hover:border-primary focus:border-[3px] focus:border-gray7"
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
