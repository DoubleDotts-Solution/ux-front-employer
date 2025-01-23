/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import RectangleIcon from "@/assets/images/Ic_Rectangle.svg";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonUx from "./common/button";
import AutocompleteInputMultiple from "./ui/autoSelectMultiple";
import { useNavigate } from "react-router-dom";
import AutocompleteInputMultipleLocationHome from "./ui/autoSelectMultipleLocationHome";

const experienceArray = [
  { name: "Fresher (Less then 1 Year)" },
  { name: "1 year" },
  { name: "2 years" },
  { name: "3 years" },
  { name: "4 years" },
  { name: "5 years" },
  { name: "6 years" },
  { name: "7 years" },
];

const formSchema = z.object({
  search: z
    .array(
      z.string().min(1, {
        message: "Each item must be at least 1 character.",
      })
    )
    .optional(),
  experience: z
    .string()
    .min(1, {
      message: "Experience must be specified.",
    })
    .optional(),
  city: z
    .array(
      z.string().min(1, {
        message: "Each item must be at least 1 character.",
      })
    )
    .optional(),
});

const SearchJob: React.FC<{ onClose?: any }> = ({ onClose }) => {
  const navigate = useNavigate();
  const [remoteJobsOnly, setRemoteJobsOnly] = useState(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formattedSearch = data.search ? data.search.join(", ") : "";

    const queryParams: string[] = [];
    const formatValue = (value: string): string => {
      return value
        .split(", ")
        .map((item) => item.trim().replace(/\s+/g, "_"))
        .join("-");
    };

    if (data.search !== undefined) {
      queryParams.push(`search=${formatValue(formattedSearch)}`);
    }
    if (data.experience !== undefined) {
      const formattedexperience = data.experience
        .trim()
        .replace(/[\s,]+/g, "-");
      queryParams.push(`experience=${encodeURIComponent(formattedexperience)}`);
    }
    if (data.city) {
      const city: any = data.city;
      const encodedCities = encodeURIComponent(city.join(","));
      if (data.city !== undefined) {
        queryParams.push(`city=${encodedCities}`);
      }
    }
    if (remoteJobsOnly === true) {
      queryParams.push(`remote=remote`);
    }

    if (queryParams.length > 0) {
      const queryString = queryParams.join("&");
      if (location.pathname === "/find-talent") {
        navigate(`/find-talent?${queryString}`);
        window.location.reload();
      } else {
        navigate(`/find-talent?${queryString}`);
      }
      if (onClose) {
        onClose();
      }
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const element = document.querySelector(".nav-popup");
    if (element) {
      setTimeout(() => {
        element.classList.add("open");
      }, 100);
    }
  }, []);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const formValue: any = form.getValues();

  const isValid =
    (formValue.experience?.trim() || "") !== "" ||
    formValue.search?.length > 0 ||
    formValue.city?.length > 0;

  return (
    <>
      <div className="nav-popup relative z-50">
        <div className="p-4 lg:p-5 laptop:py-7 laptop:px-8 bg-black2 border-2 border-black w-full z-50 relative flex">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col laptop:flex-row gap-3 w-full"
            >
              <div className="w-full laptop:w-[37%]">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <AutocompleteInputMultiple
                          value={field.value || selectedItems}
                          onChange={(newItems) => {
                            setSelectedItems(newItems);
                            field.onChange(newItems);
                          }}
                          placeholder="Search for Skills, Companies"
                          className="h-10 lg:h-12"
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full laptop:w-[24%]">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value: any) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger
                            className={`h-10 lg:h-[50px] bg-white text-lg border-2 ${
                              fieldState.error
                                ? "border-red"
                                : "border-primary hover:border-primary"
                            } rounded-[8px]`}
                          >
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectGroup>
                              {experienceArray.map(
                                (data: any, index: number) => (
                                  <SelectItem key={index} value={data.name}>
                                    {data.name}
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
              <div className="w-full laptop:w-[24%]">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <AutocompleteInputMultipleLocationHome
                          value={field.value || []}
                          onChange={(newItems) => {
                            field.onChange(newItems);
                          }}
                          placeholder="Enter location"
                          className="h-10 lg:h-12"
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <label className="container text-white text-sm mt-2 mb-3">
                  Remote Jobs Only
                  <input
                    type="checkbox"
                    checked={remoteJobsOnly}
                    onChange={() => setRemoteJobsOnly((prev) => !prev)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="w-full md:w-[15%]">
                <ButtonUx
                  label="Find Jobs"
                  buttonClassName={`text-lg px-8 py-2 w-full h-10 lg:h-12 font-semibold border-2 rounded-[8px] ${
                    isValid
                      ? "border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 hover:shadow-shadow1"
                      : "border-gray7 bg-[#D8D8D8] text-[#767676]"
                  }`}
                  type="submit"
                  disabled={!isValid}
                />
              </div>
            </form>
          </Form>
        </div>
        <img
          src={RectangleIcon}
          alt="Top left rectangle"
          className="absolute top-[-6px] left-[-6px] z-40"
        />
        <img
          src={RectangleIcon}
          alt="Top right rectangle"
          className="absolute top-[-6px] right-[-6px] z-40"
        />
        <img
          src={RectangleIcon}
          alt="Bottom left rectangle"
          className="absolute bottom-[-6px] left-[-6px] z-40"
        />
        <img
          src={RectangleIcon}
          alt="Bottom right rectangle"
          className="absolute bottom-[-6px] right-[-6px] z-40"
        />
      </div>
    </>
  );
};

export default SearchJob;
