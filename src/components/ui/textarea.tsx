import * as React from "react";

import { cn } from "@/lib/utils";

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-20 w-full rounded-[8px] border border-input bg-white text-primary px-3 py-2 text-base focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-none focus-visible:shadow-none resize-none lg:h-12 border-input file:border-0 file:bg-transparent file:text-sm file:font-medium focus:bg-lightYellow2 focus:shadow-none focus-visible:shadow-none placeholder:text-[#767676] placeholder:text-base lg:placeholder:text-lg focus:shadow-shadow1",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
