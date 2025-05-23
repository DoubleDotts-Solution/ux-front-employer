// /* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from "react";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";

// import { cn } from "@/lib/utils";

// export type InputProps = Omit<
//   React.InputHTMLAttributes<HTMLInputElement>,
//   "onChange"
// > & {
//   value?: string;
//   onChange?: (value?: string) => void;
// };

// const InputMobile = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, value, onChange, ...props }, ref) => {
//     const [phoneValue, setPhoneValue] = React.useState<string | undefined>(
//       value
//     );

//     React.useEffect(() => {
//       setPhoneValue(value);
//     }, [value]);

//     const handleChange = (newValue?: string) => {
//       setPhoneValue(newValue);
//       if (onChange) {
//         onChange(newValue);
//       }
//     };

//     return (
//       <div
//         className={`flex gap-[8px] h-12 w-full items-center rounded-[8px] border border-input text-primary px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium ${className}`}
//       >
//         <PhoneInput
//           ref={ref as any}
//           className={cn(
//             "border-none h-full focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-none focus-visible:shadow-none focus-visible:ring-0"
//           )}
//           international
//           defaultCountry="IN"
//           value={phoneValue}
//           onChange={handleChange}
//           {...props}
//           autoComplete="off"
//         />
//       </div>
//     );
//   }
// );
// InputMobile.displayName = "InputMobile";

// export { InputMobile };

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
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
      setPhoneValue(value);
    }, [value]);

    const handleChange = (newValue?: string) => {
      setPhoneValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    };

    const phoneInputWrapperRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const inputEl = phoneInputWrapperRef.current?.querySelector("input");
      if (!inputEl) return;

      const handleFocus = () => setIsFocused(true);
      const handleBlur = () => setIsFocused(false);

      inputEl.addEventListener("focus", handleFocus);
      inputEl.addEventListener("blur", handleBlur);

      return () => {
        inputEl.removeEventListener("focus", handleFocus);
        inputEl.removeEventListener("blur", handleBlur);
      };
    }, []);

    return (
      <div
        ref={phoneInputWrapperRef}
        className={cn(
          "flex gap-[8px] h-12 w-full items-center rounded-[8px] border border-input text-primary px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:bg-lightYellow2 focus:shadow-shadow1",
          isFocused && "bg-lightYellow2 shadow-shadow1",
          className
        )}
      >
        <PhoneInput
          ref={ref as any}
          className="border-none h-full focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:bg-lightYellow2 focus:shadow-shadow1"
          international
          defaultCountry="IN"
          value={phoneValue}
          onChange={handleChange}
          {...props}
          autoComplete="off"
        />
      </div>
    );
  }
);

InputMobile.displayName = "InputMobile";

export { InputMobile };
