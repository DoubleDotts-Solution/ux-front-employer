/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { isValid } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Ic_calender from "../../assets/images/Ic_calender.svg";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  onSelectDate: (selectedDate: number | null) => void;
  selectedDate?: number | null;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const YearPicker: React.FC<DatePickerProps> = ({
  onSelectDate,
  selectedDate,
  className,
  placeholder,
  disabled,
}) => {
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    selectedDate ? new Date(selectedDate) : null
  );

  useEffect(() => {
    if (selectedDate) {
      const parsedDate = new Date(selectedDate);
      if (isValid(parsedDate)) {
        setInternalSelectedDate(parsedDate);
      }
    } else {
      setInternalSelectedDate(null);
    }
  }, [selectedDate]);

  const ExampleCustomInput = forwardRef<HTMLInputElement, any>(
    ({ value, onClick }, ref) => {
      return (
        <div
          className={`flex items-center justify-between w-full h-10 lg:h-11 rounded-[8px] px-3 py-2 ${
            disabled
              ? "cursor-not-allowed bg-[#F5F5F5] hover:border-gray7 text-[#767676] border-gray7"
              : ""
          }`}
        >
          <input
            value={value || selectedDate}
            className="w-full h-full text-primary bg-white font-normal focus:outline-none focus:ring-0 placeholder:text-[#767676] placeholder:text-lg disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:hover:border-gray7 disabled:text-[#767676] disabled:border-gray7"
            onClick={onClick}
            ref={ref}
            placeholder={`${placeholder ? placeholder : "yyyy"}`}
            readOnly
            disabled={disabled}
          />
          <img src={Ic_calender} alt="calendar" className="cursor-pointer" />
        </div>
      );
    }
  );

  useEffect(() => {
    if (selectedDate) {
      const parsedDate = new Date(selectedDate, 0, 1);
      if (isValid(parsedDate)) {
        setInternalSelectedDate(parsedDate);
      } else {
        setInternalSelectedDate(null);
      }
    } else {
      setInternalSelectedDate(null);
    }
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    if (!date || isNaN(date.getTime())) {
      setInternalSelectedDate(null);
      onSelectDate(null);
      return;
    }

    setInternalSelectedDate(date);
    const formattedYear = date.getFullYear();
    onSelectDate(formattedYear);
  };

  return (
    <div
      className={cn(
        "bg-white text-base font-medium border-2 rounded-[8px] flex h-10 lg:h-12 w-full border-input text-primary focus:bg-lightYellow2 focus:shadow-shadow1",
        className
      )}
    >
      <DatePicker
        selected={internalSelectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy"
        customInput={<ExampleCustomInput />}
        disabled={disabled}
        className={`w-full focus:outline-none h-full ${
          disabled
            ? "border-gray7 cursor-not-allowed bg-[#F5F5F5] hover:border-gray7 text-[#767676]"
            : ""
        }`}
        placeholderText={placeholder || "yyyy"}
        showYearPicker
        yearItemNumber={12}
      />
    </div>
  );
};

export default YearPicker;
