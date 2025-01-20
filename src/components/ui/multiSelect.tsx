/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import Ic_close_black from "@/assets/images/Ic_close_black.svg";
import Ic_down_arrow from "@/assets/images/Ic_down_arrow.svg";

interface Option {
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  onChange: (selectedOptions: Option[]) => void;
  placeholder: string;
  className: string;
  value?: any;
  disabled?: any;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange,
  placeholder,
  className,
  value = [],
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleOption = (option: Option) => {
    const updatedSelection = selectedOptions?.some(
      (item) => item.value === option.value
    )
      ? selectedOptions.filter((item) => item.value !== option.value)
      : [...selectedOptions, option];

    setSelectedOptions(updatedSelection);
    onChange(updatedSelection);
  };

  const handleRemoveOption = (option: Option) => {
    const updatedSelection = selectedOptions.filter(
      (item) => item.value !== option.value
    );

    setSelectedOptions(updatedSelection);
    onChange(updatedSelection);
  };

  useEffect(() => {
    const optionsFromValue = value?.map((val: any) => {
      const foundOption = options.find((option) => option.value === val);
      return foundOption ? foundOption : { value: val, label: val };
    });

    if (
      selectedOptions?.length !== optionsFromValue?.length ||
      !optionsFromValue?.every((opt: any) =>
        selectedOptions?.some((selected) => selected.value === opt.value)
      )
    ) {
      setSelectedOptions(optionsFromValue);
    }
  }, [value, options, selectedOptions]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <div
          className={`flex gap-2 justify-between items-center py-2 px-3 focus:border-[2px] focus:border-primary border-2 rounded-[8px] min-h-[40px] lg:min-h-[48px] h-auto ${className} ${
            isOpen &&
            "border-[2px] border-primary bg-lightYellow2 shadow-shadow1"
          } ${
            disabled
              ? "cursor-not-allowed bg-[#F5F5F5] text-[#767676] hover:border-gray7"
              : "cursor-pointer border-gray7 hover:border-primary"
          }`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <p className="text-[#767676] text-lg">{placeholder}</p>
          <img
            src={Ic_down_arrow}
            alt="arrow"
            className={`${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>
        {isOpen && (
          <div className="absolute z-10 top-[40px] lg:top-[48px] left-0 w-full mt-1 bg-white border rounded-[8px] shadow-lg max-h-60 overflow-auto">
            {options?.map((option) => (
              <div
                key={option.value}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  selectedOptions?.some((item) => item.value === option.value)
                    ? "text-gray"
                    : ""
                }`}
                onClick={() => handleToggleOption(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedOptions?.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center py-2">
          {selectedOptions?.map((option) => (
            <div
              key={option.value}
              className="flex items-center bg-lightChiku2 text-gray rounded-[8px] px-2 py-[3.5px] gap-[4px]"
            >
              {option.label}
              <img
                src={Ic_close_black}
                alt="close"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveOption(option);
                }}
                className="cursor-pointer w-[20px] h-[20px]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
