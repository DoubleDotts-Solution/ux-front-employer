/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "../ui/button";

interface ButtonUxProps {
  label: string;
  buttonClassName: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: any;
}

const ButtonUx: React.FC<ButtonUxProps> = ({
  label,
  buttonClassName,
  type,
  disabled,
}) => {
  return (
    <>
      <Button
        className={`${buttonClassName} z-50`}
        type={type || "button"}
        disabled={disabled}
      >
        {label}
      </Button>
    </>
  );
};

export default ButtonUx;
