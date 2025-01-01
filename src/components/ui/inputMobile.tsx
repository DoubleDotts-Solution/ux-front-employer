/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { cn } from "@/lib/utils";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value?: string;
  onChange?: (value?: string) => void;
};

const InputMobile = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [phoneValue, setPhoneValue] = React.useState<string | undefined>(
      value
    );

    React.useEffect(() => {
      setPhoneValue(value);
    }, [value]);

    const handleChange = (newValue?: string) => {
      setPhoneValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    };

    return (
      <div
        className={`flex gap-[8px] h-10 lg:h-12 w-full items-center rounded-[8px] border border-input text-primary px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium ${className}`}
      >
        <PhoneInput
          ref={ref as any}
          className={cn(
            "border-none h-full focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-none focus-visible:shadow-none focus-visible:ring-0"
          )}
          international
          defaultCountry="IN"
          value={phoneValue}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);
InputMobile.displayName = "InputMobile";

export { InputMobile };
