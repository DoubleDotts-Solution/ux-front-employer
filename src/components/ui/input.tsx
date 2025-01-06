/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<any, any>(
  ({ className, type, value, defaultValue, ...props }, ref) => {
    return (
      <input
        type={type}
        value={value ?? ""}
        defaultValue={defaultValue}
        className={cn(
          "flex h-10 lg:h-12 w-full rounded-[8px] border border-input bg-white text-primary px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none focus:bg-lightYellow2 disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:hover:border-gray7 focus:shadow-none focus-visible:shadow-none placeholder:text-[#767676] placeholder:text-lg disabled:text-[#767676]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };