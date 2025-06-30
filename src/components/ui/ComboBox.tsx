"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetSkillsQuery } from "@/store/slice/apiSlice/profileApi";

export function ComboboxMultiSelect({ value, onChange }: any) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      value.every((val) => val !== undefined && val !== null)
    ) {
      setSelectedValues(value);
    }
  }, [value]);

  const toggleSelect = (currentValue: number) => {
    setSelectedValues((prev) =>
      prev.includes(currentValue)
        ? prev.filter((v) => v !== currentValue)
        : currentValue != null && currentValue !== undefined
        ? [...prev, currentValue]
        : prev
    );

    const value = selectedValues.includes(currentValue)
      ? selectedValues.filter((v) => v !== currentValue)
      : currentValue !== undefined && currentValue !== null
      ? [...selectedValues, currentValue]
      : selectedValues;

    onChange(value);
  };

  const params: any = {
    page: 1,
    limit: 99999999999,
    value: "",
  };
  const { data: skills } = useGetSkillsQuery(params);
  const skillsName = (skills as any)?.data || [];

  const skillCategories = skillsName.map((skill: any) => ({
    category: skill.name,
    categoryValue: skill.id,
  }));

  const categories = [...skillCategories];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between h-12 text-base font-normal ${
            open
              ? "border-[2px] border-primary bg-lightYellow2 shadow-shadow1"
              : "border-gray7"
          }`}
        >
          {selectedValues.length > 0 ? (
            selectedValues
              .map(
                (val) =>
                  categories.find((f) => f.categoryValue === val)?.category ??
                  ""
              )
              .join(", ")
          ) : (
            <span className="text-lg text-[#767676]">
              e.g., UI UX Design, Product Design
            </span>
          )}
          {open ? (
            <ChevronUp className="opacity-50" />
          ) : (
            <ChevronDown className="opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      {/* <PopoverContent className="w-[250px] p-0"> */}
      <PopoverContent
        align="start"
        className="w-[--radix-popover-trigger-width] p-0"
      >
        <Command>
          <CommandInput placeholder="Search Tags..." className="h-9" />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              <div className="flex flex-col gap-1">
                {categories.map((framework) => (
                  <CommandItem
                    key={framework.categoryValue}
                    value={framework.categoryValue}
                    onSelect={() => toggleSelect(framework.categoryValue)}
                    className={`text-gray cursor-pointer flex items-center gap-2 text-base ${
                      selectedValues.includes(framework.categoryValue) &&
                      "bg-[#EFECE5]"
                    }`}
                  >
                    <label className="inline-flex items-center cursor-pointer relative">
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(
                          framework.categoryValue
                        )}
                        onChange={() => {}}
                        className="peer appearance-none w-4 h-4 border border-gray-400 rounded-sm checked:bg-gray-600 transition duration-200"
                      />
                      <svg
                        className="absolute left-0 top-0 w-4 h-4 text-gray hidden peer-checked:block pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </label>

                    {framework.category}
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
