/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import Ic_edit from "@/assets/images/Ic_edit.svg";
import Ic_check_circle_black from "@/assets/images/Ic_check_circle_black.svg";
import ButtonUx from "@/components/common/button";
import { Link } from "react-router-dom";

const formSchema = z.object({
  otp: z
    .string()
    .regex(/^\d{4}$/, { message: "OTP must be a 4-digit number." }),
});

const VerifyOtpForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [otp, setOTP] = useState(["", "", "", ""]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    form.reset();
    setOTP(["", "", "", ""]);
  };

  const inputRefs = useRef<any>([]);
  const [timer, setTimer] = useState(0);
  const [resendClicked, setResendClicked] = useState(false);

  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (resendClicked) {
      const startTimer = () => {
        countdown = setInterval(() => {
          setTimer((prevTime) => {
            if (prevTime === 0) {
              clearInterval(countdown);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      };

      setTimer(30);
      startTimer();
    }

    return () => clearInterval(countdown);
  }, [resendClicked]);

  const handleResendOTP = async () => {
    if (!resendClicked || timer === 0) {
      setTimer(30);
      setResendClicked(true);
    }
  };

  const handleInput = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setOTP((prevOTP: any) => {
      const newOTP = [...prevOTP];
      newOTP[index] = numericValue.slice(0, 1);
      if (newOTP.every((digit) => digit !== "")) {
        const fullOTP = newOTP.join("");
        form.setValue("otp", fullOTP);
        form.trigger();
      }
      return newOTP;
    });

    if (
      index < inputRefs.current.length - 1 &&
      numericValue.length > 0 &&
      inputRefs.current[index + 1]
    ) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 desktop:gap-[32px] p-5 md:p-8">
        <div className="flex flex-col gap-1 desktop:gap-3">
          <h4 className="text-primary text-lg sm:text-xl md:text-[20px] desktop:text-[24px] font-semibold">
            Enter your 4 Digit Code
          </h4>
          <p className="text-sm md:text-base desktop:text-lg text-gray flex flex-wrap">
            We have sent 4 Digit code on &nbsp;
            <span className="flex items-center gap-3 text-primary font-medium">
              +91 8988737722
              <Link to={""}>
                <img src={Ic_edit} alt="edit" className="w-[20px] h-[20px]" />
              </Link>
            </span>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 lg:gap-4">
              <div className="w-full flex gap-[23px]">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="input border border-lightGray2 rounded-lg w-[49px] h-[40px] text-center text-base bg-transparent outline-none font-semibold"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInput(index, e.target.value)
                    }
                    ref={(ref: any) => (inputRefs.current[index] = ref)}
                  />
                ))}
              </div>
              <div className="text-sm text-gray">
                If you didn’t receive a code!{" "}
                <span
                  className={`font-semibold ${
                    timer === 0 ? "cursor-pointer text-primary" : "text-primary"
                  }`}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </span>{" "}
                {timer !== 0 && (
                  <span className="text-primary font-semibold">
                    in 0:{timer < 10 ? `0${timer}` : timer}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-[24px] md:mt-[32px] md:flex md:justify-center w-full relative">
              <ButtonUx
                label="Verify"
                buttonClassName={`text-lg px-8 desktop:px-14 py-2 w-full h-10 lg:h-12 font-semibold border-2 rounded-[8px] ${
                  form.formState.isValid
                    ? "border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 hover:shadow-shadow1"
                    : "border-gray7 bg-[#D8D8D8] text-[#767676]"
                }`}
                type="submit"
                disabled={!form.formState.isValid}
              />
              {form.formState.isValid && (
                <img
                  src={Ic_check_circle_black}
                  alt="check"
                  className="absolute top-[8px] right-[8px] lg:top-[12px] z-50 lg:right-[12px]"
                />
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default VerifyOtpForm;
