/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonUx from "@/components/common/button";
import Ic_pdf from "@/assets/images/Ic_pdf.svg";
import Ic_trash from "@/assets/images/Ic_trash.svg";
import Ic_Checkbox from "@/assets/images/Ic_Checkbox.svg";
import Ic_File_upload_error from "@/assets/images/Ic_File_upload_error.svg";

const formSchema = z.object({
  portfolio_link: z
    .string()
    .min(1, { message: "Portfolio Link is required." })
    .url({ message: "Please enter a valid URL." }),
  resume: z
    .instanceof(File, { message: "Please upload file." })
    .refine((file) => file.size <= 100 * 1024 * 1024, {
      message: "File size must be less than 100MB.",
    })
    .refine((value) => !!value, {
      message: "Resume is required",
    }),
});

const ApplyByResumeForm: React.FC<{
  handleToggleDirectSubmitResumePopup: any;
  setSuccessPopupVisible: any;
}> = ({ handleToggleDirectSubmitResumePopup, setSuccessPopupVisible }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [uploadedFileComplete, setUploadedFileComplete] = useState<any>(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // form.setValue("resume", files[0]);
      setUploadedFile(files[0]);
      simulateUpload(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      // form.setValue("resume", files[0]);
      setUploadedFile(files[0]);
      simulateUpload(files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const retryUpload = () => {
    setUploadProgress(0);
    setUploadedFileComplete(false);
    setUploadFailed(false);

    simulateUpload(uploadedFile);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    handleToggleDirectSubmitResumePopup();
    setSuccessPopupVisible(true);
  };

  const simulateUpload = (file: any) => {
    try {
      setUploadProgress(0);

      const uploadSpeedKBps = 500;
      const uploadTime = Math.ceil(file.size / (uploadSpeedKBps * 1024));

      const intervalTime = uploadTime > 0 ? (uploadTime * 1000) / 10 : 300;

      let progress = 0;
      const interval = setInterval(() => {
        setUploadProgress(() => {
          if (progress >= 100) {
            clearInterval(interval);
            setUploadedFileComplete(true);
            return 100;
          }
          progress += 10;
          return progress;
        });
      }, intervalTime);

      setTimeout(() => {
        const simulateError = Math.random() < 0.2;
        if (simulateError) {
          throw new Error("Simulated upload error");
        }
      }, 1000);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadFailed(true);
      setUploadedFileComplete(false);
    }
  };
  const formatFileSize = (sizeInBytes: number) => {
    const kb = 1024;
    const mb = kb * 1024;

    if (sizeInBytes >= mb) {
      return (sizeInBytes / mb).toFixed(2) + " MB";
    } else {
      return (sizeInBytes / kb).toFixed(2) + " KB";
    }
  };
  useEffect(() => {
    if (uploadedFileComplete) {
      form.setValue("resume", uploadedFile);
    }
  }, [uploadedFileComplete, uploadedFile, form]);
  useEffect(() => {
    return () => {
      setUploadProgress(null);
      setUploadedFile(null);
      setUploadedFileComplete(false);
      setUploadFailed(false);
    };
  }, []);

  const a = form.formState.isValid;
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 lg:gap-6">
            <div>
              <FormField
                control={form.control}
                name="portfolio_link"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <p
                      className={`mb-1 lg:mb-2 text-sm lg:text-base ${
                        fieldState?.error ? "text-red" : "text-primary"
                      }`}
                    >
                      Portfolio Link
                    </p>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter Link here"
                          {...field}
                          className={`bg-white
                                      ${
                                        fieldState?.error
                                          ? "border-red"
                                          : "border-[#777777] hover:border-primary focus:border-[3px] focus:border-gray7"
                                      } border-2 rounded-[8px]`}
                          type="text"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="resume"
                render={({ fieldState }) => (
                  <FormItem>
                    <p
                      className={`mb-1 lg:mb-2 text-sm lg:text-base ${
                        fieldState?.error ? "text-red" : "text-primary"
                      }`}
                    >
                      Resume
                    </p>
                    <FormControl>
                      <div className="relative">
                        <div
                          className="border-2 border-dashed border-gray5 rounded-[8px] p-3 md:p-6 flex justify-center items-center flex-col gap-3 cursor-pointer"
                          onDragOver={handleDragOver}
                          onClick={handleClick}
                          onDrop={handleDrop}
                        >
                          <p className="text-gray text-sm sm:text-base md:text-lg">
                            <span className="text-primary font-semibold">
                              Select a file to upload
                            </span>{" "}
                            or Drag & Drop it here
                          </p>
                          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 md:gap-4">
                            <p className="text-gray text-sm">
                              Max file size:{" "}
                              <span className="text-primary font-semibold">
                                100MB
                              </span>
                            </p>
                            <div className="h-[1px] sm:h-[12px] w-full sm:w-[1px] bg-gray5"></div>
                            <p className="text-gray text-sm">
                              Supported file types:{" "}
                              <span className="text-primary font-semibold">
                                .docx, pdf
                              </span>
                            </p>
                          </div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".docx, .pdf"
                            onChange={handleFileChange}
                            name="resume"
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {uploadedFile && !uploadFailed && (
                <div className="mt-2 border border-primary rounded-[8px] p-4 flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <img src={Ic_pdf} alt="pdf" />
                    <div>
                      <h5 className="text-primary font-medium text-base">
                        {uploadedFile.name
                          ? uploadedFile.name
                          : uploadedFile.split("/").pop() || "No file selected"}
                      </h5>

                      <span className="text-gray text-sm">
                        {formatFileSize(uploadedFile.size)}
                        {!uploadedFileComplete ? (
                          <>
                            –{" "}
                            {uploadProgress !== null && uploadProgress !== 100
                              ? `${uploadProgress}% uploaded`
                              : "Waiting to upload"}
                          </>
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>
                  </div>

                  {uploadedFileComplete ? (
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedFile(null);
                        setUploadedFileComplete(false);
                        setUploadProgress(0);
                      }}
                      className="delete-button"
                    >
                      <img
                        src={Ic_trash}
                        alt="Delete file"
                        className="cursor-pointer"
                      />
                    </button>
                  ) : uploadProgress === 100 ? (
                    <img
                      src={Ic_Checkbox}
                      alt="Upload complete"
                      className="w-6 h-6"
                    />
                  ) : (
                    <div className="loader w-8 h-8 border-[4px] rounded-full border-gray5 border-t-[#2D2D2D]"></div>
                  )}
                </div>
              )}
              {uploadedFile && uploadFailed && (
                <div className="mt-2 border border-red rounded-[8px] p-4 flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <img src={Ic_File_upload_error} alt="pdf" />
                    <div>
                      <h5 className="text-red font-medium text-base">
                        Upload failed, please try again
                      </h5>
                      <h5 className="text-red text-sm">
                        {uploadedFile.name
                          ? uploadedFile.name
                          : uploadedFile.split("/").pop() || "No file selected"}
                      </h5>
                      <span
                        className="text-primary text-sm font-semibold underline cursor-pointer"
                        onClick={() => retryUpload()}
                      >
                        Try again
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setUploadedFile(null);
                      setUploadedFileComplete(false);
                      setUploadProgress(0);
                    }}
                    className="delete-button"
                  >
                    <img
                      src={Ic_trash}
                      alt="Delete file"
                      className="cursor-pointer"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-[24px] md:mt-[32px] flex justify-center w-full gap-4 md:gap-6 desktop:gap-8">
            <div onClick={handleToggleDirectSubmitResumePopup}>
              <ButtonUx
                label="Cancel"
                buttonClassName="bg-white font-semibold text-base border-2 border-primary rounded-[8px] px-8 py-2 h-10 lg:h-12 text-primary hover:shadow-shadow1 hover:bg-lightYellow2 focus:bg-lightYellow3"
              />
            </div>
            <ButtonUx
              label="Apply Now"
              buttonClassName={`text-lg px-8 py-2 w-max h-10 lg:h-12 font-semibold border-2 rounded-[8px] ${
                a
                  ? "border-primary bg-yellow text-primary hover:bg-yellow1 focus:bg-yellow2 hover:shadow-shadow1"
                  : "border-gray7 bg-[#D8D8D8] text-[#767676]"
              }`}
              type="submit"
              // disabled={!a}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default ApplyByResumeForm;
