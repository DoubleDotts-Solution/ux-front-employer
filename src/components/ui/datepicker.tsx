/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format, isValid } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Ic_calender from "../../assets/images/Ic_calender.svg";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  onSelectDate: (selectedDate: string) => void;
  selectedDate?: string | null;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const Datepicker: React.FC<DatePickerProps> = ({
  onSelectDate,
  selectedDate,
  className,
  placeholder,
  disabled,
}) => {
  const today = new Date();
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
          className={`flex items-center justify-between w-full h-11 rounded-[8px] px-3 py-2 ${
            disabled
              ? "cursor-not-allowed bg-[#F5F5F5] hover:border-gray7 text-[#767676] border-gray7"
              : ""
          }`}
          onClick={onClick}
        >
          <input
            value={value || ""}
            className="w-full h-full text-primary bg-white font-normal focus:outline-none focus:ring-0 placeholder:text-[#767676] placeholder:text-base lg:placeholder:text-lg disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:hover:border-gray7 disabled:text-[#767676] disabled:border-gray7"
            ref={ref}
            placeholder={`${placeholder ? placeholder : "MM-yyyy"}`}
            readOnly
            disabled={disabled}
          />
          <img src={Ic_calender} alt="calendar" className="cursor-pointer" />
        </div>
      );
    }
  );

  const handleDateChange = (date: Date | null) => {
    setInternalSelectedDate(date);
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    onSelectDate(formattedDate);
  };

  const isFutureDate = (date: Date) => {
    return date > today;
  };

  return (
    <div
      className={cn(
        "bg-white text-base font-medium border-2 rounded-[8px] flex h-12 w-full border-input text-primary DatePicker",
        className
      )}
    >
      <DatePicker
        selected={internalSelectedDate}
        onChange={handleDateChange}
        dateFormat="MM-yyyy"
        customInput={<ExampleCustomInput />}
        disabled={disabled}
        className={`w-full focus:outline-none h-full ${
          disabled
            ? "border-gray7 cursor-not-allowed bg-[#F5F5F5] hover:border-gray7 text-[#767676]"
            : ""
        }`}
        placeholderText={format(internalSelectedDate || today, "MM-yyyy")}
        filterDate={(date) => !isFutureDate(date)}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
      />
    </div>
  );
};

export default Datepicker;
